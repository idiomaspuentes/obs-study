import i18n from '../constants/i18n'

export const rangeArray = (beg, end) => Array.from(Array(end+1-beg),(val,index)=>index+beg)

export function pad(n) {
  return ((n < 10) && (n >=0)) ? (`0${n}`) : `${n}`
}

export function warnTranslate(message) {
  const debug = false;
  if (debug) alert(i18n.t(message));
}

export function warn (message) {
  const debug = false;
  if (debug) alert(message);
}