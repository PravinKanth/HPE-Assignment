from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Welcome Buddy!!"

try:
    with open("hn_logs.tsv","r") as logs:
        records = []
        for i in logs:
            time, logs = i.strip().split("\t")
            records.append([time,logs])
except Exception as e:
    print("Error: Log file not found!!")
    records = []

@app.route('/1/queries/count/<date>')
def main(date):
    try:
        distinctLogs=set()
        if len(date)==4:
            for i in records:
                if date == i[0][0:4]:
                    distinctLogs.add(i[1])
            print(len(distinctLogs)) 
            return jsonify({"data":str(len(distinctLogs))}),200 
        elif len(date)==7:
            for i in records:
                if date == i[0][0:7]:
                    distinctLogs.add(i[1])
            print(len(distinctLogs)) 
            return jsonify({"data":str(len(distinctLogs))}),200

        elif len(date)==10:
            for i in records:
                if date == i[0][0:10]:
                    distinctLogs.add(i[1])
            print(len(distinctLogs)) 
            return jsonify({"data":str(len(distinctLogs))}),200
        elif len(date)==39:     
            start, end = date.split(",")
            startTime = datetime.strptime(start, "%Y-%m-%d %H:%M:%S")
            endTime = datetime.strptime(end, "%Y-%m-%d %H:%M:%S")

            for stamp,log in records:
                stampTime=datetime.strptime(stamp, "%Y-%m-%d %H:%M:%S")
                if stampTime >= startTime and stampTime<=endTime:
                    distinctLogs.add(log)
            return jsonify({"data":str(len(distinctLogs))}),200        

        else:
            return jsonify({"data": "Invalid date format!!"}),400
        
    except Exception as e:
        return jsonify({"data": "Server Error!!"}), 500    



if __name__ == '__main__':
    app.run(debug=True)
