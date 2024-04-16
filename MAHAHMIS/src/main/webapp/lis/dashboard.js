/************
* @author	: Vinod Udawant
* @date		: 5-June-2020
* @codeFor	: Get dynamic data for graph
 ************/
/*function getGraphData(callFrom){
	
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	if(callFrom == "onload" || callFrom == "today"){
		
		$("#lastSevenDay").removeClass("active");
		var today = new Date();
		
		today = getFormatedDate(today);		
		
		fromDate = today;
		toDate = today;

	}else if(callFrom == "7days"){
		
		$("#lastSevenDay").addClass("active");
		var days = 7; // Days you want to subtract
		var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		
		fromDate = getFormatedDate(last);
		toDate = getFormatedDate(new Date());
		
	}else if(callFrom == "month"){
		
		$("#lastSevenDay").removeClass("active");
		var date = new Date();
		var firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
		var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
		
		fromDate = getFormatedDate(firstDay);		
		toDate = getFormatedDate(lastDay);	
		
	}else if(callFrom == "range"){
		
		$("#lastSevenDay").removeClass("active");
		var firstDay = new Date(fromDate);
		var lastDay = new Date(toDate);		
		
		fromDate = getFormatedDate(firstDay);		
		toDate = getFormatedDate(lastDay);
	}
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var customerType = parseInt($("#customerType").val());
	var customerId = parseInt($("#customerUnit").val());
	
	var inputs = [];	
	inputs.push("callFrom=" + callFrom);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("unitId=" + unitId);
	inputs.push("userId=" + userId);
	inputs.push("customerType=" + customerType);
	inputs.push("customerId=" + customerId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/labchargesconfig/getGraphData",
		error 	: function() {
			alertify.error('Network Issue!!!');
		},
		success : function(r) {
			
			$("#b2bCount").text(r.lstGraphDto[0].bToBCount);
			$("#b2cCount").text(r.lstGraphDto[0].bToCCount);
			$("#patient_reg").text(r.lstGraphDto[0].patientRegistered);
			$("#services_reg").text(r.lstGraphDto[0].servicesRegistered);
			$("#visits").text(r.lstGraphDto[0].homeVisits);
			$("#approval_pending").text(r.lstGraphDto[0].approvalPending);
			
			$("#gross_amount").text(parseFloat(r.lstGraphDto[0].grossAmount).toFixed(2));
			$("#discount_amount").text(parseFloat(r.lstGraphDto[0].discountAmount).toFixed(2));
			$("#net_amount").text(parseFloat(r.lstGraphDto[0].netAmount).toFixed(2));
			$("#received_amount").text(parseFloat(r.lstGraphDto[0].netAmount).toFixed(2));
			
			loadPieChart(r);
			loadXChart1(r);
			loadXChart2(r);
		}
	});
}*/

