// backend/src/tests/api.test.ts

import request from 'supertest';
import app from '../app';

describe('POST /api/teams', () => {
  test('should create teams with valid input', async () => {
    const response = await request(app)
      .post('/api/teams')
      .send({ players: ['Player 1', 'Player 2', 'Player 3', 'Player 4'] });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('team1');
    expect(response.body).toHaveProperty('team2');
  });

  test('should return an error with invalid input', async () => {
    const response = await request(app)
      .post('/api/teams')
      .send({ players: ['Player 1'] });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('Catch-all route handler', () => {
  test('should return a 404 error for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});
