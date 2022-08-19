const Joi = require("joi");

exports.idVal = async ({ params: { id } }, res, next) => {
	const idSchema = Joi.object({
		id: Joi.number().required(),
	});
	const { error } = idSchema.validate({ id });
	if (error) {
		res.status(400);
		res.send({ success: false, reason: error });
		return;
	}
    next()
}
exports.allVal = async ({ params: { id }, body: { title, note } }, res, next) => {
    const notesSchema = Joi.object({
        id: Joi.number().required(),
        title: Joi.string().min(1).max(100).required(),
        note: Joi.string().min(0).max(256).required(),
    });
    const { error } = notesSchema.validate({ id, note, title });
    if (error) {
        res.status(400);
        res.send({ succes: "false", reason: error });
        return;
    }
    next()
}
exports.partVal = async ({ body: { title, note } }, res, next) => {
	const noteSchema = Joi.object({
		title: Joi.string().min(1).max(100).required(),
		note: Joi.string().min(0).max(256).required(),
	});
	const { error } = noteSchema.validate({ title, note });
	if (error) {
		res.status(400);
		res.send({ success: false, reason: error });
		return;
	}
    next()
}