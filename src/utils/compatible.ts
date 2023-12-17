export function addSafirClass(editorContainerElement: HTMLElement) {
  if (!editorContainerElement) {
    return;
  }
  if (!window.navigator) {
    return;
  }
  const IS_SAFARI = /Safari/.test(window.navigator.userAgent) && /Apple Computer/.test(window.navigator.vendor);
  if (IS_SAFARI) {
    editorContainerElement.classList.add('safiri');
  }
}
