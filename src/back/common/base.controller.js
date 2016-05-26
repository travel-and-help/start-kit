'use strict';

const mongoose = require('mongoose'),
    Q = require('q'),
    responseStatus = require('./response-status');

class BaseController {

    constructor(model) {
        if (model instanceof mongoose.Schema) {
            throw new Error('Model should be a mongoose.Schema instance');
        }
        this._model = model;
    }

    getModel() {
        return this._model;
    }

    getModelInstance(config) {
        return new this._model(config);
    }

    createGetQuery() {
        return {};
    }

    createGetOptions(req) {
        return {
            page: Number(req.query.page) || 0,
            limit: Number(req.query.limit) || 10,
            lean: true
        };
    }

    get(req, res) {
        const model = this.getModel();
        const query = this.createGetQuery(req);
        const options = this.createGetOptions(req);
        return model.paginate(query, options)
            .then((result) => (this.processSuccess(req, res, result)))
            .catch((err) => (this.processError(req, res, err)));
    }

    add(req, res) {
        const modelInstance = this.getModelInstance(req.body);
        return modelInstance.save()
            .then((result) => (this.processSuccess(req, res, result)))
            .catch((err) => (this.processError(req, res, err)));
    }

    createFindByIdRequest(req) {
        const model = this.getModel();
        return model.findById(req.params.id);
    }

    getById(req, res) {
        return this.createFindByIdRequest(req, res)
            .then((result) => (this.processSuccess(req, res, result)))
            .catch((err) => (this.processError(req, res, err)));
    }

    update(req, res) {
        const model = this.getModel();
        return model.findByIdAndUpdate(req.params.id, req.body)
            .then((result) => (this.processSuccess(req, res, result)))
            .catch((err) => (this.processError(req, res, err)));
    }

    remove(req, res) {
        const itemId = req.params.id;
        if (!itemId) {
            res
                .status(responseStatus.BAD_REQUEST)
                .send({
                    success: false,
                    message: 'id should be passed'
                });
            return Q.defer().reject();
        }
        const model = this.getModel();
        return model
            .remove({ _id: itemId })
            .then((result) => (this.processSuccess(req, res, result)))
            .catch((err) => (this.processError(req, res, err)));
    }

    processError(req, res, err) {
        res
            .status(responseStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
            });
    }

    processSuccess(req, res, result) {
        res
            .status(responseStatus.OK)
            .json(result);
    }
}

module.exports = BaseController;
