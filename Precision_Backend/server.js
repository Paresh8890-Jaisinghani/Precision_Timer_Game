const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./model.js')

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3004;


mongoose.connect('mongodb+srv://Paresh:pareshjaisinghani@cluster0.rxwg4ag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

app.use(express.json());


app.post('/api',async (req,res)=>{
    const {PrecisionScore1,PrecisionScore2,PrecisionScore3,otpcode} = req.body;

    try{
       let contact = await Contact.findOne({code : otpcode});

       if(!contact){
        return res.status(404).json({ message: "Wrong code Entered" });
       }

       contact.PrecisionScore1 = PrecisionScore1;
       contact.PrecisionScore2 = PrecisionScore2;
       contact.PrecisionScore3 = PrecisionScore3;
       await contact.save();
       res.status(201).json(contact);
    }
    catch(e){
        res.status(500).json({message : e.message});
    }

});


app.get('/api',async(req,res)=>{
    try{
         let contacts = await Contact.find();
         res.json(contacts);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
    
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });