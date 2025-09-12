import { Spinner } from "../ui/shadcn-io/spinner";

const LoadingSpinner = ({ size = 44 }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner size={size} />
    </div>
  );
};

export default LoadingSpinner;