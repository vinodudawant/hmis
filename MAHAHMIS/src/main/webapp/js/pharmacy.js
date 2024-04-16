var myObj = "";
var count = 1;
/** ****************Pharmacy Bill***************************** */

function fetchPatBillInfo() {
	setTimeout(function() {

		var patVal = $("#patName").val();
		var pname = patVal.split("_");
		var palength = pname.length;

		var inputs = [];
		inputs.push('action=FetchPatPharmaBillInfo');
		inputs.push('patId=' + pname[1]);
		inputs.push('palength=' + palength);
		var str = inputs.join('&');

		if (palength != "1") {
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PharmacyServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {

					// alert(ajaxResponse);
					pobj = eval('(' + ajaxResponse + ')');

					$("#patAdd").html(pobj.pl[0].a1);
					$("#patMobNo").val(pobj.pl[0].mb);
					$("#patName").val(pobj.pl[0].fn);

					$("#patId").val(pobj.pl[0].trid);
					$("#patType").val(pobj.pl[0].st);
					$("#docName").val(pobj.pl[0].rb);

				}
			});
		} else {
			$("#patType").val("N");
			$("#patId").val("0");
		}
		$("#patName").val(pname[0]);
	}, 200);
}

var pharmacyPatientInfoTemp = "<div style='width: 100%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'> <div style='width: 80%;'><div style='width: 100%;'><div style='width: 30%;'><div style='width: 100%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Patient ID .</div> <div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.pi}</div> </div>  </div> <div style='width: 40%;'> <div style='width: 100%; '> <div 	style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Patient Name</div> <div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.tit}{$T.fn}&nbsp;&nbsp;{$T.ln}</div> </div>  </div> <div style='width: 30%;'> <div style='width: 100%; '> <div 	style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Mobile NO.</div> <div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.mb}</div> </div>  </div>   </div> </div> </div></div>";

function setPharmacyPatInfo(myObj) {
	$("#commonPatInfo").setTemplate(pharmacyPatientInfoTemp);
	$("#commonPatInfo").processTemplate(myObj);
}

function viewAllItems(type) {

	count = 1;
	var ajaxResponse = 0;

	if (type == "MinQty") {
		$("#viewAllHeader").html("All Low Quantity Medicine.");
		ajaxResponse = $("#objMinQuantityItems").val();

	} else if (type == "ExpItems") {
		$("#viewAllHeader").html("All Expired Medicine.");
		ajaxResponse = $("#objExpiredItems").val();
	}
	pobj = eval('(' + ajaxResponse + ')');
	$("#viewAll").setTemplate($("#viewAllMinQtyItemsTemp").html());
	$("#viewAll").processTemplate(pobj);

}

function savePharmacyNewPatBill() {

	var patName = $("#patName").val();
	var patMobNo = $("#patMobNo").val();
	var patAdd = $("#patAdd").val();
	var docName = $("#docName").val();

	var patType = $("#patType").val();
	var patId = $("#patId").val();

	if (patName == "") {
		alert("Please Enter Patient Name!");
		SetFocus("patName");
		return false;
	} else if (patMobNo == "") {
		alert("Please Enter Patient Mobile No.!");
		SetFocus("patMobNo");
		return false;
	}

	var queryType = $("#queryType").val();

	var rowCount = $("#RowCount").val();
	var pharmacyBill = {
		phbli : []
	};

	var PhrBillId = $("#PhrBillId").val();
	var billamt = $("#billAmount").val();
	var tax = $("#tax").val();
	var addtax = $("#addTax").val();
	var discount = $("#discount").val();
	var totalamt = $("#totalamt").val();
	var note = $("#Note").val();

	pharmacyBill.phbli.push({
		"phrbl" : PhrBillId,
		"trid" : 0,
		"amt" : billamt,
		"tx" : tax,
		"adtx" : addtax,
		"dis" : discount,
		"tamt" : totalamt,
		"nt" : note

	});

	var medicineList = {
		phbcli : []
	};
	for ( var i = 1; i <= rowCount; i++) {
		var Medicine = $("#Medicine" + i).val();
		var ItemId = $("#ItemId" + i).html();
		var Price = $("#Price" + i).val();
		var Qty = $("#Qty" + i).val();
		var Amount = $("#Amount" + i).val();
		var $radios = $('input:checkbox[name=checkbox' + i + ']');
		var phrbcid = $($radios).val();
		if (Medicine == "") {
			alert("Please Enter Medicine Name!");
			SetFocus("Medicine");
			return false;
		} else if (Qty == "") {
			alert("Please Enter Quantity!");
			SetFocus("Qty");
			return false;
		} else if (Amount == "") {
			alert("Please Enter Amount!");
			SetFocus("Amount");
			return false;
		}
		if (billamt == "") {
			alert("Please Enter Bill Amount!");
			return false;
		} else if (tax == "") {
			alert("Please Enter Tax!");
			return false;
		} else if (addtax == "") {
			alert("Please Enter Additional Tax!");
			return false;
		} else if (discount == "") {
			alert("Please Enter Discount!");
			return false;
		} else if (totalamt = "") {
			alert("Please Enter Total Amount!");
			return false;
		}

		medicineList.phbcli.push({
			"idbc" : phrbcid,
			"iid" : ItemId,
			"prc" : Price,
			"amt" : Amount,
			"qty" : Qty
		});

	}

	medicineList = JSON.stringify(medicineList);
	pharmacyBill = JSON.stringify(pharmacyBill);
	var inputs = [];
	inputs.push('action=SavePharmacyNewPatBill');
	inputs.push('medicineList=' + medicineList);
	inputs.push('pharmacyBill=' + pharmacyBill);
	inputs.push('queryType=' + queryType);
	inputs.push('patName=' + patName);
	inputs.push('patMobNo=' + patMobNo);
	inputs.push('patAdd=' + patAdd);
	inputs.push('docName=' + docName);
	inputs.push('patType=' + patType);
	inputs.push('patId=' + patId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert('success: ' + ajaxResponse);
			// window.history.go(-2);
			// window.reload();
			window.location = "pharmacyBillDashboard.jsp";
		}
	});
}

