const Item = require("../models/Item");


const path = require("path");
const fs = require("fs");

const asyncWrapper = require("../middlewares/asyncWrapper");

const getItems = async (req, res) => {
    try{
        const items = await Item.find();
        res.status(200).json({ items });

    } catch(error) {
        console.log(error);
    }
};

const addItem = asyncWrapper( async (req, res) => {
    const { name } = req.body;
    const file = req.file.path;

    const item = await Item.create({ name, file });
    res.status(200).json({ item });
});

const downloadFile = asyncWrapper( async (req, res, next) => {
    const id = req.params.id;
    
    try{
        const item = await Item.findById(id);
        if(!item){
            return next(new Error("No item found"));
        }

        const file = item.file;
        
        
        if(fs.existsSync(file)) {
            const fileName = item.name;
            const contentDispositionHeader = `attachment; filename="${fileName}"`;
            res.setHeader('Content-Disposition', contentDispositionHeader);

            console.log("Content-Disposition Header: ", contentDispositionHeader);
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

            const fileExtension = path.extname(file).toLowerCase();
            let contentType = 'application/octet-stream'; // Default to octet-stream

            if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
                contentType = 'image/jpeg';
            } else if (fileExtension === '.png') {
                contentType = 'image/png';
            }

            res.setHeader('Content-Type', contentType);

            const fileStream = fs.createReadStream(file);
            fileStream.pipe(res);
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        next(error);
    }
});


module.exports = {
    getItems,
    addItem,
    downloadFile
};