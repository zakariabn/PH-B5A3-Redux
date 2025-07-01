import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <h2>AuthLayout</h2>

      <div className='mt-10'>
        <ul className='flex gap-5'>
          <li>
            <Link to='/auth/login'>Login</Link>
          </li>
          <li>
            <Link to='/auth/register'>Register</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
