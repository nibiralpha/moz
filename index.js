const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const dataModel = require('./model/dataModel');
const keywordModel = require('./model/keywordModel');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

io.on('connection', data => {
    // console.log();
});

io.on('event', data => {
    // console.log(data);
});

io.on('disconnect', data => {
    // console.log(data);
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
    // console.log(req.body);
    if (data !== undefined) {

        keywordModel.find({}, { keyword: 1, _id: 0 }, (err, allkeywords) => {

            mappedKey = allkeywords.map(key => key.keyword)
            uniqKey = data.filter(function (item) {
                return !mappedKey.includes(item.keyword);
            })

            keywordModel.insertMany(uniqKey, (err, succ) => {
                if (err) console.log(err);
            });

        })
    }
})

app.get('/home', function (req, res) {
    // let data = req.body;
    keywordModel.find({ c: false }, (err, keywors) => {
        // console.log(keywors);

        if (err) throw err;
        res.status(200).json({ keywords: keywors });
    })
})

app.get('/report', function (req, res) {
    let da = 30;
    let min = 1;
    let max = 8;
    // let countChild = "4,5,6,7";
    // let condition = "less";
    let newArray = [];
    // let count = 0;

    dataModel.findWithOptions({}, {_id: 0, __v: 0}, {lean: true}, (err, datas) => {
        if (err) console.log(err);
        // console.log(datas);
        
        datas.forEach(data => {
            let count = 0;
            if (data.data.length > 0) {
                data.data.forEach(child => {
                    if (child.da < da) {
                        count++;
                    }
                })
            }
            if (count >= min && count <= max) {
            // if (count > 1) {
                data.daCount = count;
                newArray.push(data);
                // return;  
            }
        });
        
        // console.log(datas.length);
        if(newArray.length < 1){
            return res.status(200).json({ report: "nothing found with DA less then " + da + " min count: " + min + " max: " + max });    
        }
        res.status(200).json({ report: newArray });
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
