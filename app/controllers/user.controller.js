const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'testdb'
};

// Crea un pool de conexiones para manejar las conexiones de manera eficiente
const pool = mysql.createPool(dbConfig);

exports.allAccess = async (req, res) => {
  try {
    const data = await obtenerDatosPublicos();
    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.userBoard = async (req, res) => {
    try {
      const data = await obtenerDatosUsers();
      
     
      res.status(200).send(JSON.stringify(data));
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

  exports.adminBoard = async (req, res) => {
    try {
      const data = await obtenerDatosAdmin();
      res.status(200).send(JSON.stringify(data));
      
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

async function obtenerDatosPublicos() {
  // Obtiene una conexión del pool
  const connection = await pool.getConnection();

  try {
    // Ejecuta la consulta para obtener datos
    const [result] = await connection.execute('SELECT COUNT(*) AS numero_filas FROM users');
    const numeroFilas = result[0].numero_filas;

    // Imprime los datos obtenidos
    console.log('Datos obtenidos:', numeroFilas);

    return numeroFilas;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error; // Propagar el error para manejarlo en el bloque catch superior
  } finally {
    // Libera la conexión de vuelta al pool
    connection.release();
  }
}

  async function obtenerDatosUsers() {
    // Crea una conexión a la base de datos
    const connection = await pool.getConnection();
    
    try {
      // Conecta a la base de datos
      
  
      // Ejecuta la consulta para obtener datos
      const [result] = await connection.execute('SELECT username FROM users');
      
  
      // Imprime los datos obtenidos
      console.log('Datos obtenidos:', result);
  
      return result;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; // Propagar el error para manejarlo en el bloque catch superior
    } finally {
      // Cierra la conexión
      connection.release();
    }
  }

  async function obtenerDatosAdmin() {
    // Crea una conexión a la base de datos
    const connection = await pool.getConnection();
    
    try {
      // Conecta a la base de datos
      
  
      // Ejecuta la consulta para obtener datos
      const [result] = await connection.execute('SELECT username,password FROM users');
      
      console.log('Datos obtenidos:', result);
      
     return result;
  
    
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; // Propagar el error para manejarlo en el bloque catch superior
    } finally {
      // Cierra la conexión
      connection.release();
    }
  }