import React from 'react';
import CreatePhoto from './CreatePhoto';
import { mount } from 'enzyme';

describe('CreatePhoto', () => {
    let sut,
        getPicture;
    const image = {};

    beforeEach(() => {
        getPicture = env.spy();
    });

    it('should open gallery pop-up on click', () => {
        sut = mount(<CreatePhoto image={image} />);
        sut.find('.create-photo').simulate('click');

        const checkAssertion = () => getPicture.should.not.been.called;
        checkAssertion();
    });

    describe('On Device', () => {
        const DATA_URL = 'DATA_URL';
        const PHOTOLIBRARY = 'PHOTOLIBRARY';
        beforeEach(() => {
            getPicture = env.spy();
            window.navigator.camera = {
                getPicture,
                DestinationType: {
                    DATA_URL
                },
                PictureSourceType: {
                    PHOTOLIBRARY
                }
            };
            sut = mount(<CreatePhoto image={image} />);
        });

        it('should return image in base-64 format', () => {
            sut.find('.create-photo').simulate('click');
            const cameraOptions = getPicture.lastCall.args[2];

            cameraOptions.destinationType.should.equal(DATA_URL);
        });

        it('should return image from Gallery', () => {
            sut.find('.create-photo').simulate('click');
            const cameraOptions = getPicture.lastCall.args[2];

            cameraOptions.sourceType.should.equal(PHOTOLIBRARY);
        });

        it('should set image to form data', () => {
            sut.find('.create-photo').simulate('click');
            const onSuccessCallBack = getPicture.lastCall.args[0];
            const imageData = 'imageData';
            onSuccessCallBack(imageData);

            sut.find('.create-photo').get(0).value.should.equal(imageData);
        });
    });
});
