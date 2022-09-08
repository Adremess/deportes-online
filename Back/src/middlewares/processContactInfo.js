const { transporter, contactMailOptions } = require("../Utils/nodemailer");
const courtMsgSchema = require("../db/models/courtMsgModel");

async function processContact(req, res) {
	try {
		if (req.body) {
			const newCourtMsg = new courtMsgSchema(req.body);
			await transporter.sendMail(contactMailOptions(req.body));
			await newCourtMsg.save();
			res.status(200).send("Su info ha sido enviada");
		} else {
			res.status(403).send("La información no pudo ser procesada, por favor intente nuevamente");
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = processContact;