function checkItemQuantity(count) {
	var qty = parseInt($("#Qty" + count).val());
	var availQty = parseInt($("#Avaiqty" + count).html());
	if (qty > availQty) {
		alert("Medicine Available quantity is less than you entered medicine quantity.");
		$("#Qty" + count).val("");
		$("#Amount" + count).val("");
		return false;
	} else {
		calculateAmount(count);
	}
}
function printPharmacyBill() {

	var rowCount = $("#RowCount").val();

	var patInfo = $("#patInfo").val();

	patInfo = eval('(' + patInfo + ')');

	var storeInfo = $("#storeInfo").val();

	storeInfo = eval('(' + storeInfo + ')');

	var WindowObject = window.open('', ' ', '');

	WindowObject.document
			.writeln('<div style="width: 100%;"><div style="width: 80%; text-align: laft;float:left;"><b	style=" font-size: 20px">'
					+ storeInfo.stoinfoli[0].stnm
					+ ' </b></div><div style="width: 20%; text-align: left;float:left;"><b	style=" font-size: 18px">INVOICE</b></div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%;"><div style="width: 80%; text-align: laft;float:left;padding-top:10px;"><div style="width: 100%;">'
					+ storeInfo.stoinfoli[0].add
					+ '</div><div style="width: 100%;">'
					+ storeInfo.stoinfoli[0].city
					+ '-'
					+ storeInfo.stoinfoli[0].zip
					+ ' ,</div><div style="width: 100%;"> '
					+ storeInfo.stoinfoli[0].stat
					+ ' , '
					+ storeInfo.stoinfoli[0].cntry
					+ ' . </div><div style="width: 100%;">Phone No. : '
					+ storeInfo.stoinfoli[0].phno
					+ '</div></div><div style="width: 20%; text-align: left;float:left;margin-bottom:7%;padding-top:10px;"><div style="width: 100%;">Date    : '
					+ $("#date").html()
					+ '</div><div style="width: 100%;">Bill No. : '
					+ $("#PhrBillId").val() + '</div></div></div>');

	WindowObject.document.writeln('<div style=" width: 100%;"> Bill To : '
			+ patInfo.tit + ' ' + patInfo.fn + ' ' + patInfo.mn + ' '
			+ patInfo.ln + '</div>');

	WindowObject.document
			.writeln('<div style="width: 100%; text-align: laft;float:left;padding-top:10px;"><div style="width: 8%;float:left;border: 1px solid black;padding-left:2px;text-align: center;">#</div><div style="width: 39%;float:left;border: 1px solid black;padding-left:2px;">Medicine Name</div><div style="width: 12%;float:left;border: 1px solid black;padding-left:2px;text-align: center;">Item ID</div><div style="width: 12%;float:left;border: 1px solid black;padding-left:2px;text-align: center;">Price</div><div style="width: 12%;float:left;border: 1px solid black;padding-left:2px;text-align: center;">Quantity</div><div style="width: 12%;float:left;border: 1px solid black;padding-left:2px;text-align: center;">Amount</div></div>');

	for ( var l = 1; l <= rowCount; l++) {

		WindowObject.document
				.writeln('<div style="width: 100%; text-align: laft;float:left;"><div style="width: 8%;float:left;border: 1px solid black;padding-left:2px;">'
						+ l
						+ '</div><div style="width: 39%;float:left;border: 1px solid black;padding-left:2px;">'
						+ $("#Medicine" + l).val()
						+ '</div><div style="width: 12%;float:left;border: 1px solid black;padding-left:2px;">'
						+ $("#ItemId" + l).html()
						+ '</div><div style="width: 12%;float:left;border: 1px solid black;padding-right:2px;text-align: right;">'
						+ $("#Price" + l).val()
						+ '</div><div style="width: 12%;float:left;border: 1px solid black;padding-right:2px;text-align: right;">'
						+ $("#Qty" + l).val()
						+ '</div><div style="width: 12%;float:left;border: 1px solid black;padding-right:2px;text-align: right;">'
						+ $("#Amount" + l).val() + '</div></div>');
	}

	WindowObject.document
			.writeln('<div style="width: 100%; text-align: laft;float:left;"><div style="width: 59%;float:left;border-top: 1px solid black;padding-left:10px;text-align: center;">&nbsp;</div><div style="width: 24%;float:left;border: 1px solid black;padding-left:6px;text-align: left;">Gross Amount</div><div style="width: 12%;float:left;border: 1px solid black;padding-right:2px;text-align: right;">'
					+ $("#billAmount").val() + '</div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; text-align: laft;float:left;"><div style="width: 59%;float:left;border: 1px solid white;padding-left:10px;text-align: center;">&nbsp;</div><div style="width: 24%;float:left;border: 1px solid black;padding-left:6px;text-align: left;">Tax</div><div style="width: 12%;float:left;border: 1px solid black;padding-right:2px;text-align: right;">'
					+ $("#tax").val() + '</div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; text-align: laft;float:left;"><div style="width: 59%;float:left;border: 1px solid white;padding-left:10px;text-align: center;">&nbsp;</div><div style="width: 24%;float:left;border: 1px solid black;padding-left:6px;text-align: left;">Additional Tax</div><div style="width: 12%;float:left;border: 1px solid black;padding-right:2px;text-align: right;">'
					+ $("#addTax").val() + '</div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; text-align: laft;float:left;"><div style="width: 59%;float:left;border: 1px solid white;padding-left:10px;text-align: center;">&nbsp;</div><div style="width: 24%;float:left;border: 1px solid black;padding-left:6px;text-align: left;">Discount</div><div style="width: 12%;float:left;border: 1px solid black;padding-right:2px;text-align: right;">'
					+ $("#discount").val() + '</div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; text-align: laft;float:left;"><div style="width: 59%;float:left;border: 1px solid white;padding-left:10px;text-align: center;">&nbsp;</div><div style="width: 24%;float:left;border: 1px solid black;padding-left:6px;text-align: left;">Total Amount</div><div style="width: 12%;float:left;border: 1px solid black;padding-right:2px;text-align: right;">'
					+ $("#totalamt").val() + '</div></div>');

	/*
	 * WindowObject.document .writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="3"><textarea
	 * rows="4" cols="3" style="width: 90%;font-weight: bold;" id="txtRefAdv">' +
	 * sssssssss.gg + '</textarea></td></tr></table></div>');
	 */

	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

}

function setPharmacyBillDetails() {
	count = 1;
	var ajaxResponse = $("#PharmacyDiv").html();
	myArray = JSON.parse(ajaxResponse);
	// alert(ajaxResponse);
	$("#divItem").setTemplate($("#divItem").html());
	$("#divItem").processTemplate(myArray);
	$("#PhrBillId").val(myArray.phrbl);
	$("#date").html(myArray.dt);

	$("#billAmount").val(myArray.amt);
	$("#tax").val(myArray.tx);
	$("#addTax").val(myArray.adtx);
	$("#discount").val(myArray.dis);
	$("#totalamt").val(myArray.tamt);
	$("#Note").val(myArray.nt);
	calculateBillAmount();
	calcutaleTotalAmount();
}

var minQtyItemsTemp = "<marquee behavior='scroll' direction='up' onmouseover='this.stop();' onmouseout='this.start();' scrollamount='4'>	{#foreach $T.itmli as itmli}	<div style='width: 100%; height: 28px; border-top: 1px solid #069;'>		<div			style='width: 70%; height: 23px; border-right: 1px solid #069; padding-top: 5px; padding-left: 2px;' title='Name : {$T.itmli.itnm}&#13;Type : {$T.itmli.itmTypNm}&#13;ID : {$T.itmli.iid}&#13;Available Quantity : {$T.itmli.avqty}&#13;Minimum Quantity : {$T.itmli.minqty}&#13;Expiry date : {$T.itmli.expdt}&#13;Batch No. : {$T.itmli.bchno}&#13;Mfg. By : {$T.itmli.mfgBy}&#13;'>{$T.itmli.itnm}</div>		<div			style='width: 27.5%; height: 23px; padding-left: 1%; padding-top: 5px;'>{$T.itmli.avqty}</div>	</div>	{#/for}	<div style='width: 100%; height: 28px; border-top: 1px solid #069;'>		&nbsp;</div></marquee>";

function fetchMinQuantityItems() {

	var inputs = [];
	inputs.push('action=fetchMinQuantityItems');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#objMinQuantityItems").val(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');

			$("#minQtyItems").setTemplate(minQtyItemsTemp);
			$("#minQtyItems").processTemplate(pobj);

		}
	});

}

var expiryItemsTemp = "<marquee behavior='scroll' direction='up' onmouseover='this.stop();' onmouseout='this.start();' scrollamount='4'>	{#foreach $T.itmli as itmli}	<div style='width: 100%; height: 28px; border-top: 1px solid #069;'>		<div			style='width: 70%; height: 23px; border-right: 1px solid #069; padding-top: 5px; padding-left: 2px;' title='Name : {$T.itmli.itnm}&#13;Type : {$T.itmli.itmTypNm}&#13;ID : {$T.itmli.iid}&#13;Available Quantity : {$T.itmli.avqty}&#13;Minimum Quantity : {$T.itmli.minqty}&#13;Expiry date : {$T.itmli.expdt}&#13;Batch No. : {$T.itmli.bchno}&#13;Mfg. By : {$T.itmli.mfgBy}&#13;'>{$T.itmli.itnm}</div>		<div			style='width: 27.5%; height: 23px; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.itmli.expdt}</div>	</div>	{#/for}	<div style='width: 100%; height: 28px; border-top: 1px solid #069;'>		&nbsp;</div></marquee>";

