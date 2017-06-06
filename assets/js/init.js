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
    };

    document.addEventListener('DOMContentLoaded', makeChart);
})();