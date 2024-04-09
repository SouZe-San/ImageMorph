import * as fs from 'fs';

export const fileDelete = async (localFilePath: string): Promise<void> => {
  try { 
    fs.unlinkSync(localFilePath);
  } catch (err) {
    console.error(err);
  } 
}