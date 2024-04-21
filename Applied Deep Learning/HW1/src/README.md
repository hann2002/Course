# ADL HW1

## Context Selection 

### Training

```shell
cd select/
mkdir input_data
mkdir model
python train.py --valid_file $3 --train_file $2 --context_file $1 --output_dir ./model
```

## Question Answering

### Training

```shell
cd qa/
mkdir input_data
mkdir model
python train.py --valid_file $3 --train_file $2 --context_file $1 --output_dir ./model
```
