import requests

api_key = "2729f7e2011b43d7be77e7b60bc97701" 

print("Topic:")
topic = input()
print("Date (YYYY-MM-DD):")
date = input()
print(topic)

url = ('https://newsapi.org/v2/everything?'
       'q=' + topic + '&'
       'from=' + date + '&'
       'sortBy=popularity&'
       'apiKey='+ api_key)

print(url)
response = requests.get(url)

print (response.json())
