/* FinFlow Charts — minimal, no gradients, theme-aware
   Components: <Sparkline>, <LineChart>, <BarChart>, <AreaChart>, <Donut>, <ProgressBar>
   All use viewBox and scale to container.
*/

const _ffSeriesColor = (i) => `var(--ff-chart-${(i % 6) + 1})`;
const _ffMax = (arr, key="v") => Math.max(...arr.map(d => typeof d === "number" ? d : d[key]));
const _ffMin = (arr, key="v") => Math.min(...arr.map(d => typeof d === "number" ? d : d[key]));

/* --- Sparkline -------------------------------------------------------- */
const Sparkline = ({ data, color = _ffSeriesColor(0), height = 36, width = 120, fill = true }) => {
  const vals = data.map(d => typeof d === "number" ? d : d.v);
  const max = Math.max(...vals), min = Math.min(...vals);
  const range = max - min || 1;
  const step = width / (vals.length - 1);
  const pts = vals.map((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2]);
  const path = "M " + pts.map(p => p.join(",")).join(" L ");
  const fillPath = path + ` L ${width},${height} L 0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="ff-chart" preserveAspectRatio="none">
      {fill && <path d={fillPath} fill={color} opacity="0.10"/>}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
};

/* --- LineChart -------------------------------------------------------- */
const LineChart = ({ data, height = 240, xKey = "w", yKey = "v", yLabel = "", showGrid = true, color = _ffSeriesColor(0), unit = "" }) => {
  const W = 720, H = height;
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
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="ff-chart" preserveAspectRatio="none">
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
      {pts.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r="2.5" fill="var(--ff-card)" stroke={color} strokeWidth="1.5"/>
      ))}
    </svg>
  );
};

/* --- BarChart --------------------------------------------------------- */
const BarChart = ({ data, height = 240, xKey = "cat", yKey = "value", labelMap = {}, unit = "$", colorByIndex = true, color }) => {
  const W = 720, H = height;
  const P = { t: 12, r: 16, b: 36, l: 52 };
  const innerW = W - P.l - P.r, innerH = H - P.t - P.b;
  const vals = data.map(d => d[yKey]);
  const max = Math.ceil(Math.max(...vals) * 1.15 / 10) * 10;
  const bw = innerW / data.length * 0.62;
  const gap = innerW / data.length;
  const y = v => P.t + innerH - (v / max) * innerH;
  const ticks = 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="ff-chart" preserveAspectRatio="none">
      <g className="grid">
        {Array.from({length: ticks + 1}, (_, i) => {
          const yv = (max) * (i / ticks);
          return <line key={i} x1={P.l} x2={P.l + innerW} y1={y(yv)} y2={y(yv)}/>;
        })}
      </g>
      <g className="axis">
        {Array.from({length: ticks + 1}, (_, i) => {
          const yv = (max) * (i / ticks);
          return <text key={i} x={P.l - 8} y={y(yv)} textAnchor="end" dominantBaseline="middle" fontSize="10">{unit}{yv.toFixed(0)}</text>;
        })}
      </g>
      {data.map((d, i) => {
        const v = d[yKey];
        const px = P.l + i * gap + (gap - bw) / 2;
        const py = y(v);
        const h = innerH - (py - P.t);
        const c = color || (colorByIndex ? _ffSeriesColor(i) : _ffSeriesColor(0));
        const label = labelMap[d[xKey]] || d[xKey];
        return (
          <g key={i}>
            <rect x={px} y={py} width={bw} height={h} fill={c} rx="2"/>
            <text x={px + bw / 2} y={H - 18} textAnchor="middle" fontSize="11" fill="var(--ff-chart-axis)">{label}</text>
            <text x={px + bw / 2} y={py - 6} textAnchor="middle" fontSize="10" fill="var(--ff-fg-muted)" style={{fontVariantNumeric:'tabular-nums'}}>{unit}{v.toFixed(0)}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* --- AreaChart -------------------------------------------------------- */
const AreaChart = ({ data, height = 200, xKey = "m", yKey = "v", color = _ffSeriesColor(0), unit = "$" }) => {
  const W = 720, H = height;
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
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="ff-chart" preserveAspectRatio="none">
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
    </svg>
  );
};

/* --- Donut ------------------------------------------------------------ */
const Donut = ({ data, size = 200, thickness = 26, labelKey = "label", valueKey = "value" }) => {
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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
