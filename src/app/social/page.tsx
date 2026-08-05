import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

export default function SocialPage() {
  return <main className="simple-page-section"><div className="empty-state"><div className="empty-state-icon"><Heart /></div><p className="eyebrow">Prototype notice</p><h1>We&apos;d meet you there.</h1><p>This would lead to our social media, but TSIKAVA is a prototype, so we don&apos;t have one yet :)</p><Link className="primary-button" href="/"><ArrowLeft size={17} /> Back to TSIKAVA</Link></div></main>;
}
