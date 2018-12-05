const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const dataModel = require('./model/dataModel');
const keywordModel = require('./model/keywordModel');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/app', function (req, res) {

    let data = req.body.resources;
    console.log(data);

    dataModel.create(data, (err, succ) => {
        if (err) console.log(err);

        console.log(succ);
    });
    // dataModel.insertMany(data, (err, succ) => {
    //     if (err) console.log(err);

    //     console.log(succ);
    // });
    // res.send('hello world')
})

app.post('/keyword', function (req, res) {

    let data = req.body.keywords;
    // console.log(data);
    // console.log(data.length);

    keywordModel.insertMany(data, (err, succ) => {
        if (err) console.log(err);

        // console.log(succ);
    });
    res.send('hello world')
})

server.listen(3000);
