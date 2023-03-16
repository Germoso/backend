const fs = require("fs")
const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")

const PATH = "./models/genres.json"

const getItem = async (req, res) => {
    try {
        const { id } = req.params
        fs.readFile(PATH, (err, data) => {
            let db = []
            if (err) {
                console.error(err)
                return res.status(500).send("Error al leer item la base de datos")
            }
            db = JSON.parse(data)
            const filteredDb = db.filter((el) => {
                if (el.id === Number(id)) {
                    return el
                }
            })
            res.send(filteredDb)
        })
    } catch (e) {
        handleHttpError(res, e)
    }
}

const getItems = async (req, res) => {
    fs.readFile(PATH, (err, data) => {
        if (err) {
            return res.status(500).send("Error al leer la base de datos")
        }
        const datos = JSON.parse(data)
        res.json(datos)
    })
}

const createItem = async (req, res) => {
    const newData = req.body
    let db = []
    fs.readFile(PATH, (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Error al leer la base de datos")
        }
        db = JSON.parse(data)
        db.push(newData)
        fs.writeFile(PATH, JSON.stringify(db), (err) => {
            if (err) {
                console.error(err)
                return res.status(500).send("Error al escribir en la base de datos")
            }
            res.send("Datos agregados al archivo JSON")
        })
    })
}

module.exports = { getItems, getItem }
