/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For getting pharmacy pending amount of paitient
 ************/
function pendingAmoutPharma(){
	var treatmentId	= parseInt($("#treatmentId").text());	
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/indentSale/getPendingAmountByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						
						if (r > 0) {
							//$("#PharmacyCashReturn").html(r);
							$("#hideshowiPharmacyBtn").show('show'); 
						}
					}
				});
}

}
function returnAmoutPharma(){
	var treatmentId	= parseInt($("#treatmentId").text());	
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/indentSale/getReturnAmt",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						
						if (r > 0) {
							$("#PharmacyCashReturn").html(r);
							
						}
					}
				});
    }

}
/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For getting pharmacy pending amount of paitient
 ************/
function displayPendingAmountByTreatmentId(callfrom) {

	$("#pendingAmount").css({
		"background-color" : "white"
	});
	$("#iPatientAMT").css({
		"background-color" : "white"
	});
	$("#iPharmacyAMT").css({
		"background-color" : "white"
	});
	$("#iPharmacyTotalAMT").css({
		"background-color" : "white"
	});

	//var treatmentId = $("#trid").val();
	var treatmentId	= parseInt($("#treatmentId").text());	
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('spId=' + $("#idForDisc").val());

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/indentSale/getPendingAmountByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						var res=r.split("#");
						var result = res[0];
						setTimeout(
								function() {
									var pending;
									var amt;
									result = parseFloat(result).toFixed(2);
									if (parseFloat(result) == '0.0') {
										setTimeout(
												function() {
													document
															.getElementById("iPharmacyBtn").style.background = 'green';
													$("#pendingAmount")
															.val(
																	"No Pending Balance");
													$("#iPatientAMT")
															.val(
																	"No Pending Balance");
													amt = $("#tdTotal12")
															.text();
													var amount = amt;
													$("#iPharmacyAMT").val(
															amount);
													if (callfrom == "previous") {
														$(
																"#PharmacyAdvancePaid")
																.text(amount);
													} else if (callfrom == "advance") {
														if ($("#pendingAmount")
																.val() == "No Pending Balance"
																&& $(
																		"#iPatientAMT")
																		.val() == "No Pending Balance") {
															var value = $(
																	"#PharmacyAdvancePaid")
																	.text();
															$(
																	"#PharmacyAdvancePaid")
																	.text(value);
															$("#iPharmacyAMT")
																	.val(value);
														}

													} else {

														if ($("#pendingAmount")
																.val() == "No Pending Balance"
																&& $(
																		"#iPatientAMT")
																		.val() == "No Pending Balance") {
															var value = $(
																	"#PharmacyAdvancePaid")
																	.text();
															$(
																	"#PharmacyAdvancePaid")
																	.text(value);
															$("#iPharmacyAMT")
																	.val(value);
														}													
													}

													/*$("#iPharmacyTotalAMT")
															.val(amount);*/
													$("#iPharmacyTotalAMT").val(res[1]);
													
												}, 200);

										$("#DispatchAmt").hide('hide');
										$("#RecieveAmt").hide('hide');
									} else if (result < "0.00"
											|| result < '0.00') {

										document.getElementById("iPharmacyBtn").style.background = '#DAA520';
										var resultnew = (result * -1);
										$("#pendingAmount").val(
												resultnew.toFixed(2));
										$("#iPharmacyTotalAMT").val(
												$("#tdTotal12").text());

										$("#iPatientAMT").val('0.0');
										var pharmaTotal = parseFloat($(
												"#iPharmacyTotalAMT").val());
										var pharmaBalOrReceeved = (result * -1)
												+ pharmaTotal;
										$("#DispatchAmt").show('show');
										$("#RecieveAmt").hide('hide');

										if (callfrom === "previous") {
											$("#PharmacyAdvancePaid").text(
													pharmaBalOrReceeved
															.toFixed(2));

										} else if (callfrom === "advance") {
											$("#PharmacyAdvancePaid").text(
													pharmaBalOrReceeved
															.toFixed(2));
										} else {
											$("#PharmacyAdvancePaid").text(
													pharmaBalOrReceeved
															.toFixed(2));
											var pharmapaid = 0;
											if ($("#iPharmacyAMT").val() != "") {
												pharmapaid = $("#iPharmacyAMT")
														.val();
											}
											$("#PharmacyAdvancePaid").text(
													pharmapaid);
											
											$("#iPharmacyTotalAMT").val(res[1]);
										}
									} else {
										document.getElementById("iPharmacyBtn").style.background = 'red';
										pending = $("#pendingAmount").val(
												parseFloat(result));
										if (callfrom == "previous") {
											$("#pendingAmount").val('0.0');
											$("#iPatientAMT").val(result);

											$("#iPharmacyTotalAMT").val(
													$("#tdTotal12").text());

											$("#DispatchAmt").hide('hide');
											$("#RecieveAmt").show('show');
											var pharmapaid = 0;
											if ($("#iPharmacyAMT").val() != "") {
												pharmapaid = $("#iPharmacyAMT")
														.val();
											}
											$("#PharmacyAdvancePaid").text(
													pharmapaid);
											

										} else if (callfrom == "advance") {
											$("#pendingAmount").val('0.0');
											$("#iPatientAMT").val(result);

											$("#iPharmacyTotalAMT").val(
													$("#tdTotal12").text());

											$("#DispatchAmt").hide('hide');
											$("#RecieveAmt").show('show');

											var pharmapaid = 0;
											if ($("#iPharmacyAMT").val() != "") {
												pharmapaid = $("#iPharmacyAMT")
														.val();
											}
											$("#PharmacyAdvancePaid").text(
													pharmapaid);
											

										} else {
											$("#pendingAmount").val('0.0');
											$("#iPatientAMT").val(result);

											$("#iPharmacyTotalAMT").val(
													$("#tdTotal12").text());
											var pharmapaid = 0;
											if ($("#iPharmacyAMT").val() != "") {
												pharmapaid = $("#iPharmacyAMT")
														.val();
											}
											
											$("#PharmacyAdvancePaid").text(pharmapaid);
											$("#iPharmacyTotalAMT").val(res[1]);
											
											$("#DispatchAmt").hide('hide');
											$("#RecieveAmt").show('show');
											
											$('#indentCheck').prop('checked', true);
										}
									}
								}, 200);
					}
				});
		
		hospitalPaymentData(treatmentId);
	//	patientPaymentData(treatmentId);
		getPendingAmountByTreatmentIdPatientSale(treatmentId);
		fetchOTPendingAmountByTreatmentId(treatmentId);
		return true;
	}
}
/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For getting pharmacy hospital payment data of paitient
 ************/
