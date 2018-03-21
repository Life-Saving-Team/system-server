const { setup } = require('../helpers/requestsSpecHelper')
let server, request
const { adminCredentials } = require('../constants/credentials')
describe("Users endpoint", function () {
	beforeAll(() => {
		[server, request] = setup()
	})
	afterAll(() => {
		server.close()
	})
	describe("Getting users", function () {
		let token
		beforeAll((done) => {
			request.post('/users/login').send(adminCredentials).end((err, res) => {
				token = res.body.token
				done()
			})
		})


		it("should get users successfully ", function (done) {
			request.get('/users?skip=10/')
				.set({ 'Authorization': `Bearer ${token}` })
				.end((err, res) => {
					expect(res.status).toEqual(200)
					expect(Array.isArray(res.body.users)).toBe(true)
					expect(Number.isInteger(res.body.count)).toBe(true)
					done();
				})
		})


		it("should get userDetials successfully as admin", function (done) {
			request.get('/users/')
				.set({ 'Authorization': `Bearer ${token}` })
				.end((err, res) => {
					request.get(`/users/${res.body.users[0]._id}`)
						.set({ 'Authorization': `Bearer ${token}` })
						.end((err, res) => {
							expect(res.body._id).toBeTruthy()
							expect(res.body.name).toBeTruthy()
							expect(res.body.email).toBeTruthy()
							expect(res.body.timeZones).toBeTruthy()
							expect(res.body.role).toBeTruthy()
							expect(res.status).toBe(200)
							done();
						})
				})
		})


	})
})