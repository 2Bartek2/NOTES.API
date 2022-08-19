const Notes = require('./models/notes').Notes


exports.get = async ({ params: { id } }, res) => {
	
	const note = await Notes.findByPk(id);
	if (!note) {
		res.status(400);
		res.send({ success: false, reason: "note doesnt exist" });
		return;
	}
	res.status(200);
	res.send({ success: true, data: note });
	return;
}