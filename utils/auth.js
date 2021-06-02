const session = require("express-session");
// if not logged in redirect
const withAuth = (req, res, next) => {
  //  redirect if not logged in
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
