"use client";

import { useState } from "react";
import Link from "next/link";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
}

type Bucket = "Urgent" | "Reply" | "Read Later" | "Trash";

interface SortedEmail extends Email {
  bucket: Bucket;
}

const SAMPLE_EMAILS: Email[] = [
  {
    id: 1,
    from: "Sarah K. (VP Sales)",
    subject: "RE: Q3 contract — need signature by EOD",
    preview:
      "Hey, legal just approved the final redline. Can you sign and send back before 5pm? The client is waiting.",
  },
  {
    id: 2,
    from: "GitHub Notifications",
    subject: "[acme/api] PR #412 merged",
    preview:
      "Your pull request 'fix: rate limiter edge case' has been merged into main by @devops-bot.",
  },
  {
    id: 3,
    from: "Tom from Figma",
    subject: "Quick question about the new dashboard layout",
    preview:
      "Hey! Love the direction. Two things — can we swap the chart placement and add a filter dropdown? Let me know.",
  },
  {
    id: 4,
    from: "Promo Team",
    subject: "🎉 Flash sale: 80% off everything this weekend",
    preview:
      "Don't miss out on our biggest sale of the year. Use code FLASH80 at checkout. Offer ends Sunday.",
  },
  {
    id: 5,
    from: "Jamie (Engineering)",
    subject: "Prod incident — payments service timeout",
    preview:
      "We're seeing p99 latency spike to 12s on the payments service. Paging oncall. Can you check the recent deploy?",
  },
];

const URGENT_KEYWORDS = [
  "urgent",
  "asap",
  "eod",
  "incident",
  "paging",
  "immediately",
  "critical",
  "deadline",
  "by end of day",
  "need signature",
  "prod incident",
];
const REPLY_KEYWORDS = [
  "question",
  "let me know",
  "can you",
  "thoughts?",
  "what do you think",
  "quick question",
  "feedback",
  "reply",
];
const TRASH_KEYWORDS = [
  "unsubscribe",
  "promo",
  "flash sale",
  "% off",
  "coupon",
  "deal",
  "discount",
  "checkout",
  "offer ends",
];

function classifyEmail(email: Email): Bucket {
  const text =
    `${email.subject} ${email.preview} ${email.from}`.toLowerCase();
  if (URGENT_KEYWORDS.some((kw) => text.includes(kw))) return "Urgent";
  if (TRASH_KEYWORDS.some((kw) => text.includes(kw))) return "Trash";
  if (REPLY_KEYWORDS.some((kw) => text.includes(kw))) return "Reply";
  return "Read Later";
}

const BUCKET_STYLE: Record<Bucket, { bg: string; text: string; border: string }> = {
  Urgent: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  Reply: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Read Later": { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" },
  Trash: { bg: "bg-neutral-100", text: "text-neutral-500", border: "border-neutral-200" },
};

const BUCKET_BADGE: Record<Bucket, string> = {
  Urgent: "bg-red-500 text-white",
  Reply: "bg-blue-500 text-white",
  "Read Later": "bg-slate-300 text-slate-800",
  Trash: "bg-neutral-300 text-neutral-600",
};

export default function TryPage() {
  const [sorted, setSorted] = useState(false);
  const [results, setResults] = useState<SortedEmail[]>([]);

  function handleSort() {
    const classified = SAMPLE_EMAILS.map((email) => ({
      ...email,
      bucket: classifyEmail(email),
    }));
    setResults(classified);
    setSorted(true);
  }

  function handleReset() {
    setSorted(false);
    setResults([]);
  }

  const buckets: Bucket[] = ["Urgent", "Reply", "Read Later", "Trash"];

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-500" />
          Triaged
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:opacity-70">
            Home
          </Link>
          <a
            href="/#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 pt-12 pb-24">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
            Try it
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See how Triaged sorts your inbox
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Below are 5 sample emails. Hit &ldquo;Sort my inbox&rdquo; and watch them get
            auto-sorted into Urgent, Reply, Read Later, and Trash using keyword rules.
          </p>
        </div>

        {/* Email list */}
        {!sorted && (
          <div className="mt-10 space-y-3">
            {SAMPLE_EMAILS.map((email) => (
              <div
                key={email.id}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{email.from}</span>
                </div>
                <p className="mt-1 text-sm font-medium">{email.subject}</p>
                <p className="mt-1 text-xs text-neutral-500">{email.preview}</p>
              </div>
            ))}
            <div className="mt-8 text-center">
              <button
                onClick={handleSort}
                className="rounded-full bg-neutral-900 px-8 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Sort my inbox
              </button>
            </div>
          </div>
        )}

        {/* Sorted results */}
        {sorted && (
          <div className="mt-10 space-y-8">
            {buckets.map((bucket) => {
              const emails = results.filter((e) => e.bucket === bucket);
              if (emails.length === 0) return null;
              const style = BUCKET_STYLE[bucket];
              return (
                <div key={bucket}>
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${BUCKET_BADGE[bucket]}`}
                    >
                      {bucket.toUpperCase()}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {emails.length} {emails.length === 1 ? "email" : "emails"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {emails.map((email) => (
                      <div
                        key={email.id}
                        className={`rounded-xl border p-4 ${style.bg} ${style.border}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-semibold ${style.text}`}>
                            {email.from}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium">{email.subject}</p>
                        <p className="mt-1 text-xs text-neutral-500">{email.preview}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="mt-8 flex flex-col items-center gap-4 text-center">
              <button
                onClick={handleReset}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium transition hover:border-neutral-900"
              >
                Reset
              </button>
              <p className="text-sm text-neutral-500">
                This is a v0 demo using keyword rules. The real product uses AI to understand
                context, urgency, and your personal patterns.
              </p>
              <a
                href="/#waitlist"
                className="inline-block rounded-full bg-slate-600 px-7 py-3.5 font-medium text-white transition hover:bg-slate-700"
              >
                Join the waitlist
              </a>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
            Triaged
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </>
  );
}
