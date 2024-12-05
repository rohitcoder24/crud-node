const {
    app, 
    apiPath,
    models:{ User },
    authenticateToken
} = require('rohit-node-app');

app.get('/users', authenticateToken , async function (req, res) {
  
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 


    const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            limit: limit,
            offset: offset,
        });

        const totalPages = Math.ceil(count / limit);

        res.render('users',{
            users: rows,
            currentPage: page,
            totalPages: totalPages,
            totalUsers: count,
        });
    }
  
);
