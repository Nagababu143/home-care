const mongoose = require('mongoose')
const appointments = mongoose.model('appointment')
module.exports = (function(){
    return{
         saveappointment:function(req,res){
            const  appointmentsave = new appointments(req.body);
            appointmentsave.save(function(err,result){
                if(err){
                    res.send(err)
                }else{
                    res.json(result)
                }
            })
         },
         getDoctor:function(req,res){
             appointments.find({"doctorId":req.params.id},function(err,result){
                 if(err){
                     res.send(err)
                 }else{
                     res.json(result)
                 }
             })
         },
         getPatient:function(req,res){
             appointments.find({"patientId":req.params.id},function(err,result){
                 if(err){
                     res.send(err)
                 }else{
                     res.json(result)
                 }
             })
         },
         getAppointment:function(req,res){
             appointments.find({},function(err,result){
                 if(err){
                     res.send(err)
                 }
                 else{
                     res.json(result)
                 }
             })
         }
    }
})();