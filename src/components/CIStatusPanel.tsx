import { useState, useEffect, useRef } from 'react';

const REPO = 'OlegBayrak/qa_consult';
const GH_API = `https://api.github.com/repos/${REPO}`;
const GH_RUNS = `${GH_API}/actions/runs?per_page=50`;

type RunStatus = 'success' | 'failure' | 'in_progress' | 'queued' | 'skipped' | 'unknown';

interface CheckRow {
  name: string;
  icon: string;
  status: RunStatus;
  conclusion: string | null;
  runUrl: string | null;
  updatedAt: string | null;
}

const WORKFLOWS: Record<string, { label: string; icon: string; mainOnly?: boolean }> = {
  CI: { label: 'Lint → Build → E2E', icon: '⚙️', mainOnly: true },
  'Security Audit': { label: 'Security Audit', icon: '🔒', mainOnly: true },
  CodeQL: { label: 'CodeQL Analysis', icon: '🛡️', mainOnly: true },
  'Lighthouse CI': { label: 'Lighthouse Scores', icon: '🔦' },
  'Deploy Preview': { label: 'Deploy Preview', icon: '🚀' },
  'Dependency Review': { label: 'Dependency Review', icon: '📦' },
};

function overallStatus(rows: CheckRow[]): RunStatus {
  if (rows.some((r) => r.status === 'in_progress' || r.status === 'queued')) return 'in_progress';
  if (rows.some((r) => r.status === 'failure')) return 'failure';
  if (rows.every((r) => r.status === 'success')) return 'success';
  return 'unknown';
}

function statusColor(s: RunStatus) {
  return {
    success: 'bg-emerald-500',
    failure: 'bg-red-500',
    in_progress: 'bg-amber-400',
    queued: 'bg-amber-400',
    skipped: 'bg-slate-400',
    unknown: 'bg-slate-500',
  }[s];
}

function statusLabel(s: RunStatus, conclusion: string | null) {
  if (s === 'in_progress') return 'Running…';
  if (s === 'queued') return 'Queued';
  if (conclusion === 'success') return 'Passing';
  if (conclusion === 'failure') return 'Failed';
  if (conclusion === 'skipped') return 'Skipped';
  if (conclusion === 'cancelled') return 'Cancelled';
  return 'Unknown';
}

function relativeTime(iso: string | null) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function CIStatusPanel() {
  const [open, setOpen] = useState(false);
  const [checks, setChecks] = useState<CheckRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  async function fetchStatus() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(GH_RUNS, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) throw new Error('GitHub API error');
      const data = await res.json();

      // For each known workflow, find the most recent run on main/master
      const rows: CheckRow[] = Object.entries(WORKFLOWS).map(([wfName, { label, icon, mainOnly }]) => {
        const run = data.workflow_runs?.find((r: any) => {
          if (r.name !== wfName) return false;
          if (mainOnly) return r.head_branch === 'main' || r.head_branch === 'master';
          return true;
        });
        return {
          name: label,
          icon,
          status: run
            ? run.status === 'completed'
              ? (run.conclusion ?? 'unknown')
              : run.status
            : 'unknown',
          conclusion: run?.conclusion ?? null,
          runUrl: run?.html_url ?? `https://github.com/${REPO}/actions`,
          updatedAt: run?.updated_at ?? null,
        } as CheckRow;
      });

      setChecks(rows);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatus();
    const id = setInterval(fetchStatus, 60_000);
    return () => clearInterval(id);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const overall = loading ? 'unknown' : error ? 'failure' : overallStatus(checks);
  const isPulsing = overall === 'in_progress';

  return (
    <div ref={panelRef} className="fixed bottom-6 left-6 z-50 font-sans">
      {/* Floating pill button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="CI / Automation status"
        className={[
          'group flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium',
          'shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl select-none',
          'bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/10',
        ].join(' ')}
      >
        {/* Dot indicator */}
        <span className="relative flex h-2.5 w-2.5">
          {isPulsing && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusColor(overall)}`}
            />
          )}
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusColor(overall)}`}
          />
        </span>
        <span className="font-mono text-xs tracking-wide">
          {loading
            ? 'CI Status'
            : overall === 'success'
              ? 'All Passing'
              : overall === 'failure'
                ? 'Check Failed'
                : overall === 'in_progress'
                  ? 'Running…'
                  : 'CI Status'}
        </span>
        <svg
          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Popup panel */}
      {open && (
        <div
          className={[
            'absolute bottom-12 left-0 w-80',
            'rounded-2xl border border-slate-200 dark:border-white/10',
            'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl',
            'shadow-2xl shadow-black/20',
            'transition-all duration-200',
          ].join(' ')}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-blue-500 mb-0.5">automation status</p>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                CI / Quality Gates
              </h3>
            </div>
            <a
              href={`https://github.com/${REPO}/actions`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-blue-500 transition-colors font-mono"
              title="Open GitHub Actions"
            >
              GitHub ↗
            </a>
          </div>

          {/* Checks list */}
          <div className="px-3 py-2">
            {loading ? (
              <div className="py-6 flex flex-col items-center gap-2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-slate-400 font-mono">Fetching status…</p>
              </div>
            ) : error ? (
              <div className="py-4 text-center">
                <p className="text-xs text-red-400 font-mono mb-2">Failed to reach GitHub API</p>
                <button
                  onClick={fetchStatus}
                  className="text-xs text-blue-500 hover:underline font-mono"
                >
                  Retry ↻
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-white/5">
                {checks.map((c) => (
                  <li key={c.name} className="flex items-center gap-3 py-2.5 px-1">
                    <span className="text-base leading-none">{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                        {c.name}
                      </p>
                      <p className="text-xs text-slate-400 font-mono">
                        {relativeTime(c.updatedAt)}
                      </p>
                    </div>
                    <a
                      href={c.runUrl ?? `https://github.com/${REPO}/actions`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View run"
                      className={[
                        'flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold font-mono',
                        'transition-opacity hover:opacity-80',
                        c.status === 'success'
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                          : c.status === 'failure'
                            ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                            : c.status === 'in_progress'
                              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
                      ].join(' ')}
                    >
                      {c.status === 'in_progress' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      )}
                      {statusLabel(c.status, c.conclusion)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer links */}
          <div className="px-4 py-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
            <a
              href={`https://github.com/${REPO}/actions/workflows/ci.yml`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-blue-500 transition-colors font-mono"
            >
              📋 Playwright report
            </a>
            <button
              onClick={fetchStatus}
              className="text-xs text-slate-400 hover:text-blue-500 transition-colors font-mono flex items-center gap-1"
            >
              ↻ Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
