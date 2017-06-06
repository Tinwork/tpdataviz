const datePercent = ((_) => {
    console.log('' +_);

    /**
     * Init Draw
     */
    const initDraw = () => {
        //Utils.fetcher({method: 'GET', endpoint: 'https://localhost:8080/'})
        Utils.getMessagePercent()
             .then(draw)
             .catch(e => Promise.reject(e));
    };

    /**
     * 
     * @param {Object} data 
     */
    const draw = (props) => {
        const {tick, data} = props;

        if (Utils.getType(data) !== 'Array')
            return Promise.reject('data is not an array');

        let dateAxisPlot = _.jqplot('message-axis', [data], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: tick
                }
            },
            highlighter: { show: false }
        });

        return Promise.resolve()
    };


    return {
        draw: initDraw
    }
})($);