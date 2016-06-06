'use strict';

var responses = {
    'GET': getResponse,
    'POST': postResponse,
    'PUT': putResponse,
    'DELETE': deleteResponse
};

function getResponse(data) {
    return setCode(data);
}

function postResponse(data) {
    return setCode(data, 201);
}

function putResponse(data) {
    return setCode(data, 201);
}

function deleteResponse(data) {
    return setCode(data, 201);
}

function setCode(data, success, error) {
    return data ? (success || 200) : (error || 404);
}

function successHandler(req, res) {
    global.logger.info('succesHandler: ' + req.method);
    var method = req.method;
    res.status(responses[method](res.result)).send(res.result);
}

module.exports = successHandler;