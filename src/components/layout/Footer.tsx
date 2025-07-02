import { Github } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <div className='flex flex-col gap-3 justify-center items-center bg-accent py-5'>
      <p className=''>
        <span className='font-light'>Develop By : </span>
        <span className='font-semibold text-sm'>Zakaria BN</span>
      </p>

      <div>
        <Link
          to='https://github.com/zakariabn'
          target='_blank'
          className='flex'>
          <Github className='hover:text-blue-900' />
        </Link>
      </div>
    </div>
  );
}
