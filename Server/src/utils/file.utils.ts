import * as path from "path";
import * as fs from "fs";
import * as os from "os";

const createFolderIfNotExists = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

export const getDataFolderPath = (ASSETS_FOLDER_NAME: string) => {
  const result = path.join(process.cwd(), `/public/temp/${ASSETS_FOLDER_NAME}`);

  createFolderIfNotExists(result);

  return result;
};

export const getUniqueFilePath = (fileSuffix: string, ASSETS_FOLDER_NAME: string) => {
  const filePath = path.resolve(
    getDataFolderPath(ASSETS_FOLDER_NAME),
    `${Date.now()}${fileSuffix}`
  );

  return filePath;
};

export const persistData = (data: any, localFilePath: string) => {
  fs.writeFileSync(localFilePath, data);
};

export const fileDelete = async (localFilePath: string): Promise<void> => {
  try {
    fs.unlinkSync(localFilePath);
  } catch (err) {
    console.error(err);
  }
};

// Schedule file deletion after 5 minutes (300,000 milliseconds)
export const scheduleFileDeletion = (filePath: string) => {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  }, 300000); //300000
};
