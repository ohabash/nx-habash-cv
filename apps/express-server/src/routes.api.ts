import { Router } from 'express';
import { Response as Res, Request as Req, NextFunction as Next } from 'express';
import * as core from 'express-serve-static-core';
import { ApiOpenaiRoutes } from '@nx-habash/api-openai';
import { ApiCatsRoutes } from '@nx-habash/api-cats';

const sig = '[ api-openai.routes.ts ]'.gray;

export class ApiRoutes {
  api!: core.Router;
  account!: any;
  // conversations: OpenAiConversations = {}; // session storage

  constructor() {}

  routes() {
    // create new router
    this.api = Router();

    // handle all endpoints here
    this.api.use('*', async (req: Req, res: Res, next: Next) => {
      console.log(`🚀 => ApiRoutes => this.api.use => req.path:`, req.path);
      const account = (req as any).account;
      console.log(`🚀 => ApiRoutes => this.api.use => account:`, account)
      next();
    });

    // root => GET => welcome message
    this.api.get('/', (req, res) => {
      res.send('Welcome to the Omar Habash CV API');
    });

    // "test" => GET
    this.api.get('/test', async (req: Req, res: Res) => {
      res.send('Test Works!');
    });

    // list APIs here
    this.api.use('/cats', new ApiCatsRoutes().routes());
    this.api.use('/openai', new ApiOpenaiRoutes().routes());

    // return all api routes
    return this.api;
  }

  onError(res, error: any) {
    console.log(sig, 'error: '.red.bold, error);
    return res.status(422).send(error);
  }
  onStatus(res, status: any) {
    console.log(sig, 'status: '.red.bold, status); // for sockets or logs
  }
}
