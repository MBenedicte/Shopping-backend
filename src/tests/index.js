import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
describe('Get ', () => {
  it('should start the first method', done => {
    chai
      .request(app)
      .post(`/api/v1/auth/register`)
      .send({
        firstName: 'bbebeb',
        lastName: 'mmnsn',
        username: 'bvvbdd',
        password: 'password01',
        phone: '250781609214'
      })
      .end((err, res) => {
        
        expect(res.status).to.equal(201);
        done();
      });
  });
});
