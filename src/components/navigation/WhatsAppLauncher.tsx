import { cn } from "@/lib/cn";

/**
 * WhatsAppLauncher — Design System §08 navigation shell, §07 Motion, §12
 * Accessibility.
 *
 * The floating contact affordance §08 reserved a slot for: `--action-bar-height`
 * exists so anything fixed to the bottom of the viewport clears the sticky
 * mobile action bar, and both that token and `MobileNavigation` name this
 * launcher by name. It offsets against the token rather than hard-coding a gap.
 *
 * No JavaScript. It is a link with a CSS animation, so it renders on the server
 * and ships nothing to the browser — which also means the number never reaches
 * a client bundle as a build-time constant.
 *
 * `WHATSAPP_NUMBER` is deliberately not `NEXT_PUBLIC_`. This component reads it
 * on the server and renders the finished `wa.me` URL; an unset variable renders
 * nothing at all rather than a link to `wa.me/undefined`.
 *
 * Two deviations worth knowing about:
 *
 * §04 is a closed palette and §09 allows Forge only for emphasis, but this
 * button is WhatsApp green. The launcher is a third-party affordance and people
 * identify it by that green before they read anything; recolouring it to Forge
 * would make it one more brand-coloured circle.
 *
 * §07 lists "constant floating objects" under Avoid, and the pulse is a loop.
 * It is the one thing on the page that has to be noticed after the reader has
 * settled, so it runs — but it is slow, low-contrast, and stops completely
 * under `prefers-reduced-motion`, where the button is simply there.
 */

/** wa.me accepts digits only — no `+`, spaces, brackets or dashes. */
function toWaNumber(raw: string) {
  return raw.replace(/\D/g, "");
}

export function WhatsAppLauncher() {
  const number = toWaNumber(process.env.WHATSAPP_NUMBER ?? "");
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics="whatsapp_launcher_click"
      data-analytics-surface="floating"
      className={cn(
        "whatsapp-launcher group fixed right-5 z-30 flex size-14 items-center justify-center rounded-full",
        "bg-[var(--color-whatsapp)] text-white shadow-[var(--shadow-overlay)]",
        // Clears the sticky mobile action bar (§08). On desktop the token is
        // 0rem, so this settles to a plain 20px inset.
        "bottom-[calc(var(--action-bar-height)+1.25rem)]",
        "transition-transform duration-[var(--motion-standard)] ease-[var(--ease-standard)]",
        "hover:scale-105 focus-visible:scale-105",
      )}
    >
      {/*
        The rings sit behind the button and are purely decorative. `-z-10`
        keeps them under the glyph, and the parent is the positioning context.
      */}
      <span aria-hidden="true" className="whatsapp-pulse" />
      <span
        aria-hidden="true"
        className="whatsapp-pulse"
        style={{ animationDelay: "1.2s" }}
      />

      <WhatsAppGlyph />

      {/*
        §12: the control needs a name, and a link that leaves the site should
        say so rather than surprising someone who cannot see the icon.
      */}
      <span className="sr-only">Message us on WhatsApp (opens WhatsApp)</span>
    </a>
  );
}

/** The WhatsApp mark. Filled rather than the §09 line family, because a brand
    glyph redrawn as an outline stops being recognisable. */
function WhatsAppGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="relative size-7"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
