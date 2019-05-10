import {
  startOfMonth,
  addMonths,
  addYears,
  setMonth,
  setYear,
  addDays,
  isValid,
} from 'date-fns';
import {
  DECREMENT_PAGE_MONTH,
  DECREMENT_PAGE_YEAR,
  INCREMENT_PAGE_MONTH,
  INCREMENT_PAGE_YEAR,
  SET_PAGE_MONTH,
  SET_PAGE_YEAR,
  SET_PAGE_DATE,
  SET_FOCUS_DATE,
  INCREMENT_FOCUS_DATE,
  DECREMENT_FOCUS_DATE,
  INCREMENT_FOCUS_MONTH,
  DECREMENT_FOCUS_MONTH,
  INCREMENT_FOCUS_YEAR,
  DECREMENT_FOCUS_YEAR,
  SET_SELECTED_DATE,
} from './actions';

export default (
  state: { pageDate: Date; focusDate?: Date; selectedDate?: Date },
  { type, ...payload }: any
) => {
  switch (type) {
    case SET_SELECTED_DATE: {
      return {
        ...state,
        pageDate: startOfMonth(payload.selectedDate),
        selectedDate: payload.selectedDate,
      };
    }
    case DECREMENT_PAGE_MONTH: {
      const nextPageDate = addMonths(state.pageDate, -1);
      if (!isValid(nextPageDate)) return state;
      return {
        ...state,
        pageDate: nextPageDate,
      };
    }
    case DECREMENT_PAGE_YEAR: {
      const nextPageDate = addYears(state.pageDate, -1);
      if (!isValid(nextPageDate)) return state;
      return {
        ...state,
        pageDate: nextPageDate,
      };
    }
    case INCREMENT_PAGE_MONTH: {
      const nextPageDate = addMonths(state.pageDate, 1);
      if (!isValid(nextPageDate)) return state;
      return {
        ...state,
        pageDate: nextPageDate,
      };
    }
    case INCREMENT_PAGE_YEAR: {
      const nextPageDate = addYears(state.pageDate, 1);
      if (!isValid(nextPageDate)) return state;
      return {
        ...state,
        pageDate: nextPageDate,
      };
    }
    case SET_PAGE_MONTH: {
      const { month } = payload;
      if (!month && month !== 0) return state;

      const nextPageDate = setMonth(state.pageDate, month);
      if (!isValid(nextPageDate)) return state;
      return {
        ...state,
        pageDate: nextPageDate,
      };
    }
    case SET_PAGE_YEAR: {
      const { year } = payload;
      if (!year && year !== 0) return state;

      const nextPageDate = setYear(state.pageDate, year);
      if (!isValid(nextPageDate)) return state;
      return {
        ...state,
        pageDate: nextPageDate,
      };
    }
    case SET_PAGE_DATE: {
      const nextPageDate = payload.date;
      if (!isValid(nextPageDate)) return state;
      return {
        ...state,
        pageDate: nextPageDate,
      };
    }
    case SET_FOCUS_DATE: {
      const nextFocusDate = payload.focusDate;
      if (!isValid(nextFocusDate)) return state;
      return {
        ...state,
        focusDate: nextFocusDate,
      };
    }
    case INCREMENT_FOCUS_DATE: {
      const nextFocusDate = addDays(state.focusDate as any, payload.days || 1);
      if (!isValid(nextFocusDate)) return state;
      const nextPageDate = startOfMonth(nextFocusDate);
      return {
        ...state,
        pageDate: isValid(nextPageDate) ? nextPageDate : state.pageDate,
        focusDate: nextFocusDate,
      };
    }
    case DECREMENT_FOCUS_DATE: {
      const nextFocusDate = addDays(
        state.focusDate as any,
        -(payload.days || 1)
      );
      if (!isValid(nextFocusDate)) return state;
      const nextPageDate = startOfMonth(nextFocusDate);
      return {
        ...state,
        pageDate: isValid(nextPageDate) ? nextPageDate : state.pageDate,
        focusDate: nextFocusDate,
      };
    }
    case INCREMENT_FOCUS_MONTH: {
      const nextFocusDate = addMonths(state.focusDate as any, 1);
      if (!isValid(nextFocusDate)) return state;
      const nextPageDate = startOfMonth(nextFocusDate);
      return {
        ...state,
        pageDate: isValid(nextPageDate) ? nextPageDate : state.pageDate,
        focusDate: nextFocusDate,
      };
    }
    case DECREMENT_FOCUS_MONTH: {
      const nextFocusDate = addMonths(state.focusDate as any, -1);
      if (!isValid(nextFocusDate)) return state;
      const nextPageDate = startOfMonth(nextFocusDate);
      return {
        ...state,
        pageDate: isValid(nextPageDate) ? nextPageDate : state.pageDate,
        focusDate: nextFocusDate,
      };
    }
    case INCREMENT_FOCUS_YEAR: {
      const nextFocusDate = addYears(state.focusDate as any, 1);
      if (!isValid(nextFocusDate)) return state;
      const nextPageDate = startOfMonth(nextFocusDate);
      return {
        ...state,
        pageDate: isValid(nextPageDate) ? nextPageDate : state.pageDate,
        focusDate: nextFocusDate,
      };
    }
    case DECREMENT_FOCUS_YEAR: {
      const nextFocusDate = addYears(state.focusDate as any, -1);
      if (!isValid(nextFocusDate)) return state;
      const nextPageDate = startOfMonth(nextFocusDate);
      return {
        ...state,
        pageDate: isValid(nextPageDate) ? nextPageDate : state.pageDate,
        focusDate: nextFocusDate,
      };
    }
    default: {
      throw new Error('Invalid type');
    }
  }
};
