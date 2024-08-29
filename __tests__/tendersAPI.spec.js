const request = require('supertest');
const app = 'http://localhost:5000';

describe('Testes do Endpoint de Licitações', () => {
  it('Deve retornar as licitações do intervalo de tempo fornecido', async () => {
    const startYear = '2023';
    const startMonth = '01';
    const endYear = '2023';
    const endMonth = '06';

    const res = await request(app)
    .get(`/tenders?start=${startYear}${startMonth}&end=${endYear}${endMonth}`)
    .expect('Content-Type', /json/)
    .expect(200);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach(tender => {
      expect(tender).toHaveProperty('committed_value');
      expect(tender).toHaveProperty('liquidated_value');
      expect(tender).toHaveProperty('paid_value');
      expect(tender).toHaveProperty('year');
      expect(tender).toHaveProperty('month');
    });
  });

  it('Deve retornar um erro quando o ano for digitado errado', async () => {
    const startYear = '23';
    const startMonth = '01';
    const endYear = '23';
    const endMonth = '06';

    const res = await request(app)
      .get(`/tenders?start=${startYear}${startMonth}&end=${endYear}${endMonth}`);
    
    expect(res.status).toBe(400);
    expect(res.body).toBeDefined();
  });
});
