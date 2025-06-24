import mysql from 'mysql2/promise'; 

export const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456789Js_',
  database: 'pruebatecnica',
});

pool
    .query('SELECT 1')
    .then(() => {
        console.log('Conexion a la base de datos exitosa');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    });



pool.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
});