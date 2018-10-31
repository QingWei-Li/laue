/*!
 * Laue v0.2.0
 * https://laue.js.org
 *
 * Copyright (c) 2018 qingwei-li
 * Licensed under the MIT license
 */

function isFn(o) {
  return typeof o === 'function'
}

function isArr(o) {
  return Array.isArray(o)
}

function isNil(o) {
  return o === null || o === undefined
}

function isNum(n) {
  return !isNaN(n)
}

function extend(to, _from) {
  // eslint-disable-next-line
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to
}

function noNilInArray(arr) {
  return !arr.some(isNil)
}

function noop() {}

function debounce(fn, delay) {
  if ( delay === void 0 ) delay = 20;

  var id;

  return function () {
    var i = arguments.length, argsArray = Array(i);
    while ( i-- ) argsArray[i] = arguments[i];

    clearTimeout(id);
    id = setTimeout.apply(void 0, [ fn, delay ].concat( argsArray ));
  }
}

var slice = Array.prototype.slice;

function constant(x) {
  return function constant() {
    return x;
  };
}

function offsetNone(series, order) {
  if (!((n = series.length) > 1)) { return; }
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function orderNone(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) { o[n] = n; }
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stack() {
  var keys = constant([]),
      order = orderNone,
      offset = offsetNone,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? orderNone : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? offsetNone : _, stack) : offset;
  };

  return stack;
}

function stackOffsetDiverging(series, order) {
  if (!((n = series.length) > 1)) { return; }
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
}

var plane = {
  props: {
    data: {
      type: Array,
      default: function () { return []; }
    },

    height: {
      type: Number,
      default: 300
    },

    width: {
      type: Number,
      default: 600
    },

    autoresize: Boolean,

    padding: {
      default: 8,
      type: [Number, Array]
    },

    stacked: Boolean,

    /**
     * The default colors is "walden" from ECharts
     * @see http://echarts.baidu.com/theme-builder/
     */
    colors: {
      default: function () { return [
        '#3fb1e3',
        '#6be6c1',
        '#626c91',
        '#a0a7e6',
        '#c4ebad',
        '#96dee8'
      ]; },
      type: [Array, Function]
    },

    textColor: {
      type: String,
      default: '#999'
    }
  },

  computed: {
    offset: function offset() {
      var ref = this;
      var padding = ref.padding;
      var space = ref.space;
      var pad = [];

      for (var i = 0; i < 4; i++) {
        var p = isArr(padding) ? padding[i] || 0 : padding;
        var s = space[i];
        pad[i] = isFn(p) ? p(s) : s + p;
      }

      return pad
    },

    viewWidth: function viewWidth() {
      var ref = this;
      var parentWidth = ref.parentWidth;
      var width = ref.width;
      return isNil(parentWidth) ? width : parentWidth
    },

    canvas: function canvas() {
      var ref = this;
      var viewWidth = ref.viewWidth;
      var height = ref.height;
      var offset = ref.offset;
      var x0 = offset[3];
      var y0 = offset[0];
      var y1 = height - offset[2];
      var x1 = viewWidth - offset[1];

      return {
        x0: x0,
        y0: y0,
        width: x1 - x0,
        height: y1 - y0,
        x1: x1,
        y1: y1
      }
    },

    curData: function curData() {
      return stack()
        .keys(this.props)
        .offset(this.stacked ? stackOffsetDiverging : noop)(this.data)
    }
  },

  provide: function provide() {
    return {
      Plane: this
    }
  },

  methods: {
    genColor: function genColor(index) {
      var ref = this;
      var colors = ref.colors;

      if (isArr(colors)) {
        return colors[index % colors.length]
      }

      return colors(index)
    },

    resize: function resize() {
      var ref = this.$el.getBoundingClientRect();
      var width = ref.width;
      this.parentWidth = width;
    },

    addSpace: function addSpace(space) {
      var this$1 = this;
      if ( space === void 0 ) space = [];

      space.forEach(function (val, i) {
        this$1.space[i] = Math.max(val, this$1.space[i] || 0);
      });
    }
  },

  data: function () { return ({
    space: [0, 0, 0, 0],
    parentWidth: null,
    props: [],
    store: {}
  }); },

  mounted: function mounted() {
    if (this.autoresize) {
      this.resize();
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', debounce(this.resize));
      }
    }
  }
}

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) { step1 *= 10; }
  else if (error >= e5) { step1 *= 5; }
  else if (error >= e2) { step1 *= 2; }
  return stop < start ? -step1 : step1;
}

function int(str) {
  return parseInt(str, 10)
}

/**
 * Returns nick ticks
 */
function genTicks(min, max, count) {
  var assign;

  if (max < min) {
    (assign = [max, min], min = assign[0], max = assign[1]);
  }

  var step = tickStep(min, max, count);
  var first = Math.floor(min / step) * step;
  var ticks$$1 = [first];
  var cur = first;

  while (cur < max) {
    cur += step;
    ticks$$1.push(cur);
  }

  if (Math.abs(min - ticks$$1[1]) < step) {
    ticks$$1.shift();
    ticks$$1[0] = min;
  }

  if (Math.abs(max - ticks$$1[ticks$$1.length - 2]) < step) {
    ticks$$1.pop();
    ticks$$1[ticks$$1.length - 1] = max;
  }

  return ticks$$1
}

function genExactNbTicks(min, max, count) {
  var diff = max - min;
  var step = diff / (count - 1);
  var ticks$$1 = [];

  for (var i = 0; i < count; i++) {
    ticks$$1.push(i * step);
  }

  ticks$$1.push(max);

  return ticks$$1
}

function bound(data, type, key) {
  return Math[type].apply(
    Math, data.map(function (arr) { return Math[type].apply(Math, arr.map(function (item) { return item[key]; }).filter(isNum)); })
  )
}