function hospitalPaymentData(treatmentId) {

	
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/indentSale/getHospitalPaymentDetailsTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						
						setHospitalBillData(r);

					}
				});

		return true;
	} else {
		$("#indentHospitalPaymentDiv").html("");
	}

}

/************
* @author	: Parikshit
* @date		: 11-JAN-2018
* @codeFor	: For getting pharmacy patient sale(ipd credit) payment data of patient
 ************/
function patientPaymentData(treatmentId) {

	
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('spId=' + $("#idForDisc").val());
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/patientSale/getPendingAmountByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						$("#patientSaleAmt").val(r);
						//setPatientBillData(r);

					}
				});

		return true;
	} else {
		$("#indentHospitalPaymentDiv").html("");
	}

}

function fetchOTPendingAmountByTreatmentId(treatmentId) {
	
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('tId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : false,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "ehat/ot/fetchOTPendingAmountByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						
						var totalAmount = r.patientSalesBillAmountBalance;
						if(totalAmount!=0){
							
							$('#otCheck').prop('checked', true);
						}
						$("#otAmt").val(totalAmount);
						//setPatientBillData(r);

					}
				});

		return true;
	} else {
		$("#indentHospitalPaymentDiv").html("");
	}

}

function setPatientBillData(r) {

	var divContent = "";
	divContent = divContent
			+ "<b>Patient Sale Payment Details</b><table border=1 class='table table-striped table-bordered header-fixed cf '><thead style='background-color: #D3D3D3;'><tr><th>Patient Balance</th></tr></thead><tbody><tr><td>"
			+r
			+"</td></tr></tbody></table>";
	
	$("#indentHospitalPaymentDiv").html(divContent);
	
}

/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For setting  hospital payment data of paitient
 ************/
