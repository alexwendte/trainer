const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { isAuthenticated, validateObjectID } = require('../middleware/middleware_mixins');
const { 
    authorizeTransaction,
    createCreditCard,
    createAddress,
    createPaymentProfile,
    createProfile,
    getProfile,
    deleteProfile,
    getProfileIds,
    PayMentor,
    createBankAccount,
    chargePreviousTransaction,
    createLineItem
} = require('../middleware/authorizenet/customer_profile');

const { APIContracts, APIControllers } = require('authorizenet');

router.post('/profile/create', isAuthenticated, (req, res, next) => {
    
    profile.execute(function() {
        let response = new APIContracts.CreateCustomerProfileResponse(profile.getResponse());
        res.status(200).send(response);
    });
});

router.post('/transaction', isAuthenticated, (req, res, next) => {
    let { cardNumber, 
        cardExpiration,
        firstName, 
        lastName,
        address,
        city,
        state,
        zip,
        country,
        phoneNumber,
        mentor_rate,
        meeting_id,
    } = req.body;
    let creditCard = createCreditCard(cardNumber, cardExpiration);
    let customerAddress = createAddress(firstName, lastName, address, city, state, zip, country, phoneNumber)
    let paymentProfile = createPaymentProfile(creditCard, customerAddress);
    
})
module.exports = router