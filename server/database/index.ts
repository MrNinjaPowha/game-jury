import mysql from 'mysql2/promise';

async function executeQuery(sql: string) {
  try {
    const database = await mysql.createConnection({
      host: process.env.DBHost,
      database: process.env.DBName,
      user: process.env.DBUser,
      password: process.env.DBPassword,
    });

    return database.query(sql);
  } catch (err) {
    console.error(err);
    return [null];
  }
}

export { executeQuery };
