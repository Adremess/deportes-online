const jwt = require("jsonwebtoken");
const userSchema = require("../db/models/userModel");
const { transporter, mailOptions } = require("../Utils/nodemailer");

const forgetPassword = async (req, res) => {
    try {
        let { email } = req.body;
        if (!email) return res.status(404).json({ message: "Se necesita una dirección de correo electrónico" });

        const user = await userSchema.findOne({ email });
        if (!user) return res.status(403).json({ message: "El usuario no se encuentra registrado" });
				
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            password: user.password
        },
            process.env.JWT_SECRET,
            { expiresIn: "30m" });
        user.resetToken = token;
        const changePwLink = `${process.env.FRONT_URI}/reset/${token}`
        await user.save();
        transporter.sendMail(mailOptions(changePwLink, user.email, "renewpass"));
        return res.status(200).json({ message: "Email sent" })
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

module.exports = forgetPassword;
