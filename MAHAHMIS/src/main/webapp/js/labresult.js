function getReqNoByTid(tid){
	var res =  jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/labresult/getReqNoByTid",
		data : {
			tid	: tid
		},
		//timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert("Network issue: can't connect to server!");
		},
		success : function(r) {
			console.log(r);
			res =r;
		}
	});
	//return res.responseText;
	return res.responseJSON;
}


function getResult(reqNo){
	//alert("getResult");
//	var reqNo="20,21,22,23";
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/labresult/getResult",
		data : {
			reqNo	: reqNo
		},
		//timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert("Network issue: can't connect to server!");
		},
		success : function(r) {
			console.log(r);
			setTempforLabResult(r,reqNo);
		}
	});
}

function showreqPopUp(){
	$("#labReqPopHead").html('<div> <font size="3" color="red"><strong>Lab Request No</strong></font></lable>'
			+'<button class="btn btn-xs btn-danger" title="Close" style="float: right" '
			+' onclick="hidereqPopUp();"> '
			+' <i class="fa fa-times"></i> '
			+'</button>'
			
			+'<button class="btn btn-xs btn-warning" title="View Result" style="float: right; margin-right: 1%" '
			+' onclick="showResult();"> '
			+' <i class="fa fa-eye View"></i> '
			+'</button>'
			
			+'</div>'	
	);
	var tid = $("#treatmentId").text();
	var r = getReqNoByTid(tid);
	var htm='';
	for ( var i = 0; i < r.length; i++) {
		htm =  htm +' <input type="checkbox" name="labreqno" value="'+r[i]+'"><font size="3"> '+r[i]+'</font> ';
	
		
	}
	$("#labReqBody").html(htm);
	
	$("#labReqNoPop").show('show');
}

function hidereqPopUp(){
	$("#labReqNoPop").hide('hide');
	$('#labReqBody').css('overflow-y','');
	$('#labReqBody').css('height','');
}

function showResult(){
	var reqNo ='';
		$('input[name="labreqno"]:checked').each(function() {
			   reqNo=reqNo+this.value+',';
			});
	
	if(reqNo===""|| reqNo===undefined || reqNo===null){
		alert("Please check at least one check!");
		return false;
	}else{
		hidereqPopUp();
		reqNo = reqNo.slice(0,-1);
		getResult(reqNo);	
	}
}


function setTempforLabResult(r,labReq){
	$("#labReqPopHead").html(
			'<div> '
			+' <font size="3" color="red"> <strong>Lab Result</strong></font> '
			+'<button class="btn btn-xs btn-danger" title="Close" style="float: right" '
			+' onclick="hidereqPopUp();"> '
			+' <i class="fa fa-times"></i> '
			+'</button>'
			+'</div>'
	);
	$("#labReqBody").html('');
	$('#labReqBody').css('overflow-y','scroll');
	$('#labReqBody').css('height','500px');
	var len=labReq.split(',');
	for ( var i = 0; i < len.length; i++) {
		
		var ordNo = parseInt(len[i]);
		var first=0;
		for ( var j = 0; j < r.length; j++) {
			var odNo = r[j].orderID;
			if(ordNo==odNo){
				var fullName = r[j].fullName;
				var itemName =r[j].itemName;
				var normalHigh = r[j].normalHigh;
				var normalLow = r[j].normalLow;
				var normalRange = r[j].normalRange;
				var printUnit = r[j].printUnit;
				var result = r[j].result;
				var sampleStatus = r[j].sampleStatus;
				var serviceName = r[j].serviceName;
				var statusDescription = r[j].statusDescription;
				var visitCode = r[j].visitCode;
				var visitDate = r[j].visitDate;
				var visitType = r[j].visitType;
				
				if(first==0){
					$("#labReqBody").append('<h4 style="text-align: center"><font size="3"><strong>'+serviceName+'</strong></font></h4>');
					$("#labReqBody").append('<table id=table'+odNo+' class="table table-bordered">'
							+'<tbody id="tbody'+odNo+'">'
							+ '<thead>'
							+ '<tr>'
							+ '<th class="col-md-3 center "> Test'
							+ '</th>'
							
							+ '<th class="col-md-1 center ">Result'
							+ '</th>'
							
							+ '<th class="col-md-1 center "> Normal Vlaue'
							+ '</th>'
							
							+ '<th class="col-md-1 center "> Unit'
							+ '</th>'
							
							
							+ '</tr>'
							+ '</thead>'
							+'</tbody>'
							
					);
					first=1;
				}
				$("#tbody"+odNo).append(
						'<tr >'
						+ '<td class="col-md-3 center ">'+itemName+'</td>'
						+ '<td class="col-md-1 center ">'+result+'</td>'
						+ '<td class="col-md-1 center ">'+normalRange+'</td>'
						+ '<td class="col-md-1 center ">'+printUnit+'</td>'
						+'</tr>'
				);
				
				
			}
			
		}
	}
	$("#labReqNoPop").show('show');
}