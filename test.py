from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dreamCard                    # 'county_name': '강북구'
                                         # 'county_name': '강북구'서울 강북구 노해로 13 （수유동）
restaurants = list(db.county_files.find({'county_name': '강북구'.encode('utf-8')}))
print(restaurants)

print('강북구'.encode('cp949'))
print('강북구'.encode('euc-kr'))