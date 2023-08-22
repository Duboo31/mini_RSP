from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
client = MongoClient(
    "mongodb+srv://sparta:test@cluster0.svk42ds.mongodb.net/?retryWrites=true&w=majority"
)
db = client.dbRSP
RSP = db.RSP
app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("index.html")


# 생성 post 요청
@app.route("/score", methods=["POST"])
def scroe_create():
    winCnt_receive = request.form["winCnt_give"]
    loseCnt_receive = request.form["loseCnt_give"]
    tieCnt_receive = request.form["tieCnt_give"]

    all_score = list(RSP.find({}, {"_id": False}))

    doc = {
        "winCnt_receive": winCnt_receive,
        "loseCnt_receive": loseCnt_receive,
        "tieCnt_receive": tieCnt_receive,
    }

    print("?? allsocre: ", all_score)

    if len(all_score) < 10:
        RSP.insert_one(doc)
        print("post 스코어 저장", doc)
        return jsonify({"msg": "app.py > post 요청 create"})
    else:
        return jsonify({"msg": "이미 10개참"})


# 읽기 get 요청
@app.route("/getScore", methods=["GET"])
def toDo_get():
    all_score = list(RSP.find({}, {"_id": False}))

    return jsonify({"allScore": all_score})


# 삭제 delete 요청
@app.route("/resetScore", methods=["DELETE"])
def score_reset():
    RSP.delete_many({})
    return jsonify({"msg": "스코어 초기화"})


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
