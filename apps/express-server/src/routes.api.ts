import { Router } from 'express';
import { Response as Res, Request as Req, NextFunction as Next } from 'express';
import * as core from 'express-serve-static-core';
import { errorHandler } from '@nx-habash/utils';
import { ApiOpenaiRoutes } from '@nx-habash/api-openai';
// import { MetAccount } from "@nx-habash/interfaces";

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
      const account = (req as any).account;
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
