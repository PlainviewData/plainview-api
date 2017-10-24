import * as fs from 'fs';

export class databaseConfig{
    public database_username: string;
    public database_password: string;
    public database_url: string;
    public database_name: string;
    public database_uri: string;
    private DB_CONFIG_OUTPUT_FILE_PATH = './dist/config/database.json';
    
    constructor() {
        const db_config = JSON.parse(fs.readFileSync(this.DB_CONFIG_OUTPUT_FILE_PATH, 'utf8'));
        this.database_username =  db_config['database_username'];
        this.database_password = db_config['database_password'];
        this.database_url = db_config['database_url'];
        this.database_name = db_config['database_name'];
        this.database_uri = 'mongodb://'+this.database_username+':'+this.database_password+'@'+this.database_url+'/'+this.database_name;;
    }
};