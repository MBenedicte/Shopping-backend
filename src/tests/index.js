import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
describe('Get ', () => {
  it('should start the first method', () => {
    chai
      .request(app)
      .post(`/api/v1/auth/register`)
      .send({
        firstName: 'bene',
        lastName: 'musa',
        password: 'password01',
        username: 'bebbb',
        phone: '250781609216'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
  });
});
