(() => {

    const userid = 0;

    /**
     * Make Chart
     */
    const makeChart = () => {
        //radial.draw();
        dateCumul.draw();
        bar.draw();
        dateAxis.draw();
        datePercent.draw();
        dataStack.draw();
        dataPie.draw();
        doCloud.draw();
        d3Pie.draw();
    };

    /**
     * Bind Drop Down
     */
    const bindDropDown = () => {
        Utils.fetcher({method: 'GET', endpoint: '/user'})
             .then(res => updateDropdown)
             .catch(e => console.log(e));
    };

    /**
     * Update Drop Down
     * @param {*} ids 
     */
    const updateDropdown = (ids) => {
        let html = ``;
        let e = document.getElementById('drop');

        ids.map(d => {
            html += `<a class="dropdown-item" href="#" data-id="${d.ids}">${d.name}</a>`
        });

        e.innerHTML = html;
    };


    document.addEventListener('DOMContentLoaded', () => {
        bindDropDown();
        makeChart();
    });
})();