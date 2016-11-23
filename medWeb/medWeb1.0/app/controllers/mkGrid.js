/**
 * Created by Wemakefocus on 2016/7/18.
 */
angular.module('app')
    .controller('MkGridController',MkGridController);
function MkGridController($scope,$compile,$rootScope) {
    // console.log("it is MkDisplaydataController");
    // console.log($scope);
    $scope.isInit = 1;
    // scope.$emit("mkpageReady",1);
    // $scope.$on("mksidebarClicked",function (event,str) {
    //     console.log("sidebarClicked");
    //     console.log(str);
    //     // console.log($('#example1_wrapper').find('thead tr th'));
    //     // $('#example1_wrapper').find('thead tr th').remove();
    //     $scope.displayData(str,1);
    // })
    // scope.test = function () {
    //     console.log("ng-click test");
    // }
    var urllist=[];
    var pointer=0;
    var urltable="http://1.85.37.136:9999/medknowledge/list/";
    var urlop="http://1.85.37.136:9999/medknowledge/op/";
    var urlfilter="http://1.85.37.136:9999/medknowledge/list/";
// var urltable="http://202.117.54.88:9999/medknowledge/list/";
// var urlop="http://202.117.54.88:9999/medknowledge/op/";
// var urlfilter="http://202.117.54.88:9999/medknowledge/query/";
    var chance=0;

    $scope.displayData = function (tables,nums){
        // console.log("it is dispalayData !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        if(!!$scope.table){
            $("#example1").html('<div class="" ');
            $scope.table.api().destroy();
        }
        var json = {};
        $("#example1 thead tr th").each(function(){
                 // console.log(this);
            // console.log($(this).attr("class"));
            if($(this).attr("class").indexOf("click")>=0){

                // console.log($(this).attr("id"));
                if($(this).attr("class").indexOf("asc")>=0)
                {
                    json["Sort_item"]=$(this).attr("id");
                }else   if($(this).attr("class").indexOf("desc")>=0){
                    var sss=$(this).attr("id");
                    json["Sort_item"]="-"+sss;
                }
            }
        })
        json["Table"] = tables;
        var numss=1;
        if(nums=="forward"){
            numss=parseInt($("#pagination .active").text())+1;
        }else if(nums=="back"){
            numss=parseInt($("#pagination .active").text())-1;
        }else{
            numss=nums;
        }
        json["Start"]=(numss-1)*20||0;
        json["End"] = numss*20||20;
        var jsonStr={};
        //判断类型，分别取取数据
        // console.log(tables);
        // console.log(json);
        // console.log(jsonStr);
        if(tables=="Disease"){
            var Icd10=$("#ICD10").val();
            var Name=$("#名字").val();
            var Ename=$("#英文名").val();
            var Oname=$("#别名").val();
            var Dclass=$("#科室").val();
            // if(!$("#ICD10").hasClass('asc')) Icd10 = '-' + Icd10;
            // if(!$("#").hasClass('asc')) Icd10 = '-' + Icd10;
            // if(!$("#ICD10").hasClass('asc')) Icd10 = '-' + Icd10;
            // if(!$("#ICD10").hasClass('asc')) Icd10 = '-' + Icd10;
            // if(!$("#ICD10").hasClass('asc')) Icd10 = '-' + Icd10;
            // console.log($scope.isInit);
            if($scope.isInit === 1) json["Sort_item"] = "Icd10";

            // $("#example1 thead tr th").each(function(){
            //     console.log($(this).attr("class"));
            //     if($(this).attr("class").indexOf("click")>=0){

            //         console.log($(this).attr("id"));
            //         if($(this).attr("class").indexOf("asc")>=0)
            //         {
            //             json["Sort_item"]=$(this).attr("id");
            //         }else   if($(this).attr("class").indexOf("desc")>=0){
            //             var sss=$(this).attr("id");
            //             json["Sort_item"]="-"+sss;
            //         }

            //     }


            // });

            var filter={};
            filter["Icd10"]=Icd10;
            filter["Name"]=Name;
            filter["Ename"]=Ename;
            filter["Oname"]=Oname;
            filter["Dclass"] = Dclass;
            json["Filter"]=filter;
            jsonStr = JSON.stringify(json);
        }else if(tables=="Symptom"){

            var Name=$("#名称").val();
            var Yjks=$("#一级科室").val();
            var Ejks=$("#二级科室").val();
            var Yjbw=$("#一级部位").val();
            var Ejbw=$("#二级部位").val();
            if($scope.isInit === 1) json["Sort_item"] = "Name";
            // json["Sort_item"] = "Name";
            // $("#example1 thead tr th").each(function(){
            //    // console.log($(this).attr("class"));
            //     if($(this).attr("class").indexOf("click")>=0){
            //         console.log($(this).attr("id"));

            //         if($(this).attr("class").indexOf("asc")>=0)
            //         {
            //             json["Sort_item"]=$(this).attr("id");
            //         }else   if($(this).attr("class").indexOf("desc")>=0){
            //             var sss=$(this).attr("id");
            //             json["Sort_item"]="-"+sss;
            //         }

            //     }


            // });

            var filter={};
            filter["Name"]=Name;
            filter["Yjks"]=Yjks;
            filter["Ejks"]=Ejks;
            filter["Yjbw"]=Yjbw;
            filter["Ejbw"]=Ejbw;
            json["Filter"]=filter;
            jsonStr = JSON.stringify(json);


        }else if(tables=="Medication"){


//medication
            var Name=$("#名字").val();
            var Ename=$("#英文名").val();
            var Oname=$("#别名").val();
            var Sclass=$("#类别").val();
            // json["Sort_item"] = "Name";
            if($scope.isInit === 1) json["Sort_item"] = "Name";
            // $("#example1 thead tr th").each(function(){
            //     console.log($(this).attr("class"));
            //     if($(this).attr("class").indexOf("click")>=0){

            //         console.log($(this).attr("id"));
            //         if($(this).attr("class").indexOf("asc")>=0)
            //         {
            //             json["Sort_item"]=$(this).attr("id");
            //         }else   if($(this).attr("class").indexOf("desc")>=0){
            //             var sss=$(this).attr("id");
            //             json["Sort_item"]="-"+sss;
            //         }

            //     }


            // });
            var filter={};
            filter["Name"]=Name;
            filter["Ename"]=Ename;
            filter["Oname"]=Oname;
            filter["Sclass"]=Sclass;
            json["Filter"]=filter;
            jsonStr = JSON.stringify(json);
        }else if(tables=="Medicare"){


            var Name=$("#名字").val();
            var Ename=$("#英文名").val();
            var Fclass=$("#分类").val();
            var Ybbxjx=$("#医保报销剂型").val();
            var Ybbxxzlb=$("#报销限制类别").val();
            // json["Sort_item"] = "Name";
            if($scope.isInit === 1) json["Sort_item"] = "Name";

            // $("#example1 thead tr th").each(function(){
            //     console.log($(this).attr("class"));
            //     if($(this).attr("class").indexOf("click")>=0){

            //         console.log($(this).attr("id"));
            //         if($(this).attr("class").indexOf("asc")>=0)
            //         {
            //             json["Sort_item"]=$(this).attr("id");
            //         }else   if($(this).attr("class").indexOf("desc")>=0){
            //             var sss=$(this).attr("id");
            //             json["Sort_item"]="-"+sss;
            //         }

            //     }


            // });
            var filter={};
            filter["Name"]=Name;
            filter["Ename"]=Ename;
            filter["Ybbxjx"]=Ybbxjx;
            filter["Fclass"]=Fclass;
            filter["Ybbxxzlb"]=Ybbxxzlb;
            json["Filter"]=filter;
            jsonStr = JSON.stringify(json);

        }else if(tables=="Lab"){


            var Name=$("#名字").val();
            var Ename=$("#英文名字").val();
            var Oname=$("#别名").val();
            var Fclass=$("#一级分类").val();
            var Sclass=$("#二级分类").val();
            if($scope.isInit === 1) json["Sort_item"] = "Name";
            // json["Sort_item"] = "Name";
            // $("#example1 thead tr th").each(function(){
            //     console.log($(this).attr("class"));
            //     if($(this).attr("class").indexOf("click")>=0){

            //         console.log($(this).attr("id"));
            //         if($(this).attr("class").indexOf("asc")>=0)
            //         {
            //             json["Sort_item"]=$(this).attr("id");
            //         }else   if($(this).attr("class").indexOf("desc")>=0){
            //             var sss=$(this).attr("id");
            //             json["Sort_item"]="-"+sss;
            //         }

            //     }


            // });
            var filter={};
            filter["Name"]=Name;
            filter["Ename"]=Ename;
            filter["Oname"]=Oname;
            filter["Fclass"]=Fclass;
            filter["Sclass"]=Sclass;
            json["Filter"]=filter;
            jsonStr = JSON.stringify(json);



        }else if(tables=="Clinicalpath"){

            var Name=$("#名字").val();
            var classs=$("#分类").val();
            var Year=$("#版本号").val();
            if($scope.isInit === 1) json["Sort_item"] = "Name";
            // json["Sort_item"] = "Name";
            // $("#example1 thead tr th").each(function(){
            //     console.log($(this).attr("class"));
            //     if($(this).attr("class").indexOf("click")>=0){

            //         console.log($(this).attr("id"));
            //         if($(this).attr("class").indexOf("asc")>=0)
            //         {
            //             json["Sort_item"]=$(this).attr("id");
            //         }else   if($(this).attr("class").indexOf("desc")>=0){
            //             var sss=$(this).attr("id");
            //             json["Sort_item"]="-"+sss;
            //         }

            //     }


            // });
            var filter={};
            filter["Name"]=Name;
            filter["Class"]=classs;
            filter["Year"]=Year;
            json["Filter"]=filter;
            jsonStr = JSON.stringify(json);

        }
        // console.log(jsonStr);
        var canshu={"q":jsonStr};
        // console.log(canshu);
        $.ajax({
            type: "GET",
            url: urlfilter,
            data:canshu,
            dataType: "json",
            success: function(data){
                // console.log(canshu);
                // console.log(urlfilter);
                // console.log(data);
                // console.log(nums);
                if(tables=="Disease"){

                    $scope.displayDisease(data,"Disease",nums);
                }else if(tables=="Symptom"){

                    $scope.displaySymptom(data,"Symptom",nums);
                }else if(tables=="Medication"){
                    $scope.displayMedication(data,"Medication",nums);
                }else if(tables=="Lab"){

                    $scope.displayLab(data,"Lab",nums);
                }else if(tables=="Medicare"){

                    $scope.displayMedicare(data,"Medicare",nums);

                }else  if(tables=="Clinicalpath"){

                    $scope.displayClinicalpath(data,"Clinicalpath",nums);

                }


            }



        });
    }
    if(!!$rootScope.mkCurrentPage){
        // console.log($('#example1_wrapper').find('thead tr th'));
        if(!!$scope.table) $scope.table.api().destroy();
        $('#example1_wrapper').find('thead tr th').remove();
        // console.log($rootScope.mkCurrentPage);
        $scope.displayData($rootScope.mkCurrentPage,1);
    }
    $scope.bindclick = function(tables){

        if(tables=="Disease")
        {
            $(".dis_click").click(function(){

                var id=$(this).attr("id");
                // console.log(id);
                var json={};
                json["Table"] = tables;
                json["Did"]=id;
                var jsonStr = JSON.stringify(json);
                var canshu={"q":jsonStr};
                $.getJSON(urlop,canshu,function(datas) {
                    // console.log(canshu);
                    // console.log(datas);
                    times=10;

                    urllist=[];
                    pointer=0;
                    var strs="disease/";
                    strs=strs+id;
                    urllist.push(strs);
                    pointer++;
                    var details="";
                    var mainwords_dis={"Ename":"英文名字","Oname":"别名","Icd10":"Icd10"};
                    var dkey={"Gs":"概述" ,"Lxbx":"流行病学" ,"By":"病因" ,"Fbjz":"发病机制" ,"Lcbx":"临床表现" ,"Bfz":"并发症" ,"Sysjc":"实验室检查" ,"Qtfzjc":"其他辅助检查" ,"Zd":"诊断" ,"Jbzd":"鉴别诊断" ,"Zl":"治疗" ,"Yh":"预后" ,"Yf":"预防" };
                    details=details+'<div class="modal-header">';
                    details=details+'<button type="button" class="close"';
                    details=details+' data-dismiss="modal" aria-hidden="true"> &times';
                    details=details+'</button>';
                    details=details+'<h2  style="color: #3c8dbc; text-align:center " class="modal-title bigtitle" id="myModalLabel">';
                    details=details+datas.Results["Name"];
                    details=details+'</h2>';
                    details=details+'<div style="float:right" ><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
                    details=details+'<a href="javascript:void(0);" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';

                    details=details+'</div><div class="modal-body" du-scroll-container>';
                    //nava bar

                    details=details+'<div class="col-md-3" role="complementary">';
                    //details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" >';
                    details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
                    for(var j in dkey) {
                        for(var i in datas.Results)
                        {
                            if(i==j){
                                details=details+'<li class>';
                                details=details+'<a href="#'+j+'" du-smooth-scroll du-scrollspy><i class="fa fa-fw fa-chevron-right iconss"></i>'+dkey[j]+'</a>';
                                // $scope.test = function () {
                                //     console.log('click test !');
                                // }
                                // details=details+'<a ng-click="test()">'+dkey[j]+'test</a>';
                                details=details+'</li>';
                            }
                        }
                    }
                    details=details+'</ul>';
                    //    details=details+'</nav>';
                    details=details+'</div>';
                    //end nav


                    details+='<div class="col-md-9" role="main">';
                    //var de="";
                    var de='<table class="table table-bordered table-striped"><thead>'+
                        '<tr>'+
                        '<th>英文名称</th>'+
                        '<th>别名</th>'+
                        '<th>ICD10</th>'+

                        '</tr>'+
                        '</thead>'+
                        ' <tbody>'+
                        '<tr>';
                    for(var m in mainwords_dis){
                        for(var n in datas.Results)
                        {
                            if(m==n)
                            {
                                //de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_dis[m]+'</b></h3>';

                                if(m!="Oname"){
                                    de+='<td>';
                                    de+=datas.Results[n];
                                    de+='</td>';
                                }else{
                                    de+='<td>';
                                    de+=datas.Results[n];
                                    de+='</td>';
                                }
                            }

                        }

                    }
                    de+='</tr>';
                    de+='</tbody></table>';
                    for(var j in dkey) {

                        for(var i in datas.Results)
                        {
                            var temp=0;
                            var title="";

                            if(i==j){
                                de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                                var rs=eval(datas.Results[i]);

                                for(var m in rs )
                                {

                                    if(rs[m][0]=='0'){
                                        de=de+rs[m][1];
                                    }else if(rs[m][0]=='1'){
                                        de=de+"<a href='javascript:void(0);' ng-click=\"showdetails('"+rs[m][2]+"')\">"+rs[m][1]+"</a>";

                                    }else if(rs[m][0]=='10'){
                                        de=de+'</br>';
                                    }else if(rs[m][0]=='2'){
                                        de=de+'</br>';
                                        // console.log(rs[m][2]+rs[m][3]);

                                        var imagelist=rs[m][1].split("/");
                                        if(imagelist[1]!=null){
                                            var height=200,width=100;
                                            if(rs[m][2]!=0){
                                                height=rs[m][2];
                                            }
                                            if(rs[m][3]!=0){
                                                width=rs[m][3];
                                            }
                                            var imageurl='http://1.85.37.136:9999/medknowledge/imageop/?q={"Iid":"'+imagelist[1]+'"}';
                                            //var imageurl='http://1.85.37.136:9999/imageop/?q={"Iid":"i10109"}';
                                            de=de+'<div><img alt="User Image" src='+ imageurl+'  style="width:'+width+', height:'+height+'"/></div>';
                                            de=de+'</br>';
                                        }


                                    }

                                }

                            }
                        }

                    }
                    details=details+de;
                    details=details+'</div>';

                    details=details+'</div>';
                    $(".modal-content").html("");
                    $scope.details=$compile(details)($scope);
                    angular.element('.modal-content').html($scope.details);
                    $('#myModal').modal();

                    //setTimeout(function(){},20000);
                });

            });

        }else if(tables=="Symptom"){

            $(".dis_click").click(function(){
                var id=$(this).attr("id");
                var json={};
                json["Table"] = "Symptom";
                json["Sid"]=id;
                var jsonStr = JSON.stringify(json);
                var canshu={"q":jsonStr};
                //  console.log(canshu);
                $.getJSON(urlop, canshu, function(datas) {
                    urllist=[];
                    pointer=0;
                    // console.log(datas);
                    var strs="symptom/";
                    strs=strs+id;
                    urllist.push(strs);
                    pointer++;
                    var details="";
                    var dkey={"Zs":"综述", "Zzxs":"症状详述", "Zzqy":"症状起因","Dzyp":"对症药品","Xszz":"相似症状"};
                    var mainwords_sym={"Yjks":"一级科室","Ejks":"二级科室","Yjbw":"一级部位","Ejbw":"二级部位"};
                    details=details+'<div class="modal-header">';
                    details=details+'<button type="button" class="close"';
                    details=details+' data-dismiss="modal" aria-hidden="true"> &times';
                    details=details+'</button>';
                    details=details+'<h2  style="color: #3c8dbc;text-align:center" class="modal-title" id="myModalLabel">';
                    details=details+datas.Results["Name"];
                    details=details+'</h2>';
                    details=details+'<div style="float:right" ><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
                    details=details+'<a href="javascript:void(0);" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';
                    details=details+'</div><div class="modal-body" du-scroll-container>';

                    details=details+'<div class="col-md-3" role="complementary">';
                    // details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" >';
                    details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
                    for(var j in dkey) {
                        for(var i in datas.Results)
                        {
                            if(i==j){
                                details=details+'<li>';
                                details=details+'<a href="#'+j+'"du-smooth-scroll du-scrollspy><i class="fa fa-fw fa-chevron-right iconss"></i>'+dkey[j]+'</a>';
                                details=details+'</li>';
                            }
                        }
                    }
                    details=details+'</ul>';
                    //   details=details+'</nav>';
                    details=details+'</div>';


                    details+='<div class="col-md-9">';
                    // var de="";
                    var de='<table class="table table-bordered table-striped"><thead>'+
                        '<tr>'+
                        '<th>一级科室</th>'+
                        '<th>二级科室</th>'+
                        '<th>一级部位</th>'+
                        '<th>二级部位</th>'+
                        '</tr>'+
                        '</thead>'+
                        ' <tbody>'+
                        '<tr>';
                    for(var m in mainwords_sym){
                        for(var n in datas.Results)
                        {
                            if(m==n)
                            {
                                var ts=datas.Results[n];
                                if(ts){
                                    // de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_sym[m]+'</b></h3>';
                                    de+='<td>';
                                    de+=datas.Results[n];
                                    de+='</td>';
                                }
                            }

                        }

                    }

                    de+='</tr>';
                    de+='</tbody></table>';
                    for(var j in dkey) {

                        for(var i in datas.Results)
                        {
                            var temp=0;
                            var title="";

                            if(i==j){
                                de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                                var rs=eval(datas.Results[i]);

                                for(var m in rs )
                                {

                                    if(rs[m][0]=='0'){
                                        de=de+rs[m][1];
                                    }else if(rs[m][0]=='1'){
                                        de=de+"<a href='javascript:void(0);' ng-click=\"showdetails('"+rs[m][2]+"')\">"+rs[m][1]+"</a>";

                                    }else if(rs[m][0]=='10'){
                                        de=de+'</br>';
                                    }else if(rs[m][0]=='2'){
                                        de=de+'</br>';
                                        // console.log(rs[m][2]+rs[m][3]);

                                        var imagelist=rs[m][1].split("/");
                                        if(imagelist[1]!=null){
                                            var height=200,width=400;
                                            if(rs[m][2]!=0){
                                                height=rs[m][2];
                                            }
                                            if(rs[m][3]!=0){
                                                width=rs[m][3];
                                            }
                                            var imageurl='http://1.85.37.136:9999/medknowledge/imageop/?q={"Iid":"'+imagelist[1]+'"}';
                                            //var imageurl='http://1.85.37.136:9999/imageop/?q={"Iid":"i10109"}';
                                            de=de+'<div><img alt="User Image" src='+ imageurl+'  style="width:'+width+', height:'+height+'"/></div>';
                                            de=de+'</br>';
                                        }
                                    }

                                }

                            }
                        }

                    }


                    //可能疾病和常用检查

                    //  for(var i in datas.Results)
                    //   {
                    //     if(i=="Knjb"){
                    //       de=de+'<h3 style="color: #3c8dbc;" id="'+i+'"><b>可能疾病</b></h3>';
                    //       de+='<table class="table table-bordered table-striped"><thead>'+
                    //                   '<tr>'+
                    //                        '<th>可能疾病</th>'+
                    //                        '<th>伴随症状</th>'+
                    //                        '<th>就诊科室</th>'+
                    //                     //   '<th>二级部位</th>'+
                    //                    '</tr>'+
                    //              '</thead>'+
                    //              ' <tbody>'+
                    //     //   console.log(eval(datas.Results[i]));
                    //        var knbj={};
                    //        kbnj=eval(datas.Results[i]);
                    //        for(var j=0;j<knbj.length;j++)
                    //        {
                    //             de+='<tr>';
                    //           //  console.log(knbj[j]);
                    //             var strs="disease/"+knbj[j]["did"];
                    //              de+="<td><a href='javascript:void(0);' ng-click=\"showdetails('"+strs+"')\">";
                    //              de+=knbj[j]["dname"];
                    //              de+='</a></td>';
                    //              de+='<td>';
                    //              var temp="";
                    //              for(var p=0;p<knbj[j]["伴随症状"].length;p++){
                    //              temp+=knbj[j]["伴随症状"][p]["sname"]+" ";
                    //           //   console.log(temp);
                    //              }
                    //           //   de+=temp;
                    //              de+='</td>';
                    //              de+='<td>';
                    //              de+=knbj[j]["dname"];
                    //              de+='</td>';
                    //              de+='</tr>';
                    //        }
                    //     }
                    // //  console.log(datas.Results[i]);
                    //
                    //   }

                    //   de+='</tbody></table>';
                    details=details+de;
                    details=details+'</div>';
                    details=details+'</div>';
                    $(".modal-content").html("");
                    $(".modal-content").html($compile(details)($scope));

                });
            });



        }else if(tables=="Medication"){



            /* page end  */
            $(".dis_click").click(function(){


                var id=$(this).attr("id");
                var json={};
                json["Table"] = "Medication";
                json["Mid"]=id;
                var jsonStr = JSON.stringify(json);
                var canshu={"q":jsonStr};
                // console.log(canshu);
                $.getJSON(urlop,canshu, function(datas) {
                    // console.log(datas);
                    urllist=[];
                    pointer=0;

                    var strs="medication/";
                    strs=strs+id;
                    urllist.push(strs);
                    pointer++;
                    var details="";
                    var mainwords_med={"Ename":"英文名称","Oname":"别名","Sclass":"类别"};
                    var dkey={"Ylzy":"药理作用","Yfyl":"用法用量", "Ydx":"药动学", "Zysx":"注意事项", "Zjdp":"专家点评", "Ywxhzy":"药物相互作用", "Jjz":"禁忌症", "Syz":"适应症", "Ywjx":"药物剂型", "Blfy":"不良反应"};
                    details=details+'<div class="modal-header">';
                    details=details+'<button type="button" class="close"';
                    details=details+' data-dismiss="modal" aria-hidden="true"> &times';
                    details=details+'</button>';
                    details=details+'<h2  style="color: #3c8dbc; text-align:center" class="modal-title" id="myModalLabel">';
                    details=details+datas.Results["Name"];
                    details=details+'</h2>';
                    details=details+'<div style="float:right" ><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
                    details=details+'<a href="javascript:void(0);" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';
                    details=details+'</div><div class="modal-body" du-scroll-container>';

                    details=details+'<div class="col-md-3" role="complementary">';
                    //   details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" >';
                    details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
                    for(var j in dkey) {
                        for(var i in datas.Results)
                        {
                            if(i==j){
                                details=details+'<li>';
                                details=details+'<a href="#'+j+'"du-smooth-scroll du-scrollspy><i class="fa fa-fw fa-chevron-right iconss"></i>'+dkey[j]+'</a>';
                                details=details+'</li>';
                            }
                        }
                    }
                    details=details+'</ul>';
                    //   details=details+'</nav>';
                    details=details+'</div>';

                    details+='<div class="col-md-9">';
                    //var de="";
                    var de='<table class="table table-bordered table-striped"><thead>'+
                        '<tr>'+
                        '<th>英文名称</th>'+
                        '<th>别名</th>'+
                        '<th>类别</th>'+

                        '</tr>'+
                        '</thead>'+
                        ' <tbody>'+
                        '<tr>';
                    for(var m in mainwords_med){
                        for(var n in datas.Results)
                        {
                            if(m==n)
                            {
                                //   de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_med[m]+'</b></h3>';
                                if(m!="Oname"){
                                    de+='<td>';
                                    de+=datas.Results[n];
                                    de+='</td>';
                                }else{
                                    de+='<td>';
                                    de+=datas.Results[n];
                                    de+='</td>';
                                }
                            }

                        }

                    }
                    de+='</tr>';
                    de+='</tbody></table>';

                    for(var j in dkey) {

                        for(var i in datas.Results)
                        {
                            var temp=0;
                            var title="";

                            if(i==j){
                                de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                                var rs=eval(datas.Results[i]);

                                for(var m in rs )
                                {

                                    if(rs[m][0]=='0'){
                                        de=de+rs[m][1];
                                    }else if(rs[m][0]=='1'){
                                        de=de+"<a href='javascript:void(0);' ng-click=\"showdetails('"+rs[m][2]+"')\">"+rs[m][1]+"</a>";
                                    }else if(rs[m][0]=='10'){
                                        de=de+'</br>';
                                    }else if(rs[m][0]=='2'){
                                        de=de+'</br>';
                                        //   console.log(rs[m][2]+rs[m][3]);

                                        var imagelist=rs[m][1].split("/");
                                        if(imagelist[1]!=null){
                                            var height=200,width=100;
                                            if(rs[m][2]!=0){
                                                height=rs[m][2];
                                            }
                                            if(rs[m][3]!=0){
                                                width=rs[m][3];
                                            }
                                            var imageurl='http://1.85.37.136:9999/medknowledge/imageop/?q={"Iid":"'+imagelist[1]+'"}';
                                            //var imageurl='http://1.85.37.136:9999/imageop/?q={"Iid":"i10109"}';
                                            de=de+'<div><img alt="User Image" src='+ imageurl+'  style="width:'+width+', height:'+height+'"/></div>';
                                            de=de+'</br>';
                                        }
                                    }

                                }

                            }
                        }

                    }
                    details=details+de;
                    details=details+'</div>';

                    details=details+'</div>';
                    //     details=details+' <div class="modal-footer">';
                    //     details=details+'<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
                    //     details=details+'</div>';
                    $(".modal-content").html("");
                    $(".modal-content").html($compile(details)($scope));


                });
            });


        }else if(tables=="Lab"){



            $(".dis_click").click(function(){
                var id=$(this).attr("id");
                var json={};
                json["Table"] = "Lab";
                json["Lid"]=id;
                var jsonStr = JSON.stringify(json);
                var canshu={"q":jsonStr};
                // console.log(canshu);
                $.getJSON(urlop,canshu,   function(datas) {
                    //console.log(datas);
                    urllist=[];
                    pointer=0;

                    var strs="laboratory/";
                    strs=strs+id;
                    urllist.push(strs);
                    pointer++;
                    var details="";
                    var mainwords_lab={"Ename":"英文名字","Oname":"别名","Fclass":"Fclass","Sclass":"Sclass"};
                    var dkey={"Gs":"概述","Yl":"原理", "Sj":"试剂", "Zcz":"正常值","Lcyy":"临床意义","Czff":"操作方法","Fz":"附注"};
                    details=details+'<div class="modal-header">';
                    details=details+'<button type="button" class="close"';
                    details=details+' data-dismiss="modal" aria-hidden="true"> &times';
                    details=details+'</button>';
                    details=details+'<h2  style="color: #3c8dbc; text-align:center " class="modal-title" id="myModalLabel">';
                    details=details+datas.Results["Name"];
                    details=details+'</h2>';
                    details=details+'<div style="float:right" ><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
                    details=details+'<a href="javascript:void(0);" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';

                    details=details+'</div><div class="modal-body" du-scroll-container>';

                    details=details+'<div class="col-md-3" role="complementary">';
                    //   details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" >';
                    details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
                    for(var j in dkey) {
                        for(var i in datas.Results)
                        {
                            if(i==j){
                                details=details+'<li>';
                                details=details+'<a href="#'+j+'"du-smooth-scroll du-scrollspy><i class="fa fa-fw fa-chevron-right iconss"></i>'+dkey[j]+'</a>';
                                details=details+'</li>';
                            }
                        }
                    }
                    details=details+'</ul>';
                    //   details=details+'</nav>';
                    details=details+'</div>';

                    details+='<div class="col-md-9">';
                    // var de="";
                    var de='<table class="table table-bordered table-striped"><thead>'+
                        '<tr>'+
                        '<th>英文名称</th>'+
                        '<th>别名</th>'+
                        '<th>一级分类</th>'+
                        '<th>二级分类</th>'+
                        '</tr>'+
                        '</thead>'+
                        ' <tbody>'+
                        '<tr>';
                    for(var m in mainwords_lab){
                        for(var n in datas.Results)
                        {
                            if(m==n)
                            {
                                //   de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_lab[m]+'</b></h3>';
                                if(m!="Oname"){
                                    de+='<td>';
                                    de+=datas.Results[n];
                                    de+='</td>';
                                }else{
                                    de+='<td>';
                                    de+=datas.Results[n];
                                    de+='</td>';
                                }
                            }

                        }

                    }

                    de+='</tr>';
                    de+='</tbody></table>';

                    for(var j in dkey) {

                        for(var i in datas.Results)
                        {
                            var temp=0;
                            var title="";

                            if(i==j){
                                de=de+'<h3 style="color:#3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                                var rs=eval(datas.Results[i]);

                                for(var m in rs )
                                {

                                    if(rs[m][0]=='0'){
                                        de=de+rs[m][1];
                                    }else if(rs[m][0]=='1'){
                                        de=de+"<a href='javascript:void(0);' ng-click=\"showdetails('"+rs[m][2]+"')\">"+rs[m][1]+"</a>";

                                    }else if(rs[m][0]=='10'){
                                        de=de+'</br>';
                                    }else if(rs[m][0]=='2'){
                                        de=de+'</br>';
                                        // console.log(rs[m][2]+rs[m][3]);

                                        var imagelist=rs[m][1].split("/");
                                        if(imagelist[1]!=null){
                                            var height=200,width=100;
                                            if(rs[m][2]!=0){
                                                height=rs[m][2];
                                            }
                                            if(rs[m][3]!=0){
                                                width=rs[m][3];
                                            }
                                            var imageurl='http://1.85.37.136:9999/medknowledge/imageop/?q={"Iid":"'+imagelist[1]+'"}';
                                            //var imageurl='http://1.85.37.136:9999/imageop/?q={"Iid":"i10109"}';
                                            de=de+'<div><img alt="User Image" src='+ imageurl+'  style="width:'+width+', height:'+height+'"/></div>';
                                            de=de+'</br>';
                                        }
                                    }

                                }

                            }
                        }

                    }
                    details=details+de;
                    details=details+'</div>';

                    details=details+'</div>';
                    //     details=details+' <div class="modal-footer">';
                    //     details=details+'<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
                    //       details=details+'</div>';
                    $(".modal-content").html("");
                    $(".modal-content").html($compile(details)($scope));


                });
            });




        }else if(tables=="Medicare"){


            $(".dis_click").click(function(){

                var id=$(this).attr("id");
                // console.log(id);
                var json={};
                json["Table"] = "Medicare";
                json["Mid"]=id;
                var jsonStr = JSON.stringify(json);
                var canshu={"q":jsonStr};
                $.getJSON(urlop,canshu,
                    function(datas) {

                        if(datas.Return==0){

                            urllist=[];
                            pointer=0;
                            var strs="medicare/";
                            strs=strs+id;
                            urllist.push(strs);
                            pointer++;
                            var details="";
                            var mainwords_dis={"Fclass":"一级类别","Sclass":"二级类别","Ybbxxzlb":"医保报销限制类别","Ybbh":"医保编号","Ybbxjx":"医保报销剂型"};
                            var dkey={"Yfyl":"用法用量" ,"Blfy":"不良反应" ,"Ylzy":"药理作用" ,"Ywxyzy":"药物相互作用" ,"Syz":"适应症" ,"Zysx":"注意事项" ,"Jjz":"禁忌症"};
                            details=details+'<div class="modal-header">';
                            details=details+'<button type="button" class="close"';
                            details=details+' data-dismiss="modal" aria-hidden="true"> &times';
                            details=details+'</button>';
                            details=details+'<h2  style="color: #3c8dbc; text-align:center " class="modal-title bigtitle" id="myModalLabel">';
                            details=details+datas.Results["Name"];
                            details=details+'</h2>';
                            details=details+'<div style="float:right" ><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
                            details=details+'<a href="javascript:void(0);" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';

                            details=details+'</div><div class="modal-body" du-scroll-container>';
                            details=details+'<div class="col-md-3" role="complementary">';
                            // details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" style="position:fixed;">';
                            details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
                            for(var j in dkey) {
                                for(var i in datas.Results)
                                {
                                    if(i==j){
                                        details=details+'<li>';
                                        details=details+'<a href="#'+j+'"du-smooth-scroll du-scrollspy><i class="fa fa-fw fa-chevron-right iconss"></i>'+dkey[j]+'</a>';
                                        details=details+'</li>';
                                    }
                                }
                            }
                            details=details+'</ul>';
                            //   details=details+'</nav>';
                            details=details+'</div>';

                            details+='<div class="col-md-9" role="main">';
                            //var de="";
                            var de='<table class="table table-bordered table-striped"><thead>'+
                                '<tr>'+
                                '<th>一级类别</th>'+
                                '<th>二级类别</th>'+
                                '<th>医保报销限制类别</th>'+
                                '<th>医保编号</th>'+
                                '<th>医保报销剂型</th>'+
                                '</tr>'+
                                '</thead>'+
                                ' <tbody>'+
                                '<tr>';
                            for(var m in mainwords_dis){
                                for(var n in datas.Results)
                                {
                                    if(m==n)
                                    {
                                        //de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_dis[m]+'</b></h3>';

                                        if(m=="Ybbxjx"||m=="Ybbxxzlb"){
                                            de+='<td>';
                                            de+=datas.Results[n];
                                            de+='</td>';
                                        }else{
                                            de+='<td>';
                                            de+=(datas.Results[n]);
                                            de+='</td>';
                                        }
                                    }

                                }

                            }
                            de+='</tr>';
                            de+='</tbody></table>';
                            for(var j in dkey) {

                                for(var i in datas.Results)
                                {
                                    var temp=0;
                                    var title="";

                                    if(i==j){
                                        de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                                        var rs=datas.Results[i];
                                        de+=rs+'</br>';
                                    }
                                }

                            }
                            details=details+de;
                            details=details+'</div>';

                            details=details+'</div>';
                            //     details=details+' <div class="modal-footer">';
                            //     details=details+'<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
                            //     details=details+'</div>';
                            $(".modal-content").html("");
                            $(".modal-content").html($compile(details)($scope));
                        }


                        //  setTimeout(function(){},20000);
                    });



            });




        }else if(tables=="Clinicalpath"){

            $(".dis_click").click(function(){

                var id=$(this).attr("id");
                // console.log(id);
                var json={};
                json["Table"] = "Clinicalpath";
                json["Cid"]=id;
                var jsonStr = JSON.stringify(json);
                var canshu={"q":jsonStr};

                //   var url="http://1.85.37.136:9999/op/";


                $.getJSON(urlop,canshu,
                    function(datas) {

                        if(datas.Return==0){


                            urllist=[];
                            pointer=0;
                            var strs="Clinicalpath/";
                            strs=strs+id;
                            urllist.push(strs);
                            pointer++;
                            var details="";
                            var mainwords_dis={"Name":"名字","Class":"分类","Year":"年份"};
                            var dkey={"Content":"内容" };
                            details=details+'<div class="modal-header">';
                            details=details+'<button type="button" class="close"';
                            details=details+' data-dismiss="modal" aria-hidden="true"> &times';
                            details=details+'</button>';
                            details=details+'<h2  style="color: #3c8dbc; text-align:center " class="modal-title bigtitle" id="myModalLabel">';
                            details=details+datas.Results["Name"];
                            details=details+'</h2>';
                            details=details+'<div style="float:right" ><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
                            details=details+'<a href="javascript:void(0);" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';

                            details=details+'</div><div class="modal-body" du-scroll-container>';

                            details=details+'<div class="col-md-3" role="complementary">';
                            //   details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" style="position:fixed;">';
                            details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
                            for(var j in dkey) {

                                for(var i in datas.Results)
                                {
                                    if(i==j){
                                        var rs=eval(datas.Results[i]);

                                        for(var m in rs )
                                        {

                                            if(rs[m][0]=='1'){
                                                details=details+'<li>';
                                                details=details+'<a href="#'+rs[m][1]+'"du-smooth-scroll du-scrollspy><i class="fa fa-fw fa-chevron-right iconss"></i>'+rs[m][1]+'</a>';
                                                details=details+'</li>';
                                            }
                                            else if(rs[m][0]=='2'){
                                                details=details+'<li>';
                                                details=details+'<a href="#'+rs[m][1]+'"du-smooth-scroll du-scrollspy><i class="fa fa-fw fa-chevron-right iconss"></i>'+rs[m][1]+'</a>';
                                                details=details+'</li>';
                                            }

                                        }

                                    }
                                }

                            }
                            details=details+'</ul>';
                            //   details=details+'</nav>';
                            details=details+'</div>';

                            details+='<div class="col-md-9" role="main">';
                            //var de="";
                            var de='<table class="table table-bordered table-striped"><thead>'+
                                '<tr>'+
                                '<th>名字</th>'+
                                '<th>类别</th>'+
                                '<th>年份</th>'+

                                '</tr>'+
                                '</thead>'+
                                ' <tbody>'+
                                '<tr>';
                            for(var m in mainwords_dis){
                                for(var n in datas.Results)
                                {
                                    if(m==n)
                                    {
                                        de+='<td>';
                                        de+=datas.Results[n];
                                        de+='</td>';

                                    }

                                }

                            }
                            de+='</tr>';
                            de+='</tbody></table>';
                            for(var j in dkey) {

                                for(var i in datas.Results)
                                {
                                    var temp=0;
                                    var title="";

                                    if(i==j){
                                        //    de=de+'<h3 style="color: #3c8dbc;" id="'+i+'"><b>'+dkey[i]+'</b></h3>';
                                        var rs=eval(datas.Results[i]);

                                        for(var m in rs )
                                        {

                                            if(rs[m][0]=='1'){
                                                de=de+'<h3 style="color: #3c8dbc;" id="'+rs[m][1]+'">'+rs[m][1]+'</h3>';
                                            }else if(rs[m][0]=='2'){
                                                de=de+'<span id="'+rs[m][1]+'">'+rs[m][1]+"</span>"+"</br>";

                                            }else if(rs[m][0]=='3'){
                                                de=de+rs[m][1]+"</br>";
                                            }else if(rs[m][0]=='table'){
                                                de=de+rs[m][1];
                                                de=de+'</br>';

                                            }else {
                                                de=de+rs[m][1]+"</br>";
                                            }

                                        }

                                    }
                                }

                            }
                            details=details+de;
                            details=details+'</div>';

                            details=details+'</div>';
                            details=details+' <div class="modal-footer">';

                            details=details+'</div>';
                            $(".modal-content").html("");
                            $(".modal-content").html($compile(details)($scope));
                        }



                    });



            });



        }


    }
    // var init=1;
    $scope.filter = function(table,tables,flag){
        // console.log("fdsf");
        var json={};
        json["Table"] = tables;
        json["Start"]=0;
        json["End"] = 20;
        //  console.log(table);
        if(flag==0){

            if(tables=="Disease")
            {
                $scope.filterDisease(tables,json);
            }else if(tables=="Symptom"){
                $scope.filterSymptom(tables,json);
            }else if(tables=="Medication"){

                $scope.filterMedication(tables,json);
            }else if(tables=="Lab"){

                $scope.filterLab(tables,json);
            }else if(tables=="Medicare"){

                $scope.filterMedicare(tables,json);

            }else if(tables=="Clinicalpath"){

                $scope.filterClinicalpath(tables,json);

            }




        }else{
            // if(init == 1){
            //     if(tables=="Disease")
            //     {
            //         $scope.filterDisease(tables,json);
            //     }else if(tables=="Symptom"){
            //         $scope.filterSymptom(tables,json);
            //     }else if(tables=="Medication"){
            //
            //         $scope.filterMedication(tables,json);
            //     }else if(tables=="Lab"){
            //
            //         $scope.filterLab(tables,json);
            //     }else if(tables=="Medicare"){
            //
            //         $scope.filterMedicare(tables,json);
            //
            //     }else if(tables=="Clinicalpath"){
            //
            //         $scope.filterClinicalpath(tables,json);
            //
            //     }
            //     init =0;
            // }

            table.api().columns().every( function () {
                var that = this;
                // console.log(that.id);
                // console.log("fdsfdfssfs");
                $( 'input', this.footer() ).on( 'keyup', function () {
                    $scope.filterText = [];
                    $('#example1 tfoot th').each( function (a,b) {
                        // console.log(a);
                        // console.log(b);
                        // console.log($(this));
                        // console.log($(this).children());
                        if(!!$(this).children().val()) $scope.filterText.push($(this).children().val());
                        else $scope.filterText.push('');
                        // console.log($scope.filterText);
                        })
                    if(tables=="Disease")
                    {
                        $scope.filterDisease(tables,json);
                    }else if(tables=="Symptom"){
                        $scope.filterSymptom(tables,json);
                    }else if(tables=="Medication"){
                        $scope.filterMedication(tables,json);
                    }else if(tables=="Lab"){

                        $scope.filterLab(tables,json);


                    }else if(tables=="Medicare"){

                        $scope.filterMedicare(tables,json);

                    }else if(tables=="Clinicalpath"){

                        $scope.filterClinicalpath(tables,json);

                    }



                } );
            } );


        }

    }

    $scope.filterDisease = function(tables,json){

        var Icd10=$("#ICD10").val();
        var Name=$("#名字").val();
        var Ename=$("#英文名").val();
        var Oname=$("#别名").val();
        var Dclass=$("#科室").val();
        // console.log(Icd10);
        $("#example1 thead tr th").each(function(){
            //     console.log(this);
            if($(this).attr("class").indexOf("click")>=0){

                // console.log($(this).attr("id"));
                if($(this).attr("class").indexOf("asc")>=0)
                {
                    json["Sort_item"]=$(this).attr("id");
                }else   if($(this).attr("class").indexOf("desc")>=0){
                    var sss=$(this).attr("id");
                    json["Sort_item"]="-"+sss;
                }

            }


        });
        var filter={};
        filter["Icd10"]=Icd10;
        filter["Name"]=Name;
        filter["Ename"]=Ename;
        filter["Oname"]=Oname;
        filter["Dclass"] = Dclass;
        json["Filter"]=filter;
        var jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        //console.log(canshu);
        //console.log(this.value);
        $.ajax({
            type: "GET",
            url: urlfilter,
            data:canshu,
            dataType: "json",
            success: function(data){

                // console.log(data);

                var list="";
                var temp="";
                for(var i=0;i<data.Results.length;i++)
                {
                    temp=temp+ '<tr data-toggle="modal" class="dis_click myodd" id='+data.Results[i][0]+' data-target="#myModal"> ';

                    //    temp=temp+ '<td>'+data.Results[i][0]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][5]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][1]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][2]+'</td>';
                    var bieming=data.Results[i][3];
                    // var bieming="";
                    //    console.log(lis);
                    // for(var j=0;j<lis.length;j++)
                    // {
                    //     bieming+=lis[j]+',';

                    // }
                    if(bieming.length<60){
                        temp=temp+ '<td title="'+bieming.substring(0,bieming.length-1)+'">'+bieming.substring(0,bieming.length-1)+'</td>';
                    }else{

                        temp=temp+ '<td title="'+bieming.substring(0,bieming.length-1)+'">'+bieming.substring(0,60)+'...'+'</td>';
                    }
                    //temp=temp+ '<td>'+data.Results[i][3].substring(0,40)+'...'+'</td>';
                    temp=temp+ '<td>'+data.Results[i][4]+'</td>';

                    temp=temp+'</tr>';
                }

                list=list+temp;
                $("tbody").html($compile(list)($scope));
                // $("tr").removeClass("table.dataTable");
                /*  page code  */
                // console.log("!!!filterDisease pagination");
                var pagenums=data.Total_Disease_Count/20;
                var pagelist="";
                var back="back";
                var forward="forward";
                if(json["Start"]==0){
                    pagelist+='<li><a href="javascript:void(0)" class="disabled" style="disabled:true;">&laquo;</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+back+'\')">&laquo;</a></li>';
                }
                for(var i=0;i<10&&i<pagenums;i++)
                {
                    if(i==0){
                        pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                    }else{
                        pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                    }

                }

                if(pagenums>1){
                    pagelist+= '<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+forward+'\')">&raquo;</a></li>';
                }
                $(".pagination").html($compile(pagelist)($scope));
                /* page end  */



                $scope.bindclick(tables);
            }

        });





    }

    $scope.filterSymptom = function(tables,json){
// console.log(json);
        var Name=$("#名称").val();
        var Yjks=$("#一级科室").val();
        var Ejks=$("#二级科室").val();
        var Yjbw=$("#一级部位").val();
        var Ejbw=$("#二级部位").val();
        $("#example1 thead tr th").each(function(){
            // console.log($(this).attr("class"));
            if($(this).attr("class").indexOf("click")>=0){

                // console.log($(this).attr("id"));
                if($(this).attr("class").indexOf("asc")>=0)
                {
                    json["Sort_item"]=$(this).attr("id");
                }else   if($(this).attr("class").indexOf("desc")>=0){
                    var sss=$(this).attr("id");
                    json["Sort_item"]="-"+sss;
                }

            }


        });
        var filter={};
        filter["Name"]=Name;
        filter["Yjks"]=Yjks;
        filter["Ejks"]=Ejks;
        filter["Yjbw"]=Yjbw;
        filter["Ejbw"]=Ejbw;
        json["Filter"]=filter;
        jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        // console.log(canshu);
        $.ajax({
            type: "GET",
            url: urlfilter,
            data:canshu,
            dataType: "json",
            success: function(data){

                // console.log(data);

                var list="";
                var temp="";
                for(var i=0;i<data.Results.length;i++)
                {
                    temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';
                    //  temp=temp+ '<td>'+data.Results[i][0]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][1]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][2]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][3]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][4]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][5]+'</td>';
                    temp=temp+'</tr>';
                }

                list=list+temp;
                $("tbody").html($compile(list)($scope));

                /*  page code  */
                var pagenums=data.Total_Symptom_Count/20;
                var pagelist="";
                var back="back";
                var forward="forward";
                if(json["Start"]==0){
                    pagelist+='<li><a href="javascript:void(0)" class="disabled" style="disabled:true;">&laquo;</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+back+'\')">&laquo;</a></li>';
                }
                for(var i=0;i<10&&i<pagenums;i++)
                {
                    if(i==0){
                        pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                    }else{
                        pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                    }

                }

                if(pagenums>1){
                    pagelist+= '<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+forward+'\')">&raquo;</a></li>';
                }
                $(".pagination").html($compile(pagelist)($scope));
                /* page end  */



                $scope.bindclick(tables);
            }

        });






    }

    $scope.filterMedication = function(tables,json){

        var Name=$("#名字").val();
        var Ename=$("#英文名").val();
        var Oname=$("#别名").val();
        var Sclass=$("#类别").val();
        $("#example1 thead tr th").each(function(){
            // console.log($(this).attr("class"));
            if($(this).attr("class").indexOf("click")>=0){

                // console.log($(this).attr("id"));
                if($(this).attr("class").indexOf("asc")>=0)
                {
                    json["Sort_item"]=$(this).attr("id");
                }else   if($(this).attr("class").indexOf("desc")>=0){
                    var sss=$(this).attr("id");
                    json["Sort_item"]="-"+sss;
                }

            }


        });
        var filter={};
        filter["Name"]=Name;
        filter["Ename"]=Ename;
        filter["Oname"]=Oname;
        filter["Sclass"]=Sclass;
        json["Filter"]=filter;
        jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        $.ajax({
            type: "GET",
            url: urlfilter,
            data:canshu,
            dataType: "json",
            success: function(data){

                //   console.log(data);

                var list="";
                var temp="";
                for(var i=0;i<data.Results.length;i++)
                {
                    temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';

                    //  temp=temp+ '<td>'+data.Results[i][0]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][1]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][2]+'</td>';
                    var bieming=data.Results[i][3];

                    //    console.log(lis);
                    // for(var j=0;j<lis.length;j++)
                    // {
                    //     bieming+=lis[j]+',';

                    // }
                    if(bieming.length<60){
                        temp=temp+ '<td title="'+bieming.substring(0,bieming.length-1)+'">'+bieming.substring(0,bieming.length-1)+'</td>';
                    }else{

                        temp=temp+ '<td title="'+bieming.substring(0,bieming.length-1)+'">'+bieming.substring(0,60)+'...'+'</td>';
                    }

                    temp=temp+ '<td>'+data.Results[i][5]+'</td>';

                    temp=temp+'</tr>';
                }

                list=list+temp;
                $("tbody").html($compile(list)($scope));

                /*  page code  */
                var pagenums=data.Total_Medication_Count/20;
                var pagelist="";
                var back="back";
                var forward="forward";
                if(json["Start"]==0){
                    pagelist+='<li><a href="javascript:void(0)" class="disabled" style="disabled:true;">&laquo;</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+back+'\')">&laquo;</a></li>';
                }
                for(var i=0;i<10&&i<pagenums;i++)
                {
                    if(i==0){
                        pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                    }else{
                        pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                    }

                }

                if(pagenums>1){
                    pagelist+= '<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+forward+'\')">&raquo;</a></li>';
                }
                $(".pagination").html($compile(pagelist)($scope));
                /* page end  */

                $scope.bindclick(tables);
            }

        });






    }

    $scope.filterLab = function(tables,json){

        var Name=$("#名字").val();
        var Ename=$("#英文名字").val();
        var Oname=$("#别名").val();
        var Fclass=$("#一级分类").val();
        var Sclass=$("#二级分类").val();
        $("#example1 thead tr th").each(function(){
            // console.log($(this).attr("class"));
            if($(this).attr("class").indexOf("click")>=0){

                // console.log($(this).attr("id"));
                if($(this).attr("class").indexOf("asc")>=0)
                {
                    json["Sort_item"]=$(this).attr("id");
                }else   if($(this).attr("class").indexOf("desc")>=0){
                    var sss=$(this).attr("id");
                    json["Sort_item"]="-"+sss;
                }

            }


        });
        var filter={};
        filter["Name"]=Name;
        filter["Ename"]=Ename;
        filter["Oname"]=Oname;
        filter["Sclass"]=Sclass;
        json["Filter"]=filter;
        jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        $.ajax({
            type: "GET",
            url: urlfilter,
            data:canshu,
            dataType: "json",
            success: function(data){

                //   console.log(data);

                var list="";
                var temp="";
                for(var i=0;i<data.Results.length;i++)
                {
                    temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';

                    //    temp=temp+ '<td>'+data.Results[i][0]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][1]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][2]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][3]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][4]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][5]+'</td>';
                    temp=temp+'</tr>';
                }
                list=list+temp;
                $("tbody").html($compile(list)($scope));

                /*  page code  */
                var pagenums=data.Total_Lab_Count/20;
                var pagelist="";
                var back="back";
                var forward="forward";
                if(json["Start"]==0){
                    pagelist+='<li><a href="javascript:void(0)" class="disabled" style="disabled:true;">&laquo;</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+back+'\')">&laquo;</a></li>';
                }
                for(var i=0;i<10&&i<pagenums;i++)
                {
                    if(i==0){
                        pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                    }else{
                        pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                    }

                }

                if(pagenums>1){
                    pagelist+= '<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+forward+'\')">&raquo;</a></li>';
                }
                $(".pagination").html($compile(pagelist)($scope));
                /* page end  */

                $scope.bindclick(tables);
            }

        });



    }

    $scope.filterMedicare = function(tables,json){

        var Name=$("#名字").val();
        var Ename=$("#英文名").val();
        var Fclass=$("#分类").val();
        var Ybbxjx=$("#医保报销剂型").val();
        var Ybbxxzlb=$("#报销限制类别").val();
        $("#example1 thead tr th").each(function(){
            // console.log($(this).attr("class"));
            if($(this).attr("class").indexOf("click")>=0){

                // console.log($(this).attr("id"));
                if($(this).attr("class").indexOf("asc")>=0)
                {
                    json["Sort_item"]=$(this).attr("id");
                }else   if($(this).attr("class").indexOf("desc")>=0){
                    var sss=$(this).attr("id");
                    json["Sort_item"]="-"+sss;
                }

            }


        });
        var filter={};
        filter["Name"]=Name;
        filter["Ename"]=Ename;
        filter["Ybbxjx"]=Ybbxjx;
        filter["Fclass"]=Fclass;
        filter["Ybbxxzlb"]=Ybbxxzlb;
        json["Filter"]=filter;
        jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        $.ajax({
            type: "GET",
            url: urlfilter,
            data:canshu,
            dataType: "json",
            success: function(data){

                //   console.log(data);

                var list="";
                var temp="";
                for(var i=0;i<data.Results.length;i++)
                {
                    temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';

                    //  temp=temp+ '<td>'+data.Results[i][0]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][1]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][2]+'</td>';
                    //  temp=temp+ '<td>'+data.Results[i][3]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][3]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][4]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][5]+'</td>';
                    temp=temp+'</tr>';
                }

                list=list+temp;
                $("tbody").html($compile(list)($scope));

                /*  page code  */
                var pagenums=data.Total_Medicare_Count/20;
                var pagelist="";
                var back="back";
                var forward="forward";
                if(json["Start"]==0){
                    pagelist+='<li><a href="javascript:void(0)" class="disabled" style="disabled:true;">&laquo;</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+back+'\')">&laquo;</a></li>';
                }
                for(var i=0;i<10&&i<pagenums;i++)
                {
                    if(i==0){
                        pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                    }else{
                        pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                    }

                }

                if(pagenums>1){
                    pagelist+= '<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+forward+'\')">&raquo;</a></li>';
                }
                $(".pagination").html($compile(pagelist)($scope));
                /* page end  */

                $scope.bindclick(tables);
            }

        });


    }

    $scope.filterClinicalpath = function(tables,json){

        var Name=$("#名字").val();
        var Classs=$("#分类").val();
        var Year=$("#版本号").val();
        $("#example1 thead tr th").each(function(){
            // console.log($(this).attr("class"));
            if($(this).attr("class").indexOf("click")>=0){

                // console.log($(this).attr("id"));
                if($(this).attr("class").indexOf("asc")>=0)
                {
                    json["Sort_item"]=$(this).attr("id");
                }else   if($(this).attr("class").indexOf("desc")>=0){
                    var sss=$(this).attr("id");
                    json["Sort_item"]="-"+sss;
                }

            }


        });
        var filter={};
        filter["Name"]=Name;
        filter["Class"]=Classs;
        filter["Year"]=Year;
        json["Filter"]=filter;
        jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        $.ajax({
            type: "GET",
            url: urlfilter,
            data:canshu,
            dataType: "json",
            success: function(data){

                //   console.log(data);

                var list="";
                var temp="";
                for(var i=0;i<data.Results.length;i++)
                {
                    temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';
                    //  temp=temp+ '<td>'+data.Results[i][0]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][1]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][2]+'</td>';
                    temp=temp+ '<td>'+data.Results[i][3]+'</td>';
                    temp=temp+'</tr>';
                }
                list=list+temp;
                $("tbody").html($compile(list)($scope));

                /*  page code  */
                var pagenums=data.Total_Clinicalpath_Count/20;
                var pagelist="";
                var back="back";
                var forward="forward";
                if(json["Start"]==0){
                    pagelist+='<li><a href="javascript:void(0)" class="disabled" style="disabled:true;">&laquo;</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+back+'\')">&laquo;</a></li>';
                }
                for(var i=0;i<10&&i<pagenums;i++)
                {
                    if(i==0){
                        pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                    }else{
                        pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                    }

                }

                if(pagenums>1){
                    pagelist+= '<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+forward+'\')">&raquo;</a></li>';
                }
                $(".pagination").html($compile(pagelist)($scope));
                /* page end  */

                $scope.bindclick(tables);
            }

        });






    }
