import * as React from 'react';
import { useShowWeekNumbers, useWeekdays } from '../../hooks';
import Weekday from '../Weekday';

const Weekdays = () => {
  const showWeekNumbers = useShowWeekNumbers();
  const weekDays = useWeekdays();

  return (
    <tr>
      {showWeekNumbers && <th />}
      {weekDays.map((v, i) => {
        return (
          <th key={v}>
            <Weekday dayNumber={i}>{v}</Weekday>
          </th>
        );
      })}
    </tr>
  );
};

export default Weekdays;
