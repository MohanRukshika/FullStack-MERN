export default function LoadingAnimation() {
  return (
    <div className="flex h-[500px] items-center justify-center bg-[#F5F5F5]">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#05373D] [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#230603] [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#05373D]" />
      </div>
    </div>
  );
}