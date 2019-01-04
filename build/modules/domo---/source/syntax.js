import { Creator } from "./Creators.js";
// -----------------------------------------------------------------------------
// --- ELEMENTS ----------------------------------------------------------------
// -----------------------------------------------------------------------------
export const template = Creator.template;
export const domo = (strs, ...vals) => (...p) => Creator.domo(String.raw(strs, ...vals), ...p);
export const css = (strs, ...vals) => Creator.domo('style', attr `type` `text/css`, text `${String.raw(strs, ...vals)}`);
// -----------------------------------------------------------------------------
// --- ATTRIBUTES --------------------------------------------------------------
// -----------------------------------------------------------------------------
export const text = (strs, ...vals) => Creator.text(String.raw(strs, ...vals));
export const attr = (astrs, ...avals) => (bstrs, ...bvals) => Creator.attr(String.raw(astrs, ...avals), String.raw(bstrs, ...bvals));
export const data = (astrs, ...avals) => (bstrs, ...bvals) => Creator.attr(`data-${String.raw(astrs, ...avals)}`, String.raw(bstrs, ...bvals));
export const evnt = (astrs, ...avals) => (_, callback, captureOrOptions = false) => Creator.evnt(String.raw(astrs, ...avals), callback, captureOrOptions);
//# sourceMappingURL=syntax.js.map