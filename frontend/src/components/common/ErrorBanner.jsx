export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="bg-red-950 border border-red-800 rounded-lg p-4 flex items-center justify-between mt-4">
      <p className="text-red-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded ml-4"
        >
          Retry
        </button>
      )}
    </div>
  );
}