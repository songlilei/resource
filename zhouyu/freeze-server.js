const express = require('express');
const fs = require('fs');
const app = express();
const log = console.log;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(function (req, res, next) {
    // res.setHeader('content-type', 'text/json');
    res.setHeader('Content-Type', 'text/json; charset=utf-8');
    // log(res.getHeader('Content-Type'));
});

//处理李娜的数据
const ticketsJsonStr = fs.readFileSync('lina.d/tickets.json', 'utf-8');
const ticketsAry = JSON.parse(ticketsJsonStr);
app.get('/lina', function (req, res) {
    console.log('lina');
    res.send('lina');
    // const pathname = req.pathname;
    // const id = pathname.replace('^/', '');
    // log(id);
    if (/lina\/^\d+$/.test(id)) {
        const ticketObj = ticketsAry.filter((ticket)=>{
            return ticket.id;
        });
        const ticketJsonStr = JSON.stringify(ticketObj);
        log(ticketJsonStr);
        res.send(ticketJsonStr);
    } else if (id === 'lina/all') {
        res.send(ticketsJsonStr);
    }
});

//处理付瑶的数据
const userInfoJsonStr = fs.readFileSync('fuyao.d/users.json', 'utf-8');
const userInfoAry = JSON.parse(userInfoJsonStr);
app.post('/fuyao/:pid', function (req, res) {
    const pathname = req.pathname;
    const pid = pathname.replace('/', '');
    if (/^\d{11}$/.test(pid)) {
        const userObj = userInfoAry.filter((user) => {
            return user.pid = pid;
        });
        const userJsonStr = JSON.stringify(userObj);
        res.send(userJsonStr);
    } else if (pid === 'all') {
        res.send(userInfoJsonStr);
    }
});

const port = 50907;
let host = 'icccc.cc';
host = 'localhost';
const server = app.listen(port, function () {
    console.log('Example app listening at http://%s:%s', host, port);
});