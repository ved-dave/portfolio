export type SiteDesign = "classic" | "terminal";

// Server-only: read at build/render time. Set SITE_DESIGN=terminal to enable the terminal redesign.
export const siteDesign: SiteDesign =
  process.env.SITE_DESIGN?.trim().toLowerCase() === "terminal" ? "terminal" : "classic";
