/* eslint-disable prettier/prettier */
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { userDetailsSchemaModel } from '../models/userDetails.model';
import { AddUserDetailsInput } from '../schema/userDetails.schema';
import { UserDetailsInput } from '../types';

export async function addUserDetails(
  input: AddUserDetailsInput['body'],
): Promise<UserDetailsInput> {
  const result = await userDetailsSchemaModel.create(input);
  return result;
}

export async function findUserInfo(
  query: FilterQuery<UserDetailsInput>,
  options: QueryOptions = { lean: true },
): Promise<UserDetailsInput | null> {
  const result = await userDetailsSchemaModel.findOne(query, {}, options);
  return result;
}
export async function findUserLoginInfo(
  query: FilterQuery<UserDetailsInput>,
  options: QueryOptions = { lean: true },
): Promise<UserDetailsInput | null> {
  const result = await userDetailsSchemaModel
    .findOne(query, {}, options)
    .select('+password');
  console.log('*******res', result);
  return result;
}

export async function findAllUsersInfo(): Promise<any | null> {
  const result = await userDetailsSchemaModel.find();
  return result;
}

export async function findAndUpdateUserDetails(
  query: FilterQuery<UserDetailsInput>,
  update: UpdateQuery<UserDetailsInput>,
  options: QueryOptions,
): Promise<UserDetailsInput | null> {
  return await userDetailsSchemaModel.findOneAndUpdate(query, update, options);
}

export async function deleteUserDetails(
  query: FilterQuery<UserDetailsInput>,
): Promise<void> {
  await userDetailsSchemaModel.deleteOne(query);
}
