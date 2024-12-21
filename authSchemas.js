const { z } = require('zod');

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string().optional(),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

module.exports = { signupSchema, signinSchema };