$scope.test = function () {
    // console.log("test!");
}
    $scope.displayDisease = function(data,tables,nums) {
// console.log("it is displayDisease");
//          console.log($('th'));
        var orders=[];
        $('thead th').each(function (a,b) {
            // console.log(a);
            // console.log(b);
            // console.log($(this).hasClass('asc'));
            if($(this).hasClass('asc'))
                orders.push('asc');
            else
                orders.push('desc');
        });
        if($scope.isInit === 1){
            orders = ['asc','asc','asc','asc','asc'];
            $scope.isInit = 0;
        };
        // console.log(orders);
        var list=' <thead>'+
            '<tr>'+
            //   '<th class="ids">ID</th>'+
            '<th class="'+ orders[0] +' click" ng-click="changeasc(0,\''+tables+'\')" id="Icd10">ICD10</th>'+
            '<th class='+ orders[1] +' ng-click="changeasc(1,\''+tables+'\')" id="Name">名字</th>'+
            '<th class='+ orders[2] +' ng-click="changeasc(2,\''+tables+'\')" id="Ename">英文名</th>'+
            '<th class='+ orders[3] +' ng-click="changeasc(3,\''+tables+'\')" id="Oname">别名</th>'+
            '<th class='+ orders[4] +' ng-click="changeasc(4,\''+tables+'\')" id="Dclass">科室</th>'+


            '</tr>'+
            '</thead>'+
            ' <tfoot>'+
            '<tr>'+
            //   '<th class="ids">ID</th>'+
            '<th>ICD10</th>'+
            '<th>名字</th>'+
            '<th>英文名</th>'+
            '<th>别名</th>'+
            '<th>科室</th>'+


            '</tr>'+
            '</tfoot>'+
            ' <tbody>';
        var temp="";
        for(var i=0;i<data.Results.length;i++)
        {
            temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';

            //    temp=temp+ '<td>'+data.Results[i][0]+'</td>';
            temp=temp+ '<td>'+data.Results[i][5]+'</td>';
            temp=temp+ '<td>'+data.Results[i][1]+'</td>';
            temp=temp+ '<td>'+data.Results[i][2]+'</td>';
            //var lis=data.Results[i][3];
            var bieming=data.Results[i][3];
            //    console.log(lis);
            // for(var j=0;j<lis.length;j++)
            // {
            //     bieming+=lis[j]+',';

            // }
            if(bieming.length<60){
                temp=temp+ '<td title="'+bieming.substring(0,bieming.length-1)+'">'+bieming.substring(0,bieming.length)+'</td>';
            }else{

                temp=temp+ '<td title="'+bieming.substring(0,bieming.length-1)+'">'+bieming.substring(0,60)+'...'+'</td>';
            }
            //temp=temp+ '<td>'+data.Results[i][3].substring(0,40)+'...'+'</td>';
            temp=temp+ '<td>'+data.Results[i][4]+'</td>';

            temp=temp+'</tr>';
        }

        list=list+temp+ ' </tbody>';
        $("#example1").html("");
        $("#example1").html($compile(list)($scope));

        $scope.table=$('#example1').dataTable( {
            "destroy":true,
            "ordering": false,
            "info":     false,
            "paging":   false
        } );
        $('#example1_wrapper .row .col-sm-6').remove();

        if(chance==0){
            var textCount = 0;
            $('#example1 tfoot th').each( function (a,b) {
                var title = $(this).text();
                if(!!$scope.filterText)
                    $(this).html( '<input type="text" placeholder="'+title+'过滤" id="'+title+'" value='+$scope.filterText[textCount] +'  >' );
                else
                    $(this).html( '<input type="text" id="'+title+'" value="" placeholder="'+title+'过滤" />' );
                textCount++;
            } );
            // console.log($('tfoot:eq(0)'));
            //  chance++;
        }

        // console.log("it is displaydata.js filter and bindcilck");
        // console.log($scope.table);
        $scope.filter($scope.table,tables);
        // $('#ICD10').trigger('keyup')
        var pagenums=data.Total_Disease_Count/20;
        // console.log(nums);
        if(nums === "back" && parseInt($("#pagination .active").text())===1) nums = 1;
        $scope.page(pagenums,nums,tables);
        $scope.bindclick(tables);
        // $scope.table.api().draw();
         // $("#example1").DataTable( );


    }
