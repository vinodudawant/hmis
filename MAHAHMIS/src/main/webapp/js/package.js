var count = 1;

var packageBillDashboardTemp = "<table class='table table-bordered table-striped table-condensed cf '>"
		+ "<tbody>"
		+ "	{#foreach $T.pl as pl}"
		+ "	<tr>"
		+ "		<td class='col-md-1-1 filterable-cell'>{count++}.</td>"
		+ "		<td class='col-md-4-1 filterable-cell' >{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell' >{$T.pl.pi}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell' >{$T.pl.objTreat.trCount}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell' >"
		+ "			<button class='btn btn-xs btn-success' "
		+ "					onclick=viewBillForPackage({$T.pl.pi},'PackageBill') style='font-size: 12px;'>VIEW BILL</button>"
		+ "		</td>" + "	</tr>" + "	{#/for}" + "</tbody>" + "</table>";

function disppatientbillSearch(searchOn, billType) {

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	count = 1;
	var searchBy;
	var value;
	if (searchOn == "onload") {
		searchBy = "byName";
		value = "value";

	} else if (billType != "BILL") {
		var byName = $("#byName").val();
		var byId = $("#byId").val();
		// var byTreatId = $("#byTreatId").val();

		/**************blank space validation @author husen****************/
		var temp = 0;
		if(byName != "")
			{
			 var strArr = new Array();
			 strArr = byName.split("");
			 if(strArr[0] == " ")
				 {
				 temp = 1;
				 }
			}
		if(temp == 1)
			{
			   alert("shouldn't be blank or contain blank space at the Beginning!!");
			   $("#byName").val("");
			   $("#byName").focus();
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
	} else if (billType == "BILL") {
		/*
		 * if (from == "" || to == "") { alert("please inserst date for
		 * search"); return false; }
		 */
		var byName = $("#byName").val();
		var byId = $("#byId").val();
		// var byTreatId = $("#byTreatId").val();

		if (byName != "" && byId != "") {
			alert("please search either by patient Id or by Patient Name");
		} else if (byName == "" && byId == "") {
			alert("please inserst something for search");
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;

			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
		var discountId = $("#SpecialDisc").val();
	}
	var inputs = [];
	inputs.push('action=ShowTopBill');
	inputs.push('searchBy=' + searchBy);
	inputs.push('billType=' + billType);
	inputs.push('from=' + from);
	inputs.push('to=' + to);
	inputs.push('discountId=' + discountId);
	inputs.push('value=' + encodeURIComponent(value));
	inputs.push('searchOn=' + searchOn);
	inputs.push('showFun=showSearchBillPatient');
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
			// alert(ajaxResponse);
			$("#billDetails").html(ajaxResponse);
			billBean = eval('(' + ajaxResponse + ')');
			if (billBean.pl.length == 0 && searchOn != "onload") {
				alert("Patient Not Found");
			} else {

				if (billType == "IPD") {
					// alert("got it");
					$("#PackageBillContainer").setTemplate(
							packageBillDashboardTemp);
					$("#PackageBillContainer").processTemplate(billBean);
				} else if (billType == "OPD") {
					$("#BillContainer").setTemplate(billDashboard);
					$("#BillContainer").processTemplate(billBean);
				} else if (billType == "BILL") {
					$("#BillContainer").setTemplate(
							billDashboardForCorporateAccount);
					$("#BillContainer").processTemplate(billBean);
				} else if (billType == "med") {
					// alert("got it");
					$("#BillContainer").setTemplate(billDashboardForMed);
					$("#BillContainer").processTemplate(billBean);
				} else if (billType == "IPD_AdvanceDashboard") {
					$("#container").setTemplate(
							billDashboardForAdvanceReceiptIPD);
					$("#container").processTemplate(billBean);
				} else if (billType == "IPDAdvance") {
					$("#BillContainer").setTemplate(DashboardForIPDAdvance);
					$("#BillContainer").processTemplate(billBean);
				}
				// window.reload();
			}
		}
	});

}

