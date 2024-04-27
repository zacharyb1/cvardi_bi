import csv
import os
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from helpers import save_image_to_folder
from helpers import label_images
from helpers import face_recognition

app = Flask(__name__)
CORS(app)

# Existing user data (replace with your data storage logic)
users = {}

@app.route("/")
def hello_world():
    return "Hello, World🙌!"


@app.route("/images", methods=["GET"])
def get_images():
    directory = 'static/editedImages/'    
    files = os.listdir(directory)
    user_id = request.args.get("userId")
    if not user_id:
        allImages_urls = [f"http://65.108.33.114:5000/{directory}{file}" for file in files]
        return jsonify({"imageUrls": allImages_urls})    
    userSelfie = Image.open(f"./static/userSelfies/{user_id}.png")
    userImages = []
    for file in files:
        img = Image.open(f"{directory}{file}")
        contain_user = face_recognition(userSelfie, img)
        if contain_user:
            userImages.append(file)
    userImages_urls = [f"http://65.108.33.114:5000/{directory}{file}" for file in userImages]    
    return jsonify({"imageUrls": userImages_urls})


@app.route('/user', methods=['POST'])
def create_user():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    image = request.files['image']
    if image.filename == '':
        return jsonify({"error": "No image selected"}), 400
    data = request.form.to_dict()
    required_fields = {"id"}
    missing_fields = required_fields - set(data.keys())
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
    image_path, error = save_image_to_folder(image, f"{data['id']}.png")
    if error:
        return jsonify({"error": error}), 500
    return jsonify({"success": True, "image_path": image_path})

@app.route('/stream', methods=['POST'])
def check_gesture():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    image = request.files['image']
    if image.filename == '':
        return jsonify({"error": "No image selected"}), 400
    
    have_gesture = True # implement gesture recognition here
    if have_gesture:
            label_images()

    return jsonify({"success": True})


if __name__ == "__main__":
    app.config['STATIC_FOLDER'] = 'static'
    app.run(host='0.0.0.0',debug=True)

