import json
import os

# Project folder (one level above src)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


# Load settings from config/config.json
def load_config():
    with open(os.path.join(BASE_DIR, "config", "config.json")) as f:
        config = json.load(f)
    # Make file paths full paths
    config["data_file"] = os.path.join(BASE_DIR, config["data_file"])
    config["log_file"] = os.path.join(BASE_DIR, config["log_file"])
    return config
