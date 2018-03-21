const addNewUser = require('../../../../src/data-layer/add-new-user.db')
const addbloodRequest = require('../../../../src/data-layer/add-bloodRequest.db')
const { connectToDb } = require('../../../helpers/requestsSpecHelper')

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

    it("should add new bloodRequest ", function (done) {
        const newbloodRequest = {
            name: faker.address.city(),
            city: faker.address.city(),
            gmtTimeDifference: 8
        }
        addbloodRequest(id, newbloodRequest).then(x=>{
            expect(x.timeZones.length).toBe(1)
            expect(x.timeZones[0].city).toBe(newbloodRequest.city)
            expect(x.timeZones[0].name).toBe(newbloodRequest.name)
            expect(x.timeZones[0].gmtTimeDifference).toBe(newbloodRequest.gmtTimeDifference)
            done()
        })
    })





})