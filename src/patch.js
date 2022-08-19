const Notes = require('./models/notes').Notes


exports.patch = async ({ params: { id }, body: { title, note } }, res) => {
   
    const noteWithTitle = await Notes.findOne({ where: { title } });
    if (!noteWithTitle) {
        try {
            const oneNote = await Notes.findByPk(id);
            await oneNote.update({ note, title });
            res.status(200);
            res.send({ succes: true, reason: "note has been updated" });
            return;
        } catch (error) {
            res.status(400);
            res.send({ status: false, reason: error });
            return;
        }
    }
    res.status(400);
    res.send({ success: false, reason: "title already exist" });
}