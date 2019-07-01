require('dotenv').config();

let host = process.env.BASE_URL
if (process.env.PORT) {
  host += `:${process.env.PORT}`
}

host += '/'

export const swaggerDefinition = {
  swaggerDefinition: {
    info: {
      title: 'PSM Messenger API',
      version: '0.1.0',
      description: 'Endpoints to use for PSM Messenger API',
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
    host: host,
    basePath: '/',
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {

    },

  },
  basedir: __dirname, // app absolute path
  apis: ['./src/public/docs/routes/*.yml'],
};