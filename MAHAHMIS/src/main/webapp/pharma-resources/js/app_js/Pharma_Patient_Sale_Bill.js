var totalRowCount = 1;
var patientSaleparseData="";


function showDetails() {
	$("#txtBankName").val('');
	$("#txtChequeNumber").val('');
	$("#DivBank").show();
	$("#DivChequeNum").show();
	/* $("#DivComment").show(); */
}

function hideDetails() {
	$("#DivBank").hide();
	$("#DivChequeNum").hide();
	/* $("#DivComment").hide(); */
	$("#DivBankforcard").hide();
	$("#DivNoforcard").hide();
}

//Added By BILAL 
function showcardDetails() {
	$("#txtBankNameForcard").val('');
	$("#txtCardNo").val('');
	$("#DivBankforcard").show();
	$("#DivNoforcard").show();

}
//Added By BILAL
function hideChequeDetails(){
	$("#DivBank").hide();
	$("#DivChequeNum").hide();
	
}
//Added By BILAL
function hideCardDetails(){
	
	$("#DivBankforcard").hide();
	$("#DivNoforcard").hide();
}

function showSettleBill() {
	displayPatientPendingPopUp();
}

function savePatientPendingData() {
	var narration = $('#narration').text();
	var hiddenTreatmentId = $('#hiddenTreatmentId1').val();
	var list = {
			listPharmaPatientAmountHistoryDto : []
	};	
	
	var amountBal = 0;
	var amountRec = 0;
	
	$("#patientPendingData").find('input[name="chksalesBillId"]').each(function() {
		if ($(this).is(":checked")) {
			var billId = $('#' + this.id).val();
			var receiveAmt = $('#receiveAmt'+billId).text();
			var amountBIllNet = $('#amountBIllNet'+billId).text();
			var discount = $('#discount'+billId).val();
			var amountBal = $('#amountBal'+billId).text();
			var narration = $('#narration'+billId).val();
			var payAmt = $('#payAmt'+billId).val();
			
			/*if(amountRec==0){
				amountRec=amountBal;
				amountBal=0;
			}*/
			
			list.listPharmaPatientAmountHistoryDto.push({
				"idpharmaPatientAmountHistoryId" : 0,
				"treatmentId" : hiddenTreatmentId,
				"amountReceive" : receiveAmt,
				"discount" : discount,
				"narration" : narration,
				"amountBalance" : amountBal,
				"patientSaleBillMasterId" : billId,
				"returnFlag" : "N"
			});
		}
	});

	var listStr = JSON.stringify(list);
		var inputs = [];
		inputs.push('treatmentId=' + hiddenTreatmentId);
		inputs.push('listStr=' + encodeURIComponent(listStr));

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/savePatientPendingAmount",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {

						alert("save successfully");
						/* generatePrint(); */
						window
								.open("../../pharmacy/patientSale/FinalView?treatmentId="
										+ hiddenTreatmentId + "");
						$("#Patient_Sales_pending_data").hide();
						$("#amountReceive").val("");
					}
				});
		location.reload(true);
}

function settalBillData(treatmentId) {

	$('#hiddenTreatmentId1').val(treatmentId);
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/getAllPatientSaleSettalBillTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						if (r != "") {
							setBillData(r);
						}
						else
							displayAllPatientData();
					}
				});

	} else {
		$("#patientSettalBill").html("");
	}

}
function calculateDisc() {

	var pendingAmount = 0;
	var amtReceive = 0;
	var discount = 0;

	pendingAmount = parseFloat($('#totalPaidAmt').text());
	amtReceive = parseFloat($('#amountReceive').val());

	if ($('#discount').val() != null && $('#discount').val() != "")
		discount = parseFloat($('#discount').val());

	if (pendingAmount > 0 && pendingAmount >= (amtReceive + discount)) 
	{
		var result = pendingAmount - (amtReceive + discount);
		var value=Math.floor((result)*100)/100;
		$('#amountBalance').val((value));

	} else {
		alert("Amount Receive is less than Amount Balance");
		$('#amountReceive').val('');
	}

}

function deleteRowOnFocus() {
	$(":focus").each(function() {
		var data = $(this).attr('class');
		var splittedData = data.split("#");
		$("#" + splittedData[1].trim()).attr("checked", true);
		deleteRow();
	});
}

function setUpfocus() {
	$(":focus").each(
			function() {
				var data = $(this).attr('class');
				var splittedData = data.split("#");
				var focusElement = splittedData[1].trim();
				var id = $("input." + focusElement).parent().parent()
						.attr("id");
				$("#DRRDiv #hiddenCurrentRow").siblings("tr#" + id).prev()
						.find("td input.textNoDelete").focus();
			});
}

function setDownfocus() {
	$(":focus").each(
			function() {
				var data = $(this).attr('class');
				var splittedData = data.split("#");
				var focusElement = splittedData[1].trim();

				var id = $("input." + focusElement).parent().parent()
						.attr("id");
				$("#DRRDiv #hiddenCurrentRow").siblings("tr#" + id).next()
						.find("td input.textNoDelete").focus();
			});
}

function displayAllPatientData() {
	treatmentId=$('#hiddenTreatmentId1').val();
	if (treatmentId != null && treatmentId != "") {
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/getAllPatientDataByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						//settalBillData();
						setAllPatientSaleData(r);
						//displayPendingAmountByTreatmentId(value);
					}
				});
	} else {
		$("#patientSettalBill").html("");
		$("#patientPendingData").html(divContent);
	}

}

var penTot=0;
function setBillData(r) {

	var divContent = "";
	var receive = 0;
	var balance = 0;
	var totalAmountReceive=0.0;
	var pendingBalance=0.0;
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Bill Id</th><th>Amount Balance</th><th>Amount Receive</th><th>Discount</th><th>Narration </th> <th>Final Date</th><th>Print</th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {
		receive = 0;
		balance = 0;
		if (r[i].amountReceive != null && r[i].amountReceive != '') {
			receive = r[i].amountReceive;
			totalAmountReceive += parseFloat(receive);
		}
		if (receive > 0) {
			
			if (r[i].amountBal != null && r[i].amountBal != '') {
				balance = r[i].amountBal;
				pendingBalance = parseFloat(balance);
			}
			
			penTot=+penTot + +receive;

			divContent = divContent
					+ "<tbody><tr><td>"
					+ r[i].historyId
					+ "</td><td>"
					+ balance
					+ "</td><td> "
					+ receive
					+ "</td>  <td>"
					+ r[i].discount
					+ "</td>  <td>"
					+ r[i].narration
					+ "</td>  <td id='historyId"
					+ r[i].historyId
					+ "' style='display:none' value='"
					+ r[i].historyId
					+ "' ><td>"
					+ r[i].finalAmt
					+ "</td><td><a  class='btn btn-xs btn-info' href='../../pharmacy/patientSale/printFinalView?treatmentId="
					+ r[i].historyId + "'>Print</a></td></tr></tbody>";
		}
	}
	divContent = divContent + "</table>";
	
	$("#totalAmountReceive").val(totalAmountReceive);

	$("#patientSettalBill").html(divContent);
	displayAllPatientData();
}

function displayPendingAmountByTreatmentId(treatmentId) {
	$("#patientSettalBill").html("");
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/getPendingAmountByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						if (r != null && r != '' && r != 'null') {
							$("#pendingAmount").html(r);
							$("#pendingAmount").val(r);
						} else
							$("#pendingAmount").html("NO pending Available");

					}
				});
	}
}
function setAmountBalance(r) {

	var pendingAmount1 = 0;
	var amtReceive1 = 0;
	var discount1 = 0;

	pendingAmount1 = r[i].patientSalesBillNetAmt;
	amtReceive1 =  r[i].amountReceive;

	//if ($('#discountAmt').val() != null && $('#discountAmt').val() != "")
	//	discount1 = parseFloat($('#discountAmt"+ r[i].patientSalesBillId +"').val());

	if (pendingAmount1 > 0 && pendingAmount1 > (amtReceive1 - discount1)) 
	{
		var result1 = pendingAmount1 - (amtReceive1 - discount1);
	//	var value=Math.floor((result)*100)/100;
		$('#amountBal"+ r[i].patientSalesBillId +"').val((result1));

	} else {
		alert("Amount Receive is more than Amount Balance");
		$('#amountReceive').val('');
	}

}
function setAllPatientSaleData(r) {
var balance = 0.0;
var pendingBalance = 0.0;
if (r.length > 0) {
	var divContent = "";
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Patient Sale Date</th><th>Net Amount</th><th>final Net Amount</th><th>Amount Receive</th><th>Amount Return</th><th>Discount</th><th>Amount Balance</th><th>Narration</th><th>Pay Now</th><th  style='width: 66px;'>Select <input id='allChksalesBillId'  type='checkbox' onclick='setAllCheckPatientSale()' ></th></tr></thead>";

	divContent += '<tbody>';
	for ( var i = 0; i < r.length; i++) {
		
		var discount = 0;
		if (r[i].patientSalesBillCN != null
				&& r[i].patientSalesBillCN != '') {
			discount = r[i].patientSalesBillCN;
		}else{
			discount = 0;
		}
			
		var receive = "";
		if (r[i].amountReceive != null
				&& r[i].amountReceive != '') { 
			receive = r[i].amountReceive;
		}
		var returnAmt = 0;
		if (r[i].patientSalePreviousBalance != null
				&& r[i].patientSalePreviousBalance != '' && r[i].patientSalePreviousBalance != '0.0') {
			returnAmt = r[i].patientSalePreviousBalance;
		}else{
			returnAmt = 0;
		}
		if(r[i].historyId == 0){
			var balance = "";
			if (r[i].amountBal != null
					&& r[i].amountBal != '' && r[i].amountBal != '0.0') {
				balance = r[i].amountBal-Number(returnAmt);
			}
			else{
				balance = r[i].patientSalesBillAmountBalance-Number(returnAmt);
			}
		}
		else{ 
			if (r[i].amountBal != null
					&& r[i].amountBal != ''  && r[i].amountBal != '0.0') {
				balance = r[i].amountBal;
			}
		}
		  var finalAmountBIllNet=(r[i].patientSalesBillNetAmt-Number(returnAmt));
		
		var balance1 = "";
		    balance1 =   (r[i].amountBal- (returnAmt));
	    if(balance>0){
				divContent = divContent + "<tr>" 				
				+"<td>"+getDate(r[i].patientBillDate) + "</td> " 
				+"<td id='amountBIllNet"+ r[i].patientSalesBillId +"'>" + r[i].patientSalesBillNetAmt + "</td>"
				+"<td id='finalAmountBIllNet"+ r[i].patientSalesBillId +"'>" + finalAmountBIllNet + "</td>"
				+"<td id='receiveAmt"+ r[i].patientSalesBillId +"'>" + receive + "</td><input type='hidden' id='finalRecAmt"+r[i].patientSalesBillId+"' value='"+ (receive) + "'>"
				+"<td id='return"+ r[i].patientSalesBillId +"'>" + returnAmt + "</td>"
				if(discount > 0)
					divContent +="<td><input type='text' id='discount"+r[i].patientSalesBillId+"' value='"+ discount +"' disabled></td>" 
				else
					divContent +="<td><input type='text' id='discount"+r[i].patientSalesBillId+"'onkeyup='setTotalAmount("+ r[i].patientSalesBillId +", \"discount\")' value='"+ discount +"'></td>" +
							"<input type='hidden' id='finaldiscount"+r[i].patientSalesBillId+"' value='"+discount+"' >" 
					
				divContent +="<td id='amountBal"+ r[i].patientSalesBillId +"'>" + (balance) + "</td>"
				+"<input type='hidden' id='finalBalAmt"+r[i].patientSalesBillId+"' value='"+ (balance) + "'>" 
				+"<td><input type='text' id='narration"+r[i].patientSalesBillId+"'></td>" 

				if(r[i].historyId > 0)
					divContent +="<td><input type='text' id='payAmt"+r[i].patientSalesBillId+"'  onkeyup='setTotalAmount("+ r[i].patientSalesBillId +", \"partialtotal\")' value='0'></td>"
					+ "<td><input name='chksalesBillId' id='chksalesBillId"+r[i].patientSalesBillId+"'   type='checkbox' value='"+ r[i].patientSalesBillId +"' onclick='setFullPartialPayment("+r[i].patientSalesBillId+")'></td>";
				else
					divContent +="<td><input type='text' id='payAmt"+r[i].patientSalesBillId+"'  onkeyup='setTotalAmount("+ r[i].patientSalesBillId +", \"total\")' value='0'></td>" 
					+ "<td><input name='chksalesBillId' id='chksalesBillId"+r[i].patientSalesBillId+"'   type='checkbox' value='"+ r[i].patientSalesBillId +"'></td>";
					
				divContent +="<input type='hidden' id='historyIdd"+r[i].patientSalesBillId+"' value='"+r[i].historyId+"'>" 
				+"</tr>";
		    }
			balance =r[i].patientSalesBillNetAmt-r[i].amountReceive ;
	}

	divContent += '</tbody>';
	
	divContent = divContent + "</table>";
	
	var pendingAmount = $("#pendingAmount").html();
	if(pendingAmount==undefined || pendingAmount == 0){	
		$("#pendingAmount").html(pendingBalance.toFixed(2));
	}
	
	penTot=0;
	$("#patientPendingData").html(divContent);
} else {
	$("#patientPendingData").html("");
    }
 }
function setFullPartialPayment(billId){

	var finaldiscount = $('#finaldiscount'+billId).val();
	var discount = $('#discount'+billId).val();
	
	var amountBal = $('#finalBalAmt'+billId).val();
	$('#amountBal'+billId).text(0);
	
	if(finaldiscount == 0)
	{
		amountBal = Number(amountBal) - Number(discount);
		
		if(amountBal < 0)
		{
			alert('not allowed')
			return false
		}
	}
	
	$('#payAmt'+billId).val(amountBal)
	
	$('#receiveAmt'+billId).text(amountBal)
}
function setAllCheckPatientSale(){

	if($("#allChksalesBillId").is(":checked")){
		$("input[name=chksalesBillId]").prop('checked',true)
	} else{
		$("input[name=chksalesBillId]").prop('checked',false)

	}

	$("#patientPendingData").find('input[name="chksalesBillId"]:checked').each(function() {
		if ($(this).is(":checked")) {
			var billId = $(this).val();
			var finaldiscount = $('#finaldiscount'+billId).val();
			var discount = $('#discount'+billId).val();
			
			var amountBal = $('#finalBalAmt'+billId).val();
			$('#amountBal'+billId).text(0);
			
			if(finaldiscount == 0)
			{
				amountBal = Number(amountBal) - Number(discount);
				
				if(amountBal < 0)
				{
					alert('not allowed')
					return false
				}
			}
			
			$('#payAmt'+billId).val(amountBal)
			
			$('#receiveAmt'+billId).text(amountBal)
			
		}
	});
	
}
function setTotalAmount(id, callfrom)
{
	var discount = 0;
	var payNow = 0;
	var amountRec = 0;
	var amountBIllNet = $('#finalAmountBIllNet'+id).text();
	var amountBal= $('#finalBalAmt'+id).val();
	discount = $('#discount'+id).val();
	returnAmtFinal = $('#return'+id).text();

	var actualAmountBal= $('#amountBal'+id).text();
	
	var totalAmtAfterdisc = 0;
	
	if(callfrom == 'discount')
	{
		 discount = $('#discount'+id).val();
		 var payAmt = $('#payAmt'+id).val();
		 
		 var historyIdd = $('#historyIdd'+id).val();
		 
		 if(historyIdd > 0)
			 amountBIllNet = $('#finalBalAmt'+id).val();
		
		 if(payAmt == 0)
		 {
			 totalAmtAfterdisc = Number(amountBIllNet) - Number(discount);
		 } else {
			 totalAmtAfterdisc = Number(amountBIllNet) - (Number(discount) + Number(payAmt));
		 }
		 
		 if(Number(totalAmtAfterdisc) < 0)
		 {
				alert('discount amount could not be greater')
		 		return false
		 }
		 
		 $('#amountBal'+id).text(totalAmtAfterdisc);
		 $('#totalAmtAfterdisc'+id).text(payAmt)
	 
	} else if(callfrom == 'partialtotal') {

		payNow = $('#payAmt'+id).val();
		var finalBalAmt =  $('#finalBalAmt'+id).val()
		 
		if(Number(finalBalAmt) < Number(payNow))
		{
			alert('Not allowed')
			return false
		}

		var finalreceiveAmt = $('#finalRecAmt'+id).val()
		var finalPayAmt = Number(finalBalAmt) - Number(payNow);
		
		var totalfinalPayAmt = Number(finalreceiveAmt) + Number(payNow);

		$('#receiveAmt'+id).text(totalfinalPayAmt)
		$('#amountBal'+id).text(finalPayAmt)
	} else {
		
		var receiveAmt = $('#finalBalAmt'+id).val()
		var amountBIllNet = $('#finalAmountBIllNet'+id).text();
		var substrAmt = Number(amountBIllNet) - Number(receiveAmt);
		
		var payAmt = 0;
		var totalBal = 0;
		payAmt = $('#payAmt'+id).val();
		
		if(substrAmt == 0)
		{
			 totalBal = Number(amountBIllNet) - (Number(payAmt) + Number(discount));

			if(totalBal < 0)
			{
				alert('discount amount could not be greater')
				return false;
			}
			 
			$('#receiveAmt'+id).text(payAmt)
			
		} else {
			
			if(payAmt > Number(receiveAmt))
			{
				alert('Not allowed')
				return false;
			}
			
			totalBal = Number(amountBIllNet) - (Number(payAmt) + substrAmt-Number(discount));
			var payAmtFinal = Number(payAmt) + Number(substrAmt)-Number(discount);
			$('#receiveAmt'+id).text(payAmtFinal)
		}
		$('#amountBal'+id).text(totalBal)
	}
	
}
function setBillAmount(id)
{
	var len = $("#patientPendingData").find('input[name="chksalesBillId"]:checked').length;
	var billId = $("#"+id).val();
	var totalPaidAmt = $('#totalPaidAmt').text();
	var amountBal = $('#payAmt'+billId).val();
	
	if($("#"+id).is(":checked"))
		totalPaidAmt = Number(totalPaidAmt) +  Number(amountBal);
	else 
		totalPaidAmt = Number(totalPaidAmt) - Number(amountBal);
	
	if(len == 1) {
		$('#amountReceive').val(totalPaidAmt);
		$('#amountReceive').prop('disabled', true);
	} else {
		$('#amountReceive').val(totalPaidAmt);
		$('#amountReceive').prop('disabled', true);
	}
	
	$('#totalPaidAmt').text(totalPaidAmt);	
	
}
function calculatePending() {
	var netAmt = 0;
	var amtReceive = 0;
	var prevBal = 0;

	if ($('#txtNetAmt').val() != '' && $('#txtNetAmt').val() != null)
		netAmt = parseFloat($('#txtNetAmt').val());

	if ($('#txtAmtReceived').val() != '' && $('#txtAmtReceived').val() != null)
		amtReceive = parseFloat($('#txtAmtReceived').val());

	if ($('#mainPendingBalance').html() != ''
			&& $('#mainPendingBalance').html() != null)
		prevBal = parseFloat($('#mainPendingBalance').html());

	var total = (prevBal + netAmt) - amtReceive;
	var value=Math.floor((total)*100)/100;
	$('#txtAmtBalance').val(value);
	//$('#txtAmtReceived').val(value);
	
	$('#txtRound').val(netAmt);

}
function fetchPatientName(){

	
	$("#byName").val("");
	var patSearchType = $("#searchTypePatient").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient Id Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else 	if(patSearchType == 2) {
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}
	else{
		$("#byName").attr("placeholder", "Type Invoice No Here");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
	}
}
function autoSuggestionForPendingPatientName(inputID, typeauto) {
	var callFrom =  $("#searchTypePatient").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	var typeOfpatient = 'diagnosis';
	var inputs = [];

	if (typeOfpatient == "diagnosis") {
		inputs.push('isEdit=yes');
		inputs.push('callFrom=' + callFrom);	
	} else {
		inputs.push('isEdit=no');
		inputs.push('callFrom=' + callFrom);	
	}

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		//inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);
		inputs.push('callFrom=' + callFrom);

		var str = inputs.join('&'); 

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/fetchPatientSaleData",
					timeout : 1000 * 60 * 15, 
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
						
						var template = "";
						for ( var j = 0; j < r.length; j++) {
							
							var arrValue = r[j].f_name+ " "+r[j].m_name+" "+r[j].l_name;
							var idValue = r[j].patientId;
							var patName = r[j].f_name+ " "+r[j].m_name+" "+r[j].l_name;
							var treatmentId = r[j].treatmentId;
							resultData.push({
								ID : idValue,
								Name : patName,
								treatmentId: treatmentId
							});
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + idValue + '-' + arrValue
									+ '</a></li>';
						}
						
						setTimeout(function() {

							$("div#divbyName .typeahead").html(template);
							$("div#divbyName .typeahead").show();
							
							$("#" + inputID).typeahead({
								source : resultData,
								displayField : 'Name',
								valueField : 'ID',
								onSelect : displayResult,
								scrollBar : true
							});
							$("#" + inputID).data('typeahead').source = resultData;
						}, 500);
					}
				});
	}
	function displayResult(item) {
		var res = item.text.split('-');
		var ID = res[0];
		var patName = res[1];
		$("#" + inputID).val(patName);	
		getTreatmentDetails(ID);
	} 		

}

