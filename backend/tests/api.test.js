const request = require('supertest');
const app = require('../app');

beforeEach(async () => {
  await request(app).post('/todos/reset');
});

describe('API Tests', () => {
  it('POST /login - valid', async () => {
    const res = await request(app).post('/login').send({ email: 'test@example.com', password: '1234' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('POST /login - invalid', async () => {
    const res = await request(app).post('/login').send({ email: 'x', password: 'x' });
    expect(res.statusCode).toBe(401);
  });

  it('POST /items - create new todo', async () => {
    const res = await request(app).post('/todos').send({ text: 'One Todo' });
    expect(res.statusCode).toBe(201);
  });

  it('GET /items', async () => {
  const res = await request(app).get('/todos');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0); // ✅ au moins un todo
  expect(res.body[0]).toHaveProperty('text'); // ✅ contient un champ 'text'
});


  it('PUT /items/:id - update existing todo', async () => {
    await request(app).post('/todos').send({ text: 'To Update' });
    const res = await request(app).put('/todos/1').send({ text: 'Updated' });
    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe('Updated');
  });

  it('PUT /items/:id - invalid ID', async () => {
    const res = await request(app).put('/todos/999').send({ text: 'Nothing' });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /items/:id - valid', async () => {
    await request(app).post('/todos').send({ text: 'To Delete' });
    const res = await request(app).delete('/todos/1');
    expect(res.statusCode).toBe(204);
  });

  it('DELETE /items/:id - not found', async () => {
    const res = await request(app).delete('/todos/999');
    expect(res.statusCode).toBe(404);
  });
});
