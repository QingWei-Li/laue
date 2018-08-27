# Charts

## Line

- Parent: [Cartesian](#cartesian)

### Line - Props

| Name              | Description                                                                                   | Required | Type                 | Default               |
| ----------------- | --------------------------------------------------------------------------------------------- | -------- | -------------------- | --------------------- |
| prop              | Field name.                                                                                   | true     | `String`             | -                     |
| curve             | Convert the line to a curve, and you can customize the function. [example][curves]            | -        | `Boolean | Function` | -                     |
| dot               | Draw dots on coordinates.                                                                     | -        | `Boolean`            | false                 |
| width             | Line width.                                                                                   | -        | `Number`             | 1                     |
| hideLine          | Hide line.                                                                                    | -        | `Boolean`            | false                 |
| dashed            | Draw a dashed by [stroke-dasharray][stroke-dasharray], or configure the string sush as `5 5`. | -        | `Boolean | String`   | false                 |
| continued         | If some of the data in the array is null, the line will break. [example][continued]           | -        | `Boolean`            | false                 |
| animated          | Triggers animation when the line appears or data changes.                                     | -        | `Boolean`            | false                 |
| animationDuration | The animation duration, Default 1s.                                                           | -        | `Number`             | 1                     |
| animationEffect   | The easing function, Accepts any transition timing function within the [CSS spec][easing].    | -        | `String`             | ease                  |
| color             | Line color. The default value from the `colors` of cartesian.                                 | -        | `String`             | `colors` of cartesian |
| showValue         | Display value on coordinates.                                                                 | -        | `Boolean`            | false                 |
| label             | Display label within the tooltip.                                                             | -        | `String`             | -                     |

### Line - Slots

| Name    | Description                         | Type                         | Props                                         |
| ------- | ----------------------------------- | ---------------------------- | --------------------------------------------- |
| default | Custom dots. [example][custom-dots] | [scoped slots][scoped-slots] | { x, y, value, index, actived, color, style } |

## Area

- Parent: [Cartesian](#cartesian)

### Area - Props

| Name              | Description                                                                                   | Required | Type                 | Default               |
| ----------------- | --------------------------------------------------------------------------------------------- | -------- | -------------------- | --------------------- |
| prop              | Field name.                                                                                   | true     | `String`             | -                     |
| curve             | Convert the line to a curve, and you can customize the function. [example][curves]            | -        | `Boolean | Function` | -                     |
| dot               | Draw dots on coordinates.                                                                     | -        | `Boolean`            | false                 |
| width             | Line width.                                                                                   | -        | `Number`             | 1                     |
| hideLine          | Hide line.                                                                                    | -        | `Boolean`            | false                 |
| dashed            | Draw a dashed by [stroke-dasharray][stroke-dasharray], or configure the string sush as `5 5`. | -        | `Boolean | String`   | false                 |
| continued         | If some of the data in the array is null, the line will break. [example][continued]           | -        | `Boolean`            | false                 |
| animated          | Triggers animation when the line appears or data changes.                                     | -        | `Boolean`            | false                 |
| animationDuration | The animation duration, Default 1s.                                                           | -        | `Number`             | 1                     |
| animationEffect   | The easing function, Accepts any transition timing function within the [CSS spec][easing].    | -        | `String`             | ease                  |
| color             | Line color. The default value from the `colors` of cartesian.                                 | -        | `String`             | `colors` of cartesian |
| fillColor         | Area color. The default value from the `colors` of cartesian.                                 | -        | `String`             | `colors` of cartesian |
| showValue         | Display value on coordinates.                                                                 | -        | `Boolean`            | false                 |
| label             | Display label within the tooltip.                                                             | -        | `String`             | -                     |

### Area - Slots

| Name    | Description                         | Type                         | Props                                         |
| ------- | ----------------------------------- | ---------------------------- | --------------------------------------------- |
| default | Custom dots. [example][custom-dots] | [scoped slots][scoped-slots] | { x, y, value, index, actived, color, style } |

## Bar

- Parent: [Cartesian](#cartesian)

When you use the bar chart, it's best to configure the `narrow` for cartesian so that there is enough space on both sides of the X axis.

### Bar - Props

| Name              | Description                                                                                | Required | Type      | Default               |
| ----------------- | ------------------------------------------------------------------------------------------ | -------- | --------- | --------------------- |
| prop              | Field name.                                                                                | true     | `String`  | -                     |
| width             | Line width.                                                                                | -        | `Number`  | 1                     |
| animated          | Triggers animation when the line appears or data changes.                                  | -        | `Boolean` | false                 |
| animationDuration | The animation duration, Default 1s.                                                        | -        | `Number`  | 1                     |
| animationEffect   | The easing function, Accepts any transition timing function within the [CSS spec][easing]. | -        | `String`  | ease                  |
| color             | The default value from the `colors` of cartesian.                                          | -        | `String`  | `colors` of cartesian |
| showValue         | Display value on coordinates.                                                              | -        | `Boolean` | false                 |
| label             | Display label within the tooltip.                                                          | -        | `String`  | -                     |

### Bar - Slots

| Name    | Description                         | Type                         | Props                                         |
| ------- | ----------------------------------- | ---------------------------- | --------------------------------------------- |
| default | Custom dots. [example][custom-dots] | [scoped slots][scoped-slots] | { x, y, value, index, actived, color, style } |

## Pie

| Name      | Description                                 | Required | Type                     | Default          |
| --------- | ------------------------------------------- | -------- | ------------------------ | ---------------- |
| prop      | Field name.                                 | true     | `String`                 | -                |
| translate | Transalate the center of the pie chart.     | false    | `Array<String> | String` | [50%, 50%]       |
| radius    | Specific the inner radius and outer radius. | false    | `Array<Number> | Number` | [0, 100]         |
| angles    | Specific the start angle and end angle.     | false    | `Array<Number> | Number` | [0, Math.PI * 2] |
| showLabel | Whether to display the label of each fan.   | false    | `Boolean`                | false            |
| labelProp | The label to diplay as label.               | false    | `String`                 | label            |

- Parent: [Polar](#polar)

# Objects

## Cartesian

A cartesian plane.

### Cartesian - Props

| Name       | Description                                                                                                                       | Required | Type                                | Default                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| data       | An array of objects.                                                                                                              | true     | `Array<Object>`                     | -                                                                                 |
| height     | The height of SVG.                                                                                                                | -        | `Number`                            | 300                                                                               |
| width      | The width of SVG.                                                                                                                 | -        | `Number`                            | 600                                                                               |
| autoresize | Automatically changes the width when the window resize.                                                                           | -        | `Boolean`                           | false                                                                             |
| padding    | Similar CSS padding. You can specifically `up` `right` `bottom` `left` by an array of numbers. such as `[0, 10, 20, n => n + 30]` | -        | `Number | Array`                    | 8                                                                                 |
| bound      | Specify low and high points on the Y axis. such as `[0, 100]` or `[n => n - 100, n => n + 100]`                                   | -        | `Array<Number | Function>`          | -                                                                                 |
| narrow     | Leave width on both sides of the X axis. If ture, the value is half the x scale. [example](narrow)                                | -        | `Boolean`<br>`Number`<br>`Function` | -                                                                                 |
| distance   | Only work for [Bar](#bar). The distance between each bar.                                                                         | -        | `Number`                            | 0                                                                                 |
| stacked    | Stacking charts.                                                                                                                  | -        | `Boolean`                           | false                                                                             |
| colors     | Chart color from colors.                                                                                                          | true     | `Array<String>`                     | ['#3fb1e3',<br>'#6be6c1',<br>'#626c91',<br>'#a0a7e6',<br>'#c4ebad',<br>'#96dee8'] |
| textColor  | Axis and text color.                                                                                                              | true     | `String`                            | #999                                                                              |

### Cartesian - Slots

| Name    | Description             | Type           | Props |
| ------- | ----------------------- | -------------- | ----- |
| default | charts or SVG elements. | [slots][slots] | -     |

## Polar

A polar coordinates.

### Polar - Props

| Name       | Description                                             | Required | Type            | Default                                                                           |
| ---------- | ------------------------------------------------------- | -------- | --------------- | --------------------------------------------------------------------------------- |
| data       | An array of objects.                                    | true     | `Array<Object>` | -                                                                                 |
| height     | The height of SVG.                                      | -        | `Number`        | 300                                                                               |
| width      | The width of SVG.                                       | -        | `Number`        | 600                                                                               |
| autoresize | Automatically changes the width when the window resize. | -        | `Boolean`       | false                                                                             |
| stacked    | Stacking charts.                                        | -        | `Boolean`       | false                                                                             |
| colors     | Chart color from colors.                                | true     | `Array<String>` | ['#3fb1e3',<br>'#6be6c1',<br>'#626c91',<br>'#a0a7e6',<br>'#c4ebad',<br>'#96dee8'] |
| textColor  | Text color.                                             | true     | `String`        | #999                                                                              |

### Polar - Slots

| Name    | Description             | Type           | Props |
| ------- | ----------------------- | -------------- | ----- |
| default | charts or SVG elements. | [slots][slots] | -     |

## XAxis

- Parent: [Cartesian](#cartesian)

### XAxis - Props

| Name     | Description                                     | Required | Type                | Default                  |
| -------- | ----------------------------------------------- | -------- | ------------------- | ------------------------ |
| prop     | Field name.                                     | true     | `String`            | -                        |
| color    | Axis and text color.                            | -        | `String`            | `textColor` of cartesian |
| tickSize | The width of tick.                              | -        | `Number`            | 5                        |
| fontSize | Font size.                                      | -        | `Number`            | 15                       |
| format   | Format data, such as append unit.               | -        | `Function`          | -                        |
| gridline | Display grideline.                              | -        | `Boolean`           | false                    |
| dashed   | Gridline style.                                 | -        | `Boolean | String`  | false                    |
| interval | Display tick based on the ticks of the interval | -        | `Function | Number` | -                        |

## YAxis

- Parent: [Cartesian](#cartesian)

### YAxis - Props

| Name     | Description                                     | Required | Type                | Default                  |
| -------- | ----------------------------------------------- | -------- | ------------------- | ------------------------ |
| prop     | Field name.                                     | true     | `String`            | -                        |
| color    | Axis and text color.                            | -        | `String`            | `textColor` of cartesian |
| tickSize | The width of tick.                              | -        | `Number`            | 5                        |
| fontSize | Font size.                                      | -        | `Number`            | 15                       |
| format   | Format data, such as append unit.               | -        | `Function`          | -                        |
| gridline | Display grideline.                              | -        | `Boolean`           | false                    |
| dashed   | Gridline style.                                 | -        | `Boolean | String`  | false                    |
| interval | Display tick based on the ticks of the interval | -        | `Function | Number` | -                        |
| nbTicks  | Renders a fixed number of ticks.                | -        | `Number`            | -                        |
| ticks    | Renders a fixed list of ticks.                  | -        | `Array`             | -                        |

## XAxisInverse

- Parent: [Cartesian](#cartesian)

Display on the other side of X axis.

### XAxisInverse - Props

| Name     | Description                                     | Required | Type                | Default                  |
| -------- | ----------------------------------------------- | -------- | ------------------- | ------------------------ |
| prop     | Field name.                                     | true     | `String`            | -                        |
| color    | Axis and text color.                            | -        | `String`            | `textColor` of cartesian |
| tickSize | The width of tick.                              | -        | `Number`            | 5                        |
| fontSize | Font size.                                      | -        | `Number`            | 15                       |
| format   | Format data, such as append unit.               | -        | `Function`          | -                        |
| gridline | Display grideline.                              | -        | `Boolean`           | false                    |
| dashed   | Gridline style.                                 | -        | `Boolean | String`  | false                    |
| interval | Display tick based on the ticks of the interval | -        | `Function | Number` | -                        |

## YAxisInverse

- Parent: [Cartesian](#cartesian)

Display on the other side of Y axis.

### YAxisInverse - Props

| Name     | Description                                     | Required | Type                | Default                  |
| -------- | ----------------------------------------------- | -------- | ------------------- | ------------------------ |
| prop     | Field name.                                     | true     | `String`            | -                        |
| color    | Axis and text color.                            | -        | `String`            | `textColor` of cartesian |
| tickSize | The width of tick.                              | -        | `Number`            | 5                        |
| fontSize | Font size.                                      | -        | `Number`            | 15                       |
| format   | Format data, such as append unit.               | -        | `Function`          | -                        |
| gridline | Display grideline.                              | -        | `Boolean`           | false                    |
| dashed   | Grid dotted line.                               | -        | `Boolean | String`  | false                    |
| interval | Display tick based on the ticks of the interval | -        | `Function | Number` | -                        |

## YMarker

- Parent: [Cartesian](#cartesian)

### YMarker - Props

| Name      | Description                                               | Required | Type               | Default                  |
| --------- | --------------------------------------------------------- | -------- | ------------------ | ------------------------ |
| color     | Axis and text color.                                      | -        | `String`           | `textColor` of cartesian |
| dashed    | Dotted line.                                              | -        | `Boolean | String` | false                    |
| label     | Label.                                                    | -        | `String`           | -                        |
| value     | Y axis value.                                             | -        | `Number`           | -                        |
| placement | The position of the label. such as `end` `middle` `start` | -        | `String`           | end                      |

## YRegion

- Parent: [Cartesian](#cartesian)

Draw a range.

### YRegion - Props

| Name      | Description                                               | Required | Type               | Default                  |
| --------- | --------------------------------------------------------- | -------- | ------------------ | ------------------------ |
| color     | Axis and text color.                                      | -        | `String`           | `textColor` of cartesian |
| dashed    | Dotted line.                                              | -        | `Boolean | String` | false                    |
| label     | Label.                                                    | -        | `String`           | -                        |
| low       | Y axis low value.                                         | -        | `Number`           | -                        |
| high      | Y axis low value.                                         | -        | `Number`           | -                        |
| fillColor | Fill color.                                               | -        | `String`           | `textColor` of cartesian |
| placement | The position of the label, such as `end` `center` `start` | -        | `String`           | end                      |

# Widgets

## Tooltip

- Parent: [Cartesian](#cartesian)

### Tooltip - Props

| Name              | Description                                                                                | Required | Type      | Default |
| ----------------- | ------------------------------------------------------------------------------------------ | -------- | --------- | ------- |
| animated          | Transition animation.                                                                      | -        | `Boolean` | false   |
| animationDuration | The animation duration, Default 1s.                                                        | -        | `Number`  | 0.5     |
| animationEffect   | The easing function, Accepts any transition timing function within the [CSS spec][easing]. | -        | `String`  | ease    |

### Tooltip - Slots

| Name    | Description                               | Type                         | Props                                              |
| ------- | ----------------------------------------- | ---------------------------- | -------------------------------------------------- |
| default | Custom tooltip. [example][custom-tooltip] | [scoped slots][scoped-slots] | { label, actived: { color, label, value }, index } |

## Legend

- Parent: [Cartesian](#cartesian)

### Legend - Props

| Name       | Description                                                                                                                                                                                       | Required | Type      | Default                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | ------------------------ |
| selectable | Click toggle chart visible.                                                                                                                                                                       | -        | `Boolean` | false                    |
| placement  | The position of the legend, such as `top-start` `top-center` `top-end` `bottom-start` `bottom-middle` `bottom-end` `left-start` `left-middle` `left-end` `right-start` `right-middle` `right-end` | -        | `String`  | end                      |
| color      | Text color.                                                                                                                                                                                       | -        | `String`  | `textColor` of cartesian |

[curves]: examples#curves
[continued]: examples#holes-in-data
[csutom-area-fill]: examples#csutom-area-fill
[narrow]: examples#simple-bar-chart
[custom-tooltip]: examples#custom-tooltip
[stroke-dasharray]: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
[easing]: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
[custom-dots]: examples#custom-dots
[scoped-slots]: https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots
[slots]: https://vuejs.org/v2/guide/components-slots.html
