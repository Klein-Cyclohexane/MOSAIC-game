/**
 * MOSAIC | Homepage overall principle animation
 * allprinciple_v8
 *
 * Built from the interaction/visual language of mechanism.js,
 * mosaic-expansion-test-v6.js and magnetic.js, but packaged as one
 * self-contained homepage widget so the Cre outcome can be carried as real
 * structured circuit data into the Bxb1 step.
 *
 * Integration:
 *   <link rel="stylesheet" href="PATH/allprinciple.css">
 *   <script defer src="PATH/magnetic.js"></script>  // omit when wiki already loads it
 *   <script defer src="PATH/allprinciple.js"></script>
 *   <div id="mosaic-allprinciple-animation"></div>
 *
 * Optional pre-load config override:
 *   window.MOSAIC_ALLPRINCIPLE_CONFIG = { assetPath: '.../assets/' };
 */
(function () {
  "use strict";

  var SCRIPT = document.currentScript;
  var SVG_NS = "http://www.w3.org/2000/svg";
  var XLINK_NS = "http://www.w3.org/1999/xlink";
  var WIDTH = 1120;
  var USER_CONFIG = window.MOSAIC_ALLPRINCIPLE_CONFIG || {};

  function dirnameOfScript() {
    try {
      if (SCRIPT && SCRIPT.src) return new URL(".", SCRIPT.src).href;
    } catch (e) {}
    return "";
  }

  var SCRIPT_DIR = dirnameOfScript();
  var ASSET_PATH =
    USER_CONFIG.assetPath ||
    (SCRIPT_DIR ? new URL("assets/", SCRIPT_DIR).href : "assets/");

  // -------------------------------------------------------------------------
  // CONFIG — centralized parameters requested for future tuning.
  // All internal coordinates use a 1120-wide SVG reference system.
  // -------------------------------------------------------------------------
  var CONFIG = {
    width: WIDTH,
    colors: {
      bg: "#000000",
      white: "#ffffff",
      textMuted: "#a7a7ad",
      gfp: "#24b8ec",
      mcherry: "#ee7954",
      attB: "#e84d85",
      attP: "#9b6ca8",
      lox71: "#c6da58",
      lox66: "#2ec4b6",
      lox72: "#c6da58",
      loxP: "#2ec4b6",
      attL: "#860167",
      promoterInactive: "#85858b",
      // Exact fills read from the supplied terminal-layout PPT.
      creGene: "#94C664",
      bxb1Gene: "#4198AC",
    },
    assets: {
      cre: ASSET_PATH + "cre.png",
      bxb1: ASSET_PATH + "bxb1.png",
    },
    timing: {
      axis: 520,
      gene: 360,
      promoter: 360,
      inducerFade: 240,
      inducerGuide: 520,
      transcriptionArrow: 360,
      // Expression dots should reveal briskly, matching the transcription-arrow travel.
      expressionDots: 360,
      enzyme: 420,
      circuitBackbone: 780,
      // Ordinary circuit elements flow in continuously; lox sites are synchronized
      // to the end of their corresponding guide paths (see revealCreGuide).
      circuitElement: 150,
      circuitElementStagger: 28,
      loxReveal: 180,
      guideSegment: 360,
      creGuideVertical: 320,
      creGuideShared: 600,
      creGuideTrunk: 962,
      creGuideHorizontal: 620,
      creGuideDrop: 390,
      inversion: 920,
      outcomeMove: 900,
      bridge: 760,
      attReveal: 440,
      // Crossfade Cre-era lox labels into Bxb1-era att labels smoothly.
      labelCrossfade: 1250,
      pairWait: 1000,
      invalidHold: 3000,
      bxbRecombination: 820,
      promoterGlow: 900,
      restartFade: 300,
    },
    layout: {
      startX: 62,
      gap: 14,
      widths: {
        gene: 118,
        mcherry: 124,
        site: 28,
        promoter: 44,
        ns: 92,
      },
      axisWidth: 2.25,
      siteHeight: 34,
      geneHeight: 32,
      nsHeight: 32,
      siteLabelDY: 42,
      font: {
        gene: 17,
        site: 14,
        ns: 15,
        helper: 20,
        outcome: 25,
        enzyme: 16,
        inducer: 22,
        restart: 19,
      },
    },
    y: {
      creExpression: 112,
      initialCircuit: 372,
      creOutcome: 610,
      bxbExpression: 820,
      // Pull the product row upward so the Bxb1-to-attL distance is shorter.
      finalCircuit: 1084,
      outcome: 1266,
    },
    expression: {
      cre: {
        axis: { x1: 126, x2: 370 },
        gene: { x: 192, w: 122 },
        promoterX: 164,
        promoterTopDY: -42,
        shortTipX: 222,
        longTipX: 314,
        inducer: { x: 142, dy: 54, text: "arabinose" },
        guide: { x0: 134, turnX: 94, meetDY: -26 },
        dots: { x1: 374, x2: 515, spacing: 8 },
        enzyme: {
          x: 558,
          offsetFromDots: 43,
          size: 84,
          imageScale: 1.0,
          labelDY: 53,
        },
        geneLabel: "Cre",
        geneColor: "#94C664",
      },
      bxb1: {
        axis: { x1: 126, x2: 370 },
        gene: { x: 192, w: 122 },
        promoterX: 164,
        promoterTopDY: -42,
        shortTipX: 222,
        longTipX: 314,
        inducer: { x: 142, dy: 54, text: "aTc" },
        guide: { x0: 134, turnX: 94, meetDY: -26 },
        dots: { x1: 374, x2: 515, spacing: 8 },
        enzyme: {
          x: 558,
          offsetFromDots: 43,
          size: 88,
          imageScale: 1.0,
          labelDY: 56,
        },
        geneLabel: "Bxb1",
        geneColor: "#4198AC",
      },
    },
    creGuide: {
      enzymeX: 558,
      startY: 184,
      sharedY: 214,
      branchOffsetNear: 52,
      branchOffsetMid: 28,
      stopAboveRow: 58,
      lineWidth: 1.7,
      chooseDY: -17,
      chooseOffsetX: -36,
      chooseFont: 28,
      barWidth: 3.2,
      barSpeed: 1120,
      barRatio: 0.2,
      barMin: 11,
      barMax: 34,
    },
    bxbGuide: {
      enzymeX: 558,
      startYFromExpression: -53,
      splitYFromExpression: -105,
      stopBelowRow: 62,
      lineWidth: 1.7,
      chooseOffsetX: 48,
      // Raise the instruction so it no longer collides with the fixed footer notes.
      chooseOffsetY: 25,
      chooseFont: 28,
      barWidth: 3.2,
      barSpeed: 1050,
      barRatio: 0.2,
      barMin: 10,
      barMax: 30,
    },
    bridge: {
      sourceDrop: 56,
      junctionDrop: 102,
      targetGap: 58,
      lineWidth: 1.6,
    },
    finalGuide: {
      startDY: 68,
      junctionY: 956,
      stopAboveFinal: 48,
      lineWidth: 1.7,
    },
    interaction: {
      floatAmplitude: 3.2,
      focusPadX: 8,
      focusPadY: 8,
      focusCorner: 8,
      hitW: 44,
      hitH: 52,
    },
    footerNotes: {
      creText:
        "*Cre recombinase can invert DNA between oppositely oriented lox66/lox71 sites, generating wild-type loxP and low-activity lox72 sites.",
      bxbText:
        "*Bxb1 integrase excises the DNA segment between directly oriented attB and attP sites.",
      bxbDetailText:
        "*Longer intervening sequences between attP and attB reduce Bxb1 recombination probability.",
    },
    responsive: {
      desktopHeightIntro: 520,
      creDoneHeight: 740,
      bxbReadyHeight: 995,
      finalHeight: 1360,
    },
  };

  // Allow selective config overrides without copying the whole object.
  if (USER_CONFIG.colors) Object.assign(CONFIG.colors, USER_CONFIG.colors);
  if (USER_CONFIG.assets) Object.assign(CONFIG.assets, USER_CONFIG.assets);

  // -------------------------------------------------------------------------
  // State machine requested by the brief.
  // -------------------------------------------------------------------------
  var STATES = {
    CRE_EXPRESSION: "CRE_EXPRESSION",
    CRE_GUIDE: "CRE_GUIDE",
    CRE_SITE_REVEAL: "CRE_SITE_REVEAL",
    CRE_SELECT_LOX: "CRE_SELECT_LOX",
    CRE_RECOMBINATION: "CRE_RECOMBINATION",
    CRE_OUTCOME: "CRE_OUTCOME",
    BXB1_EXPRESSION: "BXB1_EXPRESSION",
    BXB1_GUIDE: "BXB1_GUIDE",
    BXB1_SELECT_ATT: "BXB1_SELECT_ATT",
    BXB1_INVALID_PAIR: "BXB1_INVALID_PAIR",
    BXB1_RECOMBINATION: "BXB1_RECOMBINATION",
    FINAL_OUTCOME: "FINAL_OUTCOME",
  };

  // -------------------------------------------------------------------------
  // Runtime variables.
  // -------------------------------------------------------------------------
  var root = null;
  var svg = null;
  var defs = null;
  var layers = {};
  var currentState = null;
  function setState(value) {
    currentState = value;
    queueMicrotask(function () {
      window.dispatchEvent(new CustomEvent("mosaic:state", { detail: currentState }));
    });
  }
  var selectedLox = null;
  var selectedAtts = [];
  var currentCreOutcome = null;
  var currentBxb1Outcome = null;
  var initialRow = null;
  var currentCreRow = null;
  var finalRow = null;
  var creGuide = null;
  var bxbGuide = null;
  var creExpression = null;
  var bxbExpression = null;
  var footerNotes = null;
  var animationEpoch = 0;
  var activeTimeouts = new Set();
  var activeRafs = new Set();
  var listenerCleanups = [];
  var pulseRAF = 0;
  var movingBars = [];
  var floatingSites = [];
  var reducedMotion = !!(
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // -------------------------------------------------------------------------
  // Utility helpers.
  // -------------------------------------------------------------------------
  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }
  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function now() {
    return window.performance && performance.now
      ? performance.now()
      : Date.now();
  }
  function live(epoch) {
    return epoch === animationEpoch && root && root.isConnected;
  }

  function svgEl(tag, attrs, parent) {
    var el = document.createElementNS(SVG_NS, tag);
    if (attrs)
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] === undefined || attrs[k] === null) return;
        if (k === "href") {
          el.setAttributeNS(XLINK_NS, "href", attrs[k]);
          el.setAttribute("href", attrs[k]);
        } else {
          el.setAttribute(k, attrs[k]);
        }
      });
    if (parent) parent.appendChild(el);
    return el;
  }

  function group(parent, attrs) {
    return svgEl("g", attrs || {}, parent);
  }
  function path(parent, d, attrs) {
    var p = svgEl(
      "path",
      Object.assign(
        {
          d: d,
          fill: "none",
          stroke: CONFIG.colors.white,
          "stroke-width": 1.7,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        },
        attrs || {},
      ),
      parent,
    );
    return p;
  }
  function text(parent, x, y, value, size, anchor, weight, cls, fill) {
    var t = svgEl(
      "text",
      {
        x: x,
        y: y,
        fill: fill || CONFIG.colors.white,
        "font-family": "Lexend, system-ui, sans-serif",
        "font-size": size || 16,
        "font-weight": weight || 450,
        "text-anchor": anchor || "middle",
        "dominant-baseline": "central",
        class: cls || "",
      },
      parent,
    );
    t.textContent = value;
    return t;
  }

  function setOpacity(el, v) {
    if (el) el.setAttribute("opacity", String(v));
  }
  function setVisible(el, yes) {
    if (el) setOpacity(el, yes ? 1 : 0);
  }
  function removeNode(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
  function clearLayer(layer) {
    if (layer) while (layer.firstChild) layer.removeChild(layer.firstChild);
  }

  function addListener(el, type, fn, options) {
    if (!el) return;
    el.addEventListener(type, fn, options || false);
    listenerCleanups.push(function () {
      try {
        el.removeEventListener(type, fn, options || false);
      } catch (e) {}
    });
  }

  function clearListeners() {
    listenerCleanups.splice(0).forEach(function (fn) {
      try {
        fn();
      } catch (e) {}
    });
  }

  function timeoutPromise(ms, epoch) {
    if (reducedMotion) ms = Math.min(ms, 30);
    return new Promise(function (resolve) {
      var id = setTimeout(function () {
        activeTimeouts.delete(id);
        resolve(live(epoch));
      }, ms);
      activeTimeouts.add(id);
    });
  }

  function tween(ms, update, epoch) {
    if (reducedMotion) {
      if (live(epoch)) update(1);
      return Promise.resolve(live(epoch));
    }
    return new Promise(function (resolve) {
      var start = now();
      function frame(ts) {
        activeRafs.delete(id);
        if (!live(epoch)) {
          resolve(false);
          return;
        }
        var p = clamp((ts - start) / ms, 0, 1);
        update(p);
        if (p >= 1) {
          resolve(true);
          return;
        }
        id = requestAnimationFrame(frame);
        activeRafs.add(id);
      }
      var id = requestAnimationFrame(frame);
      activeRafs.add(id);
    });
  }

  function cancelAsync() {
    activeTimeouts.forEach(function (id) {
      clearTimeout(id);
    });
    activeTimeouts.clear();
    activeRafs.forEach(function (id) {
      cancelAnimationFrame(id);
    });
    activeRafs.clear();
  }

  function preparePath(p) {
    if (!p) return;
    var len = 1;
    try {
      len = p.getTotalLength();
    } catch (e) {}
    p.__len = len;
    p.style.strokeDasharray = len + " " + len;
    p.style.strokeDashoffset = len;
  }
  function fullPath(p) {
    if (p) p.style.strokeDashoffset = "0";
  }
  function drawPath(p, ms, epoch) {
    if (!p) return Promise.resolve(true);
    if (!p.__len) preparePath(p);
    var len = p.__len;
    return tween(
      ms,
      function (q) {
        p.style.strokeDashoffset = String(len * (1 - q));
      },
      epoch,
    );
  }
  function fade(el, from, to, ms, epoch) {
    if (!el) return Promise.resolve(true);
    setOpacity(el, from);
    return tween(
      ms,
      function (q) {
        setOpacity(el, from + (to - from) * q);
      },
      epoch,
    );
  }
  function scaleFade(el, ms, epoch) {
    if (!el) return Promise.resolve(true);
    var baseTransform =
      el.__baseTransform || el.getAttribute("transform") || "";
    return tween(
      ms,
      function (q) {
        var s = (0.78 + q * 0.22).toFixed(3);
        setOpacity(el, q);
        if (baseTransform)
          el.setAttribute("transform", baseTransform + " scale(" + s + ")");
        else {
          el.style.transformBox = "fill-box";
          el.style.transformOrigin = "center";
          el.style.transform = "scale(" + s + ")";
        }
      },
      epoch,
    ).then(function (ok) {
      if (!el) return ok;
      if (baseTransform) el.setAttribute("transform", baseTransform);
      else el.style.transform = "";
      return ok;
    });
  }

  function setHeight(h) {
    if (!svg) return;
    svg.setAttribute("viewBox", "0 0 " + WIDTH + " " + h);
    svg.setAttribute("height", h);
  }
  function animateHeight(h, ms, epoch) {
    var vb = (svg.getAttribute("viewBox") || "0 0 1120 520")
      .split(/\s+/)
      .map(Number);
    var from = vb[3] || 520;
    return tween(
      ms,
      function (q) {
        setHeight(from + (h - from) * easeInOut(q));
      },
      epoch,
    );
  }

  function bindMagnetic(nodes) {
    if (window.mosaicMagnetic && window.mosaicMagnetic.bind) {
      try {
        window.mosaicMagnetic.bind(nodes || []);
      } catch (e) {}
    }
  }

  function shadeHex(hex, factor) {
    var h = hex.replace("#", "");
    if (h.length === 3)
      h = h
        .split("")
        .map(function (x) {
          return x + x;
        })
        .join("");
    var n = parseInt(h, 16);
    var r = (n >> 16) & 255,
      g = (n >> 8) & 255,
      b = n & 255;
    r = Math.round(r * factor);
    g = Math.round(g * factor);
    b = Math.round(b * factor);
    return (
      "#" +
      [r, g, b]
        .map(function (v) {
          return v.toString(16).padStart(2, "0");
        })
        .join("")
    );
  }

  // -------------------------------------------------------------------------
  // SVG definitions / filters.
  // -------------------------------------------------------------------------
  function installDefs() {
    defs = svgEl("defs", {}, svg);
    var glow = svgEl(
      "filter",
      { id: "ap-glow", x: "-70%", y: "-70%", width: "240%", height: "240%" },
      defs,
    );
    svgEl("feGaussianBlur", { stdDeviation: 4.2, result: "blur" }, glow);
    var merge = svgEl("feMerge", {}, glow);
    svgEl("feMergeNode", { in: "blur" }, merge);
    svgEl("feMergeNode", { in: "SourceGraphic" }, merge);

    var strong = svgEl(
      "filter",
      {
        id: "ap-strong-glow",
        x: "-100%",
        y: "-100%",
        width: "300%",
        height: "300%",
      },
      defs,
    );
    svgEl("feGaussianBlur", { stdDeviation: 6.5, result: "b" }, strong);
    var merge2 = svgEl("feMerge", {}, strong);
    svgEl("feMergeNode", { in: "b" }, merge2);
    svgEl("feMergeNode", { in: "SourceGraphic" }, merge2);
  }

  // -------------------------------------------------------------------------
  // Circuit data model — the central requirement of this animation.
  // No NS×n abstraction is used anywhere.
  // -------------------------------------------------------------------------
  function element(id, type, opts) {
    return Object.assign({ id: id, type: type, orientation: 1 }, opts || {});
  }

  function initialElements() {
    return [
      element("gfp", "gene", {
        label: "GFP",
        color: CONFIG.colors.gfp,
        orientation: -1,
        width: CONFIG.layout.widths.gene,
      }),
      element("attB_left", "site", {
        site: "attB",
        role: "attLeft",
        color: CONFIG.colors.attB,
        orientation: 1,
        width: CONFIG.layout.widths.site,
      }),
      // Left promoter lies between left attB and attP and points right.
      element("promoter_R", "promoter", {
        role: "promR",
        orientation: 1,
        width: CONFIG.layout.widths.promoter,
      }),
      element("attP", "site", {
        site: "attP",
        role: "attP",
        color: CONFIG.colors.attP,
        orientation: 1,
        width: CONFIG.layout.widths.site,
      }),
      // Right-side promoter is between attP and lox66. It is OUTSIDE the Cre inversion span.
      element("promoter_L", "promoter", {
        role: "promL",
        orientation: -1,
        width: CONFIG.layout.widths.promoter,
        creProtected: true,
      }),
      element("lox66", "site", {
        site: "lox66",
        role: "lox66",
        color: CONFIG.colors.lox66,
        orientation: 1,
        width: CONFIG.layout.widths.site,
      }),
      element("mcherry", "gene", {
        label: "mCherry",
        color: CONFIG.colors.mcherry,
        orientation: -1,
        width: CONFIG.layout.widths.mcherry,
      }),
      element("attB_right", "site", {
        site: "attB",
        role: "attRight",
        color: CONFIG.colors.attB,
        orientation: -1,
        width: CONFIG.layout.widths.site,
      }),
      element("ns1", "ns", { label: "ns", width: CONFIG.layout.widths.ns }),
      element("lox71_1", "site", {
        site: "lox71",
        role: "loxChoice",
        choice: 1,
        color: CONFIG.colors.lox71,
        orientation: -1,
        width: CONFIG.layout.widths.site,
      }),
      element("ns2", "ns", { label: "ns", width: CONFIG.layout.widths.ns }),
      element("lox71_2", "site", {
        site: "lox71",
        role: "loxChoice",
        choice: 2,
        color: CONFIG.colors.lox71,
        orientation: -1,
        width: CONFIG.layout.widths.site,
      }),
      element("ns3", "ns", { label: "ns", width: CONFIG.layout.widths.ns }),
      element("lox71_3", "site", {
        site: "lox71",
        role: "loxChoice",
        choice: 3,
        color: CONFIG.colors.lox71,
        orientation: -1,
        width: CONFIG.layout.widths.site,
      }),
    ];
  }

  function cloneElements(arr) {
    return arr.map(function (e) {
      return Object.assign({}, e);
    });
  }

  function describeState(arr) {
    return arr.map(function (e, i) {
      return Object.assign({}, e, { order: i });
    });
  }

  function buildCreOutcome(choice) {
    var arr = cloneElements(initialElements());
    var i66 = arr.findIndex(function (e) {
      return e.id === "lox66";
    });
    var targetId = "lox71_" + choice;
    var i71 = arr.findIndex(function (e) {
      return e.id === targetId;
    });
    if (i66 < 0 || i71 < 0 || i71 <= i66) throw new Error("Invalid Cre choice");

    var before = arr.slice(0, i66);
    var segment = arr
      .slice(i66, i71 + 1)
      .reverse()
      .map(function (e) {
        var c = Object.assign({}, e);
        if (typeof c.orientation === "number") c.orientation *= -1;
        return c;
      });
    var after = arr.slice(i71 + 1);

    // Recombined boundary identities: chosen lox71 side -> lox72;
    // original lox66 side -> loxP. Intermediate lox71 sites remain lox71.
    segment[0] = Object.assign({}, segment[0], {
      id: "lox72",
      site: "lox72",
      role: "lox72",
      color: CONFIG.colors.lox72,
    });
    segment[segment.length - 1] = Object.assign(
      {},
      segment[segment.length - 1],
      {
        id: "loxP",
        site: "loxP",
        role: "loxP",
        color: CONFIG.colors.loxP,
      },
    );

    var out = describeState(before.concat(segment, after));
    return {
      choice: choice,
      elements: out,
      nsCount: out.filter(function (e) {
        return e.type === "ns";
      }).length,
      sites: {
        lox72: out.find(function (e) {
          return e.id === "lox72";
        }),
        loxP: out.find(function (e) {
          return e.id === "loxP";
        }),
      },
      promoters: {
        right: out.find(function (e) {
          return e.id === "promoter_R";
        }),
        left: out.find(function (e) {
          return e.id === "promoter_L";
        }),
      },
    };
  }

  function getAttElements(elements) {
    return elements.filter(function (e) {
      return e.type === "site" && (e.site === "attB" || e.site === "attP");
    });
  }

  function buildBxbOutcome(elements, pairIds) {
    var src = cloneElements(elements);
    var a = src.findIndex(function (e) {
      return e.id === pairIds[0];
    });
    var b = src.findIndex(function (e) {
      return e.id === pairIds[1];
    });
    if (a > b) {
      var tmp = a;
      a = b;
      b = tmp;
    }
    if (a < 0 || b < 0 || a === b) throw new Error("Invalid Bxb1 pair");
    var left = src[a],
      right = src[b];
    var valid =
      (left.site === "attB" && right.site === "attP") ||
      (left.site === "attP" && right.site === "attB");
    if (!valid) return { valid: false };

    var attP = left.site === "attP" ? left : right;
    var attB = left.site === "attB" ? left : right;
    var side = attB.role === "attLeft" ? "left" : "right";
    var attL = element("attL_" + side, "site", {
      site: "attL",
      role: "attL",
      color: CONFIG.colors.attL,
      orientation: 1,
      width: CONFIG.layout.widths.site,
    });
    var result = describeState(
      src.slice(0, a).concat([attL], src.slice(b + 1)),
    );
    return {
      valid: true,
      side: side,
      pairIds: [left.id, right.id],
      elements: result,
      nsCount: result.filter(function (e) {
        return e.type === "ns";
      }).length,
      outcome: side === "left" ? "green" : "red",
      promoterRole: side === "left" ? "promL" : "promR",
    };
  }

  // -------------------------------------------------------------------------
  // Drawing primitives shared with the supplied mechanism/expansion style.
  // -------------------------------------------------------------------------
  function blockPoints(w, h, dir) {
    var tip = h / 2;
    return dir > 0
      ? "0," +
          -tip +
          " " +
          (w - tip) +
          "," +
          -tip +
          " " +
          w +
          ",0 " +
          (w - tip) +
          "," +
          tip +
          " 0," +
          tip
      : "0,0 " +
          tip +
          "," +
          -tip +
          " " +
          w +
          "," +
          -tip +
          " " +
          w +
          "," +
          tip +
          " " +
          tip +
          "," +
          tip;
  }
  function sitePoints(w, h, dir) {
    var half = h / 2;
    return dir > 0
      ? "0," + -half + " " + w + ",0 0," + half
      : w + "," + -half + " 0,0 " + w + "," + half;
  }

  function drawPromoterGlyph(parent, x, y, orientation, color) {
    color = color || CONFIG.colors.white;
    var g0 = group(parent, { transform: "translate(" + x + "," + y + ")" });
    var top = orientation > 0 ? -31 : 31;
    var from = orientation > 0 ? -18 : 18;
    var tip = orientation > 0 ? 19 : -19;
    var d = "M " + from + " 0 V " + top + " H " + tip;
    var ink = path(g0, d, { stroke: color, "stroke-width": 2.1 });
    var head = svgEl(
      "polygon",
      {
        points:
          orientation > 0
            ? tip -
              7 +
              "," +
              (top - 5) +
              " " +
              (tip + 2) +
              "," +
              top +
              " " +
              (tip - 7) +
              "," +
              (top + 5)
            : tip +
              7 +
              "," +
              (top - 5) +
              " " +
              (tip - 2) +
              "," +
              top +
              " " +
              (tip + 7) +
              "," +
              (top + 5),
        fill: color,
      },
      g0,
    );
    var glow = path(g0, d, {
      stroke: CONFIG.colors.white,
      "stroke-width": 5.5,
      opacity: 0,
      filter: "url(#ap-strong-glow)",
    });
    return { node: g0, ink: ink, head: head, glow: glow, role: "promoter" };
  }

  function makeFocusCorners(parent, x, y, w, h) {
    var padX = CONFIG.interaction.focusPadX,
      padY = CONFIG.interaction.focusPadY;
    var c = CONFIG.interaction.focusCorner;
    var left = x - w / 2 - padX,
      right = x + w / 2 + padX;
    var top = y - h / 2 - padY,
      bottom = y + h / 2 + padY;
    var g0 = group(parent, {
      class: "ap-focus-corners",
      "pointer-events": "none",
    });
    var opts = {
      stroke: CONFIG.colors.white,
      "stroke-width": 1.6,
      "stroke-linecap": "round",
      opacity: 0.95,
    };
    // top-left
    svgEl(
      "line",
      Object.assign({ x1: left, y1: top, x2: left + c, y2: top }, opts),
      g0,
    );
    svgEl(
      "line",
      Object.assign({ x1: left, y1: top, x2: left, y2: top + c }, opts),
      g0,
    );
    // top-right
    svgEl(
      "line",
      Object.assign({ x1: right - c, y1: top, x2: right, y2: top }, opts),
      g0,
    );
    svgEl(
      "line",
      Object.assign({ x1: right, y1: top, x2: right, y2: top + c }, opts),
      g0,
    );
    // bottom-left
    svgEl(
      "line",
      Object.assign({ x1: left, y1: bottom, x2: left + c, y2: bottom }, opts),
      g0,
    );
    svgEl(
      "line",
      Object.assign({ x1: left, y1: bottom - c, x2: left, y2: bottom }, opts),
      g0,
    );
    // bottom-right
    svgEl(
      "line",
      Object.assign({ x1: right - c, y1: bottom, x2: right, y2: bottom }, opts),
      g0,
    );
    svgEl(
      "line",
      Object.assign({ x1: right, y1: bottom - c, x2: right, y2: bottom }, opts),
      g0,
    );
    return g0;
  }

  function createCircuitRow(parent, elements, y, options) {
    options = options || {};
    var data = cloneElements(elements);
    var gap = options.gap !== undefined ? options.gap : CONFIG.layout.gap;
    var contentWidth =
      data.reduce(function (sum, e) {
        return sum + e.width;
      }, 0) +
      Math.max(0, data.length - 1) * gap;
    // Center every circuit row independently. Cre and Bxb1 outcomes can have
    // different lengths, but neither should drift to one side of the canvas.
    var x =
      options.startX !== undefined
        ? options.startX
        : (WIDTH - contentWidth) / 2;
    var rowStartX = x;
    data.forEach(function (e, idx) {
      e.order = idx;
      e.x = x;
      e.center = x + e.width / 2;
      x += e.width + gap;
    });
    var axisStart =
      options.axisStart !== undefined ? options.axisStart : rowStartX - 16;
    var axisEnd = x - gap + 18;

    var wrap = group(parent, {
      transform: "translate(0," + y + ")",
      "data-circuit-row": options.name || "",
    });
    var backbone = path(wrap, "M " + axisStart + " 0 H " + axisEnd, {
      "stroke-width": CONFIG.layout.axisWidth,
    });
    preparePath(backbone);
    var parts = [];
    var byId = {};

    data.forEach(function (e) {
      var p = {
        data: e,
        x: e.x,
        center: e.center,
        width: e.width,
        y: y,
        selected: false,
        hover: false,
      };
      var node = group(wrap, {
        transform: "translate(" + e.x + ",0)",
        "data-element-id": e.id,
      });
      p.node = node;
      p.floatNode = group(node, {});
      if (e.type === "gene") {
        p.paint = svgEl(
          "polygon",
          {
            points: blockPoints(
              e.width,
              CONFIG.layout.geneHeight,
              e.orientation,
            ),
            fill: e.color,
          },
          p.floatNode,
        );
        p.baseColor = e.color;
        text(
          p.floatNode,
          e.width / 2,
          0,
          e.label,
          CONFIG.layout.font.gene,
          "middle",
          600,
          "",
          CONFIG.colors.white,
        );
      } else if (e.type === "ns") {
        p.frame = svgEl(
          "rect",
          {
            x: 0,
            y: -CONFIG.layout.nsHeight / 2,
            width: e.width,
            height: CONFIG.layout.nsHeight,
            rx: CONFIG.layout.nsHeight / 2,
            fill: CONFIG.colors.bg,
            stroke: CONFIG.colors.white,
            "stroke-width": 2.4,
          },
          p.floatNode,
        );
        text(
          p.floatNode,
          e.width / 2,
          0,
          "ns",
          CONFIG.layout.font.ns,
          "middle",
          500,
        );
      } else if (e.type === "site") {
        p.paint = svgEl(
          "polygon",
          {
            points: sitePoints(
              e.width,
              CONFIG.layout.siteHeight,
              e.orientation,
            ),
            fill: e.color,
            class: "ap-site-glyph",
          },
          p.floatNode,
        );
        p.baseColor = e.color;
        p.label = text(
          p.floatNode,
          e.width / 2,
          CONFIG.layout.siteLabelDY,
          e.site,
          CONFIG.layout.font.site,
          "middle",
          500,
          "ap-site-label",
        );
        setOpacity(p.label, 0);
        p.hit = svgEl(
          "rect",
          {
            x: e.width / 2 - CONFIG.interaction.hitW / 2,
            y: -CONFIG.interaction.hitH / 2,
            width: CONFIG.interaction.hitW,
            height: CONFIG.interaction.hitH,
            rx: 5,
            tabindex: 0,
            role: "button",
            "aria-label": "Select " + e.site,
            class: "ap-hit",
          },
          node,
        );
        p.hit.style.pointerEvents = "none";
      } else if (e.type === "promoter") {
        var promoterColor =
          options.mode === "bxb"
            ? CONFIG.colors.promoterInactive
            : CONFIG.colors.white;
        var pr = drawPromoterGlyph(
          p.floatNode,
          e.width / 2,
          0,
          e.orientation,
          promoterColor,
        );
        p.promoter = pr;
        p.ink = pr.ink;
        p.glow = pr.glow;
        p.head = pr.head;
      }
      setOpacity(node, options.instant ? 1 : 0);
      parts.push(p);
      byId[e.id] = p;
    });

    var rowObj = {
      wrap: wrap,
      backbone: backbone,
      parts: parts,
      byId: byId,
      elements: data,
      y: y,
      axisStart: axisStart,
      axisEnd: axisEnd,
      mode: options.mode || "none",
      name: options.name || "",
    };
    if (options.instant) {
      fullPath(backbone);
      setLabelMode(rowObj, options.mode || "none");
    }
    return rowObj;
  }

  function setLabelMode(rowObj, mode) {
    if (!rowObj) return;
    rowObj.mode = mode;
    rowObj.parts.forEach(function (p) {
      if (!p.label) return;
      var s = p.data.site;
      var show = false;
      if (mode === "cre") show = s.indexOf("lox") === 0;
      if (mode === "bxb") show = s.indexOf("att") === 0;
      if (mode === "all") show = true;
      setOpacity(p.label, show ? 1 : 0);
    });
  }

  function currentOpacity(el) {
    if (!el) return 0;
    var value = parseFloat(el.getAttribute("opacity"));
    return Number.isFinite(value) ? value : 1;
  }

  // Crossfade labels on the same circuit row. The unrecombined initial row
  // keeps its lox annotations; only the active Cre-outcome row switches to att.
  async function crossfadeCircuitLabelsToBxb(rowObj, epoch) {
    if (!rowObj) return false;
    var jobs = [];
    rowObj.parts.forEach(function (p) {
      if (!p.label) return;
      var siteName = p.data.site || "";
      if (siteName.indexOf("lox") === 0) {
        jobs.push(
          fade(
            p.label,
            currentOpacity(p.label),
            0,
            CONFIG.timing.labelCrossfade,
            epoch,
          ),
        );
      } else if (siteName.indexOf("att") === 0) {
        jobs.push(
          fade(
            p.label,
            currentOpacity(p.label),
            1,
            CONFIG.timing.labelCrossfade,
            epoch,
          ),
        );
      }
    });
    var results = await Promise.all(jobs);
    return (
      live(epoch) &&
      results.every(function (ok) {
        return ok !== false;
      })
    );
  }

  function rowInstant(rowObj, mode) {
    if (!rowObj) return;
    fullPath(rowObj.backbone);
    rowObj.parts.forEach(function (p) {
      setOpacity(p.node, 1);
    });
    setLabelMode(rowObj, mode || rowObj.mode || "none");
  }

  function revealCircuit(rowObj, epoch, options) {
    options = options || {};
    var loxParts = rowObj.parts.filter(function (p) {
      return p.data.type === "site" && p.data.site.indexOf("lox") === 0;
    });
    var early = rowObj.parts.filter(function (p) {
      return loxParts.indexOf(p) < 0;
    });
    // Only the backbone and ordinary elements are handled here. Lox nodes are
    // revealed by revealCreGuide at the exact completion time of their guide.
    return Promise.all([
      drawPath(rowObj.backbone, CONFIG.timing.circuitBackbone, epoch),
      (async function () {
        if (!(await timeoutPromise(130, epoch))) return false;
        for (var i = 0; i < early.length; i++) {
          if (
            !(await timeoutPromise(
              i === 0 ? 0 : CONFIG.timing.circuitElementStagger,
              epoch,
            ))
          )
            return false;
          if (
            !(await fade(
              early[i].node,
              0,
              1,
              CONFIG.timing.circuitElement,
              epoch,
            ))
          )
            return false;
        }
        return true;
      })(),
    ]).then(function (results) {
      return (
        live(epoch) &&
        results.every(function (ok) {
          return ok !== false;
        })
      );
    });
  }

  function dimNonSites(rowObj) {
    // Keep all ordinary circuit elements fully visible without setting inline
    // style.opacity. An inline opacity:1 overrides SVG opacity attributes and
    // silently prevents the later recombination fade from working.
    if (!rowObj) return;
    rowObj.parts.forEach(function (p) {
      p.node.style.removeProperty("opacity");
      setOpacity(p.node, 1);
    });
  }
  function clearDim(rowObj) {
    if (!rowObj) return;
    // Remove any inline opacity override so animation-driven SVG opacity can work.
    rowObj.parts.forEach(function (p) {
      p.node.style.removeProperty("opacity");
      setOpacity(p.node, 1);
    });
  }

  function setPromoterMode(rowObj, mode) {
    if (!rowObj) return;
    var color =
      mode === "inactive"
        ? CONFIG.colors.promoterInactive
        : CONFIG.colors.white;
    rowObj.parts.forEach(function (p) {
      if (p.data.type !== "promoter" || !p.promoter) return;
      p.promoter.ink.setAttribute("stroke", color);
      p.promoter.head.setAttribute("fill", color);
      setOpacity(p.promoter.glow, 0);
    });
  }

  function getPartByRole(rowObj, role) {
    return rowObj.parts.find(function (p) {
      return p.data.role === role;
    });
  }
  function getParts(rowObj, predicate) {
    return rowObj.parts.filter(predicate);
  }

  // -------------------------------------------------------------------------
  // Expression modules (Cre and Bxb1) — shared implementation.
  // -------------------------------------------------------------------------
  function expressionEnzymeX(type) {
    var cfg = CONFIG.expression[type];
    return typeof cfg.enzyme.offsetFromDots === "number"
      ? cfg.dots.x2 + cfg.enzyme.offsetFromDots
      : cfg.enzyme.x;
  }

  function createExpressionModule(parent, type, baseY) {
    var cfg = CONFIG.expression[type];
    var enzymeX = expressionEnzymeX(type);
    var g0 = group(parent, { "data-expression": type });
    var ax = path(g0, "M " + cfg.axis.x1 + " " + baseY + " H " + cfg.axis.x2, {
      "stroke-width": CONFIG.layout.axisWidth,
    });
    preparePath(ax);

    var gene = group(g0, {
      transform: "translate(" + cfg.gene.x + "," + baseY + ")",
    });
    var genePoly = svgEl(
      "polygon",
      { points: blockPoints(cfg.gene.w, 32, 1), fill: cfg.geneColor },
      gene,
    );
    text(gene, cfg.gene.w / 2, 0, cfg.geneLabel, 18, "middle", 500);
    setOpacity(gene, 0);

    var pTopY = baseY + cfg.promoterTopDY;
    var promoter = path(
      g0,
      "M " +
        cfg.promoterX +
        " " +
        baseY +
        " V " +
        pTopY +
        " H " +
        cfg.shortTipX,
      { "stroke-width": 2.2 },
    );
    preparePath(promoter);
    var arrowHead = svgEl(
      "polygon",
      {
        points: arrowTriangle(cfg.shortTipX, pTopY),
        fill: CONFIG.colors.white,
        opacity: 0,
      },
      g0,
    );

    var inducer = text(
      g0,
      cfg.inducer.x,
      baseY + cfg.inducer.dy,
      cfg.inducer.text,
      CONFIG.layout.font.inducer,
      "start",
      430,
      "ap-inducer",
    );
    setOpacity(inducer, 0);

    var guide = path(
      g0,
      "M " +
        cfg.guide.x0 +
        " " +
        (baseY + cfg.inducer.dy) +
        " H " +
        cfg.guide.turnX +
        " V " +
        (baseY + cfg.guide.meetDY) +
        " H " +
        cfg.promoterX,
      { "stroke-width": 2.1 },
    );
    preparePath(guide);

    var extend = path(
      g0,
      "M " + cfg.shortTipX + " " + pTopY + " H " + cfg.longTipX,
      { "stroke-width": 2.2 },
    );
    preparePath(extend);

    var dots = [];
    for (var x = cfg.dots.x1; x <= cfg.dots.x2; x += cfg.dots.spacing) {
      var d = svgEl(
        "circle",
        { cx: x, cy: baseY, r: 2.15, fill: CONFIG.colors.white, opacity: 0 },
        g0,
      );
      dots.push(d);
    }

    var eg = group(g0, {
      transform: "translate(" + enzymeX + "," + baseY + ")",
    });
    eg.__baseTransform = "translate(" + enzymeX + "," + baseY + ")";
    var s = cfg.enzyme.size;
    var img = svgEl(
      "image",
      { x: -s / 2, y: -s / 2, width: s, height: s, href: CONFIG.assets[type] },
      eg,
    );
    img.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var lab = text(
      eg,
      0,
      cfg.enzyme.labelDY,
      cfg.geneLabel,
      CONFIG.layout.font.enzyme,
      "middle",
      450,
      "ap-enzyme-label",
    );
    setOpacity(eg, 0);

    return {
      group: g0,
      axis: ax,
      gene: gene,
      genePoly: genePoly,
      promoter: promoter,
      arrowHead: arrowHead,
      inducer: inducer,
      guide: guide,
      extend: extend,
      dots: dots,
      enzyme: eg,
      baseY: baseY,
      cfg: cfg,
    };
  }

  function arrowTriangle(x, y) {
    return (
      x -
      10 +
      "," +
      (y - 6) +
      " " +
      (x + 1) +
      "," +
      y +
      " " +
      (x - 10) +
      "," +
      (y + 6)
    );
  }

  async function playExpression(mod, epoch) {
    await drawPath(mod.axis, CONFIG.timing.axis, epoch);
    if (!live(epoch)) return false;
    await Promise.all([
      fade(mod.gene, 0, 1, CONFIG.timing.gene, epoch),
      drawPath(mod.promoter, CONFIG.timing.promoter, epoch),
    ]);
    if (!live(epoch)) return false;
    setOpacity(mod.arrowHead, 1);
    await fade(mod.inducer, 0, 1, CONFIG.timing.inducerFade, epoch);
    await drawPath(mod.guide, CONFIG.timing.inducerGuide, epoch);
    if (!live(epoch)) return false;
    await tween(
      CONFIG.timing.transcriptionArrow,
      function (q) {
        var len = mod.extend.__len || 1;
        mod.extend.style.strokeDashoffset = String(len * (1 - q));
        var hx = mod.cfg.shortTipX + (mod.cfg.longTipX - mod.cfg.shortTipX) * q;
        mod.arrowHead.setAttribute(
          "points",
          arrowTriangle(hx, mod.baseY + mod.cfg.promoterTopDY),
        );
      },
      epoch,
    );
    if (!live(epoch)) return false;
    await tween(
      CONFIG.timing.expressionDots,
      function (q) {
        // A single moving reveal front: each dot fades in only as the front reaches it.
        var front = q * (mod.dots.length + 1);
        mod.dots.forEach(function (d, i) {
          setOpacity(d, clamp(front - i, 0, 1));
        });
      },
      epoch,
    );
    await scaleFade(mod.enzyme, CONFIG.timing.enzyme, epoch);
    return live(epoch);
  }

  function expressionInstant(mod) {
    fullPath(mod.axis);
    setOpacity(mod.gene, 1);
    fullPath(mod.promoter);
    setOpacity(mod.arrowHead, 1);
    setOpacity(mod.inducer, 1);
    fullPath(mod.guide);
    fullPath(mod.extend);
    mod.arrowHead.setAttribute(
      "points",
      arrowTriangle(mod.cfg.longTipX, mod.baseY + mod.cfg.promoterTopDY),
    );
    mod.dots.forEach(function (d) {
      setOpacity(d, 1);
    });
    setOpacity(mod.enzyme, 1);
  }

  // -------------------------------------------------------------------------
  // Moving bars / floating interaction pulse.
  // -------------------------------------------------------------------------
  function registerMovingBar(
    rect,
    startY,
    endY,
    direction,
    ratio,
    minLen,
    maxLen,
  ) {
    var length = Math.abs(endY - startY);
    var barLen = clamp(length * (ratio || 0.2), minLen || 10, maxLen || 36);
    movingBars.push({
      rect: rect,
      startY: startY,
      endY: endY,
      direction: direction || 1,
      length: barLen,
      startedAt: now(),
      speed:
        direction === -1 ? CONFIG.bxbGuide.barSpeed : CONFIG.creGuide.barSpeed,
      active: true,
    });
  }
  function unregisterBarsFor(groupNode) {
    movingBars = movingBars.filter(function (b) {
      return !(groupNode && groupNode.contains(b.rect));
    });
  }

  function pulseLoop(ts) {
    if (!root) return;
    var tick = ts * 0.0022;
    floatingSites.forEach(function (p) {
      if (!p || !p.floatNode || !p.floatNode.isConnected) return;
      if (p.selected || p.hover)
        p.floatNode.setAttribute("transform", "translate(0,0)");
      else
        p.floatNode.setAttribute(
          "transform",
          "translate(0," +
            (
              Math.sin(tick + p.floatPhase) * CONFIG.interaction.floatAmplitude
            ).toFixed(2) +
            ")",
        );
    });
    movingBars.forEach(function (b) {
      if (!b.active || !b.rect || !b.rect.isConnected) return;
      var phase = ((ts - b.startedAt) / b.speed) % 1;
      var minY = Math.min(b.startY, b.endY),
        maxY = Math.max(b.startY, b.endY);
      var track = maxY - minY;
      var movingTop;
      if (b.direction > 0)
        movingTop = minY - b.length + phase * (track + b.length * 2);
      else movingTop = maxY - phase * (track + b.length * 2);
      var top = Math.max(minY, movingTop);
      var bottom = Math.min(maxY, movingTop + b.length);
      b.rect.setAttribute("y", top.toFixed(2));
      b.rect.setAttribute("height", Math.max(0, bottom - top).toFixed(2));
    });
    pulseRAF = requestAnimationFrame(pulseLoop);
  }

  // -------------------------------------------------------------------------
  // CRE guide tree. The longest horizontal is split at the Cre vertical node:
  // first draw from that node leftward to lox66, then extend from that SAME node
  // rightward to the farthest lox71. These two path geometries meet at enzymeX
  // and do not overlap; never start the right continuation at x66.
  // -------------------------------------------------------------------------
  function createCreGuide(parent, rowObj) {
    var cfg = CONFIG.creGuide;
    var enzymeX = expressionEnzymeX("cre");
    var site66 = getPartByRole(rowObj, "lox66");
    var x66 = site66.center;
    var choices = getParts(rowObj, function (p) {
      return p.data.role === "loxChoice";
    }).sort(function (a, b) {
      return a.data.choice - b.data.choice;
    });
    var x1 = choices[0].center,
      x2 = choices[1].center,
      x3 = choices[2].center;
    var stopY = rowObj.y - cfg.stopAboveRow;
    var nearY = cfg.sharedY + cfg.branchOffsetNear;
    var midY = cfg.sharedY + cfg.branchOffsetMid;
    var farY = cfg.sharedY;
    var g0 = group(parent, { "data-guide": "cre" });
    function gp(d, op) {
      var p = path(
        g0,
        d,
        Object.assign(
          {
            "stroke-opacity": 0.62,
            "stroke-width": cfg.lineWidth,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          },
          op || {},
        ),
      );
      preparePath(p);
      return p;
    }
    // Start below the enzyme label, so the white guide never crosses “Cre”.
    var minBelowCreLabel = CONFIG.expression.cre.enzyme.labelDY + 19;
    var guideStartY =
      CONFIG.y.creExpression +
      Math.max(cfg.startY - CONFIG.y.creExpression, minBelowCreLabel);
    var vertical = gp("M " + enzymeX + " " + guideStartY + " V " + cfg.sharedY);
    var sharedLeft = gp("M " + enzymeX + " " + cfg.sharedY + " H " + x66);
    // The right continuation starts at enzymeX only AFTER sharedLeft has
    // completed. Starting at x66 would redraw the enzymeX↔lox66 segment and
    // make the first horizontal look thicker.
    var sharedRight = gp("M " + enzymeX + " " + cfg.sharedY + " H " + x3);
    var trunk66 = gp("M " + x66 + " " + cfg.sharedY + " V " + stopY);
    var branch1 = gp("M " + x66 + " " + nearY + " H " + x1);
    var branch2 = gp("M " + x66 + " " + midY + " H " + x2);
    var drop1 = gp("M " + x1 + " " + nearY + " V " + stopY, {
      "stroke-opacity": 0.5,
    });
    var drop2 = gp("M " + x2 + " " + midY + " V " + stopY, {
      "stroke-opacity": 0.5,
    });
    var drop3 = gp("M " + x3 + " " + farY + " V " + stopY, {
      "stroke-opacity": 0.5,
    });
    var drops = [drop1, drop2, drop3],
      dropYs = [nearY, midY, farY];
    var bars = drops.map(function (p, i) {
      var r = svgEl(
        "rect",
        {
          x: [x1, x2, x3][i] - cfg.barWidth / 2,
          y: dropYs[i],
          width: cfg.barWidth,
          height: 0,
          fill: CONFIG.colors.white,
          opacity: 0,
        },
        g0,
      );
      return r;
    });
    var choose = text(
      g0,
      (x2 + x3) / 2 + cfg.chooseOffsetX,
      cfg.sharedY + cfg.chooseDY,
      "choose one",
      cfg.chooseFont,
      "middle",
      430,
      "ap-choice",
    );
    setOpacity(choose, 0);
    return {
      group: g0,
      vertical: vertical,
      sharedLeft: sharedLeft,
      sharedRight: sharedRight,
      trunk66: trunk66,
      branch1: branch1,
      branch2: branch2,
      drops: drops,
      bars: bars,
      choose: choose,
      x66: x66,
      xs: [x1, x2, x3],
      startYs: dropYs,
      endY: stopY,
      site66: site66,
      choiceSites: choices,
      startY: guideStartY,
    };
  }

  async function revealCreGuide(guide, epoch) {
    await drawPath(guide.vertical, CONFIG.timing.creGuideVertical, epoch);
    // The first horizontal segment grows toward the enzyme junction.
    await drawPath(guide.sharedLeft, CONFIG.timing.creGuideShared, epoch);
    if (!live(epoch)) return false;
    setState(STATES.CRE_SITE_REVEAL);

    // sharedLeft is animated first (enzymeX → x66). Its duration is the exact
    // arrival time for this segment. Only when it completes do we start the
    // right continuation (enzymeX → farthest lox71) from enzymeX; this avoids
    // redrawing any pixels in the enzymeX↔lox66 segment.
    var trunkAndSite = (async function () {
      if (!(await drawPath(guide.trunk66, CONFIG.timing.creGuideTrunk, epoch)))
        return false;
      if (!live(epoch)) return false;
      return fade(guide.site66.node, 0, 1, CONFIG.timing.loxReveal, epoch);
    })();
    var topAndBranches = (async function () {
      if (
        !(await drawPath(
          guide.sharedRight,
          CONFIG.timing.creGuideHorizontal,
          epoch,
        ))
      )
        return [false];
      return Promise.all([
        drawPath(guide.branch1, CONFIG.timing.creGuideHorizontal, epoch),
        drawPath(guide.branch2, CONFIG.timing.creGuideHorizontal + 80, epoch),
      ]);
    })();
    var firstStage = await Promise.all([trunkAndSite, topAndBranches]);
    if (
      !live(epoch) ||
      firstStage[0] === false ||
      firstStage[1].some(function (ok) {
        return !ok;
      })
    )
      return false;

    // Each lox71 appears as its own vertical guide arrives; guide and target stay synchronized.
    var dropsOK = await Promise.all(
      guide.drops.map(async function (p, i) {
        if (!(await drawPath(p, CONFIG.timing.creGuideDrop + i * 80, epoch)))
          return false;
        if (!live(epoch)) return false;
        return fade(
          guide.choiceSites[i].node,
          0,
          1,
          CONFIG.timing.loxReveal,
          epoch,
        );
      }),
    );
    if (
      !live(epoch) ||
      dropsOK.some(function (ok) {
        return !ok;
      })
    )
      return false;
    guide.bars.forEach(function (bar, i) {
      setOpacity(bar, 1);
      registerMovingBar(
        bar,
        guide.startYs[i],
        guide.endY,
        1,
        CONFIG.creGuide.barRatio,
        CONFIG.creGuide.barMin,
        CONFIG.creGuide.barMax,
      );
    });
    await fade(guide.choose, 0, 1, 260, epoch);
    return live(epoch);
  }

  function creGuideInstant(guide) {
    [
      guide.vertical,
      guide.sharedLeft,
      guide.sharedRight,
      guide.trunk66,
      guide.branch1,
      guide.branch2,
    ]
      .concat(guide.drops)
      .forEach(fullPath);
    setOpacity(guide.choose, 1);
    guide.bars.forEach(function (bar, i) {
      setOpacity(bar, 1);
      registerMovingBar(
        bar,
        guide.startYs[i],
        guide.endY,
        1,
        CONFIG.creGuide.barRatio,
        CONFIG.creGuide.barMin,
        CONFIG.creGuide.barMax,
      );
    });
  }

  // -------------------------------------------------------------------------
  // Interaction helpers.
  // -------------------------------------------------------------------------
  function clearSiteInteractions() {
    floatingSites = [];
    clearListeners();
    [initialRow, currentCreRow, finalRow].forEach(function (r) {
      if (!r) return;
      r.parts.forEach(function (p) {
        if (p.hit) p.hit.style.pointerEvents = "none";
        p.selected = false;
        p.hover = false;
      });
    });
  }

  function lockPart(rowObj, part, focusLayer) {
    part.selected = true;
    part.floatNode.setAttribute("transform", "translate(0,0)");
    return makeFocusCorners(
      focusLayer || rowObj.wrap,
      part.center,
      rowObj.y === 0 ? 0 : 0,
      part.width,
      CONFIG.layout.siteHeight,
    );
  }

  function addRowFocus(rowObj, part, targetLayer) {
    // Focus corners are drawn in global coordinates so they are independent of a
    // floating triangle's local transform.
    return makeFocusCorners(
      targetLayer,
      part.center,
      rowObj.y,
      part.width,
      CONFIG.layout.siteHeight,
    );
  }

  function enableCreSelection(epoch) {
    if (!live(epoch) || !initialRow) return;
    clearSiteInteractions();
    setState(STATES.CRE_SELECT_LOX);
    selectedLox = null;
    clearLayer(layers.creFocus);

    var l66 = getPartByRole(initialRow, "lox66");
    l66.selected = true;
    addRowFocus(initialRow, l66, layers.creFocus);

    var choices = getParts(initialRow, function (p) {
      return p.data.role === "loxChoice";
    }).sort(function (a, b) {
      return a.data.choice - b.data.choice;
    });
    choices.forEach(function (p, i) {
      p.floatPhase = i * 0.85;
      p.selected = false;
      p.hover = false;
      p.node.classList.add("ap-site-glow");
      p.node.style.color = CONFIG.colors.lox71;
      p.hit.style.pointerEvents = "all";
      p.hit.setAttribute("aria-label", "Choose lox71 " + p.data.choice);
      addListener(p.hit, "mouseenter", function () {
        p.hover = true;
      });
      addListener(p.hit, "mouseleave", function () {
        p.hover = false;
      });
      function choose(e) {
        if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
        if (e.type === "keydown") e.preventDefault();
        if (currentState !== STATES.CRE_SELECT_LOX || selectedLox) return;
        selectedLox = p.data.choice;
        p.selected = true;
        choices.forEach(function (q) {
          q.hit.style.pointerEvents = "none";
        });
        addRowFocus(initialRow, p, layers.creFocus);
        handleCreChoice(p.data.choice);
      }
      addListener(p.hit, "click", choose);
      addListener(p.hit, "keydown", choose);
      floatingSites.push(p);
    });
    bindMagnetic(
      choices.map(function (p) {
        return p.hit;
      }),
    );
  }

  function enableBxbSelection(epoch) {
    if (!live(epoch) || !currentCreRow) return;
    clearSiteInteractions();
    setState(STATES.BXB1_SELECT_ATT);
    selectedAtts = [];
    clearLayer(layers.bxbFocus);
    setLabelMode(currentCreRow, "bxb");
    setPromoterMode(currentCreRow, "inactive");
    dimNonSites(currentCreRow);
    var att = getParts(currentCreRow, function (p) {
      return (
        p.data.type === "site" &&
        (p.data.site === "attB" || p.data.site === "attP")
      );
    }).sort(function (a, b) {
      return a.data.order - b.data.order;
    });
    att.forEach(function (p, i) {
      p.floatPhase = i * 0.9;
      p.selected = false;
      p.hover = false;
      p.node.classList.add("ap-site-glow");
      p.node.style.color = p.data.color;
      p.hit.style.pointerEvents = "all";
      addListener(p.hit, "mouseenter", function () {
        p.hover = true;
      });
      addListener(p.hit, "mouseleave", function () {
        p.hover = false;
      });
      function choose(e) {
        if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
        if (e.type === "keydown") e.preventDefault();
        if (currentState !== STATES.BXB1_SELECT_ATT || p.selected) return;
        p.selected = true;
        p.floatNode.setAttribute("transform", "translate(0,0)");
        selectedAtts.push(p);
        setState(currentState);
        addRowFocus(currentCreRow, p, layers.bxbFocus);
        if (selectedAtts.length === 2) {
          setState(STATES.BXB1_RECOMBINATION);
          att.forEach(function (q) {
            q.hit.style.pointerEvents = "none";
          });
          var token = animationEpoch;
          if (bxbGuide && bxbGuide.choose)
            fade(
              bxbGuide.choose,
              currentOpacity(bxbGuide.choose),
              0,
              260,
              token,
            );
          timeoutPromise(CONFIG.timing.pairWait, token).then(function (ok) {
            if (ok) evaluateBxbPair(selectedAtts.slice(), token);
          });
        }
      }
      addListener(p.hit, "click", choose);
      addListener(p.hit, "keydown", choose);
      floatingSites.push(p);
    });
    bindMagnetic(
      att.map(function (p) {
        return p.hit;
      }),
    );
  }

  // -------------------------------------------------------------------------
  // Cre inversion animation and history handoff.
  // -------------------------------------------------------------------------
  function drawTemporarySegment(parent, rowObj, ids) {
    var g0 = group(parent, {});
    var selected = rowObj.parts.filter(function (p) {
      return ids.indexOf(p.data.id) >= 0;
    });
    selected.forEach(function (p) {
      var e = p.data;
      var clone = group(g0, {
        transform: "translate(" + e.x + "," + rowObj.y + ")",
      });
      if (e.type === "gene") {
        svgEl(
          "polygon",
          {
            points: blockPoints(
              e.width,
              CONFIG.layout.geneHeight,
              e.orientation,
            ),
            fill: e.color,
          },
          clone,
        );
        text(
          clone,
          e.width / 2,
          0,
          e.label,
          CONFIG.layout.font.gene,
          "middle",
          600,
        );
      } else if (e.type === "ns") {
        svgEl(
          "rect",
          {
            x: 0,
            y: -CONFIG.layout.nsHeight / 2,
            width: e.width,
            height: CONFIG.layout.nsHeight,
            rx: CONFIG.layout.nsHeight / 2,
            fill: CONFIG.colors.bg,
            stroke: CONFIG.colors.white,
            "stroke-width": 2.4,
          },
          clone,
        );
        text(clone, e.width / 2, 0, "ns", CONFIG.layout.font.ns, "middle", 500);
      } else if (e.type === "site") {
        svgEl(
          "polygon",
          {
            points: sitePoints(
              e.width,
              CONFIG.layout.siteHeight,
              e.orientation,
            ),
            fill: e.color,
          },
          clone,
        );
        if (e.site.indexOf("lox") === 0)
          text(
            clone,
            e.width / 2,
            CONFIG.layout.siteLabelDY,
            e.site,
            CONFIG.layout.font.site,
            "middle",
            500,
          );
      } else if (e.type === "promoter") {
        drawPromoterGlyph(clone, e.width / 2, 0, e.orientation);
      }
    });
    var left = Math.min.apply(
      null,
      selected.map(function (p) {
        return p.data.x;
      }),
    );
    var right = Math.max.apply(
      null,
      selected.map(function (p) {
        return p.data.x + p.data.width;
      }),
    );
    return { group: g0, cx: (left + right) / 2, parts: selected };
  }

  async function handleCreChoice(choice) {
    var epoch = animationEpoch;
    setState(STATES.CRE_RECOMBINATION);
    clearSiteInteractions();
    if (creGuide && creGuide.choose)
      fade(creGuide.choose, currentOpacity(creGuide.choose), 0, 260, epoch);
    var targetOutcome = buildCreOutcome(choice);
    currentCreOutcome = targetOutcome;

    var i66 = initialRow.elements.findIndex(function (e) {
      return e.id === "lox66";
    });
    var i71 = initialRow.elements.findIndex(function (e) {
      return e.id === "lox71_" + choice;
    });
    var ids = initialRow.elements.slice(i66, i71 + 1).map(function (e) {
      return e.id;
    });
    var temp = drawTemporarySegment(layers.creAnim, initialRow, ids);
    temp.parts.forEach(function (p) {
      setOpacity(p.node, 0);
    });

    await tween(
      CONFIG.timing.inversion,
      function (q) {
        var sx = Math.cos(Math.PI * q);
        temp.group.setAttribute(
          "transform",
          "translate(" +
            temp.cx +
            ",0) scale(" +
            sx.toFixed(4) +
            ",1) translate(" +
            -temp.cx +
            ",0)",
        );
      },
      epoch,
    );
    if (!live(epoch)) return;
    removeNode(temp.group);

    // Build the real structured Cre outcome at the parent position first.
    currentCreRow = createCircuitRow(
      layers.creOutcome,
      targetOutcome.elements,
      CONFIG.y.initialCircuit,
      { name: "cre-outcome", mode: "cre", instant: true },
    );
    setOpacity(initialRow.wrap, 0);
    // Restore every source element hidden during the temporary flip before the
    // unrecombined parent fades back in as mechanism history.
    rowInstant(initialRow, "cre");
    setOpacity(initialRow.wrap, 0);
    await timeoutPromise(120, epoch);
    if (!live(epoch)) return;

    // Move the real outcome down while the unrecombined parent reappears above.
    await Promise.all([
      tween(
        CONFIG.timing.outcomeMove,
        function (q) {
          currentCreRow.wrap.setAttribute(
            "transform",
            "translate(0," +
              (CONFIG.y.initialCircuit +
                (CONFIG.y.creOutcome - CONFIG.y.initialCircuit) *
                  easeInOut(q)) +
              ")",
          );
        },
        epoch,
      ),
      fade(initialRow.wrap, 0, 1, 430, epoch),
      animateHeight(
        CONFIG.responsive.creDoneHeight,
        CONFIG.timing.outcomeMove,
        epoch,
      ),
    ]);
    currentCreRow.y = CONFIG.y.creOutcome;
    currentCreRow.wrap.setAttribute(
      "transform",
      "translate(0," + CONFIG.y.creOutcome + ")",
    );
    if (!live(epoch)) return;

    // Parent-to-product mapping guides are grown, not popped in.
    clearLayer(layers.creBridge);
    var old66 = getPartByRole(initialRow, "lox66").center;
    var oldSelected = getParts(initialRow, function (p) {
      return p.data.id === "lox71_" + choice;
    })[0].center;
    var new72 = getPartByRole(currentCreRow, "lox72").center;
    var newP = getPartByRole(currentCreRow, "loxP").center;
    // Source order is [original lox66, selected lox71], whose products are
    // [loxP, lox72] after inversion.
    var bridge = createParentProductBridge(
      layers.creBridge,
      [old66, oldSelected],
      [newP, new72],
      CONFIG.y.initialCircuit,
      CONFIG.y.creOutcome,
    );
    await animateBridge(bridge, epoch);
    if (!live(epoch)) return;

    setState(STATES.CRE_OUTCOME);
    await timeoutPromise(260, epoch);
    if (!live(epoch)) return;
    await startBxbStage(epoch);
  }

  function createParentProductBridge(
    parent,
    sourceXs,
    targetXs,
    sourceY,
    targetY,
  ) {
    var cfg = CONFIG.bridge;
    var sourceMid = (sourceXs[0] + sourceXs[1]) / 2;
    var y1 = sourceY + cfg.sourceDrop;
    var y2 = sourceY + cfg.junctionDrop;
    var targetBranchY = targetY - cfg.targetGap - 26;
    var targetStopY = targetY - cfg.targetGap;
    function gp(d) {
      var p = path(parent, d, {
        "stroke-opacity": 0.58,
        "stroke-width": cfg.lineWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      });
      preparePath(p);
      return p;
    }
    return {
      a: gp("M " + sourceXs[0] + " " + y1 + " V " + y2),
      b: gp("M " + sourceXs[1] + " " + y1 + " V " + y2),
      h1: gp("M " + sourceXs[0] + " " + y2 + " H " + sourceMid),
      h2: gp("M " + sourceXs[1] + " " + y2 + " H " + sourceMid),
      // One uninterrupted vertical path avoids the old mid-line dot/pause.
      mid: gp("M " + sourceMid + " " + y2 + " V " + targetBranchY),
      // The lower guide re-branches to the two lox sites' actual post-inversion x positions.
      branch1: gp("M " + sourceMid + " " + targetBranchY + " H " + targetXs[0]),
      branch2: gp("M " + sourceMid + " " + targetBranchY + " H " + targetXs[1]),
      down1: gp("M " + targetXs[0] + " " + targetBranchY + " V " + targetStopY),
      down2: gp("M " + targetXs[1] + " " + targetBranchY + " V " + targetStopY),
    };
  }
  async function animateBridge(b, epoch) {
    await Promise.all([drawPath(b.a, 260, epoch), drawPath(b.b, 260, epoch)]);
    await Promise.all([drawPath(b.h1, 310, epoch), drawPath(b.h2, 310, epoch)]);
    // The center vertical is a single path with no intermediate stop.
    await drawPath(b.mid, 420, epoch);
    await Promise.all([
      drawPath(b.branch1, 320, epoch),
      drawPath(b.branch2, 320, epoch),
    ]);
    await Promise.all([
      drawPath(b.down1, 220, epoch),
      drawPath(b.down2, 220, epoch),
    ]);
  }

  // -------------------------------------------------------------------------
  // Bxb1 guide and interaction.
  // -------------------------------------------------------------------------
  function createBxbGuide(parent, rowObj) {
    var cfg = CONFIG.bxbGuide;
    var enzymeX = expressionEnzymeX("bxb1");
    var att = getParts(rowObj, function (p) {
      return (
        p.data.type === "site" &&
        (p.data.site === "attB" || p.data.site === "attP")
      );
    }).sort(function (a, b) {
      return a.data.order - b.data.order;
    });
    var xs = att.map(function (p) {
      return p.center;
    });
    var startY = CONFIG.y.bxbExpression + cfg.startYFromExpression;
    var splitY = CONFIG.y.bxbExpression + cfg.splitYFromExpression;
    var stopY = rowObj.y + cfg.stopBelowRow;
    var g0 = group(parent, { "data-guide": "bxb1" });
    function gp(d, op) {
      var p = path(
        g0,
        d,
        Object.assign(
          {
            "stroke-opacity": 0.62,
            "stroke-width": cfg.lineWidth,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          },
          op || {},
        ),
      );
      preparePath(p);
      return p;
    }
    var trunk = gp("M " + enzymeX + " " + startY + " V " + splitY);
    // Grow the trunk from the Bxb1 enzyme to the branch node first.
    // Then launch BOTH horizontal branches from that exact node at the same time:
    // the left branch runs to the leftmost att and the right branch to the
    // rightmost att. These paths only touch at the node and never overlap, so
    // the shared horizontal section cannot become thicker from double drawing.
    // The middle att is reached by its own vertical drop from the left branch.
    var leftSeg = gp("M " + enzymeX + " " + splitY + " H " + xs[0]);
    var rightSeg = gp("M " + enzymeX + " " + splitY + " H " + xs[2]);
    var drops = xs.map(function (x) {
      return gp("M " + x + " " + splitY + " V " + stopY, {
        "stroke-opacity": 0.5,
      });
    });
    var bars = xs.map(function (x) {
      return svgEl(
        "rect",
        {
          x: x - cfg.barWidth / 2,
          y: stopY,
          width: cfg.barWidth,
          height: 0,
          fill: CONFIG.colors.white,
          opacity: 0,
        },
        g0,
      );
    });
    var choose = text(
      g0,
      xs[2] + cfg.chooseOffsetX,
      stopY + cfg.chooseOffsetY,
      "choose a pair",
      cfg.chooseFont,
      "start",
      430,
      "ap-choice",
    );
    setOpacity(choose, 0);
    return {
      group: g0,
      trunk: trunk,
      leftSeg: leftSeg,
      rightSeg: rightSeg,
      drops: drops,
      bars: bars,
      choose: choose,
      xs: xs,
      enzymeX: enzymeX,
      splitY: splitY,
      startY: stopY,
      endY: splitY,
      att: att,
      horizontalSegments: null,
    };
  }

  function splitBxbHorizontalPaths(guide) {
    // During the entrance animation, each arm is drawn as one continuous path
    // from the Bxb1 branch node to its outer att site. Once both arms have
    // arrived, replace those temporary paths with independent segments split
    // at every att x-coordinate and at the Bxb1 trunk node. This creates three
    // att junctions on the baseline, so removing an unselected outer branch
    // cannot erase the horizontal segment shared by the selected att and node.
    if (!guide || guide.horizontalSegments) return;
    var points = guide.xs.concat([guide.enzymeX]);
    points = points.filter(function (x, i, arr) {
      return Number.isFinite(x) && arr.findIndex(function (v) { return Math.abs(v - x) < 0.01; }) === i;
    }).sort(function (a, b) { return a - b; });
    var segments = [];
    for (var i = 0; i < points.length - 1; i++) {
      var x1 = points[i], x2 = points[i + 1];
      if (x2 - x1 < 0.01) continue;
      var node = path(guide.group, 'M ' + x1 + ' ' + guide.splitY + ' H ' + x2, {
        'stroke-opacity': 0.62,
        'stroke-width': CONFIG.bxbGuide.lineWidth,
        'stroke-linecap': 'butt',
        'stroke-linejoin': 'round'
      });
      preparePath(node);
      fullPath(node);
      segments.push({ node: node, minX: x1, maxX: x2, midX: (x1 + x2) / 2 });
    }
    removeNode(guide.leftSeg);
    removeNode(guide.rightSeg);
    guide.leftSeg = null;
    guide.rightSeg = null;
    guide.horizontalSegments = segments;
  }

  async function revealBxbGuide(guide, epoch) {
    // 1. Bxb1's vertical trunk rises to the branch node.
    await drawPath(guide.trunk, 320, epoch);
    // 2. Both horizontal arms start at the node and grow outward together.
    // The shorter arm waits at its endpoint until the longer arm has arrived.
    await Promise.all([
      drawPath(guide.leftSeg, 330, epoch),
      drawPath(guide.rightSeg, 410, epoch),
    ]);
    if (!live(epoch)) return false;
    // Turn the completed baseline into independently removable segments before
    // any vertical att drops appear. The visual path stays continuous.
    splitBxbHorizontalPaths(guide);
    // 3. Only once the horizontal geometry is complete do vertical drops
    // extend upward from the baseline toward the att sites.
    var dropResults = await Promise.all(
      guide.drops.map(function (p, i) {
        return drawPath(p, 390 + i * 65, epoch);
      }),
    );
    if (
      !live(epoch) ||
      dropResults.some(function (ok) {
        return !ok;
      })
    )
      return false;
    guide.bars.forEach(function (b) {
      setOpacity(b, 1);
      registerMovingBar(
        b,
        guide.startY,
        guide.endY,
        -1,
        CONFIG.bxbGuide.barRatio,
        CONFIG.bxbGuide.barMin,
        CONFIG.bxbGuide.barMax,
      );
    });
    await fade(guide.choose, 0, 1, 260, epoch);
  }

  function bxbGuideInstant(guide) {
    splitBxbHorizontalPaths(guide);
    [guide.trunk]
      .concat((guide.horizontalSegments || []).map(function (seg) { return seg.node; }))
      .concat(guide.drops)
      .forEach(fullPath);
    setOpacity(guide.choose, 1);
    guide.bars.forEach(function (b) {
      setOpacity(b, 1);
      registerMovingBar(
        b,
        guide.startY,
        guide.endY,
        -1,
        CONFIG.bxbGuide.barRatio,
        CONFIG.bxbGuide.barMin,
        CONFIG.bxbGuide.barMax,
      );
    });
  }

  async function startBxbStage(epoch) {
    setState(STATES.BXB1_EXPRESSION);
    await animateHeight(CONFIG.responsive.bxbReadyHeight, 650, epoch);
    if (!live(epoch)) return;
    bxbExpression = createExpressionModule(
      layers.bxbExpression,
      "bxb1",
      CONFIG.y.bxbExpression,
    );
    await playExpression(bxbExpression, epoch);
    if (!live(epoch)) return;
    showBxbFooterNote();
    if (!(await timeoutPromise(420, epoch)) || !live(epoch)) return;
    showBxbDetailFooterNote();

    // Switch the active Cre-outcome row from lox annotations to att annotations
    // with a crossfade. The untouched initial circuit above retains its lox labels.
    clearLayer(layers.creFocus);
    setLabelMode(initialRow, "cre");
    setPromoterMode(currentCreRow, "inactive");
    setState(STATES.BXB1_GUIDE);
    bxbGuide = createBxbGuide(layers.bxbGuide, currentCreRow);
    var guideAndLabels = await Promise.all([
      revealBxbGuide(bxbGuide, epoch),
      crossfadeCircuitLabelsToBxb(currentCreRow, epoch),
    ]);
    if (
      !live(epoch) ||
      guideAndLabels.some(function (ok) {
        return ok === false;
      })
    )
      return;
    enableBxbSelection(epoch);
  }

  async function evaluateBxbPair(pairParts, epoch) {
    if (!live(epoch)) return;
    var ids = pairParts.map(function (p) {
      return p.data.id;
    });
    var result = buildBxbOutcome(currentCreOutcome.elements, ids);
    if (!result.valid) {
      await invalidBxb(epoch);
      return;
    }
    currentBxb1Outcome = result;
    await validBxb(pairParts, result, epoch);
  }

  async function invalidBxb(epoch) {
    setState(STATES.BXB1_INVALID_PAIR);
    floatingSites = [];
    var msg = text(
      layers.notes,
      WIDTH / 2,
      CONFIG.y.finalCircuit - 130,
      "Recombination cannot happen between two attB sites.",
      22,
      "middle",
      430,
      "ap-error",
    );
    setOpacity(msg, 0);
    var active = [layers.bxbGuide, currentCreRow.wrap, layers.bxbFocus];
    active.forEach(function (el) {
      if (el) el.style.transition = "opacity 340ms ease";
    });
    active.forEach(function (el) {
      if (el) el.style.opacity = "0.18";
    });
    await fade(msg, 0, 1, 360, epoch);
    if (!(await timeoutPromise(CONFIG.timing.invalidHold, epoch))) return;
    await fade(msg, 1, 0, 300, epoch);
    removeNode(msg);
    active.forEach(function (el) {
      if (el) el.style.opacity = "1";
    });
    await timeoutPromise(360, epoch);
    if (!live(epoch)) return;
    setupBxbSelectionInstant();
  }

  function cleanupBxbGuideForPair(result) {
    if (!bxbGuide) return;
    // The horizontal baseline is split at all three att sites and at the Bxb1
    // trunk node. Remove only the segment(s) beyond the unselected outer att;
    // keep the segment from the selected middle att back to the Bxb1 node.
    var middleX = bxbGuide.xs[1];
    var nodeX = bxbGuide.enzymeX;
    var eps = 0.01;
    if (result.side === "left") {
      // Pair 0+1: the rightmost att is unused. Fade its vertical drop and only
      // the right-arm segment(s) lying beyond the middle att toward the right.
      fadeOutNow(bxbGuide.drops[2]);
      fadeOutNow(bxbGuide.bars[2]);
      (bxbGuide.horizontalSegments || []).forEach(function (seg) {
        if (seg.midX > nodeX && seg.minX >= middleX - eps) fadeOutNow(seg.node);
      });
    } else {
      // Pair 1+2: the leftmost att is unused. Fade its vertical drop and only
      // the left-arm segment(s) lying beyond the middle att toward the left.
      fadeOutNow(bxbGuide.drops[0]);
      fadeOutNow(bxbGuide.bars[0]);
      (bxbGuide.horizontalSegments || []).forEach(function (seg) {
        if (seg.midX < nodeX && seg.maxX <= middleX + eps) fadeOutNow(seg.node);
      });
    }
  }
  function fadeOutNow(el) {
    if (el) {
      el.style.transition = "opacity 280ms ease";
      el.style.opacity = "0";
    }
  }

  async function validBxb(pairParts, result, epoch) {
    setState(STATES.BXB1_RECOMBINATION);
    floatingSites = [];
    clearLayer(layers.bxbFocus);
    cleanupBxbGuideForPair(result);

    var sourceRow = currentCreRow;
    var rowParts = sourceRow.parts;
    var sorted = pairParts.slice().sort(function (a, b) {
      return rowParts.indexOf(a) - rowParts.indexOf(b);
    });
    var a = sorted[0],
      b = sorted[1];
    var idxA = rowParts.indexOf(a),
      idxB = rowParts.indexOf(b);
    var mid = (a.center + b.center) / 2;
    var between = rowParts.slice(idxA + 1, idxB);

    // During convergence, every individual element between the two selected
    // att sites (including any number of NS and lox elements) disappears.
    between.forEach(function (p) {
      if (p.hit) p.hit.style.pointerEvents = "none";
    });
    await tween(
      CONFIG.timing.bxbRecombination,
      function (q) {
        var leftCenter = a.center + (mid - a.center) * q;
        var rightCenter = b.center + (mid - b.center) * q;
        a.node.setAttribute(
          "transform",
          "translate(" + (leftCenter - a.width / 2) + ",0)",
        );
        b.node.setAttribute(
          "transform",
          "translate(" + (rightCenter - b.width / 2) + ",0)",
        );
        between.forEach(function (p) {
          var opacity = 1 - q;
          p.node.setAttribute("opacity", String(opacity));
          p.node.style.setProperty("opacity", String(opacity), "important");
        });
      },
      epoch,
    );
    if (!live(epoch)) return;
    between.forEach(function (p) {
      p.node.setAttribute("opacity", "0");
      p.node.style.setProperty("opacity", "0", "important");
    });

    // The newly formed attL is centered exactly on the geometric midpoint of
    // the two parent att sites. drawStandaloneSite expects a left-edge x value.
    var siteWidth = CONFIG.layout.widths.site;
    var hybrid = drawStandaloneSite(
      layers.bxbAnim,
      mid - siteWidth / 2,
      sourceRow.y,
      "attL",
      CONFIG.colors.attL,
      1,
      true,
    );
    setOpacity(a.node, 0);
    setOpacity(b.node, 0);
    selectedAtts = [];
    await timeoutPromise(220, epoch);
    if (!live(epoch)) return;

    // Build the recombined product from the actual element array. Translate the
    // WHOLE product row so its attL is aligned with the in-place hybrid attL.
    finalRow = createCircuitRow(layers.final, result.elements, sourceRow.y, {
      name: "final",
      mode: "bxb",
      instant: true,
    });
    setLabelMode(finalRow, "bxb");
    var productAttL = finalRow.parts.find(function (p) {
      return p.data.site === "attL";
    });
    var productShiftX = mid - productAttL.center;
    finalRow.shiftX = productShiftX;
    setOpacity(finalRow.wrap, 0);
    finalRow.wrap.setAttribute(
      "transform",
      "translate(" + productShiftX + "," + sourceRow.y + ")",
    );

    // Reference behavior: the product emerges below while the reacting source
    // row fades away. Only after the product arrives do we recreate the source
    // row in its untouched, unrecombined att state and fade it back in.
    await Promise.all([
      tween(
        CONFIG.timing.outcomeMove,
        function (q) {
          setOpacity(finalRow.wrap, q);
          finalRow.wrap.setAttribute(
            "transform",
            "translate(" +
              productShiftX +
              "," +
              (sourceRow.y +
                (CONFIG.y.finalCircuit - sourceRow.y) * easeInOut(q)) +
              ")",
          );
        },
        epoch,
      ),
      fade(sourceRow.wrap, 1, 0, 470, epoch),
      fade(hybrid, 1, 0, 470, epoch),
      animateHeight(
        CONFIG.responsive.finalHeight,
        CONFIG.timing.outcomeMove,
        epoch,
      ),
    ]);
    if (!live(epoch)) return;
    removeNode(hybrid);

    finalRow.y = CONFIG.y.finalCircuit;
    finalRow.wrap.setAttribute(
      "transform",
      "translate(" + productShiftX + "," + CONFIG.y.finalCircuit + ")",
    );
    setOpacity(finalRow.wrap, 1);

    // Recreate the original Bxb1 substrate cleanly (restores both att sites to
    // their original coordinates and restores all intervening elements). Fade
    // it back in only after the recombined product has reached its final place.
    removeNode(sourceRow.wrap);
    rerenderCurrentCreRowForBxbHistory(true);
    if (!live(epoch)) return;
    await fade(currentCreRow.wrap, 0, 1, 360, epoch);
    if (!live(epoch)) return;
    removeNode(hybrid);

    // The final guide endpoint must use the product's translated, global attL x.
    var attL = finalRow.parts.find(function (p) {
      return p.data.site === "attL";
    });
    var finalAttLX = finalRow.shiftX + attL.center;
    var fg = createFinalGuide(layers.finalGuide, finalAttLX);
    await animateFinalGuide(fg, epoch);
    if (!live(epoch)) return;
    await animateFinalExpression(finalRow, result, epoch);
    if (!live(epoch)) return;
    showFinalOutcome(result, epoch);
  }

  function drawStandaloneSite(
    parent,
    x,
    y,
    label,
    color,
    orientation,
    showLabel,
  ) {
    var g0 = group(parent, { transform: "translate(" + x + "," + y + ")" });
    svgEl(
      "polygon",
      {
        points: sitePoints(
          CONFIG.layout.widths.site,
          CONFIG.layout.siteHeight,
          orientation,
        ),
        fill: color,
      },
      g0,
    );
    if (showLabel)
      text(
        g0,
        CONFIG.layout.widths.site / 2,
        CONFIG.layout.siteLabelDY,
        label,
        CONFIG.layout.font.site,
        "middle",
        500,
      );
    return g0;
  }

  function createFinalGuide(parent, targetX) {
    var cfg = CONFIG.finalGuide;
    // Begin below the Bxb1 label rather than crossing through the text.
    var minBelowLabel = CONFIG.expression.bxb1.enzyme.labelDY + 20;
    var startY = CONFIG.y.bxbExpression + Math.max(cfg.startDY, minBelowLabel);
    var enzymeX = expressionEnzymeX("bxb1");
    function gp(d) {
      var p = path(parent, d, {
        "stroke-opacity": 0.64,
        "stroke-width": cfg.lineWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      });
      preparePath(p);
      return p;
    }
    return {
      v1: gp("M " + enzymeX + " " + startY + " V " + cfg.junctionY),
      h: gp("M " + enzymeX + " " + cfg.junctionY + " H " + targetX),
      v2: gp(
        "M " +
          targetX +
          " " +
          cfg.junctionY +
          " V " +
          (CONFIG.y.finalCircuit - cfg.stopAboveFinal),
      ),
    };
  }
  async function animateFinalGuide(gd, epoch) {
    await drawPath(gd.v1, 310, epoch);
    await drawPath(gd.h, 380, epoch);
    await drawPath(gd.v2, 330, epoch);
  }

  async function animateFinalExpression(rowObj, result, epoch) {
    var genes = rowObj.parts.filter(function (p) {
      return p.data.type === "gene";
    });
    var winner = genes.find(function (p) {
      return result.outcome === "green"
        ? p.data.id === "gfp"
        : p.data.id === "mcherry";
    });
    var loser = genes.find(function (p) {
      return p !== winner;
    });
    var promoter = rowObj.parts.find(function (p) {
      return p.data.role === result.promoterRole;
    });
    if (loser && loser.paint)
      loser.paint.setAttribute("fill", shadeHex(loser.baseColor, 0.32));
    if (winner && winner.paint)
      winner.paint.setAttribute("fill", shadeHex(winner.baseColor, 0.42));
    await tween(
      CONFIG.timing.promoterGlow,
      function (q) {
        if (promoter && promoter.promoter) {
          var activeColor = interpolateHex(
            CONFIG.colors.promoterInactive,
            CONFIG.colors.white,
            q,
          );
          promoter.promoter.ink.setAttribute("stroke", activeColor);
          promoter.promoter.head.setAttribute("fill", activeColor);
          setOpacity(promoter.promoter.glow, q < 0.6 ? q / 0.6 : (1 - q) / 0.4);
        }
        if (winner && winner.paint)
          winner.paint.setAttribute(
            "fill",
            interpolateHex(
              shadeHex(winner.baseColor, 0.42),
              winner.baseColor,
              q,
            ),
          );
      },
      epoch,
    );
  }

  function interpolateHex(a, b, t) {
    function rgb(h) {
      h = h.replace("#", "");
      return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
      ];
    }
    var A = rgb(a),
      B = rgb(b);
    var C = A.map(function (v, i) {
      return Math.round(v + (B[i] - v) * t);
    });
    return (
      "#" +
      C.map(function (v) {
        return v.toString(16).padStart(2, "0");
      }).join("")
    );
  }

  function createFooterNotes() {
    if (!root) return null;
    var wrap = document.createElement("div");
    wrap.className = "ap-footer-notes";
    var cre = document.createElement("div");
    cre.className = "ap-footer-note ap-footer-note-cre";
    cre.textContent = CONFIG.footerNotes.creText;
    var bxb = document.createElement("div");
    bxb.className = "ap-footer-note ap-footer-note-bxb";
    bxb.textContent = CONFIG.footerNotes.bxbText;
    var detail = document.createElement("div");
    detail.className = "ap-footer-note ap-footer-note-bxb-detail";
    detail.textContent = CONFIG.footerNotes.bxbDetailText;
    wrap.appendChild(cre);
    wrap.appendChild(bxb);
    wrap.appendChild(detail);
    root.appendChild(wrap);
    return { wrap: wrap, cre: cre, bxb: bxb, detail: detail };
  }
  function showCreFooterNote() {
    if (footerNotes) footerNotes.cre.classList.add("is-visible");
  }
  function showBxbFooterNote() {
    if (footerNotes) footerNotes.bxb.classList.add("is-visible");
  }
  function showBxbDetailFooterNote() {
    if (footerNotes) footerNotes.detail.classList.add("is-visible");
  }
  function hideBxbFooterNote() {
    if (footerNotes) {
      footerNotes.bxb.classList.remove("is-visible");
      footerNotes.detail.classList.remove("is-visible");
    }
  }

  function showFinalOutcome(result, epoch) {
    setState(STATES.FINAL_OUTCOME);
    clearLayer(layers.notes);
    var color =
      result.outcome === "green" ? CONFIG.colors.gfp : CONFIG.colors.mcherry;
    var msg = text(
      layers.notes,
      WIDTH / 2,
      CONFIG.y.outcome,
      "",
      CONFIG.layout.font.outcome,
      "middle",
      450,
      "ap-outcome",
    );
    var prefix = svgEl("tspan", { fill: CONFIG.colors.white }, msg);
    prefix.textContent =
      result.side === "left"
        ? "Outcome 1: You obtained a "
        : "Outcome 2: You obtained a ";
    var acc = svgEl("tspan", { fill: color }, msg);
    acc.textContent = result.outcome;
    var suffix = svgEl("tspan", { fill: CONFIG.colors.white }, msg);
    suffix.textContent = " cell.";
    setOpacity(msg, 0);
    fade(msg, 0, 1, 360, epoch);

    var y = CONFIG.y.outcome + 54;
    var b1 = restartButton(
      layers.notes,
      350,
      y,
      "Restart from Bxb1",
      function () {
        restartFromBxb1();
      },
    );
    var b2 = restartButton(
      layers.notes,
      715,
      y,
      "Restart from Cre",
      function () {
        restartFromCre();
      },
    );
    fade(b1, 0, 1, CONFIG.timing.restartFade, epoch);
    fade(b2, 0, 1, CONFIG.timing.restartFade, epoch);
  }

  function restartButton(parent, x, y, label, onClick) {
    var g0 = group(parent, {
      transform: "translate(" + x + "," + y + ")",
      class: "ap-restart",
      tabindex: 0,
      role: "button",
      "aria-label": label,
    });
    // Refresh / return arrow: an almost-complete circular arc with its arrowhead
    // at the upper-right, matching the supplied reference icon.
    path(
      g0,
      "M 10 -12 C 1 -18 -9 -12 -13 -4 C -19 7 -10 18 1 18 C 8 18 14 13 15 6",
      {
        fill: "none",
        stroke: CONFIG.colors.white,
        "stroke-width": 2.5,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
    );
    svgEl(
      "polygon",
      { points: "2,-20 2,-4 17,-12", fill: CONFIG.colors.white },
      g0,
    );
    text(
      g0,
      30,
      0,
      label,
      CONFIG.layout.font.restart,
      "start",
      430,
      "ap-restart-label",
    );
    var hit = svgEl(
      "rect",
      {
        x: -22,
        y: -23,
        width: Math.max(250, label.length * 12 + 68),
        height: 46,
        fill: "transparent",
        class: "ap-hit",
      },
      g0,
    );
    addListener(hit, "click", onClick);
    addListener(hit, "keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    });
    bindMagnetic([hit]);
    return g0;
  }

  function rerenderCurrentCreRowForBxbHistory(startHidden) {
    if (currentCreRow && currentCreRow.wrap) removeNode(currentCreRow.wrap);
    currentCreRow = createCircuitRow(
      layers.creOutcome,
      currentCreOutcome.elements,
      CONFIG.y.creOutcome,
      { name: "cre-outcome", mode: "bxb", instant: true },
    );
    setLabelMode(currentCreRow, "bxb");
    setPromoterMode(currentCreRow, "inactive");
    clearDim(currentCreRow);
    if (startHidden) setOpacity(currentCreRow.wrap, 0);
  }

  // -------------------------------------------------------------------------
  // Restart management — epoch/timer/listener safe.
  // -------------------------------------------------------------------------
  function newEpoch() {
    animationEpoch++;
    cancelAsync();
    clearListeners();
    floatingSites = [];
    selectedAtts = [];
    return animationEpoch;
  }

  function setupBxbSelectionInstant() {
    var epoch = newEpoch();
    currentBxb1Outcome = null;
    clearLayer(layers.final);
    clearLayer(layers.finalGuide);
    clearLayer(layers.bxbAnim);
    clearLayer(layers.bxbFocus);
    clearLayer(layers.notes);
    unregisterBarsFor(layers.bxbGuide);
    clearLayer(layers.bxbGuide);
    rerenderCurrentCreRowForBxbHistory();
    bxbGuide = createBxbGuide(layers.bxbGuide, currentCreRow);
    bxbGuideInstant(bxbGuide);
    setHeight(CONFIG.responsive.bxbReadyHeight);
    enableBxbSelection(epoch);
  }

  function restartFromBxb1() {
    if (!currentCreOutcome) return;
    setupBxbSelectionInstant();
  }

  function restartFromCre() {
    var epoch = newEpoch();
    currentCreOutcome = null;
    currentBxb1Outcome = null;
    selectedLox = null;
    // Remove every downstream stage but preserve the completed Cre expression/guide history.
    unregisterBarsFor(layers.bxbGuide);
    clearLayer(layers.creOutcome);
    clearLayer(layers.creBridge);
    clearLayer(layers.creAnim);
    clearLayer(layers.bxbExpression);
    clearLayer(layers.bxbGuide);
    clearLayer(layers.bxbFocus);
    clearLayer(layers.bxbAnim);
    clearLayer(layers.final);
    clearLayer(layers.finalGuide);
    clearLayer(layers.notes);
    bxbExpression = null;
    bxbGuide = null;
    currentCreRow = null;
    finalRow = null;
    // Re-render initial row in its untouched terminal selection state.
    clearLayer(layers.initial);
    initialRow = createCircuitRow(
      layers.initial,
      initialElements(),
      CONFIG.y.initialCircuit,
      { name: "initial", mode: "cre", instant: true },
    );
    setLabelMode(initialRow, "cre");
    if (creGuide && creGuide.choose) setOpacity(creGuide.choose, 1);
    setHeight(CONFIG.responsive.desktopHeightIntro);
    hideBxbFooterNote();
    showCreFooterNote();
    enableCreSelection(epoch);
  }

  // -------------------------------------------------------------------------
  // Initial full play.
  // -------------------------------------------------------------------------
  async function playAll() {
    var epoch = newEpoch();
    setState(STATES.CRE_EXPRESSION);
    setHeight(230);
    creExpression = createExpressionModule(
      layers.creExpression,
      "cre",
      CONFIG.y.creExpression,
    );
    await playExpression(creExpression, epoch);
    if (!live(epoch)) return;
    showCreFooterNote();

    setState(STATES.CRE_GUIDE);
    await animateHeight(CONFIG.responsive.desktopHeightIntro, 520, epoch);
    if (!live(epoch)) return;
    initialRow = createCircuitRow(
      layers.initial,
      initialElements(),
      CONFIG.y.initialCircuit,
      { name: "initial", mode: "cre" },
    );
    // Labels are enabled while their site nodes are still hidden; each label
    // therefore fades in with its own lox glyph when the matching guide arrives.
    setLabelMode(initialRow, "cre");
    creGuide = createCreGuide(layers.creGuide, initialRow);
    var revealResults = await Promise.all([
      revealCreGuide(creGuide, epoch),
      revealCircuit(initialRow, epoch, { mode: "cre" }),
    ]);
    if (
      !live(epoch) ||
      revealResults.some(function (ok) {
        return ok === false;
      })
    )
      return;
    setLabelMode(initialRow, "cre");
    enableCreSelection(epoch);
  }

  // -------------------------------------------------------------------------
  // DOM lifecycle.
  // -------------------------------------------------------------------------
  function createLayers() {
    layers = {};
    [
      "creExpression",
      "creGuide",
      "initial",
      "creFocus",
      "creAnim",
      "creBridge",
      "creOutcome",
      "bxbExpression",
      "bxbGuide",
      "bxbFocus",
      "bxbAnim",
      "finalGuide",
      "final",
      "notes",
    ].forEach(function (name) {
      layers[name] = group(svg, { "data-layer": name });
    });
  }

  function mount(target) {
    destroy();
    if (!target || !target.appendChild) return null;
    root = document.createElement("div");
    root.setAttribute("data-mosaic-allprinciple", "");
    root.setAttribute(
      "aria-label",
      "Interactive MOSAIC Cre and Bxb1 recombination mechanism",
    );
    target.appendChild(root);
    svg = svgEl(
      "svg",
      {
        xmlns: SVG_NS,
        viewBox: "0 0 " + WIDTH + " 230",
        role: "group",
        "aria-label": "MOSAIC overall principle genetic circuit animation",
      },
      root,
    );
    footerNotes = createFooterNotes();
    installDefs();
    createLayers();
    pulseRAF = requestAnimationFrame(pulseLoop);
    playAll();
    return root;
  }

  function destroy() {
    animationEpoch++;
    cancelAsync();
    clearListeners();
    if (pulseRAF) cancelAnimationFrame(pulseRAF);
    pulseRAF = 0;
    movingBars = [];
    floatingSites = [];
    if (root && root.parentNode) root.parentNode.removeChild(root);
    root = null;
    svg = null;
    defs = null;
    layers = {};
    initialRow = null;
    currentCreRow = null;
    finalRow = null;
    creGuide = null;
    bxbGuide = null;
    creExpression = null;
    bxbExpression = null;
    footerNotes = null;
    currentCreOutcome = null;
    currentBxb1Outcome = null;
    currentState = null;
  }

  var API = {
    mount: mount,
    destroy: destroy,
    restartFromCre: restartFromCre,
    restartFromBxb1: restartFromBxb1,
    getState: function () {
      return {
        state: currentState,
        selectedLox: selectedLox,
        selectedAtts: selectedAtts.map(function (p) {
          return p.data.id;
        }),
        currentCreOutcome: currentCreOutcome
          ? JSON.parse(JSON.stringify(currentCreOutcome))
          : null,
        currentBxb1Outcome: currentBxb1Outcome
          ? JSON.parse(JSON.stringify(currentBxb1Outcome))
          : null,
      };
    },
    getChoices: function () {
      var row = currentState === STATES.CRE_SELECT_LOX ? initialRow :
        currentState === STATES.BXB1_SELECT_ATT ? currentCreRow : null;
      if (!row) return [];
      return row.parts.filter(function (p) {
        return p.hit && p.hit.style.pointerEvents === "all";
      }).map(function (p, i) {
        return { id: p.data.id, label: p.hit.getAttribute("aria-label"), color: p.data.color, position: i + 1, selected: p.selected };
      }).filter(function (p) { return !p.selected; });
    },
    choose: function (id) {
      var row = currentState === STATES.CRE_SELECT_LOX ? initialRow :
        currentState === STATES.BXB1_SELECT_ATT ? currentCreRow : null;
      if (!row) return;
      var p = row.parts.find(function (part) { return part.data.id === id; });
      if (p && p.hit && !p.selected && p.hit.style.pointerEvents === "all") p.hit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    },
    CONFIG: CONFIG,
  };
  window.MOSAIC_ALLPRINCIPLE = API;

  function auto() {
    var dest = document.getElementById("mosaic-allprinciple-animation");
    if (!dest && SCRIPT && SCRIPT.parentNode) {
      dest = document.createElement("div");
      dest.id = "mosaic-allprinciple-animation";
      SCRIPT.parentNode.insertBefore(dest, SCRIPT);
    }
    if (dest) mount(dest);
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", auto, { once: true });
  else auto();
})();
