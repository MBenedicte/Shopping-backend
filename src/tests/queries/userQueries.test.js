import db from '../../models';
import chai from 'chai';
import { createUserQuery } from '../../queries';
import { user } from '../../helpers/factory';

const { expect } = chai;

const newUser = user.build();
delete newUser.id;

describe('User queries test', () => {
  before(done => {
    try {
      db.User.destroy({
        where: {},
        truncate: true,
        cascade: true,
        logging: false
      });
      done();
    } catch (error) {
      throw error;
    }
  });
  it('Should create a new user', async () => {
    delete newUser.phone;
    const createdUser = await createUserQuery(newUser);
    expect(createdUser).to.include.keys('error');
  });
  
});