var Cartesian = {
  name: 'LaCartesian',

  mixins: [plane],

  props: {
    bound: {
      type: Array,
      default: function () { return []; }
    },

    narrow: [Boolean, Number, Function],

    distance: {
      default: 0,
      type: Number
    }
  },

  computed: {
    high: function high() {
      return this.getBound(this.bound[1], 'max')
    },

    low: function low() {
      return this.getBound(this.bound[0], 'min')
    },

    len: function len() {
      return this.data.length
    },

    tempXRatio: function tempXRatio() {
      var ref = this;
      var len = ref.len;
      return len <= 1 ? 0 : this.canvas.width / (len - 1)
    },

    gap: function gap() {
      var ref = this;
      var narrow = ref.narrow;
      var tempXRatio = ref.tempXRatio;

      if (isFn(narrow)) {
        return narrow(tempXRatio)
      }
      if (narrow === true) {
        return tempXRatio / 2
      }
      return Number(narrow)
    },

    xRatio: function xRatio() {
      return this.tempXRatio ?
        this.tempXRatio - 2 * this.gap / (this.len - 1) :
        0
    },

    yRatio: function yRatio() {
      return this.canvas.height / (this.high - this.low)
    }
  },

  methods: {
    getBound: function getBound(val, type) {
      if (typeof val === 'number') {
        return val
      }

      var isMin = type === 'min';
      var result = bound(this.curData, type, isMin ? 0 : 1);

      if (isMin && result === 0) {
        result = bound(this.curData, 'min', 1);
      }

      if (isFn(val)) {
        return val(result)
      }

      return result
    }
  },

  /**
   * @todo Need to optimize. The Props changes will call update even if it does not need.
   * https://github.com/vuejs/vue/issues/5727
   */
  render: function render(h) {
    var this$1 = this;

    var ref = this;
    var viewWidth = ref.viewWidth;
    var height = ref.height;
    var autoresize = ref.autoresize;
    var slots = this.$slots.default || [];

    /**
     * Reset snap
     */
    this.snap = {};

    var props = [];
    var cartesians = [];
    var objects = [];
    var widgets = [];
    var others = [];

    slots.forEach(function (slot) {
      var options = slot.componentOptions;
      if (!options) {
        others.push(slot);
        return
      }
      var sealed = options.Ctor.sealedOptions;
      if (!sealed) {
        return
      }
      var propsData = options.propsData;
      var prop = propsData.prop;

      switch (sealed.type) {
        case 'cartesian':
          if (prop && props.indexOf(prop) < 0) {
            props.push(prop);
          }
          slot.index = cartesians.length;
          cartesians.push(slot);
          break
        case 'object':
          this$1.addSpace(sealed.space);
          objects.push(slot);
          break
        case 'widget':
          widgets.push(slot);
          break
        default:
          break
      }
      if (sealed.preload) {
        sealed.preload({data: propsData, parent: this$1, index: slot.index});
      }
    });

    this.props = props;

    return h(
      'div',
      {
        style: {
          position: 'relative',
          width: autoresize ? '100%' : viewWidth + 'px'
        }
      },
      [
        h(
          'svg',
          {
            attrs: {
              width: viewWidth,
              height: height,
              viewBox: ("0 0 " + viewWidth + " " + height)
            }
          },
          [others, cartesians, objects]
        ),
        widgets
      ]
    )
  }
}

var Polar = {
  name: 'LaPolar',

  mixins: [plane],

  props: {
    fillContainer: Boolean
  },

  computed: {
    min: function min() {
      return Math.min(this.viewWidth, this.height)
    }
  },

  render: function render(h) {
    var ref = this;
    var viewWidth = ref.viewWidth;
    var height = ref.height;
    var autoresize = ref.autoresize;
    var slots = this.$slots.default || [];

    /**
     * Reset snap
     */
    this.snap = {};

    var props = [];
    var polars = [];
    var widgets = [];
    var others = [];

    slots.forEach(function (slot) {
      var options = slot.componentOptions;
      if (!options) {
        others.push(slot);
        return
      }
      var sealed = options.Ctor.sealedOptions;
      if (!sealed) {
        return
      }
      var propsData = options.propsData;
      var prop = propsData.prop;

      switch (sealed.type) {
        case 'polar':
          if (prop && props.indexOf(prop) < 0) {
            props.push(prop);
          }
          slot.index = polars.length;
          polars.push(slot);
          break
        case 'widget':
          widgets.push(slot);
          break
        default:
          break
      }
    });

    this.props = props;

    return h(
      'div',
      {
        style: {
          position: 'relative',
          width: autoresize ? '100%' : viewWidth + 'px'
        }
      },
      [
        h(
          'svg',
          {
            attrs: {
              width: this.fillContainer ? '100%' : viewWidth,
              height: this.fillContainer ? '100%' : height,
              viewBox: this.fillContainer ? ("0 0 " + (this.min) + " " + (this.min)) : ("0 0 " + viewWidth + " " + height),
              preserveAspectRatio: 'xMinYMin'
            }
          },
          [others, polars]
        ),
        widgets
      ]
    )
  }
}

var basic = {
  inject: ['Plane'],

  computed: {
    store: function store() {
      return this.Plane.store
    }
  }
}

var values = {
  props: {
    prop: String
  },

  mixins: [basic],

  computed: {
    raws: function raws() {
      var ref = this;
      var prop = ref.prop;
      var Plane = ref.Plane;

      return prop ? Plane.data.map(function (o) { return o[prop]; }) : null
    },

    values: function values() {
      var ref = this;
      var prop = ref.prop;
      var Plane = ref.Plane;

      return Plane.curData.filter(function (arr) { return arr.key === prop; })[0] || []
    }
  }
}

var animate = {
  props: {
    animated: Boolean,

    animationDuration: {
      default: 1,
      type: Number
    },

    animationEffect: {
      default: 'ease',
      type: String
    },

    transition: String
  },

  computed: {
    trans: function trans() {
      return (
        this.transition ||
        (this.animated ?
          ("all " + (this.animationDuration) + "s " + (this.animationEffect)) :
          'none')
      )
    }
  }
}

var chart = {
  mixins: [values, animate],

  props: {
    points: Array,

    color: String,

    label: String,

    showValue: Boolean
  },

  computed: {
    id: function id() {
      return this.$vnode.index
    },

    curColor: function curColor() {
      return this.color || this.Plane.genColor(this.id)
    },

    actived: function actived() {
      var ref = this.store;
      var hidden = ref.hidden;

      if (!isArr(hidden)) {
        return true
      }

      return hidden.indexOf(this.id) < 0
    }
  },

  watch: {
    'store.activedIndex': function store_activedIndex(index) {
      var ref = this;
      var store = ref.store;

      store.activedPoint = [].concat(store.activedPoint);

      this.$set(store.activedPoint, this.id, {
        color: this.curColor,
        value: this.raws[index],
        label: this.label
      });
    },

    curColor: {
      immediate: true,
      handler: function handler(val) {
        var ref = this;
        var store = ref.store;

        store.colors = store.colors || {};
        this.$set(store.colors, this.id, val);
      }
    },

    label: {
      immediate: true,
      handler: function handler(val) {
        var ref = this;
        var store = ref.store;

        store.labels = store.labels || {};
        this.$set(store.labels, this.id, val);
      }
    },

    props: {
      immediate: true,
      handler: function handler(val) {
        var ref = this;
        var store = ref.store;

        store.props = store.props || {};

        if (!isNil(this.id)) {
          this.$set(store.props, this.id, val);
        }
      }
    }
  }
}

