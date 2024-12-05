const {
  app,
  apiPath,
  models: { Login },
} = require("rohit-node-app");
const jwt = require('jsonwebtoken');


app.post(apiPath(__filename), async function (req, res) {
  const { username, password } = req.body;


  let err = [];
  const user = await Login.findOne({ where: { email: username } });

  // Validate inputs
  if (!username) {
    err.push("Username (email) is required");
  } else if (!user) {
    err.push("No user found with this email");
  } else {
    // Check if the password matches (you may want to use bcrypt to compare hashed passwords)
    const isPasswordCorrect = user.password === password;

    if (!password) {
      err.push("Password is required");
    } else if (!isPasswordCorrect) {
      err.push("Incorrect password");
    }
  }
  const JWT_SECRET = 'your-secret-key';
  const token = jwt.sign({ username:username }, JWT_SECRET, {
    expiresIn: '24h'
});
res.cookie('jwt', token, {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});


  // If there are any validation errors, return them
  if (err.length) {
    let result = {
      swal: {
        icon: "error",
        title: "Error",
        html: err.join("<br>"),
        keydownListenerCapture: true,
      },
    };
    return res.json(result);
  } else {
    res.json({
      swal: {
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer:3000,
        timerProgressBar: true,
        icon: "success",
        title: "Signed in successfully",
      }.then,

      redirect:'/users'
    });
  }
});
