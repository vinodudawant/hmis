
var counterIndent=0;
function chkAmountReceive()
{
	var receive = parseFloat($('#txtAmtRec1').val());
    var amountBalance=parseFloat($('#txtAmtBal1').val());
   
    if(receive>amountBalance)
    	{
    	$('#txtAmtRec1').val('');
    	alert("Enter amount receive less than amount balance");
    	$('#txtAmtRec1').focus();
    	}
    
}
function chkIndentAmountReceive()
{
	var receive = parseFloat($('#txtAmtRec').val());
    var amountBalance=parseFloat($('#txtAmtBal').val());
   
    if(receive>amountBalance)
    	{
    	$('#txtAmtRec').val('');
    	alert("Enter amount receive less than amount balance");
    	$('#txtAmtRec').focus();
    	}
    
}
function savePatientSale() 
{
	var discount=0;
	var receive = parseFloat($('#txtAmtRec1').val());
    var hiddenTreatmentId = $('#hiddenTreatmentId').val();
	var amountBalance = parseFloat($('#txtAmtBal1').val());
	
	if($('#txtDisc1').val() != '' && $('#txtDisc1').val().length > 0)
	    discount = parseFloat($('#txtDisc1').val());
	
	var balance=(amountBalance-(receive+discount)).toFixed(3);
  			
	if (hiddenTreatmentId != null && hiddenTreatmentId != '' && $('#txtAmtRec1').val()!=null && $('#txtAmtRec1').val()!='' && hiddenTreatmentId!='0') 
	{
		var inputs = [];
		inputs.push('treatmentId=' + hiddenTreatmentId);
		inputs.push('receive=' + receive);
		inputs.push('amountBalance=' + balance);
		inputs.push('discount=' + discount);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/dueCollection/savePatientPendingAmount",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) 
			{
				alert("save successfully");
				$("#patientReceipt").modal('hide');
				$('#patientReceipt').find('input:text').val('');				
				/*generatePrint();*/
			  window.open("/EhatEnterprise/pharmacy/patientSale/FinalView?treatmentId="+hiddenTreatmentId+"");
			
			}
		});
	}
	else
		{
		alert("Enter proper data");
		$('#txtAmtRec1').focus();
		}
	
}
function saveIndentSale() 
{
	var discount=0;
	var receive = parseFloat($('#txtAmtRec').val());
    var hiddenTreatmentId = $('#hiddenTreatmentId1').val();
	var amountBalance = parseFloat($('#txtAmtBal').val());
	
	if($('#txtDisc').val() != '' && $('#txtDisc').val().length > 0)
	    discount = parseFloat($('#txtDisc').val());
	
	var balance=(amountBalance-(receive+discount)).toFixed(3);
  			
	if (hiddenTreatmentId != null && hiddenTreatmentId != '' && $('#txtAmtRec').val()!=null && $('#txtAmtRec').val()!='' && hiddenTreatmentId!='0') 
	{
		var inputs = [];
		inputs.push('treatmentId=' + hiddenTreatmentId);
		inputs.push('receive=' + receive);
		inputs.push('amountBalance=' + balance);
		inputs.push('discount=' + discount);
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/dueCollection/saveIndentPatientPendingAmount",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) 
			{
				alert("save successfully");
				$("#indentReceipt").modal('hide');
				$('#indentReceipt').find('input:text').val('');				
				/*generatePrint();*/
		window.open("/EhatEnterprise/pharmacy/indentSale/FinalView?treatmentId="+hiddenTreatmentId+"");

			}
		});
	}
	else
		{
		alert("Enter proper data");
		$('#txtAmtRec').focus();
		}
	
}
var patientCounter=1;
function DisplayPatientData() 
{
var treatmentId=$('#hiddenPatientId').val();
var inputs = [];
inputs.push('treatmentId=' + treatmentId);
var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/patientSale/getAllPatientHistorySettalBillTreatmentId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
		
			if(r!="")
			{	
				setPatientSaleBillData(r);
			}
			 DisplayIndentData();
		}
	});
	
}