function displayResult4(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId1').val(content[0]);

	getTreatmentDetails(content[0]);

	/* getTreatmentIdForPendingPatient(content[0]); */

}

function getTreatmentDetails(patientId) {

	var inputs = [];
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getTreatmentDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {

					var data = jQuery.parseJSON(r);
					var divContent = "<div class='col-md-4-1'><label for='product' >Select Treatment :</label></div><div class='col-md-6-1'><select id='treatmentSelect' name='treatmentSelect' onchange='settalBillData(this.value)' style='width: 100%'><option value='0'>--Select--</option>";

					for ( var i = 0; i < data.length; i++) {
						divContent = divContent + "<option value="
								+ data[i].treatmentId + ">"
								+ data[i].treatmentId + " - " + data[i].status
								+ "</option>";
					}
					divContent = divContent + "</select></div>";
					$("#divTreatmentDetails").html(divContent);
				}
			});
}

function getTreatmentIdForPendingPatient(PatientId) {
	var typeOfpatient = 'diagnosis';

	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			PatientId : PatientId,
			typeOfpatient : typeOfpatient
		},
		url : "../../pharmacy/patientSale/getTreatmentByPatientId",
		timeout : 1000 * 60 * 15,

		error : function(error) {
			alert('error' + error);
		},
		success : function(r) {
			splitTreatmentData(r);

		}
	});

}

function savePatientSale() 
{
	
	var hashes = window.location.href.split("=");
	
	var totalRow = $("#RowCount").val();
	var pre = 1;
//|| totalRow > 0
	var img = "";
	if (hashes.length == 1 ) 
	{
	for ( var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		value1 = hashes[i].split(',');
	}
	
		var retVal = confirm("Do you want to Save?");
		if (retVal == true) {

			for ( var i = 1; i <= totalRow; i++)
			{
				if ($("#txtProName" + i).val() != "")
				{
					var batchID = $("#textBatchId" + i).val();
							
					if (batchID == "" || batchID == 0)
					{
						alert("Please Enter Proper Proper Product");
						$("#txtProName" + i).focus();
						return false;
					}
				}
			}

			calculateVat();

			var txtDocNo = "";
			if ($('#txtBillNo').val() != null && $('#txtBillNo').val() != "") {
				txtDocNo = $("#txtBillNo").val();
			} else {
				alert("Enter Vou No");
				$('#txtBillNo').focus();
				return false;
			}

			var txtDate = "";
			if ($('#txtDate').val() != null && $('#txtDate').val() != "") {
				txtDate = $("#txtDate").val();
			} else {
				alert("Select Date");
				$('#txtDate').focus();
				return false;
			}

			var patientName = "";
			if ($('#txtPatientName').val() != null
					&& $('#txtPatientName').val() != "") {
				patientName = $("#txtPatientName").val();
			} else {
				alert("Enter Patient Name");
				$('#txtPatientName').focus();
				return false;
			}

			var chequeNum = "";
			if ($('#txtChequeNumber').val() != null
					&& $('#txtChequeNumber').val() != "") {
				chequeNum = $("#txtChequeNumber").val();
			} else {
				chequeNum = "";
			}

			/*
			 * var comment=""; if ($('#txtComment').val() != null &&
			 * $('#txtComment').val() != "") { comment = $("#txtComment").val(); }
			 * else { comment = ""; }
			 */

			var bankName = "";
			if ($('#txtBankName').val() != null
					&& $('#txtBankName').val() != "") {
				bankName = $("#txtBankName").val();
			} else {
				bankName = "";
			}

			var txtCardNo = "";
			if ($('#txtCardNumber').val() != null && $('#txtCardNumber').val() != "") {
				txtCardNo = $("#txtCardNumber").val();
				if ($('#txtBankNameForcard').val() != null && $('#txtBankNameForcard').val() != "") {
					bankName = $("#txtBankNameForcard").val();
				} else {
					bankName = "";
				}  
			} else {
				txtCardNo = "";
			}
			
			var doctorId = 0;
			if ($('#hiddenDoctorId').val() != null
					&& $('#hiddenDoctorId').val() != ""
					&& $('#hiddenDoctorId').val() != "0") {
				doctorId = $("#hiddenDoctorId").val();
			} else {
				alert("Enter Doctor Name");
				$('#searchBox1').focus();
				return false;
			}

			var patientId = 0;
			if ($('#hiddenPatientId').val() != null
					&& $('#hiddenPatientId').val() != "") {
				patientId = $("#hiddenPatientId").val();
			} else {
				alert("Enter Patient Name");
				$('#txtPatientName').focus();
				return false;
			}

			var sponserId = 0;
			if ($('#hiddenSponserId').val() != null
					&& $('#hiddenSponserId').val() != "") {
				sponserId = $("#hiddenSponserId").val();
			}

			var referTo = $('input[name="typeOfpatient"]:checked').val();
		/*	if ($('#hiddenReferTo').val() != null
					&& $('#hiddenReferTo').val() != "") {
				referTo = $("#hiddenReferTo").val();
			}*/

			var doctorName = "";
			if ($('#searchBox1').val() != null && $('#searchBox1').val() != "") {
				doctorName = $("#searchBox1").val();
			} else {
				alert("Enter Doctor Name");
				$('#searchBox1').focus();
				return false;
			}

			var txtNarration = $("#txtNaration").val();
			
			/*var txtPatientSaleId = $("#hiddenPatientSalesBillId").val();*/

			var txtGrossAmt = $("#txtGross").val();

			var txtAdd = $("#txtAdd").val();

			var txtLess = $("#txtLess").val();

			var txtNetAmt = $("#txtNetAmt").val();

			var txtSpecialDisc = $("#txtSpecialDisc").val();

			var txtSurcharge = $("#txtSurCharge").val();

			var txtRount = $("#txtRound").val();

			/* var txtCN = $("#txtCN").val(); */
			var txtCD = "0";
			if ($('#txtCD').val() != null && $('#txtCD').val() != ''
					&& $('#txtCD').val().trim().length > 0) {
				txtCD = $("#txtCD").val();
			}

			/* var txtCNAmt = $("#txtCNAmt").val(); */

			var txtCDAmt = $("#txtCDAmt").val();

			var txtTratmentId = $("#hiddenTreatmentId").val();

			var categoryId = 1;
			if ($('#billCategoryId').val() != null
					&& $('#billCategoryId').val() != ''
					&& $('#billCategoryId').val().trim().length > 0) {
				categoryId = $("#billCategoryId").val();
			}

			var txtAmtRec = 0;
			if ($('#txtAmtReceived').val() != null
					&& $('#txtAmtReceived').val() != ''
					&& $('#txtAmtReceived').val().trim().length > 0) {
				txtAmtRec = $("#txtAmtReceived").val();
			}
			/*
			 * else { alertify.error("Enter Amount Receive");
			 * $('#txtAmtReceived').focus(); return false; }
			 */
			calculatePending();

			var txtAmtBal = 0;
			if ($('#txtAmtBalance').val() != null
					&& $('#txtAmtBalance').val() != ''
					&& $('#txtAmtBalance').val().trim().length > 0) {
				txtAmtBal = $("#txtAmtBalance").val();
			}

			var patientSalePreviousBalance = $("#patientSalePreviousBalance")
					.val();

			var saleType = 0;
			if ($("input[name=patientSaleType]").is(":checked")) {
				saleType = $("input[name=patientSaleType]:checked").val();
			} else {
				alert("Please select Type Sale On MRP/Sale On Cost Prise");
				return false;
			}

			var paymentMode = 0;
			if ($("input[name=patientBillMode]").is(":checked")) {
				paymentMode = $("input[name=patientBillMode]:checked").val();
			} else {
				alert("Please select Type cash/credit");
				return false;
			}
			
			var txtTax5 = 0;
			if ($('#hiddenTax5').val() != null && $('#hiddenTax5').val() != "") {
				txtTax5 = $('#hiddenTax5').val();
			}

			var txtTax55 = 0;
			if ($('#hiddenTax55').val() != null
					&& $('#hiddenTax55').val() != "") {
				txtTax55 = $('#hiddenTax55').val();
			}

			var txtTax12 = 0;
			if ($('#hiddenTax12').val() != null
					&& $('#hiddenTax12').val() != "") {
				txtTax12 = $('#hiddenTax12').val();
			}

			var txtTax0 = 0;
			if ($('#hiddenTax0').val() != null && $('#hiddenTax0').val() != "") {
				txtTax0 = $('#hiddenTax0').val();
			}

			var txtTax6 = 0;
			if ($('#hiddenTax6').val() != null && $('#hiddenTax6').val() != "") {
				txtTax6 = $('#hiddenTax6').val();
			}

			var txtTax135 = 0;
			if ($('#hiddenTax135').val() != null
					&& $('#hiddenTax135').val() != "") {
				txtTax135 = $('#hiddenTax135').val();
			}
			
			var patientTotalVat =0;
			if ($('#hiddenTotalTax').val() != null
					&& $('#hiddenTotalTax').val() != "") {
				patientTotalVat = $('#hiddenTotalTax').val();
			}
			if (totalRow.length < 1) {
				alert("Enter Only Valid data");
				return false;
			}

			var materiallist = {
				ltPatientSaleBill : []
			};

			for ( var i = 1; i < totalRow; i++) {
				var qty = $("#txtQty" + i).val();
				if (qty == "" || qty == 0) {
					alert("Please Enter Proper Quantity in current row");
					$("#txtQty" + i).focus();
					return false;
				}
			}

			for ( var i = 1; i < totalRow; i++) {

				var productName = $("#txtProName" + i).val();

				if ($("#txtProductPrescription" + i).val() == 0) {
					pre = 0;
				}

				if ($("#hiddenProductId" + i).val() != null
						&& $("#hiddenProductId" + i).val() != "") {
					var batchId = 0;
					var productId = 0;
					if ($("#textBatchId" + i).val() != null
							&& $("#textBatchId" + i).val() != "") {
						batchId = $("#textBatchId" + i).val();
					} else {
						alert("Please select Batch");
						$("#textBatch" + i).focus();
						return false;
					}

					if ($("#hiddenProductId" + i).val() != null
							&& $("#hiddenProductId" + i).val() != "") {
						productId = $("#hiddenProductId" + i).val();
					} else {
						alert("Please select Product");
						$("#hiddenProductId" + i).focus();
						return false;
					}

					var batchCode = $("#textBatch" + i).val();

					var batchExpiry = $("#txtExpiry" + i).val();

					var mrp = $("#txtMRP" + i).val();

					var rate = $("#textRate" + i).val();

					var qty = $("#txtQty" + i).val();

					var issueQty = $("#textIssueQty" + i).val();
					if (issueQty == "" || issueQty == null || issueQty == undefined || isNaN(issueQty)) {
						issueQty = qty;
					}
					var ipdOpdId = 0;

					if ($('#txtIpdOpd' + i).val() != null
							&& $('#txtIpdOpd' + i).val() != ''
							&& $('#txtIpdOpd' + i).val().trim().length > 0) {
						ipdOpdId = $("#txtIpdOpd" + i).val();
					}

					var prescriptionId = 0;

					if ($("#txtProductPrescription" + i).val() != null
							&& $("#txtProductPrescription" + i).val() != '')
						prescriptionId = $("#txtProductPrescription" + i).val();
					
					if(prescriptionId==null || prescriptionId=="")
						prescriptionId = 0;
					
					 patientSaleInsertType=0; 
					
					var patientSaleInsertType = "insert";
					
					/*
					 * if (qty == "" || qty == 0) {
					 * 
					 * alertify.error("Please Enter Proper Quantity");
					 * $("#textQty" + i).focus(); return false; }
					 */

					var vat = 0.0;

					vat = $("#textVat" + i).val();
					
					
					
					var txtUnit = $("#txtUnit" + i).val();
					
					var amt = $("#txtAmt" + i).val();

					var ratePerUnit = 0;

					if ($("#textRatePerUnit" + i).val() != null
							&& $("#textRatePerUnit" + i).val() != '') {
						ratePerUnit = $("#textRatePerUnit" + i).val();
					}

					var disc = 0;
					if ($("#textDis" + i).val() != null
							&& $("#textDis" + i).val() != '')
						disc = $("#textDis" + i).val();

					var counterSlaveVatAmt = 0;
					if ($("#textcounterSlaveVatAmt" + i).val() != null
							&& $("#textcounterSlaveVatAmt" + i).val() != '')
						counterSlaveVatAmt = $("#textcounterSlaveVatAmt" + i)
								.val();

					var patientDiscAmt = 0;
					if ($("#textDisAmtPerQty" + i).val() != null
							&& $("#textDisAmtPerQty" + i).val() != '')
						patientDiscAmt = $("#textDisAmtPerQty" + i).val();
					
					var txtPurchaseRate = 0;
					if ($("#textPurchaseRate" + i).val() != null
							&& $("#textPurchaseRate" + i).val() != '') {
						txtPurchaseRate = $("#textPurchaseRate" + i).val();
					}

					materiallist.ltPatientSaleBill.push({
						patientSlaveBatchCode : batchCode,
						patientSaleBatchExpiry : batchExpiry,
						patientSlaveMrp : mrp,
						patientSlaveRate : rate,
						patientSlaveQty : qty,
						patientSlaveDisc : disc,
						patientSlaveAmt : amt,
						patientSlaveBatchId : batchId,
						patientSlaveVat : vat,
						
						patientslaveunit : txtUnit,
						patientSlaveRatePerUnit : ratePerUnit,
						patientSlaveVatAmt : counterSlaveVatAmt,
						patientSaleSlaveIssueQty : issueQty,
						patientSaleSlaveDiscAmt : patientDiscAmt,
						patientSlavePrescriptionId : prescriptionId,
						patientSlaveipdopdId : ipdOpdId,
						patientSlavePurchaseRate : txtPurchaseRate,
						productMaster : {
							'productId' : productId,
							'batchMaster' : [ {
								'batchId' : batchId,
								'stockMaster' : {
									'stockId' : $("#textStockId" + i).val(),
									'stockQtyInHand' : $(
											"#textClStk" + i).val()
								}
							} ]
						}
					});
				}
			}

			if (materiallist.ltPatientSaleBill.length < 1) {
				alert("Please Enter Valid Data");
				return false;
			}

			materiallist = JSON.stringify(materiallist);

			var inputs = [];

			// General Info
			inputs.push("ltPatientSaleBill=" + materiallist);
			
		/*	inputs.push("txtPatientSaleId=" + txtPatientSaleId);*/
			
			/* inputs.push("txtDate=" + txtDate); */
			inputs.push("txtTax5=" + txtTax5);
			inputs.push("txtTax55=" + txtTax55);
			inputs.push("patientSalePreviousBalance="
					+ patientSalePreviousBalance);
			inputs.push("txtTax12=" + txtTax12);
			inputs.push("txtTax0=" + txtTax0);
			inputs.push("txtTratmentId=" + txtTratmentId);

			inputs.push("doctorId=" + doctorId);
			inputs.push("sponserId=" + sponserId);
			inputs.push("referTo=" + referTo);
			inputs.push("doctorName=" + doctorName);
			inputs.push("patientId=" + patientId);
			inputs.push("patientName" + patientName);
			inputs.push("preImage=" + img);
			/* inputs.push("txtCN=" + txtCN); */
			if(txtCD=="" || txtCD==null){
				txtCD=0;
				txtCDAmt=0;
				
			}
		
			inputs.push("txtCD=" + txtCD);
			inputs.push("txtCDAmt=" + txtCDAmt);
			/* inputs.push("txtCNAmt=" + txtCNAmt); */
			inputs.push("txtAdd=" + txtAdd);
			inputs.push("txtGrossAmt=" + txtGrossAmt);
			inputs.push("txtLess=" + txtLess);

			inputs.push("txtDocNo=" + txtDocNo);
			inputs.push("txtDate=" + txtDate);
			inputs.push("txtNarration=" + txtNarration);
			inputs.push("txtNetAmt=" + txtNetAmt);
			inputs.push("txtRound=" + txtRount);

			inputs.push("saleFrom=patientSale");

			inputs.push("txtSpecialDisc=" + txtSpecialDisc);
			inputs.push("txtSurcharge=" + txtSurcharge);

			inputs.push("txtAmtRec=" + txtAmtRec);
			inputs.push("txtAmtBal=" + txtAmtBal);
			inputs.push("paymentMode=" + paymentMode);
			inputs.push("saleType=" + saleType);
			inputs.push("bankName=" + bankName);
			inputs.push("chequeNum=" + chequeNum);
			inputs.push("txtTax6=" + txtTax6);
			inputs.push("txtTax135=" + txtTax135);
			inputs.push("patientSaleInsertType=" + patientSaleInsertType);
			
			inputs.push("txtCategoryId=" + categoryId);
			inputs.push("patientTotalVat=" + patientTotalVat);
			inputs.push("txtCardNo=" + txtCardNo);
			
			/* inputs.push("comment=" + comment); */
			if ($('#txtAmtReceived').val() != null
					&& $('#txtAmtReceived').val() != ''
					&& $('#txtAmtReceived').val().trim().length > 0) {
				if (pre == 1) {

					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "POST",
								data : str,
								/* url : "../indentSale/sampleTest", */
								//10 June 20
								url : "../../pharmacy/patientSale/savePatientSale",
								//url : "../common/saleType",
								catche : false,
								error : function() {
									$("#saveBtn").show();
									alert("oops something went wrong related to stock please save proper data or check mrp");
								},
								success : function(r) {

									if (r.result == 'Error') {
										if (r.batchCode != null
												&& r.batchCode != '') {
											alert("Batch code " + r.batchCode
													+ " stock is not available");
										} else {
											alert("Batch Duplicated ");
										}

									} else {
										alert("Record saved successfully..!");
										window.open(
												"../../pharmacy/patientSale/printView?patientSaleId="
														+ r.id, '_blank');
										window.open("../../pharmacy/patientSale/view-frm", "_self");

									}
								}
							});

				} else {
					takeScreenShot(productName);
				}
			} else {
				alert("Enter Amount Receive");
				$('#txtAmtReceived').focus();
				return false;
			}
		}

	}
}

