export function clearStyle(dom) {
    dom.removeAttr('style');
    dom.attr("style", "position: relative");
}
