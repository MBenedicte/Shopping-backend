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
    phone: Joi.string()
      .trim()
      .regex(/^[0-9]{7,12}$/)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{1,30}$/)
      .min(10)
      .max(10)
  });
  return schema.validate(input);
};
