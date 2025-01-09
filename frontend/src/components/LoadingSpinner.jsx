export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-emerald-200 rounded-full" />
        <div className="w-20 h-20 absolute left-0 top-0 border-t-2 border-emerald-500 rounded-full animate-spin" />
        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};
