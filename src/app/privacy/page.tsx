import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return <main className="simple-page-section"><div className="empty-state"><div className="empty-state-icon"><ShieldCheck /></div><p className="eyebrow">Prototype notice</p><h1>Privacy would live here.</h1><p>TSIKAVA is a prototype, so this is where its privacy policy would be.</p><Link className="primary-button" href="/"><ArrowLeft size={17} /> Back to TSIKAVA</Link></div></main>;
}
