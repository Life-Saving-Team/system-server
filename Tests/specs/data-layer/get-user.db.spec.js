const addNewUser = require('../../../src/data-layer/add-new-user.db')
const getUserByEmail = require('../../../src/data-layer/get-user-by-email')
const getUsers = require('../../../src/data-layer/get-users.db')
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
    beforeAll((done) => {
        addNewUser(payload, 'regular').then(x => {
            expect(x.name).toBe(payload.name)
            expect(x.email).toBe(payload.email)
            done()
        })
    })

    it("should GET USER BY EMAIL ", function (done) {
        getUserByEmail(payload.email).then(x => {
            expect(x.email).toBe(payload.email)
            expect(x.name).toBe(payload.name)
            done()
        }).catch(err => { throw err })
    })

    it("should GET All Users ", function (done) {
        getUsers.getAllUsers(10,0).then(x => {
            expect(x.length).toBeTruthy()
            expect(x[0].name).toBeTruthy()
            expect(x[0].email).toBeTruthy()
            expect(x[0].role).toBeTruthy()
            done()
        }).catch(err => { throw err })
    })

    it("should GET All Regular Users ", function (done) {
        getUsers.getRegularUsers(10,0).then(x => {
            expect(x.length).toBeTruthy()
            expect(x[0].name).toBeTruthy()
            expect(x[0].email).toBeTruthy()
            done()
        }).catch(err => { throw err })
    })

    it("should GET All Users count", function (done) {
        getUsers.getAllUsersCount().then(x => {
            expect(Number.isInteger(x)).toBe(true)
            expect(x).toBeTruthy()
            done()
        }).catch(err => { throw err })
    })


    it("should GET All Regular Users count ", function (done) {
        getUsers.getRegularUsersCount().then(x => {
            expect(Number.isInteger(x)).toBe(true)
            expect(x).toBeTruthy()
            done()
        }).catch(err => { throw err })
    })






})