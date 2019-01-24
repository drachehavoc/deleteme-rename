import { Creator } from "./Creators.js";
// -----------------------------------------------------------------------------
// --- ELEMENTS ----------------------------------------------------------------
// -----------------------------------------------------------------------------
export const template = Creator.template;
export const domo = (strs, ...vals) => (...p) => {
    let str = String.raw(strs, ...vals);
    let tag = str.match(/([\w-]*)[\.\#]{0,1}/);
    let id = str.match(/#([\w-]*)/);
    let cl = str.match(/\.([\w-.]*)/);
    let at;
    let ats = /\[['"]{0,1}([\w\s-]+?)['"]{0,1}=['"]{0,1}([\w\s-]+?)['"]{0,1}\]/gm;
    if (id)
        p.push(attr `id` `${id[1]}`);
    if (cl)
        p.push(attr `class` `${cl[1].replace(/\./g, ' ')}`);
    while (at = ats.exec(str))
        p.push(attr `${at[1]}` `${at[2]}`);
    return Creator.domo(tag[1], ...p);
};
export const css = (strs, ...vals) => Creator.domo('style', attr `type` `text/css`, text `${String.raw(strs, ...vals)}`);
// -----------------------------------------------------------------------------
// --- ATTRIBUTES --------------------------------------------------------------
// -----------------------------------------------------------------------------
export const text = (strs, ...vals) => Creator.text(String.raw(strs, ...vals));
export const attr = (astrs, ...avals) => (bstrs, ...bvals) => Creator.attr(String.raw(astrs, ...avals), String.raw(bstrs, ...bvals));
export const data = (astrs, ...avals) => (bstrs, ...bvals) => Creator.attr(`data-${String.raw(astrs, ...avals)}`, String.raw(bstrs, ...bvals));
export const evnt = (astrs, ...avals) => (_, callback, captureOrOptions = false) => Creator.evnt(String.raw(astrs, ...avals), callback, captureOrOptions);
//# sourceMappingURL=syntax.js.map