/* @author : Rohini Ambhore 
 @date: 28-feb-2024
 @reason : Autosuggestion for Refral doctor */
function setAutoSugForRefDoctorList(inputId, callFrom) {

	var letter = "";
	var specialisationId = 0;
	
	if (callFrom == "all") {
		letter = $("#"+inputId).val();
	}else if(callFrom == "profees"){
		letter = $("#"+inputId).val(); 
		specialisationId = $("#drDeptId").val();
	}
	specialisationId = 0;
	var inputs = [];

	inputs.push('letter=' + letter);
	inputs.push('callFrom=' + callFrom);
	inputs.push('specialisationId=' + specialisationId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/referaldoc/setAutoSugForRefDoctorList",
		
		success : function(r) {
			
			setTempAutoSugDocList(r, inputId,callFrom);
		}
	});
}


function setTempAutoSugDocList(response, id,callFrom) {
	var qty = id.slice(0, -1); 
	var myArray = response;

	$.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				showHeader : true,
				columns : [{
					name : 'Doctor Name',
					width : '100px',
					
					valueField : 'doc_name'
				         }],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record' && ui.item.specialisationName != 'Found'	&& ui.item.depNm != '!!!!') {
						
						$('#'+id).val(ui.item.doc_name);
						$('#txtDoctorId').val(ui.item.doctor_ID);
						
				/*if(ui.item.specialisation.includes(",")){
							
							var specialisationArray = ui.item.specialisation.split(',');
							var namesArray = ui.item.specialisationName.split(',');

								var selectBox = $("#drDeptId");

								selectBox.empty();

								$.each(specialisationArray, function(index, value) {
								    selectBox.append($('<option>', {
								        value: value,
								        text: namesArray[index].trim() 
								    }));
								});

								selectBox.trigger('#drDeptId change.select2');
								selectBox.select2('val', specialisationArray[0]);
	                  }else{	              
						  $('#drDeptId').val(ui.item.specialisation);
						  
						  var specialisationArray = ui.item.specialisation.split(',');
							var namesArray = ui.item.specialisationName.split(',');

								var selectBox = $("#drDeptId");

								selectBox.empty();

								$.each(specialisationArray, function(index, value) {
								    selectBox.append($('<option>', {
								        value: value,
								        text: namesArray[index].trim() 
								    }));
								});

								selectBox.trigger('#drDeptId change.select2');
								selectBox.select2('val', specialisationArray[0]);
	                  }	*/
						
					}
					setAutoSugForRefDoctorList(id,callFrom);
					return false;
				},
				
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstDoctorDto.length);
					var result;
					if (!data || data.lstDoctorDto.length === 0 || !data.lstDoctorDto || data.lstDoctorDto.length === 0) {
					
						result = [ {							
							'doc_name' : 'No Record',							
						            } ];
					} else {
						result = data.lstDoctorDto;
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}




