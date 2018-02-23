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
  margin: _margin = { top: 20, right: 20, bottom: 30, left: 40 },
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

  g.selectAll('rect')
    .data(data)
  .enter().append('rect')
    .attr('x', d => xScale(d.key) - 8)
    .attr('y', d => yScale(d.facultyStats.average))
    .attr('width', 16)
    .attr('height', 2)
    .style('fill', 'black')

  return d3n.chartHTML()
}

module.exports = trendline
