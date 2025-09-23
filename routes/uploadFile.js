const upload = require("../storage/config-storage");
const { Router } = require("express");

const router = Router();

//send one file
router.post("/", upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No se subio ningun archivo"})
    res.status(200).json({ message: "Archivo subido", file: req.file.filename })
})

module.exports = router;