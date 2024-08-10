import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  console.error({ error });
  console.log(error.status);

  if (error.status === 404) {
    return (
      <div className="flex justify-center items-center flex-col w-full min-h-screen">
        <h1 className=" pb-5 text-center">
          Sorry, we can't find the page you are looking for
        </h1>
        <Link to="/" className="text-orange-600 hover:bg-[#e1e1e1] p-1 rounded">
          Return to homepage
        </Link>
      </div>
    );
  }
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div>Oops</div>;
  }
};
