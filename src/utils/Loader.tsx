const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={`center h-[500px] w-full flex-col gap-[20px] ${
        className || ""
      }`}
    >
      <span className="text-[19px] font-[500]">Loading...</span>
      <div className="w-8 h-8 border-4 border-primary rounded-full animate-spin border-t-transparent" />
    </div>
  );
};

export default Loader;