var cartesian = {
  mixins: [chart],

  type: 'cartesian',

  computed: {
    curPoints: function curPoints() {
      var this$1 = this;

      if (this.points) {
        return this.points
      }

      var ref = this.Plane;
      var gap = ref.gap;
      var xRatio = ref.xRatio;
      var yRatio = ref.yRatio;
      var low = ref.low;
      var canvas = ref.canvas;
      var x0 = canvas.x0;
      var y1 = canvas.y1;

      return this.values.map(function (value, i) {
        var assign;

        if (isNil(this$1.raws[i])) {
          return [null]
        }

        var start = value[0];
        var end = value[1];

        if (start < 0) {
          (assign = value, end = assign[0], start = assign[1]);
        }

        start = Math.max(low, start);

        var y = isNaN(end) ? null : y1 - (end - low) * yRatio;
        var y0 = isNaN(start) ? null : y1 - (start - low) * yRatio;
        var x = x0 + xRatio * i + gap;

        return [x, y, y0]
      })
    },

    pointSlot: function pointSlot() {
      var this$1 = this;

      var scoped = this.$scopedSlots.default;
      var actived = this.store.activedIndex;

      return (
        scoped &&
        this.curPoints.map(function (p, i) { return scoped({
            x: p[0],
            y: p[1],
            value: this$1.raws[i],
            index: i,
            actived: actived === i,
            color: this$1.curColor,
            style: {
              transition: this$1.trans
            }
          }); }
        )
      )
    }
  }
}

var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) { throw new Error("negative radius: " + r); }

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) { throw new Error("negative radius: " + r); }

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) { return; }

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) { da = da % tau + tau; }

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line() {
  var x$$1 = x,
      y$$1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) { output = curve(buffer = path()); }

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) { output.lineStart(); }
        else { output.lineEnd(); }
      }
      if (defined0) { output.point(+x$$1(d, i, data), +y$$1(d, i, data)); }
    }

    if (buffer) { return output = null, buffer + "" || null; }
  }

  line.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), line) : x$$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), line) : y$$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function point(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

var Trans = {
  name: 'ElTrans',

  functional: true,

  props: ['from', 'trans'],

  render: function render(h, ref) {
    var children = ref.children;
    var props = ref.props;

    return h(
      'transition',
      {
        props: {
          appear: true
        },
        on: {
          beforeAppear: function beforeAppear(el) {
            // eslint-disable-next-line
            for (var key in props.from) {
              var val = props.from[key];
              var to = el.getAttribute(key);

              el.setAttribute(("data-" + key), to);
              el.setAttribute(key, val);
            }
          },

          appear: function appear(el) {
            setTimeout(function () {
              el.style.transition = props.trans;
              el.style.WebkitTransition = props.trans;
              el.style.msTransition = props.trans;
              el.style.MozTransition = props.trans;

              // eslint-disable-next-line
              for (var key in props.from) {
                var to = el.getAttribute(("data-" + key));

                el.setAttribute(key, to);
                el.removeAttribute(("data-" + key));
              }
            });
          }
        }
      },
      children
    )
  }
}

var Spread = {
  name: 'LaMotionSpread',

  functional: true,

  props: ['axis', 'transition'],

  render: function render(h, ref) {
    var children = ref.children;
    var props = ref.props;
    var parent = ref.parent;

    var id = "la-spread-" + (parent._uid);
    var axis = props.axis;
    var transition = props.transition;

    return h('g', [
      h('defs', [
        h(
          'clipPath',
          {
            attrs: {
              id: id
            }
          },
          [
            h(
              Trans,
              {
                props: {
                  from: {
                    width: axis === 'x' ? 0 : '100%',
                    height: axis === 'y' ? 0 : '100%'
                  },
                  trans: transition
                }
              },
              [
                h('rect', {
                  attrs: {
                    x: 0,
                    y: 0,
                    width: '100%',
                    height: '100%'
                  }
                })
              ]
            )
          ]
        )
      ]),
      h(
        'g',
        {
          attrs: {
            'clip-path': ("url(#" + id + ")")
          }
        },
        children
      )
    ])
  }
}

var dashed = {
  props: {
    dashed: [Boolean, String]
  },

  computed: {
    curDashed: function curDashed() {
      var ref = this;
      var dashed = ref.dashed;

      return dashed === true || dashed === '' ?
        3 :
        dashed === false ? 'none' : dashed
    }
  }
}

var Line = {
  name: 'LaLine',

  mixins: [cartesian, dashed],

  props: {
    curve: [Boolean, Function],

    dot: Boolean,

    width: {
      type: Number,
      default: 1
    },

    hideLine: Boolean,

    /**
     * @summary Like connectNulls
     */
    continued: Boolean
  },

  computed: {
    draw: function draw() {
      var ref = this;
      var curve = ref.curve;
      var continued = ref.continued;
      var draw = line().defined(noNilInArray);

      if (curve) {
        draw.curve(isFn(curve) ? curve : cardinal);
      }

      return function (p) {
        p = continued ? p.filter(noNilInArray) : p;
        return draw(p)
      }
    },

    valueSlot: function valueSlot() {
      var this$1 = this;

      var h = this.$createElement;

      return (
        this.showValue &&
        h(
          'g',
          {
            attrs: {
              fill: this.curColor
            }
          },
          this.curPoints.map(function (point$$1, i) {
            return h(
              'text',
              {
                attrs: {
                  x: point$$1[0],
                  y: point$$1[1],
                  dy: '-0.31em',
                  'text-anchor': 'middle'
                }
              },
              this$1.raws[i]
            )
          })
        )
      )
    }
  },

  render: function render(h) {
    var ref = this;
    var animated = ref.animated;
    var width = ref.width;
    var curPoints = ref.curPoints;
    var curColor = ref.curColor;
    var hideLine = ref.hideLine;
    var trans = ref.trans;
    var valueSlot = ref.valueSlot;
    var pointSlot = ref.pointSlot;
    var store = ref.store;
    var actived = ref.actived;

    if (!actived) {
      return null
    }

    var graphs = [
      !hideLine &&
        h('path', {
          attrs: {
            stroke: curColor,
            fill: 'none',
            'stroke-width': width,
            d: this.draw(curPoints)
          },
          style: {
            'stroke-dasharray': this.curDashed,
            transition: trans
          }
        }),
      this.$slots.default,
      this.dot &&
        h(
          'g',
          {
            attrs: {
              stroke: '#fff',
              fill: curColor
            }
          },
          curPoints.map(
            function (p, index) { return p[1] &&
              h('circle', {
                attrs: {
                  cx: p[0],
                  cy: p[1],
                  r: (index === store.activedIndex ? 2 : 0) + int(width) + 1
                },
                style: {
                  transition: trans
                }
              }); }
          )
        ),
      valueSlot,
      pointSlot
    ];

    if (animated) {
      return h(
        Spread,
        {
          props: {
            axis: 'x',
            transition: trans
          }
        },
        graphs
      )
    }

    return h('g', graphs)
  }
}

function area() {
  var x0 = x,
      x1 = null,
      y0 = constant(0),
      y1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) { output = curve(buffer = path()); }

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) { return output = null, buffer + "" || null; }
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

