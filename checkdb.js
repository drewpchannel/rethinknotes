const r = require('rethinkdb');

r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
  if (err) throw err;
  connection = conn;
}).then(value => {
  r.table('ttable').run(connection, (err, cursor) => {
    if (err) throw err;
    cursor.toArray((err, result) => {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    })
  })
})