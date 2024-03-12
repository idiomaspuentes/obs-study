export function pad(num) {
  return String(num).padStart(2, "0");
}

export function warn(message) {
  const debug = false;
  if (debug) alert(message);
}
