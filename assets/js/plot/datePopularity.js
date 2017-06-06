const dateAxis = ((_) => {
    console.log('' +_);

    /**
     * Init Draw
     */
    const initDraw = () => {
        //Utils.fetcher({method: 'GET', endpoint: 'https://localhost:8080/'})
        Utils.getPopularityData()
             .then(draw)
             .then(Utils.appendIMG)
             .catch(e => Promise.reject(e));
    };

    /**
     * 
     * @param {Object} data 
     */
    const draw = (props) => {
        const {data, profile} = props;
        if (Utils.getType(data) !== 'Array')
            return Promise.reject('data is not an array');
            
        let dateAxisPlot = _.jqplot('date-axis', [data], {
            title: 'Evolution de la popularité (notation) au fil du mois',
            axes: {
                xaxis: {
                    renderer: _.jqplot.DateAxisRenderer
                }
            },
            series: [{lineWidth:4, markerOptions:{style:'square'}}]
        })

        return Promise.resolve({path: profile, id: 'avatar-data-axis'})
    };


    return {
        draw: initDraw
    }
})($);