function setHospitalBillData(r) {

	var divContent = "";
	divContent = divContent
			+ "<b>Hospital Payment Details</b><table border=1 class='table table-striped table-bordered header-fixed cf '><thead style='background-color: #D3D3D3;'><tr><th>Amount Received By Hospital</th><th>Amount Paid By Hospital</th><th>Narration </th> <th>Final Date</th><th>Time</th><th>Print</th></thead></tr>";
	if (r.length > 0) {

		for ( var i = 0; i < r.length; i++) {

			divContent = divContent
					+ "<tbody><tr>"
					+ "<td> "
					+ r[i].amountReceive
					+ "</td>  <td>"
					+ r[i].amountBal
					+ "</td>  <td>"
					+ r[i].narration
					+ "</td>  <td id='historyId"
					+ r[i].historyId
					+ "' style='display:none' value='"
					+ r[i].historyId
					+ "' ><td>"
					+ r[i].date
					+ "</td><td>"
					+ r[i].time
					+ "</td><td><a  class='btn btn-xs btn-info' href='/MAHAHMIS/pharmacy/indentSale/printHospitalPaymentReceipt?receiptId="
					+ r[i].historyId
					+ "' target='_blank'>Print</a></td></tr></tbody>";
		}

		divContent = divContent + "</table>";

		$("#indentHospitalPaymentDiv").html(divContent);
	} else {
		$("#indentHospitalPaymentDiv")
				.html(
						divContent
								+ "<tbody><tr><td colspan='6'>No Hospital Payment Received</td></tr></tbody>");
	}
}




/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For seding or saving total receied amount to pharmacy of paitient
 ************/
function SendTotalRecievedOrPaidAmountToPharmacy() {

	var treatmentId	= parseInt($("#treatmentId").text());	
	var pharmaOrPatientBalance=0;
	var confirmMsg ="";
	var BalanceType ="";
	if ($("#pendingAmount").val() != 0.0 || $("#pendingAmount").val() != 0.00) {
		confirmMsg = confirm("Do you want to pay this amount to Patient?");
		pharmaOrPatientBalance = $("#pendingAmount").val();
		BalanceType = "PharmaBalance";
	}
	if ($("#iPatientAMT").val() != 0.0 || $("#iPatientAMT").val() != 0.00) {
		confirmMsg = confirm("Do you want to recieve this amount from Patient?");
		pharmaOrPatientBalance = $("#iPatientAMT").val();
		BalanceType = "PatientBalance";
	}

	if (confirmMsg == true) {

		if (treatmentId != '') {
			var inputs = [];
			inputs.push('treatmentId=' + treatmentId);
			inputs.push('amount=' + pharmaOrPatientBalance);
			inputs.push('BalanceType=' + BalanceType);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/MAHAHMIS/pharmacy/indentSale/saveHospitalPayDetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					
				},
				success : function(r) {
					var result = r;
					if (result == "Ok") {
						hospitalRecievedOrPaidAmount();
						
					} else {

						alert("Error in dispatching amount to pharmacy..");
					}
				}
			});
		}
	}
}
/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For hospital received amount of paitient
 ************/
function hospitalRecievedOrPaidAmount() {
	
	var treatmentId	= parseInt($("#treatmentId").text());
	var pharmaBalance = $("#pendingAmount").val();
	var PharmacyTotalBill = $("#iPharmacyTotalAMT").val();
	var PharmacyTotalReceived = $("#iPharmacyAMT").val();
	var narration = $("#narration").val();
	var PatientBalance=0.0;
	
	if (PharmacyTotalBill == "" || PharmacyTotalBill == null || PharmacyTotalBill == undefined || isNaN(PharmacyTotalBill)) {
		PharmacyTotalBill = 0.0;
	}
	
	if (PatientBalance != '0.0') {
		PatientBalance = $("#iPatientAMT").val();
	} else {
		PatientBalance = '0.0';
	}
	if (pharmaBalance != '0.00') {
		pharmaBalance = $("#pendingAmount").val();
	} else {
		pharmaBalance = '0.00';
	}

	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('pharmaBalance=' + pharmaBalance);
		inputs.push('PharmacyTotalBill=' + encodeURIComponent(PharmacyTotalBill));
		inputs.push('PharmacyTotalReceived=' + PharmacyTotalReceived);
		inputs.push('PatientBalance=' + PatientBalance);
		inputs.push('narration=' + narration);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/MAHAHMIS/pharmacy/indentSale/saveHospitalTotalPayDetails",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
					},
					success : function(r) {
						var result = r;
						alert(result);
						var pharmaTotal = parseFloat($("#iPharmacyTotalAMT")
								.val());
						var pharmaBalOrReceeved = (pharmaBalance * -1)
								+ pharmaTotal;
						var pharmaPaid = $("#PharmacyAdvancePaid").text(
								pharmaBalOrReceeved.toFixed(2));
						/*var finalpayble = $("#finalPayable").text();
						var newOutstading = finalpayble
								- parseFloat(pharmaPaid);*/

						//$("#finalOutstanding").text(newOutstading.toFixed(2));
						window.location.reload(true);

					}
				});
	}
}
/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For discount amount of paitient 
 ************/
