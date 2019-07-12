const mongoose = require('mongoose')
const slot = mongoose.model('slotmaster')
module.exports = (function(){
return{
    slotMaster:function(req,res){
        const slotmaster = new slot(req.body);
        slotmaster.save(function(err,result){
            if(err){
                res.send(err)
            }else{
                res.json(result)
            }
        })
    },
    slotGet:function(req,res){
        slot.find({},function(err,result){
           if(err){
               res.send(err)
           }else{
               res.send(result)
           }
        })
    }
}
})();