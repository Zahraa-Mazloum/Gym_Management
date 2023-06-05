import Membership from '../models/membershipModel.js';
import asyncHandler from 'express-async-handler';
import Debt from '../models/debtModel.js';
import Payment from '../models/paymentModel.js';
import Income from '../models/incomeModel.js';
import Member from'../models/memberModel.js';
import Program from '../models/programModel.js';
import Dollar from '../models/dollarRate.js';
import schedule from 'node-schedule';
import twilio from 'twilio';



const accountSid = process.env.SID;
const authToken = procees.env.AUTHTOKEN;
const twilioClient = twilio(accountSid, authToken);
const sendWhatsAppMessage = (phoneNumber, message) => {
  return new Promise((resolve, reject) => {
    twilioClient.messages
      .create({
        from: 'whatsapp:+14155238886',
        body: `[o2xygen_gym] ${message}`,
        to: `whatsapp:${phoneNumber}`
      })
      .then(message => {
        console.log('WhatsApp message sent:', message.sid);
        resolve(message.sid);
      })
      .catch(error => {
        console.error('Failed to send WhatsApp message:', error);
        reject(error); 
      });
  });
};

const markMessageAsSent = async (membershipId) => {
  try {
    const membership = await Membership.findById(membershipId);
    if (membership) {
      membership.messageSent = true;
      await membership.save();
    }
  } catch (error) {
    console.error('Failed to mark message as sent:', error);
  }
};

export const addMembership = asyncHandler(async (req, res) => {
  try {
    const { member, program, paid } = req.body;

    if (!member || !program || !paid) {
      res.status(400);
      throw new Error('Please enter all fields');
    }

    const memberData = await Member.findById(member);
    const memberName = `${memberData.first_name} ${memberData.middle_name} ${memberData.last_name}`;

    const existingMemberships = await Membership.find({ member });

    if (existingMemberships.length === 0) {
      const programData = await Program.findById(program);
      const programName = programData.name;
      const welcomeMessage = `Welcome to the gym, ${memberName}! You have joined the ${programName} program. We are excited to have you as a new member.`;
      await sendWhatsAppMessage(memberData.phone, welcomeMessage);
    } else {
      const programData = await Program.findById(program);
      const programName = programData.name;
      const welcomeBackMessage = `Welcome back, ${memberName}! You have joined the ${programName} program again. We are happy to see you in our gym.`;
      await sendWhatsAppMessage(memberData.phone, welcomeBackMessage);
    }

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const programData = await Program.findById(program);
    const programName = programData.name;
    const programAmount = programData.price;

    const dollar = await Dollar.findOne();
    const dollarRate = dollar.dollarRate;

    const priceLbp = dollarRate * programAmount;

    const membership = await Membership.create({
      amount: programAmount,
      member,
      program,
      rate: dollar._id,
      paid,
      priceLbp,
      end_date: endDate,
      messageSent: false,
    });

    const membershipEndsTomorrowMessage = `Your ${programName} membership will end tomorrow. Thank you for being a part of our gym!`;

    const createdAt = membership.createdAt.getTime(); 

    const twoMinutesDelay = 2 * 60 * 1000; 
    const delayFromCreation = createdAt + twoMinutesDelay - Date.now();

    const job = schedule.scheduleJob(new Date(Date.now() + delayFromCreation), async () => {
      await sendWhatsAppMessage(memberData.phone, membershipEndsTomorrowMessage);
      await markMessageAsSent(membership._id);
    });

    if (paid < programAmount) {
      const existingDebt = await Debt.findOne({ member: memberData._id });

      if (existingDebt) {
        existingDebt.amount += programAmount - paid;
        existingDebt.notes.push(programName);
        existingDebt.notes = existingDebt.notes.join(" ");
        await existingDebt.save();
      } else {
        const newDebt = await Debt.create({
          amount: programAmount - paid,
          member,
          notes: [programName].join(" "),
        });
      }
    }

    const priceLbpPayment = paid * dollarRate;

    const payment = await Payment.create({
      amount: paid,
      member: memberName,
      membership: membership._id,
      notes: programName,
      priceLbp: priceLbpPayment,
    });

    const descriptionIncome = `Payment from ${memberName}`;

    const income = await Income.create({
      description: descriptionIncome,
      amount: paid,
      rate: dollar._id,
      priceLbp: priceLbpPayment,
    });

    res.status(201).json({ membership, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

schedule.scheduleJob('0 0 * * *', async () => {
  // Schedule this job to run at midnight (0:00) every day
  const memberships = await Membership.find({ messageSent: false });

  memberships.forEach(async (membership) => {
    const endDate = new Date(membership.end_date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (endDate.toDateString() === tomorrow.toDateString()) {
      const member = await Member.findById(membership.member);
      const program = await Program.findById(membership.program);
      const programName = program.name;

      const membershipEndsTomorrowMessage = `Your ${programName} membership will end tomorrow. Thank you for being a part of our gym!`;

      await sendWhatsAppMessage(member.phone, membershipEndsTomorrowMessage);
      await markMessageAsSent(membership._id);
    }
  });
});

export const getMembersWhoReceivedMessage = asyncHandler(async (req, res) => {
  try {
    const members = await Membership.find({ messageSent: true }).populate('member');
    res.json({ members });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getMemberships = asyncHandler(async (req, res) => {
  try {
    const memberships = await Membership.find().populate('member program');
    res.status(200).json(memberships);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});



export const getMembershipById = asyncHandler(async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id).populate('member program');
    if (membership) {
      res.status(200).json(membership);
    } else {
      res.status(404);
      throw new Error('Membership not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


export const updateMembership = asyncHandler(async (req, res) => {
  try {
    const { amount, member, program, paid } = req.body;
    const updatedMembership = await Membership.findByIdAndUpdate(
      req.params.id,
      { amount, member, program,paid },
      { new: true }
    );
    res.json(updatedMembership);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export const deleteMembership = asyncHandler(async (req, response) => {
  try{
      await Membership.deleteOne({_id: req.params.id});
      response.status(201).json("Membership deleted Successfully");
  } catch (error){
      response.status(409).json({ message: error.message});     
  }
})


export const getCurrentMonthMemberCount = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1; 
    const currentYear = new Date().getFullYear(); 
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0); 

    const memberships = await Membership.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    }).distinct('member');

    const memberCount = memberships.length;

    res.json({ count: memberCount });
  } catch (error) {
    console.error('Failed to fetch member count:', error.message);
    res.status(500).json({ message: 'Failed to fetch member count' });
  }
};



const membershipRoutes = {getMemberships,addMembership,getMembershipById,updateMembership,deleteMembership,getMembersWhoReceivedMessage,getCurrentMonthMemberCount};

export default membershipRoutes;
