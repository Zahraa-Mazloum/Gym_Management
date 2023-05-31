import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const dollarSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  dollarRate: {
    type: Number,
    required: true,
  },
});

const Dollar = model('Dollar', dollarSchema);

export default Dollar;
