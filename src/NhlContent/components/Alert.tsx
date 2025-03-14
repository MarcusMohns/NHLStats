const Alert = ({
  message,
  text,
  messageHeader,
  color,
  name,
}: {
  message: string;
  text: string;
  messageHeader: string;
  color: string;
  name?: string;
}) => {
  return (
    <div
      className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4`}
      role="alert"
    >
      <p className="font-bold">
        {messageHeader} ({name})
      </p>
      <p>{text}</p>---<p>{message}</p>
    </div>
  );
};

export default Alert;
