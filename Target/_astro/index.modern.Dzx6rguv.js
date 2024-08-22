import{e as V}from"./index.modern.CkIAsQri.js";import{Location as c,getCurrentUrl as L}from"./Swup.modern.UA9jlYbO.js";function k(){return k=Object.assign?Object.assign.bind():function(u){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(u[s]=o[s])}return u},k.apply(this,arguments)}function P(){return window.matchMedia("(hover: hover)").matches}function b(u){return!!u&&(u instanceof HTMLAnchorElement||u instanceof SVGAElement)}const E=window.requestIdleCallback||(u=>setTimeout(u,1)),O=["preloadVisibleLinks"];class A extends V{constructor(e={}){var o;super(),o=this,this.name="SwupPreloadPlugin",this.requires={swup:">=4.5"},this.defaults={throttle:5,preloadInitialPage:!0,preloadHoveredLinks:!0,preloadVisibleLinks:{enabled:!1,threshold:.2,delay:500,containers:["body"],ignore:()=>!1}},this.options=void 0,this.queue=void 0,this.preloadObserver=void 0,this.preloadPromises=new Map,this.mouseEnterDelegate=void 0,this.touchStartDelegate=void 0,this.focusDelegate=void 0,this.onPageLoad=(t,r,a)=>{const{url:n}=t.to;return n&&this.preloadPromises.has(n)?this.preloadPromises.get(n):a(t,r)},this.onMouseEnter=async function(t){if(t.target!==t.delegateTarget||!P())return;const r=t.delegateTarget;if(!b(r))return;const{url:a,hash:n}=c.fromElement(r),l=o.swup.createVisit({to:a,hash:n,el:r,event:t});o.swup.hooks.callSync("link:hover",l,{el:r,event:t}),o.preload(r,{priority:!0})},this.onTouchStart=t=>{if(P())return;const r=t.delegateTarget;b(r)&&this.preload(r,{priority:!0})},this.onFocus=t=>{const r=t.delegateTarget;b(r)&&this.preload(r,{priority:!0})};const{preloadVisibleLinks:s}=e,i=function(t,r){if(t==null)return{};var a,n,l={},p=Object.keys(t);for(n=0;n<p.length;n++)r.indexOf(a=p[n])>=0||(l[a]=t[a]);return l}(e,O);this.options=k({},this.defaults,i),typeof s=="object"?this.options.preloadVisibleLinks=k({},this.options.preloadVisibleLinks,{enabled:!0},s):this.options.preloadVisibleLinks.enabled=!!s,this.preload=this.preload.bind(this),this.queue=function(t=1){const r=[],a=[];let n=0,l=0;function p(){l<t&&n>0&&((a.shift()||r.shift()||(()=>{}))(),n--,l++)}return{add:function(f,v=!1){if(f.__queued){if(!v)return;{const g=r.indexOf(f);if(g>=0){const d=r.splice(g,1);n-=d.length}}}f.__queued=!0,(v?a:r).push(f),n++,n<=1&&p()},next:function(){l--,p()}}}(this.options.throttle)}mount(){const e=this.swup;e.options.cache?(e.hooks.create("page:preload"),e.hooks.create("link:hover"),e.preload=this.preload,e.preloadLinks=this.preloadLinks,this.replace("page:load",this.onPageLoad),this.preloadLinks(),this.on("page:view",()=>this.preloadLinks()),this.options.preloadVisibleLinks.enabled&&(this.preloadVisibleLinks(),this.on("page:view",()=>this.preloadVisibleLinks())),this.options.preloadHoveredLinks&&this.preloadLinksOnAttention(),this.options.preloadInitialPage&&this.preload(L())):console.warn("SwupPreloadPlugin: swup cache needs to be enabled for preloading")}unmount(){var e,o,s;this.swup.preload=void 0,this.swup.preloadLinks=void 0,this.preloadPromises.clear(),(e=this.mouseEnterDelegate)==null||e.destroy(),(o=this.touchStartDelegate)==null||o.destroy(),(s=this.focusDelegate)==null||s.destroy(),this.stopPreloadingVisibleLinks()}async preload(e,o={}){var s;let i,t;const r=(s=o.priority)!=null&&s;if(Array.isArray(e))return Promise.all(e.map(n=>this.preload(n)));if(b(e))t=e,{href:i}=c.fromElement(e);else{if(typeof e!="string")return;i=e}if(!i)return;if(this.preloadPromises.has(i))return this.preloadPromises.get(i);if(!this.shouldPreload(i,{el:t}))return;const a=new Promise(n=>{this.queue.add(()=>{this.performPreload(i).catch(()=>{}).then(l=>n(l)).finally(()=>{this.queue.next(),this.preloadPromises.delete(i)})},r)});return this.preloadPromises.set(i,a),a}preloadLinks(){E(()=>{Array.from(document.querySelectorAll("a[data-swup-preload], [data-swup-preload-all] a")).forEach(e=>this.preload(e))})}preloadLinksOnAttention(){const{swup:e}=this,{linkSelector:o}=e.options,s={passive:!0,capture:!0};this.mouseEnterDelegate=e.delegateEvent(o,"mouseenter",this.onMouseEnter,s),this.touchStartDelegate=e.delegateEvent(o,"touchstart",this.onTouchStart,s),this.focusDelegate=e.delegateEvent(o,"focus",this.onFocus,s)}preloadVisibleLinks(){if(this.preloadObserver)return void this.preloadObserver.update();const{threshold:e,delay:o,containers:s}=this.options.preloadVisibleLinks;this.preloadObserver=function({threshold:i,delay:t,containers:r,callback:a,filter:n}){const l=new Map,p=new IntersectionObserver(d=>{d.forEach(h=>{h.isIntersecting?f(h.target):v(h.target)})},{threshold:i}),f=d=>{var h;const{href:m}=c.fromElement(d),y=(h=l.get(m))!=null?h:new Set;l.set(m,y),y.add(d),setTimeout(()=>{const w=l.get(m);w!=null&&w.size&&(a(d),p.unobserve(d),w.delete(d))},t)},v=d=>{var h;const{href:m}=c.fromElement(d);(h=l.get(m))==null||h.delete(d)},g=()=>{E(()=>{const d=r.map(h=>`${h} a[*|href]`).join(", ");Array.from(document.querySelectorAll(d)).filter(h=>n(h)).forEach(h=>p.observe(h))})};return{start:()=>g(),stop:()=>p.disconnect(),update:()=>(l.clear(),g())}}({threshold:e,delay:o,containers:s,callback:i=>this.preload(i),filter:i=>{if(this.options.preloadVisibleLinks.ignore(i)||!i.matches(this.swup.options.linkSelector))return!1;const{href:t}=c.fromElement(i);return this.shouldPreload(t,{el:i})}}),this.preloadObserver.start()}stopPreloadingVisibleLinks(){this.preloadObserver&&this.preloadObserver.stop()}shouldPreload(e,{el:o}={}){const{url:s,href:i}=c.fromUrl(e);return!(!function(){if(navigator.connection){var t;if(navigator.connection.saveData||(t=navigator.connection.effectiveType)!=null&&t.endsWith("2g"))return!1}return!0}()||this.swup.cache.has(s)||this.preloadPromises.has(s)||this.swup.shouldIgnoreVisit(i,{el:o})||o&&this.swup.resolveUrl(s)===this.swup.resolveUrl(L()))}async performPreload(e){var o=this;const{url:s}=c.fromUrl(e),i=this.swup.createVisit({to:s});return await this.swup.hooks.call("page:preload",i,{url:s},async function(r,a){return a.page=await o.swup.fetchPage(e,{visit:r}),a.page})}}export{A as default};
//# sourceMappingURL=index.modern.Dzx6rguv.js.map
