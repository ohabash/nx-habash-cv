import { errorHandler } from '@nx-habash/utils';
import { NextFunction as Next, Request as Req, Response as Res, Router } from 'express';
import * as core from 'express-serve-static-core';
import { ApiOpenaiConfig } from './api-openai.interface';
import { ApiOpenaiSdk } from './api-openai.sdk';
// import { MetAccount } from "@nx-habash/interfaces";

const sig = '[ api-openai.routes.ts ]'.gray;

export class ApiOpenaiRoutes {
  api!: core.Router;
  account!: any;
  sdk!: ApiOpenaiSdk;
  // conversations: OpenAiConversations = {}; // session storage

  constructor() {}

  routes() {
    this.api = Router();

    // put pre-run-scripts for all endpoints here
    this.api.use('*', async (req, res, next) => {
      const account = (req as any).account;
      const config: ApiOpenaiConfig = {
        account,
        sendStatus: (status) => this.onStatus(res, status),
        sendError: (err) => this.onError(res, err),
        devMode: false,
        // conversations: this.conversations,
      };
      this.sdk = new ApiOpenaiSdk(config);
      next();
    });

    /**
     * @example GET: "{{nx-fornida}}/api/{{client-id}}/api-openai/test"
     */
    this.api.get('/test', async (req: Req, res: Res, next: Next) => {
      res.send('Test Works!');
    });

    /**
     *
     * @description dynamically access the sdk by passing the sdk and its method in the url
     * @example GET: "{{nx-fornida}}/api/{{client-id}}/api-openai/test/sampleHttpRequest"
     *
     */
    this.api.all(
      '/:module/:method',
      async (req: Req, res: Res, next: any) => {
        // use query or body to pass params
        const params = { ...req.query, ...req.body };

        // request (if validated)
        const doRequest = async (method: any) => {
          const resp = await method(params).catch((e) => {
            console.log(`🚨🚨🚨 => ApiOpenai => doRequest => e:`, e);
            throw errorHandler(
              e,
              {
                title:
                  'ApiOpenaiApi => ' +
                  `${req.params.module} => ${req.params.method}(...)`,
                msg: e.toString(),
              },
              next
            );
          });
          return res.send(resp);
        };

        // validate requested method
        return this.validateRequest(req, next, (method: any) =>
          doRequest(method)
        ).catch((e) => next(e));
      }
    );

    return this.api;
  }

  /**
   *
   * @description make sure the module // method exists
   * @param req Req
   * @param next express.Next
   * @param doRequest callback which will execute the request (when validated)
   * @returns executes request (as callback)
   */
  async validateRequest(
    req: Req,
    next: Next,
    doRequest: (method: any) => any
  ) {
    console.log(sig, `validateRequest: `, 'VALIDATING...'.gray.italic);
    // check
    let method = null;
    const mod = this.sdk[req.params.module];
    console.log(sig, `Available Methods: `, Object.keys(mod));

    // no method found err
    if (!mod?.[req.params.method]) {
      const err = `Method "${req.params.method}" not found in "${req.params.module}".`;
      console.log(sig, `🚨`, err.bgRed.black.bold);
      throw errorHandler(new Error(err), {
        title: `ApiOpenaiRoutes => "${req.path}"`,
        msg: err,
      });
    }

    method = mod?.[req.params.method].bind(mod);
    console.log(sig, `Chosen Method: `, req.params.method);

    // send error (method not found)
    if (!method) {
      throw errorHandler(
        new Error(''),
        {
          title: `ApiOpenaiRoutes => ${req.path}`,
          msg: `Method Not Found => ${req.params.method}`,
        },
        next
      );
    }

    // do request (method exists)
    return doRequest(method);
  }

  onError(res, error: any) {
    console.log(sig, 'error: '.red.bold, error);
    return res.status(422).send(error);
  }
  onStatus(res, status: any) {
    console.log(sig, 'status: '.red.bold, status); // for sockets or logs
  }
}
