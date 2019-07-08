var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const admin = require('./models/adminlogin.js')
app.use(cors());
require('./db/mongoose')
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
const providerctrl = require('./controllers/providerctrl.js')
const getProviders = require('./controllers/providerctrl.js')
const getAdminloginsave = require('./controllers/adminloginctrl')

app.post('/providers',function(req,res){
    providerctrl.newprovider(req,res)
 })

 app.get('/getProviders',function(req,res){
     getProviders.getprovider(req,res)
 })
 app.post('/adminloginsave',function(req,res){
    getAdminloginsave.adminloginsave(req,res)
})
app.post('/adminlogin',async (req,res)=>{
    console.log(req.body.email)
    console.log(req.body.password)
    try{
       const admin1 = await admin.findByCredentials(req.body.email,req.body.password)
       res.send(admin1)
    }catch(error){
        res.status(400).send()
    }
 })







var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Server running at ' + port);
});
var endMongoConnection = function(){
    mongoose.connection.close(function(){
        process.exit(0);
    });
}
process.on('SIGINT', endMongoConnection).on('SIGTERM', endMongoConnection);