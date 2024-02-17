## This React app allows users to set their availability for each week using sliders. The component consists of sliders for each week, a dropdown to select the week, and a table to display the available days for the selected week.

## Running the Application

To run the application, follow these steps:

1. Install dependencies by running:

    ```
    npm install
    ```

2. Start the development server by running:

    ```
    npm start
    ```

The application will start and should automatically open in your default web browser. If it doesn't, you can access it at [http://localhost:3000].

Make sure you have Node.js and npm installed on your system before running these commands.

## Props

- `weeks`: The number of weeks to display.

## Features

- **Sliders**: Each week is represented by a slider where users can select their availability.
- **Checkbox**: Users can enable/disable the slider for each week independently.
- **Dropdown**: Users can select a specific week to view its availability.
- **Table Display**: The selected week's available days are displayed in a table.

## Styling

The component utilizes a CSS file (`Availability.css`) for styling. You can customize the appearance by modifying this file to suit your application's design.

## Dependencies

- `@mui/material`: Material-UI library for the Slider component.

## Local Storage

The component stores availability data in the browser's local storage. This allows the availability data to persist across page refreshes.
