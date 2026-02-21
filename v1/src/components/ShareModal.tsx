'use client';

import { useState } from 'react';

interface ShareModalProps {
  shareCode: string;
  shareUrl: string;
  onClose: () => void;
}

export function ShareModal({ shareCode, shareUrl, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement('textarea');
      el.value = shareUrl;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 id="share-title" className="text-xl font-bold text-gray-dark">
              Session saved
            </h2>
            <p className="mt-1 text-sm text-gray-medium">
              Share this code or link — expires in 30 days.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              lineHeight: 1,
              cursor: 'pointer',
              color: '#6B778C',
              padding: '0 0 0 8px',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Share code — large, easy to read/speak */}
        <div
          style={{
            background: '#F4F5F7',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '11px', color: '#6B778C', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Share code
          </p>
          <p
            style={{
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#003087',
              fontFamily: 'ui-monospace, monospace',
              margin: 0,
            }}
          >
            {shareCode}
          </p>
        </div>

        {/* Share URL */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', color: '#6B778C', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Or share this link
          </p>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'stretch',
            }}
          >
            <input
              readOnly
              value={shareUrl}
              aria-label="Share link"
              style={{
                flex: 1,
                fontSize: '11px',
                color: '#091E42',
                background: '#F4F5F7',
                border: '1px solid #DFE1E6',
                borderRadius: '6px',
                padding: '8px 10px',
                fontFamily: 'ui-monospace, monospace',
                minWidth: 0,
                outline: 'none',
              }}
              onFocus={(e) => e.target.select()}
            />
            <button
              onClick={handleCopy}
              style={{
                backgroundColor: copied ? '#7DC242' : '#003087',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background-color 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {copied ? '✓ Copied' : 'Copy link'}
            </button>
          </div>
        </div>

        {/* How to use */}
        <p style={{ fontSize: '12px', color: '#6B778C', marginBottom: '20px' }}>
          The recipient opens the app and enters the code, or just opens the link directly.
        </p>

        <button
          onClick={onClose}
          className="w-full rounded-lg border-2 border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-dark transition-all duration-150 hover:border-gray-400 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Done
        </button>
      </div>
    </div>
  );
}
