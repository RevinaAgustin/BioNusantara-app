import os
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

# Import untuk Hoya & Plankton (.keras / TensorFlow)
import tensorflow as tf
from tensorflow.keras.preprocessing import image as tf_image

# Import untuk Kayu (.pth / PyTorch)
import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image

app = Flask(__name__)

# =========================================================
# PERBAIKAN JALUR (SANGAT PENTING)
# Karena predict.py ada di dalam ai_models/ai_service,
# kita cukup mundur 1 langkah ('..') untuk melihat file .keras & .pth
# =========================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.abspath(os.path.join(BASE_DIR, '..'))

print(f"Sedang memuatkan model AI dari: {MODEL_DIR}")

# 1. Load Model TensorFlow (.keras)
hoya_model = tf.keras.models.load_model(os.path.join(MODEL_DIR, 'ModelHoya_MobileNetV2.keras'))
plankton_model = tf.keras.models.load_model(os.path.join(MODEL_DIR, 'ModelPlankton_MobileNetV2.keras'))

# 2. Load Model PyTorch (.pth)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
kayu_model = models.mobilenet_v3_large(weights=None)

# PENTING: Ubah angka ini sesuai jumlah kelas pada dataset kayu kamu!
num_classes_kayu = 10 
kayu_model.classifier[3] = torch.nn.Linear(kayu_model.classifier[3].in_features, num_classes_kayu)

# Load bobot (weights) model kayu
kayu_model.load_state_dict(torch.load(os.path.join(MODEL_DIR, 'ModelKayu_MobileNetV3.pth'), map_location=device))
kayu_model.to(device)
kayu_model.eval()

# 3. Daftar Spesies (CLASSES)
CLASSES = {
    'hoya': ['Australis', 'Carnosa', 'Kerrii'], 
    'plankton': [
        "Coscinodiscus oculus-iridis", "Diatom", "Guinardia flaccida", "Hemiaulus hauckii", 
        "Hemiaulus membranaceus", "Mastogloia sp", "Nitzschia", "Nitzschia longissima", 
        "Plagiotropis lepidoptera", "Pleurosigma", "Proboscia alata", "Proboscia indica", 
        "Pseudo-nitzschia spp", "Pseudosolenia calcar-avis", "Rhizosolenia calcar-avis", 
        "Rhizosolenia cochlea", "Rhizosolenia imbricata", "Tetramphora (Amphora) decussata", 
        "Thalassionema nitzschioides", "Toxarium undulatum"
    ],
    'kayu': ['Jati', 'Mahoni', 'Sengon', 'Meranti', 'Jenis5', 'Jenis6', 'Jenis7', 'Jenis8', 'Jenis9', 'Jenis10'] 
}

# Transformasi khas untuk PyTorch
kayu_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'Tidak ada gambar yang diunggah'}), 400

    file = request.files['image']
    category = request.form.get('category', '').lower()

    if category not in ['hoya', 'plankton', 'kayu']:
        return jsonify({'error': 'Kategori tidak valid. Pilih hoya, plankton, atau kayu.'}), 400

    # Simpan sementara di folder temp
    temp_dir = os.path.join(BASE_DIR, "temp")
    os.makedirs(temp_dir, exist_ok=True)
    img_path = os.path.join(temp_dir, secure_filename(file.filename))
    file.save(img_path)

    try:
        if category in ['hoya', 'plankton']:
            # Pengecaman menggunakan TensorFlow
            img = tf_image.load_img(img_path, target_size=(224, 224))
            img_array = tf_image.img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)

            model = hoya_model if category == 'hoya' else plankton_model
            predictions = model.predict(img_array)
            pred_index = np.argmax(predictions[0])

        elif category == 'kayu':
            # Pengecaman menggunakan PyTorch
            img = Image.open(img_path).convert('RGB')
            img_tensor = kayu_transform(img).unsqueeze(0).to(device)

            with torch.no_grad():
                outputs = kayu_model(img_tensor)
                _, preds = torch.max(outputs, 1)
                pred_index = preds.item()

        # Ambil nama spesies
        category_classes = CLASSES[category]
        result_class = category_classes[pred_index] if pred_index < len(category_classes) else "Spesies Tidak Diketahui"

        return jsonify({
            'success': True,
            'prediction': result_class,
            'category': category
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
        
    finally:
        # Hapus file gambar sementara agar memori tidak penuh
        if os.path.exists(img_path):
            os.remove(img_path)

if __name__ == '__main__':
    print("🚀 API AI BioNusantara siap digunakan di http://localhost:5000")
    app.run(port=5000, debug=True)