const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/mail',(req, res)=>{
   var transport = nodemailer.createTransport({
        service:'gmail',
         auth: {
                     user: "vastramfashionsmlr@gmail.com",
                     pass: "vastramfashions@2020"
                }
            });
        var mailOptions = {
                from: "vastramfashionsmlr@gmail.com", 
                to: req.body.user, 
                subject:req.body.subject, 
                html: req.body.html,  
            }
            
    transport.sendMail(mailOptions, function(error, resp){
        if(error){
             res.send("Error : "+error);
        }else{
             res.send("Email has been sent successfully to "+ req.body.user);
        }         
    }); 
})

module.exports = router;