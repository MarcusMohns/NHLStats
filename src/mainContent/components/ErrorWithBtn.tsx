import Alert from "./Alert";
import { useState } from "react";

type ErrorWithBtnProps = {
  action: () => Promise<void>;
  error: Error;
};

const ErrorWithBtn = ({ action, error }: ErrorWithBtnProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAction = async () => {
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
      <p>{error.message}</p>
      <button
        onClick={() => handleAction()}
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
