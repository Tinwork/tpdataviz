const dataPie = ((_) => {
    console.log('' +_);

    /**
     * Init Draw
     */
    const initDraw = () => {
        Utils.getSexRep()
             .then(draw)
             .catch(e => Promise.reject(e));
    };

    /**
     * 
     * @param {Object} data 
     */
    const draw = (props) => {
        let dateAxisPlot = _.jqplot('popular-axis', [[1,2,3,4]], {seriesDefaults:{renderer:$.jqplot.PieRenderer}});
        return Promise.resolve();
    };


    return {
        draw: initDraw
    }
})($);