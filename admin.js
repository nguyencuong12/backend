let conn = new Mongo();
db = conn.getDB('sashimeomeo');

var object = {
  username: 'admin',
  password: '$2a$12$Y0h99ySzH17otZ4Z..lM8uDGN1hT2GW0MxCdOX93TsZiZmNcJdKz',
  role: ['admin'],
};
db.users.insert(object);
