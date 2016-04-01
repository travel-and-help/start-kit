# start-kit [![Build Status](https://travis-ci.org/stremann/t7h-ci-kit.svg?branch=master)](https://travis-ci.org/stremann/t7h-ci-kit)

### Links
* [View on Heroku](https://t7h-ci-kit.herokuapp.com/)

### Main npm scripts

* ``` npm run watch ``` build app, stand up local mongo db, start server and watch for changes on bacend and frontend (best for development). Notice: front end will be served from memory by webpack dev server and be available on __PORT + 1__
* ``` npm start ``` build project (target depends on __NODE_ENV__) and serve target (best for deployment)
* ``` npm test ``` lint code, run tests and generates html coverage report for back and front (ci command)
* ``` npm run lint ``` lint front-end and back-end code (see [JS style guide](https://github.com/airbnb/javascript))

### .env file
Before start server or build environment variables will be loaded from .env file

* __NODE_ENV__ - supported values: (development|production). With production or not development env all sources will be optimized for production
* __PORT__ - port for serving target (for both express and browser-sync)
