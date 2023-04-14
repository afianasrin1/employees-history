

import { Toaster } from 'react-hot-toast';
import Home from './Component/Home';
import { useState } from 'react';
import EditModal from './Component/EditModal';

function App() {
  const [singleEmployee, setsingleEmployee] = useState()
  return (
    <div className="px-10 pt-10  ">
      <Toaster />
      <Home setsingleEmployee={setsingleEmployee} />
      <EditModal setsingleEmployee={setsingleEmployee} singleEmployee={singleEmployee} />
    </div>
  );
}

export default App;
