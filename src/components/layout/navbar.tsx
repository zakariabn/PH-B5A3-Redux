import { Link } from "react-router";
import { LogIn, User } from "lucide-react";

const isUserLoggedIn: boolean = true;

export default function Navbar() {
  return (
    <nav className='bg-gray-100'>
      <div className='container mx-auto flex justify-between items-center py-2'>
        <div>
          <Link to='/'>
            <img
              src='/logo-transparent.png'
              alt='logo'
              style={{ width: "50px" }}
            />
          </Link>
        </div>
        <div>
          <ul className='flex gap-5 font-semibold'>
            <li className='hover:underline'>
              <Link to='/'>Home</Link>
            </li>
            <li className='hover:underline'>
              <Link to='/books'>Books</Link>
            </li>
            <li className='hover:underline'>
              <Link to='/borrow'>Borrow</Link>
            </li>
          </ul>
        </div>
        <div>
          {isUserLoggedIn ? (
            <Link to='/auth'>
              <LogIn size={24} className='hover:cursor-pointer' />
            </Link>
          ) : (
            <Link to='/account'>
              <User size={24} className='hover:cursor-pointer' />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
