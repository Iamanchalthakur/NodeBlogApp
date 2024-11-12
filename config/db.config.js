const { Client } = require('pg');


const client = new Client({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,  
  password: process.env.DB_PWD, 
  database: process.env.DB_NAME,  
});


client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database!');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err.stack);
  });

module.exports = client; 