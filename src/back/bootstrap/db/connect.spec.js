/* eslint-disable no-console*/

'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('bootstrap/db/connect', () => {

    let mongoose;

    const dbUrl = 'db-url';

    beforeEach(() => {
        const connection = {
            on: env.spy(() => connection),
            close: env.stub()
        };

        mongoose = {
            connect: env.stub(),
            connection
        };

        env.stub(process, 'on');
        env.stub(process, 'exit');
        env.stub(console, 'log');

        const sut = proxyquire('./connect', {
            mongoose
        });

        sut(dbUrl);
    });

    it('should connect with to specified database url', () => {
        mongoose.connect.should.been.calledWith(dbUrl);
    });

    it('should log on connection error', () => {
        getConnectionEventHandler('error')();
        console.log.should.been.calledWith(sinon.match.string);
    });

    it('should log on disconnect', () => {
        getConnectionEventHandler('disconnected')();
        console.log.should.been.calledWith(sinon.match.string);
    });

    it('should log on connection', () => {
        getConnectionEventHandler('connected')();
        console.log.should.been.calledWith(sinon.match.string);
    });

    it('should listen for process termination', () => {
        process.on.should.been.calledWith('SIGINT', sinon.match.func);
    });

    context('when process SIGINT', () => {

        beforeEach(() => {
            process.on.lastCall.args[1]();
        });

        it('should close connection', () => {
            mongoose.connection.close.should.been.calledWith(sinon.match.func);
        });

        it('should terminate process when connection closed', () => {
            mongoose.connection.close.lastCall.args[0]();
            process.exit.should.been.calledWith(0);
        });

    });

    function getConnectionEventHandler(eventName) {
        return mongoose.connection.on.getCalls()
            .find(call => call.args[0] === eventName)
            .args[1];
    }

});
