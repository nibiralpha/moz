const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const dataModel = require('./model/dataModel');
const keywordModel = require('./model/keywordModel');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

io.on('connection', data => {
    console.log();
});

io.on('event', data => {
    console.log(data);
});

io.on('disconnect', data => {
    console.log(data);
});

app.use(cors());

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.post('/app', function (req, res) {

    let data = req.body.resources.dataInfo;
    // console.log(data);
    fs.readFile(__dirname + '/tmp/id', 'utf8', function (err, content) {
        if (err) throw err;

        dataModel.create(data, (errD, succ) => {
            if (errD) {
                console.log(errD);
            }

            keywordModel.update({ "_id": content }, { c: true }, (errC, updateC) => {
                if (errC) console.log(errC);
                return res.status(200).json({ id: content });
            })
        });
    });
})

app.post('/keyword', function (req, res) {

    let data = req.body.keywords;
    // console.log(data);
    // console.log(data.length);

    keywordModel.find({}, { keyword: 1, _id: 0 }, (err, allkeywords) => {
        // console.log("allkeywords", allkeywords);
        // console.log("data", data);

        mappedKey = allkeywords.map(key => key.keyword)
        uniqKey = data.filter(function (item) {
            return !mappedKey.includes(item.keyword);
        })

        // console.log("uniqKey", uniqKey);
        
        
        keywordModel.insertMany(uniqKey, (err, succ) => {
            if (err) console.log(err);
        });

    })
})

app.get('/home', function (req, res) {
    // let data = req.body;
    keywordModel.find({ c: false }, (err, keywors) => {
        if (err) throw err;
        res.status(200).json({ keywords: keywors });
    })
})

app.post('/saveid', function (req, res) {

    let data = req.body;
    // console.log(data);

    fs.writeFile(__dirname + "/tmp/id", data.id, function (err) {
        if (err) {
            console.log(err);
            return res.status(200).json({ id: null });
        }
        return res.status(200).json({ id: data.id });
    });
})

server.listen(3000);
