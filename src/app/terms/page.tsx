import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return <main className="simple-page-section prototype-page"><div className="empty-state"><div className="empty-state-icon"><FileText /></div><p className="eyebrow">Prototype notice</p><h1>Terms would live here.</h1><p>TSIKAVA is a prototype, so this is where its terms of service would be.</p><Link className="primary-button" href="/"><ArrowLeft size={17} /> Back to TSIKAVA</Link></div></main>;
}
