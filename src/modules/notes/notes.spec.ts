import req from 'supertest';
import app from '../../index';
import { config } from '../../server/config';

const headers = { Authorization: '' };
let userTestId = '';

describe('Testing Notes enpoints', () => {
  describe('Authorization Headers empty in /notes', () => {
    test('GET, POST, PUT and Delete need Authorization headers', async () => {
      const resGet = await req(app).get('/notes');
      expect(resGet.status).toBe(400);
      expect(resGet.body.error).toEqual('Missing authorization headers');

      const resPost = await req(app).get('/notes');
      expect(resPost.status).toBe(400);
      expect(resPost.body.error).toEqual('Missing authorization headers');

      const resPut = await req(app).get('/notes');
      expect(resPut.status).toBe(400);
      expect(resPut.body.error).toEqual('Missing authorization headers');

      const resDel = await req(app).get('/notes');
      expect(resDel.status).toBe(400);
      expect(resDel.body.error).toEqual('Missing authorization headers');
    });
  });

  describe('Check Session and Roles in /notes', () => {
    test('Only users registered with rol "user" can access to the endpoints', async () => {
      // get userTest token for test
      const userTest = await req(app).post('/auth').send(config.testUserData);
      headers.Authorization = `Bearer ${String(userTest?.body?.data?.token)}`;
      userTestId = userTest?.body?.data?._id;

      const res = await req(app).get('/notes/test').set(headers);
      expect(res.status).toBe(200);
    });
  });

  describe('Check all endpoints responses', () => {
    test('Get array with all notes in userTest', async () => {
      const res = await req(app).get(`/notes/${userTestId}`).set(headers);
      expect(res.status).toBe(300);
    });
  });
  // end
});
/* 
    test('GET Array of users in db /users', async () => {
      const res = await req(app).get('/users').set(headers);
      expect(res.status).toBe(200);
      expect(res.body.data[0]).toBeDefined();
    });

    test('GET, PUT and DELETE need _id param with 24 hex characters /users', async () => {
      const resGet = await req(app).get('/users/asda').set(headers);
      expect(resGet.status).toBe(400);
      expect(resGet.body.error[0].errorType).toEqual('too_small');

      const resPut = await req(app).put('/users/asda').set(headers);
      expect(resPut.status).toBe(400);
      expect(resPut.body.error[0].errorType).toEqual('too_small');

      const resDelete = await req(app).delete('/users/asda').set(headers);
      expect(resDelete.status).toBe(400);
      expect(resDelete.body.error[0].errorType).toEqual('too_small');
    });

    test('GET user [0] in DB /users', async () => {
      const res = await req(app).get(`/users/${userId}`).set(headers);
      expect(res.status).toBe(200);
    });
 */
