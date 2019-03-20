const fs = require('fs')

const getNotes = function () {
    return 'all notes'
}

const addNote = function (title, body) {
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title,
            body
        })

        saveNotes(notes)
    }
}

const removeNote = function (title) {
    const notes = loadNotes()

    const filteredNotes = notes.filter(function (note) {
        return note.title !== title
    })

    saveNotes(filteredNotes)
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote
}
