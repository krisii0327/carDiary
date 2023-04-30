import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    //Nem fogja újratölteni az oldal az ev.preventDefault() miatt.
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      setRedirect(true);
    } catch (error) {
      alert('Registration was unsuccessful. Please try again.');
    }
  }

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="mt-4 flex items-center justify-center grow">
      <div className="mb-48 bg-gray-100 px-4 py-4 rounded-2xl border border-black">
        <h1 className="text-3xl text-center mb-4">Register</h1>

        <form className="max-w-md mx-auto w-80 lg:w-96" onSubmit={registerUser}>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="your@example.com"
            />
          </div>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="password"
            />
          </div>

          <button className="mt-4 primary">Register</button>

          <div className="text-gray-500 py-2 flex gap-1 justify-center">
            <span>Already a member?</span>
            <Link className="underline text-black" to="/login">
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
