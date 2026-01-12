const { z } = require('zod');

const statusEnum = z.enum(['pending', 'in-progress', 'completed']);

const taskIdParam = z.object({
  params: z.object({
    id: z.string().length(24, 'Invalid task id'),
  }),
});

const createTask = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    status: statusEnum.optional(),
    due_date: z.coerce.date(),
    completed_date: z.coerce.date().optional(),
  }),
});

const updateTask = z.object({
  params: z.object({
    id: z.string().length(24, 'Invalid task id'),
  }),
  body: z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      status: statusEnum.optional(),
      due_date: z.coerce.date().optional(),
      completed_date: z.coerce.date().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

const taskStatusQuery = z.object({
  query: z.object({
    status: statusEnum.optional(),
  }),
});

module.exports = { taskIdParam, createTask, updateTask, taskStatusQuery };
