const addNewUser = require('../../../src/data-layer/add-new-user.db')
const removeUser = require('../../../src/data-layer/remove-user.db')
const getUser = require('../../../src/data-layer/get-user-by-email')
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

    it("should remove user ", async function (done) {
        const user = await getUser(payload.email)
        expect(user).toBeTruthy()
        await removeUser(id)
        const deletedUser = await getUser(payload.email)
        expect(deletedUser).toBeFalsy()
        done()
    })





})