function fetchExpiredItems() {

	var inputs = [];
	inputs.push('action=fetchExpiredItems');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#objExpiredItems").val(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');

			$("#expiryItems").setTemplate(expiryItemsTemp);
			$("#expiryItems").processTemplate(pobj);

		}
	});

}
function viewPrePharmacyBilldetails(billID) {
	var ajaxResponse = $("#PharmacyDiv").html();
	var pharmacyPatInfo = $("#pharmacyPatInfo").html();
	myArray = JSON.parse(ajaxResponse);
	var pid = $("#pid").val();
	for ( var i = 0; i < myArray.phbli.length; i++) {

		if (myArray.phbli[i].phrbl == billID) {

			myObj = myArray.phbli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	window.location = "pharmacy_preBill.jsp?" + "myObj=" + myObj + "&pid="
			+ pid + "&pharmacyPatInfo=" + pharmacyPatInfo;

}

var billList = "{#foreach $T.phbli as phbli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>									<div										style='width: 20.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.phbli.phrbl}										 </div>									<div										style='width: 20.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>										{$T.phbli.trid}</div>										<div										style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>										{$T.phbli.dt}</div>									<div										style='width: 12.2%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>										<input style='font-size: 10px;' type='button' value='View'											class='edit'											onClick='viewPrePharmacyBilldetails({$T.phbli.phrbl})' />									</div>								</div>								{#/for}";

function viewPrePharmacyBillTreatment(trid, pid) {

	var patientType = $("input[type='radio'][name='patientType']:checked")
			.val();
	if (patientType == "pharmacyPatient") {
		var PharmacyDiv = $("#PharmacyPatientDiv").html();
		var myArray = JSON.parse(PharmacyDiv);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == pid) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		$("#pharmacyPatInfo").html(myObj);

	}
	count = 1;
	var inputs = [];
	inputs.push('action=viewPrePharmacyBillTreatment');
	inputs.push('trid=' + trid);
	inputs.push('patientType=' + patientType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);patientDocTreatment
			$("#PharmacyDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#pid").val(pid);
			$("#billList").setTemplate(billList);
			$("#billList").processTemplate(pobj1);

		}
	});
}

var prePharmacyBillPatientTemp = "{#foreach $T.pl as pl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div	style='width: 21%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'><input style='font-size: 10px;' type='button' value='>>' class='edit' onClick='viewPrePharmacyBillTreatment({$T.pl.trid},{$T.pl.pi})' /></div></div>{#/for}";

function viewPrePharmacyBillPatient() {

	var patientType = $("input[type='radio'][name='patientType']:checked")
			.val();

	var inputs = [];
	inputs.push('action=fetchPrePharmacyBill');
	inputs.push('patientType=' + patientType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			count = 1;
			$("#PharmacyDiv").html(ajaxResponse);
			$("#PharmacyPatientDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(prePharmacyBillPatientTemp);
			$("#container").processTemplate(pobj1);

		}
	});
}
var pharmacyBillTemplate = "{#foreach $T.pl as pl}								<div									style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>									<div										style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>									<div										style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}										{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div>									<div										style='width: 17%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.pl.rgDt}</div>									<div id='divPi{count}'										style='width: 11.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.pi}</div>									<div										style='width: 12%; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px; text-align: center;'>										<input style='font-size: 10px;' type='button' value='VIEW'											class='edit' id='btnView{count}' onClick='passToView(this)' />									</div>								<div										style='width: 18.9%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>										<input style='font-size: 10px;' type='button' value='GENERATE'											class='edit' onClick='ViewPharmacyBill(this,{$T.pl.pi})' />									</div>								</div>								{#/for} ";

function viewPatientForPharmacy() {
	var inputs = [];
	inputs.push('action=fetch');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);patientDocTreatment
			$("#PharmacyDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#container").setTemplate(pharmacyBillTemplate);
			$("#container").processTemplate(pobj1);

		}
	});

}
function passToView(btnView) {

	var btnViewId = btnView.id;
	var divPi = "divPi";
	var bSplit = btnViewId.split("btnView");
	var aSplit = bSplit.slice(1);
	var divId = divPi + aSplit;

	divPi = $("#" + divId).html();
	ajaxResponse = $("#PharmacyDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == divPi) {

			myObj = myArray.pl[i];
			break;
		}
	}
	files_name = myObj.files_name;
	files_path = myObj.files_path;

	myObj = JSON.stringify(myObj);

	window.location = "PatientEdit.jsp?" + "myObj=" + myObj
			+ "&showSaveBtn=No&fileNames=" + files_name + "&imgPath="
			+ files_path;
}

function ViewPharmacyBill(btnbill, pid) {

	var billtype = btnbill.value;
	// alert(billtype);
	billtype = "S Roplekar";
	ajaxResponse = $("#PharmacyDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == pid) {

			myObj = myArray.pl[i];
			break;
		}
	}
	var fn = myObj.fn;
	var mn = myObj.mn;
	var ln = myObj.ln;
	var pname = fn + " " + mn + " " + ln;
	myObj = JSON.stringify(myObj);

	window.location = "pharmacyBill.jsp?" + "myObj=" + myObj + "&billtype="
			+ billtype + "&pname=" + pname;

}

/** **************Add Pharmacy Bill Division********************** */
function createDivPharmacyitem() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	var Medicine = $("#Medicine" + rowCount + "").val();
	var Days = $("#Days" + rowCount + "").val();
	var Qty = $("#Qty" + rowCount + "").val();

	if (Medicine == "") {
		alert("Please fill the Previously added row");
		SetFocus("Medicine");
		return false;
	} else if (Qty == "") {
		alert("Please Enter Quantity!");
		SetFocus("Qty");
		return false;
	}

	rowCount++;

	divId = "div" + rowCount;
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style', 'width: 100%; ');
	document.getElementById("divItem").appendChild(x);
	document.getElementById(divId).innerHTML = '<div style="width: 100%; border: 1px solid #b8b8b8; border-top: none;" id="prescription'
			+ (rowCount)
			+ '" ><div	style="width: 5%; text-align: center; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 22px;">'
			+ (rowCount)
			+ '</div><div style="width: 32%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input type="text" onchange="getItemDetails('
			+ (rowCount)
			+ ')" style="width: 100%" class="auto" id="Medicine'
			+ rowCount
			+ '"></div><div	style="width: 10%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center" id="ItemId'
			+ rowCount
			+ '"></div><div style="width: 9.8%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;"	align="center" id="Avaiqty'
			+ rowCount
			+ '"></div><div style="width:8.3%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input style="width: 100%" type="text" id="Price'
			+ rowCount
			+ '" /></div><div style="width: 7%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8; height: 26px;" align="center"> <input type="text" style="width: 100%" onchange="checkItemQuantity('
			+ rowCount
			+ ')"   id="Qty'
			+ rowCount
			+ '" /></div><div style="width: 12%; padding-left: 1%; padding-right: 1%; padding-top: 4px; border-right: 1px solid #b8b8b8;  height: 26px;" align="center"> <input type="text" style="width: 100%" onclick="calculateAmount(1)"  id="Amount'
			+ rowCount
			+ '"> </div> <div style="padding-top: 4px; height: 22px;" align="center"><input type="checkbox" value="0" name="checkbox'
			+ rowCount + '" /></div></div>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

	$(".auto").autocomplete("AutoSuggetionServlet?auto=pharmacy");
}

