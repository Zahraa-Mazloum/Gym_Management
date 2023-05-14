import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const paymentSchema = new Schema({

 
    amount:{
        type:Number,

    },
 
  membership:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
  },

}, 
{ timestamps:true 

},{
  collection: 'payments',


});

const Payment = model('Payment', paymentSchema);

export default Payment;