//显示症状
    $scope.displaySymptom = function(data,tables,nums){
        // console.log(data);
        // console.log($("#example1").html());
        var orders=[];
        $('thead th').each(function (a,b) {
            // console.log(a);
            // console.log(b);
            // console.log($(this).hasClass('asc'));
            if($(this).hasClass('asc'))
                orders.push('asc');
            else
                orders.push('desc');
        });
        if($scope.isInit === 1){
            orders = ['asc','asc','asc','asc','asc'];
            $scope.isInit = 0;
        }
        // console.log(orders);
        var list=' <thead>'+
            '<tr>'+
            //   '<th class="ids">ID</th>'+
            '<th class="'+ orders[0] +' click" ng-click="changeasc(0,\''+tables+'\')" id="Sid">名称</th>'+
            '<th class='+ orders[1] +' ng-click="changeasc(1,\''+tables+'\')" id="Yjks">一级科室</th>'+
            '<th class='+ orders[2] +' ng-click="changeasc(2,\''+tables+'\')" id="Ejks">二级科室</th>'+
            '<th class='+ orders[3] +' ng-click="changeasc(3,\''+tables+'\')" id="Yjbw">一级部位</th>'+
            '<th class='+ orders[4] +' ng-click="changeasc(4,\''+tables+'\')" id="Ejbw">二级部位</th>'+
            '</tr>'+
            '</thead>'+
            ' <tfoot>'+
            '<tr>'+
            //   '<th class="ids">ID</th>'+
            '<th>名称</th>'+
            '<th>一级科室</th>'+
            '<th>二级科室</th>'+
            '<th>一级部位</th>'+
            '<th>二级部位</th>'+


            '</tr>'+
            '</tfoot>'+
            ' <tbody>';
        var temp="";
        for(var i=0;i<data.Results.length;i++)
        {
            temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';
            //  temp=temp+ '<td>'+data.Results[i][0]+'</td>';
            temp=temp+ '<td>'+data.Results[i][1]+'</td>';
            temp=temp+ '<td>'+data.Results[i][2]+'</td>';
            temp=temp+ '<td>'+data.Results[i][3]+'</td>';
            temp=temp+ '<td>'+data.Results[i][4]+'</td>';
            temp=temp+ '<td>'+data.Results[i][5]+'</td>';
            temp=temp+'</tr>';
        }

        list=list+temp+ ' </tbody>';
        // console.log(list);

        $("#example1").html("");
        $("#example1").html($compile(list)($scope));
        // $scope.$apply();
        $scope.table = $('#example1').dataTable( {
            "destroy":  true,
            "ordering": false,
            "info":     false,
            "paging":   false
        } );

        $('#example1_wrapper .row .col-sm-6').remove();
        if(chance==0){
            var textCount = 0;
            $('#example1 tfoot th').each( function (a,b) {
                var title = $(this).text();
                if(!!$scope.filterText)
                    $(this).html( '<input type="text" placeholder="'+title+'过滤" id="'+title+'" value='+$scope.filterText[textCount] +'  >' );
                else
                    $(this).html( '<input type="text" id="'+title+'" value="" placeholder="'+title+'过滤" />' );
                textCount++;
            } );
        }
        $scope.filter($scope.table,tables);
        var pagenums=data.Total_Symptom_Count/20;
        if(nums === "back" && parseInt($("#pagination .active").text())===1) nums = 1;
        $scope.page(pagenums,nums,tables);
        $scope.bindclick(tables);

    }
