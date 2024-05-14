/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import {
  AddUserDetailsInput,
  LoginUserDetailsInput,
  UpdateUserDetailsInput,
} from '../schema/userDetails.schema';
import {
  addUserDetails,
  deleteUserDetails,
  findAllUsersInfo,
  findAndUpdateUserDetails,
  findUserInfo,
} from '../service/userDetails.service';
import ErrorService from '../service/ErrorService';
import { removeKeyValuePairsFromResponse } from '../utils/utils';
// import jwt from 'jsonwebtoken';

export async function addUserDetailsHandler(
  req: Request<{}, {}, AddUserDetailsInput['body']>,
  res: Response,
) {
  const userInfo = await findUserInfo({ mailId: req.body.mailId });

  if (!!userInfo) {
    return res.status(409).json({ message: 'User Details already exists' });
  }

  try {
    const DetailsInfo = await addUserDetails(req.body);
    return res.status(200).json(DetailsInfo.toJSON());
  } catch (error) {
    ErrorService.notify('Unable to add user Details:', error);
    return res.status(500).json({ message: 'Unable to add user Details' });
  }
}

export async function updateUserDetailsHandler(
  req: Request<UpdateUserDetailsInput['params']>,
  res: Response,
) {
  const mailId = req.params.mailId;
  const update = req.body;

  const userInfo = await findUserInfo({ mailId });

  if (!userInfo) {
    return res
      .status(404)
      .json({ message: `User with id ${mailId} not found` });
  }

  const updatedUserDetails = await findAndUpdateUserDetails(
    { mailId },
    update,
    {
      new: true,
    },
  );

  return res
    .status(200)
    .json(removeKeyValuePairsFromResponse(updatedUserDetails?.toJSON()));
}

export async function getUserDetailsHandler(
  req: Request<UpdateUserDetailsInput['params']>,
  res: Response,
) {
  const mailId = req.params.mailId;
  const userInfo = await findUserInfo({ mailId });

  if (!userInfo) {
    return res
      .status(404)
      .json({ message: `User with id ${mailId} not found` });
  }

  return res.status(200).json(userInfo);
}

export async function getAllUserDetailsHandler(_req: any, res: any) {
  const users = await findAllUsersInfo();
  if (!users) {
    return res.status(404).json({ message: `Users are not found` });
  }
  return res.status(200).json({ users });
}

export async function deleteUserDetailsHandler(
  req: Request<UpdateUserDetailsInput['params']>,
  res: Response,
) {
  const mailId = req.params.mailId;
  const userInfo = await findUserInfo({ mailId });
  if (!userInfo) {
    return res
      .status(404)
      .json({ message: `User with id ${mailId} not found` });
  }
  await deleteUserDetails({ mailId });
  return res.status(200).json({ message: 'Successfully deleted' });
}

export async function loginUserDetailsHandler(
  req: Request<{}, {}, LoginUserDetailsInput['body']>,
  res: Response,
) {
  const { password } = req.body;
  const userInfo = await findUserInfo({ mailId: req.body.mailId });
  if (!userInfo) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    // Compare passwords
    if (password !== userInfo?.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // const token = jwt.sign({ userId: userInfo._id }, 'secret');
    // res.json({ token });
    return res.status(200).json({ message: 'Login is Successful' });
    // Redirect to home page with token as query parameter
    // res.redirect(`/home`);
  } catch (error) {
    ErrorService.notify('Unable to add user Details:', error);
    return res.status(500).json({ message: 'Unable to add user Details' });
  }
}
