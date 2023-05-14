import mongoose from "mongoose";

const coachSchema = mongoose.Schema({

first_name:{
        type:String,
        required:[true,'Please add a first_name'],
        trim:true
    },
    
middle_name:{
        type:String,
        required:[true,'Please add a last_name'],
        trim:true
    },
     
last_name:{
    type:String,
    required:[true,'Please add a last_name'],
    trim:true
},

phone:{
type:String,
required:[true,'Please add a phone'],
trim:true
},

},

{ timestamps:true 

},{
collection:"coachs",

}
);




const Coach = mongoose.model('Coach', coachSchema);

export default Coach;