function TotalDiscountByPharmacyOnBillByTreatmentId(callfrom) {
	var treatmentId	= parseInt($("#treatmentId").text());
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/indentSale/GetTotalDiscountOnBillByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						var resultDisc = r;
						if (callfrom == 'previous') {
							$("#pharma_discount").val(
									parseFloat(resultDisc).toFixed(2));
							$("#pharmacydiscount").val(
									parseFloat(resultDisc).toFixed(2));
						}
						if (callfrom == 'advance') {
							$("#pharma_discount").val(
									parseFloat(resultDisc).toFixed(2));
							$("#pharmacydiscount").val(
									parseFloat(resultDisc).toFixed(2));
						} else {
							$("#pharma_discount").val(
									parseFloat(resultDisc).toFixed(2));
							$("#pharmacydiscount").val(
									parseFloat(resultDisc).toFixed(2));
						}
					}
				});
	}
}
/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For getting total payble by treatment id of paitient 
 ************/
function GetTotalPaybleByTreatId(callfrom) {
	var treatmentId	= parseInt($("#treatmentId").text());
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/creditNote/getTotalPaybleByTreatId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						// alert(parseFloat(r).toFixed(2));
						if (callfrom == 'general') {
							$("#PharmacyCashReturn").text(
									parseFloat(r).toFixed(2));
						} else if (callfrom == 'previous') {
							$("#PharmacyCashReturn").text(
									parseFloat(r).toFixed(2));
						} else if (callfrom == 'advance') {
							$("#PharmacyCashReturn").text(
									parseFloat(r).toFixed(2));
						}
					}
				});
	}
}
/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For  total Received amount by treatment id of paitient 
 ************/
function displayTotalRecievedAmountByTreatmentId(callfrom) {
	var treatmentId	= parseInt($("#treatmentId").text());
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/indentSale/getReceiveAmountByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {

						var result2 = r;
						if (callfrom == 'current') {
							$("#iPharmacyAMT").val(
									parseFloat(result2).toFixed(2));
							$("#PharmacyAdvancePaid").text(
									parseFloat(result2).toFixed(2));
						} else if (callfrom == 'previous') {
							setTimeout(function() {
								$("#iPharmacyAMT").val(
										parseFloat(result2).toFixed(2));
								$("#PharmacyAdvancePaid").text(
										parseFloat(result2).toFixed(2));
							}, 1000);
						} else if (callfrom == 'advance') {

							setTimeout(function() {
								$("#iPharmacyAMT").val(
										parseFloat(result2).toFixed(2));
								$("#PharmacyAdvancePaid").text(
										parseFloat(result2).toFixed(2));
							}, 500);
						}
					}
				});
	}
}
/************
* @author	: BILAL
* @date		: 07-DEC-2017
* @codeFor	: For  getting total indent by treatment id of paitient 
 ************/
var phramacounter = 1;
var PharmaTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
	+ "<thead class='cf' style='background: white;'>"
	+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Indent ID</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Net Amount</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Discount</div></th>"
	+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Gross Amount</div></th>"
	+ "{#foreach $T as result}"
	+ "<tr>"
	+ "<td class='col-md-1 center table-bordered'>{phramacounter++}</td>"
	+ "<td class='col-md-2 center table-bordered'>{$T.result.indentId}</td>"
	+ "<td class='col-md-2 center table-bordered'>{$T.result.netAmt}</td>"
	+ "<td class='col-md-2 center table-bordered'>{$T.result.less}</td>"
	+ "<td class='col-md-2 center table-bordered'>{$T.result.grossAmt}</td>"
	+ "</td></tr>{#/for}</table>";

