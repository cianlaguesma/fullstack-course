const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");
const cors = require("./cors");
const Favorites = require("../models/favorite");
const User = require("../models/user");
const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
      .populate("user")
      .populate("dishes")
      .then(
        (fav) => {
          res.json(fav);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ dishes: { $in: req.body }, user: req.user._id })

      //check if user has favorites
      .then((favorites) => {
        console.log(req.body);
        console.log(favorites);
        if (favorites.length <= 0) {
          //checks to see if there are favorites, if yes, just push, if no, creates a new collection
          Favorites.find({ user: req.user._id })
            .populate("dishes")
            .then((favorites) => {
              if (favorites.length <= 0) {
                Favorites.create({ dishes: req.body, user: req.user._id }).then(
                  (favorite) => {
                    console.log(req.body);
                    console.log("Favorited: ", favorite);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);
                  },
                  (err) => next(err)
                );
              } else {
                console.log("Collection exists");
                req.body.user = req.user._id;
                console.log(req.body);
                Favorites.findOneAndUpdate(
                  { user: req.user._id },
                  { $push: { dishes: req.body } }
                ).then(() => {
                  Favorites.find({ user: req.user._id }).then((favorites) => {
                    res.json(favorites);
                  });
                });
              }
            });
        } else {
          err = new Error("Already a favorite!");
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({ user: req.user._id })
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    //check if user already has the dish as his favorite, if not then proceed to check if it is a collection

    Favorites.find({ user: req.user._id, dishes: req.params.dishId })
      .populate("dishes")
      .then(
        (favorite) => {
          console.log(req.body);
          console.log(favorite);
          //if favorite = 1 this means that it is already favorited
          if (favorite.length <= 0) {
            //Check if there is already a collection
            //If there is no collection, create
            //if there is collection push
            Favorites.find({ user: req.user._id })
              .populate("dishes")
              .then((favorites) => {
                if (favorites.length <= 0) {
                  //no collection so add
                  req.body.user = req.user._id;
                  req.body.dishes = req.params.dishId;
                  Favorites.create(req.body).then(
                    (favorite) => {
                      console.log("Favorited: ", favorite);
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(favorite);
                    },
                    (err) => next(err)
                  );
                } else {
                  //There is a collection so push
                  req.body.user = req.user._id;
                  Favorites.findOneAndUpdate(
                    { user: req.user._id },
                    { $push: { dishes: req.params.dishId } }
                  ).then(() => {
                    Favorites.find({ user: req.user._id }).then((favorites) => {
                      res.json(favorites);
                    });
                  });
                }
              });
          } else {
            err = new Error("Already a favorite!");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.updateOne({ $pull: { dishes: req.params.dishId } })
      .populate("dishes")
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
// Favorites.findById(req.user._id)
// .populate("")
// .then((favorites) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   res.json(favorites);
// });
module.exports = favoriteRouter;
