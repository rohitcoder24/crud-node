const {
    app, 
} = require('rohit-node-app');

app.get('/', function(req, res){
    res.render('loginuser');
});