const {
    app, 
    apiPath,
} = require('rohit-node-app');
app.get(apiPath(__filename), function(req, res){
    res.send('About Page');
});