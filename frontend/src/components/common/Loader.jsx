export default function Loader({ message = "Analyzing your resume..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-10 h-10 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-gray-400 mt-4">{message}</p>
    </div>
  );
}