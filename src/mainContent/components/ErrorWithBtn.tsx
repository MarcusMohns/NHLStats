import Alert from "./Alert";
import { ErrorType } from "../sections/standings/Standings";
import { useState } from "react";

const ErrorWithBtn = ({
  action,
  error,
}: {
  action: () => Promise<void>;
  error: ErrorType;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleAction = async (action: () => Promise<void>) => {
    setLoading(true);
    await action();
    setLoading(false);
  };

  return (
    <Alert
      messageHeader={`${"Error"} (${error.name})`}
      bgColor="bg-red-100"
      borderColor="border-red-500"
      textColor="text-red-700"
    >
      <p>{error.text}</p>---<p>{error.message}</p>
      <button
        onClick={() => handleAction(action)}
        className={`border font-bold m-2 border-red-700 p-1 px-2 rounded hover:bg-red-500 hover:text-white cursor-pointer
            ${loading && "opacity-50 cursor-not-allowed bg-stone-500"}
            `}
      >
        Retry
      </button>
    </Alert>
  );
};

export default ErrorWithBtn;
