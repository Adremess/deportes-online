const passport = require("passport");
const passportStrategy = require("passport-local").Strategy;
const userController = require("../controllers/user");
const userModel = require("../db/models/userModel");

passport.use('login', new passportStrategy(async (username, password, done) => {
  let user = await userController.findOne(username);
  let newMsg = "El usuario o la contraseña son incorrectos";
  if (!user) return done(null, false, { message: newMsg });

  const comparedPw = await userModel.comparePassword(password, user[0].password);
  if (!comparedPw) return done(null, false, { message: newMsg });

  if (!user[0].confirmedAccount) return done(null, false, { message: "La cuenta aún no ha sido confirmada" });

  return done(null, user[0]);
}));

passport.use('register', new passportStrategy({
  passReqToCallback: true
}, async (req, username, password, done) => {
  let exist = await userController.findOne(username);
  if (exist) return done("Usuario existente");

  let user = await userController.create(req.body);
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, done);
});

module.exports = passport;
