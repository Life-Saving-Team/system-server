const { setup } = require('../helpers/requestsSpecHelper')
const faker = require('faker')
let server, request
const { adminCredentials, managerCredentials} = require('../constants/credentials')
process.on('unhandledRejection', up => { throw up })


describe("Users endpoint", function () {
	beforeAll(() => {
		[server, request] = setup()

	})
	afterAll(() => {
		server.close()
	})
	describe("Deleting user", function () {
		const newUser = {
			name: faker.name.firstName(),
			email: faker.internet.email(),
			timeZones: [],
			password: '456565654ds'
		}
		let id
		let adminToken
		let managerToken
		

		describe("Acting as an admin", function () {
			beforeEach((done) => {
				request.post('/users').send(newUser).end((err, res) => {
					id = res.body._id
					done()
				})
			})
			beforeAll((done) => {
				request.post('/users/login').send(adminCredentials).end((err, res) => {
					adminToken = res.body.token
					done()
				})
			})

			it("should delete successfully ", function (done) {
				request.delete('/users/' + id)
				.set({ 'Authorization': `Bearer ${adminToken}` })				
				.end((err, res) => {
					expect(res.status).toEqual(200)
					done();
				})
			})

			it("should respond by 404 error when id is not provided ", function (done) {
				request.delete('/users/').end((err, res) => {
					expect(res.status).toEqual(404)
					done();
				})
			})
			it("should respond by error when id is wrong ", function (done) {
				request.delete('/users/' + 53)
				.set({ 'Authorization': `Bearer ${adminToken}` })		
				.end((err, res) => {
					expect(res.status).toEqual(422)
					done();
				})
			})

		})



		describe("Acting as a manager", function () {
			const newUser = {
				name: faker.name.firstName(),
				email: faker.internet.email(),
				timeZones: [],
				password: '456565654ds'
			}
			beforeEach((done) => {
				request.post('/users').send(newUser).end((err, res) => {
					id = res.body._id
					done()
				})
			})
			beforeAll((done) => {
				request.post('/users/login').send(managerCredentials).end((err, res) => {
					managerToken = res.body.token
					done()
				})
			})

			it("should delete successfully ", function (done) {
				request.delete('/users/' + id)
				.set({ 'Authorization': `Bearer ${managerToken}` })				
				.end((err, res) => {
					expect(res.status).toEqual(200)
					done();
				})
			})

			it("should respond by 404 error when id is not provided ", function (done) {
				request.delete('/users/').end((err, res) => {
					expect(res.status).toEqual(404)
					done();
				})
			})
			it("should respond by error when id is wrong ", function (done) {
				request.delete('/users/' + 53)
				.set({ 'Authorization': `Bearer ${managerToken}` })		
				.end((err, res) => {
					expect(res.status).toEqual(422)
					done();
				})
			})

		})


	})
})