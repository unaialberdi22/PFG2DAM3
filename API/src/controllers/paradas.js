const Paradas = require('../models').paradas;
const { sequelize } = require("../models/index")

module.exports = {

    getAllParadas(req, res) {
    // Use the Stage model to find all stages, including associated TagStage and Tag models
        return Paradas.findAll({
            order: [
                ['idParada', 'ASC'],
            ]
        })
        .then(stages => res.status(201).send({
            status: 200,
            stages: stages
        })) // If retrieval is successful, send a 201 Created response with the retrieved stages
        .catch(error => res.status(400).send({
            status: 400,
            error: error
        })); // If there's an error during retrieval, send a 400 Bad Request response with the error information
    }
}