export function LeafIcon(props) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <path d="M26 5C12 3 5 9 7 19c1 6 9 8 14 3 4-4 4-11 5-17Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="m5 28 15-16M12 20v-7m0 7h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>;
}

export function CartIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M3 3h2l2.2 12h12l2-9H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>;
}

export function ArrowIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function TrashIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