function referalFeesDoctorPayment() {


	var doctorName = $("#byName").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	var str = getDateFormat(fromDate, toDate);
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var doctorId = $("#txtDoctorId").val();
	var unitId = $("#unitId").val();
	var deptId = $("#deptId").val();
	var billTypeId = $("#billTypeId").val();
	var serviceId = $("#serviceId").val();
	if (serviceId == null || serviceId == "" || serviceId == undefined) {
		serviceId = "0";
	}
	var specialisationId = $("#drDeptId").val();
	
	if(specialisationId !="0" || specialisationId !=0)
	{
		if (specialisationId == "0" || specialisationId == 0) {
		alert("Please Select specialisation.");
		return false;
	}}
	
	if (specialisationId == 0 || specialisationId == null || specialisationId == "" || specialisationId == undefined) {
		specialisationId = 0;
	}
	
	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	} else if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}

	var inputs = [];
	// inputs.push('action=proFeesfetchReports');
	// inputs.push('callFrom=' + callFrom);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('specialisationId=' + specialisationId);
	inputs.push('billTypeId=' + billTypeId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "ehat/profees/proFeesDoctorPayment",
				url : "ehat/referaldoc/referalFeesDoctorPayment",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {

					if (deptId == 2) {// for ipd

						var totalRate = 0;
						var totalAmount = 0;
						var totalPfAmount = 0;
						var totalReduction = 0;
						var totalAddition = 0;
						var totalPfPaid = 0;
						var totalPfUnpaid = 0;
						var totalHospAmount = 0;
						var totalRefDocAmount = 0;
						var totalBillAmount = 0;
						var totalPaid = 0;
						var totalPayablePf = 0;
						var totalConcessionAmt = 0;
						var totalConcessionPer = 0;
						var totalDiscountAmt = 0;
						var totalDiscountPer = 0;
						var totalRefundAmount = 0;
						var htm = "";
						var htmHead = "";

						htmHead = htmHead
								+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
								+ "</th><th class='col-md-1'>Treat.Id"
								/*+ "</th><th class='col-md-1'>Rec.No."*/
								+ "</th><th class='col-md-1'>Patient-Id"
								+ "</th><th class='col-md-1'>Patient-Name"
								+ "</th><th class='col-md-1'>Doctor-Name"
								+ "</th><th class='col-md-1'>Dept-Name"
								+ "</th><th class='col-md-1'>Assign-Date"
								+ "</th><th class='col-md-1'>Total Bill"
								+ "</th><th class='col-md-1'>Comp-Name"
								+ "</th><th class='col-md-1'>Rate"
								+ "</th><th class='col-md-1'>Quantity"
								+ "</th><th class='col-md-1'>Amount"
								// + "</th><th
								// class='col-md-1'>HospAmountToShow"
								// + "</th><th class='col-md-1'>PfAmountToShow"
								+ "</th><th class='col-md-1'>Concession%"
								+ "</th><th class='col-md-1'>ConcessionInAmount"
								+ "</th><th class='col-md-1'>Discount %"// dicount%+concession%
								+ "</th><th class='col-md-1'>DiscountInAmount"// dicountAmt+concessionAmt
								+ "</th><th class='col-md-1'>Refunded-Amount"
								+ "</th><th class='col-md-1'>Payable"

								+ "</th><th class='col-md-1'>Hosp-Amount"
								+ "</th><th class='col-md-1'>RefDocId"
								+ "</th><th class='col-md-1'>RefDocPer"
								+ "</th><th class='col-md-1'>RefDocAmt"
								+ "</th><th class='col-md-1'>PfAmount"
								+ "</th><th class='col-md-1'>PfPaid"
								+ "</th><th class='col-md-1'>PfUnpaid"
								+ "</th><th class='col-md-1'>Final Payment"
								+ "</th><th class='col-md-1'>Reduction"
								+ "</th><th class='col-md-1'>Addition"
								+ "</th></tr>";
						if (r.listProFees.length == 0
								|| r.listProFees.length == null) {
							// no records.
							htm = htm
									+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='18'>Record Not Found...!!!</th></tr>";
						} else {

							for ( var i = 0; i < r.listProFees.length; i++) {
								
								var serviceAssignDate = new Date(r.listProFees[i].serviceAssignDate).toLocaleDateString('en-GB');
								
								htm = htm
										+ "<tr style='height:21px;'>"
										+ "<td class='col-md-1'>"
										+ (i + 1)
										+ "</td><td class='col-md-1' id='tdBillId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billId
										+ "</td>"
										+"<td class='col-md-1' style='display:none;' id='tdBillReceiptMasterId" 
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billReceiptMasterId
										+ "</td>"
										
										+"<td style='display:none;' id='tdBillDetailsId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billDetailsId
										+ "</td>"
										
										+"<td class='col-md-1'>"
										+ r.listProFees[i].patientId
										+ "</td><td class='col-md-1'>"
										+ r.listProFees[i].patientName
										+ "</td><td class='col-md-1' id='tdDocName"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].doctorName
										+ "</td><td class='col-md-1'>"
										+ r.listProFees[i].deptName
										+ "</td><td class='col-md-1'>"
										+ serviceAssignDate
										+ "</td><td class='col-md-1' align='right'>"
										+ r.listProFees[i].totalBillAmount
												.toFixed(2)
										+ "</td><td class='col-md-1'>"
										+ r.listProFees[i].componentName
										+ "</td><td class='col-md-1' align='right'>"
										+ r.listProFees[i].rate.toFixed(2)
										+ "</td><td class='col-md-1' align='right'>"
										+ r.listProFees[i].quantity.toFixed(2)
										+ "</td><td class='col-md-1' align='right'>"
										+ r.listProFees[i].amount.toFixed(2)

										+ "</td><td class='col-md-1' align='right' >"
										+ r.listProFees[i].concessionPer
												.toFixed(2)
										+ "</td><td class='col-md-1' align='right' >"
										+ r.listProFees[i].concession
												.toFixed(2)

										+ "</td><td class='col-md-1' align='right' >"
										+ r.listProFees[i].discountPer
												.toFixed(2)
										+ "</td><td class='col-md-1' align='right' >"
										+ r.listProFees[i].discount.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdRefundAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refundAmount
												.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdPatPaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].paid.toFixed(2)

										+ "</td><td class='col-md-1' align='right' id='tdHospPercentInAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].hospPercentInAmount
												.toFixed(2)

										+ "</td><td class='col-md-1' align='right' id='tdRefDocId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrId
										+ "</td><td class='col-md-1' align='right' id='tdRefDocPer"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrPercent
												.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdRefDocAmt"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrAmount
												.toFixed(2)

										+ "</td><td class='col-md-1' align='right' id='tdPfAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfAmount.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdPfPaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfPaid.toFixed(2)
										+ "</td><td class='col-md-1' align='right' id='tdPfUnpaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfUnpaid.toFixed(2)
										+ "</td><td class='col-md-1' align='right'><input type='text' onkeyup='setFinalPfAmount()' style='text-align: right;' id='tdPfPayable"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].pfUnpaid.toFixed(2)
										+ "'>"
										+ "</td><td class='col-md-1' align='right' id='tdPfReduction"
										+ (i + 1)
										+ "'>0.00"
										+ "</td><td class='col-md-1' align='right' id='tdPfAddition"
										+ (i + 1)
										+ "'>0.00"
										+ "</td><td class='hide'><input type='hidden' id='tdDeptId"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].deptId
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdDocId"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].doctorId
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdIscombination"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].iscombination
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdOtherBillDIdIpd"
										+ (i + 1) + "' value='"
										+ r.listProFees[i].otherBillDIdIpd
										+ "'></td>" + "</tr>";

								totalRate = totalRate + r.listProFees[i].rate;
								totalConcessionAmt = totalConcessionAmt
										+ r.listProFees[i].concession;
								totalConcessionPer = totalConcessionPer
										+ r.listProFees[i].concessionPer;
								totalAmount = totalAmount
										+ r.listProFees[i].amount;
								totalPfAmount = totalPfAmount
										+ r.listProFees[i].pfAmount;
								totalPfPaid = totalPfPaid
										+ r.listProFees[i].pfPaid;
								totalPfUnpaid = totalPfUnpaid
										+ r.listProFees[i].pfUnpaid;
								totalHospAmount = totalHospAmount
										+ r.listProFees[i].hospPercentInAmount;
								totalBillAmount = totalBillAmount
										+ r.listProFees[i].totalBillAmount;
								totalPaid = totalPaid + r.listProFees[i].paid;
								totalPayablePf = totalPayablePf
										+ r.listProFees[i].pfUnpaid;
								totalDiscountAmt = totalDiscountAmt
										+ r.listProFees[i].discount;
								totalDiscountPer = totalDiscountPer
										+ r.listProFees[i].discountPer;
								totalRefundAmount = totalRefundAmount
										+ r.listProFees[i].refundAmount;
								totalRefDocAmount = totalRefDocAmount
										+ r.listProFees[i].refDrAmount;

							}

						}
						htm = htm
								+ "<tr style = 'background-color:#EEEEEE;'><th colspan='8'></th><th>Total</th>"
								+ "<th class='col-md-1' align='right'>"
								+ totalRate.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ "</th><th class='col-md-1' align='right'>"
								+ totalAmount.toFixed(2)

								+ "</th><th class='col-md-1' align='center'>"
								// + totalConcessionPer.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalConcessionAmt.toFixed(2)

								+ "</th><th class='col-md-1' align='center'>"
								// + totalDiscountPer.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalDiscountAmt.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalRefundAmount.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalPaid.toFixed(2)

								+ "</th><th class='col-md-1' align='right'>"
								+ totalHospAmount.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ "</th><th class='col-md-1' align='right'>"
								+ "</th><th class='col-md-1' align='right'>"
								+ totalRefDocAmount.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalPfAmount.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalPfPaid.toFixed(2)
								+ "</th><th class='col-md-1' align='right'>"
								+ totalPfUnpaid.toFixed(2)
								+ "</th><th class='col-md-1' align='right' id='tblPfPayable'>"
								+ totalPayablePf.toFixed(2)
								+ "</th><th class='col-md-1' align='right' id='tblPfTotalReduction'>"
								+ totalReduction.toFixed(2)
								+ "</th><th class='col-md-1' align='right' id='tblPfTotalAddition'>"
								+ totalAddition.toFixed(2) + "</th></tr>";

						// set values in respected fields
						$("#txtTotalAmount").val(totalAmount.toFixed(2));
						$("#txtTotalConcession").val(
								(totalDiscountAmt + totalConcessionAmt)
										.toFixed(2));
						$("#txtTotalPaid").val(totalPaid.toFixed(2));

						$("#txtTotalHospAmount")
								.val(totalHospAmount.toFixed(2));
						$("#txtTotalPfAmount").val(totalPfAmount.toFixed(2));
						$("#txtTotalPayable").val(totalPayablePf.toFixed(2));

						$("#tableTestVoucherListHead").html(htmHead);
						$("#tableTestVoucherList").html(htm);

					} else {// opd,diago

						var totalRate = 0;
						var totalAmount = 0;
						var totalPfAmount = 0;
						var totalReduction = 0;
						var totalAddition = 0;
						var totalPfPaid = 0;
						var totalPfUnpaid = 0;
						var totalHospAmount = 0;
						var totalRefDocAmount = 0;
						var totalBillAmount = 0;
						var totalPaid = 0;
						var totalPayablePf = 0;
						var totalFinalPayable = 0;
						var totalConcessionAmt = 0;
						var totalConcessionPer = 0;
						var totalDiscountAmt = 0;
						var totalDiscountPer = 0;
						var totalRefundedAmount = 0;

						var htm = "";
						var htmHead = "";

						htmHead = htmHead
								+ "<tr style='background-color: #EEEEEE'><th>SR.NO"
								+ "</th><th >Treat.Id"
								/*+ "</th><th class='col-md-1'>Bill-Details-Id"*/
								+ "</th><th style='display:none;'>Rec.No."
								/*+ "</th><th class='col-md-1'>Rec.SlaveId"*/
								+ "</th><th >Patient-Id"
								+ "</th><th>Patient-Name"
								+ "</th><th >Doctor-Name"
								+ "</th><th>Dept-Name"
								+ "</th><th >Assign-Date"
								+ "</th><th >Total Bill"
								+ "</th><th>Comp-Name"
								+ "</th><th>Rate"
								+ "</th><th>Quantity"
								+ "</th><th >Amount"
								+ "</th><th >Concession%"
								+ "</th><th >ConcessionInAmount"
								+ "</th><th >Discount% "
								+ "</th><th >DiscountInAmount"
								+ "</th><th >Final-Payable"
								+ "</th><th>Paid"
								+ "</th><th >Refunded-Amount"
								+ "</th><th >Hosp-Amount"
								+ "</th><th>RefDocId"
								+ "</th><th >RefDocPer"
								+ "</th><th >RefDocAmount"
								+ "</th><th >PfAmount"
								+ "</th><th >PfPaid"
								+ "</th><th >PfUnpaid"
								+ "</th><th >Final Payment"
								+ "</th><th >Reduction"
								+ "</th><th >Addition"
								+ "</th></tr>";
						if (r.listProFees.length == 0
								|| r.listProFees.length == null) {
							// no records.
							htm = htm
									+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='18'>Record Not Found...!!!</th></tr>";
						} else {

							for ( var i = 0; i < r.listProFees.length; i++) {
									
								var serviceAssignDate = new Date(r.listProFees[i].serviceAssignDate).toLocaleDateString('en-GB');
								var discountamountcal = (r.listProFees[i].actualAmt *  r.listProFees[i].actualDiscPer / 100 );
								var actualFinalPayable = r.listProFees[i].actualAmt - (r.listProFees[i].actualAmt *  r.listProFees[i].actualDiscPer / 100); 
								//alert('.......discountamountcal......'+discountamountcal);
								//alert('...........actualFinalPayable......'+actualFinalPayable);
								htm = htm
										+ "<tr style='height:21px;'>"
										+ "<td >"
										+ (i + 1)
										+ "</td><td  id='tdBillId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billId
										+ "</td>" 
										+"<td style='display:none;' id='tdBillDetailsId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billDetailsId
										+ "</td>"
										+"<td style='display:none;' id='tdBillReceiptMasterId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billReceiptMasterId
										+ "</td>" 
										+"<td style='display:none;' id='tdBillReceiptSlaveId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].billReceiptSlaveId
										+ "</td>"
										+"<td >"
										+ r.listProFees[i].patientId
										+ "</td><td >"
										+ r.listProFees[i].patientName
										+ "</td><td id='tdDocName"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].doctorName
										+ "</td><td >"
										+ r.listProFees[i].deptName
										+ "</td><td >"
										+ serviceAssignDate
										+ "</td><td  align='right'>"
										+ r.listProFees[i].totalBillAmount
												.toFixed(2)
										+ "</td><td >"
										+ r.listProFees[i].componentName
										+ "</td><td  align='right'>"
										+ r.listProFees[i].rate.toFixed(2)
										+ "</td><td  align='right'>"
										+ r.listProFees[i].quantity.toFixed(2)
										+ "</td><td  align='right'>"
										// + r.listProFees[i].amount.toFixed(2)
										+ r.listProFees[i].actualAmt.toFixed(2)

										+ "</td><td  align='right'>"
										+ r.listProFees[i].actualConcnPer
												.toFixed(2)
										+ "</td><td  align='right'>"
										// +
										// r.listProFees[i].concession.toFixed(2)
										+ r.listProFees[i].actualConcnAmt
												.toFixed(2)

										+ "</td><td  align='right' >"
										+ r.listProFees[i].actualDiscPer
												.toFixed(2)
										+ "</td><td align='right' >"
										//+ r.listProFees[i].actualDiscAmt.toFixed(2)
										+ discountamountcal.toFixed(2)
										+ "</td><td  align='right' id='tdPatPayable"
										+ (i + 1)
										+ "'>"
										//+ r.listProFees[i].actualFinalPayable.toFixed(2)
										+ actualFinalPayable.toFixed(2)
										+ "</td><td  align='right' id='tdPatPaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].actualFinalPaid
												.toFixed(2)
										+ "</td><td  align='right' id='tdRefundAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refundAmount
												.toFixed(2)
										+ "</td><td  align='right' id='tdHospPercentInAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].hospPercentInAmount
												.toFixed(2)

										+ "</td><td  align='right' id='tdRefDocId"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrId
										+ "</td><td  align='right' id='tdRefDocPer"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrPercent
												.toFixed(2)
										+ "</td><td  align='right' id='tdRefDocAmt"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].refDrAmount
												.toFixed(2)
										+ "</td><td  align='right' id='tdPfAmount"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfAmount.toFixed(2)
										+ "</td><td  align='right' id='tdPfPaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfPaid.toFixed(2)
										+ "</td><td  align='right' id='tdPfUnpaid"
										+ (i + 1)
										+ "'>"
										+ r.listProFees[i].pfUnpaid.toFixed(2)
										+ "</td><td  align='right'><input type='text' onkeyup='setFinalPfAmount()' style='text-align: right;' id='tdPfPayable"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].pfUnpaid.toFixed(2)
										+ "'>"
										+ "</td><td  align='right' id='tdPfReduction"
										+ (i + 1)
										+ "'>0.00"
										+ "</td><td  align='right' id='tdPfAddition"
										+ (i + 1)
										+ "'>0.00"
										+ "</td><td class='hide'><input type='hidden' id='tdDeptId"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].deptId
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdDocId"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].doctorId
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdIscombination"
										+ (i + 1)
										+ "' value='"
										+ r.listProFees[i].iscombination
										+ "'></td>"
										+ "<td class='hide'><input type='hidden' id='tdOtherBillDIdOpd"
										+ (i + 1) + "' value='"
										+ r.listProFees[i].otherBillDIdOpd
										+ "'></td>" + "</tr>";

								totalRate = totalRate + r.listProFees[i].rate;
								totalConcessionAmt = totalConcessionAmt
										+ r.listProFees[i].actualConcnAmt;
								totalConcessionPer = totalConcessionPer
										+ r.listProFees[i].actualConcnPer;
								totalAmount = totalAmount
										+ r.listProFees[i].actualAmt;
								totalPfAmount = totalPfAmount
										+ r.listProFees[i].pfAmount;
								totalPfPaid = totalPfPaid
										+ r.listProFees[i].pfPaid;
								totalPfUnpaid = totalPfUnpaid
										+ r.listProFees[i].pfUnpaid;
								totalHospAmount = totalHospAmount
										+ r.listProFees[i].hospPercentInAmount;
								totalBillAmount = totalBillAmount
										+ r.listProFees[i].totalBillAmount;
								totalPaid = totalPaid
										+ r.listProFees[i].actualFinalPaid;
								totalPayablePf = totalPayablePf
										+ r.listProFees[i].pfUnpaid;
								totalDiscountAmt = totalDiscountAmt
									+ discountamountcal;	//+ r.listProFees[i].actualDiscAmt;
								totalDiscountPer = totalDiscountPer
										+ r.listProFees[i].actualDiscPer;
								totalFinalPayable = totalFinalPayable
								        + actualFinalPayable//+ r.listProFees[i].actualFinalPayable;
								totalRefDocAmount = totalRefDocAmount
										+ r.listProFees[i].refDrAmount;
								totalRefundedAmount = totalRefundedAmount
										+ r.listProFees[i].refundAmount;

							}

						}
						htm = htm
								// + "<tr><td style='height:
								// 11.5px;'></td></tr>"
								+ "<tr style = 'background-color:#EEEEEE;'><th colspan='8'></th><th>Total</th>"
								+ "<th  align='right'>"
								+ totalRate.toFixed(2)
								+ "</th><th  align='right'>"
								+ "</th><th   align='right'>"
								+ totalAmount.toFixed(2)

								+ "</th><th align='center'>-"
								// + totalConcessionPer.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalConcessionAmt.toFixed(2)

								+ "</th><th   align='center'>-"
								// + totalDiscountPer.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalDiscountAmt.toFixed(2)
								+ "</th><th  align='right'>"
								+ totalFinalPayable.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalPaid.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalRefundedAmount.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalHospAmount.toFixed(2)
								+ "</th><th   align='right'>"
								+ "</th><th   align='right'>"
								+ "</th><th    align='right'>"
								+ totalRefDocAmount.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalPfAmount.toFixed(2)
								+ "</th><th   align='right'>"
								+ totalPfPaid.toFixed(2)
								+ "</th><th  align='right'>"
								+ totalPfUnpaid.toFixed(2)
								+ "</th><th    align='right' id='tblPfPayable'>"
								+ totalPayablePf.toFixed(2)
								+ "</th><th    align='right' id='tblPfTotalReduction'>"
								+ totalReduction.toFixed(2)
								+ "</th><th   align='right' id='tblPfTotalAddition'>"
								+ totalAddition.toFixed(2) + "</th></tr>";

						// set values in respected fields
						$("#txtTotalAmount").val(totalAmount.toFixed(2));
						$("#txtTotalConcession").val(
								(totalDiscountAmt + totalConcessionAmt)
										.toFixed(2));
						$("#txtTotalPaid").val(totalPaid.toFixed(2));

						$("#txtTotalHospAmount")
								.val(totalHospAmount.toFixed(2));
						$("#txtTotalPfAmount").val(totalPfAmount.toFixed(2));
						$("#txtTotalPayable").val(totalPayablePf.toFixed(2));

						$("#tableTestVoucherListHead").html(htmHead);
						$("#tableTestVoucherList").html(htm);
					}
					setOnExcel(r,deptId);  // added by sandip
				}
			});
        

}

