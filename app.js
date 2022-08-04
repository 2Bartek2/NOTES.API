mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Programowanie1!",
	database: "notatnik",
});
connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	connection.query("select * from notes", (err, rows, fields) => {
		if (err) {
			res.status(500);
			res.send({ succes: false });
			console.log("nie wyswietla notatki");
			return;
		}
		res.send(rows);
	});
});

app.post("/note", ({ body: { title, note } }, res) => {
	if (!title && !note) {
		res.send({ status: false, reason: "no data" });
		return;
	}
	connection.query(
		`insert into notes(title,note) values ('${title}', '${note}')`,
		(err) => {
			if (err) {
				res.status(500);
				res.send({ succes: false });
				console.error(err);
				return;
			}
			res.send({ succes: true });
			return;
		}
	);
});

app.delete("/notes/:id", ({ params: { id } }, res) => {
	connection.query(
		`select id from notes where id = ${id}`,
		(err, rows, fields) => {
			if (rows.length === 0) {
				res.status(400);
				res.send({ succes: false, reason: "note not found" });
				return;
			}
			if (err) {
				res.status(500);
				res.send("succes:false");
				return;
			}
			connection.query(`delete from notes where id =${id} `, (err) => {
				if (err) throw console.log("blad usuwania");
				return;
			});
			res.send({ succes: true });
			return;
		}
	);
});

app.patch(
	"/notes/:id",
	({ params: { id }, body: { changeTitle, changeNote } }, res, next) => {
		console.log(id);
		console.log(changeTitle);
		console.log(changeNote);

		if (!changeNote || !changeTitle) {
			res.status(400);
			res.send({ succes: "fatal", reason: "wrong data" });
			return;
		} else {
			connection.query(
				`SELECT id FROM notes where id='${id}'`,
				(err, rows, fields) => {
					console.log(rows);
					if (rows.length === 0) {
						res.status(400);
						res.send({ succes: false, reason: "note does not exist" });
						console.log("note doesnt exist");
						return;
					}
					if (err) {
						res.status(500)
						res.send({succes:false})
						
					} else {
						connection.query(
							`UPDATE notes SET title='${changeTitle}', note='${changeNote}' WHERE id='${id}'`,
							(err) => {
								res.status(500)
								res.send({succes:false})
								return
							}
						);
						res.send({ succes: true, reason: "note updated" });
						console.log("notatka zostala zaktualizowana");
						return;
					}
					connection.end();
				}
			);
		}
	}
);
app.listen(3000, () => {
	console.log("serwer słucha");
});
