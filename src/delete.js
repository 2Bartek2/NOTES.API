const Notes = require('./models/notes').Notes

exports.delete = async ({ params: { id } }, res) => {
	
    const note = await Notes.findByPk(id);
	if (!note) {
		res.status(400);
		res.send({ success: false, reason: " note doesnt exist" });
		return;
	}
	try {
		await note.destroy();
		res.status(200);
		res.send({ succes: true, reason: "note has been deleted" });
		return;
	} catch (error) {
		res.status(400);
		res.send({ success: false, reason: "note doesnt exist" });
		return;
	}
}