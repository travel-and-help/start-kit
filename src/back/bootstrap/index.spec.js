'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('bootstrap', () => {

    let premiddleware,
        app,
        db,
        appEnv,
        result,
        mongodbUri;

    const controllers = {};
    const formattedDbUri = 'mongodb formatted uri';

    beforeEach(() => {

        mongodbUri = {
            formatMongoose: env.stub().returns(formattedDbUri)
        };

        premiddleware = env.stub();
        db = env.stub();
        appEnv = {
            DB_NAME: 'DB_NAME',
            DB_HOST: 'DB_HOST',
            DB_PORT: 'DB_PORT',
            DB_USER: 'DB_USER',
            DB_PASSWORD: 'DB_PASSWORD'
        };

        const sut = proxyquire('./index', {
            'mongodb-uri': mongodbUri,
            '../controllers': controllers,
            './preMiddleware': premiddleware,
            './db': db,
            '../../../env': appEnv
        });

        app = {
            use: env.spy(() => app)
        };

        result = sut(app);
    });

    it('should create db uri from env', () => {
        mongodbUri.formatMongoose.should.been
            .calledWith({
                scheme: 'mongodb',
                hosts: [
                    {
                        host: appEnv.DB_HOST,
                        port: appEnv.DB_PORT
                    }
                ],
                username: appEnv.DB_USER,
                password: appEnv.DB_PASSWORD,
                database: appEnv.DB_NAME
            })
            .and
            .callCount(1);
    });

    it('should connect to database', () => {
        db.should.been.calledWith(formattedDbUri);
    });

    it('should add premiddleware to app', () => {
        premiddleware.should.been.calledWith(app);
    });

    it('should add controllers to app', () => {
        app.use.should.been.calledWith(controllers);
    });

    it('should return app instance', () => {
        result.should.equal(app);
    });

});

