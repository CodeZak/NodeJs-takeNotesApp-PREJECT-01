const { throws } = require("assert");
const chalk = require("chalk");
const { error } = require("console");
const fs = require("fs");
const { parse } = require("path");

const getNotes = (title) => {
    const notes = loadNotes();
    const yourNote = notes.find((note) =>note.title === title);
    if (yourNote !== undefined) {
        console.log(chalk.green.inverse("Your Note : "));
        console.log(yourNote.title);
        console.log(yourNote.body);
    } else {
        console.log(chalk.red.inverse("no note found"));
    }
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicate = notes.find((note) => note.title === title);
    // alternative condition : if (duplicate === undefined)
    if (!duplicate) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("new note added!"));
    } else {
        console.log(chalk.yellow.inverse("title already exists!"));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => !(note.title === title));
    if (notes.length === newNotes.length) {
        console.log(chalk.red.inverse("note dosn't exist!"));
    } else {
        console.log(chalk.green.inverse("note removed!"));
    }
    saveNotes(newNotes);
};

//other syntax for functions
function listNotes() {
    const notes = loadNotes();
    console.log(chalk.green.inverse("Your Notes"));
    notes.forEach((note) => {
        console.log(chalk.blue.inverse(note.title), `\n` + note.body);
    });
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
};
