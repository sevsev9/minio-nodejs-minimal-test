import express, {Application, Request, Response, NextFunction} from "express";
import {BucketItem} from "minio";

const Multer = require("multer");
const MulterS3 = require("multer-minio-storage-engine");
const Minio = require("minio");
const BodyParser = require("body-parser");

require('dotenv').config();

const app = express();
app.use(BodyParser.json({limit: "4mb"}));

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt((process.env.MINIO_PORT) ? process.env.MINIO_PORT : "9000"),
    useSSL: (process.env.MINIO_SECUER === 'true'),
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRETKEY
})

const upload = Multer({
    storage: MulterS3({
        minio: minioClient,
        bucketName: process.env.MINIO_BUCKET,
        metaData: function (req:any, file:any, cb:Function) {
            cb(null, {fieldName: file.fieldname});
        },
        objectName: function (req:any, file:any, cb:Function) {
            cb(null, ""+file.originalname);
        },
    })
})

app.get('/', (req, res) => {
    res.sendFile("./www/index.html", {root: __dirname});
});

app.get("/delete", function (req, res) {
    minioClient.removeObject(process.env.MINIO_BUCKET, req.query.filename, function (err: any) {
        if (err) {
            res.status(500);
            res.send(""+err);
        } else {
            res.status(200);
            res.send("Successfully deleted!");
        }
        res.end();
    })
})
app.post("/uploadfile", upload.array("upload", 3), function (req, res) {
    // @ts-ignore
    res.send("Successfully uploaded " +req.files.length + " files!");
});
// list objects v2 documentation: https://docs.min.io/docs/javascript-client-api-reference.html#listObjectsV2
app.get('/list', (req, res) => {
    const list: BucketItem[] = [];
    let stream = minioClient.extensions.listObjectsV2WithMetadata(process.env.MINIO_BUCKET, '', true, '');
    stream.on('data', function (obj: BucketItem) {
        list.push(obj);
    });
    stream.on('err', function (err: any) {
        console.log(err);
        res.status(500);
        res.send(err);
        res.end();
    });
    stream.on('end', () => {
        res.status(200);
        let str: String = JSON.stringify(list);
        res.send(str);
        res.end();
    });
});
app.get("/download", function (request, response) {
    // @ts-ignore
    minioClient.getObject(process.env.MINIO_BUCKET, request.query.filename, function (error, stream) {
        if (error) {
            return response.status(500).send(error);
        }
        stream.pipe(response);
    });
});
app.get('/favicon.ico', ((req, res) => {
    res.download('./src/img/favicon.ico');
}));

minioClient.bucketExists(process.env.MINIO_BUCKET, function (error: any) {
    if (error) {
        return console.log(error);
    }
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
});