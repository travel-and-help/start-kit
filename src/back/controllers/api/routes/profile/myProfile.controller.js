'use strict';

const ProfileController = require('./profile.controller.js');
const profileProperties = require('./profileProperties');

class MyProfileController extends ProfileController {

    createFindByIdRequest(req) {
        return req.getCurrentUser()
            .select(profileProperties);
    }
}

module.exports = MyProfileController;
