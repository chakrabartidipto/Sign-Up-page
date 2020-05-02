//jshint esversion:6

const express= require("express");
const request= require("request");
const bodyParser= require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.get("/", function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

    var firstName= req.body.fName;
    var lastName= req.body.lName;
    var email= req.body.email;
    
    // console.log(firstName, lastName, email);

     var data={
         
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {

                    FNAME: firstName,
                    LNAME: lastName,
        
                 }
            }

         ]
     }
    
    var jsonData= JSON.stringify(data);
    
    var options={
        url: 'https://us8.api.mailchimp.com/3.0/lists/49ab981f6a',
        method: "POST",
        headers:{
            "Authorization": "Dipto decb49ef01abc7af57da503f7d0eea5a-us8"
        },
    
        body: jsonData,
    
    }

    request(options, function(error,response,body){
        
        if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
        } else{
        res.sendFile(__dirname+"/failure.html");
        }

    });
});

app.post("/failure", function(req,res){

    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running at port 3000");
});


// decb49ef01abc7af57da503f7d0eea5a-us8
// 49ab981f6a.