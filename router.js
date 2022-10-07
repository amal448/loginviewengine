var express = require("express");
var router = express.Router();


//route for dashboard
router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.redirect("/login");
    //action from form
  }
});

const credential = {
  email: "admin@gmail.com", 
  password: "1234",
};

router.get("/login", (req, res) => {
  //user undo nokkuka action nill
  if (req.session.user) {
    res.redirect("/");    //undakill work cheyyum
  } else {
    res.render("base", { title: "loginSystem" });  //ilakkill ithe work cheyyyum
  }
});

router.post("/login", (req, res) => {
  
  if (
    req.body.email == credential.email && req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/login");
  } else {
    console.log(req.body.email);
    errmsg="Invalid Username or Password"
    res.render("base", {err_msg:errmsg})
  }
});

//route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;