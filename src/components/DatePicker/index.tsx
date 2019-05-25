import * as React from 'react';
import { createPortal } from 'react-dom';
import Calendar from '../Calendar';
import { LocaleContext, RtlContext } from '../../context';
import defaultLocale from '../../utils/default-locale';
import rtlLocales from '../../utils/rtl-locales';
import Input from '../Input';

export default function DatePicker({
  locale,
  date,
  showWeekNumbers,
  portalContainer = document.body,
  closeOnSelect,
  closeOnClickOutside = true,
  onChange,
}: any) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const calendarRef = React.useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = React.useState(false);

  const innerLocale = React.useMemo(() => {
    return Intl.getCanonicalLocales(locale || defaultLocale);
  }, [locale]);

  const { placeholder, dateParts } = React.useMemo(() => {
    const formatToPartsResult = new Intl.DateTimeFormat(
      innerLocale
    ).formatToParts(new Date());

    const ret = [];
    for (const part in formatToPartsResult) {
      const p = formatToPartsResult[part];
      if (p.type !== 'literal') {
        ret.push(p.type);
      } else {
        ret.push(p.value);
      }
    }

    return {
      placeholder: ret.join(''),
      dateParts: formatToPartsResult.filter(i => i.type !== 'literal'),
    };
  }, [innerLocale]);

  const isRtl = React.useMemo(() => {
    return !!innerLocale.find((locale: string) => {
      return (
        rtlLocales.hasOwnProperty(locale) ||
        rtlLocales.hasOwnProperty(locale.split('-')[0])
      );
    });
  }, [innerLocale]);

  const parseValue = React.useCallback(
    (value: string) => {
      const splitValue = value.split(/[\\\/]|-/);

      return new Date(
        parseInt(splitValue[dateParts.findIndex(t => t.type === 'year')], 10),
        parseInt(splitValue[dateParts.findIndex(t => t.type === 'month')], 10) -
          1,
        parseInt(splitValue[dateParts.findIndex(t => t.type === 'day')], 10)
      );
    },
    [dateParts]
  );

  const [{ currentDate, inputDate = '' }, setState] = React.useState<any>(
    () => {
      if (!date)
        return {
          currentDate: '',
          inputDate: '',
        };

      return {
        currentDate: parseValue(date).getTime(),
        inputDate: date || '',
      };
    }
  );

  const onBlur = React.useCallback(
    e => {
      if (e.target instanceof HTMLInputElement) {
        const { value } = e.target;

        setState((s: any) => ({
          ...s,
          currentDate: parseValue(value),
          inputDate: value,
        }));
      }
    },
    [setState, parseValue]
  );

  const onKeyDown = React.useCallback(
    e => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          onBlur(e);
          return;
      }
    },
    [onBlur]
  );

  const handleChange = React.useCallback(
    e => {
      if (e.target instanceof HTMLInputElement) {
        const { value } = e.target;
        setState((s: any) => ({
          ...s,
          inputDate: value,
        }));
      }
    },
    [setState]
  );

  const onCalendarChange = React.useCallback(
    (e: any) => {
      if (e.value) {
        setState((s: any) => ({
          ...s,
          currentDate: e.value.getTime(),
          inputDate: e.value,
        }));
      }
      if (closeOnSelect) {
        setOpen(false);
      }
      if (onChange && typeof onChange === 'function') {
        onChange({ value: new Date(e.value) });
      }
    },
    [setOpen, setState, closeOnSelect, onChange]
  );

  const calendar = (
    <Calendar
      ref={calendarRef}
      locale={locale}
      date={currentDate}
      showWeekNumbers={!!showWeekNumbers}
      onChange={onCalendarChange}
    />
  );

  const calendarContainer = portalContainer
    ? createPortal(calendar, portalContainer)
    : calendar;

  const value = React.useMemo(() => {
    return inputDate instanceof Date
      ? new Intl.DateTimeFormat(innerLocale).format(inputDate)
      : inputDate;
  }, [inputDate, innerLocale]);

  const openCalendar = React.useCallback(() => setOpen(true), [setOpen]);

  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!closeOnClickOutside) return;
      if (!isOpen) return;
      if (
        inputRef.current &&
        (event.target === inputRef.current ||
          (event.target instanceof Node &&
            inputRef.current.contains(event.target)))
      ) {
        return;
      }
      if (
        calendarRef.current &&
        (event.target === calendarRef.current ||
          (event.target instanceof Node &&
            calendarRef.current.contains(event.target)))
      ) {
        return;
      }

      setOpen(false);
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, [isOpen, closeOnClickOutside]);

  return (
    <LocaleContext.Provider value={innerLocale}>
      <RtlContext.Provider value={isRtl}>
        <Input
          ref={inputRef}
          name="inputDate"
          value={value}
          onBlur={onBlur}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onFocus={openCalendar}
          placeholder={placeholder}
        />
        {isOpen && calendarContainer}
      </RtlContext.Provider>
    </LocaleContext.Provider>
  );
}