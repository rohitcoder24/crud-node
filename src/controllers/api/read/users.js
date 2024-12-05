const {
    app, 
    apiPath,
    models:{ User },
} = require('rohit-node-app');
app.get(apiPath(__filename), async function(req, res){
    let users = await User.findAll({
        // attributes:[`id`,`name`,`mobile`,`email`]
        attributes:{
            exclude:['createdAt','updatedAt']
        }
    });
    return res.json({users});
});