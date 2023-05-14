import mongoose from "mongoose";

const adminSchema = mongoose.Schema({

name:{
        type:String,
        required:[true,'Please add a name'],
        trim:true
    },
    
email:{
    type:String,
    required:[true,'Please add an email'],
    unique:true,
    trim:true,
},

phone:{
type:String,
required:[true,'Please add a phone'],
trim:true
},

password:{ 
    type:String,
    required:[true,'Please add a password'],
    minlength:5
},

superAdmin:{
    type:Boolean
}
},

{ timestamps:true 

},{
collection:"Admins"
}
);



const Admin =mongoose.model('Admin', adminSchema);
export default Admin;

