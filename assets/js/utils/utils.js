class Utils {

    /**
     * Fetcher
     *      Fetch a ressources
     * @param {Object} props 
     * @return {Promise}
     */
    static fetcher(props) {

        // Define the variable
        const {method, data, endpoint, chartType} = props,
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
                .then(payload => Utils.filterData(type, payload))
                .then(data => Promise.resolve(data))
                .catch(e => Promise.reject(e));
    }

    /**
     * Filter Data
     * @param {String} type
     * @param {Object} payload 
     */
    static filterData(type, payload) {
        let data;
        switch (type) {
            case "popularity":
                data = getPopularityData(payload);
            break;
            case "pie":
                data = getPieData(payload);
            break;
            case "stack":
                data = getSexRep(payload);
            break;
            case "percent":
                data = getMessagePercent(payload);
            break;
            case "bar":
                data = getMessagePercentD3(payload);
            break;
            case "cloud":
            break;
        }

        return Promise.resolve(data);
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

    static getPopularityData(datas) {

        let data = {
            "photo":"\./assets\/img\/avatar15.png",
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
     * Get Message Percent
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

    /**
     * Get Message Percent D3
     */
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

    /**
     * Get Sex Rep
     */
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

    /**
     * Get Pie Data
     */
    static getPieData() {
       let arr = [];
       let data =  {
                    "user": {
                        "photo":"\/assets\/img\/avatar12.jpg","id":"22"
                    },
                    "query":"male",
                    "popularity":{
                        "male":{
                            "rate_0":0,
                            "rate_1":1,
                            "rate_2":0,
                            "rate_3":1,
                            "rate_4":0,
                            "rate_5":0}
                        }
                    }

        for (let gender in data.popularity) {
            for (let idx in data.popularity[gender]) {
                arr.push([idx.split('rate_')[1], data.popularity[gender][idx]]);
            }
        }

        return Promise.resolve(arr);
    }

    /**
     * Get CLoud Data
     */
    static getCloudData() {
        let d = {
            "user":{"id":"20"},
            "query":"female",
            "popularity":{
                "female":{
                    "18-21":1,
                    "22-25":0,
                    "26-29":0
                },
                "male": {
                     "18-21":2,
                    "22-25":1,
                    "26-29":0
                }
            }
        }

        let data = [];

        for (let gender in d.popularity) {
            for (let idx in d.popularity[gender]) {
                if (d.popularity[gender][idx] === 0) 
                    continue;

                data.push({
                    notation: d.popularity[gender][idx],
                    age: parseInt(idx),
                    gender: gender === 'female' ? 0 : 1
                })
            }
        }

        console.log(data);
        return Promise.resolve(data);
    }

    static doCumul() {
        let d = {
                "user":{"id":"1"},
                "popularity":{
                    "2016-06-02":1,
                    "2016-06-03":3,
                    "2016-06-05":4,
                    "2016-06-08":5,
                    "2016-06-16":6
                }
            }

    
        let arr = [];
        for (let i in d.popularity) {
            arr.push([i, d.popularity[i]]);
        }

        console.log(arr);
        return Promise.resolve(arr);

    }
}