var Area = {
  name: 'LaArea',

  mixins: [Line],

  props: {
    fillColor: String
  },

  computed: {
    draw: function draw() {
      var ref = this;
      var curve = ref.curve;
      var continued = ref.continued;
      var draw = area()
        .y0(function (d) { return d[2]; })
        .defined(noNilInArray);

      if (curve) {
        draw.curve(isFn(curve) ? curve : cardinal);
      }

      return function (p) {
        p = continued ? p.filter(noNilInArray) : p;
        return draw(p)
      }
    },

    areaId: function areaId() {
      return ("la-area-" + (this._uid) + "-" + (this.id))
    },

    curFillColor: function curFillColor() {
      return this.fillColor || ("url(#" + (this.areaId) + ")")
    }
  },

  render: function render(h) {
    var ref = this;
    var trans = ref.trans;
    var curPoints = ref.curPoints;
    var curColor = ref.curColor;
    var curFillColor = ref.curFillColor;
    var actived = ref.actived;

    if (!actived) {
      return null
    }

    return h('g', [
      !this.fillColor &&
        h('defs', [
          h(
            'linearGradient',
            {
              // I don't kown why using `attrs` causes the client not to rerender if the server has already rendered.
              domProps: {
                id: this.areaId
              }
            },
            [
              h('stop', {
                attrs: {
                  'stop-color': curColor,
                  'stop-opacity': 0.5
                }
              })
            ]
          )
        ]),
      h(
        Line,
        {
          props: extend(extend({}, this.$props), {
            color: curColor,
            points: curPoints,
            transition: trans
          }),
          scopedSlots: this.$scopedSlots
        },
        [
          h('path', {
            attrs: {
              d: this.draw(curPoints),
              fill: curFillColor
            },
            style: {
              transition: trans
            }
          }),
          this.$slots.default
        ]
      )
    ])
  }
}

var DEFAULT_WIDTH = 20;

var Bar = {
  name: 'LaBar',

  mixins: [cartesian],

  props: {
    width: {
      type: Number,
      default: DEFAULT_WIDTH
    }
  },

  preload: function preload(ref) {
    var data = ref.data;
    var parent = ref.parent;
    var index = ref.index;

    var snap = parent.snap;
    var distance = parent.distance;
    var width = data.width || DEFAULT_WIDTH;

    snap.barMap = [].concat(snap.barMap, index);
    snap.barAllWidth = snap.barAllWidth || 0;
    snap.barOffset = [].concat(snap.barOffset, snap.barAllWidth);
    snap.barAllWidth += width + distance;
  },

  computed: {
    margin: function margin() {
      var ref = this;
      var id = ref.id;
      var width = ref.width;
      var ref$1 = this.Plane;
      var snap = ref$1.snap;
      var distance = ref$1.distance;
      var stacked = ref$1.stacked;
      var index = snap.barMap.indexOf(id);

      return stacked ?
        -width / 2 :
        snap.barOffset[index] - (snap.barAllWidth - distance) / 2
    },

    valueSlot: function valueSlot() {
      var this$1 = this;

      var h = this.$createElement;

      return (
        this.showValue &&
        h(
          'g',
          {
            attrs: {
              fill: '#fff'
            }
          },
          this.curPoints.map(function (point, i) {
            return h(
              'text',
              {
                attrs: {
                  x: point[0] + this$1.margin + this$1.width / 2,
                  y: point[2] + (point[1] - point[2]) / 2,
                  dy: '0.31em',
                  'text-anchor': 'middle'
                }
              },
              this$1.raws[i]
            )
          })
        )
      )
    }
  },

  methods: {
    getRect: function getRect(point) {
      var height = point[2] - point[1];

      return this.$createElement('rect', {
        attrs: {
          x: point[0] + this.margin,
          y: height < 0 ? point[2] : point[1],
          width: this.width,
          height: Math.abs(height)
        }
      })
    }
  },

  render: function render(h) {
    var this$1 = this;

    var ref = this;
    var curPoints = ref.curPoints;
    var curColor = ref.curColor;
    var animated = ref.animated;
    var trans = ref.trans;
    var pointSlot = ref.pointSlot;
    var valueSlot = ref.valueSlot;
    var actived = ref.actived;

    if (!actived) {
      return null
    }

    var rects = [];

    if (animated) {
      rects = curPoints.map(function (point) {
        return h(
          Trans,
          {
            props: {
              from: {
                height: 0,
                y: this$1.Plane.canvas.y1
              },
              trans: trans
            }
          },
          [this$1.getRect(point)]
        )
      });
    } else {
      rects = curPoints.map(this.getRect);
    }

    return h(
      'g',
      {
        attrs: {
          fill: curColor
        }
      },
      [].concat(rects, valueSlot, pointSlot)
    )
  }
}

