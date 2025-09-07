"use client";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface BlogTOCProps {
  headings: Heading[];
}

export default function BlogTOC({ headings }: BlogTOCProps) {
  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
        Sommaire
      </h2>
      <nav aria-label="Sommaire">
        <ul className="space-y-2">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
              <a
                href={`#${h.id}`}
                className="text-slate-700 hover:text-blue-600 text-sm transition-colors block py-1"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(h.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}