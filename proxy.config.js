const proxy = [
    {
        context: '/api',
        target: 'http://localhost:8090',
        pathRewrite: {'^/api' : ''},
        "timeout": 36000000
    }
];
module.exports = proxy;