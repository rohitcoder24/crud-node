const {
  app, 
  apiPath,
  models:{ User },
} = require('rohit-node-app');
app.post(apiPath(__filename), async function (req, res) {
  const { name, mobile, email } = req.body;

  let id = req.query.id;

  let err = [];

  if (!name) {
    err.push("Name is required");
  }

  if (!mobile) {
    err.push("Mobile is required");
  }

  if (!email) {
    err.push("Email is required");
  }

  if (err.length) {
    let result = {
      swal: {
        icon: "error",
        title: "Error",
        html: err.join("<br>"),
        keydownListenerCapture: true,
      },
    };
    res.json(result);
  } else {
    let user = await User.findByPk(id);
    if (!user) {
      let result = {
        swal: {
          icon: "error",
          title: "Error",
          html: "User not found",
          keydownListenerCapture: true,
        },
      };
      res.json(result);
    } else {

        user.name = name;
        user.mobile = mobile;
        user.email = email;

        await user.save();

      let result = {
        user,
        // row:`<tr><td>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td></tr>`,
        updateRowTable: "#users-table tbody",
        swal: {
          icon: "success",
          title: "Success",
          html: "User Updated",
          keydownListenerCapture: true,
        },
        modalHide: "#user-modal",
      };
      res.json(result);
    }
  }
});
