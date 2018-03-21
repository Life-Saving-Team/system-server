const { setup } = require('../helpers/requestsSpecHelper')
const faker = require('faker')
let server, request

describe("Users endpoint", function () {
    beforeAll(() => {
        [server, request] = setup()

    })
    afterAll(() => {
        server.close()
    })
    describe("delete timezone", function () {

        const newUser = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            timeZones: [],
            password: '456565654ds'
        }
        const newUserCredentials = {
            email: newUser.email,
            password: newUser.password
        }
        const newTimeZone = {
            name: 'timeZone1',
            city: 'Cairo',
            gmtTimeDifference: 6
        }
        let id
        let userToken
        let timeZoneId
        beforeAll((done) => {
            request.post('/users').send(newUser).end((err, res) => {
                id = res.body._id
                done()
            })
        })
        describe("Acting as same user", function () {
            beforeAll((done) => {
                request.post('/users/login').send(newUserCredentials).end((err, res) => {
                    userToken = res.body.token
                    request.post(`/users/${id}/timezones`)
                        .set({ 'Authorization': `Bearer ${userToken}` })
                        .send(newTimeZone)
                        .end((err, res) => {
                            timeZoneId = res.body.timeZones[0]._id
                            done();
                        })
                })
            })

            it("should delete successfully ", function (done) {
                request.delete(`/users/${id}/timezones/${timeZoneId}`)
                    .set({ 'Authorization': `Bearer ${userToken}` })
                    .end((err, res) => {
                        expect(res.status).toEqual(200)
                        expect(res.body.timeZones.length).toEqual(0)
                        done();
                    })
            })

            it("should respond by 404 error when id is not provided ", function (done) {
                request.delete(`/users/${id}/timezones/`)
                    .set({ 'Authorization': `Bearer ${userToken}` })
                    .end((err, res) => {
                        expect(res.status).toEqual(404)
                        done();
                    })
            })

            it("should respond by 400 error when wrong id is provided ", function (done) {
                request.delete(`/users/${id}/timezones/1`)
                    .set({ 'Authorization': `Bearer ${userToken}` })
                    .end((err, res) => {
                        expect(res.status).toEqual(422)
                        done();
                    })
            })

        })


    })
})