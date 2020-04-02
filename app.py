from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)
client = MongoClient('localhost', 27017)
db = client.dreamCard                    # 'dreamCard'라는 이름의 db를 만듭니다.



#HTML을 주는 부분
@app.route('/')
def home():
   return render_template('index.html')


#검색창에 클라이언트가 입력을 하면, 그때 자동완성 List 띄어주는 API



#검색한 펀드의 운용역 이름이 포함된 List를 불러오는 API
@app.route('/county', methods=['GET'])
def dreamCard_get():
    restaurant_name = request.args.get('restaurant_name_give')
    print(restaurant_name)
    restaurant_find = db.county_files.find_one({'restaurant_name': restaurant_name}, {'_id':0})
    return jsonify({'result': 'success', 'info': restaurant_find})



@app.route('/county', methods=['POST'])
def dreamCard_post():
    restaurant_name = request.form['restaurant_name_give']
    print(restaurant_name)
    return jsonify({'result': 'success', 'msg': 'post 됌'})


if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)