function savePatientSaleAfterEdit() 
{
	var hashes = window.location.href.split("=");
	var totalRow = $("#RowCount").val();
	var pre = 1;

	var img = "";

	for ( var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		value1 = hashes[i].split(',');
	}
	
		var retVal = confirm("Do you want to Save?");
		if (retVal == true) {

			for ( var i = 1; i <= totalRow; i++)
			{
				if ($("#txtProName" + i).val() != "")
				{
					var batchID = $("#textBatchId" + i).val();
							
					if (batchID == "" || batchID == 0)
					{
						alert("Please Enter Proper Proper Product");
						$("#txtProName" + i).focus();
						return false;
					}
				}
			}

			calculateVat();

			var txtDocNo = "";
			if ($('#txtBillNo').val() != null && $('#txtBillNo').val() != "") {
				txtDocNo = $("#txtBillNo").val();
			} else {
				alert.error("Enter Vou No");
				$('#txtBillNo').focus();
				return false;
			}

			var txtDate = "";
			if ($('#txtDate').val() != null && $('#txtDate').val() != "") {
				txtDate = $("#txtDate").val();
			} else {
				alert.error("Select Date");
				$('#txtDate').focus();
				return false;
			}

			var patientName = "";
			if ($('#txtPatientName').val() != null
					&& $('#txtPatientName').val() != "") {
				patientName = $("#txtPatientName").val();
			} else {
				alert.error("Enter Patient Name");
				$('#txtPatientName').focus();
				return false;
			}

			var chequeNum = "";
			if ($('#txtChequeNumber').val() != null
					&& $('#txtChequeNumber').val() != "") {
				chequeNum = $("#txtChequeNumber").val();
			} else {
				chequeNum = "";
			}

			/*
			 * var comment=""; if ($('#txtComment').val() != null &&
			 * $('#txtComment').val() != "") { comment = $("#txtComment").val(); }
			 * else { comment = ""; }
			 */

			var bankName = "";
			if ($('#txtBankName').val() != null
					&& $('#txtBankName').val() != "") {
				bankName = $("#txtBankName").val();
			} else {
				bankName = "";
			}

			var doctorId = 0;
			if ($('#hiddenDoctorId').val() != null
					&& $('#hiddenDoctorId').val() != ""
					&& $('#hiddenDoctorId').val() != "0") {
				doctorId = $("#hiddenDoctorId").val();
			} else {
				alert.error("Enter Doctor Name");
				$('#searchBox1').focus();
				return false;
			}

			var patientId = 0;
			if ($('#hiddenPatientId').val() != null
					&& $('#hiddenPatientId').val() != "") {
				patientId = $("#hiddenPatientId").val();
			} else {
				alert.error("Enter Patient Name");
				$('#txtPatientName').focus();
				return false;
			}

			var sponserId = 0;
			if ($('#hiddenSponserId').val() != null
					&& $('#hiddenSponserId').val() != "") {
				sponserId = $("#hiddenSponserId").val();
			}

			var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();
			$('#hiddenReferTo').val(typeOfpatient);
			var referTo = "";
			if ($('#hiddenReferTo').val() != null
					&& $('#hiddenReferTo').val() != "") {
				referTo = $("#hiddenReferTo").val();
			}
		
			var doctorName = "";
			if ($('#searchBox1').val() != null && $('#searchBox1').val() != "") {
				doctorName = $("#searchBox1").val();
			} else {
				alert.error("Enter Doctor Name");
				$('#searchBox1').focus();
				return false;
			}

			var txtNarration = $("#txtNaration").val();
			
			var txtPatientSaleId = $("#hiddenPatientSalesBillId").val();

			var txtGrossAmt = $("#txtGross").val();

			var txtAdd = $("#txtAdd").val();

			var txtLess = $("#txtLess").val();

			var txtNetAmt = $("#txtNetAmt").val();

			var txtSpecialDisc = $("#txtSpecialDisc").val();

			var txtSurcharge = $("#txtSurCharge").val();

			var txtRount = $("#txtRound").val();
			
			var patientSaleInsertType=0;
			
			 patientSaleInsertType = "edit";

			/* var txtCN = $("#txtCN").val(); */
			var txtCD = 0;
			if ($('#txtCD').val() != null && $('#txtCD').val() != ''
					&& $('#txtCD').val().trim().length > 0) {
				txtCD = $("#txtCD").val();
			}

			/* var txtCNAmt = $("#txtCNAmt").val(); */

			var txtCDAmt = $("#txtCDAmt").val();

			var txtTratmentId = $("#hiddenTreatmentId").val();

			var categoryId = 1;
			if ($('#billCategoryId').val() != null
					&& $('#billCategoryId').val() != ''
					&& $('#billCategoryId').val().trim().length > 0) {
				categoryId = $("#billCategoryId").val();
			}

			var txtAmtRec = 0;
			if ($('#txtAmtReceived').val() != null
					&& $('#txtAmtReceived').val() != ''
					&& $('#txtAmtReceived').val().trim().length > 0) {
				txtAmtRec = $("#txtAmtReceived").val();
			}
			/*
			 * else { alertify.error("Enter Amount Receive");
			 * $('#txtAmtReceived').focus(); return false; }
			 */
			calculatePending();

			var txtAmtBal = 0;
			if ($('#txtAmtBalance').val() != null
					&& $('#txtAmtBalance').val() != ''
					&& $('#txtAmtBalance').val().trim().length > 0) {
				txtAmtBal = $("#txtAmtBalance").val();
			}

			var patientSalePreviousBalance = $("#patientSalePreviousBalance")
					.val();

			var saleType = 0;
			if ($("input[name=patientSaleType]").is(":checked")) {
				saleType = $("input[name=patientSaleType]:checked").val();
			} else {
				alert
						.error("Please select Type Sale On MRP/Sale On Cost Prise");
				return false;
			}

			var paymentMode = 0;
			if ($("input[name=patientBillMode]").is(":checked")) {
				paymentMode = $("input[name=patientBillMode]:checked").val();
			} else {
				alert.error("Please select Type cash/credit");
				return false;
			}
			
			
			var txtTax5 = 0;
			if ($('#hiddenTax5').val() != null && $('#hiddenTax5').val() != "") {
				txtTax5 = $('#hiddenTax5').val();
			}

			var txtTax55 = 0;
			if ($('#hiddenTax55').val() != null
					&& $('#hiddenTax55').val() != "") {
				txtTax55 = $('#hiddenTax55').val();
			}

			var txtTax12 = 0;
			if ($('#hiddenTax12').val() != null
					&& $('#hiddenTax12').val() != "") {
				txtTax12 = $('#hiddenTax12').val();
			}

			var txtTax0 = 0;
			if ($('#hiddenTax0').val() != null && $('#hiddenTax0').val() != "") {
				txtTax0 = $('#hiddenTax0').val();
			}

			var txtTax6 = 0;
			if ($('#hiddenTax6').val() != null && $('#hiddenTax6').val() != "") {
				txtTax6 = $('#hiddenTax6').val();
			}

			var txtTax135 = 0;
			if ($('#hiddenTax135').val() != null
					&& $('#hiddenTax135').val() != "") {
				txtTax135 = $('#hiddenTax135').val();
			}

			if (totalRow.length < 1) {
				alert("Enter Only Valid data");
				return false;
			}

			var materiallist = {
				ltPatientSaleBill : []
			};

			for ( var i = 1; i < totalRow; i++) {
				var qty = $("#txtQty" + i).val();
				if (qty == "" || qty == 0) {
					alert("Please Enter Proper Quantity in current row");
					$("#txtQty" + i).focus();
					return false;
				}
			}

			for ( var i = 1; i < totalRow; i++) {

				var productName = $("#txtProName" + i).val();

				if ($("#txtProductPrescription" + i).val() == 0) {
					pre = 0;
				}
				else
					pre=1;

				if ($("#hiddenProductId" + i).val() != null
						&& $("#hiddenProductId" + i).val() != "") {
					var batchId = 0;
					var productId = 0;
					if ($("#textBatchId" + i).val() != null
							&& $("#textBatchId" + i).val() != "") {
						batchId = $("#textBatchId" + i).val();
					} else {
						alert.error("Please select Batch");
						$("#textBatch" + i).focus();
						return false;
					}

					if ($("#hiddenProductId" + i).val() != null
							&& $("#hiddenProductId" + i).val() != "") {
						productId = $("#hiddenProductId" + i).val();
					} else {
						alert.error("Please select Product");
						$("#hiddenProductId" + i).focus();
						return false;
					}

					var batchCode = $("#textBatch" + i).val();

					var batchExpiry = $("#txtExpiry" + i).val();

					var mrp = $("#txtMRP" + i).val();

					var rate = $("#textRate" + i).val();

					var qty = $("#txtQty" + i).val();

					var issueQty = $("#textIssueQty" + i).val();

					var ipdOpdId = 0;
					
					var txtpatientSlaveId =null;
					
					if ($('#patientSlaveId' + i).val() != null
							&& $('#patientSlaveId' + i).val() != ''
							&& $('#patientSlaveId' + i).val().trim().length > 0) {
						txtpatientSlaveId = $("#patientSlaveId" + i).val();
					}

					if ($('#txtIpdOpd' + i).val() != null
							&& $('#txtIpdOpd' + i).val() != ''
							&& $('#txtIpdOpd' + i).val().trim().length > 0) {
						ipdOpdId = $("#txtIpdOpd" + i).val();
					}

					var prescriptionId = 0;

					if ($("#txtProductPrescription" + i).val() != null
							&& $("#txtProductPrescription" + i).val() != '')
						prescriptionId = $("#txtProductPrescription" + i).val();
					else
						prescriptionId = 0;

					
					
					/*
					 * if (qty == "" || qty == 0) {
					 * 
					 * alertify.error("Please Enter Proper Quantity");
					 * $("#textQty" + i).focus(); return false; }
					 */

					var vat = 0.0;

					vat = $("#textVat" + i).val();

					var amt = $("#txtAmt" + i).val();

					var ratePerUnit = 0;

					if ($("#textRatePerUnit" + i).val() != null
							&& $("#textRatePerUnit" + i).val() != '') {
						ratePerUnit = $("#textRatePerUnit" + i).val();
					}

					var disc = 0;
					if ($("#textDis" + i).val() != null
							&& $("#textDis" + i).val() != '')
						disc = $("#textDis" + i).val();

					var counterSlaveVatAmt = 0;
					if ($("#textcounterSlaveVatAmt" + i).val() != null
							&& $("#textcounterSlaveVatAmt" + i).val() != '')
						counterSlaveVatAmt = $("#textcounterSlaveVatAmt" + i)
								.val();
					
					if ($('#textDisAmt'+i).val() != '' && $('#textDisAmt'+i).val().length > 0) 
					{
					var	discAmt = parseFloat($('#textDisAmt'+i).val());
						var result = (discAmt / qty);
						$('#textDisAmtPerQty' + i).val((result).toFixed(2));
					} else
						$('#textDisAmtPerQty' + i).val(0);
					
				
					var patientDiscAmt = 0;
					if ($("#textDisAmtPerQty" + i).val() != null
							&& $("#textDisAmtPerQty" + i).val() != '')
						patientDiscAmt = $("#textDisAmtPerQty" + i).val();
					
										
					var txtPurchaseRate = 0;
					if ($("#textPurchaseRate" + i).val() != null
							&& $("#textPurchaseRate" + i).val() != '') {
						txtPurchaseRate = $("#textPurchaseRate" + i).val();
					}
					
					var txtEditQty = 0;
					if ($("#txtEditQty" + i).val() != null
							&& $("#txtEditQty" + i).val() != '') {
						txtEditQty = $("#txtEditQty" + i).val();
					}
				
					materiallist.ltPatientSaleBill.push({
						patientSlaveBatchCode : batchCode,
						patientSaleBatchExpiry : batchExpiry,
						patientSlaveMrp : mrp,
						patientSlaveRate : rate,
						patientSlaveQty : qty,
						patientSlaveDisc : disc,
						patientSlaveAmt : amt,
						patientSlaveBatchId : batchId,
						patientSlaveVat : vat,
						patientSlaveRatePerUnit : ratePerUnit,
						patientSlaveVatAmt : counterSlaveVatAmt,
						patientSaleSlaveIssueQty : issueQty,
						patientSaleSlaveDiscAmt : patientDiscAmt,
						patientSlavePrescriptionId : prescriptionId,
						patientSlaveipdopdId : ipdOpdId,
						patientSlavePurchaseRate : txtPurchaseRate,
						patientSlaveId : txtpatientSlaveId,
						productMaster : {
							'productId' : productId,
							'batchMaster' : [ {
								'batchId' : batchId,
								'stockMaster' : {
									'stockId' : $("#textStockId" + i).val(),
									'stockQtyInHand' : $(
											"#textClStk" + i).val()
								}
							} ]
						}
					});
				}
			}

			if (materiallist.ltPatientSaleBill.length < 1) {
				alert("Please Enter Valid Data");
				return false;
			}

			materiallist = JSON.stringify(materiallist);

			var inputs = [];

			// General Info
			inputs.push("ltPatientSaleBill=" + materiallist);
			
			inputs.push("txtPatientSaleId=" + txtPatientSaleId);
			
			/* inputs.push("txtDate=" + txtDate); */
			inputs.push("txtTax5=" + txtTax5);
			inputs.push("txtTax55=" + txtTax55);
			inputs.push("patientSalePreviousBalance="
					+ patientSalePreviousBalance);
			inputs.push("txtTax12=" + txtTax12);
			inputs.push("txtTax0=" + txtTax0);
			inputs.push("txtTratmentId=" + txtTratmentId);

			inputs.push("doctorId=" + doctorId);
			inputs.push("sponserId=" + sponserId);
			inputs.push("referTo=" + referTo);
			inputs.push("doctorName=" + doctorName);
			inputs.push("patientId=" + patientId);
			inputs.push("patientName" + patientName);
			inputs.push("preImage=" + img);
			/* inputs.push("txtCN=" + txtCN); */
			inputs.push("txtCD=" + txtCD);
			inputs.push("txtCDAmt=" + txtCDAmt);
			/* inputs.push("txtCNAmt=" + txtCNAmt); */
			inputs.push("txtAdd=" + txtAdd);
			inputs.push("txtGrossAmt=" + txtGrossAmt);
			inputs.push("txtLess=" + txtLess);

			inputs.push("txtDocNo=" + txtDocNo);
			inputs.push("txtDate=" + txtDate);
			inputs.push("txtNarration=" + txtNarration);
			inputs.push("txtNetAmt=" + txtNetAmt);
			inputs.push("txtRound=" + txtRount);

			inputs.push("saleFrom=patientSale");

			inputs.push("txtSpecialDisc=" + txtSpecialDisc);
			inputs.push("txtSurcharge=" + txtSurcharge);

			inputs.push("txtAmtRec=" + txtAmtRec);
			inputs.push("txtAmtBal=" + txtAmtBal);
			inputs.push("paymentMode=" + paymentMode);
			inputs.push("saleType=" + saleType);
			inputs.push("bankName=" + bankName);
			inputs.push("chequeNum=" + chequeNum);
			inputs.push("txtTax6=" + txtTax6);
			inputs.push("txtTax135=" + txtTax135);
			inputs.push("patientSaleInsertType=" + patientSaleInsertType);
			
			inputs.push("txtCategoryId=" + categoryId);
			/* inputs.push("comment=" + comment); */
			if ($('#txtAmtReceived').val() != null
					&& $('#txtAmtReceived').val() != ''
					&& $('#txtAmtReceived').val().trim().length > 0) {
				if (pre == 1) {

					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "POST",
								data : str,
								/* url : "../indentSale/sampleTest", */
								//10 June 20
								url : "../../pharmacy/patientSale/savePatientSale",
								//url : "../common/saleType",
								catche : false,
								error : function() {
									$("#saveBtn").show();
									alert("oops something went wrong related to stock please save proper data or check mrp");
								},
								success : function(r) {

									/* var result=jQuery.parseJSON(r); */

									if (r.result == 'Error') {
										if (r.batchCode != null
												&& r.batchCode != '') {
											alert("Batch code " + r.batchCode
													+ " stock is not available");
										} else {
											alert("Batch Duplicated ");
										}

									} else {
										alert("Record saved successfully..!");
										window.open(
												"../../pharmacy/patientSale/printView?patientSaleId="
														+ r.id, '_blank');
										window.open("../../pharmacy/patientSale/view-frm", "_self");

									}
								}
							});

				} else {
					takeScreenShot(productName);
				}
			} else {
				alert("Enter Amount Receive");
				$('#txtAmtReceived').focus();
				return false;
			}
		}

	
}



