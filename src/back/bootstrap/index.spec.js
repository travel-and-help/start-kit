'use strict';

const proxyquire = require('proxyquire');

describe('bootstrap', () => {

    let premiddleware,
        app,
        db,
        appEnv,
        result;

    const controllers = {};

    beforeEach(() => {

        premiddleware = env.stub();
        db = env.stub();
        appEnv = {
            DB_NAME: 'DB_NAME',
            DB_HOST: 'DB_HOST',
            DB_PORT: 'DB_PORT'
        };

        const sut = proxyquire('./index', {
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

    it('should connect to database', () => {
        const dbUrl = `mongodb://${appEnv.DB_HOST}:${appEnv.DB_PORT}/${appEnv.DB_NAME}`;

        db.should.been.calledWith(dbUrl);
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

