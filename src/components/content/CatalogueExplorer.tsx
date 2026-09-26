"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * CatalogueExplorer — the full product list as a searchable index. A sticky
 * rail of categories on the left (with counts) and one large search box
 * narrow the list as you choose or type; products sit as small cards in
 * their groups. A product with a page links to it; one without opens a brief
 * with it already named (marked "Brief").
 *
 * Every product is always in the HTML: filtering hides with the `hidden`
 * attribute rather than removing, so the long-tail names stay on the page as
 * crawlable links (the reason the list exists) and the page works the same
 * without script, with everything showing.
 */

export type CatalogueGroup = { heading: string; href?: string; links: { label: string; href: string }[] };

const ALL = "All products";

export function CatalogueExplorer({ groups }: { groups: CatalogueGroup[] }) {
  const [group, setGroup] = useState(ALL);
  const [query, setQuery] = useState("");
  const searchId = useId();
  const q = query.trim().toLowerCase();

  const total = useMemo(() => groups.reduce((n, g) => n + g.links.length, 0), [groups]);
  const matches = (label: string) => !q || label.toLowerCase().includes(q);
  const countFor = (g: CatalogueGroup) => g.links.filter((l) => matches(l.label)).length;
  const shown = groups.filter((g) => group === ALL || g.heading === group).reduce((n, g) => n + countFor(g), 0);

  return (
    <div className="grid grid-cols-1 gap-[var(--space-6)] lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-[var(--space-8)]">
      {/* The rail. */}
      <div className="lg:sticky lg:top-[calc(var(--header-height)+var(--space-5))] lg:self-start">
        <p className="hidden text-eyebrow uppercase tracking-[0.16em] text-[var(--color-text-muted)] lg:block">Browse by category</p>
        <div
          role="group"
          aria-label="Filter by category"
          className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] lg:mt-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0"
        >
          {[{ heading: ALL, count: groups.reduce((n, g) => n + countFor(g), 0) }, ...groups.map((g) => ({ heading: g.heading, count: countFor(g) }))].map(
            ({ heading, count }) => {
              const selected = heading === group;
              return (
                <button
                  key={heading}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setGroup(heading)}
                  className={cn(
                    "group flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full px-3.5 py-2 text-small font-medium transition-colors lg:rounded-xl",
                    selected
                      ? "bg-ink-950 text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] lg:bg-transparent lg:hover:bg-[var(--color-surface)]",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cn("hidden h-4 w-0.5 rounded-full transition-colors lg:block", selected ? "bg-forge-600" : "bg-transparent")}
                    />
                    {heading}
                  </span>
                  <span className={cn("text-[0.75rem] tabular-nums", selected ? "text-white/60" : "text-[var(--color-text-muted)]")}>{count}</span>
                </button>
              );
            },
          )}
        </div>
      </div>

      <div>
        {/* The search. */}
        <label htmlFor={searchId} className="relative block">
          <span className="sr-only">Search the product list</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="9" cy="9" r="6" />
            <path d="m17 17-3.5-3.5" />
          </svg>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What do you need made? Try speed bag, gi, belt…"
            className="h-16 w-full rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] pl-14 pr-5 text-body-large shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_32px_-24px_rgb(0_0_0/0.3)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-forge-600"
          />
        </label>

        <p aria-live="polite" className="mt-[var(--space-4)] text-small text-[var(--color-text-secondary)]">
          Showing <span className="font-semibold text-[var(--color-text)]">{shown}</span> of {total} products
          {q ? (
            <>
              {" "}
              for <span className="font-semibold text-[var(--color-text)]">“{query.trim()}”</span>
            </>
          ) : null}
        </p>

        {/* The groups. */}
        <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-7)]">
          {groups.map((g) => {
            const hidden = (group !== ALL && g.heading !== group) || countFor(g) === 0;
            return (
              <section key={g.heading} hidden={hidden} aria-label={g.heading}>
                <h3 className="flex items-center gap-3 font-display text-heading-4 font-bold">
                  {g.href ? (
                    <Link href={g.href} className="group inline-flex items-center gap-2 transition-colors hover:text-forge-700">
                      {g.heading}
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 text-forge-600 transition-transform motion-safe:group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                      </svg>
                    </Link>
                  ) : (
                    g.heading
                  )}
                  <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {g.links.map((link) => {
                    const brief = link.href.startsWith("/quote");
                    return (
                      <li key={link.label} hidden={!matches(link.label)}>
                        <Link
                          href={link.href}
                          className="group flex h-full items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-small font-medium transition-[border-color,box-shadow,transform] duration-200 hover:border-forge-600/40 hover:shadow-[0_12px_24px_-18px_rgb(0_0_0/0.4)] motion-safe:hover:-translate-y-0.5"
                        >
                          <Highlight text={link.label} query={q} />
                          {brief ? (
                            <span className="shrink-0 rounded-full border border-dashed border-forge-600/50 px-2 py-0.5 text-[0.6875rem] font-semibold text-forge-700">
                              + Brief
                            </span>
                          ) : (
                            <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-text-muted)] transition-colors group-hover:bg-forge-600 group-hover:text-white">
                              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                              </svg>
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        {shown === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] p-[var(--space-7)] text-center">
            <p className="font-display text-heading-4 font-bold">Not on the list?</p>
            <p className="mx-auto mt-2 max-w-md text-small text-[var(--color-text-secondary)]">
              Send us a reference or a description and we can confirm whether it is something we can make.
            </p>
            <Link
              href={`/quote?product=${encodeURIComponent(query.trim())}`}
              className="mt-[var(--space-4)] inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-small font-semibold text-white transition-colors hover:bg-forge-600"
            >
              Send a brief for “{query.trim()}”
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** The matched part of a label, marked. */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>;
  const at = text.toLowerCase().indexOf(query);
  if (at < 0) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, at)}
      <mark className="rounded-sm bg-forge-600/15 text-[var(--color-text)]">{text.slice(at, at + query.length)}</mark>
      {text.slice(at + query.length)}
    </span>
  );
}
