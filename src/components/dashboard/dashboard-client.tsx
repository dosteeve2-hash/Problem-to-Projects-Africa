"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import type { RecommendationResult } from "@/lib/types/recommendation";

type SavedSession = {
  result: RecommendationResult;
  generatedAt: string;
  mode: string;
};

const HISTORY_KEY = "problem-to-project-africa:history";

export function getHistory(): SavedSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as SavedSession[]) : [];
  } catch {
    return [];
  }
}

const subscribers = new Set<() => void>();

function notifyHistoryChange() {
  subscribers.forEach((cb) => cb());
}

export function saveToHistory(session: SavedSession) {
  const current = getHistory();
  const exists = current.some(
    (s) =>
      s.result.recommendedProject.title === session.result.recommendedProject.title &&
      s.generatedAt === session.generatedAt,
  );
  if (!exists) {
    const updated = [session, ...current].slice(0, 20);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    notifyHistoryChange();
  }
}

function subscribeHistory(callback: () => void) {
  subscribers.add(callback);
  return () => { subscribers.delete(callback); };
}

function getHistorySnapshot(): SavedSession[] {
  return getHistory();
}

const emptyHistory: SavedSession[] = [];

export default function DashboardClient() {
  const history = useSyncExternalStore(
    subscribeHistory,
    getHistorySnapshot,
    () => emptyHistory,
  );

  if (history.length === 0) {
    return (
      <div className="rounded-[32px] border border-border bg-card p-8 shadow-[var(--shadow)]">
        <h2 className="text-2xl font-semibold text-foreground">Aucune recommandation sauvegardee.</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Lance un diagnostic depuis le formulaire pour generer ta premiere recommandation de projet.
          Elle apparaitra automatiquement ici.
        </p>
        <Link
          href="/modes"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Choisir un mode
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {history.map((session, index) => {
        const project = session.result.recommendedProject;
        const date = new Date(session.generatedAt).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <article
            key={`${project.title}-${session.generatedAt}-${index}`}
            className="flex flex-col gap-4 rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow)] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {session.mode} mode
                </span>
                <span className="text-xs text-muted">{date}</span>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-foreground">{project.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm leading-7 text-muted">{project.concept}</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <span className="inline-flex rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-xs font-semibold text-primary">
                {project.feasibilityLevel}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