/** **************Remove Pharmacy Bill Division********************** */
function removeDivPharmacyitem(RowCount) {
	var r = confirm("Are You Confirm To Delete This Bill Component.");
	if (r == true) {
		var hiddenRowCount = document.getElementById(RowCount);
		var rowCount = hiddenRowCount.value;
		// alert(rowCount);
		var allVals = [];
		for ( var n = 1; n <= rowCount; n++) {

			var $radios = $('input:checkbox[name=checkbox' + n + ']');
			if ($radios.is(':checked') == true) {

				if ($radios.val() != 0) {

					allVals.push($radios.val());
				}

				$("#prescription" + n).remove();
			}
		}
		if (allVals.length > 0) {
			deleteBillCompDetails(allVals);
		}
	}
}

function deleteBillCompDetails(allVals) {

	var inputs = [];
	inputs.push('action=DeleteBillCompDetails');
	inputs.push('allVals=' + allVals);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});

}

function getItemDetails(count) {
	setTimeout(function() {
		var pname = $("#Medicine" + count).val();
		var itemid = pname.split("_");
		var inputs = [];
		inputs.push('action=FetchItemDetails');
		inputs.push('itemID=' + itemid[1]);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {

				// alert(ajaxResponse);
				pobj = eval('(' + ajaxResponse + ')');
				var itemobj = pobj.itmli[0];
				$("#ItemId" + count).html(itemid[1]);
				$("#Medicine" + count).val(itemid[0]);
				$("#Avaiqty" + count).html(itemobj.avqty);
				// alert(parseFloat(itemobj.sprc));
				$("#Price" + count).val(parseFloat(itemobj.sprc));
			}
		});

	}, 500);

}

function calcutaleTotalAmount() {
	var tax = $("#tax").val();
	var addTax = $("#addTax").val();
	var discount = $("#discount").val();
	var billAmount = $("#billAmount").val();
	var totalamount = parseFloat(billAmount)
			* ((100 + parseFloat(tax) + parseFloat(addTax) - parseFloat(discount)) / 100);
	$("#totalamt").val(parseFloat(totalamount));
}

function calculateAmount(count) {
	var price = $("#Price" + count).val();
	var qty = $("#Qty" + count).val();
	var amount = parseFloat(price) * parseFloat(qty);
	$("#Amount" + count).val(parseFloat(amount));
	calculateBillAmount();
	calcutaleTotalAmount();
}

function calculateBillAmount() {
	var rowCount = $("#RowCount").val();
	var billAmount = 0;
	for ( var i = 1; i <= rowCount; i++) {
		billAmount = billAmount + parseFloat($("#Amount" + i).val());
	}
	$("#billAmount").val(parseFloat(billAmount));
}

function SavePharmacyBill() {
	var PreTreat = $("#PharmacyDiv").html();
	pobj = eval('(' + PreTreat + ')');

	var queryType = $("#queryType").val();

	var rowCount = $("#RowCount").val();
	var pharmacyBill = {
		phbli : []
	};

	var PhrBillId = $("#PhrBillId").val();
	var billamt = $("#billAmount").val();
	var tax = $("#tax").val();
	var addtax = $("#addTax").val();
	var discount = $("#discount").val();
	var totalamt = $("#totalamt").val();
	var note = $("#Note").val();

	pharmacyBill.phbli.push({
		"phrbl" : PhrBillId,
		"trid" : pobj.trid,
		"amt" : billamt,
		"tx" : tax,
		"adtx" : addtax,
		"dis" : discount,
		"tamt" : totalamt,
		"nt" : note

	});

	var medicineList = {
		phbcli : []
	};
	for ( var i = 1; i <= rowCount; i++) {
		var Medicine = $("#Medicine" + i).val();
		var ItemId = $("#ItemId" + i).html();
		var Price = $("#Price" + i).val();
		var Qty = $("#Qty" + i).val();
		var Amount = $("#Amount" + i).val();
		var $radios = $('input:checkbox[name=checkbox' + i + ']');
		var phrbcid = $($radios).val();
		if (Medicine == "") {
			alert("Please Enter Medicine Name!");
			SetFocus("Medicine");
			return false;
		} else if (Qty == "") {
			alert("Please Enter Quantity!");
			SetFocus("Qty");
			return false;
		} else if (Amount == "") {
			alert("Please Enter Amount!");
			SetFocus("Amount");
			return false;
		}
		if (billamt == "") {
			alert("Please Enter Bill Amount!");
			return false;
		} else if (tax == "") {
			alert("Please Enter Tax!");
			return false;
		} else if (addtax == "") {
			alert("Please Enter Additional Tax!");
			return false;
		} else if (discount == "") {
			alert("Please Enter Discount!");
			return false;
		} else if (totalamt = "") {
			alert("Please Enter Total Amount!");
			return false;
		}

		medicineList.phbcli.push({
			"idbc" : phrbcid,
			"iid" : ItemId,
			"prc" : Price,
			"amt" : Amount,
			"qty" : Qty
		});

	}

	medicineList = JSON.stringify(medicineList);
	pharmacyBill = JSON.stringify(pharmacyBill);
	var inputs = [];
	inputs.push('action=SavePharmacyBill');
	inputs.push('medicineList=' + medicineList);
	inputs.push('pharmacyBill=' + pharmacyBill);
	inputs.push('queryType=' + queryType);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert('success: ' + ajaxResponse);
			// window.history.go(-2);
			// window.reload();
			window.location = "pharmacyBillDashboard.jsp";
		}
	});
}

function getPharmacyBillID() {
	var inputs = [];
	inputs.push('action=PharmacyBillId');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#PhrBillId").val(ajaxResponse);

		}
	});
}

function serchPharmacypatientPreBill() {
	var $radios = $('input:checkbox[name=patientType]');
	var patientType = $($radios).val();
	var inputs = [];
	inputs.push('action=serchPharmacypatientPreBill');
	inputs.push('patientType=' + patientType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#PhrBillId").val(ajaxResponse);

		}
	});
}

