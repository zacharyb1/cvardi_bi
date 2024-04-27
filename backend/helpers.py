import os
from PIL import Image

def save_image_to_folder(image_data, filename):
    directory = 'userSelfies'
    if not os.path.exists(directory):
        os.makedirs(directory)
    file_path = os.path.join(directory, filename)
    try:
        image_data.save(file_path)
        return file_path, None
    except Exception as e:
        return None, str(e)

def label_images(image):
    # implement image labeling
    imageName = 'image1_user1_user2_user3.png' 
    directory = 'static/rawImages'
    file_path = os.path.join(directory, imageName)
    try:
        image.save(file_path)
    except Exception as e:
        return str(e)


# testers: works
img = Image.open('./static/good-selfie.jpg')
# save_image_to_folder(img, 'good-selfie.jpg')
label_images(img)
