import React from 'react';

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

interface OpeningHoursSectionProps {
  openingHours: OpeningHours;
  onHoursChange: (day: keyof OpeningHours, hours: DayHours) => void;
  disabled?: boolean;
}

const DAYS = [
  { key: 'monday' as const, label: 'Monday' },
  { key: 'tuesday' as const, label: 'Tuesday' },
  { key: 'wednesday' as const, label: 'Wednesday' },
  { key: 'thursday' as const, label: 'Thursday' },
  { key: 'friday' as const, label: 'Friday' },
  { key: 'saturday' as const, label: 'Saturday' },
  { key: 'sunday' as const, label: 'Sunday' },
];

const TIME_OPTIONS = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
  '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
];

const OpeningHoursSection: React.FC<OpeningHoursSectionProps> = ({
  openingHours,
  onHoursChange,
  disabled = false,
}) => {
  const copyHours = (fromDay: keyof OpeningHours, toDay: keyof OpeningHours) => {
    const fromHours = openingHours[fromDay];
    onHoursChange(toDay, { ...fromHours });
  };

  const setAllDays = (hours: DayHours) => {
    DAYS.forEach(day => {
      onHoursChange(day.key, { ...hours });
    });
  };

  const toggleClosed = (day: keyof OpeningHours) => {
    const currentHours = openingHours[day];
    onHoursChange(day, {
      ...currentHours,
      closed: !currentHours.closed,
    });
  };

  const updateTime = (day: keyof OpeningHours, timeType: 'open' | 'close', time: string) => {
    const currentHours = openingHours[day];
    onHoursChange(day, {
      ...currentHours,
      [timeType]: time,
    });
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2'>
          Opening Hours
        </h3>
        
        {/* Quick Actions */}
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setAllDays({ open: '09:00', close: '22:00', closed: false })}
            className='text-xs text-indigo-600 hover:text-indigo-800 font-medium'
            disabled={disabled}
          >
            Set all to 9AM-10PM
          </button>
          <button
            type='button'
            onClick={() => setAllDays({ open: '00:00', close: '00:00', closed: true })}
            className='text-xs text-red-600 hover:text-red-800 font-medium'
            disabled={disabled}
          >
            Close all days
          </button>
        </div>
      </div>

      <div className='space-y-3'>
        {DAYS.map((day) => {
          const dayHours = openingHours[day.key];
          return (
            <div
              key={day.key}
              className={`flex items-center gap-4 p-3 rounded-lg border ${
                dayHours.closed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
              }`}
            >
              {/* Day label */}
              <div className='w-20 text-sm font-medium text-gray-700'>
                {day.label}
              </div>

              {/* Closed toggle */}
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={dayHours.closed}
                  onChange={() => toggleClosed(day.key)}
                  className='rounded border-gray-300 text-red-600 focus:ring-red-500'
                  disabled={disabled}
                />
                <span className='text-sm text-gray-600'>Closed</span>
              </label>

              {!dayHours.closed && (
                <>
                  {/* Opening time */}
                  <div className='flex items-center gap-2'>
                    <label className='text-sm text-gray-600'>Open:</label>
                    <select
                      value={dayHours.open}
                      onChange={(e) => updateTime(day.key, 'open', e.target.value)}
                      className='text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900'
                      disabled={disabled}
                    >
                      {TIME_OPTIONS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Closing time */}
                  <div className='flex items-center gap-2'>
                    <label className='text-sm text-gray-600'>Close:</label>
                    <select
                      value={dayHours.close}
                      onChange={(e) => updateTime(day.key, 'close', e.target.value)}
                      className='text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900'
                      disabled={disabled}
                    >
                      {TIME_OPTIONS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Copy hours button */}
                  <div className='flex-1 flex justify-end'>
                    <select
                      value='' // Always show placeholder
                      onChange={(e) => {
                        if (e.target.value) {
                          copyHours(e.target.value as keyof OpeningHours, day.key);
                          // The value='' prop will automatically reset the select
                        }
                      }}
                      className='text-xs border-gray-300 rounded text-gray-700 bg-white px-2 py-1'
                      disabled={disabled}
                    >
                      <option value=''>Copy from...</option>
                      {DAYS.filter(d => d.key !== day.key && !openingHours[d.key].closed)
                        .map((d) => (
                          <option key={d.key} value={d.key}>
                            {d.label} ({openingHours[d.key].open}-{openingHours[d.key].close})
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpeningHoursSection;
