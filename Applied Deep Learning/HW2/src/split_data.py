import json
import random

with open('raw_data/train.jsonl', 'r') as jsonl_file:
    data_list = [json.loads(line) for line in jsonl_file]

split_point = int(0.8 * len(data_list))

# random.shuffle(data_list)

train_data = data_list[:split_point]
valid_data = data_list[split_point:]

with open('data/train.json', "w", encoding="utf-8")  as train_file:
    json.dump(train_data, train_file, ensure_ascii=False, indent=4)

with open('data/valid.json', "w", encoding="utf-8")  as valid_file:
    json.dump(valid_data, valid_file, ensure_ascii=False, indent=4)

print("已經創建了 data/train.json 和 data/valid.json 文件")