function getPatientDetails(count) {
	setTimeout(function() {
		var pname = $("#patName").val();
		var patient = pname.split("_");
		var inputs = [];
		inputs.push('action=FetchPatientDetails');
		inputs.push('itemID=' + patient[1]);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {

				// alert(ajaxResponse);
				pobj = eval('(' + ajaxResponse + ')');
				var itemobj = pobj.itmli[0];
				$("#ItemId" + count).html(itemid[1]);
				$("#Medicine" + count).val(itemid[0]);
				$("#Avaiqty" + count).html(itemobj.avqty);
				// alert(parseFloat(itemobj.sprc));
				$("#Price" + count).val(parseFloat(itemobj.sprc));
			}
		});

	}, 500);

}
/** *******************Pharmacy Bill************************** */
/** ********** Start Item Type Management************************** */
function deleteItemType(idit) {
	var r = confirm("Are You Confirm To Delete Item Type.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteItemType');
		inputs.push('itemTypeID=' + idit);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}
var addItemTypebtnTemp = '<input onclick="addItemtypeDetails()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add OT" />';

function setAddItemTypebtnTemp() {
	var userBean;
	$("#AddItemTypebtnTemp").setTemplate(addItemTypebtnTemp);
	$("#AddItemTypebtnTemp").processTemplate(userBean);
}
var addItemTypeTemp = "<div style='height: 300px; border: 1px solid #436a9d; padding-left: 5%;'>	<div class='col-md-12-1 center' style='padding-top: 5%;'>		<h4>Add Item Type Details:</h4>	</div>	<div class='col-md-12-1'>		<div class='col-md-2-1' style='padding-top: 7.5%;'>Item Type Name:</div>		<div class='col-md-8-1' style='padding-top: 7%;'>	<div class='divide-10'></div>		<input type='text' id='itemTypeName' name='OTname' class='col-md-10-1' />			<div style=' color: red; float: right;' class='col-md-1-1'>				<b>*</b>			</div>		</div>	</div>	<div class='col-md-12-1'>		<div class='col-md-2-1' style='padding-top: 7.5%;'>Additional Note:</div>		<div class='col-md-8-1' style='padding-top: 7%;'>			<textarea id='note' name='note' class='col-md-12-1' rows='5'></textarea>		</div>	</div>	<input type='hidden' id='queryType' value='insert'></div>";

function addItemtypeDetails() {
	var userBean;
	$("#ItemTypeDiv").setTemplate(addItemTypeTemp);
	$("#ItemTypeDiv").processTemplate(userBean);
	$("#itemTypeName").focus();
}

var defaultViewItemTypeTemp = "{#foreach $T.itypli as itypli}	<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>		<div			style='width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>		<div id='divPi{count}'			style='width: 16.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center'>{$T.itypli.idit}	</div>		<div			style='width: 40.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.itypli.itnm}</div>		<div			style='width: 16.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>			<input style='font-size: 10px;' type='button' value='EDIT'				class='edit' id='btnEdit{count}'				onclick='editItemType({$T.itypli.idit})' />		</div>		<div			style='width: 16.3%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>			<input style='font-size: 10px;' type='button' value='DELETE'				class='edit' id='btnDelete{count}'				onClick='deleteItemType({$T.itypli.idit})' />		</div>		{#/for}";

function defaultViewItemType(type) {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchItemtypeName');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			if (type == "item") {
				$("#itemType").val(ajaxResponse);
			} else {
				$("#PharmacyDiv").html(ajaxResponse);
			}

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#ItemTypeList").setTemplate(defaultViewItemTypeTemp);
			$("#ItemTypeList").processTemplate(pobj1);
		}
	});
}

var editItemTypeTemp = "<div style='height: 300px; border: 1px solid #436a9d; padding-left: 5%;'>		<div style='width: 80%; padding-top: 5%;'>			<h2>Edit Item Type Details:</h2>		</div>		<div style='width: 100%;'>			<div style='width: 27%; padding-top: 7.5%;'>Item Type ID:</div>			<div style='width: 70%; padding-top: 7%;'>				<input type='text' id='itemTypeID' name='itemTypeID'					style='width: 90%;' value='{$T.idit}' />		<div style='width: 5%; color: red; float: right;'>					<b>*</b>				</div>			</div>		</div>		<div style='width: 100%;'>			<div style='width: 27%; padding-top: 7.5%;'>Item Type Name:</div>			<div style='width: 70%; padding-top: 7%;'>				<input type='text' id='itemTypeName' name='itemTypeName'					style='width: 90%;' value='{$T.itnm}' />				<div style='width: 5%; color: red; float: right;'>					<b>*</b>			</div>			</div>		</div>		<div style='width: 100%;'>			<div style='width: 27%; padding-top: 7.5%;'>Additional Note:</div>			<div style='width: 70%; padding-top: 7%;'>				<textarea id='note' name='note' style='width: 90%;' rows='5' >{$T.itnt}</textarea>			</div>		</div>		<input type='hidden' id='queryType' value='update'>	</div>";

function editItemType(idit) {

	ajaxResponse = $("#PharmacyDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.itypli.length; i++) {
		if (myArray.itypli[i].idit == idit) {
			myObj = myArray.itypli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	itemTypeBean = eval('(' + myObj + ')');

	$("#ItemTypeDiv").setTemplate(editItemTypeTemp);
	$("#ItemTypeDiv").processTemplate(itemTypeBean);
	setAddItemTypebtnTemp();
}

function searchItemtype() {
	count = 1;
	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter Item type Name.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + strValue);
	inputs.push('action=searchItemtype');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			$("#PharmacyDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.itypli.length == 0) {
				alert("Item Type Name Not Found");
			} else {
				$("#ItemTypeList").setTemplate(defaultViewItemTypeTemp);
				$("#ItemTypeList").processTemplate(pobj1);
			}
		}
	});
}
function saveItemtypeDetails() {
	var itemtypeID = $("#itemTypeID").val();
	var note = $("#note").val();
	var itemTypeName = $("#itemTypeName").val();

	var queryType = $("#queryType").val();
	if (itemTypeName == "") {
		alert("Please Enter item Type Name.");
	} else {

		var inputs = [];
		inputs.push('action=SaveitemTypeName');
		inputs.push('queryType=' + queryType);
		inputs.push('itemtypeID=' + itemtypeID);
		inputs.push('note=' + note);
		inputs.push('itemTypeName=' + itemTypeName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "pharmacy_item_type.jsp";
			}
		});
	}
}
/** ********** Start Item Type Management************************** */

/** ***************** Manufacturer management start ****************** */

var addManufacturerbtnTemp = '<input onclick="addOperationTheaterDetails()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add OT" />';

function setAddManufacturerbtnTemp() {
	var userBean;
	$("#addOtDiv").setTemplate(addManufacturerbtnTemp);
	$("#addOtDiv").processTemplate(userBean);
}
var addManufacturerTemp = "<div style='height: 300px; border: 1px solid #436a9d; padding-left: 5%;'>	<div class='col-md-12-1 center' style='padding-top: 5%;'>		<h4>Add Manufacturer Details:</h4>	</div>	<div class='col-md-12-1'>		<div class='col-md-2-1' style='padding-top: 7.5%;'>Name:</div>		<div class='col-md-8-1' style='padding-top: 7%;'>			<div class='divide-10'></div>			<input type='text' id='ManufacturerName' class='col-md-10-1' />			<div class='col-md-1-1'style='color: red; float: right;'>				<b>*</b>			</div>		</div>	</div>	<div class='col-md-12-1'>		<div class='col-md-2-1' style='padding-top: 7.5%;'><div class='divide-10'></div>Address:</div>		<div class='col-md-8-1' style='padding-top: 7%;'>		<div class='divide-20'></div>	<textarea id='note' name='note' class='col-md-12-1' rows='5'></textarea>		</div>	</div>	<input type='hidden' id='queryType' value='insert'></div>";

function addManufacturerDetails() {
	var userBean;
	$("#ManufacturerDiv").setTemplate(addManufacturerTemp);
	$("#ManufacturerDiv").processTemplate(userBean);

	$("#ManufacturerName").focus();
}

var defaultViewManufacturerTemp = "{#foreach $T.mfli as mfli}	<tr>		<td class='col-md-1-1'>{count++}.</td>		<td class='col-md-3-1'><{$T.mfli.idmf}</td>		<td class='  numeric col-md-5-1 ' id='ItemId1'>{$T.mfli.mfnm}</td>		<td class='  numeric col-md-2-1' id='Avaiqty1'><div				class='TextFont'>				<input style='font-size: 10px;' type='button' value='EDIT'					class='form-control input-SmallText col-md-12-1 margin-1 edit'					id='btnEdit{count}' onclick='editManufacturer({$T.mfli.idmf})' />			</div></td>		<td class='  numeric col-md-2-1'>			<div class='TextFont'>				<input style='font-size: 10px;' type='button' value='DELETE'					class='form-control input-SmallText col-md-12-1 margin-1 edit'					id='btnDelete{count}'					onClick='deleteManufacturerDetails({$T.mfli.idmf})' /> <input					type='text' id='Price1'>			</div>		</td>	</tr>{#/for}";

