import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const paymentSchema = new Schema({

 
    amount:{
        type:Number,

    },
     member:{
      type:String

     },

  membership:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
  },
  notes:{
    type:String
   },
   rate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dollar',
  },
  priceLbp: {
    type: Number,
  },


}, 
{ timestamps:true 

},{
  collection: 'payments',


});

const Payment = model('Payment', paymentSchema);

export default Payment;