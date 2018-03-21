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
	describe("Sign up", function () {
		const newUser = {
			name: faker.name.firstName(),
			email: faker.internet.email(),
			timeZones:[],
			password: '456565654ds'
		}

		it("should add user", function (done) {
			request.post('/users').send(newUser).end((err, res) => {
				
				// expect(res.status).toEqual(200)
				// expect(res.body.name).toBe(newUser.name)
				// expect(res.body.email).toBe(newUser.email)
				// expect(res.body.role).toBe('regular')
				done();
			})
		})
		it("should not allow duplicate emails", function (done) {
			request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(409)
				done();
			})
		})
		it("should respond by error message in case password have no letter", function (done) {
			newUser.password = '12236565'
			request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(422)
				done();
			})
		})
		
		it("should respond by error message in case password have no number", function (done) {
			newUser.password = 'herogymisthe'
			request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(422)
				done();
			})
		})
		it("should respond by error message in case password is not lengthy enough", function (done) {
			newUser.password = 'i5o'
			request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(422)
				done();
			})
		})

		it("should respond by error message in case name is not provided", function (done) {
			newUser.name = undefined
			request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(422)
				done();
			})
		})
		it("should respond by error message in case email is not provided", function (done) {
			newUser.email = undefined
			request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(422)
				done();
			})
		})
		it("should respond by error message in case password is not provided", function (done) {
			newUser.password = undefined
			request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(422)
				done();
			})
		})
		it("should respond by error message in case email do not have the appropriate format", function (done) {
			newUser.email = 'thisIsNOTanEmail'
			request.post('/users').send(newUser).end((err, res) => {
				expect(res.status).toEqual(422)
				done();
			})
		})

        

    })
})