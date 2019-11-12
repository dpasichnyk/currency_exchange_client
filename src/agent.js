import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = `${process.env.HOST || 'http://localhost:3000'}`;
const API_VERSION = '/v1';

const headers = req => {
    req.set('key-inflection', 'camel');
};

const response = ({ body }) => {
    return body;
};

const requests = {
    get: (url, apiVersion='') =>
        superagent.get(`${API_ROOT}${apiVersion}${url}`)
            .use(headers)
            .then(response)
};

const Currencies = {
    all: () => requests.get('/currencies/all', API_VERSION),
    convert: (amount, from, to) => requests.get(`/currencies/convert?amount=${amount}&from=${from}&to=${to}`, API_VERSION)
};

const RatesHistories = {
    month: () => requests.get('/rates_histories', API_VERSION)
};

export default {
    Currencies,
    RatesHistories
};