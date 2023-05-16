import { UserContext } from '../../UserContext';
import { useContext, useState } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  return (
    <div className='responsive flex flex-col justify-center'>
      <div className='bg-gray-50 p-4 md:mx-auto rounded-xl ring-1 ring-gray-300 shadow-md shadow-gray-400'>
        <div className='flex justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>

        <div className='flex justify-center mt-2'>
          Logged in as {user.name} ({user.email})
        </div>

        <div className="flex justify-center mt-10 gap-5">
          <span>Change password</span>
          <Link to={'/account/profile/changepassword/'}>
            <div className="bg-blue-200 rounded-xl px-4 ring-1 ring-gray-500 hover:ring-black">Go to</div>
          </Link>
        </div>

        <div className='flex justify-center'>
          <button onClick={logout} className="bg-primary rounded-xl px-4 text-white w-64 mt-5">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
