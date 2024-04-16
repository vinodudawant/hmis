var count = 1;
var ajaxResponse;
var sample = "";
var divCount = 1;
var sr = 1;                      
var rowCountindi=1;
var individualtest=0;
var isNew =0;


function getLabWorksheetDash(type, page) {

	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var frmRecNo = $.trim($("#frmRecNo").val());
	var toRecNo = $.trim($("#toRecNo").val());
	
	if(type=="show"){
		
		if (txtFdate == "" && txtTdate == "" && txtFdate == undefined && txtTdate == undefined) {
			alertify.error("Please select both date...!");
			return false;
		}

		
		if((frmRecNo != "" && (toRecNo =="")) || (toRecNo != "" && ( frmRecNo==""))){
			alertify.error("Please insert both receipt No...!");
			return false;
		}
		
	}else{
		
		if(txtFdate=="" || txtFdate==undefined || txtFdate==null){
			txtFdate="NA";
		}
		
		if(txtTdate=="" || txtTdate==undefined || txtTdate==null){
			txtTdate="NA";
		}
	}
	
	if(frmRecNo=="" || frmRecNo==undefined || frmRecNo==null){
		frmRecNo=0;
	}
	
	if(toRecNo=="" || toRecNo==undefined || toRecNo==null){
		toRecNo=0;
	}
	
	var inputs = [];
	inputs.push('txtFdate=' + txtFdate);
	inputs.push('txtTdate=' + txtTdate);
	inputs.push('frmRecNo=' + frmRecNo);
	inputs.push('toRecNo=' + toRecNo);
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async	: true,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/WorkSheetlab/getLabWorksheetDash",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			count = 1;
			if (r.listLabWorksheetView.length > 0) {
						
				setTemplateDash(r);
			
			} else {
					alertify.error("Record Not Found");
				$("#patientcontainer").html("");
			}
			//$("#frmRecNo").val("");
			//$("#toRecNo").val("");
		}
	});
}

function setTemplateDash(r) {
	//alert("-------->>>"+JSON.stringify(r));
	var htm="";
	
	htm=htm+"<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
	+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Assign Date</div></th>"
	+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Bill No</div></th>"
	+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
	+ "<th class='col-md-3-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
	+ "<th class='col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test</div></th>"
	+ "</tr></thead><tbody>";
	
	if (r.listLabWorksheetView.length > 0) {
		
		for(var i=0;i<r.listLabWorksheetView.length;i++){
			
			htm=htm+"<tr>"
			+ "<td class='filterable-cell' align='center'>"+(count++)+"</td>"
			+ "<td class='filterable-cell' align='center'>"+r.listLabWorksheetView[i].assignDate+" "+r.listLabWorksheetView[i].assignTime+"</td>"
			+"<td class='filterable-cell'>"+r.listLabWorksheetView[i].billReceiptId+"</td>"
			+"<td class='filterable-cell'>"+r.listLabWorksheetView[i].patientId+"</td>"
			+ "<td class='filterable-cell'>"+r.listLabWorksheetView[i].patientName+"</td>"
			+ "<td class='filterable-cell' align='center'>"+r.listLabWorksheetView[i].age+"</td>"
			+ "<td class='filterable-cell' align='center'>"+r.listLabWorksheetView[i].gender+"</td>"
			+ "<td class='filterable-cell' id = 'testname_"+(count - 1)+"' >"+r.listLabWorksheetView[i].testName+"</td>"
			+ "</tr>";
		}
		htm=htm+"</tbody></table>";
	}
	$("#patientcontainer").html(htm);
}

function setCurrentDate() {
	var currentdate = new Date();
	var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1)+ "/" + currentdate.getFullYear();
	$("#txtFdate").val(date);
	$("#txtTdate").val(date);
}

function printLabWorksheet() {

	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var frmRecNo = $.trim($("#frmRecNo").val());
	var toRecNo = $.trim($("#toRecNo").val());
	
	if (txtFdate == "" && txtTdate == "" && txtFdate == undefined && txtTdate == undefined) {
		alertify.error("Please select both date...!");
		return false;
	}

	
	if((frmRecNo != "" && (toRecNo =="")) || (toRecNo != "" && ( frmRecNo==""))){
		alertify.error("Please insert both receipt No...!");
		return false;
	}
	
	if(frmRecNo=="" || frmRecNo==undefined || frmRecNo==null){
		frmRecNo=0;
	}
	
	if(toRecNo=="" || toRecNo==undefined || toRecNo==null){
		toRecNo=0;
	}
	
	var TechN = "withN";
	setTimeout(function() {
		window.open(("labWorksheetPDF.jsp?" +"&txtFdate="+encodeURIComponent(txtFdate)+"&txtTdate="+encodeURIComponent(txtTdate)+"&frmRecNo="+encodeURIComponent(frmRecNo)+"&toRecNo="+encodeURIComponent(toRecNo)+"&TechN=" +encodeURIComponent(TechN)));
	}, 300);
	
	$("#frmRecNo").val("");
	$("#toRecNo").val("");

}