import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../app';
import * as Factory from '../../helpers/factory';
import { sendVerification } from '../../helpers';
import db from '../../models';
import statusCode from '../../config/statusCode';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let newUser = Factory.user.build();
let verificationNumber;
let newUsername;

delete newUser.id;

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
  describe('Register the user', () => {
    it('Should create user', done => {
      chai
        .request(app)
        .post(`/api/v1/auth/register`)
        .send(newUser)
        .end((err, res) => {
          verificationNumber = res.body.data.verificationNumber;
          expect(res.status).to.equal(statusCode.CREATED);
          done();
        });
    });
    it('should display a message that the user already exist', done => {
      chai
        .request(app)
        .post(`/api/v1/auth/register`)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(statusCode.EXIST);
          done();
        });
    });
  });

  describe('Activate the user', () => {
    it('Should activate the user', done => {
      chai
        .request(app)
        .patch(`/api/v1/auth/register/activate/${newUser.username}`)
        .send({
          verificationNumber
        })
        .end((err, res) => {
          expect(res.status).to.deep.equal(statusCode.OK);
          done();
        });
    });
  });
  describe('User login', () => {
    it('Should activate the user', done => {
      chai
        .request(app)
        .patch(`/api/v1/auth/register/activate/${newUser.username}`)
        .send({
          verificationNumber
        })
        .end((err, res) => {
          expect(res.status).to.equal(statusCode.OK);
          done();
        });
    });
    it('Should allow the user to login', done => {
      chai
        .request(app)
        .post(`/api/v1/auth/login`)
        .send({
          username: newUser.username,
          phone: newUser.phone,
          password: newUser.password
        })
        .end((err, res) => {
          expect(res.status).to.equal(statusCode.NOT_FOUND);
          done();
        });
    });
  });
});
