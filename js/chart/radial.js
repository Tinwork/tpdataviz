const radial = (() => {
    let svg;

    /**
     * Init Draw
     */
    const initDraw = () => {
        Utils.fetcher({method: 'POST', endpoint: 'http://localhost:8888/tpdataviz/json/radial.json'})
             .then(appendSVG)
             .then(draw)
             .catch(e => console.log(e));
    };

    const appendSVG = (datas) => {
        svg = d3.select('#radial').append('svg')
          .append('g')
          .attr('id', 'radial')
          .attr('transform', `translate(150, 75)`);
        return Promise.resolve(datas)
    };

    /**
     * Draw
     * @param {Array} datas 
     */
    const draw = (datas) => {
        svg.selectAll('g')
              .data(datas.data)
              .enter()
              .append('path')
              .attr('d', (d,i) => {
                return Utils.drawArc({
                    inner: i * 20,
                    outer: i * 30 + 5,
                    start: 0,
                    end: 0
                })
              })
              .attr('fill', d => {
                return d.fill;
              })
              .transition()
              .duration(750)
              .attrTween('d', (d, i) => {
                  return (t) => {
                      return Utils.drawArc({
                          inner: i * 20,
                          outer: i * 30 + 5,
                          start: 0,
                          end: t * d.end
                      })
                  }
              });

        Utils.centerSVG(svg, 'radial', {width: 400, height: 150});
        return Promise.resolve();
    };


    return {
        draw: initDraw
    }
})();