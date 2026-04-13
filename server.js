const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
dotenv.config();
const userService = require("./user-service.js");

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// ---- Passport JWT Setup ----
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.JWT_SECRET
};

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  if (jwt_payload) {
    next(null, {
      _id: jwt_payload._id,
      userName: jwt_payload.userName
    });
  } else {
    next(null, false);
  }
});

passport.use(strategy);
app.use(passport.initialize());

// ---- Routes ----
app.post("/api/user/register", (req, res) => {
  userService.registerUser(req.body)
    .then((msg) => {
      res.json({ "message": msg });
    }).catch((msg) => {
      res.status(422).json({ "message": msg.message || msg });
    });
});

app.post("/api/user/login", (req, res) => {
  userService.checkUser(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id, userName: user.userName },
        process.env.JWT_SECRET
      );
      res.json({ "message": "login successful", "token": token });
    }).catch(msg => {
      res.status(422).json({ "message": msg.message || msg });
    });
});

// Protected routes — passport.authenticate runs instead of manual verifyToken
app.get("/api/user/favourites", passport.authenticate("jwt", { session: false }), (req, res) => {
  userService.getFavourites(req.user._id)
    .then(data => {
      res.json(data);
    }).catch(msg => {
      res.status(422).json({ error: msg });
    });
});

app.put("/api/user/favourites/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  userService.addFavourite(req.user._id, req.params.id)
    .then(data => {
      res.json(data);
    }).catch(msg => {
      res.status(422).json({ error: msg });
    });
});

app.delete("/api/user/favourites/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  userService.removeFavourite(req.user._id, req.params.id)
    .then(data => {
      res.json(data);
    }).catch(msg => {
      res.status(422).json({ error: msg });
    });
});

// ---- Start Server ----
userService.connect()
  .then(() => {
    app.listen(HTTP_PORT, () => { console.log("API listening on: " + HTTP_PORT) });
  })
  .catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
  });

  module.exports = app;