const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");
const Sequelize = require("sequelize");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const sequelize = new Sequelize("notatnik", "root", "Programowanie1!", {
	dialect: "mysql",
	host: "localhost",
	pool: {
		max: 5,
		min: 1,
		acquire: 30000,
		idle: 10000,
	},
});

sequelize.authenticate();

const Notes = sequelize.define(
	"notes",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING(100),
			allownull: false,
		},
		note: {
			type: Sequelize.STRING,
			allownull: true,
		},
	},
	{
		paranoid: true,
	}
);
app.get("/notes", async (_, res) => {
	try {
		const notes = await Notes.findAll();
		res.json({ success: true, data: notes });
		return;
	} catch (error) {
		res.status(500);
		res.send({ success: false, reason: "programist error" });
		return;
	}
});
app.get("/notes/:id", async ({ params: { id } }, res) => {
	const idSchema = Joi.object({
		id: Joi.number().required(),
	});
	const { error } = idSchema.validate({ id });
	if (error) {
		res.status(400);
		res.send({ success: false, reason: error });
		return;
	}
	const note = await Notes.findByPk(id);
	if (!note) {
		res.status(400);
		res.send({ success: false, reason: "note doesnt exist" });
		return;
	}
	res.status(200);
	res.send({ success: true, data: note });
	return;
});
app.post("/notes", async ({ body: { title, note } }, res) => {
	const noteSchema = Joi.object({
		title: Joi.string().min(1).max(50).required(),
		note: Joi.string().min(0).max(256).required(),
	});
	const { error } = noteSchema.validate({ title, note });
	if (error) {
		res.status(400);
		res.send({ success: false, reason: error });
		return;
	}
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
});
app.delete("/notes/:id", async ({ params: { id } }, res) => {
	const idSchema = Joi.object({
		id: Joi.number().required(),
	});
	const { error } = idSchema.validate({ id });
	if (error) {
		res.status(400);
		res.send({ success: false, reason: error });
		return;
	}

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
});
app.patch(
	"/notes/:id",
	async ({ params: { id }, body: { title, note } }, res) => {
		const notesSchema = Joi.object({
			id: Joi.number().required(),
			title: Joi.string().min(1).max(50).required(),
			note: Joi.string().min(0).max(256).required(),
		});
		const { error } = notesSchema.validate({ id, note, title });
		if (error) {
			res.status(400);
			res.send({ succes: "false", reason: error });
			return;
		}
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
);

app.listen(3000, () => {
	console.log("serwer slucha");
});
