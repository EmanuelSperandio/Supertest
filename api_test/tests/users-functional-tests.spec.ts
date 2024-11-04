import routes from '../resource/routes/routes.json';

const request = require('supertest');

describe('Users Functional Tests', () => {
    it('Should validate USERS endpoint return SC 200', async () =>{
        const response = await request(routes.BASE_URL).get(routes.USERS_ENDPOINT);
        expect(response.status).toBe(200);
    }),

    it('Should validate USERS endpoint response format', async () =>{
        const response = await request(routes.BASE_URL).get(routes.USERS_ENDPOINT);   
        expect(response.body.limit).toBe(30);
        expect(response.body.skip).toBe(0);
    }),

    it('Should validate USER with id = 50 has valid information', async () =>{
        //expect that user with id 50 will never be removed from our database
        const response = await request(routes.BASE_URL).get(routes.SINGLE_USER_ENDPOINT);   
        expect(response.body.id).toBe(50);
        expect(response.body.firstName).toBe('Stella');
        expect(response.body.lastName).toBe('Hughes');
        expect(response.body.age).toBe(33);
        expect(response.body.gender).toBe('female');        
        expect(response.body.company.name).toBe('Ernser Group');
        expect(response.body.role).toBe('user');
    }),

    it('Should have a accessToken and refreshToken in responsebody if the username/passw provided is valid', async () => {
        const validUser = {username: "emilys", password: "emilyspass"};
        const response = await request(routes.BASE_URL).post(routes.AUTH_ENDPOINT).send(validUser).set('Content-Type', 'application/json');      
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body).toHaveProperty('username', validUser.username);
    })
})