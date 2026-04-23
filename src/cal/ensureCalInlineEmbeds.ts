type CalWindow = Window & {
  __calInlineEmbedsReady?: boolean
}

/** Initialize both inline embeds (Zoom + Tencent) once using official snippet. */
export function ensureCalInlineEmbeds(): void {
  if (typeof window === 'undefined') return
  const w = window as CalWindow
  if (w.__calInlineEmbedsReady) return
  w.__calInlineEmbedsReady = true

  const snippet = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "30min", {origin:"https://app.cal.com"});
Cal.ns["30min"]("inline", {
  elementOrSelector:"#my-cal-inline-30min",
  config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
  calLink: "徐亮亮-yyrcnu/30min",
});
Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
Cal("init", "tencent", {origin:"https://app.cal.com"});
Cal.ns.tencent("inline", {
  elementOrSelector:"#my-cal-inline-tencent",
  config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
  calLink: "徐亮亮-yyrcnu/tencent",
});
Cal.ns.tencent("ui", {"hideEventTypeDetails":false,"layout":"month_view"});`

  const el = document.createElement('script')
  el.type = 'text/javascript'
  el.textContent = snippet
  document.head.appendChild(el)
}
