import routes from '../resource/routes/routes.json';


const request = require('supertest');

describe('Users Negative Tests', () => {
    it('Should get an Auth Token with valid credentials', async () => {
        const response = await request(routes.BASE_URL).get(routes.AUTH_ENDPOINT);   
    }),

    it('Should return a message "Access Token is required" if no username/passw is provided', async () => {
        const response = await request(routes.BASE_URL).get(routes.AUTH_ENDPOINT);   
        expect(response.body).toHaveProperty('message','Access Token is required');
    }),

    it('Should return a message "Invalid credentials" if the username/passw provided is invalid', async () => {
        const invalidUser = {username: "invalidusername", password: "invalidpassw"};
        const response = await request(routes.BASE_URL).post(routes.AUTH_ENDPOINT).send(invalidUser).set('Content-Type', 'application/json');      
        expect(response.body).toHaveProperty('message','Invalid credentials');
    })
})