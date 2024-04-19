import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const ASSETS_FOLDER_NAME = "text2images"



const createFolderIfNotExists = (folderPath:string)=>{
    if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath)
    }
}

export const getDataFolderPath = ()=>{
    const result = path.join(process.cwd(),`/public/temp/${ASSETS_FOLDER_NAME}`)

    createFolderIfNotExists(result)

    return result
}

export const getUniqueFilePath = (fileSuffix:string)=>{
    const filePath = path.resolve(getDataFolderPath(),`${Date.now()}${fileSuffix}`)

    return filePath
}

export const persistData = (data:any,localFilePath:string)=>{
    fs.writeFileSync(localFilePath,data)
}

export const fileDelete = async (localFilePath: string): Promise<void> => {
  try { 
    fs.unlinkSync(localFilePath);
  } catch (err) {
    console.error(err);
  } 
}