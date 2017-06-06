const dataStack = ((_) => {
    console.log('' +_);

    /**
     * Init Draw
     */
    const initDraw = () => {
        //Utils.fetcher({method: 'GET', endpoint: 'https://localhost:8080/'})
        Utils.getSexRep()
             .then(draw)
             .catch(e => Promise.reject(e));
    };

    /**
     * 
     * @param {Object} data 
     */
    const draw = (props) => {
        const {tick, f, s, t} = props;


        let dateAxisPlot = _.jqplot('sex-axis', [f, s, t], {
            stackSeries: true,
            captureRightClick: true,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                rendererOptions: {
                    highlightMouseDown: true   
                },
                pointLabels: {show: true}
            },
            legend: {
                show: true,
                location: 'e',
                placement: 'outside'
            },
            axes: {
                yaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: tick
                },
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ['male', 'female']
                }
            },
        });

        return Promise.resolve()
    };


    return {
        draw: initDraw
    }
})($);