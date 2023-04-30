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
  const [password, setPassword] = useState('');

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

  async function newPassword(ev) {
    ev.preventDefault();
    alert(password);
  }

  return (
    <div className="text-center max-w-md mx-auto md:text-base lg:text-xl">
      <span>
        Logged in as {user.name} ({user.email})
      </span>

      <form onSubmit={newPassword}>
        <span>Change password</span>
        <div>
          <p>Password:</p>
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
          />
          <p>New password:</p>
          <input type="password" />
          <p>Retype new password:</p>
          <input type="password" />
        </div>
        <button>Test</button>
      </form>

      <button onClick={logout} className="primary mt-2 max-w-sm">
        Logout
      </button>
    </div>
  );
}
