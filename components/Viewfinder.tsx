// Decorative camera viewfinder: nine AF points scan once, then the centre point locks.
const POINTS: [number, number][] = [
  [50, 46], [30, 46], [70, 46], [12, 46], [88, 46], [50, 22], [50, 70], [30, 28], [70, 64],
];

export default function Viewfinder() {
  return (
    <div className="vf" aria-hidden="true">
      <span className="vf-corner tl" /><span className="vf-corner tr" />
      <span className="vf-corner bl" /><span className="vf-corner br" />
      {POINTS.map(([x, y], i) => (
        <span key={i} className={`af${i === 0 ? " is-center" : ""}`} style={{ left: `${x}%`, top: `${y}%`, ["--i" as string]: i }} />
      ))}
      <div className="vf-bar">
        <span>18–55mm</span><span>f/5.6</span><span>1/250</span><span>ISO 100</span>
        <span className="lock">● In focus</span>
      </div>
    </div>
  );
}
