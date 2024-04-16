var rowCount = 1;

function showCashParameter() {
	var $checkbox1 = $('input:checkbox[id=CheckBox1]');
	if ($checkbox1.is(':checked') == true) {
		var el = document.getElementById("cashamt");
		el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
		$("#cashamt").show();
	} else {
		var el = document.getElementById("cashamt");
		el.innerHTML = el.innerHTML.replace('', '&nbsp;');
		$("#cashamt").hide();
	}
}

function showCardParameter() {

	var $checkbox2 = $('input:checkbox[id=CheckBox2]');
	var $checkbox1 = $('input:checkbox[id=CheckBox1]');
	if ($checkbox2.is(':checked') == true) {
		var el = document.getElementById("show");

		el.innerHTML = el.innerHTML.replace('', '&nbsp;');
		$("#cardamt").show();
		$("#cardNum").show();
		$("#bankName").show();
	} else {
		$("#cardamt").hide();
		$("#cardNum").hide();
		$("#bankName").hide();
	}
	if ($checkbox2.is(':checked') == true && $checkbox1.is(':checked') == true) {
		var el = document.getElementById("show");
		el.innerHTML = el.innerHTML.replace('&nbsp;', '');
	}
}

function showChequeParameter() {

	var $checkbox3 = $('input:checkbox[id=CheckBox3]');
	var $checkbox2 = $('input:checkbox[id=CheckBox2]');
	var $checkbox1 = $('input:checkbox[id=CheckBox1]');
	var $checkbox4 = $('input:checkbox[id=CheckBox4]');

	if ($checkbox3.is(':checked') == true) {
		var el = document.getElementById("show");
		el.innerHTML = el.innerHTML.replace('', '&nbsp;');
		// $("#show").show();
		$("#chequeamt").show();
		$("#chequeNum").show();
		$("#chequebankName").show();
		$("#chequeAmount").val(0);
		$("#chequeNo").val(0);
		$("#chequeBankName").val("");
	} else {
		$("#chequeAmount").val(0);
		$("#chequeNo").val(0);
		$("#chequeBankName").val("");

		$("#chequeamt").hide();
		$("#chequeNum").hide();
		$("#chequebankName").hide();

	}
	if ($checkbox2.is(':checked') == true && $checkbox1.is(':checked') == true
			&& $checkbox3.is(':checked') == true) {
		var el = document.getElementById("show");

		el.innerHTML = el.innerHTML.replace('&nbsp;', '');
	}
}

// Code for IPD Mode of Payment - Modify by Kavita Bhangale --- Date- 09
// September 2016
function setModeOfPaymentRemainingValue(callfrom) {
	var cashAmt = 0;
	var cardAmt = 0;
	var chequeAmt = 0;
	var rtgsAmt = 0;
	var remaining = 0;
	var total = parseFloat($("#txtAmount").val());
	
	if(total == "" || isNaN(total)){
		total = 0 ;
	}

	if (callfrom == "cashAmount") {
		if(total <= 0){
			alert("Please Enter Amount !!!");
			return false;
		}
		cashAmt = $("#cashAmount").val();
		if(cashAmt == ""){
			cashAmt = 0 ;
		}
		if ($("#CheckBox2").is(":checked") == true) {
			cardAmt = $("#cardAmount").val();
			
			if (cardAmt == "" || cardAmt == 0) {
				cardAmt = 0;//$("#cardAmount").val(0);
				remaining = total - parseFloat(cashAmt);
				$("#cardAmount").val(remaining);
			} else {
				var totalamt = parseFloat(cashAmt) + parseFloat(cardAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox3").is(":checked") == true) {
					$("#chequeAmount").val(remaining);
					
				} else if ($("#CheckBox4").is(":checked") == true) {
					$("#txtRtgsAmt").val(remaining);
					
				} else {
					remaining = total - parseFloat(cashAmt);
					$("#cardAmount").val(remaining);
					
				}
			}
		} else if ($("#CheckBox3").is(":checked") == true) {
			chequeAmt = $("#chequeAmount").val();
			if (chequeAmt == "") {
				$("#chequeAmount").val(0);
			} else if (chequeAmt == 0) {
				remaining = total - parseFloat(cashAmt);
				$("#chequeAmount").val(remaining);
			} else {
				var totalamt = parseFloat(cashAmt) + parseFloat(chequeAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox2").is(":checked") == true) {
					$("#cardAmount").val(remaining);
					
				} else if ($("#CheckBox4").is(":checked") == true) {
					$("#txtRtgsAmt").val(remaining);
					
				} else {
					remaining = total - parseFloat(cashAmt);
					$("#chequeAmount").val(remaining);
					
				}
			}
		} else if ($("#CheckBox4").is(":checked") == true) {
			rtgsAmt = $("#txtRtgsAmt").val();
			if (rtgsAmt == "") {
				$("#txtRtgsAmt").val(0);
			} else if (rtgsAmt == 0) {
				remaining = total - parseFloat(cashAmt);
				$("#txtRtgsAmt").val(remaining);
			} else {
				var totalamt = parseFloat(cashAmt) + parseFloat(rtgsAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox2").is(":checked") == true) {
					if (cashAmt == "") {
						$("#cardAmount").val(0);
					} else {
						$("#cardAmount").val(remaining);
					}
				} else if ($("#CheckBox3").is(":checked") == true) {
					$("#chequeAmount").val(remaining);
					
				} else {
					remaining = total - parseFloat(cashAmt);
					$("#txtRtgsAmt").val(remaining);
				}
			}
		}

	} else if (callfrom == "cardAmount") {
		if(total <= 0){
			alert("Please Enter Amount!!!");
			return false;
		}
		cardAmt = $("#cardAmount").val();
		if(cardAmt == ""){
			cardAmt = 0;
		}

		if ($("#CheckBox1").is(":checked") == true) {
			cashAmt = $("#cashAmount").val();
			if (cashAmt == "" || cashAmt == 0) {
				cashAmt = 0;
				remaining = total - parseFloat(cardAmt);
				$("#cashAmount").val(remaining);
			} else {
				var totalamt = parseFloat(cardAmt) + parseFloat(cashAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox3").is(":checked") == true) {
					$("#chequeAmount").val(remaining);
				} else if ($("#CheckBox4").is(":checked") == true) {
					$("#txtRtgsAmt").val(remaining);
				} else {
					remaining = total - parseFloat(cardAmt);
					$("#cashAmount").val(remaining);
				}
			}
		} else if ($("#CheckBox3").is(":checked") == true) {
			chequeAmt = $("#chequeAmount").val();
			if (chequeAmt == "" || chequeAmt == 0) {
				chequeAmt == 0;
				remaining = total - parseFloat(cardAmt);
				$("#chequeAmount").val(remaining);
			} else {
				var totalamt = parseFloat(cardAmt) + parseFloat(chequeAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox1").is(":checked") == true) {
					$("#cashAmount").val(remaining);
				} else if ($("#CheckBox4").is(":checked") == true) {
					$("#txtRtgsAmt").val(remaining);
				} else {
					remaining = total - parseFloat(cardAmt);
					$("#chequeAmount").val(remaining);
				}
			}
		} else if ($("#CheckBox4").is(":checked") == true) {
			rtgsAmt = $("#txtRtgsAmt").val();
			if (rtgsAmt == "" || rtgsAmt == 0) {
				rtgsAmt == 0;
				remaining = total - parseFloat(cardAmt);
				$("#txtRtgsAmt").val(remaining);
			} else {
				var totalamt = parseFloat(cardAmt) + parseFloat(rtgsAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox1").is(":checked") == true) {
					$("#cashAmount").val(remaining);
				} else if ($("#CheckBox3").is(":checked") == true) {
					$("#chequeAmount").val(remaining);
				} else {
					remaining = total - parseFloat(cardAmt);
					$("#txtRtgsAmt").val(remaining);
				}
			}
		}
	} else if (callfrom == "chequeAmount") {
		if(total <= 0){
			alert("Please Enter Amount !!!");
			return false;
		}
		chequeAmt = $("#chequeAmount").val();
		if(chequeAmt == ""){
			chequeAmt = 0;
		}

		if ($("#CheckBox1").is(":checked") == true) {
			cashAmt = $("#cashAmount").val();
			if (cashAmt == "" || cashAmt == 0) {
				cashAmt == 0;
				remaining = total - parseFloat(chequeAmt);
				$("#cashAmount").val(remaining);
			} else {
				var totalamt = parseFloat(chequeAmt) + parseFloat(cashAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox2").is(":checked") == true) {
					$("#cardAmount").val(remaining);
					
				} else if ($("#CheckBox4").is(":checked") == true) {
					$("#txtRtgsAmt").val(remaining);
					
				} else {
					remaining = total - parseFloat(chequeAmt);
					$("#cashAmount").val(remaining);
					
				}
			}
		} else if ($("#CheckBox2").is(":checked") == true) {
			cardAmt = $("#cardAmount").val();
			if (cardAmt == "" || cardAmt == 0) {
				cardAmt == 0;
				remaining = total - parseFloat(chequeAmt);
				$("#cardAmount").val(remaining);
			} else {
				var totalamt = parseFloat(chequeAmt) + parseFloat(cardAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox1").is(":checked") == true) {
					$("#cashAmount").val(remaining);
					
				} else if ($("#CheckBox4").is(":checked") == true) {
					$("#txtRtgsAmt").val(remaining);
					
				} else {
					remaining = total - parseFloat(chequeAmt);
					$("#cardAmount").val(remaining);
					
				}
			}
		} else if ($("#CheckBox4").is(":checked") == true) {
			rtgsAmt = $("#txtRtgsAmt").val();
			if (rtgsAmt == "" || rtgsAmt == 0) {
				rtgsAmt == 0;
				remaining = total - parseFloat(chequeAmt);
				$("#txtRtgsAmt").val(remaining);
			} else {
				var totalamt = parseFloat(chequeAmt) + parseFloat(rtgsAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox1").is(":checked") == true) {
					$("#cashAmount").val(remaining);
					
				} else if ($("#CheckBox2").is(":checked") == true) {
					$("#cardAmount").val(remaining);
					
				} else {
					remaining = total - parseFloat(chequeAmt);
					$("#txtRtgsAmt").val(remaining);
					
				}
			}
		}

	} else {

		rtgsAmt = $("#txtRtgsAmt").val();
		if(rtgsAmt == ""){
			rtgsAmt = 0;
		}

		if ($("#CheckBox1").is(":checked") == true) {
			cashAmt = $("#cashAmount").val();
			if (cashAmt == "" || cashAmt == 0) {
				cashAmt == 0;
				remaining = total - parseFloat(rtgsAmt);
				$("#cashAmount").val(remaining);
			} else {
				var totalamt = parseFloat(rtgsAmt) + parseFloat(cashAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox2").is(":checked") == true) {
					$("#cardAmount").val(remaining);
					
				} else if ($("#CheckBox3").is(":checked") == true) {
					$("#chequeAmount").val(remaining);
					
				} else {
					remaining = total - parseFloat(rtgsAmt);
					$("#cashAmount").val(remaining);
					
				}
			}
		} else if ($("#CheckBox2").is(":checked") == true) {
			cardAmt = $("#cardAmount").val();
			if (cardAmt == "" || cardAmt == 0) {
				cardAmt == 0;
				remaining = total - parseFloat(rtgsAmt);
				$("#cardAmount").val(remaining);
			} else {
				var totalamt = parseFloat(rtgsAmt) + parseFloat(cardAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox1").is(":checked") == true) {
					$("#cashAmount").val(remaining);
					
				} else if ($("#CheckBox3").is(":checked") == true) {
					$("#chequeAmount").val(remaining);
					
				} else {
					remaining = total - parseFloat(rtgsAmt);
					$("#cardAmount").val(remaining);

				}
			}
		} else if ($("#CheckBox3").is(":checked") == true) {
			chequeAmt = $("#chequeAmount").val();
			if (chequeAmt == "" || chequeAmt == 0) {
				chequeAmt == 0;
				remaining = total - parseFloat(rtgsAmt);
				$("#chequeAmount").val(remaining);
			} else {
				var totalamt = parseFloat(rtgsAmt) + parseFloat(chequeAmt);
				remaining = total - parseFloat(totalamt);
				if ($("#CheckBox1").is(":checked") == true) {
					$("#cashAmount").val(remaining);
					
				} else if ($("#CheckBox2").is(":checked") == true) {
					$("#cardAmount").val(remaining);
					
				} else {
					remaining = total - parseFloat(rtgsAmt);
					$("#chequeAmount").val(remaining);
					
				}
			}
		}
	}
}

function getIPDBillHeaders() {

	var discount = $("#SpecialDisc").val();
	var hallId = $("#hallId").val();
	var myObj = $("#divPatId").html();
	myObj = JSON.parse(myObj);
	var ti = myObj.trid;

	var inputs = [];
	inputs.push('action=getIPDBillHeaders');
	inputs.push('spDiscount=' + discount);
	inputs.push('hallId=' + hallId);
	inputs.push('treatId=' + ti);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('Oops some problem occured...');
				},
				success : function(r) {
					ajaxResponse = r;
					$("#headerList").html(ajaxResponse);
					// alert(ajaxResponse);
					billBeanHeader = eval('(' + ajaxResponse + ')');

					$("#billComponent")
							.setTemplate(
									"{#foreach $T.ol as oli} {#if $T.oli.od==1}	<tr id='headDetails{subsr++}'><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric center' style='border-top: none; padding: 1px;'></td></tr>"
											+ "<tr id='relativeBed'><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='RelativeBed'>Patient Relative Bed:</label></td></tr>"
											+ "{#elseif $T.oli.od==2}<tr><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Investigation Test:</label></td></tr><tr id='headDetails{subsr++}'></tr>"

											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Physiotherapy Test:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Pathology Test:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Other Services:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "{#elseif $T.oli.od==3}<tr><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>IPD Consumables:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Gases and Monitors:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Bed Side Procedures:<label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Instruments and Equipments:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Consulting/Visiting Charges:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Post Operation Charges:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Pharmacy Charges:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "{#elseif $T.oli.od==4}<tr><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'></label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Surgery Services:</label></td></tr><tr id='surServicesheadDetails'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Surgery Consumables:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Operation Theatre Rent:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "{#elseif $T.oli.od==5}<tr><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td></tr><tr id='headDetails{subsr++}'></tr>"

											+ "{#else}<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='head11{sr1}'></label></td></tr><tr id='Billdiv{sr1}'></tr>"

											+ "<tr id='Billdiv{sr1}"
											+ "'><td class='col-md-1-1' style='border-top: none; padding: 1px;'>{sr++}."
											+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>{$T.oli.on}<input type='hidden' id='billcomp_id{sr1}' value='{$T.oli.od}'>"
											+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'  id='headdate{sr1}'>"
											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;' id='chr{sr1}'>"
											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;' id='qty{sr1}'>"
											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;' id='disc{sr1}'>"
											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'  id='amt{sr1}'>"
											+ "</td><td id='tdBilldivPay{sr1}"
											+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
											+ "</td><td id='tdBilldivCoPay{sr1}"
											+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='{sr1}' name='ipdBillCheckbox' id='bcomp{sr1}'></td></tr>{sr1++}"
											+ "{#/if}{#/for}");// showBillHeader

					$("#billComponent").processTemplate(billBeanHeader);
				}
			});
}

function TotalIPDBillDetails(tempType) {

	var searchtype;

	searchtype = "bill";
	subsr = 1;
	physiotestcount = 1;
	testcount = 1;
	sr = 1;
	hallcount = 1;
	rowCount = 1;
	opcount = 1;
	consultcount = 1;
	surgeoncount = 1;
	matIpdcount = 1;
	matSurcount = 1;
	SurServicescount = 1;
	pathotestcount = 1;
	ipdservicescount = 1;
	instrumentscount = 1;
	bedsidecount = 1;
	theatercount = 1;
	docdiscount = 1;
	Rhallcount = 1;
	var discount = $("#SpecialDisc").val();

	if (discount == 0) {
		discount = "bill";
	}

	var myObj = $("#divPatId").html();
	myObj = JSON.parse(myObj);

	// sponsred details
	$("#sponsredDetailsTableBill").setTemplate(
			sponsredDetailsTemplateForListBill);
	$("#sponsredDetailsTableBill").processTemplate(myObj);

	$("#activeInsurance" + discount).prop('checked', true);

	var pi = myObj.pi;
	var ti = myObj.trid;
	var tflag = myObj.objTreat.tf;
	

	$("#trid").val(ti);
	var inputs = [];
	inputs.push('action=ShowIPDHeaderBill');
	inputs.push('SpecialDisc=' + discount);
	inputs.push('pi=' + pi);
	inputs.push('ti=' + ti);
	// inputs.push('billhead=' + billhead);
	inputs.push('searchtype=' + searchtype);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('Oops some problem occured...');
				},
				success : function(r) {
					billComps = r;
					// alert(billComps);
					billBean = eval('(' + billComps + ')');
					var msg = billBean.bcs7[0].msg;
					
					$("#hallId").val(billBean.oplist[2][0].Htype);
					if (billBean.hospDetail[0] != null) {
						setHospitalDetails(billBean.hospDetail[0]);
					}

					if (msg != "") {
						window.location.href = "BillingDashboardForIPD.jsp";
					} else {
						var strDate = "";
						var d = new Date();
						strDate = d.getFullYear() + "-" + (d.getMonth() + 1)
								+ "-" + d.getDate();

						// $("#billdate").html(strDate);

						if (billBean.bl[0].isCredit != undefined) {
							var isCredit = billBean.bl[0].isCredit;
							if (isCredit == 1) {
								$(
										'input:radio[name=billPrintType][value=credit]')
										.prop('checked', true);
								if (tflag == "INACTIVE") {
									$("#cvrtBillBtn").show();
								}
							} else {
								$(
										'input:radio[name=billPrintType][value=general]')
										.prop('checked', true);
								$("#cvrtBillBtn").hide();
							}
						}

						if (billBean.bl[0].bd != undefined) {
							var bdate = new Date(billBean.bl[0].bd);
							strDate = bdate.getFullYear() + "-"
									+ (bdate.getMonth() + 1) + "-"
									+ bdate.getDate();
							// alert(strDate);

						} else {
							$("#billdate").html(strDate);
						}
						if (billBean.hospAcct.length != 0) {
							$("#adminCharges").val(
									billBean.hospAcct[0].adminchr);
						}

						// $("#bdate").html(strDate);
						$("#billno").html(billBean.bl[0].id);

						if (billBean.bcs1 == "" && billBean.bcs2 == ""
								&& billBean.bcs3 == "" && billBean.bcs4 == ""
								&& billBean.bcs7 == "") {
							alert("Patient bill is not available.");
							// window.location = "IPD_OPD_Database.jsp";
							return false;
						}

						$("#billComps").html(billComps);
						var amt = 0;
						var chatAmount = 0;
						for ( var m4 = 0; m4 < billBean.bcs5.length; m4++) {

							amt = amt + parseFloat(billBean.bcs5[m4].amt);

						}
						if (tempType == "pay") {
							if (billBean.bl[0] != "") {
								$("#txtDiscount").val(
										parseInt(billBean.bl[0].da));
								if (billBean.bl[0].da == null) {
									$("#txtDiscount").val(0);
								}
								$("#txtPayable").val(
										parseInt(billBean.bl[0].pay));
								$("#txtPaid").val(parseInt(billBean.bl[0].pa));
								$("#txtRefund")
										.val(
												parseInt(billBean.bl[0].rfd)
														.toFixed(2));
								$("#txtRemaining").val(
										parseInt(billBean.bl[0].ra));
								$("#txtRecNo").html(billBean.bl[0].id);
								/*
								 * $("#SpecialDisc").val(
								 * billBean.bl[0].sp_dic_master_id);
								 */
								// OPD bill when patient converted to IPD from
								// OPD
								/*
								 * $("#chr6").val((billBean.bl[0].ctipd));
								 * $("#qty6").val(1); $("#amt6").val(
								 * (billBean.bl[0].ctipd).toFixed(2));
								 */
							}
							if (billBean.bcs5 == "" && billBean.bcs2 == ""
									&& billBean.bcs3 == ""
									&& billBean.bcs4 == ""
									&& billBean.bcs8 == ""
									&& billBean.bcs6 == "") {
								for ( var x = 0; x < billBean.bcs1.length; x++) {
									if (billBean.bcs1[x].qty == 0) {
										$("#chr" + billBean.bcs1[x].id).val(0);
									} else {
										$("#chr" + billBean.bcs1[x].id)
												.val(
														(billBean.bcs1[x].amt / billBean.bcs1[x].qty)
																.toFixed(2));
									}
									$("#qty" + billBean.bcs1[x].id).val(
											billBean.bcs1[x].qty);
									$("#amt" + billBean.bcs1[x].id).val(
											(billBean.bcs1[x].amt).toFixed(2));

								}

							} else {

								// anaesthetist charges
								var anaqty = 0;
								var anaamt = 0;
								var anadocname = "";
								for ( var x = 0; x < billBean.anali.length; x++) {

									anadocname = anadocname
											+ billBean.anali[x].nm + ",";
									anaqty = parseInt(anaqty)
											+ parseInt(billBean.anali[x].qty);
									anaamt = parseFloat(anaamt)
											+ parseFloat((billBean.anali[x].amt)
													.toFixed(2));
								}

								$("#txtRecNo").html(billBean.bl[0].id);

								if (billBean.bcs6[0] != undefined
										&& billBean.bcs6[0].msg == "Intensivist") {
									// Registration
									var regCharges = parseFloat(billBean.bcs6[0].amt);
									$("#chr1").text(
											parseFloat(billBean.bcs6[0].rtca)
													.toFixed(2));
									$("#qty1").text(
											(billBean.bcs6[0].qty).toFixed(1));
									$("#disc1").text(
											(billBean.bcs6[0].disComp)
													.toFixed(2));
									$("#amt1").text(regCharges.toFixed(2));
									$("#msg1").text(billBean.bcs6[0].msg);
									$("#tdBilldivPay1").text(
											parseFloat(billBean.bcs6[0].pay)
													.toFixed(2));
									$("#tdBilldivCoPay1").text(
											parseFloat(billBean.bcs6[0].coPay)
													.toFixed(2));
									$("#headdate1").text(billBean.bcs6[0].dt);
								}

								if (billBean.bcs2 != "") {
									if (billBean.bcs2[0].msg == "registration") {
										// Registration
										var regCharges = parseFloat(billBean.bcs2[0].amt);
										$("#chr3")
												.text(
														(parseFloat(billBean.bcs2[0].rtca))
																.toFixed(2));
										// $("#chr3").text(regCharges.toFixed(2));
										$("#qty3").text((1).toFixed(1));
										$("#disc3").text(
												(billBean.bcs2[0].disComp)
														.toFixed(2));
										$("#amt3").text(regCharges.toFixed(2));
										$("#msg3").text(billBean.bcs2[0].msg);
										$("#tdBilldivPay3")
												.text(
														parseFloat(
																billBean.bcs2[0].pay)
																.toFixed(2));
										$("#tdBilldivCoPay3").text(
												parseFloat(
														billBean.bcs2[0].coPay)
														.toFixed(2));
										$("#headdate3").text(
												billBean.bcs2[0].dt);
									}

									if (billBean.bcs2[1].msg == "mlcCharges") {
										// Mlc Charges
										var mlcCharges = parseFloat(billBean.bcs2[1].amt);
										$("#chr4")
												.text(
														(parseFloat(billBean.bcs2[1].rtca)
																.toFixed(2)));
										// $("#chr4").text(mlcCharges.toFixed(2));
										$("#qty4").text((1).toFixed(1));
										$("#disc4").text(
												(billBean.bcs2[1].disComp)
														.toFixed(2));
										$("#amt4").text(mlcCharges.toFixed(2));
										$("#msg4").text(billBean.bcs2[1].msg);
										$("#tdBilldivPay4")
												.text(
														parseFloat(
																billBean.bcs2[1].pay)
																.toFixed(2));
										$("#tdBilldivCoPay4").text(
												parseFloat(
														billBean.bcs2[1].coPay)
														.toFixed(2));
										$("#headdate4").text(
												billBean.bcs2[1].dt);
									}

									if (billBean.bcs2.length > 2) {
										var j = 7;
										for ( var i = 0; i < billBean.bcs2.length; i++) {
											if (billBean.bcs2[i].msg == "tpa") {
												var tpaCharges = parseFloat(billBean.bcs2[2].amt);
												$("#chr5")
														.text(
																parseFloat(
																		billBean.bcs2[2].rtca)
																		.toFixed(
																				2));
												$("#qty5").text((1).toFixed(1));
												$("#disc5")
														.text(
																(billBean.bcs2[2].disComp)
																		.toFixed(2));
												$("#amt5").text(
														tpaCharges.toFixed(2));
												$("#msg5").text(
														billBean.bcs2[2].msg);
												$("#tdBilldivPay5")
														.text(
																parseFloat(
																		billBean.bcs2[2].pay)
																		.toFixed(
																				2));
												$("#tdBilldivCoPay5")
														.text(
																parseFloat(
																		billBean.bcs2[2].coPay)
																		.toFixed(
																				2));
												$("#headdate5").text(
														billBean.bcs2[2].dt);
											} else if (billBean.bcs2[i].msg == "emergency") {

												var emerCharges = parseFloat(billBean.bcs2[i].netAmt);
												$("#chr6")
														.text(
																parseFloat(
																		billBean.bcs2[i].iprt)
																		.toFixed(
																				2));
												$("#qty6").text((1).toFixed(1));
												$("#disc6")
														.text(
																(billBean.bcs2[i].disComp)
																		.toFixed(2));
												$("#amt6").text(
														emerCharges.toFixed(2));

												$("#tdBilldivPay6")
														.text(
																parseFloat(
																		billBean.bcs2[i].pay)
																		.toFixed(
																				2));
												$("#tdBilldivCoPay6")
														.text(
																parseFloat(
																		billBean.bcs2[i].coPay)
																		.toFixed(
																				2));
												$("#headdate6").text(
														billBean.bcs2[i].dt);

											} else if (billBean.bcs2[i].msg == "general") {

												var response = $("#headerList")
														.html();
												var headerList = eval('('
														+ response + ')');
												var headercount = headerList.ol.length - 5;
												for ( var x = 7; x <= headercount; x++) {
													var billcompid_onjsp = $(
															"#billcomp_id"
																	+ (x))
															.val();

													if (billcompid_onjsp == billBean.bcs2[i].itemid) {

														var Charges = parseFloat(billBean.bcs2[i].netAmt);
														$("#chr" + x)
																.text(
																		parseFloat(
																				billBean.bcs2[i].rtca)
																				.toFixed(
																						2));
														$("#qty" + x)
																.text(
																		(billBean.bcs2[i].qty)
																				.toFixed(1));
														$("#disc" + x)
																.text(
																		(billBean.bcs2[i].disComp)
																				.toFixed(2));
														$("#amt" + x)
																.text(
																		Charges
																				.toFixed(2));
														$("#tdBilldivPay" + x)
																.text(
																		parseFloat(
																				billBean.bcs2[i].pay)
																				.toFixed(
																						2));
														$("#tdBilldivCoPay" + x)
																.text(
																		parseFloat(
																				billBean.bcs2[i].coPay)
																				.toFixed(
																						2));
														$("#headdate" + x)
																.text(
																		billBean.bcs2[i].dt);
													}
												}
											}
										}
									}

								}

								// for bed details
								var i = 1.1;
								var bedCount = 1;
								var bedCharges = "";
								var phy_discharge_flag = "N";
								$
										.each(
												billBean.bcs4,
												function(name, value) {
													if(value.physicalDischargeFlag == "Y"){
														phy_discharge_flag = "Y";
													}
													 
													 var coPay = (value.coPay).toFixed(2);
													 var Pay = (value.pay).toFixed(2);
													 if (value.disComp > 0) {
														 if(discount == "bill"){
															 coPay = ((value.coPay).toFixed(2) - (value.disComp).toFixed(2)).toFixed(2);
														 }else{
															 Pay = ((value.pay).toFixed(2) - (value.disComp).toFixed(2)).toFixed(2);
														 }
													 }
													 
													// normal charges bed
													bedCharges = bedCharges
															+ "<tr id='trBed"
															+ bedCount
															+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ i.toFixed(1)
															+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
															+ value.nm
															+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
															+ value.dt
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.rtca)
															+ "</td><td id='tdBedQty"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.qty)
																	.toFixed(2)
															+ "</td><td id='tdBedDiscount"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.disComp)
																	.toFixed(2)
															+ "</td><td id='tdBedTotal"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ ((value.amt) - (value.disComp))
																	.toFixed(2)
															+ "</td><td id='tdBedPay"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (Pay)
															+ "</td><td id='tdBedCoPay"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (coPay)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' id='trBed"
															+ bedCount
															+ "' name='ipdBillCheckbox' value='"
															+ value.id
															+ "' ></td></tr>";

													bedCount++;

													// nursing charges bed
													// value.netAmt contains...
													// nursing charges bed(NCB)

													 var nurcoPay = (value.nursingchargesCoPay).toFixed(2);
													 var nurPay = (value.nursingchargesPay).toFixed(2);
													 if (value.nursingchargesDiscount > 0) {
														 if(discount == "bill"){
															 nurcoPay = ((value.nursingchargesCoPay).toFixed(2) - (value.nursingchargesDiscount).toFixed(2)).toFixed(2);
														 }else{
															 nurPay = ((value.nursingchargesPay).toFixed(2) - (value.nursingchargesDiscount).toFixed(2)).toFixed(2);
														 }
													 }

													bedCharges = bedCharges
															+ "<tr id='trBed"
															+ bedCount
															+ "'><td class='col-md-1-1' style='border-top: none; padding: 1px; padding-left: 45px;'>"
															+ ((i.toFixed(1))
																	+ "." + "1")
															+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
															+ "<i>"
															+ nursingChargesBedString
															+ "</i>"
															+ value.nm
															+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
															+ value.dt
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.nursingchargesRate)
																	.toFixed(2)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.nursingchargesQuantity)
																	.toFixed(2)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.nursingchargesDiscount)
																	.toFixed(2)
															+ "</td><td id='tdBedTotal"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ ((value.netAmt) - (value.nursingchargesDiscount))
																	.toFixed(2)
															+ "</td><td id='tdBedPay"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (nurPay)
															+ "</td><td id='tdBedCoPay"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (nurcoPay)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ "<input type='checkbox' id='trBed"
															+ bedCount
															+ "_NCB' name='ipdBillCheckbox' value='"
															+ value.id
															+ "' ></td></tr>";

													i = i + 0.1;
													bedCount++;
												});

								$('#headDetails1')
										.after(
												bedCharges
														+ "<input type='hidden' id='bedCount' value='"
														+ --bedCount + "'>");
								var bedTotal = 0;
								var bedPay = 0;
								var bedCoPay = 0;
								for ( var i = 1; i <= bedCount; i++) {
									var bedTotalTemp = $('#tdBedTotal' + i)
											.html();
									bedTotal = parseFloat(bedTotal)
											+ parseFloat(bedTotalTemp);
									var bedPayTemp = $('#tdBedPay' + i).html();
									bedPay = parseFloat(bedPay)
											+ parseFloat(bedPayTemp);
									var bedCoPayTemp = $('#tdBedCoPay' + i)
											.html();
									bedCoPay = parseFloat(bedCoPay)
											+ parseFloat(bedCoPayTemp);
								}

								$('#trBed' + bedCount)
										.after(
												'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; border-top: none; color: #5CAFE6;">Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal1">'
														+ bedTotal.toFixed(2)
														+ '</td><td class="numeric center" style="padding: 1px;" id="tdPay1">'
														+ bedPay.toFixed(2)
														+ '</td><td class="numeric center" style="padding: 1px;" id="tdCoPay1">'
														+ bedCoPay.toFixed(2)
														+ '</td><td class="numeric center" style="padding: 1px; border-top: none;"></td></tr>');
								$("#PhysicalDischargeFlag").val(phy_discharge_flag);
								
								// For relative bed charges

								var i = 1.1;
								var relativeBedCount = 1;
								var relativeBedCharges = "";
								$
										.each(
												billBean.relBedChr,
												function(name, value) {
													

													 var coPay = (value.coPay).toFixed(2);
													 var Pay = (value.pay).toFixed(2);
													 if (value.disComp > 0) {
														 if(discount == "bill"){
															 coPay = ((value.coPay).toFixed(2) - (value.disComp).toFixed(2)).toFixed(2);
														 }else{
															 Pay = ((value.pay).toFixed(2) - (value.disComp).toFixed(2)).toFixed(2);
														 }
													 }
													 
													relativeBedCharges = relativeBedCharges
															+ "<tr id='trrelativeBed"
															+ relativeBedCount
															+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ i.toFixed(1)
															+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
															+ value.nm
															+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
															+ value.dt
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ value.rtca
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.qty)
																	.toFixed(1)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.disComp)
																	.toFixed(2)
															+ "</td><td id='tdrelativeBedTotal"
															+ relativeBedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ ((value.amt) - (value.disComp))
																	.toFixed(2)
															+ "</td><td id='tdrelativeBedPay"
															+ relativeBedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (Pay)
															+ "</td><td id='tdrelativeBedCoPay"
															+ relativeBedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (coPay)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' id='reBed"
															+ relativeBedCount
															+ "' name='ipdBillCheckbox' value='"
															+ value.id
															+ "' ></td></tr>";
													i = i + 0.1;
													relativeBedCount++;
												})
								$('#relativeBed')
										.after(
												relativeBedCharges
														+ "<input type='hidden' id='relativeBedCount' value='"
														+ --relativeBedCount
														+ "'>");
								var relativeBedTotal = 0;
								var relativeBedPay = 0;
								var relativeBedCoPay = 0;
								for ( var i = 1; i <= relativeBedCount; i++) {
									var relativeBedTotalTemp = $(
											'#tdrelativeBedTotal' + i).html();
									relativeBedTotal = parseFloat(relativeBedTotal)
											+ parseFloat(relativeBedTotalTemp);
									var relativeBedPayTemp = $(
											'#tdrelativeBedPay' + i).html();
									relativeBedPay = parseFloat(relativeBedPay)
											+ parseFloat(relativeBedPayTemp);
									var relativeBedCoPayTemp = $(
											'#tdrelativeBedCoPay' + i).html();
									relativeBedCoPay = parseFloat(relativeBedCoPay)
											+ parseFloat(relativeBedCoPayTemp);
								}

								$('#trrelativeBed' + relativeBedCount)
										.after(
												'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>							<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; color: #5CAFE6;"  id="rbtdTotal">'
														+ relativeBedTotal
																.toFixed(2)
														+ '</td><td class="numeric center" style="padding: 1px;" id="rbtdPay">'
														+ relativeBedPay
																.toFixed(2)
														+ '</td><td class="numeric center" style="padding: 1px;" id="rbtdCoPay">'
														+ relativeBedCoPay
																.toFixed(2)
														+ '</td><td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								// for Investigation Test details
								if (billBean.bcs3 != "") {
									var i = 2.1;
									var investigationTestCount = 1;
									var investigationTestCharges = "";
									$
											.each(
													billBean.bcs3,
													function(name, value) {
														if (value.ct == "invest") {
															
															investigationTestCharges = investigationTestCharges
																	+ "<tr id='trinvestigationTest"
																	+ investigationTestCount
																	+ "'><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdinvestigationTestTotal"
																	+ investigationTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdinvestigationTestPay"
																	+ investigationTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdinvestigationTestCoPay"
																	+ investigationTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' id='inves"
																	+ investigationTestCount
																	+ "' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' ><input type='hidden' id='ipdBillInvestigationSlaveTbId"
																	+ investigationTestCount
																	+ "' value='"
																	+ value.id
																	+ "' /></td></tr>";
															i = i + 0.1;
															investigationTestCount++;
														}

													});
									$('#headDetails2')
											.after(
													investigationTestCharges
															+ "<input type='hidden' id='investigationTestCount' value='"
															+ --investigationTestCount
															+ "'>");
									var investigationTestTotal = 0;
									var investigationTestPay = 0;
									var investigationTestCoPay = 0;
									for ( var i = 1; i <= investigationTestCount; i++) {
										var investigationTestTotalTemp = $(
												'#tdinvestigationTestTotal' + i)
												.html();
										investigationTestTotal = parseFloat(investigationTestTotal)
												+ parseFloat(investigationTestTotalTemp);
										var investigationTestPayTemp = $(
												'#tdinvestigationTestPay' + i)
												.html();
										investigationTestPay = parseFloat(investigationTestPay)
												+ parseFloat(investigationTestPayTemp);
										var investigationTestCoPayTemp = $(
												'#tdinvestigationTestCoPay' + i)
												.html();
										investigationTestCoPay = parseFloat(investigationTestCoPay)
												+ parseFloat(investigationTestCoPayTemp);
									}

									$(
											'#trinvestigationTest'
													+ investigationTestCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal2">'
															+ investigationTestTotal
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px;" id="tdPay2">'
															+ investigationTestPay
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px;" id="tdCoPay2">'
															+ investigationTestCoPay
																	.toFixed(2)
															+ '</td><td class="numeric center"	style="padding: 1px; border-top: none;"></td>												</tr>');
								}

								// for Physiotherapy Test details
								if (billBean.bcs3 != "") {
									var i = 2.1;
									var physiotherapyTestCount = 1;
									var physiotherapyTestCharges = "";
									$
											.each(
													billBean.bcs3,
													function(name, value) {
														if (value.ct == "physio") {
															
															physiotherapyTestCharges = physiotherapyTestCharges
																	+ "<tr id='trphysiotherapyTest"
																	+ physiotherapyTestCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdphysiotherapyTestTotal"
																	+ physiotherapyTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdphysiotherapyTestPay"
																	+ physiotherapyTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdphysiotherapyTestCoPay"
																	+ physiotherapyTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='physi"
																	+ physiotherapyTestCount
																	+ "' ></td></tr>";
															i = i + 0.1;
															physiotherapyTestCount++;
														}

													})
									$('#headDetails3')
											.after(
													physiotherapyTestCharges
															+ "<input type='hidden' id='physiotherapyTestCount' value='"
															+ --physiotherapyTestCount
															+ "'>");
									var physiotherapyTestTotal = 0;
									var physiotherapyTestPay = 0;
									var physiotherapyTestCoPay = 0;
									for ( var i = 1; i <= physiotherapyTestCount; i++) {
										var physiotherapyTestTotalTemp = $(
												'#tdphysiotherapyTestTotal' + i)
												.html();
										physiotherapyTestTotal = parseFloat(physiotherapyTestTotal)
												+ parseFloat(physiotherapyTestTotalTemp);
										var physiotherapyTestPayTemp = $(
												'#tdphysiotherapyTestPay' + i)
												.html();
										physiotherapyTestPay = parseFloat(physiotherapyTestPay)
												+ parseFloat(physiotherapyTestPayTemp);
										var physiotherapyTestCoPayTemp = $(
												'#tdphysiotherapyTestCoPay' + i)
												.html();
										physiotherapyTestCoPay = parseFloat(physiotherapyTestCoPay)
												+ parseFloat(physiotherapyTestCoPayTemp);
									}

									$(
											'#trphysiotherapyTest'
													+ physiotherapyTestCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>	<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric" style="padding: 1px; border-top: none;"></td>'
															+ '<td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal3">'
															+ physiotherapyTestTotal
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px;" id="tdPay3">'
															+ physiotherapyTestPay
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px;" id="tdCoPay3">'
															+ physiotherapyTestCoPay
																	.toFixed(2)
															+ '</td><td class="numeric center"		style="padding: 1px; border-top: none;"></td>												</tr>');
								}

								// for Pathology Test details

								var i = 2.1;
								var pathologyTestCount = 1;
								var pathologyTestCharges = "";
								$
										.each(
												billBean.bcs3,
												function(name, value) {
													if (value.ct == "patho") {
														
														pathologyTestCharges = pathologyTestCharges
																+ "<tr id='trpathologyTest"
																+ pathologyTestCount
																+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdpathologyTestTotal"
																+ pathologyTestCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdpathologyTestPay"
																+ pathologyTestCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdpathologyTestCoPay"
																+ pathologyTestCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																+ value.id
																+ "' name='ipdBillCheckbox' id='patho"
																+ pathologyTestCount
																+ "'></td></tr>";
														i = i + 0.1;
														pathologyTestCount++;
													}
												})
								$('#headDetails4')
										.after(
												pathologyTestCharges
														+ "<input type='hidden' id='pathologyTestCount' value='"
														+ --pathologyTestCount
														+ "'>");
								var pathologyTestTotal = 0;
								var pathologyTestPay = 0;
								var pathologyTestCoPay = 0;
								for ( var i = 1; i <= pathologyTestCount; i++) {
									var pathologyTestTotalTemp = $(
											'#tdpathologyTestTotal' + i).html();
									pathologyTestTotal = parseFloat(pathologyTestTotal)
											+ parseFloat(pathologyTestTotalTemp);
									var pathologyTestPayTemp = $(
											'#tdpathologyTestPay' + i).html();
									pathologyTestPay = parseFloat(pathologyTestPay)
											+ parseFloat(pathologyTestPayTemp);
									var pathologyTestCoPayTemp = $(
											'#tdpathologyTestCoPay' + i).html();
									pathologyTestCoPay = parseFloat(pathologyTestCoPay)
											+ parseFloat(pathologyTestCoPayTemp);
								}

								$('#trpathologyTest' + pathologyTestCount)
										.after(
												'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal4">'
														+ pathologyTestTotal
																.toFixed(2)
														+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay4">'
														+ pathologyTestPay
																.toFixed(2)
														+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay4">'
														+ pathologyTestCoPay
																.toFixed(2)
														+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								// pathology test end

								/**
								 * **************************other
								 * services****************************************
								 */
								if (billBean.bcs3 != "") {
									var i = 2.1;
									var otherserviceTestCount = 1;
									var otherserviceTestCharges = "";
									$
											.each(
													billBean.bcs3,
													function(name, value) {
														if (value.ct == "otherservice") {
															otherserviceTestCharges = otherserviceTestCharges
																	+ "<tr id='trotherserviceTest"
																	+ otherserviceTestCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdotherTestTotal"
																	+ otherserviceTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdotherTestPay"
																	+ otherserviceTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdotherTestCoPay"
																	+ otherserviceTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='Other"
																	+ otherserviceTestCount
																	+ "' ></td></tr>";
															i = i + 0.1;
															otherserviceTestCount++;
														}

													})
									$('#headDetails5')
											.after(
													otherserviceTestCharges
															+ "<input type='hidden' id='otherserviceTestCount' value='"
															+ --otherserviceTestCount
															+ "'>");
									var otherserviceTestTotal = 0;
									var otherserviceTestPay = 0;
									var otherserviceTestCoPay = 0;
									for ( var i = 1; i <= otherserviceTestCount; i++) {
										var otherserviceTestTotalTemp = $(
												'#tdotherTestTotal' + i).html();
										otherserviceTestTotal = parseFloat(otherserviceTestTotal)
												+ parseFloat(otherserviceTestTotalTemp);
										var otherserviceTestPayTemp = $(
												'#tdotherTestPay' + i).html();
										otherserviceTestPay = parseFloat(otherserviceTestPay)
												+ parseFloat(otherserviceTestPayTemp);
										var otherserviceTestCoPayTemp = $(
												'#tdotherTestCoPay' + i).html();
										otherserviceTestCoPay = parseFloat(otherserviceTestCoPay)
												+ parseFloat(otherserviceTestCoPayTemp);
									}

									$(
											'#trotherserviceTest'
													+ otherserviceTestCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal5">'
															+ otherserviceTestTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay5">'
															+ otherserviceTestPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay5">'
															+ otherserviceTestCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');
								} // other services end

								// for hospital material used

								if (billBean.oplist[1] != "") {
									var i = 3.1;
									var hospitalMaterialCount = 1;
									var hospitalMaterialCharges = "";
									$
											.each(
													billBean.oplist[1],
													function(name, value) {
														if (value.ct == "ipdConsumable") {

															hospitalMaterialCharges = hospitalMaterialCharges
																	+ "<tr id='trhospitalMaterial"
																	+ hospitalMaterialCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdhospitalMaterialTotal"
																	+ hospitalMaterialCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdhospitalMaterialPay"
																	+ hospitalMaterialCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdhospitalMaterialCoPay"
																	+ hospitalMaterialCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='hosma"
																	+ hospitalMaterialCount
																	+ "'></td></tr>";
															i = i + 0.1;
															hospitalMaterialCount++;
														}
													})
									$('#headDetails6')
											.after(
													hospitalMaterialCharges
															+ "<input type='hidden' id='hospitalMaterialCount' value='"
															+ --hospitalMaterialCount
															+ "'>");
									var hospitalMaterialTotal = 0;
									var hospitalMaterialPay = 0;
									var hospitalMaterialCoPay = 0;
									for ( var i = 1; i <= hospitalMaterialCount; i++) {
										var hospitalMaterialTotalTemp = $(
												'#tdhospitalMaterialTotal' + i)
												.html();
										hospitalMaterialTotal = parseFloat(hospitalMaterialTotal)
												+ parseFloat(hospitalMaterialTotalTemp);
										var hospitalMaterialPayTemp = $(
												'#tdhospitalMaterialPay' + i)
												.html();
										hospitalMaterialPay = parseFloat(hospitalMaterialPay)
												+ parseFloat(hospitalMaterialPayTemp);
										var hospitalMaterialCoPayTemp = $(
												'#tdhospitalMaterialCoPay' + i)
												.html();
										hospitalMaterialCoPay = parseFloat(hospitalMaterialCoPay)
												+ parseFloat(hospitalMaterialCoPayTemp);
									}

									$(
											'#trhospitalMaterial'
													+ hospitalMaterialCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal6">'
															+ hospitalMaterialTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay6">'
															+ hospitalMaterialPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay6">'
															+ hospitalMaterialCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}// ipd consumables end

								// gases and monitor
								if (billBean.oplist[1] != "") {
									var i = 3.1;
									var gasesMonitorCount = 1;
									var gasesMonitorCharges = "";
									$
											.each(
													billBean.oplist[1],
													function(name, value) {
														if (value.ct == "gas") {
															gasesMonitorCharges = gasesMonitorCharges
																	+ "<tr id='trgasesMonitor"
																	+ gasesMonitorCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdgasesMonitorTotal"
																	+ gasesMonitorCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdgasesMonitorPay"
																	+ gasesMonitorCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdgasesMonitorCoPay"
																	+ gasesMonitorCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='gasmo"
																	+ gasesMonitorCount
																	+ "'></td></tr>";
															i = i + 0.1;
															gasesMonitorCount++;
														}
													})
									$('#headDetails7')
											.after(
													gasesMonitorCharges
															+ "<input type='hidden' id='gasesMonitorCount' value='"
															+ --gasesMonitorCount
															+ "'>");
									var gasesMonitorTotal = 0;
									var gasesMonitorPay = 0;
									var gasesMonitorCoPay = 0;
									for ( var i = 1; i <= gasesMonitorCount; i++) {
										var gasesMonitorTotalTemp = $(
												'#tdgasesMonitorTotal' + i)
												.html();
										gasesMonitorTotal = parseFloat(gasesMonitorTotal)
												+ parseFloat(gasesMonitorTotalTemp);
										var gasesMonitorPayTemp = $(
												'#tdgasesMonitorPay' + i)
												.html();
										gasesMonitorPay = parseFloat(gasesMonitorPay)
												+ parseFloat(gasesMonitorPayTemp);
										var gasesMonitorCoPayTemp = $(
												'#tdgasesMonitorCoPay' + i)
												.html();
										gasesMonitorCoPay = parseFloat(gasesMonitorCoPay)
												+ parseFloat(gasesMonitorCoPayTemp);
									}

									$('#trgasesMonitor' + gasesMonitorCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal7">'
															+ gasesMonitorTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay7">'
															+ gasesMonitorPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay7">'
															+ gasesMonitorCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');
								}

								// bedside procedure
								if (billBean.oplist[1] != "") {
									var i = 3.1;
									var bedsideCount = 1;
									var bedsideCharges = "";
									$
											.each(
													billBean.oplist[1],
													function(name, value) {
														if (value.ct == "bedside") {
															
															bedsideCharges = bedsideCharges
																	+ "<tr id='trbedside"
																	+ bedsideCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdbedsideTotal"
																	+ bedsideCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdbedsidePay"
																	+ bedsideCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay).toFixed(2)
																	+ "</td><td id='tdbedsideCoPay"
																	+ bedsideCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='bedsi"
																	+ bedsideCount
																	+ "'></td></tr>";
															i = i + 0.1;
															bedsideCount++;
														}
													})
									$('#headDetails8')
											.after(
													bedsideCharges
															+ "<input type='hidden' id='bedsideCount' value='"
															+ --bedsideCount
															+ "'>");
									var bedsideTotal = 0;
									var bedsidePay = 0;
									var bedsideCoPay = 0;
									for ( var i = 1; i <= bedsideCount; i++) {
										var bedsideTotalTemp = $(
												'#tdbedsideTotal' + i).html();
										bedsideTotal = parseFloat(bedsideTotal)
												+ parseFloat(bedsideTotalTemp);
										//alert("bedsideTotal...."+bedsideTotal);
										var bedsidePayTemp = $(
												'#tdbedsidePay' + i).html();
										bedsidePay = parseFloat(bedsidePay)
												+ parseFloat(bedsidePayTemp);
										var bedsideCoPayTemp = $(
												'#tdbedsideCoPay' + i).html();
										bedsideCoPay = parseFloat(bedsideCoPay)
												+ parseFloat(bedsideCoPayTemp);
									}

									$('#trbedside' + bedsideCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal8">'
															+ bedsideTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay8">'
															+ bedsidePay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay8">'
															+ bedsideCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');
								}

								// instruments

								if (billBean.oplist[1] != "") {
									var i = 3.1;
									var instrumentsCount = 1;
									var instrumentsCharges = "";
									$
											.each(
													billBean.oplist[1],
													function(name, value) {
														if (value.ct == "instru") {
															
															instrumentsCharges = instrumentsCharges
																	+ "<tr id='trinstruments"
																	+ instrumentsCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdinstrumentsTotal"
																	+ instrumentsCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdinstrumentsPay"
																	+ instrumentsCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdinstrumentsCoPay"
																	+ instrumentsCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='instr"
																	+ instrumentsCount
																	+ "'></td></tr>";
															i = i + 0.1;
															instrumentsCount++;
														}

													})
									$('#headDetails9')
											.after(
													instrumentsCharges
															+ "<input type='hidden' id='instrumentsCount' value='"
															+ --instrumentsCount
															+ "'>");
									var instrumentsTotal = 0;
									var instrumentsPay = 0;
									var instrumentsCoPay = 0;
									for ( var i = 1; i <= instrumentsCount; i++) {
										var instrumentsTotalTemp = $(
												'#tdinstrumentsTotal' + i)
												.html();
										instrumentsTotal = parseFloat(instrumentsTotal)
												+ parseFloat(instrumentsTotalTemp);
										var instrumentsPayTemp = $(
												'#tdinstrumentsPay' + i).html();
										instrumentsPay = parseFloat(instrumentsPay)
												+ parseFloat(instrumentsPayTemp);
										var instrumentsCoPayTemp = $(
												'#tdinstrumentsCoPay' + i)
												.html();
										instrumentsCoPay = parseFloat(instrumentsCoPay)
												+ parseFloat(instrumentsCoPayTemp);
									}

									$('#trinstruments' + instrumentsCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal9">'
															+ instrumentsTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay9">'
															+ instrumentsPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay9">'
															+ instrumentsCoPay
																	.toFixed(2)
															+ '</td>														<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for consulting/visiting doctor details

								if (billBean.bcs8 != "") {
									var i = 3.1;
									var visitingDoctorCount = 1;
									var visitingDoctorCharges = "";
									$
											.each(
													billBean.bcs8,
													function(name, value) {
														visitingDoctorCharges = visitingDoctorCharges
																+ "<tr id='trvisitingDoctor"
																+ visitingDoctorCount
																+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdvisitingDoctorTotal"
																+ visitingDoctorCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdvisitingDoctorPay"
																+ visitingDoctorCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdvisitingDoctorCoPay"
																+ visitingDoctorCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																+ value.id
																+ "' name='ipdBillCheckbox' id='visit"
																+ visitingDoctorCount
																+ "'></td></tr>";
														i = i + 0.1;
														visitingDoctorCount++;
													})
									$('#headDetails10')
											.after(
													visitingDoctorCharges
															+ "<input type='hidden' id='visitingDoctorCount' value='"
															+ --visitingDoctorCount
															+ "'>");
									var visitingDoctorTotal = 0;
									var visitingDoctorPay = 0;
									var visitingDoctorCoPay = 0;
									for ( var i = 1; i <= visitingDoctorCount; i++) {
										var visitingDoctorTotalTemp = $(
												'#tdvisitingDoctorTotal' + i)
												.html();
										visitingDoctorTotal = parseFloat(visitingDoctorTotal)
												+ parseFloat(visitingDoctorTotalTemp);
										var visitingDoctorPayTemp = $(
												'#tdvisitingDoctorPay' + i)
												.html();
										visitingDoctorPay = parseFloat(visitingDoctorPay)
												+ parseFloat(visitingDoctorPayTemp);
										var visitingDoctorCoPayTemp = $(
												'#tdvisitingDoctorCoPay' + i)
												.html();
										visitingDoctorCoPay = parseFloat(visitingDoctorCoPay)
												+ parseFloat(visitingDoctorCoPayTemp);
									}

									$('#trvisitingDoctor' + visitingDoctorCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal10">'
															+ visitingDoctorTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay10">'
															+ visitingDoctorPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay10">'
															+ visitingDoctorCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								/**
								 * ********************Post operation
								 * Charges************************
								 */
								if (billBean.bcs6 != "") {
									var i = 4.1;
									var PostoperationCount = 1;
									var PostoperationCharges = "";
									$
											.each(
													billBean.bcs6,
													function(name, value) {
														if (value.nm == "Post Operation") {
															PostoperationCharges = PostoperationCharges
																	+ "<tr id='trPostoperationcharges"
																	+ PostoperationCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='trpostdoperationTotal"
																	+ PostoperationCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdpostoperationPay"
																	+ PostoperationCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdpostoperationCoPay"
																	+ PostoperationCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='pstOp"
																	+ PostoperationCount
																	+ "'></td></tr>";
															i = i + 0.1;
															PostoperationCount++;
														}
													})
									$('#headDetails11')
											.after(
													PostoperationCharges
															+ "<input type='hidden' id='PostoperationCount' value='"
															+ --PostoperationCount
															+ "'>");
									var PostoperationTotal = 0;
									var PostoperationPay = 0;
									var PostoperationCoPay = 0;
									for ( var i = 1; i <= PostoperationCount; i++) {
										var PostoperationTotalTemp = $(
												'#trpostdoperationTotal' + i)
												.html();
										PostoperationTotal = parseFloat(PostoperationTotal)
												+ parseFloat(PostoperationTotalTemp);
										var PostoperationPayTemp = $(
												'#tdpostoperationPay' + i)
												.html();
										PostoperationPay = parseFloat(PostoperationPay)
												+ parseFloat(PostoperationPayTemp);
										var PostoperationCoPayTemp = $(
												'#tdpostoperationCoPay' + i)
												.html();
										PostoperationCoPay = parseFloat(PostoperationCoPay)
												+ parseFloat(PostoperationCoPayTemp);
									}

									$(
											'#trPostoperationcharges'
													+ PostoperationCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal11">'
															+ PostoperationTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay11">'
															+ PostoperationPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay11">'
															+ PostoperationCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								/** **********pharmacy indent charges********** */
								if (billBean.pharmindList != "") {
									var i = 4.1;
									var PharmaIndentCount = 1;
									var PharmaIndentCharges = "";
									$
											.each(
													billBean.pharmindList,
													function(name, value) {
														if (value.ct == "pharmaIndent") {
															$(
																	"#hideshowiPharmacyBtn")
																	.show(
																			'show');
															
															PharmaIndentCharges = PharmaIndentCharges
																	+ "<tr id='trPharmaIndentcharges"
																	+ PharmaIndentCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='trPharmaIndentTotal"
																	+ PharmaIndentCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ parseFloat(
																			value.amt)
																			.toFixed(
																					2)
																	+ "</td><td id='tdPharmaIndentPay"
																	+ PharmaIndentCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdPharmaIndentCoPay"
																	+ PharmaIndentCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='PharmaIndentCount"
																	+ PharmaIndentCount
																	+ "'></td></tr>";
															i = i + 0.1;
															PharmaIndentCount++;
														}
													})
									$('#headDetails12')
											.after(
													PharmaIndentCharges
															+ "<input type='hidden' id='PharmaIndentCount' value='"
															+ --PharmaIndentCount
															+ "'>");
									var PharmaIndentTotal = 0;
									var PharmaIndentPay = 0;
									var PharmaIndentCoPay = 0;
									for ( var i = 1; i <= PharmaIndentCount; i++) {
										var PharmaIndentTotalTemp = $(
												'#trPharmaIndentTotal' + i)
												.html();
										PharmaIndentTotal = parseFloat(PharmaIndentTotal)
												+ parseFloat(PharmaIndentTotalTemp);
										var PharmaIndentPayTemp = $(
												'#tdPharmaIndentPay' + i)
												.html();
										PharmaIndentPay = parseFloat(PharmaIndentPay)
												+ parseFloat(PharmaIndentPayTemp);
										var PharmaIndentCoPayTemp = $(
												'#tdPharmaIndentCoPay' + i)
												.html();
										PharmaIndentCoPay = parseFloat(PharmaIndentCoPay)
												+ parseFloat(PharmaIndentCoPayTemp);
									}

									$(
											'#trPharmaIndentcharges'
													+ PharmaIndentCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal12">'
															+ PharmaIndentTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay12">'
															+ PharmaIndentPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay12">'
															+ PharmaIndentCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for operation details
								if (billBean.oplist != "") {

									var i = 4.1;
									var operationChargesCount = 1;
									var operationChargesCharges = "";
									var totaloperationCharges = 0.0;
									$
											.each(
													billBean.oplist[0],
													function(name, value) {
														var surgeonName = "";
														var assSurgeonName = "";
														var anasthetistName = "";

														for ( var z = 0; z < value.bcl.length; z++) {
															// alert(value.bcl.length);
															if (value.bcl[z].surId == "surgeon" || value.bcl[z].surId == "surgeon1" || value.bcl[z].surId == "surgeon2" || value.bcl[z].surId == "surgeon3") {
																surgeonName = surgeonName
																		+ value.bcl[z].nm
																		+ ",";
															} else if (value.bcl[z].surId == "asssurgeon" || value.bcl[z].surId == "assSurgeon1" || value.bcl[z].surId == "assSurgeon2" || value.bcl[z].surId == "assSurgeon3") {
																assSurgeonName = assSurgeonName
																		+ value.bcl[z].nm
																		+ ",";
															} else if (value.bcl[z].surId == "anesthetist" || value.bcl[z].surId == "anaesthesiologist1" || value.bcl[z].surId == "anaesthesiologist2" ||value.bcl[z].surId == "anaesthesiologist3") {
																anasthetistName = anasthetistName
																		+ value.bcl[z].nm
																		+ ",";
															}
														}
														//Surgeon charges
														operationChargesCharges = operationChargesCharges
																+ "<tr id='troperationCharges"
																+ operationChargesCount
																+ "'><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;' colspan='9'><b>"
																+ value.on
																+ "</b></td ><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'> <input type='checkbox' id='opCha"
																+ operationChargesCount
																+ "' value='"
																+ value.tomid
																+ "' name='ipdBillCheckbox' ><input type='hidden' id='ipdBillOperationTbId"
																+ operationChargesCount
																+ "' value='"
																+ value.tomid
																+ "' /></td ></tr>"

																+ "<tr ><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ "SURGEON CHARGES"
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td id='surgeonchrg"
																+ value.tomid
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.oc
																+ "</td><input type='hidden' id='rates' value='"
																+ value.oc
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1).toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.opChD)
																		.toFixed(2)
																+ "</td><input type='hidden' id='discs' value='"
																+ (value.opChD)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.oc - value.opChD)
																		.toFixed(2)
																+ "</td><input type='hidden' id='pays' value='"
																+ (value.opChP)
																.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.opChP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='copays' value='"
																+ (value.opChCoP)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.opChCoP)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";
														if (surgeonName != "") {
															operationChargesCharges = operationChargesCharges
																	+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'></td>"
																	+ "<td class='col-md-2-1' colspan = '9' style='border-top: none; padding: 1px;'><b>"
																	+ "("
																	+ surgeonName
																			.substring(
																					0,
																					(surgeonName.length - 1))
																	+ ")"
																	+ "</b></td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";
														}
														//Assistant Surgeon charges
														operationChargesCharges = operationChargesCharges
																+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'></td>"
																+ "<td class='' colspan = '2' style='border-top: none; padding: 1px;'>ASSISTANT SURGEON CHARGES </td >"
																+ "<td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.oep
																+ "</td><input type='hidden' id='rate_as' value='"
																+ value.oep
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.asSuD)
																		.toFixed(2)
																+ "</td><input type='hidden' id='disc_as' value='"
																+ (value.asSuD)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.oep - value.asSuD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.asSuP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='pay_as' value='"
																+ (value.asSuP)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.asSuCoP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='copay_as' value='"
																+ (value.asSuCoP)
																		.toFixed(2)
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";

														if (assSurgeonName != "") {
															operationChargesCharges = operationChargesCharges
																	+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'></td>"
																	+ "<td class='' colspan = '9' style='border-top: none; padding: 1px;'><b>"
																	+ "("
																	+ assSurgeonName
																			.substring(
																					0,
																					(assSurgeonName.length - 1))
																	+ ")"
																	+ "</b></td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";
														}
														//ANAESTHETIST Surgeon charges
														operationChargesCharges = operationChargesCharges
																+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ "ANAESTHETIST CHARGES"
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.or
																+ "</td><input type='hidden' id='rate_anist' value='"
																+ value.or
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.anaeD)
																		.toFixed(2)
																+ "</td><input type='hidden' id='disc_anist' value='"
																+ (value.anaeD)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.or - value.anaeD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.anaeP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='pay_anist' value='"
																+ (value.anaeP)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.anaeCoP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='copay_anist' value='"
																+ (value.anaeCoP)
																		.toFixed(2)
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";

														if (surgeonName != "") {
															operationChargesCharges = operationChargesCharges
																	+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'></td>"
																	+ "<td class='' colspan = '9' style='border-top: none; padding: 1px;'><b>"
																	+ "("
																	+ anasthetistName
																			.substring(
																					0,
																					(anasthetistName.length - 1))
																	+ ")"
																	+ "</b></td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";
														}
														
														//PREANAESTHETIST Surgeon charges
														operationChargesCharges = operationChargesCharges
																+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='col-md-2-1' colspan = '2' style='border-top: none; padding: 1px;'>"
																+ "PREANAESTHETIST CHARGES"
																+ "</td ><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.preAnsChr
																+ "</td><input type='hidden' id='rate_preanist' value='"
																+ value.preAnsChr
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.preAnaeD)
																		.toFixed(2)
																+ "</td><input type='hidden' id='disc_preanist' value='"
																+ (value.preAnaeD)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.preAnsChr - value.preAnaeD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.preAnaeP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='pay_preanist' value='"
																+ (value.preAnaeP)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.preAnaeCoP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='copay_preanist' value='"
																+ (value.preAnaeCoP)
																		.toFixed(2)
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";
														
																//SURGEON INSTRUMENT CHARGES
														operationChargesCharges = operationChargesCharges
																+ "<tr id='trSurgeopnInstrumentCharges"
																+ operationChargesCount
																+ "'><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='col-md-2-1' colspan = '2' style='border-top: none; padding: 1px;'>"
																+ "SURGEON INSTRUMENT CHARGES"
																+ "</td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.spnm
																+ "</td><input type='hidden' id='rate_surInschrgs' value='"
																+ value.spnm
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1).toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.suInD
																+ "</td><input type='hidden' id='disc_surInschrgs' value='"
																+ value.suInD
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.spnm  - value.suInD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.suInP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='pay_surInschrgs' value='"
																+ (value.suInP)
																		.toFixed(2)
																+ "' /><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.suInCoP)
																		.toFixed(2)
																+ "</td><input type='hidden' id='copay_surInschrgs' value='"
																+ (value.suInCoP)
																		.toFixed(2)
																+ "' /><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";
														i = i + 0.1;
														operationChargesCount++;

														for ( var z = 0; z < value.bcl.length; z++) {
															// alert(value.bcl.length);
															if (value.bcl[z].surId == "surgeon" || value.bcl[z].surId == "surgeon1" || value.bcl[z].surId == "surgeon2" || value.bcl[z].surId == "surgeon3") {
																var o = new Option(
																		"option text",
																		"value");
																// jquerify the
																// DOM object
																// 'o' so we can
																// use the html
																// method
																$(o)
																		.html(
																				value.bcl[z].nm);
																$(o)
																		.val(
																				value.tomid
																						+ "@"
																						+ value.bcl[z].id);
																$(
																		"#surgeonlist")
																		.append(
																				o);
															}
														}
													})

									$('#headDetails13')
											.after(
													operationChargesCharges
															+ "<input type='hidden' id='operationChargesCount' value='"
															+ --operationChargesCount
															+ "'>");
									var operationChargesTotal = 0;
									var operationChargesPay = 0;
									var operationChargesCoPay = 0;// alert(billBean.oplist[0][0].oc);

									var totaloperationChargesTotal = 0;
									var totaloperationChargesPay = 0;
									var totaloperationChargesCoPay = 0;

									for ( var i = 1; i <= operationChargesCount; i++) {
										if (undefined != billBean.oplist[0][(i - 1)]) {
											operationChargesTotal = (parseFloat(billBean.oplist[0][(i - 1)].oc)
													- parseFloat(billBean.oplist[0][(i - 1)].opChD))
													+ (parseFloat(billBean.oplist[0][(i - 1)].or) - parseFloat(billBean.oplist[0][(i - 1)].anaeD))
													+ (parseFloat(billBean.oplist[0][(i - 1)].oep) - parseFloat(billBean.oplist[0][(i - 1)].asSuD))
													+ (parseFloat(billBean.oplist[0][(i - 1)].spnm) - parseFloat(billBean.oplist[0][(i - 1)].suInD))
													+ (parseFloat(billBean.oplist[0][(i - 1)].preAnsChr) - parseFloat(billBean.oplist[0][(i - 1)].preAnaeD));
											operationChargesPay = parseFloat(billBean.oplist[0][(i - 1)].opChP)
													+ parseFloat(billBean.oplist[0][(i - 1)].asSuP)
													+ parseFloat(billBean.oplist[0][(i - 1)].anaeP)
													+ parseFloat(billBean.oplist[0][(i - 1)].preAnaeP)
													+ parseFloat(billBean.oplist[0][(i - 1)].suInP);
											operationChargesCoPay = parseFloat(billBean.oplist[0][(i - 1)].opChCoP)
													+ parseFloat(billBean.oplist[0][(i - 1)].asSuCoP)
													+ parseFloat(billBean.oplist[0][(i - 1)].anaeCoP)
													+ parseFloat(billBean.oplist[0][(i - 1)].preAnaeCoP)
													+ parseFloat(billBean.oplist[0][(i - 1)].suInCoP);
										}

										$('#trSurgeopnInstrumentCharges' + i)
												.after(
														'<tr id = "operationtotal'
																+ i
																+ '"><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td><td class="numeric center" colspan = "2" style="padding: 1px; border-top: none; color: #5CAFE6;">Total(INR)</td><td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="">'
																+ operationChargesTotal
																		.toFixed(2)
																+ '</td> <td class="numeric center" style="padding: 1px;" id="">'
																+ operationChargesPay
																		.toFixed(2)
																+ '</td>  <td class="numeric center" style="padding: 1px;" id="">'
																+ operationChargesCoPay
																		.toFixed(2)
																+ '</td>  <td class="numeric center" style="padding: 1px; border-top: none;"></td></tr>');

										totaloperationChargesTotal = totaloperationChargesTotal
												+ operationChargesTotal;
										totaloperationChargesPay = totaloperationChargesPay
												+ operationChargesPay;
										totaloperationChargesCoPay = totaloperationChargesCoPay
												+ operationChargesCoPay;

									}
									$(
											'#operationtotal'
													+ billBean.oplist[0].length)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td><td class="numeric center" colspan = "2" style="padding: 1px; border-top: none; color: #5CAFE6;">Grand Total(INR)</td><td class="numeric" style="padding: 1px; border-top: none;"></td>									  <td class="numeric" style="padding: 1px; border-top: none;"></td>									  <td class="numeric" style="padding: 1px; border-top: none;"></td>									  <td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal13">'
															+ totaloperationChargesTotal
																	.toFixed(2)
															+ '</td> <td class="numeric center" style="padding: 1px;" id="tdPay13">'
															+ totaloperationChargesPay
																	.toFixed(2)
															+ '</td>  <td class="numeric center" style="padding: 1px;" id="tdCoPay13">'
															+ totaloperationChargesCoPay
																	.toFixed(2)
															+ '</td>  <td class="numeric center" style="padding: 1px; border-top: none;"></td></tr>');

								}
								// for surgery services details

								if (billBean.oplist[4] != "") {
									var i = 4.1;
									var surgeryServicesCount = 1;
									var surgeryServicesCharges = "";
									$
											.each(
													billBean.oplist[4],
													function(name, value) {
														
														surgeryServicesCharges = surgeryServicesCharges
																+ "<tr id='trsurgeryServices"
																+ surgeryServicesCount
																+ "'><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdsurgeryServicesTotal"
																+ surgeryServicesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdsurgeryServicesPay"
																+ surgeryServicesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdsurgeryServicesCoPay"
																+ surgeryServicesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' id='surSe"
																+ surgeryServicesCount
																+ "' value='"
																+ value.id
																+ "' name='ipdBillCheckbox' ><input type='hidden' id='ipdBillInvestigationSlaveTbId"
																+ surgeryServicesCount
																+ "' value='"
																+ value.id
																+ "' /></td></tr>";
														i = i + 0.1;
														surgeryServicesCount++;
													})
									$('#surServicesheadDetails')
											.after(
													surgeryServicesCharges
															+ "<input type='hidden' id='surgeryServicesCount' value='"
															+ --surgeryServicesCount
															+ "'>");
									var surgeryServicesTotal = 0;
									var surgeryServicesPay = 0;
									var surgeryServicesCoPay = 0;
									for ( var i = 1; i <= surgeryServicesCount; i++) {
										var surgeryServicesTotalTemp = $(
												'#tdsurgeryServicesTotal' + i)
												.html();
										surgeryServicesTotal = parseFloat(surgeryServicesTotal)
												+ parseFloat(surgeryServicesTotalTemp);
										var surgeryServicesPayTemp = $(
												'#tdsurgeryServicesPay' + i)
												.html();
										surgeryServicesPay = parseFloat(surgeryServicesPay)
												+ parseFloat(surgeryServicesPayTemp);
										var surgeryServicesCoPayTemp = $(
												'#tdsurgeryServicesCoPay' + i)
												.html();
										surgeryServicesCoPay = parseFloat(surgeryServicesCoPay)
												+ parseFloat(surgeryServicesCoPayTemp);
									}

									$(
											'#trsurgeryServices'
													+ surgeryServicesCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="sstdTotal">'
															+ surgeryServicesTotal
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px;" id="sstdPay">'
															+ surgeryServicesPay
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px;" id="sstdCoPay">'
															+ surgeryServicesCoPay
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for material used in surgery

								if (billBean.oplist[3] != "") {
									var i = 4.1;
									var surgeryConsumablesCount = 1;
									var surgeryConsumablesCharges = "";
									$
											.each(
													billBean.oplist[3],
													function(name, value) {
														
														surgeryConsumablesCharges = surgeryConsumablesCharges
																+ "<tr id='trsurgeryConsumables"
																+ surgeryConsumablesCount
																+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdsurgeryConsumablesTotal"
																+ surgeryConsumablesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdsurgeryConsumablesPay"
																+ surgeryConsumablesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdsurgeryConsumablesCoPay"
																+ surgeryConsumablesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																+ value.id
																+ "' name='ipdBillCheckbox' id='surCo"
																+ surgeryConsumablesCount
																+ "'></td></tr>";
														i = i + 0.1;
														surgeryConsumablesCount++;
													})
									$('#headDetails14')
											.after(
													surgeryConsumablesCharges
															+ "<input type='hidden' id='surgeryConsumablesCount' value='"
															+ --surgeryConsumablesCount
															+ "'>");
									var surgeryConsumablesTotal = 0;
									var surgeryConsumablesPay = 0;
									var surgeryConsumablesCoPay = 0;
									for ( var i = 1; i <= surgeryConsumablesCount; i++) {
										var surgeryConsumablesTotalTemp = $(
												'#tdsurgeryConsumablesTotal'
														+ i).html();
										surgeryConsumablesTotal = parseFloat(surgeryConsumablesTotal)
												+ parseFloat(surgeryConsumablesTotalTemp);
										var surgeryConsumablesPayTemp = $(
												'#tdsurgeryConsumablesPay' + i)
												.html();
										surgeryConsumablesPay = parseFloat(surgeryConsumablesPay)
												+ parseFloat(surgeryConsumablesPayTemp);
										var surgeryConsumablesCoPayTemp = $(
												'#tdsurgeryConsumablesCoPay'
														+ i).html();
										surgeryConsumablesCoPay = parseFloat(surgeryConsumablesCoPay)
												+ parseFloat(surgeryConsumablesCoPayTemp);
									}

									$(
											'#trsurgeryConsumables'
													+ surgeryConsumablesCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal14">'
															+ surgeryConsumablesTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay14">'
															+ surgeryConsumablesPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay14">'
															+ surgeryConsumablesCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// operation theater charges

								if (billBean.bcs1 != "") {
									var i = 4.1;
									var operationTheaterCount = 1;
									var operationTheaterCharges = "";
									$
											.each(
													billBean.bcs1,
													function(name, value) {
														
														operationTheaterCharges = operationTheaterCharges
																+ "<tr id='troperationTheater"
																+ operationTheaterCount
																+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdoperationTheaterTotal"
																+ operationTheaterCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdoperationTheaterPay"
																+ operationTheaterCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdoperationTheaterCoPay"
																+ operationTheaterCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																+ value.id
																+ "' name='ipdBillCheckbox' id='OTRen"
																+ operationTheaterCount
																+ "'></td></tr>";
														i = i + 0.1;
														operationTheaterCount++;

													})
									$('#headDetails15')
											.after(
													operationTheaterCharges
															+ "<input type='hidden' id='operationTheaterCount' value='"
															+ --operationTheaterCount
															+ "'>");
									var operationTheaterTotal = 0;
									var operationTheaterPay = 0;
									var operationTheaterCoPay = 0;
									for ( var i = 1; i <= operationTheaterCount; i++) {
										var operationTheaterTotalTemp = $(
												'#tdoperationTheaterTotal' + i)
												.html();
										operationTheaterTotal = parseFloat(operationTheaterTotal)
												+ parseFloat(operationTheaterTotalTemp);
										var operationTheaterPayTemp = $(
												'#tdoperationTheaterPay' + i)
												.html();
										operationTheaterPay = parseFloat(operationTheaterPay)
												+ parseFloat(operationTheaterPayTemp);
										var operationTheaterCoPayTemp = $(
												'#tdoperationTheaterCoPay' + i)
												.html();
										operationTheaterCoPay = parseFloat(operationTheaterCoPay)
												+ parseFloat(operationTheaterCoPayTemp);
									}

									$(
											'#troperationTheater'
													+ operationTheaterCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal15">'
															+ operationTheaterTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay15">'
															+ operationTheaterPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay15">'
															+ operationTheaterCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for pharmacy invoice details
								if (billBean.surli != "") {
									var i = 5.1;
									var pharmachInvoiceCount = 1;
									var pharmachInvoiceCharges = "";
									$
											.each(
													billBean.surli,
													function(name, value) {
														if (value.ct == "MedClinic") {
															
															pharmachInvoiceCharges = pharmachInvoiceCharges
																	+ "<tr id='trpharmachInvoice"
																	+ pharmachInvoiceCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdpharmachInvoiceTotal"
																	+ pharmachInvoiceCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdpharmachInvoicePay"
																	+ pharmachInvoiceCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdpharmachInvoiceCoPay"
																	+ pharmachInvoiceCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='pharm"
																	+ pharmachInvoiceCount
																	+ "'></td></tr>";
															i = i + 0.1;
															pharmachInvoiceCount++;
														}
													})
									$('#headDetails16')
											.after(
													pharmachInvoiceCharges
															+ "<input type='hidden' id='pharmachInvoiceCount' value='"
															+ --pharmachInvoiceCount
															+ "'>");
									var pharmachInvoiceTotal = 0;
									var pharmachInvoicePay = 0;
									var pharmachInvoiceCoPay = 0;
									for ( var i = 1; i <= pharmachInvoiceCount; i++) {
										var pharmachInvoiceTotalTemp = $(
												'#tdpharmachInvoiceTotal' + i)
												.html();
										pharmachInvoiceTotal = parseFloat(pharmachInvoiceTotal)
												+ parseFloat(pharmachInvoiceTotalTemp);
										var pharmachInvoicePayTemp = $(
												'#tdpharmachInvoicePay' + i)
												.html();
										pharmachInvoicePay = parseFloat(pharmachInvoicePay)
												+ parseFloat(pharmachInvoicePayTemp);
										var pharmachInvoiceCoPayTemp = $(
												'#tdpharmachInvoiceCoPay' + i)
												.html();
										pharmachInvoiceCoPay = parseFloat(pharmachInvoiceCoPay)
												+ parseFloat(pharmachInvoiceCoPayTemp);
									}

									$(
											'#trpharmachInvoice'
													+ pharmachInvoiceCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal16">'
															+ pharmachInvoiceTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay16">'
															+ pharmachInvoicePay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay16">'
															+ pharmachInvoiceCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for nursing charges
								var nursingCharges = 0;
								var nursingDays = 0.0;
								for ( var k = 0; k < billBean.bcs4.length; k++) {

									var netAmt = billBean.bcs4[k].netAmt;
									if (netAmt == ".00") {

									} else {
										nursingCharges = parseInt(nursingCharges)
												+ parseInt(netAmt);
										nursingDays = nursingDays
												+ billBean.bcs4[k].qty;
									}

								}

								$("#nursingchr").val(
										(nursingCharges).toFixed(2));
								$("#nursingqty").val(nursingDays);
								$("#nursingamt").val(
										(nursingCharges).toFixed(2)
												* (nursingDays).toFixed(2));

								calTotalForIPDAPOnload();
								for ( var z = 0; z < billBean.oplist[0].length; z++) {
									$("#doctorDiv").show();
									var old = $("#docDiscountDiv").html();

									if (billBean.oplist[0][z].bcl.length > 0) {
										$("#docDiscountDiv")
												.setTemplate(
														$("#docDiscountDivtemp")
																.html());
										$("#docDiscountDiv").processTemplate(
												billBean.oplist[0][z].bcl[0]);
										$("#docDiscountDiv").prepend(old);
									}

								}
								for ( var z = 0; z < billBean.oplist[0].length; z++) {
									// alert( billBean.oplist[0][z].docDisc);
									$("#txtdocDiscount" + (z + 1)).val(
											billBean.oplist[0][z].docDisc);

									// alert(
									// billBean.oplist[0][z].docDiscNarr);
									$("#txtdocDiscountReason" + (z + 1)).val(
											billBean.oplist[0][z].docDiscNarr);
								}
								$("#docDisRowcount").val(docdiscount);
								for ( var k = 1; k < 4; k++) {

									$("#eName" + k)
											.attr('readonly', 'readonly');

								}

								$("#txtHospitalDiscount").val(
										billBean.bl[0].hospdis);
								$("#txtHospitalDiscountReason").val(
										billBean.bl[0].hospnarr);
							}
							// }
							// $("#billComponent").processTemplate(billBean);
							$("#msg1").val("Intencivist");
							$("#msg4").val("mlcCharges");
							$("#msg5").val("tpa");
						} else if (tempType == "recAdv") {
							if (billBean.bl[0] != "") {

								if (billBean.bl[0].pa == undefined) {

									$("#txtPayable").val(0);
									$("#txtRemaining").val(0);
									$("#txtPaid").val(0);

									alert("Please Save Provisional IPD Bill.");

								} else {
									$("#txtDiscount").val(
											parseInt(billBean.bl[0].da));
									if (billBean.bl[0].da == null) {
										$("#txtDiscount").val(0);
									}
									$("#txtPayable").val(
											parseInt(billBean.bl[0].pay));
									$("#txtPaid").val(
											parseInt(billBean.bl[0].pa));
									$("#txtRefund").val(
											parseInt(billBean.bl[0].rfd)
													.toFixed(2));
									$("#txtRemaining").val(
											parseInt(billBean.bl[0].ra));
									$("#txtRecNo").html(billBean.bl[0].id);
									/*
									 * $("#SpecialDisc").val(
									 * billBean.bl[0].sp_dic_master_id);
									 */
								}

							}
						}
					}
				}
			});
}

function setIPDAdvancedPayment(type, type2) {

	var tid = 0;

	srForIPDAP = 1;
	rowCountForIPDAP = 1;

	if (type == "prev") {
		tid = $("#tid").html();
	} else if (type == "set") {
		tid = type2;

	} else {
		var pobj = $("#divPatId").html();
		pobj1 = eval('(' + pobj + ')');
		tid = pobj1.trid;
	}

	var inputs = [];
	inputs.push('action=fetchIPDAAmt');
	inputs.push('treat_id=' + tid);
	var str = inputs.join('&');
	// alert(str);
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					billBean1 = eval('(' + ajaxResponse + ')');
					$("#divBillAAmt").html(ajaxResponse);

					if (type == "Refund") {
						$("#editReceiptType").val("Refund");
					} else {
						$("#editReceiptType").val("Payment");
					}

					var template = "";
					var temp;
					var total = 0;
					var refundcount = 0;
					var paymentcount = 0;
					for ( var i = 0; i < billBean1.baali.length; i++) {
						if (type == "Refund") {
							if (billBean1.baali[i].head == "Refund") {
								refundcount++;
								if (billBean1.baali[i].bid != 0) {
									myObj = billBean1.baali[i];
									total = total + myObj.opdbilllist[0].pdAmt;
									if (myObj.opdbilllist[0].pay_mode == "Cash") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (refundcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].cash_amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].card_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].bname
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else if (myObj.opdbilllist[0].pay_mode == "Cheque") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (refundcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pdAmt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].chq_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].chq_bank
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else if (myObj.opdbilllist[0].pay_mode == "Card") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (refundcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pdAmt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].card_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].bname
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else if (myObj.opdbilllist[0].pay_mode == "RTGS") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (refundcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].rtgs_amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].accno
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].rtgs_bank_name
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (refundcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ (0)
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ ("")
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									}
								}
							}
						} else {
							if (billBean1.baali[i].head == "Payment") {
								paymentcount++;
								if (billBean1.baali[i].bid != 0) {
									myObj = billBean1.baali[i];
									total = total + myObj.opdbilllist[0].pdAmt;

									if (myObj.opdbilllist[0].pay_mode == "Cash") {

										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (paymentcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].cash_amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].card_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].bname
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else if (myObj.opdbilllist[0].pay_mode == "Cheque") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (paymentcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pdAmt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].chq_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].chq_bank
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else if (myObj.opdbilllist[0].pay_mode == "Card") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (paymentcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pdAmt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].card_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].bname
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									}

									/**
									 * ***************************************RTGS
									 * CODE
									 * ***********************************************
									 */
									else if (myObj.opdbilllist[0].pay_mode == "RTGS") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (paymentcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].rtgs_amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].accno
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].rtgs_bank_name
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (paymentcount)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ (0)
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ ("")
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
												+ myObj.opdbilllist[0].idipd
												+ '" id = "ipdReceiptCheckbox'
												+ myObj.opdbilllist[0].idipd
												+ '" class="editUserAccess" disabled="disabled"></td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdAdvanceReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									}
								}
							}

							$("#finalAdvancePaid").text(total);
							$("#divIPDAdvancedPayment").setTemplate(
									$("#paymentAdvance").html());

							$("#divIPDAdvancedPayment").processTemplate(
									billBean1);
							$("#remove" + billBean1.baali.length).remove();
							$("#rowCountForIPDAP").val(
									($("#rowCountForIPDAP").val() - 1));

							if (billBean1.baali.length == 0) {
								var recNo = 1;
								$("#recNo").html(recNo);
							} else {
								var maxLength = billBean1.baali.length;

								var recNo = billBean1.baali[maxLength - 1].baaid;
								recNo++;
								$("#recNo").html(recNo);

								setTimeout(function() {
									calTotalForIPDAP();
								}, 500);

							}
							var z = 1;
							for ( var k = 0; k < billBean1.baali.length; k++) {
								// var date=billBean1.baali[0].date;
								// $("#bdate").html(date);
								$("#heading" + z).val(billBean1.baali[k].head);
								if (billBean1.baali[k].opdbilllist != undefined) {
									$("#cash" + z)
											.val(
													billBean1.baali[k].opdbilllist[0].cash_amt);
									$("#card" + z)
											.val(
													billBean1.baali[k].opdbilllist[0].card_amt);
								}
								z++;
							}
						}
					}

					if (type == "Refund") {
						template = template
								+ '<tr><td style="border-top:; padding: 1px;"></td><td style="border-top:; padding: 1px;">Total</td><td class="numeric"	style="border-top: ; padding: 1px;" id="refundTotal">'
								+ total
								+ '</td><td class="numeric"	style="border-top:none ; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric"	style="border-top: none; padding: 1px;"></td></tr>';
					} else {
						template = template
								+ '<tr><td style="border-top:; padding: 1px;"></td><td style="border-top:; padding: 1px;">Total</td><td class="numeric"	style="border-top: ; padding: 1px;" id="paymentTotal">'
								+ total
								+ '</td><td class="numeric"	style="border-top:none ; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td> <td class="numeric"	style="border-top: none; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric" style="border-top:none; padding: 1px;"></td></tr>';
					}

					$("#listAdvanceReceipt").setTemplate(template);
					$("#listAdvanceReceipt").processTemplate(temp);

					// Kavita Date 15-04-2016 Previous pending amount receipt
					// cant be updated
					for ( var i = 0; i < billBean1.baali.length; i++) {
						if (billBean1.baali[i].head == "Payment") {
							if (billBean1.baali[i].bid != 0) {
								var previousPendingtype = billBean1.baali[i].billtype;
								if (previousPendingtype != "current") {
									var id = billBean1.baali[i].opdbilllist[0].idipd;
									$("#ipdReceiptCheckbox" + id).attr(
											"disabled", true);
								}
							}
						} else if (billBean1.baali[i].head == "Refund") {
							if (billBean1.baali[i].bid != 0) {
								var previousPendingtype = billBean1.baali[i].billtype;
								if (previousPendingtype != "current") {
									var id = billBean1.baali[i].opdbilllist[0].idipd;
									$("#ipdReceiptCheckbox" + id).attr(
											"disabled", true);
								}
							}
						}
					}
					// End

					var refundedTotal = 0;
					for ( var i = 0; i < billBean1.baali.length; i++) {
						if (billBean1.baali[i].head == "Refund") {
							if (billBean1.baali[i].bid != 0) {
								myObj = billBean1.baali[i];
								refundedTotal = refundedTotal
										+ myObj.opdbilllist[0].pdAmt;
							}
						}
					}

					// var finalBillTotal = $("#finalBillTotal").text();
					// var finaltotal = $("#finalBillTotalServiceTax").text();
					var finalPayable = $("#finalPayable").text();
					// var finalDiscount = $("#finalDiscount").text();
					var finalAdvancePaid = $("#finalAdvancePaid").text();
					var PharmacyPaid = $("#PharmacyAdvancePaid").text();
					var refund = 0;
					var outstanding = 0;

					if (type2 == "onload") {
						// does not do anything

					} else {

						/** *******************Pharmacy Paid*************** */
						var finalPharmacyAndAdvancePaid = 0;
						var finalPharmacyPaid = 0;

						if (PharmacyPaid == "" || PharmacyPaid == '0') {
							finalPharmacyPaid = 0;
						} else {
							finalPharmacyPaid = parseFloat(PharmacyPaid);
						}
						/** *****Pharmacy Amount recieved by hospital */
						var PharmaAMTRecievedByHosp = 0;
						PharmaAMTRecievedByHosp = $(
								"#sumPharmaAMTRecievedByHosp").val();
						if (PharmaAMTRecievedByHosp != ""
								|| PharmaAMTRecievedByHosp != 0) {
							PharmaAMTRecievedByHosp = $(
									"#sumPharmaAMTRecievedByHosp").val();
						}
						// alert(PharmaAMTRecievedByHosp);
						finalPharmacyPaid = finalPharmacyPaid
								+ parseFloat(PharmaAMTRecievedByHosp);
						// alert(finalPharmacyPaid);
						/**
						 * *******************indent
						 * details*******start*********
						 */
						var pharmacashreturn = 0;
						pharmacashreturn = $("#PharmacyCashReturn").text();
						if (pharmacashreturn != 0 || pharmacashreturn != null) {
							pharmacashreturn = $("#PharmacyCashReturn").text();
						}
						var pharmaAMTrecievedByHosp = 0;
						pharmaAMTrecievedByHosp = $("#sumPayByHospAMT").val();
						if (pharmaAMTrecievedByHosp != 0
								|| pharmaAMTrecievedByHosp != null) {
							pharmaAMTrecievedByHosp = $("#sumPayByHospAMT")
									.val();
						}
						var returnANDRecievedAMT = 0;
						returnANDRecievedAMT = parseFloat(pharmacashreturn)
								+ parseFloat(pharmaAMTrecievedByHosp);

						finalPharmacyPaid = parseFloat(finalPharmacyPaid)
								- parseFloat(returnANDRecievedAMT);
						/** *******************indent details*end*************** */

						finalPharmacyAndAdvancePaid = parseFloat(finalAdvancePaid)
								+ parseFloat(finalPharmacyPaid);

						var finalRefund = (parseFloat(finalPayable).toFixed(2))
								- (parseFloat(finalPharmacyAndAdvancePaid)
										.toFixed(2));
						finalRefund = Math.ceil(finalRefund);
						if (finalRefund < 0) {
							finalRefund = finalRefund * (-1);
						}

						if (refundedTotal > 0) {
							if (finalRefund == refundedTotal) {
								$("#finalRefund")
										.text(parseFloat(0).toFixed(2));
								$("#finalOutstanding").text(
										parseFloat(0).toFixed(2));
								refund = 0;
								outstanding = 0;
							} else if (finalRefund != refundedTotal) {

								var advPaidMinusTillRefunded = finalPharmacyAndAdvancePaid
										- refundedTotal;

								var remainRefundFromTotal = finalPayable
										- advPaidMinusTillRefunded;

								remainRefundFromTotal = Math
										.round(remainRefundFromTotal);

								if (remainRefundFromTotal < 0) {
									remainRefundFromTotal = remainRefundFromTotal
											* (-1);
								}

								if ((parseFloat(finalPayable)) > (parseFloat(advPaidMinusTillRefunded))) {

									$("#finalRefund").text(
											parseFloat(0).toFixed(2));
									$("#finalOutstanding").text(
											parseFloat(remainRefundFromTotal)
													.toFixed(2));
									refund = 0;
									outstanding = remainRefundFromTotal;

								} else if ((parseFloat(finalPayable)) < (parseFloat(advPaidMinusTillRefunded))) {

									$("#finalRefund").text(
											parseFloat(remainRefundFromTotal)
													.toFixed(2));
									$("#finalOutstanding").text(
											parseFloat(0).toFixed(2));
									refund = remainRefundFromTotal;
									outstanding = 0;

								} else {
									$("#finalRefund").text(
											parseFloat(0).toFixed(2));
									$("#finalOutstanding").text(
											parseFloat(0).toFixed(2));
									refund = 0;
									outstanding = 0;
								}
							}
						} else {
							var advPaidMinusTillRefunded = finalPharmacyAndAdvancePaid
									- refundedTotal;

							var remainRefundFromTotal = finalPayable
									- advPaidMinusTillRefunded;

							remainRefundFromTotal = Math
									.round(remainRefundFromTotal);

							if (remainRefundFromTotal < 0) {
								remainRefundFromTotal = remainRefundFromTotal
										* (-1);
							}

							if ((parseFloat(finalPayable)) > (parseFloat(advPaidMinusTillRefunded))) {
								$("#finalRefund")
										.text(parseFloat(0).toFixed(2));
								$("#finalOutstanding").text(
										parseFloat(remainRefundFromTotal)
												.toFixed(2));

								refund = 0;
								outstanding = remainRefundFromTotal;

							} else if ((parseFloat(finalPayable)) < (parseFloat(advPaidMinusTillRefunded))) {
								$("#finalRefund").text(
										parseFloat(remainRefundFromTotal)
												.toFixed(2));
								$("#finalOutstanding").text(
										parseFloat(0).toFixed(2));
								refund = remainRefundFromTotal;
								outstanding = 0;

							} else {

								$("#finalRefund")
										.text(parseFloat(0).toFixed(2));
								$("#finalOutstanding").text(
										parseFloat(0).toFixed(2));
								refund = 0;
								outstanding = 0;
							}

						}
					}
				}
			});
	setTimeout(function(){userAccess();},1000);
}

function saveBillMasterDetails(type) {

	if (type == "prev") {
		tid = $("#tid").html();
	} else if (type == "set") {
		tid = type2;

	} else {
		var pobj = $("#divPatId").html();
		pobj1 = eval('(' + pobj + ')');
		tid = pobj1.trid;
	}

	var finalRefund = $("#finalRefund").text();
	var finalOutstanding = $("#finalOutstanding").text();
	var finalBillTotal = $("#finalBillTotal").text();
	var finaltotal = $("#finalBillTotalServiceTax").text();
	var finalPayable = $("#finalPayable").text();
	var finalDiscount = $("#finalDiscount").text();
	var finalAdvancePaid = $("#finalAdvancePaid").text();
	var PharmacyPaid = $("#PharmacyAdvancePaid").text();

	// code by kavita Aug 29 2016
	var inputs = [];
	inputs.push('action=saveBillMasterDetails');
	inputs.push('treat_id=' + tid);
	inputs.push('finalBillTotal=' + finalBillTotal);
	inputs.push('finaltotal=' + finaltotal);
	inputs.push('finalPayable=' + finalPayable);
	inputs.push('finalDiscount=' + finalDiscount);
	inputs.push('finalAdvancePaid=' + finalAdvancePaid);
	inputs.push('PharmacyAdvancePaid=' + PharmacyPaid);
	inputs.push('refund=' + finalRefund);
	inputs.push('outstanding=' + finalOutstanding);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			// alert('error');
		},
		success : function(r) {
			// alert(r);
			// location.reload();
		}
	});
}

function setSaveButtonTemplate() {
	var data = $("#serviceHeading").val();
	var PhysicalDischargeFlag =  $("#PhysicalDischargeFlag").val();
	if (data == "OperationCharges") {
		
		 if(PhysicalDischargeFlag == "N"){
		   $("#popupOPCharges").show('show');
		 }else{
			 alert("Operation can not Schedule because Patient is Physical Discharge");
		 }
	} else if (data == "AdministrativeCharges") {
		// $("#AdminChargesHidden").val();
		var r = confirm("Do you want to update Administrative charges?");
		if (r == true) {
			$("#iAdminCharges").show('show');
			$("#txtadminChrg").val($("#AdminChargesHidden").val());
			$("#txtChrgType").val($("#AdminChrgType").val());
		} else {
			$("#AdminCharges").hide('hide');
			$("#serviceHeading").val(0);
		}
	} else {
		var template = '<button style="line-height: 1.2" id="particularbtn" class="btn btn-xs btn-default editUserAccess" onclick="saveIpdBillParticular()" disabled="disabled"><i class="fa fa-save"></i> Save</button>';
		var temp;
		$("#divSaveEditButton").setTemplate(template);
		$("#divSaveEditButton").processTemplate(temp);

		$(".typeahead").html("");
		$("#particulars").val("");
		// $("#popup_container2").val("");
		$("#particularRate").val("");
		$("#particularqty").val("");
		$("#particularamt").val("");
		$("#particularPay").val("");
		$("#particularCoPay").val("");
		$("#particulardisc").val("");
		setValuesToAutocomplete("onChange");
	}
}

function setValuesToAutocomplete(type) {
	var resultData = [];
	var billComps = $("#billComps").html();
	var myobj = eval('(' + billComps + ')');
	var bedlistlength = myobj.bcs4.length ;

	var hallid = myobj.bcs4[bedlistlength - 1].itemid; // hallid is set to

	var corporateId = $("#SpecialDisc").val();
	var data = $("#serviceHeading").val();
	if (data == 0) {
		$("#idTimeDRC").hide();
		$("#tdlabresult").hide();
		$("#particulars").attr("readonly", false);
		$("#popup_container2").attr("disabled", false);
		$("#particularRate").attr("readonly", false);
		$("#particularqty").attr("readonly", false);
		$("#particulardisc").attr("readonly", false);
		$("#particularamt").attr("readonly", false);
		$("#particularPay").attr("readonly", false);
		$("#particularCoPay").attr("readonly", false);
		$("#particularbtn").attr("disabled", false);
		return false;
	} else if (data == "Registration" || data == "MLC" || data == "OPD"
			|| data == "TPA" || data == "Pharmacy" || data == "postoperation") {
		$("#idTimeDRC").hide();
		$("#tdlabresult").hide();
		$("#particulars").attr("readonly", true);
		$("#popup_container2").attr("disabled", true);
		$("#particularRate").attr("readonly", true);
		$("#particularqty").attr("readonly", true);
		$("#particulardisc").attr("readonly", true);
		$("#particularamt").attr("readonly", true);
		$("#particularPay").attr("readonly", true);
		$("#particularCoPay").attr("readonly", true);
		$("#particularbtn").attr("disabled", true);
		return false;
	} else if (data == "DRC") {
		$("#idTimeDRC").show();
		$("#tdlabresult").hide();
		$("#particulars").attr("readonly", false);
		$("#popup_container2").attr("disabled", false);
		$("#particularRate").attr("readonly", false);
		$("#particularqty").attr("readonly", false);
		$("#particulardisc").attr("readonly", false);
		$("#particularamt").attr("readonly", false);
		$("#particularPay").attr("readonly", false);
		$("#particularCoPay").attr("readonly", false);
		$("#particularbtn").attr("disabled", false);
	} else if (data == "pathology" || data == "investigation") {
		$("#idTimeDRC").hide();
		$("#tdlabresult").show();
		$("#particulars").attr("readonly", false);
		$("#popup_container2").attr("disabled", false);
		$("#particularRate").attr("readonly", false);
		$("#particularqty").attr("readonly", false);
		$("#particulardisc").attr("readonly", false);
		$("#particularamt").attr("readonly", false);
		$("#particularPay").attr("readonly", false);
		$("#particularCoPay").attr("readonly", false);
		$("#particularbtn").attr("disabled", false);
	} else {
		$("#idTimeDRC").hide();
		$("#tdlabresult").hide();
		$("#particulars").attr("readonly", false);
		$("#popup_container2").attr("disabled", false);
		$("#particularRate").attr("readonly", false);
		$("#particularqty").attr("readonly", false);
		$("#particulardisc").attr("readonly", false);
		$("#particularamt").attr("readonly", false);
		$("#particularPay").attr("readonly", false);
		$("#particularCoPay").attr("readonly", false);
		$("#particularbtn").attr("disabled", false);
	}

	var autoType;
	var auto;
	if (data == "productName") {
		data = "ipdConsumable";
		auto = 'ipdBill';
	} else if (data == "gasesMonitor") {
		auto = 'ipdBill';
		autoType = 'g';
	} else if (data == "instruments") {
		data = "instruments";
		auto = 'ipdBill';
		autoType = 'i';
	} else if (data == "gasesMonitorb") {
		data = "gasesMonitor";
		auto = 'ipdBill';
		autoType = 'b';
	} else if (data == "DRC") {
		data = "DRC";
		auto = 'ipdBill';
		autoType = 'd';
	} else if (data == "OtherServices") {
		data = "OtherServices";
		auto = 'ipdBill';
		autoType = 'd';
	} else {
		auto = 'ipdBill';
	}
	var findingName = $("#particulars").val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('data=' + data);
	inputs.push('letter=' + findingName);
	inputs.push('autoType=' + autoType);
	inputs.push('corporateId=' + corporateId);
	inputs.push('hallid=' + hallid);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					// alert(availableTags);
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1] + "@#@" + arrValue[2]
								+ "@#@" + arrValue[3]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
					}

					if (type != "onChange") {
						$(".typeahead").show();
					}

					setTimeout(
							function() {
								$('#particulars').typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});

								$("#particulars").data('typeahead').source = resultData;

							}, 0);
				}
			});

	function displayResult(item) {

		// alert("text>>>"+item.text+" value>>>>"+item.value);

		var arrItem = (item.value).split("@#@");
		var serviceHeading = $("#serviceHeading").val();
		if (serviceHeading == "DRC") {
			$("#itemid").val(arrItem[0]);
			$("#particularRate").val(0);
			$("#particularqty").val(1);
			$("#particularamt").val(0);
			$("#timeDR").val("");
		} else if (serviceHeading == "pathology"
				|| serviceHeading == "gasesMonitor"
				|| serviceHeading == "gasesMonitorb"
				|| serviceHeading == "instruments") {

			if (item.text == undefined) {
				alert("Please Enter Valid Test...");
				$("#particulars").val("");
				return false;
			} else {
				var charges = arrItem[2].split("---");
				var pay = 0;
				if (charges[1] == "") {
					pay = 0;
				} else {
					pay = charges[1];
				}
				$("#itemid").val(arrItem[0]);
				$("#particularRate").val(arrItem[1]);
				$("#particularqty").val(1);
				$("#particularamt").val(arrItem[1]);
				$("#particularPay").val(pay);
				$("#particularCoPay").val(charges[2]);
				$("#pathotestType").val(charges[0]);
			}
		} else if (serviceHeading == "investigation"
				|| serviceHeading == "physiotherapy"
				|| serviceHeading == "OtherServices"
				|| serviceHeading == "productName") {

			if (item.text == undefined) {
				alert("Please Enter Valid Test...");
				$("#particulars").val("");
				return false;
			} else {
				var charges = arrItem[1].split("---");
				// alert(charges);
				var pay = 0;
				if (charges[1] == "") {
					pay = 0;
				} else {
					pay = charges[1];
				}
				$("#itemid").val(arrItem[0]);
				$("#particularRate").val(charges[0]);
				$("#particularqty").val(1);
				$("#particularamt").val(charges[0]);
				$("#particularPay").val(pay);
				$("#particularCoPay").val(charges[2]);
			}

		} else {

			if (item.text == undefined) {
				alert("Please Enter Valid Test...");
				$("#particulars").val("");
				return false;
			} else {
				$("#itemid").val(arrItem[0]);
				$("#particularRate").val(arrItem[1]);
				$("#particularqty").val(1);
				$("#particularamt").val(arrItem[1]);
			}
		}
		$("#particulardisc").val(0);
		if (serviceHeading != "investigation" && serviceHeading != "pathology"
				&& serviceHeading != "productName"
				&& serviceHeading != "gasesMonitor"
				&& serviceHeading != "gasesMonitorb"
				&& serviceHeading != "instruments"
				&& serviceHeading != "physiotherapy"
				&& serviceHeading != "OtherServices") {
			$("#particularPay").val(0);
			calculatePerticularCoPay();
		}
	}
}

function newPerticular() {
	setSaveButtonTemplate();
	$("#particulars").val("");
	// $("#popup_container2").val("");
	$("#particularRate").val("");
	$("#particularqty").val("");
	$("#particulardisc").val("");
	$("#particularamt").val("");
	$("#particularPay").val("");
	$("#particularCoPay").val("");
	$("#serviceHeading").val(0);
}

function deletePerticular() {

	var billComps = $("#billComps").html();
	var billBean = eval('(' + billComps + ')');
	var perticularId = new Array();
	var selectedGroups = new Array();
	$("input[name='ipdBillCheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
		perticularId.push($(this).attr('id'));
	});
	if (selectedGroups.length == 0) {
		alert("Please Select Particulars");
		return false;
	} else {

		var deleteArray = {
			bcs1 : []
		};

		for ( var i = 0; i < selectedGroups.length; i++) {
			// alert(selectedGroups[i]+" "+ perticularId[i]);
			var type = perticularId[i].substring(0, 5);
			if (type == "surCo") {
				alert("You can not delete these charges from billing");
				return false;
			}

			if (type == "Pharm") {
				alert("You can not delete these charges from billing");
				return false;
			}
			if (type == "trBed") {
				alert("Bed Charges Cannot Be Deleted");
				return false;
			}
			if (type == "reBed") {
				alert("Relative Bed Charges Cannot Be Deleted");
				return false;
			}

			var booleanValue = confirm("Please confirm to Delete Record?");
			if (!booleanValue)
				return false;

			if (type == "bcomp") {
				var billComp = perticularId[0].substring(5);
				if (billComp == 1) {
					myObj = billBean.bcs6[0];
					type = "inten";
				} else if (billComp == 3) {
					myObj = billBean.bcs2[0];
					type = "reg";
				} else if (billComp == 4) {
					myObj = billBean.bcs2[1];
					type = "mlc";
				} else if (billComp == 5) {
					myObj = billBean.bcs2[2];
					type = "tpa";
				} else if (billComp == 6) {
					myObj = billBean.bcs2[3];
					type = "opdch";
				} else {
					/*
					 * var temp = parseInt(billComp) - 4; billComp = billComp -
					 * 3; type = "genCh"; myObj = billBean.bcs2[billComp]; var
					 * temp = parseInt(billComp);
					 */
					type = "genCh";
					generalid = $("#billcomp_id" + billComp).val();
					for ( var i = 4; i <= billBean.bcs2.length; i++) {
						if (generalid == billBean.bcs2[i].itemid) {
							myObj = billBean.bcs2[i];
							break;
						}
					}
				}
				/**
				 * ********************can not delete
				 * these************************
				 */
				if (type == "reg" || type == "mlc" || type == "tpa"
						|| type == "opdch" || type == "Pharm"
						|| type == "surCo") {
					alert("You can not delete these charges from billing");
					return false;
				}
				deleteArray.bcs1.push({
					"itemid" : myObj.id,
					"ct" : type
				});
			}
			deleteArray.bcs1.push({
				"itemid" : selectedGroups[i],
				"ct" : type
			});
		}
		if (deleteArray.bcs1.length == 0) {
			return false;
		} else {
			deleteArray = JSON.stringify(deleteArray);
			var inputs = [];
			inputs.push('action=deletePerticular');
			inputs.push('myArray=' + deleteArray.decodeSpecialChars());
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					alert(r);
					location.reload(this);
				}
			});
		}
	}
}

/** **@author husenbadshah*****hide popups*** */
function hideModelBillPintPopup() {
	$("#iPrintBill").hide('hide');
	$("#DivshowBTN").hide('hide');
	document.getElementById('printWithDate').checked = false;
	document.getElementById('printWithoutDate').checked = false;
	document.getElementById('printWithPaymentSummery').checked = false;
	document.getElementById('printWithoutPaymentSummery').checked = false;
	document.getElementById('printWithDateAndPayableAmount').checked = false;
	document.getElementById('printWithOutDateAndPayableAmount').checked = false;
	document.getElementById('printWithOutHeaderAndFooter').checked = false;
}
/** **@author husenbadshah***show modal*** */
function showModal() {
	document.getElementById('printWithDate').checked = false;
	document.getElementById('printWithoutDate').checked = false;
	document.getElementById('printWithPaymentSummery').checked = false;
	document.getElementById('printWithoutPaymentSummery').checked = false;
	document.getElementById('printWithDateAndPayableAmount').checked = false;
	document.getElementById('printWithOutDateAndPayableAmount').checked = false;
	document.getElementById('printWithOutHeaderAndFooter').checked = false;
	$("#iPrintBill").show('show');
}
function showBTNS() {
	if (document.getElementById('printWithDate').checked) {
		var btnvalue = document.getElementById('printWithDate').value;
		$("#DivshowBTN").show('show');
		$("#printWithdateBtn").show('show');
		$("#PrintWithoutDateBtn").hide('hide');
		$("#printWithPaymentSummeryBtn").hide('hide');
		$("#printWithoutPaymentSummeryBtn").hide('hide');
		$("#printWithDatePaymentAmountBTN").hide('hide');
		$("#printWithoutDatePaymentAmountBTN").hide('hide');
		$("#printWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('printWithoutDate').checked) {
		$("#DivshowBTN").show('show');
		$("#printWithdateBtn").hide('hide');
		$("#PrintWithoutDateBtn").show('show');
		$("#printWithPaymentSummeryBtn").hide('hide');
		$("#printWithoutPaymentSummeryBtn").hide('hide');
		$("#printWithDatePaymentAmountBTN").hide('hide');
		$("#printWithoutDatePaymentAmountBTN").hide('hide');
		$("#printWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('printWithPaymentSummery').checked) {
		$("#DivshowBTN").show('show');
		$("#printWithPaymentSummeryBtn").show('show');
		$("#printWithoutPaymentSummeryBtn").hide('hide');
		$("#printWithdateBtn").hide('hide');
		$("#PrintWithoutDateBtn").hide('hide');
		$("#printWithDatePaymentAmountBTN").hide('hide');
		$("#printWithoutDatePaymentAmountBTN").hide('hide');
		$("#printWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('printWithoutPaymentSummery').checked) {
		$("#DivshowBTN").show('show');
		$("#printWithPaymentSummeryBtn").hide('hide');
		$("#printWithoutPaymentSummeryBtn").show('show');
		$("#printWithdateBtn").hide('hide');
		$("#PrintWithoutDateBtn").hide('hide');
		$("#printWithDatePaymentAmountBTN").hide('hide');
		$("#printWithoutDatePaymentAmountBTN").hide('hide');
		$("#printWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('printWithDateAndPayableAmount').checked) {
		$("#DivshowBTN").show('show');
		$("#printWithPaymentSummeryBtn").hide('hide');
		$("#printWithoutPaymentSummeryBtn").hide('hide');
		$("#printWithdateBtn").hide('hide');
		$("#PrintWithoutDateBtn").hide('hide');
		$("#printWithDatePaymentAmountBTN").show('show');
		$("#printWithoutDatePaymentAmountBTN").hide('hide');
		$("#printWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('printWithOutDateAndPayableAmount').checked) {
		$("#DivshowBTN").show('show');
		$("#printWithPaymentSummeryBtn").hide('hide');
		$("#printWithoutPaymentSummeryBtn").hide('hide');
		$("#printWithdateBtn").hide('hide');
		$("#PrintWithoutDateBtn").hide('hide');
		$("#printWithDatePaymentAmountBTN").hide('hide');
		$("#printWithoutDatePaymentAmountBTN").show('show');
		$("#printWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('printWithOutHeaderAndFooter').checked) {
		//Tushar Code @30 Jan 2017 For Pioneer Hospital  
		$("#DivshowBTN").show('show');
		$("#printWithPaymentSummeryBtn").hide('hide');
		$("#printWithoutPaymentSummeryBtn").hide('hide');
		$("#printWithdateBtn").hide('hide');
		$("#PrintWithoutDateBtn").hide('hide');
		$("#printWithDatePaymentAmountBTN").hide('hide');
		$("#printWithoutDatePaymentAmountBTN").hide('hide');
		$("#printWithoutHeaderFooterBTN").show('show');
	} else {
		$("#DivshowBTN").hide('hide');
		$("#printWithdateBtn").hide('hide');
		$("#PrintWithoutDateBtn").hide('hide');
		$("#printWithPaymentSummeryBtn").hide('hide');
		$("#printWithoutPaymentSummeryBtn").hide('hide');
		$("#printWithDatePaymentAmountBTN").hide('hide');
		$("#printWithoutDatePaymentAmountBTN").hide('hide');
		$("#printWithoutHeaderFooterBTN").hide('hide');
	}
}

function showModalForPreviousBill() {
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDateBtn').checked = false;
	document.getElementById('prevPrintWithPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
	$("#iPrintBillFrPrev").show('show');
}

function showBTNSFrPrev() {
	if (document.getElementById('prevPrintWithDate').checked) {
		var btnvalue = document.getElementById('prevPrintWithDate').value;
		$("#DivshowBTNFrPrev").show('show');
		$("#prevPrintWithdateBtn").show('show');
		$("#prevPrintWithoutDateBtn").hide('hide');
		$("#prevPrintWithPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithoutPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('prevPrintWithoutDate').checked) {
		$("#DivshowBTNFrPrev").show('show');
		$("#prevPrintWithdateBtn").hide('hide');
		$("#prevPrintWithoutDateBtn").show('show');
		$("#prevPrintWithPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithoutPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('prevPrintWithPaymentSummery').checked) {
		$("#DivshowBTNFrPrev").show('show');
		$("#prevPrintWithPaymentSummeryBtn").show('show');
		$("#prevPrintWithoutPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithdateBtn").hide('hide');
		$("#prevPrintWithoutDateBtn").hide('hide');
		$("#prevPrintWithDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('prevPrintWithoutPaymentSummery').checked) {
		$("#DivshowBTNFrPrev").show('show');
		$("#prevPrintWithPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithoutPaymentSummeryBtn").show('show');
		$("#prevPrintWithdateBtn").hide('hide');
		$("#prevPrintWithoutDateBtn").hide('hide');
		$("#prevPrintWithDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('prevPrintWithDateAndPayableAmount').checked) {
		$("#DivshowBTNFrPrev").show('show');
		$("#prevPrintWithPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithoutPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithdateBtn").hide('hide');
		$("#prevPrintWithoutDateBtn").hide('hide');
		$("#prevPrintWithDatePaymentAmountBTN").show('show');
		$("#prevPrintWithoutDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutHeaderFooterBTN").hide('hide');
	} else if (document.getElementById('prevPrintWithOutDateAndPayableAmount').checked) {
		$("#DivshowBTNFrPrev").show('show');
		$("#prevPrintWithPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithoutPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithdateBtn").hide('hide');
		$("#prevPrintWithoutDateBtn").hide('hide');
		$("#prevPrintWithDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutDatePaymentAmountBTN").show('show');
		$("#prevPrintWithoutHeaderFooterBTN").hide('hide');
	}  else if (document.getElementById('prevPrintWithOutHeaderAndFooter').checked) {
		//Tushar Code @30 Jan 2017 For Pioneer Hospital  
		$("#DivshowBTNFrPrev").show('show');
		$("#prevPrintWithPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithoutPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithdateBtn").hide('hide');
		$("#prevPrintWithoutDateBtn").hide('hide');
		$("#prevPrintWithDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutHeaderFooterBTN").show('show');
	} else {
		$("#DivshowBTNFrPrev").hide('hide');
		$("#prevPrintWithdateBtn").hide('hide');
		$("#prevPrintWithoutDateBtn").hide('hide');
		$("#prevPrintWithPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithoutPaymentSummeryBtn").hide('hide');
		$("#prevPrintWithDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutDatePaymentAmountBTN").hide('hide');
		$("#prevPrintWithoutHeaderFooterBTN").hide('hide');
	}
}

function hideModelBillPintPopupFrPrev() {
	$("#iPrintBillFrPrev").hide('hide');
	$("#DivshowBTNFrPrev").hide('hide');
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDate').checked = false;
	document.getElementById('prevPrintWithPaymentSummery').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummery').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
}

/**
 * Update Discharge Date*
 * 
 * @author AmrutPatil***
 */
function UpdateAdmissionDate() {
	var txtadmissionDate = $("#admissionDate").val();
	var admissionTime = $("#admissionTime").val();
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var patient_id = pobj1.pi;
	var TreamentID = $("#trid").val();

	var admissnDate;
	if (txtadmissionDate == "") {
		alert("Please enter admission date");
		$("#admissionDate").focus();
		return false;
	} else {
		var admsnDate = txtadmissionDate.split("/");
		admissnDate = admsnDate[0] + "-" + admsnDate[1] + "-" + admsnDate[2];
	}

	var admisntime;
	if (admissionTime == "") {
		alert("Please enter admission time");
		$("#admissionTime").focus();
		return false;
	} else {
		admisntime = admissionTime + ":00";
	}

	var inputs = [];
	inputs.push('action=UpdateAdmissionDate');
	inputs.push('patient_id=' + patient_id);
	inputs.push('TreamentID=' + TreamentID);
	inputs.push('admissnDate=' + admissnDate);
	inputs.push('admisntime=' + admisntime);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			window.location.href = "BillingDashboardForIPD.jsp";
		}
	});
}

function showPopupOfAdmsnDatePwd() {
	$("#admissionDatePsswrdPopUp").modal('show');
	$("#admissnPswrd").val("");
}

function AdmsnDatePwdPopup() {
	var pwdofAdmissionDate = $("#admissnPswrd").val();
	if (pwdofAdmissionDate == "") {
		alert("Please enter password to change the admission date");
		return false;
	}

	var inputs = [];
	inputs.push('action=CheckPasswordOfAdmin');
	inputs.push('pwdofAdmissionDate=' + pwdofAdmissionDate);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			// alert(r);
			if (r.match(true)) {
				UpdateAdmissionDate();
			} else {
				alert("password is not correct");
				document.getElementById('txtDischargeDate').checked = false;
				$("#admissionDatePsswrdPopUp").modal('hide');
			}
		}
	});
}

function closeAdmsnDatePwdPopup() {
	$("#admissionDatePsswrdPopUp").modal('hide');
}

// Author---Kavita Bhangale. Date-20-01-2016
function convertAdvanceInSecurityDeposit() {

	var selectedGroups = new Array();
	$("input[name='ipdReceiptCheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
	});
	if (selectedGroups.length > 1) {
		alert("Please Select Single Receipt");
		return false;
	} else {
		editReceiptType = $("#editReceiptType").val();
		if (editReceiptType == "Payment") {
			var divBillAAmt = $("#divBillAAmt").html();
			var billBean1 = eval('(' + divBillAAmt + ')');
			var myObj;
			var bill_id = 0;
			var master_id = 0;
			var slave_id = 0;
			for ( var k = 0; k < billBean1.baali.length; k++) {
				var id = billBean1.baali[k].opdbilllist[0].idipd;
				if (selectedGroups[0] == id) {
					myObj = billBean1.baali[k];
					bill_id = billBean1.baali[k].bid;
					master_id = billBean1.baali[k].baaid;
					slave_id = billBean1.baali[k].opdbilllist[0].idipd;
					break;
				}
			}

			var inputs = [];
			inputs.push('action=convertAdvanceInSecurityDeposit');
			inputs.push('bill_id=' + bill_id);
			inputs.push('master_id=' + master_id);
			inputs.push('slave_id=' + slave_id);
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					location.reload(true);
				}
			});
		} else if (editReceiptType == "Refund") {
			alert("Refund receipt can not be converted to Security Deposit");
			return false;
		} else {
			alert("Security Deposit can not be converted to Security Deposit");
			return false;
		}
	}
}

// Author---Kavita Bhangale. Date-20-01-2016
function convertSecurityDepositToAdvance() {

	var selectedGroups = new Array();
	$("input[name='ipdReceiptCheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
	});
	if (selectedGroups.length > 1) {
		alert("Please Select Single Receipt");
		return false;
	} else {
		editReceiptType = $("#editReceiptType").val();
		if (editReceiptType == "Security") {
			var divBillAAmt = $("#SecurityDipositDiv").html();

			var billBean1 = eval('(' + divBillAAmt + ')');
			var myObj;
			var bill_id = 0;
			var master_id = 0;
			var slave_id = 0;
			for ( var k = 0; k < billBean1.baali.length; k++) {
				var id = billBean1.baali[k].opdbilllist[0].idipd;
				if (selectedGroups[0] == id) {
					myObj = billBean1.baali[k];
					bill_id = billBean1.baali[k].bid;
					master_id = billBean1.baali[k].baaid;
					slave_id = billBean1.baali[k].opdbilllist[0].idipd;
					break;
				}
			}

			var inputs = [];
			inputs.push('action=convertSecurityDepositToAdvance');
			inputs.push('bill_id=' + bill_id);
			inputs.push('master_id=' + master_id);
			inputs.push('slave_id=' + slave_id);
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					location.reload(true);
				}
			});
		} else if (editReceiptType == "Refund") {
			alert("Refund receipt can not be converted to Advance Payment");
			return false;
		} else {
			alert("Advance Payment can not be converted to Advance Payment");
			return false;
		}
	}
}

// Author---Kavita Bhangale. Date-20-01-2016
function refundSecurityDepositToPatient() {

	var selectedGroups = new Array();
	$("input[name='ipdReceiptCheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
	});
	if (selectedGroups.length > 1) {
		alert("Please Select Single Receipt");
		return false;
	} else {

		var divBillAAmt = $("#SecurityDipositDiv").html();

		var billBean1 = eval('(' + divBillAAmt + ')');
		var myObj;
		var bill_id = 0;
		var master_id = 0;
		var slave_id = 0;
		var refundamount = 0;
		for ( var k = 0; k < billBean1.baali.length; k++) {
			var id = billBean1.baali[k].opdbilllist[0].idipd;
			if (selectedGroups[0] == id) {
				myObj = billBean1.baali[k];
				bill_id = billBean1.baali[k].bid;
				master_id = billBean1.baali[k].baaid;
				slave_id = billBean1.baali[k].opdbilllist[0].idipd;
				refundamount = billBean1.baali[k].refamt;
				break;
			}
		}

		var inputs = [];
		inputs.push('action=refundSecurityDepositToPatient');
		inputs.push('bill_id=' + bill_id);
		inputs.push('master_id=' + master_id);
		inputs.push('refundamount=' + parseFloat(refundamount));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BillServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload(true);
			}
		});
	}
}

// Author---Kavita Bhangale. Date-19-01-2016
function setIPDSecurityDepositPayment(callfrom) {

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	tid = pobj1.trid;

	var inputs = [];
	inputs.push('action=fetchIPDSecurityDepositDetails');
	inputs.push('treat_id=' + tid);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);

					billBean1 = eval('(' + ajaxResponse + ')');
					var total = 0;
					var refunded = 0;
					var temp;
					var template = "";
					if (callfrom == "onload") {
						$("#SecurityDipositDiv").html(ajaxResponse);
					} else if (callfrom == "Security") {
						$("#editReceiptType").val("Security");
						for ( var i = 0; i < billBean1.baali.length; i++) {
							if (billBean1.baali[i].head == "Security") {
								if (billBean1.baali[i].bid != 0) {
									myObj = billBean1.baali[i];
									total = total + myObj.opdbilllist[0].pdAmt;
									if (myObj.refdflag == 1) {
										refunded = refunded
												+ myObj.opdbilllist[0].pdAmt;
									}
									if (myObj.opdbilllist[0].pay_mode == "Cash") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (1 + i)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].cash_amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].card_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].bname
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td>';
										if (myObj.refdflag == 1) {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '">(Refunded)</td>';
										} else {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" class="editUserAccess" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '"></td>';
										}

										template = template
												+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdSecurityReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';

									} else if (myObj.opdbilllist[0].pay_mode == "Cheque") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (1 + i)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].chq_amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].chq_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].chq_bank
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td>';

										if (myObj.refdflag == 1) {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '">(Refunded)</td>';
										} else {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" class="editUserAccess" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '"></td>';
										}

										template = template
												+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdSecurityReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';

									} else if (myObj.opdbilllist[0].pay_mode == "Card") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (1 + i)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].card_amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].card_no
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].bname
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td>';

										if (myObj.refdflag == 1) {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '">(Refunded)</td>';
										} else {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" class="editUserAccess" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '"></td>';
										}

										template = template
												+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdSecurityReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else if (myObj.opdbilllist[0].pay_mode == "RTGS") {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (1 + i)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].rtgs_amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].accno
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].rtgs_bank_name
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td>';
										if (myObj.refdflag == 1) {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '"></td>';
										} else {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" class="editUserAccess" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '"></td>';
										}

										template = template
												+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdSecurityReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									} else {
										template = template
												+ '<tr><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ (1 + i)
												+ '</td><td class="numeric col-md-1-1" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].pay_mode
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.amt
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ (0)
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.date
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ ("")
												+ '</td><td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;">'
												+ myObj.opdbilllist[0].narr
												+ '</td>';
										if (myObj.refdflag == 1) {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '">(Refunded)</td>';
										} else {
											template = template
													+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><input	type="checkbox" name="ipdReceiptCheckbox" class="editUserAccess" disabled="disabled" value="'
													+ myObj.opdbilllist[0].idipd
													+ '"></td>';
										}

										template = template
												+ '<td class="numeric col-md-1-1 center" style="border-top: none; padding: 1px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdSecurityReceipt('
												+ myObj.opdbilllist[0].idipd
												+ ')"></i>' + '</td></tr>';
									}
								}
							}
						}
						template = template
								+ '<tr><td style="border-top:; padding: 1px;"></td>'
								+ '<td style="border-top:; padding: 1px;">Total :</td>'
								+ '<td class="numeric"	style="border-top: ; padding: 1px;" id="securityTotal">'
								+ total
								+ '</td><td class="numeric"	style="border-top:none ; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric"	style="border-top: none; padding: 1px;"></td></tr>'
								+ '<tr><td style="border-top:; padding: 1px;"></td>'
								+ '<td style="border-top:; padding: 1px;">Refund :</td>'
								+ '<td class="numeric"	style="border-top: ; padding: 1px;">'
								+ refunded
								+ '</td><td class="numeric"	style="border-top:none ; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric"	style="border-top: none; padding: 1px;"></td></tr>'
								+ '<tr><td style="border-top:; padding: 1px;"></td>'
								+ '<td style="border-top:; padding: 1px;">Balance :</td>'
								+ '<td class="numeric"	style="border-top: ; padding: 1px;">'
								+ (total - refunded)
								+ '</td><td class="numeric"	style="border-top:none ; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric" style="border-top: none; padding: 1px;"></td>'
								+ '<td class="numeric"	style="border-top: none; padding: 1px;"></td></tr>';

						$("#listAdvanceReceipt").setTemplate(template);
						$("#listAdvanceReceipt").processTemplate(temp);
					}
				}
			});
	setTimeout(function(){userAccess();},1000);

}

function printIpdAdvanceReceipt(idipd) {

	var Response = $("#divBillAAmt").html();
	var date = $("#date").html();

	ajaxRes = JSON.parse(Response);

	var receiptobj = "";
	for ( var m = 0; m < ajaxRes.baali.length; m++) {
		if (ajaxRes.baali[m].opdbilllist[0].idipd == idipd) {

			receiptobj = ajaxRes.baali[m];
			break;
		}
	}
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var admint_under = pobj1.admit;
	var dept = pobj1.objDoc.depNm;
	var trcount = pobj1.objTreat.trCount;
	var title = pobj1.tit;
	var fname = pobj1.fn;
	var mname = pobj1.mn;
	var lname = pobj1.ln;
	var billCatName = pobj1.objTreat.billCategory_Name;
	var billCatDisc = pobj1.objTreat.billCategory_Discount;
	var myobj = JSON.stringify(receiptobj);

	window.open("IPDAdvanceReceiptPrint.jsp?" + "myobj="
			+ encodeURIComponent(myobj) + "&admint_under="
			+ encodeURIComponent(admint_under) + "&dept="
			+ encodeURIComponent(dept) + "&trcount="
			+ encodeURIComponent(trcount) + "&title="
			+ encodeURIComponent(title) + "&billCatName="
			+ encodeURIComponent(billCatName) +"&billCatDisc="
			+ encodeURIComponent(billCatDisc) +"&fname=" + encodeURIComponent(fname)
			+ "&mname=" + encodeURIComponent(mname) + "&lname="
			+ encodeURIComponent(lname) + "&date=" + date);
}

function printIpdSecurityReceipt(idipd) {

	var patobj = $("#divPatId").html();
	var Response = $("#SecurityDipositDiv").html();
	var date = $("#date").html();

	patinfo = JSON.parse(patobj);
	ajaxRes = JSON.parse(Response);

	var receiptobj = "";
	for ( var m = 0; m < ajaxRes.baali.length; m++) {
		if (ajaxRes.baali[m].opdbilllist[0].idipd == idipd) {

			receiptobj = ajaxRes.baali[m];
			break;
		}
	}

	var myobj = JSON.stringify(receiptobj);
	var mypatobj = JSON.stringify(patinfo);

	window.open("SecurityDepositReceiptPrint.jsp?" + "myobj="
			+ encodeURIComponent(myobj) + "&mypatobj="
			+ encodeURIComponent(mypatobj) + "&date=" + date);
}

/** *******************get Admininistrative Charges**************** */
function getAdmininistrativeCharges() {
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var patient_id = pobj1.pi;
	var TreamentID = $("#trid").val();
	var inputs = [];
	inputs.push('action=getAdmincharges');
	inputs.push('patient_id=' + patient_id);
	inputs.push('TreamentID=' + TreamentID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {

					var adminCharges = JSON.parse(r);

					if (adminCharges.adminchargelist.length > 0) {
						var adminChargeForUpdate = 0;
						adminChargeForUpdate = adminCharges.adminchargelist[0].adminncharge;
						var adminChrgType = adminCharges.adminchargelist[0].chrgType;
						var narration = adminCharges.adminchargelist[0].narration;

						$("#txtadminCharge").val(adminChargeForUpdate);
						$("#txtChrgType").val(adminChrgType);
						$("#txtIdNarration").val(narration);
						/* for hidden fields */
						$("#AdminChargesHidden").val(adminChargeForUpdate);
						$("#AdminChrgType").val(adminChrgType);
						$("#AdminNarrationHidden").val(narration);
					}
				}
			});
}

function calTotalForIPDAP() {
	var rowCount = $("#rowCountForIPDAP").val();

	var tmp = 0;
	for ( var i = 1; i <= rowCount; i++) {

		var amount = $("#amount" + i).val();
		if (amount == undefined || amount == "") {
		} else {
			var x = parseFloat(amount);
			tmp = tmp + x;
		}
	}

	$("#txtTotalIPDP").val(tmp.toFixed(2));
	$("#txtPaid").val(tmp.toFixed(2));
	calRemaining();
	calculareRefund();
}

function calculateTotalPayCoPay(callfrom) {
	
    if (callfrom == 'current') {

        var billComps = $("#billComps").html();
        var billBean = eval('(' + billComps + ')');

        var pay = 0;
        var coPay = 0;
        var total = 0;
        for ( var i = 1; i <= 16; i++) {
            var tempPay = $("#tdPay" + i).text();
            if (tempPay != null && tempPay != undefined && tempPay != "NaN"
                    && tempPay != "") {
                pay = parseFloat(pay) + parseFloat(tempPay);
            }
        }

        for ( var j = 1; j <= 16; j++) {
            var tempCoPay = $("#tdCoPay" + j).text();
            if (tempCoPay != null && tempCoPay != undefined
                    && tempCoPay != "NaN" && tempCoPay != "") {
                coPay = parseFloat(coPay) + parseFloat(tempCoPay);
            }
        }

        for ( var k = 1; k <= 16; k++) {
            var tempTotal = $("#tdTotal" + k).text();
            if (tempTotal != null && tempTotal != undefined
                    && tempTotal != "NaN" && tempTotal != "") {
                total = parseFloat(total) + parseFloat(tempTotal);
            }
        }

        /************************relativeBed Total,pay,copay***********************/
        var relativeBedTotal = $("#rbtdTotal").text();
        var relativeBedPay = $("#rbtdPay").text();
        var relativeBedCopay = $("#rbtdCoPay").text();
        var relativeBedTotalnew = parseFloat(relativeBedTotal);
        var relativeBedPaynew = parseFloat(relativeBedPay);
        var relativeBedCopaynew = parseFloat(relativeBedCopay);

        if (relativeBedTotal != "" || relativeBedPay != ""
                || relativeBedCopay != "") {
            total = parseFloat(total + relativeBedTotalnew);
            pay = parseFloat(pay + relativeBedPaynew);
            coPay = parseFloat(coPay + relativeBedCopaynew);
        }

        /** *********************surgeryservices Total,pay,copay***************** */
        var surgeryservicesTotal = $("#sstdTotal").text();
        var surgeryservicesPay = $("#sstdPay").text();
        var surgeryservicesCopay = $("#sstdCoPay").text();
        var surgeryservicesTotalnew = parseFloat(surgeryservicesTotal);
        var surgeryservicesPaynew = parseFloat(surgeryservicesPay);
        var surgeryservicesCopaynew = parseFloat(surgeryservicesCopay);

        if (surgeryservicesTotal != "" || surgeryservicesPay != ""
                || surgeryservicesCopay != "") {
            total = parseFloat(total + surgeryservicesTotalnew);
            pay = parseFloat(pay + surgeryservicesPaynew);
            coPay = parseFloat(coPay + surgeryservicesCopaynew);
        }

        var headerList = $("#headerList").html();
        headerList = eval('(' + headerList + ')');
        var billCompCount = (headerList.ol.length) - 5;

        for ( var l = 1; l <= billCompCount; l++) {
            var tempBillPay = $("#tdBilldivPay" + l).text();
            if (tempBillPay != null && tempBillPay != undefined
                    && tempBillPay != "NaN" && tempBillPay != "") {
                pay = parseFloat(pay) + parseFloat(tempBillPay);
            }
        }

        for ( var m = 1; m <= billCompCount; m++) {
            var tempBillCoPay = $("#tdBilldivCoPay" + m).text();
            if (tempBillCoPay != null && tempBillCoPay != undefined
                    && tempBillCoPay != "NaN" && tempBillCoPay != "") {
                coPay = parseFloat(coPay) + parseFloat(tempBillCoPay);
            }
        }

        for ( var n = 1; n <= billCompCount; n++) {
            var tempBillTotal = $("#amt" + n).text();
            if (tempBillTotal != null && tempBillTotal != undefined
                    && tempBillTotal != "NaN" && tempBillTotal != "") {
                total = parseFloat(total) + parseFloat(tempBillTotal);
            }
        }

        var adminCharges = $("#AdminChargesHidden").val();
        var adminChargesType = $("#AdminChrgType").val();

        var adminTotal = 0;
        if (adminCharges != "") {

            if (adminChargesType == "percentage") {
                adminTotal = parseFloat(total * adminCharges / 100);
            } else {
                adminTotal = adminCharges;
            }

            $("#hiddenDefaultAdminCharge").val(adminCharges);
            $("#hiddenDefaultAdminChargeType").val(adminChargesType);

            $("#headdate2").text($("#headdate3").text());
            $("#chr2").text(parseFloat(adminTotal).toFixed(2));
            $("#qty2").text(parseFloat(1).toFixed(2));
            $("#disc2").text(parseFloat(0).toFixed(2));
            $("#amt2").text(parseFloat(adminTotal).toFixed(2));
            $("#tdBilldivPay2").text(parseFloat(0).toFixed(2));
            $("#tdBilldivCoPay2").text(parseFloat(adminTotal).toFixed(2));
        } else {
            var administrativeCharges = billBean.hospAcct[0].adminchr;
            var administrativeChargesType = billBean.hospAcct[0].ChrgType;
            $("#hiddenDefaultAdminCharge").val(billBean.hospAcct[0].adminchr);
            $("#hiddenDefaultAdminChargeType").val(billBean.hospAcct[0].ChrgType);

            if (administrativeChargesType == "percentage") {
                adminTotal = parseFloat(total * administrativeCharges / 100);
            } else {
                adminTotal = administrativeCharges;
            }

            $("#headdate2").text($("#headdate3").text());
            $("#chr2").text(parseFloat(adminTotal).toFixed(2));
            $("#qty2").text(parseFloat(1).toFixed(2));
            $("#disc2").text(parseFloat(0).toFixed(2));
            $("#amt2").text(parseFloat(adminTotal).toFixed(2));
            $("#tdBilldivPay2").text(parseFloat(0).toFixed(2));
            $("#tdBilldivCoPay2").text(parseFloat(adminTotal).toFixed(2));
        }

        var template = "";
        var temp;
        var finalDiscountForPay = 0;
        var finalDiscountForCoPay = 0;
        var finalDiscountForTotal = 0;
        var discountValue = 0;
        var discNarration = "";
        for ( var di = 0; di < billBean.liDisc.length; di++) {
            if(billBean.liDisc[di].apprvalStatus == 1){
                discountValue = billBean.liDisc[di].approvalDiscAmt ;
            //    discNarration = billBean.liDisc[di].apprvalDiscNarr ;
                if(discNarration == undefined){
                    discNarration = "";
                }
            }else{
                discountValue = billBean.liDisc[di].disc ;
            //    discNarration = billBean.liDisc[di].narr ;
            }
            template = template
            + '<tr><td class="numeric col-md-6-1" style="border-top: none;">'
            + billBean.liDisc[di].narr
            + '</td><td class="numeric col-md-0-1" style="border-top: none;">'
            + discountValue
            + '</td><td class="numeric col-md-0-1" style="border-top: none;"><button onclick="editIPDDiscount('
            + billBean.liDisc[di].id
            + ')" value="EDIT" class="btn btn-xs btn-success editUserAccess" disabled="disabled"><i class="fa fa-edit"></i></button></td><td class="numeric col-md-0-1" style="border-top:none ;"><button onclick="deleteIPDDiscount('
            + billBean.liDisc[di].id
            + ')" value="DELETE" class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled"><i class="fa fa-trash-o"></i></button><input type="hidden" id ="discStatus'
            + billBean.liDisc[di].id + '" value="'
            + billBean.liDisc[di].st + '" />';
            if(billBean.liDisc[di].apprvalStatus == 1){
                template = template
            + '</td><td class="numeric col-md-0-1" style="border-top: none;color: green;"> <i class="fa fa-thumbs-up"></i></td></tr>';
            }else if(billBean.liDisc[di].apprvalStatus == 2){
                template = template
                + '</td><td style="border-top: none;color: red;"><i class="fa fa-thumbs-down"></i></td></tr>';
            }else{
                template = template
                + '</td><td class="numeric col-md-0-1" style="border-top: none;color: blue;"><i class="fa fa-spinner fa-spin fa-0x fa-fw"></i></td></tr>';
            }

            if (billBean.liDisc[di].pf == 'P') {
                if(billBean.liDisc[di].apprvalStatus == 1){
                    finalDiscountForCoPay = finalDiscountForCoPay
                    + billBean.liDisc[di].approvalDiscAmt;
            finalDiscountForTotal = finalDiscountForTotal
                    + billBean.liDisc[di].approvalDiscAmt;
                }
            } else if (billBean.liDisc[di].pf == 'S') {
                if(billBean.liDisc[di].apprvalStatus == 1){
                    finalDiscountForPay = finalDiscountForPay
                    + billBean.liDisc[di].approvalDiscAmt;
            finalDiscountForTotal = finalDiscountForTotal
                    + billBean.liDisc[di].approvalDiscAmt;
                }
            }
        }

        $("#listDiscount").setTemplate(template);
        $("#listDiscount").processTemplate(temp);
        // previous calculation
        /*
         * pay = pay - finalDiscountForPay; coPay = coPay + adminTotal -
         * finalDiscountForCoPay; total = total + adminTotal -
         * finalDiscountForTotal;
         */

        // new calculation
        coPay = coPay + parseFloat(adminTotal);
        total = total + parseFloat(adminTotal);

        $("#totalPay").text(parseFloat(pay).toFixed(2));
        $("#totalCoPay").text(parseFloat(coPay).toFixed(2));

        $("#totalPayDiscount").text(parseFloat(finalDiscountForPay).toFixed(2));
        $("#totalCoPayDiscount").text(
                parseFloat(finalDiscountForCoPay).toFixed(2));

        $("#finalBillTotal").text(parseFloat(total).toFixed(2));

        var serviceTax = billBean.hospDetail[0].serTax;

        var pharmaDisc = parseFloat($("#pharma_discount").val());

        finalDiscountForTotal = finalDiscountForTotal + pharmaDisc;
        $("#overalldisount").val(finalDiscountForTotal);
        
        var categoryDiscount = billBean.bcs7[0].billCatDisc;
		$("#idCategoryDiscount").text("Category Disc(" + categoryDiscount + "%)");
		var categorywiseDisc = (total * (categoryDiscount / 100 ));
		$("#categoryDiscount").text(categorywiseDisc.toFixed(2));
		
		var grandTotal =  total-categorywiseDisc ;
		$("#grandTotal").text(parseFloat(grandTotal).toFixed(2));
		
        // $("#serviceTaxText").text("Tax(" + serviceTax + "%)");
        $("#totalServicTaxText").text("Total+Tax(" + serviceTax + "%)");
        $("#hiddenDefaultServiceTax").val(serviceTax);
        $("#bill_category_discount").val(categoryDiscount);
        
        total = grandTotal - finalDiscountForTotal;
        serviceTax = (serviceTax / 100);
        var serviceTaxPay = pay + (pay * serviceTax);
        var serviceTaxCoPay = coPay + (coPay * serviceTax);
        var serviceTaxTotal = (total) + (total * serviceTax);

        $("#payableServiceTaxTotalPay").text(
                parseFloat(pay - finalDiscountForPay).toFixed(2));
        $("#payableServiceTaxTotalCoPay").text(
                parseFloat(coPay - finalDiscountForCoPay).toFixed(2));

        $("#finalBillTotalServiceTax").text(
                parseFloat(serviceTaxTotal).toFixed(2));

        $("#finalDiscount").text(parseFloat(finalDiscountForTotal).toFixed(2));
        var finalPayable = serviceTaxTotal;
        $("#finalPayable").text(parseFloat(finalPayable).toFixed(2));

    } else if (callfrom == "previous") {

        var billComps = $("#billComps").html();
        var billBean = eval('(' + billComps + ')');

        var pay = 0;
        var coPay = 0;
        var total = 0;
        for ( var i = 1; i <= 16; i++) {
            var tempPay = $("#tdPay" + i).text();
            if (tempPay != null && tempPay != undefined && tempPay != "NaN"
                    && tempPay != "") {
                pay = parseFloat(pay) + parseFloat(tempPay);
            }
        }

        for ( var j = 1; j <= 16; j++) {
            var tempCoPay = $("#tdCoPay" + j).text();
            if (tempCoPay != null && tempCoPay != undefined
                    && tempCoPay != "NaN" && tempCoPay != "") {
                coPay = parseFloat(coPay) + parseFloat(tempCoPay);
            }
        }

        for ( var k = 1; k <= 16; k++) {
            var tempTotal = $("#tdTotal" + k).text();
            if (tempTotal != null && tempTotal != undefined
                    && tempTotal != "NaN" && tempTotal != "") {
                total = parseFloat(total) + parseFloat(tempTotal);
            }
        }

        /************************relativeBed Total,pay,copay***********************/
        var relativeBedTotal = $("#rbtdTotal").text();
        var relativeBedPay = $("#rbtdPay").text();
        var relativeBedCopay = $("#rbtdCoPay").text();
        var relativeBedTotalnew = parseFloat(relativeBedTotal);
        var relativeBedPaynew = parseFloat(relativeBedPay);
        var relativeBedCopaynew = parseFloat(relativeBedCopay);

        if (relativeBedTotal != "" || relativeBedPay != ""
                || relativeBedCopay != "") {
            total = parseFloat(total + relativeBedTotalnew);
            pay = parseFloat(pay + relativeBedPaynew);
            coPay = parseFloat(coPay + relativeBedCopaynew);
        }

        /** *********************surgeryservices Total,pay,copay***************** */
        var surgeryservicesTotal = $("#sstdTotal").text();
        var surgeryservicesPay = $("#sstdPay").text();
        var surgeryservicesCopay = $("#sstdCoPay").text();
        var surgeryservicesTotalnew = parseFloat(surgeryservicesTotal);
        var surgeryservicesPaynew = parseFloat(surgeryservicesPay);
        var surgeryservicesCopaynew = parseFloat(surgeryservicesCopay);

        if (surgeryservicesTotal != "" || surgeryservicesPay != ""
                || surgeryservicesCopay != "") {
            total = parseFloat(total + surgeryservicesTotalnew);
            pay = parseFloat(pay + surgeryservicesPaynew);
            coPay = parseFloat(coPay + surgeryservicesCopaynew);
        }

        var headerList = $("#headerList").html();
        headerList = eval('(' + headerList + ')');
        var billCompCount = (headerList.ol.length) - 5;

        for ( var l = 1; l <= billCompCount; l++) {
            var tempBillPay = $("#tdBilldivPay" + l).text();
            if (tempBillPay != null && tempBillPay != undefined
                    && tempBillPay != "NaN" && tempBillPay != "") {
                pay = parseFloat(pay) + parseFloat(tempBillPay);
            }
        }

        for ( var m = 1; m <= billCompCount; m++) {
            var tempBillCoPay = $("#tdBilldivCoPay" + m).text();
            if (tempBillCoPay != null && tempBillCoPay != undefined
                    && tempBillCoPay != "NaN" && tempBillCoPay != "") {
                coPay = parseFloat(coPay) + parseFloat(tempBillCoPay);
            }
        }

        for ( var n = 1; n <= billCompCount; n++) {
            var tempBillTotal = $("#amt" + n).text();
            if (tempBillTotal != null && tempBillTotal != undefined
                    && tempBillTotal != "NaN" && tempBillTotal != "") {
                total = parseFloat(total) + parseFloat(tempBillTotal);
            }
        }

        var adminCharges = $("#AdminChargesHidden").val();
        var adminChargesType = $("#AdminChrgType").val();

        var adminTotal = 0;
        if (adminCharges != "") {

            if (adminChargesType == "percentage") {
                adminTotal = parseFloat(total * adminCharges / 100);
            } else {
                adminTotal = adminCharges;
            }

            $("#hiddenDefaultAdminCharge").val(adminCharges);
            $("#hiddenDefaultAdminChargeType").val(adminChargesType);

            $("#headdate2").text($("#headdate3").text());
            $("#chr2").text(parseFloat(adminTotal).toFixed(2));
            $("#qty2").text(parseFloat(1).toFixed(2));
            $("#disc2").text(parseFloat(0).toFixed(2));
            $("#amt2").text(parseFloat(adminTotal).toFixed(2));
            $("#tdBilldivPay2").text(parseFloat(0).toFixed(2));
            $("#tdBilldivCoPay2").text(parseFloat(adminTotal).toFixed(2));
        } else {
            var administrativeCharges = billBean.hospAcct[0].adminchr;
            var administrativeChargesType = billBean.hospAcct[0].ChrgType;
            $("#hiddenDefaultAdminCharge").val(billBean.hospAcct[0].adminchr);
            $("#hiddenDefaultAdminChargeType").val(billBean.hospAcct[0].ChrgType);

            if (administrativeChargesType == "percentage") {
                adminTotal = parseFloat(total * administrativeCharges / 100);
            } else {
                adminTotal = administrativeCharges;
            }

            $("#headdate2").text($("#headdate3").text());
            $("#chr2").text(parseFloat(adminTotal).toFixed(2));
            $("#qty2").text(parseFloat(1).toFixed(2));
            $("#disc2").text(parseFloat(0).toFixed(2));
            $("#amt2").text(parseFloat(adminTotal).toFixed(2));
            $("#tdBilldivPay2").text(parseFloat(0).toFixed(2));
            $("#tdBilldivCoPay2").text(parseFloat(adminTotal).toFixed(2));
        }

        var template = "";
        var temp;
        var finalDiscountForPay = 0;
        var finalDiscountForCoPay = 0;
        var finalDiscountForTotal = 0;
        var discNarration = "";
        for ( var di = 0; di < billBean.liDisc.length; di++) {
            if(billBean.liDisc[di].apprvalStatus == 1){
                discountValue = billBean.liDisc[di].approvalDiscAmt ;
            //    discNarration = billBean.liDisc[di].apprvalDiscNarr ;
                if(discNarration == undefined){
                    discNarration = "";
                }
            }else{
                discountValue = billBean.liDisc[di].disc ;
                //discNarration = billBean.liDisc[di].narr ;
            }
            template = template
            + '<tr><td class="numeric col-md-6-1" style="border-top: none;">'
            + billBean.liDisc[di].narr
            + '</td><td class="numeric col-md-0-1" style="border-top: none;">'
            + discountValue
            + '</td><td class="numeric col-md-0-1" style="border-top: none;"><button onclick="editIPDDiscount('
            + billBean.liDisc[di].id
            + ')" value="EDIT" class="btn btn-xs btn-success editUserAccess" disabled="disabled"><i class="fa fa-edit"></i></button></td><td class="numeric col-md-0-1" style="border-top:none ;"><button onclick="deleteIPDDiscount('
            + billBean.liDisc[di].id
            + ')" value="DELETE" class="btn btn-xs btn-danger deleteUserAccess" disabled="disabled"><i class="fa fa-trash-o"></i></button><input type="hidden" id ="discStatus'
            + billBean.liDisc[di].id + '" value="'
            + billBean.liDisc[di].st + '" />';
            if(billBean.liDisc[di].apprvalStatus == 1){
                template = template
            + '</td><td class="numeric col-md-0-1" style="border-top: none;color: green;"> <i class="fa fa-thumbs-up"></i></td></tr>';
            }else if(billBean.liDisc[di].apprvalStatus == 2){
                template = template
                + '</td><td style="border-top: none;color: red;"><i class="fa fa-thumbs-down"></i></td></tr>';
            }else{
                template = template
                + '</td><td class="numeric col-md-0-1" style="border-top: none;color: blue;"><i class="fa fa-spinner fa-spin fa-0x fa-fw"></i></td></tr>';
            }

            if (billBean.liDisc[di].pf == 'P') {
                if(billBean.liDisc[di].apprvalStatus == 1){
                    finalDiscountForCoPay = finalDiscountForCoPay
                    + billBean.liDisc[di].approvalDiscAmt;
            finalDiscountForTotal = finalDiscountForTotal
                    + billBean.liDisc[di].approvalDiscAmt;
                }
            } else if (billBean.liDisc[di].pf == 'S') {
                if(billBean.liDisc[di].apprvalStatus == 1){
                    finalDiscountForPay = finalDiscountForPay
                    + billBean.liDisc[di].approvalDiscAmt;
            finalDiscountForTotal = finalDiscountForTotal
                    + billBean.liDisc[di].approvalDiscAmt;
                }
            }
        }

        $("#listDiscount").setTemplate(template);
        $("#listDiscount").processTemplate(temp);
        // previous calculation
        /*
         * pay = pay - finalDiscountForPay; coPay = coPay + adminTotal -
         * finalDiscountForCoPay; total = total + adminTotal -
         * finalDiscountForTotal;
         */

        // new calculation
        coPay = coPay + parseFloat(adminTotal);
        total = total + parseFloat(adminTotal);

        $("#totalPay").text(parseFloat(pay).toFixed(2));
        $("#totalCoPay").text(parseFloat(coPay).toFixed(2));

        $("#totalPayDiscount").text(parseFloat(finalDiscountForPay).toFixed(2));
        $("#totalCoPayDiscount").text(
                parseFloat(finalDiscountForCoPay).toFixed(2));

        $("#finalBillTotal").text(parseFloat(total).toFixed(2));

        var serviceTax = billBean.hospDetail[0].prevSerTax;

        var pharmaDisc = parseFloat($("#pharma_discount").val());

        finalDiscountForTotal = finalDiscountForTotal + pharmaDisc;
        $("#overalldisount").val(finalDiscountForTotal);
        
        var categoryDiscount = billBean.bcs7[0].prevBillCatDisc;
		$("#idCategoryDiscount").text("Category Disc(" + categoryDiscount + "%)");
		var categorywiseDisc = (total * (categoryDiscount / 100 ));
		$("#categoryDiscount").text(categorywiseDisc.toFixed(2));
		
		var grandTotal =  total-categorywiseDisc ;
		$("#grandTotal").text(parseFloat(grandTotal).toFixed(2));
        
        // $("#serviceTaxText").text("Tax(" + serviceTax + "%)");
        $("#totalServicTaxText").text("Total+Tax(" + serviceTax + "%)");
        $("#hiddenDefaultServiceTax").val(serviceTax);
        $("#bill_category_discount").val(categoryDiscount);
        
        total = grandTotal - finalDiscountForTotal;
        
        serviceTax = (serviceTax / 100);
        var serviceTaxPay = pay + (pay * serviceTax);
        var serviceTaxCoPay = coPay + (coPay * serviceTax);
        var serviceTaxTotal = (total) + (total * serviceTax);

        if (callfrom = "previous") {
            $("#OutstandingTotalPay").text(
                    parseFloat(pay - finalDiscountForPay).toFixed(2));
            $("#OutstandingTotalCoPay").text(
                    parseFloat(coPay - finalDiscountForCoPay).toFixed(2));
        }

        $("#payableServiceTaxTotalPay").text(
                parseFloat(pay - finalDiscountForPay).toFixed(2));
        $("#payableServiceTaxTotalCoPay").text(
                parseFloat(coPay - finalDiscountForCoPay).toFixed(2));

        $("#finalBillTotalServiceTax").text(
                parseFloat(serviceTaxTotal).toFixed(2));

        $("#finalDiscount").text(parseFloat(finalDiscountForTotal).toFixed(2));
        var finalPayable = serviceTaxTotal;
        $("#finalPayable").text(parseFloat(finalPayable).toFixed(2));

    } else {

        var billComps = $("#billComps").html();
        var billBean = eval('(' + billComps + ')');

        var pay = 0;
        var coPay = 0;
        var total = 0;
        for ( var i = 1; i <= 16; i++) {
            var tempPay = $("#tdPay" + i).text();
            if (tempPay != null && tempPay != undefined && tempPay != "NaN"
                    && tempPay != "") {
                pay = parseFloat(pay) + parseFloat(tempPay);
            }
        }

        for ( var j = 1; j <= 16; j++) {
            var tempCoPay = $("#tdCoPay" + j).text();
            if (tempCoPay != null && tempCoPay != undefined
                    && tempCoPay != "NaN" && tempCoPay != "") {
                coPay = parseFloat(coPay) + parseFloat(tempCoPay);
            }
        }

        for ( var k = 1; k <= 16; k++) {
            var tempTotal = $("#tdTotal" + k).text();
            if (tempTotal != null && tempTotal != undefined
                    && tempTotal != "NaN" && tempTotal != "") {
                total = parseFloat(total) + parseFloat(tempTotal);
            }
        }

        /**
         * *********************relativeBed
         * Total,pay,copay**********************
         */
        var relativeBedTotal = $("#rbtdTotal").text();
        var relativeBedPay = $("#rbtdPay").text();
        var relativeBedCopay = $("#rbtdCoPay").text();
        var relativeBedTotalnew = parseFloat(relativeBedTotal);
        var relativeBedPaynew = parseFloat(relativeBedPay);
        var relativeBedCopaynew = parseFloat(relativeBedCopay);

        if (relativeBedTotal != "" || relativeBedPay != ""
                || relativeBedCopay != "") {
            total = parseFloat(total + relativeBedTotalnew);
            pay = parseFloat(pay + relativeBedPaynew);
            coPay = parseFloat(coPay + relativeBedCopaynew);
        }

        /** *********************surgeryservices Total,pay,copay***************** */
        var surgeryservicesTotal = $("#sstdTotal").text();
        var surgeryservicesPay = $("#sstdPay").text();
        var surgeryservicesCopay = $("#sstdCoPay").text();
        var surgeryservicesTotalnew = parseFloat(surgeryservicesTotal);
        var surgeryservicesPaynew = parseFloat(surgeryservicesPay);
        var surgeryservicesCopaynew = parseFloat(surgeryservicesCopay);

        if (surgeryservicesTotal != "" || surgeryservicesPay != ""
                || surgeryservicesCopay != "") {
            total = parseFloat(total + surgeryservicesTotalnew);
            pay = parseFloat(pay + surgeryservicesPaynew);
            coPay = parseFloat(coPay + surgeryservicesCopaynew);
        }

        var headerList = $("#headerList").html();
        headerList = eval('(' + headerList + ')');
        var billCompCount = (headerList.ol.length) - 5;

        for ( var l = 1; l < billCompCount; l++) {
            var tempBillPay = $("#tdBilldivPay" + l).text();
            if (tempBillPay != null && tempBillPay != undefined
                    && tempBillPay != "NaN" && tempBillPay != "") {
                pay = parseFloat(pay) + parseFloat(tempBillPay);
            }
        }

        for ( var m = 1; m < billCompCount; m++) {
            var tempBillCoPay = $("#tdBilldivCoPay" + m).text();
            if (tempBillCoPay != null && tempBillCoPay != undefined
                    && tempBillCoPay != "NaN" && tempBillCoPay != "") {
                coPay = parseFloat(coPay) + parseFloat(tempBillCoPay);
            }
        }

        for ( var n = 1; n < billCompCount; n++) {
            var tempBillTotal = $("#amt" + n).text();
            if (tempBillTotal != null && tempBillTotal != undefined
                    && tempBillTotal != "NaN" && tempBillTotal != "") {
                total = parseFloat(total) + parseFloat(tempBillTotal);
            }
        }

        var adminCharges = $("#AdminChargesHidden").val();
        var adminChargesType = $("#AdminChrgType").val();

        var adminTotal = 0;
        if (adminCharges != "") {

            if (adminChargesType == "percentage") {
                adminTotal = parseFloat(total * adminCharges / 100);
            } else {
                adminTotal = adminCharges;
            }

            $("#hiddenDefaultAdminCharge").val(adminCharges);
            $("#hiddenDefaultAdminChargeType").val(adminChargesType);

            $("#headdate2").text($("#headdate3").text());
            $("#chr2").text(parseFloat(adminTotal).toFixed(2));
            $("#qty2").text(parseFloat(1).toFixed(2));
            $("#disc2").text(parseFloat(0).toFixed(2));
            $("#amt2").text(parseFloat(adminTotal).toFixed(2));
            $("#tdBilldivPay2").text(parseFloat(0).toFixed(2));
            $("#tdBilldivCoPay2").text(parseFloat(adminTotal).toFixed(2));
        } else {
            var administrativeCharges = billBean.hospAcct[0].adminchr;
            var administrativeChargesType = billBean.hospAcct[0].ChrgType;
            $("#hiddenDefaultAdminCharge").val(billBean.hospAcct[0].adminchr);
            $("#hiddenDefaultAdminChargeType").val(billBean.hospAcct[0].ChrgType);

            if (administrativeChargesType == "percentage") {
                adminTotal = parseFloat(total * administrativeCharges / 100);
            } else {
                adminTotal = administrativeCharges;
            }

            $("#headdate2").text($("#headdate3").text());
            $("#chr2").text(parseFloat(adminTotal).toFixed(2));
            $("#qty2").text(parseFloat(1).toFixed(2));
            $("#disc2").text(parseFloat(0).toFixed(2));
            $("#amt2").text(parseFloat(adminTotal).toFixed(2));
            $("#tdBilldivPay2").text(parseFloat(0).toFixed(2));
            $("#tdBilldivCoPay2").text(parseFloat(adminTotal).toFixed(2));
        }

        var template = "";
        var temp;
        var finalDiscountForPay = 0;
        var finalDiscountForCoPay = 0;
        var finalDiscountForTotal = 0;
        for ( var di = 0; di < billBean.liDisc.length; di++) {

            if (billBean.liDisc[di].pf == 'P') {
                if(billBean.liDisc[di].apprvalStatus == 1){
                finalDiscountForCoPay = finalDiscountForCoPay
                        + billBean.liDisc[di].approvalDiscAmt ;
                finalDiscountForTotal = finalDiscountForTotal
                        + billBean.liDisc[di].approvalDiscAmt ;
                }
            } else if (billBean.liDisc[di].pf == 'S') {
                if(billBean.liDisc[di].apprvalStatus == 1){
                finalDiscountForPay = finalDiscountForPay
                        + billBean.liDisc[di].approvalDiscAmt ;
                finalDiscountForTotal = finalDiscountForTotal
                        + billBean.liDisc[di].approvalDiscAmt ;
                }
            }
        }

        // new calculation
        coPay = coPay + parseFloat(adminTotal);
        total = total + parseFloat(adminTotal);

        $("#totalPay").text(parseFloat(pay).toFixed(2));
        $("#totalCoPay").text(parseFloat(coPay).toFixed(2));

        $("#totalPayDiscount").text(parseFloat(finalDiscountForPay).toFixed(2));
        $("#totalCoPayDiscount").text(
                parseFloat(finalDiscountForCoPay).toFixed(2));

        $("#finalBillTotal").text(parseFloat(total).toFixed(2));

        var categoryDiscount = billBean.bcs7[0].billCatDisc;
		$("#idCategoryDiscount").text("Category Disc(" + categoryDiscount + "%)");
		var categorywiseDisc = (total * (categoryDiscount / 100 ));
		$("#categoryDiscount").text(categorywiseDisc.toFixed(2));
		
		var grandTotal =  total-categorywiseDisc ;
		$("#grandTotal").text(parseFloat(grandTotal).toFixed(2));
        
        var serviceTax = billBean.hospDetail[0].serTax;

        var pharmaDisc = parseFloat($("#pharma_discount").val());
        finalDiscountForTotal = finalDiscountForTotal + pharmaDisc;
        
        // $("#serviceTaxText").text("Tax(" + serviceTax + "%)");
        $("#totalServicTaxText").text("Total+Tax(" + serviceTax + "%)");
        $("#hiddenDefaultServiceTax").val(serviceTax);
        $("#bill_category_discount").val(categoryDiscount);
        
        total = grandTotal - finalDiscountForTotal;
        serviceTax = (serviceTax / 100);
        var serviceTaxPay = pay + (pay * serviceTax);
        var serviceTaxCoPay = coPay + (coPay * serviceTax);
        var serviceTaxTotal = (total) + (total * serviceTax);

        $("#payableServiceTaxTotalPay").text(
                parseFloat(pay - finalDiscountForPay).toFixed(2));
        $("#payableServiceTaxTotalCoPay").text(
                parseFloat(coPay - finalDiscountForCoPay).toFixed(2));

        $("#finalBillTotalServiceTax").text(
                parseFloat(serviceTaxTotal).toFixed(2));

        $("#finalDiscount").text(parseFloat(finalDiscountForTotal).toFixed(2));
        var finalPayable = serviceTaxTotal;
        $("#finalPayable").text(parseFloat(finalPayable).toFixed(2));
    }
    }

/**
 * *******************get Patient DischargeDate*****@author
 * husenbadshah***********
 */
function getDischargeDate() {
	$("#discharge_date").val("");
	$("#discharge_Time").val("");

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var patient_id = pobj1.pi;
	var TreamentID = $("#tid").val(); // By sagar
	var inputs = [];
	inputs.push('action=getPatientDischargeDate');
	inputs.push('patient_id=' + patient_id);
	inputs.push('TreamentID=' + TreamentID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					var DischargeDate = JSON.parse(r);
					setTimeout(
							function() {
								if (DischargeDate.adminchargelist.length > 0) {
									var dischargedate = DischargeDate.adminchargelist[0].dischargedate;
									var admissionDate = DischargeDate.adminchargelist[0].admissionDate;
									if (dischargedate != "null"
											&& dischargedate != " ") {
										var newDate1 = dischargedate.split("_");
										var date = newDate1[0];
										var time = newDate1[1];
										var cal_date = date.split("-");
										var mydate = cal_date[2] + "/"
												+ cal_date[1] + "/"
												+ cal_date[0];
										$("#dischargeDate").val(mydate);

										var cal_time = time.split(":");
										var mytime = cal_time[0] + ":"
												+ cal_time[1];
										$("#discharge_Time").val(mytime);

										$("#tEndDate").html(date+" "+time);
									} else {
										$("#discharge_date").val("");
										$("#discharge_Time").val("");
									}
									if (admissionDate != "null_null"
											&& admissionDate != "") {
										var admsnDate = admissionDate
												.split("_");
										var dt = admsnDate[0];
										var tm = admsnDate[1];
										var admsn_date = dt.split("-");
										var admissionDate = admsn_date[0] + "/"
												+ admsn_date[1] + "/"
												+ admsn_date[2];
										$("#admissionDate").val(admissionDate);

										var admssionTime = tm.split(":");
										var admsnTime = admssionTime[0] + ":"
												+ admssionTime[1];
										$("#admissionTime").val(admsnTime);

										// $("#tEndDate").html(date);
									} else {
										$("#admissionDate").val("");
										$("#admissionTime").val("");
									}
								}
							}, 100);
				}
			});
}

function GetTotalPaybleByTreatId(callfrom) {
	var treatmentId = $("#trid").val();
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/creditNote/getTotalPaybleByTreatId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						// alert(parseFloat(r).toFixed(2));
						if (callfrom == 'current') {
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

function displayTotalRecievedAmountByTreatmentId(callfrom) {
	var treatmentId = $("#trid").val();
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/indentSale/getReceiveAmountByTreatmentId",
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

	var treatmentId = $("#trid").val();
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/indentSale/getPendingAmountByTreatmentId",
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

													$("#iPharmacyTotalAMT")
															.val(amount);
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
											// var pharmacashreturn=0;
											// pharmacashreturn =
											// $("#PharmacyCashReturn").text();
											// alert("pharma
											// return="+pharmacashreturn);
											/*
											 * if(pharmacashreturn != 0 ||
											 * pharmacashreturn != null) {
											 * pharmacashreturn =
											 * $("#PharmacyCashReturn").text(); }
											 * var PharmaPaidminusPharmaReturn =
											 * parseFloat(pharmapaid -
											 * pharmacashreturn).toFixed(2);
											 * if(PharmaPaidminusPharmaReturn <
											 * 0) { PharmaPaidminusPharmaReturn =
											 * PharmaPaidminusPharmaReturn
											 * *(-1); }
											 * $("#PharmacyAdvancePaid").text(PharmaPaidminusPharmaReturn);
											 */
											$("#PharmacyAdvancePaid").text(
													pharmapaid);

											$("#DispatchAmt").hide('hide');
											$("#RecieveAmt").show('show');
										}
									}
								}, 200);
					}
				});
		hospitalPaymentData(treatmentId);
		return true;
	}
}

function getTotalindentDataByTreatmentId(callfrom) {
	var treatmentId = $("#trid").val();
	if (treatmentId != '') {
		// alert(treatmentId);
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/indentSale/getTotalindetDataByTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						var pobj1 = eval('(' + r + ')');
						if (pobj1.length > 0) {
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

function TotalDiscountByPharmacyOnBillByTreatmentId(callfrom) {
	var treatmentId = $("#trid").val();
	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/indentSale/GetTotalDiscountOnBillByTreatmentId",
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

// suraj code for display hospital payment for indent
function hospitalPaymentSum(callfrom) {

	var treatmentId = $("#trid").val();
	// var treatmentId=treatmentId;
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/indentSale/getHospitalPaymentDetailsTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						var amountPaidByIPD = 0;
						var amountRecieveByIPD = 0;
						for ( var i = 0; i < r.length; i++) {

							amountPaidByIPD = amountPaidByIPD
									+ parseFloat(r[i].amountBal);
							amountRecieveByIPD = amountRecieveByIPD
									+ parseFloat(r[i].amountReceive);
						}
						if (callfrom == 'current') {
							$("#sumPayByHospAMT").val(amountPaidByIPD);
							$("#sumPharmaAMTRecievedByHosp").val(
									amountRecieveByIPD);
						} else if (callfrom == 'previous') {
							$("#sumPayByHospAMT").val(amountPaidByIPD);
							$("#sumPharmaAMTRecievedByHosp").val(
									amountRecieveByIPD);
						} else if (callfrom == 'advance') {
							$("#sumPayByHospAMT").val(amountPaidByIPD);
							$("#sumPharmaAMTRecievedByHosp").val(
									amountRecieveByIPD);
						}
					}
				});

		return true;
	} else {
	}
}

/** ******** Start Save Advance Receipt ************************ */
function saveAdvanceReceipt(callFrom) {

	var billID = 0;
	var billtype = "general";
	var previousPendingType = $("#previousPendingType").val();
	if (callFrom == 'credit') {
		billID = $("#ipdBillId").val();
		billtype = "credit";
	} else {
		billID = $("#txtRecNo1").val();
		if (previousPendingType == "current") {
			billtype = "general";
		} else {
			billtype = "credit";
		}
	}

	var amount = $("#txtAmount").val();
	var queryType = $("#queryType1").val();
	var idipd = $("#ipdID").val();
	// var splitamount = amount.split("/-");
	// amount = Math.floor(splitamount[0]);
	var date = "";// $("#bdate").html();
	var heading = $("#seltowards").val();
	var selected = $("#selected").val();

	if (amount == "") {
		alert("Please Enter Amount");
		return false;
	} else if (heading == null) {
		alert("Please Enter Heading");
		return false;
	}

	if (previousPendingType != "current") {
		var pendingAmountDiv = $("#pendingAmountDiv").html();

		var jsonBean = eval('(' + pendingAmountDiv + ')');
		var myObj = previousPendingType.split("_");
		var previousAmt = 0;
		for ( var k = 0; k < jsonBean.listRecMaster.length; k++) {
			var id = jsonBean.listRecMaster[k].idrm;
			if (myObj[0] == id) {
				previousAmt = jsonBean.listRecMaster[k].rval;
				break;
			}
		}

		if (amount != previousAmt) {
			alert("Please enter full previous amount you selected");
			return false;
		}
	}

	var cashAmt = 0;
	var cardAmt = 0;
	var cardNo = 0;
	var cashNCard = 0;
	var bankname = "";

	// rtgs or neft
	var accno = "";
	var ifsccode = "";
	var utrno = ""
	var rtgsamt = "";
	var Rtgsbankname = "";

	var chequeAmt = 0;
	var chequebankname = "";
	var chequeNo = 0;

	var commonAdAmt = 0;
	var modeOfPay = "";

	var $checkbox1 = $('input:checkbox[id=CheckBox1]');
	var $checkbox2 = $('input:checkbox[id=CheckBox2]');
	var $checkbox3 = $('input:checkbox[id=CheckBox3]');
	var $checkbox4 = $('input:checkbox[id=CheckBox4]');

	var commonAdvance_flag = $("#payfromCA").attr("checked") ? true : false;
	//alert(commonAdvance_flag);

	if ($checkbox1.is(':checked') == true || $checkbox2.is(':checked') == true
			|| $checkbox3.is(':checked') == true
			|| $checkbox4.is(':checked') == true) {

		$("#selected").val("yes");

		if ($checkbox1.is(':checked') == true
				&& $checkbox2.is(':checked') == true
				&& $checkbox3.is(':checked') == false
				&& $checkbox4.is(':checked') == false)
			modeOfPay = "cashNCard";
		else if ($checkbox1.is(':checked') == true
				&& $checkbox2.is(':checked') == false
				&& $checkbox3.is(':checked') == false
				&& $checkbox4.is(':checked') == false)
			modeOfPay = "cash";
		else if ($checkbox2.is(':checked') == true
				&& $checkbox1.is(':checked') == false
				&& $checkbox3.is(':checked') == false
				&& $checkbox4.is(':checked') == false)
			modeOfPay = "card";
		else if ($checkbox2.is(':checked') == false
				&& $checkbox1.is(':checked') == false
				&& $checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == false)
			modeOfPay = "cheque";
		else if ($checkbox1.is(':checked') == true
				&& $checkbox2.is(':checked') == false
				&& $checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == false)
			modeOfPay = "cashNCheque";
		else if ($checkbox1.is(':checked') == false
				&& $checkbox2.is(':checked') == true
				&& $checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == false)
			modeOfPay = "cardNCheque";
		else if ($checkbox1.is(':checked') == true
				&& $checkbox2.is(':checked') == true
				&& $checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == false)
			modeOfPay = "cashNCardNCheque";
		/**
		 * ******************************************************rtgs
		 * code***********************************************************
		 */
		else if ($checkbox1.is(':checked') == true
				&& $checkbox2.is(':checked') == false
				&& $checkbox3.is(':checked') == false
				&& $checkbox4.is(':checked') == true)
			modeOfPay = "cashNRTGS";
		else if ($checkbox1.is(':checked') == true
				&& $checkbox2.is(':checked') == true
				&& $checkbox3.is(':checked') == false
				&& $checkbox4.is(':checked') == true)
			modeOfPay = "cashNCardNRTGS";
		else if ($checkbox1.is(':checked') == true
				&& $checkbox2.is(':checked') == true
				&& $checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == true)
			modeOfPay = "cashNCardNChequeNRTGS";
		else if ($checkbox1.is(':checked') == false
				&& $checkbox2.is(':checked') == true
				&& $checkbox3.is(':checked') == false
				&& $checkbox4.is(':checked') == true)
			modeOfPay = "CardNRTGS";
		else if ($checkbox1.is(':checked') == false
				&& $checkbox2.is(':checked') == false
				&& $checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == true)
			modeOfPay = "ChequeNRTGS";
		else if ($checkbox1.is(':checked') == false
				&& $checkbox2.is(':checked') == false
				&& $checkbox3.is(':checked') == false
				&& $checkbox4.is(':checked') == true)
			modeOfPay = "RTGS";
		else if ($checkbox1.is(':checked') == false
				&& $checkbox2.is(':checked') == true
				&& $checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == true)
			modeOfPay = "CardNChequeNRTGS";
		else if ($checkbox1.is(':checked') == true
				&& $checkbox2.is(':checked') == false
				&& $checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == true)
			modeOfPay = "CashNChequeNRTGS";
		/** ******************************cashNRTGS************************************************** */
		if (modeOfPay == 'cashNRTGS') {
			var finalamt = 0;
			var cashrtgs = 0;
			var CashnRtgs;
			var rtgsamount = 0;
			var cashAmount = 0;
			cashAmt = $("#cashAmount").val();
			cashAmount = parseFloat(cashAmt);
			rtgsamt = $("#txtRtgsAmt").val();
			rtgsamount = parseFloat(rtgsamt);
			accno = $("#txtRtgsAccNo").val();
			Rtgsbankname = $("#txtRtgsBankName").val();
			ifsccode = $("#txtRtgsIfscCode").val();
			utrno = $("#txtRtgsUTRNo").val();
			finalamt = $("#txtAmount").val();
			if (rtgsamt == "" || cashAmt == "" || accno == 0
					|| Rtgsbankname == "" || ifsccode == "" || utrno == "") {
				alert("please enter all cash and RTGS related fields!!");
				return false;
			}else if(cashAmt < 0 || rtgsamt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			cashrtgs = (cashAmount + rtgsamount);
			CashnRtgs = parseFloat(cashrtgs);

			if ((parseFloat(CashnRtgs) < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((parseFloat(CashnRtgs) > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}
		/** ******************************cashNCardNRTGS************************************************** */
		if (modeOfPay == 'cashNCardNRTGS') {
			var finalamt = 0;
			var cashcardrtgs = 0;
			;
			var CashnCardnRtgs;
			var rtgsAmount = 0;
			var cardAmount = 0;
			var cashAmount = 0;
			cashAmt = $("#cashAmount").val();
			cashAmount = parseFloat(cashAmt);
			cardAmt = $("#cardAmount").val();
			cardAmount = parseFloat(cardAmt);
			bankname = $("#cardBankName").val();
			cardNo = $("#cardNo").val();

			rtgsamt = $("#txtRtgsAmt").val();
			rtgsAmount = parseFloat(rtgsamt);
			accno = $("#txtRtgsAccNo").val();
			Rtgsbankname = $("#txtRtgsBankName").val();
			ifsccode = $("#txtRtgsIfscCode").val();
			utrno = $("#txtRtgsUTRNo").val();
			finalamt = $("#txtAmount").val();
			if (rtgsamt == "" || cashAmt == "" || cardAmt == "" || accno == 0
					|| Rtgsbankname == "" || bankname == "" || ifsccode == ""
					|| utrno == "") {
				alert("please enter all cash and card and  RTGS related fields!!");
				return false;
			}else if(cashAmt < 0 || rtgsamt < 0 || cardAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			cashcardrtgs = (cashAmount + cardAmount + rtgsAmount);
			CashnCardnRtgs = parseFloat(cashcardrtgs);

			if ((parseFloat(CashnCardnRtgs) < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((parseFloat(CashnCardnRtgs) > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}

		/** ******************************cashNCardNChequeNRTGS************************************************** */
		if (modeOfPay == 'cashNCardNChequeNRTGS') {
			var finalamt = 0;
			var cashcardchequertgs = 0;
			;
			var CashnCardnChequenRtgs;
			var rtgsAmount = 0;
			var cardAmount = 0;
			var cashAmount = 0;
			var chequeAmount = 0;

			cashAmt = $("#cashAmount").val();
			cashAmount = parseFloat(cashAmt);

			cardAmt = $("#cardAmount").val();
			cardAmount = parseFloat(cardAmt);
			bankname = $("#cardBankName").val();
			cardNo = $("#cardNo").val();

			chequeAmt = $("#chequeAmount").val();
			chequeAmount = parseFloat(chequeAmt);
			chequebankname = $("#chequeBankName").val();
			chequeNo = $("#chequeNo").val();

			rtgsamt = $("#txtRtgsAmt").val();
			rtgsAmount = parseFloat(rtgsamt);
			accno = $("#txtRtgsAccNo").val();
			Rtgsbankname = $("#txtRtgsBankName").val();
			ifsccode = $("#txtRtgsIfscCode").val();
			utrno = $("#txtRtgsUTRNo").val();
			finalamt = $("#txtAmount").val();
			if (rtgsamt == "" || chequeAmt == "" || cashAmt == ""
					|| chequebankname == "" || cardAmt == "" || accno == 0
					|| Rtgsbankname == "" || bankname == "" || ifsccode == ""
					|| utrno == "") {
				alert("please enter all cash and card and cheque and RTGS related fields!!");
				return false;
			}else if(cashAmt < 0 || rtgsamt < 0 || cardAmt < 0 || chequeAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			cashcardchequertgs = (cashAmount + cardAmount + chequeAmount + rtgsAmount);
			CashnCardnChequenRtgs = parseFloat(cashcardchequertgs);

			if ((parseFloat(CashnCardnChequenRtgs) < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((parseFloat(CashnCardnChequenRtgs) > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}
		/** ******************************CardNRTGS************************************************** */
		else if (modeOfPay == 'CardNRTGS') {
			var finalamt = 0;
			var cardrtgs = 0;
			var CardnRtgs;
			var rtgsamount = 0;
			var cardAmount = 0;
			cardAmt = $("#cardAmount").val();
			cardAmount = parseFloat(cardAmt);
			bankname = $("#cardBankName").val();
			cardNo = $("#cardNo").val();

			rtgsamt = $("#txtRtgsAmt").val();
			rtgsamount = parseFloat(rtgsamt);
			accno = $("#txtRtgsAccNo").val();
			Rtgsbankname = $("#txtRtgsBankName").val();
			ifsccode = $("#txtRtgsIfscCode").val();
			utrno = $("#txtRtgsUTRNo").val();
			finalamt = $("#txtAmount").val();
			if (rtgsamt == "" || cardAmt == "" || bankname == "" || accno == 0
					|| Rtgsbankname == "" || ifsccode == "" || utrno == "") {
				alert("please enter all card and RTGS related fields!!");
				return false;
			}else if(rtgsamt < 0 || cardAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			cardrtgs = (cardAmount + rtgsamount);
			CardnRtgs = parseFloat(cardrtgs);

			if ((parseFloat(CardnRtgs) < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((parseFloat(CardnRtgs) > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}

		/** ******************************ChequeNRTGS************************************************** */
		else if (modeOfPay == 'ChequeNRTGS') {
			var finalamt = 0;
			var chequertgs = 0;
			var ChequenRtgs;
			var rtgsamount = 0;
			var chequeAmount = 0;
			chequeAmt = $("#chequeAmount").val();
			chequeAmount = parseFloat(chequeAmt);
			chequebankname = $("#chequeBankName").val();
			chequeNo = $("#chequeNo").val();

			rtgsamt = $("#txtRtgsAmt").val();
			rtgsamount = parseFloat(rtgsamt);
			accno = $("#txtRtgsAccNo").val();
			Rtgsbankname = $("#txtRtgsBankName").val();
			ifsccode = $("#txtRtgsIfscCode").val();
			utrno = $("#txtRtgsUTRNo").val();
			finalamt = $("#txtAmount").val();
			if (rtgsamt == "" || chequeAmt == "" || chequebankname == ""
					|| chequeNo == "" || accno == 0 || Rtgsbankname == ""
					|| ifsccode == "" || utrno == "") {
				alert("please enter all cheque and RTGS related fields!!");
				return false;
			}else if(rtgsamt < 0 || chequeAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			chequertgs = (chequeAmount + rtgsamount);
			ChequenRtgs = parseFloat(chequertgs);

			if ((parseFloat(ChequenRtgs) < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((parseFloat(ChequenRtgs) > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}
		/** ******************************RTGS************************************************** */
		if (modeOfPay == 'RTGS') {
			var finalamt = 0;
			var rtgsamount = 0;
			rtgsamt = $("#txtRtgsAmt").val();
			rtgsamount = parseFloat(rtgsamt);
			accno = $("#txtRtgsAccNo").val();
			Rtgsbankname = $("#txtRtgsBankName").val();
			ifsccode = $("#txtRtgsIfscCode").val();
			utrno = $("#txtRtgsUTRNo").val();
			finalamt = $("#txtAmount").val();
			if (rtgsamt == "" || accno == 0 || Rtgsbankname == ""
					|| ifsccode == "" || utrno == "") {
				alert("please enter all RTGS related fields!!");
				return false;
			}else if(rtgsamt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			if ((rtgsamount < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((rtgsamount > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}
		/** ******************************CardNChequeNRTGS************************************************** */
		if (modeOfPay == 'CardNChequeNRTGS') {
			var finalamt = 0;
			var cardchequertgs = 0;
			;
			var CardnChequenRtgs;
			var rtgsAmount = 0;
			var cardAmount = 0;
			var chequeAmount = 0;

			cardAmt = $("#cardAmount").val();
			cardAmount = parseFloat(cardAmt);
			bankname = $("#cardBankName").val();
			cardNo = $("#cardNo").val();

			chequeAmt = $("#chequeAmount").val();
			chequeAmount = parseFloat(chequeAmt);
			chequebankname = $("#chequeBankName").val();
			chequeNo = $("#chequeNo").val();

			rtgsamt = $("#txtRtgsAmt").val();
			rtgsAmount = parseFloat(rtgsamt);
			accno = $("#txtRtgsAccNo").val();
			Rtgsbankname = $("#txtRtgsBankName").val();
			ifsccode = $("#txtRtgsIfscCode").val();
			utrno = $("#txtRtgsUTRNo").val();
			finalamt = $("#txtAmount").val();
			if (rtgsamt == "" || chequeAmt == "" || chequebankname == ""
					|| cardAmt == "" || accno == 0 || Rtgsbankname == ""
					|| bankname == "" || ifsccode == "" || utrno == "") {
				alert("please enter all card and cheque and RTGS related fields!!");
				return false;
			}else if(rtgsamt < 0 || cardAmt < 0 || chequeAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			cardchequertgs = (cardAmount + chequeAmount + rtgsAmount);
			CardnChequenRtgs = parseFloat(cardchequertgs);

			if ((parseFloat(CardnChequenRtgs) < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((parseFloat(CardnChequenRtgs) > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}

		/** ******************************CashNChequeNRTGS************************************************** */
		if (modeOfPay == 'CashNChequeNRTGS') {
			var finalamt = 0;
			var cashchequertgs = 0;
			var CashnChequenRtgs = 0;
			var rtgsAmount = 0;
			var cardAmount = 0;
			var chequeAmount = 0;
			var cashAmount = 0;
			cashAmt = $("#cashAmount").val();
			cashAmount = parseFloat(cashAmt);

			chequeAmt = $("#chequeAmount").val();
			chequeAmount = parseFloat(chequeAmt);
			chequebankname = $("#chequeBankName").val();
			chequeNo = $("#chequeNo").val();

			rtgsamt = $("#txtRtgsAmt").val();
			rtgsAmount = parseFloat(rtgsamt);
			accno = $("#txtRtgsAccNo").val();
			Rtgsbankname = $("#txtRtgsBankName").val();
			ifsccode = $("#txtRtgsIfscCode").val();
			utrno = $("#txtRtgsUTRNo").val();
			finalamt = $("#txtAmount").val();
			if (cashAmt == "" || chequeAmt == "" || chequeNo == ""
					|| chequebankname == "" || rtgsamt == "" || accno == 0
					|| Rtgsbankname == "" || ifsccode == "" || utrno == "") {
				alert("please enter all cash and cheque and RTGS related fields!!");
				return false;
			}else if(cashAmt < 0 || rtgsamt < 0 || chequeAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			cashchequertgs = (cashAmount + chequeAmount + rtgsAmount);
			CashnChequenRtgs = parseFloat(cashchequertgs);

			if ((parseFloat(CashnChequenRtgs) < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((parseFloat(CashnChequenRtgs) > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}
		/**
		 * ****************************************end
		 * rtgs****************************************************************************************
		 */

		else if (modeOfPay == 'cashNCard') {
			var cashcard = 0;
			var cashncard;
			var finalamt = 0;
			var cashAmount = 0;
			var cardAmount = 0;
			cashAmt = $("#cashAmount").val();
			cashAmount = parseFloat(cashAmt);
			cardAmt = $("#cardAmount").val();
			cashNCard = $("#cashNCard").val();
			cardAmount = parseFloat(cardAmt);
			bankname = $("#cardBankName").val();
			cardNo = $("#cardNo").val();
			finalamt = $("#txtAmount").val();
			if (cardAmt == 0 || cardNo == 0 || bankname == "" || cashAmt == "") {
				alert("please enter all fields!!");
				return false;
			}else if(cashAmt < 0 || cardAmt < 0 ){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			cashcard = (cashAmount + cardAmount);
			cashncard = parseFloat(cashcard);

			if (cashncard < finalamt) {
				alert("please fill in the remaining balance");
				return false;
			} else if ((cashncard > finalamt) && cashAmt != 0) {
				alert("Please enter lesser amount!!");
				return false;
			}

		} else if (modeOfPay == 'cash') {
			var finalamt = 0;
			var cashamount;
			finalamt = $("#txtAmount").val();
			cashAmt = $("#cashAmount").val();
			cashamount = parseFloat(cashAmt);

			if (cashAmt == 0) {
				alert("please enter cash amount!!");
				return false;
			}else if(cashAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			if ((cashamount < finalamt) && cashAmt != 0) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((cashamount > finalamt) && cashAmt != 0) {
				alert("Please enter lesser amount!!");
				return false;
			}

		} else if (modeOfPay == 'card') {
			var finalamt = 0;
			var cardamount;
			cardAmt = $("#cardAmount").val();
			bankname = $("#cardBankName").val();
			cardNo = $("#cardNo").val();
			finalamt = $("#txtAmount").val();
			cardamount = parseFloat(cardAmt);

			if (cardAmt == "" || cardNo == 0 || bankname == "") {
				alert("please enter all card amount related fields!!");
				return false;
			}else if(cardAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			if ((cardamount < parseFloat(finalamt))) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((cardamount > parseFloat(finalamt))) {
				alert("Please enter lesser amount!!");
				return false;
			}

		} else if (modeOfPay == 'cheque') {
			chequeAmt = $("#chequeAmount").val();
			chequebankname = $("#chequeBankName").val();
			chequeNo = $("#chequeNo").val();
			finalamt = $("#txtAmount").val();
			chqamount = parseFloat(chequeAmt);

			if (chequeAmt == "" || chequeNo == 0 || chequebankname == "") {
				alert("please enter all Cheque/DD amount related fields!!");
				return false;
			}else if(chequeAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			if ((chqamount < finalamt)) {
				alert("Please fill in the remaining balance!!");
				return false;
			}
			if ((chqamount > finalamt)) {
				alert("Please enter lesser amount!!");
				return false;
			}

		} else if (modeOfPay == 'cashNCheque') {

			cashAmt = $("#cashAmount").val();
			cashAmount = parseFloat(cashAmt);

			chequeAmt = $("#chequeAmount").val();
			chqAmount = parseFloat(chequeAmt);
			chequebankname = $("#chequeBankName").val();
			chequeNo = $("#chequeNo").val();

			finalamt = $("#txtAmount").val();

			if (chequeAmt != 0) {
				if (chequeNo == 0 || chequebankname == "") {
					alert("please enter Cheque No and Bank Name fields!!");
					return false;
				}
				if ((chequeAmount == 0 || chequeNo == 0 || chequebankname == "")
						&& cashAmt == 0) {
					alert("please enter Cheque No and Bank Name fields!!");
					return false;
				}
			}

			if(cashAmt < 0 || chequeAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}
			cashcheque = (cashAmount + chqAmount);
			cashncheque = parseFloat(cashcheque);

			if (parseFloat(cashncheque) < parseFloat(finalamt)) {
				alert("please fill in the remaining balance");
				return false;
			}
			if (parseFloat(cashncheque) > parseFloat(finalamt)
					&& parseFloat(cashncheque) != 0) {
				alert("please enter a lesser amount");
				return false;
			}

		} else if (modeOfPay == 'cardNCheque') {

			cardAmt = $("#cardAmount").val();
			cashNCard = $("#cashNCard").val();
			cardAmount = parseFloat(cardAmt);
			bankname = $("#cardBankName").val();
			cardNo = $("#cardNo").val();

			chequeAmt = $("#chequeAmount").val();
			chqAmount = parseFloat(chequeAmt);
			chequebankname = $("#chequeBankName").val();
			chequeNo = $("#chequeNo").val();

			finalamt = $("#txtAmount").val();

			if (chequeAmt != 0) {
				if (chequeNo == 0 || chequebankname == "") {
					alert("please enter Cheque No and Bank Name fields!!");
					return false;
				}
				if ((chequeAmount == 0 || chequeNo == 0 || chequebankname == "")
						&& cardAmt == 0) {
					alert("please enter Cheque No and Bank Name fields!!");
					return false;
				}
			}
			
			if(cardAmt < 0 || chequeAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}

			cardcheque = (cardAmount + chqAmount);
			cardncheque = parseFloat(cardcheque);

			if (parseFloat(cardncheque) < parseFloat(finalamt)) {
				alert("please fill in the remaining balance");
				return false;
			}
			if (parseFloat(cardncheque) > parseFloat(finalamt)
					&& parseFloat(cardncheque) != 0) {
				alert("please enter a lesser amount");
				return false;
			}

		} else if (modeOfPay == 'cashNCardNCheque') {

			cashAmt = $("#cashAmount").val();
			cashAmount = parseFloat(cashAmt);

			cardAmt = $("#cardAmount").val();
			cashNCard = $("#cashNCard").val();
			cardAmount = parseFloat(cardAmt);
			bankname = $("#cardBankName").val();
			cardNo = $("#cardNo").val();

			chequeAmt = $("#chequeAmount").val();
			chqAmount = parseFloat(chequeAmt);
			chequebankname = $("#chequeBankName").val();
			chequeNo = $("#chequeNo").val();

			finalamt = $("#txtAmount").val();

			if (chequeAmt != 0) {
				if (chequeNo == 0 || chequebankname == "") {
					alert("please enter Cheque No and Bank Name fields!!");
					return false;
				}
				if ((chequeAmount == 0 || chequeNo == 0 || chequebankname == "")
						&& cardAmt == 0) {
					alert("please enter Cheque No and Bank Name fields!!");
					return false;
				}
			}
			if (cardAmt != 0) {
				if (cardNo == 0 || bankname == "") {
					alert("please enter Card No and Bank Name fields!!");
					return false;
				}
				if ((cardAmt == 0 || cardNo == 0 || bankname == "")
						&& cashAmt == 0) {
					alert("please enter Card No and Bank Name fields!!");
					return false;
				}
			}
			
			if(cashAmt < 0 || cardAmt < 0 || chequeAmt < 0){
				alert("Negative value can not be saved!!! ");
				return false;
			}

			cardchequecash = (cardAmount + chqAmount + cashAmount);
			cardnchequencash = parseFloat(cardchequecash);

			if (parseFloat(cardnchequencash) < parseFloat(finalamt)) {
				alert("please fill in the remaining balance");
				return false;
			}

			if (parseFloat(cardnchequencash) > parseFloat(finalamt)
					&& parseFloat(cardnchequencash) != 0) {
				alert("please enter a lesser amount");
				return false;
			}
		}

	} else {
		if (commonAdvance_flag == true) {
			$("#selected").val("yes");
			modeOfPay = "cAdvance";
			commonAdAmt = $("#txtAmount").val();
			var commonadamount = $("#commonadamount").val();
			if (commonAdAmt > parseFloat(commonadamount)) {
				alert("Please Enter Lesser Amount.");
				return false;
			} else if (commonAdAmt == 0) {
				alert("Please Enter Amount.");
				return false;
			}
		} else {
			alert("Please fill Mode of payment Details.");
			return false;
		}
	}

	var selected = $("#selected").val();
	var finalRefund = 0;
	var refundTotal = ($("#refundTotal").text()).trim();

	finalRefund = ($("#finalRefund").text()).trim();
	if (finalRefund == undefined || finalRefund == "") {
		finalRefund = 0;
	}

	if (($('#seltowards').val()).trim() === "Refund") {
		heading = "Refund";
		var txtAmount = parseFloat(($("#txtAmount").val()).trim());
		if (txtAmount > parseFloat(finalRefund)) {
			//alert("You cannot enter amount greater than the refund amount.");
			//return false;
		}
	}
	var outstanding = parseFloat($("#finalOutstanding").text());
	var remainAmount = 0;
	if (heading != "Refund") {
		// alert($("#finalOutstanding").text()+" * "+amount);
		remainAmount = (outstanding - parseFloat(amount));
		// alert(remainAmount);
		// return false;
	}

	var finalPayable = ($("#finalPayable").text()).trim();
	if (finalPayable == undefined || finalPayable == "") {
		finalPayable = 0;
	}

	var finalAdvancePaid = ($("#finalAdvancePaid").text()).trim();
	if (finalAdvancePaid == undefined || finalAdvancePaid == "") {
		finalAdvancePaid = 0;
	}

	var pharmaAdvancePaid = ($("#PharmacyAdvancePaid").text()).trim();
	if (pharmaAdvancePaid == undefined || pharmaAdvancePaid == "") {
		pharmaAdvancePaid = 0;
	}

	var finaltotal = ($("#finalBillTotalServiceTax").text()).trim();
	if (finaltotal == undefined || finaltotal == "") {
		finaltotal = 0;
	}
	var finalDiscount = ($("#finalDiscount").text()).trim();
	if (finalDiscount == undefined || finalDiscount == "") {
		finalDiscount = 0;
	}

	var finalBillTotal = ($("#finalBillTotal").text()).trim();
	if (finalBillTotal == undefined || finalBillTotal == "") {
		finalBillTotal = 0;
	}

	var inputs = [];
	inputs.push('action=saveAdvanceReceipt');
	inputs.push('billID=' + billID);
	inputs.push('advBillId=' + $("#advBillId").val());
	inputs.push('amount=' + amount);
	inputs.push('queryType=' + queryType);
	inputs.push('date=' + date);
	inputs.push('heading=' + heading);
	inputs.push('modeOfPay=' + modeOfPay);
	inputs.push('cashAmt=' + cashAmt);
	inputs.push('cardAmt=' + cardAmt);
	inputs.push('cardNo=' + cardNo);
	inputs.push('chequeAmt=' + chequeAmt);
	inputs.push('chequeNo=' + chequeNo);
	inputs.push('chequebankname=' + chequebankname);
	inputs.push('idipd=' + idipd);

	inputs.push('accno=' + accno);
	inputs.push('ifsccode=' + ifsccode);
	inputs.push('utrno=' + utrno);
	inputs.push('rtgsamt=' + rtgsamt);
	inputs.push('Rtgsbankname=' + Rtgsbankname);

	inputs.push('selected=' + selected);
	inputs.push('bankname=' + bankname);
	inputs.push('comment=' + $("#txtComment").val());
	inputs.push('outstanding=' + outstanding);
	inputs.push('finalBillTotal=' + finalBillTotal);
	inputs.push('remainAmount=' + remainAmount);
	inputs.push('finalPayable=' + finalPayable);
	inputs.push('finalAdvancePaid=' + finalAdvancePaid);
	inputs.push('pharmaAdvancePaid=' + pharmaAdvancePaid);
	inputs.push('finaltotal=' + finaltotal);
	inputs.push('finalDiscount=' + finalDiscount);
	inputs.push('finalRefund=' + refundTotal);
	inputs.push('commonAdvance_flag=' + commonAdvance_flag);
	inputs.push('commonAdAmt=' + commonAdAmt);
	inputs.push('billtype=' + billtype);
	inputs.push('previousPendingType=' + previousPendingType);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r.split(".");
			$("#recNo").html(ajaxResponse[1]);
			alert(ajaxResponse[0]);
			// PrintIPDReceipt();
			newIPDReceipt();
			location.reload(true);
		}
	});
}
/** **************End Save Advance Receipt ********************* */

function saveIpdBillParticular() {

	var serviceHeading = $("#serviceHeading").val();
	var itemid = $("#itemid").val();
	var particularDate = $("#popup_container2").val();
	var particularRate = $("#particularRate").val();
	var particularqty = $("#particularqty").val();
	var particulars = $("#particulars").val();

	// alert(particularqty);
	var particulardisc = $("#particulardisc").val();
	var particularamt = $("#particularamt").val();
	var particularPay = $("#particularPay").val();
	var particularCoPay = $("#particularCoPay").val();
	var ipdBillSlaveTbId = $("#ipdBillSlaveTbId").val();
	var ipdBillId = $("#ipdBillId").val();
	var pathotestType = $("#pathotestType").val();
	var treatmentId = $("#trid").val();
	var DRCTime = $("#timeDR").val();
	var $resultcheckbox = $('input:checkbox[id=resultFlag]');
	var resultflag = "";
	if (serviceHeading == "pathology" || serviceHeading == "investigation") {
		if ($resultcheckbox.is(':checked') == true) {
			resultflag = $("#resultFlag").val();
		} else {
			resultflag = "N";
		}
	}

	var tempDate = particularDate.split("/");
	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var regdate = $("#tStartDate").html();
	var date1 = regdate.split("&nbsp;&nbsp;");
	var rdate = new Date(date1[0]);
	rdate.setHours(0, 0, 0, 0);
	if (addDate.getTime() < rdate.getTime()) {
		alert("Date should not be before registration date!");
		$("#popup_container2").val(today);
		return false;
	}
	
	if (particulardisc == "") {
		particulardisc = 0;
	}
	if (particularPay == "") {
		particularPay = 0;
	}
	if (particularCoPay == "") {
		particularCoPay = 0;
	}

	var inputs = [];
	inputs.push('action=saveIpdBillParticular');
	inputs.push('serviceHeading=' + serviceHeading);
	inputs.push('itemid=' + itemid);
	inputs.push('particulars=' + particulars);
	inputs.push('particularDate=' + particularDate);
	inputs.push('particularRate=' + particularRate);
	inputs.push('particularqty=' + particularqty);
	inputs.push('particulardisc=' + particulardisc);
	inputs.push('particularamt=' + particularamt);
	inputs.push('particularPay=' + particularPay);
	inputs.push('particularCoPay=' + particularCoPay);
	inputs.push('ipdBillSlaveTbId=' + ipdBillSlaveTbId);
	inputs.push('ipdBillId=' + ipdBillId);
	inputs.push('pathotestType=' + pathotestType);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('DRCTime=' + DRCTime);
	inputs.push('resultflag=' + resultflag);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			// alert(r);
			window.location.reload(true);
		}
	});
}

function setEditButtonTemplate() {
	var template = '<button style="line-height: 1.2" id="particularbtn" class="btn btn-xs btn-default" onclick="editIpdBillParticular()"><i class="fa fa-save"></i> Save</button>';
	var temp;
	$("#divSaveEditButton").setTemplate(template);
	$("#divSaveEditButton").processTemplate(temp);
}

function editPerticular() {

	$("#generalId").val(0);
	setEditButtonTemplate();

	$("#serviceHeading").attr("disabled", false);
	$("#particulars").attr("readonly", false);
	$("#popup_container2").attr("disabled", false);
	$("#particularRate").attr("readonly", false);
	$("#particularqty").attr("readonly", false);
	$("#particulardisc").attr("readonly", false);
	$("#particularamt").attr("readonly", false);
	$("#particularPay").attr("readonly", false);
	$("#particularCoPay").attr("readonly", false);
	$("#particularbtn").attr("disabled", false);

	var billComps = $("#billComps").html();
	var billBean = eval('(' + billComps + ')');
	var perticularId = new Array();

	var myObj = "";
	var selectedGroups = new Array();
	$("input[name='ipdBillCheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
		perticularId.push($(this).attr('id'));
	});

	if ((perticularId.length) == 0) {
		alert("Please check the check box...");
		return false;
	}

	if (selectedGroups.length > 1) {
		alert("Please Select Single Particular");
		return false;
	} else {
		// alert(selectedGroups[0]+" "+perticularId[0]);

		var type = perticularId[0].substring(0, 5);
		// alert(perticularId[0].substring(5));
		if (type == "surCo") {
			$("#particularbtn").hide('hide');
			alert("you can not edit these charges from billing");
			return false;
		} else {
			$("#particularbtn").show('show');
		}
		if (type == "trBed") {
			// alert(billBean.hospAcct[0].typeOfBilling);
			if (billBean.hospAcct[0].typeOfBilling == "M") {

				var checkboxIDBed = perticularId[0];

				// normal bed charges
				if (checkboxIDBed.indexOf("_NCB") === -1) { // not found == -1
					for ( var i = 0; i < billBean.bcs4.length; i++) {
						if (selectedGroups[0] == billBean.bcs4[i].id) {
							myObj = billBean.bcs4[i];
						}
					}
					

					 var coPay = (myObj.coPay).toFixed(2);
					 var Pay = (myObj.pay).toFixed(2);
					 var discount = $("#SpecialDisc").val();
					 if (myObj.disComp > 0) {
						 if(discount == 0){
							 coPay = ((myObj.coPay).toFixed(2) - (myObj.disComp).toFixed(2)).toFixed(2);
						 }else{
							 Pay = ((myObj.pay).toFixed(2) - (myObj.disComp).toFixed(2)).toFixed(2);
						 }
					 }
					 
					$("#editPerticularType").val(type);
					$("#editPerticularId").val(myObj.id);

					$("#particulars").val(myObj.nm);
					$("#popup_container2").val(myObj.dt);
					$("#particularRate").val(myObj.rtca);
					$("#particularqty").val(myObj.qty);
					$("#particulardisc").val(myObj.disComp);
					$("#particularamt").val(myObj.amt - myObj.disComp);
					$("#particularPay").val(Pay);
					$("#particularCoPay").val(coPay);
					$("#serviceHeading option:selected").text("Bed Charges");
					$("#particulars").attr('readonly', true);
					$("#particularamt").attr('readonly', true);
					document.getElementById("serviceHeading").disabled = true;
				} else { // nursing charges for bed

					for ( var i = 0; i < billBean.bcs4.length; i++) {
						if (selectedGroups[0] == billBean.bcs4[i].id) {
							myObj = billBean.bcs4[i];
						}
					}
					
					 var nursingchargesCoPay = (myObj.nursingchargesCoPay).toFixed(2);
					 var nursingchargesPay = (myObj.nursingchargesPay).toFixed(2);
					 var discount = $("#SpecialDisc").val();
					 if (myObj.nursingchargesDiscount > 0) {
						 if(discount == 0){
							 nursingchargesCoPay = ((myObj.nursingchargesCoPay).toFixed(2) - (myObj.nursingchargesDiscount).toFixed(2)).toFixed(2);
						 }else{
							 nursingchargesPay = ((myObj.nursingchargesPay).toFixed(2) - (myObj.nursingchargesDiscount).toFixed(2)).toFixed(2);
						 }
					 }
					 
					$("#editPerticularType").val(type + "_NCB");
					$("#editPerticularId").val(myObj.id);

					$("#particulars").val(((myObj.nm)));
					$("#popup_container2").val(myObj.dt);
					$("#particularRate").val(myObj.nursingchargesRate);
					$("#particularqty").val(myObj.nursingchargesQuantity);
					$("#particulardisc").val(myObj.nursingchargesDiscount);
					$("#particularamt").val(
							(myObj.netAmt) - (myObj.nursingchargesDiscount));
					$("#particularPay").val(nursingchargesPay);
					$("#particularCoPay").val(nursingchargesCoPay);
					$("#serviceHeading option:selected").text(
							"Nursing Charges for bed");
					$("#particulars").attr('readonly', true);
					$("#particularamt").attr('readonly', true);
					document.getElementById("serviceHeading").disabled = true;
				}
			}
		} else if (type == "reBed") {
			// alert(billBean.hospAcct[0].typeOfBilling);
			if (billBean.hospAcct[0].typeOfBilling == "M") {
				for ( var i = 0; i < billBean.relBedChr.length; i++) {
					if (selectedGroups[0] == billBean.relBedChr[i].id) {
						myObj = billBean.relBedChr[i];
					}
				}

				 var coPay = (myObj.coPay).toFixed(2);
				 var Pay = (myObj.pay).toFixed(2);
				 var discount = $("#SpecialDisc").val();
				 if (myObj.disComp > 0) {
					 if(discount == 0){
						 coPay = ((myObj.coPay).toFixed(2) - (myObj.disComp).toFixed(2)).toFixed(2);
					 }else{
						 Pay = ((myObj.pay).toFixed(2) - (myObj.disComp).toFixed(2)).toFixed(2);
					 }
				 }
				 
				$("#serviceHeading").val(0);
				$("#editPerticularType").val("trBed");
				$("#editPerticularId").val(myObj.id);

				$("#particulars").val(myObj.nm);
				$("#popup_container2").val(myObj.dt);
				$("#particularRate").val(myObj.rtca);
				$("#particularqty").val(myObj.qty);
				$("#particulardisc").val(myObj.disComp);
				$("#particularamt").val(myObj.amt - myObj.disComp);
				$("#particularPay").val(Pay);
				$("#particularCoPay").val(coPay);
				$("#serviceHeading").val(0);
			}
		} else if (type == "inves") {
			for ( var j = 0; j < billBean.bcs3.length; j++) {
				if (selectedGroups[0] == billBean.bcs3[j].id
						&& billBean.bcs3[j].ct == "invest") {
					myObj = billBean.bcs3[j];
				}
			}
			$("#serviceHeading").val("investigation");
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#particulars").attr('readonly', true);
			document.getElementById("serviceHeading").disabled = true;
			$("#particularamt").attr('readonly', true);

		} else if (type == "Other") {
			for ( var j = 0; j < billBean.bcs3.length; j++) {
				if (selectedGroups[0] == billBean.bcs3[j].id
						&& billBean.bcs3[j].ct == "otherservice") {
					myObj = billBean.bcs3[j];
				}
			}
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#serviceHeading").val("OtherServices");
			document.getElementById("serviceHeading").disabled = true;
			$("#particulars").attr('readonly', true);
			$("#particularamt").attr('readonly', true);
		} else if (type == "physi") {
			for ( var j = 0; j < billBean.bcs3.length; j++) {
				if (selectedGroups[0] == billBean.bcs3[j].id
						&& billBean.bcs3[j].ct == "physio") {
					myObj = billBean.bcs3[j];
				}
			}
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#serviceHeading").val("physiotherapy");
			document.getElementById("serviceHeading").disabled = true;
			$("#particulars").attr('readonly', true);
			$("#particularamt").attr('readonly', true);
		} else if (type == "patho") {
			for ( var j = 0; j < billBean.bcs3.length; j++) {
				if (selectedGroups[0] == billBean.bcs3[j].id
						&& billBean.bcs3[j].ct == "patho") {
					myObj = billBean.bcs3[j];
				}
			}
			$("#serviceHeading").val("pathology");
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#particulars").attr('readonly', true);
			document.getElementById("serviceHeading").disabled = true;
			$("#particularamt").attr('readonly', true);
		} else if (type == "gasmo") {
			for ( var j = 0; j < billBean.oplist[1].length; j++) {
				if (selectedGroups[0] == billBean.oplist[1][j].id
						&& billBean.oplist[1][j].ct == "gas") {
					myObj = billBean.oplist[1][j];
				}
			}
			$("#serviceHeading").val("gasesMonitor");
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#particulars").attr('readonly', true);
			document.getElementById("serviceHeading").disabled = true;
			$("#particularamt").attr('readonly', true);
		} else if (type == "bedsi") {
			for ( var j = 0; j < billBean.oplist[1].length; j++) {
				if (selectedGroups[0] == billBean.oplist[1][j].id
						&& billBean.oplist[1][j].ct == "bedside") {
					myObj = billBean.oplist[1][j];
				}
			}
			$("#serviceHeading").val("gasesMonitorb");
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#particulars").attr('readonly', true);
			document.getElementById("serviceHeading").disabled = true;
			$("#particularamt").attr('readonly', true);
		} else if (type == "instr") {
			for ( var j = 0; j < billBean.oplist[1].length; j++) {
				if (selectedGroups[0] == billBean.oplist[1][j].id
						&& billBean.oplist[1][j].ct == "instru") {
					myObj = billBean.oplist[1][j];
				}
			}
			$("#serviceHeading").val("instruments");
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#particulars").attr('readonly', true);
			document.getElementById("serviceHeading").disabled = true;
			$("#particularamt").attr('readonly', true);
		} else if (type == "hosma") {
			for ( var j = 0; j < billBean.oplist[1].length; j++) {
				if (selectedGroups[0] == billBean.oplist[1][j].id
						&& billBean.oplist[1][j].ct == "ipdConsumable") {
					myObj = billBean.oplist[1][j];
				}
			}

			$("#serviceHeading").val("productName");
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#ipdBillSlaveTbId").val(myObj.id);
			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#particularamt").attr('readonly', true);
		} else if (type == "visit") {
			for ( var j = 0; j < billBean.bcs8.length; j++) {
				if (selectedGroups[0] == billBean.bcs8[j].id) {
					myObj = billBean.bcs8[j];
				}
			}
			document.getElementById('serviceHeading').selectedIndex = 16;
			// document.getElementById("serviceHeading").innerHTML = temp;
			// $("#idTimeDRC").show();
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#particulars").attr('readonly', true);
			$("#particularamt").attr('readonly', true);
			document.getElementById("serviceHeading").disabled = true;
		} else if (type == "pstOp") {
			for ( var j = 0; j < billBean.bcs6.length; j++) {
				if (selectedGroups[0] == billBean.bcs6[j].id
						&& billBean.bcs6[j].ct == "postop") {
					myObj = billBean.bcs6[j];
				}
			}
			$("#serviceHeading").val("postoperation");
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);
			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#particulars").attr('readonly', true);
			document.getElementById("serviceHeading").disabled = true;
			$("#particularamt").attr('readonly', true);
		} else if (type == "pharm") {
			for ( var j = 0; j < billBean.surli.length; j++) {
				if (selectedGroups[0] == billBean.surli[j].id
						&& billBean.surli[j].ct == "MedClinic") {
					myObj = billBean.surli[j];
				}
			}
			$("#serviceHeading").val("Pharmacy");
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);
			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);

			$("#particulars").attr('readonly', true);
			$("#particularamt").attr('readonly', true);
			document.getElementById("serviceHeading").disabled = true;

		} else if (type == "bcomp") {
			var billComp = perticularId[0].substring(5);
			if (billComp == 1) {
				myObj = billBean.bcs6[0];
				$("#editPerticularType").val("inten");
				if (myObj == undefined) {
					$("#editPerticularId").val(0);
					$("#particulars").val("Intencivist");
					$("#popup_container2").val("");
					$("#particularRate").val(0);
					$("#particularqty").val(0);
					$("#particulardisc").val(0);
					$("#particularamt").val(0);
					$("#particularPay").val(0);
					$("#particularCoPay").val(0);
					$("#serviceHeading").val(0);
					$("#particulars").attr('readonly', true);
					$("#particularamt").attr('readonly', true);
					document.getElementById("serviceHeading").disabled = true;

				} else {
					$("#editPerticularId").val(myObj.id);
					$("#particulars").val("Intencivist");
					$("#popup_container2").val(myObj.dt);
					$("#particularRate").val(myObj.rtca);
					$("#particularqty").val(myObj.qty);
					$("#particulardisc").val(myObj.disComp);
					$("#particularamt").val(myObj.amt);
					$("#particularPay").val(myObj.pay);
					$("#particularCoPay").val(myObj.coPay);
					$("#serviceHeading").val(0);
					$("#particulars").attr('readonly', true);
					$("#particularamt").attr('readonly', true);
					document.getElementById("serviceHeading").disabled = true;
				}

			} else if (billComp == 3) {// Registration Charges
				myObj = billBean.bcs2[0];
				$("#editPerticularType").val("reg");
				$("#editPerticularId").val(myObj.id);

				$("#serviceHeading").val("Registration");
				$("#serviceHeading").attr('disabled', true);
				$("#particulars").val("Registration Charges");
				$("#particulars").attr('readonly', true);
				$("#popup_container2").val(myObj.dt);
				$("#particularRate").val(myObj.rtca);
				$("#particularqty").val(myObj.qty);
				$("#particularqty").attr('readonly', true);
				$("#particulardisc").val(myObj.disComp);
				$("#particularamt").val(myObj.amt);
				$("#particularamt").attr('readonly', true);
				$("#particularPay").val(myObj.pay);
				$("#particularCoPay").val(myObj.coPay);

			} else if (billComp == 4) { // MLC Charges
				var mlcCount = billBean.bcs7[0].itemid;
				if(mlcCount > 0){
					myObj = billBean.bcs2[1];
					$("#editPerticularType").val("mlc");
					$("#editPerticularId").val(myObj.id);

					$("#serviceHeading").val("MLC");
					$("#serviceHeading").attr('disabled', true);
					$("#particulars").val("MLC Charges");
					$("#particulars").attr('readonly', true);
					$("#popup_container2").val(myObj.dt);
					$("#particularRate").val(myObj.rtca);
					$("#particularqty").val(myObj.qty);
					$("#particularqty").attr('readonly', true);
					$("#particulardisc").val(myObj.disComp);
					$("#particularamt").val(myObj.amt);
					$("#particularamt").attr('readonly', true);
					$("#particularPay").val(myObj.pay);
					$("#particularCoPay").val(myObj.coPay);
				}else{
					alert("Can't save MLC charges for Non-MLC Patient");
					return false;
				}

			} else if (billComp == 5) { // TPA Charges
				myObj = billBean.bcs2[2];
				$("#editPerticularType").val("tpa");
				$("#editPerticularId").val(myObj.id);

				$("#serviceHeading").val("TPA");
				$("#serviceHeading").attr('disabled', true);
				$("#particulars").val("TPA Charges");
				$("#particulars").attr('readonly', true);
				$("#popup_container2").val(myObj.dt);
				$("#particularRate").val(myObj.rtca);
				$("#particularqty").val(myObj.qty);
				$("#particularqty").attr('readonly', true);
				$("#particulardisc").val(myObj.disComp);
				$("#particularamt").val(myObj.amt);
				$("#particularamt").attr('readonly', true);
				$("#particularPay").val(myObj.pay);
				$("#particularCoPay").val(myObj.coPay);

			} else if (billComp == 6) {
				var headerList = $("#headerList").html();
				headerList = eval('(' + headerList + ')');
				var temp = parseInt(billComp) + 4;

				$("#generalId").val(headerList.ol[temp].od);

				myObj = billBean.bcs2[3];
				$("#editPerticularType").val("opdCh");
				$("#editPerticularId").val(myObj.id);

				$("#serviceHeading").val("OPD");
				$("#serviceHeading").attr('disabled', true);
				$("#particulars").val(headerList.ol[temp].on);
				$("#particulars").attr('readonly', true);
				$("#popup_container2").val(myObj.dt);
				$("#particularRate").val(myObj.iprt);
				$("#particularRate").attr('readonly', true);
				$("#particularqty").val(myObj.qty);
				$("#particularqty").attr('readonly', true);
				$("#particulardisc").val(myObj.disComp);
				$("#particularamt").val(myObj.netAmt);
				$("#particularamt").attr('readonly', true);
				$("#particularPay").val(myObj.pay);
				$("#particularCoPay").val(myObj.coPay);
			} else if (billComp == 2) {

				var headerList = $("#headerList").html();
				headerList = eval('(' + headerList + ')');
				var temp = parseInt(billComp) + 4;
				$("#generalId").val(headerList.ol[temp].od);
				billComp = billComp - 3;
				if (billBean.bcs2.length <= billComp) {
					$("#editPerticularType").val("genCh");
					$("#editPerticularId").val(0);

					$("#particulars").val(headerList.ol[temp].on);
					$("#popup_container2").val(0);
					$("#particularRate").val(0);
					$("#particularqty").val(0);
					$("#particulardisc").val(0);
					$("#particularamt").val(0);
					$("#particularPay").val(0);
					$("#particularCoPay").val(0);
					$("#serviceHeading").val(0);
				} else {
					// alert("You can not update Administrative Charges");
					var r = confirm("Do you want to update administrative charges?");
					if (r == true) {
						$("#iAdminCharges").show('show');
						/*
						 * $("#txtIdAdminCharge").val("");
						 * $("#AdminNarrationHidden").val("");
						 * 
						 * if($("#hiddenDefaultAdminCharge").val() != "") {
						 * $("#txtIdAdminCharge").val($("#hiddenDefaultAdminCharge").val());
						 * //alert($("#hiddenDefaultAdminCharge").val()); }
						 * else{ $("#txtIdAdminCharge").val(adminCharge);
						 * //alert(adminCharge); }
						 */
					} else {
						$("#AdminCharges").hide('hide');
					}

					return false;
					myObj = billBean.bcs2[billComp];
					$("#editPerticularType").val("genCh");
					$("#editPerticularId").val(myObj.id);
					$("#generalId").val(headerList.ol[temp].od);

					$("#particulars").val(headerList.ol[temp].on);
					$("#particulars").attr('readonly', true);
					$("#popup_container2").val(myObj.dt);
					$("#particularRate").val(myObj.iprt);
					$("#particularqty").val(myObj.qty);
					$("#particularqty").attr('readonly', true);
					$("#particulardisc").val(myObj.disComp);
					$("#particularamt").val(myObj.netAmt);
					$("#particularamt").attr('readonly', true);
					$("#particularPay").val(myObj.pay);
					$("#particularCoPay").val(myObj.coPay);
					$("#serviceHeading").val(0);
					for ( var j = 0; j < billBean.bcs1.length; j++) {
						if (selectedGroups[0] == billBean.bcs1[j].id) {
							myObj = billBean.bcs1[j];
						}
					}
					$("#editPerticularType").val(type);
					$("#editPerticularId").val(myObj.id);

					$("#particulars").val(myObj.nm);
					$("#popup_container2").val(myObj.dt);
					$("#particularRate").val(myObj.rtca);
					$("#particularqty").val(myObj.qty);
					$("#particulardisc").val(myObj.disComp);
					$("#particularamt").val(myObj.amt);
					$("#particularPay").val(myObj.pay);
					$("#particularCoPay").val(myObj.coPay);
					$("#serviceHeading").val(0);

					$("#serviceHeading").attr('disabled', true);
				}
			} else {
				var headerList = $("#headerList").html();
				headerList = eval('(' + headerList + ')');
				var temp = parseInt(billComp) + 4;
				$("#generalId").val(headerList.ol[temp].od);
				billComp = billComp - 4;
				for ( var j = 0; j < billBean.bcs2.length; j++) {
					if (headerList.ol[temp].od == billBean.bcs2[j].itemid) {
						myObj = billBean.bcs2[j];
						break;
					}
				}
				if (myObj != "") {
					$("#editPerticularType").val("genCh");
					$("#editPerticularId").val(myObj.id);
					$("#generalId").val(headerList.ol[temp].od);
					$("#particulars").val(headerList.ol[temp].on);
					$("#popup_container2").val(myObj.dt);
					$("#particularRate").val(myObj.rtca);
					$("#particularqty").val(myObj.qty);
					$("#particulardisc").val(myObj.disComp);
					$("#particularamt").val(myObj.netAmt);
					$("#particularPay").val(myObj.pay);
					$("#particularCoPay").val(myObj.coPay);
					$("#serviceHeading").val(0);
					$("#particularamt").attr('readonly', true);
				} else {
					$("#editPerticularType").val("genCh");
					$("#editPerticularId").val(0);
					$("#generalId").val(headerList.ol[temp].od);
					$("#particulars").val(headerList.ol[temp].on);
					$("#popup_container2").val("");
					$("#particularRate").val(0);
					$("#particularqty").val(0);
					$("#particulardisc").val(0);
					$("#particularamt").val(0);
					$("#particularPay").val(0);
					$("#particularCoPay").val(0);
					$("#serviceHeading").val(0);
					$("#particularamt").attr('readonly', true);
				}
			}
		} else if (type == "surSe") {
			for ( var j = 0; j < billBean.oplist[4].length; j++) {
				if (selectedGroups[0] == billBean.oplist[4][j].id) {
					myObj = billBean.oplist[4][j];
				}
			}
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#serviceHeading").val(0);
		} else if (type == "surCo") {
			for ( var j = 0; j < billBean.oplist[3].length; j++) {
				if (selectedGroups[0] == billBean.oplist[3][j].id) {
					myObj = billBean.oplist[3][j];
				}
			}
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#serviceHeading").val(0);
		} else if (type == "OTRen") {
			for ( var j = 0; j < billBean.bcs1.length; j++) {
				if (selectedGroups[0] == billBean.bcs1[j].id) {
					myObj = billBean.bcs1[j];
				}
			}
			$("#editPerticularType").val(type);
			$("#editPerticularId").val(myObj.id);

			$("#particulars").val(myObj.nm);
			$("#popup_container2").val(myObj.dt);
			$("#particularRate").val(myObj.rtca);
			$("#particularqty").val(myObj.qty);
			$("#particulardisc").val(myObj.disComp);
			$("#particularamt").val(myObj.amt);
			$("#particularPay").val(myObj.pay);
			$("#particularCoPay").val(myObj.coPay);
			$("#serviceHeading").val(0);
		} else if (type == "opCha") {
			var number = (perticularId[0]).replace("opCha", "");
			myObj = billBean.oplist[0][(number - 1)];
			$("#editOperationPopUp").show();

			$("#rateSurCh").val(myObj.oc);
			$("#discSurCh").val(myObj.opChD);
			var total1 = parseFloat(myObj.oc) - parseFloat(myObj.opChD);
			$("#totalSurCh").val(total1);
			$("#paySurCh").val(myObj.opChP);
			$("#coPaySurCh").val(myObj.opChCoP);

			$("#rateAssSurCh").val(myObj.oep);
			$("#discAssSurCh").val(myObj.asSuD);
			var total2 = parseFloat(myObj.oep) - parseFloat(myObj.asSuD);
			$("#totalAssSurCh").val(total2);
			$("#payAssSurCh").val(myObj.asSuP);
			$("#coPayAssSurCh").val(myObj.asSuCoP);

			$("#rateAnaeCh").val(myObj.or);
			$("#discAnaeCh").val(myObj.anaeD);
			var total3 = parseFloat(myObj.or) - parseFloat(myObj.anaeD);
			$("#totalAnaeCh").val(total3);
			$("#payAnaeCh").val(myObj.anaeP);
			$("#coPayAnaeCh").val(myObj.anaeCoP);

			$("#ratePrAnaeCh").val(myObj.preAnsChr);
			$("#discPrAnaeCh").val(myObj.preAnaeD);
			var total4 = parseFloat(myObj.preAnsChr)
					- parseFloat(myObj.preAnaeD);
			$("#totalPrAnaeCh").val(total4);
			$("#payPrAnaeCh").val(myObj.preAnaeP);
			$("#coPayPrAnaeCh").val(myObj.preAnaeCoP);

			$("#rateSurInCh").val(myObj.spnm);
			$("#discSurInCh").val(myObj.suInD);
			var total5 = parseFloat(myObj.spnm) - parseFloat(myObj.suInD);
			$("#totalSurInCh").val(total5);
			$("#paySurInCh").val(myObj.suInP);
			$("#coPaySurInCh").val(myObj.suInCoP);
			$("#astSurChrgPercent").val(billBean.hospAcct[0].asschrg);
			if (myObj.surinstruPercent == 0) {
				$("#surInstruChrgPercent").val(billBean.hospDetail[0].surinstr);
			} else {
				$("#surInstruChrgPercent").val(myObj.surinstruPercent);
			}
			if (myObj.anasChrgType = "ASAIV") {
				$("#anaeChrgPercent").val(billBean.hospAcct[0].aneasa);
			} else if (myObj.anasChrgType = "Normal") {
				$("#anaeChrgPercent").val(billBean.hospAcct[0].anenor);
			} else {
				$("#anaeChrgPercent").val(billBean.hospAcct[0].anestand);
			}
		}

	}
	//calculatePerticularCoPay();

}

function editIpdBillParticular() {
	var editPerticularType = $("#editPerticularType").val();
	var editPerticularId = $("#editPerticularId").val();
	var particulars = $("#particulars").val();
	var particularDate = $("#popup_container2").val();
	var particularRate = $("#particularRate").val();
	var particularqty = $("#particularqty").val();
	var particularamt = $("#particularamt").val();
	var particularPay = $("#particularPay").val();
	var particularCoPay = $("#particularCoPay").val();
	var particulardisc = $("#particulardisc").val();
	var generalId = $("#generalId").val();

	var ipdBillId = $("#ipdBillId").val();

	var tempDate = particularDate.split("/");
	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var regdate = $("#tStartDate").html();
	var date1 = regdate.split("&nbsp;&nbsp;");
	var rdate = new Date(date1[0]);
	rdate.setHours(0, 0, 0, 0);
	
	if (addDate.getTime() < rdate.getTime()) {
		alert("Date should not be before admission date!");
		$("#popup_container2").val(today);
		return false;
	}
	
	if (particulardisc == "") {
		particulardisc = 0;
	}
	if (particularPay == "") {
		particularPay = 0;
	}
	if (particularCoPay == "") {
		particularCoPay = 0;
	}

	var inputs = [];
	inputs.push('action=editIpdBillParticular');
	inputs.push('perticularType=' + editPerticularType);
	inputs.push('perticularId=' + editPerticularId);
	inputs.push('particulars=' + particulars);
	inputs.push('particularDate=' + particularDate);
	inputs.push('particularRate=' + particularRate);
	inputs.push('particularqty=' + particularqty);
	inputs.push('particularamt=' + particularamt);
	inputs.push('particularPay=' + particularPay);
	inputs.push('particularCoPay=' + particularCoPay);
	inputs.push('particulardisc=' + particulardisc);
	inputs.push('ipdBillId=' + ipdBillId);
	inputs.push('generalId=' + generalId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload(true);
		}
	});
}

function calculatePerticularTotal() {
	var particularRate = $("#particularRate").val();
	var particularqty = $("#particularqty").val();
	var particulardisc = $("#particulardisc").val();
	if (particularqty == "") {
		$("#particularqty").val(0);
	}
	if (particularRate == "") {
		$("#particularRate").val(0);
	}
	if (particulardisc == "") {
		$("#particulardisc").val(0);
	}
	if (particulardisc > (particularRate * particularqty)) {
		var quantity = $("#particularqty").val();
		if (quantity == 0) {
			// alert("Quantity Cannot Be 0");
			$("#particulardisc").val(0);
			calculatePerticularTotal();
			return false;
		} else {
			alert("Discount Cannot Be Greater Than "
					+ (particularRate * particularqty));
			$("#particulardisc").val(0);
			$("#particularamt").val(particularRate * particularqty);
			$("#particularCoPay").val(particularRate * particularqty);
			return false;
		}
	}
	var particularamt = ((particularRate * particularqty) - particulardisc);
	$("#particularamt").val(particularamt);
	var SpecialDisc = $("#SpecialDisc").val();
	if (SpecialDisc == 0 && ($("#particularPay").val()) == 0) {
		calculatePerticularCoPay();
	} else {
		calculatePerticularPay();
	}
}

function calculatePerticularCoPay() {
	var particularPay = $("#particularPay").val();
	var particularamt = $("#particularamt").val();
	if (particularPay == "" || particularamt == "") {
		return false;
	}
	
	if(particularPay < 0){
		particularPay = 0;
	}else if(isNaN(particularPay) == true){
		particularPay = 0;
	}
	
	var particularCoPay = (particularamt - particularPay);
	$("#particularCoPay").val(particularCoPay);
}

function calculatePerticularPay() {
	var particularCoPay = $("#particularCoPay").val();
	var particularamt = $("#particularamt").val();
	if (particularCoPay == "" || particularamt == "") {
		return false;
	}
	if(particularCoPay < 0){
		particularCoPay = 0;
	}else if(isNaN(particularCoPay) == true){
		particularCoPay = 0;
	}
	
	var particularPay = (particularamt - particularCoPay);
	$("#particularPay").val(particularPay);
}

/**
 * *********update admin charge
 * 
 * @author husenabdshah*******************
 */
function UpdateAdminCharges() {
	var txtChrgType = $("#txtChrgType").val();
	var txtadminChrg = $("#txtadminChrg").val();
	var txtIdNarration = $("#txtIdNarration").val();

	if (txtChrgType == "") {
		alert("Please Enter Administrative Type.");
		SetFocus("txtChrgType");
		return false;

	} else if (txtadminChrg == "") {
		alert("Please Enter Administrative Charges");
		SetFocus("txtadminChrg");
		return false;

	} else if (txtChrgType == "percentage" && txtadminChrg.length > 2) {
		alert("Please Enter Administrative Charges(%) in Two Digit Only ");
		SetFocus("txtadminChrg");
		return false;

	} else if (txtChrgType == "rupee" && txtadminChrg == "") {
		alert("Please Enter Administrative Charges in Rupee(INR)");
		SetFocus("txtadminChrg");
		return false;
	}

	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(txtadminChrg)) {
		alert("Administrative charges should be of digits and a decimal point Only!");
		$("#txtadminChrg").focus();
		return false;
	}

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var patient_id = pobj1.pi;
	var TreamentID = $("#trid").val();
	var inputs = [];
	inputs.push('action=updateAdminCharges');
	inputs.push('txtadminChrg=' + encodeURIComponent(txtadminChrg));
	inputs.push('txtChrgType=' + encodeURIComponent(txtChrgType));
	inputs.push('txtIdNarration=' + txtIdNarration);
	inputs.push('patient_id=' + patient_id);
	inputs.push('TreamentID=' + TreamentID);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload(true);
		}
	});
}

/**
 * Update Discharge Date*
 * 
 * @author husenabdshah***
 */
function UpdateDischargeDate() {
	var txtIddischargeDate = $("#dischargeDate").val();
	var discharge_Time = $("#discharge_Time").val();
	var dischargeNarration = $("#dischargeNarration").val();
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var patient_id = pobj1.pi;
	var TreamentID = $("#trid").val();

	var convertdate;
	if (txtIddischargeDate == "") {
		alert("Please enter discharge date");
		$("#dischargeDate").focus();
		return false;
	} else {
		var newDate = txtIddischargeDate.split("/");
		convertdate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];
	}
	// alert(convertdate);

	var newtime;
	if (discharge_Time == "") {
		alert("Please enter discharge time");
		$("#discharge_Time").focus();
		return false;
	} else {
		newtime = discharge_Time + ":00";
	}

	dtDate = document.getElementById("dischargeDate").value;
	var tempDate = dtDate.split("/");
	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

	var regdate = pobj1.objTreat.treStart;
	var rdate = new Date(regdate);
	rdate.setHours(0, 0, 0, 0);

	if (addDate.getTime() < rdate.getTime()) {
		alert("Date should not be before Admission date!");
		$("#dischargeDate").val(today);
		return false;
	} else if (addDate.getTime() == rdate.getTime()) {
		var regtime = pobj1.objTreat.int;
		var tempTime = regtime.split(":");
		var saveTime = discharge_Time.split(":");

		if (saveTime[0] < tempTime[0]) {
			alert("Time should not be before Admission Time!");
			$("#dischargeDate").val(today);
			return false;
		} else if (saveTime[0] == tempTime[0]) {
			if (saveTime[1] < tempTime[1]) {
				alert("Time should not be before Admission Time!");
				$("#dischargeDate").val(today);
				return false;
			}
		}
	}

	var inputs = [];
	inputs.push('action=UpdateDischargeDate');
	inputs.push('txtIddischargeDate=' + convertdate);
	inputs.push('discharge_Time=' + newtime);
	inputs.push('dischargeNarration=' + dischargeNarration);
	inputs.push('patient_id=' + patient_id);
	inputs.push('TreamentID=' + TreamentID);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload(true);
		}
	});

}
function hideModelAdminCharges() {
	$("#Indent_Sales_pending_data").hide('hide');
	/** ***********iAdminCharges modal************* */
	$("#iAdminCharges").hide('hide');
	/** ************iDischargeDatePopUp modal********** */
	$("#iDischargeDatePopUp").hide('hide');
	document.getElementById("txtDischargeDate").checked = false;
	$("#serviceHeading").val(0);

}

/** ****@author husenbadshah for discharge date***** */
function UpdateDischargeDateFromBilling() {
	var value = $("#txtDischargeDate").val();
	if (value == "DD") {
		/*
		 * var r = confirm("Do you want to update Discharge date?"); if (r ==
		 * true) {
		 */
		$("#iDischargeDatePopUp").show('show');
		/*
		 * } else { $("#iDischargeDatePopUp").hide('hide');
		 * document.getElementById("txtDischargeDate").checked = false;
		 */
	} else {
		$("#iDischargeDatePopUp").hide('hide');
		document.getElementById("txtDischargeDate").checked = false;
	}
}

function GenerateInvoiceNo() {
	var r = confirm("You Want To Generate Invoice Number?");
	if (r == true) {
		var txtTotal = $("#finalBillTotal").html();
		var myObj = $("#divPatId").html();
		// alert(myObj);
		myObj = JSON.parse(myObj);

		var ti = myObj.trid;
		if (txtTotal == undefined) {
		} else {

			var inputs = [];
			inputs.push('action=GenerateInvoiceNo');
			inputs.push('treatmentId=' + ti);
			var str = inputs.join('&');
			// alert(str);
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(result) {
					var msg = result.split("@");
					var invoice = msg[1].split("_");
					alert(msg[0]);
					$("#invoiceNo").html(invoice[1]);
					// window.location = "BillingDashboardForIPD.jsp";
					//location.reload();
				}
			});
		}
	}
}

/**
 * print with date and with PS *
 * 
 * @author husenbadshah
 */
function printIPDDetailedBill() {
	var dischargedate = $("#tEndDate").html();
	var discount = $("#SpecialDisc").val();
	
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		
		var date = dischargedate.split(" ");
		var date1 = date[0].split("-");
		newdate = date1[2] + "/" + date1[1] + "/" + date1[0] + " " + date[1];
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var btnvalue = "";
	btnvalue = $('input[name=billPrintType]:checked').val();
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();

	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	var pharmaDisc = parseFloat($("#pharma_discount").val());

	window.open("IPDDetailedBill.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&date=" + date + "&charge="
			+ charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&dischargedate=" + encodeURIComponent(newdate) + "&billtype="
			+ btnvalue + "&specialityvalue=" + specialityvalue
			+ "&billDateValue=" + billDateValue + "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc) + "&returnANDPaidAMT="
			+ encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));

	$("#iPrintBill").hide('hide');
	document.getElementById('printWithDate').checked = false;
	document.getElementById('PrintWithoutDateBtn').checked = false;
	document.getElementById('printWithPaymentSummeryBtn').checked = false;
	document.getElementById('printWithoutPaymentSummeryBtn').checked = false;
}

/** print without date and with PS****@author husenbadshah* */

function printIPDDetailedBillWithOutDate() {

	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		var date = dischargedate.split(" ");
		var date1 = date[0].split("-");
		newdate = date1[2] + "/" + date1[1] + "/" + date1[0] + " " + date[1];
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var btnvalue = "";
	btnvalue = $('input[name=billPrintType]:checked').val();
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	var pharmaDisc = parseFloat($("#pharma_discount").val());

	window.open("IPDDetailedBillPrint.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&date=" + date + "&charge="
			+ charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&dischargedate=" + encodeURIComponent(newdate) + "&billtype="
			+ btnvalue + "&specialityvalue=" + specialityvalue
			+ "&billDateValue=" + billDateValue + "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc) + "&returnANDPaidAMT="
			+ encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));

	$("#iPrintBill").hide('hide');
	document.getElementById('printWithDate').checked = false;
	document.getElementById('PrintWithoutDateBtn').checked = false;
	document.getElementById('printWithPaymentSummeryBtn').checked = false;
	document.getElementById('printWithoutPaymentSummeryBtn').checked = false;
}

/** print With date and without Payment Summery****@author husenbadshah* */

function printIPDDetailedBillWithPaymentSummery() {
	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		var date = dischargedate.split(" ");
		var date1 = date[0].split("-");
		newdate = date1[2] + "/" + date1[1] + "/" + date1[0] + " " + date[1];
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var btnvalue = "";
	btnvalue = $('input[name=billPrintType]:checked').val();
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	var pharmaDisc = parseFloat($("#pharma_discount").val());

	window.open("IPDDetailedBillWithDateNotPS.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&date=" + date + "&charge="
			+ charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&dischargedate=" + encodeURIComponent(newdate) + "&billtype="
			+ btnvalue + "&specialityvalue=" + specialityvalue
			+ "&billDateValue=" + billDateValue + "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc) + "&returnANDPaidAMT="
			+ encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));

	$("#iPrintBill").hide('hide');
	document.getElementById('printWithDate').checked = false;
	document.getElementById('PrintWithoutDateBtn').checked = false;
	document.getElementById('printWithPaymentSummeryBtn').checked = false;
	document.getElementById('printWithoutPaymentSummeryBtn').checked = false;
}

/** print Without date and without Payment Summery****@author husenbadshah* */

function printIPDDetailedBillWithoutPaymentSummery() {
	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		var date = dischargedate.split(" ");
		var date1 = date[0].split("-");
		newdate = date1[2] + "/" + date1[1] + "/" + date1[0] + " " + date[1];
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var btnvalue = "";
	btnvalue = $('input[name=billPrintType]:checked').val();
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("IPDDetailedBillWithoutPaymentSummery.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&date=" + date + "&charge="
			+ charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&dischargedate=" + encodeURIComponent(newdate) + "&billtype="
			+ btnvalue + "&specialityvalue=" + specialityvalue
			+ "&billDateValue=" + billDateValue + "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc) + "&returnANDPaidAMT="
			+ encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));

	$("#iPrintBill").hide('hide');
	document.getElementById('printWithDate').checked = false;
	document.getElementById('PrintWithoutDateBtn').checked = false;
	document.getElementById('printWithPaymentSummeryBtn').checked = false;
	document.getElementById('printWithoutPaymentSummeryBtn').checked = false;
}

/**
 * * print with date and payment Amount * * *
 * 
 * @author Amrut **
 */

function printIPDDetailedBillwithDateAndPayableAmount() {
	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		var date = dischargedate.split(" ");
		var date1 = date[0].split("-");
		newdate = date1[2] + "/" + date1[1] + "/" + date1[0] + " " + date[1];
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var btnvalue = "";
	btnvalue = $('input[name=billPrintType]:checked').val();
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();

	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	var pharmaDisc = parseFloat($("#pharma_discount").val());

	window.open("IPDDetailedBillWithDatePayableAmount.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&date=" + date + "&charge="
			+ charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&dischargedate=" + encodeURIComponent(newdate) + "&billtype="
			+ btnvalue + "&specialityvalue=" + specialityvalue
			+ "&billDateValue=" + billDateValue + "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc) + "&returnANDPaidAMT="
			+ encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));

	$("#iPrintBill").hide('hide');
	document.getElementById('printWithDate').checked = false;
	document.getElementById('PrintWithoutDateBtn').checked = false;
	document.getElementById('printWithPaymentSummeryBtn').checked = false;
	document.getElementById('printWithoutPaymentSummeryBtn').checked = false;
}

/**
 * * print without date and payment Amount * * *
 * 
 * @author Amrut **
 */

function printIPDDetailedBillwithoutDateAndPayableAmount() {
	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		var date = dischargedate.split(" ");
		var date1 = date[0].split("-");
		newdate = date1[2] + "/" + date1[1] + "/" + date1[0] + " " + date[1];
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var btnvalue = "";
	btnvalue = $('input[name=billPrintType]:checked').val();
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();

	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	var pharmaDisc = parseFloat($("#pharma_discount").val());

	window.open("IPDDetailedBillWithoutDatePayableAmount.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&date=" + date + "&charge="
			+ charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&dischargedate=" + encodeURIComponent(newdate) + "&billtype="
			+ btnvalue + "&specialityvalue=" + specialityvalue
			+ "&billDateValue=" + billDateValue + "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc) + "&returnANDPaidAMT="
			+ encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));

	$("#iPrintBill").hide('hide');
	document.getElementById('printWithDate').checked = false;
	document.getElementById('PrintWithoutDateBtn').checked = false;
	document.getElementById('printWithPaymentSummeryBtn').checked = false;
	document.getElementById('printWithoutPaymentSummeryBtn').checked = false;

}

function printIPDSummaryBill() {
	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		var date = dischargedate.split(" ");
		var date1 = date[0].split("-");
		newdate = date1[2] + "/" + date1[1] + "/" + date1[0] + " " + date[1];
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();

	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("IPDSummaryBillPrint.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&date=" + date + "&charge="
			+ charge + "&serviceTaxTotalPay=" + serviceTaxTotalPay
			+ "&serviceTaxTotalCoPay=" + serviceTaxTotalCoPay + "&finalRefund="
			+ finalRefund + "&nursingChargesBedString="
			+ nursingChargesBedString + "&PharmacyAdvancePaid="
			+ encodeURIComponent(PharmacyAdvancePaid) + "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate)
			+ "&pharmaDisc=" + encodeURIComponent(pharmaDisc)
			+ "&returnANDPaidAMT=" + encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));
}

/**
 * Previous print with date and with PS *
 * 
 * @author AmrutPatil
 */
function previousIPDDetailedBill() {
	var billNO;
	var dischargedate = $("#tEndDate").html();
	
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		newdate = dischargedate;
	} else {
		newdate = "";
	}

	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	billNO = $("#invoiceNo").html();
	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	// var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	if (PharmacyAdvancePaid == "") {
		PharmacyAdvancePaid = 0;
	}
	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("PreviousIPDDetailedBill.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&billNO=" + billNO + " &date="
			+ date + "&charge=" + charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&pharmaDisc=" + encodeURIComponent(pharmaDisc)
			+ "&specialityvalue=" + specialityvalue + "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate)
			+ "&returnANDPaidAMT=" + encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="+ encodeURIComponent(pharmaAMTrecievedByHosp));
	// + "&dischargedate=" + encodeURIComponent(newdate));

	$("#iPrintBillFrPrev").hide('hide');
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDateBtn').checked = false;
	document.getElementById('prevPrintWithPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
}

/** Previous print without date and with PS****@author AmrutPatil* */

function previousPrintIPDDetailedBillWithOutDate() {

	var billNO;
	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		newdate = dischargedate;
	} else {
		newdate = "";
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	billNO = $("#invoiceNo").html();
	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	// var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("PreviousIPDDetailedBillPrint.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&billNO=" + billNO + " &date="
			+ date + "&charge=" + charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&pharmaDisc=" + encodeURIComponent(pharmaDisc)
			+ "&specialityvalue=" + specialityvalue + "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate) 
			+ "&returnANDPaidAMT=" + encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp=" + encodeURIComponent(pharmaAMTrecievedByHosp));
	// + "&dischargedate=" + encodeURIComponent(newdate));

	$("#iPrintBillFrPrev").hide('hide');
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDateBtn').checked = false;
	document.getElementById('prevPrintWithPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
}

/** Previous print With date and without Payment Summery****@author AmrutPatil* */

function previousPrintIPDDetailedBillWithPaymentSummery() {
	var billNO;
	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		newdate = dischargedate;
	} else {
		newdate = "";
	}
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDRecievedAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTrecievedByHosp);

	billNO = $("#invoiceNo").html();
	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	// var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("PreviousIPDDetailedBillWithDateNotPS.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&billNO=" + billNO + " &date="
			+ date + "&charge=" + charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&pharmaDisc=" + encodeURIComponent(pharmaDisc)
			+ "&specialityvalue=" + specialityvalue + "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate) 
			+ "&returnANDRecievedAMT="
			+ encodeURIComponent(returnANDRecievedAMT));
	// + "&dischargedate=" + encodeURIComponent(newdate));

	$("#iPrintBillFrPrev").hide('hide');
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDateBtn').checked = false;
	document.getElementById('prevPrintWithPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
}

/**
 * Previous print Without date and without Payment Summery****@author
 * AmrutPatil*
 */

function previousPrintIPDDetailedBillWithoutPaymentSummery() {
	var billNO;

	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		newdate = dischargedate;
	} else {
		newdate = "";
	}
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDRecievedAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTrecievedByHosp);

	billNO = $("#invoiceNo").html();
	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	// var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("PreviousIPDDetailedBillWithoutPaymentSummery.jsp?"
			+ "patientobj="
			+ encodeURIComponent(patientobj)
			+ "&billNO="
			+ billNO
			+ " &date="
			+ date
			+ "&charge="
			+ charge
			+ "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay)
			+ "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay)
			+ "&finalRefund="
			+ encodeURIComponent(finalRefund)
			+ "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid="
			+ encodeURIComponent(PharmacyAdvancePaid)
			+ "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc)
			+ "&specialityvalue="
			+ specialityvalue
			+ "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate)
			+ "&returnANDRecievedAMT="
			+ encodeURIComponent(returnANDRecievedAMT));
	// + "&dischargedate=" + encodeURIComponent(newdate));

	$("#iPrintBillFrPrev").hide('hide');
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDateBtn').checked = false;
	document.getElementById('prevPrintWithPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
}

function printPreviousIPDSummaryBill() {

	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		newdate = dischargedate;
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}
	billNO = $("#invoiceNo").html();
	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();

	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("PreviousIPDSummaryBillPrint.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&billNO=" + billNO

			/* + "&advbillobj=" + encodeURIComponent(advbillobj) */

			+ "&date=" + date + "&charge=" + charge + "&serviceTaxTotalPay="
			+ serviceTaxTotalPay + "&serviceTaxTotalCoPay="
			+ serviceTaxTotalCoPay + "&finalRefund=" + finalRefund
			+ "&nursingChargesBedString=" + nursingChargesBedString
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&pharmaDisc=" + encodeURIComponent(pharmaDisc)
			+ "&specialityvalue=" + specialityvalue + "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate) 
			+ "&returnANDPaidAMT=" + encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp=" + encodeURIComponent(pharmaAMTrecievedByHosp));
}

/**
 * * Previous print with date and payable amount ***
 * 
 * @author Amrut Patil
 */

function previousPrintIPDDetailedBillwithDateAndPayableAmount() {
	var billNO;
	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		newdate = dischargedate;
	} else {
		newdate = "";
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	billNO = $("#invoiceNo").html();
	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	// var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	if (PharmacyAdvancePaid == "") {
		PharmacyAdvancePaid = 0;
	}
	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("PreviousIPDDetailedBillWithDateAndPayableAmount.jsp?"
			+ "patientobj="
			+ encodeURIComponent(patientobj)
			+ "&billNO="
			+ billNO
			+ " &date="
			+ date
			+ "&charge="
			+ charge
			+ "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay)
			+ "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay)
			+ "&finalRefund="
			+ encodeURIComponent(finalRefund)
			+ "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid="
			+ encodeURIComponent(PharmacyAdvancePaid)
			+ "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc)
			+ "&specialityvalue="
			+ specialityvalue
			+ "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate)
			+ "&returnANDPaidAMT="
			+ encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));
	// + "&dischargedate=" + encodeURIComponent(newdate));

	$("#iPrintBillFrPrev").hide('hide');
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDateBtn').checked = false;
	document.getElementById('prevPrintWithPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
}

/**
 * * Previous print without date and payable amount ***
 * 
 * @author Amrut Patil
 */

function previousPrintIPDDetailedBillwithoutDateAndPayableAmount() {
	var billNO;

	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		newdate = dischargedate;
	} else {
		newdate = "";
	}
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDRecievedAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTrecievedByHosp);

	billNO = $("#invoiceNo").html();
	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	// var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("PreviousIPDDetailedBillWithoutDateAndPayableAmount.jsp?"
			+ "patientobj="
			+ encodeURIComponent(patientobj)
			+ "&billNO="
			+ billNO
			+ " &date="
			+ date
			+ "&charge="
			+ charge
			+ "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay)
			+ "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay)
			+ "&finalRefund="
			+ encodeURIComponent(finalRefund)
			+ "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid="
			+ encodeURIComponent(PharmacyAdvancePaid)
			+ "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc)
			+ "&specialityvalue="
			+ specialityvalue
			+ "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate)
			+ "&returnANDRecievedAMT="
			+ encodeURIComponent(returnANDRecievedAMT));
	// + "&dischargedate=" + encodeURIComponent(newdate));

	$("#iPrintBillFrPrev").hide('hide');
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDateBtn').checked = false;
	document.getElementById('prevPrintWithPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
}

// @Code by - Kavita Bhangale @Code for - bed change from billing

function showbedchangepopup() {

	$("#serviceHeading").attr("disabled", false);
	$("#particulars").attr("readonly", false);
	$("#popup_container2").attr("disabled", false);
	$("#particularRate").attr("readonly", false);
	$("#particularqty").attr("readonly", false);
	$("#particulardisc").attr("readonly", false);
	$("#particularamt").attr("readonly", false);
	$("#particularPay").attr("readonly", false);
	$("#particularCoPay").attr("readonly", false);
	$("#particularbtn").attr("disabled", false);

	var billComps = $("#billComps").html();
	var billBean = eval('(' + billComps + ')');
	var perticularId = new Array();

	var myObj = "";
	var selectedGroups = new Array();
	$("input[name='ipdBillCheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
		perticularId.push($(this).attr('id'));
	});

	if ((perticularId.length) == 0) {
		alert("Please check the check box...");
		return false;
	}

	if (selectedGroups.length > 1) {
		alert("Please Select Single Particular");
		return false;
	} else {
		var type = perticularId[0].substring(0, 5);

		if (type == "trBed") {
			var checkboxIDBed = perticularId[0];
			if (checkboxIDBed.indexOf("_NCB") === -1) { // not found == -1
				for ( var i = 0; i < billBean.bcs4.length; i++) {
					if (selectedGroups[0] == billBean.bcs4[i].id) {
						myObj = billBean.bcs4[i];
					}
				}
				if(myObj.st == "Y"){
					$("#editPerticularId").val(myObj.id);
					$("#bedChangeShiftPopup").modal('show');	
				}else{
					alert("Patient is not present on this bed. Please select another bed for edit.");
					return false;
				}
			}else{
				alert("Please select Bed for edit.");
				return false;
			}
		}
	}
	
}

function closeBedChangeShiftPopup() {
	$("#bedChangeShiftPopup").modal('hide');
}

function setBillableBed() {
	var radBillableBed = $("input[name='radBillableBed']:checked").val();
	
	if ($("#radBillableBed3").prop("checked")) {
		
		if (!$("input[name='bedEditType']:checked").val()) {
			alert("Please select Bed Edit Type.");
			$("#radBillableBed3").prop('checked', false);
			return false;
		}else{
			$("#divWardType").show();
		}
	} else{
		$("#radBillableBed3").prop('checked', false);
		$("#divWardType").hide();
	}
};

var wardTypeSelectIDUI = "<option value='0'>--Select--</option>"
		+ "{#foreach $T.htli as htli}"
		+ "<option id='1ht{$T.htli.idht}' value='{$T.htli.idht}'>{$T.htli.htnm}</option>"
		+ "{#/for}</select>";

var wardTypeSelectIDUIBB = "<select id='wardType2' class='form-control input-SmallText' onchange='if (this.selectedIndex) setHallTypeSelectIDBB(this.value);'><option value='0'>--Select--</option>{#foreach $T.htli as htli} <option id='1ht{$T.htli.idht}' value='{$T.htli.idht}'>{$T.htli.htnm}</option>{#/for}</select>";

function getallHallType(type) {
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}
	count = 1;
	var inputs = [];
	inputs.push('action=fetchHallType');
	inputs.push('corporateId=' + sid);
	inputs.push('type=' + type);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		global : false,

		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');

			// Kavita Bhangale
			if (type == 'ipd_billing') {
				$("#wardType").setTemplate(wardTypeSelectIDUI);
				$("#wardType").processTemplate(pobj1);
			}

			// billable bed selection
			$("#billableWardType").setTemplate(wardTypeSelectIDUI);
			$("#billableWardType").processTemplate(pobj1);
		}
	});
};

function getBedAva(hallID) {

	var inputs = [];
	inputs.push('action=GetBedAva');
	inputs.push('hallID=' + hallID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BedsServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		global : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#allBedObj").html(ajaxResponse);
		}
	});
}

function setHallTypeSelectID(wardID, callFrom) {
	// alert(wardID);
	var ajaxResponse = $("#allBedObj").html();
	myArray = JSON.parse(ajaxResponse);
	var hallTypeString = "<option id='' value='0'>--select--</option>";

	for ( var i = 0; i < myArray.hl.length; i++) {

		if (myArray.hl[i].ht == wardID)
			hallTypeString = hallTypeString + "<option id='' value='"
					+ myArray.hl[i].hi + "'>" + myArray.hl[i].hn + "</option>";
	}

	var sample;
	if(callFrom == "samebed"){
		$("#hallType").setTemplate(hallTypeString);
		$("#hallType").processTemplate(sample);
	}else{
		$("#billableHallType").setTemplate(hallTypeString);
		$("#billableHallType").processTemplate(sample);
	}
};

function setAvailableBeds(value,type)
{
	var ajaxResponse = $("#allBedObj").html();
	myArray = JSON.parse(ajaxResponse);
	var hallTypeString = "<option id='' value='0'>--select--</option>";

	for ( var i = 0; i < myArray.hl.length; i++) {

		if (myArray.hl[i].hi == value) {

			for ( var j = 0; j < myArray.hl[i].bl.length; j++) {
				if (myArray.hl[i].bl[j].ba == "4") {
					hallTypeString = hallTypeString + "<option id='' value='"
							+ myArray.hl[i].bl[j].bi + "'> Bed No. " + myArray.hl[i].bl[j].bdnm
							+ "</option>";
				}
			}
		}
	}
	var sample;
	if(type == "sameBed"){
	$("#bedName").setTemplate(hallTypeString);
	$("#bedName").processTemplate(sample);
	}
}

function saveBedEditDetails(){
	
	var bedEditType = "";
	bedEditType = $('input[name=bedEditType]:checked').val();
	
	if(bedEditType == "" || bedEditType == null || bedEditType == undefined){
		alert("Please select Bed Edit Type.");
		return false;
	}
	
	var hallType = $("#wardType").val();
	if(hallType == 0 || hallType == null || hallType == "" || hallType == undefined){
		alert("Please select Ward Name");
		return false;
	}
	var hallID = $("#hallType").val();
	if(hallID == 0 || hallID == null || hallID == "" || hallID == undefined){
		alert("Please select Hall Name.");
		return false;
	}
	
	var bedNo = $("#bedName").val();
	if(bedNo == 0 || bedNo == null || bedNo == "" || bedNo == undefined){
		alert("Please select Bed No.");
		return false;
	}
	
	var perticularId = $("#editPerticularId").val();
	var trid = $("#trid").val();
	var SpecialDisc = $("#SpecialDisc").val();
	var radBillableBed = "sameBed";
	 
	var billableWardType = 0;
	var billableHallType = 0;
	
	if ($("#radBillableBed3").prop("checked")) {
		var billableWardType = $("#billableWardType").val();
		var billableHallType = $("#billableHallType").val();
		radBillableBed = $("input[name='radBillableBed']:checked").val();
		if(billableWardType == 0){
			alert("Please select Billable Ward Name.");
			return false;
		}
		if(billableHallType == 0){
			alert("Please select Billable Hall Name.");
			return false;
		}
	}else{
		billableWardType = 0;
		billableHallType = 0;
		radBillableBed = "sameBed";
	}
	
	var isolation = $("input[name='isolation']:checked").val();
	var isolationFlag = 0;
	if(isolation == "isolation"){
		isolationFlag = 1;
	}else{
		isolationFlag = 0;
	}
	
	var inputs = [];
	inputs.push('action=saveBedEditDetailsFromBilling');
	inputs.push('hallType=' + hallType);
	inputs.push('hallID=' + hallID);
	inputs.push('bedNo=' + bedNo);
	inputs.push('perticularId=' + perticularId);
	inputs.push('trid=' + trid);
	inputs.push('SpecialDisc=' + SpecialDisc);
	inputs.push('bedEditType=' + bedEditType);
	inputs.push('radBillableBed=' + radBillableBed);
	inputs.push('billableWardType=' + billableWardType);
	inputs.push('billableHallType=' + billableHallType);
	inputs.push('isolation=' + isolationFlag);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		global : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var ajaxResponse = r;
			alert(ajaxResponse);
			$("#bedChangeShiftPopup").modal('hide');
			location.reload(true);
		}
	});
}

//@Code by - Amrut Patil @Code for - Cost Estimation 
function getSpecificChargesForEstimation(){
	var chargesForEstimation = ($('input:radio[name=Charges]:checked').val());
	if(chargesForEstimation == undefined){
		alert("Please Select Normal Charges Or Corporate Charges");
		return false;
	}
}

function setAddTemplateForCostEstimation(type){
	var corporateId = 0 ;
	var chargesForEstimation = ($('input:radio[name=Charges]:checked').val());
	if(chargesForEstimation == "normalCharges"){
		corporateId = 0 ;
		$("#sponsoredType").val("select");
		$("#companyName").val("");
		$("#sponseredName").val("");
	}else{
		 corporateId = $("#sponseredName").val();
		if(corporateId == undefined){
			 corporateId = 0 ;
		 }
	}
	var autoType;
	var auto;
	$("#particulars").val("");
	$("#particularRate").val("");
	$("#particularqty").val("");
	$("#particularamt").val("");
	$("#idAllHallType").val(0);
	$("#idAllHallName").val(0);
	$("#idForHallNameLableForInvAndPatho").show();
	$("#idForHallNameOFInvestAndPathoTest").show();
	$("#idForParticularsTd").show();
	$("#idForParticularsLable").show();
	$("#particulars").attr("readonly", false);
	$("#particularRate").attr("readonly", false);
	$("#particularqty").attr("readonly", false);
	$("#particularamt").attr("readonly", false);
	
	var resultData = [];
	var hallid = $("#idAllHallNameOFInvestAndPathoTest").val();
	var data = $("#serviceHeadingForCostEstimation").val();
	if (data == 0) {
		$("#idForHallTypeLable").hide();
		$("#idForHallType").hide();
		$("#idForHallNameLable").hide();
		$("#idForHallName").hide();
		$("#idForOpertionNameOfTD").hide();
		$("#idForOperationNameLable").hide();
		$("#idForHallNameLableForInvAndPatho").hide();
		$("#idForHallNameOFInvestAndPathoTest").hide();
		$("#idAllHallType").val(0);
		$("#idAllHallName").val(0);
		$("#particulars").attr("readonly", false);
		$("#particularRate").attr("readonly", false);
		$("#particularqty").attr("readonly", false);
		$("#particularamt").attr("readonly", false);
		return false;
	}else if (data == "DRC") {
		$("#idForParticularsTd").show();
		$("#idForParticularsLable").show();
		$("#idForHallTypeLable").show();
		$("#idForHallType").show();
		$("#idForOpertionNameOfTD").hide();
		$("#idForOperationNameLable").hide();
		$("#idForHallNameLableForInvAndPatho").hide();
		$("#idForHallNameOFInvestAndPathoTest").hide();
		$("#particularRate").attr("readonly", false);
		$("#particularqty").attr("readonly", false);
		$("#particularamt").attr("readonly", false);
	} else if(data == "Intensivist"){
		$("#idForHallTypeLable").show();
		$("#idForHallType").show();
		$("#idForHallNameLable").hide();
		$("#idForHallName").hide();
		$("#idForParticularsTd").hide();
		$("#idForParticularsLable").hide();
		$("#idForOpertionNameOfTD").hide();
		$("#idForOperationNameLable").hide();
		$("#idForHallNameLableForInvAndPatho").hide();
		$("#idForHallNameOFInvestAndPathoTest").hide();
		$("#particulars").attr("readonly", true);
		$("#particulars").val("");
	} else if(data == "bedCharges"){
		$("#idForHallTypeLable").show();
		$("#idForHallType").show();
		$("#idForHallNameLable").show();
		$("#idForHallName").show();
		$("#idForParticularsTd").hide();
		$("#idForParticularsLable").hide();
		$("#idForOpertionNameOfTD").hide();
		$("#idForOperationNameLable").hide();
		$("#idForHallNameLableForInvAndPatho").hide();
		$("#idForHallNameOFInvestAndPathoTest").hide();
		$("#particulars").attr("readonly", true);
		$("#particulars").val("");
	} else if(data == "nursingCharges"){
		$("#idForHallTypeLable").show();
		$("#idForHallType").show();
		$("#idForHallNameLable").hide();
		$("#idForHallName").hide();
		$("#idForParticularsTd").hide();
		$("#idForParticularsLable").hide();
		$("#idForOpertionNameOfTD").hide();
		$("#idForOperationNameLable").hide();
		$("#idForHallNameLableForInvAndPatho").hide();
		$("#idForHallNameOFInvestAndPathoTest").hide();
		$("#particulars").attr("readonly", true);
		$("#particulars").val("");
	} else if(data == "OperationCharges"){
		$("#idForParticularsTd").show();
		$("#idForParticularsLable").show();
		$("#idForHallTypeLable").show();
		$("#idForHallType").show();
		$("#idForHallNameLable").hide();
		$("#idForHallName").hide();
		$("#idForParticularsTd").hide();
		$("#idForParticularsLable").hide();
		$("#idForHallNameLableForInvAndPatho").hide();
		$("#idForHallNameOFInvestAndPathoTest").hide();
		$("#idForOpertionNameOfTD").show();
		$("#idForOperationNameLable").show();
		getAllOperationNameForCostEstimation();
	}
	if(data == "Registration" || data == "MLC" || data == "TPA" || data == "postoperation"){
		auto = "costEst" ;
		$("#idForParticularsTd").show();
		$("#idForParticularsLable").show();
		$("#idForHallTypeLable").hide();
		$("#idForHallType").hide();
		$("#idForHallNameLable").hide();
		$("#idForHallName").hide();
		$("#idForOpertionNameOfTD").hide();
		$("#idForOperationNameLable").hide();
		$("#idForHallNameLableForInvAndPatho").hide();
		$("#idForHallNameOFInvestAndPathoTest").hide();
		var inputs = [];
		inputs.push('auto=' + auto);
		inputs.push('data=' + data);
		inputs.push('corporateId=' + corporateId);
		inputs.push('hallid=' + hallid);
		var str = inputs.join('&');
		
		jQuery
		.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AutoSuggetionServlet",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				if(data == "Registration"){
					$("#particulars").attr("readonly", true);
					$("#particulars").val("");
					$("#particularRate").val(ajaxResponse);
					$("#particularqty").val(1);
					$("#particularamt").val(1 * ajaxResponse);
					if(corporateId == 0){
						$("#coPayValue").val(1 * ajaxResponse);
					}else{
						$("#PayValue").val(1 * ajaxResponse);
					}
				}else if(data == "MLC"){
					$("#particulars").attr("readonly", true);
					$("#particulars").val("");
					$("#particularRate").val(ajaxResponse);
					$("#particularqty").val(1);
					$("#particularamt").val(1 * ajaxResponse);
					if(corporateId == 0){
						$("#coPayValue").val(1 * ajaxResponse);
					}else{
						$("#PayValue").val(1 * ajaxResponse);
					}
				}else if(data == "TPA"){
					$("#particulars").attr("readonly", true);
					$("#particulars").val("");
					$("#particularRate").val(ajaxResponse);
					$("#particularqty").val(1);
					$("#particularamt").val(1 * ajaxResponse);
					if(corporateId == 0){
						$("#coPayValue").val(1 * ajaxResponse);
					}else{
						$("#PayValue").val(1 * ajaxResponse);
					}
				}else if(data == "postoperation"){
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1] + "@#@" + arrValue[2]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
					}

					setTimeout(
							function() {
								$('#particulars').typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("#particulars").data('typeahead').source = resultData;
							}, 0);
					
				function displayResult(item) {
								var arrItem =(item.value).split("@#@");
								$("#particularRate").val(arrItem[1]);
								$("#particularqty").val(1);
								$("#particularamt").val(arrItem[1] * 1);
								if(corporateId == 0){
									$("#coPayValue").val(arrItem[1]);
								}else{
									$("#PayValue").val(arrItem[1]);
								}
					}
				}
			}
		});
		} else{
			if(data == "pathology" || data == "investigation" || data == "gasesMonitorb" || data == "gasesMonitor" 
				|| data == "instruments" || data == "physiotherapy" || data == "OtherServices" || data == "productName"){
				if(hallid == 0){
			alert("Please Select the Hall Name First");
			}
		}
			if(data == "physiotherapy"){
				$("#idForHallNameLableForInvAndPatho").show();
				$("#idForHallNameOFInvestAndPathoTest").show();
			}
			if (data == "pathology" || data == "investigation") {
				$("#idForHallNameLableForInvAndPatho").show();
				$("#idForHallNameOFInvestAndPathoTest").show();
				$("#idForHallName").hide();
				$("#idForHallTypeLable").hide();
				$("#idForParticularsTd").show();
				$("#idForParticularsLable").show();
				$("#idForHallType").hide();
				$("#idForOpertionNameOfTD").hide();
				$("#idForOperationNameLable").hide();
				$("#particulars").attr("readonly", false);
				$("#particularRate").attr("readonly", false);
				$("#particularqty").attr("readonly", false);
				$("#particularamt").attr("readonly", false);
			}
			if (data == "productName") {
				data = "ipdConsumable";
				auto = 'ipdBill';
				$("#idForParticularsTd").show();
				$("#idForParticularsLable").show();
				$("#idForHallTypeLable").hide();
				$("#idForHallType").hide();
				$("#idForHallNameLable").hide();
				$("#idForHallName").hide();
				$("#idForOpertionNameOfTD").hide();
				$("#idForOperationNameLable").hide();
				$("#idForHallNameLableForInvAndPatho").show();
				$("#idForHallNameOFInvestAndPathoTest").show();
			} else if (data == "gasesMonitor") {
				auto = 'ipdBill';
				autoType = 'g';
				$("#idForParticularsTd").show();
				$("#idForParticularsLable").show();
				$("#idForHallTypeLable").hide();
				$("#idForHallType").hide();
				$("#idForHallNameLable").hide();
				$("#idForHallName").hide();
				$("#idForOpertionNameOfTD").hide();
				$("#idForOperationNameLable").hide();
				$("#idForHallNameLableForInvAndPatho").show();
				$("#idForHallNameOFInvestAndPathoTest").show();
			} else if (data == "instruments") {
				data = "instruments";
				auto = 'ipdBill';
				autoType = 'i';
				$("#idForParticularsTd").show();
				$("#idForParticularsLable").show();
				$("#idForHallTypeLable").hide();
				$("#idForHallType").hide();
				$("#idForHallNameLable").hide();
				$("#idForHallName").hide();
				$("#idForOpertionNameOfTD").hide();
				$("#idForOperationNameLable").hide();
				$("#idForHallNameLableForInvAndPatho").show();
				$("#idForHallNameOFInvestAndPathoTest").show();
			} else if (data == "gasesMonitorb") {
				data = "gasesMonitor";
				auto = 'ipdBill';
				autoType = 'b';
				$("#idForParticularsTd").show();
				$("#idForParticularsLable").show();
				$("#idForHallTypeLable").hide();
				$("#idForHallType").hide();
				$("#idForHallNameLable").hide();
				$("#idForHallName").hide();
				$("#idForOpertionNameOfTD").hide();
				$("#idForOperationNameLable").hide();
				$("#idForHallNameLableForInvAndPatho").show();
				$("#idForHallNameOFInvestAndPathoTest").show();
			} else if (data == "DRC") {
				data = "DRC";
				auto = 'ipdBill';
				autoType = 'd';
			} else if (data == "OtherServices") {
				data = "OtherServices";
				auto = 'ipdBill';
				autoType = 'd';
				$("#idForParticularsTd").show();
				$("#idForParticularsLable").show();
				$("#idForHallTypeLable").hide();
				$("#idForHallType").hide();
				$("#idForHallNameLable").hide();
				$("#idForHallName").hide();
				$("#idForOpertionNameOfTD").hide();
				$("#idForOperationNameLable").hide();
				$("#idForHallNameLableForInvAndPatho").show();
				$("#idForHallNameOFInvestAndPathoTest").show();
			} else {
				auto = 'ipdBill';
			}
			var findingName = $("#particulars").val();
			var inputs = [];
			inputs.push('auto=' + auto);
			inputs.push('data=' + data);
			inputs.push('letter=' + findingName);
			inputs.push('autoType=' + autoType);
			inputs.push('corporateId=' + corporateId);
			inputs.push('hallid=' + hallid);
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "AutoSuggetionServlet",
						timeout : 1000 * 60 * 15,
						cache : false,
						error : function() {
							alert('error');
						},
						success : function(r) {
							ajaxResponse = r;
						//	alert(ajaxResponse);
							var availableTags = [];
							availableTags = ajaxResponse.split("\n");
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("_");
								var idValue = (arrValue[1] + "@#@" + arrValue[2]
										+ "@#@" + arrValue[3]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});
							}
							setTimeout(
									function() {
										$('#particulars').typeahead({
											source : resultData,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayResult,
											scrollBar : true
										});
										 $("#particulars").data('typeahead').source = resultData;
									}, 0);
						}
					});
			function displayResult(item) {
				var arrItem = (item.value).split("@#@");
				var serviceHeading = $("#serviceHeadingForCostEstimation").val();
				if (serviceHeading == "DRC") {
					$("#itemid").val(arrItem[0]);
					$("#idForHallNameLable").hide();
					$("#idForHallName").hide();
				} else if (serviceHeading == "pathology"
						|| serviceHeading == "gasesMonitor"
						|| serviceHeading == "gasesMonitorb"
						|| serviceHeading == "instruments") {
					if (item.text == undefined) {
						alert("Please Enter Valid Test...");
						$("#particulars").val("");
						return false;
					} else {
						var charges = arrItem[2].split("---");
						$("#particularRate").val(arrItem[1]);
						$("#particularqty").val(1);
						$("#particularamt").val(arrItem[1]);
						$("#pathotestType").val(charges[0]);
						if(corporateId == 0){
							$("#coPayValue").val(charges[2]);
						}else{
							$("#PayValue").val(charges[1]);
							$("#coPayValue").val(charges[2]);
						}
					}
				} else if (serviceHeading == "investigation"
						|| serviceHeading == "physiotherapy"
						|| serviceHeading == "OtherServices"
						|| serviceHeading == "productName") {
					if (item.text == undefined) {
						alert("Please Enter Valid Test...");
						$("#particulars").val("");
						return false;
					} else {
						var charges = arrItem[1].split("---");
						$("#particularRate").val(charges[0]);
						$("#particularqty").val(1);
						$("#particularamt").val(charges[0]);
						if(corporateId == 0){
							$("#coPayValue").val(charges[2]);
						}else{
							$("#PayValue").val(charges[1]);
							$("#coPayValue").val(charges[2]);
						}
					}
				}else {
					if (item.text == undefined) {
						alert("Please Enter Valid Test...");
						$("#particulars").val("");
						return false;
					} else {
						$("#particularRate").val(arrItem[1]);
						$("#particularqty").val(1);
						$("#particularamt").val(arrItem[1]);
						$("#PayValue").val(0);
						$("#coPayValue").val(0);
					}
					}
				$("#particulardisc").val(0);
				}
			}
}

function createRowForEstimation(type){
	var index = parseInt($('#divEstimation tr').length) + 1;
	var rowCount = 1;
	var divContent="";
	var totalCostEstimation = $("#totalCostEstimation").val();
	var totalPayCostEstimation = $("#totalPayCostEstimation").val();
	var totalCoPayCostEstimation = $("#totalCoPayCostEstimation").val();
	var adminCharges = $("#hiddenAdminCharges").val();
	var serviceCharges = $("#hiddenServiceCharges").val();
	var serviceHeading = $("#serviceHeadingForCostEstimation").val();
	var HallType = $( "#idAllHallType option:selected" ).text();
	var OpertionName = $( "#idAllOpertionName option:selected" ).text();
	var serviceHeadingName = $( "#serviceHeadingForCostEstimation option:selected" ).text();
		if(type != "admin" && type != "service"){
		if(serviceHeadingName == "-select-"){
			alert("Please , Select The Service Heading First");
			$("#serviceHeadingForCostEstimation").focus();
			return false;
			}
		}else{
			if(type == "admin"){
				serviceHeadingName = "Admin Charges";
			}else{
				serviceHeadingName = "Service Charges";
			}
		}
	var particulars = $("#particulars").val();
	var ParticularsRate = $("#particularRate").val();
	if(ParticularsRate == 0){
		ParticularsRate = 0 ;
	}
	var ParticularsQty = $("#particularqty").val();
	if(ParticularsQty == 0){
		ParticularsQty = 0 ;
	}
	var ParticularsTotal =$("#particularamt").val();
	if(ParticularsTotal == 0){
		ParticularsTotal = 0;
	}
	var PayValue =$("#PayValue").val();
	if(PayValue == 0){
		PayValue = 0;
	}
	var coPayValue =$("#coPayValue").val();
	if(coPayValue == 0){
		coPayValue = 0;
	}
	var hiddenRowCount = document.getElementById("RowCount");
	 rowCount = hiddenRowCount.value;
	if (rowCount != 0) {
		var costEstimationRow = $("#txtCostEstimationRow" + rowCount + "").val();

		if (costEstimationRow == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;
	if( serviceHeading == "OperationCharges"){
		index = rowCount;
		var chargesObj = $("#operationChargeDetails").html();
		operationObj = eval('(' + chargesObj + ')');
		var surCharge = operationObj.ol[0].oc;
		var surCharge_pay = operationObj.ol[0].opChP;
		var surCharge_copay = operationObj.ol[0].opChCoP;
		//	1  Surgeon Charges
		divContent = divContent+'<tr id="Estimation'+rowCount+'"><td style="margin-left: 15px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index++
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="Operation Charges('+HallType+'-'+OpertionName+')">'
				+ "Operation Charges"+'('+HallType+'-'+OpertionName+')'
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id="Surgeon Charges">'
				+ "Surgeon Charges "
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1  ParticularsRateClass center" id="'+surCharge+'">'
				+ surCharge
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="'+ParticularsQty+'">'
				+ ParticularsQty
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+surCharge+'">'
				+ surCharge
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+surCharge_pay+'">'
				+ surCharge_pay
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+surCharge_copay+'">'
				+ surCharge_copay
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount + '" /></td></tr>';
		$("#addRowCount").val(i);
		i++;
		totalCostEstimation = +totalCostEstimation + +surCharge + +(operationObj.ol[0].asSuD * 1);
		totalPayCostEstimation = +totalPayCostEstimation + +surCharge_pay +(operationObj.ol[0].asSuP * 1);
		totalCoPayCostEstimation = +totalCoPayCostEstimation + +surCharge_copay +(operationObj.ol[0].asSuCoP * 1);

		// 2 Assistant Surgeon Charges
		rowCount++;
		divContent =divContent +'<tr id="Estimation'+rowCount+'"><td style="margin-left: 10px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index++
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="Operation Charges('+HallType+'-'+OpertionName+')">'
				+ "Operation Charges"+'('+HallType+'-'+OpertionName+')'
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id="Assistant Surgeon Charges">'
				+ "Assistant Surgeon Charges "
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1 ParticularsRateClass center" id="'+operationObj.ol[0].asSuD+'">'
				+ operationObj.ol[0].asSuD
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="'+ParticularsQty+'">'
				+ ParticularsQty
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+(operationObj.ol[0].asSuD * 1)+'">'
				+ (operationObj.ol[0].asSuD * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+(operationObj.ol[0].asSuP * 1)+'">'
				+ (operationObj.ol[0].asSuP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+(operationObj.ol[0].asSuCoP * 1)+'">'
				+ (operationObj.ol[0].asSuCoP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount + '" /></td></tr>';
		$("#addRowCount").val(i);
		i++;
		totalCostEstimation = +totalCostEstimation + +(operationObj.ol[0].anaeD * 1);
		totalPayCostEstimation = +totalPayCostEstimation + +(operationObj.ol[0].anaeP * 1);
		totalCoPayCostEstimation = +totalCoPayCostEstimation + +(operationObj.ol[0].anaeCoP * 1);
		
		// 3 Anaesthesia Normal Charges
		rowCount++;
		divContent =divContent+ '<tr id="Estimation'+rowCount+'"><td style="margin-left: 10px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index++
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="Operation Charges('+HallType+'-'+OpertionName+')">'
				+ "Operation Charges"+'('+HallType+'-'+OpertionName+')'
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id="Anaesthesia Normal Charges">'
				+ " Anaesthesia Normal Charges"
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1 ParticularsRateClass center" id="'+operationObj.ol[0].anaeD+'">'
				+ operationObj.ol[0].anaeD
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="'+ParticularsQty+'">'
				+ ParticularsQty
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+( operationObj.ol[0].anaeD * 1)+'">'
				+ ( operationObj.ol[0].anaeD * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+(operationObj.ol[0].anaeP * 1)+'">'
				+ (operationObj.ol[0].anaeP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+(operationObj.ol[0].anaeCoP * 1)+'">'
				+ (operationObj.ol[0].anaeCoP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount + '" /></td></tr>';
		$("#addRowCount").val(i);
		i++;
		totalCostEstimation = +totalCostEstimation + +(operationObj.ol[0].preAnaeD * 1);
		totalPayCostEstimation = +totalPayCostEstimation + +(operationObj.ol[0].preAnaeP * 1);
		totalCoPayCostEstimation = +totalCoPayCostEstimation + +(operationObj.ol[0].preAnaeCoP * 1);
		
		// 4  Preanaesthesia Charges
		rowCount++;
		divContent = divContent+'<tr id="Estimation'+rowCount+'"><td style="margin-left: 10px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index++
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="Operation Charges('+HallType+'-'+OpertionName+')">'
				+ "Operation Charges"+'('+HallType+'-'+OpertionName+')'
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id="Preanaesthesia Charges" >'
				+ "Preanaesthesia Charges"
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1 ParticularsRateClass center" id="'+operationObj.ol[0].preAnaeD+'">'
				+  operationObj.ol[0].preAnaeD
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="'+ParticularsQty+'">'
				+ ParticularsQty
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+(operationObj.ol[0].preAnaeD * 1)+'">'
				+ (operationObj.ol[0].preAnaeD * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+(operationObj.ol[0].preAnaeP * 1)+'">'
				+ (operationObj.ol[0].preAnaeP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+(operationObj.ol[0].preAnaeCoP * 1)+'">'
				+ (operationObj.ol[0].preAnaeCoP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount + '" /></td></tr>';
		$("#addRowCount").val(i);
		i++;
		totalCostEstimation = +totalCostEstimation + +(operationObj.ol[0].suInD * 1);
		totalPayCostEstimation = +totalPayCostEstimation + +(operationObj.ol[0].suInP * 1);
		totalCoPayCostEstimation = +totalCoPayCostEstimation + +(operationObj.ol[0].suInCoP * 1);
		
		// 5  Surgeon Instruments Charges
		rowCount++;
		divContent = divContent+'<tr id="Estimation'+rowCount+'"><td style="margin-left: 10px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index++
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="Operation Charges('+HallType+'-'+OpertionName+')">'
				+ "Operation Charges"+'('+HallType+'-'+OpertionName+')'
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id="Surgeon Instruments Charges" >'
				+ "Surgeon Instruments Charges"
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1 ParticularsRateClass center" id="'+operationObj.ol[0].suInD+'">'
				+  operationObj.ol[0].suInD
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="'+ParticularsQty+'">'
				+ ParticularsQty
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+( operationObj.ol[0].suInD * 1)+'">'
				+ ( operationObj.ol[0].suInD * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+(operationObj.ol[0].suInP * 1)+'">'
				+ (operationObj.ol[0].suInP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+( operationObj.ol[0].suInCoP * 1)+'">'
				+ ( operationObj.ol[0].suInCoP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount + '" /></td></tr>';
		$("#addRowCount").val(i);
		i++;
		totalCostEstimation = +totalCostEstimation + +(operationObj.ol[0].ottheatreDisc * 1 );
		totalPayCostEstimation = +totalPayCostEstimation + +(operationObj.ol[0].ottheatreP * 1 );
		totalCoPayCostEstimation = +totalCoPayCostEstimation + +(operationObj.ol[0].ottheatreCoP * 1 );
		
		
		// 6  OT Charges
		rowCount++;
		divContent = divContent+'<tr id="Estimation'+rowCount+'"><td style="margin-left: 10px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index++
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="Operation Charges('+HallType+'-'+OpertionName+')">'
				+ "Operation Charges"+'('+HallType+'-'+OpertionName+')'
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id="OT Charges" >'
				+ "OT Charges"
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1 ParticularsRateClass center" id="'+operationObj.ol[0].ottheatreDisc+'">'
				+ operationObj.ol[0].ottheatreDisc
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="'+ParticularsQty+'">'
				+ ParticularsQty
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+(operationObj.ol[0].ottheatreDisc * 1)+'">'
				+ (operationObj.ol[0].ottheatreDisc * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+(operationObj.ol[0].ottheatreP * 1 )+'">'
				+ (operationObj.ol[0].ottheatreP * 1 )
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+(operationObj.ol[0].ottheatreCoP * 1)+'">'
				+ (operationObj.ol[0].ottheatreCoP * 1)
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount+ '" /></td></tr>';
		
		$("#addRowCount").val(i);
		i++;
		
		$("#divEstimation").append(divContent);
		$("#RowCount").val(rowCount);
		rowCount++;
		 $("#totalCostEstimation").val(totalCostEstimation);
		 $("#totalPayCostEstimation").val(totalPayCostEstimation);
		 $("#totalCoPayCostEstimation").val(totalCoPayCostEstimation);
	}else if(adminCharges != 0){
		rowId = "Estimation" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		x.setAttribute('style', 'margin-top: 0px');
		document.getElementById("divEstimation").appendChild(x);
		document.getElementById(rowId).innerHTML = '<td style="margin-left: 10px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="Admin Charges">'
				+ "Admin Charges"
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id="">'
				+ " "
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1 ParticularsRateClass center" id="'+adminCharges+'">'
				+ adminCharges
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="1">'
				+ "1"
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+adminCharges+'">'
				+ adminCharges
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+PayValue+'">'
				+ PayValue
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+adminCharges+'">'
				+ adminCharges
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount + '" /></td>';
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(i);
		i++;
		 totalCostEstimation = +totalCostEstimation + +adminCharges;
		$("#totalCostEstimation").val(totalCostEstimation);
		totalCoPayCostEstimation = +totalCoPayCostEstimation + +adminCharges;
		$("#totalCoPayCostEstimation").val(totalCoPayCostEstimation);
		totalPayCostEstimation = +totalPayCostEstimation + +PayValue;
		$("#totalPayCostEstimation").val(totalPayCostEstimation);
	}else if(serviceCharges != "0"){
		rowId = "Estimation" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		x.setAttribute('style', 'margin-top: 0px');
		document.getElementById("divEstimation").appendChild(x);
		document.getElementById(rowId).innerHTML = '<td style="margin-left: 10px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="Service Tax %">'
				+ "Service Tax"
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id=" ">'
				+ " "
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1 ParticularsRateClass center" id="'+serviceCharges+'">'
				+ serviceCharges
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="1">'
				+ "1"
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+serviceCharges+'">'
				+ serviceCharges
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+PayValue+'">'
				+ PayValue
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+serviceCharges+'">'
				+ serviceCharges
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount + '" /></td>';
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(i);
		i++;
		 totalCostEstimation = +totalCostEstimation + +serviceCharges;
		$("#totalCostEstimation").val(totalCostEstimation);
		totalCoPayCostEstimation = +totalCoPayCostEstimation + +serviceCharges;
		$("#totalCoPayCostEstimation").val(totalCoPayCostEstimation);
		totalPayCostEstimation = +totalPayCostEstimation + +PayValue;
		$("#totalPayCostEstimation").val(totalPayCostEstimation);
	}else{
		rowId = "Estimation" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		x.setAttribute('style', 'margin-top: 0px');
		document.getElementById("divEstimation").appendChild(x);
		document.getElementById(rowId).innerHTML = '<td style="margin-left: 10px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
				+ index
				+ '</label></td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 serviceType center" id="'+serviceHeadingName+'">'
				+ serviceHeadingName
				+ '</td>'
				+ '<td style="margin-left: 10px;" class="col-md-3-1 particularsClass center" id="'+particulars+'">'
				+ particulars
				+ '</td>'
				+ '<td style="height: 10px;margin-left: 10px;" class="col-md-1-1 ParticularsRateClass center" id="'+ParticularsRate+'">'
				+ ParticularsRate
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsQtyClass center" id="'+ParticularsQty+'">'
				+ ParticularsQty
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 ParticularsTotalClass center" id="'+ParticularsTotal+'">'
				+ ParticularsTotal
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 PayValue center" id="'+PayValue+'">'
				+ PayValue
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 coPayValue center" id="'+coPayValue+'">'
				+ coPayValue
				+ '</td>'
				+ '<td style="height: 10px;" class="col-md-1-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkboxForEstimation'
				+ rowCount + '" /></td>';
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(i);
		i++;
		 totalCostEstimation = +totalCostEstimation + +ParticularsTotal;
		$("#totalCostEstimation").val(totalCostEstimation);
		totalCoPayCostEstimation = +totalCoPayCostEstimation + +coPayValue;
		$("#totalCoPayCostEstimation").val(totalCoPayCostEstimation);
		totalPayCostEstimation = +totalPayCostEstimation + +PayValue;
		$("#totalPayCostEstimation").val(totalPayCostEstimation);
	}
	if(isNaN(totalCostEstimation)){
		totalCostEstimation = 0;
	}
	if(isNaN(totalCoPayCostEstimation)){
		totalCoPayCostEstimation = 0;
	}
	if(isNaN(totalPayCostEstimation)){
		totalPayCostEstimation = 0;
	}
	$("#totalCostEstimation").val(totalCostEstimation);
	$("#totalCoPayCostEstimation").val(totalCoPayCostEstimation);
	$("#totalPayCostEstimation").val(totalPayCostEstimation);
	$("#serviceHeadingForCostEstimation").val(0);
	$("#particulars").val("");
	$("#particularRate").val(0);
	$("#particularqty").val(0);
	$("#particularamt").val(0);
	$("#PayValue").val(0);
	$("#coPayValue").val(0);
	$("#idForParticularsTd").show();
	$("#idForParticularsLable").show();
	$("#idForOpertionNameOfTD").hide();
	$("#idForOperationNameLable").hide();
	$("#idForHallTypeLable").hide();
	$("#idForHallType").hide();
	$("#idForHallNameLable").hide();
	$("#idForHallName").hide();
	$("#idAllHallType").val(0);
	$("#idAllHallName").val(0);
	$("#idAllOpertionName").val(0);
	$("#hiddenAdminCharges").val(0);
	$("#hiddenServiceCharges").val(0);
	$("#particulars").data('typeahead').source = null;
}

function removeRowForEstimation(){
	var totalCostEstimation = $("#totalCostEstimation").val();
	var totalCoPayCostEstimation = $("#totalCoPayCostEstimation").val();
	var totalPayCostEstimation = $("#totalPayCostEstimation").val();
	
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;
	var allValues = [];
	for ( var n = 1; n <= rowCount; n++) {
		var $radios = $('input:checkbox[name=checkboxForEstimation' + n + ']');
		if ($radios.is(':checked') == true) {
			allValues.push($radios.val());
			var total = $("#Estimation"+n+" .ParticularsTotalClass").attr('id');
			var payValue = $("#Estimation"+n+" .PayValue").attr('id');
			var coPayValue = $("#Estimation"+n+" .coPayValue").attr('id');
			var removeTotal = parseFloat(total);
			var removePayValue = parseFloat(payValue);
			var removeCoPayValue = parseFloat(coPayValue);
			totalCostEstimation = totalCostEstimation- removeTotal;
			totalPayCostEstimation= totalPayCostEstimation - removePayValue;
			totalCoPayCostEstimation = totalCoPayCostEstimation - removeCoPayValue;
			 $("#totalCostEstimation").val(totalCostEstimation);
			 $("#totalCoPayCostEstimation").val(totalCoPayCostEstimation);
			 $("#totalPayCostEstimation").val(totalPayCostEstimation);
			 
			$("#Estimation" + n).remove();
		}
	}
} 

function calculateTotalForCostEstimation() {
	var corporateId = $("#sponseredName").val();
		if(corporateId == undefined){
			 corporateId = 0 ;
		 }
	var particularRate = $("#particularRate").val();
	var particularqty = $("#particularqty").val();
	if (particularqty == "") {
		$("#particularqty").val(0);
	}
	if (particularRate == "") {
		$("#particularRate").val(0);
	}
		if (particularqty == 0) {
			calculateTotalForCostEstimation();
			return false;
		} else {
			if(corporateId == 0){
				$("#particularamt").val(particularRate * particularqty);
				$("#coPayValue").val(particularRate * particularqty);
			}else{
				$("#particularamt").val(particularRate * particularqty);
				$("#PayValue").val(particularRate * particularqty);
			}
		}
	if ($("#PayValue").val() == 0) {
		calculateCoPayForCostEstimation();
	} else {
		calculatePayForCostEstimation();
	}
}

function calculateCoPayForCostEstimation() {
	var PayValue = $("#PayValue").val();
	var particularamt = $("#particularamt").val();
	if (PayValue == "" || particularamt == "") {
		return false;
	}
	
	if(PayValue < 0){
		PayValue = 0;
	}else if(isNaN(PayValue) == true){
		PayValue = 0;
	}
	
	var particularCoPay = (particularamt - PayValue);
	$("#coPayValue").val(particularCoPay);
}

function calculatePayForCostEstimation() {
	var coPayValue = $("#coPayValue").val();
	var particularamt = $("#particularamt").val();
	if (coPayValue == "" || particularamt == "") {
		return false;
	}
	if(coPayValue < 0){
		coPayValue = 0;
	}else if(isNaN(coPayValue) == true){
		coPayValue = 0;
	}
	
	var particularPay = (particularamt - coPayValue);
	$("#PayValue").val(particularPay);
}

var hallTypeTemplate = "<option value='0'>-SELECT-</option>{#foreach $T.htli as hl}<option value='{$T.hl.idht}'>{$T.hl.htnm}</option>{#/for}";
function getAllHallTypeForCostEstimation(){
	var inputs = [];
	var corporateId = 0;
	inputs.push('action=fetchHallTypeForCostEstimation');
	inputs.push('corporateId=' + corporateId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#idAllHallType").setTemplate(hallTypeTemplate);
			$("#idAllHallType").processTemplate(pobj1);
		}
	});
}

var hallTypeTemplate = "<option value='0'>-SELECT-</option>{#foreach $T.htli as hl}<option value='{$T.hl.idht}'>{$T.hl.htnm}</option>{#/for}";
function getAllHallNameForCostEstimation(){
	var inputs = [];
	var corporateId = 0;
	inputs.push('action=fetchHallNameForCostEstimation');
	inputs.push('corporateId=' + corporateId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#idAllHallName").setTemplate(hallTypeTemplate);
			$("#idAllHallName").processTemplate(pobj1);
			$("#idAllHallNameOFInvestAndPathoTest").setTemplate(hallTypeTemplate);
			$("#idAllHallNameOFInvestAndPathoTest").processTemplate(pobj1);
		}
	});
}

var hallTypeTemplate = "<option value='0'>-SELECT-</option>{#foreach $T.htli as hl}<option value='{$T.hl.idht}'>{$T.hl.htnm}</option>{#/for}";
function getAllOperationNameForCostEstimation(){
	var inputs = [];
	var corporateId = 0;
	inputs.push('action=fetchOperationNameForCostEstimation');
	inputs.push('corporateId=' + corporateId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#idAllOpertionName").setTemplate(hallTypeTemplate);
			$("#idAllOpertionName").processTemplate(pobj1);
		}
	});
}

function fetchDoctorChargeForCostEstimation(){
	var corporateId = 0 ;
	var chargesForEstimation = ($('input:radio[name=Charges]:checked').val());
	if(chargesForEstimation == "normalCharges"){
		corporateId = 0 ;
		$("#sponsoredType").val("select");
		$("#companyName").val("");
		$("#sponseredName").val("");
	}else{
		 corporateId = $("#sponseredName").val();
		if(corporateId == undefined){
			 corporateId = 0 ;
		 }
	}
	var serviceHeadingType = $("#serviceHeadingForCostEstimation").val();
	var idHallType = $("#idAllHallType").val();
	var idHallName = $("#idAllHallName").val();
	var idParticulars = $("#itemid").val();
	if(idParticulars == "" || idParticulars == undefined ){
		idParticulars = 0;
	}
	if(idHallType == "" || idHallType == undefined ){
		idHallType = 0;
	}
	if(idHallName == "" || idHallName == undefined ){
		idHallName = 0;
	}
	var inputs = [];
	inputs.push('action=fetchDoctorChargeForCostEstimation');
	inputs.push('idHallType=' + idHallType);
	inputs.push('idHallName=' + idHallName);
	inputs.push('idParticulars=' + idParticulars);
	inputs.push('serviceHeadingType=' + serviceHeadingType);
	inputs.push('corporateId=' + corporateId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r == "" || r == undefined){
				 $("#particularRate").val(0);
			}
			var charges = r.split("@");
			 $("#particularRate").val(charges[0]);
			 $("#particularqty").val(1);
			 var particularRate =  $("#particularRate").val();
			var particularamt = (particularRate * 1);
			if(particularamt == 0 || isNaN(particularamt)){
				particularamt = 0;
			}
			$("#particularamt").val(particularamt);
			if(corporateId == 0){
				$("#coPayValue").val(particularamt);
			}else{
				$("#PayValue").val(charges[1]);
				$("#coPayValue").val(charges[2]);
			}
		}
	});
}

function fetchOperationChargeForCostEstimation(){
	var chargesResponse ;
	var corporateId = 0 ;
	var chargesForEstimation = ($('input:radio[name=Charges]:checked').val());
	if(chargesForEstimation == "normalCharges"){
		corporateId = 0 ;
		$("#sponsoredType").val("select");
		$("#companyName").val("");
		$("#sponseredName").val("");
	}else{
		 corporateId = $("#sponseredName").val();
		if(corporateId == undefined){
			 corporateId = 0 ;
		 }
	}
	var idHallType = $("#idAllHallType").val();
	var idOpertionName = $("#idAllOpertionName").val();
	var inputs = [];
	inputs.push('action=fetchOperationChargeForCostEstimation');
	inputs.push('idHallType=' + idHallType);
	inputs.push('idOpertionName=' + idOpertionName);
	inputs.push('corporateId=' + corporateId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
				$("#operationChargeDetails").html(ajaxResponse);
				chargesResponse = eval('(' + ajaxResponse + ')');
				var surCharge = chargesResponse.ol[0].oc;
				 $("#particularRate").val(surCharge);
				 $("#particularqty").val(1);
				var particularamt = (surCharge * 1);
				if(particularamt == 0 || isNaN(particularamt)){
					particularamt = 0;
				}
				$("#particularamt").val(particularamt);
				if(corporateId == 0){
					$("#coPayValue").val(particularamt);
				}else{
					$("#PayValue").val(particularamt);
				}
		}
	});
}

function printGivenCostEstimation(){
	var totalCostEstimation = $("#totalCostEstimation").val();
	var totalPayCostEstimation = $("#totalPayCostEstimation").val();
	var totalCoPayCostEstimation = $("#totalCoPayCostEstimation").val();
	/*var objBillComponentSample = {
			oplist : []
		};
	var all = "";*/
	var serviceCostEstimationGroup = new Array();
	var particularsCostEstimationGroup = new Array();
	var particularsRateCostEstimationGroup = new Array();
	var QtyCostEstimationGroup = new Array();
	var totalCostEstimationGroup = new Array();
	/*$.each($('#checkboxForEstimation'), function() {
		serviceCostEstimationGroup.push($(this).val());
	});
	
	if (serviceCostEstimationGroup.length >= 1) {
		for ( var k = 0; k < serviceCostEstimationGroup.length; k++) { */
	
				/*$("#divEstimation").find("tr").each(function()
						{
						 $(this).find('td').each(function(){
							 objBillComponentSample.oplist.push($(this).text());
						  }); 
				});*/
				
				$('.serviceType').map(function(){
					serviceCostEstimationGroup.push(this.id);  
				});
				$('.particularsClass').map(function(){
					if(this.id == ""){
						this.id = "-";
					}
					particularsCostEstimationGroup.push(this.id);  
				});
				$('.ParticularsRateClass').map(function(){
					particularsRateCostEstimationGroup.push(this.id);  
				});
				$('.ParticularsQtyClass').map(function(){
					QtyCostEstimationGroup.push(this.id);   
				});
				$('.ParticularsTotalClass').map(function(){
					totalCostEstimationGroup.push(this.id);  
				});
			window.open("costEstimationPrint.jsp?serviceCostEstimationGroup="+ encodeURIComponent(serviceCostEstimationGroup)+
						"&particularsCostEstimationGroup="+ encodeURIComponent(particularsCostEstimationGroup)+
						"&particularsRateCostEstimationGroup="+ encodeURIComponent(particularsRateCostEstimationGroup)+
						"&QtyCostEstimationGroup="+ encodeURIComponent(QtyCostEstimationGroup)+
						"&totalCostEstimationGroup="+ encodeURIComponent(totalCostEstimationGroup)+
						"&totalCostEstimation="+ encodeURIComponent(totalCostEstimation)+
						"&totalPayCostEstimation="+ encodeURIComponent(totalPayCostEstimation)+
						"&totalCoPayCostEstimation="+ encodeURIComponent(totalCoPayCostEstimation));
}

function adminChargesForCostEstimation(){
	var corporateId = 0 ;
	var chargesForEstimation = ($('input:radio[name=Charges]:checked').val());
	if(chargesForEstimation == "normalCharges"){
		corporateId = 0 ;
		$("#sponsoredType").val("select");
		$("#companyName").val("");
		$("#sponseredName").val("");
	}else{
		 corporateId = $("#sponseredName").val();
		if(corporateId == undefined){
			 corporateId = 0 ;
		 }
	}
	var totalCostEstimation = $("#totalCostEstimation").val();
	var inputs = [];
	inputs.push('action=adminChargesForCostEstimation');
	inputs.push('totalCostEstimation=' + totalCostEstimation);
	inputs.push('corporateId=' + corporateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		global : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var ajaxResponse = r;
			ajaxResponse = ajaxResponse.toString().replace(/"/g, "");
			$("#hiddenAdminCharges").val(ajaxResponse);
			$("#adminCharges").prop('checked', false);
			createRowForEstimation('admin');
		}
	});
}

function serviceChargesForCostEstimation(){
	var totalCostEstimation = $("#totalCostEstimation").val();
	var corporateId = 0 ;
	var chargesForEstimation = ($('input:radio[name=Charges]:checked').val());
	if(chargesForEstimation == "normalCharges"){
		corporateId = 0 ;
		$("#sponsoredType").val("select");
		$("#companyName").val("");
		$("#sponseredName").val("");
	}else{
		 corporateId = $("#sponseredName").val();
		if(corporateId == undefined){
			 corporateId = 0 ;
		 }
	}
	var inputs = [];
	inputs.push('action=serviceChargesForCostEstimation');
	inputs.push('totalCostEstimation=' + totalCostEstimation);
	inputs.push('corporateId=' + corporateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		global : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var ajaxResponse = r;
			ajaxResponse = ajaxResponse.toString().replace(/"/g, "");
			$("#hiddenServiceCharges").val(ajaxResponse);
			$("#serviceCharges").prop('checked', false);
			createRowForEstimation('service');
		}
	});
}

//@author	: Tushar Sonawane
//@date		: 30-Jan-2017
//@reason 	: New Formate for Pioneer Hospital 
function printIPDDetailedBillwithoutHeaderAndFooter(){

	var dischargedate = $("#tEndDate").html();
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		var date = dischargedate.split(" ");
		var date1 = date[0].split("-");
		newdate = date1[2] + "/" + date1[1] + "/" + date1[0] + " " + date[1];
	} else {
		newdate = "";
		$("#discharge_date").val("");
		$("#discharge_Time").val("");
	}
	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	var btnvalue = "";
	btnvalue = $('input[name=billPrintType]:checked').val();
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();

	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	var pharmaDisc = parseFloat($("#pharma_discount").val());

	window.open("IPDDetailedBillwithoutHeaderAndFooter.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&date=" + date + "&charge="
			+ charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&dischargedate=" + encodeURIComponent(newdate) + "&billtype="
			+ btnvalue + "&specialityvalue=" + specialityvalue
			+ "&billDateValue=" + billDateValue + "&pharmaDisc="
			+ encodeURIComponent(pharmaDisc) + "&returnANDPaidAMT="
			+ encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="
			+ encodeURIComponent(pharmaAMTrecievedByHosp));

	$("#iPrintBill").hide('hide');
	document.getElementById('printWithDate').checked = false;
	document.getElementById('PrintWithoutDateBtn').checked = false;
	document.getElementById('printWithPaymentSummeryBtn').checked = false;
	document.getElementById('printWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('printWithoutHeaderFooterBTN').checked = false;

}
function previousPrintIPDDetailedBillwithoutHeaderAndFooter() {
	var billNO;
	var dischargedate = $("#tEndDate").html();
	
	var newdate;
	if (dischargedate != "null_null" && dischargedate != "") {
		newdate = dischargedate;
	} else {
		newdate = "";
	}

	/** ******************pharmacy indent details********* */
	var pharmacashreturn = 0;
	pharmacashreturn = $("#PharmacyCashReturn").text();
	if (pharmacashreturn != 0 || pharmacashreturn != null) {
		pharmacashreturn = $("#PharmacyCashReturn").text();
	}
	var pharmaAMTpaidByHosp = 0;
	pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	if (pharmaAMTpaidByHosp != 0 || pharmaAMTpaidByHosp != null) {
		pharmaAMTpaidByHosp = $("#sumPayByHospAMT").val();
	}
	var returnANDPaidAMT = parseFloat(pharmacashreturn)
			+ parseFloat(pharmaAMTpaidByHosp);

	var pharmaAMTrecievedByHosp = 0;
	pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	if (pharmaAMTrecievedByHosp != 0 || pharmaAMTrecievedByHosp != null) {
		pharmaAMTrecievedByHosp = $("#sumPharmaAMTRecievedByHosp").val();
	}

	billNO = $("#invoiceNo").html();
	var patientobj = $("#divPatId").html();
	var date = $("#headdate2").html();
	var charge = $("#chr2").html();
	var serviceTaxTotalPay = $("#serviceTaxTotalPay").html();
	var serviceTaxTotalCoPay = $("#serviceTaxTotalCoPay").html();
	// var advbillobj = $("#divBillAAmt").html();
	var finalRefund = $("#finalRefund").html();
	var PharmacyAdvancePaid = $("#PharmacyAdvancePaid").text();
	if (PharmacyAdvancePaid == "") {
		PharmacyAdvancePaid = 0;
	}
	var pharmaDisc = parseFloat($("#pharma_discount").val());
	var specialityvalue = "";
	specialityvalue = $('input[name=speciality]:checked').val();
	var billDateValue = "";
	billDateValue = $('input[name=billDate]:checked').val();

	window.open("previousPrintIPDDetailedBillwithoutHeaderAndFooter.jsp?" + "patientobj="
			+ encodeURIComponent(patientobj) + "&billNO=" + billNO + " &date="
			+ date + "&charge=" + charge + "&serviceTaxTotalPay="
			+ encodeURIComponent(serviceTaxTotalPay) + "&serviceTaxTotalCoPay="
			+ encodeURIComponent(serviceTaxTotalCoPay) + "&finalRefund="
			+ encodeURIComponent(finalRefund) + "&nursingChargesBedString="
			+ encodeURIComponent(nursingChargesBedString)
			+ "&PharmacyAdvancePaid=" + encodeURIComponent(PharmacyAdvancePaid)
			+ "&pharmaDisc=" + encodeURIComponent(pharmaDisc)
			+ "&specialityvalue=" + specialityvalue + "&billDateValue="
			+ billDateValue + "&dischargedate=" + encodeURIComponent(newdate)
			+ "&returnANDPaidAMT=" + encodeURIComponent(returnANDPaidAMT)
			+ "&pharmaAMTrecievedByHosp="+ encodeURIComponent(pharmaAMTrecievedByHosp));
	// + "&dischargedate=" + encodeURIComponent(newdate));

	$("#iPrintBillFrPrev").hide('hide');
	document.getElementById('prevPrintWithDate').checked = false;
	document.getElementById('prevPrintWithoutDateBtn').checked = false;
	document.getElementById('prevPrintWithPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithoutPaymentSummeryBtn').checked = false;
	document.getElementById('prevPrintWithDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutDateAndPayableAmount').checked = false;
	document.getElementById('prevPrintWithOutHeaderAndFooter').checked = false;
}
// Tushar Code End

// Code removed from bill.js and added in ipdbill.js By@ Kavita bhangale @Date 17 Mar 2017 

//Author Kavita date- 1 March 2016
function disableIPDPaymentMode() {

	var $payfromCA = $('input:checkbox[id=payfromCA]');

	if ($payfromCA.is(':checked') == true) {

		var $checkbox1 = $('input:checkbox[id=CheckBox1]');
		var $checkbox2 = $('input:checkbox[id=CheckBox2]');
		var $checkbox3 = $('input:checkbox[id=CheckBox3]');
		var $checkbox4 = $('input:checkbox[id=CheckBox4]');

		if ($checkbox1.is(':checked') == true) {
			$("#CheckBox1").attr("checked", false);
			var el = document.getElementById("cashamt");
			el.innerHTML = el.innerHTML.replace('', '&nbsp;');
			$("#cashamt").hide();
		}

		if ($checkbox2.is(':checked') == true) {
			$("#CheckBox2").attr("checked", false);
			$("#cardamt").hide();
			$("#cardNum").hide();
			$("#bankName").hide();
		}

		if ($checkbox3.is(':checked') == true) {
			$("#CheckBox3").attr("checked", false);
			$("#chequeamt").hide();
			$("#chequeNum").hide();
			$("#chequebankName").hide();
		}

		if ($checkbox4.is(':checked') == true) {
			$("#CheckBox4").attr("checked", false);
			$("#txtRtgsAmt").val("");
			$("#txtRtgsAccNo").val("");
			$("#txtRtgsBankName").val("");
			$("#txtRtgsIfscCode").val("");
			$("#txtRtgsUTRNo").val("");
			$("#dialog").dialog('close');
		}
		$("#CheckBox1").attr("disabled", true);
		$("#CheckBox2").attr("disabled", true);
		$("#CheckBox3").attr("disabled", true);
		$("#CheckBox4").attr("disabled", true);
	} else {
		$("#CheckBox1").attr("checked", true);
		var el = document.getElementById("cashamt");
		el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
		$("#cashamt").show();
		$("#CheckBox1").attr("disabled", false);
		$("#CheckBox2").attr("disabled", false);
		$("#CheckBox3").attr("disabled", false);
		$("#CheckBox4").attr("disabled", false);
	}
} //end

function setPaymentMode() {
	var paymentMode = $("#paymentMode").val();
	if (paymentMode == "cash") {
		$("#divCardNumber").hide();
		$("#divBankName").hide();
	} else {
		$("#divCardNumber").show();
		$("#divBankName").show();
	}
}

function showEditReceiptPopup() {
	$("#editReceiptPopUp").modal('show');
	$("#editreceiptpassword").val("");
}

function closeEditReceiptPopup() {
	$("#editReceiptPopUp").modal('hide');
}

function editIPDReceipt() {

	var password = $("#editreceiptpassword").val();
	if (password == "") {
		alert("Please Enter Password to Edit Receipt");
		return false;
	} else if (password == "orcasys") {
		$("#editReceiptPopUp").removeClass('fade');
		$("#editReceiptPopUp").modal('hide');
		var editReceiptType = $("#editReceiptType").val();
		var selectedGroups = new Array();
		$("input[name='ipdReceiptCheckbox']:checked").each(function() {
			selectedGroups.push($(this).val());
			// ipdReceipt.push($(this).attr('id'));
		});
		if (selectedGroups.length > 1) {
			alert("Please Select Single Receipt");
			return false;
		} else {
			$("#queryType1").val("update");
			$("#ipdID").val(selectedGroups[0]);
			var divBillAAmt = "";
			if (editReceiptType == "Security") {
				divBillAAmt = $("#SecurityDipositDiv").html();
			} else {
				divBillAAmt = $("#divBillAAmt").html();
			}

			var billBean1 = eval('(' + divBillAAmt + ')');

			var myObj;
			for ( var k = 0; k < billBean1.baali.length; k++) {
				var id = billBean1.baali[k].opdbilllist[0].idipd;

				if (selectedGroups[0] == id) {
					myObj = billBean1.baali[k];
					if (myObj.head == "Refund") {
						//$("#divTowards").hide();
						$("#divCheckBox2").hide();
						$("#divCheckBox4").hide();
						showCashParameter();
						showChequeParameter();
						$("#seltowards").attr("disabled", true);
						$("#payfromCA").prop("checked", false);
						$("#commonADVdiv").hide('hide');
					}else{
						$("#seltowards").attr("disabled", false);
					}
					if (myObj.common_Advance_Flag == "Y") {
						setTimeout(function() {
							$("#payfromCA").attr("checked", true);
						}, 100);
						
						var $checkbox1 = $('input:checkbox[id=CheckBox1]');
						var $checkbox2 = $('input:checkbox[id=CheckBox2]');
						var $checkbox3 = $('input:checkbox[id=CheckBox3]');
						var $checkbox4 = $('input:checkbox[id=CheckBox4]');

						if ($checkbox1.is(':checked') == true) {
							$("#CheckBox1").attr("checked", false);
							var el = document.getElementById("cashamt");
							el.innerHTML = el.innerHTML.replace('', '&nbsp;');
							$("#cashamt").hide();
						}
						if ($checkbox2.is(':checked') == true) {
							$("#CheckBox2").attr("checked", false);
							$("#cardamt").hide();
							$("#cardNum").hide();
							$("#bankName").hide();
						}
						if ($checkbox3.is(':checked') == true) {
							$("#CheckBox3").attr("checked", false);
							$("#chequeamt").hide();
							$("#chequeNum").hide();
							$("#chequebankName").hide();
						}
						if ($checkbox4.is(':checked') == true) {
							$("#CheckBox4").attr("checked", false);
							$("#txtRtgsAmt").val("");
							$("#txtRtgsAccNo").val("");
							$("#txtRtgsBankName").val("");
							$("#txtRtgsIfscCode").val("");
							$("#txtRtgsUTRNo").val("");
							$("#dialog").dialog('close');
						}
						
						$("#CheckBox1").attr("disabled", true);
						$("#CheckBox2").attr("disabled", true);
						$("#CheckBox3").attr("disabled", true);
						$("#CheckBox4").attr("disabled", true);
						
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
					}
					$("#advBillId").val(myObj.baaid);
					//alert(myObj.opdbilllist[0].pay_mode);
					if (myObj.opdbilllist[0].pay_mode == "Cash") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", true);
						$("#CheckBox2").prop("checked", false);
						$("#CheckBox3").prop("checked", false);
						$("#CheckBox4").prop("checked", false);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$("#dialog").dialog('close');
						
						$("#cashAmount").val(myObj.opdbilllist[0].cash_amt);
					} else if (myObj.opdbilllist[0].pay_mode == "Card") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox2").prop("checked", true);
						$("#CheckBox1").prop("checked", false);
						$("#CheckBox3").prop("checked", false);
						$("#CheckBox4").prop("checked", false);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$("#dialog").dialog('close');
						
						$("#cardAmount").val(myObj.opdbilllist[0].card_amt);
						$("#cardNo").val(myObj.opdbilllist[0].card_no);
						$("#cardBankName").val(myObj.opdbilllist[0].bname);
					} else if (myObj.opdbilllist[0].pay_mode == "Cheque") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", false);
						$("#CheckBox2").prop("checked", false);
						$("#CheckBox3").prop("checked", true);
						$("#CheckBox4").prop("checked", false);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$("#dialog").dialog('close');
						
						$("#chequeAmount").val(myObj.opdbilllist[0].chq_amt);
						$("#chequeNo").val(myObj.opdbilllist[0].chq_no);
						$("#chequeBankName").val(myObj.opdbilllist[0].chq_bank);
					} else if (myObj.opdbilllist[0].pay_mode == "Cash Card") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", true);
						$("#CheckBox2").prop("checked", true);
						$("#CheckBox3").prop("checked", false);
						$("#CheckBox4").prop("checked", false);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$("#dialog").dialog('close');
						
						$("#cashAmount").val(myObj.opdbilllist[0].cash_amt);

						$("#cardAmount").val(myObj.opdbilllist[0].card_amt);
						$("#cardNo").val(myObj.opdbilllist[0].card_no);
						$("#cardBankName").val(myObj.opdbilllist[0].bname);
					} else if (myObj.opdbilllist[0].pay_mode == "Cash Cheque") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", true);
						$("#CheckBox2").prop("checked", false);
						$("#CheckBox3").prop("checked", true);
						$("#CheckBox4").prop("checked", false);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$("#dialog").dialog('close');
						
						$("#cashAmount").val(myObj.opdbilllist[0].cash_amt);

						$("#chequeAmount").val(myObj.opdbilllist[0].chq_amt);
						$("#chequeNo").val(myObj.opdbilllist[0].chq_no);
						$("#chequeBankName").val(myObj.opdbilllist[0].chq_bank);
					} else if (myObj.opdbilllist[0].pay_mode == "Card Cheque") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", false);
						$("#CheckBox2").prop("checked", true);
						$("#CheckBox3").prop("checked", true);
						$("#CheckBox4").prop("checked", false);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$("#dialog").dialog('close');
						
						$("#cardAmount").val(myObj.opdbilllist[0].card_amt);
						$("#cardNo").val(myObj.opdbilllist[0].card_no);
						$("#cardBankName").val(myObj.opdbilllist[0].bname);

						$("#chequeAmount").val(myObj.opdbilllist[0].chq_amt);
						$("#chequeNo").val(myObj.opdbilllist[0].chq_no);
						$("#chequeBankName").val(myObj.opdbilllist[0].chq_bank);
					} else if (myObj.opdbilllist[0].pay_mode == "Cash Card Cheque") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", true);
						$("#CheckBox2").prop("checked", true);
						$("#CheckBox3").prop("checked", true);
						$("#CheckBox4").prop("checked", false);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$("#dialog").dialog('close');
						
						$("#cashAmount").val(myObj.opdbilllist[0].cash_amt);

						$("#cardAmount").val(myObj.opdbilllist[0].card_amt);
						$("#cardNo").val(myObj.opdbilllist[0].card_no);
						$("#cardBankName").val(myObj.opdbilllist[0].bname);

						$("#chequeAmount").val(myObj.opdbilllist[0].chq_amt);
						$("#chequeNo").val(myObj.opdbilllist[0].chq_no);
						$("#chequeBankName").val(myObj.opdbilllist[0].chq_bank);
					} else if (myObj.opdbilllist[0].pay_mode == "Cheque RTGS") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", false);
						$("#CheckBox2").prop("checked", false);
						$("#CheckBox3").prop("checked", true);
						$("#CheckBox4").prop("checked", true);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$(".ui-dialog-titlebar-close").hide("hide");
						$("#dialog").dialog("open");
						
						$("#chequeAmount").val(myObj.opdbilllist[0].chq_amt);
						$("#chequeNo").val(myObj.opdbilllist[0].chq_no);
						$("#chequeBankName").val(myObj.opdbilllist[0].chq_bank);
						
						$("#txtRtgsAmt").val(myObj.opdbilllist[0].rtgs_amt);
						$("#txtRtgsAccNo").val(myObj.opdbilllist[0].accno);
						$("#txtRtgsIfscCode").val(myObj.opdbilllist[0].ifsc_code);
						$("#txtRtgsBankName").val(myObj.opdbilllist[0].rtgs_bank_name);
						$("#txtRtgsUTRNo").val(myObj.opdbilllist[0].utr_no);
						
					} else if (myObj.opdbilllist[0].pay_mode == "Cash RTGS") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", true);
						$("#CheckBox2").prop("checked", false);
						$("#CheckBox3").prop("checked", false);
						$("#CheckBox4").prop("checked", true);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$(".ui-dialog-titlebar-close").hide("hide");
						$("#dialog").dialog("open");
						
						$("#cashAmount").val(myObj.opdbilllist[0].cash_amt);
						
						$("#txtRtgsAmt").val(myObj.opdbilllist[0].rtgs_amt);
						$("#txtRtgsAccNo").val(myObj.opdbilllist[0].accno);
						$("#txtRtgsIfscCode").val(myObj.opdbilllist[0].ifsc_code);
						$("#txtRtgsBankName").val(myObj.opdbilllist[0].rtgs_bank_name);
						$("#txtRtgsUTRNo").val(myObj.opdbilllist[0].utr_no);
					} else if (myObj.opdbilllist[0].pay_mode == "Card RTGS") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", false);
						$("#CheckBox2").prop("checked", true);
						$("#CheckBox3").prop("checked", false);
						$("#CheckBox4").prop("checked", true);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$(".ui-dialog-titlebar-close").hide("hide");
						$("#dialog").dialog("open");
						
						$("#cardAmount").val(myObj.opdbilllist[0].card_amt);
						$("#cardNo").val(myObj.opdbilllist[0].card_no);
						$("#cardBankName").val(myObj.opdbilllist[0].bname);
						
						$("#txtRtgsAmt").val(myObj.opdbilllist[0].rtgs_amt);
						$("#txtRtgsAccNo").val(myObj.opdbilllist[0].accno);
						$("#txtRtgsIfscCode").val(myObj.opdbilllist[0].ifsc_code);
						$("#txtRtgsBankName").val(myObj.opdbilllist[0].rtgs_bank_name);
						$("#txtRtgsUTRNo").val(myObj.opdbilllist[0].utr_no);
					} else if (myObj.opdbilllist[0].pay_mode == "Cash Card RTGS") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", true);
						$("#CheckBox2").prop("checked", true);
						$("#CheckBox3").prop("checked", false);
						$("#CheckBox4").prop("checked", true);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$(".ui-dialog-titlebar-close").hide("hide");
						$("#dialog").dialog("open");
						
						$("#cashAmount").val(myObj.opdbilllist[0].cash_amt);
						
						$("#cardAmount").val(myObj.opdbilllist[0].card_amt);
						$("#cardNo").val(myObj.opdbilllist[0].card_no);
						$("#cardBankName").val(myObj.opdbilllist[0].bname);
						
						$("#txtRtgsAmt").val(myObj.opdbilllist[0].rtgs_amt);
						$("#txtRtgsAccNo").val(myObj.opdbilllist[0].accno);
						$("#txtRtgsIfscCode").val(myObj.opdbilllist[0].ifsc_code);
						$("#txtRtgsBankName").val(myObj.opdbilllist[0].rtgs_bank_name);
						$("#txtRtgsUTRNo").val(myObj.opdbilllist[0].utr_no);
					} else if (myObj.opdbilllist[0].pay_mode == "Card Cheque RTGS") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", false);
						$("#CheckBox2").prop("checked", true);
						$("#CheckBox3").prop("checked", true);
						$("#CheckBox4").prop("checked", true);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$(".ui-dialog-titlebar-close").hide("hide");
						$("#dialog").dialog("open");
						
						$("#cardAmount").val(myObj.opdbilllist[0].card_amt);
						$("#cardNo").val(myObj.opdbilllist[0].card_no);
						$("#cardBankName").val(myObj.opdbilllist[0].bname);
						
						$("#chequeAmount").val(myObj.opdbilllist[0].chq_amt);
						$("#chequeNo").val(myObj.opdbilllist[0].chq_no);
						$("#chequeBankName").val(myObj.opdbilllist[0].chq_bank);
						
						$("#txtRtgsAmt").val(myObj.opdbilllist[0].rtgs_amt);
						$("#txtRtgsAccNo").val(myObj.opdbilllist[0].accno);
						$("#txtRtgsIfscCode").val(myObj.opdbilllist[0].ifsc_code);
						$("#txtRtgsBankName").val(myObj.opdbilllist[0].rtgs_bank_name);
						$("#txtRtgsUTRNo").val(myObj.opdbilllist[0].utr_no);
					} else if (myObj.opdbilllist[0].pay_mode == "Cash Cheque RTGS") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", true);
						$("#CheckBox2").prop("checked", false);
						$("#CheckBox3").prop("checked", true);
						$("#CheckBox4").prop("checked", true);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$(".ui-dialog-titlebar-close").hide("hide");
						$("#dialog").dialog("open");
						
						$("#cashAmount").val(myObj.opdbilllist[0].cash_amt);
						
						$("#chequeAmount").val(myObj.opdbilllist[0].chq_amt);
						$("#chequeNo").val(myObj.opdbilllist[0].chq_no);
						$("#chequeBankName").val(myObj.opdbilllist[0].chq_bank);
						
						$("#txtRtgsAmt").val(myObj.opdbilllist[0].rtgs_amt);
						$("#txtRtgsAccNo").val(myObj.opdbilllist[0].accno);
						$("#txtRtgsIfscCode").val(myObj.opdbilllist[0].ifsc_code);
						$("#txtRtgsBankName").val(myObj.opdbilllist[0].rtgs_bank_name);
						$("#txtRtgsUTRNo").val(myObj.opdbilllist[0].utr_no);
					} else if (myObj.opdbilllist[0].pay_mode == "Cash Card Cheque RTGS") {
						$("#seltowards").val(myObj.head);
						$("#txtAmount").val(myObj.opdbilllist[0].pdAmt);
						$("#txtComment").val(myObj.opdbilllist[0].narr);
						
						$("#CheckBox1").prop("checked", true);
						$("#CheckBox2").prop("checked", true);
						$("#CheckBox3").prop("checked", true);
						$("#CheckBox4").prop("checked", true);
						
						showCashParameter();
						showCardParameter();
						showChequeParameter();
						$(".ui-dialog-titlebar-close").hide("hide");
						$("#dialog").dialog("open");
						
						$("#cashAmount").val(myObj.opdbilllist[0].cash_amt);
						
						$("#cardAmount").val(myObj.opdbilllist[0].card_amt);
						$("#cardNo").val(myObj.opdbilllist[0].card_no);
						$("#cardBankName").val(myObj.opdbilllist[0].bname);
						
						$("#chequeAmount").val(myObj.opdbilllist[0].chq_amt);
						$("#chequeNo").val(myObj.opdbilllist[0].chq_no);
						$("#chequeBankName").val(myObj.opdbilllist[0].chq_bank);
						
						$("#txtRtgsAmt").val(myObj.opdbilllist[0].rtgs_amt);
						$("#txtRtgsAccNo").val(myObj.opdbilllist[0].accno);
						$("#txtRtgsIfscCode").val(myObj.opdbilllist[0].ifsc_code);
						$("#txtRtgsBankName").val(myObj.opdbilllist[0].rtgs_bank_name);
						$("#txtRtgsUTRNo").val(myObj.opdbilllist[0].utr_no);
					}
					break;
				}
			}
		}
		setPaymentMode();
		selectedGroups = null;
	} else {
		alert("Please Enter Correct Password to Edit Receipt");
		return false;
	}
}

function newIPDReceipt() {
	$("#queryType1").val("insert");
	$("#ipdID").val(0);

	$("#CheckBox1").attr("disabled", false);
	$("#CheckBox2").attr("disabled", false);
	$("#CheckBox3").attr("disabled", false);
	$("#CheckBox4").attr("disabled", false);
	
	$("#txtAmount").val("");
	$("#txtComment").val("");
	$("#paymentMode").val("cash");
	$("#txtNumber").val("");
	$("#txtBankName").val("");
	setPaymentMode();
	$("#CheckBox1").prop("checked", true);
	showCashParameter();
	$("#CheckBox2").prop("checked", false);
	$("#CheckBox3").prop("checked", false);
	showCashParameter();
	showCardParameter();
	showChequeParameter();

	$("#cashAmount").val(0);

	$("#cardAmount").val(0);
	$("#cardNo").val("");
	$("#cardBankName").val("");

	$("#chequeAmount").val(0);
	$("#chequeNo").val("");
	$("#chequeBankName").val("");

	$("#divTowards").show();
	$("#divCheckBox2").show();

	var ipdBillType = $("ipdBillType").val();

	if (ipdBillType == "general") {
		$("#seltowards").attr("disabled", true);
	}
}

var commonPatInfoForIpdBill = '<div class="col-md-12-1" style="padding-top: 3px;">'
	+ '<div class="col-md-1-1" style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">'
	+ '<li class="list-group-item zero-padding col-md-6-1" style="margin-top: 0px;">'
	+ '{#if $T.img!= ""}<img alt="Patient Image"	class="img-responsive col-md-12-1" name="patImg" id="patImg" style="margin-right: 0px; margin-top: 0px;height:35px;" src="pharmacy/pharmacy/readImage?url={$T.img}">'
	+ '{#/if}{#if $T.img== ""}<img alt="Patient Image" class="img-responsive col-md-12-1" style="margin-right: 0px; margin-left: 5px; margin-top: 0px;height: 35px;"	src="images/user1forbill.jpg">{#/if}</li></div>'
	+ '<div style="padding-top: 15px" class="col-md-11-1">'
	+ '<div class="col-md-1-1"><div class="divide-10"></div>'
	+ '<label class="col-md-6-1 TextFont">Bill No-</label>'
	+ '<label class="col-md-6-1 TextFont"  id="invoiceNo">{$T.liBM[0].billCount}</label>'
	+ '<input id="txtRecNo1" value="{$T.liBM[0].id}" style="display: none"></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont" style="margin-left:20px;">Patient Id-</label>'
	+ '<label id="patid"  class="col-md-6-1 TextFont">{$T.pi}</label></div>'
	+ '<div class="col-md-4-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont">Patient Name-</label>'
	+ '<label id="patname"  class="col-md-8-1 TextFont">{$T.tit} {$T.fn} {$T.mn} {$T.ln}</label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont">IPD No-</label>'
	+ '<label id="ipdno"  class="col-md-8-1 TextFont" style="margin-left: -15px;">{$T.objTreat.trCount}</label></div>'
	+ '<div class="col-md-1-1"><div class="divide-10"></div>'
	+ '<label class="col-md-3-1 TextFont" style="margin-left: -20px;">Age-</label>'
	+ '<label id="age" class="col-md-12-1 TextFont" style="padding-left: 5px;">{$T.ag}(YY){$T.month}(MM){$T.days}(DD)</label></div>'
	+ '<div class="col-md-1-1" style="padding-left: 25px;"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont">Sex-</label>'
	+ '<label id="sex" class="col-md-6-1 TextFont"  style="padding-left: 2px;">{$T.sx}</label></div>	</div>'
	+ '<div style="padding-top: 14px; margin-bottom: -10px;" class="col-md-11-1">'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-3-1 TextFont">DOA-</label>'
	+ '<label id="tStartDate" class="col-md-7-1 TextFont">{$T.objTreat.treStart}&nbsp;&nbsp;{$T.objTreat.int}</label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-3-1 TextFont" style="margin-left:10px;">DOD-</label>'
	+ '<label id="tEndDate" class="col-md-8-1 TextFont"></label></div>'
	+ '<div class="col-md-4-1" ><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont" style="padding-left: 10px;">Consulting Doctor-</label> '
	+ '<label id="consultdoc" class="col-md-8-1 TextFont" style="z-index:10;"></label></div>'
	+ '<div class="col-md-3-1"><div class="divide-10"></div>'
	/*+ '<label class="col-md-6-1 TextFont">Registered Date-</label>'
	+ '<label id="regDate" class="col-md-6-1 TextFont">{$T.rgDt}</label></div>'*/
	+ '<label class="col-md-6-1 TextFont">Bill Category-</label>'
	+ '<label id="bill_cat" class="col-md-6-1 TextFont"></label></div>'
	+ '</div>'
	+ '<div style="padding-top: 25px; margin-bottom: -15px;" class="col-md-11-1">'
	+ '<div class="col-md-6-1">	<div class="divide-10"></div>'
	+ '<label class="col-md-2-1 TextFont" >Corporate-</label>'
	+ '<label id="sp_name" class="col-md-10-1 TextFont"></label></div></div>'
	+ '</div>';

function setCommonPatInfoForIpdBill(callfrom) {
	var pobj = $("#divPatId").html();
	var pobj1 = eval('(' + pobj + ')');
	$("#commonPatInfo").setTemplate(commonPatInfoForIpdBill);
	$("#commonPatInfo").processTemplate(pobj1);

	var todays_date = $("#todays_date").val();
	var arrDate = todays_date.split("-");
	// var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
	// $("#date").text(date);

	$("#patientname").html(pobj1.fn + " " + pobj1.mn + " " + pobj1.ln);
	var spname = "";
	if (pobj1.sdiscNm != "") {
		spname = pobj1.sdiscNm + " (" + pobj1.objTreat.cmpny + ")";
	} else {
		spname = "";
	}
	$("#sp_name").text(spname); 
	
	var cat_name = "";
	if(pobj1.objTreat.ipdBillCat == "1" || pobj1.objTreat.ipdBillCat == "2"){
		cat_name = pobj1.objTreat.billCategory_Name; 
	}else{
		cat_name = pobj1.objTreat.billCategory_Name + "  ("+pobj1.objTreat.billCategory_Discount+"%)";
	}
	
	$("#bill_cat").text(cat_name); 

	var docCount = pobj1.IPDDoctorList.length;
	var consultdoc = pobj1.admit;

	if (docCount > 1) {
		var title = "";
		for ( var i = 0; i < pobj1.IPDDoctorList.length; i++) {
			var docname = pobj1.IPDDoctorList[i].docName + " -- "
					+ pobj1.IPDDoctorList[i].department;
			if (i != (pobj1.IPDDoctorList.length - 1)) {
				// docname = docname + ",";
			}
			title = title + " " + docname;
		}
		consultdoc = consultdoc
				+ "  "
				+ '<a href="#" style="color:red;" data-toggle="tooltip" data-placement="bottom" title="'
				+ title + '"><i class = "fa fa-plus-circle"></i></a>';
		$("#consultdoc").html(consultdoc);
	} else {
		$("#consultdoc").html(consultdoc);
	}

	var billID = $("#billID").html();
	if (pobj1.liBM != undefined) {
		for ( var i = 0; i < pobj1.liBM.length; i++) {
			// if (pobj1.liBM[i].id == billID) {
			// $("#txtRecNo").html(pobj1.bi[i].id);
			// $("#tid").html(pobj1.liBM[i].tid);
			$("#billdate").html(pobj1.liBM[i].bda);
			$("#SpecialDisc").val(pobj1.liBM[i].sdisc);
			$("#ipdBillId").val(pobj1.liBM[i].id);
			// }
		}
	}

	if (callfrom == "previous") {
		$("#SpecialDisc").val(pobj1.objTreat.sdic);
		$("#tEndDate").html(pobj1.objTreat.treEnd + " " + pobj1.objTreat.out);
	}
}

function deleteIPDReceipt() {

	var selectedGroups = new Array();
	$("input[name='ipdReceiptCheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
	});

	if (selectedGroups.length == 0) {
		alert("Please Select Receipt");
		return false;
	}
	if (selectedGroups.length > 1 || selectedGroups.length == 0) {
		alert("Please Select Single Receipt");
		return false;
	} else {
		$("#idDeleteIPDReceipt").val(selectedGroups[0]);
		$("#deleteReceiptPopUp").show();
		$("#deleteReceiptReason").val("");
	}
}

function closeIPDReceiptPopUp() {
	$("#deleteReceiptPopUp").hide();
	$("#idDeleteIPDReceipt").val(0);
}

function deleteReceipt() {
	var idDeleteIPDReceipt = $("#idDeleteIPDReceipt").val();
	var deleteReceiptReason = $("#deleteReceiptReason").val();
	if (deleteReceiptReason == "") {
		alert("Please Enter Reason");
		return false;
	}
	var inputs = [];
	inputs.push('action=deleteReceipt');
	inputs.push('billId=' + $("#ipdBillId").val());
	inputs.push('idDeleteIPDReceipt=' + idDeleteIPDReceipt);
	inputs.push('deleteReceiptReason=' + deleteReceiptReason);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function showManagePopUp(type) { 
	$("#docdiscdiv").show();
	$("#hosdiscdiv").show();
	$("#dDiscount").prop("readonly", false);
	$("#sDiscount").prop("readonly", false);
	$("#dDiscountInPercentage").prop("readonly", false);
	$("#sDiscountInPercentage").prop("readonly", false);
	$("#IdHeaderApprovedDisc").hide();
	$("#idApprovedDiscountTextTr").hide();
	$("#idApprovedDiscountTr").hide();
	$("#IdHeaderApprovedSurgeonDisc").hide();
	$("#idApprovedSurgeonDiscountTr").hide();
	$("#idApprovedSurgeonDiscountTextTr").hide();
	$("#pharmadiscdiv").show();
	if (type == "save") {
		$("#dNarration").val("");
		$("#dTotal").val($("#finalBillTotal").text());
		$("#dDiscount").val(0);
		$("#dDiscountInPercentage").val(0);
		$("#dPayable").val($("#finalPayable").text());
		$("#discountId").val(0);

		var sdisc = $("#SpecialDisc").val();
		if (sdisc == 0) {
			$("#disconPay").attr('disabled', true);
			$("#docdisconPay").attr('disabled', true);
		} else {
			$("#disconPay").attr('disabled', false);
			$("#docdisconPay").attr('disabled', false);
		}

		$("#surgeonlist").val("select");
		$("#sNarration").val("");
		$("#sTotal").val(0);
		$("#sPayable").val(0);
		$("#sDiscount").val(0);
		$("#sDiscountInPercentage").val(0);

	}
	$(".popup").show('show');
}

function closeManagePopUp() {
	$(".popup").hide('hide');
}

function setManagePayable(callfrom) {
	var dPayable = 0.0;
	var dDiscount = 0.0;
	var dTotal = 0.0;
	$("#dDiscountInPercentage").val(0);
	$("#sDiscountInPercentage").val(0);

	var billComps = $("#billComps").html();
	var billBean = eval('(' + billComps + ')');

	if (callfrom == "Hospital") {
		dPayable = parseFloat($("#finalPayable").text());
		dDiscount = parseFloat($("#dDiscount").val());
		dTotal = parseFloat($("#dTotal").val());
	} else {
		dPayable = parseFloat($("#sTotal").val());
		dDiscount = parseFloat($("#sDiscount").val());
		dTotal = parseFloat($("#sTotal").val());
	}

	if (dDiscount > dTotal) {
		alert("Discount Cannot Be Greater Than Total Amount");
		if (callfrom == "Hospital") {
			$("#dPayable").val($("#dTotal").val());
			$("#dDiscount").val("0");
		} else {
			$("#sPayable").val($("#sTotal").val());
			$("#sDiscount").val("0");
		}
		return false;
	}
	var finalDiscountForTotal = 0;
	for ( var di = 0; di < billBean.liDisc.length; di++) {
		finalDiscountForTotal = finalDiscountForTotal
				+ billBean.liDisc[di].disc;
	}
	var serviceTax = billBean.hospDetail[0].serTax;
	if (callfrom == "Hospital") {
		dTotal = dTotal - finalDiscountForTotal;
	} else {
		dTotal = dTotal;
	}
	if (isNaN(dDiscount) == true) {
		dTotal = dTotal;
	} else {
		dTotal = dTotal - dDiscount;
	}
	serviceTax = (serviceTax / 100);
	var serviceTaxTotal = (dTotal) + (dTotal * serviceTax);

	if (callfrom == "Hospital") {
		$("#dPayable").val(serviceTaxTotal.toFixed(2));
	} else {
		$("#sPayable").val(dTotal.toFixed(2));
	}
}

function saveDoctorDiscount() {
	var sNarration = $("#sNarration").val();
	var sDiscount = $("#sDiscount").val();
	var sDiscountInPercentage = parseFloat($("#sDiscountInPercentage").val());
	var docid = $("#surgeonlist").val();
	var opId = docid.split("@");
	var discountSaveEditType = $("#discountSaveEditType").val();
	var totalAmount = $("#dTotal").val();
	var totalPayable = $("#dPayable").val();

	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(sDiscount)) {
		alert("Discount(Rs) field should be only digits with a single dot allowed");
		$("#sDiscount").focus();
		return false;
	}
	if (!pattern.test(sDiscountInPercentage)) {
		alert("Discount(%) field should be only digits with a single dot allowed");
		$("#sDiscountInPercentage").focus();
		return false;
	}

	var payFlag = "";

	if ($("#docdisconPay").prop('checked') == true) {
		payFlag = $("#docdisconPay").val();
	} else if ($("#docdisconCoPay").prop('checked') == true) {
		payFlag = $("#docdisconCoPay").val();
	}

	if (payFlag == "") {
		alert("Please select PayFlag to give Discount");
		return false;
	}
	if (sDiscount == 0 || sDiscount == "") {
		alert("Discount field should not be empty.");
		$("#sDiscount").focus();
		return false;
	}

	var inputs = [];
	inputs.push('action=saveIPDDoctorDiscount');
	inputs.push('sNarration=' + sNarration);
	inputs.push('sDiscount=' + sDiscount);
	inputs.push('sDiscountInPercentage=' + sDiscountInPercentage);
	inputs.push('totalAmount=' + totalAmount);
	inputs.push('totalPayable=' + totalPayable);
	inputs.push('opId=' + opId[0]);
	inputs.push('payFlag=' + payFlag);
	inputs.push('discountSaveEditType=' + discountSaveEditType);
	inputs.push('doctorid=' + opId[1]);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function saveEditIPDDiscount() {
	
	var totalAmount=$("#dTotal").val();
		
	var billId = $("#ipdBillId").val();
	var dDiscount = $("#dDiscount").val();
	var dDiscountInPercentage = $("#dDiscountInPercentage").val();
	var totalAmount = $("#dTotal").val();
	var totalPayable = $("#dPayable").val();
	
	if (typeof dDiscountInPercentage == 'undefined') {
		dDiscountInPercentage = 0.0;
	} else {
		dDiscountInPercentage = parseFloat($("#dDiscountInPercentage").val());
	}
	var dNarration = $("#dNarration").val();
	var discountId = $("#discountId").val();

	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(dDiscount)) {
		alert("Discount(Rs) field should be only digits with a single dot allowed");
		$("#dDiscount").focus();
		return false;
	}
	if (!pattern.test(dDiscountInPercentage)) {
		alert("Discount(%) field should be only digits with a single dot allowed");
		$("#dDiscountInPercentage").focus();
		return false;
	}

	var payFlag = "";

	if ($("#disconPay").prop('checked') == true) {
		payFlag = $("#disconPay").val();
	} else if ($("#disconCoPay").prop('checked') == true) {
		payFlag = $("#disconCoPay").val();
	}
	if (payFlag == "") {
		alert("Please select PayFlag to give Discount");
		return false;
	}
	if (dDiscount == 0 || dDiscount == "") {
		alert("Discount field should not be empty.");
		$("#dDiscount").focus();
		return false;
	}

	var inputs = [];
	inputs.push('action=saveEditIPDDiscount');
	inputs.push('totalAmount=' + totalAmount);
	inputs.push('dDiscount=' + dDiscount);
	inputs.push('dDiscountInPercentage=' + dDiscountInPercentage);
	inputs.push('dNarration=' + dNarration);
	inputs.push('billId=' + billId);
	inputs.push('discountId=' + discountId);
	inputs.push('payFlag=' + payFlag);
	inputs.push('totalAmount=' + totalAmount);
	inputs.push('totalPayable=' + totalPayable);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function editIPDDiscount(id) {
	$("#discountId").val(id);
	var patobj = $("#divPatId").html();
	ajaxres = eval('(' + patobj + ')');
	var sdisc = ajaxres.sdisc;
	if (sdisc == 0) {
		$("#disconPay").attr('disabled', true);
		$("#docdisconPay").attr('disabled', true);
	}

	var billComps = $("#billComps").html();
	billBean = eval('(' + billComps + ')');
	var myObj;
	for ( var di = 0; di < billBean.liDisc.length; di++) {
		if (id == billBean.liDisc[di].id) {
			myObj = billBean.liDisc[di];
		}
	}

	if (myObj.st == "Hospital") {
		$("#pharmadiscdiv").hide();
		$("#docdiscdiv").hide();
		$("#hosdiscdiv").show();
		$("#dTotal").val($("#finalBillTotalServiceTax").text());
		if(myObj.apprvalStatus == 0){
			$("#dDiscount").prop("readonly", false);
			$("#dDiscountInPercentage").prop("readonly", false);
			$("#IdHeaderApprovedDisc").hide();
			$("#idApprovedDiscountTextTr").hide();
			$("#idApprovedDiscountTr").hide();
		}else{
			$("#dDiscount").prop("readonly", true);
			$("#dDiscountInPercentage").prop("readonly", true);
			$("#IdHeaderApprovedDisc").show();
			$("#idApprovedDiscountTextTr").show();
			$("#idApprovedDiscountTr").show();
		}
		$("#dDiscount").val(myObj.disc);
		$("#dDiscountInPercentage").val(myObj.disPercntg);
		$("#dNarration").val(myObj.narr);
		$("#approvalDiscNarration").val(myObj.apprvalDiscNarr);
		$("#approvalDisc").val(myObj.approvalDiscAmt);
		$("#approvalDiscDtTm").val(myObj.approvalDiscDtTm);
		$("#dPayable").val($("#finalPayable").text());
		if (myObj.pf == 'P') {
			$("#disconCoPay").attr('checked', true);
		} else if (myObj.pf == 'S') {
			$("#disconPay").attr('checked', true);
		} else if (myObj.pf == null) {
			$("#disconPay").attr('checked', false);
			$("#disconCoPay").attr('checked', false);
		}
	} else {
		$("#pharmadiscdiv").hide();
		$("#hosdiscdiv").hide();
		$("#docdiscdiv").show();
		if(myObj.apprvalStatus == 0){
			$("#sDiscount").prop("readonly", false);
			$("#sDiscountInPercentage").prop("readonly", false);
			$("#IdHeaderApprovedSurgeonDisc").hide();
			$("#idApprovedSurgeonDiscountTextTr").hide();
			$("#idApprovedSurgeonDiscountTr").hide();
		}else{
			$("#sDiscount").prop("readonly", true);
			$("#sDiscountInPercentage").prop("readonly", true);
			$("#IdHeaderApprovedSurgeonDisc").show();
			$("#idApprovedSurgeonDiscountTextTr").show();
			$("#idApprovedSurgeonDiscountTr").show();
		}
		$("#surgeonlist").val(myObj.id + "@" + myObj.userId);
		$("#sTotal").val($("#surgeonchrg" + myObj.id).text());
		$("#sDiscount").val(myObj.disc);
		$("#sDiscountInPercentage").val(myObj.disPercntg);
		$("#sNarration").val(myObj.narr);
		$("#approvalSurgeonDiscNarration").val(myObj.apprvalDiscNarr);
		$("#approvalSurgeonDisc").val(myObj.approvalDiscAmt);
		$("#approvalSurgeonDiscDtTm").val(myObj.approvalDiscDtTm);
		$("#sPayable").val($("#surgeonchrg" + myObj.id).text());
		if (myObj.pf == 'P') {
			$("#docdisconCoPay").attr('checked', true);
		} else if (myObj.pf == 'S') {
			$("#docdisconPay").attr('checked', true);
		} else if (myObj.pf == null) {
			$("#docdisconPay").attr('checked', false);
			$("#docdisconCoPay").attr('checked', false);
		}

		$("#discountSaveEditType").val("edit");
	}

	$(".popup").show('show');
}

function deleteIPDDiscount(id) {
	var r = confirm("Do You Want To Delete Discount?");
	if (r == true) {

		var status = $("#discStatus" + id).val();
		var inputs = [];
		inputs.push('action=deleteIPDDiscount');
		inputs.push('billId=' + $("#ipdBillId").val());
		inputs.push('discountId=' + id);
		inputs.push('status=' + status);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BillServlet",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

function setTotalPayable() {
	var docid = $("#surgeonlist").val();
	var opId = docid.split("@");
	var surgeonchrg = $("#surgeonchrg" + opId[0]).text();
	$("#sTotal").val(surgeonchrg);
	$("#sPayable").val(surgeonchrg);
}

function closeOperationPopUp() {
	$("#editOperationPopUp").hide();
}

function closePopUp() {
	$("#serviceHeading").val("0");
	$("#popupOPCharges").hide('hide');
}

//Code By Kavita Bhangale
function showRefundReceipt(callfrom) {
	if(callfrom == "finalrefund"){
		if ($('#refundChekbox').is(":checked")) {
			newIPDReceipt();
			var finalRefund = $("#finalRefund").text();
			finalRefund = parseFloat(finalRefund);
			if (finalRefund > 0) {
				$("#txtAmount").val(finalRefund);
				$("#seltowards").val("Refund");
				$("#commonADVdiv").hide('hide');
				if($("#CheckBox1").prop("checked") == true){
					$("#cashAmount").val(finalRefund);
				}
			} else {
				$("#refundChekbox").prop("checked", false);
			}
		} else {
			newIPDReceipt();
			$("#seltowards").val("Payment");
			$('#RefundReceiptPopUp').modal('hide');
		}

	}else{
		if (($('#seltowards').val()).trim() === "Refund") {
			$('#RefundReceiptPopUp').modal('toggle');
			$("#payfromCA").prop("checked", false);
			$("#commonADVdiv").hide('hide');
		} else if (($('#seltowards').val()).trim() === "Payment") {
			$("#commonADVdiv").show('show');
			$("#divCheckBox2").show();
			$("#divCheckBox4").show();
			newIPDReceipt();
		} else {
			$("#divCheckBox2").show();
			$("#divCheckBox4").show();
			$("#commonADVdiv").hide('hide');
			newIPDReceipt();
		}
	}
}

//Code By Kavita Bhangale
function refundsecuritypayment() {
	$("#security_details").css('display', 'block');
	var response = $("#SecurityDipositDiv").html();
	var billBean = eval('(' + response + ')');

	var total = 0;
	var temp;
	var myObj;
	var template = "";
	var refunded = 0;

	template = template
			+ '<thead class="cf">'
			+ '<tr>'
			+ '<th style="height: 21.5px;" class="col-md-1-1"><label class="TextFont">#</label></th>'
			+ '<th style="height: 21.5px;" class="col-md-2-1"><label class="TextFont">Pay Mode</label></th>'
			+ '<th style="height: 21.5px;" class="numeric col-md-2-1"><label class="TextFont">Amount</label></th>'
			+ '<th style="height: 21.5px;" class="numeric col-md-2-1"><label class="TextFont">Date</label></th>'
			+ '<th style="height: 21.5px; color: orange;" class="numeric col-md-3-1"><label class="TextFont">Comment</label></th>'
			+ '<th style="height: 21.5px; color: orange;" class="numeric col-md-1-1 center"><label class="TextFont">Flag</label></th>'
			+ '<th style="height: 21.5px; color: orange;" class="numeric col-md-1-1 center"><label class="TextFont">Action</label></th>'
			+ '<th style="height: 21.5px; color: orange;" class="numeric col-md-1-1 center"><label class="TextFont">Print</label></th>'
			+ '</tr></thead><tbody>';

	for ( var i = 0; i < billBean.baali.length; i++) {
		if (billBean.baali[i].bid != 0) {
			myObj = billBean.baali[i];
			total = total + myObj.amt;
			if (myObj.refdflag == 1) {
				refunded = refunded + myObj.amt;
			}
			template = template
					+ '<tr><td class="col-md-1-1" style="height: 21.5px;">'
					+ (1 + i)
					+ '</td><td class="col-md-2-1" style="height: 21.5px;">'
					+ myObj.opdbilllist[0].pay_mode
					+ '</td><td class="numeric col-md-1-1" style="height: 21.5px;">'
					+ myObj.amt
					+ '</td><td class="numeric col-md-1-1" style="height: 21.5px;">'
					+ myObj.date
					+ '</td><td class="numeric col-md-2-1" style="height: 21.5px;">'
					+ myObj.opdbilllist[0].narr + '</td>';

			if (myObj.refdflag == 1) {
				template = template
						+ '<td class="numeric col-md-1-1 center" style="height: 21.5px;">Refunded</td><td class="numeric col-md-1-1 center" style="height: 21.5px;"><input	type="checkbox" name="ipdReceiptCheckbox" disabled="disabled" value="'
						+ myObj.opdbilllist[0].idipd + '"></td>';
			} else {
				template = template
						+ '<td class="numeric col-md-1-1 center" style="height: 21.5px;">Balance</td><td class="numeric col-md-1-1 center" style="height: 21.5px;"><input	type="checkbox" name="ipdReceiptCheckbox" value="'
						+ myObj.opdbilllist[0].idipd + '"></td>';
			}

			template = template
					+ '<td class="numeric col-md-1-1 center" style="height: 21.5px;"><i id="printReceipt" type="button" class="fa fa-print fa-1x" onclick="printIpdSecurityReceipt('
					+ myObj.opdbilllist[0].idipd + ')"></i>' + '</td></tr>';
		}
	}

	template = template
			+ '<tr><td style="border-top:; padding: 1px;"></td><td style="border-top:; padding: 1px;">Total :</td><td class="numeric"	style="border-top: ; padding: 1px;" id="securityTotal">'
			+ total
			+ '</td><td class="numeric"	style="border-top:none ; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td>'
			+ '<td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric"	style="border-top: none; padding: 1px;"></td></tr>'
			+ '<tr><td style="border-top:; padding: 1px;"></td><td style="border-top:; padding: 1px;">Refund :</td><td class="numeric"	style="border-top: ; padding: 1px;" id="securityTotal">'
			+ refunded
			+ '</td><td class="numeric"	style="border-top:none ; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td>'
			+ '<td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric"	style="border-top: none; padding: 1px;"></td></tr>'
			+ '<tr><td style="border-top:; padding: 1px;"></td><td style="border-top:; padding: 1px;">Balance :</td><td class="numeric"	style="border-top: ; padding: 1px;" id="securityTotal">'
			+ (total - refunded)
			+ '</td><td class="numeric"	style="border-top:none ; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric" style="border-top: none; padding: 1px;"></td>'
			+ '<td class="numeric" style="border-top: none; padding: 1px;"></td><td class="numeric"	style="border-top: none; padding: 1px;"></td></tr></tbody>';

	$("#securitylistdiv").setTemplate(template);
	$("#securitylistdiv").processTemplate(temp);

}

function refundbillpayment() {

	$("#security_details").css('display', 'none');
	$("#RefundReceiptPopUp").removeClass('fade');
	$("#RefundReceiptPopUp").modal('hide');
	newIPDReceipt();
	var finalRefund = $("#finalRefund").text();
	finalRefund = parseFloat(finalRefund);
	if (finalRefund > 0) {
		$("#txtAmount").val(finalRefund);
		$("#CheckBox1").prop("checked", true);
		$("#cashAmount").val(finalRefund);
		$("#CheckBox2").prop("checked", false);
		$("#divCheckBox2").hide();
		$("#divCheckBox4").hide();
		$("#payfromCA").prop("checked", false);
	} else {
		alert("No amount to be refunded...");
		$("#seltowards").val("Payment");
		$("#divCheckBox2").show();
		$("#divCheckBox4").show();
		$("#payfromCA").prop("checked", false);
	}
}

function showOutstandingReceipt() {
	if ($('#outstandingCheckbox').is(":checked")) {
		newIPDReceipt();
		var finalOutstanding = $("#finalOutstanding").text();
		finalOutstanding = parseFloat(finalOutstanding);
		if (finalOutstanding > 0) {
			$("#txtAmount").val(finalOutstanding);
			if($("#CheckBox1").prop("checked") == true){
				$("#cashAmount").val(finalOutstanding);
			}
		} else {
			$("#outstandingCheckbox").prop("checked", false);
		}
	} else {
		newIPDReceipt();
	}
}

function editOperationChargesBill() {

	var ipdBillId = $("#ipdBillId").val();
	// var ipdBillOpSlaveId = $("#ipdBillCheckbox").val();
	var ipdBillOpSlaveId = $("input[name='ipdBillCheckbox']:checked").val();

	var rateSurCh = $("#rateSurCh").val();
	var rateAssSurCh = $("#rateAssSurCh").val();
	var rateAnaeCh = $("#rateAnaeCh").val();
	var ratePrAnaeCh = $("#ratePrAnaeCh").val();
	var rateSurInCh = $("#rateSurInCh").val();
	
	if(rateSurCh == "" || rateSurCh == undefined || rateSurCh == null || isNaN(rateSurCh) == true){
		rateSurCh = 0;
	}
	if(rateAssSurCh == "" || rateAssSurCh == undefined || rateAssSurCh == null || isNaN(rateAssSurCh) == true){
		rateAssSurCh = 0;
	}
	if(rateAnaeCh == "" || rateAnaeCh == undefined || rateAnaeCh == null || isNaN(rateAnaeCh) == true){
		rateAnaeCh = 0;
	}
	if(ratePrAnaeCh == "" || ratePrAnaeCh == undefined || ratePrAnaeCh == null || isNaN(ratePrAnaeCh) == true){
		ratePrAnaeCh = 0;
	}
	if(rateSurInCh == "" || rateSurInCh == undefined || rateSurInCh == null || isNaN(rateSurInCh) == true){
		rateSurInCh = 0;
	}

	var discSurCh = $("#discSurCh").val();
	var discAssSurCh = $("#discAssSurCh").val();
	var discAnaeCh = $("#discAnaeCh").val();
	var discPrAnaeCh = $("#discPrAnaeCh").val();
	var discSurInCh = $("#discSurInCh").val();
	
	if(discSurCh == "" || discSurCh == undefined || discSurCh == null || isNaN(discSurCh) == true){
		discSurCh = 0;
	}
	if(discAssSurCh == "" || discAssSurCh == undefined || discAssSurCh == null || isNaN(discAssSurCh) == true){
		discAssSurCh = 0;
	}
	if(discAnaeCh == "" || discAnaeCh == undefined || discAnaeCh == null || isNaN(discAnaeCh) == true){
		discAnaeCh = 0;
	}
	if(discPrAnaeCh == "" || discPrAnaeCh == undefined || discPrAnaeCh == null || isNaN(discPrAnaeCh) == true){
		discPrAnaeCh = 0;
	}
	if(discSurInCh == "" || discSurInCh == undefined || discSurInCh == null || isNaN(discSurInCh) == true){
		discSurInCh = 0;
	}

	var paySurCh = $("#paySurCh").val();
	var payAssSurCh = $("#payAssSurCh").val();
	var payAnaeCh = $("#payAnaeCh").val();
	var payPrAnaeCh = $("#payPrAnaeCh").val();
	var paySurInCh = $("#paySurInCh").val();
	
	if(paySurCh == "" || paySurCh == undefined || paySurCh == null || isNaN(paySurCh) == true){
		paySurCh = 0;
	}
	if(payAssSurCh == "" || payAssSurCh == undefined || payAssSurCh == null || isNaN(payAssSurCh) == true){
		payAssSurCh = 0;
	}
	if(payAnaeCh == "" || payAnaeCh == undefined || payAnaeCh == null || isNaN(payAnaeCh) == true){
		payAnaeCh = 0;
	}
	if(payPrAnaeCh == "" || payPrAnaeCh == undefined || payPrAnaeCh == null || isNaN(payPrAnaeCh) == true){
		payPrAnaeCh = 0;
	}
	if(paySurInCh == "" || paySurInCh == undefined || paySurInCh == null || isNaN(paySurInCh) == true){
		paySurInCh = 0;
	}

	var coPaySurCh = $("#coPaySurCh").val();
	var coPayAssSurCh = $("#coPayAssSurCh").val();
	var coPayAnaeCh = $("#coPayAnaeCh").val();
	var coPayPrAnaeCh = $("#coPayPrAnaeCh").val();
	var coPaySurInCh = $("#coPaySurInCh").val();
	
	if(coPaySurCh == "" || coPaySurCh == undefined || coPaySurCh == null || isNaN(coPaySurCh) == true){
		coPaySurCh = 0;
	}
	if(coPayAssSurCh == "" || coPayAssSurCh == undefined || coPayAssSurCh == null || isNaN(coPayAssSurCh) == true){
		coPayAssSurCh = 0;
	}
	if(coPayAnaeCh == "" || coPayAnaeCh == undefined || coPayAnaeCh == null || isNaN(coPayAnaeCh) == true){
		coPayAnaeCh = 0;
	}
	if(coPayPrAnaeCh == "" || coPayPrAnaeCh == undefined || coPayPrAnaeCh == null || isNaN(coPayPrAnaeCh) == true){
		coPayPrAnaeCh = 0;
	}
	if(coPaySurInCh == "" || coPaySurInCh == undefined || coPaySurInCh == null || isNaN(coPaySurInCh) == true){
		coPaySurInCh = 0;
	}

	var objOpCharges = {
		ol : []
	};

	objOpCharges.ol.push({
		"oc" : rateSurCh,
		"oep" : rateAssSurCh,
		"or" : rateAnaeCh,
		"preAnsChr" : ratePrAnaeCh,
		"spnm" : rateSurInCh,
		// opChD asSuD anaeD preAnaeD suInD
		"opChD" : discSurCh,
		"asSuD" : discAssSurCh,
		"anaeD" : discAnaeCh,
		"preAnaeD" : discPrAnaeCh,
		"suInD" : discSurInCh,

		// opChP asSuP anaeP preAnaeP suInP
		"opChP" : paySurCh,
		"asSuP" : payAssSurCh,
		"anaeP" : payAnaeCh,
		"preAnaeP" : payPrAnaeCh,
		"suInP" : paySurInCh,

		"opChCoP" : coPaySurCh,
		"asSuCoP" : coPayAssSurCh,
		"anaeCoP" : coPayAnaeCh,
		"preAnaeCoP" : coPayPrAnaeCh,
		"suInCoP" : coPaySurInCh
	});

	objOpCharges = JSON.stringify(objOpCharges);
	var inputs = [];
	inputs.push('action=updateOperationBillCharges');
	inputs.push('objOpCharges=' + objOpCharges.decodeSpecialChars());
	inputs.push('ipdBillId=' + ipdBillId);
	inputs.push('ipdBillOpSlaveId=' + ipdBillOpSlaveId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			location.reload(this);
		}
	});
}


//@Code Edited by - Kavita Bhangale @Date - 16 Jan 2017 @Code edited for - all validations added 
function validateOperationInBill(type, payCopay) {
	if (type == "surCh") {
		var rate = parseFloat($("#rateSurCh").val());
		var disc = parseFloat($("#discSurCh").val());
		if(isNaN(rate) == true){
			rate = 0;
		}
		if(isNaN(disc) == true){
			disc = 0;
		}
		
		if(disc > rate){
			alert("Discount can not be greater than Rate");
			return false;
		}
		
		var asschrg = $("#astSurChrgPercent").val();
		var anaschrg = $("#anaeChrgPercent").val();
		var instruchrg = $("#surInstruChrgPercent").val();
		
		var asschrgdisc = $("#discAssSurCh").val();
		var anaschrgdisc = $("#discAnaeCh").val();
		var instruchrgdisc = $("#discSurInCh").val();
		
		var total = rate - disc;
		var asschrgtotal = (total * asschrg) / 100;
		var anaschrgtotal = (total * anaschrg) / 100;
		var instruchrgtotal = (total * instruchrg) / 100;
		
		$("#rateAssSurCh").val(asschrgtotal);
		$("#rateAnaeCh").val(anaschrgtotal);
		$("#rateSurInCh").val(instruchrgtotal);
		
		asschrgtotal = asschrgtotal - asschrgdisc;
		anaschrgtotal = anaschrgtotal - anaschrgdisc;
		instruchrgtotal = instruchrgtotal - instruchrgdisc;
		
		$("#totalSurCh").val(total);
		$("#totalAssSurCh").val(asschrgtotal);
		$("#totalAnaeCh").val(anaschrgtotal);
		$("#totalSurInCh").val(instruchrgtotal);

		if (payCopay == "coPay") {
			var coPay = $("#coPaySurCh").val();
			var asschrgcoPay = $("#coPayAssSurCh").val();
			var instruchrgcoPay = $("#coPaySurInCh").val();
			var anaschrgcoPay = $("#coPayAnaeCh").val();
			
			if(coPay < 0){
				alert("Amount can not be less than Zero");
				return false;
			}else if(isNaN(coPay) == true){
				alert("Please enter valid number");
				return false;
			}

			var pay = total - coPay;
			var asschrgpay = asschrgtotal - asschrgcoPay;
			var instruchrgpay = instruchrgtotal - instruchrgcoPay;
			var anaschrgcoPay = anaschrgtotal - anaschrgcoPay;

			$("#paySurCh").val(pay);
			$("#payAssSurCh").val(asschrgpay);
			$("#payAnaeCh").val(anaschrgcoPay);
			$("#paySurInCh").val(instruchrgpay);
		} else {
			if ($("#paySurCh").val() > 0) {
				
				var pay = $("#paySurCh").val();
				var asschrgPay = $("#payAssSurCh").val();
				var instruchrgPay = $("#paySurInCh").val();
				var anaschrgPay = $("#payAnaeCh").val();
				if(pay < 0){
					alert("Amount can not be less than Zero");
						return false;
				}else if(isNaN(pay) == true){
					alert("Please enter valid number");
					return false;
				}
				
				var coPay = total - pay;
				var asschrgcoPay = asschrgtotal - asschrgPay;
				var instruchrgcoPay = instruchrgtotal - instruchrgPay;
				var anaschrgcoPay = anaschrgtotal - anaschrgPay;
				
				/*$("#paySurCh").val(total);
				$("#payAssSurCh").val(asschrgtotal);
				$("#payAnaeCh").val(anaschrgtotal);
				$("#paySurInCh").val(instruchrgtotal);*/
				$("#coPaySurCh").val(coPay);
				$("#coPayAssSurCh").val(asschrgcoPay);
				$("#coPaySurInCh").val(instruchrgcoPay);
				$("#coPayAnaeCh").val(anaschrgcoPay);
			} else {
				var pay = $("#paySurCh").val();
				var coPay = total - pay;
				$("#coPaySurCh").val(coPay);
				$("#coPayAssSurCh").val(asschrgtotal - $("#payAssSurCh").val());
				$("#coPayAnaeCh").val(anaschrgtotal - $("#payAnaeCh").val());
				$("#coPaySurInCh")
						.val(instruchrgtotal - $("#paySurInCh").val());
			}
		}

	} else if (type == "assSurCh") {
		var rate = $("#rateAssSurCh").val();
		var disc = $("#discAssSurCh").val();
		if(rate == ""){
			rate = 0;
		}else if(isNaN(rate) == true){
			alert("Please enter valid amount");
			$("#rateAssSurCh").val(0);
			return false;
		}else if(disc == ""){
			disc = 0;
		}else if(isNaN(disc) == true){
			alert("Please enter valid amount");
			$("#discAssSurCh").val(0);
			return false;
		}
		
		var total = rate - disc;
		$("#totalAssSurCh").val(total);
		if (payCopay == "coPay") {
			var coPay = $("#coPayAssSurCh").val();
			if(isNaN(coPay) == true){
				alert("Please enter valid amount");
				$("#coPayAssSurCh").val(0);
				return false;
			}
			var pay = total - coPay;
			$("#payAssSurCh").val(pay);
		} else {
			var pay = $("#payAssSurCh").val();
			if(isNaN(pay) == true){
				alert("Please enter valid amount");
				$("#payAssSurCh").val(0);
				return false;
			}
			var coPay = total - pay;
			$("#coPayAssSurCh").val(coPay);
		}

	} else if (type == "anaeCh") {
		var rate = $("#rateAnaeCh").val();
		var disc = $("#discAnaeCh").val();
		if(rate == ""){
			rate = 0;
		}else if(isNaN(rate) == true){
			alert("Please enter valid amount");
			$("#rateAnaeCh").val(0);
			return false;
		}else if(disc == ""){
			disc = 0;
		}else if(isNaN(disc) == true){
			alert("Please enter valid amount");
			$("#discAnaeCh").val(0);
			return false;
		}
		
		var total = rate - disc;
		$("#totalAnaeCh").val(total);
		if (payCopay == "coPay") {
			var coPay = $("#coPayAnaeCh").val();
			if(isNaN(coPay) == true){
				alert("Please enter valid amount");
				$("#coPayAnaeCh").val(0);
				return false;
			}
			var pay = total - coPay;
			$("#payAnaeCh").val(pay);
		} else {
			var pay = $("#payAnaeCh").val();
			if(isNaN(pay) == true){
				alert("Please enter valid amount");
				$("#payAnaeCh").val(0);
				return false;
			}
			var coPay = total - pay;
			$("#coPayAnaeCh").val(coPay);
		}

	} else if (type == "prAnaeCh") {
		var rate = $("#ratePrAnaeCh").val();
		var disc = $("#discPrAnaeCh").val();
		if(rate == ""){
			rate = 0;
		}else if(isNaN(rate) == true){
			alert("Please enter valid amount");
			$("#ratePrAnaeCh").val(0);
			return false;
		}else if(disc == ""){
			disc = 0;
		}else if(isNaN(disc) == true){
			alert("Please enter valid amount");
			$("#discPrAnaeCh").val(0);
			return false;
		}
		
		var total = rate - disc;
		$("#totalPrAnaeCh").val(total);
		if (payCopay == "coPay") {
			var coPay = $("#coPayPrAnaeCh").val();
			if(isNaN(coPay) == true){
				alert("Please enter valid amount");
				$("#coPayPrAnaeCh").val(0);
				return false;
			}
			var pay = total - coPay;
			$("#payPrAnaeCh").val(pay);
		} else {
			var pay = $("#payPrAnaeCh").val();
			if(isNaN(pay) == true){
				alert("Please enter valid amount");
				$("#payPrAnaeCh").val(0);
				return false;
			}
			var coPay = total - pay;
			$("#coPayPrAnaeCh").val(coPay);
		}

	} else if (type == "surInCh") {
		var rate = $("#rateSurInCh").val();
		var disc = $("#discSurInCh").val();
		if(rate == ""){
			rate = 0;
		}else if(isNaN(rate) == true){
			alert("Please enter valid amount");
			$("#rateSurInCh").val(0);
			return false;
		}else if(disc == ""){
			disc = 0;
		}else if(isNaN(disc) == true){
			alert("Please enter valid amount");
			$("#discSurInCh").val(0);
			return false;
		}
		
		var total = rate - disc;
		$("#totalSurInCh").val(total);
		if (payCopay == "coPay") {
			var coPay = $("#coPaySurInCh").val();
			if(isNaN(coPay) == true){
				alert("Please enter valid amount");
				$("#coPaySurInCh").val(0);
				return false;
			}
			var pay = total - coPay;
			$("#paySurInCh").val(pay);
		} else {
			var pay = $("#paySurInCh").val();
			if(isNaN(pay) == true){
				alert("Please enter valid amount");
				$("#paySurInCh").val(0);
				return false;
			}
			var coPay = total - pay;
			$("#coPaySurInCh").val(coPay);
		}
	}
}

function fetchDoctorCharges() {
	var corporateId = $("#SpecialDisc").val();
	var doctorId = $("#itemid").val();
	var treatmentId = $("#trid").val();
	var ipdBillId = $("#ipdBillId").val();
	var timeDR = $("#timeDR").val();

	if (doctorId == "") {
		alert("Please Select Doctor Name First...");
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchDoctorCharges');
	inputs.push('corporateId=' + corporateId);
	inputs.push('doctorId=' + doctorId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('ipdBillId=' + ipdBillId);
	inputs.push('timeDR=' + timeDR);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			var pobj = eval('(' + ajaxResponse + ')');

			$("#particularRate").val(pobj.surli[0].rtca);
			$("#particularqty").val(pobj.surli[0].qty);
			$("#particularamt").val(pobj.surli[0].amt);
			if (corporateId > 0) {
				$("#particularPay").val(pobj.surli[0].amt);
			}
			calculatePerticularCoPay();
		}
	});

	//$("#timeDR").close();
}

function convertToGeneralBill() {
	var outstanding = $("#finalOutstanding").text();
	var finalRefund = $("#finalRefund").text();

	if (parseFloat(outstanding) > 0) {
		alert("Please Pay Balance Amount First");
		return false;
	} else if (parseFloat(finalRefund) > 0) {
		alert("Please Pay Refund Amount First");
		return false;
	} else {
		finaltotal = ($("#finalBillTotalServiceTax").text()).trim();
		if (finaltotal == undefined || finaltotal == "") {
			finaltotal = 0;
		}
		finalDiscount = ($("#finalDiscount").text()).trim();
		if (finalDiscount == undefined || finalDiscount == "") {
			finalDiscount = 0;
		}
		finalPayable = ($("#finalPayable").text()).trim();
		if (finalPayable == undefined || finalPayable == "") {
			finalPayable = 0;
		}
		finalAdvancePaid = ($("#finalAdvancePaid").text()).trim();
		if (finalAdvancePaid == undefined || finalAdvancePaid == "") {
			finalAdvancePaid = 0;
		}
		remainAmount = ($("#finalOutstanding").text()).trim();
		if (remainAmount == undefined || remainAmount == "") {
			remainAmount = 0;
		}

		var myObj = $("#divPatId").html();
		myObj = JSON.parse(myObj);
		var trid = myObj.trid;

		var inputs = [];
		inputs.push('action=convertToGeneralBill');
		inputs.push('trid=' + trid);
		inputs.push('finaltotal=' + finaltotal);
		inputs.push('finalDiscount=' + finalDiscount);
		inputs.push('finalPayable=' + finalPayable);
		inputs.push('finalAdvancePaid=' + finalAdvancePaid);
		inputs.push('remainAmount=' + remainAmount);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "BillServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						alert(ajaxResponse);
						if (ajaxResponse == "Bill Converted to General Bill successfully.") {
							window.location = "prevIPD_Bill_Database.jsp?";
							// window.location.reload();
						} else {
							return false;
						}
					}
				});
	}
}

/************
 * @author	: Amrut 
 * @date	: 23-Nov-2016
 * @codeFor	: Discount Approval
 ***********/
function discountPatientAutosuggestionsearch(callfrom , discountType){
	var resultData = [];
	if(discountType == "Hospital"){
		var inputId = "byNameSearch";
		var byName = $("#byNameSearch").val();
	}else{
		var inputId = "byNameSearchForSurgeon";
		var byName = $("#byNameSearchForSurgeon").val();
	}
	
	var auto = 'discountApproval';
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('byName=' + byName);
	inputs.push('discountType=' + discountType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var arrValue;
					var availableTags = [];
					var template = "";
					var idValue;
					availableTags = ajaxResponse.split("\n");
					for ( var j = 0; j < availableTags.length; j++) {
						 arrValue = (availableTags[j]).split("_");
						idValue = arrValue[1];
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + (idValue)
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					setTimeout(function() {
						$("#div" + inputId + " .typeahead").html(template);
						if (callfrom != "onload") {
							$("#div" + inputId + " .typeahead").show();
						}
						$('#' + inputId).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						 $("#" + inputId).data('typeahead').source = resultData;
					}, 300);
				}
			});
	function displayResult(item) {
		if(discountType == "Hospital"){
			$("#byNameSearch").val(item.text);
			$("#" + inputId).val((item.text).trim());
		}else{
			$("#byNameSearchForSurgeon").val(item.text);
			$("#" + inputId).val((item.text).trim());
		}
	}
}

var discountApprovalForIPD = "<table class='table table-bordered table-condensed cf '>"
	+ "<tbody>"
	+ "	{#foreach $T.pl as pl}"
	+ "	<tr>"
	+ "		<td class='col-md-1-1' style='width: 5%;'>{count++}.</td>"
	+ "		<td class='col-md-2-1' >{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
	+ "		<td class='col-md-1-1' style=''>{$T.pl.pi}</td>"
	+ "		<td class='col-md-1-1 '>{$T.pl.tm}</td>"
	+ "		<td class='col-md-2-1'>{$T.pl.wttp} ({$T.pl.category})</td>"
	+ "		<td class='col-md-1-1'>{$T.pl.totalPayble}</td>"
	+ "		<td class='col-md-1-1' style=''>{$T.pl.annIncm}</td>"
	+ "		<td class='col-md-1-1' style=''><input type='text' class='form-control input-SmallText' id='approveDiscount_{$T.pl.bmiBsaID}' value='{$T.pl.annIncm}' onkeypress='return validatePrice(event)'></td>"
	+ "		<td class='col-md-1-1'><textarea class='form-control input-SmallText' style='' id='approveNarration_{$T.pl.bmiBsaID}' value='{$T.pl.sdisc}'></textarea></td>"
	+ "		<td class='col-md-2-1 center'>"
	+ "			<button class='btn btn-xs btn-success' style='font-size: 10px;' " 
	+ "			onclick=approvedDiscountForIPD({$T.pl.bmiBsaID},'confirm','{$T.pl.education}') data-toggle='tooltip' data-placement='top' title='Approve Discount' >Approved</button>   <button class='btn btn-xs btn-danger' onclick=approvedDiscountForIPD({$T.pl.bmiBsaID},'cancel','{$T.pl.education}') data-toggle='tooltip' data-placement='top' title='Disapprove Discount'><i class='fa fa-times'></i>"
	+ "		</td>" + "	</tr>" + "	{#/for}" + "</tbody>" + "</table>";

function discountApprovalSearch(searchOn , discountType) {
	var searchBy;
	var value;
	var temp = 0;
	if (searchOn == "onload") {
		searchBy = "byName";
		value = "value";
	} else{
		if(discountType == "Hospital"){
			var byName = $("#byNameSearch").val();
			var byId = $("#byIdSearch").val();
			
			
			if (byName != "") {
				var strArr = new Array();
				strArr = byName.split("");
				if (strArr[0] == " ") {
					temp = 1;
				}
			}
			if (temp == 1) {
				alert("shouldn't be blank or contain blank space at the Beginning!!");
				$("#byNameSearch").val("");
				$("#byNameSearch").focus();
				return false;
			}

			if (byName != "" && byId != "") {
				alert("please search either by patient Id or by Patient Name");
			} else if (byName == "" && byId == "") {
				alert("please insert something for search");
			} else {
				if (byName != "") {
					searchBy = "byName";
					value = byName;

				} else if (byId != "") {
					searchBy = "byId";
					value = byId;
				}
			}
		}else{
			var byName = $("#byNameSearchForSurgeon").val();
			var byId = $("#byIdSearchForSurgeon").val();
			
			
			if (byName != "") {
				var strArr = new Array();
				strArr = byName.split("");
				if (strArr[0] == " ") {
					temp = 1;
				}
			}
			if (temp == 1) {
				alert("shouldn't be blank or contain blank space at the Beginning!!");
				$("#byNameSearchForSurgeon").val("");
				$("#byNameSearchForSurgeon").focus();
				return false;
			}

			if (byName != "" && byId != "") {
				alert("please search either by patient Id or by Patient Name");
			} else if (byName == "" && byId == "") {
				alert("please insert something for search");
			} else {
				if (byName != "") {
					searchBy = "byName";
					value = byName;
				} else if (byId != "") {
					searchBy = "byId";
					value = byId;
				}
			}
		}
	}
	
	var inputs = [];
	inputs.push('action=showDiscountApproval');
	inputs.push('searchOn=' + searchOn);
	inputs.push('searchBy=' + searchBy);
	inputs.push('discountType=' + discountType);
	inputs.push('value=' + encodeURIComponent(value));
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "BillServlet",
		url : "./ehat/admindata/showDiscountApproval",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#billDetails").html(ajaxResponse);
			billBean = eval('(' + ajaxResponse + ')');
			if (billBean.pl.length == 0 && searchOn != "onload") {
				alert("Patient Not Found");
			} else {
				if(discountType == "Hospital"){
					$("#BillContainer").setTemplate(discountApprovalForIPD);
					$("#BillContainer").processTemplate(billBean);
				}else{
					$("#BillContainerForSurgeon").setTemplate(discountApprovalForIPD);
					$("#BillContainerForSurgeon").processTemplate(billBean);
					discountPatientAutosuggestionsearch('onload' ,'Surgeon');
				}
			}
		}
	});
}

function approvedDiscountForIPD(ipdBill_discount , onclickButton ,discountType){
	 var discountValue = 0;
	if(onclickButton == "cancel"){
		discountValue == "0";
	}else{
	      discountValue = $("#approveDiscount_"+ipdBill_discount).val();
	      if(discountValue <= 0){
	    	  alert("Please ,Approve The Discount ,It Should Not Be Equal Or Less Than 0 .");
	    	  return false ;
	      }
	}
	var discountNarration = $("#approveNarration_"+ipdBill_discount).val();
	var inputs = [];
	inputs.push('action=approvedDiscountForIPD');
	inputs.push('discountValue=' + discountValue);
	inputs.push('ipdBill_discount=' + ipdBill_discount);
	inputs.push('onclickButton=' + onclickButton);
	inputs.push('discountNarration=' + discountNarration);
	inputs.push('discountType=' + discountType);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			 alert(ajaxResponse);
			 location.reload();
		}
	});
}


function RemoveRefundReceiptPopUp(){
    
	$('#RefundReceiptPopUp').modal('hide');
	$("#seltowards").val("Payment");
	$("#commonADVdiv").show('show');
}

