"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* NAV */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-500" />
          Triaged
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="hidden sm:inline-block rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:border-neutral-900"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-slate-100 via-slate-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
            Productivity
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Your inbox, on autopilot.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            AI reads every email, sorts it, summarizes threads, and drafts replies in your voice.
            All for five dollars a month.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-slate-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleWaitlist}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="font-semibold">Inbox &middot; 2 min to clear</span>
                <span className="text-xs text-neutral-500">217 auto-archived</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3 rounded-xl border border-slate-300 bg-slate-50 p-3">
                  <span className="mt-1 inline-block rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    URGENT
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Sarah K.</div>
                    <div className="text-xs text-neutral-600">
                      Final review on the Q3 contract — they want it signed by EOD
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-3">
                  <span className="mt-1 inline-block rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    DRAFTED
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">James from Figma</div>
                    <div className="text-xs text-neutral-600">
                      Reply ready — just click send
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-3">
                  <span className="mt-1 inline-block rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    FYI
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Calendar reminder</div>
                    <div className="text-xs text-neutral-600">
                      Batched — batch opens at 4pm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/try"
              className="inline-block rounded-full bg-slate-600 px-7 py-3.5 font-medium text-white transition hover:bg-slate-700"
            >
              Try the sorter →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">📬</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Smart sorting</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Only ever see what matters. The rest gets batched or quietly archived.
              </p>
            </div>
            <div>
              <div className="text-3xl">✍️</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Voice-matched drafts</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Reply suggestions that sound like you, not a corporate robot.
              </p>
            </div>
            <div>
              <div className="text-3xl">⏱️</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Two minutes a day</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                That is how long it takes to clear your inbox with Triaged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            {[
              {
                n: 1,
                title: "Connect your tools",
                body: "Gmail, Zoom, Slack, Jira. Two-click OAuth and you're in.",
              },
              {
                n: 2,
                title: "We watch and learn",
                body: "Your style, your priorities, your team's rhythm. We adapt to you.",
              },
              {
                n: 3,
                title: "Get hours back",
                body: "Average user saves 6 hours a week in the first month. You'll see your number.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                  {n}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-slate-600 px-7 py-3.5 font-medium text-white transition hover:bg-slate-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* FOOTER */}
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
