import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError() ;
  console.error({ error });
  console.log(isRouteErrorResponse(error))

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-20 bg-green-300">
            <h2>{error.status} {error.statusText}</h2>
            <p className="pb-2">{error.data}</p>
            <span className="pb-20 text-center ">
              "Sorry, we can't find the page you are looking for"
            </span>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <section className="flex min-h-screen w-full flex-col items-center justify-center">
        <div>
          <h2 className="pb-2 underline decoration-red-500 decoration-wavy">
           Error
          </h2>
          <p className="pb-10">{error.message}</p>
        </div>
      </section>
    );
  }


  return (
    <div>
      <h2>something went wrong</h2>
      <p>an unexpected error occurred. please try again later.</p>
    </div>
  );
};
