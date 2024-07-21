const fs = require('fs').promises; // Use promises for asynchronous operations
const path = require('path');

async function copyFolder(folder) {
  try {
    const source = path.resolve(backendPath, folder);
    const destination = path.resolve(desPath, folder);

    await fs.mkdir(destination, { recursive: true }); // Create destination folder if it doesn't exist

    const entries = await fs.readdir(source);

    for (const entry of entries) {
      const sourceItemPath = path.join(source, entry);
      const destinationItemPath = path.join(destination, entry);

      const stats = await fs.stat(sourceItemPath);

      if (stats.isDirectory()) {
        await copyFolder(sourceItemPath, destinationItemPath); // Recursively copy subdirectories
      } else {
        await fs.copyFile(sourceItemPath, destinationItemPath);
      }
    }
  } catch (error) {
    console.error(`Error copying folder ${folder}: `, error);
  }

  console.log(`Finish sync folder ${folder}`);
}

// =============== MAIN ================

const backendPath = `${__dirname}/../../../../backend/src/db`;
const desPath = `${__dirname}/../`;

const needSyncFolders = ['dto', 'input', 'interface'];

for (const folder of needSyncFolders) {
  copyFolder(folder);
}
