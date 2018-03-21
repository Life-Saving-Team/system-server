const addNewUser = require('../../../src/data-layer/add-new-user.db')
const updateUserInfo = require('../../../src/data-layer/update-user-info.db')
const { connectToDb } = require('../../helpers/requestsSpecHelper')

const faker = require('faker')


describe("Users endpoint", function () {
    beforeAll(() => {
        connectToDb()
    })
    const payload = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        timeZones: [],
        password: '1234567a'
    }
    let id 
    beforeAll((done) => {
        addNewUser(payload, 'regular').then(x => {
            expect(x.name).toBe(payload.name)
            expect(x.email).toBe(payload.email)
            id = x._id
            done()
        })
    })

    it("should Update User info ", function (done) {
        const newEmail = faker.internet.email()
        const newName =  faker.name.firstName()
        updateUserInfo(id, newEmail, newName ).then(x=>{
            expect(x.name).toBe(newName)
            expect(x.email).toBe(newEmail)
            done()
        })
    })





})