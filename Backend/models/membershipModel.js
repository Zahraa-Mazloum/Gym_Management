import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const membershipSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
    rate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dollar',
    },
    priceLbp: {
      type: Number,
    },
    paid: {
      type: Number,
    },
    end_date:{
      type: Date,
    }
  },

  {
    timestamps: true,
    collection: 'memberships',
  }
);

const Membership = model('Membership', membershipSchema);

export default Membership;
