/* eslint-disable prettier/prettier */
import { object, string, TypeOf } from 'zod';
import { CATEGORY_REGEX } from '../utils/constants';

/**
 * @openapi
 * components:
 *   schema:
 *     UserDetails:
 *       type: object
 *       required:
 *        - mailId
 *        - userName
 *        - password
 *       properties:
 *         mailId:
 *           type: string
 *         userName:
 *           type: string
 *         password:
 *           type: string
 *     UserDetailsResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         mailId:
 *           type: string
 *         userName:
 *           type: string
 *         password:
 *           type: string
 */

const payload = {
  body: object({
    mailId: string({
      required_error: 'Mail Id is required.',
    }).min(1, 'Mail Id cannot be empty'),
    userName: string({
      required_error: 'User First Name is required.',
    }).min(1, 'User First Name cannot be empty'),
    password: string({
      required_error: 'User First Name is required.',
    }).min(1, 'User First Name cannot be empty'),
  }),
};
const login_payload = {
  body: object({
    mailId: string({
      required_error: 'Mail Id is required.',
    }).min(1, 'Mail Id cannot be empty'),
    password: string({
      required_error: 'User First Name is required.',
    }).min(1, 'User First Name cannot be empty'),
  }),
};

const params = {
  params: object({
    mailId: string({
      required_error: 'Mail Id is required.',
    }),
  }),
};

export const addUserDetailsSchema = object({
  ...payload,
});

export const getUserDetailsSchema = object({
  ...params,
});
export const loginUserDetailsSchema = object({
  ...login_payload,
});
export const getFullUserDetailsSchema = object({
  ...payload,
});

export const updateUserDetailsSchema = object({
  //   ...updatePayload,
  ...params,
});

export const deleteUserDetailsSchema = object({
  ...params,
});

export const createCategorySchema = object({
  body: object({
    categoryName: string({
      required_error: 'Category is required',
    }).regex(CATEGORY_REGEX, {
      message:
        'Category should include only capital letters and underscore (_) symbols.',
    }),
  }),
});

export type AddUserDetailsInput = TypeOf<typeof addUserDetailsSchema>;
export type LoginUserDetailsInput = TypeOf<typeof loginUserDetailsSchema>;
export type ReadUserDetailsInput = TypeOf<typeof getUserDetailsSchema>;
export type ReadFullUserDetailsInput = TypeOf<typeof getFullUserDetailsSchema>;
export type UpdateUserDetailsInput = TypeOf<typeof updateUserDetailsSchema>;
export type DeleteUserDetailsInput = TypeOf<typeof deleteUserDetailsSchema>;
export type CategoryInput = TypeOf<typeof createCategorySchema>;
