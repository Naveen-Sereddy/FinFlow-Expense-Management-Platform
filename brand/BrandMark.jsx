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
  const ink = "#15181c";      // graphite-950-ish, wordmark ink on light theme
  const paper = "#f4f6f8";    // graphite-50-ish, wordmark ink on dark theme
  const fg = dark ? paper : ink;

  // Official logo assets (final, do not recolor/redraw): slate-blue mark for
  // light surfaces, cream mark for dark slate-blue surfaces. Selection follows
  // the same `dark` flag every call site already passes for contrast.
  const LOGO_SLATE = "../../brand/logomark-slate.png";
  const LOGO_CREAM = "../../brand/logomark-cream.png";
  const markSrc = dark ? LOGO_CREAM : LOGO_SLATE;
  const MARK_ASPECT = 727 / 1071; // height/width of the source assets

  // Wordmark text style — driven by CSS vars (overridable by Tweaks)
  const wordStyle = {
    fontFamily: 'var(--ff-brand-font, "Inter", ui-sans-serif, system-ui, sans-serif)',
    fontStyle: 'var(--ff-brand-style, normal)',
    fontWeight: 'var(--ff-brand-weight, 700)',
    letterSpacing: 'var(--ff-brand-letter-spacing, -0.02em)',
    fill: fg
  };

  // Official mark glyph, positioned/scaled within the same 64x64 local box
  // the old vector glyph used, so every call site's x/y/s stays correct.
  const LogoGlyph = ({ x = 0, y = 0, s = 1 }) => {
    const w = 56, h = w * MARK_ASPECT;
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <image href={markSrc} x={4} y={(64 - h) / 2} width={w} height={h} preserveAspectRatio="xMidYMid meet"/>
      </g>
    );
  };

  if (variant === "mark") {
    const s = size || 40;
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" className={className} style={style} role="img" aria-label="FinFlow">
        <LogoGlyph/>
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
        <LogoGlyph x={68} y={0}/>
        <text x="100" y="106" textAnchor="middle" style={{...wordStyle, fontSize: 'calc(32px * var(--ff-brand-size-scale, 1))'}}>FinFlow</text>
      </svg>
    );
  }

  // horizontal (default lockup): mark + wordmark side-by-side
  const h = size || 32;
  return (
    <svg height={h} viewBox="0 0 166 56" className={className} style={style} role="img" aria-label="FinFlow">
      <LogoGlyph x={0} y={4} s={0.75}/>
      <text x="60" y="38" style={{...wordStyle, fontSize: 'calc(30px * var(--ff-brand-size-scale, 1))'}}>FinFlow</text>
    </svg>
  );
};

/* Logo — explicit slate/cream API per brand usage rules. Same asset
   selection as BrandMark's theme-driven default, exposed for spots that
   need to force a variant rather than follow the ambient/local theme. */
const Logo = ({ variant = "slate", ...rest }) => (
  <BrandMark {...rest} theme={variant === "cream" ? "dark" : "light"}/>
);

window.BrandMark = BrandMark;
window.Logo = Logo;
