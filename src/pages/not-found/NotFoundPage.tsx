import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className='h-[85vh] flex flex-col gap-3 justify-center items-center text-3xl'>
      <h2>404</h2>
      <h2>Page Not found</h2>

      <Button>
        <Link to='/'>Go back home</Link>
      </Button>
    </div>
  );
}
