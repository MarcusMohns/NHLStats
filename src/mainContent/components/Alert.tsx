type AlertProps = {
  messageHeader: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  children: React.ReactNode;
};

const Alert = ({
  messageHeader,
  bgColor,
  borderColor,
  textColor,
  children,
}: AlertProps) => {
  return (
    <div
      className={`${bgColor} border-l-4 ${borderColor} ${textColor} p-4 w-max m-auto`}
      role="alert"
    >
      <p className="font-bold">{messageHeader}</p>
      {children}
    </div>
  );
};

export default Alert;
