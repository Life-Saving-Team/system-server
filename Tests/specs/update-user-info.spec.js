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
    describe("Updating user info", function () {
        const newUser = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            timeZones: [],
            password: '456565654ds'
        }
        const loginPayload = {
            email: newUser.email,
            password: newUser.password
        }
        const updatedInfoPayload = {
            name: faker.name.firstName(),
            email: faker.internet.email()
        }
        let token
        let user
        beforeAll((done) => {
            request.post('/users').send(newUser).end((err, res) => {
                request.post('/users/login').send(loginPayload).end((err, res) => {
                    token = res.body.token
                    user = res.body.user
                    done();
                })
            })
        })

        it("should not allow unauthenticated users", function (done) {
            request.put(`/users/${user._id}/info`).send(updatedInfoPayload).end((err, res) => {
                expect(res.status).toBe(401)
                done();
            })
        })


        it("should update", function (done) {
            request.put(`/users/${user._id}/info`)
            .set({'Authorization': `Bearer ${token}`})
            .send(updatedInfoPayload)
            .end((err, res) => {
                expect(res.status).toBe(200)
                expect(res.body.name).toBe(updatedInfoPayload.name)
                expect(res.body.email).toBe(updatedInfoPayload.email)
                done();
            })
        })
        it("should return 404 if no id is provided", function (done) {
            request.put(`/users/info`)
            .set({'Authorization': `Bearer ${token}`})
            .send(updatedInfoPayload)
            .end((err, res) => {
                expect(res.status).toBe(404)
                done();
            })
        })
        it("should not allow other regular users to update", function (done) {
            request.put(`/users/${user._id}/info`)
            .set({'Authorization': `Bearer x${token}`})
            .send(updatedInfoPayload)
            .end((err, res) => {
                expect(res.status).toBe(401)
                done();
            })
        })

    })
})