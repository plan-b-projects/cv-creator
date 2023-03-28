/* global db */
db.createUser({
  user: 'cvAdmin',
  pwd: 'cvPassword',
  roles: [
    {
      role: 'readWrite',
      db: 'cvDb',
    },
  ],
});
db.getSiblingDB('cvDb').users.createIndex({ email: 1 }, { unique: true });
