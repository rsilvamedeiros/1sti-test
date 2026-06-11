type FeedbackProps = {
  actionLabel?: string;
  children: string;
  onAction?: () => void;
  tone?: 'neutral' | 'error';
};

const toneClasses = {
  neutral: 'border-slate-200 bg-white text-slate-700',
  error: 'border-red-200 bg-red-50 text-red-800'
};

export function Feedback({ actionLabel, children, onAction, tone = 'neutral' }: FeedbackProps) {
  return (
    <div className={`rounded-xl border p-4 ${toneClasses[tone]}`} role={tone === 'error' ? 'alert' : 'status'}>
      <p>{children}</p>
      {actionLabel && onAction && (
        <button
          className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
