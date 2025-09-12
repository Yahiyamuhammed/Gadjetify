import { Spinner } from "../ui/shadcn-io/spinner";
const LoadingSpinner = ({ size = 44, fullscreen = false }) => {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white/50 z-50">
        <Spinner size={size} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Spinner size={16} />
    </div>
  );
};

export default LoadingSpinner;
