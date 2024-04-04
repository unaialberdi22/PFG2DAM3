const paradasController = require("../controllers").paradas;

module.exports = (app) => {
    app.get("getAllParadas", paradasController.getAllParadas);
};