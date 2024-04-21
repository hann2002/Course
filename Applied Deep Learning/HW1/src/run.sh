python select/predict.py --test_file $2 --context_file $1 --trans_data output/select_input.json --output_file output/select_predict.json --target_dir model/select && \
python qa/predict.py --input_file output/select_predict.json --trans_data output/qa_input.json --test_file $2 --context_file $1 --output_file $3  --target_dir model/qa
