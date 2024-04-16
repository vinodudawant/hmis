/*****
 * @author    :Parikshit
 * @Date      :08-03-2018
 * @Code      :For getting sale report details
 * ******/
function getsaleReportDatawithgst() {

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();

	var hiddenProductId = $('#hiddenProductId').val();

	var unitId = $('#unitId').val();
	var paytype = $("input:radio[name='purTransType']:checked").val();

	var type = $("input:radio[name='saleTye']:checked").val();
	var patientId = $('#hiddenPatientId').val();

	if (hiddenProductId == "" || hiddenProductId == null
			|| hiddenProductId == undefined || isNaN(hiddenProductId)) {
		hiddenProductId = 0;
	}

	if (unitId == "" || unitId == null || unitId == undefined || isNaN(unitId)) {
		unitId = 0;
	}

	if (from == "" || from == null || from == undefined) {
		from = "0";
	}
	if (to == "" || to == null || to == undefined) {
		to = "0";
	}

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		var inputs = [];
		inputs.push('from=' + encodeURIComponent(from));
		inputs.push('to=' + encodeURIComponent(to));
		inputs.push('hiddenProductId=' + encodeURIComponent(hiddenProductId));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		inputs.push('paytype=' + encodeURIComponent(paytype));
		inputs.push('type=' + encodeURIComponent(type));
		inputs.push('patientId=' + encodeURIComponent(patientId));

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../report/getAllSaleRegisterReport",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				// console.log(r);
				setSaleDetaisData(r);

			}
		});

	}
}
/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For setting sale report details with gst and igst
 * ******/
function setSaleDetaisData(r) {
	var divContent = "";
	var total11 = 0.0;
	for ( var i = 0; i < r.length; i++) {
		
		divContent = divContent
				+ '<tr><td>'+ (i + 1)+'</td>'
				+ '<td>'+ r[i].date+'</td>'
				/*+ '<td>Noble Hospital</td>'
				+ '<td>'+ r[i].drugName+'</td>'
				+ '<td></td>'*/
				+ '<td>'+ r[i].patientName+'</td>'
				/*+ '<td></td>'*/
				+ '<td>'+ r[i].receiptNo+'</td>'
				+ '<td>'+ r[i].netAmt+'</td>'
				+ '<td>'+ r[i].type+'</td>'
				/*+ '<td></td>'*/
				+ '<td>'+ r[i].unit+'</td>'
				+'</tr>';
		
		total11=total11 + parseFloat(r[i].netAmt);
				
	}
	divContent = divContent
	
	 + '<tr> '
	 + '<td ></td>'
	 + '<td ></td>'
	 + '<td ></td>'
	 + '<td ></td>'
	 + '<td ></td>'
	 + '<td ></td>'
	 + '<td ></td>'
	 + '<td align="left">Total</td>'
	 + '<td >'+total11+'</td>'
	 + '<td ></td>'
	 + '</tr> '
	 ;
	$("#saledetailswithgst").html(divContent);
	resetAllSale();
}


/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For auto suggestion patient name for GST Sale Report 
 * ******/
function autoSuggestionForPateintNameIndentSale1(inputID, typeauto) {

	var typeOfpatient ='diagnosis';
	var inputs = [];

	if (typeOfpatient == "diagnosis") {
		inputs.push('isEdit=yes');
	} else {
		inputs.push('isEdit=no');
	}

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../InventoryServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
				
						// alert(r.length);
						var availableTags = [];
					
								ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltInventoryFetchPateintNameDTO.length; i++) {

								availableTags
										.push(ajaxResponse.ltInventoryFetchPateintNameDTO[i].fName
												+ " "
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].mName
												+ " "
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].lName
												+ "__"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Patient_ID
												+ "_"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Treatment_ID
												+ "_"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].referedTo
												);
							}

						

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("__");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value="'
										+ (arrValue[1]) + '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}
						
							$("#div" + inputID + " .typeahead").html(template);
						

							setTimeout(function() {
								$('#' + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResultpatient1,
									scrollBar : true,
									

								});
								$("#searchBox5").data('typeahead').source = resultData;
							}, 500);
						
					}
				});

		

	}

}

/*****
 * @author    :BILAL
 * @Date      :28-02-2018
 * @Code      :For auto suggestion patient name for GST Sale Report 
 * ******/
function displayResultpatient1(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId').val(content[0]);

}