function getGraphData(callFrom){
	
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	if(callFrom == "onload" || callFrom == "today"){
		
		$("#lastSevenDay").removeClass("active");
		var today = new Date();
		
		today = getFormatedDate(today);		
		
		fromDate = today;
		toDate = today;

	}else if(callFrom == "7days"){
		
		$("#lastSevenDay").addClass("active");
		var days = 7; // Days you want to subtract
		var date = new Date();
		var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
		
		fromDate = getFormatedDate(last);
		toDate = getFormatedDate(new Date());
		
	}else if(callFrom == "month"){
		
		$("#lastSevenDay").removeClass("active");
		var date = new Date();
		var firstDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
		var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
		
		fromDate = getFormatedDate(firstDay);		
		toDate = getFormatedDate(lastDay);	
		
	}else if(callFrom == "range"){
		
		$("#lastSevenDay").removeClass("active");
		var firstDay = new Date(fromDate);
		var lastDay = new Date(toDate);		
		
		fromDate = getFormatedDate(firstDay);		
		toDate = getFormatedDate(lastDay);
	}
	
	var inputs = [];	
	inputs.push("callFrom=" + callFrom);	
	inputs.push("fromDate=" + fromDate);	
	inputs.push("toDate=" + toDate);
	inputs.push("unitId=" + unitId);
	inputs.push("userId=" + userId);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/finance/getGraphData",
		error 	: function() {
			alertify.error('Network Issue!!!');
		},
		success : function(r) {
					
			//$("#opdCount").text(Number(r.lstCount[0].opdCount) + Number(r.lstCount[0].diagCount));
			$("#opdCount").text(Number(r.lstCount[0].opdCount));
			$("#diagCount").text(r.lstCount[0].diagCount);
			$("#ipdCount").text(r.lstCount[0].ipdCount);
			$("#patient_reg").text(Number(r.lstCount[0].opdCount) + Number(r.lstCount[0].ipdCount) + Number(r.lstCount[0].diagCount));
			
			//$("#opdServCount").text(Number(r.lstCount[0].opdServCount) + Number(r.lstCount[0].diagServCount));
			$("#opdServCount").text(Number(r.lstCount[0].opdServCount));
			$("#diagServCount").text(r.lstCount[0].diagServCount);
			$("#ipdServCount").text(r.lstCount[0].ipdServCount);
			$("#services_reg").text(Number(r.lstCount[0].opdServCount) + Number(r.lstCount[0].ipdServCount) + Number(r.lstCount[0].diagServCount));
			
			$("#availBedCount").text(r.lstCount[0].availBedCount);
			$("#cleanBedCount").text(r.lstCount[0].cleanBedCount);
			$("#totalBed").text(r.lstCount[0].availBedCount);
			
			var totOp=r.lstCount[0].oprCount;
		//	$("#totOp").text(r.lstCount[0].oprCount);
			$("#totOp").text(Math.abs(totOp));  
			
			//var grossOpd= parseFloat(Number(r.lstCount[0].grossOpd) + Number(r.lstCount[0].grossDiag)).toFixed(2);
			var grossOpd= parseFloat(Number(r.lstCount[0].grossOpd)).toFixed(2);
			var grossdiag= parseFloat(Number(r.lstCount[0].grossOpd)).toFixed(2);
		//	$("#grossOpd").text(parseFloat(Number(r.lstCount[0].grossOpd) + Number(r.lstCount[0].grossDiag)).toFixed(2));
			$("#grossOpd").text(Math.abs(grossOpd)); 
			$("#grossdiag").text(Math.abs(grossdiag)); 
			
			var grossIpd=parseFloat(r.lstCount[0].grossIpd).toFixed(2);
			//$("#grossIpd").text(parseFloat(r.lstCount[0].grossIpd).toFixed(2));
			$("#grossIpd").text(Math.abs(grossIpd));
			
			var grossAmount=parseFloat(Number(r.lstCount[0].grossOpd) + Number(r.lstCount[0].grossIpd + Number(r.lstCount[0].grossDiag))).toFixed(2);
		//	$("#gross_amount").text(parseFloat(Number(r.lstCount[0].grossOpd) + Number(r.lstCount[0].grossIpd + Number(r.lstCount[0].grossDiag))).toFixed(2));
			$("#gross_amount").text(Math.abs(grossAmount)); 
			
			//var discOpd=parseFloat(Number(r.lstCount[0].discOpd) + Number(r.lstCount[0].discDiag)).toFixed(2);
			var discOpd=parseFloat(Number(r.lstCount[0].discOpd) ).toFixed(2);
			var discDiag=parseFloat(Number(r.lstCount[0].discDiag)).toFixed(2);
		//	$("#discOpd").text(parseFloat(Number(r.lstCount[0].discOpd) + Number(r.lstCount[0].discDiag)).toFixed(2));
			$("#discOpd").text(Math.abs(discOpd)); 
			$("#discDiag").text(Math.abs(discDiag)); 
			
			var discIpd=parseFloat(r.lstCount[0].discIpd).toFixed(2);
		//	$("#discIpd").text(parseFloat(r.lstCount[0].discIpd).toFixed(2));
			$("#discIpd").text(Math.abs(discIpd)); 
			
			var discountAmount=parseFloat(Number(r.lstCount[0].discOpd) + Number(r.lstCount[0].discIpd + Number(r.lstCount[0].discDiag))).toFixed(2);
		//	$("#discount_amount").text(parseFloat(Number(r.lstCount[0].discOpd) + Number(r.lstCount[0].discIpd + Number(r.lstCount[0].discDiag))).toFixed(2));
			$("#discount_amount").text(Math.abs(discountAmount)); 
			
		//	var netOpd=parseFloat(Number(r.lstCount[0].netOpd) + Number(r.lstCount[0].netDiag)).toFixed(2);
			var netOpd=parseFloat(Number(r.lstCount[0].netOpd)).toFixed(2);
			var netDiag=parseFloat(Number(r.lstCount[0].netDiag)).toFixed(2);
		//	$("#netOpd").text(parseFloat(Number(r.lstCount[0].netOpd) + Number(r.lstCount[0].netDiag)).toFixed(2));
			$("#netOpd").text(Math.abs(netOpd));
			$("#netDiag").text(Math.abs(netDiag));
					
			var netIpd = parseFloat(r.lstCount[0].netIpd).toFixed(2);
		//	$("#netIpd").text(parseFloat(r.lstCount[0].netIpd).toFixed(2));
			$("#netIpd").text(Math.abs(netIpd));
				
	  	    var netAmt=	parseFloat(Number(r.lstCount[0].netOpd) + Number(r.lstCount[0].netIpd) + Number(r.lstCount[0].netDiag)).toFixed(2);
	  	//	$("#net_amount").text(parseFloat(Number(r.lstCount[0].netOpd) + Number(r.lstCount[0].netIpd) + Number(r.lstCount[0].netDiag)).toFixed(2));
	  		$("#net_amount").text(Math.abs(netAmt));
		
			//var recOpd=parseFloat(Number(r.lstCount[0].recOpd) + Number(r.lstCount[0].recDiag)).toFixed(2);
			var recOpd=parseFloat(Number(r.lstCount[0].recOpd)).toFixed(2);
			var recDiag=parseFloat(Number(r.lstCount[0].recDiag)).toFixed(2);
		//	$("#recOpd").text(parseFloat(Number(r.lstCount[0].recOpd) + Number(r.lstCount[0].recDiag)).toFixed(2));
			$("#recOpd").text(Math.abs(recOpd));
			$("#recDiag").text(Math.abs(recDiag));
			
			var recIpd=parseFloat(r.lstCount[0].recIpd).toFixed(2);
		//	$("#recIpd").text(parseFloat(r.lstCount[0].recIpd).toFixed(2));
			$("#recIpd").text(Math.abs(recIpd));
			
			var receivedAmount=parseFloat(Number(r.lstCount[0].recOpd) + Number(r.lstCount[0].recIpd) + Number(r.lstCount[0].recDiag)).toFixed(2);
		//	$("#received_amount").text(parseFloat(Number(r.lstCount[0].recOpd) + Number(r.lstCount[0].recIpd) + Number(r.lstCount[0].recDiag)).toFixed(2));
			$("#received_amount").text(Math.abs(receivedAmount)); 
			
			loadPieChart(r);
			loadXChart1(r);
			loadXChart2(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 5-June-2020
* @codeFor	: Create formated dates
 ************/
function getFormatedDate(inputDate){
	
	var dd = inputDate.getDate();
	var mm = inputDate.getMonth()+1; 
	var yyyy = inputDate.getFullYear();
	
	if(dd < 10){
	    dd='0'+dd;
	} 

	if(mm < 10){
	    mm='0'+mm;
	} 
	
	return yyyy+'-'+mm+'-'+dd;
}
/************
* @author	: Vinod Udawant
* @date		: 5-June-2020
* @codeFor	: Create dynamic pie charts
 ************/
function loadPieChart(r){
	
	depCountObj = [];
	depRevenueObj = [];
	/*if(r.lstGraphDto[0].lstDeptCountRevenue != null){*/
		
		var lstCount=new Array();;//r.lstGraphDto[0].lstDeptCountRevenue;	
		
		lstCount = [{
				deptName : 'OPD',
				deptCount : r.lstCount[0].opdServCount,
				deptAmount : r.lstCount[0].recOpd
			},
			{
				deptName : 'IPD',
				deptCount : r.lstCount[0].ipdServCount,
				deptAmount : r.lstCount[0].recIpd
			},
			{
				deptName : 'Diagnostics',
				deptCount : r.lstCount[0].diagServCount,
				deptAmount : r.lstCount[0].recDiag
			}];
		
		
		for(var i=0;i<lstCount.length;i++){
			
	        item = {}
	        item ["name"] = lstCount[i].deptName;
	        item ["y"] = lstCount[i].deptCount;
	        depCountObj.push(item);
	        
	        item2 = {}
	        item2 ["name"] = lstCount[i].deptName;
	        item2 ["y"] = lstCount[i].deptAmount;
	        depRevenueObj.push(item2);
		}
	/*}*/
	
	$('#pie1').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type:'pie'
		},
		
		title: {
			text: 'Department Service Count'
		},
		        
		/*subtitle: {
			text:false,
		},*/
		
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}</b> % <br>Count : {point.y}'
		},
		
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '{point.name} : {point.y}',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			}
		},
    		
		series: [{
			name: "Total",
			colorByPoint: true,
			data: depCountObj
		}],								        
	});
	
	$('#pie2').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type:'pie'
		},
		
		title: {
			text: 'Department Revenue'
		},
		        
		/*subtitle: {
			text:false,
		},*/
		
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}</b> % <br>Amount : {point.y}'
		},
		
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '{point.name} : {point.y}',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			}
		},
    		
		series: [{
			name: "Total",
			colorByPoint: true,
			data: depRevenueObj
		}],
								        
	});
}
/************
* @author	: Vinod Udawant
* @date		: 5-June-2020
* @codeFor	: Create X-chart1
 ************/
