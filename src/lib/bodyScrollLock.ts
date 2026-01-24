let lockCount = 0;
let previousOverflow: string | null = null;
let previousPaddingRight: string | null = null;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function lockBodyScroll() {
  if (typeof document === 'undefined') return;

  lockCount += 1;
  if (lockCount !== 1) return;

  const body = document.body;

  previousOverflow = body.style.overflow;
  previousPaddingRight = body.style.paddingRight;

  const scrollbarWidth = getScrollbarWidth();
  if (scrollbarWidth > 0) {
    const computedPaddingRight = parseFloat(
      window.getComputedStyle(body).paddingRight || '0'
    );
    body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
  }

  body.style.overflow = 'hidden';
}

export function unlockBodyScroll() {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount !== 0) return;

  const body = document.body;

  body.style.overflow = previousOverflow ?? '';
  body.style.paddingRight = previousPaddingRight ?? '';

  previousOverflow = null;
  previousPaddingRight = null;
}
