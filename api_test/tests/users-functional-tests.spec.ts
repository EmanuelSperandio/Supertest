const request = require('supertest');
const BASE_URL = 'https://dummyjson.com';
const USERS_ENDPOINT = '/users';
const SINGLE_USER_ENDPOINT = '/users/50';

describe('Users Tests', () => {
    it('Should validate USERS endpoint return SC 200', async () =>{
        const response = await request(BASE_URL).get(USERS_ENDPOINT);
        expect(response.status).toBe(200);
    }),

    it('Should validate USERS endpoint response format', async () =>{
        const response = await request(BASE_URL).get(USERS_ENDPOINT);   
        expect(response.body.limit).toBe(30);
        expect(response.body.skip).toBe(0);
    }),

    it('Should validate USER with id = 1 has a valid response format', async () =>{
        const response = await request(BASE_URL).get(SINGLE_USER_ENDPOINT);   
        expect(response.body.id).toBe(50);
        expect(response.body.firstName).toBe('Stella');
        expect(response.body.lastName).toBe('Hughes');
        expect(response.body.age).toBe(33);
        expect(response.body.gender).toBe('female');        
        expect(response.body.company.name).toBe('Ernser Group');
        expect(response.body.role).toBe('user');
    })
})