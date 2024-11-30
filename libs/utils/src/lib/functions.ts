export interface ObjAny {
	[k: string]: any;
}

export function pretty(obj: ObjAny) {
  return JSON.stringify(obj, null, 2);
}

export const timeout = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}; 

export async function resolveVars(str: string, obj: ObjAny, regex: RegExp = /<([^>]+)>/g) {
  const matches = [];
	let match;

	// find var names
	while ((match = regex.exec(str)) !== null) {
    matches.push(match[1]);
  }

	// replace vars with values
	const promises = matches.map((key) => {
		if (obj[key]) {
			str = str.replace(new RegExp(`<${key}>`, 'g'), obj[key]);
			return Promise.resolve();
		} else {
			return Promise.reject(new Error(`Variable ${key} not found`));
		}
	});

	await Promise.all(promises)
  console.log(`🚀 => resolveVars => matches:`, matches)
	return str;
}

/***
 * Generates a random string (ID) of the form [A-Za-z0-9]
 * @param len - the length of the string to generate
 * @return `ID` of length len
 */
export const generateID = function (len: number) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < len; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export const slugify = function (TexT: string) {
  TexT = TexT || '';
  return TexT.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};
export const slugify2 = function (TexT: string) {
  TexT = TexT || '';
  return TexT.toLowerCase()
    .replace(/[^\w ]+/g, '_')
    .replace(/ +/g, '_');
};

export function parseCurrencyToNumber(input: string): string {
  // Remove any commas, dollar signs, or spaces
  const cleanedInput = input.replace(/[$,]/g, '');

  // Parse the cleaned string into a float
  const parsedNumber = parseFloat(cleanedInput);

  // Return the number formatted to two decimal places as a string
  return parsedNumber.toFixed(2);
}