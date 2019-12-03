import passwordHash from 'password-hash';

export const hash = password => {
  return passwordHash.generate(password);
};

export const verifyHashed = (password, savedPassword) => {
  
  return passwordHash.verify(password, savedPassword);
};
