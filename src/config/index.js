import 'dotenv/config';

export const config = {
  app: {
    port: process.env.PORT || 8080,
  },
  db: {
    url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/my_database',
  },
};
