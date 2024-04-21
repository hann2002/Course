import os
import sys
import json
import argparse
import logging
import math
import numpy as np
from functools import partial
from time import strftime, localtime
import datasets
from datasets import load_dataset, load_metric
from accelerate import Accelerator
import torch
from torch.utils.data.dataloader import DataLoader
import transformers
from transformers import (
    AutoConfig,
    AutoModelForSeq2SeqLM,
#     AutoTokenizer,
    T5Tokenizer,
    default_data_collator,
    set_seed,
)


logger = logging.getLogger(__name__)

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--test_file", type=str, default="/kaggle/input/public/public.jsonl")
    parser.add_argument("--target_dir", type=str, default="/kaggle/input/jim-model/model")
    parser.add_argument("--test_batch_size", type=int, default=32)
    parser.add_argument("--out_file", type=str, default="./results.jsonl")
    parser.add_argument("--beam_size", type=int, default=7)
    parser.add_argument("--do_sample", action="store_true", default=True)
    parser.add_argument("--top_k", type=int, default=0)
    parser.add_argument("--top_p", type=float, default=0)
    parser.add_argument("--temperature", type=float, default=0)
    parser.add_argument("--seed", type=int, default=14)
    parser.add_argument("--max_source_length",type=int,default=256)
    parser.add_argument("--max_target_length",type=int,default=64)
    parser.add_argument("--text_col",type=str,default='maintext')
    parser.add_argument("--title_col",type=str,default='title')
    parser.add_argument("--id_col",type=str,default='id')
#     args = parser.parse_args()
    args, unknown = parser.parse_known_args()
    
    return args

def prepare_train_features(examples, indices, args, tokenizer):
    inputs = examples[args.text_col]
    targets = examples[args.title_col]

    model_inputs = tokenizer(inputs, max_length=args.max_source_length, padding="max_length", truncation=True)

    # Setup the tokenizer for targets
    with tokenizer.as_target_tokenizer():
        labels = tokenizer(targets, max_length=args.max_target_len, padding="max_length", truncation=True)

    # Replace all tokenizer.pad_token_id in the labels by -100 as we want to ignore padding in the loss.
    labels["input_ids"] = [[(l if l != tokenizer.pad_token_id else -100) for l in label] for label in labels["input_ids"]]
    model_inputs["labels"] = labels["input_ids"]
    model_inputs["indices"] = indices
    return model_inputs


def prepare_pred_features(examples, args, tokenizer):
    inputs = examples[args.text_col]
    model_inputs = tokenizer(inputs, max_length=args.max_source_length, padding="max_length", truncation=True)
    return model_inputs

if __name__ == "__main__":
# Parse arguments and save them.
    args = parse_args()

# Initialize the accelerator. We will let the accelerator handle device placement for us in this example.
    accelerator = Accelerator()
# Make one log on every process with the configuration for debugging.
    logging.basicConfig(
        format="%(asctime)s - %(levelname)s - %(name)s -    %(message)s",
        datefmt="%m/%d/%Y %H:%M:%S",
        level=logging.INFO,
    )
    logger.info(accelerator.state)
    
# Setup logging, we only want one process per machine to log things on the screen.
# accelerator.is_local_main_process is only True for one process per machine.
    logger.setLevel(logging.INFO if accelerator.is_local_main_process else logging.ERROR)
    if accelerator.is_local_main_process:
        datasets.utils.logging.set_verbosity_warning()
        transformers.utils.logging.set_verbosity_info()
    else:
        datasets.utils.logging.set_verbosity_error()
        transformers.utils.logging.set_verbosity_error()

# If passed along, set the generation seed now.
    if args.seed is not None:
        set_seed(args.seed)
    
# Load trained model and tokenizer
    config = AutoConfig.from_pretrained(args.target_dir)
    tokenizer = T5Tokenizer.from_pretrained(args.target_dir, use_fast=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(args.target_dir, config=config)    
    
    model.resize_token_embeddings(len(tokenizer))
    if model.config.decoder_start_token_id is None:
        raise ValueError("Make sure that `config.decoder_start_token_id` is correctly defined")


# Load and preprocess the dataset
    raw_datasets = load_dataset("json", data_files={"test": args.test_file})
    cols = raw_datasets["test"].column_names
    args.id_col, args.text_col = "id", "maintext"
    
    test_examples = raw_datasets["test"]
    prepare_pred_features = partial(prepare_pred_features, args=args, tokenizer=tokenizer)
    test_dataset = test_examples.map(
        prepare_pred_features,
        batched=True,
        num_proc=4,
        remove_columns=cols,
    )
    
# Create DataLoaders
    data_collator = default_data_collator
    test_dataloader = DataLoader(test_dataset, collate_fn=data_collator, 
                        batch_size=args.test_batch_size, num_workers=4)

# Prepare everything with our accelerator.
    model, test_dataloader = accelerator.prepare(model, test_dataloader)

# Test!
    logger.info("\n******** Running testing ********")
    logger.info(f"Num test examples = {len(test_dataset)}")
    
    model.eval()
    gen_kwargs = {
        "max_length": args.max_target_length,
        "num_beams": args.beam_size,
#         "do_sample": args.do_sample,
#         "top_k": args.top_k,
#         "top_p": args.top_p,
#         "temperature": args.temperature,
    }
    all_preds = []
    for step, data in enumerate(test_dataloader):
        with torch.no_grad():
            generated_tokens = accelerator.unwrap_model(model).generate(
                data["input_ids"],
                attention_mask=data["attention_mask"],
                **gen_kwargs,
            )
            generated_tokens = accelerator.pad_across_processes(
                generated_tokens, dim=1, pad_index=tokenizer.pad_token_id
            )
            generated_tokens = accelerator.gather(generated_tokens).cpu().numpy()
            decoded_preds = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
            for item in decoded_preds:
                all_preds.append(item)

    output_dir = os.path.dirname(args.out_file)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    with open(args.out_file, 'w', encoding='utf-8') as f:
        for id_, pred in zip(test_examples[args.id_col], all_preds):
            obj = {"title": pred, "id": id_}
            f.write(json.dumps(obj, ensure_ascii=False) + '\n')

    print("make prediction file ", args.out_file)
