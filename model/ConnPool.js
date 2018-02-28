var mySql = require("mysql");
module.exports = (function () {
    var flag=true;
    var conn = mySql.createPool({
        host: 'localhost',       //主机
        user: 'root',               //MySQL认证用户名
        password: '123456',        //MySQL认证用户密码
        database: 'segment',
        port: '3306'                   //端口号
        }
    );
    conn.on('connection', function(connection) {
        connection.query('SET SESSION auto_increment_increment=1');
        this.flag=false;
    });
    return function () {
        return conn;
    }
})()