function savePatientSaleWithImage() {

	var totalRow = $("#RowCount").val();
	if (assignProfilePicture() == true) {
		var hashes = window.location.href.split("=");
		for ( var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			value1 = hashes[i].split(',');
		}

		if (hashes.length == 1) {

			var retVal = confirm("Do you want to Save?");
			if (retVal == true) {
				for ( var i = 1; i <= totalRow; i++) {
					if ($("#txtProName" + i).val() != "") {
						var batchID = $("#textBatchId" + i).val();
						if (batchID == "" || batchID == 0) {
							alert("Please Enter Proper Proper Product");
							$("#txtProName" + i).focus();
							return false;
						}
					}
				}
				calculateVat();

				var txtDocNo = "";
				if ($('#txtBillNo').val() != null
						&& $('#txtBillNo').val() != "") {
					txtDocNo = $("#txtBillNo").val();
				} else {
					alert.error("Enter Vou No");
					$('#txtBillNo').focus();
					return false;
				}

				var txtDate = "";
				if ($('#txtDate').val() != null && $('#txtDate').val() != "") {
					txtDate = $("#txtDate").val();
				} else {
					alert.error("Select Date");
					$('#txtDate').focus();
					return false;
				}

				var patientName = "";
				if ($('#txtPatientName').val() != null
						&& $('#txtPatientName').val() != "") {
					patientName = $("#txtPatientName").val();
				} else {
					alert.error("Enter Patient Name");
					$('#txtPatientName').focus();
					return false;
				}

				var chequeNum = "";
				if ($('#txtChequeNumber').val() != null
						&& $('#txtChequeNumber').val() != "") {
					chequeNum = $("#txtChequeNumber").val();
				} else {
					chequeNum = "";
				}

				var bankName = "";
				if ($('#txtBankName').val() != null
						&& $('#txtBankName').val() != "") {
					bankName = $("#txtBankName").val();
				} else {
					bankName = "";
				}

				var doctorId = 0;
				if ($('#hiddenDoctorId').val() != null
						&& $('#hiddenDoctorId').val() != ""
						&& $('#hiddenDoctorId').val() != "0") {
					doctorId = $("#hiddenDoctorId").val();
				} else {
					alert.error("Enter Doctor Name");
					$('#searchBox1').focus();
					return false;
				}

				var patientId = 0;
				if ($('#hiddenPatientId').val() != null
						&& $('#hiddenPatientId').val() != "") {
					patientId = $("#hiddenPatientId").val();
				} else {
					alert.error("Enter Patient Name");
					$('#txtPatientName').focus();
					return false;
				}

				var sponserId = 0;
				if ($('#hiddenSponserId').val() != null
						&& $('#hiddenSponserId').val() != "") {
					sponserId = $("#hiddenSponserId").val();
				}

				var referTo = "";
				if ($('#hiddenReferTo').val() != null
						&& $('#hiddenReferTo').val() != "") {
					referTo = $("#hiddenReferTo").val();
				}

				var doctorName = "";
				if ($('#searchBox1').val() != null
						&& $('#searchBox1').val() != "") {
					doctorName = $("#searchBox1").val();
				} else {
					alert.error("Enter Doctor Name");
					$('#searchBox1').focus();
					return false;
				}
				var img = "";
				if ($('#capturedImage').attr('value') != "")
					img = $('#capturedImage').attr('value');
				else
					alert("Capture images");

				var txtNarration = $("#txtNaration").val();

				var txtGrossAmt = $("#txtGross").val();

				var txtAdd = $("#txtAdd").val();

				var txtLess = $("#txtLess").val();

				var txtNetAmt = $("#txtNetAmt").val();

				var txtSpecialDisc = $("#txtSpecialDisc").val();

				var txtSurcharge = $("#txtSurCharge").val();

				var txtRount = $("#txtRound").val();

				var txtCD = $("#txtCD").val();

				var txtCDAmt = $("#txtCDAmt").val();

				var txtTratmentId = $("#hiddenTreatmentId").val();
				
				patientSaleInsertType=0; 
				var patientSaleInsertType = "insert";

				var categoryId = 1;
				if ($('#billCategoryId').val() != null
						&& $('#billCategoryId').val() != ''
						&& $('#billCategoryId').val().trim().length > 0) {
					categoryId = $("#billCategoryId").val();
				}

				var txtAmtRec = 0;
				if ($('#txtAmtReceived').val() != null
						&& $('#txtAmtReceived').val() != ''
						&& $('#txtAmtReceived').val().trim().length > 0) {
					txtAmtRec = $("#txtAmtReceived").val();
				}
				calculatePending();

				var txtAmtBal = 0;
				if ($('#txtAmtBalance').val() != null
						&& $('#txtAmtBalance').val() != ''
						&& $('#txtAmtBalance').val().trim().length > 0) {
					txtAmtBal = $("#txtAmtBalance").val();
				}

				var patientSalePreviousBalance = $(
						"#patientSalePreviousBalance").val();

				var saleType = 0;
				if ($("input[name=patientSaleType]").is(":checked")) {
					saleType = $("input[name=patientSaleType]:checked").val();
				} else {
					alert
							.error("Please select Type Sale On MRP/Sale On Cost Prise");
					return false;
				}

				var paymentMode = 0;
				if ($("input[name=patientBillMode]").is(":checked")) {
					paymentMode = $("input[name=patientBillMode]:checked")
							.val();
				} else {
					alert.error("Please select Type cash/credit");
					return false;
				}

				var txtTax5 = 0;
				if ($('#hiddenTax5').val() != null
						&& $('#hiddenTax5').val() != "") {
					txtTax5 = $('#hiddenTax5').val();
				}

				var txtTax55 = 0;
				if ($('#hiddenTax55').val() != null
						&& $('#hiddenTax55').val() != "") {
					txtTax55 = $('#hiddenTax55').val();
				}

				var txtTax12 = 0;
				if ($('#hiddenTax12').val() != null
						&& $('#hiddenTax12').val() != "") {
					txtTax12 = $('#hiddenTax12').val();
				}

				var txtTax0 = 0;
				if ($('#hiddenTax0').val() != null
						&& $('#hiddenTax0').val() != "") {
					txtTax0 = $('#hiddenTax0').val();
				}

				var txtTax6 = 0;
				if ($('#hiddenTax6').val() != null
						&& $('#hiddenTax6').val() != "") {
					txtTax6 = $('#hiddenTax6').val();
				}

				var txtTax135 = 0;
				if ($('#hiddenTax135').val() != null
						&& $('#hiddenTax135').val() != "") {
					txtTax135 = $('#hiddenTax135').val();
				}

				if (totalRow.length < 1) {
					alert("Enter Only Valid data");
					return false;
				}

				var materiallist = {
					ltPatientSaleBill : []
				};

				for ( var i = 1; i < totalRow; i++) {

					if ($("#hiddenProductId" + i).val() != null
							&& $("#hiddenProductId" + i).val() != "") {
						var batchId = 0;
						var productId = 0;
						if ($("#textBatchId" + i).val() != null
								&& $("#textBatchId" + i).val() != "") {
							batchId = $("#textBatchId" + i).val();
						} else {
							alert.error("Please select Batch");
							$("#textBatch" + i).focus();
							return false;
						}

						if ($("#hiddenProductId" + i).val() != null
								&& $("#hiddenProductId" + i).val() != "") {
							productId = $("#hiddenProductId" + i).val();
						} else {
							alert.error("Please select Product");
							$("#hiddenProductId" + i).focus();
							return false;
						}

						var batchCode = $("#textBatch" + i).val();

						var batchExpiry = $("#txtExpiry" + i).val();

						var mrp = $("#txtMRP" + i).val();

						var rate = $("#textRate" + i).val();

						var qty = $("#txtQty" + i).val();

						var issueQty = $("#textIssueQty" + i).val();

						var ipdOpdId = 0;

						if ($('#txtIpdOpd' + i).val() != null
								&& $('#txtIpdOpd' + i).val() != ''
								&& $('#txtIpdOpd' + i).val().trim().length > 0) {
							ipdOpdId = $("#txtIpdOpd" + i).val();
						}

						var prescriptionId = 0;

						if ($("#txtProductPrescription" + i).val() != null
								&& $("#txtProductPrescription" + i).val() != '')
							prescriptionId = $("#txtProductPrescription" + i)
									.val();
						else
							prescriptionId = 0;

						if (qty == "" || qty == 0) {

							alert.error("Please Enter Proper Quantity");
							$("#textQty" + i).focus();
							return false;
						}

						var vat = 0.0;

						vat = $("#textVat" + i).val();

						var amt = $("#txtAmt" + i).val();

						var ratePerUnit = 0;

						if ($("#textRatePerUnit" + i).val() != null
								&& $("#textRatePerUnit" + i).val() != '') {
							ratePerUnit = $("#textRatePerUnit" + i).val();
						}

						var disc = 0;
						if ($("#textDis" + i).val() != null
								&& $("#textDis" + i).val() != '')
							disc = $("#textDis" + i).val();

						var counterSlaveVatAmt = 0;
						if ($("#textcounterSlaveVatAmt" + i).val() != null
								&& $("#textcounterSlaveVatAmt" + i).val() != '')
							counterSlaveVatAmt = $(
									"#textcounterSlaveVatAmt" + i).val();

						var patientDiscAmt = 0;
						if ($("#textDisAmtPerQty" + i).val() != null
								&& $("#textDisAmtPerQty" + i).val() != '')
							patientDiscAmt = $("#textDisAmtPerQty" + i).val();
						
						var txtPurchaseRate = 0;
						if ($("#textPurchaseRate" + i).val() != null
								&& $("#textPurchaseRate" + i).val() != '') {
							txtPurchaseRate = $("#textPurchaseRate" + i).val();
						}
						
						if (patientDiscAmt == "" || patientDiscAmt == null || patientDiscAmt == undefined || isNaN(patientDiscAmt)) {
							patientDiscAmt = 0;
						}
						
						materiallist.ltPatientSaleBill
								.push({
									patientSlaveBatchCode : batchCode,
									patientSaleBatchExpiry : batchExpiry,
									patientSlaveMrp : mrp,
									patientSlaveRate : rate,
									patientSlaveQty : qty,
									patientSlaveDisc : disc,
									patientSlaveAmt : amt,
									patientSlaveBatchId : batchId,
									patientSlaveVat : vat,
									patientSlaveRatePerUnit : ratePerUnit,
									patientSlaveVatAmt : counterSlaveVatAmt,
									patientSaleSlaveIssueQty : issueQty,
									patientSaleSlaveDiscAmt : patientDiscAmt,
									patientSlavePrescriptionId : prescriptionId,
									patientSlaveipdopdId : ipdOpdId,
									patientSlavePurchaseRate : txtPurchaseRate,
									productMaster : {
										'productId' : productId,
										'batchMaster' : [ {
											'batchId' : batchId,
											'stockMaster' : {
												'stockId' : $(
														"#textStockId" + i)
														.val(),
												'stockQtyInHand' : $(
														"#textStockQtyInHand"
																+ i).val()
											}
										} ]
									}
								});
					}
				}

				if (materiallist.ltPatientSaleBill.length < 1) {
					alert("Please Enter Valid Data");
					return false;
				}

				materiallist = JSON.stringify(materiallist);

				var inputs = [];

				inputs.push("ltPatientSaleBill=" + materiallist);
				inputs.push("txtTax5=" + txtTax5);
				inputs.push("preImage=" + img);
				inputs.push("txtTax55=" + txtTax55);
				inputs.push("patientSalePreviousBalance="
						+ patientSalePreviousBalance);
				inputs.push("txtTax12=" + txtTax12);
				inputs.push("txtTax0=" + txtTax0);
				inputs.push("txtTratmentId=" + txtTratmentId);

				inputs.push("doctorId=" + doctorId);
				inputs.push("sponserId=" + sponserId);
				inputs.push("referTo=" + referTo);
				inputs.push("doctorName=" + doctorName);
				inputs.push("patientId=" + patientId);
				inputs.push("patientName" + patientName);

				inputs.push("txtCD=" + txtCD);
				inputs.push("txtCDAmt=" + txtCDAmt);
				inputs.push("txtAdd=" + txtAdd);
				inputs.push("txtGrossAmt=" + txtGrossAmt);
				inputs.push("txtLess=" + txtLess);

				inputs.push("txtDocNo=" + txtDocNo);
				inputs.push("txtDate=" + txtDate);
				inputs.push("txtNarration=" + txtNarration);
				inputs.push("txtNetAmt=" + txtNetAmt);
				inputs.push("txtRound=" + txtRount);

				inputs.push("saleFrom=patientSale");

				inputs.push("txtSpecialDisc=" + txtSpecialDisc);
				inputs.push("txtSurcharge=" + txtSurcharge);

				inputs.push("txtAmtRec=" + txtAmtRec);
				inputs.push("txtAmtBal=" + txtAmtBal);
				inputs.push("paymentMode=" + paymentMode);
				inputs.push("saleType=" + saleType);
				inputs.push("bankName=" + bankName);
				inputs.push("chequeNum=" + chequeNum);
				inputs.push("txtTax6=" + txtTax6);
				inputs.push("txtTax135=" + txtTax135);
				inputs.push("txtCategoryId=" + categoryId);
				inputs.push("patientSaleInsertType=" + patientSaleInsertType);
				
				if ($('#txtAmtReceived').val() != null
						&& $('#txtAmtReceived').val() != ''
						&& $('#txtAmtReceived').val().trim().length > 0) {

					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "POST",
								data : str,
								//url : "../common/saleType",
								//10 June 20
								url : "../../pharmacy/patientSale/savePatientSale",
								catche : false,
								error : function() {
									$("#saveBtn").show();
									alert("oops something went wrong related to stock please save proper data or check mrp");
								},
								success : function(r) {

									if (r.result == 'Error') {
										if (r.batchCode != null
												&& r.batchCode != '') {
											alert("Batch code " + r.batchCode
													+ " stock is not available");
										} else {
											alert("Batch Duplicated ");
										}

									} else {
										alert("Record saved successfully..!");
										window.open(
												"/EhatEnterprise/pharmacy/patientSale/printView?patientSaleId="
														+ r.id, '_blank');
										location.reload(true);

									}
								}
							});
				} else {
					alert("Enter Amount Receive");
					$('#txtAmtReceived').focus();
					return false;
				}
			}

		}
	}
}

function takeScreenShot(productName) {
	/* $('#cameraModal').modal('show'); */
	$("#cameraModal").show('show');
	$('#txtProductData').html(
			" <h7><b>Capture image for  </b></h7>" + productName
					+ "<h7><b>   product</b></h7>");
	assignCamera();
}

function splitTreatmentData(content) {
	var arr = content.split("#");
	$('#hiddenTreatmentId1').val(arr[1]);
	displayAllPatientData();
}

function displayPatientPendingPopUp() {
	$("#Patient_Sales_pending_data").show();
	/* fetchPendingPatientData(); */
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

function fetchPatientPriscription() {
	var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();
	var patientId = $("#hiddenPatientId").val();
	/*
	 * alert("PatientId"+patientId); alert("Type"+typeOfpatient);
	 */
	if (typeOfpatient == "ipd") {
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : {
						PatientId : patientId
					},
					//url : "../../pharmacy/patientSale/getPrescriptionByIpdPatientId",
					url : "../../pharmacy/patientSale/getPrescriptionByOpdPatientId",
					
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						setAllPrescription(r);
					}
				});
		return true;

	} else if (typeOfpatient == "opd") {
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : {
						PatientId : patientId
					},
					url : "../../pharmacy/patientSale/getPrescriptionByOpdPatientId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						setAllPrescription(r);
					}
				});
		return true;

	} else {
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : {
						PatientId : patientId
					},
					url : "../../pharmacy/patientSale/getPrescriptionByEntirePatientId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						setAllPrescription(r);
					}
				});
		return true;
	}

}
function selectAllPrescription() {
	$(".selectProduct").prop('checked', true);

}

function unSelectAllPrescription() {
	$(".selectProduct").prop('checked', false);
}

function setAllPrescription(r) {
	var divContent = "";
	divContent = divContent
			+ "<div style='float:right'><button onclick='setPrescriptionData()' class='btn btn-xs btn-info'>OK</button> <button class='btn btn-xs btn-danger' onclick='selectAllPrescription()' type='button'>Select All</button> <button class='btn btn-xs btn-success' onclick='unSelectAllPrescription()' type='button'>UnSelect All</button></div><table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Preparation</th><th>Medicine Name</th><th>Strength</th><th>Dose Type</th><th>Qty</th><th>Frequency</th><th>Days</th><th>Select</th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {
		if(parseInt(r[i].unit)>0)
		divContent = divContent + "<tbody><tr><td id='preparationName" + i
				+ "'>" + r[i].preparationName + "</td><td id='medicinName" + i
				+ "'>" + r[i].medicinName + "</td><td id='strengthName" + i
				+ "'>" + r[i].strengthName + "</td><td id='doseType" + i + "'>"
				+ r[i].doseType + "</td><td id='unitdata" + i + "'>"
				+ r[i].unit + "</td><td id='freq" + i + "'>" + r[i].frequency
				+ "</td><td id='day" + i + "'>" + r[i].days + "</td> "
				+ "<td id='productId" + i + "' style='display:none'>"
				+ r[i].productId + "</td><td id='productUnit" + i
				+ "' style='display:none'>" + r[i].productUnit
				+ "</td><td id='productComp" + i + "' style='display:none'>"
				+ r[i].compName + "</td><td id='productPack" + i
				+ "' style='display:none'>" + r[i].packName
				+ "</td><td id='productShelf" + i + "' style='display:none'>"
				+ r[i].shelfName + "</td><td id='categoryId" + i + "' value='"
				+ r[i].catId + "' style='display:none'>" + r[i].catId
				+ "</td><td id='ipdOpdId" + i + "' value='"
				+ r[i].patientSlaveipdopdId + "' style='display:none'>"
				+ r[i].patientSlaveipdopdId + "</td><td id='treatmentId" + i
				+ "' style='display:none'>" + r[i].treatmentId
				+ "</td><td id='prescriptionId" + i + "' style='display:none'>"
				+ r[i].prescriptionId
				+ "</td><td><input type='checkbox' id='selectProduct" + i
				+ "' class='selectProduct' name='selectProduct' value='" + i
				+ "'></td></tr>";

	}
	divContent = divContent + "</table>";

	$("#indentPendingData").html(divContent);
}

function setPrescriptionData() {
	var favorite = [];

	/*
	 * var Id = $("input[name='selectProduct']:checked").val();
	 * $("#hiddenTreatmentId").val($('#treatmentId' + Id).html());
	 */

	$.each($("input[name='selectProduct']:checked"), function() {
		favorite.push($(this).val());
	});

	if (favorite.length == 0) {
		alert("Select atleast one record");
	} else {
		var divContent = "";
		var rowCount = 1;
		var currentRowCount = 0;
		for ( var i = 0; i < favorite.length; i++) {
			var discount = 0;
			var productName = $('#medicinName' + favorite[i]).html();
			var productId = $('#productId' + favorite[i]).html();
			var qty = parseInt($('#unitdata' + favorite[i]).html());
			var productUnitData = $('#productUnit' + favorite[i]).html();
			var packNameData = $('#productPack' + favorite[i]).html();
			var compNameData = $('#productComp' + favorite[i]).html();
			var shelfNameData = $('#productShelf' + favorite[i]).html();

			var prescriptionData = $('#prescriptionId' + favorite[i]).html();
			
			var ipdOpdId = $('#ipdOpdId' + favorite[i]).html();

			/*
			 * alert($("#hiddenSponserFlag").val());
			 * 
			 * alert($('#categoryId' + favorite[i]).html());
			 */

			var catId = $('#categoryId' + favorite[i]).html();

			/*if ($("#hiddenSponserFlag").val() == 'ACTIVE') 
			{
				if ($("#hiddenTreatmentFlag").val() == 'ACTIVE') 
				{
					for ( var j = 0; j < patientSaleparseData.result.length; j++) 
					{
						if (catId == patientSaleparseData.result[j].pharma_category_id) 
						{
							discount = patientSaleparseData.result[j].discount_in_percent;
                     
							break;
						}
					}
				}
			}*/
			
			discount=spDisc;

			currentRowCount++;
			divContent = divContent
					+ "<input type='hidden' id='hiddenCurrentRow' value='"
					+ currentRowCount
					+ "'>"
					+ "<tr id='remove"
					+ rowCount
					+ "'><td><label class='input-SmallText'>"
					+ (rowCount)
					+ "</label></td>"

					+ "<td><input class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNoDelete' id='textBarcode"
					+ rowCount
					+ "' type='text'  onblur=fetchProductNameByBarcode(this.value,"
					+ rowCount
					+ ") onkeydown=clearBarcode("
					+ rowCount
					+ ",event)></td>"

					+ "<td><input type='hidden' name='ltPatientSaleBill["
					+ i
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "' value='"
					+ productId
					+ "'>"

					+ "<input data-toggle='modal' data-target='#Patient_PopUp_Form' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' onclick='load("
					+ rowCount
					+ ")' id='txtProName"
					+ rowCount
					+ "' type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ i
					+ "].productMaster.productName' value='"
					+ productName
					+ "' ></td>"

					+ "<td><input type='text'  id='txtUnit"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ i
					+ "].productMaster.productUnit' readonly='true' value='"
					+ parseInt(productUnitData)
					+ "' ></td>"

					+ "<td style='display: none;'><input type='text' id='txtShelfNo"
					+ rowCount
					+ "' class='form-control input-SmallText'  value='"
					+ shelfNameData
					+ "' readonly='true' ></td>"

					+ "<td style='display: none;'><input type='text' id='txtPrescription"
					+ rowCount
					+ "' class='form-control input-SmallText'  value='"
					+ prescriptionData
					+ "' readonly='true' ></td>"
					
					+ "<td style='display:none;'><input type='hidden' name='' id='hiddenCategoryId"
					+ rowCount
					+ "' value='"
					+ catId
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtProductPrescription"
					+ rowCount
					+ "' readonly='true' value='"
					+ prescriptionData
					+ "' readonly='true' ></td>"

					
					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPerRatePerUnitFlag"
					+ rowCount
					+ "' readonly='true' ></td>"
					+ "<td style=display:none;></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtEditQty"
					+ rowCount
					+ "' readonly='true' ></td>"
					
					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtIpdOpd"
					+ rowCount
					+ "' readonly='true' value='"
					+ ipdOpdId
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' id='txtPack"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ i
					+ "].productMaster.packingMaster.packType' readonly='true' value='"
					+ packNameData
					+ "' ></td>"
					
					+ "<td><input type='text' id='txtPre"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ i
					+ "].productMaster.preparationMaster.preparationName' readonly='true' value='' ></td>"

					+ "<td><input type='text' id='txtComp"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ i
					+ "].productMaster.companyMaster.compShortName' readonly='true' value='"
					+ compNameData
					+ "' ></td>"

					+ "<td>"
					+"<input type='text' id='textVat"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveVat'  readonly='true'>"
					
					+"<input type='hidden'name='ltPatientSaleBill["
					+ rowCount
					+ "].patientSlavvatid'  class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='hiddenvatId"
					+ rowCount
					+ "' readonly='true' >" 
					
					+"</td>"

					+ "<td><input type='text' id='textBatch"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveBatchCode' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
					+ i
					+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
					+ i
					+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
					+ i
					+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textRatePerUnit"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textTotalStk"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textDisAmt"
					+ rowCount
					+ "' class='form-control input-SmallText'  readonly='true'></td>"

					+ "<td style='display:none;'><input type='text'  id='textDisAmtPerQty"
					+ rowCount
					+ "' name='ltPatientSaleBill["
					+ i
					+ "].patientSaleSlaveDiscAmt' class='form-control input-SmallText'></td>"

					+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
					+ i
					+ "].patientSaleSlaveIssueQty' readonly id='textIssueQty"
					+ rowCount
					+ "' class='form-control input-SmallText' value='"
					+ qty
					+ "' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textcounterSlaveVatAmt"
					+ rowCount
					+ "' class='form-control input-SmallText' name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveVatAmt' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textPurchaseRate"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true' name='ltPatientSaleBill["
					+ i
					+ "].patientSlavePurchaseRate' ></td>"

					+ "<td style='display:none;'><input type='text' id='textRateForPrint"
					+ rowCount
					+ "' name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveRatePerUnit' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td><input type='text' id='txtExpiry"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='ltPatientSaleBill["
					+ i
					+ "].patientSaleBatchExpiry' readonly='true'></td>"

					+ "<td style='display: none;'><input type='text' id='txtShelfNo"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true' ></td>"

					+ "<td><input type='text' id='txtMRP"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveMrp' readonly='true' ></td>"

					+ "<td><input type='text' id='textDis"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveDisc'   value='"
					+ discount
					+ "' ></td>"

					+ "<td><input type='text' id='textClStk"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' readonly='true'></td>"

					+ "<td><input type='text'   name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveQty' id='txtQty"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' onblur=isNumber('txtQty"
					+ rowCount
					+ "'),calculateAmt("
					+ rowCount
					+ ") ,calculatet();  value='"
					+ qty
					+ "' ></td>"

					+ "<td style='display: none;'><input type='text'  name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveRate'  id='textRate"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  readonly='true'></td>"

					+ "<td><input type='text'  name='ltPatientSaleBill["
					+ i
					+ "].patientSlaveAmt' id='txtAmt"
					+ rowCount
					+ "' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  readonly='true'></td>"
					+ "<td><input type='checkbox' class='form-control input-SmallText # deleteGroup"
					+ rowCount + " # textNo' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";

			+"</tr>";
			$('#RowCount').val(rowCount);
			rowCount++;

			totalRowCount++;
		}
		divContent = divContent + "";
		$('#DRRDiv').html(divContent);
		//addBlankRow('RowCount', parseInt(rowCount) - 1);

	}
	$("#patient_prescription_data").modal('hide');
}

function addBlankRow(RowCount, currentRowCount) {

	var currentRow = currentRowCount;

	if (currentRow == undefined) {
		currentRow = 0;
	}

	var j = 1;

	var rowCount = $('#' + RowCount).val();
	if (rowCount == undefined) {
		rowCount = 1;
	}

	if (rowCount == -1) {
		rowCount = 0;
	}

	if (rowCount == currentRow) {
		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		var index = parseInt(rowCount) - 1;

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td style='display:none;'><input type='hidden' name='ltPatientSaleBill["
				+ index
				+ "].productMaster.productId' id='hiddenProductId"
				+ rowCount
				+ "' />"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textRatePerUnit"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
				+ rowCount
				+ "' readonly='true' name='ltPatientSaleBill["
				+ index
				+ "].patientSlavePurchaseRate' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtPrescription"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtProductPrescription"
				+ rowCount
				+ "' readonly='true' ></td>"

				
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPerRatePerUnitFlag"
				+ rowCount
				+ "' readonly='true' ></td>"
				
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtEditQty"
				+ rowCount
				+ "' readonly='true' ></td>"

				
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtIpdOpd"
				+ rowCount
				+ "' readonly='true'  readonly='true' ></td>"

				+ "<td style='display:none;'><input type='text'  id='textDisAmt"
				+ rowCount
				+ "' class='form-control input-SmallText'></td>"

				+ "<td style='display:none;'><input type='text'  id='textDisAmtPerQty"
				+ rowCount
				+ "' name='ltPatientSaleBill["
				+ index
				+ "].patientSaleSlaveDiscAmt' class='form-control input-SmallText'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNoDelete'  id='textBarcode"
				+ rowCount
				+ "'  autocomplete='off' maxlength='150' onblur=fetchProductNameByBarcode(this.value,"
				+ rowCount
				+ ") onkeydown=clearBarcode("
				+ rowCount
				+ "),event)></td>"

				+ "<td><input id='txtProName"
				+ rowCount
				+ "' name='ltPatientSaleBill["
				+ index
				+ "].productMaster.productName'"
				+ " type='text' data-toggle='modal' data-target='#Patient_PopUp_Form' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo' onclick='load("
				+ rowCount
				+ ")'  onkeypress='load("
				+ rowCount
				+ ")' ></td>"

				+ "<td style='display:none;'><input type='text' id='textRateForPrint"
				+ rowCount
				+ "' name='ltPatientSaleBill["
				+ index
				+ "].patientSlaveRatePerUnit' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td style='display:none;'><input type='text' id='textcounterSlaveVatAmt"
				+ rowCount
				+ "' name='ltPatientSaleBill["
				+ index
				+ "].patientSlaveVatAmt' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td><input type='text' name='ltPatientSaleBill["
				+ index
				+ "].productMaster.productUnit' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo' id='txtUnit"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo' name='ltPatientSaleBill["
				+ index
				+ "].productMaster.packingMaster.packType' id='txtPack"
				+ rowCount
				+ "' readonly='true'></td>"
				
				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo' name='ltPatientSaleBill["
				+ index
				+ "].productMaster.preparationMaster.preparationName' id='txtPre"
				+ rowCount
				+ "' readonly='true'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  name='ltPatientSaleBill["
				+ index
				+ "].productMaster.companyMaster.compName' id='txtComp"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
				+ index
				+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
				+ index
				+ "].patientSaleSlaveIssueQty' readonly id='textIssueQty"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
				+ index
				+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
				+ index
				+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td><input type='text'name='ltPatientSaleBill["
				+ index
				+ "].patientSlaveVat'  class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  id='textVat"
				+ rowCount
				+ "' readonly='true'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  name='ltPatientSaleBill["
				+ index
				+ "].patientSlaveBatchCode'  id='textBatch"
				+ rowCount
				+ "' readonly='true'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  id='txtExpiry"
				+ rowCount
				+ "' name='ltPatientSaleBill["
				+ index
				+ "].patientSaleBatchExpiry' readonly='true'></td>"

				/*
				 * + "<td><input type='text' class='form-control
				 * input-SmallText' id='txtShelfNo" + rowCount + "'
				 * readonly='true'></td>"
				 */

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  id='txtMRP"
				+ rowCount
				+ "'  name='ltPatientSaleBill["
				+ index
				+ "].patientSlaveMrp' readonly='true'></td>"

				+ "<td><input type='text'  id='textDis"
				+ rowCount
				+ "'  readonly='true'  class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  id='textClStk"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  name='ltPatientSaleBill["
				+ index
				+ "].patientSlaveQty' onblur=isNumber('txtQty"
				+ rowCount
				+ "'),calculateAmt("
				+ rowCount
				+ "),calculatet();  id='txtQty"
				+ rowCount
				+ "' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  name='ltPatientSaleBill["
				+ index
				+ "].patientSlaveRate' id='textRate"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo'  id='txtAmt"
				+ rowCount
				+ "' name='ltPatientSaleBill["
				+ index
				+ "].patientSlaveAmt' readonly='true' ></td>"
				+ "<td><input type='checkbox'  class='form-control input-SmallText # deleteGroup"
				+ rowCount
				+ " # textNo' name='deleteGroup' value='"
				+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
		+"</tr>";
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		totalRowCount++;

		/* calculateAmount(currentRowCount); */
	}

}

function autoSuggestionForPateintName1(inputID, typeauto) {
	var typeOfpatient = $('input[name="typeOfpatient1"]:checked').val();
	var inputs = [];

	if (typeOfpatient == "diagnosis") {
		inputs.push('isEdit=yes');
	} else {
		inputs.push('isEdit=no');
	}


	// alert(typeOfpatient);

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	/*
	 * if(typeOfpatient==null ||typeOfpatient==""||typeOfpatient==undefined) {
	 * return false; }
	 */
	// alert("text value is:"+txtVal1);
	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		//inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/fetchPharmaPatientNameAutoSuggest",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {

					},
					success : function(r) {

						// alert(r.length);
						var availableTags = [];

						//ajaxResponse = eval('(' + r + ')');

						for ( var i = 0; i < r.length; i++) {

							availableTags
							.push(r[i].f_name
									+ " "
									+ r[i].m_name
									+ " "
									+ r[i].l_name	
									+ "__"
									+ r[i].patientId
									+ "_"
									+ r[i].treatmentId
									+ "_"
									+ r[i].mobile);
						}

						// availableTags = ajaxResponse.split("\n");

						var template = "";
						for ( var j = 0; j < r.length; j++) {
							var arrValue = (r[j]).split("__");
							var idValue = (arrValue[1]);
							resultData.push({
								ID : idValue,
								Name : arrValue[0]
							});

							template = template + '<li data-value="'
									+ (arrValue[1]) + '" class=""><a href="#">'
									+ arrValue[0] + '</a></li>';

						}
						/* $(".typeahead").html(template); */
						$("#div" + inputID + " .typeahead").html(template);
						/* $(".typeahead").show(); */

						setTimeout(
								function() {
									$('#' + inputID).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult2,
										scrollBar : true,

									});
									$("#txtPatientName1").data('typeahead').source = resultData;
								}, 500);

					}
				});

	}

}
function displayResult2(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId1').val(content[0]);

	
}

