import sys
import random
import requests
import logging
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
app = Flask(__name__, static_folder="static")
app.logger.setLevel(logging.INFO)


client = MongoClient(
    "mongodb+srv://sparta:test@cluster0.8bt9azj.mongodb.net/?retryWrites=true&w=majority"
)
db = client.dbsparta

#메인 페이지 로딩
@app.route("/")
def home():
    return render_template("index.html")

#상세 페이지 로딩
@app.route("/Detail.html")
def detail_page():
    return render_template("Detail.html")

# 댓글 저장
@app.route("/comments", methods=["POST"])
def save_comment():
    author = request.form.get("author")
    password = request.form.get("password")
    text = request.form.get("comment")
    movie_id = request.form.get("movieId")
    cid = random.random()

    comment = {
        "movieId": movie_id,
        "commentId": cid,
        "password": password,
        "author": author,
        "text": text
    }

    db.comments.insert_one(comment)
    return jsonify({"msg": "저장완료"})
    

@app.route("/comments", methods=["GET"])
def get_comments():
    movieId = request.args.get("id")
    print(movieId)
    comments = list(db.comments.find({"movieId": movieId}))
    return jsonify(comments)


if __name__ == "__main__":
    app.run("0.0.0.0", port=5001, debug=True)
