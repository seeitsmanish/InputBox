import { useRef, useState } from 'react';
import './App.css'
import Input from './components/Input';

function App() {

  return (
    <div className={`h-screen w-screen bg-fuchsia-100 flex flex-col justify-center items-center gap-4`}>

      <Input
        type="email"
        icon
        placeholder="Enter your email"
        errorFunctions={{
          'onChange': (value) => {
            if (!value.includes('@')) {
              return 'Invalid email address';
            }
            return false;
          },
        }}
      />

      <Input
        icon
        type="tel"
        placeholder="Enter your Number"
        errorFunctions={{
          onBlur: (value) => {
            if (value.length !== 10) {
              return '10 digits are required';
            }
            return false;
          },
        }}
      />

      <Input
        type="password"
        placeholder="Enter your password"
        icon={true}
        outlineColor="blue"
        borderColor="gray"
        errorFunctions={{
          onBlur: (value) => {
            if (value.length < 6) {
              return 'Password must be at least 6 characters long';
            }
            return false;
          },
        }}
      />

      <Input
        outlineColor="black"
        borderColor="green"
        className='w-[230px]'
      />
    </div>
  );
}

export default App;
