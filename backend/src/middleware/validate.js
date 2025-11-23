const joi = require("joi");
const { register, login } = require("../controllers/authController");

// using JOI to define schemas for createTasks and updateTasks
// Middleware to validate request data
const schema = {
  createTask: joi.object({
    title: joi.string().min(3).max(200).required().messages({
      "string.empty": "Title is required",
      "string.max": "Title cannot exceed 200 characters",
    }),
    description: joi.string().allow("").max(2000).messages({
      "string.max": "Description cannot exceed 2000 characters",
    }),
    priority: joi.string().valid("HIGH", "MEDIUM", "LOW").optional().messages({
      "any.only": "Priority must be HIGH, MEDIUM, or LOW",
    }),
    state: joi
      .string()
      .valid("NEW", "IN_PROGRESS", "DONE")
      .optional()
      .messages({
        "any.only": "State must be NEW, IN_PROGRESS, or DONE",
      }),
  }),

  updateTask: joi.object({
    title: joi.string().min(3).max(200).optional(),
    description: joi.string().allow("").max(2000),
    priority: joi.string().valid("HIGH", "MEDIUM", "LOW").optional(),
    state: joi.string().valid("NEW", "IN_PROGRESS", "DONE").optional(),
    completed: joi.boolean().optional(),
  }),

  register: joi.object({
    email: joi.string().email().required().messages({
      "string.email": "Enter a valid email",
    }),
    password: joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
    }),
    name: joi.string().max(200).optional(),
  }),

  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

module.exports = (schemaName) => (req, res, next) => {
  const schemas = schema[schemaName];
  if (!schemas) return next();
  const { error, value } = schemas.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  req.body = value;
  next();
};
