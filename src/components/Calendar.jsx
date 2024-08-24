// src/components/Calendar.js
import React, { useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const Calendar = () => {
  useEffect(() => {
    const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    const defaultDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;

    flatpickr('#datetimepicker-dashboard', {
      inline: true,
      prevArrow: '<span title="Previous month">&laquo;</span>',
      nextArrow: '<span title="Next month">&raquo;</span>',
      defaultDate: defaultDate,
    });
  }, []);

  return <div id="datetimepicker-dashboard"></div>;
};

export default Calendar;