/*<td><td class='col-md-1-1'><a  type='button'  onclick='();' data-target='#patientReceipt' data-toggle='modal' class='btn btn-xs btn-info' >Settle Bill</a></td>*/
function setPatientSaleBillData(r) {
	var divContent = "";
	var type="PatientSale";
	for ( var i = 0; i < r.length; i++) 
	{
		
		/*var receive = "";
		if (r[i].totalAmountReceive != null
				&& r[i].totalAmountReceive != '') {
			receive = r[i].totalAmountReceive;
		}
			var balance = "";
		if (r[i].amountBal != null
				&& r[i].amountBal != '') {
			balance = r[i].amountBal;
		}*/
				
     divContent = divContent + "<div class='panel-heading' ><table border=1 class='table table-striped table-bordered header-fixed cf '><tbody><tr>" +
     		"<td class='col-md-1-1'>"
				+ patientCounter
				+ "</td><td class='col-md-1-1' >"
				+ type
				+ "</td> <td class='col-md-1-1' id='billId"+i+"'>"
				+ r[i].billId
				+ "</td> <td class='col-md-1-1' id='treatment"+i+"'>"
				+ r[i].treatmentId 
				+ "</td><td class='col-md-1-1' id='amtReceive"+i+"'>" + r[i].totalAmountReceive
				+ "</td><td class='col-md-1-1' id='totalBill"+i+"'>" + r[i].totalBill
				+ "</td><td class='col-md-1-1' id='amountBalance"+i+"'>" + r[i].amountBal
				+ "</td><td class='col-md-1-1' id='date"+i+"'>" + r[i].date
				+ "</td><td class='col-md-1-1'><a  type='button' value='"
				+ i + "' id='selectButton' name='selectProduct'"
				+ " onclick='setBalancePatientSale("+i+");' data-target='#patientReceipt' data-toggle='modal' class='btn btn-xs btn-info' >Settle Bill</a></td></tr></tbody>";
	
    divContent = divContent + "</table></div>";
    
    	(patientCounter++);
    	
	}
  $("#patientTab").html(divContent);
 
  /* DisplayIndentData(); */
}

function DisplayIndentData() 
{
	var patientId=$('#hiddenPatientId').val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/indentSale/getAllPatientBillTreatmentId",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
	
			},
			success : function(r) {
				if(r!="")
				{	
				setIndentBillData(r);
				}
			}
	});
	
}

/*<td class='col-md-1-1'><input type='checkbox'  name='selectProductOfIndent' value='"
	+ i + "'></td>
*/function setIndentBillData(r) {
	
	var divContent = "";
	var type="IndentSale";
	
	/*if(patientCounter>0)
		counterIndent=patientCounter;
	else
		counterIndent=1;*/
	for ( var i = 0; i < r.length; i++) 
	{
		/*var receive = "";
		if (r[i].totalAmountReceive != null
				&& r[i].totalAmountReceive != '') {
			receive = r[i].totalAmountReceive;
		}
			var balance = "";
		if (r[i].amountBal != null
				&& r[i].amountBal != '') {
			balance = r[i].amountBal;
		}*/
     divContent = divContent + "<div class='panel-heading' ><table border=1 class='table table-striped table-bordered header-fixed cf '><tbody><tr>" +
     		"<td class='col-md-1-1'>"
				+ (patientCounter)
				+ "</td><td class='col-md-1-1' >"
				+ type
				+ "</td> <td class='col-md-1-1' id='billIdIndent"+i+"'>"
				+ r[i].billId
				+ "</td> <td class='col-md-1-1' id='treatmentIdIndent"+i+"'>"
				+ r[i].treatmentId 
				+ "</td><td class='col-md-1-1' id='amtReceiveIndent"+i+"'>"+ r[i].totalAmountReceive
				+ "</td><td class='col-md-1-1' id='totalBillIndent"+i+"'>" + r[i].totalBill
				+ "</td><td class='col-md-1-1' id='amountBalIndent"+i+"'>" + r[i].amountBal
				+ "</td><td class='col-md-1-1' id='dateIndent"+i+"'>"+ r[i].date
				+ "</td><td class='col-md-1-1'><a  type='button' onclick='setBalance("+i+");'  data-target='#indentReceipt' data-toggle='modal' class='btn btn-xs btn-info' >Settle Bill</a></td></tr></tbody>";
	
    divContent = divContent + "</table></div>";
    
    patientCounter++;
	}
$("#indentTab").html(divContent);
	
}



