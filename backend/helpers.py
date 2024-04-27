import os

import insightface
import numpy as np
from insightface.app.common import Face
from insightface.model_zoo import model_zoo
from PIL import Image

det_model = model_zoo.get_model("buffalo_l/det_10g.onnx")
rec_model = model_zoo.get_model("buffalo_l/w600k_r50.onnx")

det_model.prepare(ctx_id=0, input_size=(640, 640), det_thres=0.5)


def save_image_to_folder(image_data, filename):
    directory = "userSelfies"
    if not os.path.exists(directory):
        os.makedirs(directory)
    file_path = os.path.join(directory, filename)
    try:
        image_data.save(file_path)
        return file_path, None
    except Exception as e:
        return None, str(e)


def recognise_gesture(image):
    # implement gesture recognition
    return True


def face_recognition(selfie: Image.Image, image: Image.Image):
    selfie = np.asarray(selfie)
    image = np.asarray(image)
    bboxes, kpss = det_model.detect(selfie, max_num=0, metric="defualt")
    if len(bboxes) == 0:
        return False
    bbox = bboxes[0, :4]
    det_score = bboxes[0, 4]
    kps = kpss[0]
    face = Face(bbox=bbox, kps=kps, det_score=det_score)
    rec_model.get(selfie, face)
    selfie_embedding = face.normed_embedding

    bboxes, kpss = det_model.detect(image, max_num=0, metric="defualt")
    if len(bboxes) == 0:
        return False
    for i in range(bboxes.shape[0]):
        bbox = bboxes[i, :4]
        det_score = bboxes[i, 4]
        kps = kpss[i]
        face = Face(bbox=bbox, kps=kps, det_score=det_score)
        rec_model.get(image, face)
        if (np.dot(selfie_embedding, face.normed_embedding.T)) > 0.3:
            return True
    return False


def edit_image(imageData, imageName):
    # implement image editing
    editedImage = imageData
    directory = "static/editedImages"
    file_path = os.path.join(directory, imageName)
    try:
        editedImage.save(file_path)
    except Exception as e:
        return str(e)


def label_images(image):
    # implement image labeling
    imageName = "image1_user1_user2_user3.png"

    # saving labeled image
    directory = "static/rawImages"
    file_path = os.path.join(directory, imageName)
    try:
        image.save(file_path)
    except Exception as e:
        return str(e)


# testers: works
# img = Image.open('./static/good-selfie.jpg')
# save_image_to_folder(img, 'good-selfie.jpg')
# label_images(img)
