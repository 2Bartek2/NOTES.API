const Notes = require('./models/notes').Notes


exports.post = async ({ body: { title, note } }, res) => {
	
	const noteWithTitle = await Notes.findOne({ where: { title } });
	if (!noteWithTitle) {
		try {
			const notes = await Notes.create({ title, note });
			res.status(200);
			res.send({ success: true, data: { title, note } });
			return;
		} catch (error) {
			res.status("500");
			res.send({ succes: "false", reason: "smt went wrong" });
			return;
		}
	}
	res.status(400);
	res.send({ success: false, reason: "note already exist" });
	return;
}