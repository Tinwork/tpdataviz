const bar = (() => {
    let svg;
    const MARGIN = {top: 20, right: 20, bottom: 30, left: 40};
    const SIZE = Object.create({});

    /**
     * Init Draw
     */
    const initDraw = () => {
        Utils.getMessagePercentD3()
        .then(appendSVG)
        .then(draw)
        .catch(e => console.log(e));
    };

    /**
     * 
     * @param {Object} datas 
     */
    const appendSVG = (datas) => {
        setSize();
        svg = d3.select('#bar').append('svg')
          .attr('width', 360)
          .attr('height', 500)
          .append('g')
          .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

        return Promise.resolve(datas);
    };

    const setSize = () => {
        SIZE.width = 300 - MARGIN.left - MARGIN.right;
        SIZE.height = 500 - MARGIN.top - MARGIN.bottom;
    };


    /**
     * Draw
     * @param {Object} datas
     */
    const draw = (datas) => {
        console.log(datas);
        let axis = d3.scaleTime().range([0, 300]);
        let x = d3.scaleBand().rangeRound([0, SIZE.width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([SIZE.height, 0]);

        x.domain(datas.tick.map((d) => { return d; }));
        y.domain([0, 100]);

        svg.append('g')
           .attr('class', 'axis axis--x')
           .attr('transform', `translate(0, ${SIZE.height})`)
           .call(d3.axisBottom(x));

        svg.append('g')
           .attr('class', 'axis axis--y')
           .call(d3.axisLeft(y).ticks(10))
           .append('text')
           .attr('transform', 'rotate(-90)')
           .attr('y', 6)
           .attr('dy', '0.71em')
           .attr('text-anchor', 'end')
           .text('Frequency');

        svg.selectAll(".bar")
            .data(datas.data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => { return x(d.x); })
            .attr("y", d => { return y(0); })
            .attr("width", x.bandwidth())
            .attr("height", d => { 0 })
            .attr('fill', '#016FCB')
            .transition()
            .duration(750)
            .attrTween('height', (d, i) => {
                return t => {
                 return SIZE.height - y(d.y);
                }
            })
            .attrTween('y', d => {
                return t => {
                    return y(d.y * t)
                }
            })

        Utils.centerSVG(svg, 'bar')
        
    };

    return {
        draw: initDraw
    }
})();