require("dotenv").config();
require("./db");
const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const router = require("./routes/routes");
const PORT = process.env.PORT || 5000;
const app = express();


const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,    // 10 minutes
	max: 100                     // 100 requests per IP
});
// SETTINGS
app.use(limiter);
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(hpp());
app.use(xss());
app.use(helmet());
// SESSION
app.use(expressSession({
	secret: "c6-42-m-mern",
	cookie: {
		httpOnly: false,
		secure: false,
		maxAge: 600000
	},
	resave: false,
	saveUninitialized: false
}));
// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
// ROUTES
app.use('/', router);

app.listen(PORT, (err) => {
	if (!err) {
		console.log("server on Port", PORT);
	} else {
		console.log(err);
	}
});
