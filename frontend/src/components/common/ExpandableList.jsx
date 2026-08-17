import { useState } from "react";

export default function ExpandableList({ title, items, initialCount = 3 }) {
  const [expanded, setExpanded] = useState(false);

  if (!items || items.length === 0) return null;

  const visibleItems = expanded ? items : items.slice(0, initialCount);

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-gray-100">{title}</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        {visibleItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {items.length > initialCount && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-emerald-400 text-sm mt-2 hover:underline"
        >
          {expanded ? "Show less" : `Show ${items.length - initialCount} more`}
        </button>
      )}
    </div>
  );
}