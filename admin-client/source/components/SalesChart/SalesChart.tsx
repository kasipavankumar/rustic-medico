import React, { FC, useEffect, useState } from 'react';
import { AreaChart } from 'react-chartkick';
import 'chart.js';

import { ADMIN_KEY, API_URL } from 'source/config';

const SalesChart: FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/sales`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Admin-Key': ADMIN_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
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

        data['salesData'].map((s) => {
          Object.assign(profit.data, { [s.month]: s.profit });
          Object.assign(loss.data, { [s.month]: s.loss });
          Object.assign(drugsSold.data, { [s.month]: s.drugs_sold });
          Object.assign(drugsUnused.data, { [s.month]: s.unused_drugs });
          return true;
        });

        setChartData([profit, loss, drugsSold, drugsUnused]);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <AreaChart
        id="rustic-medico-sales-chart"
        height="350px"
        xTitle="Months"
        yTitle="Number"
        data={chartData}
      />
    </>
  );
};

export default SalesChart;
