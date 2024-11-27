from flask import Flask, jsonify, request, send_file
from pymongo import MongoClient
from gridfs import GridFS
from io import BytesIO

app = Flask(__name__)

# MongoDB Atlas 연결 설정
client = MongoClient("mongodb+srv://songcb98:R8xpDaL4nVtuHlSO@potholejnu.hqbau.mongodb.net/?retryWrites=true&w=majority&appName=potholejnu")
db = client["pothole"]
fs = GridFS(db)
gps_collection = db["gps"]  # GPS 데이터를 저장하는 컬렉션 이름

# GPS 데이터 및 관련 이미지 정보 제공 API
@app.route("/markers", methods=["GET"])
def get_markers():
    try:
        # GPS 데이터 가져오기
        markers = gps_collection.find({}, {"_id": 0, "filename": 1, "content": 1, "related_image_id": 1})
        marker_list = []

        for marker in markers:
            # 관련 이미지 ID로 이미지 파일명 가져오기
            related_image = fs.find_one({"_id": marker["related_image_id"]})
            if related_image:
                marker["image_filename"] = related_image.filename
            marker_list.append(marker)

        return jsonify({"success": True, "markers": marker_list})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

# 특정 이미지 반환 API
@app.route("/image/<filename>", methods=["GET"])
def get_image(filename):
    try:
        # GridFS에서 이미지 가져오기
        file = fs.find_one({"filename": filename})
        if file:
            return send_file(BytesIO(file.read()), mimetype="image/jpeg")
        else:
            return jsonify({"success": False, "error": "Image not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

# Google Cloud Run 배포용 기본 엔드포인트
@app.route("/", methods=["GET"])
def home():
    return "Flask App Running on Google Cloud Run!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
