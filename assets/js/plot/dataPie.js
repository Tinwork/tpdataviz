const dataPie = ((_) => {
    console.log('' +_);

    /**
     * Init Draw
     */
    const initDraw = () => {
        Utils.getPieData()
             .then(draw)
             .catch(e => Promise.reject(e));
    };

    /**
     * 
     * @param {Object} data 
     */
    const draw = (data) => {
        let dateAxisPlot = _.jqplot('popular-axis', [data], {
            seriesDefaults:{
                renderer: _.jqplot.PieRenderer,
                rendererOptions: {
                    showDataLabels: true
                }
            },
            legend: { show:true, location: 'e' }
        });
        return Promise.resolve();
    };


    return {
        draw: initDraw
    }
})($);