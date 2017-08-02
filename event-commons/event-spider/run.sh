#!/bin/bash
echo "bash - activate virtual environment: $1"
. venv/$1/bin/activate

cd src/python
python $2