function loadXChart1(r){
		
	depCountObj = [];
	depRevenueObj = [];
	if(r.lstGraphDto.length > 0){
		
		//var lstCount = new Array();//r.lstGraphDto[0].lstDailycountRevenue;	
		
		/*lstCount = [
			{
				date : '2020-07-06',
				patientCount : 70				
			},
			{
				date : '2020-07-05',
				patientCount : 50				
			},
			{
				date : '2020-07-04',
				patientCount : 70			
			},
			{
				date : '2020-07-03',
				patientCount : 30			
			},
			{
				date : '2020-07-02',
				patientCount : 30			
			}
		];*/
		for(var i=0;i<r.lstGraphDto.length;i++){
			
	        item = {}
	        item ["x"] = r.lstGraphDto[i].dateForCount;
	        item ["y"] = r.lstGraphDto[i].patientCount;
	        depCountObj.push(item);	        
		}
	}
	
	var tt = document.createElement('div'),
	leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
	topOffset = -32;
	tt.className = 'ex-tooltip';
	document.body.appendChild(tt);

	var data = {
	  "xScale": "time",
	  "yScale": "linear",
	  "main": [
		{
		  "className": ".pizza",
		  "data": depCountObj
		}
	  ]
	};
	var opts = {
	  "dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
	  "tickFormatX": function (x) { return d3.time.format('%b %d')(x);},
	  "mouseover": function (d, i) {
		var pos = $(this).offset();
		$(tt).text(d3.time.format('%b %d')(d.x) + ': ( Count : ' + d.y + ' )')
		  .css({top: topOffset + pos.top, left: pos.left + leftOffset})
		  .show();
	  },
	  "mouseout": function (x) {
		$(tt).hide();
	  }
	};
	var myChart = new xChart('line-dotted', data, '#chart3', opts);
}
/************
* @author	: Vinod Udawant
* @date		: 5-June-2020
* @codeFor	: Create X-chart2
 ************/
