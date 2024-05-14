/* eslint-disable prettier/prettier */
import mongoose, { Schema } from 'mongoose';
import { UserDetailsInput } from '../types';

const userDetailsSchema = new Schema({
  mailId: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

// const loginUserDetailsSchema = new Schema({
//   mailId: { type: String, required: true },
//   password: { type: String },
// });

export const userDetailsSchemaModel = mongoose.model<UserDetailsInput>(
  'userDetails',
  userDetailsSchema,
);

// export const loginUserDetailsSchemaModel = mongoose.model<UserDetailsInput>(
//   'userDetailsLogin',
//   loginUserDetailsSchema,
// );
