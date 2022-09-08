const jwt = require("jsonwebtoken");
const userModel = require("../db/models/userModel");

const confirmAccount = async (req, res) => {
	try {
		const { verToken } = req.params;
		if (!verToken) return res.status(403).json({ message: "No se recibió el Token" });

		const decoded = jwt.verify(verToken, process.env.JWT_SECRET);
		const userExist = await userModel.findById(decoded.id);
		if (!userExist) return res.status(404).json({ message: "El usuario no existe" });

		if (!(userExist.verToken === verToken))
			return res.status(400).json({
				message: "Wrong token",
			});

		if (userExist.confirmedAccount === true) return res.status(400).json({ message: "Cuenta previamente confirmada" });

		userExist.confirmedAccount = true;
		const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
			expiresIn: "15m",
		});
		//renew Token if user didn't confirm account.
		userExist.verToken = token;
		await userExist.save();
		return res.redirect(`${process.env.FRONT_URI}/validation`);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: "Algo salió mal" });
	}
};

module.exports = confirmAccount;
