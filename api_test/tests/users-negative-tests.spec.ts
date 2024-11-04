import routes from '../resource/routes/routes.json';


const request = require('supertest');

describe('Users Negative Tests', () => {
    it('Should validate USER with invalid id return SC 404', async () =>{
        //expect that user with id 50 will never be removed from our database
        const response = await request(routes.BASE_URL).get(routes.SINGLE_USER_ENDPOINT+'999');   
        expect(response.status).toBe(404);
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