function splitContentOfPatient(result)
{

	var data = result.split("__");
	
	$("#txtPatientName").val(data[0]);
	var content = data[1].split("_");
	
	$('#hiddenPatientId').val(content[0]);

	/* getCreditBills(content[0]); */
	getPatientInformation(content[0]);
	getTreatmentId(content[0]);
	getDoctorInformation(content[0]);
	getSponsorDetails(content[0]);
}

function splitContentOfPatientList(result)
{
	var data = result.split("__");
	$("#txtPatientName1").val(data[0]);
	
	var content = data[1].split("_");
	$("#hiddenPatientId1").val(content[0]);
	
}

function autoSuggestionForPateintName(inputID, typeauto) {

	var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();
	var inputs = [];

	if (typeOfpatient == "all") {
		inputs.push('isEdit=yes');
	} else {
		inputs.push('isEdit=no');
	}

	$('#hiddenReferTo').val(typeOfpatient);
	// alert(typeOfpatient);

	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	/*
	 * if(typeOfpatient==null ||typeOfpatient==""||typeOfpatient==undefined) {
	 * return false; }
	 */
	// alert("text value is:"+txtVal1);
	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

		//inputs.push('action=fetchPharmaPateintNameAutosugg');
		inputs.push('patientName=' + txtVal1);
		inputs.push('typeOfpatient=' + typeOfpatient);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/fetchPharmaPatientNameAutoSuggest",
					cache : false,
					error : function() {

					},
					success : function(r) {

						// alert(r.length);
						var availableTags = [];

						//ajaxResponse = eval('(' + r + ')');

						for ( var i = 0; i < r.length; i++) {

							availableTags
							.push(r[i].f_name
									+ " "
									+ r[i].m_name
									+ " "
									+ r[i].l_name	
									+ "__"
									+ r[i].patientId
									+ "_"
									+ r[i].treatmentId
									+ "_"
									+ r[i].mobile);
						}

						// availableTags = ajaxResponse.split("\n");

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
						/* $(".typeahead").html(template); */
						$(".typeaheadPatientSale").html(template);
						$(".typeaheadPatientSale").show();
						
						/* $(".typeahead").show(); */

						setTimeout(
								function() {
									$(".typeaheadPatientSale").typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult1,
										scrollBar : true,
									});
									$(".typeaheadPatientSale").data('typeahead').source = resultData;
								},5);
						
					}
				});

	}

}

function displayResult1(item) {

	var content = item.value.split("_");
	$('#hiddenPatientId').val(content[0]);

	/* getCreditBills(content[0]); */
	getPatientInformation(content[0]);
	getTreatmentId(content[0]);
	getDoctorInformation(content[0]);
	getSponsorDetails(content[0]);

}



function splitContentOfPatientById() {
var id=$('#searchPId').val();
if(id!=null && id!="" && id!=0){
	$('#hiddenPatientId').val(id);

	// getCreditBills(id); 
	getPatientInformation(id);
	getTreatmentId(id);
	getDoctorInformation(id);
	getSponsorDetails(id);
}
}

function getSponsorDetails(PatientId) {

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : {
					PatientId : PatientId
				},
				url : "../../pharmacy/patientSale/getSponsorDetailsByPatientId",
				timeout : 1000 * 60 * 15,

				error : function(error) {

				},
				success : function(r) {

					if (r.length > 0) {
						splitSponsorContent(r);
					}
				}
			});

}
var spDisc=0;
function splitSponsorContent(content) {
	spDisc=0;
	if (content != "") {
		var arr = content.split("#");
		if (arr.length > 1) {
			if (arr[0] != 'null') {
				$('#hiddenSponserId').val(arr[0]);
				$('#txtSponser').val(arr[1]);
				if(parseInt(arr[0])>0)
					$('#radioCredit').prop("checked","checked");
			} else {
				$('#hiddenSponserId').val(0);
				$('#txtSponser').val(' ');
			}
			if($("#applyDisc").val()==0)
				spDisc=arr[2];
		}
	}

}
function getDoctorInformation(PatientId) {
	var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();
	/* alert(typeOfpatient); */

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : {
					PatientId : PatientId,
					typeOfpatient : typeOfpatient
				},
				url : "../../pharmacy/patientSale/getDoctorDetailsByPatientId",
				timeout : 1000 * 60 * 15,

				error : function(error) {

				},
				success : function(r) {
					if (r.length > 0) {
						splitIPDDoctorContent(r);
					}
				}
			});

}

function getPatientInformation(PatientId) {
	var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : {
					PatientId : PatientId,
					typeOfpatient : typeOfpatient
				},
				url : "../../pharmacy/patientSale/getPatientDetailsByPatientId",
				timeout : 1000 * 60 * 15,

				error : function(error) {

				},
				success : function(r) {
					splitPatientData(r);

				}
			});

}

function getTreatmentId(PatientId) {
	var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();

	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			PatientId : PatientId,
			typeOfpatient : typeOfpatient
		},
		url : "../../pharmacy/patientSale/getTreatmentByPatientId",
		timeout : 1000 * 60 * 15,

		error : function(error) {
			alert('error' + error);
		},
		success : function(r) {
			splitTreatmentId(r);

		}
	});

}

function splitTreatmentId(content) {
	var arr = content.split("#");
	$('#hiddenTreatmentId').val(arr[1]);
	fetchPreviousBalanceAmount($('#hiddenTreatmentId').val());

	fetchSponserStatus($('#hiddenTreatmentId').val());

}

function checkSponserDisc()
{
	fetchSponserStatus($('#hiddenTreatmentId').val());
}

function fetchSponserStatus(treatmentId) 
{
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/getSponserStatus",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {

						var jsObj = $.parseJSON(r);
						if (jsObj != null) {

							$("#hiddenSponserFlag").val(jsObj.status);
							$("#billCategoryId").val(jsObj.catId);
							$("#hiddenTreatmentFlag").val(jsObj.tFlag);
							$("#hiddenCategoryName").val(jsObj.catgoryName);
							/*alert(jsObj.catgoryName);*/
							
							document.getElementById("demo").innerHTML = "<h5><b><font color='red'>"+jsObj.catgoryName+"</font></b></h5>";

							if (jsObj.tFlag == 'ACTIVE') {
								if ($("#hiddenSponserFlag").val() == 'ACTIVE')
								{
																		
									if ($("#radioCash").is(":checked"))
									      fetchAllCategoryDisc(treatmentId);
									else if ($("#radioCredit").is(":checked"))
										fetchAllCreditCategoryDisc(treatmentId);
									
									fetchMRPType(treatmentId);
								}
							}
							
						
							if ($("#hiddenSponserFlag").val() == 'ACTIVE') {
								if (jsObj.tFlag == 'INACTIVE') {
									var strconfirm = confirm("Are you want to apply "+jsObj.catgoryName+" category?");

									if (strconfirm == true) {
										
										$("#hiddenTreatmentFlag").val("ACTIVE");
																		
										if ($("#radioCash").is(":checked"))
										   fetchAllCategoryDisc(treatmentId);
										else if ($("#radioCredit").is(":checked"))
											fetchAllCreditCategoryDisc(treatmentId);
											
										fetchMRPType(treatmentId);
									}
								}
							}

						}

					}
				});
		return true;
	}
}

function fetchMRPType(treatmentId) {
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/patientSale/getMRPType",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {

				if (r == "MRP")
					$("#radioMRP").prop("checked", true);
				else
					$("#radioPurRate").prop("checked", true);

			}
		});
	}

}

function fetchAllCreditCategoryDisc(treatmentId)
{
	if (treatmentId != '') 
	{
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/common/getCreditCategorywiseDiscount",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				patientSaleparseData = jQuery.parseJSON(r);
				// alert(patientSaleparseData.result[0].pharma_category_id);
			}
		});
	}

}


function fetchAllCategoryDisc(treatmentId) {
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/common/getCategorywiseDiscount",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				patientSaleparseData = jQuery.parseJSON(r);
				// alert(patientSaleparseData.result[0].pharma_category_id);
			}
		});
	}

}


function fetchPreviousBalanceAmount(treatmentId) {
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/patientSale/getPendingAmount",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {

				$("#mainPendingBalance").html(r);
				$("#patientSalePreviousBalance").val(r);

				if (r > 0) {
					$("#showPatientDetail").show();
					$('#patientBal').html('<b>Patient Balance </b>' + r);
					$(function() {
						blinkeffect('#patientBal');

					})
					function blinkeffect(selector) {
						$(selector).fadeOut(
								'slow',
								function() {
									$(this).fadeIn(
											'slow',
											function() {
												blinkeffect(this);
												$('#patientBal').css('color',
														'red').css(
														'font-weight', 'bold');

											});
								});
					}
				} else if (r < 0) {
					$("#showPatientDetail").show();
					$('#patientBal').html('<b>Pharmacy Balance </b>' + r);
					$(function() {
						blinkeffect('#patientBal');

					})
					function blinkeffect(selector) {
						$(selector).fadeOut('slow', function() {
							$(this).fadeIn('slow', function() {
								blinkeffect(this);
								$('#patientBal').css('color', 'red');
							});
						});
					}
				} else {
					$("#showPatientDetail").hide();

				}
				$('#patientBal').css('color', 'red');

			}
		});
		return true;
	}
}

function splitPatientData(content) {
	var arr = content.split("#");
	$('#searchPId').val(arr[0]);
	$('#txtPatientAddress').val(arr[1]);
	$("#txtPatientName").val(arr[2]);

}
function splitIPDDoctorContent(content) {
	if (content != "") {
		var arr = content.split("#");
		if (arr.length > 1) {
			/*
			 * alert("PN "+arr[0]); alert("PA "+arr[1]); alert("DI "+arr[2]);
			 * alert("DN "+arr[3]); alert("DA "+arr[4]);
			 */

			/*
			 * if(arr[1]!="null") $('#txtPatientAddress').val(arr[1]);
			 */
			if (arr[2] != "null")
				$('#hiddenDoctorId').val(arr[2]);
			if (arr[3] != "null")
				$('#searchBox1').val(arr[3]);
			if (arr[4] != "null")
				$('#txtDoctorAddress').val(arr[4]);

		}
	}
}

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}

function validationsOfQty() {
	var qty = parseInt($('#txtQty').val());
	var curStock = parseInt($('#txtClStk').val());

	if (qty > curStock) {
		alert("Quantity is less than current Stock");
		$('#txtQty').val('');
	}
	calculateCounterAmount();
}

function validationsOfEditQty() 
{
	var qty = parseInt($('#txtEditQty').val());
	var curStock = parseInt($('#txtClStk').val());

	if (qty > curStock) {
		alert("Quantity is less than current Stock");
		$('#txtEditQty').val('');
	}
	calculateCounterAmountOnEditQty();
}

function splitPatientContent(content) {
	if (content != "") {
		var arr = content.split("-");

		$('#searchBox').val(arr[0]);

		$("#radioCash").focus();
		if (arr.length > 1) {
			$('#txtPatientAddress').val(arr[1]);
			$('#hiddenPatId').val(arr[2]);
		}
	} else {
		$('#hiddenPatId').val(2);
	}
}

function splitPatientSale(content) {
	if (content != "") {
		var arr = content.split("-");

		$('#txtPatientName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenPatientId').val(arr[1]);

		}
	} else {
		$('#hiddenPatientId').val(0);
	}
}

function splitBatchCode(content) {
	if (content != "") {
		var arr = content.split("#");
		if (arr.length > 1) {
			$('#txtBatchNo').val(arr[0]);
			$('#txtExpiry').val(arr[1]);
			$('#txtClStk').val(arr[2]);
			$('#txtTotalStk').val(arr[2]);
		}
	}
}
function splitDoctorContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$("#txtViewPrescription").focus();
		$('#searchBox1').val(arr[0]);
		if (arr.length > 1) {
			$('#txtDoctorAddress').val(arr[1]);
			$('#hiddenDoctorId').val(arr[2]);

		}
	} else {
		$('#hiddenDoctorId').val(0);
	}
}

function validateSpeDiscount() {
	var speDis = parseFloat($('#txtSpecialDisc').val());
	/* var cdAmt = parseFloat($('#txtCDAmt').val()); */

	if (speDis != "NaN")
		$('#txtLess').val(speDis);
	else {
		$('#txtLess').val("0");

	}

	/*
	 * if (cdAmt >= speDis) { alert("Special discount should be greater than CD
	 * Amount!"); $('#txtSpecialDisc').val(''); $('#txtLess').val('');
	 * $('#txtSpecialDisc').focus(); } else
	 */
	calculateDiscount();

	validateLess();
}

function validateLess() {
	var GrossAmt = parseFloat($('#txtGross').val());
	var Less = parseFloat($('#txtLess').val());

	if (Less >= GrossAmt) {
		alert("Less should be less than gross amount!");
		$('#txtSpecialDisc').focus();
		$('#txtSpecialDisc').val('');
		$('#txtLess').val('');
	}
	calculateNetAmount();

}
function getProductDetail(pId) {
	var productId = pId;
	if (productId != '') {
		var inputs = [];
		inputs.push('ProductId=' + productId);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/patientSale/getProductDetails",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {

				splitBatchCode(r);

			}
		});
		return true;
	}
}
function searchPatientSale(id) {
	var inputs = [];
	inputs.push('patientSaleBillId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/patientSale/patientSalesBillDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			if (r == "") {
				alert("Record not found!");

			}
			$("#hiddenPatientId").val('');
			setTableContent(r);

		}
	});

	return true;
}

function searchPatientSaleById(id) {
	var inputs = [];
	inputs.push('patientSaleId=' + id);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/patientSale/patientSalesBillDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					if (r == "") {
						alert("Record not found!");
						$('#txtPatientId').val('');
					}
					$("#patientSaleId").val('');
					setTableContent(r);

				}
			});

	return true;
}

function searchInvoiceSaleById(id) {
	var inputs = [];
	inputs.push('invoiceId=' + id);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/patientSale/patientSalesBillDetailsByInvoiceId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("Enter only number");
					$("#txtInvoiceId").val('');
				},
				success : function(r) {
					if (r == "") {
						alert("Record not found!");
						$('#txtInvoiceId').val('');
					}
					$("#txtInvoiceId").val('');
					setTableContent(r);

				}
			});

	return true;
}

