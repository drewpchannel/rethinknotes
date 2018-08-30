const r = require('rethinkdb');

let connection = null;

r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
  if (err) throw err;
  connection = conn;
})
.then(value => {
  r.table('authors2').filter({name: "Madden"}).update({
    pc: 99.00
  }).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
}).then (value => {
  r.table('authors2').run(connection, (err, cursor) => {
    if (err) throw err;
    cursor.toArray((err, result) => {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    })
  })
})
/*
  r.db('test').tableCreate('authors3').run(connection, function(err, result) {
    if (err) throw err;
  })
}, reason => {
  console.log('connection faile: ' + reason);
});
*/

/*
  r.table('authors').insert([
  { websites: [
    {
      name: "Madden Coin Store",
      pc: 44.00
    }
  ]
  }
  ]).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
*/

//quary table
/*
  r.table('authors').run(connection, (err, cursor) => {
    if (err) throw err;
    cursor.toArray((err, result) => {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    })
  })
*/

/*
  r.table('authors').filter(r.row('websites').column('name').eq("Madden Coin Store")).
      run(connection, function(err, cursor) {
          if (err) throw err;
          cursor.toArray(function(err, result) {
              if (err) throw err;
              console.log(JSON.stringify(result, null, 2));
          });
      };)
*/

/*
  r.table('authors').insert([
  { 
    name: "Madden", pc: "44.00"
  },
  {
    name: "del", pc: "33.00"
  }
  ]).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
*/

/*
  r.table('authors2').filter(r.row('name').eq("Madden")).
    run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
        });
    });
*/

/*
  r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
  })
*/

/*
  r.table('authors2').filter({name: "Madden"}).update({
    pc: 99.00
  }).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
*/