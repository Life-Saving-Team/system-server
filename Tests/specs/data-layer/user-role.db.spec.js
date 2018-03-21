const addNewUser = require('../../../src/data-layer/add-new-user.db')
const updateUserRole = require('../../../src/data-layer/update-role.db')
const getUserRoleById = require('../../../src/data-layer/get-user-role-by-id')
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
    beforeAll(async (done) => {
        const user = await addNewUser(payload, 'regular')
        expect(user.name).toBe(payload.name)
        expect(user.email).toBe(payload.email)
        id = user._id
        done()
    })



    it("should Update and get user role ", async function (done) {
        const newRole = 'manager'
        expect(await updateUserRole(id, newRole)).toBeTruthy()
        expect(await getUserRoleById(id)).toBe(newRole)
        done()
    })





})