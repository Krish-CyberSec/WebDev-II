import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../App.jsx';

const tips = [
  'Use a password manager and unique passwords',
  'Turn on multi factor authentication',
  'Check links before opening them',
  'Update apps and operating systems often',
  'Avoid public Wi-Fi for sensitive logins',
  'Back up important files regularly',
  'Do not share OTPs or recovery codes',
  'Review app permissions monthly',
];

export default function Dashboard() {
  const { setSaved } = useApp();
  const [email, setEmail] = useState('');
  const [ip, setIp] = useState('');
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [tipQ, setTipQ] = useState('');
  const [debounced, setDebounced] = useState('');
  const [page, setPage] = useState(1);
  const size = 3;

  useEffect(() => {
    const id = setTimeout(() => setDebounced(tipQ), 400);
    return () => clearTimeout(id);
  }, [tipQ]);

  const save = (item) => setSaved((s) => [{ id: Date.now(), ...item }, ...s]);
  const add = (type, value, status, detail) => {
    const item = { type, value, status, detail };
    setResults((r) => [item, ...r]);
    save(item);
  };
  const checkEmail = () => email && fetch(`https://api.xposedornot.com/v1/breach-analytics?email=${encodeURIComponent(email)}`).then((r) => r.json()).then((d) => add('Email', email, d.Error ? 'Not found' : 'Breached', d.BreachesSummary?.site || 'Breach data found')).catch(() => add('Email', email, 'API error', 'XposedOrNot request failed'));
  const checkIp = () => ip && fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`).then((r) => r.json()).then((d) => add('IP', ip, d.error ? 'Not found' : d.org || 'Located', `${d.city || 'Unknown'}, ${d.region || ''} ${d.country_name || ''}`)).catch(() => add('IP', ip, 'API error', 'ipapi request failed'));
  const checkUrl = () => {
    try {
      url && fetch(`/api/urlscan/search/?q=domain:${encodeURIComponent(new URL(url).hostname)}&size=1`).then((r) => r.json()).then((d) => add('URL', url, d.results?.length ? 'Public scan found' : 'No public scan', d.results?.[0]?.task?.time || 'urlscan.io search completed')).catch(() => add('URL', url, 'API error', 'urlscan.io request failed'));
    } catch {
      add('URL', url, 'Invalid', 'Enter a full URL with https');
    }
  };
  const filtered = useMemo(() => tips.filter((t) => t.toLowerCase().includes(debounced.toLowerCase())), [debounced]);
  const pageTips = filtered.slice((page - 1) * size, page * size);

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Cybersecurity Awareness Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Check breaches, IPs, URLs, and learn safer habits.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded border p-3 dark:border-gray-700">
          <h2 className="font-semibold">Email Breach</h2>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" className="my-2 w-full rounded border p-2 text-gray-900" />
          <button onClick={checkEmail} className="rounded bg-blue-600 px-3 py-1 text-white">Check</button>
        </div>
        <div className="rounded border p-3 dark:border-gray-700">
          <h2 className="font-semibold">IP Reputation</h2>
          <input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="8.8.8.8" className="my-2 w-full rounded border p-2 text-gray-900" />
          <button onClick={checkIp} className="rounded bg-blue-600 px-3 py-1 text-white">Analyze</button>
        </div>
        <div className="rounded border p-3 dark:border-gray-700">
          <h2 className="font-semibold">URL Threat Scan</h2>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="my-2 w-full rounded border p-2 text-gray-900" />
          <button onClick={checkUrl} className="rounded bg-blue-600 px-3 py-1 text-white">Scan</button>
        </div>
      </div>
      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={i} className="rounded border p-3 dark:border-gray-700">
            <b>{r.type}</b> {r.value}<p>{r.status}: {r.detail}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold">Security Best Practices</h2>
      <input value={tipQ} onChange={(e) => { setTipQ(e.target.value); setPage(1); }} placeholder="Search tips" className="w-full rounded border p-2 text-gray-900" />
      {pageTips.map((t) => <p key={t} className="rounded border p-3 dark:border-gray-700">{t}</p>)}
      <div className="flex items-center gap-3">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded border px-3 py-1 disabled:opacity-40">Prev</button>
        <span>{page}</span>
        <button disabled={page * size >= filtered.length} onClick={() => setPage(page + 1)} className="rounded border px-3 py-1 disabled:opacity-40">Next</button>
      </div>
    </section>
  );
}
