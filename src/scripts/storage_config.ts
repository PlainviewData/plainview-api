import * as commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as mongoose from 'mongoose';

const DB_CONFIG_TEMPLATE_FILE_PATH = './dist/etc/templates/database_config.template.json';
const AWS_S3_CONFIG_TEPMPLATE_FILE_PATH = './dist/etc/templates/aws_s3_config.template.json';

const DB_CONFIG_OUTPUT_FILE_PATH = './dist/config/database.json';
const AWS_S3_CONFIG_OUTPUT_FILE_PATH = './dist/config/aws_s3.json';

const requiredArguments = [
  'DB_URL', 
  'DB_USERNAME', 
  'DB_PASSWORD',
  'DB_NAME',
  'AWS_ACCESS_KEY',
  'AWS_SECRET_KEY',
  'AWS_S3_URL',
  'S3_BUCKET'
];

const optionDefinitions = [
  { name: 'DB_URL', type: String },
  { name: 'DB_USERNAME', type: String },
  { name: 'DB_PASSWORD', type: String },
  { name: 'DB_NAME', type: String },
  { name: 'AWS_ACCESS_KEY', type: String },
  { name: 'AWS_SECRET_KEY', type: String },
  { name: 'AWS_S3_URL', type: String },
  { name: 'S3_BUCKET', type: String }
];

const options = commandLineArgs(optionDefinitions)

var parameterEntered = false;

for (var i=0; i<requiredArguments.length; i++){
  if (options[requiredArguments[i]] != undefined){
    parameterEntered = true;
    break;
  }
}

if (parameterEntered || (fs.existsSync(DB_CONFIG_OUTPUT_FILE_PATH) == false) || (fs.existsSync(AWS_S3_CONFIG_OUTPUT_FILE_PATH) == false)) {

  requiredArguments.forEach(function(arg){
    if (options[arg] == undefined){
      throw new Error('Missing required argument ' + arg); 
    }
  });

  var db_config_template = JSON.parse(fs.readFileSync(DB_CONFIG_TEMPLATE_FILE_PATH, 'utf8'));
  var aws_s3_config_template = JSON.parse(fs.readFileSync(AWS_S3_CONFIG_TEPMPLATE_FILE_PATH, 'utf8'));

  db_config_template['database_url'] = options['DB_URL'];
  db_config_template['database_username'] = options['DB_USERNAME'];
  db_config_template['database_password'] = options['DB_PASSWORD'];
  db_config_template['database_name'] = options['DB_NAME'];

  aws_s3_config_template['aws_access_key'] = options['AWS_ACCESS_KEY'];
  aws_s3_config_template['aws_secret_key'] = options['AWS_SECRET_KEY'];
  aws_s3_config_template['aws_s3_url'] = options['AWS_S3_URL'];
  aws_s3_config_template['s3_bucket'] = options['S3_BUCKET'];

  fs.writeFileSync(DB_CONFIG_OUTPUT_FILE_PATH, JSON.stringify(db_config_template, null, 2));
  fs.writeFileSync(AWS_S3_CONFIG_OUTPUT_FILE_PATH, JSON.stringify(aws_s3_config_template, null, 2));

}