function viewBillForPackage(patId, pageName) {
	// var myObj;

	if (pageName == "PackageBill") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		// window.location.href = "BillForIPD.jsp?" + "myObj=" + myObj;
		window.location.href = "payForPackage.jsp?" + "patInfo="
				+ encodeURIComponent(myObj);

	} else if (pageName == "IpdBillReceipt") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		// window.location.href = "BillForIPD.jsp?" + "myObj=" + myObj;
		window.location.href = "advanceReceiptForIPD.jsp?" + "patInfo="
				+ encodeURIComponent(myObj);

	} else if (pageName == "medclinic") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		window.location.href = "medClinicInvoice.jsp?" + "patInfo="
				+ encodeURIComponent(myObj);

	} else if (pageName == "billRegister") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].trid == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}

		// myObj = myObj.pl[0];
		var billID = myObj.objBillMaster.id;
		var tid = myObj.trid;
		var tit = myObj.tit;
		var fn = myObj.fn;
		var mn = myObj.mn;
		var ln = myObj.ln;
		var pname = tit + " " + fn + " " + mn + " " + ln;
		myObj = JSON.stringify(myObj);
		window.location.href = "CorporateAccountBill.jsp?" + "patInfo="
				+ encodeURIComponent(myObj) + "&billID=" + billID + "&pname="
				+ pname + "&tid=" + tid;

		/*
		 * myObj = JSON.stringify(myObj); window.location.href =
		 * "CorporateAccountBill.jsp?" + "patInfo=" + encodeURIComponent(myObj);
		 */

	} else if (pageName == "IpdAdvance") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		// window.location.href = "BillForIPD.jsp?" + "myObj=" + myObj;
		window.location.href = "IPDAdvance.jsp?" + "patInfo="
				+ encodeURIComponent(myObj);

	} else {

		if (patId == "bill") {

			myArray = JSON.parse($("#divPatId").html());
			
			myObj = myArray;
		} else {
			myArray = JSON.parse(ajaxResponse);
			for ( var i = 0; i < myArray.lip.length; i++) {
				if (myArray.lip[i].trid == patId) {
					myObj = myArray.lip[i];
					break;
				}
			}
		}
		myObj = JSON.stringify(myObj);
		window.location.href = "billReport.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&select=" + billType;

	}
}

function setSaveButtonPackageTemplate() {
	var data = $("#serviceHeading").val();
	if (data == "OperationCharges") {
		$("#popupOPCharges").show();
	} else {
		var template = '<button style="line-height: 1.2" id="particularbtn" class="btn btn-xs btn-default" onclick="saveIpdBillParticular()"><i class="fa fa-save"></i> Save</button>';
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
		setValuesToAutocompletePackage("onChange");
	}
}

function setValuesToAutocompletePackage(type) {
	var resultData = [];
	var billComps = $("#billComps").html();
	var myobj = eval('(' + billComps + ')');
	var bedlistlength = myobj.bcs4.length;

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
	}

	var autoType;
	var auto;
	if (data == "packageName") {
		data = "packageConsumable";
		auto = 'packageBill';
	} else if (data == "gasesMonitor") {
		auto = 'packageBill';
		autoType = 'g';
	} else if (data == "instruments") {
		data = "instruments";
		auto = 'packageBill';
		autoType = 'i';
	} else if (data == "gasesMonitorb") {
		data = "gasesMonitor";
		auto = 'packageBill';
		autoType = 'b';
	} else if (data == "DRC") {
		data = "DRC";
		auto = 'packageBill';
		autoType = 'd';
	} else if (data == "OtherServices") {
		data = "OtherServices";
		auto = 'packageBill';
		autoType = 'd';
	} else {
		auto = 'packageBill';
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

							}, 500);
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
				$("#particularPay").val("0");
				$("#particularCoPay").val(arrItem[1]);
				$("#pathotestType").val(charges[0]);
			}
		} else if (serviceHeading == "investigation") {

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
				&& serviceHeading != "gasesMonitor"
				&& serviceHeading != "gasesMonitorb"
				&& serviceHeading != "instruments") {
			$("#particularPay").val(0);
			calculatePerticularCoPay();
		}

		/*
		 * $('.alert').show().html( 'You selected <strong>' + item.value + '</strong>:
		 * <strong>' + item.text + '</strong>');
		 */
	}
}

/**
 * ***************************Insert Package Details Function for Package
 * Master**************************
 */
