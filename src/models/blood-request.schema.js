
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BLOOD_REQUEST_CONSTANTS = require('../config/bloodRequestConstants')

const source_enum = {
    values: Object.keys(BLOOD_REQUEST_CONSTANTS.source).map(key => BLOOD_REQUEST_CONSTANTS.source[key]),
    message: '`{VALUE}` is not a valid blood source.'
};

const status_enum = {
    values: [BLOOD_REQUEST_CONSTANTS.status.draft, BLOOD_REQUEST_CONSTANTS.status.executed, BLOOD_REQUEST_CONSTANTS.status.reopened,
    BLOOD_REQUEST_CONSTANTS.status.routedToCities, BLOOD_REQUEST_CONSTANTS.status.submitted],
    message: '`{VALUE}` is not a valid blood request status.'
};

const blood_type_enum = {
    values: Object.keys(BLOOD_REQUEST_CONSTANTS.bloodType).map(key => BLOOD_REQUEST_CONSTANTS.BloodGroup[key]),
    message: '`{VALUE}` is not a valid blood group.'
}

const blood_group_enum = {
    values: Object.keys(BLOOD_REQUEST_CONSTANTS.BloodGroup).map(key => BLOOD_REQUEST_CONSTANTS.BloodGroup[key]),
    message: '`{VALUE}` is not a valid blood group.'
}

const schema = new Schema({
    source: { type: String, enum: source_enum, required: true, default:  BLOOD_REQUEST_CONSTANTS.source.both },
    status: { type: String, enum: status_enum, required: true },
    assignedDonors: [String],
    isConfirmedReceivingBlood: { type: Boolean, required: true, default: false },
    caseReviewed: { type: Boolean, required: true, default: false },

    dateOfNeed: { type: Date, required: true },
    dateOpened: { type: Date, required: true },

    requestOwner: { type: Schema.ObjectId, ref: 'Admin' },
    callerName: String,
    callerPhoneNumber: Number,
    // patientId: { type: Schema.ObjectId, ref: 'Patient' },
    currentHospitalPlace: { type: String, required: true },
    expectedNumberOfDonors: { type: Number, required: true },
    reasonForBloodNeed: { type: String, required: true },

    bloodBags: [new Schema({ 
        bloodType: {
            enum: blood_type_enum,
            required: true,
            default: BLOOD_REQUEST_CONSTANTS.bloodType.normal
        },
        numberOfBloodBags: { type: Number },
    })],
    // bloodGroup: { type: String, enum: blood_group_enum, required: true },
    closingDetails : new Schema({ 
        reasonForClosing: { type: String },
        dateOfClosure: { type: Date },
    }),
    patientFeedBack: String,

    description: { type: String, required: true },
    city: { type: String, required: true },

});

module.exports = schema