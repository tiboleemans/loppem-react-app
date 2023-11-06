/* eslint-disable */
export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function scrollTo(scrollableElement, elmID) {
  const elm = document.getElementById(elmID);

  if (!elmID || !elm) {
    return;
  }

  window.scrollTo({behavior: "smooth", top: elm.offsetTop - 20});
}

export function classList(classes) {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(' ');
}
