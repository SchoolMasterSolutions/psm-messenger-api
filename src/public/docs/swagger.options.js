require('dotenv').config();

let host = process.env.BASE_URL;
if (process.env.PORT) {
  host += `:${process.env.PORT}`;
}

host += '/';

export const swaggerDefinition = {
  swaggerDefinition: {
    info: {
      title: 'PSM Messenger API',
      version: '0.1.0',
      description: 'Endpoints to use for PSM Messenger API.',
      contact: {
        name: 'Wilson Kiggundu',
        url: 'http://wilsonie.wordpress.com',
        email: 'wil.kiggundu@gmail.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    host,
    basePath: '/',
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      // basic_auth: {
      //   type: 'http',
      //   scheme: 'basic'
      // },

      JWT: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },

      // api_key: {
      //   type: 'apiKey',
      //   in: 'header',
      //   name: 'X-API-Key'
      // }

    },

    tags: [{
      name: 'Users',
      description: 'Handles everything about user signup, authentication and authorization',
    }, {
      name: 'Schools',
      description: 'Handles everything about a school',
    }, {
      name: 'Subscriptions',
      description: 'Handles everything about subscriptions for both school and parents for premium features',
    }, {
      name: 'Students',
      description: 'Handles everything about a student',
    }, {
      name: 'Academic Results',
      description: 'Handles all student results. The results are stored per school, per student, per term, per year',
    }, {
      name: 'Notifications',
      description: 'Handles everything about notifications',
    }, {
      name: 'Articles',
      description: 'Allows users to publish posts, blog articles',
    }],

  },
  basedir: __dirname, // app absolute path
  apis: ['./src/public/docs/spec/*.yml'],
};
