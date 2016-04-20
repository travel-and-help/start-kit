# Travel and Help
[![Build Status](https://travis-ci.org/travel-and-help/start-kit.svg?branch=master)](https://travis-ci.org/travel-and-help/start-kit)
[![Coverage](https://codecov.io/github/travel-and-help/start-kit/coverage.svg?branch=master)](https://codecov.io/github/travel-and-help/start-kit?branch=master)

## Links

#### CI [Travis-CI] (https://travis-ci.org/travel-and-help/start-kit)

#### E2E [Sauce Labs] (https://saucelabs.com/beta/dashboard/tests)

#### LIVE [Heroku] (https://start-kit.herokuapp.com/)

#### Style Gude [Airbnb React/JSX Style Guide] (https://github.com/airbnb/javascript/tree/master/react#naming)

## Main npm scripts

* ``` npm run watch ``` build app, stand up local mongo db, start server and watch for changes on bacend and frontend (best for development). Notice: front end will be served from memory by webpack dev server and be available on __PORT + 1__
* ``` npm start ``` build project (target depends on __NODE_ENV__) and serve target (best for deployment)

* ``` npm run lint ``` lint all sources (see [JS style guide](https://github.com/airbnb/javascript))
* ``` npm run lint:front ``` lint frontend sources
* ``` npm run lint:back ``` lint backend sources

* ``` npm test ``` run all tests
* ``` npm run test:front ``` run frontend tests
* ``` npm run test:back ``` run backend tests

* ``` npm run coverage ``` generates html coverage report

* ``` npm run test-ci ``` lint code, run tests, generates coverage report and uploads it to codecov

* ``` npm run cordova:copy ``` copy build artifact from target/ to cordova
* ``` npm run cordova:prepare ``` expand cordova plugins and platforms from config.xml
* ``` npm run cordova:build ``` build native applications with cordova ios and android
* ``` npm run cordova:build:ios ``` build native ios application with cordova
* ``` npm run cordova:build:android ``` build native android application with cordova

## .env file
Before start server or build environment variables will be loaded from .env file

* __NODE_ENV__ - supported values: (development|production). With production or not development env all sources will be optimized for production
* __PORT__ - port for serving target (for both express and browser-sync)
* __DB_URL__ - database connection string eg. url

## Db migrations

* ``` npm run mm create [MIGRATION NAME] ``` new migrations in migrations folder appears, in migration file implement up method
* ``` npm run mm``` run migrations
