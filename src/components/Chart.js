import React from 'react';
import { inject, observer } from "mobx-react";
import { AreaChart } from 'react-chartkick';
import 'chart.js';

import Loading from "./Loading";

let Chart = inject('commonStore')(
    observer(
        class Chart extends React.Component {
            render() {
                const { groupedRatesHistories, isLoadingRatesHistories, convertFrom } = this.props.commonStore;

                if (isLoadingRatesHistories) return <Loading/>;

                return (
                    <React.Fragment>
                        <AreaChart xtitle="Time" ytitle={convertFrom} data={groupedRatesHistories}/>
                    </React.Fragment>
                );
            }
        })
);

export default Chart;