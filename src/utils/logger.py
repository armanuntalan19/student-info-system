import logging
import os


# Make a logger that writes to a file (keeps the menu clean)
def setup_logger(log_file):
    os.makedirs(os.path.dirname(log_file), exist_ok=True)
    logger = logging.getLogger("student_system")
    logger.setLevel(logging.INFO)             # save INFO, WARNING and ERROR messages
    if not logger.handlers:                   # do not add the file twice
        handler = logging.FileHandler(log_file)
        # each line looks like: time - level - message
        handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
        logger.addHandler(handler)
    return logger