// Touheed
// Date:- 11-Sep-2105
function insertPackageDetails() {
	
	//package id for insert and update
	var packageId = $("#tempPackageId").val();
	
	//Package id for salve
	var packageIDForSlave =$("#packageId").val();
	
	var packageName = $("#packageName").val();
	var packageAlias = $("#packageAlias").val();
	var packageCode = $("#packageCode").val();
	var packageCharges = "0";
	var specialization = $("#specialization").val();
	// var createdBy = $("#createdBy").val();
	var suggestedBy = $("#suggestedBy").val();
	var packageStatus = $("#packageStatus").val();
	// var status = $("#status").val();
	var noOfDays = $("#noOfDays").val();
	var hallType = $("#hallType").val();
	// getting radio button value
	var packageType = $('input:radio[name=packageType]:checked').val();
		
	
	if (packageName == "") {
		alert("Please Enter Package Name");
		return false;
	} else if (packageCode == "") {
		alert("Please Enter Package Code");
		return false;
	} else if (specialization == "0") {
		alert("Please Select Specialization");
		return false;
	} else if (packageStatus == "0") {
		alert("Please Select Package Status");
		return false;
	}
	
	var individualPackageCheckboxIDArray = new Array();

	$('#normalPackagetable tr').each(
			function() {
				
				var packageCheckboxID = $(($(this).find('input[name=checkBoxPackage]:checked'))).attr('value');
				var hallCharges = $(($(this).find('#hallCharges' + packageCheckboxID))).val();
				
				
				if (packageCheckboxID != undefined && packageCheckboxID != "0" && packageCheckboxID != ""&& hallCharges != undefined && hallCharges != "0" && hallCharges != "") {

					 
					var hhh=packageCheckboxID+ "-" +hallCharges;
					individualPackageCheckboxIDArray.push(hhh);
					
				}

			});

	
	
	if ((individualPackageCheckboxIDArray.length) == 0) {
		alert("Please check the checkbox  and Insert Charges to save Hall Charges...");
		return false;
	}

	

	if (hallType == "0") {
		alert("Please Select Hall Type");
		return false;
	} else if (noOfDays == "") {
		alert("Please Enter No.of Days");
		return false;
	}

	/*
	 * if(testCharge == "") { testCharge = 0; }
	 */
	var inputs = [];
	inputs.push('action=insertPackageDetails');
	inputs.push('packageId=' + packageId);
	inputs.push('packageIDForSlave='+packageIDForSlave);
	// inputs.push('testType=' + encodeURIComponent(testType));
	// inputs.push('userId=' + userId);
	// inputs.push('queryType=' + queryType);
	inputs.push('packageName=' + encodeURIComponent(packageName));
	inputs.push('packageCode=' + packageCode);
	inputs.push('packageAlias=' + packageAlias);
	inputs.push('packageCharges=' + packageCharges);
	inputs.push('specialization=' + specialization);
	// inputs.push('createdBy=' + createdBy);
	inputs.push('suggestedBy=' + suggestedBy);
	inputs.push('packageStatus=' + packageStatus);
	// inputs.push('status=' + status);
	inputs.push('noOfDays=' + noOfDays);
	inputs.push('hallType=' + hallType);
	inputs.push('packageType=' + packageType);
	inputs.push('individualPackageCheckboxIDArray='+individualPackageCheckboxIDArray);
	

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				// timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					if (ajaxResponse == "Package Name is already present in the database."
							|| ajaxResponse == "Service Name is already present in the database.") {
						SetFocus("packageName");
					} else {

						showPackageList();
						location.reload();
						enablePackageMaster();
						$("#tempPackageId").val("0");
					}
				}
			});

	$("#queryType").val("insert");
}
/**
 * ***************************End Insert Package Details Function for Package
 * Master**********************
 */

/**
 * ***************************Fetch PackageID Function for Package
 * Master********************************
 */
// Touheed
// Date:- 12-Sep-2105
function getNextPackageId() {
	var inputs = [];
	inputs.push('action=getNextPackageId');
	// inputs.push('tableName=inv_document_numbering_master');
	inputs.push('tableName=package_master');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#packageId").val(r);
		}
	});
}
/**
 * *******************************Fetch PackgeID List
 * End**********************************************
 */

/**
 * ***************************Fetch PackageMasterList Function for Package
 * Master**************************
 */