function loadXChart2(r){
	
	depRevenueObj = [];
	/*if(r.lstGraphDto[0].lstDailycountRevenue != null){*/
		
		//var lstCount = new Array();//r.lstGraphDto[0].lstDailycountRevenue;	
		
		/*lstCount = [
			{
				date : '2020-07-06',
				amount : 3000				
			},
			{
				date : '2020-07-05',
				amount : 2000				
			},
			{
				date : '2020-07-04',
				amount : 4000		
			},
			{
				date : '2020-07-03',
				amount : 1000				
			},
			{
				date : '2020-07-02',
				amount : 2000				
			}
		];*/
	
		for(var i=0;i<r.lstGraphDto.length;i++){
			
	        item = {}
	        item ["x"] = r.lstGraphDto[i].dateForCount;
	        item ["y"] = r.lstGraphDto[i].recPatient;
	        depRevenueObj.push(item);       
		}
		
	/*}*/
	
	var tt = document.createElement('div'),
	leftOffset = -100;//(~~$('html').css('padding-right').replace('px', '') + ~~$('body').css('margin-right').replace('px', '')),
	topOffset = -32;
	tt.className = 'ex-tooltip';
	document.body.appendChild(tt);

	var data = {
	  "xScale": "time",
	  "yScale": "linear",
	  "main": [
		{
		  "className": ".pizza",
		  "data": depRevenueObj
		}
	  ]
	};
	var opts = {			
	  "dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
	  "tickFormatX": function (x) { return d3.time.format('%b %d')(x); },
	  "mouseover": function (d, i) {
	   var pos = $(this).offset();
		//alert(leftOffset);
	   $(tt).text(d3.time.format('%b %d')(d.x) + ': ( Amount : ' + d.y + ' )')
		  .css({top: topOffset + pos.top, left: pos.left + leftOffset})
		  .show();
	  },
	  "mouseout": function (x) {
		$(tt).hide();
	  }
	};
	var myChart = new xChart('line-dotted', data, '#chart7', opts);
}


