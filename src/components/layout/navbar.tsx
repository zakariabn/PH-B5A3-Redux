import { useState } from "react";
import { Link } from "react-router";
import { LogIn, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const isUserLoggedIn = true;

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer
  const [submenuOpen, setSubmenuOpen] = useState(false); // mobile sub‑menu

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

  return (
    <nav className='bg-gray-100 shadow-sm'>
      {/* ============== TOP BAR ============== */}
      <div className='container mx-auto flex items-center px-4 py-3 md:justify-between'>
        {/* --- Left (hamburger) --- */}
        <button
          className='mr-2 md:hidden'
          onClick={toggleDrawer}
          aria-label='Toggle menu'>
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* --- Desktop nav & links (hidden on mobile) --- */}
        <ul className='hidden items-center gap-6 font-semibold md:flex'>
          <li>
            <Link className='hover:underline' to='/all-book'>
              All Books
            </Link>
          </li>
          <li>
            <Link className='hover:underline' to='/book/create'>
              Add Book
            </Link>
          </li>

          {/* ===== PARENT LINK + CHEVRON ===== */}
          <li className='relative group flex'>
            {/* Parent link */}
            <Link
              to='/borrow-summary'
              className='flex items-center gap-1 hover:underline'>
              Borrow Summary
            </Link>

            {/* Chevron (clickable) */}
            <button
              onClick={toggleSubmenu}
              className='ml-1'
              aria-label='Toggle submenu'>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  submenuOpen && "rotate-180"
                )}
              />
            </button>

            {/* --- Sub‑menu (desktop) --- */}
            <ul
              className={cn(
                "absolute left-0 top-full z-20 mt-2 w-40 overflow-hidden rounded border bg-white shadow transition-all duration-300 ease-in-out",
                /* Show on hover OR when chevron clicked */
                // submenuOpen || "group-hover:max-h-40 group-hover:opacity-100",
                submenuOpen
                  ? "max-h-40 opacity-100"
                  : "pointer-events-none max-h-0 opacity-0"
              )}>
              <li>
                <Link
                  className='block px-4 py-2 hover:bg-gray-100'
                  to='/borrow-summary/current'>
                  Current
                </Link>
              </li>
              <li>
                <Link
                  className='block px-4 py-2 hover:bg-gray-100'
                  to='/borrow-summary/history'>
                  History
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* --- Logo (always in centre on mobile) --- */}
        <div className='flex flex-1 justify-center md:flex-none md:order-first'>
          <Link to='/'>
            <img src='/logo-transparent.png' alt='Logo' className='w-10' />
          </Link>
        </div>

        {/* --- Auth icon --- */}
        <div className='hidden md:block'>
          {isUserLoggedIn ? (
            <Link to='/account'>
              <User size={24} />
            </Link>
          ) : (
            <Link to='/auth'>
              <LogIn size={24} />
            </Link>
          )}
        </div>
      </div>

      {/* ============== MOBILE DRAWER ============== */}
      <div
        className={cn(
          "md:hidden overflow-hidden bg-white px-4 transition-all duration-300 ease-in-out",
          drawerOpen
            ? "max-h-[400px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        )}>
        <ul className='space-y-3 py-4 font-medium'>
          <li>
            <Link
              to='/all-book'
              onClick={() => setDrawerOpen(false)}
              className='block'>
              All Books
            </Link>
          </li>
          <li>
            <Link
              to='/book/create'
              onClick={() => setDrawerOpen(false)}
              className='block'>
              Add Book
            </Link>
          </li>

          {/* Parent link row */}
          <li>
            <div className='flex items-center justify-between'>
              <Link
                to='/borrow-summary'
                onClick={() => setDrawerOpen(false)}
                className='block'>
                Borrow Summary
              </Link>
              <button onClick={toggleSubmenu} aria-label='Toggle submenu'>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    submenuOpen && "rotate-180"
                  )}
                />
              </button>
            </div>

            {/* Child links (mobile) */}
            <ul
              className={cn(
                "ml-4 overflow-hidden transition-all duration-300 ease-in-out",
                submenuOpen
                  ? "max-h-32 space-y-2 pt-2 opacity-100"
                  : "max-h-0 opacity-0"
              )}>
              <li>
                <Link
                  to='/borrow-summary/current'
                  onClick={() => setDrawerOpen(false)}
                  className='block'>
                  Current
                </Link>
              </li>
              <li>
                <Link
                  to='/borrow-summary/history'
                  onClick={() => setDrawerOpen(false)}
                  className='block'>
                  History
                </Link>
              </li>
            </ul>
          </li>

          <li>
            {isUserLoggedIn ? (
              <Link
                to='/account'
                onClick={() => setDrawerOpen(false)}
                className='flex items-center gap-1'>
                <User size={20} /> Account
              </Link>
            ) : (
              <Link
                to='/auth'
                onClick={() => setDrawerOpen(false)}
                className='flex items-center gap-1'>
                <LogIn size={20} /> Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