//medication
    $scope.displayMedication = function(data,tables,nums){
        var orders=[];
        $('thead th').each(function (a,b) {
            // console.log(a);
            // console.log(b);
            // console.log($(this).hasClass('asc'));
            if($(this).hasClass('asc'))
                orders.push('asc');
            else
                orders.push('desc');
        });
        if($scope.isInit === 1){
            orders = ['asc','asc','asc','asc','asc'];
            $scope.isInit = 0;
        }
        // console.log(orders);
        var list=' <thead>'+
            '<tr>'+
            //   '<th class="ids">ID</th>'+
            '<th class="'+ orders[0] +' click" ng-click="changeasc(0,\''+tables+'\')" id="Name">名字</th>'+
            '<th class='+ orders[1] +' ng-click="changeasc(1,\''+tables+'\')" id="Ename">英文名</th>'+
            '<th class='+ orders[2] +' ng-click="changeasc(2,\''+tables+'\')" id="Oname">别名</th>'+
            '<th class='+ orders[3] +' ng-click="changeasc(3,\''+tables+'\')" id="Sclass">类别</th>'+
            '</tr>'+
            '</thead>'+
            ' <tfoot>'+
            '<tr>'+
            '<th>名字</th>'+
            '<th>英文名</th>'+
            '<th>别名</th>'+
            '<th>类别</th>'+
            '</tr>'+
            '</tfoot>'+
            ' <tbody>';
        var temp="";
        for(var i=0;i<data.Results.length;i++)
        {
            temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';

            //  temp=temp+ '<td>'+data.Results[i][0]+'</td>';
            temp=temp+ '<td>'+data.Results[i][1]+'</td>';
            temp=temp+ '<td>'+data.Results[i][2]+'</td>';
            var bieming=data.Results[i][3];
            //    var bieming="";
            //    console.log(lis);
            // for(var j=0;j<lis.length;j++)
            // {
            //     bieming+=lis[j]+',';

            // }
            if(bieming.length<60){
                temp=temp+ '<td title="'+bieming.substring(0,bieming.length-1)+'">'+bieming.substring(0,bieming.length-1)+'</td>';
            }else{

                temp=temp+ '<td title="'+bieming.substring(0,bieming.length-1)+'">'+bieming.substring(0,60)+'...'+'</td>';
            }

            temp=temp+ '<td>'+data.Results[i][5]+'</td>';

            temp=temp+'</tr>';
        }

        list=list+temp+ ' </tbody>';
        $("#example1").html($compile(list)($scope));
        $scope.$apply();
        $scope.table=$('#example1').dataTable( {
            "destroy":true,
            "ordering": false,
            "info":     false,
            "paging":   false
        } );
        $('#example1_wrapper .row .col-sm-6').remove();
        if(chance==0){
            var textCount = 0;
            $('#example1 tfoot th').each( function (a,b) {
                var title = $(this).text();
                if(!!$scope.filterText)
                    $(this).html( '<input type="text" placeholder="'+title+'过滤" id="'+title+'" value='+$scope.filterText[textCount] +'  >' );
                else
                    $(this).html( '<input type="text" id="'+title+'" value="" placeholder="'+title+'过滤" />' );
                textCount++;
            } );
        }
        $scope.filter($scope.table,tables);
        var pagenums=data.Total_Medication_Count/20;
        if(nums === "back" && parseInt($("#pagination .active").text())===1) nums = 1;
        $scope.page(pagenums,nums,tables);
        $scope.bindclick(tables);


    }
