import passwordHash from 'password-hash';

export default password => {
  return passwordHash.generate(password);
};
