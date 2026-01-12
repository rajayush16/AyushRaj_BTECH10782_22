const { z } = require('zod');

const updateProfile = z.object({
  body: z
    .object({
      name: z.string().min(2, 'Name is required').optional(),
      email: z.string().email('Valid email is required').optional(),
      password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

module.exports = { updateProfile };