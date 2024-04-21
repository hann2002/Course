# ADL HW2

## Text Summarization

### Training

```shell
mkdir data
python split_data.py
python train.py --validation_file $2 --train_file $1 --output_dir ./model
```