"use strict";
const fs = require('fs');
class databaseConfig {
    constructor() {
        this.DB_CONFIG_OUTPUT_FILE_PATH = './dist/config/database.json';
        const db_config = JSON.parse(fs.readFileSync(this.DB_CONFIG_OUTPUT_FILE_PATH, 'utf8'));
        this.database_username = db_config['database_username'];
        this.database_password = db_config['database_password'];
        this.database_url = db_config['database_url'];
        this.database_name = db_config['database_name'];
        this.database_uri = 'mongodb://' + this.database_username + ':' + this.database_password + '@' + this.database_url + '/' + this.database_name;
        ;
    }
}
exports.databaseConfig = databaseConfig;
;
