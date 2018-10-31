# Line chart examples

## Tiny chart

A tiny example, you can use [Line](api#line), [Area](api#area) or [Bar](api#bar) chart.

[tiny-chart.vue](../_examples/tiny-chart.vue)

## Simple line chart

An example of a simple line chart with three smooth series.

[simple-line-chart.vue](../_examples/simple-line-chart.vue)

## Line gradient color

Custom gradient color, similar to [vue-trend](https://cinwell.com/vue-trend/). You need to know how to use [linearGradient](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient).

[line-gradient-color.vue](../_examples/line-gradient-color.vue)

## Line chart with area

This chart uses [Area](api#area) component to draw an area shape. Use the `bound` to specify the lower bound.

[line-chart-with-area.vue](../_examples/line-chart-with-area.vue)

## Custom area fill

The default fill color and line color are the same, this is a custom fill way.

[custom-area-fill.vue](../_examples/custom-area-fill.vue)

## Holes in data

If the data does not exits, it will not be rendered. You can configure `continuted` so that the line are continuous.

[holes-in-data.vue](../_examples/holes-in-data.vue)

## Curves

All shapes are drawn through [d3-shape](https://github.com/d3/d3-shape).
If `curve` is true, the line will be drawn as a [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline). Of course you can use other curve.

You need to install `d3-shape` and import the curve functions.(refer: [d3-shape#curves](https://github.com/d3/d3-shape#curves))

[curves.vue](../_examples/curves.vue)

## Custom dots

With _scoped slot_ you can customize the shape of the points.

[custom-dots.vue](../_examples/custom-dots.vue)

# Bar chart examples

## Simple bar chart

When you use the bar chart, it's best to configure the `narrow` so that there is enough space on both sides of the X axis.

[simple-bar-chart.vue](../_examples/simple-bar-chart.vue)

## Stacked bar chart

[stacked-bar-chart.vue](../_examples/stacked-bar-chart.vue)

# Pie chart examples

## Simple pie chart

[simple-pie-chart.vue](../_examples/simple-pie-chart.vue)

## Pie chart with custom labels

[pie-chart-with-custom-labels.vue](../_examples/pie-chart-with-custom-labels.vue)

## Gauge chart

[gauge-chart.vue](../_examples/gauge-chart.vue)

# Advanced examples

## Custom tooltip

You can customize the tooltip through the _scoped slot_.

[custom-tooltip.vue](../_examples/custom-tooltip.vue)

## Dynamic data

[dynamic-data.vue](../_examples/dynamic-data.vue)

## Inverse axes

The Inverse axes and the normal axes can coexist, and the usage is the same.

[inverse-axes.vue](../_examples/inverse-axes.vue)

## Responsive

The width of the chart is automatically changed when the window triggers the resize event.

[responsive.vue](../_examples/responsive.vue)

## Mixed

[mixed.vue](../_examples/mixed.vue)

## Large Data

[large-data.vue](../_examples/large-data.vue)

## Custom ticks

[custom-ticks.vue](../_examples/custom-ticks.vue)

## Fixed number of ticks

[fixed-ticks-number.vue](../_examples/fixed-ticks-number.vue)

## Pie filling container

[fill-container-pie.vue](../_examples/fill-container-pie.vue)
