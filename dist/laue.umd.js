!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.Laue={})}(this,function(t){"use strict";function n(t){return"function"==typeof t}function i(t){return Array.isArray(t)}function e(t){return null===t||void 0===t}function r(t){return!isNaN(t)}function a(t,n){for(var i in n)t[i]=n[i];return t}function o(t){return!t.some(e)}function s(){}function u(t,n){var i;return void 0===n&&(n=20),function(){for(var e=arguments.length,r=Array(e);e--;)r[e]=arguments[e];clearTimeout(i),i=setTimeout.apply(void 0,[t,n].concat(r))}}var l=Array.prototype.slice;function h(t){return function(){return t}}function c(t,n){if((r=t.length)>1)for(var i,e,r,a=1,o=t[n[0]],s=o.length;a<r;++a)for(e=o,o=t[n[a]],i=0;i<s;++i)o[i][1]+=o[i][0]=isNaN(e[i][1])?e[i][0]:e[i][1]}function f(t){for(var n=t.length,i=new Array(n);--n>=0;)i[n]=n;return i}function p(t,n){return t[n]}function d(t,n){if((s=t.length)>1)for(var i,e,r,a,o,s,u=0,l=t[n[0]].length;u<l;++u)for(a=o=0,i=0;i<s;++i)(r=(e=t[n[i]][u])[1]-e[0])>=0?(e[0]=a,e[1]=a+=r):r<0?(e[1]=o,e[0]=o+=r):e[0]=a}var y={props:{data:{type:Array,default:function(){return[]}},height:{type:Number,default:300},width:{type:Number,default:600},autoresize:Boolean,padding:{default:8,type:[Number,Array]},stacked:Boolean,colors:{default:function(){return["#3fb1e3","#6be6c1","#626c91","#a0a7e6","#c4ebad","#96dee8"]},type:[Array,Function]},textColor:{type:String,default:"#999"}},computed:{offset:function(){for(var t=this.padding,e=this.space,r=[],a=0;a<4;a++){var o=i(t)?t[a]||0:t,s=e[a];r[a]=n(o)?o(s):s+o}return r},viewWidth:function(){var t=this.parentWidth,n=this.width;return e(t)?n:t},canvas:function(){var t=this.viewWidth,n=this.height,i=this.offset,e=i[3],r=i[0],a=n-i[2],o=t-i[1];return{x0:e,y0:r,width:o-e,height:a-r,x1:o,y1:a}},curData:function(){return function(){var t=h([]),n=f,i=c,e=p;function r(r){var a,o,s=t.apply(this,arguments),u=r.length,l=s.length,h=new Array(l);for(a=0;a<l;++a){for(var c,f=s[a],p=h[a]=new Array(u),d=0;d<u;++d)p[d]=c=[0,+e(r[d],f,d,r)],c.data=r[d];p.key=f}for(a=0,o=n(h);a<l;++a)h[o[a]].index=a;return i(h,o),h}return r.keys=function(n){return arguments.length?(t="function"==typeof n?n:h(l.call(n)),r):t},r.value=function(t){return arguments.length?(e="function"==typeof t?t:h(+t),r):e},r.order=function(t){return arguments.length?(n=null==t?f:"function"==typeof t?t:h(l.call(t)),r):n},r.offset=function(t){return arguments.length?(i=null==t?c:t,r):i},r}().keys(this.props).offset(this.stacked?d:s)(this.data)}},provide:function(){return{Plane:this}},methods:{genColor:function(t){var n=this.colors;return i(n)?n[t%n.length]:n(t)},resize:function(){var t=this.$el.getBoundingClientRect().width;this.parentWidth=t},addSpace:function(t){var n=this;void 0===t&&(t=[]),t.forEach(function(t,i){n.space[i]=Math.max(t,n.space[i]||0)})}},data:function(){return{space:[0,0,0,0],parentWidth:null,props:[],store:{}}},mounted:function(){this.autoresize&&(this.resize(),window.addEventListener("resize",u(this.resize)))}},v=Math.sqrt(50),x=Math.sqrt(10),m=Math.sqrt(2);function g(t,n,i){var e;n<t&&(t=(e=[n,t])[0],n=e[1]);for(var r=function(t,n,i){var e=Math.abs(n-t)/Math.max(0,i),r=Math.pow(10,Math.floor(Math.log(e)/Math.LN10)),a=e/r;return a>=v?r*=10:a>=x?r*=5:a>=m&&(r*=2),n<t?-r:r}(t,n,i),a=Math.floor(t/r)*r,o=[a],s=a;s<n;)s+=r,o.push(s);return Math.abs(t-o[1])<r&&(o.shift(),o[0]=t),Math.abs(n-o[o.length-2])<r&&(o.pop(),o[o.length-1]=n),o}function _(t,n,i){return Math[n].apply(Math,t.map(function(t){return Math[n].apply(Math,t.map(function(t){return t[i]}).filter(r))}))}var b={name:"LaCartesian",mixins:[y],props:{bound:{type:Array,default:function(){return[]}},narrow:[Boolean,Number,Function],distance:{default:0,type:Number}},computed:{high:function(){return this.getBound(this.bound[1],"max")},low:function(){return this.getBound(this.bound[0],"min")},len:function(){return this.data.length},tempXRatio:function(){var t=this.len;return t<=1?0:this.canvas.width/(t-1)},gap:function(){var t=this.narrow,i=this.tempXRatio;return n(t)?t(i):!0===t?i/2:Number(t)},xRatio:function(){return this.tempXRatio?this.tempXRatio-2*this.gap/(this.len-1):0},yRatio:function(){return this.canvas.height/(this.high-this.low)}},methods:{getBound:function(t,i){if("number"==typeof t)return t;var e="min"===i,r=_(this.curData,i,e?0:1);return e&&0===r&&(r=_(this.curData,"min",1)),n(t)?t(r):r}},render:function(t){var n=this,i=this.viewWidth,e=this.height,r=this.autoresize,a=this.$slots.default||[];this.snap={};var o=[],s=[],u=[],l=[],h=[];return a.forEach(function(t){var i=t.componentOptions;if(i){var e=i.Ctor.sealedOptions;if(e){var r=i.propsData,a=r.prop;switch(e.type){case"cartesian":a&&o.indexOf(a)<0&&o.push(a),t.index=s.length,s.push(t);break;case"object":n.addSpace(e.space),u.push(t);break;case"widget":l.push(t)}e.preload&&e.preload({data:r,parent:n,index:t.index})}}else h.push(t)}),this.props=o,t("div",{style:{position:"relative",width:r?"100%":i+"px"}},[t("svg",{attrs:{width:i,height:e,viewBox:"0 0 "+i+" "+e}},[h,s,u]),l])}},w={name:"LaPolar",mixins:[y],render:function(t){var n=this.viewWidth,i=this.height,e=this.autoresize,r=this.$slots.default||[];this.snap={};var a=[],o=[],s=[],u=[];return r.forEach(function(t){var n=t.componentOptions;if(n){var i=n.Ctor.sealedOptions;if(i){var e=n.propsData.prop;switch(i.type){case"polar":e&&a.indexOf(e)<0&&a.push(e),t.index=o.length,o.push(t);break;case"widget":s.push(t)}}}else u.push(t)}),this.props=a,t("div",{style:{position:"relative",width:e?"100%":n+"px"}},[t("svg",{attrs:{width:n,height:i,viewBox:"0 0 "+n+" "+i}},[u,o]),s])}},M={inject:["Plane"],computed:{store:function(){return this.Plane.store}}},A={props:{prop:String},mixins:[M],computed:{raws:function(){var t=this.prop,n=this.Plane;return t?n.data.map(function(n){return n[t]}):null},values:function(){var t=this.prop;return this.Plane.curData.filter(function(n){return n.key===t})[0]||[]}}},k={props:{animated:Boolean,animationDuration:{default:1,type:Number},animationEffect:{default:"ease",type:String},transition:String},computed:{trans:function(){return this.transition||(this.animated?"all "+this.animationDuration+"s "+this.animationEffect:"none")}}},S={mixins:[A,k],props:{points:Array,color:String,label:String,showValue:Boolean},computed:{id:function(){return this.$vnode.index},curColor:function(){return this.color||this.Plane.genColor(this.id)},actived:function(){var t=this.store.hidden;return!i(t)||t.indexOf(this.id)<0}},watch:{"store.activedIndex":function(t){var n=this.store;n.activedPoint=[].concat(n.activedPoint),this.$set(n.activedPoint,this.id,{color:this.curColor,value:this.raws[t],label:this.label})},curColor:{immediate:!0,handler:function(t){var n=this.store;n.colors=n.colors||{},this.$set(n.colors,this.id,t)}},label:{immediate:!0,handler:function(t){var n=this.store;n.labels=n.labels||{},this.$set(n.labels,this.id,t)}},props:{immediate:!0,handler:function(t){var n=this.store;n.props=n.props||{},e(this.id)||this.$set(n.props,this.id,t)}}}},P={mixins:[S],type:"cartesian",computed:{curPoints:function(){var t=this;if(this.points)return this.points;var n=this.Plane,i=n.gap,r=n.xRatio,a=n.yRatio,o=n.low,s=n.canvas,u=s.x0,l=s.y1;return this.values.map(function(n,s){var h;if(e(t.raws[s]))return[null];var c=n[0],f=n[1];c<0&&(f=(h=n)[0],c=h[1]),c=Math.max(o,c);var p=isNaN(f)?null:l-(f-o)*a,d=isNaN(c)?null:l-(c-o)*a;return[u+r*s+i,p,d]})},pointSlot:function(){var t=this,n=this.$scopedSlots.default,i=this.store.activedIndex;return n&&this.curPoints.map(function(e,r){return n({x:e[0],y:e[1],value:t.raws[r],index:r,actived:i===r,color:t.curColor,style:{transition:t.trans}})})}}},C=Math.PI,R=2*C,L=R-1e-6;function N(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function T(){return new N}function $(t){this._context=t}function E(t){return new $(t)}function B(t){return t[0]}function I(t){return t[1]}function X(){var t=B,n=I,i=h(!0),e=null,r=E,a=null;function o(o){var s,u,l,h=o.length,c=!1;for(null==e&&(a=r(l=T())),s=0;s<=h;++s)!(s<h&&i(u=o[s],s,o))===c&&((c=!c)?a.lineStart():a.lineEnd()),c&&a.point(+t(u,s,o),+n(u,s,o));if(l)return a=null,l+""||null}return o.x=function(n){return arguments.length?(t="function"==typeof n?n:h(+n),o):t},o.y=function(t){return arguments.length?(n="function"==typeof t?t:h(+t),o):n},o.defined=function(t){return arguments.length?(i="function"==typeof t?t:h(!!t),o):i},o.curve=function(t){return arguments.length?(r=t,null!=e&&(a=r(e)),o):r},o.context=function(t){return arguments.length?(null==t?e=a=null:a=r(e=t),o):e},o}function z(t,n,i){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-i),t._x2,t._y2)}function D(t,n){this._context=t,this._k=(1-n)/6}N.prototype=T.prototype={constructor:N,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,i,e){this._+="Q"+ +t+","+ +n+","+(this._x1=+i)+","+(this._y1=+e)},bezierCurveTo:function(t,n,i,e,r,a){this._+="C"+ +t+","+ +n+","+ +i+","+ +e+","+(this._x1=+r)+","+(this._y1=+a)},arcTo:function(t,n,i,e,r){t=+t,n=+n,i=+i,e=+e,r=+r;var a=this._x1,o=this._y1,s=i-t,u=e-n,l=a-t,h=o-n,c=l*l+h*h;if(r<0)throw new Error("negative radius: "+r);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(c>1e-6)if(Math.abs(h*s-u*l)>1e-6&&r){var f=i-a,p=e-o,d=s*s+u*u,y=f*f+p*p,v=Math.sqrt(d),x=Math.sqrt(c),m=r*Math.tan((C-Math.acos((d+c-y)/(2*v*x)))/2),g=m/x,_=m/v;Math.abs(g-1)>1e-6&&(this._+="L"+(t+g*l)+","+(n+g*h)),this._+="A"+r+","+r+",0,0,"+ +(h*f>l*p)+","+(this._x1=t+_*s)+","+(this._y1=n+_*u)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,i,e,r,a){t=+t,n=+n;var o=(i=+i)*Math.cos(e),s=i*Math.sin(e),u=t+o,l=n+s,h=1^a,c=a?e-r:r-e;if(i<0)throw new Error("negative radius: "+i);null===this._x1?this._+="M"+u+","+l:(Math.abs(this._x1-u)>1e-6||Math.abs(this._y1-l)>1e-6)&&(this._+="L"+u+","+l),i&&(c<0&&(c=c%R+R),c>L?this._+="A"+i+","+i+",0,1,"+h+","+(t-o)+","+(n-s)+"A"+i+","+i+",0,1,"+h+","+(this._x1=u)+","+(this._y1=l):c>1e-6&&(this._+="A"+i+","+i+",0,"+ +(c>=C)+","+h+","+(this._x1=t+i*Math.cos(r))+","+(this._y1=n+i*Math.sin(r))))},rect:function(t,n,i,e){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +i+"v"+ +e+"h"+-i+"Z"},toString:function(){return this._}},$.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}},D.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:z(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:z(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var O=function t(n){function i(t){return new D(t,n)}return i.tension=function(n){return t(+n)},i}(0),W={name:"ElTrans",functional:!0,props:["from","trans"],render:function(t,n){var i=n.children,e=n.props;return t("transition",{props:{appear:!0},on:{beforeAppear:function(t){for(var n in e.from){var i=e.from[n],r=t.getAttribute(n);t.setAttribute("data-"+n,r),t.setAttribute(n,i)}},appear:function(t){setTimeout(function(){for(var n in t.style.transition=e.trans,t.style.WebkitTransition=e.trans,t.style.msTransition=e.trans,t.style.MozTransition=e.trans,e.from){var i=t.getAttribute("data-"+n);t.setAttribute(n,i),t.removeAttribute("data-"+n)}})}}},i)}},Y={name:"LaMotionSpread",functional:!0,props:["axis","transition"],render:function(t,n){var i=n.children,e=n.props,r="la-spread-"+n.parent._uid,a=e.axis,o=e.transition;return t("g",[t("defs",[t("clipPath",{attrs:{id:r}},[t(W,{props:{from:{width:"x"===a?0:"100%",height:"y"===a?0:"100%"},trans:o}},[t("rect",{attrs:{x:0,y:0,width:"100%",height:"100%"}})])])]),t("g",{attrs:{"clip-path":"url(#"+r+")"}},i)])}},q={props:{dashed:[Boolean,String]},computed:{curDashed:function(){var t=this.dashed;return!0===t||""===t?3:!1===t?"none":t}}},V={name:"LaLine",mixins:[P,q],props:{curve:[Boolean,Function],dot:Boolean,width:{type:Number,default:1},hideLine:Boolean,continued:Boolean},computed:{draw:function(){var t=this.curve,i=this.continued,e=X().defined(o);return t&&e.curve(n(t)?t:O),function(t){return t=i?t.filter(o):t,e(t)}},valueSlot:function(){var t=this,n=this.$createElement;return this.showValue&&n("g",{attrs:{fill:this.curColor}},this.curPoints.map(function(i,e){return n("text",{attrs:{x:i[0],y:i[1],dy:"-0.31em","text-anchor":"middle"}},t.raws[e])}))}},render:function(t){var n=this,i=n.animated,e=n.width,r=n.curPoints,a=n.curColor,o=n.hideLine,s=n.trans,u=n.valueSlot,l=n.pointSlot,h=n.store;if(!n.actived)return null;var c=[!o&&t("path",{attrs:{stroke:a,fill:"none","stroke-width":e,d:this.draw(r)},style:{"stroke-dasharray":this.curDashed,transition:s}}),this.$slots.default,this.dot&&t("g",{attrs:{stroke:"#fff",fill:a}},r.map(function(n,i){return n[1]&&t("circle",{attrs:{cx:n[0],cy:n[1],r:(i===h.activedIndex?2:0)+(r=e,parseInt(r,10))+1},style:{transition:s}});var r})),u,l];return i?t(Y,{props:{axis:"x",transition:s}},c):t("g",c)}};var F={name:"LaArea",mixins:[V],props:{fillColor:String},computed:{draw:function(){var t=this.curve,i=this.continued,e=function(){var t=B,n=null,i=h(0),e=I,r=h(!0),a=null,o=E,s=null;function u(u){var l,h,c,f,p,d=u.length,y=!1,v=new Array(d),x=new Array(d);for(null==a&&(s=o(p=T())),l=0;l<=d;++l){if(!(l<d&&r(f=u[l],l,u))===y)if(y=!y)h=l,s.areaStart(),s.lineStart();else{for(s.lineEnd(),s.lineStart(),c=l-1;c>=h;--c)s.point(v[c],x[c]);s.lineEnd(),s.areaEnd()}y&&(v[l]=+t(f,l,u),x[l]=+i(f,l,u),s.point(n?+n(f,l,u):v[l],e?+e(f,l,u):x[l]))}if(p)return s=null,p+""||null}function l(){return X().defined(r).curve(o).context(a)}return u.x=function(i){return arguments.length?(t="function"==typeof i?i:h(+i),n=null,u):t},u.x0=function(n){return arguments.length?(t="function"==typeof n?n:h(+n),u):t},u.x1=function(t){return arguments.length?(n=null==t?null:"function"==typeof t?t:h(+t),u):n},u.y=function(t){return arguments.length?(i="function"==typeof t?t:h(+t),e=null,u):i},u.y0=function(t){return arguments.length?(i="function"==typeof t?t:h(+t),u):i},u.y1=function(t){return arguments.length?(e=null==t?null:"function"==typeof t?t:h(+t),u):e},u.lineX0=u.lineY0=function(){return l().x(t).y(i)},u.lineY1=function(){return l().x(t).y(e)},u.lineX1=function(){return l().x(n).y(i)},u.defined=function(t){return arguments.length?(r="function"==typeof t?t:h(!!t),u):r},u.curve=function(t){return arguments.length?(o=t,null!=a&&(s=o(a)),u):o},u.context=function(t){return arguments.length?(null==t?a=s=null:s=o(a=t),u):a},u}().y0(function(t){return t[2]}).defined(o);return t&&e.curve(n(t)?t:O),function(t){return t=i?t.filter(o):t,e(t)}},areaId:function(){return"la-area-"+this._uid+"-"+this.id},curFillColor:function(){return this.fillColor||"url(#"+this.areaId+")"}},render:function(t){var n=this.trans,i=this.curPoints,e=this.curColor,r=this.curFillColor;return this.actived?t("g",[!this.fillColor&&t("defs",[t("linearGradient",{domProps:{id:this.areaId}},[t("stop",{attrs:{"stop-color":e,"stop-opacity":.5}})])]),t(V,{props:a(a({},this.$props),{color:e,points:i,transition:n}),scopedSlots:this.$scopedSlots},[t("path",{attrs:{d:this.draw(i),fill:r},style:{transition:n}}),this.$slots.default])]):null}},j={name:"LaBar",mixins:[P],props:{width:{type:Number,default:20}},preload:function(t){var n=t.data,i=t.parent,e=t.index,r=i.snap,a=i.distance,o=n.width||20;r.barMap=[].concat(r.barMap,e),r.barAllWidth=r.barAllWidth||0,r.barOffset=[].concat(r.barOffset,r.barAllWidth),r.barAllWidth+=o+a},computed:{margin:function(){var t=this.id,n=this.width,i=this.Plane,e=i.snap,r=i.distance,a=i.stacked,o=e.barMap.indexOf(t);return a?-n/2:e.barOffset[o]-(e.barAllWidth-r)/2},valueSlot:function(){var t=this,n=this.$createElement;return this.showValue&&n("g",{attrs:{fill:"#fff"}},this.curPoints.map(function(i,e){return n("text",{attrs:{x:i[0]+t.margin+t.width/2,y:i[2]+(i[1]-i[2])/2,dy:"0.31em","text-anchor":"middle"}},t.raws[e])}))}},methods:{getRect:function(t){var n=t[2]-t[1];return this.$createElement("rect",{attrs:{x:t[0]+this.margin,y:n<0?t[2]:t[1],width:this.width,height:Math.abs(n)}})}},render:function(t){var n=this,i=this.curPoints,e=this.curColor,r=this.animated,a=this.trans,o=this.pointSlot,s=this.valueSlot;if(!this.actived)return null;var u=[];return u=r?i.map(function(i){return t(W,{props:{from:{height:0,y:n.Plane.canvas.y1},trans:a}},[n.getRect(i)])}):i.map(this.getRect),t("g",{attrs:{fill:e}},[].concat(u,s,o))}},Z={type:"polar",mixins:[S]};function G(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function Q(t){return t}var H=Math.abs,J=Math.atan2,K=Math.cos,U=Math.max,tt=Math.min,nt=Math.sin,it=Math.sqrt,et=1e-12,rt=Math.PI,at=rt/2,ot=2*rt;function st(t){return t>=1?at:t<=-1?-at:Math.asin(t)}function ut(t){return t.innerRadius}function lt(t){return t.outerRadius}function ht(t){return t.startAngle}function ct(t){return t.endAngle}function ft(t){return t&&t.padAngle}function pt(t,n,i,e,r,a,o){var s=t-i,u=n-e,l=(o?a:-a)/it(s*s+u*u),h=l*u,c=-l*s,f=t+h,p=n+c,d=i+h,y=e+c,v=(f+d)/2,x=(p+y)/2,m=d-f,g=y-p,_=m*m+g*g,b=r-a,w=f*y-d*p,M=(g<0?-1:1)*it(U(0,b*b*_-w*w)),A=(w*g-m*M)/_,k=(-w*m-g*M)/_,S=(w*g+m*M)/_,P=(-w*m+g*M)/_,C=A-v,R=k-x,L=S-v,N=P-x;return C*C+R*R>L*L+N*N&&(A=S,k=P),{cx:A,cy:k,x01:-h,y01:-c,x11:A*(r/b-1),y11:k*(r/b-1)}}function dt(){var t=ut,n=lt,i=h(0),e=null,r=ht,a=ct,o=ft,s=null;function u(){var u,l,h,c=+t.apply(this,arguments),f=+n.apply(this,arguments),p=r.apply(this,arguments)-at,d=a.apply(this,arguments)-at,y=H(d-p),v=d>p;if(s||(s=u=T()),f<c&&(l=f,f=c,c=l),f>et)if(y>ot-et)s.moveTo(f*K(p),f*nt(p)),s.arc(0,0,f,p,d,!v),c>et&&(s.moveTo(c*K(d),c*nt(d)),s.arc(0,0,c,d,p,v));else{var x,m,g=p,_=d,b=p,w=d,M=y,A=y,k=o.apply(this,arguments)/2,S=k>et&&(e?+e.apply(this,arguments):it(c*c+f*f)),P=tt(H(f-c)/2,+i.apply(this,arguments)),C=P,R=P;if(S>et){var L=st(S/c*nt(k)),N=st(S/f*nt(k));(M-=2*L)>et?(b+=L*=v?1:-1,w-=L):(M=0,b=w=(p+d)/2),(A-=2*N)>et?(g+=N*=v?1:-1,_-=N):(A=0,g=_=(p+d)/2)}var $=f*K(g),E=f*nt(g),B=c*K(w),I=c*nt(w);if(P>et){var X=f*K(_),z=f*nt(_),D=c*K(b),O=c*nt(b);if(y<rt){var W=M>et?function(t,n,i,e,r,a,o,s){var u=i-t,l=e-n,h=o-r,c=s-a,f=(h*(n-a)-c*(t-r))/(c*u-h*l);return[t+f*u,n+f*l]}($,E,D,O,X,z,B,I):[B,I],Y=$-W[0],q=E-W[1],V=X-W[0],F=z-W[1],j=1/nt(((h=(Y*V+q*F)/(it(Y*Y+q*q)*it(V*V+F*F)))>1?0:h<-1?rt:Math.acos(h))/2),Z=it(W[0]*W[0]+W[1]*W[1]);C=tt(P,(c-Z)/(j-1)),R=tt(P,(f-Z)/(j+1))}}A>et?R>et?(x=pt(D,O,$,E,f,R,v),m=pt(X,z,B,I,f,R,v),s.moveTo(x.cx+x.x01,x.cy+x.y01),R<P?s.arc(x.cx,x.cy,R,J(x.y01,x.x01),J(m.y01,m.x01),!v):(s.arc(x.cx,x.cy,R,J(x.y01,x.x01),J(x.y11,x.x11),!v),s.arc(0,0,f,J(x.cy+x.y11,x.cx+x.x11),J(m.cy+m.y11,m.cx+m.x11),!v),s.arc(m.cx,m.cy,R,J(m.y11,m.x11),J(m.y01,m.x01),!v))):(s.moveTo($,E),s.arc(0,0,f,g,_,!v)):s.moveTo($,E),c>et&&M>et?C>et?(x=pt(B,I,X,z,c,-C,v),m=pt($,E,D,O,c,-C,v),s.lineTo(x.cx+x.x01,x.cy+x.y01),C<P?s.arc(x.cx,x.cy,C,J(x.y01,x.x01),J(m.y01,m.x01),!v):(s.arc(x.cx,x.cy,C,J(x.y01,x.x01),J(x.y11,x.x11),!v),s.arc(0,0,c,J(x.cy+x.y11,x.cx+x.x11),J(m.cy+m.y11,m.cx+m.x11),v),s.arc(m.cx,m.cy,C,J(m.y11,m.x11),J(m.y01,m.x01),!v))):s.arc(0,0,c,w,b,v):s.lineTo(B,I)}else s.moveTo(0,0);if(s.closePath(),u)return s=null,u+""||null}return u.centroid=function(){var i=(+t.apply(this,arguments)+ +n.apply(this,arguments))/2,e=(+r.apply(this,arguments)+ +a.apply(this,arguments))/2-rt/2;return[K(e)*i,nt(e)*i]},u.innerRadius=function(n){return arguments.length?(t="function"==typeof n?n:h(+n),u):t},u.outerRadius=function(t){return arguments.length?(n="function"==typeof t?t:h(+t),u):n},u.cornerRadius=function(t){return arguments.length?(i="function"==typeof t?t:h(+t),u):i},u.padRadius=function(t){return arguments.length?(e=null==t?null:"function"==typeof t?t:h(+t),u):e},u.startAngle=function(t){return arguments.length?(r="function"==typeof t?t:h(+t),u):r},u.endAngle=function(t){return arguments.length?(a="function"==typeof t?t:h(+t),u):a},u.padAngle=function(t){return arguments.length?(o="function"==typeof t?t:h(+t),u):o},u.context=function(t){return arguments.length?(s=null==t?null:t,u):s},u}var yt={name:"LaMotionCircle",functional:!0,props:["r","transition"],render:function(t,n){var i=n.children,e=n.props,r="la-circle-"+n.parent._uid,a=e.transition;return t("g",[t("defs",[t("clipPath",{attrs:{id:r}},[t(W,{props:{from:{r:0},trans:a}},[t("circle",{attrs:{r:1.5*e.r}})])])]),t("g",{attrs:{"clip-path":"url(#"+r+")"}},i)])}},vt={name:"LaPie",mixins:[Z],props:{translate:{type:[String,Array],default:function(){return["50%","50%"]}},radius:{type:[Number,Array],default:function(){return[0,100]}},angles:{type:[Number,Array],default:function(){return[0,2*Math.PI]}},showLabel:Boolean,labelProp:{type:String,default:"label"}},computed:{arcs:function(){return function(){var t=Q,n=G,i=null,e=h(0),r=h(ot),a=h(0);function o(o){var s,u,l,h,c,f=o.length,p=0,d=new Array(f),y=new Array(f),v=+e.apply(this,arguments),x=Math.min(ot,Math.max(-ot,r.apply(this,arguments)-v)),m=Math.min(Math.abs(x)/f,a.apply(this,arguments)),g=m*(x<0?-1:1);for(s=0;s<f;++s)(c=y[d[s]=s]=+t(o[s],s,o))>0&&(p+=c);for(null!=n?d.sort(function(t,i){return n(y[t],y[i])}):null!=i&&d.sort(function(t,n){return i(o[t],o[n])}),s=0,l=p?(x-f*g)/p:0;s<f;++s,v=h)u=d[s],h=v+((c=y[u])>0?c*l:0)+g,y[u]={data:o[u],index:s,value:c,startAngle:v,endAngle:h,padAngle:m};return y}return o.value=function(n){return arguments.length?(t="function"==typeof n?n:h(+n),o):t},o.sortValues=function(t){return arguments.length?(n=t,i=null,o):n},o.sort=function(t){return arguments.length?(i=t,n=null,o):i},o.startAngle=function(t){return arguments.length?(e="function"==typeof t?t:h(+t),o):e},o.endAngle=function(t){return arguments.length?(r="function"==typeof t?t:h(+t),o):r},o.padAngle=function(t){return arguments.length?(a="function"==typeof t?t:h(+t),o):a},o}().startAngle(this.curAngles[0]).endAngle(this.curAngles[1]).sortValues(s)(this.raws)},curRadius:function(){var t=this.radius;return i(t)?t:[0,t]},curAngles:function(){var t=this.angles;return i(t)?t:[0,t]},draw:function(){return dt().innerRadius(this.curRadius[0]).outerRadius(this.curRadius[1])},drawText:function(){return dt().innerRadius(.7*this.curRadius[1]).outerRadius(.7*this.curRadius[1])},valueSlot:function(){var t=this;if(this.showValue){var n=this.$createElement;return this.arcs.map(function(i,e){var r=t.drawText.centroid(i);return n("text",{attrs:{x:r[0],y:r[1],fill:"#fff","text-anchor":"middle"}},t.raws[e])})}},labels:function(){var t=this.labelProp,n=this.Plane;return t?n.data.map(function(n){return n[t]}):null},labelSlot:function(){var t=this;if(this.showLabel){var n=this.$createElement;return this.arcs.map(function(i,e){var r=t.drawText.centroid(i);return n("text",{attrs:{x:.95*r[0]<<1,y:.95*r[1]<<1,fill:"#000","text-anchor":"middle"}},t.labels[e])})}}},render:function(t){var n=this,i=this.Plane.genColor,e=this.animated,r=this.arcs,a=this.draw,o=r.map(a).map(function(n,e){return t("path",{attrs:{d:n,fill:i(e),stroke:"#fff"}})}),s=this.$scopedSlots.default,u=s&&r.map(function(t,i){var e=n.drawText.centroid(t);return s({arc:t,index:i,x:e[0],y:e[1],style:{transition:n.trans}})}),l=[].concat(o,this.valueSlot,this.labelSlot,u),h={style:{transform:"translate("+this.translate+")"}};return t("g",h,e?[t(yt,{props:{transition:this.trans,r:this.curRadius[1]}},l)]:l)}},xt={mixins:[M],props:{color:String},type:"object",computed:{curColor:function(){return this.color||this.Plane.textColor}}},mt={props:{color:String,tickSize:{type:Number,default:5},fontSize:{type:Number,default:15},format:Function,gridline:Boolean,interval:[Function,Number]},mixins:[xt,A,q],computed:{isX:function(){return"x"===this.$options.axis},labels:function(){var t=this.raws,n=this.Plane,i=n.len;return t=this.isX?t||Array.apply(null,{length:i}).map(function(t,n){return n+1}):g(n.low,n.high,i)},gap:function(){return this.isX?this.Plane.gap:0},points:function(){var t,n=this.Plane,i=this.isX,e=this.labels,r=this.inverse,a=this.gap,o=n.canvas,s=o.x0,u=o.y0,l=o.y1,h=o.width,c=o.height;if(i){var f=n.xRatio,p=u+(r?0:c);t=e.map(function(t,n){return[s+f*n+a,p]})}else{var d=n.yRatio,y=n.low,v=s+(r?h:0);t=e.map(function(t){return[v,l-(t-y)*d]})}return t},curColor:function(){return this.color||this.Plane.textColor},handleInterval:function(){var t=this.interval;return"number"==typeof t?function(n){return n%t==0}:n(t)?t:void 0}},watch:{"store.activedIndex":function(t){this.isX&&this.$set(this.store,"activedLabel",this.labels[t])}},render:function(t){var i=this,e=this,r=e.points,a=e.labels,o=e.tickSize,s=e.fontSize,u=e.curColor,l=e.isX,h=e.format,c=e.inverse,f=e.gap,p=e.Plane,d=e.store,y=r[0],v=r[r.length-1],x=this.$scopedSlots.default,m=(c?-1:1)*o,g=(l?1:0)*m,_=(l?0:1)*m,b=l?"middle":c?"start":"end",w=l?c?.71-1:.71:.355,M=1.5*(l?m:0),A=1.5*(l?0:m),k=a.map(function(e,a){var s=r[a];return!(i.handleInterval&&!i.handleInterval(a))&&t("g",[o&&t("line",{attrs:{x1:s[0]-_,x2:s[0],y1:s[1]+g,y2:s[1],stroke:u}}),t("text",{attrs:{x:s[0]-A,y:s[1]+M,dy:w+"em",stroke:"none"}},x?x({value:e}):n(h)?h(e):e)])}).filter(Boolean);return t("g",{attrs:{stroke:u}},[t("line",{attrs:{x2:v[0]+f,y2:v[1],x1:y[0]-f,y1:y[1]}}),[t("g",{attrs:{"text-anchor":b,"font-size":s,fill:u,stroke:"none"}},k)].concat(this.gridline&&r.map(function(n,e){return t("line",{attrs:{x1:n[0],y1:n[1],x2:l?n[0]:p.canvas.x1,y2:l?p.canvas.y0:n[1]},style:{opacity:l&&d.activedIndex===e?1:.3,"stroke-dasharray":i.curDashed}})}))])}},gt={name:"LaXAxis",axis:"x",space:[0,20,24,20],mixins:[mt]},_t={name:"LaYAxis",axis:"y",space:[10,0,0,40],mixins:[mt]},bt={name:"LaXAxisInverse",space:[24,20,0,20],beforeCreate:function(){this.inverse=!0},mixins:[gt]},wt={name:"LaYAxisInverse",space:[10,40,0,0],beforeCreate:function(){this.inverse=!0},mixins:[_t]},Mt={name:"LaYMarker",mixins:[xt,q],props:{label:String,value:Number,placement:{type:String,default:"end"}},computed:{point:function(){var t=this.Plane,n=t.yRatio,i=t.low,e=t.canvas,r=e.x0,a=e.y1,o=e.x1,s=a-(this.value-i)*n;return{x1:r,y1:s,y2:s,x2:o}}},render:function(t){var n=this.point,i=this.curColor,e=this.curDashed,r=this.label,a=this.placement;return t("g",[t("line",{attrs:n,style:{stroke:i,"stroke-dasharray":e}}),r&&t("text",{attrs:{fill:i,x:"end"===a?n.x2:"start"===a?n.x1:(n.x2-n.x1)/2+n.x1,y:n.y1,dy:"-0.31em","text-anchor":a}},r)])}},At={name:"LaYRegion",mixins:[xt,q],props:{label:String,low:{type:Number,required:!0},high:{type:Number,required:!0},fillColor:String,placement:{type:String,default:"end"}},computed:{point:function(){var t=this.Plane,n=t.yRatio,i=t.low,e=t.canvas,r=e.x0,a=e.y1,o=e.width;return{x:r,y:a-(this.high-i)*n,height:(this.high-this.low)*n,width:o}},fillAttr:function(){var t=this.fillColor;return t?{fill:t,stroke:this.curColor}:{stroke:this.curColor,opacity:.3}}},render:function(t){var n=this.label,i=this.point,e=this.placement,r=this.fillAttr;if(!(this.high<this.low))return t("g",{attrs:{fill:this.curColor}},[t("rect",{attrs:a(r,i),style:{"stroke-dasharray":this.curDashed}}),n&&t("text",{attrs:{x:"end"===e?i.x+i.width:"start"===e?i.x:i.width/2+i.x,y:i.y,dy:"-0.31em","text-anchor":e}},n)])}},kt={type:"widget",mixins:[M]},St={name:"LaTooltip",mixins:[kt,k],props:{animationDuration:{default:.5,type:Number}},data:function(){return{left:0,top:0,show:!1}},methods:{handleMove:function(t){var n=t.x,i=t.y,e=this.Plane,r=e.$el.getBoundingClientRect(),a=this.$el.getBoundingClientRect(),o=i-r.y,s=n-r.x-this.offsetX,u=Math.round(s/e.xRatio),l=e.canvas.x1-a.width,h=e.canvas.y1-a.height;o>=e.canvas.y0&&o<=e.canvas.y1?u>-1&&u<e.len&&(this.left=Math.min(u*e.xRatio+this.offsetX+10,l),this.$set(this.store,"activedIndex",u),this.top=Math.min(o+10,h),this.show=!0):this.handleLeave()},handleLeave:function(){this.show=!1,this.$set(this.store,"activedIndex",null)}},computed:{offsetX:function(){var t=this.Plane;return t.canvas.x0+t.gap}},mounted:function(){var t=this,n=this.Plane.$el;n.addEventListener("mousemove",u(this.handleMove,10)),n.addEventListener("mouseleave",this.handleLeave),n.addEventListener("touchmove",function(n){var i=n.touches[0];t.handleMove({x:i.clientX,y:i.clientY})},{passive:!0})},render:function(t){var n=this.store,i=n.activedLabel,e=n.activedPoint;void 0===e&&(e=[]);var r=n.activedIndex,a=this.$scopedSlots.default,o=a?a({label:i,actived:e,index:r}):t("div",{style:{background:"#00000095",padding:"8px",color:"#fff",borderRadius:"4px"}},[t("div",{style:{marginBottom:".5em"}},i),e.map(function(n){return t("div",[t("span",{style:{backgroundColor:n.color,height:"10px",width:"10px",borderRadius:"50%",display:"inline-block",marginRight:"5px"}}),n.label&&t("span",{style:{marginRight:"5px"}},n.label+":"),t("span",n.value)])})]);return t("div",{class:"la-tooltip",style:{position:"absolute",top:0,transform:"translate("+this.left+"px, "+this.top+"px)",transition:this.trans,opacity:Number(this.show)}},[o])}},Pt={name:"LaLegend",mixins:[kt],props:{selectable:Boolean,placement:{type:String,default:"bottom"},color:String},preload:function(t){var n=t.data,i=t.parent,e=n.placement;void 0===e&&(e="bottom");var r=[0,0,0,0];switch(e.match(/^(\w+)-?/)[1]){case"bottom":r[2]=50;break;case"top":r[0]=50;break;case"left":r[3]=100;break;case"right":r[1]=100}i.addSpace(r)},computed:{curColor:function(){return this.color||this.Plane.textColor},position:function(){return this.placement.match(/^(\w+)(-(\w+))?$/)[1]},align:function(){return this.placement.match(/^(\w+)(-(\w+))?$/)[3]},pos:function(){var t=this.position,n=this.align,i={};if("top"===t||"bottom"===t){switch(n){case"start":i.left=0;break;case"end":i.right=0;break;default:i.left="50%",i.transform="translateX(-50%)"}"top"===t?i.top=0:i.bottom=0}else{switch(n){case"start":i.top=0;break;case"end":i.bottom=0;break;default:i.top="50%",i.transform="translateY(-50%)"}"left"===t?i.left=0:i.right=0}return i}},created:function(){this.$set(this.store,"hidden",[])},render:function(t){var n=this.curColor,i=this.pos,e=this.position,r=this.selectable,o=this.store,s=o.hidden,u=this.$scopedSlots.default;return t("div",{class:"la-legend",style:a({position:"absolute"},i)},Object.keys(o.props).map(function(i){return t("div",{style:{display:"left"===e||"right"===e?"block":"inline-block",marginRight:"10px",marginLeft:"5px",color:n,cursor:r?"pointer":"nromal"},on:{click:function(){if(r){i=Number(i);var t=s.indexOf(i);t<0?s.push(i):s.splice(t,1)}}}},u?u({color:o.colors[i],label:o.labels[i],prop:o.props[i]}):[t("span",{style:{backgroundColor:o.colors[i],height:"10px",width:"10px",borderRadius:"50%",display:"inline-block",marginRight:"5px"}}),t("span",{style:s.indexOf(Number(i))>-1?{textDecoration:"line-through"}:{}},o.labels[i])])}))}};function Ct(t){[b,w,V,F,j,vt,gt,_t,bt,wt,St,Pt,Mt,At].forEach(function(n){t.component(n.name,n)})}void 0!==window.Vue&&window.Vue.use(Ct),t.Laue=Ct,t.Cartesian=b,t.Polar=w,t.Line=V,t.Area=F,t.Bar=j,t.Pie=vt,t.XAxis=gt,t.YAxis=_t,t.XAxisInverse=bt,t.YAxisInverse=wt,t.Tooltip=St,t.Legend=Pt,t.YMarker=Mt,t.YRegion=At,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=laue.umd.js.map