function defaultViewManufacturer(type) {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchAllManufacturer');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			if (type == "item") {
				$("#itemMfg").val(ajaxResponse);
			} else {
				$("#PharmacyDiv").html(ajaxResponse);
			}
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#ManufacturerList").setTemplate(defaultViewManufacturerTemp);
			$("#ManufacturerList").processTemplate(pobj1);

		}
	});
}

var editManufacturerTemp = "<div style='height: 310px; border: 1px solid #436a9d; padding-left: 5%;'>		<div style='width: 80%; padding-top: 5%;'>			<h2>Edit Manufacturer Details:</h2>		</div>		<div style='width: 100%;'>			<div style='width: 27%; padding-top: 7.5%;'>  ID:</div>			<div style='width: 70%; padding-top: 7%;'>{$T.idmf}				<input type='hidden' id='ManufacturerID'   readonly='readonly'  name='ManufacturerID'					style='width: 90%;' value='{$T.idmf}' />					</div>		</div>		<div style='width: 100%;'>			<div style='width: 27%; padding-top: 7.5%;'>  Name:</div>			<div style='width: 70%; padding-top: 7%;'>				<input type='text' id='ManufacturerName' 					style='width: 90%;' value='{$T.mfnm}' />				<div style='width: 5%; color: red; float: right;'>					<b>*</b>			</div>			</div>		</div>		<div style='width: 100%;'>			<div style='width: 27%; padding-top: 7.5%;'>Address:</div>			<div style='width: 70%; padding-top: 7%;'>		<textarea id='note' name='note' style='width: 90%;' rows='5' >{$T.mfct}</textarea>					</div>		</div>		<input type='hidden' id='queryType' value='update'>	</div>";

function editManufacturer(idmf) {

	ajaxResponse = $("#PharmacyDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.mfli.length; i++) {
		if (myArray.mfli[i].idmf == idmf) {
			myObj = myArray.mfli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	ManufacturerBean = eval('(' + myObj + ')');

	$("#ManufacturerDiv").setTemplate(editManufacturerTemp);
	$("#ManufacturerDiv").processTemplate(ManufacturerBean);
	setAddManufacturerbtnTemp();
}

function searchManufacturer() {
	count = 1;
	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter Manufacturer Name.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + strValue);
	inputs.push('action=searchManufacturer');

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PharmacyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					ajaxResponse = r;

					$("#PharmacyDiv").html(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					if (pobj1.mfli.length == 0) {
						alert("Manufacturer Name Not Found");
					} else {
						$("#ManufacturerList").setTemplate(
								defaultViewManufacturerTemp);
						$("#ManufacturerList").processTemplate(pobj1);
					}
				}
			});
}

function saveManufacturerDetails() {

	var manufacturerID = $("#ManufacturerID").val();
	var note = $("#note").val();
	var manufacturerName = $("#ManufacturerName").val();

	var queryType = $("#queryType").val();
	if (manufacturerName == "") {
		alert("Please Enter manufacturer Name.");
	} else {

		var inputs = [];
		inputs.push('action=SaveManufacturerDetails');
		inputs.push('queryType=' + queryType);
		inputs.push('manufacturerID=' + manufacturerID);
		inputs.push('note=' + note);
		inputs.push('manufacturerName=' + manufacturerName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "pharmacy_manufacturer_mgmt.jsp";
			}
		});
	}
}

function deleteManufacturerDetails(idmf) {
	var r = confirm("Are You Confirm To Delete Manufacturer Details.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deleteManufacturerDetails');
		inputs.push('idmf=' + idmf);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}
/** ***************** Manufacturer management end ****************** */

/** ********** Start Store Info************************** */
function deleteStore(idit) {
	var r = confirm("Are You Confirm To Delete Store Info.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deleteStoreInfo');
		inputs.push('storeID=' + idit);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

var addStoreTemp = "<div	style='height: 300px; border: 1px solid #436a9d; padding-left: 5%;'><div style='width: 80%;padding-top: 5%;'><h2>Add Item Type Details:</h2></div><div style='width: 100%;'><div style='width: 27%; padding-top: 7.5%;'>Item Type Name:</div><div style='width: 70%; padding-top: 7%;'><input type='text' id='StoreName' name='OTname' style='width: 90%;' /><div style='width: 5%; color: red; float: right;'><b>*</b></div></div></div><div style='width: 100%;'><div style='width: 27%; padding-top: 7.5%;'>Additional Note:</div><div style='width: 70%; padding-top: 7%;'><textarea id='note' name='note' style='width: 90%;' rows='5' ></textarea>	</div></div><input type='hidden' id='queryType' value='insert'></div>";

function addStoreDetails() {
	var userBean;
	$("#StoreDiv").setTemplate($("#StoreDiv").html());
	$("#StoreDiv").processTemplate(userBean);
	$("#StoreName").focus();
}

var defaultViewStoreTemp = "{#foreach $T.stoinfoli as stoinfoli}	<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>		<div			style='width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>		<div id='divPi{count}'			style='width: 16.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center'>{$T.itypli.idit}	</div>		<div			style='width: 40.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.itypli.itnm}</div>		<div			style='width: 16.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>			<input style='font-size: 10px;' type='button' value='EDIT'				class='edit' id='btnEdit{count}'				onclick='editStore({$T.itypli.idit})' />		</div>		<div			style='width: 16.3%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>			<input style='font-size: 10px;' type='button' value='DELETE'				class='edit' id='btnDelete{count}'				onClick='deleteStore({$T.itypli.idit})' />		</div>		{#/for}";

function defaultViewStore(type) {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchStoreInfo');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			if (type == "bill") {

				$("#storeInfo").val(ajaxResponse);
			}

			$("#PharmacyDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#StoreList").setTemplate($("#StoreList").html());
			$("#StoreList").processTemplate(pobj1);
		}
	});
}

var editStoreTemp = "<div style='height: 333px; border: 1px solid #436a9d; padding-left: 5%;'>	<div class='divide-10'></div><div class='col-md-12-1 center'><h4>Add Store Info:</h4></div>	<div class='col-md-12-1 center' style='padding-top: 5%;'><div class='col-md-2-1'>Store Name:</div><div class='col-md-10-1 center'>	<input type='text' id='StoreName' style='width: 90%;' /><div style='width: 5%; color: red; float: right;'><b>*</b></div></div></div><div class='col-md-12-1 center' style='padding-top: 5%;'><div class='divide-10'></div><div class='col-md-2-1'>Store Address:</div><div class='col-md-10-1 center'><textarea id='add' name='add' style='width: 90%;' rows='3'></textarea></div></div><div class='col-md-12-1 center' style='padding-top: 5%;'><div class='divide-10'></div><div class='col-md-2-1'>City:</div><div class='col-md-10-1 center'><input type='text' id='city' style='width: 90%;' /><div style='width: 5%; color: red; float: right;'><b>*</b></div></div></div><div class='col-md-12-1 center' style='padding-top: 5%;'><div class='divide-10'></div><div class='col-md-2-1'>State :</div>	<div class='col-md-10-1 center'><input type='text' id='state' style='width: 90%;' /><div style='width: 5%; color: red; float: right;'>	<b>*</b></div></div></div>	<div class='col-md-12-1 center' style='padding-top: 5%;'>	<div class='divide-10'></div><div class='col-md-2-1'>Zip Code:</div><div class='col-md-10-1 center'><input type='text' id='zip' style='width: 90%;' /><div style='width: 5%; color: red; float: right;'><b>*</b></div>	</div>	</div>	<div class='col-md-12-1 center' style='padding-top: 5%;'>	<div class='divide-10'></div>	<div class='col-md-2-1'>Country :</div><div class='col-md-10-1 center'>	<input type='text' id='country' name='country'	style='width: 90%;' />	<div style='width: 5%; color: red; float: right;'>	<b>*</b></div>	</div></div><div class='col-md-12-1 center' style='padding-top: 5%;'><div class='divide-10'></div>	<div class='col-md-2-1'>Phone Number :</div><div class='col-md-10-1 center'><input type='text' id='contact' name='contact'	style='width: 90%;' /><div style='width: 5%; color: red; float: right;'><b>*</b></div>	</div>	</div>	<input type='hidden' id='queryType' value='insert'>	</div>		<input type='hidden' id='queryType' value='update'>	</div>";

