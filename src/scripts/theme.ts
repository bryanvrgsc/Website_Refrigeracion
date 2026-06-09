export type ThemeMode = "system" | "light" | "dark";

const STORAGE_KEY = "theme";
const LOGO_LIGHT = "/favicon.svg";
const LOGO_DARK = "/favicon-dark.svg";

export function getStored(): ThemeMode {
  if (typeof localStorage === "undefined") return "system";
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : "system";
}

export function setStored(mode: ThemeMode): void {
  localStorage.setItem(STORAGE_KEY, mode);
}

export function prefersDark(): boolean {
  return (
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function resolveEffective(mode: ThemeMode): "light" | "dark" {
  if (mode === "system") return prefersDark() ? "dark" : "light";
  return mode;
}

export function applyTheme(mode: ThemeMode = getStored()): void {
  const effective = resolveEffective(mode);
  const root = document.documentElement;
  root.classList.toggle("dark", effective === "dark");

  const logo = document.getElementById("brand-logo") as HTMLImageElement | null;
  if (logo) logo.src = effective === "dark" ? LOGO_DARK : LOGO_LIGHT;

  document.dispatchEvent(
    new CustomEvent("themechange", { detail: { mode, effective } }),
  );
}

export function cycle(mode: ThemeMode): ThemeMode {
  return mode === "system" ? "light" : mode === "light" ? "dark" : "system";
}
