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
    describe("Updating user password", function () {
        const newUser = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            timeZones: [],
            password: '1234567a'
        }
        const loginPayload = {
            email: newUser.email,
            password: newUser.password
        }
        const updatePasswordPayload = {
            oldPassword: '1234567a',
            newPassword: '1234567b'
        }
        let token
        let user
        let id
        beforeAll((done) => {
            request.post('/users').send(newUser).end((err, res) => {
                request.post('/users/login').send(loginPayload).end((err, res) => {
                    token = res.body.token
                    user = res.body.user
                    id = user._id
                    done();
                })
            })
        })



        it("should update password and be able to login afterwards", function (done) {
            request.put(`/users/${id}/password`)
                .set({ 'Authorization': `Bearer ${token}` })
                .send(updatePasswordPayload)
                .end((err, res) => {
                    expect(res.status).toBe(200)
                    request.post('/users/login').send(loginPayload).end((err, res) => {
                        expect(res.status).toBe(401)
                        request.post('/users/login').send({ email: loginPayload.email, password: updatePasswordPayload.newPassword }).end((err, res) => {
                            expect(res.status).toBe(200)
                            done();
                        })
                    })
                })
        })

        it("should throw error in case old password provided is wrong", function (done) {
            request.put(`/users/${id}/password`)
                .set({ 'Authorization': `Bearer ${token}` })
                .send({
                    oldPassword: '1234567g',
                    newPassword: '1234567b'
                })
                .end((err, res) => {
                    expect(res.status).toBe(400)
                    done()
                })
        })

        it("should return 404 if no id is provided", function (done) {
            request.put(`/users/password`)
                .set({ 'Authorization': `Bearer ${token}` })
                .send(updatePasswordPayload)
                .end((err, res) => {
                    expect(res.status).toBe(404)
                    done();
                })
        })




    })
})