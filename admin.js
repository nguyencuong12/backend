let conn = new Mongo();
db = conn.getDB('sashimeomeo');

var object = {
  username: 'admin',
  password:
    'eyJhbGciOiJIUzI1NiJ9.bmd1eWVuY3VvbmdBejE.qBigHpbPSMB-O3eCa6ahyU1iGc0jUQMqt4ZSQbbqFYs',
  role: ['admin'],
};
db.users.insert(object);