//lab
    $scope.displayLab = function(data,tables,nums){
        var orders=[];
        $('thead th').each(function (a,b) {
            // console.log(a);
            // console.log(b);
            // console.log($(this).hasClass('asc'));
            if($(this).hasClass('asc'))
                orders.push('asc');
            else
                orders.push('desc');
        });
        if($scope.isInit === 1){
            orders = ['asc','asc','asc','asc','asc'];
            $scope.isInit = 0;
        }
        // console.log(orders);
        var list=' <thead>'+
            '<tr>'+
            //   '<th class="ids">ID</th>'+
            '<th class="'+ orders[0] +' click" ng-click="changeasc(0,\''+tables+'\')" id="Name">名字</th>'+
            '<th class='+ orders[1] +' ng-click="changeasc(1,\''+tables+'\')" id="Ename">英文名</th>'+
            '<th class='+ orders[2] +' ng-click="changeasc(2,\''+tables+'\')" id="Oname">别名</th>'+
            '<th class='+ orders[3] +' ng-click="changeasc(3,\''+tables+'\')" id="Fclass">一级分类</th>'+
            '<th class='+ orders[4] +' ng-click="changeasc(4,\''+tables+'\')" id="Sclass">二级分类</th>'+
            '</tr>'+
            '</thead>'+
            ' <tfoot>'+
            '<tr>'+
            '<th>名字</th>'+
            '<th>英文名字</th>'+
            '<th>别名</th>'+
            '<th>一级分类</th>'+
            '<th>二级分类</th>'+
            '</tr>'+
            '</tfoot>'+
            ' <tbody>';
        var temp="";
        for(var i=0;i<data.Results.length;i++)
        {
            temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';

            //    temp=temp+ '<td>'+data.Results[i][0]+'</td>';
            temp=temp+ '<td>'+data.Results[i][1]+'</td>';
            temp=temp+ '<td>'+data.Results[i][2]+'</td>';
            temp=temp+ '<td>'+data.Results[i][3]+'</td>';
            temp=temp+ '<td>'+data.Results[i][4]+'</td>';
            temp=temp+ '<td>'+data.Results[i][5]+'</td>';
            temp=temp+'</tr>';
        }

        list=list+temp+ ' </tbody>';
        $("#example1").html($compile(list)($scope));
        $scope.$apply();
        $scope.table=$('#example1').dataTable( {
            "destroy":true,
            "ordering": false,
            "info":     false,
            "paging":   false
        } );
        $('#example1_wrapper .row .col-sm-6').remove();
        if(chance==0){
            var textCount = 0;
            $('#example1 tfoot th').each( function (a,b) {
                var title = $(this).text();
                if(!!$scope.filterText)
                    $(this).html( '<input type="text" placeholder="'+title+'过滤" id="'+title+'" value='+$scope.filterText[textCount] +'  >' );
                else
                    $(this).html( '<input type="text" id="'+title+'" value="" placeholder="'+title+'过滤" />' );
                textCount++;
            } );
        }
        $scope.filter($scope.table,tables);
        var pagenums=data.Total_Lab_Count/20;
        if(nums === "back" && parseInt($("#pagination .active").text())===1) nums = 1;
        $scope.page(pagenums,nums,tables);
        $scope.bindclick(tables);


    }
