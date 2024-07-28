import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function copyFolder(source: string, destination: string) {
  try {
    await mkdir(destination, { recursive: true });

    const entries = await readdir(source);

    const copyPromises = entries.map(async entry => {
      const sourceItemPath = path.join(source, entry);
      const destinationItemPath = path.join(destination, entry);

      const stats = await stat(sourceItemPath);

      if (stats.isDirectory()) {
        await copyFolder(sourceItemPath, destinationItemPath);
      } else {
        await copyFile(sourceItemPath, destinationItemPath);
      }
    });

    await Promise.all(copyPromises);
  } catch (error) {
    console.error(`Error copying folder: ${source}`, error);
  }
}

// ============= MAIN =============

const backendPath = path.resolve(__dirname, '../../../../backend/src/db');
const desPath = path.resolve(__dirname, '../');

const pathsToCopy = ['dto', 'input', 'interface'];

Promise.all(
  pathsToCopy.map(folder => {
    const sourcePath = path.join(backendPath, folder);
    const destinationPath = path.join(desPath, folder);

    return copyFolder(sourcePath, destinationPath);
  })
).then(() => {
  console.log('Folders copied successfully');
});
