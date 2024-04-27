import csv
import os
from flask import Flask, request, jsonify


app = Flask(__name__)

# Existing user data (replace with your data storage logic)
users = {}

@app.route("/")
def hello_world():
    return "Hello, World🙌!"


@app.route("/images", methods=["GET"])
def get_images():
    user_id = request.args.get("userId")
    if not user_id:
        return jsonify({"error": "Missing userId parameter"}), 400    
    directory = 'static/editedImages/'    
    files = os.listdir(directory)
    filtered_files = [file for file in files if user_id in file]      
    image_urls = [f"https://cvardi-bi-back.onrender.com/{directory}{file}" for file in filtered_files]    
    return jsonify({"imageUrls": image_urls})


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

