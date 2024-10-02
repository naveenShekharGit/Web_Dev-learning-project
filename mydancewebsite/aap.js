const express = require("express");
const path = require("path");
const aap = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;


//Define mongoes Sceima
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    addresh: String,
    place: String
})

var Contact = mongoose.model("Contact", contactSchema);

// EXPRESS SPECIFICE STUFF
aap.use('/static', express.static("static"))//for serving static path
aap.use(express.urlencoded())

// PUG SPECIFIC STUFF
aap.set('view engine', 'pug') //set the template engine as pug 
aap.set('views', path.join(__dirname, 'views')) //set the views directoty

//ENDPOINTS 
aap.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});

aap.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});

aap.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send('this item has been saved to the database')
      }).catch(()=>{
          res.status(400).send("item was not saved to the database")
      })
    // res.status(200).render('contact.pug');
});






// START THE SERVER 
aap.listen(port, ()=>{
    console.log(`the server is started successfully on port ${port}`);
});
