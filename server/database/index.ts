import mysql from 'mysql2/promise';

const database = mysql.createConnection({
  host: process.env.DBHost,
  database: process.env.DBName,
  user: process.env.DBUser,
  password: process.env.DBPassword,
});

async function executeQuery(sql: string) {
  try {
    const connection = await database;
    return connection.query(sql);
  } catch (err) {
    console.error(err);
    return [null];
  }
}

export { executeQuery };
