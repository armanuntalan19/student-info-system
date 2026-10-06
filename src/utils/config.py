import json
import os

# Project folder, one level above src
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Defaults for a missing or broken config.json
DEFAULTS = {"data_file": "data/students.json", "log_file": "logs/app.log"}


# Load settings from config/config.json
def load_config():
    config = dict(DEFAULTS)
    try:
        with open(os.path.join(BASE_DIR, "config", "config.json")) as f:
            config.update(json.load(f))
    except (FileNotFoundError, json.JSONDecodeError):
        print("Warning: config/config.json is missing or broken. Using default settings.")

    config["data_file"] = os.path.join(BASE_DIR, config["data_file"])
    config["log_file"] = os.path.join(BASE_DIR, config["log_file"])
    return config
