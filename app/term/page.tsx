import TermWindow from "@/components/term/TermWindow";

export default function Term() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <TermWindow />
    </div>
  );
}
