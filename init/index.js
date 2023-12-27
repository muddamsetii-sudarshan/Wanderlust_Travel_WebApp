const mongoose=require("mongoose");
const samplelisting=require("./data.js");
const Listing=require("../models/Listing.js");
//connect local database mongodb
main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//intialize database
const initdb=async ()=>{
    await Listing.deleteMany({});///delete if anydata already exists
    samplelisting.data=samplelisting.data.map((obj)=>({...obj,owner:'65858b01b4c26eb50b99a745'}));
    samplelisting.data=samplelisting.data.map((obj)=>({...obj,geometry:{type: 'Point', coordinates: [ 77.57902610969523,13.09656344342877  ]}}));
    samplelisting.data=samplelisting.data.map((obj)=>({...obj,category:"Pools"}));
    console.log(samplelisting.data);
    await Listing.insertMany(samplelisting.data);//add data
}
initdb();
