const mongoose = require('mongoose')
const savepatient = mongoose.model('patient');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt')
var nodemailer = require("nodemailer");
// const cryptr = require("cryptr")
module.exports = (function(){
    return{
        getpatient:function(req,res){
            savepatient.findOne({"_id":req.params.id},function(error,result){
                if(error){
                    res.send(error);
                    console.log(error);
                }
                else{
                    res.json(result);
                }
            })
        },
        changepassword: function(req,res){
            savepatient.findOne({"_id": req.params.id},(error,result)=>{
                if(error){
                    res.send(error)
                    console.log(error)
                }
                else{
                    if(result==null){
                        res.send({'status': 'Invalid Loginid'});
                    }
                    
                    else if(bcrypt.compareSync(req.body.password,result.password)){
                        const hashedpassword = bcryptjs.hashSync(req.body.newpassword,8)
                        savepatient.findByIdAndUpdate({"_id": req.params.id},{$set: {"password": hashedpassword,"confirmpassword":req.body.newpassword}}, {safe: true, new: true}, function(err,result){
                            if(err){
                                res.send(err);
                                console.log(err);
                            }
                            else{
                                res.json(result);
                            }
                        });
                    }
                    else{
                        res.send({'status': 'Password  mismatch'});
                    }
                }
            })
        },
        forgotPassword: function(request,response){
            savepatient.findOne({"email": request.params.email}, function(error,result){
                if(error){
                    response.send(error)
                    console.log("sorry the mailid doesn't exists")
                }
                else if(result==null){
                    response.send("sorry the mailid doesn't exists")
                    console.log("sorry the mailid doesn't exists")
                }
                else{
                    response.json(result.email);
                    // const decryptedString = cryptr.decrypt(result.password);
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'thirumaninagababu5@gmail.com',
                            pass: '9701687680'
                        }
                    });
                    var mailOptions = {
                        from: '<thirumaninagababu5@gmail.com>',
                        to: result.email,
                        subject: 'MilkNWater: Forgot Password?',
                        html: "<!DOCTYPE html><html lang='en'><head><script type='text/javascript'></script></head><body><p style=font-family: 'Times New Roman'>Hi "+result.name+"</p><p style=font-family: 'Times New Roman'>Greetingsss from <b>MilkNWater</b></p><p style=font-family: 'Times New Roman'>Here is your account password: <b style='color: green'>"+result.confirmpassword+"</b></p><br>The MilkNWater Team</body></html>"
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                    /*var api_key = 'key-f3bcfae7e50f962c556647144e3253a0';
                    var domain = 'mg.milknwater.com';
                    var mailgun = require('../mailgun-js')({apiKey: api_key, domain: domain});
                    var data = {
                    from: 'support@milknwater.com',
                    to: result.email,
                    subject: "MilkNWater: Forgot Password?",
                    html: "<!DOCTYPE html><html lang='en'><head><script type='text/javascript'></script></head><body><p style=font-family: 'Times New Roman'>Hi "+result.name+"</p><p style=font-family: 'Times New Roman'>Greetingsss from <b>MilkNWater</b></p><p style=font-family: 'Times New Roman'>Here is your account password: <b style='color: green'>"+result.password+"</b></p><br>The MilkNWater Team<br><a href= 'http://milkNwater.com/'>http://milkNwater.com</a></body></html>"
                    };
                    mailgun.messages().send(data, function (error, body) {
                    console.log(body);
                    });*/
                }
            });
        }
    }
})();