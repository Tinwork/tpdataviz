const doCloud = (() => {
    var scatterConfig = {
        w: 1000,
        h: 300,
        padding: 30,
        selector: '.data',
        colors: {
            male: 'red',
            female: 'blue'
        }
    };

    var drawScatterData = function () {
        var xScale = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(dataset, function (d) {
                    return d.user_id;
                })
            ])
            .range([scatterConfig.padding, scatterConfig.w - scatterConfig.padding * 2]);

        var yScale = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(dataset, function (d) {
                    return d.notation;
                })
            ])
            .range([scatterConfig.h - scatterConfig.padding, scatterConfig.padding]);

        var rScale = d3
            .scaleLinear()
            .domain([
                1,
                d3.max(dataset, function (d) {
                    return 6;
                })
            ])
            .range([1, 5]);

        var xAxis = d3.axisBottom().scale(xScale).ticks(5);
        var yAxis = d3.axisLeft().scale(yScale).ticks(5);
        var svg = d3
            .select(scatterConfig.selector)
            .append("svg")
            .attr('id', 'cloud')
            .attr("width", scatterConfig.w)
            .attr("height", scatterConfig.h);

        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("fill", function (d) {
                if (d.gender === 0) {
                    return scatterConfig.colors.female
                } else {
                    return scatterConfig.colors.male
                }
            })
            .attr("cx", function (d) {
                return xScale(d.user_id);
            })
            .attr("cy", function (d) {
                return yScale(d.notation);
            })
            .attr("r", function (d) {
                return rScale(5);
            });

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (scatterConfig.h - scatterConfig.padding) + ")")
            .call(xAxis)

        d3.select(scatterConfig.selector)
            .append("p")
            .attr("class", "axis")
            .attr("style", "bottom: " + scatterConfig.h + "px;")
            .text('Notations')

        d3
            .select(scatterConfig.selector)
            .append("p")
            .attr("class", "axis")
            .attr("style", "left: " + scatterConfig.w + "px; bottom: " + scatterConfig.padding + "px;")
            .text('Age')

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + scatterConfig.padding + ",0)")
            .call(yAxis);
    };

    var generateScatterData = function (gender) {
        /*
	previous dataSet
	[
		[user_id, notation]
	]
	
 	forEach(function (data) {
		getGender
		getAge
	}) 
	*/

        var dataset = [{
                notation: '4',
                user_id: 26,
                gender: 0
            },
            {
                notation: '2',
                user_id: 35,
                gender: 1
            },
            {
                notation: '5',
                user_id: 14,
                gender: 0
            },
        ]

        if (gender === 0 ||  gender === 1) {
            var tmp = []
            dataset.forEach(function (data) {
                if (data.gender === gender) {
                    tmp.push(data)
                }
            })
            dataset = tmp
        }
        return dataset;
    };

    var dataset = generateScatterData();
    //drawScatterData();

    let listener = () => {
        document.querySelector('.all').addEventListener('click', function () {
            removeAllAxis();
            document.getElementById('cloud').remove()
            dataset = generateScatterData();
            drawScatterData();
        })

        document.querySelector('.masculin').addEventListener('click', function () {
            removeAllAxis();
            document.getElementById('cloud').remove()
            dataset = generateScatterData(1);
            drawScatterData();
        })

        document.querySelector('.feminin').addEventListener('click', function () {
            removeAllAxis();
            document.getElementById('cloud').remove()
            dataset = generateScatterData(0);
            drawScatterData();
        })
    }


    const removeAllAxis = () => {
        let axis = document.getElementsByClassName('axis');
        for (let idx of axis) {
            idx.remove();
        }
    };

    

    return {
        draw: drawScatterData,
        listener: listener
    }
})();