// Touheed
// Date:- 14-Sep-2105
var counterPackage = 1;
// creating template
var packegeTemp = "<table class='table table-striped table-condensed'>"
		+ "{#foreach $T.ul as ul}"
		+ "<tr>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{counterPackage++}</td>"
		+ "<td id='pid{$T.ul.packageId}' style='height: 21.5px;' class='col-md-1 center' >{$T.ul.packageId}</td>"
		+ "<td id='pname{$T.ul.packageId}' style='height: 21.5px;' class='col-md-2'>{$T.ul.pacakageName}</td>"
		+ "<td id='pspecial{$T.ul.packageId}' style='height: 21.5px;' class='col-md-2'>{$T.ul.specializationName}</td>"
		+ "<td id='pcode{$T.ul.packageId}' style='height: 21.5px;' class='col-md-2'>{$T.ul.packageCode}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'><button id='btnEdit2' class='btn btn-xs btn-success' data-toggle='modal' data-target='#iPackage' onclick=\"editPackageMaster({$T.ul.packageId})\" value='EDIT'><i class='fa fa-edit'></i></button></td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'><button id='btnDelete' value='Delete' class='btn btn-xs btn-danger' type='button' onclick=\"deletePackageMaster({$T.ul.packageId})\"><i class='fa fa-trash-o'></i></button></td</tr>{#/for}</table>";

function showPackageList(search, type) {

	// Fetch PackageMasterList Template

	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Pakcage Name !");
			setFocus("#byName");
		}
	}

	var inputs = [];
	inputs.push('action=fetchPackageMaster');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		// timeout : 1000 * 60 * 5,// Hall charges dump
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {
			counterPackage = 1;
			pobj1 = eval('(' + res + ')');
			if (pobj1.ul.length > 0) {
				$("#packageDiv").setTemplate(packegeTemp);
				$("#packageDiv").processTemplate(pobj1);
				$("#packageDivAjax").html(res);
			} else {
				/*alert("Package not found..!");*/
			}

		}
	});

}

/**
 * *******************************Fetch PackgeMaster List
 * End**********************************************
 */

/**
 * ************************************Edit Function for Package
 * Master***********************************
 */



// Touheed
// Date:- 15-Sep-2105
function editPackageMaster(id) {

	var ajaxResponse = $("#packageDivAjax").html();
	
	myArray = JSON.parse(ajaxResponse);
	var ObjData = "";
	var objHall ="";
	var currentPId ="";
	
	for ( var i = 0; i < myArray.ul.length; i++) {

		if (myArray.ul[i].packageId == id) 
		{
			ObjData = myArray.ul[i];
			
			
			currentPId = myArray.ul[i].packageId;
			
			
			//unchecking Normal Package tab
			enableHallList();
			
			
			/*//unchecking Normal Package tab start
			
			var ajaxResponseHallUC = $("#hallList").html();
		
			var myArrayHallUC = JSON.parse(ajaxResponseHallUC);
		
		
			
			for ( var t = 0; t < myArrayHallUC.hl.length; t++) {
				
				
				
					
				
						$("#chk"+myArrayHallUC.hl[t].hi).prop('checked', false);
						$("#hallCharges"+myArrayHallUC.hl[t].hi).val(" ");
					
				
			}
			
			
			//unchecking Normal Package tab end
			
		*/	
			
			
			
			
			
			
			for(var j=0;j<myArray.ul[i].packageSlaveList.length;j++){
				
				
					var hid =	myArray.ul[i].packageSlaveList[j].wrdid;
					var hname =	myArray.ul[i].packageSlaveList[j].hname;
					var hcharge= myArray.ul[i].packageSlaveList[j].chrgs;
			
					//	alert("Hall Id-->="+hid+"   Hall Name="+hname+"   Hall charge"+hcharge);
				
		
				
				var ajaxResponseHall = $("#hallList").html();
				
				var myArrayHall = JSON.parse(ajaxResponseHall);
				

				for ( var k = 0; k < myArrayHall.hl.length; k++) {
					
					if (myArrayHall.hl[k].hi == hid ) 
					{
						
						$("#hallCharges"+hid).val(hcharge);
						if (myArrayHall.hl[k].hi == hid) {
							
							$("#chk"+hid).prop('checked', true);
						}
						
						
						
						
					}
				}
				

				
			}
			
			break;
			
			
			
		}
	}
	
	

	$("#testHead").html("Edit Package Master");

	$("#packageId").val(ObjData.packageId);
	$("#tempPackageId").val(ObjData.packageId);

	$("#packageName").val(ObjData.pacakageName);
	$("#packageCode").val(ObjData.packageCode);
	$("#packageCharges").val(ObjData.packageCharges);
	$("#specialization").val(ObjData.specialization);
	$("#packageStatus").val(ObjData.packageStatus);
	$("#userId").val(ObjData.userId);
	$("#createdBy").val(ObjData.createdBy);
	$("#suggestedBy").val(ObjData.suggestedBy);
	$("#packageAlias").val(ObjData.packageAlias);
	$("#noOfDays").val(ObjData.noOfDays);
	$("#hallType").val(ObjData.hallType);
	
	
	if (ObjData.packageType == "normal") {
		
		$("#normalPakcage").prop('checked', true);
	} else if (ObjData.packageType == "detail") {
		$("#detailPakcage").prop('checked', true);
		
	}

	
	$("#packageId").val(id);

	
	$("#queryType").val("update");
	
	
	
		
}
	
	

