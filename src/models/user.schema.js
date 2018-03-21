const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ROLES = require('../config/rolesConstants')

const roles_enum = {
    values: Object.keys(ROLES).map(key => ROLES[key]),
    message: '`{VALUE}` is not a valid user role.'
};

const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    role: { type: String, enum: roles_enum, required: true, default: ROLES.receptionist },
});

module.exports = usersSchema