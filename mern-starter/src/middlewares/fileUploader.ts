import { Request } from "express";
import path from "path";
import { existsSync,mkdir,mkdirSync } from "fs";
import multer, { FileFilterCallback, Multer } from "multer"
import HttpError from "../utils/HttpError";


function getUploadDirectoryPath(filename :string):string{
    return path.join(__dirname,'../videos/raw');
}

//chacking uload directory exists
function ensureUploadDirectory(filename:string):void{
    const directoryPath :string = getUploadDirectoryPath(filename);
    if(!existsSync(directoryPath)){
        mkdirSync(directoryPath);
    }
}

const storage = multer.diskStorage({
    destination:(req:Request, file:Express.Multer.File, callback:(error:Error | null,destination: string)=>void) =>{
        const fileSpecificFolder = file.originalname.split(path.extname(file.originalname))[0];
        console.log("file.originalname :-",file.originalname)
        ensureUploadDirectory(fileSpecificFolder);
        console.log('ensure Upload Directory :- ', ensureUploadDirectory(fileSpecificFolder))
        callback(null,getUploadDirectoryPath(fileSpecificFolder))
    },
    filename:(req:Request, file:Express.Multer.File, callback:(error:Error | null,destination: string)=>void)=> {
        callback(null,file.originalname);
    },
});

const fileUploader :Multer = multer({
    storage:storage,
    fileFilter:(req:Request, file:Express.Multer.File, callback:FileFilterCallback)=> {
        const allowedFileTypes = [".jpg", ".jpeg", ".png", ".pdf", ".mp4", ".mov"];
        const fileExtension = path.extname(file.originalname).toLowerCase();

        if(allowedFileTypes.includes(fileExtension)){
            callback(null,true);
        }else{
            callback(new HttpError("only .jpg, .jpeg, .png, and .pdf files are allowed.",404))
        }
    },
})

export default fileUploader;