function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}

// added for dayanand for creating  voucher for  refer doctor
function saveDrPaymentVoucherForRefer(){


	var voucherId = $("#voucherId").val();
	var deptId = $("#deptId").val();
	var deptName = $("#deptId option:selected").text();
	if(deptId == 0 || deptId == null || deptId == undefined){
		alert("Select Department!!!");
		SetFocus("deptId");
		return false;
	}
	var doctorId = $("#txtDoctorId").val();
	var doctorName = $("#byName").val();
	
	if(doctorId <= 0 || doctorId == "" || doctorId == undefined){
		doctorId = 0;
		doctorName = deptName + " Multiple Doctor's";
	}
	
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	var totalAmount = $("#txtTotalAmount").val();
	var totalConcession = $("#txtTotalConcession").val();
	var totalPatPaid = $("#txtTotalPaid").val();

	var totalHospAmount = $("#txtTotalHospAmount").val();
	var totalPfAmount = $("#txtTotalPfAmount").val();
	var totalPfPaid = $("#txtTotalPayable").val();
	var billTypeId = $("#billTypeId").val();
	var advanceFlag = "N";
	if(billTypeId == 2 || billTypeId == 3){
		advanceFlag = "Y";
	}
	var tableRows = $('#tableTestVoucherList tr').length;
	if (tableRows == undefined || tableRows == 0) {
		alert("There is no record to add in Voucher List!");
		return false;
	}
	
	var voucherDetails = {   
			listVoucher : []
		};
	
	voucherDetails.listVoucher.push({
		voucherId : voucherId,
		deptId : deptId,
		doctorId : doctorId,
		doctorName : doctorName,
		fromDate : fromDate,
		toDate : toDate,
		totalAmount : totalAmount,
		totalConcession : totalConcession,
		totalPatPaid : totalPatPaid,
		totalHospAmount : totalHospAmount,
		totalPfAmount : totalPfAmount,
		totalPfPaid : totalPfPaid
		
	});
	
	var profeesDetails = {
			listProFees : []
	};
	

		if (deptId == 2) {
		// ipd flow
		for ( var i = 1; i <= tableRows - 1; i++) {
			var billId = $("#tdBillId" + i).text();
			var billDetailsId = $("#tdBillDetailsId" + i).text();
			var billRecMasterId = 0;//$("#tdBillReceiptMasterId" + i).text();
			var billRecSlaveId = 0;//$("#tdBillReceiptSlaveId" + i).text();
			var departmentId = $("#tdDeptId" + i).val();
			var hospAmount = parseFloat($("#tdHospPercentInAmount" + i).text());
			var refDrId = parseFloat($("#tdRefDocId" + i).text());
			var refDrPer = parseFloat($("#tdRefDocPer" + i).text());
			var refDrAmt = parseFloat($("#tdRefDocAmt" + i).text());
			var pfAmount = parseFloat($("#tdPfAmount" + i).text());
			var pfPaid = parseFloat($("#tdPfPaid" + i).text());
			var pfPayable = parseFloat($("#tdPfPayable" + i).val());
			var pfUnpaid = 0;// pfAmount -
								// pfPayable//$("#tdPfUnpaid"+i).text();
			var patPaid = parseFloat($("#tdPatPaid" + i).text());
			var tdDocId = $("#tdDocId" + i).val();
			var tdIsCombination = $("#tdIscombination" + i).val();
			var tdOtherBillDIdIpd = $("#tdOtherBillDIdIpd" + i).val();
			var tdDocName = $("#tdDocName" + i).text();
			var tdReduction = parseFloat($("#tdPfReduction" + i).text());
			var tdAddition = parseFloat($("#tdPfAddition" + i).text());

			if (pfPayable > patPaid) {
				alert("You can't Pay more than received!!!");
				// setFocus("tdPfPayable"+i);
				return false;
			}
			
			profeesDetails.listProFees.push({
				billId : billId,
				billDetailsId : billDetailsId,
				billReceiptMasterId : billRecMasterId,
				billReceiptSlaveId : billRecSlaveId,
				hospPercentInAmount : hospAmount,
				pfAmount : pfAmount,
				pfPaid : pfPayable,
				pfUnpaid : pfUnpaid,
				deptId : departmentId,
				doctorId : tdDocId,
				doctorName : tdDocName,
				pfReduction : tdReduction,
				pfAddition : tdAddition,
				advanceFlag : advanceFlag,
				actHospAmount : hospAmount,
				refDrId : refDrId,
				refDrPercent : refDrPer,
				refDrAmount :refDrAmt,
				iscombination : tdIsCombination,
				otherBillDIdIpd : tdOtherBillDIdIpd,
				paid : patPaid

			});
		}
	} else {
		for ( var i = 1; i <= tableRows - 1; i++) {
			var billId = $("#tdBillId" + i).text();
			var billDetailsId = $("#tdBillDetailsId" + i).text();
			var billRecMasterId = $("#tdBillReceiptMasterId" + i).text();
			var billRecSlaveId = $("#tdBillReceiptSlaveId" + i).text();
			var departmentId = $("#tdDeptId" + i).val();
			var hospAmount = $("#tdHospPercentInAmount" + i).text();
			var refDrId = parseFloat($("#tdRefDocId" + i).text());
			var refDrPer = parseFloat($("#tdRefDocPer" + i).text());
			var refDrAmt = parseFloat($("#tdRefDocAmt" + i).text());
			var pfAmount = $("#tdPfAmount" + i).text();
			var pfPaid = $("#tdPfPaid" + i).text();
			var pfPayable = $("#tdPfPayable" + i).val();
			var pfUnpaid = 0;// pfAmount -
								// pfPayable//$("#tdPfUnpaid"+i).text();
			var patPaid = parseFloat($("#tdPatPaid" + i).text());
			var tdDocId = $("#tdDocId" + i).val();
			var tdDocName = $("#tdDocName" + i).text();
			var tdIsCombination = $("#tdIscombination" + i).val();
			var tdOtherBillDIdOpd = $("#tdOtherBillDIdOpd" + i).val();
			var tdReduction = $("#tdPfReduction" + i).text();
			var tdAddition = $("#tdPfAddition" + i).text();

			if (pfPayable > patPaid) {
				alert("You can't Pay more than received!!!");
				// setFocus("tdPfPayable"+i);
				return false;
			}
			profeesDetails.listProFees.push({
				billId : billId,
				billDetailsId : billDetailsId,
				billReceiptMasterId : billRecMasterId,
				billReceiptSlaveId : billRecSlaveId,
				hospPercentInAmount : hospAmount,
				pfAmount : pfAmount,
				pfPaid : pfPayable,
				pfUnpaid : pfUnpaid,
				deptId : departmentId,
				doctorId : tdDocId,
				doctorName : tdDocName,
				pfReduction : tdReduction,
				pfAddition : tdAddition,
				advanceFlag : advanceFlag,
				actHospAmount : hospAmount,
				refDrId : refDrId,
				refDrPercent : refDrPer,
				refDrAmount :refDrAmt,
				iscombination : tdIsCombination,
				otherBillDIdOpd : tdOtherBillDIdOpd,
				paid : patPaid

			});
		}
	}
	

	voucherDetails = JSON.stringify(voucherDetails);
	profeesDetails = JSON.stringify(profeesDetails);
	
	if(voucherDetails == null || voucherDetails == undefined){
		alert("Fill Records!!!");
		return false;
	}
	
	if(profeesDetails == null || profeesDetails == undefined){
		alert("No Records!!!");
		return false;
	}
	
	var inputs = [];
	
	
	inputs.push("voucherDetails="+ encodeURIComponent(voucherDetails));
	inputs.push("profeesDetails="+ encodeURIComponent(profeesDetails));
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/saveDrPaymentVoucherForRefer",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			referalFeesDoctorPayment();
		}
	});


}

