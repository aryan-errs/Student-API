const express = require('express');
const router = express.Router();
const Student = require('../model/student')

router.get('/students', async (req,res) => {
    const students = await Student.find({});
    res.json({
        message: "Getting students data.",
        data: students
    });
});

router.post('/students',async (req,res,next) => {
    // Student.create(req.body).then(function(student){
    //     res.send(student);
    // }).catch(next);
    let student = new Student();
    student.name = req.body.name;
    student.roll = req.body.roll;
    student.present = req.body.present;
    await student.save(function(err){
        if(err) {
            res.json(err);
        }
        else{
            res.json({
                message: "Student Added",
                data: student
            });
        }
    });
});

router.put('/students/:id', async (req,res) => {
    const { id } = req.params;
    Student.findById(id, function(err, student) { 
        if(err)
            res.send(err);
        student.name = req.body.name ? req.body.name : student.name;
        student.roll = req.body.roll ? req.body.roll : student.roll;
        student.present = req.body.present ? req.body.present : student.present;
        student.save(function(err){
            if(err)
                res.send(err);
            res.json({
                message: "Contact Updated",
                data: student
            });
        });
    });
});

router.delete('/students/:id', (req,res)=>{
    // res.send({type: 'DELETE'});
    Student.findOneAndDelete({_id: req.params.id}).then(function(student){
        res.send(student);
    });
})

module.exports = router;