const {app} = require('rohit-node-app');
const ok = require('./rohit-console');
const requireDir = require('require-dir');


requireDir('./controllers', {recurse:true});

app.listen(3000, function(){
    console.log('SERVER RUNNING'); 
});