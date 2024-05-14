import { Express, Request, Response } from 'express';
import validateResource from './middleware/validateResource';
import {
  addUserDetailsSchema,
  deleteUserDetailsSchema,
  getUserDetailsSchema,
  updateUserDetailsSchema,
} from './schema/userDetails.schema';
import {
  addUserDetailsHandler,
  deleteUserDetailsHandler,
  getAllUserDetailsHandler,
  getUserDetailsHandler,
  loginUserDetailsHandler,
  updateUserDetailsHandler,
} from './controller/userDetails.controller';

function routes(app: Express) {
  /**
   * @openapi
   * /welcome:
   *   get:
   *     tags:
   *       - welcome-to-shop-api
   *     summary: Welcome message
   *     responses:
   *       200:
   *         description: Welcome to the shop API
   */
  app.get('/welcome', (_req: Request, res: Response) => {
    res.status(200).send('Welcome to the shop API');
  });

  /**
   * @openapi
   * '/api/add_user_detail':
   *  post:
   *     tags:
   *     - user-details-controller
   *     summary: Add User Details
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/UserDetails'
   *     responses:
   *       200:
   *         description: User Details created
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/UserDetailsResponse'
   */

  app.post(
    '/api/add_user_detail',
    [validateResource(addUserDetailsSchema)],
    addUserDetailsHandler,
  );

  /**
   * @openapi
   * '/api/details/{mailId}':
   *  get:
   *     tags:
   *     - user-Details-controller
   *     summary: Get user Details by the Mail Id
   *     parameters:
   *      - name: mailId
   *        in: path
   *        description: The id of the user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/UserDetailsResponse'
   *       404:
   *         description: Mail Id not found

   * @openapi
   * '/api/user_details':
   *  get:
   *     tags:
   *     - user-Details-controller
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/UserDetailsResponse'
   *       404:
   *         description: Mail Id not found
   *       @openapi
   *      '/api/details/{mailId}/add_user_details':
   *  post:
   *     tags:
   *     - user-details-controller
   *     summary: Add User Details
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/UserDetails'
   *     responses:
   *       200:
   *         description: User Details created
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/UserDetailsResponse'
   *      @openapi
   *      '/api/details/{mailId}':
   *  put:
   *     tags:
   *     - user-details-controller
   *     summary: Update a user Details
   *     parameters:
   *      - name: mailId
   *        in: path
   *        description: The id of the user
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/UpdateUserDetails'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/UserDetailsResponse'
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Mail Id not found
   *  delete:
   *     tags:
   *     - user-details-controller
   *     summary: Delete a user Details
   *     parameters:
   *      - name: mailId
   *        in: path
   *        description: The id of the user
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Mail Id not found
   */

  app.get(
    '/api/details/:mailId',
    validateResource(getUserDetailsSchema),
    getUserDetailsHandler,
  );

  app.post('/api/userInfo/login', loginUserDetailsHandler);

  app.get(
    '/api/user_details',
    // validateResource(getFullUserDetailsSchema),
    getAllUserDetailsHandler,
  );

  app.put(
    '/api/details/:mailId',
    [validateResource(updateUserDetailsSchema)],
    updateUserDetailsHandler,
  );

  app.delete(
    '/api/details/:mailId',
    [validateResource(deleteUserDetailsSchema)],
    deleteUserDetailsHandler,
  );
}

export default routes;
