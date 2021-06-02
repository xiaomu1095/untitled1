// var http = require('http');
//
// http.createServer(function (request, response) {
//     // 发送 HTTP 头部
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);
//
// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

//express_demo.js 文件
var mysqlPool = require('./mysqlPool') //换成连接池
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})
app.post('/', function (req, res) {
    res.send('Hello World');
})

app.get('/messageList', function (req, res, next) {
    var tableName = 'message'
    console.log(req.query)
    console.log(req.params)
    var num = req.query.num;
    var page = req.query.page;
    var sqlTest = `select * from ${tableName} order by id desc limit ${num * page},${num}`
    var sql = `select * from message order by id desc`
    mysqlPool(sql)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send("请求错误");
        })
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})