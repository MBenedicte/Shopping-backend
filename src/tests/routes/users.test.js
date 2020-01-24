import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import * as Factory from '../../helpers/factory';
import { sendVerification } from '../../helpers';
import status from '../../config/statusCode';
import db from '../../models';
import statusCode from '../../config/statusCode';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let user = Factory.user.build();
let verificationNumber = sendVerification();
let newUsername;

delete user.id;

const token = jwt.sign(
  { phone: '250786352636', password: 'password01' },
  'secret key'
);

describe('USERS', () => {
  before(async () => {
    try {
      await db.User.destroy({
        where: {},
        truncate: true,
        cascade: true,
        logging: false
      });
    } catch (error) {
      throw error;
    }
  });

  it('Should create user', done => {
    chai
      .request(app)
      .post(`/api/v1/auth/register`)
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        newUsername = res.body.data.username;
        expect(res.status).to.equal(statusCode.CREATED);
      });
    done();
  });
  it('should display a message that the user already exist', done => {
    chai
      .request(app)
      .post(`/api/v1/auth/register`)
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(statusCode.EXIST);
      });
    done();
  });
  it('should allow the user to log in', done => {
    chai
      .request(app)
      .post(`/api/v1/auth/login`)
      .send({
        username: user.username,
        password: user.password,
        phone: user.phone
      })
      .end((err, res) => {
        expect(res.status).to.equal(statusCode.OK);
      });
    done();
  });
});
