const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String
    },
    roll: {
        type: String,
        required: [true, "Roll Number is required."]
    },
    present : {
        type: Boolean,
        default: true
    }
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;