function getTotalindentDataByTreatmentId(callfrom) {
	var treatmentId	= parseInt($("#treatmentId").text());
	if (treatmentId != '') {
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/indentSale/getTotalindetDataByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						var pobj1 = eval('(' + r + ')');
						if (pobj1.length > 0) {
							/*$("#PharmaInfoTable").empty();
							var i=1;
							$.each(pobj1,function(){
								$("#PharmaInfoTable").append('<tr><td class="col-md-1 center table-bordered">'+ i++ +'</td><td class="col-md-2 center table-bordered">'+this.indentId+'</td><td class="col-md-2 center table-bordered">'+this.netAmt+'</td><td class="col-md-2 center table-bordered">'+this.less+'</td><td class="col-md-2 center table-bordered">'+this.grossAmt+'</td></tr>');
							});*/
							
							
							
							if (callfrom == "previous") {
								$("#PharmaInfoTable").setTemplate(PharmaTemp);
								$("#PharmaInfoTable").processTemplate(pobj1);
								$("#PharmaInfoTableAjax").html(r);
							} else {
								$("#PharmaInfoTable").setTemplate(PharmaTemp);
								$("#PharmaInfoTable").processTemplate(pobj1);
								$("#PharmaInfoTableAjax").html(r);
							}
						}
					}
				});
	}
}

/************
* @author	: Vishant
* @date		: 18-DEC-2023
* @codeFor	: For getting pharmacy patient sale(ipd credit) payment data of patient
 ************/
function getPendingAmountByTreatmentIdPatientSale(treatmentId) {

	
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('spId=' + $("#idForDisc").val());
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "pharmacy/patientSale/getPendingAmountByTreatmentIdPatientSale",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						
						var res=r.split("#");
						var result = res[0];
						
						if(result==0){
							$('#patientCheck').prop('checked', true);
							result = res[1];
						}
						else{
							$('#patientCheck').prop('checked', true);
							result = res[0];
						}
						$("#patientSaleAmt").val(result);
						//setPatientBillData(r);

					}
				});

		return true;
	} else {
		$("#indentHospitalPaymentDiv").html("");
	}

}

/***********
 * @author	: Vishant Pawar
 * @date	: 20-DEC-2023
 * @reason	: Authorised Users List for pharmacy payment 
 **********/
function fetchAuthorisedByPharmacyPayment(){
	
	var finalbillis = $("#finalbillis").val();
	if(finalbillis=="generalBill"){
		$("#outstandAmt").attr("disabled", true);
	}
	
	var inputs = [];
	inputs.push('unitId=1');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "ehat/users/fetchAuthorisedBy",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {
			
			setAuthorisedByPharmacyPayment(r);
			//$("#discAuthSel").setTemplate(authorisedByListTemplate);
			//$("#discAuthSel").processTemplate(data);
			//$("#refAuthSel").setTemplate(authorisedByListTemplate);
			//$("#refAuthSel").processTemplate(data);			
		}
	});	
} 

function setAuthorisedByPharmacyPayment(r){
	
	var htm="<option value=0>-- Select --</option>";
	for(var i=0; i<r.length; i++){
		
		htm = htm + "<option value="+r[i].doctor_ID+">"+r[i].doc_name+"</option>";
	}
	$("#discBy").html(htm);
	//$("#refAuthSel").html(htm);
}

/***********
 * @author	: Vishant Pawar
 * @date	: 20-DEC-2023
 * @reason	: Calculate Discount 
 **********/
function funDiscForPharmacyPayment(){
	
		var tmp=$("#disc1").val();
		
		var r = confirm("Are You Sure Want To Give Discount Of "+ tmp +" Rs.");
		if (r == true) {
			
			$("#Indent_Sales_pending_data").hide();
			$("#userNameandpasswordPopUpNew").show();
			$("#disc2").val(0);
			return false;
		}
		
	   var pending=0.0;
	   pending = $("#pendingTot").val();
	   if($("#pendingTot").val()!="")
	   pending=parseFloat($("#pendingTot").val());
//	   var tmp=$("#disc1").val();
	   if(tmp>100){
		   alertify.success("Discount % is greter than 100...!");
		   $("#disc1").val(0);
		   $("#disc2").val(0.0);
		   return;
	   }
	   $("#disc2").val((pending*(tmp/100)).toFixed(2));
	   $("#fAmt").val((pending-(pending*(tmp/100))).toFixed(2));
}

