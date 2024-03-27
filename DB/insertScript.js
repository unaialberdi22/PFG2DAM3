require('dotenv').config(); // Para cargar las variables de entorno desde el archivo .env
const fs = require('fs');
const mysql = require('mysql');

// Función para dividir el contenido del CSV ignorando las comas dentro de las comillas
function splitCSVRow(row) {
  let insideQuotes = false;
  let currentValue = '';
  const values = [];

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.replace(/'/g, "''")); // Escapar comillas simples dentro del valor
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  values.push(currentValue.replace(/'/g, "''")); // Escapar comillas simples dentro del valor
  return values;
}

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
console.log('Intentando conectar a la base de datos...');
connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida a la base de datos');

  // Directorio donde se encuentran los archivos CSV
  const directorio = './data/';

  // Obtener la lista de archivos en el directorio
  console.log('Leyendo directorio de archivos CSV...');
  fs.readdir(directorio, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio:', err);
      return;
    }

    // Filtrar solo los archivos CSV
    const csvFiles = files.filter(file => file.endsWith('.csv'));

    console.log('Archivos CSV encontrados:', csvFiles);

    let processedFiles = 0; // Contador para rastrear el número de archivos procesados

    // Iterar sobre cada archivo CSV
    csvFiles.forEach(csvFile => {
      const tableName = csvFile.replace('.csv', '');

      // Leer el contenido del archivo CSV
      console.log(`Leyendo archivo CSV: ${csvFile}`);
      fs.readFile(directorio + csvFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer el archivo CSV:', err);
          return;
        }

        // console.log(`Contenido del archivo CSV ${csvFile}:`, data);

        // Dividir el contenido del CSV en filas y procesar cada fila
        const rows = data.trim().split('\n');
        const columns = splitCSVRow(rows[0]); // Obtener nombres de columnas desde la primera fila

        console.log(`Columnas para la tabla ${tableName}:`, columns);

        // Insertar datos en la tabla
        const insertQueries = [];
        for (let i = 1; i < rows.length; i++) {
          const values = splitCSVRow(rows[i]);
          const insertQuery = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.map(value => `'${value}'`).join(', ')})`;
          insertQueries.push(insertQuery);
        }

        console.log(`Insertando datos en la tabla ${tableName}...`);

        // Ejecutar todas las consultas de inserción de datos
        insertQueries.forEach((query, index) => {
          connection.query(query, err => {
            if (err) {
              console.error(`Error al insertar datos en la tabla ${tableName} (fila ${index + 1}):`, err);
              return;
            }
            // console.log(`Datos insertados en la tabla ${tableName} (fila ${index + 1})`);
          });
        });

        console.log(`Datos insertados en la tabla ${tableName}`);

        processedFiles++; // Incrementar el contador de archivos procesados

        // Verificar si se han procesado todos los archivos antes de ejecutar las consultas de llaves foráneas
        if (processedFiles === csvFiles.length) {
          // Ejecutar las consultas de llaves foráneas después de insertar datos en todos los archivos CSV
          const foreignKeyQueries = [
            'ALTER TABLE `rutas` ADD FOREIGN KEY (`idAgencia`) REFERENCES `agencias` (`idAgencia`);',
            'ALTER TABLE `viajes` ADD FOREIGN KEY (`idRuta`) REFERENCES `rutas` (`idRuta`);',
            'ALTER TABLE `horarios` ADD FOREIGN KEY (`idViaje`) REFERENCES `viajes` (`idViaje`);',
            'ALTER TABLE `horarios` ADD FOREIGN KEY (`idParada`) REFERENCES `paradas` (`idParada`);',
          ];

          console.log('Ejecutando consultas de llaves foráneas...');

          foreignKeyQueries.forEach(query => {
            connection.query(query, err => {
              if (err) {
                console.error('Error al ejecutar consulta de llave foránea:', err);
                return;
              }
              console.log('Consulta de llave foránea ejecutada con éxito');
            });
          });
        }
        console.log('Proceso completado para el archivo CSV:', csvFile);
      });
    });
  });
});
