const Mysql = require('mysql');

class mysqlConnection {
    static getConnection() {
        return Mysql.createConnection({
            // Datos de conexi�n
            host: 'localhost',
            user: 'root',
            password: 'mysql',
            database: 'agenciaAPP'
        })
    }
}



module.exports = mysqlConnection;