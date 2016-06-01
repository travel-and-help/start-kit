'use strict';

const responseBuilder = require('./response-builder');

class BaseController {

    constructor(model) {
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
            page: Number(req.query.page) || 1,
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

    processGetByIdResult(result) {
        return result.toObject();
    }

    getById(req, res) {
        return this.createFindByIdRequest(req, res)
            .then((result) => (this.processGetByIdResult(result)))
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
        const model = this.getModel();
        return model
            .remove({ _id: itemId })
            .then((result) => (this.processSuccess(req, res, result)))
            .catch((err) => (this.processError(req, res, err)));
    }

    processError(req, res, err) {
        responseBuilder.fail(res, err);
    }

    processSuccess(req, res, result) {
        responseBuilder.ok(res, result);
    }
}

module.exports = BaseController;
