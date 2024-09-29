import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Remove import from 'class-validator' and its dectorators
 * @returns
 */
function removeClassValidatorContent(content: string): string {
  const removeImportRegex = /(?:import\s*{\s*(?:\w+\s*,?\s*)*\s*} from 'class-validator';)/;
  const removeDecoratorRegex = /(?:\s*@\S+)/g;

  const remvoveImportContent = content.replace(removeImportRegex, '');
  const removeDecoratorsContent = remvoveImportContent.replace(removeDecoratorRegex, '');

  return removeDecoratorsContent;
}

function removeImportSwagger(content: string): string {
  const regex = /import\s*{\s*\w+\s*(?:,\s*\w+)*\s*} from '@nestjs\/swagger';/;

  return content.replace(regex, '');
}

async function modifyAndSaveInputFile(sourceItemPath: string, destinationItemPath: string) {
  try {
    const content: string = await fs.promises.readFile(sourceItemPath, 'utf8');
    const removedSwaggerContent: string = removeImportSwagger(content);
    const removedClassValidatorContent: string = removeClassValidatorContent(removedSwaggerContent);

    await fs.promises.writeFile(destinationItemPath, removedClassValidatorContent);
  } catch (err) {
    console.error(err);
  }
}

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
      } else if (stats.isFile() && entry.endsWith('.input.ts')) {
        await modifyAndSaveInputFile(sourceItemPath, destinationItemPath);
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

const pathsToCopy = ['interface', 'enum', 'dto', 'input'];

Promise.all(
  pathsToCopy.map(folder => {
    const sourcePath = path.join(backendPath, folder);
    const destinationPath = path.join(desPath, folder);

    return copyFolder(sourcePath, destinationPath);
  })
)
  .then(() => {
    console.log('Folders copied successfully');
  })
  .catch(error => {
    console.error('Error copying folders:', error);
  });
