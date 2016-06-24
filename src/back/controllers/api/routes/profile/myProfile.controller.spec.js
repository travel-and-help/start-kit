'use strict';

const MyProfileController = require('./myProfile.controller');
const ProfileController = require('./profile.controller');
const profileProperties = require('./profileProperties');

describe('MyProfileController', () => {
    let sut;

    beforeEach(() => {
        sut = new MyProfileController();
    });

    it('should extend profile controller', () => {
        sut.should.be.instanceOf(ProfileController);
    });

    describe('find by id', () => {

        const query = 'query';
        let req,
            result;

        beforeEach(() => {
            req = {
                getCurrentUser: env.spy(() => req),
                select: env.spy(() => query)
            };
            result = sut.createFindByIdRequest(req);
        });

        it('should always find current user', () => {
            req.getCurrentUser.should.have.callCount(1);
        });

        it('should select profile properties', () => {
            req.select.should.been.calledWith(profileProperties);
        });

        it('should return select query', () => {
            result.should.equal(query);
        });

    });

});