//added by vishant
function funDiscForPharmacyPayment2(){
	
	var tmp=$("#disc2").val();
	var r = confirm("Are You Sure Want To Give Discount Of "+ tmp +" Rs.");
	if (r == true) {
		$("#Indent_Sales_pending_data").hide();
		$("#userNameandpasswordPopUpNew").show();
		$("#disc1").val(0);
		return false;
	}
	
	   var pending=0.0;
	   if($("#pendingTot").val()!="")
		   pending=parseFloat($("#pendingTot").val());
//	   var tmp=$("#disc2").val();
	   var tmp1=pending;
	   if(parseFloat(tmp)>parseFloat(tmp1)){
		   alertify.success("Discount Amount is greter than pending amount...!");
		   $("#disc2").val(0.0);
		  // $("#disc1").val(0);
		   return;
	   }
		   
	   $("#disc1").val(((tmp*100)/pending).toFixed(2));
	   $("#fAmt").val((pending-tmp).toFixed(2));
}

/************
* @author	: Vishant Pawar
* @date		: 20-Dec-2023
* @codeFor	: Set validate part for username And password
 ************/
function checkUserNameandPasswordcalDiscountPharamcy() 
{
	
	 var userId = parseInt($("#discBy").val());
	 var userName = $("#userName5").val();
	 var userPassword = $("#userPassword5").val();

	if (userName == "" || userPassword == "") {
		alert(" Please Fill All Details ");
		 $("#userNameandpasswordPopUpNew").hide();
		 $("#Indent_Sales_pending_data").show();
		return false;
	}
	
	if (userId == "" || userId == undefined || userId == null ) {
		userId ==0;
		alert(" Please select Authorized Person ");
		 $("#userNameandpasswordPopUpNew").hide();
		 $("#Indent_Sales_pending_data").show();
		return false;
	}
	
	var inputs = [];
	inputs.push('userPassword=' + userPassword);
	inputs.push('userName=' + userName);
	inputs.push('userId=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url  : "ehat/bill/checkUserNameandPasswordByRefundApproved",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			 var b = r.replace(/"/g, "");
			 if(b=="Invalid User Name or Password")
			 {
				alert("Invalid User Name or Password");
				return false;
				
			 }else
			 { 
					
				 alert("Approved  Successfully");
				   // $('#disCount').val('Y');
				 
				    $("#userNameandpasswordPopUpNew").hide();
				    $("#Indent_Sales_pending_data").show();
				    $("#userName5").val('');
					$("#userPassword5").val('');
					$('#userNameandpasswordPopUpNew').removeClass('fade');
					$('#userNameandpasswordPopUpNew').modal('hide');
					
					var tmp2=$("#disc1").val();
					if(tmp2!=0){
						
						 var pending=0.0;
						   pending = $("#pendingTot").val();
						   if($("#pendingTot").val()!="")
						   pending=parseFloat($("#pendingTot").val());
						   var tmp=$("#disc1").val();
						   if(tmp>100){
							   alertify.success("Discount % is greter than 100...!");
							   $("#disc1").val(0);
							   $("#disc2").val(0.0);
							   return;
						   }
						   $("#disc2").val((pending*(tmp/100)).toFixed(2));
						   $("#fAmt").val((pending-(pending*(tmp/100))).toFixed(2));
					}
					else{
						
						  var pending=0.0;
						   if($("#pendingTot").val()!="")
							   pending=parseFloat($("#pendingTot").val());
						   var tmp=$("#disc2").val();
						   var tmp1=pending;
						   if(parseFloat(tmp)>parseFloat(tmp1)){
							   alertify.success("Discount Amount is greter than pending amount...!");
							   $("#disc2").val(0.0);
							  // $("#disc1").val(0);
							   return;
						   }
							   
						   $("#disc1").val(((tmp*100)/pending).toFixed(2));
						   $("#fAmt").val((pending-tmp).toFixed(2));
						
					}
				
			 }
          
		}
	});
}

function hideDispecedpopup1() {
	
	 $("#userNameandpasswordPopUpNew").hide();
	 $("#Indent_Sales_pending_data").show();
	 $("#userName5").val('');
	 $("#userPassword5").val('');
	
	 //$("#payNow").val(0);
	 $("#disc1").val(0);
	 $("#disc2").val(0);
		 
	}

