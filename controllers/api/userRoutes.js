const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    const { message } = err;
    if (message === "Validation error") {
      res.status(400).json(err);
    }
    res.status(500).json(err);
  }
});

// log in for post route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // if not logged in give 400 err
    const validPwd = await userData.checkPassword(req.body.password);

    if (!validPwd) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // if you were able to login give 200 ok
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json({
        user: userData,
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// created this for logging out
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