function setBalancePatientSale(count)
{	
	$('#txtAmtBal1').val($('#amountBalance'+count).html());
	$('#hiddenTreatmentId').val($('#treatment'+count).html());
}

function savePatientSaleBill() 
{
	var favorite = [];
	$.each($("input[name='selectProduct']:checked"), function() {
		favorite.push($(this).val());
	});
		
		for ( var i = 0; i < favorite.length; i++) 
		{
			var inputs = [];
			var billId = $('#billId' + favorite[i]).html();
			var amountBalance = $('#amountBalance' + favorite[i]).html();
			var treatment = $('#treatment' + favorite[i]).html();
	
			inputs.push('billId=' + billId);
			inputs.push('amountBal=' + amountBalance);
			inputs.push('treatment=' + treatment);
	
		
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/dueCollection/savePatientTotalBill",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) 
			{
				
				if((i)==favorite.length)
					alert("save successfully");
				
			/*	$("#patientReceipt").modal('hide');
				$('#patientReceipt').find('input:text').val('');	*/			
				/*generatePrint();*/
			/*  window.open("/EhatEnterprise/pharmacy/patientSale/FinalView?treatmentId="+treatment+"");*/

			}
		});
	}
	
	
	
}



function saveIndentSaleBill() 
{
	var favorite1 = [];

	$.each($("input[name='selectProductOfIndent']:checked"), function() {
		favorite1.push($(this).val());
	});
	
	
		for ( var i = 0; i < favorite1.length; i++) 
		{
			var inputs1 = [];
			var billIdIndent = $('#billIdIndent' + favorite1[i]).html();
			var amountBalanceIndent = $('#amountBalIndent' + favorite1[i]).html();
			var treatmentIndent = $('#treatmentIdIndent' + favorite1[i]).html();
			
			inputs1.push('billIdForIndent=' + billIdIndent);
			inputs1.push('amountBalanceForIndent=' + amountBalanceIndent);
			inputs1.push('treatmentForIndent=' + treatmentIndent);
		
		var str = inputs1.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/dueCollection/saveIndentTotalBillAmount",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) 
			{
				if((i)==favorite1.length)
					alert("save successfully");
				
			/*	$("#patientReceipt").modal('hide');
				$('#patientReceipt').find('input:text').val('');	*/			
				/*generatePrint();*/
			/*  window.open("/EhatEnterprise/pharmacy/patientSale/FinalView?treatmentId="+treatment+"");*/

			}
		});
	}
	
}

function setBalance(count)
{
	$('#txtAmtBal').val($('#amountBalIndent'+count).html());
	$('#hiddenTreatmentId1').val($('#treatmentIdIndent'+count).html());
}

function searchDueCollectionPatient(id) 
{
	var inputs = [];
	inputs.push('PatientId=' + id);
	if (id != null && id != "") {
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/dueCollection/getpatientDatabyPatientId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						if (r == "") {
							alert("Record not found!");
							$('#txtPatientId').val('');
						} else {
							$("#txtPatientId").val('');
							setTableData(r);
						}
					}
				});
	} else {
		alert("Record not found!");
		$('#txtPatientId').val('');
	}
	return true;
}



function setTableData(result) 
{
	var r = result;
	var divContent = "";


	divContent = divContent
			+ " <tr><td class='col-md-1 center'>"
			+ 1
			+ " <td class='col-md-2 center'>"
			+ r.patientId
			+ "<input type='hidden' id='patientId"
			+ "' value='"
			+ r.patientId
			+ "'></td>"
			+ "<td class='col-md-2 center'>"
			+ r.patientName
			+ "<input type='hidden' id='patientName"
			+ "' value='"
			+ r.patientName
			+ "'></td>"
			+ "<td class='col-md-2 center'><a id='btnPrint"
			+ "' class='btn btn-xs btn-info' href='/EhatEnterprise/pharmacy/dueCollection/patientHistory?patientId="+r.patientId+"&pName="+r.patientName+"&phoneNum="+r.mobile+"&treatmentId="+r.treatmentId+"'"
			+ "> <i class='fa fa-eye View'></i> </a></td></tr>";

	$('#divDueCollectionList').html(divContent);
}

