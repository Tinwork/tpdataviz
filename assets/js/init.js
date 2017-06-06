(() => {

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

    document.addEventListener('DOMContentLoaded', makeChart);
})();