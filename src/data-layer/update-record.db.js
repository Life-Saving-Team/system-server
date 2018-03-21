const bloodRequestModel = require('../models/users.model')

module.exports = (_id, bloodRequestId, updatedBloodRequest) => {
    return bloodRequestModel.findOneAndUpdate(
        { _id, "bloodRequests._id": bloodRequestId },
        { $set: { "bloodRequests.$": updatedBloodRequest } },
        { new: true }
    )
}