//added by vishant
function getDiscOfSponserPharmacyBilling(no){
	var chargesSlaveId = $("#idForDisc").val();

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId
		},
		/*url : "ehat/ipdbill/getPatientServiceBillSponsorForIpd",*/
		url : "ehat/ipdbill/getSponcerDisc",
		success : function(r) {
			$("#disc1").val(r);
			$('#patientCheck').prop('checked', true);
			$('#narCheck').prop('checked', true);
			
			$("#pendingTot").val(0);
			
			if(no==0){
				$('#otCheck').prop('checked', true);
				$('#indentCheck').prop('checked', true);
				checkFunPharmacy(1);
				checkFunPharmacy(3);
			}
			checkFunPharmacy(2);
			checkFunPharmacy(4);
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

/***************************************
code by vishant
**************************************/
var indentFlag=0,patientFlag=0,otFlag=0,narFlag=0;
function checkFunPharmacy(val){
	   var pending=0.0;
	   if($("#pendingTot").val()!="")
		   pending=parseFloat($("#pendingTot").val());
	   if(val=='1'){
		   var tmp=0.0;
		   if ($("#pendingAmount")
					.val() != "No Pending Balance"
					&& $(
							"#iPatientAMT")
							.val() != "No Pending Balance") {
			   tmp=parseFloat($("#iPatientAMT").val());
		   
			   if($('#indentCheck:checkbox:checked').length > 0){
				   $("#pendingTot").val(pending + tmp);
				   indentFlag=1;
			   }
			   else{
				   $("#pendingTot").val(pending - tmp);
				   indentFlag=0;
			   }
		   }
		   else{
			   $('#indentCheck').prop('checked',false);
			   //alertify.success("No amount Pending...!");
			   return;
		   }
	   }
	   
	   if(val=='2'){
		   
		   if(!(parseFloat($("#patientSaleAmt").val())>0)){
			   $('#patientCheck').prop('checked',false);
			   //alertify.success("No amount Pending...!");
			   return;
		   }
		   
		   if($('#patientCheck:checkbox:checked').length > 0){
			   $("#pendingTot").val(+pending + +parseFloat($("#patientSaleAmt").val()));
			   patientFlag=1;
		   }
		   else{
			   $("#pendingTot").val(pending - parseFloat($("#patientSaleAmt").val()));
			   patientFlag=0;
		   }
	   }
	   
	   if(val=='3'){
		   
		   if(!(parseFloat($("#otAmt").val())>0)){
			   $('#otCheck').prop('checked',false);
			   //alertify.success("No amount Pending...!");
			   return;
		   }
		   
		   if($('#otCheck:checkbox:checked').length > 0){
			   $("#pendingTot").val(+pending + +parseFloat($("#otAmt").val()));
			   otFlag=1;
		   }
		   else{
			   $("#pendingTot").val(pending - parseFloat($("#otAmt").val()));
			   otFlag=0;
		   }
	   }
	   
		if(val=='4'){
		   
		   if(!(parseFloat($("#narAmt").val())>0)){
			   $('#narCheck').prop('checked',false);
			   alertify.success("No amount Pending...!");
			   return;
		   }
		   
		   if($('#narCheck:checkbox:checked').length > 0){
			   $("#pendingTot").val(+pending + +parseFloat($("#narAmt").val()));
			   narFlag=1;
		   }
		   else{
			   $("#pendingTot").val(pending - parseFloat($("#narAmt").val()));
			   narFlag=0;
		   }
	   }
	   if($("#pendingTot").val()==0){
		   $("#fAmt").val(0.0);
		   $("#disc2").val(0.0);
		   return;
	   }
	   funDiscPharmacy1();
}

function funDiscPharmacy1(){
	   var pending=0.0;
	   if($("#pendingTot").val()!="")
		   pending=parseFloat($("#pendingTot").val());
	   var tmp=$("#disc1").val();
	   if(tmp>100){
		   alertify.success("Discount % is greter than 100...!");
		   //$("#disc1").val(0);
		   $("#disc2").val(0.0);
		   return;
	   }
	   $("#disc2").val((pending*(tmp/100)).toFixed(2));
	   $("#fAmt").val((pending-(pending*(tmp/100))).toFixed(2));
}

function funDiscPharmacy2(){
	   var pending=0.0;
	   if($("#pendingTot").val()!="")
		   pending=parseFloat($("#pendingTot").val());
	   var tmp=$("#disc2").val();
	   var tmp1=pending;
	   if(parseFloat(tmp)>parseFloat(tmp1)){
		   alertify.success("Discount Amount is greter than pending amount...!");
		   $("#disc2").val(0.0);
		  // $("#disc1").val(0);
		   return;
	   }
		   
	   $("#disc1").val(((tmp*100)/pending).toFixed(2));
	   $("#fAmt").val((pending-tmp).toFixed(2));
}
