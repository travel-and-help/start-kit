Travel and Help [![Build Status](https://travis-ci.org/travel-and-help/start-kit.svg?branch=master)](https://travis-ci.org/travel-and-help/start-kit) [![Coverage](https://codecov.io/github/travel-and-help/start-kit/coverage.svg?branch=master)](https://codecov.io/github/travel-and-help/start-kit?branch=master)
=========
Travel and Help is a mobile application, which lets travelers perform some social activities called challenges in chosen city or country. Challenge makers will have the possibility to create social challenges and they will be posted after verification.

* Web site: https://start-kit.herokuapp.com/#/login
* Travis-CI: https://travis-ci.org/travel-and-help/start-kit
* Sauce Labs: https://saucelabs.com/beta/dashboard/tests
* Design mockups: https://projects.invisionapp.com/share/Q66S0N79F#/screens
* Dashboard: https://tree.taiga.io/project/kucherenko-travel-and-help/backlog
* Developer Guide: https://github.com/travel-and-help/start-kit/wiki/Developer-Guide

Building
---------
[Once you have set up your environment](https://github.com/travel-and-help/start-kit/wiki/Developer-Guide), just run:

    npm start

Running tests
-------------
To execute all unit tests, use:

    npm run test:unit

To execute end-to-end (e2e) tests, use:

    npm run test:e2e

To learn more about npm scripts, use [npm scripts guide](https://docs.npmjs.com/misc/scripts)

cp -r target/build/* www/ 

lt --port 9000 --subdomain travelandhelp

##### TODO:

 * create unit tests
 * include cordova on webPack build
 * return status and do not redirect
 * create migration scripts
 * try to add env variables at heroku
 * encode keys for social media
 * auto redirect on login
 * test request service
 * redirect user to next screen
 * check images and login getting
 * skip login redirect
 * build url into client app 