function editStore(idsto) {

	ajaxResponse = $("#PharmacyDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.stoinfoli.length; i++) {
		if (myArray.stoinfoli[i].idsto == idsto) {
			myObj = myArray.stoinfoli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	StoreBean = eval('(' + myObj + ')');

	$("#StoreInfoDiv").setTemplate(editStoreTemp);
	$("#StoreInfoDiv").processTemplate(StoreBean);
}

function searchStore() {
	count = 1;
	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter Item type Name.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + strValue);
	inputs.push('action=searchStore');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			$("#PharmacyDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.stoinfoli.length == 0) {
				alert("Store Info Not Found");
			} else {
				$("#StoreList").setTemplate(defaultViewStoreTemp);
				$("#StoreList").processTemplate(pobj1);
			}
		}
	});
}
function saveStoreDetails() {
	var StoreID = $("#StoreID").val();
	var add = $("#add").val();
	var StoreName = $("#StoreName").val();
	var city = $("#city").val();
	var state = $("#state").val();
	var contact = $("#contact").val();
	var country = $("#country").val();
	var zip = $("#zip").val();
	var queryType = $("#queryType").val();
	if (StoreName == "") {
		alert("Please Enter Store Name.");
		SetFocus("StoreName");
	} else if (add == "") {
		alert("Please Enter Store Address!");
		SetFocus("add");
		return false;

	} else if (city == "") {
		alert("Please Enter City Name!");
		SetFocus("city");
		return false;

	} else if (state == "") {
		alert("Please Enter State Name!");
		SetFocus("state");
		return false;

	} else if (zip == "") {
		alert("Please Enter Zip Code!");
		SetFocus("zip");
		return false;
	} else if (country == "") {
		alert("Please Enter Country Name!");
		SetFocus("country");
		return false;

	} else if (contact == "") {
		alert("Please Enter Contact Number!");
		SetFocus("contact");
		return false;

	}

	else {

		var inputs = [];
		inputs.push('action=SaveStoreInfo');
		inputs.push('queryType=' + queryType);
		inputs.push('StoreID=' + StoreID);
		inputs.push('add=' + add);
		inputs.push('StoreName=' + StoreName);
		inputs.push('city=' + city);
		inputs.push('state=' + state);
		inputs.push('contact=' + contact);
		inputs.push('country=' + country);
		inputs.push('zip=' + zip);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "pharmacy_store_info.jsp";
			}
		});

	}

}
/** ********** End Store Info************************** */

/** ***************** item start ****************** */

var additembtnTemp = '<input onclick="addOperationTheaterDetails()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add OT" />';

function setAdditembtnTemp() {
	var userBean;
	$("#addOtDiv").setTemplate(additembtnTemp);
	$("#addOtDiv").processTemplate(userBean);
}
var additemTemp = "<div style='height: 360px; border: 1px solid #436a9d; padding-left: 5%;'>	<div class='col-md-12-1' style='padding-top: 2%;'>		<h4>Add item Details:</h4>	</div>	<div class='col-md-12-1' style='padding-top: 3%;'>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>			<div class='col-md-2-1'>Item Type</div>			<div class='col-md-5-1' style='margin-left: 77px'>			<div class='divide-10'></div>					<select id='selItemtype' class='col-md-12-1'></select>			</div>			<div class='col-md-1' style='color: red; padding-left: 5px;'>				<b>*</b>			</div>		</div>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>			<div class='col-md-2-1'>Mfg. Name</div>			<div class='col-md-5-1' style='margin-left: 77px'>			<div class='divide-10'></div>				<select id='selMfg' class='col-md-12-1'></select>			</div>		</div>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>		<div class='col-md-2-1'>Name</div>			<div class='col-md-10-1'>				<input type='text' id='txtItmNm' />			</div>		</div>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>			<div class='col-md-2-1''>Batch No.</div>			<div class='col-md-10-1''>				<input type='text' id='txtBatchNo' />			</div>		</div>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>			<div class='col-md-2-1''>Qty. Available</div>			<div class='col-md-10-1'>				<input type='text' id='txtQtyAva'					onkeypress='return validatePrice(event)' />			</div>		</div>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>			<div class='col-md-2-1'>Qty. Minimum</div>			<div class='col-md-10-1'>				<input type='text' id='txtQtyMin'					onkeypress='return validatePrice(event)' />			</div>		</div>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>			<div class='col-md-2-1'>Cost Price</div>			<div class='col-md-10-1'>				<input type='text' id='txtCostPri'					onkeypress='return validatePrice(event)' />			</div>		</div>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>			<div class='col-md-2-1'>Exp. Date</div>			<div class='col-md-10-1'>				<input type='text' id='txtExpDate' onclick='setCalander()' />			</div>		</div>		<div class='col-md-12-1' style='padding-top: 3%;'>			<div class='divide-10'></div>			<div class='col-md-2-1'>Selling Price</div>			<div class='col-md-10-1'>				<input type='text' id='txtSelPri'					onkeypress='return validatePrice(event)' />			</div>		</div>		<div style='padding-top: 3%;'>			<div class='divide-20'></div>			<div class='col-md-2-1' style='padding-top:3%'>Notes</div>			<div class='col-md-8-1'><div class='divide-20'></div>				<textarea type='text' id='txtNote' rows='2' cols='27'></textarea>			</div>		</div>	</div></div><input type='hidden' id='queryType' value='insert' />";

function additemDetails() {
	var userBean;
	$("#itemDiv").setTemplate(additemTemp);
	$("#itemDiv").processTemplate(userBean);

	$("#itemName").focus();

	setSelItemType();
}

var setSelItemTypeTemp = "{#foreach $T.itypli as itypli}  <option	value='{$T.itypli.idit}' > {$T.itypli.itnm} </option> {#/for}";

function setSelItemType() {
	var itemTypeobj = $("#itemType").val();
	itemTypeobj = eval('(' + itemTypeobj + ')');
	$("#selItemtype").setTemplate(setSelItemTypeTemp);
	$("#selItemtype").processTemplate(itemTypeobj);

	setSelMfgNm();
}

var setSelMfgNmTemp = "{#foreach $T.mfli as mfli}  <option	value='{$T.mfli.idmf}' > {$T.mfli.mfnm} </option> {#/for}";

function setSelMfgNm() {
	var itemTypeobj = $("#itemMfg").val();
	itemTypeobj = eval('(' + itemTypeobj + ')');
	$("#selMfg").setTemplate(setSelMfgNmTemp);
	$("#selMfg").processTemplate(itemTypeobj);
}

