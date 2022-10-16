path = require('path');
const dotenv = require('dotenv');
const DOTENV_PATH = path.resolve(process.cwd(), 'test/.env');
dotenv.config({path: DOTENV_PATH});
console.info(`.env file loaded from ${DOTENV_PATH}`);
