const Alert = ({
  message,
  text,
  messageHeader,
  bgColor,
  borderColor,
  textColor,
  name,
}: {
  message: string;
  text: string;
  messageHeader: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  name?: string;
}) => {
  return (
    <div
      className={`${bgColor} border-l-4 ${borderColor} ${textColor} p-4`}
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
