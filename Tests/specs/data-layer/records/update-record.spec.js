const addNewUser = require('../../../../src/data-layer/add-new-user.db')
const addbloodRequest = require('../../../../src/data-layer/add-bloodRequest.db')
const { connectToDb } = require('../../../helpers/requestsSpecHelper')
const getUserbloodRequestsById = require('../../../../src/data-layer/get-user-bloodRequests-by-id.db')
const updatebloodRequest = require('../../../../src/data-layer/update-bloodRequest.db')
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
    let timeZoneId
    beforeAll((done) => {
        addNewUser(payload, 'regular').then(x => {
            expect(x.name).toBe(payload.name)
            expect(x.email).toBe(payload.email)
            id = x._id
            const newbloodRequest = {
                name: faker.address.city(),
                city: faker.address.city(),
                gmtTimeDifference: 8
            }
            addbloodRequest(id, newbloodRequest).then(x => {
                expect(x.timeZones.length).toBe(1)
                expect(x.timeZones[0].city).toBe(newbloodRequest.city)
                expect(x.timeZones[0].name).toBe(newbloodRequest.name)
                expect(x.timeZones[0].gmtTimeDifference).toBe(newbloodRequest.gmtTimeDifference)
                timeZoneId = x._id
                done()
            })
        })
    })

    it("should update bloodRequest ", async function (done) {      
        const updatedbloodRequest = {
            name: faker.address.city(),
            city: faker.address.city(),
            gmtTimeDifference: 5
        }
         updatebloodRequest(id, timeZoneId, updatedbloodRequest).then(x=>{
            done()
            
        })
        
        const u = await getUserbloodRequestsById(id)
        
            
        // expect(updated.timeZones[0].gmtTimeDifference).toBe(5)
        // expect(updated.timeZones[0].name).toBe(updatedbloodRequest.name)
        // expect(updated.timeZones[0].city).toBe(updatedbloodRequest.city)
        
    })





})