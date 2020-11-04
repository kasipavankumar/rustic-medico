import React, { FC } from 'react';
import { ColumnChart } from 'react-chartkick';
import 'chart.js';

import useSalesData from 'hooks/useSalesData';

const mapDataToProps = (data: any[]) => {
  if (!data || !data.length) return;

  const profit = {
    name: 'Profit',
    data: {},
  };

  const loss = {
    name: 'Loss',
    data: {},
  };

  const drugsSold = {
    name: 'Drugs Sold',
    data: {},
  };
  const drugsUnused = {
    name: 'Drugs Wasted',
    data: {},
  };

  data.map((s) => {
    Object.assign(profit.data, { [s.month]: s.profit });
    Object.assign(loss.data, { [s.month]: s.loss });
    Object.assign(drugsSold.data, { [s.month]: s.drugs_sold });
    Object.assign(drugsUnused.data, { [s.month]: s.unused_drugs });
    return true;
  });

  return [profit, loss, drugsSold, drugsUnused];
};

const SalesChart: FC = () => {
  const { data } = useSalesData();
  const chartData2 = mapDataToProps(data);

  return (
    <>
      {/* Changing to bar chart for WDL. */}
      {/* <AreaChart
        id="rustic-medico-sales-chart"
        height="350px"
        xTitle="Months"
        yTitle="Number"
        data={chartData}
      /> */}

      <ColumnChart
        id="rm-sales"
        xTitle="Months"
        yTitle="Number"
        data={chartData2}
        messages={{ empty: 'Constructing sales data...' }}
      />
    </>
  );
};

export default SalesChart;
