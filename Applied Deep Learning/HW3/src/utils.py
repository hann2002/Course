from transformers import BitsAndBytesConfig
import torch

def get_prompt(instruction: str) -> str:
    '''Format the instruction as a prompt for LLM.'''
    return f"以下為翻譯指令，盡量簡短翻譯，並輸出翻譯結果。\n\n \
    ### 翻譯指令：翻譯成文言文：\n尚未赴任時，便又改任金州知州。\n\n### 翻譯結果：未行，改金州。\n\n \
    ### 翻譯指令：議雖不從，天下鹹重其言。\n翻譯成白話文：\n\n### 翻譯結果：他的建議雖然不被采納，但天下都很敬重他的話。\n\n \
    ### 翻譯指令：{instruction}\n\n### 翻譯結果："

def get_bnb_config() -> BitsAndBytesConfig:
    '''Get the BitsAndBytesConfig.'''
    return BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_use_double_quant=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16
    )
