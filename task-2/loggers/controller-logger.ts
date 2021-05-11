import { logger } from "./loggers";
import { performance } from 'perf_hooks';

export const controllerLogger = (handler: Function) => {
    return async (req, res, next, ...args) => {
        const { params, body, query, url } = req;
        let runTime: number;
        let startTime: number;
        try {
            startTime = performance.now();

            await handler(req, res, ...args);

            runTime = performance.now() - startTime;
            logger.info({ message: 'method invoked, execution time in ms', methodName: handler.name, executionTime: runTime, requestArguments: { params, body, query, url } });
        } catch (e) {
            runTime = performance.now() - startTime!;
            logger.error(e, { methodName: handler.name, requestArguments: { params, body, query, url }, exceptionType: 'Error in handler', executionTime: runTime });
            next(e);
        }
    }
}
