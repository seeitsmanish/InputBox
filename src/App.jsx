import './App.css'
import Input from './components/Input';

function App() {


  return (
    <div className={`h-screen w-screen bg-fuchsia-100 flex flex-col justify-center items-center gap-4`}>
      <Input
        type="email"
        placeholder="Enter your email"
        errorFunctions={{
          onBlur: (value) => {
            if (!value.includes('@')) {
              return 'Invalid email address';
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
        type="text"
        placeholder="Custom input"
        outlineColor="green"
        borderColor="gray"
        error={true}
        errorColor="red"
        errorFunctions={{
          onBlur: (value) => {
            if (!value.trim()) {
              return 'Input cannot be empty';
            }
            return false;
          },
        }}
      />
    </div>
  );
}

export default App;
