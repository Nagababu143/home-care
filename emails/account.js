const sgMail = require('@sendgrid/mail');

var bcrypt = require('bcryptjs');
// var bcrypt = dcodeIO.bcrypt;
const  decrypt = require('node-decrypt')
const sendgridapikey = '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';
sgMail.setApiKey(sendgridapikey)


    sgMail.send({
        to:"thirumaninagababu@gmail.com",
        from:"thirumaninagababu@gmail.com",
        subject:'thanks for joining in !',
        text:`welcome to the app . let me know how you get along with the app`
    })
    const pwd = bcrypt.hashSync('$2a$08$/bhqRo3PAQ2.pQNjPXdjxO7nt9QZbwkT6A/OF5WgzHqfCOO5KWrAG');
    console.log(pwd)

