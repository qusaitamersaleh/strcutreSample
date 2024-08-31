import Joi from "joi";

const queryParamsSchema = (req, res, next) => {

  const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    lang: Joi.string().valid("ar", "en").default("ar"),
  });
  
  const { error } = schema.validate(req.params);
  if (!error) next();
  else {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export default queryParamsSchema;
