"use client";
import Papa from "papaparse";
import { useState } from "react";

type Row = {
  rating?: string;
  title?: string;
  body?: string;
  reviewer_name?: string;
  product_title?: string;
  created_at?: string;
};

export default function UploadPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [preview, setPreview] = useState<Row[]>([]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    Papa.parse<Row>(f, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const mapped = (res.data as Row[]).map((r) => ({
          rating: r.rating || "",
          title: r.title || "",
          body: r.body || "",
          reviewer_name: r.reviewer_name || "",
          product_title: r.product_title || "",
          created_at: r.created_at || "",
        }));
        setRows(mapped);
        setPreview(mapped.slice(0, 5));
      },
    });
  }

  async function ingest() {
    const r = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows }),
    });
    const j = await r.json();
    if (!r.ok) {
      alert("Erreur: " + (j.error || ""));
      return;
    }
    alert(`Ingesté: ${j.count} avis`);
  }

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Upload CSV Judge.me → DB</h1>

      <div className="flex gap-3 items-center">
        <input type="file" accept=".csv" onChange={onFile} />
        <button
          onClick={ingest}
          disabled={!rows.length}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Importer {rows.length ? `(${rows.length})` : ""}
        </button>
      </div>

      {!!preview.length && (
        <div className="space-y-2">
          <div className="text-sm opacity-70">Aperçu (5 premières lignes)</div>
          {preview.map((r, i) => (
            <div key={i} className="border rounded p-3">
              <div className="text-xs opacity-70">
                {r.product_title || "—"} • {r.rating || "—"}★ •{" "}
                {r.reviewer_name || "—"} • {r.created_at || "—"}
              </div>
              {r.title ? <div className="font-medium">{r.title}</div> : null}
              <p className="text-sm whitespace-pre-wrap">{r.body}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
