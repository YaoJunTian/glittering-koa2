const path = require('path');
module.exports = {
    "appenders": {
        "error": {
            "type": "dateFile",
            "filename": path.join(__dirname,'../logs/request'),
            "alwaysIncludePattern": true,
            "compress": true,
            "pattern": "-yyyy-MM-dd.log",
            "encoding": "utf-8",
            "category": "error"
        }
    },
    "categories": {
        "default":{
            "appenders": ["error"],
            "level": "all"
        },
        "请求故障": {
            "appenders": ["error"],
            "level": "all"
        }
    }
}