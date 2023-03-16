const fs = require("fs")
const { handleHttpError } = require("../utils/handleError")

//RUTA DEL JSON
const PATH = "./models/movies.json"

const getItem = async (req, res) => {
    try {
        const { id } = req.params
        fs.readFile(PATH, (err, data) => {
            let db = []
            //SI HAY UN ERROR RETORNA ERROR 500
            if (err) {
                console.error(err)
                return res.status(500).send("Error al leer item la base de datos")
            }
            //OBTIENE TODOS LOS DATOS
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
            console.error(err)
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
        newData.id = db.length
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

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        fs.readFile(PATH, (err, data) => {
            let db = []
            if (err) {
                console.error(err)
                return res.status(500).send("Error al leer la base de datos")
            }
            db = JSON.parse(data)
            const filteredDb = db.filter((el) => {
                if (String(el.id) !== id) return el
            })
            fs.writeFile(PATH, JSON.stringify(filteredDb), (err) => {
                if (err) {
                    console.error(err)
                    return res.status(500).send("Error al escribir en la base de datos")
                }
                res.send("Datos agregados al archivo JSON")
            })
        })
    } catch (e) {
        handleHttpError(res, e)
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body
        fs.readFile(PATH, (err, data) => {
            let db = []
            if (err) {
                console.error(err)
                return res.status(500).send("Error al leer la base de datos")
            }
            db = JSON.parse(data)
            const filteredDb = db.map((el) => {
                if (Number(el.id) === Number(id)) {
                    el = newData
                }
                return el
            })
            fs.writeFile(PATH, JSON.stringify(filteredDb), (err) => {
                if (err) {
                    console.error(err)
                    return res.status(500).send("Error al escribir en la base de datos")
                }
                res.send("Datos agregados al archivo JSON")
            })
        })
    } catch (e) {
        handleHttpError(res, e)
    }
}

module.exports = { getItems, getItem, createItem, deleteItem, updateItem }