function toCreatePatientSaleBillDiv(RowCount, currentRowCount,flag)
{
	
	var currentRow = currentRowCount;
	
	if (currentRow == undefined) {
		currentRow = 0;
	}

	var j = 1;

	var rowCount = $('#' + RowCount).val();
	
	if (rowCount == undefined) {
		rowCount = 1;
	}

	if (rowCount == -1) {
		rowCount = 0;
	}
	
	//If we have more than one product from view prescription from doctor desk
	var productName =$('#txtProName' + rowCount).val();
	if (productName == "") {
		if(flag=="insert")
			fillRow(currentRowCount);
			else
				fillRowEdit(currentRowCount);
			$("#txtProName" + rowCount).focus(j);
			return false;
	}
	//If we have more than one product from view prescription from doctor desk
	
	if (rowCount == currentRow) {

		var result = DublicateRecord(currentRow);
		if (result == 1) {
			rowCount++;
			rowId = "remove" + rowCount;
			var x = document.createElement('tr');
			x.setAttribute('id', rowId);
			/* x.setAttribute('class', 'col-md-12-1'); */
			x.setAttribute('style', 'margin-top:0px');
			document.getElementById("DRRDiv").appendChild(x);

			var index = parseInt(rowCount) - 1;
			if ($('#txtProName' + rowCount).val() == undefined) {
				document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
						+ (rowCount)
						+ "</label></td>"
						+ "<td style='display:none;'><input type='hidden' name='ltPatientSaleBill["
						+ index
						+ "].productMaster.productId' id='hiddenProductId"
						+ rowCount
						+ "' />"

						+ "<td style='display:none;'><input type='hidden' name='' id='hiddenCategoryId"
						+ rowCount
						+ "' />"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textRatePerUnit"
						+ rowCount
						+ "' readonly='true' ></td>"
						+ "<td style=display:none;></td>"
						
						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPerRatePerUnitFlag"
						+ rowCount
						+ "' readonly='true' ></td>"
						
						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtEditQty"
						+ rowCount
						+ "' readonly='true' ></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtProductPrescription"
						+ rowCount
						+ "' readonly='true' ></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtIpdOpd"
						+ rowCount
						+ "' readonly='true'  readonly='true' ></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
						+ rowCount
						+ "' readonly='true' ></td>"

						+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
						+ rowCount
						+ "' readonly='true' name='ltPatientSaleBill["
						+ index
						+ "].patientSlavePurchaseRate'></td>"

						+ "<td style='display: none;'><input type='text' id='txtPrescription"
						+ rowCount
						+ "' class='form-control input-SmallText'  readonly='true' ></td>"

						+ "<td style='display:none;'><input type='text'  id='textDisAmt"
						+ rowCount
						+ "' class='form-control input-SmallText'></td>"

						+ "<td style='display:none;'><input type='text'  id='textDisAmtPerQty"
						+ rowCount
						+ "' name='ltPatientSaleBill["
						+ index
						+ "].patientSaleSlaveDiscAmt' class='form-control input-SmallText'></td>"

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNoDelete'  id='textBarcode"
						+ rowCount
						+ "'  autocomplete='off'  onblur=fetchProductNameByBarcode(this.value,"
						+ rowCount
						+ ")  onkeydown=clearBarcode("
						+ rowCount
						+ ",event)></td>"

						+ "<td><input id='txtProName"
						+ rowCount
						+ "' name='ltPatientSaleBill["
						+ index
						+ "].productMaster.productName'"
						+ " type='text'  class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  onkeypress='load("+ rowCount +", 1)' ></td>"

						+ "<td style='display:none;'><input type='text' id='textRateForPrint"
						+ rowCount
						+ "' name='ltPatientSaleBill["
						+ index
						+ "].patientSlaveRatePerUnit' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' id='textcounterSlaveVatAmt"
						+ rowCount
						+ "' name='ltPatientSaleBill["
						+ index
						+ "].patientSlaveVatAmt' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td><input type='text' name='ltPatientSaleBill["
						+ index
						+ "].productMaster.productUnit' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo' id='txtUnit"
						+ rowCount
						+ "' readonly='true' tabindex='-1' ></td>"

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  name='ltPatientSaleBill["
						+ index
						+ "].productMaster.packingMaster.packType' id='txtPack"
						+ rowCount
						+ "' readonly='true' tabindex='-1' ></td>"
						
						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  name='ltPatientSaleBill["
						+ index
						+ "].productMaster.preparationMaster.preparationName' id='txtPre"
						+ rowCount
						+ "' readonly='true' tabindex='-1' ></td>"

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  name='ltPatientSaleBill["
						+ index
						+ "].productMaster.companyMaster.compName' id='txtComp"
						+ rowCount
						+ "' readonly='true' tabindex='-1' ></td>"

						+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
						+ index
						+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
						+ index
						+ "].patientSaleSlaveIssueQty' readonly id='textIssueQty"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
						+ index
						+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
						+ index
						+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
						+ rowCount
						+ "' class='form-control input-SmallText' readonly='true'></td>"

						+ "<td>" 
						+"<input type='text'name='ltPatientSaleBill["
						+ index
						+ "].patientSlaveVat'  class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  id='textVat"
						+ rowCount
						+ "' readonly='true' tabindex='-1' >" 
						
						+"<input type='hidden'name='ltPatientSaleBill["
						+ index
						+ "].patientSlavvatid'  class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  id='hiddenvatId"
						+ rowCount
						+ "' readonly='true'>" 
								+"</td>"

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  name='ltPatientSaleBill["
						+ index
						+ "].patientSlaveBatchCode'  id='textBatch"
						+ rowCount
						+ "' readonly='true' tabindex='-1' ></td>"

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  id='txtExpiry"
						+ rowCount
						+ "' name='ltPatientSaleBill["
						+ index
						+ "].patientSaleBatchExpiry' readonly='true' tabindex='-1' ></td>"

						/*
						 * + "<td><input type='text' class='form-control
						 * input-SmallText' id='txtShelfNo" + rowCount + "'
						 * readonly='true'></td>"
						 */

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  id='txtMRP"
						+ rowCount
						+ "'  name='ltPatientSaleBill["
						+ index
						+ "].patientSlaveMrp' readonly='true' tabindex='-1' ></td>"

						+ "<td><input type='text'  id='textDis"
						+ rowCount
						+ "' onblur=isNumber('txtQty"
						+ rowCount
						+ "'),calculateAmt("+ rowCount+ ")"
						+ "'    class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'></td>"

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  id='textClStk"
						+ rowCount
						+ "' readonly='true' tabindex='-1' ></td>"

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  name='ltPatientSaleBill["
						+ index
						+ "].patientSlaveQty' id='txtQty"
						+ rowCount
						+ "' onblur=isNumber('txtQty"
						+ rowCount
						+ "'),calculateAmt("
						+ rowCount
						+ "),calculatet();  ></td>"

						+ "<td style='display: none;'><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  name='ltPatientSaleBill["
						+ index
						+ "].patientSlaveRate' id='textRate"
						+ rowCount
						+ "' readonly='true' tabindex='-1' ></td>"

						+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo'  id='txtAmt"
						+ rowCount
						+ "' name='ltPatientSaleBill["
						+ index
						+ "].patientSlaveAmt' readonly='true' tabindex='-1' ></td>"
						+ "<td><input type='checkbox' class='form-control input-SmallText # deleteGroup"
						+ rowCount
						+ " # textNo' name='deleteGroup' value='"
						+ (rowCount)
						+ "' id='deleteGroup"
						+ (rowCount)
						+ "'></td>";
				+"</tr>";
			}
			$("#RowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;
			totalRowCount++;

			if ($('#textBarcode' + rowCount).val() == '') {
				
				if(flag=="insert")
				fillRow(currentRowCount);
				else
					fillRowEdit(currentRowCount);
			/*	calculateCounterAmount(currentRowCount);*/
				$("#txtProName" + rowCount).focus(j);
			}
			/* calculateAmount(currentRowCount); */

		}
	} else {
		if ($('#textBarcode' + rowCount).val() == '') {
			var result = DublicateRecordForEdit(currentRow);
			if (result == 1) {
				
				if(flag=="insert")
				fillRow(currentRowCount);
				else
					fillRowEdit(currentRowCount);
				/*calculateCounterAmount(currentRowCount);*/
			}
		}
	}
	
}

function DublicateRecordForEdit(rowCount) {

	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#RowCount').val();
	while (j < (count)) {

		if (rowCount == j) {
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((batchId == batchId1)) {
				return 1;
			} else {
				var popUpBatchId;
				var formBatchId;
				for ( var i = 1; i < count; i++) {
					formProductName = $('#hiddenProductId' + j).val();
					popUpProductName = $('#hiddenProductId').val();

					formBatchId = $('#textBatchId' + j).val();
					popUpBatchId = $('#hiddenBatchId').val();
					if ((formBatchId == popUpBatchId)) {
						alert("Dublicate Record Not insert");
						return 0;
					}
				}
			}
			j++;
		} else {
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((productName == productName1) && (batchId == batchId1)) {
				alert("Dublicate Record Not insert");
				return 0;

			}
			j++;
		}
	}
	return 1;
}

function DublicateRecord(rowCount) {
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	while (j < (totalRowCount)) {

		productName = $('#hiddenProductId' + j).val();
		productName1 = $('#hiddenProductId').val();

		batchId = $('#textBatchId' + j).val();
		batchId1 = $('#hiddenBatchId').val();

		if ((productName == productName1) && (batchId == batchId1)) {
			alert("Dublicate Record Not insert");
			return 0;

		}
		j++;
	}
	return 1;
}

// added by suraj to check dulplicate record for edit
function DublicateRecordForEdit(rowCount) {

	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#RowCount').val();
	while (j < (count)) {

		if (rowCount == j) {
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((batchId == batchId1)) {
				return 1;
			} else {
				var popUpBatchId;
				var formBatchId;
				for ( var i = 1; i < count; i++) {
					formProductName = $('#hiddenProductId' + j).val();
					popUpProductName = $('#hiddenProductId').val();

					formBatchId = $('#textBatchId' + j).val();
					popUpBatchId = $('#hiddenBatchId').val();
					if ((formBatchId == popUpBatchId)) {
						alert("Dublicate Record Not insert");
						return 0;
					}
				}
			}
			j++;
		} else {
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((productName == productName1) && (batchId == batchId1)) {
				alert("Dublicate Record Not insert");
				return 0;

			}
			j++;
		}
	}
	return 1;
}

function calculateGrossAmount() 
{
	var total = 0;
	for ( var i = 1; i <= $("#RowCount").val(); i++) 
	{
		if ($('#txtAmt' + i).val() >= 0 && $('#txtAmt' + i).val() != ''
				&& $('#txtAmt' + i).val() != null) 
		{
			total = ((parseFloat(total) + parseFloat($('#txtAmt' + i).val())));
		}

	}
	//var value=Math.floor((finalAmout - DiscAmt)*100)/100;
	var value=Math.floor((total)*100)/100;
	$('#txtGross').val(value);
	calculatecdAmt();
	/* validateLess(); */
	calculateNetAmount();
}

function resetAllPopUpValues() {
	$('#Patient_PopUp_Form').find('input:text && hidden').val('');
}

function calculateDiscount() {
	var disc = 0;
	var cdAmt = 0;
	/*
	 * if (($('#txtSpecialDisc').val() != '') && ($('#txtSpecialDisc').val() !=
	 * 0)) { disc = parseFloat($('#txtSpecialDisc').val());
	 * 
	 * if (($('#txtCDAmt').val() != '')) { cdAmt =
	 * parseFloat($('#txtCDAmt').val()); } $('#txtLess').val((disc +
	 * cdAmt).toFixed(2)); }
	 */

	if (($('#txtSpecialDisc').val() != '') && ($('#txtSpecialDisc').val() != 0))
		$('#txtLess').val($('#txtSpecialDisc').val());
	else if (($('#txtCD').val() != '') && ($('#txtCD').val() != 0))
		$('#txtLess').val($('#txtCDAmt').val());
	else
		$('#txtLess').val('0');

	calculateNetAmount();
}

function calculateSurcharge() {
	var add = 0;
	if ($('#txtSurCharge').val() != '') {
		add = parseFloat($('#txtSurCharge').val());
	}

	$("#txtAdd").val(add);
	calculateNetAmount();
}

function calculatecdAmt() 
{
	var cdAmt = 0;
	var gross = 0;
	if ($('#txtCD').val() != '')
	{
		cdAmt = parseFloat($('#txtCD').val());
	}

	if ($('#txtGross').val() != '') 
	{
		gross = parseFloat($('#txtGross').val());
	}

	var value = Math.floor((gross * (cdAmt / 100))*100)/100;
	
	$('#txtCDAmt').val(value);

	var spe = parseFloat($('#txtSpecialDisc').val());
	var cd = parseFloat($('#txtCDAmt').val());

	/* if (spe >= cd) */

	calculateDiscount();

	/*
	 * else { alert("Special Disc should be greater than CD Amt ");
	 * $('#txtLess').val(''); }
	 */
}

function calculateNetAmount() {
	// net amount
	var gross = 0;
	var less = 0;
	var add = 0;

	if ($('#txtGross').val() != '') {
		gross = parseFloat($('#txtGross').val());
	}
	if ($('#txtLess').val() != '') {
		less = parseFloat($('#txtLess').val());
	}
	if ($('#txtAdd').val() != '') {
		add = parseFloat($('#txtAdd').val());
	}
	if (gross >= less)
	{
		//Manisha
		
		/*var value=Math.floor((((gross - less) + add))*100)/100;
		
		$('#txtNetAmt').val(Math.round(value));
		$('#txtAmtReceived').val(Math.round(value));*/
		
		var value=((((gross - less) + add))*100)/100;
		
		$('#txtNetAmt').val(value.toFixed(2));
		$('#txtAmtReceived').val(value.toFixed(2));
	} 
	else 
	{
		alert("Gross amount should be greater than Less amount");
		$('#txtNetAmt').val(0);
		$('#txtSpecialDisc').val('');
		$('#txtLess').val(0);
		
		$('#txtAmtReceived').val(0);
	}

}

function calculateCounterAmount(value) 
{
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	var purRate = 0;
	/* var vat=0; */
	
	if ($('txtPurchaseRate').val() != ''
			&& $('#txtPurchaseRate').val().length > 0)
		purRate = parseFloat($('#txtPurchaseRate').val());

	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
		qty = parseFloat($('#txtQty').val());

	if (value == 'qty')
		$("#txtRate").focus();

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0)
	{
		
		if ($("#radioMRP").is(":checked")) 
		{
		if($('#txtPerRatePerUnitFlag').val()!=1)
		{
		    ratePerUnit = (Math.floor(100*(rate / unit))/100);
		    $('#txtPerRatePerUnitFlag').val(0);
		    $('#mydiv label').text('Rate Per Unit.');
		}
		else
			{
			  ratePerUnit = (Math.floor(100*(purRate / unit))/100);
			$('#txtPerRatePerUnitFlag').val(1);
			$('#mydiv label').text('PurRate Per Unit.');
			}
		} 
		else 
		{
			  ratePerUnit = (Math.floor(100*(purRate / unit))/100);
			$('#txtPerRatePerUnitFlag').val(1);
			$('#mydiv label').text('PurRate Per Unit.');
		}
	}
	
	/*
	 * var round = Math.round(ratePerUnit);
	 * 
	 * if (round == 0) $("#txtRatePerUnit").val(1); else
	 */
	$("#txtRatePerUnit").val(ratePerUnit);
	var finalAmout = Math.floor((ratePerUnit * qty)*100)/100;
	if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
		discount = parseFloat($('#txtDis').val());
		DiscAmt = Math.floor(((discount / 100) * finalAmout)*100)/100;
	}
	
	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
		DiscAmt = parseFloat($('#txtDiscAmt').val());
	}
	else
		$('#txtDiscAmt').val(0);

	if (DiscAmt <= finalAmout)
	{
		var value=Math.floor((finalAmout - DiscAmt)*100)/100;
		$('#txtAmt').val(value);
	}
	else {
		var value=Math.floor((finalAmout)*100)/100;
		$('#txtAmt').val(value);
		/* alert("Enter Discount less than amount"); */
	}
	
	
	var amt=parseFloat($('#txtAmt').val());
	/*var saleOnMrp=rate-DiscAmt;*/
	var saleOnPurchaseRate=(parseFloat($('#txtPurchaseRate').val())/unit)*qty;
	/*	alert("mrp"+amt);
		alert("saleOnPurchaseRate"+saleOnPurchaseRate);*/
	
	if(parseFloat($('#txtDiscAmt').val())>0)
	{
	if(amt<saleOnPurchaseRate)
	{
		alert("Sale value of mrp is going less than purchase prise");
		$('#mydiv label').text('PurRate Per Unit.');
		ratePerUnit = (Math.floor(100*(purRate / unit))/100);
		$('#txtPerRatePerUnitFlag').val(1);
		$('#mydiv label').text('PurRate Per Unit.');
		$("#txtRatePerUnit").val(ratePerUnit);
		var finalAmout = Math.floor((ratePerUnit * qty)*100)/100;
		$('#txtDis').val('');
		$('#txtDiscAmt').val('');
		$('#txtAmt').val(finalAmout);
	
	}
	}
	
	var amt = parseFloat($('#txtAmt').val());
	val = (Math.floor(100 * (amt / qty)) / 100);
	$('#txtRateForPrint').val(val);

}

function calculateCounterAmountOnEditQty(value) 
{
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	var purRate = 0;
	/* var vat=0; */
	
	if ($('txtPurchaseRate').val() != ''
			&& $('#txtPurchaseRate').val().length > 0)
		purRate = parseFloat($('#txtPurchaseRate').val());

	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtEditQty').val() != '' && $('#txtEditQty').val().length > 0)
		qty = parseFloat($('#txtEditQty').val());

	if (value == 'qty')
		$("#txtRate").focus();

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0)
	{
		
		if ($("#radioMRP").is(":checked")) 
		{
		if($('#txtPerRatePerUnitFlag').val()!=1)
		{
		    ratePerUnit = (Math.floor(100*(rate / unit))/100);
		    $('#txtPerRatePerUnitFlag').val(0);
		    $('#mydiv label').text('Rate Per Unit.');
		}
		else
			{
			  ratePerUnit = (Math.floor(100*(purRate / unit))/100);
			$('#txtPerRatePerUnitFlag').val(1);
			$('#mydiv label').text('PurRate Per Unit.');
			}
		} 
		else 
		{
			  ratePerUnit = (Math.floor(100*(purRate / unit))/100);
			$('#txtPerRatePerUnitFlag').val(1);
			$('#mydiv label').text('PurRate Per Unit.');
		}
	}
	
	/*
	 * var round = Math.round(ratePerUnit);
	 * 
	 * if (round == 0) $("#txtRatePerUnit").val(1); else
	 */
	$("#txtRatePerUnit").val(ratePerUnit);
	var finalAmout = Math.floor((ratePerUnit * qty)*100)/100;
	if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
		discount = parseFloat($('#txtDis').val());
		DiscAmt = Math.floor(((discount / 100) * finalAmout)*100)/100;
	}
	
	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
		DiscAmt = parseFloat($('#txtDiscAmt').val());
	}
	else
		$('#txtDiscAmt').val(0);

	if (DiscAmt <= finalAmout)
	{
		var value=Math.floor((finalAmout - DiscAmt)*100)/100;
		$('#txtAmt').val(value);
	}
	else {
		var value=Math.floor((finalAmout)*100)/100;
		$('#txtAmt').val(value);
		/* alert("Enter Discount less than amount"); */
	}
	
	
	var amt=parseFloat($('#txtAmt').val());
	/*var saleOnMrp=rate-DiscAmt;*/
	var saleOnPurchaseRate=(parseFloat($('#txtPurchaseRate').val())/unit)*qty;
	/*	alert("mrp"+amt);
		alert("saleOnPurchaseRate"+saleOnPurchaseRate);*/
	
	if(parseFloat($('#txtDiscAmt').val())>0)
	{
	if(amt<saleOnPurchaseRate)
	{
		alert("Sale value of mrp is going less than purchase prise");
		$('#mydiv label').text('PurRate Per Unit.');
		ratePerUnit = (Math.floor(100*(purRate / unit))/100);
		$('#txtPerRatePerUnitFlag').val(1);
		$('#mydiv label').text('PurRate Per Unit.');
		$("#txtRatePerUnit").val(ratePerUnit);
		var finalAmout = Math.floor((ratePerUnit * qty)*100)/100;
		$('#txtDis').val('');
		$('#txtDiscAmt').val('');
		$('#txtAmt').val(finalAmout);
	
	}
	}
	
	var amt = parseFloat($('#txtAmt').val());
	val = (Math.floor(100 * (amt / qty)) / 100);
	$('#txtRateForPrint').val(val);

}




function fillRowEdit(rCount) 
{
	var rowCount = parseInt(rCount);
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	//$('#txtProName' + rowCount).val($('#particulars').val());
	$('#txtUnit' + rowCount).val($('#txtUnit').val());
	$('#txtPack' + rowCount).val($('#txtPack').val());
	$('#txtComp' + rowCount).val($('#txtComp').val());
	$('#txtShelfNo' + rowCount).val($('#txtShelf').val());
	$('#txtMRP' + rowCount).val($('#txtMRP').val());
	$('#txtEditQty' + rowCount).val($('#txtEditQty').val());
	$('#txtQty' + rowCount).val($('#txtQty').val());
	$('#textRate' + rowCount).val($('#txtRate').val());
	$('#txtAmt' + rowCount).val($('#txtAmt').val());
	$('#textBatch' + rowCount).val($('#txtBatchNo').val());
	$('#txtExpiry' + rowCount).val($('#txtExpiry').val());
	$('#textVat' + rowCount).val($('#txtVat').val());
	$('#txtPre' + rowCount).val($('#txtPre').val());

	$('#txtProductPrescription' + rowCount).val(
			$('#hiddenProductPrescription').val());
	
	$('#textRatePerUnit' + rowCount).val($('#txtRatePerUnit').val());

	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());

	$('#textStockId' + rowCount).val($('#hiddenStockId').val());

	$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());

	$('#textClStk' + rowCount).val($('#txtClStk').val());

	$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());

	$('#textPurchaseRate' + rowCount).val($('#txtPurchaseRate').val());
	$('#textDis' + rowCount).val($('#txtDis').val());

	$('#textDisAmt' + rowCount).val($('#txtDiscAmt').val());
	
	$('#textPerRatePerUnitFlag'+rowCount).val($('#txtPerRatePerUnitFlag').val());

	var qty = parseFloat($('#txtQty').val());

	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
		disc = parseFloat($('#txtDiscAmt').val());
		var result = (disc / qty);
		$('#textDisAmtPerQty' + rowCount).val((result).toFixed(2));
	} else
		$('#textDisAmtPerQty' + rowCount).val(0);

	$('#textRateForPrint' + rowCount).val($('#txtRateForPrint').val());

	$('#textIssueQty' + rowCount).val($('#txtQty').val());

	if ($('#textBarcode' + rowCount).val() != ''
			&& $('#textBarcode' + rowCount).val().length > 0)
		$('#textBarcode' + rowCount).val($('#textBatchId' + rowCount).val());

	$('#hiddenCategoryId' + rowCount).val($('#hiddenProductCategoryId').val());
	$('#hiddenvatId' + rowCount).val($('#txtVatid').val());
	calculateVatAmt(rCount);
	calculateGrossAmount();
	calculateTotalPurchase();
}


