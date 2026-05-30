/* BrandMark — reusable React component for the FinFlow logomark + lockups */
/* Wordmark text uses CSS vars so a single Tweak swaps the entire brand voice:
     --ff-brand-font, --ff-brand-style, --ff-brand-weight,
     --ff-brand-letter-spacing, --ff-brand-size-scale
*/

const BrandMark = ({ variant = "mark", size, theme: themeOverride, className = "", style = {} }) => {
  const [theme, setTheme] = React.useState(
    themeOverride || (typeof document !== "undefined" ? (document.documentElement.getAttribute("data-theme") || "light") : "light")
  );
  React.useEffect(() => {
    if (themeOverride) { setTheme(themeOverride); return; }
    const obs = new MutationObserver(() => setTheme(document.documentElement.getAttribute("data-theme") || "light"));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [themeOverride]);

  const dark = theme === "dark";
  const plum = "#3B1A33";
  const cream = "#FBF5E8";
  const citron = "#D9BE57";
  const fg = dark ? cream : "#15131A";

  // Wordmark text style — driven by CSS vars (overridable by Tweaks)
  const wordStyle = {
    fontFamily: 'var(--ff-brand-font, "Instrument Serif", Georgia, serif)',
    fontStyle: 'var(--ff-brand-style, italic)',
    fontWeight: 'var(--ff-brand-weight, 400)',
    letterSpacing: 'var(--ff-brand-letter-spacing, -0.01em)',
    fill: fg
  };

  if (variant === "mark") {
    const s = size || 40;
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" className={className} style={style} role="img" aria-label="FinFlow">
        <rect width="64" height="64" rx="14" fill={dark ? cream : plum}/>
        <rect x="16" y="14" width="7" height="36" fill={dark ? plum : cream}/>
        <rect x="16" y="14" width="30" height="7" fill={dark ? plum : cream}/>
        <rect x="16" y="27" width="20" height="7" fill={dark ? plum : cream}/>
        <circle cx="44" cy="46" r="4" fill={citron}/>
      </svg>
    );
  }

  if (variant === "wordmark") {
    const h = size || 28;
    return (
      <svg height={h} viewBox="0 0 230 48" className={className} style={style} role="img" aria-label="FinFlow">
        <text x="0" y="36" style={{...wordStyle, fontSize: 'calc(34px * var(--ff-brand-size-scale, 1))'}}>FinFlow</text>
      </svg>
    );
  }

  if (variant === "stacked") {
    const w = size || 120;
    return (
      <svg width={w} viewBox="0 0 200 132" className={className} style={style} role="img" aria-label="FinFlow">
        <rect x="68" y="0" width="64" height="64" rx="14" fill={dark ? cream : plum}/>
        <rect x="84" y="14" width="7" height="36" fill={dark ? plum : cream}/>
        <rect x="84" y="14" width="30" height="7" fill={dark ? plum : cream}/>
        <rect x="84" y="27" width="20" height="7" fill={dark ? plum : cream}/>
        <circle cx="112" cy="46" r="4" fill={citron}/>
        <text x="100" y="106" textAnchor="middle" style={{...wordStyle, fontSize: 'calc(32px * var(--ff-brand-size-scale, 1))'}}>FinFlow</text>
      </svg>
    );
  }

  // horizontal (default lockup): mark + wordmark side-by-side
  const h = size || 32;
  return (
    <svg height={h} viewBox="0 0 280 56" className={className} style={style} role="img" aria-label="FinFlow">
      <rect x="0" y="6" width="44" height="44" rx="10" fill={dark ? cream : plum}/>
      <rect x="11" y="16" width="5" height="25" fill={dark ? plum : cream}/>
      <rect x="11" y="16" width="21" height="5" fill={dark ? plum : cream}/>
      <rect x="11" y="25" width="14" height="5" fill={dark ? plum : cream}/>
      <circle cx="31" cy="38" r="3" fill={citron}/>
      <text x="60" y="38" style={{...wordStyle, fontSize: 'calc(30px * var(--ff-brand-size-scale, 1))'}}>FinFlow</text>
    </svg>
  );
};

window.BrandMark = BrandMark;
