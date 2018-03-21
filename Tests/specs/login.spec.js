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
	describe("Logging in", function () {
		const newUser = {
			name: faker.name.firstName(),
			email: faker.internet.email(),
			timeZones:[],
			password: '456565654ds'
		}
        const loginPayload = {
            email : newUser.email,
            password: newUser.password
        }

		beforeAll((done) => {
            request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(200)
				expect(res.body.name).toBe(newUser.name)
				expect(res.body.email).toBe(newUser.email)
                expect(res.body.role).toBe('regular')
				done();
			})
            
        })

		it("should login", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.status).toEqual(200)
				done();
			})
		})

		it("should not login with wrong credentials", function (done) {
			request.post('/users/login').send({
				email: 'randomEmail@test33.com',
				password: '454ds65ds8ew'
			}).end((err, res) => {
				expect(res.status).toBe(401)
				done();
			})
		})

		it("should have token", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.body.token).toBeTruthy()
				done();
			})
		})
		it("should have user object", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.body.user).toBeTruthy()
				done();
			})
		})
		it("should have name", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.body.user).toBeTruthy()
				done();
			})
		})
		it("should have email", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.body.user.email).toBe(newUser.email)
				done();
			})
		})
		it("should have _id", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.body.user._id).toBeTruthy()
				done();
			})
		})
		it("should have role", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.body.user.role).toBe('regular')
				done();
			})
		})
		it("should have timezones", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.body.user.timeZones.length).toBe(newUser.timeZones.length)
				done();
			})
		})
		it("should not have password in response", function (done) {
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.body.user.password).toBeFalsy()
				done();
			})
		})
		it("should not login in case password is incorrect", function (done) {
			loginPayload.password = '12236565rew'
			request.post('/users/login').send(loginPayload).end((err, res) => {
				expect(res.status).toEqual(401)
				done();
			})
		})
		
		

    })
})