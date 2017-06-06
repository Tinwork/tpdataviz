const dateCumul = ((_) => {

    /**
     * Init Draw
     */
    const initDraw = () => {
        //Utils.fetcher({method: 'GET', endpoint: 'https://localhost:8080/'})
        Utils.doCumul()
             .then(draw)
             .catch(e => Promise.reject(e));
    };

    /**
     * 
     * @param {Object} data 
     */
    const draw = (data) => {
        console.log(data);
        if (Utils.getType(data) !== 'Array')
            return Promise.reject('data is not an array');
            
        let dateAxisPlot = _.jqplot('friends-list-axis', [data], {
            title: 'Evolution du nombre d’amis au fil du mois (CUMUL)',
            axes: {
                xaxis: {
                    renderer: _.jqplot.DateAxisRenderer
                }
            },
            series: [{lineWidth:4, markerOptions:{style:'square'}}]
        })

        return Promise.resolve()
    };


    return {
        draw: initDraw
    }
})($);