/** ***********************************************End***************************************************** */

/*******************************************************************************
 * Delete Package *********************************** * //Touheed khan
 * //16-Sep-2015
 */

function deletePackageMaster(packageId) {

	
	var r = confirm("Are you confirm to delete Package?");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deletePackageMaster');
		inputs.push("packageId=" + packageId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BillServlet",
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				showPackageList();

			}
		});

	}
}

// fetchCreatedBy();-- to fetch current loged in user
function fetchCreatedBy() {
	var inputs = [];
	inputs.push('action=fetchCreatedBy');
	// inputs.push('tableName=inv_document_numbering_master');
	// inputs.push('tableName=package_master');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		
		success : function(r) {
			ajaxResponse = r;
			$("#createdBy").val(r);
		}
	});
}

// Search Package Master
function searchPackage() {
	count = 1;
	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter Package Name.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + strValue);
	inputs.push('action=searchPackage');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			counterPackage = 1;
			ajaxResponse = r;
			// alert(r);
			$("#byName").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.ul.length == 0) {
				alert("Package Not Found");
				$('#byName').val("");
			} else {
				$("#packageDiv").setTemplate(packegeTemp);
				$("#packageDiv").processTemplate(pobj1);
				$('#byName').val("");
			}
		}
	});
}

// clear package master feilds
function enablePackageMaster() {
	getNextPackageId();
	enableHallList();
	$("#testHead").html("Add Package Bill Master");
	$("#packageName").val("");
	$("#packageAlias").val("");
	$("#packageCode").val("");
	$("#specialization").val("0");
	$("#suggestedBy").val("");
	$("#packageStatus").val("0");
	$("#packageCharges").val("");
	$("#hallType").val("0");
	$("#noOfDays").val("");
	$("input[name='checkboxRI']:checked").each(function() {
		$(this).prop("checked", false);
	});
}



function enableHallList() {
//unchecking Normal Package tab start

var ajaxResponseHallUC = $("#hallList").html();

var myArrayHallUC = JSON.parse(ajaxResponseHallUC);



for ( var t = 0; t < myArrayHallUC.hl.length; t++) {
	
	
	
		
	
			$("#chk"+myArrayHallUC.hl[t].hi).prop('checked', false);
			$("#hallCharges"+myArrayHallUC.hl[t].hi).val("");
		
	
}

}
//unchecking Normal Package tab end


//Touheed Template package name in ipdqueue
var packTemp = "<select	id='pname' style='width: 100%;'><option value='0'>-select-</option>{#foreach $T.ul as dpl}<option value='{$T.dpl.packageId}'>{$T.dpl.pacakageName}</option>{#/for}</select>";


//Touheed
//Get Package Name and Package ID for using ward or hallID
function getPackageForHall() {
	
	var hallTypeSelectID = $("#hallTypeSelectID").val();
	
	if (hallTypeSelectIDBillable != 0) {
		var inputs = [];
		inputs.push('action=getPackageForHall');
		inputs.push('hallTypeSelectID=' + hallTypeSelectID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BillServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				
				var ajaxResponse = r;
				pobj1 = eval('(' + ajaxResponse + ')');
				$("#selectPackageID").setTemplate(packTemp);
				$("#selectPackageID").processTemplate(pobj1);
			}
		});
	}
};


//Manisha
//Date:-09 Sept 2016
//AutoSuggestion for Package Bill Master
function setAutoPackageName(inputID, onload, callFrom) {
	// alert("HHHHI");
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "PackageBillMasterDatabase") {
		auto = 'PackageName';
	}

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
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					// alert('error');
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
					$("#pathiddenid").val(idValue);
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
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);

		$("#byName").val((item.text).trim());
	}
}

