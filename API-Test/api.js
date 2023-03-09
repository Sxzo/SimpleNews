var api_key = "2729f7e2011b43d7be77e7b60bc97701"; 

var topic = "cars";

var link = 'https://newsapi.org/v2/everything?'+
            'q=' + topic + '&'+
            'sortBy=popularity&'+
            'apiKey='+ api_key;

fetch(link).then(res => res.json()).then(data => console.log(data));