var polar = {
  type: 'polar',

  mixins: [chart]
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity(d) {
  return d;
}

var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon$1 = 1e-12;
var pi$1 = Math.PI;
var halfPi = pi$1 / 2;
var tau$1 = 2 * pi$1;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi$1 : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

function pie() {
  var value = identity,
      sortValues = descending,
      sort = null,
      startAngle = constant(0),
      endAngle = constant(tau$1),
      padAngle = constant(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau$1, Math.max(-tau$1, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) { index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); }); }
    else if (sort != null) { index.sort(function(i, j) { return sort(data[i], data[j]); }); }

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
  };

  return pie;
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) { cx0 = cx1, cy0 = cy1; }

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) { context = buffer = path(); }

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) { r = r1, r1 = r0, r0 = r; }

    // Is it a point?
    if (!(r1 > epsilon$1)) { context.moveTo(0, 0); }

    // Or is it a circle or annulus?
    else if (da > tau$1 - epsilon$1) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon$1) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon$1) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon$1) {
        var p0 = asin(rp / r0 * sin(ap)),
            p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon$1) { p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0; }
        else { da0 = 0, a00 = a10 = (a0 + a1) / 2; }
        if ((da1 -= p1 * 2) > epsilon$1) { p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1; }
        else { da1 = 0, a01 = a11 = (a0 + a1) / 2; }
      }

      var x01 = r1 * cos(a01),
          y01 = r1 * sin(a01),
          x10 = r0 * cos(a10),
          y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > epsilon$1) {
        var x11 = r1 * cos(a11),
            y11 = r1 * sin(a11),
            x00 = r0 * cos(a00),
            y00 = r0 * sin(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < pi$1) {
          var oc = da0 > epsilon$1 ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min(rc, (r0 - lc) / (kc - 1));
          rc1 = min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon$1)) { context.moveTo(x01, y01); }

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon$1) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) { context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw); }

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else { context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw); }

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon$1) || !(da0 > epsilon$1)) { context.lineTo(x10, y10); }

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon$1) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) { context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw); }

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else { context.arc(0, 0, r0, a10, a00, cw); }
    }

    context.closePath();

    if (buffer) { return context = null, buffer + "" || null; }
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$1 / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, arc) : context;
  };

  return arc;
}

var Circle = {
  name: 'LaMotionCircle',

  functional: true,

  props: ['r', 'transition'],

  render: function render(h, ref) {
    var children = ref.children;
    var props = ref.props;
    var parent = ref.parent;

    var id = "la-circle-" + (parent._uid);
    var transition = props.transition;

    return h('g', [
      h('defs', [
        h(
          'clipPath',
          {
            attrs: {
              id: id
            }
          },
          [
            h(
              Trans,
              {
                props: {
                  from: {
                    r: 0
                  },
                  trans: transition
                }
              },
              [
                h('circle', {
                  attrs: {
                    r: props.r * 1.5
                  }
                })
              ]
            )
          ]
        )
      ]),
      h(
        'g',
        {
          attrs: {
            'clip-path': ("url(#" + id + ")")
          }
        },
        children
      )
    ])
  }
}

var Pie = {
  name: 'LaPie',

  mixins: [polar],

  props: {
    translate: {
      type: [String, Array],
      default: function () { return ['50%', '50%']; }
    },

    radius: {
      type: [Number, Array],
      default: function () { return [0, 100]; }
    },

    angles: {
      type: [Number, Array],
      default: function () { return [0, Math.PI * 2]; }
    },

    showLabel: Boolean,

    labelProp: {
      type: String,
      default: 'label'
    }
  },

  computed: {
    arcs: function arcs() {
      return pie()
        .startAngle(this.curAngles[0])
        .endAngle(this.curAngles[1])
        .sortValues(noop)(this.raws)
    },

    curRadius: function curRadius() {
      var innerRadius = isArr(this.radius) ? this.radius[0] : 0;
      var outerRadius = isArr(this.radius) ? this.radius[1] : 100;

      if (this.min && this.$parent.fillContainer) {
        outerRadius = this.min / 2;

        if (this.showLabel) {
          outerRadius -= this.min / 4;
        }
      }

      return [innerRadius, outerRadius]
    },

    curAngles: function curAngles() {
      var ref = this;
      var angles = ref.angles;

      return isArr(angles) ? angles : [0, angles]
    },

    draw: function draw() {
      return arc()
        .innerRadius(this.curRadius[0])
        .outerRadius(this.curRadius[1])
    },

    drawText: function drawText() {
      return arc()
        .innerRadius((this.$parent.fillContainer ? 0 : this.curRadius[1]) * 0.7)
        .outerRadius((this.$parent.fillContainer ? this.min : this.curRadius[1]) * 0.7)
    },

    drawTextLabels: function drawTextLabels() {
      var innerRadius = this.$parent.fillContainer ? (this.radius[0] + this.min / 5) : this.curRadius[1] * 0.7;
      var outerRadius = this.$parent.fillContainer ? (this.radius[0] + this.min / 5) : this.curRadius[1] * 0.7;

      return arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
    },

    min: function min() {
      return this.$parent.min
    },

    valueSlot: function valueSlot() {
      var this$1 = this;

      if (!this.showValue) {
        return
      }
      var h = this.$createElement;

      return this.arcs.map(function (arc$$1, i) {
        var point = this$1.drawText.centroid(arc$$1);

        return h(
          'text',
          {
            attrs: {
              x: point[0],
              y: point[1],
              fill: '#fff',
              'text-anchor': 'middle'
            }
          },
          this$1.raws[i]
        )
      })
    },

    labels: function labels() {
      var ref = this;
      var labelProp = ref.labelProp;
      var Plane = ref.Plane;

      return labelProp ? Plane.data.map(function (o) { return o[labelProp]; }) : null
    },

    labelSlot: function labelSlot() {
      var this$1 = this;

      if (!this.showLabel) {
        return
      }

      var h = this.$createElement;

      return this.arcs.map(function (arc$$1, i) {
        var point = this$1.drawTextLabels.centroid(arc$$1);

        return h(
          'text',
          {
            attrs: {
              x: (point[0] * 0.95) << 1,
              y: (point[1] * 0.95) << 1,
              fill: '#000',
              'text-anchor': 'middle'
            }
          },
          this$1.labels[i]
        )
      })
    }
  },

  render: function render(h) {
    var this$1 = this;

    var ref = this.Plane;
    var genColor = ref.genColor;
    var ref$1 = this;
    var animated = ref$1.animated;
    var arcs = ref$1.arcs;
    var draw = ref$1.draw;
    var paths = arcs.map(draw).map(function (d, i) {
      return h('path', {
        attrs: {
          d: d,
          fill: genColor(i),
          stroke: '#fff'
        }
      })
    });
    var scoped = this.$scopedSlots.default;
    var pointSlot =
      scoped &&
      arcs.map(function (arc$$1, i) {
        var point = this$1.drawText.centroid(arc$$1);
        return scoped({
          arc: arc$$1,
          index: i,
          x: point[0],
          y: point[1],
          style: {
            transition: this$1.trans
          }
        })
      });
    var nodes = [].concat(paths, this.valueSlot, this.labelSlot, pointSlot);

    var data = {
      style: {
        transform: ("translate(" + (this.translate) + ")")
      }
    };

    if (animated) {
      return h('g', data, [
        h(
          Circle,
          {
            props: {
              transition: this.trans,
              r: this.curRadius[1]
            }
          },
          nodes
        )
      ])
    }

    return h('g', data, nodes)
  }
}