// added by dayanand for fetching refer doctor voucher
function fetchReferDoctorsVouchers(callFrom){

	var unitId = 0;
	var doctorId = 0;
	var deptId = 0;
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

   var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
   // var todays = yyyy +'-'+mm+'-'+dd;
	
	var fromDate = yyyy +'-'+mm+'-'+dd;
	var toDate = yyyy +'-'+mm+'-'+dd;
	if (callFrom == "search") {
		unitId = $("#unitId").val();
		doctorId = $("#txtDoctorId").val();
		deptId = $("#deptId").val();
		fromDate = $("#fromDate").val();
		toDate = $("#toDate").val();
		
		var str = getDateFormat(fromDate, toDate); //added by sandip
		var fromDate = str.split(':')[0];
		var toDate = str.split(':')[1];
		
		if(fromDate == '' || fromDate == null || fromDate == undefined || fromDate == "undefined-undefined-"){
			alert("Select From Date!!");
			return false;
		}
		if(toDate == '' || toDate == null || toDate == undefined || toDate == "undefined-undefined-"){
			alert("Select To Date!!");
			return false;
		}
		if(doctorId == 0 || doctorId == null || doctorId == undefined){
			alert("Select To Doctor !!!");
			return false;
		}
	}
	
	var inputs = [];
	
	inputs.push("unitId=" + unitId);
	inputs.push("doctorId=" + doctorId);
	inputs.push("deptId=" + deptId);
	inputs.push("fromDate=" + fromDate);
	inputs.push("toDate=" + toDate);
	inputs.push("callFrom=" + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/profees/fetchReferDoctorsVouchers",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			//alert(r.listVoucher[0].totalPfPaid);
			var htm = "";
			
			if(callFrom == "cancel"){
				if(r.listVoucher.length > 0){
					for(var i = 0; i < r.listVoucher.length ; i++){
						
						var dateTime=new Date(r.listVoucher[i].createdDate).toLocaleString();
				    	var createdDate = (dateTime.split(",")[0]).split('/');
				    	var date = createdDate[0]+'/'+createdDate[1]+'/'+createdDate[2];
					
						htm = htm 
						+ "<tr><td class='col-md-1 center'>"+(i+1)
						+ "</td><td class='col-md-1 TextFont'>"+r.listVoucher[i].voucherId
						+ "</td><td class='col-md-6 TextFont'>"+r.listVoucher[i].doctorName
						+ "</td><td class='col-md-2 TextFont center'>"+r.listVoucher[i].deptId
						+ "</td><td class='col-md-1 TextFont'>"+date
						+ "</td><td class='col-md-1 TextFont' align=right>"+(r.listVoucher[i].totalPfPaid).toFixed(2)
						+ "</td></tr>" ;
						/*+"<td class='col-md-2 TextFont center'><button type='button' class='btn btn-xs btn-danger'"
						+ " onclick=cancelVoucher('"+r.listVoucher[i].voucherId+"','"+r.listVoucher[i].deptId+"')><i class='fa fa-trash-o'></i></button>"
						+ "</td></tr>";*/
					}
				}
				$("#tableCancelTestDash").html(htm);
			}else{
				if(r.listVoucher.length > 0){
					for(var i = 0; i < r.listVoucher.length ; i++){
						
						var dateTime=new Date(r.listVoucher[i].createdDate).toLocaleString('en-GB');
				    	var createdDate = (dateTime.split(",")[0]).split('/');
				    	var date = createdDate[0]+'/'+createdDate[1]+'/'+createdDate[2];
				    	
						htm = htm 
						+ "<tr><td class='col-md-1 center'>"+(i+1)
						+ "</td><td class='col-md-1 TextFont'>"+r.listVoucher[i].voucherId
						+ "</td><td class='col-md-5 TextFont'>"+r.listVoucher[i].doctorName
						+ "</td><td class='col-md-2 TextFont center'>"+r.listVoucher[i].deptId
						+ "</td><td class='col-md-1 TextFont'>"+date
						+ "</td><td class='col-md-1 TextFont' align=right>"+(r.listVoucher[i].totalPfPaid).toFixed(2)
						+ "</td><td class='col-md-1 TextFont center'><button type='button' class='btn btn-xs btn-danger'"
						+ " onclick=cancelReferalDoctorVoucher('"+r.listVoucher[i].voucherId+"','"+r.listVoucher[i].deptId+"','"+date+"')><i class='fa fa-trash-o'></i></button>"
						+ "</td></tr>";
					}
				}
				$("#tableCurrentTestDash").html(htm);
			}
			
		}
	});


	
}

