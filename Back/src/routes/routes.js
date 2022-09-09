const express = require("express");
const passport = require("../Utils/passport-strategies");
const router = express.Router();
const forgetPassword = require("../middlewares/forgetPassword");
const processReservation = require("../middlewares/processReservation");
const createNewPass = require("../middlewares/createNewPass");
const confirmAccount = require("../middlewares/confirmAccount");
const getReservation = require("../middlewares/reservationPrices");
const loginProcess = require("../middlewares/loginProcess");
const registerProcess = require("../middlewares/registerProcess");
const logoutProcess = require("../middlewares/logoutProcess");
const processContact = require("../middlewares/processContactInfo");
const reservationModel = require("../db/models/reservationModel");

let isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('error');
}

//GET

router.get('/activar-cuenta/:verToken', confirmAccount);

router.get('/error', async (req, res, next) => {
    console.log("errrrr");
});

router.get('/logout', logoutProcess);

router.get('/reservations', getReservation);

//POST

router.post('/new-password/:resetToken', createNewPass);

router.post('/create-reservation', processReservation);

router.post('/login', passport.authenticate('login', { failureRedirect: 'error' }), loginProcess);

router.post('/register', passport.authenticate('register', { failureRedirect: 'error' }), registerProcess);

router.post('/reservation', processReservation);

router.post('/contact', processContact);

router.post('/reservation-info', isAuth, async (req, res, next) => {
    try {
        const reserv = await reservationModel.find({ username: req.body.username });
        if (reserv.length === 0) {
            res.send([]);
        } else {
            res.send(await reserv);
        }
    } catch (error) {
        console.log(error);
    }
});

//PUT

router.put('/forgot-password', forgetPassword);

// router.get('/activar', async (req, res, next) => {
//     try {
//         // const info = await transporter.sendMail(mailOptions);
//         // console.log(info);
//         res.redirect('http://localhost:3000');
//     } catch (err) {
//         console.log(err);
//         res.send(err);
//     }

// });

module.exports = router;