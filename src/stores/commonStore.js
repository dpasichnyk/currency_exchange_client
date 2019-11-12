import { observable, action, computed, decorate } from 'mobx';
import { groupBy, map, zipObject, debounce, filter, mapValues } from 'lodash';

import agent from '../agent';

class CommonStore {
    ratesHistoriesRegistry = observable.map();
    isLoadingRatesHistories = false;

    currencies = [];
    isLoadingCurrencies = false;

    amount = 1;
    convertFrom = 'EUR';
    convertTo = 'USD';
    conversionResult = 0;
    isCalculatingResult = false;

    get ratesHistories() {
        return Object.values(this.ratesHistoriesRegistry.toJSON());
    };

    get groupedRatesHistories() {
        let values = filter(this.ratesHistories, { fromCurrency: this.convertFrom, toCurrency: this.convertTo });

        // Fallback to reversed rates.
        if (values.length === 0) {

            values = filter(this.ratesHistories, { fromCurrency: this.convertTo, toCurrency: this.convertFrom });

            values = map(values, (v) => {
                let item = {};

                let [date, from, to, rate] = [v.date, v.fromCurrency, v.toCurrency, v.rate];

                item.date = date;
                item.fromCurrency = to;
                item.toCurrency = from;
                item.rate = rate;

                return item
            })
        }

        return map(groupBy(values, 'toCurrency'), (value, key) => { return { name: key, data: zipObject(map(value, 'date'), map(value, 'rate')) }})
    };

    convert = debounce(() => {
        agent.Currencies.convert(this.amount, this.convertFrom, this.convertTo)
            .then(action(data => {
                this.conversionResult = data.result;
            }))
            .finally(action(() => { this.isCalculatingResult = false; }))
    }, 1000);

    loadCurrencies() {
        this.isLoadingCurrencies = true;

        return agent.Currencies.all()
            .then(action(currencies => {
                this.currencies.clear();
                currencies.forEach(currency => this.currencies.push(currency));
            }))
            .finally(action(() => { this.isLoadingCurrencies = false; }))
    }

    loadRatesHistories() {
        this.isLoadingRatesHistories = true;

        return agent.RatesHistories.month()
            .then(action(ratesHistories => {
                this.ratesHistoriesRegistry.clear();
                ratesHistories.forEach(ratesHistory => this.ratesHistoriesRegistry.set(ratesHistory.date, ratesHistory));
            }))
            .finally(action(() => { this.isLoadingRatesHistories = false; }))
    }

    setAmount(val) {
        this.amount = val;
    }

    setConvertFrom(val) {
        this.convertFrom = val;
    }

    setConvertTo(val) {
        this.convertTo = val;
    }
}

decorate(CommonStore, {
    amount: observable,
    convertFrom: observable,
    convertTo: observable,
    conversionResult: observable,
    currencies: observable,
    isLoadingCurrencies: observable,
    ratesHistoriesRegistry: observable,
    isLoadingRatesHistories: observable,
    ratesHistories: computed,
    groupedRatesHistories: computed,
    loadRatesHistories: action,
    setConvertFrom: action,
    setConvertTo: action
});

export default new CommonStore();