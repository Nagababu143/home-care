const actorctrl = require('../controllers/actorctrl')
module.exports = function(app){
app.get('/actorCount/:id',function(req,res){
    actorctrl.someofActors(req,res)
});
app.post('/addactor',function(req,res){
    actorctrl.addactors(req,res)
});
app.delete('/deleteActor/:id',function(req,res){
    actorctrl.deleteActor(req,res)
});
app.get('/getActor/:providerId',function(req,res){
    actorctrl.getActor(req,res)
});
app.put('/updateactor/:id',function(req,res){
    actorctrl.actorUpdate(req,res)
});
app.post('/adminSearch',function(req,res){
    actorctrl.searchAdmin(req,res)
});
}