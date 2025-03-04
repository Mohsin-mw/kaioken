export {
  isVNode,
  isValidChild,
  propFilters,
  selfClosingTags,
  svgTags,
  propToHtmlAttr,
  propValueToHtmlAttrValue,
  booleanAttributes,
}

function isVNode(thing: unknown): thing is Kaioken.VNode {
  return typeof thing === "object" && thing !== null && "type" in thing
}

function isValidChild(child: unknown) {
  return child !== null && child !== undefined && typeof child !== "boolean"
}

const propFilters = {
  internalProps: ["children", "ref"],
  isEvent: (key: string) => key.startsWith("on"),
  isProperty: (key: string) =>
    !propFilters.internalProps.includes(key) && !propFilters.isEvent(key),
}

const selfClosingTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]

const svgTags = [
  "svg",
  "clipPath",
  "circle",
  "ellipse",
  "g",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
]

const booleanAttributes = [
  "readonly",
  "disabled",
  "checked",
  "required",
  "hidden",
  "autofocus",
  "multiple",
  "selected",
  "autoplay",
  "controls",
  "download",
  "spellcheck",
  "draggable",
  "async",
  "defer",
  "sandbox",
  "novalidate",
  "contenteditable",
  "translate",
  "allowfullscreen",
  "hidden",
  "scoped",
  "default",
  "sortable",
  "wrap",
  "ismap",
  "nohref",
  "noresize",
  "nowrap",
  "compact",
  "declare",
  "noshade",
]

function propToHtmlAttr(key: string) {
  switch (key) {
    case "className":
      return "class"
    case "htmlFor":
      return "for"
    case "tabIndex":
    case "formAction":
    case "formMethod":
    case "formEncType":
    case "contentEditable":
    case "spellCheck":
    case "allowFullScreen":
    case "autoPlay":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "noModule":
    case "noValidate":
    case "playsInline":
    case "readOnly":
    case "itemscope":
    case "rowSpan":
    case "crossOrigin":
      return key.toLowerCase()

    default:
      if (key.startsWith("aria"))
        return "aria-" + key.substring(4).toLowerCase()

      return snakeCaseAttrs.get(key) || key
  }
}

const snakeCaseAttrs = new Map([
  ["acceptCharset", "accept-charset"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["httpEquiv", "http-equiv"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"],
])

function styleObjectToCss(obj: Partial<CSSStyleDeclaration>) {
  let cssString = ""
  for (const key in obj) {
    const cssKey = key.replace(/[A-Z]/g, "-$&").toLowerCase()
    cssString += `${cssKey}:${obj[key]};`
  }
  return cssString
}

function propValueToHtmlAttrValue(key: string, value: unknown) {
  switch (key) {
    case "style":
      if (typeof value === "object" && !!value) return styleObjectToCss(value)
    default:
      return String(value)
  }
}
