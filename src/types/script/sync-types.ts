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
  const removeClassTransformerRegex = /(?:import\s*{\s*(?:\w+\s*,?\s*)*\s*} from 'class-transformer';)/;
  const removeDecoratorRegex = /^[\s]*@\S+(?:\(\s*\)\s*)*(?:[\s\S]*?)$/gm;

  const remvoveImportContent = content.replace(removeImportRegex, '');
  const rmeoveClassTransformer = remvoveImportContent.replace(removeClassTransformerRegex, '');
  const removeDecoratorsContent = rmeoveClassTransformer.replace(removeDecoratorRegex, '');

  return removeDecoratorsContent;
}

function removeImportSwagger(content: string): string {
  const regex = /import\s*{\s*\w+\s*(?:,\s*\w+)*\s*} from '@nestjs\/swagger';/;

  return content.replace(regex, '');
}

function removeCustomValidator(content: string): string {
  const regex = /import\s*{\s*\w+\s*(?:,\s*\w+)*\s*} from '@\/modules\/_base';/;
  const regex2 = /import\s*{\s*\w+\s*(?:,\s*\w+)*\s*} from '@\/decorators';/;

  const afterRegex = content.replace(regex, '');
  const afterRegex2 = afterRegex.replace(regex2, '');

  return afterRegex2;
}

async function modifyAndSaveInputFile(sourceItemPath: string, destinationItemPath: string) {
  try {
    const content: string = await fs.promises.readFile(sourceItemPath, 'utf8');
    const removedSwaggerContent: string = removeImportSwagger(content);
    const removedCustomValidatorContent: string = removeCustomValidator(removedSwaggerContent);
    const removedClassValidatorContent: string = removeClassValidatorContent(removedCustomValidatorContent);

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
    console.info('Folders copied successfully');
  })
  .catch(error => {
    console.error('Error copying folders:', error);
  });
