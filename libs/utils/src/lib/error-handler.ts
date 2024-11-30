import { ErrorObject, ErrorRootInfo, ErrorPipe } from "./errorhandler.interface";

const formatError = (e: any) => {
	if (typeof e == 'string') {
		return e;
	}
	if (e?.interface == 'error-object') {
		return e.main.msg;
	}
	return e?.message;
};

export function errorHandler(e: Error | ErrorObject, errorRoot: ErrorRootInfo, next?: any) {
	const errorRootBase: ErrorRootInfo = {
		status: 500,
		msg: formatError(e),
		db: false,
		...errorRoot
	};
	const error_pipe: ErrorPipe = {
		name: errorRoot.title,
		msg: errorRoot?.msg || formatError(e)
	};
	// console.log('error handler e: ', e);
	let _e = e as ErrorObject;
	if (_e?.interface == 'error-object') {
		_e.fullPath.push(error_pipe);
	} else {
		// const _errorRoot: EH.ErrorRootInfo = errorRoot
		const errorObject: ErrorObject = {
			interface: 'error-object',
			main: errorRootBase,
			fullPath: [error_pipe]
		};
		_e = errorObject;
	}
	if (next) {
		return next(_e);
	}
	return _e;
}