function resetAllSale() {
	$("#searchBox1").val("");
	$("#searchBox5").val("");

	$('#hiddenPatientId').val(0);

	$('#hiddenProductId').val(0);

	$('#unitId').val(0);
}

/*****
 * @author    :BILAL
 * @Date      :12-02-2018
 * @Code      :For getting purchase details 
 * ******/
function getsalestockReportitemwise(){

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	var hiddencategoryId=$('#hiddencategoryId').val();
	var hiddencompanyId=0;//$('#hiddencompanyId').val();
	var hiddenProductId =$('#hiddenProductId').val();
	var hiddenvendorId =0;//$('#hiddenvendorId').val();
	var unitId         =$('#unitId').val();
	var paytype        = "0";
	
	if (hiddencategoryId == "" || hiddencategoryId == null || hiddencategoryId == undefined || isNaN(hiddencategoryId)) {
		hiddencategoryId = 0;
	}
	if (hiddencompanyId == "" || hiddencompanyId == null || hiddencompanyId == undefined || isNaN(hiddencompanyId)) {
		hiddencompanyId = 0;
	}
	if (hiddenProductId == "" || hiddenProductId == null || hiddenProductId == undefined || isNaN(hiddenProductId)) {
		hiddenProductId = 0;
	}
	
	if (hiddenvendorId == "" || hiddenvendorId == null || hiddenvendorId == undefined || isNaN(hiddenvendorId)) {
		hiddenvendorId = 0;
	}
	
	if (unitId == "" || unitId == null || unitId == undefined || isNaN(unitId)) {
		unitId = 0;
	}
	if (from == "" || from == null || from == undefined ) {
		from = "0";
	}
	if (to == "" || to == null || to == undefined ) {
		to = "0";
	}
	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		
		var inputs = [];
		inputs.push('from=' + encodeURIComponent(from));
		inputs.push('to=' + encodeURIComponent(to));
		
		inputs.push('hiddencategoryId=' + encodeURIComponent(hiddencategoryId));
		inputs.push('hiddencompanyId=' + encodeURIComponent(hiddencompanyId));
		inputs.push('hiddenProductId=' + encodeURIComponent(hiddenProductId));
		inputs.push('hiddenvendorId=' + encodeURIComponent(hiddenvendorId));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		inputs.push('paytype=' + encodeURIComponent(paytype));
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../report/getitemwisemnfsalestockreport",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setsalestockReportitemwise(r);
				
			}
		});

	} 
}
/*****
 * @author    :BILAL
 * @Date      :06-02-2018
 * @Code      :For setting product list report
 * ******/
function setsalestockReportitemwise(res){

	var result= ' ';
	/*var tqyt = 0;
	var tfree=0;
	var tmrp=0;
	var tprate=0;
	var tamt=0;
	var tdiscper=0;
	var tgstper=0;
	var tTotal =0;*/
		
	for(var i=0;i<res.length;i++){
		
		//var productId       =res[i].productId;	
		var vendorName      =res[i].vendorName;	
		var productName     =res[i].productName;
		var companyName     =res[i].companyId;
		var purRate         =parseFloat(res[i].purRate);
		
		var stockout          =res[i].stockout;
		var stockin            =res[i].stockin;
		var diff   = stockin - stockout  ;
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+productName+'</td> '
		  + '	<td>'+companyName+'</td> '
		 
		  + '	<td>'+stockout+'</td> '
		  
		  + '	<td>'+stockin+'</td> '
		  + '	<td>'+diff+'</td> '
		  + '	<td>'+stockin+'</td> '
		 
		  
		  + '	<td>'+purRate+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  
		  + '	<td>'+purRate+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  
		  + '</tr> ';
			
	}			
	$("#itemwisemfgwisesalestock").html(result);
}


function setAutoDoctorName(inputID, onload, callFrom) {

	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "OPD_Appoinment") {
		auto = 'DoctorName';
	}
	/*
	 * else if (callFrom == "OPD_Appoinment") { //alert("in OPDAppoinment's
	 * condition "); auto = 'AutoPatientNameforAppointment'; }
	 */

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../../AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {

				},
				success : function(r) {
					ajaxResponse = decodeURIComponent(r);
					// alert(ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					// alert(availableTags);
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {// alert(template);
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
					}, 1000);

				}
			});
	function displayResult(item) {

		var content = item.value.split("_");
		var arr = content[0].split("$$");

		$('#hiddenDoctorId').val(arr[0]);
		$('#txtDoctorAddress').val(arr[1]);

	}

}