/************
 * @author	: Vinod Udawant
 * @date	: 5-June-2020
 * @codeFor	: this function get the all unit after selecting perticular customer type
 ************/
function getAllCustomerUnitByType(){
	
	var customerType=$("#customerType").val();
	var customerId=$("#customerUnit").val();	
	var type=0;
	
	if(customerType==0||customerType==""){
		alert("Please Select First Customer Type");
		return false;
	}
	
    if(customerType==1){
    	type=1;//type 1 for inhouse lab
    }else if(customerType==2){
    	type=2;//type 2 for customer lab
    }    
    
	if(customerType==1 || customerType==2){
		
		var unitId = $("#unitId").val();			
		var inputs = [];		
		inputs.push('unitId=' + unitId);
		inputs.push('type=' + type);
		var str = inputs.join('&');		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/billingsummary/getalllabmaster",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				var divContent = "";
				divContent = divContent
						+ "<select name='Clinic Name' class='col-md-12'><option value='6'>--Select Unit--</option>";
				for ( var i = 0; i < r.businessMasterDto.length; i++) {
					divContent = divContent + "<option value='"
							+ r.businessMasterDto[i].id + "'>"
							+ r.businessMasterDto[i].name + "</option>";
				}
				divContent = divContent + "</select>";
				$("#customerUnit").html(divContent);
				$("#customerUnit").select2();
			}
		});
		
	}else if(customerType==3){
		
		var unitId = $("#unitId").val();
		var call ="Active";				
		var inputs = [];				
		inputs.push('unitId=' + unitId);		
		inputs.push('call=' + call);
		var str = inputs.join('&');				
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/billingsummary/getallhospitalmaster",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				var divContent = "";
				divContent = divContent
						+ "<select name='Hospital Name' class='col-md-12'><option value='6'>--Select Unit--</option>";
				for ( var i = 0; i < r.lsthospitalinfo.length; i++) {
					divContent = divContent + "<option value='"
							+ r.lsthospitalinfo[i].id + "'>"
							+ r.lsthospitalinfo[i].hospitalName + "</option>";
				}
				
				divContent = divContent + "</select>";
				$("#customerUnit").html(divContent);
				$("#customerUnit").select2();				
			}
		});
				
	}else if (customerType==4){
		
		var unitId = $("#unitId").val();
		var call ="Active";		
		var inputs = [];
		inputs.push('unitId=' + unitId);
		inputs.push('call=' + call);		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/billingsummary/getallclinicmaster",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				var divContent = "";
				divContent = divContent
						+ "<select name='Clinic Name' class='col-md-12'><option value='6'>--Select Unit--</option>";
				for ( var i = 0; i < r.lstclinicinfo.length; i++) {
					divContent = divContent + "<option value='"
							+ r.lstclinicinfo[i].id + "'>"
							+ r.lstclinicinfo[i].clinicName + "</option>";
				}
				divContent = divContent + "</select>";
				$("#customerUnit").html(divContent);
				$("#customerUnit").select2();
			}
		});
	}else if(customerType==5){
		
		var unitId = $("#unitId").val();		
		var inputs = [];
		inputs.push('unitId=' + unitId);		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/billingsummary/getallcollectionmaster",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				var divContent = "";
				divContent = divContent
						+ "<select name='Clinic Name' class='col-md-12'><option value='6'>--Select Unit--</option>";
				for ( var i = 0; i < r.lstcollectioninfoinfo.length; i++) {
					divContent = divContent + "<option value='"
							+ r.lstcollectioninfoinfo[i].id + "'>"
							+ r.lstcollectioninfoinfo[i].collectionName + "</option>";
				}
				divContent = divContent + "</select>";
				$("#customerUnit").html(divContent);
				$("#customerUnit").select2();
			}
		});
	}		
}

/************
* @author	: Vinod Udawant
* @date		: 5-June-2020
* @codeFor	: Get currency list
 ************/
function getAllCurrency() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/currencytype/fetchCurrList",
		success : function(r) {			
			
			$(".lblCurrency").text(r.listCurr[0].currencyName);
		}
	});
}