//medicvare
    $scope.displayMedicare = function(data,tables,nums){
        var orders=[];
        $('thead th').each(function (a,b) {
            // console.log(a);
            // console.log(b);
            // console.log($(this).hasClass('asc'));
            if($(this).hasClass('asc'))
                orders.push('asc');
            else
                orders.push('desc');
        });
        if($scope.isInit === 1){
            orders = ['asc','asc','asc','asc','asc'];
            $scope.isInit = 0;
        }
        // console.log(orders);
        var list=' <thead>'+
            '<tr>'+
            //   '<th class="ids">ID</th>'+
            '<th class="'+ orders[0] +' click" ng-click="changeasc(0,\''+tables+'\')" id="Name">名字</th>'+
            '<th class='+ orders[1] +' ng-click="changeasc(1,\''+tables+'\')" id="Ename">英文名字</th>'+
            '<th class='+ orders[2] +' ng-click="changeasc(2,\''+tables+'\')" id="Class">分类</th>'+
            '<th class='+ orders[3] +' ng-click="changeasc(3,\''+tables+'\')" id="Ybbxjx">医保报销剂型</th>'+
            '<th class='+ orders[4] +' ng-click="changeasc(4,\''+tables+'\')" id="Ybbxxzlb">报销限制类别</th>'+
            '</tr>'+
            '</thead>'+
            ' <tfoot>'+
            '<tr>'+
            '<th>名字</th>'+
            '<th>英文名</th>'+
            '<th>分类</th>'+
            '<th>医保报销剂型</th>'+
            '<th>报销限制类别</th>'+
            '</tr>'+
            '</tfoot>'+
            ' <tbody>';
        var temp="";
        for(var i=0;i<data.Results.length;i++)
        {
            temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';

            //  temp=temp+ '<td>'+data.Results[i][0]+'</td>';
            temp=temp+ '<td>'+data.Results[i][1]+'</td>';
            temp=temp+ '<td>'+data.Results[i][2]+'</td>';
            //  temp=temp+ '<td>'+data.Results[i][3]+'</td>';
            temp=temp+ '<td>'+data.Results[i][3]+'</td>';
            temp=temp+ '<td>'+data.Results[i][4]+'</td>';
            temp=temp+ '<td>'+data.Results[i][5]+'</td>';
            temp=temp+'</tr>';
        }

        list=list+temp+ ' </tbody>';
        $("#example1").html($compile(list)($scope));
        $scope.$apply();
        $scope.table=$('#example1').dataTable( {
            "destroy":true,
            "ordering": false,
            "info":     false,
            "paging":   false
        } );
        $('#example1_wrapper .row .col-sm-6').remove();
        if(chance==0){
            var textCount = 0;
            $('#example1 tfoot th').each( function (a,b) {
                var title = $(this).text();
                if(!!$scope.filterText)
                    $(this).html( '<input type="text" placeholder="'+title+'过滤" id="'+title+'" value='+$scope.filterText[textCount] +'  >' );
                else
                    $(this).html( '<input type="text" id="'+title+'" value="" placeholder="'+title+'过滤" />' );
                textCount++;
            } );
        }
        $scope.filter($scope.table,tables);
        var pagenums=data.Total_Medicare_Count/20;
        if(nums === "back" && parseInt($("#pagination .active").text())===1) nums = 1;
        $scope.page(pagenums,nums,tables);
        $scope.bindclick(tables);


    }

    $scope.displayClinicalpath = function(data,tables,nums){
        var orders=[];
        $('thead th').each(function (a,b) {
            // console.log(a);
            // console.log(b);
            // console.log($(this).hasClass('asc'));
            if($(this).hasClass('asc'))
                orders.push('asc');
            else
                orders.push('desc');
        });
        if($scope.isInit === 1){
            orders = ['asc','asc','asc','asc','asc'];
            $scope.isInit = 0;
        }
        // console.log(orders);
        var list=' <thead>'+
            '<tr>'+
            //   '<th class="ids">ID</th>'+
            '<th class="'+ orders[0] +' click" ng-click="changeasc(0,\''+tables+'\')" id="Name">名字</th>'+
            '<th class='+ orders[1] +' ng-click="changeasc(1,\''+tables+'\')" id="Class">分类</th>'+
            '<th class='+ orders[2] +' ng-click="changeasc(2,\''+tables+'\')" id="Year">版本号</th>'+
            '</tr>'+
            '</thead>'+
            ' <tfoot>'+
            '<tr>'+
            '<th>名字</th>'+
            '<th>分类</th>'+
            '<th>版本号</th>'+
            '</tr>'+
            '</tfoot>'+
            ' <tbody>';
        var temp="";
        for(var i=0;i<data.Results.length;i++)
        {
            temp=temp+ '<tr data-toggle="modal" class="dis_click" id='+data.Results[i][0]+' data-target="#myModal"> ';
            //  temp=temp+ '<td>'+data.Results[i][0]+'</td>';
            temp=temp+ '<td>'+data.Results[i][1]+'</td>';
            temp=temp+ '<td>'+data.Results[i][2]+'</td>';
            temp=temp+ '<td>'+data.Results[i][3]+'</td>';
            temp=temp+'</tr>';
        }
        list=list+temp+ ' </tbody>';
        $("#example1").html($compile(list)($scope));
        $scope.$apply();
        $scope.table=$('#example1').dataTable( {
            "destroy":true,
            "ordering": false,
            "info":     false,
            "paging":   false
        } );
        $('#example1_wrapper .row .col-sm-6').remove();
        if(chance==0){
            var textCount = 0;
            $('#example1 tfoot th').each( function (a,b) {
                var title = $(this).text();
                if(!!$scope.filterText)
                    $(this).html( '<input type="text" placeholder="'+title+'过滤" id="'+title+'" value='+$scope.filterText[textCount] +'  >' );
                else
                    $(this).html( '<input type="text" id="'+title+'" value="" placeholder="'+title+'过滤" />' );
                textCount++;
            } );
        }
        $scope.filter($scope.table,tables);
        var pagenums=data.Total_Clinicalpath_Count/20;
        if(nums === "back" && parseInt($("#pagination .active").text())===1) nums = 1;
        $scope.page(pagenums,nums,tables);
        $scope.bindclick(tables);



    }

    $scope.changeasc = function(num,tables){

        // console.log("changeasc");
        // console.log(num);
        // console.log(tables);
        //  console.log($(this).removeClass("asc"));
        var colum=$("#example1 thead tr th:eq("+num+")");
        var ths=$("#example1 thead tr th:eq("+num+")").attr("class");
        $(".desc").removeClass('desc').addClass('asc');
        // console.log(ths);
        // console.log(ths.indexOf("asc"));
        // console.log(ths.indexOf("desc"));
        if(ths.indexOf("asc")>=0){
            // console.log("sss");
            colum.removeClass("asc").addClass("desc").addClass("click");
            // console.log(colum);
        }else   if(ths.indexOf("desc")>=0){

            colum.removeClass("desc").addClass("asc").addClass("click");
        }

        var colums=$("#example1 thead tr th");
        for(var i=0;i<colums.length;i++)
        {
            if(i!=num){

                var temp= $("#example1 thead tr th:eq("+i+")");
                temp.removeClass("click");

            }
        }

        $scope.filter($scope.table,tables,0);


    }
