const {
    app, 
} = require('rohit-node-app');

app.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});