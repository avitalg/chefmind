function PenIcon() {
  return (
    <svg
      className="section-divider__pen"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 3.5l6 6-9.5 9.5H5v-6L14.5 3.5z" />
      <path d="M13 5l6 6" />
      <path d="M5 19l2.5-2.5" />
    </svg>
  );
}

export default function SectionDivider() {
  return (
    <div className="section-divider" role="presentation" aria-hidden="true">
      <span className="section-divider__line" />
      <PenIcon />
      <span className="section-divider__line" />
    </div>
  );
}
