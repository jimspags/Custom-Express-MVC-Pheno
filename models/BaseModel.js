// Base model
class BaseModel {
    constructor(table) {
        // Require mysql node module
        this.mysql = require("mysql");

        // Require config file
        this.config = require("../config");

        // Set connection
        this.connection = this.connectionString();

        // Connect
        this.connection.connect(function(err) {
            if (err) throw err;
        });

        // Set table name
        this.table = table;
    }

    // Create connection then pass to this.connection variable
    connectionString() {
        return this.mysql.createConnection({
            // Credentials from config
            "host": this.config.db_localhost,
            "user": this.config.db_username,
            "password": this.config.db_password,
            "database": this.config.db_database,
            "port": this.config.db_port
        });
    }

    // Execute any query
    executeQuery(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, function(error, result) {
                resolve(result);
            });
        })
    }

    // Fetch all from table
    async fetchAll() {
        var query = `SELECT * FROM ${this.table}`;
        var result = await this.executeQuery(query);
        return result;
    }


}

module.exports = BaseModel;

