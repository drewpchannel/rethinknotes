const r = require('rethinkdb');

let connection = null;

function checkDuplicates (siteName, pricePs, pricePc, priceXb) {
  r.connect( {host: 'localhost', port: 28015, db: 'CoinPrices'}, function(err, conn) {
    connection = conn;
  })
  .then (value =>{
    r.table('websites').filter(r.row('name').eq(siteName)).
      run(connection, function(err, cursor) {
          if (err) throw err;
          cursor.toArray(function(err, result) {
              if (err) throw err;
              let parsedResults = JSON.stringify(result, null, 2);
              if (parsedResults.length < 10) {
                addNewWebsite(siteName, pricePs, pricePc, priceXb);
              } else {
                updatePrices(siteName, pricePs, pricePc, priceXb);
              }
          });
      });
  })
}

function addNewWebsite (siteName, pricePs, pricePc, priceXb) {
  if (typeof siteName === 'string') {
    r.connect( {host: 'localhost', port: 28015, db: 'CoinPrices'}, function(err, conn) {
      connection = conn;
    })
    .then(value => {
      r.table('websites').insert([
      { 
        name: siteName, 
        ps: pricePs,
        pc: pricePc, 
        xb: priceXb
      }
      ]).run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
      })
    })
  }
}

function updatePrices (siteName, pricePs, pricePc, priceXb) {
  r.connect( {host: 'localhost', port: 28015, db: 'CoinPrices'}, function(err, conn) {
    connection = conn;
  })
  .then(value => {
    r.table('websites').filter({name: siteName}).update({
      name: siteName, 
      ps: pricePs,
      pc: pricePc, 
      xb: priceXb
    }).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
    })
  })
}

checkDuplicates('The MUT Market', '21.00', '34.00', '21.00');

//creating a new table
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

//search for a specific item in table
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

//search for specific value
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

//connect with specific DB
/*
  r.connect( {host: 'localhost', port: 28015, db: 'CoinPrices'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
  })
*/

//update specefic value
/*
  r.table('authors2').filter({name: "Madden"}).update({
    pc: 99.00
  }).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })
*/