// added by dayanand for cancel the refer doctor voucher
function cancelReferalDoctorVoucher(voucherId, deptId, vDate) {
	
	//check for month if greater then dont delete
	var d1 = new Date(vDate);
	var today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedToday = dd + '/' + mm + '/' + yyyy;
	
	//if (d2.getMonth() != d1.getMonth() || d2.getFullYear() > d1.getFullYear()) {
	 if(formattedToday != vDate){
		alert("Can't delete previous(old) records!!!");
		return false;
	} else {

		var r = confirm("Are You Sure to Cancel Voucher ?? ");
		if (r == true) {
			var inputs = [];

			inputs.push("voucherId=" + voucherId);
			inputs.push("deptId=" + deptId);
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/profees/cancelReferalDoctorVoucher",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					alert(r);
					fetchReferDoctorsVouchers("onload");
				}
			});
		}
	}
}


function setAutoSuggestDocNameForRefer(inputID, onload, callFrom) {
	//alert(inputID+" "+onload+" "+callFrom);
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var auto = '';
	if (callFrom == "proFees") {
		auto = 'proFees';
	} 
	
	var inputs = [];

	inputs.push('letter=' + findingName);
	inputs.push('callFrom=' + callFrom);
	inputs.push('specialisationId=' + 0);
	
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/referaldoc/setAutoSugForRefDoctorList",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					 alert('error');
				},
				success : function(response) {
					//alert(JSON.stringify(response));
					if(response.lstDoctorDto.length > 0){
							
							var template = "";
							for(var j = 0; j < response.lstDoctorDto.length; j++) {
								var arrValue = "";
								var idValue = "";
								var name = "";
								
								//arrValue = response.listDoctor[j].doctor_ID +"-"+response.listDoctor[j].doc_name;
								arrValue =response.lstDoctorDto[j].doc_name;
								idValue = response.lstDoctorDto[j].doctor_ID;
								name = response.lstDoctorDto[j].doc_name;
								
								resultData.push({
									ID : idValue,
									Name : name
								});
								template = template + '<li data-value="' + idValue
										+ '" class=""><a href="#">' + arrValue + '</a></li>';
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
				}
			});
			function displayResult(item) {
				var res = item.text.split('-');
				var docId = res[0];
				var doc_Id = item.value;
				var doctorName = res[1];
				//getPatientById(patId, type, tabId, emergencyFlag);
				//$("input#" + docId).val(doc_name);
				$("#" + inputID).val((item.text).trim());
				$("#txtDoctorId").val(doc_Id);
			}
	

}