// Keep development and tests offline; the published site uses its live board.
export const isLocalPreview = (hostname = '') =>
  !hostname || ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
export const LOCAL_PREVIEW = isLocalPreview(globalThis.location?.hostname);
