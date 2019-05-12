/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import {
  endOfMonth,
  getDaysInMonth,
  getDay,
  addDays,
  getWeek,
} from 'date-fns/esm';
import {
  usePageDate,
  useLocale,
  useCalendarDispatch,
  useShowWeekNumbers,
} from '../../context/Calendar';
import Day from '../Day';
import { chunk } from '../../utils/array';
import {
  SET_FOCUS_DATE,
  INCREMENT_FOCUS_DATE,
  DECREMENT_FOCUS_DATE,
  DECREMENT_FOCUS_MONTH,
  DECREMENT_FOCUS_YEAR,
  SET_SELECTED_DATE,
} from '../../context/Calendar/actions';

const CalendarDays = () => {
  const showWeekNumbers = useShowWeekNumbers();
  const dispatch = useCalendarDispatch();
  const [locale, rtl] = useLocale();
  const pageDate = usePageDate();

  const weeks = React.useMemo(() => {
    return chunk(
      [
        ...Array.from({ length: getDay(pageDate) }),
        ...Array.from({ length: getDaysInMonth(pageDate) }),
        ...Array.from({
          length: 6 - getDay(endOfMonth(pageDate)),
        }),
      ].map((_, i) => addDays(pageDate, i - getDay(pageDate))),
      7
    );
  }, [pageDate]);

  const formatter = new Intl.DateTimeFormat(locale).format;

  const dayFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
    }).format;
  }, [locale]);

  const dateStringFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format;
  }, [locale]);

  const numberFormatter = new Intl.NumberFormat(locale).format;

  const handleFocus = React.useCallback(date => {
    dispatch({ type: SET_FOCUS_DATE, date });
  }, []);

  const handleClick = React.useCallback(date => {
    dispatch({ type: SET_SELECTED_DATE, date });
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>, date) => {
      switch (e.key) {
        case 'ArrowUp': {
          dispatch({ type: DECREMENT_FOCUS_DATE, count: 7 });
          break;
        }
        case 'ArrowDown': {
          dispatch({ type: INCREMENT_FOCUS_DATE, count: 7 });
          break;
        }
        case 'ArrowLeft': {
          if (rtl) {
            dispatch({ type: INCREMENT_FOCUS_DATE });
          } else {
            dispatch({ type: DECREMENT_FOCUS_DATE });
          }
          break;
        }
        case 'ArrowRight': {
          if (rtl) {
            dispatch({ type: DECREMENT_FOCUS_DATE });
          } else {
            dispatch({ type: INCREMENT_FOCUS_DATE });
          }
          break;
        }
        case 'PageDown': {
          dispatch({ type: DECREMENT_FOCUS_MONTH });
          break;
        }
        case 'PageUp': {
          dispatch({ type: DECREMENT_FOCUS_MONTH });
          break;
        }
        case 'Home': {
          dispatch({ type: DECREMENT_FOCUS_YEAR });
          break;
        }
        case 'End': {
          dispatch({ type: DECREMENT_FOCUS_YEAR });
          break;
        }
        case 'Enter': {
          dispatch({ type: SET_SELECTED_DATE, date });
          // if (onChange) {
          //   onChange({ value: date });
          // }
          break;
        }
        case ' ': {
          dispatch({ type: SET_SELECTED_DATE, date });
          // if (onChange) {
          //   onChange({ value: date });
          // }
          break;
        }
      }
    },
    [dispatch, rtl]
  );

  return (
    <React.Fragment>
      {weeks.map(daysInWeek => {
        const weekNumber = numberFormatter(getWeek(daysInWeek[0]));
        const day0 = formatter(daysInWeek[0]);
        const day6 = formatter(daysInWeek[6]);
        return (
          <tr
            key={weekNumber}
            aria-label={rtl ? `${day6} - ${day0}` : `${day0} - ${day6}`}
          >
            {showWeekNumbers && <td>{weekNumber}</td>}
            {daysInWeek.map(v => {
              const dateString = dateStringFormatter(v);
              return (
                <td key={v.toLocaleDateString()}>
                  <Day
                    date={v}
                    title={dateString}
                    id={dateString}
                    aria-label={dateString}
                    handleFocus={handleFocus}
                    handleClick={handleClick}
                    handleKeyDown={handleKeyDown}
                  >
                    {dayFormatter(v)}
                  </Day>
                </td>
              );
            })}
          </tr>
        );
      })}
    </React.Fragment>
  );
};

export default React.memo(CalendarDays);