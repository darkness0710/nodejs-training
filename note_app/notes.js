const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
    let result = [];
    try {
        result = JSON.parse(fs.readFileSync('data.json').toString()) || [];
    } catch (e) {
        console.log(e);
    }
    return result;
}

const saveNote = (note) => {
    const dataJson = JSON.stringify(note);
    fs.writeFileSync('data.json', dataJson);
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log(note.title);
    });
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.filter((note) => note.title == title);
    if (duplicateNote.length == 0) {
        notes.push({
            title: title,
            body: body,
        })
        console.log(chalk.green('New note add!'));
        return saveNote(notes);
    }
    console.log(chalk.red('Note with title: ' + title + ' has duplicate!'));
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    console.log(chalk.green('Note with title: ' + title + ' has remove!'));
    return saveNote(notesToKeep);
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        return console.log('Note not found');
    }
    console.log('Note body: ' + note.body);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
