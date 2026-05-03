import { useApp } from '../App.jsx';

export default function Saved() {
  const { saved, setSaved } = useApp();
  return (
    <section className="space-y-3">
      <h1 className="text-xl font-bold">Saved Reports</h1>
      {saved.map((r) => (
        <div key={r.id} className="flex items-center justify-between gap-3 rounded border p-3 dark:border-gray-700">
          <span><b>{r.type}</b> {r.value} - {r.status}</span>
          <button onClick={() => setSaved(saved.filter((x) => x.id !== r.id))} className="rounded bg-red-600 px-3 py-1 text-white">Remove</button>
        </div>
      ))}
      {!saved.length && <p>No saved reports</p>}
    </section>
  );
}
