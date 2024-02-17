import React from 'react';
import Availability from './components/Availability'; // Importing the Availability component from its file

// Define the main App component as a functional component using TypeScript syntax
const App: React.FC = () => {
  return (
    <div>
      <h1>Availability for the Next 7 Weeks</h1>
      
      {/* Rendering the Availability component with a prop 'weeks' set to 7 */}
      <Availability weeks={7} />
    </div>
  );
};

export default App; // Exporting the App component as the default export
