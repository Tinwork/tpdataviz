class Utils {

    /**
     * Fetcher
     *      Fetch a ressources
     * @param {Object} props 
     * @return {Promise}
     */
    static fetcher(props) {

        // Define the variable
        const {method, data, endpoint} = props,
              HEADER = new Headers();

        let opts = Object.assign({}, {
                    header: HEADER,
                    method: method,
                    mode: 'cors'
                   });

        if (method === 'POST')
            opts.body = data !== undefined ? JSON.stringify(data) : JSON.stringify({});

        return fetch(endpoint, opts)
                .then(payload => payload.json())
                .then(res => Promise.resolve(res))
                .catch(e => Promise.reject(e));
    }

    /**
     * Draw Arc
     *      Draw an arc
     * @param {Object} props
     * @return {String} arc
     */
    static drawArc(props) {
        const {inner, outer, start, end} = props;
        let arc = d3.arc();

        return arc({
            innerRadius: inner,
            outerRadius: outer,
            startAngle: start,
            endAngle: Utils.percentToRadius(end)
        })
    }

    /**
     * Percent To Radius
     *      Convert a string percent to a radius
     * @param {Number} percent 
     */
    static percentToRadius(percent) {
        if (typeof percent === 'string')
            percent = parseInt(percent);

        if (percent == NaN) 
            throw new Error('percent is not a string');

        return ((2 * Math.PI) * percent) / 100;
    }

    /**
     * Center SVG
     *      Center the svg
     * @param {Object} svg
     * @param {String} id
     */
    static centerSVG(svg, id, size) {
          const {width, height} = size;
          d3.selectAll('svg').attr('transform', `translate(${window.screen.width / 2 - width}, ${window.screen.height / 2 - height})`);
    };
}