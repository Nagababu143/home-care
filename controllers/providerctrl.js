const mongoose = require('mongoose')
const providers = mongoose.model('providers')
module.exports = (function(){
    return{
        newprovider:function(req,res){
            const provider = new providers(req.body);
            console.log(req.body)
            provider.save(function(error,result){
                if(error){
                    res.send(error)
                    console.log(error)
                }else{
                    res.json(result)
                }
            })
        },
        getprovider:function(req,res){
            providers.find({"status":"active"},function(error,result){
                if(error){
                    res.send(error);
                    console.log(error);
                }
                else{
                    res.json(result);
                }
            })
        },
        getAllprovider:function(req,res){
            providers.find({},function(error,result){
                if(error){
                    res.send(error);
                    console.log(error);
                }
                else{
                    res.json(result);
                }
            })
        },
        providerUpdate:function(req,res){
            console.log(req.params.id)
            providers.findById({"_id":req.params.id},function(error,result){
                if(error){
                    res.send(error)
                    console.log(result)
                }
                else{
                    for(prop in req.body){                          
                        result[prop] = req.body[prop]                    
                  }
                    result.save(function(error,data){
                        if(error){
                            res.send(error)
                            console.log(error)
                        }
                        else{
                            res.json(result)
                        }
                    })
                }
            })
      }
    }
})();