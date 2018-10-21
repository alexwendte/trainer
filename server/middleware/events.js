const EventEmitter = require('events').EventEmitter;
const bcrypt = require('bcrypt');
let transactionsEvents = new EventEmitter();
const { 
    authorizeTransaction,
    chargePreviousTransaction,
    createProfile, 
    createCreditCard, 
    createAddress,
    createPaymentProfile,
    getProfile,
    deleteProfile 
} = require('./authorizenet/customer_profile');

const Meeting = require('../models/Meeting');
//Mentor Completed Signup, create the mentor's payment profile
transactionsEvents.addListener('mentorCompletedSignup', function(user, paymentInfo) {
    let { cardNumber, 
        cardExpiration, 
        firstName, 
        lastName,
        address,
        city,
        state,
        zip,
        country,
        phoneNumber
    } = paymentInfo;
    let creditCard = createCreditCard(cardNumber, cardExpiration);
    let customerAddress = createAddress(firstName, lastName, address, city, state, zip, country, phoneNumber)
    let paymentProfile = createPaymentProfile(creditCard, customerAddress);
    createProfile(paymentProfile, String(req.user._id).slice(4, 23), user);
});

// Meeting accepted charge the card, credit the mentor
transactionsEvents.addListener('meetingAccepted', function(meeting, req){
    //Meeting is marked as accepted, so that means that we should charge the transaction
    chargePreviousTransaction(meeting.transactionID, meeting, meeting.studentID);
});

transactionsEvents.addListener('meetingRequested', function(meeting, req) {
    let { cardNumber, 
        cardExpiration,
        cardCode, 
        firstName, 
        lastName,
        address,
        city,
        state,
        zip,
        country,
        phoneNumber
    } = req
    let creditCard = createCreditCard(cardNumber, cardExpiration, cardCode);
    let customerAddress = createAddress(firstName, lastName, address, city, state, zip, country, phoneNumber);
    Meeting.findById(meeting._id)
    .populate('mentorID', '-password')
    .populate('studentID', '-password').then((meeting, err) => {
        authorizeTransaction(creditCard, customerAddress, meeting);
    })
});

module.exports = transactionsEvents;