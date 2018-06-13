module.exports = {
    test : {
        method: 'POST',
        uri: 'http://localhost:8080/spitdata',
        json: true,
        qs:{
            name: '发起请求',
            uese:'yaojuntian'
        }
    }
}