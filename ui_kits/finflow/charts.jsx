/* FinFlow Charts — minimal, no gradients, theme-aware
   Components: <Sparkline>, <LineChart>, <BarChart>, <AreaChart>, <Donut>, <ProgressBar>
   All use viewBox and scale to container.
*/

const _ffSeriesColor = (i) => `var(--ff-chart-${(i % 6) + 1})`;
const _ffMax = (arr, key="v") => Math.max(...arr.map(d => typeof d === "number" ? d : d[key]));
const _ffMin = (arr, key="v") => Math.min(...arr.map(d => typeof d === "number" ? d : d[key]));

/* Every chart renders a real accessible name (<title> + role="img") instead
   of an unlabeled <svg> — screen readers otherwise announce nothing. Callers
   should pass a real `label` describing what the chart shows; a generic
   fallback covers the (rare, low-value) case where one wasn't passed. */
const _ffChartLabelProps = (label, fallback) => ({ role: "img", "aria-label": label || fallback });

/* Shared empty state for chart primitives that can't safely compute a scale
   with zero data points (Math.max/min on [] is -Infinity/NaN). Same visual
   language as the rest of the app's empty states, sized to the chart. */
const ChartEmpty = ({ height, message = "No data for this range" }) => (
  <div style={{height, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--ff-fg-subtle)', fontSize:'var(--ff-text-sm)'}}>
    {message}
  </div>
);

/* Charts using a fixed viewBox with preserveAspectRatio="none" stretch
   non-uniformly once the SVG is laid out wider than its viewBox (circular
   dots become ellipses, stroke/text weight skews) — so instead we measure
   the real rendered width and build the viewBox to match it 1:1. */
const _ffUseChartWidth = (fallback = 720) => {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(fallback);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => { const cw = el.getBoundingClientRect().width; if (cw > 0) setW(Math.round(cw)); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
};

/* --- Sparkline -------------------------------------------------------- */
const Sparkline = ({ data, color = _ffSeriesColor(0), height = 36, width = 120, fill = true, label }) => {
  if (!data || data.length === 0) return <ChartEmpty height={height} message=""/>;
  const vals = data.map(d => typeof d === "number" ? d : d.v);
  const max = Math.max(...vals), min = Math.min(...vals);
  const range = max - min || 1;
  const step = width / (vals.length - 1);
  const pts = vals.map((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2]);
  const path = "M " + pts.map(p => p.join(",")).join(" L ");
  const fillPath = path + ` L ${width},${height} L 0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="ff-chart" preserveAspectRatio="none"
      {..._ffChartLabelProps(label, `Trend sparkline, ${vals.length} points, from ${min} to ${max}`)}>
      <title>{label || `Trend from ${min} to ${max}`}</title>
      {fill && <path d={fillPath} fill={color} opacity="0.10"/>}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
};

/* --- LineChart -------------------------------------------------------- */
const LineChart = ({ data, height = 240, xKey = "w", yKey = "v", yLabel = "", showGrid = true, color = _ffSeriesColor(0), unit = "", label }) => {
  const [hover, setHover] = React.useState(null);
  const [wrapRef, W] = _ffUseChartWidth(720);
  if (!data || data.length === 0) return <ChartEmpty height={height}/>;
  const H = height;
  const P = { t: 12, r: 16, b: 28, l: 44 };
  const innerW = W - P.l - P.r, innerH = H - P.t - P.b;
  const vals = data.map(d => d[yKey]);
  const max = Math.ceil(Math.max(...vals) * 1.1 / 10) * 10;
  const min = 0;
  const step = innerW / (data.length - 1);
  const y = v => P.t + innerH - ((v - min) / (max - min)) * innerH;
  const x = i => P.l + i * step;
  const pts = data.map((d, i) => [x(i), y(d[yKey])]);
  const path = "M " + pts.map(p => p.join(",")).join(" L ");
  const ticks = 4;
  const hoverPt = hover != null ? pts[hover] : null;
  const tipText = hover != null ? `${data[hover][xKey]} · ${unit}${data[hover][yKey].toFixed(0)}` : "";
  const tipW = 16 + tipText.length * 6.1;
  const tipX = hoverPt ? Math.min(Math.max(hoverPt[0] - tipW / 2, P.l), P.l + innerW - tipW) : 0;
  return (
    <div ref={wrapRef} style={{width:'100%'}}>
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="ff-chart"
      {..._ffChartLabelProps(label, `Line chart, ${data.length} points`)}>
      <title>{label || `Line chart from ${data[0][xKey]} to ${data[data.length-1][xKey]}`}</title>
      {showGrid && <g className="grid">
        {Array.from({length: ticks + 1}, (_, i) => {
          const yv = min + (max - min) * (i / ticks);
          return <line key={i} x1={P.l} x2={P.l + innerW} y1={y(yv)} y2={y(yv)}/>;
        })}
      </g>}
      <g className="axis">
        {Array.from({length: ticks + 1}, (_, i) => {
          const yv = min + (max - min) * (i / ticks);
          return <text key={i} x={P.l - 8} y={y(yv)} textAnchor="end" dominantBaseline="middle" fontSize="10">{unit}{yv.toFixed(0)}</text>;
        })}
        {data.map((d, i) => i % Math.ceil(data.length/8) === 0 && (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10">{d[xKey]}</text>
        ))}
      </g>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {hoverPt && <line x1={hoverPt[0]} x2={hoverPt[0]} y1={P.t} y2={P.t + innerH} stroke="var(--ff-border-strong)" strokeDasharray="2 3"/>}
      {pts.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={hover === i ? 4 : 2.5} fill="var(--ff-card)" stroke={color} strokeWidth="1.5"/>
      ))}
      {/* Invisible, larger hit targets — mouse hover and keyboard focus both
          reveal the same tooltip, so the exact value is reachable without a
          pointer. */}
      {pts.map(([px, py], i) => (
        <rect key={i} x={px - step/2} y={P.t} width={Math.max(step, 1)} height={innerH} fill="transparent"
          tabIndex={0} role="button" aria-label={`${data[i][xKey]}: ${unit}${data[i][yKey].toFixed(0)}`}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(i)} onBlur={() => setHover(null)}/>
      ))}
      {hoverPt && (
        <g style={{pointerEvents:'none'}}>
          <rect x={tipX} y={hoverPt[1] - 30} width={tipW} height={20} rx="4" fill="var(--ff-ink-950)"/>
          <text x={tipX + tipW/2} y={hoverPt[1] - 16} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#fff">{tipText}</text>
        </g>
      )}
    </svg>
    </div>
  );
};

/* --- BarChart --------------------------------------------------------- */
/* `colors`: explicit per-bar colors, keyed by array position, for callers
   that know each bar's real semantic color (e.g. a fixed category → token
   mapping from the data model) and can't rely on render order matching it —
   takes priority over colorByIndex/color. */
const BarChart = ({ data, height = 240, xKey = "cat", yKey = "value", labelMap = {}, unit = "$", colorByIndex = true, color, colors, label }) => {
  const [hover, setHover] = React.useState(null);
  const [wrapRef, W] = _ffUseChartWidth(720);
  if (!data || data.length === 0) return <ChartEmpty height={height}/>;
  const H = height;
  const P = { t: 12, r: 16, b: 36, l: 52 };
  const innerW = W - P.l - P.r, innerH = H - P.t - P.b;
  const vals = data.map(d => d[yKey]);
  const max = Math.ceil(Math.max(...vals) * 1.15 / 10) * 10;
  const bw = innerW / data.length * 0.62;
  const gap = innerW / data.length;
  const y = v => P.t + innerH - (v / max) * innerH;
  const ticks = 4;
  return (
    <div ref={wrapRef} style={{width:'100%'}}>
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="ff-chart"
      {..._ffChartLabelProps(label, `Bar chart, ${data.length} bars`)}>
      <title>{label || `Bar chart across ${data.map(d=>d[xKey]).join(', ')}`}</title>
      <g className="grid">
        {Array.from({length: ticks + 1}, (_, i) => {
          const yv = (max) * (i / ticks);
          return <line key={i} x1={P.l} x2={P.l + innerW} y1={y(yv)} y2={y(yv)}/>;
        })}
      </g>
      <g className="axis">
        {Array.from({length: ticks + 1}, (_, i) => {
          const yv = (max) * (i / ticks);
          return <text key={i} x={P.l - 8} y={y(yv)} textAnchor="end" dominantBaseline="middle" fontSize="10">{unit}{yv.toFixed(0)}K</text>;
        })}
      </g>
      {data.map((d, i) => {
        const v = d[yKey];
        const px = P.l + i * gap + (gap - bw) / 2;
        const py = y(v);
        const h = innerH - (py - P.t);
        const c = (colors && colors[i]) || color || (colorByIndex ? _ffSeriesColor(i) : _ffSeriesColor(0));
        const lbl = labelMap[d[xKey]] || d[xKey];
        return (
          <g key={i}
            tabIndex={0} role="button" aria-label={`${lbl}: ${unit}${v.toFixed(0)}K`}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)} onBlur={() => setHover(null)}
            style={{cursor:'pointer'}}>
            <rect x={px} y={py} width={bw} height={h} fill={c} rx="2" opacity={hover === null || hover === i ? 1 : 0.55}/>
            <text x={px + bw / 2} y={H - 18} textAnchor="middle" fontSize="11" fill={hover === i ? 'var(--ff-fg)' : 'var(--ff-chart-axis)'} fontWeight={hover === i ? 600 : 400}>{lbl}</text>
            <text x={px + bw / 2} y={py - 6} textAnchor="middle" fontSize="10" fill="var(--ff-fg-muted)" style={{fontVariantNumeric:'tabular-nums'}}>{unit}{v.toFixed(0)}K</text>
          </g>
        );
      })}
    </svg>
    </div>
  );
};

/* --- AreaChart -------------------------------------------------------- */
const AreaChart = ({ data, height = 200, xKey = "m", yKey = "v", color = _ffSeriesColor(0), unit = "$", label }) => {
  const [hover, setHover] = React.useState(null);
  const [wrapRef, W] = _ffUseChartWidth(720);
  if (!data || data.length === 0) return <ChartEmpty height={height}/>;
  const H = height;
  const P = { t: 12, r: 16, b: 28, l: 44 };
  const innerW = W - P.l - P.r, innerH = H - P.t - P.b;
  const vals = data.map(d => d[yKey]);
  const max = Math.ceil(Math.max(...vals) * 1.1 / 10) * 10;
  const step = innerW / (data.length - 1);
  const y = v => P.t + innerH - (v / max) * innerH;
  const x = i => P.l + i * step;
  const pts = data.map((d, i) => [x(i), y(d[yKey])]);
  const line = "M " + pts.map(p => p.join(",")).join(" L ");
  const area = line + ` L ${P.l + innerW},${P.t + innerH} L ${P.l},${P.t + innerH} Z`;
  const hoverPt = hover != null ? pts[hover] : null;
  const tipText = hover != null ? `${data[hover][xKey]} · ${unit}${data[hover][yKey].toFixed(0)}` : "";
  const tipW = 16 + tipText.length * 6.1;
  const tipX = hoverPt ? Math.min(Math.max(hoverPt[0] - tipW / 2, P.l), P.l + innerW - tipW) : 0;
  return (
    <div ref={wrapRef} style={{width:'100%'}}>
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="ff-chart"
      {..._ffChartLabelProps(label, `Area chart, ${data.length} points`)}>
      <title>{label || `Area chart from ${data[0][xKey]} to ${data[data.length-1][xKey]}`}</title>
      <g className="grid">
        {[0,1,2,3,4].map(i => {
          const yv = max * (i / 4);
          return <line key={i} x1={P.l} x2={P.l + innerW} y1={y(yv)} y2={y(yv)}/>;
        })}
      </g>
      <path d={area} fill={color} opacity="0.14"/>
      <path d={line} fill="none" stroke={color} strokeWidth="2"/>
      <g className="axis">
        {[0,1,2,3,4].map(i => {
          const yv = max * (i / 4);
          return <text key={i} x={P.l - 8} y={y(yv)} textAnchor="end" dominantBaseline="middle" fontSize="10">{unit}{yv.toFixed(0)}</text>;
        })}
        {data.map((d, i) => <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10">{d[xKey]}</text>)}
      </g>
      {hoverPt && <line x1={hoverPt[0]} x2={hoverPt[0]} y1={P.t} y2={P.t + innerH} stroke="var(--ff-border-strong)" strokeDasharray="2 3"/>}
      {hoverPt && <circle cx={hoverPt[0]} cy={hoverPt[1]} r="3" fill="var(--ff-card)" stroke={color} strokeWidth="1.5"/>}
      {pts.map(([px], i) => (
        <rect key={i} x={px - step/2} y={P.t} width={Math.max(step, 1)} height={innerH} fill="transparent"
          tabIndex={0} role="button" aria-label={`${data[i][xKey]}: ${unit}${data[i][yKey].toFixed(0)}`}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(i)} onBlur={() => setHover(null)}/>
      ))}
      {hoverPt && (
        <g style={{pointerEvents:'none'}}>
          <rect x={tipX} y={hoverPt[1] - 30} width={tipW} height={20} rx="4" fill="var(--ff-ink-950)"/>
          <text x={tipX + tipW/2} y={hoverPt[1] - 16} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#fff">{tipText}</text>
        </g>
      )}
    </svg>
    </div>
  );
};

/* --- Donut ------------------------------------------------------------ */
const Donut = ({ data, size = 200, thickness = 26, labelKey = "label", valueKey = "value", label }) => {
  if (!data || data.length === 0) return <ChartEmpty height={size}/>;
  const total = data.reduce((s, d) => s + d[valueKey], 0);
  const r = size / 2 - 2;
  const inner = r - thickness;
  const cx = size / 2, cy = size / 2;
  let acc = 0;
  const arcs = data.map((d, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d[valueKey];
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a1), yi0 = cy + inner * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a0), yi1 = cy + inner * Math.sin(a0);
    const path = `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${xi0} ${yi0} A ${inner} ${inner} 0 ${large} 0 ${xi1} ${yi1} Z`;
    return { path, color: _ffSeriesColor(i), pct: d[valueKey] / total, d };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      {..._ffChartLabelProps(label, `Donut chart, ${data.length} segments`)}>
      <title>{label || data.map(d => `${d[labelKey]} ${Math.round(d[valueKey]/total*100)}%`).join(', ')}</title>
      {arcs.map((a, i) => <path key={i} d={a.path} fill={a.color}/>)}
    </svg>
  );
};

/* --- Progress (budget vs spent) -------------------------------------- */
const BudgetBar = ({ budget, spent, label, unit = "$" }) => {
  const pct = Math.min(100, (spent / budget) * 100);
  const over = spent > budget;
  return (
    <div style={{display:'flex', flexDirection:'column', gap:6, minWidth:0}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', fontSize:12, gap:8, minWidth:0}}>
        <span style={{color:'var(--ff-fg)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{label}</span>
        <span className="ff-tnum" style={{color:'var(--ff-fg-muted)', fontSize:11, whiteSpace:'nowrap', flexShrink:0}}>
          {unit}{spent.toFixed(1)}K / {unit}{budget.toFixed(1)}K
        </span>
      </div>
      <div className="ff-progress" style={{background:'var(--ff-ink-100)'}}>
        <div className="ff-progress__fill" style={{
          width: pct + '%',
          background: over ? 'var(--ff-rejected)' : 'var(--ff-primary)'
        }}/>
      </div>
    </div>
  );
};

Object.assign(window, { Sparkline, LineChart, BarChart, AreaChart, Donut, BudgetBar });