//    ----------------------------------------------page.js------------------------


    $scope.page = function(pagenums,pagenow,tables){
        // console.log("it is page");
        // console.log(pagenow);
        var pagelist="";
        var forward="forward";
        var back="back";
        if(pagenow==1 || !pagenow){
            pagelist+='<li><a href="javascript:void(0)"  class="disabled" style="disabled:true;">&laquo;</a></li>';
        }else{
            pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+back+'\')">&laquo;</a></li>';
        }



        if(pagenow=="forward"){

            pagenow=parseInt($("#pagination .active").text());
            for(var i=pagenow;i<pagenow+10&&i<pagenums;i++)
            {
                if(i==(pagenow)){
                    pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                }

            }

        }else if(pagenow=="back"){
            // console.log("pagenow is back");
            pagenow=parseInt($("#pagination .active").text());
            // console.log(pagenow);
            var pa=0;
            if(pagenow>10){
                pa=pagenow-10;
            }
            for(var i=pa;i<pa+10&&i<pagenums;i++)
            {
                if(i==(pagenow-2)){
                    pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                }

            }



        }else{

            for(var i=pagenow-1;i<pagenow+9&&i<pagenums;i++)
            {
                if(i==(pagenow-1)){
                    pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                }

            }

        }


        if(pagenow<pagenums){
            pagelist+= '<li><a href="javascript:void(0)" ng-click="displayData(\''+tables+'\',\''+forward+'\')">&raquo;</a></li>';
        }
        //    pagelist+= '<li><a href="javascript:void(0)" ng-click="pageforward()">&raquo;</a></li>';
        $(".pagination").html($compile(pagelist)($scope));
        /* page end  */


    }

    $scope.page_search = function(pagenums,pagenow){
// console.log("it is page_search");
        /*  page code  */
        // console.log(pagenums);
        // var pagenums=30;
        var pagelist="";
        var forward="forward";
        var back="back";
        if(pagenow==1){
            pagelist+='<li><a href="javascript:void(0)" class="disabled" style="disabled:true;">&laquo;</a></li>';
        }else{
            pagelist+='<li><a href="javascript:void(0)" ng-click="searchs(\''+pagenums+'\',\''+back+'\')">&laquo;</a></li>';
        }



        if(pagenow=="forward"){

            pagenow=parseInt($("#pagination .active").text());
            for(var i=pagenow;i<pagenow+10&&i<pagenums;i++)
            {
                if(i==(pagenow)){
                    pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="searchs(\''+pagenums+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                }

            }

        }else if(pagenow=="back"){

            pagenow=parseInt($("#pagination .active").text());
            // console.log(pagenow);
            var pa=0;
            if(pagenow>10){
                pa=pagenow-10;
            }
            for(var i=pa;i<pa+10&&i<pagenums;i++)
            {
                if(i==(pagenow-2)){
                    pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="searchs(\''+pagenums+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                }

            }



        }else{

            for(var i=pagenow-1;i<pagenow+9&&i<pagenums;i++)
            {
                if(i==(pagenow-1)){
                    pagelist+='<li class="active"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
                }else{
                    pagelist+='<li><a href="javascript:void(0)" ng-click="searchs(\''+pagenums+'\','+(i+1)+')">'+(i+1)+'</a></li>';
                }

            }

        }


        if(pagenow<pagenums){
            pagelist+= '<li><a href="javascript:void(0)" ng-click="searchs(\''+pagenums+'\',\''+forward+'\')">&raquo;</a></li>';
        }
        //    pagelist+= '<li><a href="javascript:void(0)" ng-click="pageforward()">&raquo;</a></li>';
        $(".pagination").html($compile(pagelist)($scope));
        /* page end  */


    }
//    ------------------------------------myjs.js--------------------------
//     console.log("it is mkmyjs.js");
//     console.log($scope);
//search autocomplete and cache
//store.set("rID",0);
    if(store.has("rID")){
        // console.log("store has rID");
    }
    else store.set("rID",0);
    var searchMem=[],searchVal,recordID=store.get("rID");
    // console.log(recordID);
//store.clear();
    $('#search-wrapper').typeahead({
        highlight:true,
    },{
        name:'name',
        source:function(query,syncCallback,asyncCallback){
            // console.log("typeahead!");
            // console.log(query);
            // console.log(callback);
            var json={};
            json["Query_string"]=query;
            var jsonStr=JSON.stringify(json);
            var canshu={"q":jsonStr};
            // console.log(canshu);
            $.ajax({
                url:'http://1.85.37.136:9999/medknowledge/auto/',
                type:'GET',
                dataType:'json',
                data:canshu,
                error:function(){
                    // console.log("search query ajax error!");
                },
                success:function(res){
                    // console.log("item done!");
                    // console.log(res);
                    //$select1[0].selectize.clearOptions();
                    //console.log("search query ajax succeed!");
                    //var i=0;
                    // console.log(store.getAll());
                    //console.log(query);
                    // console.log(store.get((recordID+4)%5));
                    // console.log(store.get((recordID+4)%5).name);
                    var searchMem=[];
                    for(var k=4;k>=0;k--){
                        if(store.get((recordID+k)%5))
                            if(store.has((recordID+k)%5)&&store.get((recordID+k)%5).name.indexOf(query)>=0)
                                searchMem.push(store.get((recordID+k)%5));
                    };
                    // console.log(res);
                    if(typeof res.Results !== 'string')
                        res.Results.forEach(function(e){
                            //console.log(e);
                            searchMem.push({"id":e,"name":e});
                        });
                    // console.log(searchMem);
                    asyncCallback(searchMem);
                }
            })
        },
        display:'name',
        limit:8
    })



    $(document).keyup(function(event){
        if(event.keyCode ==13){
            //console.log("asfsd")

            $('#search-wrapper').typeahead({
                highlight:true,
            },{
                name:'name',
                source:function(query,syncCallback,asyncCallback){
                    // console.log("typeahead!");
                    // console.log(query);
                    //console.log(callback);
                    var json={};
                    json["Query_string"]=query;
                    var jsonStr=JSON.stringify(json);
                    var canshu={"q":jsonStr};
                    // console.log(canshu);
                    $.ajax({
                        url:'http://1.85.37.136:9999/medknowledge/auto/',
                        type:'GET',
                        dataType:'json',
                        data:canshu,
                        error:function(){
                            // console.log("search query ajax error!");
                        },
                        success:function(res){
                            // console.log("item done!");
                            // console.log(res);
                            //$select1[0].selectize.clearOptions();
                            //console.log("search query ajax succeed!");
                            //var i=0;
                            // console.log(store.getAll());
                            //console.log(query);
                            // console.log(store.get((recordID+4)%5));
                            // console.log(store.get((recordID+4)%5).name);
                            var searchMem=[];
                            for(var k=4;k>=0;k--){
                                if(store.get((recordID+k)%5))
                                    if(store.has((recordID+k)%5)&&store.get((recordID+k)%5).name.indexOf(query)>=0)
                                        searchMem.push(store.get((recordID+k)%5));
                            };
                            // console.log(res);
                            if(typeof res.Results !== 'string')
                                res.Results.forEach(function(e){
                                    //console.log(e);
                                    searchMem.push({"id":e,"name":e});
                                });
                            // console.log(searchMem);
                            asyncCallback(searchMem);
                        }
                    })
                },
                display:'name',
                limit:0
            })





            $("#searchSubmit").trigger("click");

        }
    });
    var key_disease={"Gs":"概述" ,"Lxbx":"流行病学" ,"By":"病因" ,"Fbjz":"发病机制" ,"Lcbx":"临床表现" ,"Bfz":"并发症" ,"Sysjc":"实验室检查" ,"Qtfzjc":"其他辅助检查" ,"Zd":"诊断" ,"Jbzd":"鉴别诊断","Zl":"治疗","Yh":"预后" ,"Yf":"预防" };
    var key_medication= {"Ylzy":"药理作用","Yfyl":"用法用量", "Ydx":"药动学", "Zysx":"注意事项", "Zjdp":"专家点评", "Ywxhzy":"药物相互作用", "Jjz":"禁忌症", "Syz":"适应症", "Ywjx":"药物剂型", "Blfy":"不良反应"};
    var key_lab= {"Gs":"概述","Yl":"原理", "Sj":"试剂", "Zcz":"正常值","Lcyy":"临床意义","Czff":"操作方法","Fz":"附注"};
    var key_sym= {"Zs":"综述", "Zzxs":"症状详述", "Zzqy":"症状起因","Cyjc":"常用检查" ,"Knjb":"可能疾病" ,"Dzyp":"对症药品" , "Xszz":"相似症状"};
    var key_medicare={"Yfyl":"用法用量" ,"Blfy":"不良反应" ,"Ylzy":"药理作用" ,"Ywxyzy":"药物相互作用" ,"Syz":"适应症" ,"Zysx":"注意事项" ,"Jjz":"禁忌症"};
    var key_clinicpath={"Content":"内容" };
    var mainwords_dis={"Ename":"英文名字","Oname":"别名","Icd10":"Icd10"};
    var mainwords_med={"Ename":"英文名称","Oname":"别名","Sclass":"类别"};
    var mainwords_sym={"Yjks":"一级科室","Ejks":"二级科室","Yjbw":"一级部位","Ejbw":"二级部位"};
    var mainwords_lab={"Ename":"英文名字","Oname":"别名","Fclass":"Fclass","Sclass":"Sclass"};
    var mainwords_medicare={"Fclass":"一级类别","Sclass":"二级类别","Ybbxxzlb":"医保报销限制类别","Ybbh":"医保编号","Ybbxjx":"医保报销剂型"};
    var mainwords_clinicpath={"Name":"名字","Class":"类别","Year":"版本号"};
    var dkey={};
    $scope.showdetails = function(ids){
        //     var url='http://1.85.37.136:9999/op/';
        var json={};
        var id=ids.split("/");
        // console.log(id);
        if(id[0]=="disease"){
            json["Table"] = "Disease";
            json["Did"]=id[1];
            dkey=key_disease;
        }else if(id[0]=="medication"){
            json["Table"] = "Medication";
            json["Mid"]=id[1];
            dkey=key_medication;
        }else if(id[0]=="laboratory"){
            json["Table"] = "Lab";
            json["Lid"]=id[1];
            dkey=key_lab;
        }else if(id[0]=="symptom"){
            json["Table"] = "Symptom";
            json["Sid"]=id[1];
            dkey=key_sym;
        }else if(id[0]=="medicare"){
            json["Table"] = "Medicare";
            json["Mid"]=id[1];
            dkey=key_medicare;
        }else if(id[0]=="clinicalpath"){
            json["Table"] = "Clinicalpath";
            json["Cid"]=id[1];
            dkey=key_clinicpath;
        }

        var jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        var temp=0;
        for(var t=0;t<urllist.length;t++){
            if(urllist[t]==ids)
            {

                temp=1;
                break;
            }

        }
        if(temp==0){
            urllist.push(ids);
            pointer++;
        }
        // console.log(urllist);
        $.getJSON(urlop, canshu, function(datas) {
            var details="";
            var flags=0;
            details=details+'<div class="modal-header">';
            details=details+'<button type="button" class="close"';
            details=details+' data-dismiss="modal" aria-hidden="true"> &times';
            details=details+'</button>';
            details=details+'<h2  style="color: #3c8dbc; text-align:center " class="modal-title" id="myModalLabel">';
            details=details+datas.Results["Name"];
            details=details+'</h2>';
            if(pointer<=1){
                details=details+'<div style="float:right" ><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
            }else{
                details=details+'<div style="float:right"><a href="javascript:void(0);" ng-click="showback()"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
            }

            if(pointer==urllist.length){
                details=details+'<a href="javascript:void(0);" ng-click="showforward()" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';
            }else{

                details=details+'<a href="javascript:void(0);" ng-click="showforward()"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';
            }

            details=details+'</div><div class="modal-body" du-scroll-container>';
            details=details+'<div class="col-md-3" role="complementary">';
            // details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" style="position:fixed;">';
            details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
            for(var j in dkey) {
                for(var i in datas.Results)
                {
                    if(i==j){
                        details=details+'<li>';
                        details=details+'<a href="#'+j+'" du-smooth-scroll du-scrollspy><i class="fa fa-fw fa-chevron-right iconss"></i>'+dkey[j]+'</a>';
                        details=details+'</li>';
                    }
                }
            }
            details=details+'</ul>';
            //   details=details+'</nav>';
            details=details+'</div>';
            details+='<div class="col-md-9">';
            var de="";


            if(json["Table"]=='Disease')
            {

                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>Icd10</th>'+

                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_dis){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_dis[m]+'</b></h3>';

                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Medication')
            {

                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>类别</th>'+

                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_med){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //   de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_med[m]+'</b></h3>';
                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Lab')
            {
                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>一级类别</th>'+
                    '<th>二级类别</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_lab){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //   de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_lab[m]+'</b></h3>';
                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }

                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Symptom')
            {

                var de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>一级科室</th>'+
                    '<th>二级科室</th>'+
                    '<th>一级部位</th>'+
                    '<th>二级部位</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_sym){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            var ts=datas.Results[n];
                            if(ts){
                                // de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_sym[m]+'</b></h3>';
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }

                de+='</tr>';
                de+='</tbody></table>';
            }else if(json["Table"]=='Medicare'){
                flags=1;
                var de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>一级类别</th>'+
                    '<th>二级类别</th>'+
                    '<th>医保报销限制类别</th>'+
                    '<th>医保编号</th>'+
                    '<th>医保报销剂型</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_medicare){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_dis[m]+'</b></h3>';

                            if(m=="Ybbxjx"||m=="Ybbxxzlb"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=(datas.Results[n]);
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';
                for(var j in dkey) {

                    for(var i in datas.Results)
                    {
                        var temp=0;
                        var title="";

                        if(i==j){
                            de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                            var rs=eval(datas.Results[i]);
                            de+=rs+'</br>';
                        }
                    }

                }


            }




            for(var j in dkey) {
                if(flags==1) break;
                for(var i in datas.Results)
                {
                    var temp=0;
                    var title="";

                    if(i==j){
                        de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                        var rs=eval(datas.Results[i]);

                        for(var m in rs )
                        {

                            if(rs[m][0]=='0'){
                                de=de+rs[m][1];
                            }else if(rs[m][0]=='1'){
                                de=de+"<a href='javascript:void(0);' ng-click=\"showdetails('"+rs[m][2]+"')\">"+rs[m][1]+"</a>";

                            }else if(rs[m][0]=='10'){
                                de=de+'</br>';
                            }else if(rs[m][0]=='2'){
                                de=de+'</br>';
                                //   console.log(rs[m][2]+rs[m][3]);

                                var imagelist=rs[m][1].split("/");
                                if(imagelist[1]!=null){
                                    var height=200,width=100;
                                    if(rs[m][2]!=0){
                                        height=rs[m][2];
                                    }
                                    if(rs[m][3]!=0){
                                        width=rs[m][3];
                                    }
                                    var imageurl='http://1.85.37.136:9999/medknowledge/imageop/?q={"Iid":"'+imagelist[1]+'"}';
                                    //var imageurl='http://1.85.37.136:9999/imageop/?q={"Iid":"i10109"}';
                                    de=de+'<div><img alt="User Image" src='+ imageurl+'  style="width:'+width+', height:'+height+'"/></div>';
                                    de=de+'</br>';
                                }
                            }

                        }

                    }
                }

            }
            details=details+de;
            details=details+'</div>';

            details=details+'</div>';
            // console.log(details);
            $(".modal-content").html("");
            $(".modal-content").html($compile(details)($scope));
        });

    }

    $scope.showback = function(){
        //   var url='http://1.85.37.136:9999/op/';
        var json={};
        var ll="";
        // console.log(urllist);
        if(pointer<0)
        {
            return;
        }else{
            ll=urllist[pointer-2];
            pointer--;
        }
        var id=ll.split("/");
        if(id[0]=="disease"){
            json["Table"] = "Disease";
            json["Did"]=id[1];
            dkey=key_disease;
        }else if(id[0]=="medication"){
            json["Table"] = "Medication";
            json["Mid"]=id[1];
            dkey=key_medication;
        }else if(id[0]=="laboratory"){
            json["Table"] = "Lab";
            json["Lid"]=id[1];
            dkey=key_lab;
        }else if(id[0]=="symptom"){
            json["Table"] = "Symptom";
            json["Sid"]=id[1];
            dkey=key_sym;
        }else if(id[0]=="medicare"){
            json["Table"] = "Medicare";
            json["Mid"]=id[1];
            dkey=key_medicare;
        }else if(id[0]=="clinicalpath"){
            json["Table"] = "Clinicalpath";
            json["Cid"]=id[1];
            dkey=key_clinicpath;
        }
        var jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        // console.log(canshu);

        $.getJSON(urlop, canshu,  function(datas) {

            var details="";
            var flags=0;
            details=details+'<div class="modal-header">';
            details=details+'<button type="button" class="close"';
            details=details+' data-dismiss="modal" aria-hidden="true"> &times';
            details=details+'</button>';
            details=details+'<h2  style="color: #3c8dbc;text-align:center " class="modal-title" id="myModalLabel">';
            details=details+datas.Results["Name"];
            details=details+'</h2>';
            if(pointer<=1){
                details=details+'<div style="float:right"><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
            }else{
                details=details+'<div style="float:right"><a href="javascript:void(0);" ng-click="showback()"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
            }

            if(pointer==urllist.length){
                details=details+'<a href="javascript:void(0);" ng-click="showforward()" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';
            }else{

                details=details+'<a href="javascript:void(0);" ng-click="showforward()"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';
            }
            details=details+'</div><div class="modal-body">';
            details=details+'<div class="col-md-3" role="complementary">';
            //details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" style="position:fixed;">';
            details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
            for(var j in dkey) {
                for(var i in datas.Results)
                {
                    if(i==j){
                        details=details+'<li>';
                        details=details+'<a href="#'+j+'">'+dkey[j]+'</a>';
                        details=details+'</li>';
                    }
                }
            }
            details=details+'</ul>';
            //   details=details+'</nav>';
            details=details+'</div>';


            details+='<div class="col-md-9">';
            var de="";

            if(json["Table"]=='Disease')
            {

                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>Icd10</th>'+

                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_dis){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_dis[m]+'</b></h3>';

                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Medication')
            {

                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>类别</th>'+

                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_med){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //   de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_med[m]+'</b></h3>';
                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Lab')
            {
                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>一级类别</th>'+
                    '<th>二级类别</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_lab){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //   de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_lab[m]+'</b></h3>';
                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }

                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Symptom')
            {

                var de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>一级科室</th>'+
                    '<th>二级科室</th>'+
                    '<th>一级部位</th>'+
                    '<th>二级部位</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_sym){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            var ts=datas.Results[n];
                            if(ts){
                                // de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_sym[m]+'</b></h3>';
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }

                de+='</tr>';
                de+='</tbody></table>';
            }else if(json["Table"]=='Medicare'){
                flags=1;
                var de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>一级类别</th>'+
                    '<th>二级类别</th>'+
                    '<th>医保报销限制类别</th>'+
                    '<th>医保编号</th>'+
                    '<th>医保报销剂型</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_medicare){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_dis[m]+'</b></h3>';

                            if(m=="Ybbxjx"||m=="Ybbxxzlb"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=(datas.Results[n]);
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';
                for(var j in dkey) {

                    for(var i in datas.Results)
                    {
                        var temp=0;
                        var title="";

                        if(i==j){
                            de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                            var rs=eval(datas.Results[i]);
                            de+=rs+'</br>';
                        }
                    }

                }



            }



            for(var j in dkey) {
                // console.log(flags);
                if(flags==1) break;

                for(var i in datas.Results)
                {
                    var temp=0;
                    var title="";

                    if(i==j){
                        de=de+'<h3 style="color: #3c8dbc;"  id="'+i+'">'+dkey[i]+'</h3>';
                        var rs=eval(datas.Results[i]);

                        for(var m in rs )
                        {

                            if(rs[m][0]=='0'){
                                de=de+rs[m][1];
                            }else if(rs[m][0]=='1'){
                                de=de+"<a href='javascript:void(0);' ng-click=\"showdetails('"+rs[m][2]+"')\">"+rs[m][1]+"</a>";

                            }else if(rs[m][0]=='10'){
                                de=de+'</br>';
                            }else if(rs[m][0]=='2'){
                                de=de+'</br>';
                                // console.log(rs[m][2]+rs[m][3]);

                                var imagelist=rs[m][1].split("/");
                                if(imagelist[1]!=null){
                                    var height=200,width=100;
                                    if(rs[m][2]!=0){
                                        height=rs[m][2];
                                    }
                                    if(rs[m][3]!=0){
                                        width=rs[m][3];
                                    }
                                    var imageurl='http://1.85.37.136:9999/medknowledge/imageop/?q={"Iid":"'+imagelist[1]+'"}';
                                    //var imageurl='http://1.85.37.136:9999/imageop/?q={"Iid":"i10109"}';
                                    de=de+'<div><img alt="User Image" src='+ imageurl+'  style="width:'+width+', height:'+height+'"/></div>';
                                    de=de+'</br>';
                                }
                            }

                        }

                    }
                }

            }
            details=details+de;
            details=details+'</div>';

            details=details+'</div>';

            $(".modal-content").html("");
            $(".modal-content").html($compile(details)($scope));






        });




    }

    $scope.showforward = function(){
        //   var url='http://1.85.37.136:9999/op/';
        var json={};
        var ll="";
        // console.log("for"+pointer+":"+urllist);
        if(pointer>=urllist.length)
        {
            return;
        }else{
            ll=urllist[pointer];
            pointer++;
        }

        var id=ll.split("/");
        if(id[0]=="disease"){
            json["Table"] = "Disease";
            json["Did"]=id[1];
            dkey=key_disease;
        }else if(id[0]=="medication"){
            json["Table"] = "Medication";
            json["Mid"]=id[1];
            dkey=key_medication;
        }else if(id[0]=="laboratory"){
            json["Table"] = "Lab";
            json["Lid"]=id[1];
            dkey=key_lab;
        }else if(id[0]=="symptom"){
            json["Table"] = "Symptom";
            json["Sid"]=id[1];
            dkey=key_sym;
        }else if(id[0]=="medicare"){
            json["Table"] = "Medicare";
            json["Mid"]=id[1];
            dkey=key_medicare;
        }else if(id[0]=="clinicalpath"){
            json["Table"] = "Clinicalpath";
            json["Cid"]=id[1];
            dkey=key_clinicpath;
        }
        json["Did"]=id[1];
        var jsonStr = JSON.stringify(json);
        var canshu={"q":jsonStr};
        // console.log(canshu);
        $.getJSON(urlop,canshu, function(datas) {
            var flags=0;
            var details="";
            details=details+'<div class="modal-header">';
            details=details+'<button type="button" class="close"';
            details=details+' data-dismiss="modal" aria-hidden="true"> &times';
            details=details+'</button>';
            details=details+'<h2  style="color: #3c8dbc;text-align:center" class="modal-title" id="myModalLabel">';
            details=details+datas.Results["Name"];
            details=details+'</h2>';
            if(pointer<=1){
                details=details+'<div style="float:right"><a href="javascript:void(0);" ng-click="showback()" style="display:none"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
            }else{
                details=details+'<div style="float:right"><a href="javascript:void(0);" ng-click="showback()"><i class="fa fa-fw fa-arrow-left"></i>后退</a>';
            }

            if(pointer==urllist.length){
                details=details+'<a href="javascript:void(0);" ng-click="showforward()" style="display:none"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';
            }else{

                details=details+'<a href="javascript:void(0);" ng-click="showforward()"><i class="fa fa-fw fa-arrow-right"></i>前进</a> </div>';
            }
            details=details+'</div><div class="modal-body">';
            details=details+'<div class="col-md-3" role="complementary">';
            //   details=details+'<nav class="bs-docs-sidenav hidden-print hidden-xs hidden-sm affix-top" style="position:fixed;">';
            details=details+'<ul class="nav  nav-list bs-docs-sidenav affix" id="gundongtiao">';
            for(var j in dkey) {
                for(var i in datas.Results)
                {
                    if(i==j){
                        details=details+'<li>';
                        details=details+'<a href="#'+j+'">'+dkey[j]+'</a>';
                        details=details+'</li>';
                    }
                }
            }
            details=details+'</ul>';
            //   details=details+'</nav>';
            details=details+'</div>';




            details+='<div class="col-md-9">';
            var de="";

            if(json["Table"]=='Disease')
            {

                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>Icd10</th>'+

                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_dis){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_dis[m]+'</b></h3>';

                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Medication')
            {

                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>类别</th>'+

                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_med){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //   de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_med[m]+'</b></h3>';
                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Lab')
            {
                de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>英文名称</th>'+
                    '<th>别名</th>'+
                    '<th>一级类别</th>'+
                    '<th>二级类别</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_lab){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //   de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_lab[m]+'</b></h3>';
                            if(m!="Oname"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }

                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Symptom')
            {

                var de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>一级科室</th>'+
                    '<th>二级科室</th>'+
                    '<th>一级部位</th>'+
                    '<th>二级部位</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_sym){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            var ts=datas.Results[n];
                            if(ts){
                                // de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_sym[m]+'</b></h3>';
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }
                        }

                    }

                }

                de+='</tr>';
                de+='</tbody></table>';

            }else if(json["Table"]=='Medicare'){
                flags=1;
                var de='<table class="table table-bordered table-striped"><thead>'+
                    '<tr>'+
                    '<th>一级类别</th>'+
                    '<th>二级类别</th>'+
                    '<th>医保报销限制类别</th>'+
                    '<th>医保编号</th>'+
                    '<th>医保报销剂型</th>'+
                    '</tr>'+
                    '</thead>'+
                    ' <tbody>'+
                    '<tr>';
                for(var m in mainwords_medicare){
                    for(var n in datas.Results)
                    {
                        if(m==n)
                        {
                            //de+='<h3 style="color: #3c8dbc;"><b>'+mainwords_dis[m]+'</b></h3>';

                            if(m=="Ybbxjx"||m=="Ybbxxzlb"){
                                de+='<td>';
                                de+=datas.Results[n];
                                de+='</td>';
                            }else{
                                de+='<td>';
                                de+=(datas.Results[n]);
                                de+='</td>';
                            }
                        }

                    }

                }
                de+='</tr>';
                de+='</tbody></table>';
                for(var j in dkey) {

                    for(var i in datas.Results)
                    {
                        var temp=0;
                        var title="";

                        if(i==j){
                            de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                            var rs=eval(datas.Results[i]);
                            de+=rs+'</br>';
                        }
                    }

                }


            }




            for(var j in dkey) {
                if(flags==1) break;
                for(var i in datas.Results)
                {
                    var temp=0;
                    var title="";

                    if(i==j){
                        de=de+'<h3 style="color: #3c8dbc;" id="'+i+'">'+dkey[i]+'</h3>';
                        var rs=eval(datas.Results[i]);

                        for(var m in rs )
                        {

                            if(rs[m][0]=='0'){
                                de=de+rs[m][1];
                            }else if(rs[m][0]=='1'){
                                de=de+"<a href='javascript:void(0);' ng-click=\"showdetails('"+rs[m][2]+"')\">"+rs[m][1]+"</a>";

                            }else if(rs[m][0]=='10'){
                                de=de+'</br>';
                            }else if(rs[m][0]=='2'){
                                de=de+'</br>';
                                // console.log(rs[m][2]+rs[m][3]);

                                var imagelist=rs[m][1].split("/");
                                if(imagelist[1]!=null){
                                    var height=200,width=100;
                                    if(rs[m][2]!=0){
                                        height=rs[m][2];
                                    }
                                    if(rs[m][3]!=0){
                                        width=rs[m][3];
                                    }
                                    var imageurl='http://1.85.37.136:9999/medknowledge/imageop/?q={"Iid":"'+imagelist[1]+'"}';
                                    //var imageurl='http://1.85.37.136:9999/imageop/?q={"Iid":"i10109"}';
                                    de=de+'<div><img alt="User Image" src='+ imageurl+'  style="width:'+width+', height:'+height+'"/></div>';
                                    de=de+'</br>';
                                }
                            }

                        }

                    }
                }

            }
            details=details+de;
            details=details+'</div>';

            details=details+'</div>';

            $(".modal-content").html("");
            $(".modal-content").html($compile(details)($scope));

        });


    }

    var itemNum=20;
    var pagenow=1;
    var pagenums;
    // $('#searchSubmit').on('click',searchs);
    $scope.searchs = function(pagenums,pagenow){
        // console.log(pagenums);
        // console.log(pagenow);
        // console.log('it is searchs !');
        urllist=[];
        pointer=0;
        if(pagenow == undefined){
            pagenow=1;
        }
        $(".treeview-menu li").removeAttr("class",".active");
        // console.log(store.getAll());
        var searchItem=$('#search-wrapper').typeahead('val');
        // console.log(searchItem);
        if(searchItem=="") return;
        var flag=1;
        for(var k=0;k<5;k++){
            if(store.get(k))
                if(store.get(k).name!=undefined&&store.get(k).name===searchItem)
                    flag=0;
        }
        if(flag) {//record item in history
            //console.log(store.has(searchItem));
            store.set(recordID,{"id":searchItem,"name":searchItem,"searched":1});
            recordID++;
            recordID%=5;
            store.set("rID",recordID);
        };
        //var searchItem='糖尿病';
        // console.log(pagenums);
        // console.log(pagenow);
        var elasticData=getElasticData(searchItem,pagenums,pagenow);
        // console.log(elasticData);
        elasticData.success(function(res){
            // console.log(res);
            // console.log(pagenow);
            // console.log(res.Results);
            pagenums = Math.ceil(res.Count/10);
            showElasicData(res.Results,pagenums,pagenow,searchItem);
        });
    };

    var getElasticData=function(query,pagenums,pagenow){
        // console.log(query);
        // console.log(pagenow);
        if(pagenow=="back"){
            if(pagenow==1) return;
            pagenow=parseInt($("#pagination .active").text())-1;
            // console.log(pagenow);

        }else if(pagenow=="forward"){

            pagenow=parseInt($("#pagination .active").text());
        }
        var itemStart=(pagenow-1)*10,itemEnd=pagenow*10;
        var json={};
        json.Query_string=query;
        json.Start=itemStart;
        json.End=itemEnd;
        var param={'q':JSON.stringify(json)};
        // console.log(param);
        var result=$.ajax({
            method:'GET',
            url:'http://1.85.37.136:9999/medknowledge/search/',
            data:{'q':JSON.stringify(json)}
        }).error(function(e){
            // console.log("get elastic search data error!");
            //console.log(e);
        }).success(function(res){
            // console.log("get elastic search data success!");
            //	console.log(res);
        })
        return result;
    };
    var showElasicData=function(data,pagenums,pagenow,searchItem){
        // console.log("mkmyjs.js showElasticData");
        // console.log(data);
        // console.log(pagenums);
        // console.log(pagenow);
        //	console.log(data);
        //	console.log(data[0].Lid);
        backgroundColor={
            // "Lab":"#7bbfea",
            // "Disease":"#BCD4E3",
            // "Symptom":"#F0F8FF",
            // "Medication":"#DDF0ED"
            "Lab":"#509AAB",
            "Disease":"#E4EAFF",
            "Symptom":"#E2F9FF",
            "Medication":"#E1FFE9"
        };
        var i=0;
        //		console.log(backgroundColor.Lab);
        //		console.log(data[i].Table)
        //		console.log(backgroundColor[data[i].Table]);
        // console.log(data);
        // console.log()
        var elasticDetails='',contentLength=$("#example1_wrapper").width()/12,nameLength=6;
        urllist=[];
        for(var i=0;i<data.length;i++){
            var contentDisplayId="contentDisplay"+i;
            var nameDisplayId="nameDisplay"+i;
            var ids="";
            if(data[i].Table==='Disease')
            {
                ids+='disease/'+data[i].Did;
            }else if(data[i].Table==='Symptom'){

                ids+='symptom/'+data[i].Sid;
            }else if(data[i].Table==='Medication'){
                ids+='medication/'+data[i].Mid;

            }else if(data[i].Table==='Lab'){
                ids+='laboratory/'+data[i].Lid;
            }else if(data[i].Table==='Medicare'){
                ids+='medicare/'+data[i].Mid;
            }else if(data[i].Table==='Clinicalpath'){
                ids+='clinicalpath/'+data[i].Cid;
            }
            // console.log(ids);
            //	console.log(contentDisplayId);
            //  var ids=
            elasticDetails+="<div id=\"content-round\" type=\"button\" ng-click=\"showdetails('"+ids+"')\" " +
                'class="btn  btn-lg content-block-my" data-toggle="modal" data-target="#myModal" style="background-color:#88c9f2;width: 100%"><li class="news-item"><div class="news-info">'
                +'<table title="'+data[i].Name+'"><tr style="background-color:#88c9f2" ><td width="30px"><div class="fl "><img class="type-logo" src="assets/img/medicalKnowledge/'
                +data[i].Table+'.png"></div></td><td width="150px"><div class="fl"><div  class="news-date" ><p class="data-first" id='+ nameDisplayId+' >'
                +data[i].Name.substring(0,5)+'...'+'</p></div></div></td><td width="">' +'<div id='+contentDisplayId+' >';
            if(data[i].Table==='Lab'){
                for(var j in data[i]){

                    if(j!=="Lid"&&j!="Table"&&j!="Name"){
                        elasticDetails+='<p class="info-content" displayLength="'
                            +contentLength+'">'
                            +data[i][j].replace(/^\s+|\s+$/g,"").substring(0,60)+'</p>';
                        elasticDetails+="</br>";
                    }
                }
            }else
            if(data[i].Table==='Disease'){

                for(var j in data[i]){

                    if(j!=="Did"&&j!="Table"&&j!="Name"){
                        elasticDetails+='<p class="info-content" displayLength="'
                            +contentLength+'">'
                            +data[i][j].replace(/^\s+|\s+$/g,"").substring(0,60)+'</p>';
                        elasticDetails+="</br>";
                    }
                }
                //console.log(data[i].Lcbx);
            }else
            if(data[i].Table==='Symptom'){
                for(var j in data[i]){

                    if(j!=="Sid"&&j!="Table"&&j!="Name"){
                        elasticDetails+='<p class="info-content" displayLength="'
                            +contentLength+'">'
                            +data[i][j].replace(/^\s+|\s+$/g,"").substring(0,60)+'</p>';
                        elasticDetails+="</br>";
                    }
                }
                //console.log('addSymptom');
            }else
            if(data[i].Table==='Medication'){
                for(var j in data[i]){

                    if(j!=="Mid"&&j!="Table"&&j!="Name"){
                        elasticDetails+='<p class="info-content" displayLength="'
                            +contentLength+'">'
                            +data[i][j].replace(/^\s+|\s+$/g,"").substring(0,60)+'</p>';
                        elasticDetails+="</br>";
                    }
                }
            }else
            if(data[i].Table==='Medicare'){
                for(var j in data[i]){

                    if(j!=="Mid"&&j!="Table"&&j!="Name"){
                        elasticDetails+='<p class="info-content" displayLength="'
                            +contentLength+'">'
                            +data[i][j].replace(/^\s+|\s+$/g,"").substring(0,60)+'</p>';
                        elasticDetails+="</br>";
                    }
                }
            }else
            if(data[i].Table==='Clinicalpath'){
                for(var j in data[i]){

                    if(j!=="Cid"&&j!="Table"&&j!="Name"){
                        elasticDetails+='<p class="info-content" displayLength="'
                            +contentLength+'">'
                            +data[i][j].replace(/^\s+|\s+$/g,"").substring(0,60)+'</p>';
                        elasticDetails+="</br>";
                    }
                }
            }
            elasticDetails+='</div></td></tr></table></div></li></div>';

        }
        // $('#example1').html("");
        $('#example1').html($compile(elasticDetails)($scope));
        //分页技术
        // console.log(pagenums);
        $scope.page_search(pagenums,pagenow);



        $.fn.extend({
            displayPart:function () {
                var displayLength = 100;
                displayLength = this.attr("displayLength") || displayLength;
                var text = this.text();
                //console.log(text);
                if (!text) return "";

                var result = "";
                var count = 0;
                for (var i = 0; i < displayLength; i++) {
                    var _char = text.charAt(i);
                    if (count >= displayLength)  break;
                    if (/[^x00-xff]/.test(_char))  count++;  //双字节字符，//[u4e00-u9fa5]中文

                    result += _char;
                    count++;
                }
                if (result.length < text.length) {
                    result += "...";
                }
                this.text(result);
            }
        });

        $(function () {

            for(var j=0;j<=itemNum;j++){
                //console.log($('#name-content'));
                $('#nameDisplay'+j).displayPart();
                var dis=$("#contentDisplay"+j).children().first();
                var i=1
                while(dis.length!==0&&i<=2){
                    // console.log(dis);
                    // console.log(dis.siblings("p"));
                    dis.displayPart();
                    dis.siblings("p").displayPart();
                    dis=dis.next("p");
                    i++;
                }
            }


        });
    };
    $rootScope.pageLoading = false;

}