var object = {
  mixins: [basic],

  props: {
    color: String
  },

  type: 'object',

  computed: {
    curColor: function curColor() {
      return this.color || this.Plane.textColor
    }
  }
}

var CAP_HEIGHT = 0.71;

var axes = {
  props: {
    color: String,

    tickSize: {
      type: Number,
      default: 5
    },

    fontSize: {
      type: Number,
      default: 15
    },

    format: Function,

    gridline: Boolean,

    gridlineInterval: [Function, Number],

    interval: [Function, Number],

    ticks: Array,

    nbTicks: Number
  },

  mixins: [object, values, dashed],

  computed: {
    isX: function isX() {
      return this.$options.axis === 'x'
    },

    labels: function labels() {
      var raws = this.raws;
      var board = this.Plane;
      var length = board.len;

      if (this.isX) {
        raws = raws || Array.apply(null, {length: length}).map(function (n, i) { return i + 1; });
      } else {
        raws = genTicks(board.low, board.high, length);
      }

      return raws
    },

    gap: function gap() {
      return this.isX ? this.Plane.gap : 0
    },

    points: function points() {
      var ref = this;
      var board = ref.Plane;
      var isX = ref.isX;
      var labels = ref.labels;
      var inverse = ref.inverse;
      var gap = ref.gap;
      var ref$1 = board.canvas;
      var x0 = ref$1.x0;
      var y0 = ref$1.y0;
      var y1 = ref$1.y1;
      var width = ref$1.width;
      var height = ref$1.height;
      var points;

      if (isX) {
        var xRatio = board.xRatio;
        var offset = inverse ? 0 : height;
        var y = y0 + offset;

        points = labels.map(function (value, i) {
          var x = x0 + xRatio * i + gap;

          return [x, y]
        });
      } else {
        var yRatio = board.yRatio;
        var low = board.low;
        var offset$1 = inverse ? width : 0;
        var x = x0 + offset$1;

        points = labels.map(function (value) {
          var y = y1 - (value - low) * yRatio;

          return [x, y]
        });
      }

      return points
    },

    curColor: function curColor() {
      return this.color || this.Plane.textColor
    },

    handleInterval: function handleInterval() {
      var ref = this;
      var interval = ref.interval;

      if (typeof interval === 'number') {
        return function (i) {
          return i % interval === 0
        }
      }

      if (isFn(interval)) {
        return interval
      }
    },

    handleGridlineInterval: function handleGridlineInterval() {
      var ref = this;
      var gridlineInterval = ref.gridlineInterval;

      if (typeof gridlineInterval === 'number') {
        return function (i) {
          return i % gridlineInterval === 0
        }
      }

      if (isFn(gridlineInterval)) {
        return gridlineInterval
      }
    }
  },

  watch: {
    'store.activedIndex': function store_activedIndex(index) {
      if (this.isX) {
        this.$set(this.store, 'activedLabel', this.labels[index]);
      }
    }
  },

  render: function render(h) {
    var this$1 = this;

    var ref = this;
    var ticks = ref.ticks;

    var ref$1 = this;
    var nbTicks = ref$1.nbTicks;
    var points = ref$1.points;
    var labels = ref$1.labels;
    var tickSize = ref$1.tickSize;
    var fontSize = ref$1.fontSize;
    var curColor = ref$1.curColor;
    var isX = ref$1.isX;
    var format = ref$1.format;
    var inverse = ref$1.inverse;
    var gap = ref$1.gap;
    var board = ref$1.Plane;
    var store = ref$1.store;
    var first = points[0];
    var end = points[points.length - 1];
    var tspanSlot = this.$scopedSlots.default;

    var lineSize = (inverse ? -1 : 1) * tickSize;
    var yLineOffset = (isX ? 1 : 0) * lineSize;
    var xLineOffset = (isX ? 0 : 1) * lineSize;
    var textAlign = isX ? 'middle' : inverse ? 'start' : 'end';
    var spanYOffset = isX ?
      inverse ? CAP_HEIGHT - 1 : CAP_HEIGHT :
      CAP_HEIGHT / 2;
    var textYOffset = (isX ? lineSize : 0) * 1.5;
    var textXOffset = (isX ? 0 : lineSize) * 1.5;

    if (ticks || nbTicks) {
      var yBasis = board.height - board.offset[2];

      if (nbTicks) {
        ticks = genExactNbTicks(board.low, board.high, nbTicks);
      }

      ticks = ticks.map(function (value) {
        return h('g', [
          tickSize &&
            h('line', {
              attrs: {
                x1: 0 - xLineOffset + board.offset[3],
                x2: 6 - xLineOffset + board.offset[3],
                y1: yBasis - value * board.yRatio,
                y2: yBasis - value * board.yRatio - yLineOffset,
                stroke: curColor
              }
            }),
          h(
            'text',
            {
              attrs: {
                x: 0 - textXOffset + board.offset[3],
                y:
                  board.height -
                  board.offset[2] -
                  value * board.yRatio -
                  textYOffset,
                dy: spanYOffset + 'em',
                stroke: 'none'
              }
            },
            tspanSlot ?
              tspanSlot({value: value}) :
              isFn(format) ? format(value) : value
          )
        ])
      });
    } else {
      ticks = labels
        .map(function (value, i) {
          var point = points[i];

          if (this$1.handleInterval && !this$1.handleInterval(i)) {
            return false
          }

          return h('g', [
            tickSize &&
              h('line', {
                attrs: {
                  x1: point[0] - xLineOffset,
                  x2: point[0],
                  y1: point[1] + yLineOffset,
                  y2: point[1],
                  stroke: curColor
                }
              }),
            h(
              'text',
              {
                attrs: {
                  x: point[0] - textXOffset,
                  y: point[1] + textYOffset,
                  dy: spanYOffset + 'em',
                  stroke: 'none'
                }
              },
              tspanSlot ?
                tspanSlot({value: value}) :
                isFn(format) ? format(value) : value
            )
          ])
        })
        .filter(Boolean);
    }

    return h(
      'g',
      {
        attrs: {
          stroke: curColor
        }
      },
      [
        h('line', {
          attrs: {
            x2: end[0] + gap,
            y2: end[1],
            x1: first[0] - gap,
            y1: first[1]
          }
        }),
        [
          h(
            'g',
            {
              attrs: {
                'text-anchor': textAlign,
                'font-size': fontSize,
                fill: curColor,
                stroke: 'none'
              }
            },
            ticks
          )
        ].concat(
          this.gridline &&
            points.reduce(function (all, p, i) {
              if (
                !this$1.handleGridlineInterval ||
                this$1.handleGridlineInterval(i)
              ) {
                all.push(
                  h('line', {
                    attrs: {
                      x1: p[0],
                      y1: p[1],
                      x2: isX ? p[0] : board.canvas.x1,
                      y2: isX ? board.canvas.y0 : p[1]
                    },
                    style: {
                      opacity: isX && store.activedIndex === i ? 1 : 0.3,
                      'stroke-dasharray': this$1.curDashed
                    }
                  })
                );
              }
              return all
            }, [])
        )
      ]
    )
  }
}

