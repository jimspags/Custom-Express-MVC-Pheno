// Base model
class BaseModel {
    constructor(table) {
        // Set table name
        this.table = table;

        // Require mysql node module
        this.mysql = require("mysql");

        // Require config file
        this.config = require("../config");

        // Set connection
        this.connection = this.connectionString();

        // Connect
        this.connection.connect(function(error) {
            if (error){
                console.error(error);
            }
        });
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
                if(error) {
                    reject(error)
                } else {
                    resolve(result);
                }
            });
        })
    }

    // Query functions can be used
    // Get all data
    fetchAll() {
        try {
            var query = `SELECT * FROM ${this.table}`;
            return this.executeQuery(query);
        } catch(error) {
            console.error(error);
        }
    }

    // Get data by id
    fetchById(id) {
        try {
            var query = `SELECT * FROM ${this.table} WHERE id = ${id}`;
            return this.executeQuery(query);
        } catch(error) {
            console.error(error);
        } 
    }


}

module.exports = BaseModel;

