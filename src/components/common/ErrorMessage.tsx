export default function ErrorMessage({ err }) {
  return (
    <div className='w-full h-full flex flex-col gap-2 justify-center items-center p-5 text-center'>
      {/* Loading<span className='animate-pulse'>...</span> */}
      <p>Something went wrong</p>
      <p>{err || ""}</p>
    </div>
  );
}
