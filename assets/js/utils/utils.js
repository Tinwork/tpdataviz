class Utils {

    /**
     * Fetcher
     *      Fetch a ressources
     * @param {Object} props 
     * @return {Promise}
     */
    static fetcher(props) {

        // Define the variable
        const {method, data, endpoint} = props,
              HEADER = new Headers();

        let opts = Object.assign({}, {
                    header: HEADER,
                    method: method,
                    mode: 'cors'
                   });

        if (method === 'POST')
            opts.body = data !== undefined ? JSON.stringify(data) : JSON.stringify({});

        return fetch(endpoint, opts)
                .then(payload => payload.json())
                .then(res => Promise.resolve(res))
                .catch(e => Promise.reject(e));
    }

    /**
     * Draw Arc
     *      Draw an arc
     * @param {Object} props
     * @return {String} arc
     */
    static drawArc(props) {
        const {inner, outer, start, end} = props;
        let arc = d3.arc();

        return arc({
            innerRadius: inner,
            outerRadius: outer,
            startAngle: start,
            endAngle: Utils.percentToRadius(end)
        })
    }

    /**
     * Percent To Radius
     *      Convert a string percent to a radius
     * @param {Number} percent 
     */
    static percentToRadius(percent) {
        if (typeof percent === 'string')
            percent = parseInt(percent);

        if (percent == NaN) 
            throw new Error('percent is not a string');

        return ((2 * Math.PI) * percent) / 100;
    }

    /**
     * Center SVG
     *      Center the svg
     * @param {Object} svg
     * @param {String} id
     */
    static centerSVG(svg, id, size) {
          const {width, height} = size;
          d3.selectAll('svg').attr('transform', `translate(${window.screen.width / 2 - width}, ${window.screen.height / 2 - height})`);
    };

    /**
     * 
     * @param {*} path 
     * @param {*} id 
     */
    static appendIMG(props) {
        const {path, id} = props;
        if (Utils.getType(path) !== 'String')
            return Promise.reject('path is not a string');

        document.getElementById(id).src = path;
    }

    /**
     * Get Type
     * @param {*} mixed 
     * @return {string} type
     */
    static getType(mixed) {
        let type = Object.prototype.toString.call(mixed);
        return type.replace(/[\[\]']+/g, '').split('object')[1].trim();
    };

    static getPopularityData() {

        let data = {
            "photo":"\/assets\/img\/avatar15.png",
            "notations":{
                "2016-06-08":["2","4"],
                "2016-06-20":["3"],
                "2016-06-07":["4"]
            }
        }

        let arr = [];
        for (let i in data.notations) {
            arr.push([i, data.notations[i][0]]);
        }

        return Promise.resolve({data: arr, profile: data.photo});
    }

    /**
     * 
     */
    static getMessagePercent(){
        const data = {
            "user":"12",
            "messages":{
                "to_friend":12.5,
                "to_foreigners":87.5
            }
        }

        return Promise.resolve({tick: Object.keys(data.messages), data: Object.values(data.messages)});
    }


    static getMessagePercentD3() {
        const data = {
            "user":"12",
            "messages":{
                "to_friend":12.5,
                "to_foreigners":87.5
            }
        }

        let arrData = [];

        const ticks = Object.keys(data.messages);
        
        
        for (let i in data.messages) {
            let obj = Object.assign({});
            obj.x = i;
            obj.y = data.messages[i];
            arrData.push(obj)
        }

        console.log(arrData);

        let u = {data: arrData, tick: ticks}

        return Promise.resolve(u);
    }

    static getSexRep() {
         let data = {
             "user":"12",
             "friends":{
                 "male":{"18-21":0,"22-25":0,"26-29":1},
                 "female":{"18-21":2, "22-25":1, "26-29":2}
            }
        };

        // parse the age
        let ageticks = Object.keys(data.friends.male);
        let fCat = [];
        let sCat = [];
        let tCat = [];


        for (let i in data.friends) {
            for (let idx in data.friends[i]) {
                switch (idx) {
                    case "18-21":
                        fCat.push(data.friends[i][idx]);
                    break;
                    case "22-25":
                        sCat.push(data.friends[i][idx]);
                    break;
                    case "26-29":
                        tCat.push(data.friends[i][idx]);
                    break;
                }
            }
        }

        return Promise.resolve({tick: ageticks, f: fCat, s: sCat, t: tCat});
    }

    static getPieData() {
        return Promise.resolve();
    }
}