function fillRow(rCount) 
{
	var currentRowcall =parseInt($('#fordoctorstationmediciencount').val());
	//rCount =currentRowcall;
	var rowCount = currentRowcall;
	
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	//$('#txtProName' + rowCount).val($('#particulars').val());
	$('#txtUnit' + rowCount).val($('#txtUnit').val());
	$('#txtPack' + rowCount).val($('#txtPack').val());
	$('#txtComp' + rowCount).val($('#txtComp').val());
	$('#txtShelfNo' + rowCount).val($('#txtShelf').val());
	$('#txtMRP' + rowCount).val($('#txtMRP').val());
	$('#txtQty' + rowCount).val($('#txtQty').val());
	$('#textRate' + rowCount).val($('#txtRate').val());
	
	$('#textBarcode' + rowCount).val($('#hiddenBatchId').val());
	
	$('#txtAmt' + rowCount).val($('#txtAmt').val());
	//$('#txtAmt' + rowCount).val($('#txtMRP').val() * $('#txtQty').val());
	$('#textBatch' + rowCount).val($('#txtBatchNo').val());
	$('#txtExpiry' + rowCount).val($('#txtExpiry').val());
	$('#textVat' + rowCount).val($('#txtVat').val());
	$('#txtPre' + rowCount).val($('#txtPre').val());

	$('#txtProductPrescription' + rowCount).val(
			$('#hiddenProductPrescription').val());
	
	$('#textRatePerUnit' + rowCount).val($('#txtRatePerUnit').val());

	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());

	$('#textStockId' + rowCount).val($('#hiddenStockId').val());

	$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());

	$('#textClStk' + rowCount).val($('#txtClStk').val());

	$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());

	$('#textPurchaseRate' + rowCount).val($('#txtPurchaseRate').val());
	$('#textDis' + rowCount).val($('#txtDis').val());

	$('#textDisAmt' + rowCount).val($('#txtDiscAmt').val());
	
	$('#textPerRatePerUnitFlag'+rowCount).val($('#txtPerRatePerUnitFlag').val());

	var qty = parseFloat($('#txtQty').val());

	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
		disc = parseFloat($('#txtDiscAmt').val());
		var result = (disc / qty);
		$('#textDisAmtPerQty' + rowCount).val((result).toFixed(2));
	} else
		$('#textDisAmtPerQty' + rowCount).val(0);

	$('#textRateForPrint' + rowCount).val($('#txtRateForPrint').val());

	$('#textIssueQty' + rowCount).val($('#txtQty').val());

	if ($('#textBarcode' + rowCount).val() != ''
			&& $('#textBarcode' + rowCount).val().length > 0)
		$('#textBarcode' + rowCount).val($('#textBatchId' + rowCount).val());

	$('#hiddenCategoryId' + rowCount).val($('#hiddenProductCategoryId').val());
	
	$('#hiddenvatId' + rowCount).val($('#txtVatid').val());
	
	if ($('#hiddenProductId').val() != "")
    
    $('#txtQty' + rowCount).focus();
	calculateVatAmt(rCount);
	calculateGrossAmount();
	calculateTotalPurchase();
	calculatePending();
}

function calculateTotalPurchase() { 
	var total = 0;
	var pRate = 0;
	var qty = 0;
	var unit = 0;
	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($('#textPurchaseRate' + i).val() >= 0
				&& $('#textPurchaseRate' + i).val() != ''
				&& $('#textPurchaseRate' + i).val() != null) {
			pRate = parseFloat($('#textPurchaseRate' + i).val());
			qty = parseFloat($('#txtQty' + i).val());
			unit = parseFloat($('#txtUnit' + i).val());
			total = total + ((pRate / unit) * qty);
		}
	}

	var value=Math.floor((total)*100)/100;
	
	$('#txtTotalPurchase').val(value);
}

function calculateVatAmt(rCount) {
	var rowCount = parseInt(rCount);
	var Amt = parseFloat($('#txtAmt').val());
	var vat = parseFloat($('#txtVat').val());

	var vatAmt = 100 + vat;

	/* var result=parseFloat(((Amt/vatAmt)*vat).toFixed(2)); */

	var result = (Math.floor(100 * ((Amt / vatAmt) * vat)) / 100);

	$("#textcounterSlaveVatAmt" + rowCount).val(result);

}

function getPatientSaleBillList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/patientSale/patientSaleBillList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setTableContent(r);
		}
	});

	return true;
}
function deletePatientSale(patientId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		reset();
		alertify.success("Record deleted Succesfully");

		var inputs = [];
		inputs.push('purId=' + patientId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/patientSale/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						// getPatientSaleBillList();
						if (r == true) {
							/*
							 * $('#msgDiv') .html( "<div class='alert
							 * alert-success' >Record deleted successfully..!</div>");
							 * hideResultDiv(); location.reload();
							 */

						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						window.location.href = "view";
					}
				});

		return true;
	} else {

	}
}

// get formatted date dd/mm/yyyy
function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; // January is 0!

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		var patientSaleDate = getDate(r[i].patientBillDate);
		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='patientSaleBillId"
				+ r[i].patientSalesBillId
				+ "' value='"
				+ r[i].patientSalesBillId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].patientSalesBillCD
				+ "<input type='hidden' id='patientSaleBillId"
				+ r[i].patientSalesBillCD
				+ "' value='"
				+ r[i].patientSalesBillCD
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].patientId
				+ "<input type='hidden' id='patientId"
				+ r[i].patientId
				+ "' value='"
				+ r[i].patientId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].patientSalesBillPrescription
				+ "<input type='hidden' id='patientName"
				+ r[i].patientSalesBillId
				+ "' value='"
				+ r[i].patientSalesBillPrescription
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].patientSalesBillAdd
				+ "<input type='hidden' id='DoctorName"
				+ r[i].patientSalesBillId
				+ "' value='"
				+ r[i].patientSalesBillAdd
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].patientBillMode
				+ "<input type='hidden' id='patientSaleBillDate"
				+ r[i].patientSalesBillId
				+ "' value='"
				+ r[i].patientBillMode
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].patientSalesBillNarration
				+ "<input type='hidden' id='PatientNaration"
				+ +r[i].patientSalesBillId
				+ "'value='"
				+ r[i].patientSalesBillNarration
				+ "'></td>"
				+ "</td><td style='display: none' id='patientId'>"
				+ r[i].patientId
				+ "<input type='hidden' id='patientId"
				+ +r[i].patientSalesBillId
				+ "'value='"
				+ r[i].patientId
				+ "'>"
				/*
				 * + "<td class='col-md-2 center'><a id='btnPrint" +
				 * r[i].patientSalesBillId + "' class='btn btn-xs btn-success'
				 * href='/EhatEnterprise/pharmacy/patientSale/printView?patientSaleId=" +
				 * r[i].patientSalesBillId + "'> <i class='fa fa-print'></i>
				 * </a></td>"
				 */

				+ "<td class='col-md-2 center'><button id='btnPrint"
				+ r[i].patientSalesBillId
				+ "' class='btn btn-xs btn-success'  onclick='patientSalePrint("
				+ r[i].patientSalesBillId
				+ ")'> <i class='fa fa-print'></i> </button></td>"

				+ "<td class='col-md-2 center'><a class='btn btn-xs btn-success' id='btnPrint"
				+ r[i].patientSalesBillId
				+ "' href='../../pharmacy/patientSale/view-bill?patientSalesBillId="
				+ r[i].patientSalesBillId + "&previousBalance="
				+ r[i].patientSalePreviousBalance+"&BillMode="+ r[i].patientSalesBillDocNo + "&&treatmentId=" + r[i].patientSaleTreatmentId
				+ "'><i class='fa fa-eye View'></i></td></td> </tr>";

		/*
		 * + "<td class='col-md-2 center'> <button id='btnDelete2' class='btn
		 * btn-xs btn-success' onclick='deletePatientSale(" +
		 * r[i].patientSalesBillId + ")' value='DELETE'> <i class='fa
		 * fa-trash-o'></i> </button> </td> </tr>";
		 */
	}

	$('#divPatientSaleList').html(divContent);
	
	setVouNo();
	
}
function deleteRow() {
	/* var result= $("input[name='deleteGroup']:checked").val(); */

	/* $("#remove"+result).hide(); */
	var r = confirm("Are you confirm to delete selected row");
	if (r == true) {
		var favorite = [];

		$.each($("input[name='deleteGroup']:checked"), function() {
			favorite.push($(this).val());

		});

		if (favorite.length == 0) {
			alert("Please select checkbox to delete");
		}

		for ( var i = 0; i < favorite.length; i++) {

			if ($("#hiddenProductId" + favorite[i]) != null
					&& $('#hiddenProductId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				var amount = parseFloat($("#txtAmt" + favorite[i]).val());

				$("#hiddenProductId" + favorite[i]).val("");
				$("#textBatchId" + favorite[i]).val("");
				$("#textPurchaseRate" + favorite[i]).val("");
				$("#txtProName" + favorite[i]).val("");
				$("#remove" + favorite[i]).hide();
				$("#txtAmt" + favorite[i])
						.val(
								parseFloat($("#txtAmt" + favorite[i]).val())
										- (amount));
				$("#txtAmt" + favorite[i]).val("");

				calculateGrossAmount();
				$("#remove" + favorite[i]).remove();

			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
	}
	calculateTotalPurchase();
	calculatecdAmt();// cd Amt
	calculatePending();// pending
	calculateDiscount();// less

}
function calculatePatientDisc() 
{
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	var finalAmout = 0;
	var purRate = 0;
	/* var vat=0; */

if ($("#radioMRP").is(":checked")) 
{
	$('#mydiv label').text('Rate Per Unit.');
} 
else
{
	$('#mydiv label').text('PurRate Per Unit.');
}

if ($('#txtDis').val() <= 100) 
	{
		if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
			rate = parseFloat($('#txtRate').val());

		if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
			qty = parseFloat($('#txtQty').val());

		if ($('txtPurchaseRate').val() != ''
				&& $('#txtPurchaseRate').val().length > 0)
			purRate = parseFloat($('#txtPurchaseRate').val());

		if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
			unit = parseFloat($('#txtUnit').val());

		if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0)
			discount = parseFloat($('#txtDis').val());

		if ($('#hiddenProductId').val() != ''
				&& $('#hiddenProductId').val().length > 0
				&& $('#hiddenProductId').val() != 0) {
			if ($("#radioMRP").is(":checked")) {
				ratePerUnit = (Math.floor(100*(rate / unit))/100);
			} else {
				ratePerUnit = (Math.floor(100*(purRate / unit))/100);
			}

			  finalAmout = Math.floor((ratePerUnit * qty)*100)/100;
			if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
				discount = parseFloat($('#txtDis').val());
				DiscAmt = Math.floor(((discount / 100) * finalAmout)*100)/100;
				$('#txtDiscAmt').val((DiscAmt));
			}

		}
		/*calculateCounterAmount();*/

	} else {
		alert("Enter Discount less than 100");
		$('#txtDis').val(0);
		$('#txtDiscAmt').val(0);
	/*	calculateCounterAmount();*/
	}
calculateCounterAmount();
}



//calculation on edit qty
function calculatePatientDiscOnEditQty() 
{
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	var finalAmout = 0;
	var purRate = 0;
	/* var vat=0; */

if ($("#radioMRP").is(":checked")) 
{
	$('#mydiv label').text('Rate Per Unit.');
} 
else
{
	$('#mydiv label').text('PurRate Per Unit.');
}

if ($('#txtDis').val() <= 100) 
	{
		if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
			rate = parseFloat($('#txtRate').val());

		if ($('#txtEditQty').val() != '' && $('#txtEditQty').val().length > 0)
			qty = parseFloat($('#txtEditQty').val());

		if ($('txtPurchaseRate').val() != ''
				&& $('#txtPurchaseRate').val().length > 0)
			purRate = parseFloat($('#txtPurchaseRate').val());

		if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
			unit = parseFloat($('#txtUnit').val());

		if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0)
			discount = parseFloat($('#txtDis').val());

		if ($('#hiddenProductId').val() != ''
				&& $('#hiddenProductId').val().length > 0
				&& $('#hiddenProductId').val() != 0) {
			if ($("#radioMRP").is(":checked")) {
				ratePerUnit = (Math.floor(100*(rate / unit))/100);
			} else {
				ratePerUnit = (Math.floor(100*(purRate / unit))/100);
			}

			  finalAmout = Math.floor((ratePerUnit * qty)*100)/100;
			if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
				discount = parseFloat($('#txtDis').val());
				DiscAmt = Math.floor(((discount / 100) * finalAmout)*100)/100;
				$('#txtDiscAmt').val((DiscAmt));
			}

		}
		/*calculateCounterAmount();*/

	} else {
		alert("Enter Discount less than 100");
		$('#txtDis').val(0);
		$('#txtDiscAmt').val(0);
	/*	calculateCounterAmount();*/
	}
calculateCounterAmountOnEditQty();
}

function calculateVat() {
	var vat5 = 0;
	var vat55 = 0;
	var vat12 = 0;
	var vat0 = 0;
	var vat6 = 0;
	var vat135 = 0;

	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($("#hiddenProductId" + i).val() != null
				&& $('#hiddenProductId' + i).val() != "") {
			if ($('#textVat' + i).val() != ''
					&& $('#textVat' + i).val().length > 0)
				vat = parseFloat($('#textcounterSlaveVatAmt' + i).val());

			if ($('#textVat' + i).val() == 5.0 || $('#textVat' + i).val() == 5) {
				vat5 = vat5 + vat;
			} else if ($('#textVat' + i).val() == 12.5) {
				vat12 = vat12 + vat;
			} else if ($('#textVat' + i).val() == 5.5) {
				vat55 = vat55 + vat;
			} else if ($('#textVat' + i).val() == 0) {
				vat0 = vat0 + vat;
			} else if ($('#textVat' + i).val() == 6) {
				vat6 = vat6 + vat;
			} else if ($('#textVat' + i).val() == 13.5) {
				vat135 = vat135 + vat;
			}

		}
	}
	$("#hiddenTax5").val(vat5);
	$("#hiddenTax55").val(vat55);
	$("#hiddenTax12").val(vat12);
	$("#hiddenTax0").val(0);
	$("#hiddenTax6").val(vat6);
	$("#hiddenTax135").val(vat135);

	var totalTax = vat5 + vat12 + 0 + vat55 + vat6 + vat135;
	$("#hiddenTotalTax").val(totalTax);
}

function patientSalePrint(patientSaleId) {
	
	if(patientSaleId == ""){
		
	   patientSaleId = $("#hiddenPatientSalesBillId").val();
		
	}else{
		patientSaleId = patientSaleId;
	}
	
	window.open("../../pharmacy/patientSale/printView?patientSaleId="
			+ patientSaleId + "");

}
function setRoundNetAmount() {

	if ($('#txtRound').val() != null && $('#txtRound').val() != '') {
		var retVal = confirm("Do you want to Round off Net Amount  ?");
		//var r = Math.round($('#txtRound').val());
		var r = ($('#txtRound').val());
		var gross = 0;
		if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
			gross = parseFloat($('#txtGross').val());
		}

		if ((retVal == true)
				&& (parseFloat($('#txtRound').val()) == parseFloat($(
						'#txtNetAmt').val()))) {
			$('#txtNetAmt').val(r);
		} else {
			alert("Enter same value of net amount");
			$('#txtRound').val('');
			$('#txtRound').focus();
		}
	} else {
		calculateNetAmount();
	}
	calculatePending();
}

function clearBarcode(rowCount, key) {
	var keycode = (key.which) ? key.which : key.keyCode;
	if (keycode == 8 || keycode == 46) {
		$('#textBatch' + rowCount).val('');
		$('#txtExpiry' + rowCount).val('');
		$('#textVat' + rowCount).val('');
		$('#txtMRP' + rowCount).val('');
		$('#textRate' + rowCount).val('');
		$('#textPurchaseRate' + rowCount).val('');
		$('#textBatchId' + rowCount).val('');
		$('#textClStk' + rowCount).val('');
		$('#textTotalStk' + rowCount).val('');
		$('#textStockId' + rowCount).val('');
		$('#textStockQtyInHand' + rowCount).val('');
		$('#textRatePerUnit' + rowCount).val('');
		$('#txtShelfNo' + rowCount).val('');
		$('#txtAmt' + rowCount).val('');

		return false;
	}

}

function fetchProductNameByBarcode(batchId, rowCount) {

	if ($('#txtPatientName').val() != "") {
		var barcode = $('#textBarcode' + rowCount).val();
		// var batchId=$('#textBatchId' + rowCount).val();

		var a = $('#textBarcode' + rowCount).val();
		if (parseInt(a.lastIndexOf(".")) > 0) {
			alert("Enter proper barcode");
			$('#textBarcode' + rowCount).val('');
			return false;
		}

		if ((a.indexOf("0") == 0)) {
			alert("barcode should not starts with 0");
			$('#textBarcode' + rowCount).val('');
			return false;
		}

		/*
		 * if($('#textBarcode' + rowCount).val() == '') { $('#textBatch' +
		 * rowCount).val(''); $('#txtExpiry' + rowCount).val(''); $('#textVat' +
		 * rowCount).val(''); $('#txtMRP' + rowCount).val(''); $('#textRate' +
		 * rowCount).val(''); $('#textPurchaseRate' + rowCount).val('');
		 * $('#textBatchId' + rowCount).val(''); $('#textClStk' +
		 * rowCount).val(''); $('#textTotalStk' + rowCount).val('');
		 * $('#textStockId' + rowCount).val(''); $('#textStockQtyInHand' +
		 * rowCount).val(''); $('#textRatePerUnit' + rowCount).val('');
		 * $('#txtShelfNo' + rowCount).val(''); $('#txtAmt' + rowCount).val(''); }
		 */
		if ($('#textBarcode' + rowCount).val() != ''
				&& $('#textBarcode' + rowCount).val())
		{
			if(isNaN($('#textBarcode' + rowCount).val()))
			{
				alert("Enter proper Barcode");
				$('#textBarcode' + rowCount).val('');
				$('#textBarcode' + rowCount).focus();
			}
			else
				{
			if (chkDublicateRecortForBatch(rowCount, $(
					'#textBarcode' + rowCount).val()) == 1) {
				if (a != $('#textBatchId' + rowCount).val()) {
					var BatchId = batchId;
					var inputs = [];
					inputs.push('BatchId=' + BatchId);
					var str = inputs.join('&');
					jQuery
							.ajax({
								async : true,
								type : "GET",
								data : str + "&reqType=AJAX",
								url : "../../pharmacy/purchase/fetchProductNameByBarcode",
								timeout : 1000 * 60 * 5,
								catche : false,
								error : function() {
									alert("error");
								},
								success : function(result) {
									var data = jQuery.parseJSON(result);
									setTableDataByBarcode(data.result, rowCount);
								}
							});
					return true;
				}
			} else {

				if ($('#txtProName' + rowCount).val() == "") {
					$('#textBarcode' + rowCount).val('');
					$('#txtProName' + rowCount).val('');
					$('#txtUnit' + rowCount).val('');
					$('#txtPack' + rowCount).val('');
					$('#txtComp' + rowCount).val('');
					$('#textBatch' + rowCount).val('');
					$('#txtExpiry' + rowCount).val('');
					$('#textVat' + rowCount).val('');
					$('#txtMRP' + rowCount).val('');
					$('#textRate' + rowCount).val('');
					$('#textPurchaseRate' + rowCount).val('');
					$('#hiddenProductId' + rowCount).val('');
					$('#textBatchId' + rowCount).val('');
					$('#textClStk' + rowCount).val('');
					$('#textTotalStk' + rowCount).val('');
					$('#textStockId' + rowCount).val('');
					$('#textStockQtyInHand' + rowCount).val('');
					$('#textRatePerUnit' + rowCount).val('');
					$('#txtShelfNo' + rowCount).val('');
					$('#txtQty' + rowCount).val('');
					$('#txtAmt' + rowCount).val('');
				}
			}
		}
		}
	} else {
		alert("Select patient name");
		$('#txtPatientName').focus('');
	}
}

