const D3Node = require('d3-node')

const trendline = ({
  data,
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <h2>Bar Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  width: _width = 850,
  height: _height = 500,
  margin: _margin = { top: 20, right: 20, bottom: 40, left: 40 },
  lineColor: _lineColor = 'steelblue',
  lineWidth: _lineWidth = 1.5,
  tickSize: _tickSize = 5,
  tickPadding: _tickPadding = 5
} = {}) => {
  const d3n = new D3Node({
    selector: _selector,
    svgStyles: _style,
    container: _container
  })

  const d3 = d3n.d3
  const width = _width - _margin.left - _margin.right
  const height = _height - _margin.top - _margin.bottom

  const svg = d3n.createSVG(_width, _height)
    .append('g')
    .attr('transform', `translate(${_margin.left}, ${_margin.top})`)

  const g = svg.append('g')

  const xScale = d3.scalePoint()
    .padding(0.4)
    .rangeRound([0, width])
    .domain(data.map(d => d.key).reverse())

  const yScale = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, 5])

  const xAxis = d3.axisBottom(xScale)
    .tickSize(_tickSize)

  const yAxis = d3.axisLeft(yScale)
    .tickSize(_tickSize)

  g.append("text") // X-axis Label
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Term")

  g.append("text") // Y-axis Label
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("UMI6 Average");

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.95em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-30)')

  g.append('g')
    .call(yAxis)

  g.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('cx', d => xScale(d.key))
    .attr('cy', d => yScale(d.value))
    .style('stroke', 'black')
    .style('fill', 'none')
    .attr('r', d => Math.pow(Math.log(d.enrolment), 1.7))

  // g.selectAll('text')
  //   .data(data)
  // .enter().append('text')
  //   .text(d => d.course)
  //   .attr('x', d => xScale(d.key))
  //   .attr('y', d => yScale(d.value))
  //   .attr('font-size', '11px')

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('x', d => xScale(d.key) - 8)
    .attr('y', d => yScale(d.facultyStats.average))
    .attr('width', 16)
    .attr('height', 2)
    .style('fill', 'black')

  // Circular Legend
  function circleLegend(selection) {
    let instance = {}

    const api = {
      domain: [30, 200], // the values min and max
      range: [0, 200], // the circle area/size mapping
      values: [40, 100], // values for circles
      width: width - 80,          // legend position
      height: height - 150,         // legend position
      circleColor: '#888',
      textPadding: 30,
      textColor: '#000'
    }

    const circleScale = d => Math.pow(Math.log(d), 1.7)

    instance.render = function () {
      const s = selection.append('g')
        .attr('class', 'legend-wrap')
        .attr('transform', 'translate(0,' + d3.max(api.values) + ')')

      // create circles with given values
      s.append('g')
        .attr('class', 'values-wrap')
        .selectAll('circle')
        .data(api.values)
        .enter().append('circle')
        .attr('class', d => 'values values-' + d)
        .attr('r', d => circleScale(d))
        .attr('cx', api.width)
        .attr('cy', d => api.height - circleScale(d))
        .style('fill', 'none')
        .style('stroke', api.circleColor)
        .style('opacity', 0.5)

      // append some lines to the circles based on values
      s.append('g')
        .attr('class', 'values-line-wrap')
        .selectAll('.values-labels')
        .data(api.values)
        .enter().append('line')
        .attr('x1', d => api.width+ circleScale(d))
        .attr('x2', d => api.width + d/4 + 10)
        .attr('y1', d => api.height - circleScale(d))
        .attr('y2', d => api.height - circleScale(d))
        .style('stroke', api.textColor)
        .style('stroke-dasharray', ('2,2'))

      // append value labels to lines
      s.append('g')
        .attr('class', 'values-labels-wrap')
        .selectAll('.values-labels')
        .data(api.values)
        .enter().append('text')
        .attr('x', d => api.width + d/4 + 30)
        .attr('y', d => (api.height - circleScale(d)) + 5)
        .attr('shape-rendering', 'crispEdges')
        .style('text-anchor', 'end')
        .style('fill', api.textColor)
        .style("font-size", "10px")
        .text(d => d)

      // add legend title
      s.append('text')
        .attr('x', api.width - 10)
        .attr('y', api.height - 40)
        .text('Class Size')

      return instance
    }

    for (let key in api) {
      instance[key] = getSet(key, instance).bind(api)
    }

    return instance

    function getSet(option, component) {
      return function (_) {
        if (!arguments.length) {
          return this[option];
        }
        this[option] = _;
        return component;
      }
    }
  }

  var legend = circleLegend(svg)
  legend.render()

  return d3n.chartHTML()
}

module.exports = trendline
