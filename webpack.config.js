const configDev = require('./config/webpack.dev');
const configProd = require('./config/webpack.prod');

switch (process.env.NODE_ENV) {
    case 'development':
        module.exports = configDev;
        break;
    case 'production':
        module.exports = configProd;
        break;
    default:
        module.exports = configDev;
}
