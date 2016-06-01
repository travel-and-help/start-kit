'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('bootstrap pre middleware', () => {

    let cors,
        bodyParser,
        passport,
        authService,
        app,
        result;

    beforeEach(() => {

        app = {
            use: env.spy(() => app)
        };

        cors = env.stub().returns('cors');

        bodyParser = {
            json: env.stub().returns({})
        };
        authService = {
            validateJwt: {},
            initRequest: 'initRequest'
        };
        passport = {
            initialize: env.stub().returns(() => {})
        };
        result = proxyquire('./preMiddleware', {
            cors,
            'body-parser': bodyParser,
            passport,
            '../controllers/auth/auth.service': authService
        })(app);
    });

    it('should add cors filter', () => {
        app.use.should.been.calledWith(cors());
    });

    it('should add json body parser', () => {
        app.use.should.been.calledWith(bodyParser.json());
    });

    it('should add validate jwt middleware', () => {
        app.use.should.been.calledWith(authService.validateJwt);
    });

    it('should add initialization passport middleware', () => {
        app.use.should.been.calledWith(passport.initialize());
    });

    it('should add init request middleware', () => {
        app.use.should.been.calledWith(authService.initRequest);
    });

    it('should return app', () => {
        result.should.equal(app);
    });

});
