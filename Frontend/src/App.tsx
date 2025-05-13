import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FormEducationalInstitution from './features/registrations/components/form-educational-institution';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center w-full h-full">
<FormEducationalInstitution />
      </div>
    </>
  );
}

export default App;
