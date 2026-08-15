const ScoreBar = ({ label, value, max = 25 }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-300">{label}</span>
      <span className="text-gray-400">{value}/{max}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

export default function ATSScoreCard({ analysis }) {
  const { atsScore, scoreBreakdown, summary } = analysis;

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-2">ATS Score: {atsScore}/100</h2>
      <p className="text-gray-400 mb-6">{summary}</p>

      <h3 className="font-semibold mb-3">Score Breakdown</h3>
      <ScoreBar label="Formatting" value={scoreBreakdown.formatting} />
      <ScoreBar label="Keywords" value={scoreBreakdown.keywords} />
      <ScoreBar label="Section Completeness" value={scoreBreakdown.sectionCompleteness} />
      <ScoreBar label="Readability" value={scoreBreakdown.readability} />
    </div>
  );
}