function calculateAmt(rowCount) {
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	/* var vat=0; */
	var vatAmt = 0;

	 var unit= parseFloat($('#txtUnit' + rowCount).val());
	 var rate= parseFloat($('#textRate' + rowCount).val());
	 var purRate= parseFloat($('#textPurchaseRate' + rowCount).val());
	
	 
	if ($("#radioMRP").is(":checked")) 
	{
	if($('#textPerRatePerUnitFlag'+rowCount).val()!=1)
	{
		ratePerUnit = (Math.floor(100*(rate / unit))/100);
	    $('#textPerRatePerUnitFlag'+rowCount).val(0);
	    $('#mydiv label').text('Rate Per Unit.');
	}
	else
		{
		ratePerUnit = (Math.floor(100*(purRate / unit))/100);
	
		$('#textPerRatePerUnitFlag'+rowCount).val(1);
		$('#mydiv label').text('PurRate Per Unit.');
		}
	} 
	else 
	{
		ratePerUnit = (Math.floor(100*(purRate / unit))/100);
		
		$('#textPerRatePerUnitFlag'+rowCount).val(1);
		$('#mydiv label').text('PurRate Per Unit.');
	}

	
	/*if ($("#radioMRP").is(":checked")) 
	{
		$('#textPerRatePerUnitFlag'+rowCount).val(0);
	} 
	else
	{
		$('#textPerRatePerUnitFlag'+rowCount).val(1);
	}*/
	 $('#textRatePerUnit' + rowCount).val(ratePerUnit);
	 
	var qty = $('#txtQty' + rowCount).val();

	if (parseInt(qty.lastIndexOf(".")) > 0) {
		alert("Enter proper qty");
		$('#txtQty' + rowCount).val('');
		$('#txtQty' + rowCount).focus();
		return false;
	}

	$('#textIssueQty' + rowCount).val($('#txtQty' + rowCount).val());
	if ($('#txtQty' + rowCount).val() != ''
			&& $('#txtQty' + rowCount).val().length > 0)
		qty = parseFloat($('#txtQty' + rowCount).val());

	if ($('#textClStk' + rowCount).val() != ''
			&& $('#textClStk' + rowCount).val().length > 0)
		currentStock = parseFloat($('#textClStk' + rowCount).val());

	if (qty <= currentStock) 
	{
		   var finalAmout = Math.floor((ratePerUnit * qty)*100)/100;
		$('#txtAmt' + rowCount).val((finalAmout));
	
	/*	if ($('#textDisAmt' + rowCount).val() != ''
				&& $('#textDisAmt' + rowCount).val().length > 0) {
			DiscAmt = parseFloat($('#textDisAmt' + rowCount).val());
		}*/

		if ($('#textDis' + rowCount).val() != ''
				&& $('#textDis' + rowCount).val().length > 0) {
			discount = parseFloat($('#textDis' + rowCount).val());
			DiscAmt = Math.floor(((discount / 100) * finalAmout)*100)/100;
			$('#textDisAmt' + rowCount).val(DiscAmt);
		}
		/* $('#txtDiscAmt').val($('#textDisAmtPerUnit' + rowCount).val()); */

		/* alert($('#textDisAmt' + rowCount).val()); */

		if (DiscAmt <= finalAmout)
			{
			  var value = Math.floor(((ratePerUnit * qty)-DiscAmt)*100)/100;
			$('#txtAmt' + rowCount).val(value);
			}
		else 
		{
			 var value = Math.floor(((ratePerUnit * qty))*100)/100;
			$('#txtAmt' + rowCount).val(value);

		}
       
		var amt = parseFloat($('#txtAmt' + rowCount).val());
		
		
		/*var saleOnMrp=rate-DiscAmt;*/
		/*var saleOnPurchaseRate=parseFloat($('#textPurchaseRate' + rowCount).val());*/

		var saleOnPurchaseRate=(parseFloat($('#textPurchaseRate'+rowCount).val())/unit)*qty;
		
		if(parseFloat($('#textDisAmt'+rowCount).val())>0)
		{
		if(amt<saleOnPurchaseRate)
		{
			alert("Sale value of mrp is going less than purchase prise");
			$('#textPerRatePerUnitFlag'+rowCount).val(1);
			var ratePerUnit = (Math.floor(100*(purRate / unit))/100);
			$('#textRatePerUnit'+rowCount).val(ratePerUnit);
			$('#textDis' + rowCount).val('');
			$('#textDisAmt' + rowCount).val('');
			var value = Math.floor(((ratePerUnit * qty))*100)/100;
		     $('#txtAmt' + rowCount).val(value);
			 amt = parseFloat($('#txtAmt' + rowCount).val());
		}
		}
		val = (Math.floor(100 * (amt / qty)) / 100);

		$('#textRateForPrint' + rowCount).val(val);

		calculateVatAmount(rowCount);
		calculateGrossAmount();
		calculateTotalPurchase();
	} else {
		alert("Qty should be less than current stock");
		$('#txtAmt' + rowCount).val('');

		$('#txtQty' + rowCount).val('');
		setTimeout(function() {
			$('#txtQty' + rowCount).focus();
		}, 200);

		calculateVatAmount(rowCount);
		calculateGrossAmount();
		calculateTotalPurchase();
	}
}


function calculateVatAmount(rCount) {
	var rowCount = parseInt(rCount);
	var Amt = parseFloat($('#txtAmt' + rowCount).val());
	var vat = parseFloat($('#textVat' + rowCount).val());

	var vatAmt = 100 + vat;

	/* var result=parseFloat(((Amt/vatAmt)*vat).toFixed(2)); */

	var result = (Math.floor(100 * ((Amt / vatAmt) * vat)) / 100);

	$("#textcounterSlaveVatAmt" + rowCount).val(result);

}
function setTableDataByBarcode(r, rowCount) {
	var ratePerUnit = 0;
	var currentRow = rowCount;
	var discount = 0;
	if (r != "" && r != null) 
	{
		if ($('#textBarcode' + currentRow).val() != '') 
		{
			if (r[0].clearStock != 0.0) 
			{
				var unit=parseInt(r[0].unit);
				$('#txtProName' + currentRow).val(r[0].productName);
				$('#txtUnit' + currentRow).val(unit);
				$('#txtPack' + currentRow).val(r[0].pack);
				$('#txtComp' + currentRow).val(r[0].comp);
				$('#textBatch' + currentRow).val(r[0].batchCode);
				$('#txtExpiry' + currentRow).val(r[0].batchExpDate);
				$('#textVat' + currentRow).val(r[0].vat);
				$('#txtMRP' + currentRow).val(r[0].mrp);
				$('#textRate' + currentRow).val(r[0].rate);
				$('#textPurchaseRate' + currentRow).val(r[0].purchaseRate);
				$('#hiddenProductId' + currentRow).val(r[0].productId);
				$('#textBatchId' + currentRow).val(r[0].batchId);
				$('#txtShelfNo' + currentRow).val(r[0].shelfName);
				$('#txtPre' + currentRow).val(r[0].pre);

				$('#txtProductPrescription' + currentRow).val(r[0].presciption);

				$('#hiddenCategoryId' + currentRow).val(r[0].categoryId);
				
				/* $("#textProductName"+currentRow).prop("readonly",true); */
				var rate = parseFloat($('#textRate' + currentRow).val());
				var purRate = parseFloat($('#textPurchaseRate' + currentRow)
						.val());

				var unit = parseFloat($('#txtUnit' + currentRow).val());

				$('#textClStk' + currentRow).val(r[0].clearStock);
				$('#textTotalStk' + currentRow).val(r[0].clearStock);

				$('#textStockId' + currentRow).val(r[0].stockId);
				$('#textStockQtyInHand' + currentRow).val(r[0].clearStock);

				$('#txtQty' + currentRow).val("1");
				$('#txtAmt' + currentRow).val(r[0].mrp/r[0].unit);

				/* var ratePerUnit = parseFloat(rate / unit).toFixed(2); */
				/* $('#textRatePerUnit' + currentRow).val(ratePerUnit); */

				if ($("#radioMRP").is(":checked")) 
				{
					ratePerUnit = (rate / unit).toFixed(2);
				} 
				else
				{
					ratePerUnit = (purRate / unit).toFixed(2);
				}

				$('#textRatePerUnit' + currentRow).val(ratePerUnit);

				if ($('#hiddenProductId' + currentRow).val() != ''
						&& $('#hiddenProductId' + currentRow).val() != null)
					addNewRow('RowCount', currentRow);

				if ($('#txtProName' + currentRow).val() != "")
					$('#txtQty' + currentRow).focus();
				else
					$('#txtProName' + (currentRow + 1)).focus();
				
				$('#textDis' + currentRow).val(spDisc);
								
				if ($("#hiddenSponserFlag").val() == 'ACTIVE') {
					if ($("#hiddenTreatmentFlag").val() == 'ACTIVE') {

						for ( var i = 0; i < patientSaleparseData.result.length; i++) {

							var catId = $('#hiddenCategoryId' + currentRow)
									.val();
						
							if (catId == patientSaleparseData.result[i].pharma_category_id) {
								
								discount = patientSaleparseData.result[i].discount_in_percent;
								
								// alert("disc"+parseData.result[i].discount_in_percent);
								break;
							}
						}

						$('#textDis' + currentRow).val(discount);

					}

				}

			} else {
				alert("Product not found");
				$('#textBarcode' + currentRow).val('');
				$('#textBarcode' + currentRow).focus();
			}
		}
	} else {

		alert("Product not found");
		$('#textBarcode' + currentRow).val('');
		$('#textBarcode' + currentRow).focus();
	}
}

function chkDublicateRecortForBatch(rowCount, barcode) {

	var j = 1;
	var batchId;
	var batchId1;

	while (j < (totalRowCount)) {

		if ($('#textBatchId' + j).val() != '')
			batchId = $('#textBatchId' + j).val();
		else
			batchId = 0;

		/*
		 * batchId1 = $('#textBarcode' +rowCount).val();
		 */

		if ((batchId == barcode) && j != rowCount) {
			alert("Dublicate Record Not insert");
			$('#textBarcode' + rowCount).val('');
			return 0;

		}
		j++;
	}
	return 1;

}

function addNewRow(RowCount, currentRowCount) {

	var total = parseInt(currentRowCount) + 1;

	if ($('#txtProName' + total).val() == ""
			|| $('#txtProName' + total).val() == undefined) {
		var currentRow = currentRowCount;

		if (currentRow == undefined) {
			currentRow = 0;
		}

		var j = 1;

		var rowCount = $('#' + RowCount).val();
		if (rowCount == undefined) {
			rowCount = 1;
		}

		if (rowCount == -1) {
			rowCount = 0;
		}
		if (rowCount == currentRow) {
			rowCount++;
			rowId = "remove" + rowCount;
			var x = document.createElement('tr');
			x.setAttribute('id', rowId);
			/* x.setAttribute('class', 'col-md-12-1'); */
			x.setAttribute('style', 'margin-top:0px');
			document.getElementById("DRRDiv").appendChild(x);

			var index = parseInt(rowCount) - 1;

			document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
					+ (rowCount)
					+ "</label></td>"
					+ "<td style='display:none;'><input type='hidden' name='ltPatientSaleBill["
					+ index
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "' />"

					+ "<td style='display:none;'><input type='hidden' name='' id='hiddenCategoryId"
					+ rowCount
					+ "' />"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textRatePerUnit"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
					+ rowCount
					+ "' readonly='true'  name='ltPatientSaleBill["
					+ index
					+ "].patientSlavePurchaseRate'></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtPrescription"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtProductPrescription"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtIpdOpd"
					+ rowCount
					+ "' readonly='true'  readonly='true' ></td>"
					

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPerRatePerUnitFlag"
					+ rowCount
					+ "' readonly='true' ></td>"
					
					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='txtEditQty"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style='display:none;'><input type='text'  id='textDisAmt"
					+ rowCount
					+ "' class='form-control input-SmallText'></td>"

					+ "<td style='display:none;'><input type='text'  id='textDisAmtPerQty"
					+ rowCount
					+ "' name='ltPatientSaleBill["
					+ index
					+ "].patientSaleSlaveDiscAmt' class='form-control input-SmallText'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNoDelete'  id='textBarcode"
					+ rowCount
					+ "'  autocomplete='off' maxlength='150' onblur=fetchProductNameByBarcode(this.value,"
					+ rowCount
					+ ") onkeydown=clearBarcode("
					+ rowCount
					+ ",event)></td>"

					+ "<td><input id='txtProName"
					+ rowCount
					+ "' name='ltPatientSaleBill["
					+ index
					+ "].productMaster.productName'"
					+ " type='text' data-toggle='modal' data-target='#Patient_PopUp_Form' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' onclick='load("
					+ rowCount
					+ ")'  onkeypress='load("
					+ rowCount
					+ ")' ></td>"

					+ "<td style='display:none;'><input type='text' id='textRateForPrint"
					+ rowCount
					+ "' name='ltPatientSaleBill["
					+ index
					+ "].patientSlaveRatePerUnit' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' id='textcounterSlaveVatAmt"
					+ rowCount
					+ "' name='ltPatientSaleBill["
					+ index
					+ "].patientSlaveVatAmt' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td><input type='text' name='ltPatientSaleBill["
					+ index
					+ "].productMaster.productUnit' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' id='txtUnit"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='ltPatientSaleBill["
					+ index
					+ "].productMaster.packingMaster.packType' id='txtPack"
					+ rowCount
					+ "' readonly='true'></td>"
					
					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ index
					+ "].productMaster.preparationMaster.preparationName' id='txtPre"
					+ rowCount
					+ "' readonly='true' tabindex='-1' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ index
					+ "].productMaster.companyMaster.compName' id='txtComp"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
					+ index
					+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
					+ index
					+ "].patientSaleSlaveIssueQty' readonly id='textIssueQty"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td style='display:none;'><input type='text' name='ltPatientSaleBill["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly='true'></td>"

					+ "<td><input type='text'name='ltPatientSaleBill["
					+ index
					+ "].patientSlaveVat'  class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textVat"
					+ rowCount
					+ "' readonly='true'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ index
					+ "].patientSlaveBatchCode'  id='textBatch"
					+ rowCount
					+ "' readonly='true'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='txtExpiry"
					+ rowCount
					+ "' name='ltPatientSaleBill["
					+ index
					+ "].patientSaleBatchExpiry' readonly='true'></td>"

					/*
					 * + "<td><input type='text' class='form-control
					 * input-SmallText' id='txtShelfNo" + rowCount + "'
					 * readonly='true'></td>"
					 */

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='txtMRP"
					+ rowCount
					+ "'  name='ltPatientSaleBill["
					+ index
					+ "].patientSlaveMrp' readonly='true'></td>"

					+ "<td><input type='text'  id='textDis"
					+ rowCount
					+ "'    class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='textClStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ index
					+ "].patientSlaveQty' onblur=isNumber('txtQty"
					+ rowCount
					+ "'),calculateAmt("
					+ rowCount
					+ "),calculatet();  id='txtQty"
					+ rowCount
					+ "' ></td>"

					+ "<td style='display: none;' ><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  name='ltPatientSaleBill["
					+ index
					+ "].patientSlaveRate' id='textRate"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo'  id='txtAmt"
					+ rowCount
					+ "' name='ltPatientSaleBill["
					+ index
					+ "].patientSlaveAmt' readonly='true' ></td>"
					+ "<td><input type='checkbox'  class='form-control input-SmallText # deleteGroup"
					+ rowCount
					+ " # textNo' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
			+"</tr>";
			$("#RowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;
			totalRowCount++;

			/* calculateAmount(currentRowCount); */
		} else {
			$('#txtProName' + rowCount).val('');
			$('#txtUnit' + rowCount).val('');
			$('#txtPack' + rowCount).val('');
			$('#txtComp' + rowCount).val('');
			$('#textBatch' + rowCount).val('');
			$('#txtExpiry' + rowCount).val('');
			$('#textVat' + rowCount).val('');
			$('#txtMRP' + rowCount).val('');
			$('#textRate' + rowCount).val('');
			$('#textPurchaseRate' + rowCount).val('');
			$('#hiddenProductId' + rowCount).val('');
			$('#textBatchId' + rowCount).val('');
			$('#textClStk' + rowCount).val('');
			$('#textTotalStk' + rowCount).val('');
			$('#textStockId' + rowCount).val('');
			$('#textStockQtyInHand' + rowCount).val('');
			$('#textRatePerUnit' + rowCount).val('');

		}
	}
}

function expiryBatches() {

	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1; // Months are zero based
	var curr_year = d.getFullYear();
	var divContent = "";
	var callform="all";
	/* alert(curr_year + "-" + curr_month + "-" + curr_date); */
	jQuery
			.ajax({
				url : "../../pharmacy/report/getNearExpiryReport",
				method : "post",
				data : {
					//from : "1/" + curr_month + "/" + curr_year,
					from : curr_year+ "-" + +curr_month + "-" + "1",
					callform,
				},

				success : function(r) {
					divContent = "<marquee>";
					for ( var i = 0; i < r.length; i++) {
						divContent = divContent
								+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa fa-medkit'></i><b>Batch Code-"
								+ r[i].batchCode
								+ "</b> &nbsp;&nbsp;&nbsp;<b> Product Name -"
								+ r[i].productName
								+ "&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b> Batch Expiry -"
								+ r[i].batchExpiry;

					}
					divContent = divContent + "</marquee>";
					$('#marquee').html(divContent);
				},
				error : function(error) {
					alert(error);
				}
			});
}

function setFocusForDiscount() {

	if ($("#radioCD").is(":checked")) {
		$('#txtSpecialDisc').attr('readonly', 'true');
		$("#txtCD").removeAttr("readonly");
		$('#txtCD').val(0);
		$('#txtCDAmt').val(0);
		$('#txtSpecialDisc').val(0);
		$('#txtLess').val(0);

		$('#txtCD').focus();

	} else if ($("#radioSpeDisc").is(":checked")) {
		$('#txtCD').attr('readonly', 'true');
		$("#txtSpecialDisc").removeAttr("readonly");
		$('#txtCD').val(0);
		$('#txtCDAmt').val(0);
		$('#txtSpecialDisc').val(0);
		$('#txtLess').val(0);
		$('#txtSpecialDisc').focus();

	}

	calculateNetAmount();
}
/******
 * @author  :Bilal
 * @date    :08-12-2017
 * @code    :For calculate patient sale 
 * ******/
function newcalculate(){
	var rowCount   = $('#RowCount').val();
	
	
	calculateAmt(rowCount);
}
function calculatet(){
	
	var netAmt = 0;
	//var amtReceive = 0;
	var prevBal = 0;

	if ($('#txtNetAmt').val() != '' && $('#txtNetAmt').val() != null)
		netAmt = parseFloat($('#txtNetAmt').val());

	/*if ($('#txtAmtReceived').val() != '' && $('#txtAmtReceived').val() != null)
		amtReceive = parseFloat($('#txtAmtReceived').val());*/

	if ($('#mainPendingBalance').html() != ''
			&& $('#mainPendingBalance').html() != null)
		prevBal = parseFloat($('#mainPendingBalance').html());

	var total = (prevBal + netAmt) ;
	var value=Math.floor((total)*100)/100;
	//$('#txtAmtBalance').val(value);
	if ($("#radioCredit").is(":checked")){
		$('#txtAmtReceived').val(0);
		$('#txtAmtBalance').val(value);
	}
	else
		$('#txtAmtReceived').val(value);
}


/************
* @author	:Rohini Ambhore
* @date		: 16-Dec-2021
* @codeFor	: Autosuggesion for doctor name
 **************/

function setAutoDoctorNameNew(inputID, onload, callFrom){
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if (callFrom == "OPD_Appoinment") {
		auto = 'DoctorName';
	}
	
	var inputs = [];

	inputs.push('findingName=' + findingName);
	//inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery.ajax({
		
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/patientSale/AutoSuggestionForDoctorName",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error...');
		},
		success : function(response) {
			//alert('............response.......'+JSON.stringify(response));
			var template = "";
			
			for ( var j = 0; j < response.lstDoctorDto.length; j++) {
				
				var address =response.lstDoctorDto[j].address;
				
				if(address==undefined || address=="undefined" ){
					address="";
					}
				 
				var arrValue = //response.listDoctorDetails[j].doctor_ID +"-"+
				response.lstDoctorDto[j].doc_name
			+" "+address;
			
				var idValue = response.lstDoctorDto[j].doctor_ID;
				var docName = response.lstDoctorDto[j].doc_name;
				var docaddrss = response.lstDoctorDto[j].address;
				
				resultData.push({
					ID : idValue,
					Name : docName,
					docaddrss : docaddrss
				});
				
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

				
			setTimeout(function() {
				
				$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name', //+ " "+'docaddrss',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				
				
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
			
			}
	});
		
	
	function displayResult(item) {
		//alert(item);
		var res = item.text;
		var docId = item.value;
		///var doc_name1 = docId;
	//	var doc_name =doc_name1[0];
		
	
		//var docAdd= res[1];	
		var docAdd = "";
		$('#hiddenDoctorId').val(docId);
		
		
		if(docAdd==undefined || docAdd=="undefined" ){
			docAdd="";
		}
	   $('#txtDoctorAddress').val(docAdd);
		
	}
}

