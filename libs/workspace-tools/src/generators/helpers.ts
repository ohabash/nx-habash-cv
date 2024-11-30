import { FileTreeWalker } from 'file-tree-walker-ts';
import * as colors from 'colors';
import { ApiGenOptions } from './api/schema';
import { Tree } from '@nrwl/devkit';
import { insertImport } from '@angular-cli/ast-tools';
colors;

export async function getFile(tree: Tree, path: string) {
	try {
		const filePath = path;
		const contents = tree.read(filePath).toString();
		return contents;
	} catch (error) {
		console.log('cant getFile :'.red, path);
	}
}

export function insertBefore(content: string, strToFind: string, content2Append: string) {
	const appendIndex = content.indexOf(strToFind);
	const updatedContent = content.slice(0, appendIndex) + content2Append + content.slice(appendIndex);
	return updatedContent;
}

export function insertAfter(content: string, strToFind: string, content2Append: string) {
	console.log(`🚀 => insertAfter => content:`, content)
	return content.replace(strToFind, `${strToFind} \n ${content2Append}`);
}

export function insertBeforeLastOccurrence(content, strToFind, content2Append) {
	console.log(`🚀 => insertBeforeLastOccurrence => content:`, content)
	const n = content.lastIndexOf(strToFind);
	if (n < 0) return content;
	return content.substring(0, n) + '\n' + content2Append + '\n' + content.substring(n);
}
export function insert(content, pos, content2Append) {
	if (pos < 0) return content;
	return content.substring(0, pos) + '\n' + content2Append + '\n' + content.substring(pos);
}

export async function printTree(tree: Tree, substitutions: ApiGenOptions) {
	await timeout(1000);
	return new FileTreeWalker()
		.setAllowedFileTypes(['ts', 'js'])
		.onDirectory((directoryPath: string, directoryName: string) => {
			console.log(directoryPath, directoryName);
		})
		.onFile((filePath: string, filename: string, fileExtension: string, content: string) => {
			console.log(filePath, filename, fileExtension, content);
		})
		.walk(`libs/${substitutions.fileName}`);
}
// function insertAfterLastOccurrence(content, strToFind, content2Append) {
// 	const n = content.lastIndexOf(strToFind) +.length;
// 	if (n < 0) return content;
// 	return content.substring(0, n) + '\n' + content2Append + '\n' + content.substring(n);
// }
export const timeout = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};


export function addImport(pathToFile: string, apiImportSymbol: string, importFrom: string, fileContent: string, ops: ApiGenOptions): string {
	console.log(`🚀 => addImport => ops:`, ops)
	const editsObj = insertImport(pathToFile, apiImportSymbol, importFrom);
	return insert(fileContent, editsObj.order, (editsObj as any).toAdd);
}
