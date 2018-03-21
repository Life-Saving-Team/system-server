
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BLOOD_REQUEST_CONSTANTS = require('../config/bloodRequestConstants')


const blood_group_enum = {
    values: Object.keys(BLOOD_REQUEST_CONSTANTS.BloodGroup).map(key => BLOOD_REQUEST_CONSTANTS.BloodGroup[key]),
    message: '`{VALUE}` is not a valid blood group.'
}

const schema = new Schema({
    name: { type: String, required: true },
    number: { type: Number },
    city: { type: String },
    address: { type: String },
    bloodGroup: { type: String, enum: blood_group_enum, required: true },
    diagnosedDiseases: [String],
    bloodRequests: [{ type: Schema.ObjectId, ref: 'BloodRequest' }],
});

module.exports = schema