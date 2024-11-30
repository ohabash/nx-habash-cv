
import 'colors';
import * as colors from 'colors';
import express from 'express';
import * as path from 'path';
import cors from 'cors';
// import { ApiOpenaiRoutes, OpenAiConversations } from '@nx-habash/api-openai';
import { environment, ErrorObject } from '@nx-habash/utils';
import { ApiRoutes } from './routes.api';
import { OpenAiConversations } from '@nx-habash/api-openai';
colors;

const app = express();
global.conversations = {} as OpenAiConversations; // session storage for chat gpt conversations (il do better later if we make it)

// Custom middleware to parse text/plain bodies
app.use((req, res, next) => {
  if (req.is('text/plain')) {
    let data = '';
    req.on('data', (chunk) => data += chunk);
    req.on('end', () => {
      req.body = { data };
      next();
    });
  }
  next();
});

// parse body params
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(
  cors({
    origin: [
      'https://nx-habash-rvs-f55bb9999d68.herokuapp.com',
      'http://127.0.0.1:3333',
      'http://localhost:3333',
      'http://localhost:4300',
      'http://localhost:4000',
      'http://192.168.3.146:4200',
      'http://localhost:5900',
      'http://localhost:4201',
      'http://localhost:4500',
      'http://localhost:4200',
      'http://localhost:8080',
      'http://localhost:5700',
      'http://localhost:8080/dash.html',
      'https://f452-2600-1702-4f55-6e00-5474-6d90-27ec-3645.ngrok-free.app',
    ],
  })
);

// health check
app.get('/', function (req, res) {
  res.json(getHealth());
});

// environment check
app.get('/env', function (req, res) {
  console.log(`🚀 => environment:`, environment().env);
  res.send(environment());
});

// make assets public
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// api routes
app.use('/api', new ApiRoutes().routes());

// errpr handler
app.use(ErrorHandler);

// serve
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log();
  console.log();
  console.log(
    ` Server Started `.bgCyan.black.bold,
    ` port `.bgGreen.black.bold,
    `${port}`.green.bold
  );
  console.log();
  console.log(`API is available at http://localhost:${port}/api`.gray.bold);
  console.log();
});
server.on('error', console.error);

function ErrorHandler(error, req, res, next) {
  if (!error) return res.sendStatus(404);
  logError(error);
  const status = (error as ErrorObject).main?.status || 501;
  res.status(status).send({ error });
}

export function logError(error, title = 'Error*') {
  if (error.main) {
    const title = error.main.title;
    const msg = error.main.msg;
    console.log(
      `[ main.ts ] : `.gray,
      `🚨  ${title} => `.red.bold,
      `${msg}`.gray.bold
    );
  } else {
    console.log(
      `[ main.ts ] : `.gray,
      `🚨  ${title} => `.red.bold,
      error.toString()
    );
  }
}

function getHealth() {
  return {
    ok: true,
    message: 'Healthier than a horse!',
  };
}
