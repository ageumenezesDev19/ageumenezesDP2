/** Whether an input can move the document, rather than a control or nested rail. */
export function isPageScrollInput(event: Event): boolean {
  if (event.defaultPrevented) return false;
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="slider"]')) return false;

  let direction = 0;
  if (event instanceof WheelEvent) {
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return false;
    direction = Math.sign(event.deltaY);
  } else if (event instanceof KeyboardEvent) {
    if (event.metaKey || event.ctrlKey || event.altKey) return false;
    if (event.key === ' ' && target?.closest('button, a, [role="button"]')) return false;
    if (['ArrowDown', 'PageDown', 'End'].includes(event.key)) direction = 1;
    else if (['ArrowUp', 'PageUp', 'Home'].includes(event.key)) direction = -1;
    else if (event.key === ' ') direction = event.shiftKey ? -1 : 1;
    else return false;
  }

  for (let node = target; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (!/(auto|scroll)/.test(style.overflowY)) continue;
    const range = node.scrollHeight - node.clientHeight;
    if (range <= 1) continue;
    if (!direction || (direction > 0 ? node.scrollTop < range - 1 : node.scrollTop > 1)) return false;
    if (/contain|none/.test(style.overscrollBehaviorY)) return false;
  }
  return true;
}
