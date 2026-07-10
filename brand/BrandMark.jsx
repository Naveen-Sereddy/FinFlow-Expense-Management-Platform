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
  const ink = "#15181c";      // graphite-950-ish, cube face on light theme
  const paper = "#f4f6f8";    // graphite-50-ish, cube face on dark theme
  const teal = "#3d9b8f";     // brand accent — right face
  const faceMain = dark ? paper : ink;
  const fg = dark ? paper : ink;

  // Wordmark text style — driven by CSS vars (overridable by Tweaks)
  const wordStyle = {
    fontFamily: 'var(--ff-brand-font, "Inter", ui-sans-serif, system-ui, sans-serif)',
    fontStyle: 'var(--ff-brand-style, normal)',
    fontWeight: 'var(--ff-brand-weight, 700)',
    letterSpacing: 'var(--ff-brand-letter-spacing, -0.02em)',
    fill: fg
  };

  // Isometric cube glyph — top face outlined, left face solid, right face teal accent
  const CubeGlyph = ({ x = 0, y = 0, s = 1 }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M32 6 L56 20 L32 32 L8 20 Z" fill={dark ? "#0c0e10" : "#fff"} stroke={faceMain} strokeWidth="3" strokeLinejoin="round"/>
      <path d="M8 20 L32 32 L32 58 L8 44 Z" fill={faceMain}/>
      <path d="M56 20 L56 44 L32 58 L32 32 Z" fill={teal}/>
    </g>
  );

  if (variant === "mark") {
    const s = size || 40;
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" className={className} style={style} role="img" aria-label="FinFlow">
        <CubeGlyph/>
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
        <CubeGlyph x={68} y={0}/>
        <text x="100" y="106" textAnchor="middle" style={{...wordStyle, fontSize: 'calc(32px * var(--ff-brand-size-scale, 1))'}}>FinFlow</text>
      </svg>
    );
  }

  // horizontal (default lockup): mark + wordmark side-by-side
  const h = size || 32;
  return (
    <svg height={h} viewBox="0 0 166 56" className={className} style={style} role="img" aria-label="FinFlow">
      <CubeGlyph x={0} y={4} s={0.75}/>
      <text x="60" y="38" style={{...wordStyle, fontSize: 'calc(30px * var(--ff-brand-size-scale, 1))'}}>FinFlow</text>
    </svg>
  );
};

window.BrandMark = BrandMark;
