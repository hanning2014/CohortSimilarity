/**
 * Created by Wemakefocus on 2016/7/26.
 */
'use strict';

angular.module('app')
    .controller('patientClinicalPathwayController',PatientClinicalPathwayController);
function PatientClinicalPathwayController($scope,Data,$rootScope,$http) {
    $scope.isMax = false;
    if (!!$rootScope.dTypeSelected) $scope.dTypeSelected = $rootScope.dTypeSelected;
    if (!!$rootScope.pItemSelected) $scope.pItemSelected = $rootScope.pItemSelected;
    $scope.dTypes = [
        "心力衰竭",
        "糖尿病",
        "肺病",
        "肥胖症",
        "慢性阻塞性肺病",
        "肾病"
        // "慢性肾病",
        // "高血压",
        // "高血脂",
        // "冠心病",
        // "哮喘"
    ];
        $scope.pIds = [
        945209345,
        390870343,
        792838150,
        843209388,
        200483967,
        379404302,
        391970840,
        936108059,
        918102054,
        268058664,
        885653512,
        786333707,
        189759502,
        539164696,
        //291635227,
        //15532065,
        //774373410,
        //677052462,
        //218628143,
        //816250933,
        //945209345,
        //477177857,
        //391970840,
        //962795552,
        //600551461,
        //416473126,
        //268058664,
        //493113385,
        //816250933,
        //533934136,
        //836972544,
        //344784900,
        //291374422,
        //841917690,
        //415752202,
        //206479371,
        //729554957,
        //189759502,
        //994725644,
        //969069171,
        //945209345,
        //481793366,
        //53903367,
        //532795513,
        //556366508,
        //206479371,
        //379404302,
        //386613264,
        //786669585,
        //57966611,
        //390870343,
        //792838150,
        //869797611,
        //729554957,
        //386613264,
        //887889938,
        //539164696,
        //291635227,
        //912826413,
        280543278
    ];
    $scope.getPid = function (dType,str) {
        // console.log($scope);
        // console.log(dType);
        // console.log(str);
        var num = $scope.dTypes.indexOf(dType);
        // console.log($scope.dTypes.indexOf(dType));
        // if(num < 0) alert("disease type is wrong !");
        var ids = Data.getPid(num).then(function (res) {
            // console.log(res);
            return res.Results;
        })
        return ids;
    };
    $scope.dTypeChanged = function () {
        // console.log($scope.dTypeSelected)
        $rootScope.dTypeSelected = $scope.dTypeSelected;
        $scope.pItemSelected = [];
        // console.log($('form input'));
        $('form input').trigger('click');
    }
    var timeline_json = {
        "scale": "human",
        "title": {
            "media": {
                "caption": "",
                "credit": "",
                "url":"lib/timeline/img/placeholder.jpg",
                "thumb": 	""
            },
            "text": {
                "headline": "个人信息展示",
                "text": "<p></p>"
            }
        },
        "events": []
    };
    $scope.drawTimeline = function (pId) {
        $("#timeline").html('');
        // $http.get('data/sankey.json').then(function (res) {
            
            //////*********not getting data using getSankeyData, but using getPatientByID**********////////////
            //Data.getSankeyData(pId).then( function(res){
        Data.getPatientByID(pId).then( function(res){
            console.log(res);
            var records = res.DIAGNOSIS.Records.concat(res.LAB.Records.concat(res.MEDICATION.Records.concat(res.PROCEDURE.Records)) );
            records.sort(function (a,b) {
                var dateA = Date.parse(new Date(a.DD)),dataB = Date.parse(new Date(b.DD));
                if ( dateA === dataB){
                    if(a.FTYPE === b.FTYPE)
                        return a.NAMECN.localeCompare(b.NAMECN);
                    else
                        return a.FTYPE.localeCompare(b.FTYPE);
                } else
                    return Date.parse(new Date(a.DD))-Date.parse(new Date(b.DD));
            });
            ////////////////////////////************Stop Drawing HGraph for now*************/////////////////
            // var hGraphData = {"LAB":{"Records":[]}};
            // var data = res.Data;
            // var l = data.length;
            // theF:for(var i=0;i<l;i++){
            //     var sim = data[i].Similarities;
            //     var l2 = sim.length;
            //     console.log("interaction level 1");
            //     for(var j=0;j<l2;j++){
            //         var seq = sim[i].Sequences;
            //         var l3 = seq.length;
            //         for(var k=0;k<l3;k++){
            //             if(records.length>200) break theF;
            //             records.push(seq[k]);
            //             hGraphData.LAB.Records.push(seq[k]);
            //         }
            //          console.log(records);
            //     }
            // }
            ////////////////////////////************Stop Drawing HGraph for now*************/////////////////

            console.log(records);
            // var records = res.DIAGNOSIS.Records.concat(res.LAB.Records.concat(res.MEDICATION.Records.concat(res.PROCEDURE.Records)) );
            records.sort(function (a,b) {
                var dateA = Date.parse(new Date(a.DD)),dataB = Date.parse(new Date(b.DD));
                if ( dateA === dataB){
                    if(a.FTYPE === b.FTYPE)
                        return a.NAMECN.localeCompare(b.NAMECN);
                    else
                        return a.FTYPE.localeCompare(b.FTYPE);
                } else
                    return Date.parse(new Date(a.DD))-Date.parse(new Date(b.DD));
            });
            var i = 0,
                iconrec = {"DIAGNOSIS":"Symptom.png","LAB":"Lab.png","MEDICATION":"Medication.png",
                    "PROCEDURE":"Clinicalpath.png"};
            var colorrec = {"DIAGNOSIS":"#FF9966","LAB":"#ACE1AF","MEDICATION":"#B9DCED",
                "PROCEDURE":"#cc99cc"};
            while(i<records.length){
                var event = {
                    "start_date":{},
                    "media": {
                        "caption": "",
                        "credit": "",
                        "url": "lib/timeline/img/placeholder.jpg",
                        "thumb": 	""
                    },
                    "text":{}
                };
                var eventTime = records[i].DD.split('-');
                event.start_date = {
                    "year": eventTime[0],
                    "month": eventTime[1],
                    "day": eventTime[2]
                };
                var name = '<div class="tl-nodesType-'+records[i].FTYPE.toLowerCase()+'"><img src="lib/timeline/img/' + iconrec[records[i].FTYPE] +
                    '" style="width:10px; height:10px;background-color:'+colorrec[records[i].FTYPE] +'">' + records[i].NAMECN;
                var num = 1;
                while(i < records.length-1 && records[i].NAMECN === records[i+1].NAMECN){
                    if(records[i].DD === records[i+1].DD){
                        i++;
                        num++;
                    };
                }
                if(num > 1){//http://localhost:3001/img/Clinicalpath.png
                    name += "*" + num;
                };
                name += '</div>';
                event.text.headline = name;
//				console.log(records[i]);
                var tableHtml = '<table><tr><td>';
                for(var key in records[i]){
                    tableHtml += key + '</td><td>' + records[i][key] + '</td></tr><tr><td>';
                }
                tableHtml += '</table>';

                event.text.text = tableHtml;
                timeline_json.events.push(event);
                i++;
            }
//			console.log(timeline_json);
            var options = {
                language:"zh-cn"
            };
            var timeline = new TL.Timeline('timeline',timeline_json, options);
//				theme_color: "#288EC3",
//				ga_property_id: "UA-27829802-4"
            var types = ["diagnosis","lab","medication","procedure"];
                for(var i=0;i<types.length;i++){
                    var textEle = $(".tl-nodesType-"+types[i]);
                    $(".tl-nodesType-"+types[i]).parents(".tl-timemarker-content-container").css({"background-color":colorrec[types[i].toUpperCase()]});
                    $(".tl-nodesType-"+"procedure").parents(".tl-timemarker-content-container").prev(".tl-timemarker-timespan").children(".tl-timemarker-line-left")
                        .addClass("PROCEDURE")
                    $(".tl-nodesType-"+"medication").parents(".tl-timemarker-content-container").prev(".tl-timemarker-timespan").children(".tl-timemarker-line-left")
                        .addClass("MEDICATION")
                    $(".tl-nodesType-"+"lab").parents(".tl-timemarker-content-container").prev(".tl-timemarker-timespan").children(".tl-timemarker-line-left")
                        .addClass("LAB")
                    $(".tl-nodesType-"+"diagnosis").parents(".tl-timemarker-content-container").prev(".tl-timemarker-timespan").children(".tl-timemarker-line-left")
                        .addClass("DIAGNOSIS")



                    //.attr("background-color",colorrec[types[i].toUpperCase()]);
//				 console.log($(".tl-nodesType-"+types[i]).parents(".tl-timemarker-content-container"));
                    console.log($(".tl-nodesType-"+types[i]).parents(".tl-timemarker-content-container").prev(".tl-timemarker-timespan").children(".tl-timemarker-line-left"));
                }
            for(var i=0;i<types.length;i++){
                var textEle = $(".tl-nodesType-"+types[i]);
                $(".tl-nodesType-"+types[i]).parents(".tl-timemarker-content-container").css({"background-color":colorrec[types[i].toUpperCase()]});
//				 console.log($(".tl-nodesType-"+types[i]).parents(".tl-timemarker-content-container"));
            }
            console.log(TL);
//			 $(".tl-icon-zoom-in").trigger('click',console.log('clicked!!!'));
            $(".tl-nodesType-lab").parents(".tl-timemarker").click(function(){
                
                ////////////////////////////************Stop Drawing HGraph for now*************/////////////////
                
                // console.log("lab node click!");
                // console.log(this);
                // console.log($(this).attr('id'));
                // var markerId = $(this).attr('id');
                // var slideId = markerId.substring(0,markerId.length-7);
                // console.log(slideId);
                // drawHgraph(slideId,hGraphData);

                ////////////////////////////************Stop Drawing HGraph for now*************/////////////////

            });
        })
    }

//		var test =function () {
//			console.log('test');
//			console.log($(".tl-icon-zoom-in"));
//			$(".tl-icon-zoom-in").trigger('click',console.log('clicked!!!'));
//		};
//	console.log($(".tl-icon-zoom-in"));
    var scrollFunc = function (e) {
        e = e || window.event;
        var ele = $('.tl-timenav');
        var wheelFun = function (val) {
            if(val>0)
                $(".tl-icon-zoom-in").trigger('click',console.log('zoom-in clicked!!!'));
            else
                $(".tl-icon-zoom-out").trigger('click',console.log('zoom-out clicked!!!'));
        }
        if(e.wheelDelta){
            wheelFun(e.wheelDelta);
//				console.log(e.wheelDelta);
//				console.log("e.wheelDelta!");
        }else if(e.detail){
            wheelFun(e.detail);
//				console.log("e.detail!")
        }
    }
    $(".tl-icon-zoom-in").context.onmousewheel = scrollFunc;
    var drawHgraph = function(id,data){
        console.log('drawHgraph()');
        console.log(data);
        var drawInterval = setInterval(draw,100);
//		draw();
        function draw(){
            console.log("draw()");
            console.log($('#'+id));
            var iframe = $('#'+id+' .tl-media-content img');
            console.log(iframe);
            if(iframe.length==0){
                console.log(iframe.length);
                return;
            };
            clearInterval(drawInterval);
//			console.log($(".tl-storyslider h2 img"));
//			console.log(iframe);
//			$(".tl-media-content img").hide();
            // <img class="tl-media-item tl-media-image tl-media-shadow" src="graph" style="max-height: 448px;">
            $("#hgraph").remove();
            iframe.parent().html('<div id="hgraph" class="tl-media-item tl-media-image tl-media-shadow" src="graph" style="max-height: 448px;">' +
                '' +
                '<div id="map'+'" style="height: 400px;min-height: 400px;  min-width: 400px;"></div>' +
                '</div>');
//			iframe.remove();
//	var svg = d3.select("#graph")				//选择文档中的body元素
//				.append("svg")				//添加一个svg元素
//				.attr("width",400)		//设定宽度
//				.attr("height",200);	//设定高度
//	var dataset = [ 250 , 210 , 170 , 130 , 90 ];
//	var rectHeight = 25;	//每个矩形所占的像素高度(包括空白)
//	svg.selectAll("rect")
//		  .data(dataset)
//		  .enter()
//		  .append("rect")
//		  .attr("x",20)
//		  .attr("y",function(d,i){
//				return i * rectHeight;
//		  })
//		  .attr("width",function(d){
//		   		return d;
//		  })
//		  .attr("height",rectHeight-2)
//		  .attr("fill","steelblue");
            console.log("to draw hgraph");
//			var targetId = "map"+countNum;
//			console.log(targetId);
            d3.json('lib/timeline/myhGraph/records.json',function (data) {
                myhGraph(data,"2006-02-11","map");
                function myhGraph(metrics,day,testg){
                    setdata(metrics,day,testg);
                    initializeUser(metrics,testg);
                };
            })

//			countNum++;
        }

    }
    $rootScope.pageLoading = false;

}