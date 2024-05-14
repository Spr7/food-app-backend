/* eslint-disable prettier/prettier */
import { omit } from 'lodash';

export const removeKeyValuePairsFromResponse = (
  response: any,
  type: string = '',
) => {
  return omit(response, ['__v', 'createdAt', 'updatedAt', type]);
};
