function getGoodsReceiptData(){
	jQuery.ajax({
		async : true,
		type : "GET",
		data :"&reqType=AJAX",
		url : "ehat/goodsReceipt/getMrn",
		timeout : 1000 * 60 * 5,
		catche : false,
//		error : function() {
//			alert("error");
//		},
		success : function(r) {
			
			setDataToMrnTable(r);
			 
		}
	});
}

function setDataToMrnTable(r){
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		
		htm = htm + '<tr> ' + ' <td class="col-md-1 center">' + index + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].mrnId + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].mrnDate + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].mrnDate + '</td>'
				+ ' <td class="col-md-1 center">' + r[i].mrnDate + '</td>'
				+ '<td class="col-md-1 center">' + r[i].mrnRemark + '</td>'
				+ '<td class="col-md-1 center">' + r[i].subInventoryName + '</td>'
				+ '<td class="col-md-1 center"><button  class="btn btn-xs btn-success"   onclick="printMRNDetails(' + r[i].mrnId + ')"><i class="fa fa-print"></i></button></td>'
				+ '<td class="col-md-1 center">' + r[i].mrnStatus + '</td>'
				+ '</tr>';
		index++;
	}
	
		$("#mrnDataForgReceipt").html(htm);
}

function getGoodsReceiptDataById(){
	
	var id=$("#mrnId").val();
	if(id=="" || id==undefined || id==null){
		alert("please enter mrn id");
		return false;
	}
	else{
	var inputs = [];
	inputs.push('mrnId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str +"&reqType=AJAX",
		url : "ehat/goodsReceipt/getMrnById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			if( r.length > 0){
				setDataToMrnTable(r);

			 }else{
			 alert("Record Not Found");
			 $("#mrnDataForgReceipt").html("");
			 }
		}
	});
	}
}
function printMRNDetails(id){
	window.open("inv_Good_Receipt_Print.jsp?&id="+ id);
}