
import pandas as pd
import numpy as np
import pymongo
from flask import Flask, render_template
from flask import jsonify
import json
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from bson.json_util import dumps
import bson.json_util as json_util
import quandl

# API keys
quandl.ApiConfig.api_key = 'n8ytM4yxbemwLYG_yrRa'

client = pymongo.MongoClient("mongodb+srv://randypayano:maldito1@cluster0-jvv32.mongodb.net/test?retryWrites=true&w=majority")
db = client.project
app = Flask(__name__, static_url_path='')
app.config["MONGO_URI"] = "mongodb+srv://randypayano:maldito1@cluster0-jvv32.mongodb.net/test?retryWrites=true&w=majority"
mongo = PyMongo(app)



def pull_data():
    info_mongodbpairs = pd.read_csv('data/info_mongodbpairs.csv')
    info_mongodbpairs = info_mongodbpairs.iloc[:,1:]
    list_of_dicts = []
    info_mongodbpairs = info_mongodbpairs.transpose() 
    info_mongodbpairs = info_mongodbpairs.to_dict()
    list_of_dics = [value for value in info_mongodbpairs.values()]
    return list_of_dics



db.pairsdata.insert_many(pull_data())




@app.route("/")
def home_page():
        
   
    return render_template("index.html")

@app.route('/names')
def names():

    allData = db['pairsdata'].find()
    dataJson = []
    for data in allData:
        ticker = data['ticker']
        
       
        dataDict = {
         
            'ticker': ticker,
        
                     
        }
        dataJson.append(dataDict)
    

    dump_it = json.dumps(dataJson)
    replace_nan = dump_it.replace("NaN", str('".000"'))
    dataJson = json.loads(replace_nan)
   
    dataJson= pd.DataFrame(dataJson) 
    dataJson = dataJson['ticker']
   
    return jsonify(list(dataJson))


@app.route('/namess')
def namess():

    allData = db['pairsdata'].find()
    dataJson = []
    for data in allData:
        ticker = data['ticker']
        
       
        dataDict = {
         
            'ticker': ticker,
        
                     
        }
        dataJson.append(dataDict)
    

    dump_it = json.dumps(dataJson)
    replace_nan = dump_it.replace("NaN", str('".000"'))
    dataJson = json.loads(replace_nan)
   
    dataJson= pd.DataFrame(dataJson) 
    dataJson = dataJson['ticker']
   
    return jsonify(list(dataJson))
    

 # Return MetaData for specific sample
@app.route("/metadata/<sample>")
def sample_metadata(sample):
    """Return individual sample"""
    

    
    allData = db['pairsdata'].find({"ticker": sample})
    dataJson = []
    for data in allData:
        ticker = data['ticker']
        exchange = data['exchange']
        name = data['name']
        category = data['category']
        location = data['location']
        companysite = data['companysite']
        scalerevenue = data['scalerevenue']
        scalemarketcap = data['scalemarketcap']
        sector = data['sector']
       
        dataDict = {
            'Exchange': exchange,
            'Company': name,
            'Category': category,
            'Location': location,
            'Web site': companysite,
            'Revenue': scalerevenue,
            'Market Cap': scalemarketcap,
            'Sector': sector
                     
        }
        dataJson.append(dataDict)
    

    dump_it = json.dumps(dataJson)
    replace_nan = dump_it.replace("NaN", str('".000"'))
    dict_metadata = json.loads(replace_nan)
   
    return jsonify(dataDict)




 # Return news for specific sample
@app.route("/newsdata/<sample>")
def newsdata(sample):
    """Return individual sample"""
    

    
    allData = db['pairsdata'].find({"ticker": sample})
    dataJson = []
    for data in allData:
        ticker = data['ticker']
        exchange = data['exchange']
        name = data['name']
        category = data['category']
        location = data['location']
        companysite = data['companysite']
        scalerevenue = data['scalerevenue']
        scalemarketcap = data['scalemarketcap']
        sector = data['sector']
       
        dataDict = {
            'ticker': ticker,
            'exchange': exchange,
            'name': name,
            'category': category,
            'location': location,
            'companysite': companysite,
            'scalerevenue': scalerevenue,
            'scalemarketcap': scalemarketcap,
            'sector': sector

                     
        }
        dataJson.append(dataDict)
    

    dump_it = json.dumps(dataJson)
    replace_nan = dump_it.replace("NaN", str('".000"'))
    dict_metadata = json.loads(replace_nan)
   
    return jsonify(dataDict)












if __name__ == '__main__':
    app.run(debug=True)


