import { UserContext } from '../../UserContext';
import { useContext, useState } from 'react';
import AccountNav from './AccountNav';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  async function newPassword(ev) {
    ev.preventDefault();
    if (!password) {
      alert('Missing the right one password!');
    } else {
      if (!password1 || !password2) {
        alert('Missing paramaters!');
      } else {
        if (password1 == password2) {
          await axios.post('/changeprofile', { currentpassword: password, newpassword: password1, }).then(({ data }) => {
            if (data == true) {
              setRedirect('/');
              setUser(null);
              axios.post('/logout');
            }
          });
        } else { alert('Not correct!'); }
      }
    }
  }

  return (
    <div>
      <AccountNav />
      <div className='flex flex-col justify-center w-full md:w-11/12 lg:w-9/12 xl:w-7/12 m-auto md:text-xl'>
        <div className='bg-gray-100 m-2 p-4 md:mx-auto rounded-xl ring-2 ring-gray-200'>

          <form onSubmit={newPassword} className='flex flex-col justify-center text-center'>
            <div>
              <p>Current Password:</p>
              <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
              <p>New password:</p>
              <input type="password" value={password1} onChange={(ev) => setPassword1(ev.target.value)} />
              <p>Retype new password:</p>
              <input type="password" value={password2} onChange={(ev) => setPassword2(ev.target.value)} />
            </div>
            <div>
              <button className='bg-primary text-white rounded-xl px-4 w-32 mt-2'>Save</button>
            </div>
          </form>

        </div>
      </div>
    </div>

  );
}
