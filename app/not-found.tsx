import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap page-title" style={{ paddingBottom: "6rem" }}>
      <h1 className="display">This frame is empty.</h1>
      <p className="lede" style={{ margin: "1.25rem 0 2rem" }}>The page you asked for doesn’t exist or has moved.</p>
      <Link className="btn btn-primary" href="/">Go to the homepage</Link>
    </div>
  );
}
