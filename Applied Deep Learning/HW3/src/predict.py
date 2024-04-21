import torch
import os
import numpy as np
from tqdm import tqdm
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import json
from peft import PeftModel
from utils import get_prompt, get_bnb_config
import argparse

def predict(model, tokenizer, data, max_length=512):
    data_size = len(data)
    
    predictions = []
    for x in data:
        instruction = get_prompt(x["instruction"])
        tokenized_instruction = tokenizer(instruction, return_tensors='pt', add_special_tokens=False)

        with torch.no_grad():
            output = model.generate(**tokenized_instruction, max_length = max_length)

        generated_text = tokenizer.decode(output[0, len(tokenizer.encode(instruction)):], skip_special_tokens=True)
        predictions.append({"id": x["id"], "output": generated_text})

    output_dir = os.path.dirname(args.output_file)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    with open(args.output_file, "w", encoding="utf-8") as f:
        json.dump(predictions, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--base_model_path",
        type=str,
        default="",
        help="Path to the checkpoint of Taiwan-LLM-7B-v2.0-chat. If not set, this script will use "
        "the checkpoint from Huggingface (revision = 5073b2bbc1aa5519acdc865e99832857ef47f7c9)."
    )
    parser.add_argument(
        "--peft_path",
        type=str,
        default="adapter_checkpoint",
        help="Path to the saved PEFT checkpoint."
    )
    parser.add_argument(
        "--test_data_path",
        type=str,
        default="data/private_test.json",
        help="Path to test data."
    )
    parser.add_argument(
        "--output_file",
        type=str,
        default="output/prediction.json",
        help="Path to test data."
    )
    args, unknown = parser.parse_known_args()

    # Load model
    bnb_config = get_bnb_config()

    if args.base_model_path:
        model = AutoModelForCausalLM.from_pretrained(
            args.base_model_path,
            torch_dtype=torch.bfloat16,
            quantization_config=bnb_config
        )
        tokenizer = AutoTokenizer.from_pretrained(args.base_model_path)
    else:
        model_name = "yentinglin/Taiwan-LLM-7B-v2.0-chat"
        revision = "5073b2bbc1aa5519acdc865e99832857ef47f7c9"
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            revision=revision,
            torch_dtype=torch.bfloat16,
            quantization_config=bnb_config
        )
        tokenizer = AutoTokenizer.from_pretrained(
            model_name,
            revision=revision,
        )

    if tokenizer.pad_token_id is None:
        tokenizer.pad_token_id = tokenizer.eos_token_id

    # Load LoRA
    model = PeftModel.from_pretrained(model, args.peft_path)

    with open(args.test_data_path, "r") as f:
        data = json.load(f)

    model.eval()
    predict(model, tokenizer, data)