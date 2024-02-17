import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import './Availability.css';

interface AvailabilityProps { weeks: number; }

const Availability: React.FC<AvailabilityProps> = ({ weeks }) => {
  // State variables
  const [availability, setAvailability] = useState<number[][]>(new Array(weeks).fill([0, 0]));
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [sliderEnabled, setSliderEnabled] = useState<boolean[]>(new Array(weeks).fill(true)); // Array to track whether each slider is enabled

  // Array to hold names of days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Function to handle changes in the slider
  const handleSliderChange = (weekIndex: number, newValue: number | number[]) => {
    const updatedAvailability = [...availability];
    updatedAvailability[weekIndex] = Array.isArray(newValue) ? newValue : [newValue, newValue];
    setAvailability(updatedAvailability);
    localStorage.setItem('availability', JSON.stringify(updatedAvailability));
  };

  // Function to handle changes in the selected week
  const handleWeekSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(parseInt(event.target.value));
  };

  // Function to handle changes in the checkbox for enabling/disabling slider
  const handleCheckboxChange = (weekIndex: number) => {
    const updatedSliderEnabled = [...sliderEnabled];
    updatedSliderEnabled[weekIndex] = !updatedSliderEnabled[weekIndex]; // Toggle the enabled state
    setSliderEnabled(updatedSliderEnabled);
    if (!updatedSliderEnabled[weekIndex]) {
      handleSliderChange(weekIndex, [0, 0]); // If disabled, set slider value to 0
    }
  };

  // Function to get available days for the selected week
  const getAvailableDays = () => {
    if (!sliderEnabled[selectedWeek - 1]) return ''; // If slider is disabled, return empty string
    const [start, end] = availability[selectedWeek - 1];
    return daysOfWeek.slice(start, end + 1).join(', ');
  };

  return (
    <div className="availability-container">
      {/* Mapping over each week */}
      {availability.map((value, weekIndex) => (
        <div key={weekIndex} className="week-container">
          <div className="week-info">
            Week {weekIndex + 1}
            {/* Checkbox to enable/disable slider */}
            <input
              type="checkbox"
              className="checkbox"
              checked={sliderEnabled[weekIndex]}
              onChange={() => handleCheckboxChange(weekIndex)}
            />
          </div>
          <div className="slider-container">
            {/* Slider component to select availability */}
            <Slider
              min={0} max={6} step={1}
              marks={daysOfWeek.map((day, index) => ({ value: index, label: day }))}
              value={value}
              onChange={(event, newValue) => handleSliderChange(weekIndex, newValue as number[])}
              valueLabelFormat={(value) => value.toString()}
              getAriaLabel={(index) => index === 0 ? 'start' : 'end'}
              getAriaValueText={(value) => value.toString()}
              disabled={!sliderEnabled[weekIndex]} // Disable slider if checkbox is unchecked
            />
          </div>
        </div>
      ))}
      <div>
        <label className="week-select-label">Select Week: </label>
        {/* Dropdown to select the week */}
        <select value={selectedWeek} onChange={handleWeekSelectChange} className="week-select">
          {Array.from({ length: weeks }, (_, i) => i + 1).map((week) => (
            <option key={week} value={week}>Week {week}</option>
          ))}
        </select>
        {/* Table to display available days for the selected week */}
        <div className="table-container">
          <table><tbody><tr><td>Available Days:</td><td>{getAvailableDays()}</td></tr></tbody></table>
        </div>
      </div>
    </div>
  );
};

export default Availability;