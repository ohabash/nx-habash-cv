import { Tree, formatFiles, installPackagesTask, generateFiles, joinPathFragments, readProjectConfiguration, names } from '@nrwl/devkit';
import { libraryGenerator } from '@nx/js';
import { ApiGenOptions, Names, Properties } from './schema';
import { printTree, getFile, insertBeforeLastOccurrence, addImport } from '../helpers';

/**
 * @description generate a express api (middleware) and modify existing files to make it work.
 * @fileoverview The index.ts provides an entry point to the generator. The file contains a function that is called to perform manipulations on a tree that represents the file system.
 * @link https://nx.dev/generators/workspace-generators
 */
export default async function (tree: Tree, schema: Properties) {
	// default value for schema.type (currently only one type accepted)
	schema.type ??= "SUBMODULE" // default type
	schema.workspace ??= '@nx-habash'; // !todo -- make dynamic
	schema.name = `api-${schema.name}` // add prefix

	console.log(`🚀 => schema:`, schema)

	// Start with standard NX Lib
	await libraryGenerator(tree, {
    name: schema.name,
    directory: `libs/${schema.name}`,
  });

	// generate different name variations for substitutions
  const interfaceNames: Names = names(schema.name);
  console.log(`🚀 => interfaceNames:`, interfaceNames)

	//substitutions
	const substitutions: ApiGenOptions = {
		tmpl: '', // remove __tmpl__ from file endings
		...interfaceNames, // make the different name variants available as substitutions
		...schema, // include provide values
	};
	console.log(`🚀 => substitutions:`, substitutions)

	// merge ./file with lib
	const libraryRoot = readProjectConfiguration(tree, schema.name).root;
	console.log(`🚀 => libraryRoot:`, libraryRoot)
	generateFiles(
		tree, // the virtual file system
		joinPathFragments(__dirname, `./${schema.type}_files`), // path to the file templates
		libraryRoot, // destination path of the files
		substitutions // config object to replace variable in file templates
	);
	console.log(`🚀 => libraryRoot:2`, libraryRoot);

	// update index.ts
	await updateIndexTs(tree, schema, substitutions);

	// update main.ts (express engine)
	await updateMainTs(tree, substitutions);

	// formatter
	await formatFiles(tree);

	// print tree
	printTree(tree, substitutions);

	// return callback
	return () => { installPackagesTask(tree); };
}


/**
 *
 * @description add api related exports to the newly generated libs/{apiName}/srcindex.ts
 * @param tree
 * @param schema
 * @param substitutions
 * @returns Promise<void>
*/
async function updateIndexTs(tree: Tree, schema: Properties, substitutions: ApiGenOptions): Promise<void> {
	// content
	const filePath = `libs/${schema.name}/src/index.ts`;
	const content = await getFile(tree, filePath);
	// console.log('content :', content);

	// add exports
	let edits = content;
	edits += `\n export * from './lib/${schema.name}.sdk';`;
	edits += `\n export * from './lib/${schema.name}.routes';`;
	edits += `\n export * from './lib/${schema.name}.interface';`;

	// save edits
	return await tree.write(filePath, edits);
}


/**
 *
 * @description add the middleware to the express app main.ts
 * @param tree
 * @param ops: substitutions
 * @returns Promise<void>
 */
export async function updateMainTs(tree: Tree, ops: ApiGenOptions): Promise<void> {
	console.log(`🚀 => updateMainTs => tree:`, tree)
	// content
	const pathToFile = `apps/express-server/src/routes.api.ts`; // UPDATE THIS IN NEW APPS
	const content = await getFile(tree, pathToFile);
	const apiImportSymbol = `${ops.className}Routes`;
	console.log(`🚀 => updateMainTs => apiImportSymbol:`, apiImportSymbol)

	// add api import
	let edits = addImport(pathToFile, apiImportSymbol, `${ops.workspace}/${ops.name}`, content as string, ops);

	console.log(`🚀 => updateMainTs => edits:`, edits)
	// add api middleware
	let endpoint = `/${ops.fileName}`.replace('api-', '');
	endpoint = endpoint.replace('//', '/')
	edits = insertBeforeLastOccurrence(
    edits, // to be modified
    `this.api.use(`, // insert b4 this
    `this.api.use('${endpoint}', new ${apiImportSymbol}().routes());` // append this
  );

	// save edits
	return await tree.write(pathToFile, edits);
}

