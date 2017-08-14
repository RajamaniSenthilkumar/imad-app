var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles ={
    'article-one': {
        title:'Article One | Rajamani',
        heading: 'Article One',
        date:'8th Aug, 2017',
        content:`
                    <p>
                        This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    </p>
                    
                    <p>
                        This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    </p>
                    
                    <p>
                        This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
                `
    },
    'article-two':{
        title:'Article Two | Rajamani',
        heading: 'Article Two',
        date:'9th Aug, 2017',
        content:`
                <p>
                    This is the content of my second article. This is the content of my second article. This is the content of my second article. 
                </p>
                
                <p>
                    This is the content of my second article. This is the content of my second article. This is the content of my second article. 
                </p>
                `
    },
    'article-three':{
        title:'Article Three | Rajamani',
        heading: 'Article Three',
        date:'10th Aug, 2017',
        content:`
                <p>
                    This is the content of my Third article. 
                </p>
                `
    }
};

function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewpoint" content="width-device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
    </html>
    `;
    return htmlTemplate;
}

var counter =0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//app.get('/article-one',function(req,res){
//    res.sendfile(path.join(__dirname, 'ui', 'article-one.html'));
//    res.sendfile('article-one.html');

app.get('/:articleName',function(req,res){
//        res.send(createTemplate(articleOne));
        var articleName = req.params.articleName;
        res.send(createTemplate(articles[articleName]));
});

//app.get('/article-two',function(req,res){
//    res.send('Article two requested and will be served here');
//    res.sendfile(path.join(__dirname, 'ui', 'article-two.html'));
//});

//app.get('/article-three',function(req,res){
//    res.sendfile(path.join(__dirname, 'ui', 'article.three.html'));
//});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/Rajamani.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Rajamani.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
