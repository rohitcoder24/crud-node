const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const models = require('./models');
const apiPath = require('easy-api-path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
 const JWT_SECRET = 'your-secret-key';


app.set('view engine','ejs');
app.set('views','./src/views');
app.use(express.static('./assets'));


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(fileUpload({
    userTempFiles:true,
    preserveExtention:true,
    parseNested:true
}));
const authenticateToken = (req, res, next) => {

    const token = req.cookies.jwt;
    console.log(token);
    
    
    if (!token) {
        return res.redirect('/');
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/');
        }
        req.user = user;
        next();
    });
};
// app.get('/logout', (req, res) => {
//     res.clearCookie('jwt');
//     res.redirect('/login');
// });

module.exports = {
    app,
    models,
    apiPath,
    authenticateToken
};