const e = require("express");

const response = (status_code, data, message, res, error = null) => {
    let response_json = {
        "status_code" : status_code,
        "message" : message,
        "data" : data,
    };

    if(status_code == 500)
        response_json.error = error;

    res.status(200).json(response_json);
}

module.exports = response;