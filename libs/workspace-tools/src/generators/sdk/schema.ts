
/**
 * @link https://nx.dev/generators/generator-options
 * @description schema.ts defines an interface to match the properties in your schema.json file, and whether they are required.
 */
export type ApiGenOptions = Properties & Options;

// options
export interface Options {
	module: Names;
	// moduleName: string;
	api: Names;
	moduleDestination?: string;
	tmpl: string; // remove __tmpl__ from file endings
}

// arguments provided through cli
export interface Properties {
	name: string;
	apiName: string;
}

// names
export interface Names {
	name: string;
	className: string;
	propertyName: string;
	constantName: string;
	fileName: string;
}
