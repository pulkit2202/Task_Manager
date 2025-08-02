const request = require('supertest');
const app = require('../app'); // Ensure app.js exports the express app

describe('Auth Routes', () => {
  it('should fail login with wrong credentials', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'wrong@example.com',
      pass: 'incorrect'
    });

    expect(res.statusCode).toBe(401);  
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe('Invalid email or password.');
  });
});
