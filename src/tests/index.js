import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
describe('Get ', () => {
  it('should start the first method', () => {
    console.log(app);
    chai
      .request(app)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
  });
});
