const mongoose = require('mongoose')
const actor = mongoose.model('addactor')
module.exports = (function(){
    return{
        addactors:function(req,res){
            const addactor = new actor(req.body);
            console.log(req.body)
            addactor.save(function(error,result){
                if(error){
                    res.send(error)
                    console.log(error)
                }else{
                    res.json(result)
                }
            })
        },
        getPersondetals:function(req,res){
            actor.find({"providerId":req.params.providerId}, function(error,result){
                if(error){
                    res.send(error);
                    console.log(error);
                }
                else{
                    res.json(result);
                }
            })
        },
        deleteActor:function(req,res){
            actor.deleteOne({"_id":req.params.id}, function(error,result){
                if(error){
                    res.send(error);
                    console.log(error);
                }
                else{
                    res.json(result);
                }
            })
        },
        getActor:function(req,res){
            actor.find({$and:[{"_id":req.body.id},{"providerId":req.params.providerId}], function(error,result){
                if(error){
                    res.send(error);
                    console.log(error);
                }
                else{
                    res.json(result);
                }
            }
            })
        },
        getActorActive:function(req,res){
            actor.find({$and:[{"status":"active"},{"providerId":req.params.providerId}]}, function(error,result){
                if(error){
                    res.send(error);
                    console.log(error);
                }
                else{
                    res.json(result);
                }
            })
        },
        actorUpdate:function(req,res){
            actor.findById({"_id":req.params.id},function(error,result){
                if(error){
                    res.send(error)
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
      },
      searchAdmin:function(req,res){
          actor.find({$or:[{"name":req.body.name},{"email":req.body.email},{"phone":req.body.phone}]},function(err,result){
              if(err){
                  res.send(err)
              }else{
                  res.json(result)
              }
          })
      },
      search:function(req,res){
          console.log(req.params.providerId)
        const actorresult = actor.find({"providerId":req.params.providerId},function(err,result){
            if(err){
                res.send(err)
            }else{
                actorresult.find({$or:[{"name":req.body.name},{"slots":[{availableDays:"monday"}]},{"gender":req.body.gender},{"speciality":req.body.speciality}]},function(err,result){
                    if(err){
                        res.send(err)
                    }else{
                        res.json(result)
                    }
                })
            }
        })
    },
      someofActors:function(req,res){
          actor.find({"providerId":req.params.id}).countDocuments(function(err,result){
            if(err){
                res.send(err)
            }else{
                res.json(result)
            }
        })
      }

    }
})();