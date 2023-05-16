import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); // Átirányítást végző useState
  const { setUser } = useContext(UserContext);

  async function loginUser(ev) {
    //Nem fogja újratölteni az oldal az ev.preventDefault() miatt.
    ev.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      setUser(response.data);
      setRedirect(true);
    } catch (error) {
      alert('Login failed!');
    }
  }

  //Ha login sikeres akkor belépést követően az IndexPage-re írányit
  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='responsive flex justify-center mt-20'>
      <div className="rounded-xl p-6 bg-gray-50 ring-1 ring-gray-400 shadow-md shadow-gray-400">
        <h1 className='flex justify-center my-1 font-semibold text-lg font-sans'>Sign up to your account</h1>

        <form onSubmit={loginUser}>
          <div className="flex gap-2 items-center mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
            <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="your@example.com" />
          </div>
          <div className="flex gap-2 items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="********" />
          </div>

          <div className='flex flex-row justify-center items-center mt-2'>
            <div className='w-1/3'>
              <button className="primary hover:ring-2 hover:ring-gray-300">Login</button>
            </div>
          </div>

          <div className="text-gray-500 flex gap-1 justify-center mt-2">
            <span>Don't have an account yet?</span>
            <Link className="underline text-black" to="/register">Register now</Link>
          </div>
        </form>

      </div>
    </div>

  );
}
