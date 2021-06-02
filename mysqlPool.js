var mysql = require('mysql');
// var db = require('./db');

// 封装一下直连接数据库的封装方法，
module.exports = function (sql) {
    return new Promise((resolve, reject) => {
        // 一、创建连接
        var connection = mysql.createConnection({
            host:'127.0.0.1',
            user:'user',
            password:'123456',
            port:3306,
            database:'test'
        });
        // 二、连接数据库
        connection.connect(function (err) {
            if (err) {
                console.error('连接失败' + err);
                return;
            }
        });
        // 三、对数据表操作
        connection.query(sql, function (err, results, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
        // 四、关闭连接
        connection.end();
    })
}

