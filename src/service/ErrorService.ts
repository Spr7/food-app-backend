import Logger from '../logger';

export default class ErrorService {
  static notify(
    message: string,
    error: any,
    metadata: { [key: string]: object | string } = {},
  ): void {
    Logger?.error(message, { error, ...metadata });
  }
}
