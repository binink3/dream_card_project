from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)
client = MongoClient('mongodb://localhost', 27017)
db = client.dreamCard                    # 'dreamCard'라는 이름의 db를 만듭니다.



## HTML을 주는 부분
@app.route('/')
def home():
   return render_template('index.html')


#검색창에 클라이언트가 입력을 하면, 그때 자동완성 List 띄어주는 API
@app.route('/county', methods=['GET'])
def restaurants_names_list():
    result = list(db.county_files.find({'restaurant_name': 1}, {'_id': 0}))  # 필터링 리스트
    return jsonify(result)



#검색한 펀드의 운용역 이름이 포함된 List를 불러오는 API
@app.route('/county', methods=['POST'])
def restaurants_infos_lists():
    county_name_receive = request.form['county_name_give']
    county_name = county_name_receive.split('.')[1]
    restaurant_name =
    target_restaurant_info = db.county_files.find_one({'restaurant_name': restaurant_name}, {'_id':0})

    restaurant_name_info = list(db.county_files.find({'restaurant_name':target_restaurant_info['restaurant_name']}, {'_id':0}))
    return jsonify(restaurant_name_info)

#Port를 설정하는 Coding
if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)


#책임 운용사, 투자일, 회수일, 수익률 front ajax 들어감