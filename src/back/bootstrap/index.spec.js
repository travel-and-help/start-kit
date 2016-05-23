'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('bootstrap', () => {

    let premiddleware,
        app,
        db,
        appEnv,
        result,
        mongodbUri,
        authService,
        http;

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
        authService = {
            getCurrentUser: env.stub(),
            isAuthenticated: env.stub()
        };
        http = {
            IncomingMessage: function IncomingMessage() {}
        };
        const sut = proxyquire('./index', {
            'mongodb-uri': mongodbUri,
            '../controllers': controllers,
            './preMiddleware': premiddleware,
            './db': db,
            '../../../env': appEnv,
            '../controllers/auth/auth.service': authService,
            http
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

    it('should extend IncomingMessage', () => {
        const message = new http.IncomingMessage();
        message.isAuthenticated();
        authService.isAuthenticated.should.calledWith();
        message.getCurrentUser();
        authService.getCurrentUser.should.calledWith();
    });

});

