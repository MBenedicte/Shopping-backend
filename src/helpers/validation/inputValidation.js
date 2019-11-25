import Joi from '@hapi/joi';

export default input => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(15)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(15)
      .required(),
    username: Joi.string()
      .min(3)
      .max(15)
      .required(),
    phone: Joi.string(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/)
  });
  return schema.validate(input);
};
