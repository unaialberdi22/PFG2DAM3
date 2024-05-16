import fs from "fs"
import path from "path";
import { Sequelize, DataTypes  } from '@sequelize/core';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from "module";
import * as dotenv from "dotenv"
dotenv.config();
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const basename = path.basename(__filename);

const db = {};

let sequelize;
sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host : process.env.DB_HOST,
    dialect : 'mysql'
  }
)

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    import(`./${file}`).then((model) => {
      // console.log(model)
      const defaultfn = model.default
      db[file.replace(".js","")] = defaultfn(sequelize, DataTypes);
      console.log(defaultfn(sequelize, DataTypes))
    })
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

console.log(Object.keys(db).length)
export default db;