const {
    app, 
    apiPath,
    models:{Login},
    
} = require('rohit-node-app');

app.post(apiPath(__filename), async function(req, res){
 
    const {
        name,
        email,
        password,
        confirm_password
        } = req.body;
        console.log( 'password',password, 'confirm_password',confirm_password );
        
        let confirm = confirm_password 
    let err = [];

    if(!name){
        err.push('Name is required');
    }


    if(!email){
        err.push('Email is required');
    }
    else {
        // Check if the email already exists in the database
        let existingUser = await Login.findOne({ where: { email } });
        if (existingUser) {
            err.push('Email is already in use');
        }
    }
    if(!password){
        err.push('Email is required');
    }
    if(password !== confirm_password){
        err.push('Password and Confirm Password should be same');
        }

    if(err.length){
        let result = {
            swal: {
                icon:'error',
                title:'Error',
                html:err.join('<br>'),
                keydownListenerCapture:true
            }
        }
        res.json(result);
    }else{
        let user = await Login.create({
            name,
            email,
            password,
            confirm
        });

        let result = {
            swal: {
                icon:'success',
                title:'Success',
                html:'User created',
            },
            redirect:'/',

        }
        res.json(result);
    }
});