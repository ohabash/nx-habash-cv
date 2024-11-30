export interface ErrorPipe {
	name: string;
	description?: string;
	msg?: string;
}
export interface ErrorRootInfo {
	service?: string;
	status?: number;
	title: string;
	msg?: string;
	db?: boolean;
	data?: any;
}

export type interface_id = 'error-object';

export interface ErrorObject {
	interface: interface_id;
	main: ErrorRootInfo;
	fullPath: ErrorPipe[];
}

export const isErrorObject = (obj: any): obj is ErrorObject => {
	return 'interface' in obj && obj.interface == 'error-object';
};
