import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/HttpError";
import { extname, resolve } from "path";
import { existsSync, mkdir, mkdirSync, unlink } from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffProbeInstaller from "@ffprobe-installer/ffprobe";


export default async function transcodeVideo(req :Request,res: Response,next :NextFunction){
    try {
        if(!req.file){
            return next(new HttpError("Upload a file to begin transcoding",400));
        }
        const outputDirectoryName = req.file.originalname.split(extname(req.file.originalname))[0];
        console.log("Output Directory Name :-",outputDirectoryName)
        const inputFileName = req.file.originalname;

        const inputFilePath = resolve(__dirname,`../videos/raw/${inputFileName}`);
        console.log("Input File Path ",inputFilePath)
        const fileName = inputFileName.split('.')[0]

        const outputDir = resolve(
            __dirname,
            `../videos/transcoded/${outputDirectoryName}`
          );
        const manifestPath = `${outputDir}/${outputDirectoryName}.m3u8`;
          console.log('manifest path :- ', manifestPath)
        if(!existsSync(outputDir)){
            mkdirSync(outputDir,{recursive:true});
        }

        // const command = ffmpeg(inputFilePath).setFfmpegPath(ffmpegInstaller.path)
        // .setFfprobePath(ffProbeInstaller.path)
        // .output(`${outputDir}/${outputDirectoryName}.m3u8`)
        // .outputOptions([
        //     "-hls_time 10",
        //     "-hls_list_size 0",
        //     "-c:v h264",
        //     "-c:a aac",
           

        // ])
        // .output(`${outputDir}/${outputDirectoryName}.m3u8`);
//------------------------------------------
        // command.outputOptions("-c:v h264");
        // command.outputOption("-c:a aac");

//--------------------------------------------       

        ffmpeg(inputFilePath)
        .setFfmpegPath(ffmpegInstaller.path)
        // .setFfprobePath(ffProbeInstaller.path)
        
        .addOptions([
            // "-profile:v baseline",
            // "level 3.0",
            // "-start_number 0",
            "-hls_time 5",
            "-hls_list_size 10",
            "-f hls"
            // "-c:v h264",
            // "-c:a aac",
           

        ])
        // .videoCodec("libx264")
        // .audioCodec("aac")
        .output(`${outputDir}/${outputDirectoryName}.m3u8`)
        .on("start",(data)=>{
            console.log("Start ",data)
            console.log("starting transcoding file ",inputFileName)
        }).on("progress",(data)=>{
            console.log("Progrees ",data)
        }).on("end",(data)=>{
            console.log("End Command Listner ",data)
            unlink(inputFilePath,(err)=>{
                if(err) throw new HttpError(err.message,Number(err.errno));
                console.info(
                    `Transcoding completed. Raw file removed from ${inputFilePath}`
                  );
            });
            res
            .status(200)
            .json({ message: "Transcoding completed", manifest: manifestPath });
        
        }).on("error", (err) => {
            console.error(`Error during transcoding: ${err.message}`);
            return next(new HttpError(`Transcoding failed: ${err.message}`, 500));
        }).run();
        

        
        // command.on("start",(data)=>{
        //     console.log("Start ",data)
        //     console.log("starting transcoding file ",inputFileName)
        // })

        // command.on("progress",(data)=>{
        //     console.log("Progrees ",data)
        // })
        

        // command.on("end",(data)=>{
        //     console.log("End Command Listner ",data)
        //     unlink(inputFilePath,(err)=>{
        //         if(err) throw new HttpError(err.message,Number(err.errno));
        //         console.info(
        //             `Transcoding completed. Raw file removed from ${inputFilePath}`
        //           );
        //     });
        //     res
        //     .status(200)
        //     .json({ message: "Transcoding completed", manifest: manifestPath });
        
        // });
        // command.on("error", (err) => {
        //     console.error(`Error during transcoding: ${err.message}`);
        //     return next(new HttpError(`Transcoding failed: ${err.message}`, 500));
        // });

        // command.run();        
        
        console.log("Controller End")
    } catch (error) {
        console.error(`Transcoding failed: `, error);
        return res.status(500).json(error);
    }
}
