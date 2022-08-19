const Notes = require('./models/notes').Notes


exports.get = async (_, res) => {
	try {
		const notes = await Notes.findAll();
		res.json({ success: true, data: notes });
		return;
	} catch (error) {
		res.status(500);
		res.send({ success: false, reason: "smt went wrong" });
		return;
	}
}
