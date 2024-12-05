const {
    app, 
    apiPath,
    models:{ User },
} = require('rohit-node-app');
app.get(apiPath(__filename), async function(req, res){
    let id = req.query.id;
    let user = await User.findByPk(id, {
        attributes:{
            exclude:['createdAt','updatedAt'] 
        }
    });

    let result = {
        formFieldValues:user,
        modalShow:"#user-modal",
        updateUrl:'user?id=' + user.id

    }
    return res.json(result);
});