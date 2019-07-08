const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/home-care',{
    useNewUrlParser:true,
    useCreateIndex:true
})

mongoose.connection.once('open',function(){
    console.log('connection has been made')
}).on('error',function(error){
    console.log('connection error',error)
})

require('../models/providers.js')
require('../models/adminlogin')