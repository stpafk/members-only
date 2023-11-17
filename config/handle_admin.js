const mongoose = require('mongoose');
const User = require('../models/users');

exports.handle_admin = async function() {
    //get the top amount
    let topAmount = await User.findOne().sort({ amount_contributed: -1 }).exec();
    // update all but the top amount 
    await User.updateMany({_id: {$ne: topAmount._id}}, {$set: {is_admin: false}});
    //update the contributor
    await User.findByIdAndUpdate(topAmount._id, {is_admin: true}, {});

    return;
}