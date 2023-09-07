const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    scheduleDate: {
        type: String,
    },
    priorityValue: {
        type: String,
    },
})


//module.exports = mongoose.model("Note",noteSchema);
const Note = mongoose.model("Note",noteSchema);
module.exports = Note;