var defaultViewitemTemp = "{#foreach $T.mfli as mfli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}' style='width: 16.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center'>{$T.mfli.idmf} </div> <div style='width: 40.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.mfli.mfnm}</div>  <div style='width: 16.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT'  class='edit' id='btnEdit{count}' onclick='edititem({$T.mfli.iid})' /></div><div style='width: 16.3%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='DELETE'  class='edit' id='btnDelete{count}' onClick='deleteitemDetails({$T.mfli.iid})'/></div>{#/for}";

function defaultViewitem() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchAllitem');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#PharmacyDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#itemList").setTemplate($("#defaultViewitemTemp").html());
			$("#itemList").processTemplate(pobj1);
		}
	});
}

var edititemTemp = "<div style='height: 450px; border: 1px solid #436a9d; padding-left: 5%;'>	<div style='width: 80%; padding-top: 0%;'>		<h2>Edit Item Details:</h2>	</div>	<div style='width: 100%; padding-top: 0%;'>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Item ID</div>			<div style='width: 65%;'>				<div style='width: 100%;'>					{$T.iid} <input type='hidden' id='iid' value='{$T.iid}' />				</div>			</div>		</div>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Item Type</div>			<div style='width: 65%;'>				<div style='width: 100%;'>					<select id='selItemtype' style='width: 100%;'></select>				</div>			</div>			<div style='width: 2%; color: red; padding-left: 5px;'>				<b>*</b>			</div>		</div>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Mfg. Name</div>			<div style='width: 65%;'>				<select style='width: 100%;' id='selMfg'></select>			</div>		</div>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Name</div>			<div style='width: 65%;'>				<input type='text' id='txtItmNm' style='width: 98%;'					value='{$T.itnm}' />			</div>		</div>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Batch No.</div>			<div style='width: 65%;'>				<input type='text' id='txtBatchNo' style='width: 98%;'					value='{$T.bchno}' />			</div>		</div>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Qty. Available</div>			<div style='width: 65%;'>				<input type='text' id='txtQtyAva' style='width: 98%;'					value='{$T.avqty}' onkeypress='return validatePrice(event)'  />			</div>		</div>	<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Qty. Minimum</div>			<div style='width: 65%;'>				<input type='text' id='txtQtyMin' style='width: 98%;'					value='{$T.minqty}' onkeypress='return validatePrice(event)' />			</div>		</div>			<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Cost Price</div>			<div style='width: 65%;'>				<input type='text' id='txtCostPri' style='width: 98%;'					value='{$T.cost}' onkeypress='return validatePrice(event)' />			</div>		</div>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Exp. Date</div>			<div style='width: 65%;'>				<input type='text' id='txtExpDate' style='width: 98%;'					value='{$T.expdt}' onclick='setCalander()' />			</div>		</div>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Selling Price</div>			<div style='width: 65%;'>				<input type='text' id='txtSelPri' style='width: 98%;'					value='{$T.sprc}' onkeypress='return validatePrice(event)' />			</div>		</div>		<div style='width: 100%; padding-top: 3%;'>			<div style='width: 21%;'>Notes</div>			<div style='width: 35%;'>				<textarea type='text' id='txtNote' rows='2' cols='27'>{$T.nt}</textarea>			</div>		</div>	</div></div><input type='hidden' id='queryType' value='update' />";

function edititem(iid) {
	var myObj = 0;
	ajaxResponse = $("#PharmacyDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.itmli.length; i++) {
		if (myArray.itmli[i].iid == iid) {
			myObj = myArray.itmli[i];
			break;
		}
	}
	/*
	 * myObj = JSON.stringify(myObj); itemBean = eval('(' + myObj + ')');
	 */

	$("#itemDiv").setTemplate(edititemTemp);
	$("#itemDiv").processTemplate(myObj);
	setSelItemType();

	$("#selItemtype").val(myObj.ittp);
	$("#selMfg").val(myObj.idmft);

}

function searchItem() {
	count = 1;
	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter item Name.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + strValue);
	inputs.push('action=searchItem');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			$("#PharmacyDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.itmli.length == 0) {
				alert("item Name Not Found");
			} else {
				$("#itemList").setTemplate($("#defaultViewitemTemp").html());
				$("#itemList").processTemplate(pobj1);
			}
		}
	});
}

function saveitemDetails() {

	var selItemtype = $("#selItemtype").val();
	var selMfg = $("#selMfg").val();
	var txtItmNm = $("#txtItmNm").val();
	var txtBatchNo = $("#txtBatchNo").val();
	var txtQtyAva = $("#txtQtyAva").val();
	var txtCostPri = $("#txtCostPri").val();
	var txtExpDate = $("#txtExpDate").val();
	var txtSelPri = $("#txtSelPri").val();
	var txtNote = $("#txtNote").val();
	var txtQtyMin = $("#txtQtyMin").val();

	var iid = $("#iid").val();
	var queryType = $("#queryType").val();

	if (txtItmNm == "") {
		alert("Please Enter item Name!");
		SetFocus("txtItmNm");
		return false;
	} else if (txtBatchNo == "") {
		alert("Please Enter Batch Number!");
		SetFocus("txtBatchNo");
		return false;

	} else if (txtQtyAva == "") {
		alert("Please Enter Available Quantity!");
		SetFocus("txtQtyAva");
		return false;
	} else if (txtCostPri == "") {
		alert("Please Enter Cost Price!");
		SetFocus("txtCostPri");
		return false;
	} else if (txtExpDate == "") {
		alert("Please Enter Exp. Date of Item!");
		SetFocus("txtExpDate");
		return false;
	} else if (!isDateYYYYMMDD(txtExpDate) && txtExpDate != "") {
		alert("Please Enter Correct Exp. Date(YYYY-MM-DD) Format!");
		return false;
	} else if (txtSelPri == "") {
		alert("Please Enter Selling Price of Item!");
		SetFocus("txtSelPri");
		return false;
	} else {
		var inputs = [];
		inputs.push('action=SaveitemDetails');
		inputs.push('queryType=' + queryType);
		inputs.push('iid=' + iid);
		inputs.push('selItemtype=' + selItemtype);
		inputs.push('selMfg=' + selMfg);
		inputs.push('txtItmNm=' + txtItmNm);
		inputs.push('txtBatchNo=' + txtBatchNo);
		inputs.push('txtQtyAva=' + txtQtyAva);
		inputs.push('txtCostPri=' + txtCostPri);
		inputs.push('txtExpDate=' + txtExpDate);
		inputs.push('txtSelPri=' + txtSelPri);
		inputs.push('txtNote=' + txtNote);
		inputs.push('txtQtyMin=' + txtQtyMin);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "pharmacy_Item_mgmt.jsp";
			}
		});
	}
}

function deleteitemDetails(iid) {
	var r = confirm("Are You Confirm To Delete item Details.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deleteItemDetails');
		inputs.push('iid=' + iid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PharmacyServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}
/** ***************** item end ****************** */
var patientPrescriptionTemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 35%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.wt} Kg</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick='viewDoctorDesk({$T.pl.pi})' style='font-size: 10px;' type='button' value='SHOW PRESCRIPTION' class='edit' /></div></div> {#/for}";
function patientPrescriptionDashboard(searchType) {

	count = 1;

	var byName = $("#byName").val();
	var byId = $("#byId").val();
	if (byName == " ") {
		byName = "";
	}
	if (byId == " ") {
		byId = "";
	}
	var searchBy = "";
	var value;
	if (searchType == "onload") {
		searchBy = "onload";
		value = "onload";

	} else if (byName != "" && byId != "") {
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
	var inputs = [];
	inputs.push('action=getPrescriptedPatient');

	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PharmacyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			Pbean = eval('(' + ajaxResponse + ')');

			$("#container").setTemplate(patientPrescriptionTemp);

			$("#container").processTemplate(Pbean);
		}

	});

}