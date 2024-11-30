
/**
 * @link https://nx.dev/generators/generator-options
 * @description schema.ts defines an interface to match the properties in your schema.json file, and whether they are required.
 */
export type ApiGenOptions = Properties & Names & Options;

// options
export interface Options {
	tmpl: string; // remove __tmpl__ from file endings
}

// arguments provided through cli
export interface Properties {
  name: string;
  workspace: string;
  type?: string;
  propertyName?: string;
}

// names
export interface Names {
	name: string;
	className: string;
	propertyName: string;
	constantName: string;
	fileName: string;
}
