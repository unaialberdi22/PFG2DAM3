CREATE TABLE `paradas` (
  `idParada` VARCHAR(255) PRIMARY KEY,
  `nombreParada` VARCHAR(255),
  `latitud` VARCHAR(255),
  `longitud` VARCHAR(255),
  `accesoMinus` VARCHAR(255)
);

CREATE TABLE `rutas` (
  `idRuta` VARCHAR(255) PRIMARY KEY,
  `idAgencia` VARCHAR(255),
  `tipo` VARCHAR(255)
);

CREATE TABLE `agencias` (
  `idAgencia` VARCHAR(255) PRIMARY KEY,
  `nombreAgencia` VARCHAR(255),
  `web` VARCHAR(255),
  `paisAgencia` VARCHAR(255),
  `telefono` VARCHAR(255)
);

CREATE TABLE `viajes` (
  `idRuta` VARCHAR(255),
  `idViaje` VARCHAR(255) PRIMARY KEY,
  `accesoMinus` VARCHAR(255)
);

CREATE TABLE `horarios` (
  `idViaje` VARCHAR(255),
  `horaSalida` VARCHAR(255),
  `idParada` VARCHAR(255),
  `seqParada` VARCHAR(255)
);

CREATE TABLE `tipoTrenes` (
  `idtipo` VARCHAR(255),
  `nombre` VARCHAR(255),
  `imagen` VARCHAR(255)
);
