'use strict';

const proxyquire = require('proxyquire');


describe('ImageService', () => {
    let sut,
        request,
        q,
        environment,
        imageBuffer,
        nowValue,
        mockPromise;

    beforeEach(() => {
        request = {
            post: env.spy()
        };

        environment = {
            IMAGE_HOSTING_URL: 'IMAGE_HOSTING_URL'
        };

        imageBuffer = {
            isBuffer: env.stub().returns(true),
            length: 'length'
        };

        nowValue = 'nowValue';

        env.stub(Date, 'now').returns(nowValue);

        env.stub(global, 'Buffer').returns(imageBuffer);

        mockPromise = {
            reject: env.spy(),
            resolve: env.spy()
        };

        q = {
            defer: env.stub().returns(mockPromise)
        };

        sut = proxyquire('./imageService', {
            request,
            q,
            '../../../env': environment
        });
    });

    afterEach(() => {
        global.Buffer.restore();
        Date.now.restore();
    });

    describe('SaveImage/With Image', () => {
        const options = {
            image: 'image'
        };

        beforeEach(() => {
            sut.saveImage(options);
        });

        it('should save image to External Image Hosting if it passed', () => {
            request.post.should.been
                .calledWith(sinon.match.object, sinon.match.func);
        });

        it('should create image from passed base64', () => {
            global.Buffer.should.been.calledWith(
                options.image,
                'base64'
            );
        });

        it('should send file to correct url', () => {
            const expectedUrl = `${environment.IMAGE_HOSTING_URL}/picture`;
            request.post.should.been
                .calledWith(sinon.match({ url: expectedUrl }));
        });

        it('should send file in correct format', () => {
            const expectedFormData = {
                file: {
                    value: imageBuffer,
                    options: {
                        filename: `${imageBuffer.length}${nowValue}`,
                        contentType: 'image'
                    }
                }
            };
            request.post.should.been
                .calledWith(sinon.match({ formData: expectedFormData }));
        });

        it('should use promises', () => {
            q.defer.should.been
                .called.and.callCount(1);
        });

        it('should reject promise with error if it arrises', () => {
            const postCallBack = request.post.lastCall.args[1];
            const error = 'error';

            postCallBack(error);

            mockPromise.reject.should.been
                .calledWith(error);
        });

        it('should reject promise with error if there is no response body', () => {
            const postCallBack = request.post.lastCall.args[1];

            postCallBack();

            mockPromise.reject.should.been
                .calledWith(sinon.match.instanceOf(Error));
        });

        it('should resolve promise with images path if there is response body', () => {
            const path = 'path';
            const respBody = JSON.stringify({
                path
            });
            const expectedPath = `${environment.IMAGE_HOSTING_URL}/${path}`;
            const postCallBack = request.post.lastCall.args[1];

            postCallBack(null, null, respBody);

            mockPromise.resolve.should.been
                .calledWith(expectedPath);
        });
    });

    describe('SaveImage/WITHOUT Image', () => {
        const options = {
            category: 'categoryId'
        };

        beforeEach(() => {
            sut.saveImage(options);
        });

        it('should resolve promise with hard coded image', () => {
            const expectedPath = 'http://placekitten.com/400/400';
            mockPromise.resolve.should.been
                .calledWith(expectedPath);
        });
    });
});
