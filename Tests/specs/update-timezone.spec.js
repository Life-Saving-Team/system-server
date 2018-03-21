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
    describe("update timezone", function () {

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
        const updatedTimeZone = {
            name: 'timeZone2',
            city: 'Cairo2',
            gmtTimeDifference: 9
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

            it("should update successfully ", function (done) {
                request.put(`/users/${id}/timezones/${timeZoneId}`)
                    .set({ 'Authorization': `Bearer ${userToken}` })
                    .send(updatedTimeZone)
                    .end((err, res) => {
                        expect(res.status).toEqual(200)
                        expect(res.body.timeZones.length).toEqual(1)
                        expect(res.body.timeZones[0].name).toEqual(updatedTimeZone.name)
                        expect(res.body.timeZones[0].city).toEqual(updatedTimeZone.city)
                        expect(res.body.timeZones[0].gmtTimeDifference).toEqual(updatedTimeZone.gmtTimeDifference)
                        done();
                    })
            })

            it("should respond by 404 error when id is not provided ", function (done) {
                request.put(`/users/${id}/timezones/`)
                    .set({ 'Authorization': `Bearer ${userToken}` })
                    .send(newTimeZone)
                    .end((err, res) => {
                        expect(res.status).toEqual(404)
                        done();
                    })
            })

            it("should respond by 400 error when wrong id is provided ", function (done) {
                request.put(`/users/${id}/timezones/1`)
                    .set({ 'Authorization': `Bearer ${userToken}` })
                    .send(newTimeZone)
                    .end((err, res) => {
                        expect(res.status).toEqual(422)
                        done();
                    })
            })

        })


    })
})