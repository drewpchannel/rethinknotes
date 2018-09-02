const r = require('rethinkdb');

let connection = null;

function connect(siteName, price) {
  let connection = null;
  (() => {
    r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
      console.log('defining conn as ' + conn)
      connection = conn;
    }).then(value => {
      console.log('runnign check')
      checkDuplicates(siteName, price, connection);      
    })
  })()
}

function checkDuplicates (siteName, price, connection) {
  r.table('ttable').filter(r.row('name').eq(siteName)).
    run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            let parsedResults = JSON.stringify(result, null, 2);
            if (parsedResults.length < 10) {
              addNewWebsite(siteName, price);
            } else {
              updatePrices(siteName, price);
            }
        });
    });
}

function addNewWebsite (name, price, connection) {
  if (typeof name === 'string') {
    r.table('ttable').insert([
    { 
      name: name, pc: price
    }
    ]).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    })
  }
}

function updatePrices (siteName, price, connection) {
  r.table('ttable').filter({name: siteName}).update({
    pc: price
  }).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
}

connect("Madden Stories", 205.00);

//creating a new table
/*
  r.db('test').tableCreate('authors3').run(connection, function(err, result) {
    if (err) throw err;
  })
}, reason => {
  console.log('connection faile: ' + reason);
});
*/

//inserting data into that table (incorrect way)
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

//find specific value for every name column
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

//correct way to insert data
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

//find everything with madden value
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

//update data based on the table authors2, column name Madden
/*
  r.table('authors2').filter({name: "Madden"}).update({
    pc: 99.00
  }).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
*/