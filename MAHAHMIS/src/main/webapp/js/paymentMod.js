
/*******************************************************************************
 * @author Tarique Aalam

 * @date 16_May_2017 
 * @Code This function is use to Refresh the payment.
 ******************************************************************************/
function refreshPayment() {
	$('#payId').val(0);
	$('#payName').val("");
	getAllPayments();
	
}



/*******************************************************************************
 * @author Mohd Tarique Aaalam
 * @date 16_May_2017 
 * @Code This function is use to save the payment.
 ******************************************************************************/

function savePayment() {
	var payId= $('#payId').val();
	var payName = $('#payName').val();
	//var servId = $( "#uId option:selected" ).val();
	
	
	
	if(payName=="" || payName=="undefined" || payName==null){		
		$("#payName").focus();					
		return false;
	}
	

	if(payId == "" || payId == null || payId == undefined){
		payId = 0;
	}
	var inputs = [];	
	inputs.push('payName=' + payName);
	inputs.push('payId=' + payId);
	//inputs.push('servId=' + servId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/payment/save",
		data	: str + "&reqType=AJAX",
	//	timeout : 1000 * 60 * 5,
	//	cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			getAllPayments();
			refreshPayment();		
		}		
	});	
}


/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code Fetching data 
 ******************************************************************************/

function getAllPayments() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/payment/fetchPayList",

				success : function(r) {
					setTemplateForPayments(r);//call template
				}
			});
}


/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForPayments(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Payment ID</th>'
						+ '<th class="col-md-1 center">Payment Mode</th>'
						
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.listPay.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.listPay[int].payId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="pId'+(r.listPay[int].payId) +'" class="col-md-1 center">'+ (r.listPay[int].payId)+ '</td>'
								+ '<td id="pName'+(r.listPay[int].payId) +'" class="col-md-1 center">'+ (r.listPay[int].payName)+ ' </td>'

								+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success" value="EDIT" id=btnEdit10'+r.listPay[int].payId+' onclick="editPayment('+r.listPay[int].payId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button class="btn btn-xs btn-danger" value="DELETE" id=btnDelete10 '+r.listPay[int].payId+' onclick=deletePayment('+r.listPay[int].payId+') > <i class="fa fa-trash-o"></i></button> </td>'
								
								
								+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.listPay[int].payId+">"+r.listPay[int].payName+"</option>";
	}
	
	$("#masterModuleBodyNarr").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}	



/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code update master
 ******************************************************************************/


function editPayment(payId){
	$('#payId').val(payId);		
	$('#payName').val($('#pName' + payId).html());
		
}	


/*******************************************************************************
 * @author Mohd tarique Aalam
 * @date 16_May_2017 
 * @Code Delete data from temp id 
 ******************************************************************************/

function deletePayment(payId) {
	// deleteModule()
	var r = confirm("Are You Sure You Want To Delete Payment Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/payment/deletePayMaster",
			data : {
				"payId" : payId
			},
			//timeout	: 1000 * 60 * 5,
			cache	: false,
			error	: function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshPayment();
			}
		});
	}
}


/*******************************************************************************
 * @author Tarique Aalam
 * @date 16_May_2017 
 * @Code This function use to auto complete filds
 ******************************************************************************/


function setAutoCompleteForPaymentMaster(inputId, callfrom) {

	//alert(callfrom);
	//var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
//	var findingName = $("#" + inputId).val();

	
		var inputs = [];
		
		inputs.push('letter=' + letter);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/payment/autoSuggestionPaymentMasterNames",
			//timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				 //alert(r.listTemp[0].TempName);
				
				if(callfrom=="search"){
					
					setTemplateForPayment(r);
					//autoCompTable(r, inputId);
					
				}else{
					//autoCompTable(r, inputId);
				}
				
			}
		});
	}


/*******************************************************************************
 * @author tarique Aalam
 * @date 16_May_2017 
 * @Code Template for fetching data
 ******************************************************************************/

function setTemplateForPayment(r){
	
	var optionList="<option></option>";
	
	var masterModuleBody= '<thead id="ehatTHead">'
						+'<tr>'
						+ '<th class="col-md-1 center">#</th>'
						+ '<th class="col-md-1 center">Payment ID</th>'
						+ '<th class="col-md-1 center">Payment Mode</th>'
						
						+ '<th class="col-md-1 center">Edit</th>'
						+ '<th class="col-md-1 center">Delete</th>'
						+ '</tr></thead>';
	for ( var int = 0; int < r.listPay.length; int++) {

		masterModuleBody=masterModuleBody+
				
						'<tr>'
								+ '<td id="row'+(r.listPay[int].payId) +'" class="col-md-1 center">'+ (int + 1)	+ '</td>'
								+ '<td id="pId'+(r.listPay[int].payId) +'" class="col-md-1 center">'+ (r.listPay[int].payId)+ '</td>'
								+ '<td id="pName'+(r.listPay[int].payId) +'" class="col-md-1 center">'+ (r.listPay[int].payName)+ ' </td>'

								+'<td class="col-md-1 center" ><button class="btn btn-xs btn-success" value="EDIT" id=btnEdit10'+r.listPay[int].payId+' onclick="editPayment('+r.listPay[int].payId+')"><i class="fa fa-edit"></i></button></td>'
							
							+ '<td class="col-md-1 center"><button class="btn btn-xs btn-danger" value="DELETE" id=btnDelete10 '+r.listPay[int].payId+' onclick=deletePayment('+r.listPay[int].payId+') > <i class="fa fa-trash-o"></i></button> </td>'
								
								
								+ '</tr>';
		
		
		optionList=optionList+"<option value="+r.listPay[int].payId+">"+r.listPay[int].payName+"</option>";
	}
	
	$("#masterModuleBodyNarr").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}	
