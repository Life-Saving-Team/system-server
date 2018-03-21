require('dotenv').config()
const app = require('../../src/app')
const db = require('../../src/core/dbConnection.js')
const request = require('supertest')


function setup() {
    db.connectToOriginalDb()
    return [app.listen(6000), request(app)]
}

function connectToDb(){
    db.connectToOriginalDb()
}
module.exports = {
    setup , connectToDb
}