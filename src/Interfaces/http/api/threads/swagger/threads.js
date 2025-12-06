const Joi = require('joi');

const postAddThread = {
  auth: 'forumapi_jwt',
  tags: ['api', 'Threads'],
  description: 'Menambah thread baru',
  notes: 'User harus login (JWT). Thread akan ditambahkan ke forum.',

  validate: {
    payload: Joi.object({
      title: Joi.string().required().description('Judul thread'),
      body: Joi.string().required().description('Isi thread'),
    }),
  },

  response: {
    schema: Joi.object({
      status: Joi.string().valid('success').required(),
      data: Joi.object({
        addedThread: Joi.object({
          id: Joi.string().required(),
          title: Joi.string().required(),
          owner: Joi.string().required(),
        }),
      }),
    }).label('AddThreadResponse'),
  },
};

const getThread = {
  tags: ['api', 'Threads'],
  description: 'Mengambil detail thread beserta komentar dan replies-nya',
  notes: 'Publik, tidak membutuhkan autentikasi.',

  validate: {
    params: Joi.object({
      thread_id: Joi.string().required().description('ID thread'),
    }),
  },

  response: {
    schema: Joi.object({
      status: Joi.string().valid('success').required(),
      data: Joi.object({
        thread: Joi.object({
          id: Joi.string().required(),
          title: Joi.string().required(),
          body: Joi.string().required(),
          date: Joi.string().required(),
          username: Joi.string().required(),
          comments: Joi.array().items(
            Joi.object({
              id: Joi.string().required(),
              content: Joi.string().required(),
              date: Joi.string().required(),
              username: Joi.string().required(),
              likeCount: Joi.number().required(),
              replies: Joi.array().items(
                Joi.object({
                  id: Joi.string().required(),
                  content: Joi.string().required(),
                  date: Joi.string().required(),
                  username: Joi.string().required(),
                })
              ),
            })
          ),
        }),
      }),
    }).label('GetThreadResponse'),
  },
};

module.exports = {
  postAddThread,
  getThread,
};