var XAxis = {
  name: 'LaXAxis',

  axis: 'x',

  space: [0, 20, 24, 20],

  mixins: [axes]
}

var YAxis = {
  name: 'LaYAxis',

  axis: 'y',

  space: [10, 0, 0, 40],

  mixins: [axes]
}

var XAxisInverse = {
  name: 'LaXAxisInverse',

  space: [24, 20, 0, 20],

  beforeCreate: function beforeCreate() {
    this.inverse = true;
  },

  mixins: [XAxis]
}

var YAxisInverse = {
  name: 'LaYAxisInverse',

  space: [10, 40, 0, 0],

  beforeCreate: function beforeCreate() {
    this.inverse = true;
  },

  mixins: [YAxis]
}

var YMarker = {
  name: 'LaYMarker',

  mixins: [object, dashed],

  props: {
    label: String,

    value: Number,

    placement: {
      type: String,
      default: 'end'
    }
  },

  computed: {
    point: function point() {
      var ref = this.Plane;
      var yRatio = ref.yRatio;
      var low = ref.low;
      var canvas = ref.canvas;
      var x0 = canvas.x0;
      var y1 = canvas.y1;
      var x1 = canvas.x1;
      var y = y1 - (this.value - low) * yRatio;

      return {x1: x0, y1: y, y2: y, x2: x1}
    }
  },

  render: function render(h) {
    var ref = this;
    var point = ref.point;
    var curColor = ref.curColor;
    var curDashed = ref.curDashed;
    var label = ref.label;
    var placement = ref.placement;

    return h(
      'g',

      [
        h('line', {
          attrs: point,
          style: {
            stroke: curColor,
            'stroke-dasharray': curDashed
          }
        }),
        label &&
          h(
            'text',
            {
              attrs: {
                fill: curColor,
                x:
                  placement === 'end' ?
                    point.x2 :
                    placement === 'start' ?
                      point.x1 :
                      (point.x2 - point.x1) / 2 + point.x1,
                y: point.y1,
                dy: '-0.31em',
                'text-anchor': placement
              }
            },
            label
          )
      ]
    )
  }
}

var YRegion = {
  name: 'LaYRegion',

  mixins: [object, dashed],

  props: {
    label: String,

    low: {
      type: Number,
      required: true
    },

    high: {
      type: Number,
      required: true
    },

    fillColor: String,

    placement: {
      type: String,
      default: 'end'
    }
  },

  computed: {
    point: function point() {
      var ref = this.Plane;
      var yRatio = ref.yRatio;
      var low = ref.low;
      var canvas = ref.canvas;
      var x0 = canvas.x0;
      var y1 = canvas.y1;
      var width = canvas.width;

      return {
        x: x0,
        y: y1 - (this.high - low) * yRatio,
        height: (this.high - this.low) * yRatio,
        width: width
      }
    },

    fillAttr: function fillAttr() {
      var ref = this;
      var fillColor = ref.fillColor;

      return fillColor ?
        {
          fill: fillColor,
          stroke: this.curColor
        } :
        {
          stroke: this.curColor,
          opacity: 0.3
        }
    }
  },

  render: function render(h) {
    var ref = this;
    var label = ref.label;
    var point = ref.point;
    var placement = ref.placement;
    var fillAttr = ref.fillAttr;

    if (this.high < this.low) {
      return
    }

    return h(
      'g',
      {
        attrs: {
          fill: this.curColor
        }
      },
      [
        h('rect', {
          attrs: extend(fillAttr, point),
          style: {
            'stroke-dasharray': this.curDashed
          }
        }),
        label &&
          h(
            'text',
            {
              attrs: {
                x:
                  placement === 'end' ?
                    point.x + point.width :
                    placement === 'start' ?
                      point.x :
                      point.width / 2 + point.x,
                y: point.y,
                dy: '-0.31em',
                'text-anchor': placement
              }
            },
            label
          )
      ]
    )
  }
}

var widget = {
  type: 'widget',

  mixins: [basic]
}

