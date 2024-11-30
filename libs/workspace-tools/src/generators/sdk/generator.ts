import { Tree, formatFiles, installPackagesTask, generateFiles, joinPathFragments, readProjectConfiguration, names } from '@nrwl/devkit';
import inquirer from 'inquirer';
import { ApiGenOptions, Names, Properties } from './schema';
import { addImport, getFile, insertBeforeLastOccurrence, printTree } from '../helpers';

/**
 * @description adds a module to an existing api
 * @fileoverview The index.ts provides an entry point to the generator. The file contains a function that is called to perform manipulations on a tree that represents the file system.
 * @link https://nx.dev/generators/workspace-generators
 */
export default async function (tree: Tree, schema: Properties) {
	// add apiName to schema
	schema.apiName = await promtApiName(tree);

	// generate different name variations for substitutions
	const moduleNames: Names = names(schema.name);
	const apiNames: Names = names(schema.apiName);

	//substitutions
	const substitutions: ApiGenOptions = {
		tmpl: '', // remove __tmpl__ from file endings
		module: moduleNames, // make the different name variants available as substitutions
		// moduleName: moduleNames.fileName, // make the different name variants available as substitutions
		api: apiNames, // make the different name variants available as substitutions
		...schema, // include provide values
	};

	// moduleDestination
	substitutions.moduleDestination = `libs/${substitutions.api.fileName}/src/lib`;
 	// console.log('substitutions.moduleDestination :', substitutions.moduleDestination);

	// merge ./file with lib
	// const libraryRoot = readProjectConfiguration(tree, schema.apiName).root;

	generateFiles(
		tree, // the virtual file system
		joinPathFragments(__dirname, `./files`), // path to the file templates
		substitutions.moduleDestination, // destination path of the files
		substitutions // config object to replace variable in file templates
	);

	// add module to sdk file
	await updateSdkFile(tree, substitutions);

	// formatter
	await formatFiles(tree);

	// print tree
	printTree(tree, substitutions);

	// return callback
	return () => { installPackagesTask(tree); };
}


/**
 *
 * @description link the new module in the api's sdk file
 * @param tree:Tree
 * @param ops:ApiGenOptions
 * @returns Promise<void>
 */
async function updateSdkFile(tree: Tree, ops: ApiGenOptions):Promise<void> {
	// content
	const sdkFilePath = `libs/${ops.api.fileName}/src/lib/${ops.api.fileName}.sdk.ts`;
	const content = await getFile(tree, sdkFilePath);
	const apiImportSymbol = `${ops.module.className}${ops.api.className}`;
	const importFrom = `./${ops.module.fileName}/${ops.module.fileName}.${ops.api.fileName}`;

	// insert module getter
	const appendStr = `get ${ops.module.constantName}() { return new ${apiImportSymbol}(this.options); }`;
	let edits = insertBeforeLastOccurrence(
		content, // file content currently
		`get `, // insert b4 this
		appendStr // append this
	);

	// import module
	edits = addImport(sdkFilePath, apiImportSymbol, importFrom, edits, ops as any);

	// save edits
	return await tree.write(sdkFilePath, edits);
}

async function promtApiName(tree): Promise<string> {
	// get list of current libs
	const tsconfig_base = await getFile(tree, 'tsconfig.base.json');
	const tsconfig_base_json = JSON.parse(tsconfig_base);
	const libs: Array<string> = apiNames();
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'apiName',
			message: 'What API does this module belong to?',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			choices: libs.map((lib) => lib) as any
		}
	]);
	// add apiName to schema
	return answer.apiName;

	function apiNames(): string[] {
		return Object.keys(tsconfig_base_json.compilerOptions.paths).map((path) => path.split('/')[1]);
	}
}

