// src/components/ui/calendar.jsx
import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export const Calendar = ({ selected, onSelect, className = '' }) => {
  return (
    <div className={`p-2 bg-white rounded-xl border border-gray-200 ${className}`}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        modifiersClassNames={{
          selected: 'bg-indigo-600 text-white',
          today: 'text-indigo-600 font-semibold',
        }}
      />
    </div>
  );
};
