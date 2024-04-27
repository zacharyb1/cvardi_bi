import base64
import requests
import numpy as np
from PIL import Image
from io import BytesIO


def ndarray_to_base64(image_array):
    # Convert the ndarray to a PIL Image
    img = Image.fromarray(image_array)
    # Create a BytesIO object to hold the image data
    img_buffer = BytesIO()
    # Save the image to the BytesIO buffer
    img.save(img_buffer, format="PNG")
    # Get the byte data from the buffer
    img_bytes = img_buffer.getvalue()
    # Encode the image bytes to base64
    encoded_string = base64.b64encode(img_bytes)
    # Convert bytes to a string
    base64_string = encoded_string.decode('utf-8')
    return base64_string

def base64_to_image(base64_string):
    # Decode the base64 string to bytes
    img_bytes = base64.b64decode(base64_string)
    # Create a BytesIO object from the decoded bytes
    img_buffer = BytesIO(img_bytes)
    # Open the image using PIL
    img = Image.open(img_buffer)
    return img