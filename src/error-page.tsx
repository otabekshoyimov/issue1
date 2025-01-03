import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  console.error({ error });

  if (error instanceof Error) {
    return (
      <section className="flex min-h-screen w-full flex-col items-center justify-center">
        <div>
          <h2 className="pb-20 underline decoration-red-500 decoration-wavy">
            Application error
          </h2>
          <Link to={"/"}>Return home →</Link>
        </div>
      </section>
    );
  }

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-20">
        {error.status === 404 ? (
          <>
            <h2>{error.status}</h2>
            <p>{error.statusText}</p>
            <span className="pb-20 text-center underline decoration-red-500 decoration-wavy">
              "Sorry, we can't find the page you are looking for"
            </span>

            <Link to="/">
              <span>Return to homepage →</span>
            </Link>
          </>
        ) : (
          <>
            <h2>Error: {error.status}</h2>
            <p>{error.statusText}</p>
            <p>{error.data}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>something went wrong</h2>
      <p>an unexpected error occurred. please try again later.</p>
    </div>
  );
};
