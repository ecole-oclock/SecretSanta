/*
 * Package Import
 */
import * as Sentry from '@sentry/node';
import status from 'http-status';

/*
 * Local Import
 */
import APIError from 'src/utils/errors/APIError';

/*
 * 400 - Bad Request
 */
export const badRequest = (err) => new APIError(err, status.BAD_REQUEST);

/*
 * 404 - Not Found
 */
export const notFound = (req, res, next) => {
  const err = new APIError('Not Found', status.NOT_FOUND);
  next(err);
};


export default function errorMiddleware({ error, logger, context, body }) {
  logger.error(error?.original || error);
  Sentry.captureException(error?.original || error, { context, body });
}
