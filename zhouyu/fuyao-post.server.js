const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.urlencoded({extended: true}));

app.post('/urlencode', function (req, res) {
    console.log();
    res.send({j: req.body, x: 1});
});


//处理付瑶的数据
const userInfoJsonStr = fs.readFileSync('fuyao.d/users.json', 'utf-8');
const userInfoAry = JSON.parse(userInfoJsonStr);
app.post('/fuyao', function (req, res) {
    const pid = req.body.pid;
    console.log(pid);
    if (/^\d{11}$/.test(pid)) {
        const userObj = userInfoAry.filter((user) => {
            return user.pid === pid;
        });
        const userJsonStr = JSON.stringify(userObj);
        console.log(userJsonStr);
        res.send(userJsonStr);
    } else if (pid === 'all') {
        res.send(userInfoJsonStr);
    }else{
        res.send({abc:`
        Not Found. You must post a json string,
        which can be convert to a Object with a pid property,
        the value of this pid must be a number (11 bit),
        this pid represents a moble phone number.
        `});
    }
});

const PORT = process.env.PORT || 10907;
server.listen(PORT, function () {
    console.log(`
    ${__filename} has run as a nodejs server,
    and has been listening at ${PORT} port.
    `);
});