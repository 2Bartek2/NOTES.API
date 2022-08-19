const express = require("express");
const bodyParser = require("body-parser");


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const getNotes = require ('./src/getNotes').get
const getOneNote = require('./src/getOneNote').get
const postHandler = require('./src/post').post
const deleteHandler = require('./src/delete').delete
const patchHandler = require('./src/patch').patch
const idValidate = require('./src/validator').idVal
const allValidate = require('./src/validator').allVal
const partValidate = require('./src/validator').partVal

app.get("/notes", getNotes );
app.get("/notes/:id",idValidate,getOneNote );
app.post("/notes",partValidate, postHandler );
app.delete("/notes/:id",idValidate, deleteHandler);
app.patch("/notes/:id",allValidate, patchHandler)
	

app.listen(3000, () => {
	console.log("serwer slucha");
});
