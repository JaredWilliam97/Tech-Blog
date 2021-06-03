const router = require("express").Router();
const withAuth = require("../utils/auth");
const { sequelize } = require("../models/user");
const { User, Post, Comment } = require("../models");

// this will make the home page be displayed
router.get("/", async (req, res) => {
  try {
    const rawPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "created_at", "updated_at"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
          attributes: [
            "comment",
            "created_at",
            "updated_at",
            [
              sequelize.fn(
                "ifitsnull",
                sequelize.col("comments.updated_at"),
                sequelize.col("comments.created_at")
              ),
              "maxDate",
            ],
          ],
          order: ["maxDate", "DESC"],
        },
      ],
    });
    d;
    if (!rawPostData) {
      res.status(404).json({ message: "No posts found." });
    }

    const postData = rawPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      style: "postDetails.css",
      posts: postData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    style: "login.css",
  });
});

router.get("/createUser", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("createUser", {
    style: "createUser.css",
  });
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    const rawPostsData = await Post.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ["name", "created_at", "updated_at"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
          attributes: [
            "comment",
            "created_at",
            "updated_at",
            [
              sequelize.fn(
                "ifitsnull",
                sequelize.col("comments.updated_at"),
                sequelize.col("comments.created_at")
              ),
              "maxDate",
            ],
          ],
          order: ["maxDate", "DESC"],
        },
      ],
    });

    console.log("rawPostsData:", rawPostsData);
    // if(!rawPostsData) {
    //   res.status(404).json({message: "No posts found!"})
    // }
    const postData = await rawPostsData.map((post) =>
      post.get({ plain: true })
    );

    postData.forEach((post) => (post.showEdit = true));

    console.log(postData);

    res.render("dashboard", {
      style: "postDetails.css",
      posts: postData,
      loggedIn: req.session.loggedIn,
      showEdit: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
