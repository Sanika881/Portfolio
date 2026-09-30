import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, Send } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactWindow: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [noteSent, setNoteSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderNote, setSenderNote] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderNote.trim()) return;
    setNoteSent(true);
    setTimeout(() => {
      setNoteSent(false);
      setSenderName('');
      setSenderNote('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Intro statement */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">
          Let's build something interesting.
        </h2>
        <p className="text-xs text-neutral-500">
          Always open to developer roles, internship opportunities, and creative collaborations.
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="space-y-2.5">
        {/* Email card */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/70 border border-black/5 hover:border-black/10 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-neutral-400 font-mono block">Email</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-xs font-medium text-neutral-800 hover:text-neutral-950 underline decoration-neutral-300 underline-offset-2"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-700 transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-white/70 border border-black/5 hover:border-black/10 transition-colors group cursor-pointer"
          >
            <span className="text-xs font-medium text-neutral-800">LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-white/70 border border-black/5 hover:border-black/10 transition-colors group cursor-pointer"
          >
            <span className="text-xs font-medium text-neutral-800">GitHub Repositories</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
          </a>
        </div>
      </div>

      {/* Quick message note */}
      <div className="pt-2 border-t border-black/5">
        <form onSubmit={handleSendNote} className="space-y-2.5">
          <span className="text-xs font-semibold text-neutral-700 block">
            Send a quick note:
          </span>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Your name or email"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl bg-white/80 border border-neutral-200/80 focus:outline-none focus:ring-1 focus:ring-neutral-500 text-neutral-800 placeholder-neutral-400"
            />
            <textarea
              rows={2}
              placeholder="Hi Sanika, I loved your portfolio..."
              value={senderNote}
              onChange={(e) => setSenderNote(e.target.value)}
              required
              className="w-full text-xs px-3 py-2 rounded-xl bg-white/80 border border-neutral-200/80 focus:outline-none focus:ring-1 focus:ring-neutral-500 text-neutral-800 placeholder-neutral-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
          >
            {noteSent ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Message noted!</span>
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span>Send Note</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