var Tooltip = {
  name: 'LaTooltip',

  mixins: [widget, animate],

  props: {
    animationDuration: {
      default: 0.5,
      type: Number
    }
  },

  data: function () { return ({
    left: 0,
    top: 0,
    show: false
  }); },

  methods: {
    handleMove: function handleMove(ref) {
      var x = ref.x;
      var y = ref.y;

      var board = this.Plane;
      var boardRect = board.$el.getBoundingClientRect();
      var rect = this.$el.getBoundingClientRect();
      var relY = y - boardRect.y;
      var relX = x - boardRect.x - this.offsetX;
      var index = Math.round(relX / board.xRatio);
      var maxLeft = board.canvas.x1 - rect.width;
      var maxTop = board.canvas.y1 - rect.height;
      var offset = 10;

      if (relY >= board.canvas.y0 && relY <= board.canvas.y1) {
        if (index > -1 && index < board.len) {
          this.left = Math.min(
            index * board.xRatio + this.offsetX + offset,
            maxLeft
          );
          this.$set(this.store, 'activedIndex', index);
          this.top = Math.min(relY + offset, maxTop);
          this.show = true;
        }
        return
      }
      this.handleLeave();
    },

    handleLeave: function handleLeave() {
      this.show = false;
      this.$set(this.store, 'activedIndex', null);
    }
  },

  computed: {
    offsetX: function offsetX() {
      var board = this.Plane;
      return board.canvas.x0 + board.gap
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var board = this.Plane;
    var el = board.$el;

    el.addEventListener('mousemove', debounce(this.handleMove, 10));
    el.addEventListener('mouseleave', this.handleLeave);
    el.addEventListener(
      'touchmove',
      function (e) {
        var touch = e.touches[0];
        this$1.handleMove({x: touch.clientX, y: touch.clientY});
      },
      {
        passive: true
      }
    );
  },

  render: function render(h) {
    var ref = this.store;
    var activedLabel = ref.activedLabel;
    var activedPoint = ref.activedPoint; if ( activedPoint === void 0 ) activedPoint = [];
    var activedIndex = ref.activedIndex;
    var slot = this.$scopedSlots.default;
    var tooltip = slot ?
      slot({
        label: activedLabel,
        actived: activedPoint,
        index: activedIndex
      }) :
      h(
        'div',
        {
          style: {
            background: '#00000095',
            padding: '8px',
            color: '#fff',
            borderRadius: '4px'
          }
        },
        [
          h(
            'div',
            {
              style: {
                marginBottom: '.5em'
              }
            },
            activedLabel
          ),
          activedPoint.map(function (active) { return h('div', [
              h('span', {
                style: {
                  backgroundColor: active.color,
                  height: '10px',
                  width: '10px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '5px'
                }
              }),
              active.label &&
                  h(
                    'span',
                    {
                      style: {
                        marginRight: '5px'
                      }
                    },
                    active.label + ':'
                  ),
              h('span', active.value)
            ]); }
          )
        ]
      );

    return h(
      'div',
      {
        class: 'la-tooltip',
        style: {
          position: 'absolute',
          top: 0,
          transform: ("translate(" + (this.left) + "px, " + (this.top) + "px)"),
          transition: this.trans,
          opacity: Number(this.show)
        }
      },
      [tooltip]
    )
  }
}

var Legend = {
  name: 'LaLegend',

  mixins: [widget],

  props: {
    selectable: Boolean,

    /**
     * ^(top|bottom|left|right)(-(start|center|end))?$
     */
    placement: {
      type: String,
      default: 'bottom'
    },

    color: String
  },

  preload: function preload(ref) {
    var data = ref.data;
    var parent = ref.parent;

    var placement = data.placement; if ( placement === void 0 ) placement = 'bottom';
    var space = [0, 0, 0, 0];

    switch (placement.match(/^(\w+)-?/)[1]) {
      case 'bottom':
        space[2] = 50;
        break
      case 'top':
        space[0] = 50;
        break
      case 'left':
        space[3] = 100;
        break
      case 'right':
        space[1] = 100;
        break
      default:
        break
    }

    parent.addSpace(space);
  },

  computed: {
    curColor: function curColor() {
      return this.color || this.Plane.textColor
    },

    position: function position() {
      return this.placement.match(/^(\w+)(-(\w+))?$/)[1]
    },

    align: function align() {
      return this.placement.match(/^(\w+)(-(\w+))?$/)[3]
    },

    pos: function pos() {
      var ref = this;
      var position = ref.position;
      var align = ref.align;
      var pos = {};

      if (position === 'top' || position === 'bottom') {
        switch (align) {
          case 'start':
            pos.left = 0;
            break
          case 'end':
            pos.right = 0;
            break
          default:
            pos.left = '50%';
            pos.transform = 'translateX(-50%)';
            break
        }
        if (position === 'top') {
          pos.top = 0;
        } else {
          pos.bottom = 0;
        }
      } else {
        switch (align) {
          case 'start':
            pos.top = 0;
            break
          case 'end':
            pos.bottom = 0;
            break
          default:
            pos.top = '50%';
            pos.transform = 'translateY(-50%)';
            break
        }
        if (position === 'left') {
          pos.left = 0;
        } else {
          pos.right = 0;
        }
      }

      return pos
    }
  },

  created: function created() {
    this.$set(this.store, 'hidden', []);
  },

  render: function render(h) {
    var ref = this;
    var curColor = ref.curColor;
    var pos = ref.pos;
    var position = ref.position;
    var selectable = ref.selectable;
    var store = ref.store;
    var hidden = store.hidden;
    var slot = this.$scopedSlots.default;

    return h(
      'div',
      {
        class: 'la-legend',
        style: extend(
          {
            position: 'absolute'
          },
          pos
        )
      },
      Object.keys(store.props).map(function (id) { return h(
          'div',
          {
            style: {
              display:
                position === 'left' || position === 'right' ?
                  'block' :
                  'inline-block',
              marginRight: '10px',
              marginLeft: '5px',
              color: curColor,
              cursor: selectable ? 'pointer' : 'nromal'
            },
            on: {
              click: function () {
                if (!selectable) {
                  return
                }
                id = Number(id);
                var index = hidden.indexOf(id);

                if (index < 0) {
                  hidden.push(id);
                } else {
                  hidden.splice(index, 1);
                }
              }
            }
          },
          slot ?
            slot({
              color: store.colors[id],
              label: store.labels[id],
              prop: store.props[id]
            }) :
            [
              h('span', {
                style: {
                  backgroundColor: store.colors[id],
                  height: '10px',
                  width: '10px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '5px'
                }
              }),
              h(
                'span',
                {
                  style:
                      hidden.indexOf(Number(id)) > -1 ?
                        {
                          textDecoration: 'line-through'
                        } :
                        {}
                },
                store.labels[id]
              )
            ]
        ); }
      )
    )
  }
}

function Laue(Vue) {
  [
    Cartesian,
    Polar,
    Line,
    Area,
    Bar,
    Pie,
    XAxis,
    YAxis,
    XAxisInverse,
    YAxisInverse,
    Tooltip,
    Legend,
    YMarker,
    YRegion
  ].forEach(function (c) {
    Vue.component(c.name, c);
  });
}

export { Laue, Cartesian, Polar, Line, Area, Bar, Pie, XAxis, YAxis, XAxisInverse, YAxisInverse, Tooltip, Legend, YMarker, YRegion };
