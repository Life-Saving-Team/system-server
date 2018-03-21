const { setup } = require('../helpers/requestsSpecHelper')
const faker = require('faker')
const { adminCredentials, managerCredentials} = require('../constants/credentials')

let server, request

describe("Users endpoint", function () {
    beforeAll(() => {
        [server, request] = setup()
    })
    afterAll(() => {
        server.close()
    })
    describe("Updating user role", function () {
        let adminToken
        let newUserId
        beforeAll((done) => {
            // Login as super admin
            
            const newUser = {
                name: faker.name.firstName(),
                email: faker.internet.email(),
                timeZones: [],
                password: '456565654ds'
            }
            request.post('/users').send(newUser).end((err, res) => {
                newUserId = res.body._id
                done();
            })
        })

        describe('Acting as an admin', () => {
            beforeAll((done) => {
                request.post('/users/login').send(adminCredentials).end((err, res) => {
                    adminToken = res.body.token
                    done()
                })
            })
            it("should not allow unauthenticated users", function (done) {
                request.patch(`/users/${newUserId}/role`).send({ role: 'manager' }).end((err, res) => {
                    expect(res.status).toBe(401)
                    done();
                })
            })


            it("should update role as manager ", function (done) {
                request.patch(`/users/${newUserId}/role`)
                    .set({ 'Authorization': `Bearer ${adminToken}` })
                    .send({ role: 'manager' })
                    .end((err, res) => {
                        expect(res.status).toBe(200)
                        done();
                    })
            })

            it("should update role as admin ", function (done) {
                request.patch(`/users/${newUserId}/role`)
                    .set({ 'Authorization': `Bearer ${adminToken}` })
                    .send({ role: 'admin' })
                    .end((err, res) => {
                        expect(res.status).toBe(200)
                        done();
                    })
            })

            it("should update role as regular ", function (done) {
                request.patch(`/users/${newUserId}/role`)
                    .set({ 'Authorization': `Bearer ${adminToken}` })
                    .send({ role: 'regular' })
                    .end((err, res) => {
                        expect(res.status).toBe(200)
                        done();
                    })
            })

            it("should return 404 if no id is provided", function (done) {
                request.patch(`/users/role`)
                    .set({ 'Authorization': `Bearer ${adminToken}` })
                    .send({ role: 'manager' })
                    .end((err, res) => {
                        expect(res.status).toBe(404)
                        done();
                    })
            })
        })



        describe('Acting as a manager', () => {
            let managerToken
            beforeAll((done) => {
                request.post('/users/login').send(managerCredentials).end((err, res) => {
                    managerToken = res.body.token
                    done()
                })
            })
            it("should not allow unauthenticated users", function (done) {
                request.patch(`/users/${newUserId}/role`).send({ role: 'manager' }).end((err, res) => {
                    expect(res.status).toBe(401)
                    done();
                })
            })


            it("should not update role as manager ", function (done) {
                request.patch(`/users/${newUserId}/role`)
                    .set({ 'Authorization': `Bearer ${managerToken}` })
                    .send({ role: 'manager' })
                    .end((err, res) => {
                        expect(res.status).toBe(403)
                        done();
                    })
            })

            it("should not update role as admin ", function (done) {
                request.patch(`/users/${newUserId}/role`)
                    .set({ 'Authorization': `Bearer ${managerToken}` })
                    .send({ role: 'admin' })
                    .end((err, res) => {
                        expect(res.status).toBe(403)
                        done();
                    })
            })

            it("should not update role as regular ", function (done) {
                request.patch(`/users/${newUserId}/role`)
                    .set({ 'Authorization': `Bearer ${managerToken}` })
                    .send({ role: 'regular' })
                    .end((err, res) => {
                        expect(res.status).toBe(403)
                        done();
                    })
            })

        })
    })
})