(() => {

    /**
     * Make Chart
     */
    const makeChart = () => {
        // radial.draw();
        bar.draw();
        dateAxis.draw();
        datePercent.draw();
        dataStack.draw();
        dataPie.draw();
        doCloud.draw();
        doCloud.listener();
        d3Pie.draw();
    };

    document.addEventListener('DOMContentLoaded', makeChart);
})();