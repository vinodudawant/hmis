//Irfan Khan @date: 15-June-2017 @reason : To Save and Update percentage
function percentageSetting() {
	
	var drPercentageId = $("#drPercentageId").val();
	var deptId = $("#deptId").val();
	var deptName = $("#deptId option:selected").text();
	var serviceId = $("#serviceId").val();
	var serviceName = $("#serviceId option:selected").text();
	var doctorId = $("#doctorId").val();
	var doctorName = $("#doctorId option:selected").text();
	var unitId = $("#unitId").val();
	var unitName = $("#unitId option:selected").text();
	var percentage = $("#percentage").val();

	if(serviceId == 1){
		alert("Can't select registration!!!");
		SetFocus('serviceId');
		return false;
	}
	if(percentage == undefined || percentage == "" || percentage == null || percentage < 0){
		percentage = 0;
	}
	if(percentage > 100){
		alert("Percentage can not be greater than 100");
		SetFocus('percentage');
		return false;
		
	}
	var percentageDetails = {
		listDrPercentage : []
	};
	percentageDetails.listDrPercentage.push({
		drPercentageId : drPercentageId,
		deptId : deptId,
		deptName : deptName,
		doctorId : doctorId,
		doctorName : doctorName,
		percentage : percentage,
		unitId : unitId,
		unitName : unitName,
		serviceId : serviceId,
		serviceName : serviceName

	});

	percentageDetails = JSON.stringify(percentageDetails);

	var inputs = [];
	inputs.push("percentageDetails=" + encodeURIComponent(percentageDetails));

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/drPer/saveDrPercentage",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			getAllRecords1();
			resetDrPer();
		}
	});
}

//Irfan Khan @date: 15-June-2017 @reason : To Fetch all records
function getAllRecords1() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/drPer/fetchAllRecords",
		success : function(r) {
			//alert(r.listDrPercentage[0].deptId);
			setTempAllRecords(r);
		}
	});
}

//@author : Irfan Khan @date: 17-May-2017 @reason : Template use to set onload all services
function setTempAllRecords(r) {

	var htm = '';

	for ( var i = 0; i < r.listDrPercentage.length; i++) {
		htm = htm
				+ '<tr>'
				+ '<td class="col-md-1-1 center">'
				+ (i + 1)
				+ '</td>'
				+ '<td class="col-md-1-1 center hide" id="drPercentageId'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].drPercentageId)
				+ '</td>'
				+ '<td class="col-md-1-1 center hide" id="unitId'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].unitId)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" id="unitName'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].unitName)
				+ ' </td>'
				+ '<td class="col-md-1-1 center hide" id="deptId'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].deptId)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" id="deptName'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].deptName)
				+ ' </td>'
				+ '<td class="col-md-1-1 center hide" id="serviceId'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].serviceId)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" id="serviceName'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].serviceName)
				+ ' </td>'
				+ '<td class="col-md-1-1 center hide" id="doctorId'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].doctorId)
				+ ' </td>'
				+ '<td class="col-md-3-1 center " id="doctorName'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].doctorName)
				+ ' </td>'
				+ '<td class="col-md-2-1 center" id="percentage'
				+ r.listDrPercentage[i].drPercentageId
				+ '">'
				+ (r.listDrPercentage[i].percentage)
				+ ' </td>'
				+ '<td class="col-md-1-1" align="right" style="height: 21.5px;" >'
				+ '<button class="btn btn-xs btn-success " onclick="editDrPer('
				+ r.listDrPercentage[i].drPercentageId
				+ ')" ><i class="fa fa-edit"></i></button>'
				+ '</td>'
				+ '<td class="col-md-1-1 " align="right" >'
				+ '<button class="btn btn-xs btn-success " onclick="deleteDrPer('
				+ r.listDrPercentage[i].drPercentageId
				+ ')" ><i class="fa fa-trash-o"></i></button>' + '</td>'
				+ '</tr>';
	}
	$("#percentageRecordsBody").html(htm);
}

//Irfan Khan @date: 15-June-2017 @reason : To set value to update
function editDrPer(id) {

	$("#drPercentageId").val(id);
	$("#deptId").val(parseInt($("#deptId" + id).html()));
	$("#unitId").val(parseInt($("#unitId" + id).html()));
	$("#doctorId").val(parseInt($("#doctorId" + id).html()));
	$("#serviceId").val(parseInt($("#serviceId" + id).html()));
	$("#percentage").val($("#percentage" + id).html());
}

//Irfan Khan @date: 15-June-2017 @reason : To delete record
function deleteDrPer(drPercentageId) {

	var r = confirm("Are You Sure You Want To Delete?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/drPer/deleteDrPer",
			data : {
				"drPercentageId" : drPercentageId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				resetDrPer();
				getAllRecords();
			}

		});
	}

}

//Irfan Khan @date: 15-June-2017 @reason : To Reset all fields
function resetDrPer(){
	$("#drPercentageId").val(0);
	$("#deptId").val(0);
	$("#unitId").val(0);
	$("#doctorId").val(0);
	$("#serviceId").val(0);
	$("#percentage").val(0);
}

//Irfan Khan @date: 15-June-2017 @reason : To get all units
function getAllUnitForDrPer() {

    jQuery
            .ajax({
                async : true,
                type : "POST",
                url : "ehat/unit/fetchUnitList",

                success : function(r) {
                	setTempAllForDrPer(r,"unit");//call template
                }
            });
}

function getAllDeptForDrPer() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptList",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTempAllForDrPer(r,"dept");//call template
		}
	});
}

//Irfan Khan @date: 20-June-2017 @reason : get All services
function getAllServicesForDrPer() {

	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/serv/fetchServiceList",
		success : function(r) {
			setTempAllForDrPer(r,"service");
		}
	});
}

//Irfan Khan @date: 15-June-2017 @reason : Set all fetched units
function setTempAllForDrPer(r,callFrom) {   
	if(callFrom == "unit"){
		var list = "<option value='0'>--Select--</option>";    
	    for ( var i = 0; i < r.lstUnit.length; i++) {    

			list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
			}   
		$("#unitId").html(list);
		var uId =$("#uId").val();		
		$('#unitId').val(uId);
	}
	if(callFrom == "dept"){
		//var list = "<option value='0'>--Select--</option>";
		var list = "";
	    for ( var i = 0; i < r.lstDepts.length; i++) {    

			list = list + "<option value='"+r.lstDepts[i].deptId+"'>" + (r.lstDepts[i].deptName) + "</option>";    
			}   
		$("#deptId").html(list);   
	}
	if(callFrom == "service"){
		var list = "<option value='0'>--Select--</option>";    
	    for ( var i = 0; i < r.listService.length; i++) {    

			list = list + "<option value='"+r.listService[i].serviceId+"'>" + (r.listService[i].serviceName) + "</option>";    
			}   
		$("#serviceId").html(list);   
		$("#serviceId").select2();
	}
	
}

//Irfan Khan @date: 16-June-2017 @reason : Fetch all fetched doctor
function getDoctorsListForDrPer() {

	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('date=onload');
	inputs.push('docType=doc');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			var doctorBean = eval('(' + ajaxResponse + ')');

			$("#doctorId").setTemplate(setTempDoctorsListForDrPer);
			$("#doctorId").processTemplate(doctorBean);
			
		}
	});
}

//Irfan Khan @date: 16-June-2017 @reason : Temp to Set all fetched doctor
var setTempDoctorsListForDrPer = "<option value='0'>-select-</option>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";


function fetchTestListForDr(callFrom) {

	if(callFrom == "removeAll"){
		// counting is there any record to add
		var rowsTable = $('#tableTestVoucherList tr').length;
		if (rowsTable == undefined || rowsTable == 0) {
			alert("There is no record to remove from Voucher List!");
			return false;
		}else {
			$("#tableTestVoucherList").empty();
			$("#txtComponentNo").val("0");
			$("#txtAmount").val("0");
			$("#txtReduction").val("0");
			$("#txtTotalAmount").val("0");
			$("#txtTotalDiscount").val("0");
			$("#txtTotalReduction").val("0");
			$("#txtTotalMotivation").val("0");
			$("#txtTotalClinicAmount").val("0");
			$("#txtAmountPayable").val("0");
			$("#serviceFlag").val("default");
		}
	}
	
	var doctorId = $("#txtDoctorId").val();
	var serviceId = $("#serviceId").val();
	var unitId = $("#unitId").val();
	var deptId = $("#deptId").val();
	var fromDate = $("#calFromDate").val();
	var toDate = $("#calToDate").val();

	//alert("DoctorId=="+doctorId+"==ServiceId=="+serviceId+"==unitId=="+unitId+"==deptId=="+deptId+"==fromDate=="+fromDate+"==toDate=="+fromDate);
	//return false;
	var inputs = [];
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('serviceId=' + serviceId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/drPer/fetchTestListForDr",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					//alert(r.listProFees.length);

					//var data = r;//eval('(' + r + ')');
					var pfhtml = '<tr>';
					var rowCount = 0;
					var profeesId;
					for ( var i = 0; i < r.listProFees.length; i++) {
						rowCount = i + 1;
						profeesId = r.listProFees[i].profeesId;
						pfhtml = pfhtml
								+ "<td class='col-md-1 center'>"
								+ rowCount
								+ "</td>'"
								+ "<td class='col-md-1 center'><div id='receiptMasterId"
								+ profeesId
								+ "'>"
								+ r.listProFees[i].billReceiptMasterId
								+ "</div></td>"
								+ "<td class='col-md-1 center'><div id='receiptSlaveId"
								+ profeesId
								+ "'>"
								+ r.listProFees[i].billReceiptSlaveId
								+ "</div></td>"
								+ "<td class='col-md-2'><div id='serviceName"
								+ profeesId
								+ "'>"
								+ r.listProFees[i].componentName
								+ "</div></td>"
								+ "<td class='col-md-1' align='center'><div id='amount"
								+ profeesId
								+ "'>"
								+ (r.listProFees[i].amount).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='concession"
								+ profeesId
								+ "'>"
								+ (r.listProFees[i].concession).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='hospAmount"
								+ profeesId
								+ "'>"
								+ (r.listProFees[i].hospPercentInAmount)
										.toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='pfUnpaid"
								+ profeesId
								+ "'>"
								+ (r.listProFees[i].pfUnpaid).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1'><input id='chk"
								+ profeesId
								+ "' type='radio' value='' name='proFeesVocharChk' onclick='sendToVoucherList1("
								+ profeesId + "," + r.listProFees[i].pfUnpaid
								+ "," + r.listProFees[i].billReceiptSlaveId
								+ "," + rowCount
								+ ")' style='cursor: pointer;'></td>"
								/*+ "<input id='billReceiptPaidStatus"
								+ profeesId
								+ "' type='hidden' value='"
								+ data.listProFeesPaymentDetails[i].billReceiptPaidStatus
								+ "'>"*/
								+ "<input id='pfAmount" + profeesId
								+ "' type='hidden' value='"
								+ (r.listProFees[i].pfAmount).toFixed(2) + "'>"
								+ "<input id='rate" + profeesId
								+ "' type='hidden' value='"
								+ (r.listProFees[i].rate).toFixed(2) + "'>"
								+ "<input id='quantity" + profeesId
								+ "' type='hidden' value='"
								+ r.listProFees[i].quantity + "'>"
								+ "<input id='pfPaid" + profeesId
								+ "' type='hidden' value='"
								+ (r.listProFees[i].pfPaid).toFixed(2) + "'>"
								+ "</tr>";

					}
					$("#tableTestDash").html(pfhtml);
				}
			});
}

//Irfan Khan 22-june-2017 Add row to voucherList
function addRowToVoucherList1() {

	// counting is there any record to add
	var rowsTableTestDash = $('#tableTestDash tr').length;
	if (rowsTableTestDash == undefined || rowsTableTestDash == 0) {
		alert("There is no record to add in Voucher List!");
		return false;
	}
	// Initializing following variables
	var idpfPaymentDetails = parseInt($("#idpfPaymentDetails").val());
	var billReceiptId = parseInt($("#receiptMasterId" + idpfPaymentDetails)
			.text());
	var billComponentId = parseInt($("#receiptSlaveId" + idpfPaymentDetails)
			.text());
	var testPaidAmount = parseFloat($("#amount" + idpfPaymentDetails)
			.text());
	var discountOnTest = parseFloat($("#concession" + idpfPaymentDetails)
			.text());
	var pfUnpaidAmount = parseFloat($("#pfUnpaid" + idpfPaymentDetails)
			.text());
	var doctorsActualCut = parseFloat($(
			"#pfAmount" + idpfPaymentDetails).val());
	var testActualRate = parseFloat($("#rate" + idpfPaymentDetails)
			.val());
	var clinicAmount = parseFloat($("#hospAmount"+ idpfPaymentDetails).text());
	
	var reduction = parseFloat($("#txtReduction").val());

	var serviceType = $("#txtSelectService").val();
	var serviceFlag = $("#serviceFlag").val();
	/*
	 * for future use if need var testName =
	 * $("#testName"+idpfPaymentDetails).text(); var pfPaidAmount =
	 * $("#pfPaidAmount"+idpfPaymentDetails).text(); var billReceiptPaidStatus=
	 * $("#billReceiptPaidStatus"+idpfPaymentDetails).val(); var testQuantity =
	 * $("#testQuantity"+idpfPaymentDetails).val();
	 */

	if (isNaN(reduction) || reduction == "") {// if reduction NaN then make it
												// as zero
		reduction = 0;
	} else if (reduction < 0) {// if reduction is less then zero, make it as
								// zero
		reduction = 0;
	}

	if (reduction > pfUnpaidAmount) {// if reduction greater then profees
										// unpaid Amount
		alert("Reduction amount Should be Less Or Equal to Pro.Fees Unpaid Amount!");
		SetFocus("txtReduction");
		return false;
	}

	var proFeesPayable = pfUnpaidAmount - reduction; // motivator business
														// logic, if reduction
														// is given, then amount
														// will less from
														// profees charges
	if (proFeesPayable < 0) {// if motivator payable is less then zero then
								// it shoud be zero
		proFeesPayable = 0;
	}

	var tableTestVoucherListCount = $('#tableTestVoucherList tr').length;// voucharlist
																			// count
	var checkedOrNot = $('#chk' + idpfPaymentDetails).is(":checked"); // is
																		// check
																		// box
																		// is
																		// checked
	var isthererow = $("#isthererow" + idpfPaymentDetails).val();
	if (checkedOrNot == false) { // validating comming record is check or not
		alert("Please check any Radio Button To add in Voucher list.!");
		return flase;
	}
	if (isthererow == undefined) { // if aleardy avlaiable then not add row (if
									// udefined then insert, if given any number
									// then don't insert)
		$('#tableTestVoucherList')
				.append(
						"<tr>"
								+ "<td class='col-md-1 center'><div id='rowcount"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (tableTestVoucherListCount + 1)
								+ "</div></td>"
								+ "<td class='col-md-1 center'><div id='billComponentId"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (billComponentId)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='testActualRate"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (testActualRate.toFixed(2))
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='discountOnTest"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (discountOnTest.toFixed(2))
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='testPaidAmount"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (testPaidAmount.toFixed(2))
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='clinicAmount"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (clinicAmount.toFixed(2))
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='doctorsActualCut"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (doctorsActualCut.toFixed(2))
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='reduction"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (reduction.toFixed(2))
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='proFeesPayable"
								+ (tableTestVoucherListCount + 1)
								+ "' class='TextFont'>"
								+ (proFeesPayable.toFixed(2))
								+ "</div></td>"
								+ "<input id='isthererow"
								+ (idpfPaymentDetails)
								+ "' type='hidden' value='"
								+ (idpfPaymentDetails)
								+ "'>"
								+ "<input id='idpfPaymentDetails"
								+ (tableTestVoucherListCount + 1)
								+ "' type='hidden' value='"
								+ (idpfPaymentDetails)
								+ "'>"
								+ "<input id='billReceiptId"
								+ (tableTestVoucherListCount + 1)
								+ "' type='hidden' value='"
								+ (billReceiptId)
								+ "'>" + "</tr>");

		// Making check box disable which was added in voucher list
		$('#chk' + idpfPaymentDetails).prop("disabled", true);

		// getting all values
		var totalAmount = parseFloat($("#txtTotalAmount").val());
		var totalDiscount = parseFloat($("#txtTotalDiscount").val());
		var totalMotivation = parseFloat($("#txtTotalMotivation").val());
		var totalReduction = parseFloat($("#txtTotalReduction").val());
		//var tDS = parseFloat($("#txtTDS").val());
		var totalClinicAmount = parseFloat($("#txtTotalClinicAmount").val());
		var amountPayable = parseFloat($("#txtAmountPayable").val());

		// Business logic for total calculation
		totalAmount = totalAmount + testPaidAmount;
		totalDiscount = totalDiscount + discountOnTest;
		totalMotivation = totalMotivation + doctorsActualCut;
		totalReduction = totalReduction + reduction;
		amountPayable = amountPayable + proFeesPayable;
		totalClinicAmount = totalClinicAmount + clinicAmount;

		// set values in respected fields
		$("#txtTotalAmount").val(totalAmount.toFixed(2));
		$("#txtTotalDiscount").val(totalDiscount.toFixed(2));
		$("#txtTotalMotivation").val(totalMotivation.toFixed(2));
		$("#txtTotalReduction").val(totalReduction.toFixed(2));
		$("#txtAmountPayable").val(amountPayable.toFixed(2));
		$("#txtTotalClinicAmount").val(totalClinicAmount.toFixed(2));

		//if two tests with different service Type is added in voucher list then service type set as "all"
		if (serviceFlag == "default") {
			serviceFlag = serviceType;
			$("#serviceFlag").val(serviceFlag);
		} else {
			if (serviceFlag != serviceType) {
				$("#serviceFlag").val("all");
			}
		}

	} else {
		alert("Already Added..!");
		
		// Making check box disable which was alerady added in voucher list
		$('#chk' + idpfPaymentDetails).prop("disabled", true);
	}
	// clearing input text fields.
	$("#txtComponentNo").val("");
	$("#txtAmount").val("");
	$("#txtReduction").val("0");

}// end of function addRowToVoucherList();

function sendToVoucherList1(idpfPaymentDetails, paidamount, compid, rowCount) {
	$("#txtComponentNo").val(compid);
	$("#txtAmount").val(paidamount);
	$("#idpfPaymentDetails").val(idpfPaymentDetails);
	$("#rowCount").val(rowCount);
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 10-jan-2017
 * @reason : Adding all rows in voucher list voucher list
 ******************************************************************************/
function addAllRowsToVoucherList1() {

	// counting is there any record to add
	var rowsTableTestDash = $('#tableTestDash tr').length;
	if (rowsTableTestDash == undefined || rowsTableTestDash == 0) {
		alert("There is no record to add in Voucher List!");
		return false;
	}
	var reduction = $("#txtReduction").val();
	if(reduction > 0 || reduction <0)
		{
			alert("You can't reduct while 'Adding All',Make it '0'");
			return false;
		}

	var doctorId = $("#txtDoctorId").val();
	var serviceId = $("#serviceId").val();
	var unitId = $("#unitId").val();
	var deptId = $("#deptId").val();
	var fromDate = $("#calFromDate").val();
	var toDate = $("#calToDate").val();

	//alert("DoctorId=="+doctorId+"==ServiceId=="+serviceId+"==unitId=="+unitId+"==deptId=="+deptId+"==fromDate=="+fromDate+"==toDate=="+fromDate);
	//return false;
	var inputs = [];
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('serviceId=' + serviceId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/drPer/fetchTestListForDr",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					
					var idpfPaymentDetails;
					var tableTestVoucherListCount;
					var reduction = 0;
					var htm = "";
					var totalAmount = 0;
					var totalDiscount = 0;
					var totalMotivation = 0;
					var totalReduction = 0;
					var amountPayable = 0;
					var totalClinicAmount = 0;

					for ( var i = 0; i < r.listProFees.length; i++) {
						tableTestVoucherListCount = $('#tableTestVoucherList tr').length;
						
						idpfPaymentDetails = r.listProFees[i].profeesId;

						htm = htm
								+ "<tr>"
								+ "<td class='col-md-1 center'><div id='rowcount"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (i + 1)
								+ "</div></td>"
								+ "<td class='col-md-1 center'><div id='billComponentId"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ r.listProFees[i].billReceiptSlaveId
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='testActualRate"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (r.listProFees[i].rate).toFixed(2)
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='discountOnTest"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (r.listProFees[i].concession).toFixed(2)
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='testPaidAmount"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (r.listProFees[i].amount).toFixed(2)
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='clinicAmount"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (r.listProFees[i].hospPercentInAmount).toFixed(2)
								+ "</div> </td>"
								+ "<td class='col-md-1' align='right'><div id='doctorsActualCut"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (r.listProFees[i].pfAmount).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='reduction"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (reduction).toFixed(2)
								+ "</div></td>"
								+ "<td class='col-md-1' align='right'><div id='proFeesPayable"
								+ (i + 1)
								+ "' class='TextFont'>"
								+ (r.listProFees[i].pfUnpaid).toFixed(2)
								+ "</div></td>"
								+ "<input id='isthererow"
								+ idpfPaymentDetails
								+ "' type='hidden' value='"
								+ idpfPaymentDetails
								+ "'>"
								+ "<input id='idpfPaymentDetails"
								+ (i + 1)
								+ "' type='hidden' value='"
								+ idpfPaymentDetails
								+ "'>"
								+ "<input id='billReceiptId"
								+ (i + 1)
								+ "' type='hidden' value='"
								+ r.listProFees[i].billReceiptMasterId
								+ "'>" + "</tr>";

						// Making check box disable which was added in voucher list getting all values
						$('#chk' + idpfPaymentDetails).prop("disabled", true);

						// Business logic for total calculation
						totalAmount = totalAmount
								+ r.listProFees[i].amount;
						totalDiscount = totalDiscount
								+ r.listProFees[i].concession;
						totalMotivation = totalMotivation
								+ r.listProFees[i].pfAmount;
						totalReduction = totalReduction + reduction;
						amountPayable = amountPayable
								+ r.listProFees[i].pfUnpaid;
						totalClinicAmount = totalClinicAmount 
								+ r.listProFees[i].hospPercentInAmount;
						// cleaning input text fields.
					}
					$('#tableTestVoucherList').html(htm);
					$("#txtTotalAmount").val(totalAmount.toFixed(2));
					$("#txtTotalDiscount").val(totalDiscount.toFixed(2));
					$("#txtTotalMotivation").val(totalMotivation.toFixed(2));
					$("#txtTotalReduction").val(totalReduction.toFixed(2));
					$("#txtAmountPayable").val(amountPayable.toFixed(2));
					$("#txtTotalClinicAmount").val(totalClinicAmount.toFixed(2));
					$("#serviceFlag").val("all");
					$("#txtComponentNo").val("");
					$("#txtAmount").val("");
					$("#txtReduction").val("0");
					$("#txtTDS").val("0");
				}
			});

}// end of function addRowToVoucherList();

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 21-Nov-2016
 * @reason : Reset All Feilds
 ******************************************************************************/
function proFeesResetVoucher1(callFrom) {
	if (callFrom == "proFees" || callFrom == "saveButton"
			|| callFrom == "cancelbutton") {

		$("#txtVoucherNumber").val(0);
		$("#txtAuthorisedBy").val("1");

		if (callFrom != "saveButton") {
			$("#byName").val("");
			$("#txtDoctorId").val("0");
		}

		$("#txtPayTo").val("");
		//$("#txtSelectService").val("investigation");
		$("#txtDoctorId").val(0);
		$("#serviceId").val(0);
		$("#unitId").val(0);
		$("#deptId").val(0);
		/*$("#calFromDate").val();
		$("#calToDate").val();*/
		$("#txtNaration").val("");
		$("#tableTestDash").empty();
		$("#tableTestVoucherList").empty();
		$("#txtComponentNo").val("0");
		$("#txtAmount").val("0");
		$("#txtReduction").val("0");
		$("#txtTotalAmount").val("0");
		$("#txtTotalDiscount").val("0");
		$("#txtTotalReduction").val("0");
		$("#txtTotalMotivation").val("0");
		$("#txtTotalClinicAmount").val("0");
		$("#txtTDS").val("0");
		$("#txtAmountPayable").val("0");
		$("#serviceFlag").val("default");

		//getNextId(callFrom);

	}// if
}// function to resetVouchar end

/*****************************************
 * @author : Irfan Khan
 * @date : 21-Nov-2016
 * @reason : Saving ProFees voucher List
 ****************************************/
function proFeesSaveVoucherList1(callForm) {

	if (callForm == 'proFees') {// if call from voucher

		var byName = $("#byName").val();
		var payTo = "Irfan";//$("#txtPayTo").val();
		var doctorId = $("#txtDoctorId").val();
		var voucherNumber = $("#txtVoucherNumber").val();
		var authorisedBy = 1;//parseInt($("#txtAuthorisedBy").val());
		//var serviceFlag = $("#serviceFlag").val();
		//var serviceType = serviceFlag; // $("#txtSelectService").val();
		//var date = $("#assesmentDate").val();
		var totalAmount = parseFloat($("#txtTotalAmount").val());
		var totalDiscount = parseFloat($("#txtTotalDiscount").val());
		var totalMotivation = parseFloat($("#txtTotalMotivation").val());
		var totalReduction = parseFloat($("#txtTotalReduction").val());
		var totalClinicAmount = parseFloat($("#txtTotalClinicAmount").val());
		var amountPayable = parseFloat($("#txtAmountPayable").val());
		var narration = $("#txtNaration").val();
		// alert(narration);
		
		var vocherMasterDetails = {
				listVoucherMaster : []
		};
		var voucherSlaveDetails= {
				listVoucherSlave : []
			};

		var tableTestVoucherListCount = $('#tableTestVoucherList tr').length;// voucharlist
																				// count

		if (isNaN(authorisedBy)) {
			alert("Please Select Authorised By");
			SetFocus("txtAuthorisedBy");
			return false;
		}
		if (byName == undefined || byName == "") {
			alert("Give Doctor Name!");
			SetFocus("byName");
			return false;
		}
		if (doctorId == 0 || doctorId == "0") {
			alert("Doctor Name is not Valid!");
			SetFocus("byName");
			return false;
		}
		if (payTo == undefined || payTo == "") {
			alert("Give Name for Pay To!");
			SetFocus("txtPayTo");
			return false;
		}
		if (tableTestVoucherListCount == 0) {
			alert("There no Record in Voucher List to save!");
			return false;
		}

		if (tableTestVoucherListCount != 0) { // if table count greater than
												// zero
			for ( var i = 1; i <= tableTestVoucherListCount; i++) { // fetching
																	// data
																	// inside
																	// voucher
																	// test list

				// initializing variable
				var billReceiptId = parseInt($("#billReceiptId" + i).val());
				var billComponentId = parseInt($("#billComponentId" + i).text());
				var testActualRate = parseFloat($("#testActualRate" + i).text());
				var doctorsActualCut = parseFloat($("#doctorsActualCut" + i).text());
				var testPaidAmount = parseFloat($("#testPaidAmount" + i).text());
				var discountOnTest = parseFloat($("#discountOnTest" + i).text());
				var reduction = parseFloat($("#reduction" + i).text());
				var proFeesPayable = parseFloat($("#proFeesPayable" + i).text());
				var idpfPaymentDetails = parseInt($("#idpfPaymentDetails" + i).val());
				var clinicAmount = parseFloat($("#clinicAmount" + i).text());

				// setting values to voucher slave
				voucherSlaveDetails.listVoucherSlave.push({
					billReceiptMasterId : billReceiptId,
					billReceiptSlaveId : billComponentId,
					rate : testActualRate,
					pfAmount : doctorsActualCut,
					amount : testPaidAmount,
					concession : discountOnTest,
					reduction : reduction,
					pfPaid : proFeesPayable,
					hospAmount : clinicAmount,
					profeesId : idpfPaymentDetails
				});
			}// for loop i end fetchOperation
		}// if statemt tableTestVoucherListCount != 0 end

		if (voucherSlaveDetails.listVoucherSlave.length < 1) {
			alert("NO Data");
			return false;
		}

		vocherMasterDetails.listVoucherMaster.push({
			voucherMasterId : voucherNumber,
			authorisedById : authorisedBy,
			doctorName : byName,
			doctorId : doctorId,
			payTo : payTo,
			//serviceType : serviceType,
			narration : narration,
			totalAmount : totalAmount,
			totalConcession : totalDiscount,
			totalReduction : totalReduction,
			totalPfAmount : totalMotivation,
			totalHospAmount : totalClinicAmount,
			totalPaidPf : amountPayable

		});

		voucherSlaveDetails = JSON.stringify(voucherSlaveDetails);
		vocherMasterDetails = JSON.stringify(vocherMasterDetails);

		var inputs = [];
		inputs.push("vocherMasterDetails=" + encodeURIComponent(vocherMasterDetails));
		inputs.push("voucherSlaveDetails=" + encodeURIComponent(voucherSlaveDetails));

		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/drPer/saveProfeesVoucher",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				//ajaxResponse = r;
				alert(r);
				// fetching latest service heading
				//proFeesFetchTestList1();
				proFeesResetVoucher1('saveButton');
				//fetchTestListForDr("doctor");
			}
		});

	}// if callFrom ='proFees' end
}// function proFeesSaveVoucherList end

//Template for current Voucher
var Current = "Current";
var tableCurrentProFeesVoucher = 1;
var tableCurrentProFeesVoucherTemplate1 = "{#foreach $T.listVoucherMaster as li}{#if $T.li.deleted =='N'}<tr>"
		+ "<td class='col-md-1 center'><div id='rowcount{$T.li.voucherMasterId}' class='TextFont'>{tableCurrentProFeesVoucher}</div></td>"
		+ "<td class='col-md-1'> <div class='TextFont' id='voucherMasterId{$T.li.voucherMasterId}'>{$T.li.voucherMasterId}</div></td>"
		+ "<td class='col-md-3'> <div class='TextFont' id='doctorName{$T.li.voucherMasterId}'>{$T.li.doctorName}</div></td>"
		+ "<td class='col-md-3'> <div class='TextFont' id='payTo{$T.li.voucherMasterId}'>{$T.li.payTo}</div></td>"
		+ "<td class='col-md-2'> <div class='TextFont' id='amountPayable{$T.li.voucherMasterId}'>{$T.li.totalPaidPf}</div></td>"
		+ "<td class='col-md-1 '> <div class='TextFont' id='date{$T.li.voucherMasterId}'>{$T.li.createdDateTime}</div></td>"
		+ "<td class='col-md-1 '>  <div class='TextFont'> <button class='btn btn-xs btn-success' type='button' onclick='viewVoucherById({$T.li.voucherMasterId},"
		+ Current
		+ ")'><i class='fa fa-eye View'></i></button></div></td>"
		+ "{tableCurrentProFeesVoucher++}</tr>{#/for}";

// Template for current Voucher
var Cancel = "Cancel";
var tableCancelProfeesVoucher = 1;
var tableCancelProFeesVoucherTemplate1 = "{#foreach $T.listVoucherMaster as li}{#if $T.li.deleted =='Y'}<tr>"
		+ "<td class='col-md-1 center'><div id='rowcount{$T.li.voucherMasterId}' class='TextFont'>{tableCancelProFeesVoucher}</div></td>"
		+ "<td class='col-md-1'> <div class='TextFont' id='voucherMasterId{$T.li.voucherMasterId}'>{$T.li.idpfVoucherDetails}</div></td>"
		+ "<td class='col-md-3'> <div class='TextFont' id='doctorName{$T.li.voucherMasterId}'>{$T.li.doctorName}</div></td>"
		+ "<td class='col-md-3'> <div class='TextFont' id='payTo{$T.li.voucherMasterId}'>{$T.li.payTo}</div></td>"
		+ "<td class='col-md-2'> <div class='TextFont' id='amountPayable{$T.li.voucherMasterId}'>{$T.li.cancelNarration}</div></td>"
		+ "<td class='col-md-1 '> <div class='TextFont' id='date{$T.li.voucherMasterId}'>{$T.li.cancelDateTime}</div></td>"
		+ "<td class='col-md-1 center'>  <div class='TextFont '> <button class='btn btn-xs btn-success' type='button' onclick='viewVoucherById({$T.li.voucherMasterId},"
		+ Cancel
		+ ")'><i class='fa fa-eye View'></i></button></div></td>"
		+ "{tableCancelProFeesVoucher++}</tr>{#/for}";


/*******************************************************************************
 * @author : Irfan Khan
 * @date : 23-Nov-2016
 * @reason : fetching All Generated Vouchers and cancel
 ******************************************************************************/
function fetchAllGenVouchers(callFrom) {
	$("#tabName").val(callFrom);
	var voucherNo = $("#byVoucherNo").val();
	if (voucherNo == "" || voucherNo == undefined) {
		voucherNo = 0;
	}
	//alert(voucherNo);
	if (callFrom == 'Current' || callFrom == 'Cancel') {
		var inputs = [];
	//	inputs.push('action=proFeesFetchAllGeneratedVouchers');
		inputs.push('callFrom=' + callFrom);
		inputs.push('voucherMasterId=' + voucherNo);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/drPer/fetchAllGenVouchers",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				// for current
				if (callFrom == 'Current') {
					tableCurrentProFeesVoucher = 1;
					$("#tableCurrentTestDash").setTemplate(
							tableCurrentProFeesVoucherTemplate1);
					$("#tableCurrentTestDash").processTemplate(r);
					$("#txtCancelNarration").prop("readonly", false);
				}
				// for cancel
				if (callFrom == 'Cancel') {
					tableCancelProFeesVoucher = 1;
					$("#tableCancelTestDash").setTemplate(
							tableCancelProFeesVoucherTemplate1);
					$("#tableCancelTestDash").processTemplate(r);
				}
			}
		});
	}
	$("#tabName").val(callFrom);
}// function fetchAllGeneratedVouchers

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 23-Nov-2016
 * @reason : fetching All data of that particular voucher
 ******************************************************************************/
function viewVoucherById(id, callFrom) {

	var inputs = [];
	//inputs.push('action=proFeesViewVoucherDetailsById');
	inputs.push('callFrom=' + callFrom);
	inputs.push('voucherMasterId=' + id);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/drPer/viewVoucherById",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
					//var data = eval('(' + r + ')');
					tableCurrentMotivatorVoucher = 1;

					if (callFrom == "Current" || callFrom == "Cancel") {
						// for current
						$("#txtVoucharNumber").val(r.listVoucherMaster[0].voucherMasterId);
						$("#txtAuthorisedBy").val(r.listVoucherMaster[0].authorisedById);
						$("#byName").val(r.listVoucherMaster[0].doctorName);
						$("#txtDoctorId").val(r.listVoucherMaster[0].doctorId);
						$("#txtPayTo").val(r.listVoucherMaster[0].payTo);
						//$("#txtSelectService").val(data.serviceType);
						$("#txtNaration").val(r.listVoucherMaster[0].narration);
						$("#txtTotalAmount").val((r.listVoucherMaster[0].totalAmount).toFixed(2));
						$("#txtTotalDiscount").val((r.listVoucherMaster[0].totalConcession).toFixed(2));
						$("#txtTotalReduction").val((r.listVoucherMaster[0].totalReduction).toFixed(2));
						$("#txtTotalMotivation").val((r.listVoucherMaster[0].totalPfAmount).toFixed(2));
						$("#txtTotalClinicAmount").val((r.listVoucherMaster[0].totalHospAmount).toFixed(2));
						$("#txtAmountPayable").val((r.listVoucherMaster[0].totalPaidPf).toFixed(2));
						$("#txtCancelNarration").val(r.listVoucherMaster[0].cancelNarration);

						for ( var int = 0; int < r.listVoucherSlave.length; int++) {
							$('#tableTestVoucherList')
									.append(
											'<tr>'
													+ '<td class="col-md-1 center"><div id="rowcount'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (int + 1)
													+ '</div></td>'
													+ '<td class="col-md-1 center"><div id="billReceiptId'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].billReceiptMasterId)
													+ '</div></td>'
													+ '<td class="col-md-1 center"><div id="billComponentId'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].billReceiptSlaveId)
													+ '</div></td>'
													+ '<td class="col-md-1" align="right"><div id="testActualRate'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].rate).toFixed(2)
													+ '</div> </td>'
													+ '<td class="col-md-1" align="right"> <div id="discountOnTest'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].concession).toFixed(2)
													+ '</div> </td>'
													+ '<td class="col-md-1" align="right"><div id="testPaidAmount'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].amount).toFixed(2)
													+ '</div> </td>'
													
													+ '<td class="col-md-1" align="right"><div id="clinicAmount'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].hospAmount).toFixed(2)
													+ '</div> </td>'
													+ '<td class="col-md-1" align="right"><div id="doctorsActualCut'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].pfAmount).toFixed(2)
													+ '</div></td>'
													+ '<td class="col-md-1" align="right"><div id="reductionAmount'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].reduction).toFixed(2)
													+ '</div></td>'
													+ '<td class="col-md-1" align="right"><div id="proFeesPayable'
													+ (int + 1)
													+ '" class="TextFont">'
													+ (r.listVoucherSlave[int].pfPaid).toFixed(2)
													+ '</div></td>' + '</tr>');
						}

					}
				}
			});

	// show popup
	showPopUpProFeesVocher1(callFrom);

}// viewProfeesVoucherDetails end

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 23-Nov-2016
 * @reason : showing Popup
 ******************************************************************************/
function showPopUpProFeesVocher1(callFrom) {
	$("#popUpProFeesVocher").show('show');
	if (callFrom == 'Cancel') {
		$("#btnPrintVoucher").hide();
		$("#btnCancelVoucher").hide();
		$("#divCancelNa").css("display", "block");
		$("#txtCancelNarration").prop("readonly", true);
	} else {
		$("#btnPrintVoucher").show();
		$("#btnCancelVoucher").show();
		$("#divCancelNa").css("display", "none");
	}
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 23-Nov-2016
 * @reason : hiding Popup
 ******************************************************************************/
function hidePopUpProFeesVocher1() {
	$("#popUpProFeesVocher").hide('hide');

	proFeesResetVoucher1("cancelbutton");// to reset fields

	$("#txtCancelNarration").val("");
	$("#divCancelNa").css("display", "none");
	// fetch all generated vouchers
	fetchAllGenVouchers('Current');
}// function hidePopUpProFeesVocher end

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 24-Nov-2016
 * @reason : cancelling and rolback Generated Voucher
 ******************************************************************************/
function cancelGenratedVoucher(callFrom) {

	if (callFrom == 'allgeneratedVoucher') {

		if ($('#divCancelNa').css('display') == 'none') {
			$("#divCancelNa").css("display", "block");
		} else if ($('#divCancelNa').css('display') == 'block') {
			$("#txtCancelNarration").prop("readonly", false);
			var res = confirm("Confirm to Cancel Generated Voucher Machine Details?");
			if (res == false) {
				$("#divCancelNa").css("display", "none");
				return false;
			}

			var id = $("#txtVoucharNumber").val();
			var narration = $("#txtCancelNarration").val();

			if (narration == "" || narration == undefined) {
				alert("Please type narration!");
				setFocus("txtCancelNarration");
				return false;
			}

			var inputs = [];
			//inputs.push('action=proFeesCancelGenratedVoucher');
			inputs.push('voucherMasterId=' + id);
			inputs.push('narration=' + narration);

			var str = inputs.join('&');

			jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/drPer/cancelGenratedVoucher",
				error : function() {
					alert('Network Issue!!!');
				},
				success : function(r) {
					// alert("error");
				},
				success : function(r) {
					alert(r);
					hidePopUpProFeesVocher1();
				}
			});
		}
	}
}// function cancelGenratedVoucherend

function searchByVoucherNumber1(callFrom) {
	var tabName = $("#tabName").val();
	if (tabName != "") {
		fetchAllGenVouchers(tabName);
	}
	$("#byVoucherNo").val("");
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 25-Nov-2016
 * @reason : Doctor's payable report
 ******************************************************************************/
function proFeesfetchReports1(callFrom) {
	var doctorName = null;
	var fromDate = null;
	var toDate = null;
	var doctorId = null;
	var unitId = null;
	var deptId = null;
	var serviceId = null;
	//var serviceType = null;

	if (callFrom == "doctor") {
		doctorName = $("#byName").val();
		fromDate = $("#inputFromDate").val();
		toDate = $("#inputToDate").val();
		doctorId = $("#txtDoctorId").val();
		unitId = $("#unitId").val();
		deptId = $("#deptId").val();
		serviceId = $("#serviceId").val();
		//serviceType = $("#txtSelectServiceReport").val();

		if (byName == "" || byName == undefined) {
			alert("Please Type Doctor Name!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else if (doctorId == 0 || doctorId == "" || doctorId == undefined) {
			alert("Doctor Name is not Valid, Please Select Doctor Name Form Suggestion List!");
			$("#byName").val("");
			SetFocus("byName");
			return false;
		} else if (fromDate == "" || fromDate == undefined) {
			alert("Please Select From Date!");
			$("#inputFromDate").val("");
			SetFocus("inputFromDate");
			return false;
		} else if (toDate == "" || toDate == undefined) {
			alert("Please Select From Date!");
			$("#inputToDate").val("");
			SetFocus("inputToDate");
			return false;
		}

	}
	var inputs = [];
	//inputs.push('action=proFeesfetchReports');
	//inputs.push('callFrom=' + callFrom);
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('doctorId=' + doctorId);
	inputs.push('unitId=' + unitId);
	inputs.push('deptId=' + deptId);
	inputs.push('serviceId=' + serviceId);
	//inputs.push('serviceType=' + serviceType);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/drPer/proFeesfetchReports1",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			// alert("error");
		},
		success : function(r) {
			
			var totalRate = 0;
			var totalConcession = 0;
			var totalAmount = 0;
			var totalPfAmount = 0;
			var totalReduction = 0;
			var totalPfPaid = 0;
			var totalPfUnpaid = 0;
			var totalHospAmount = 0;
			
			var htm = "<tr style='background-color: #EEEEEE'><th colspan='3' left>"
			+ "NOBLE HOSPITAL"
			+ "<br>Doctors Payable Report<br>From  : <b>"
			+ fromDate
			+ "</b><br> To  : <b>"
			+ toDate
			+ "</b><br>Doctor Name : <b>"
			+ doctorName
			+ "</b></th></tr>";
			
			 htm=htm + "<tr style='background-color: #EEEEEE'><th>SR.NO</th><th class='col-md-1'>Unit Name"
					+"</th><th class='col-md-1'>Dept Name"
					+"</th><th class='col-md-1'>Servc Name"
					+"</th><th class='col-md-1'>Patient Id"
					+"</th><th class='col-md-1'>Patient Name"
					+"</th><th class='col-md-1'>Assign.Date"
					+"</th><th class='col-md-1'>Comp.Name"
					//+"</th><th class='col-md-1'>Dr.Id"
					//+"</th><th class='col-md-1'>Dr.Name"
					+"</th><th class='col-md-1'>Rate"
					+"</th><th class='col-md-1'>Concession"
					+"</th><th class='col-md-1'>Quantity"
					+"</th><th class='col-md-1'>Amount"
					+"</th><th class='col-md-1'>Pf.Amount"
					+"</th><th class='col-md-1'>Reduction"
					+"</th><th class='col-md-1'>Pf.Paid"
					+"</th><th class='col-md-1'>Pf.Unpaid"
					+"</th><th class='col-md-1'>HospAmount"
					+"</th></tr>";
			 
			 if(r.listProFees.length == 0 ){
					
					htm = htm 
					+ "<tr style='height:30px; color:red; font-size:30px;'><th colspan='17' class='center'>No Record Found...!!!</th></tr>";
					
			} else{
			//console.log(r);
			for ( var i = 0; i < r.listProFees.length; i++) {
				htm=htm+"<tr>" 
					+"<td class='col-md-1'>"+(i+1)
					+"<td class='col-md-1'>"+r.listProFees[i].unitName
					+"<td class='col-md-1'>"+r.listProFees[i].deptName
					+"<td class='col-md-1'>"+r.listProFees[i].serviceName
					+"<td class='col-md-1'>"+r.listProFees[i].patientId
					+"<td class='col-md-1'>"+r.listProFees[i].patientName
					+"</td><td class='col-md-1'>"+r.listProFees[i].serviceAssignDate
					+"</td><td class='col-md-1'>"+r.listProFees[i].componentName
					//+"</td><td class='col-md-1 hide'>"+r.listProFees[i].doctorId
					//+"</td><td class='col-md-1'>"+r.listProFees[i].doctorName
					+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].rate.toFixed(2)
					+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].concession.toFixed(2)
					+"</td><td class='col-md-1' >"+r.listProFees[i].quantity
					+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].amount.toFixed(2)
					+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].pfAmount.toFixed(2)
					+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].reduction.toFixed(2)
					+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].pfPaid.toFixed(2)
					+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].pfUnpaid.toFixed(2)
					+"</td><td class='col-md-1' align='right'>"+r.listProFees[i].hospPercentInAmount.toFixed(2)
					+"</td>"
					+"</tr>";
				
				 totalRate = totalRate + r.listProFees[i].rate;
				 totalConcession = totalConcession + r.listProFees[i].concession;
				 totalAmount = totalAmount + r.listProFees[i].amount;
				 totalPfAmount = totalPfAmount + r.listProFees[i].pfAmount;
				 totalReduction = totalReduction + r.listProFees[i].reduction;
				 totalPfPaid = totalPfPaid + r.listProFees[i].pfPaid;
				 totalPfUnpaid = totalPfUnpaid + r.listProFees[i].pfUnpaid;
				 totalHospAmount = totalHospAmount + r.listProFees[i].hospPercentInAmount;
				
			}
			}	
			htm = htm
				+ "<tr ><td style='height: 11.5px;'></td></tr>";
			htm = htm
				+ "<tr style = 'background-color:#EEEEEE;'><td colspan='7'></td><th class='center'>Total"
				+ "</th><td class='col-md-1' align='right' >"+ totalRate.toFixed(2)
				+ "</td><td class='col-md-1' align='right' >" + totalConcession.toFixed(2)
				+ "</td><td class='col-md-1' align='right' >"
				+ "</td><td class='col-md-1' align='right' >" + totalAmount.toFixed(2)
				+ "</td><td class='col-md-1' align='right' >" + totalPfAmount.toFixed(2)
				+ "</td><td class='col-md-1' align='right' >" + totalReduction.toFixed(2)
				+ "</td><td class='col-md-1' align='right' >" + totalPfPaid.toFixed(2)
				+ "</td><td class='col-md-1' align='right' >" + totalPfUnpaid.toFixed(2)
				+ "</td><td class='col-md-1' align='right' >" + totalHospAmount.toFixed(2)
				+ "</td></tr>";
			
			
			/*var data = eval('(' + r + ')');
					var html = '';
					// var html2='';
					var totalAmountPayable = 0;
					var totalNetAmount = 0;
					var totalReduction = 0;
					var totalPaid = 0;
					var totalUnpaid = 0;
					var totalClinicAmount = 0;
					var serviceType = null;
					
					if(data.listReports[0] == undefined ){
							
						html = html 
						+ '<tr style="height:30px; color:red; font-size:30px;"><th class="col-md-1 center">No Records Found...!!!</th></tr>';
						
					} else{

					html = html
							+ '<tr ><th colspan="3" left>'
							+ data.listReports[0].hospitalName
							+ '<br>Doctors Payable Report<br>From  : <b>'
							+ fromDate
							+ '</b> To  : <b>'
							+ toDate
							+ '</b><br>Doctor Name : <b>'
							+ doctorName
							+ '</b><br>Doctor Speciality: <b>'
							+ data.listReports[0].speciality
							+ '</b></th></tr>'
							+ '<tr style = "background-color:#EEEEEE;">'
							+ '<th style="height: 21.5px;" class="col-md-1" center>#</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Trtmnt-Start Date</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Srvc-Assign Date</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Receipt No</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Patient Id</th>'
							+ '<th style="height: 21.5px;" class="col-md-3" >Patient-Name</th>'
							+ '<th style="height: 21.5px;" class="col-md-3" >Service-Type</th>'
							+ '<th style="height: 21.5px;" class="col-md-5" >Service-Details</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Test-Paid Amt</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Clinic Amt.</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Pro.Fees Amt</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>Reduction</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>PF.Paid</th>'
							+ '<th style="height: 21.5px;" class="col-md-1" center>PF.UnPaid</th>'
							+ ' </tr>';

					for ( var i = 0; i < data.listReports.length; i++) {

						serviceType = data.listReports[i].serviceType;
						if (serviceType == "Doc") {
							serviceType = "Consulting";
						} else if (serviceType == "CasualityServices") {
							serviceType = "Casualty Services";
						}else if (serviceType == "investigation") {
							serviceType = "Investigation";
						}else if (serviceType == "physiotherapy") {
							serviceType = "Physiotherapy";
						}else if (serviceType == "OtherServices") {
							serviceType = "Other Services";
						}else if (serviceType == "pathology") {
							serviceType = "Pathology";
						}
						html = html + '<tr >';
						html = html
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ (i + 1) + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].visitDate + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].assignDate + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].billReceiptId + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-1" center>'
								+ data.listReports[i].patientId + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-3" >'
								+ data.listReports[i].patientName + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-3" >'
								+ serviceType + '</td>'
								+ '<td style="height: 21.5px;" class="col-md-5" >'
								+ data.listReports[i].testName + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].payable).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].clinicPercentInAmount).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].doctorsActualCut).toFixed(2)
								+ '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].reductionAmount).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].pfPaidAmount).toFixed(2) + '</td>'
								+ '<td style="height: 21.5px; text-align:right;" class="col-md-1">'
								+ (data.listReports[i].pfUnpaidAmount).toFixed(2) + '</td>'
								+ ' </tr>';

						totalAmountPayable = totalAmountPayable
								+ data.listReports[i].payable;
						totalNetAmount = totalNetAmount
								+ data.listReports[i].doctorsActualCut;
						totalReduction = totalReduction
								+ data.listReports[i].reductionAmount;
						totalPaid = totalPaid
								+ data.listReports[i].pfPaidAmount;
						totalUnpaid = totalUnpaid
								+ data.listReports[i].pfUnpaidAmount;
						totalClinicAmount = totalClinicAmount
								+ data.listReports[i].clinicPercentInAmount;
					}
					html = html
							+ '<tr ><td colspan="3" style="height: 11.5px;"></td></tr>';
					html = html
							+ '<tr style = "background-color:#EEEEEE;"><td colspan="7"></td><th>Total</th><td class="col-md-1" align="right" >'
							+ totalAmountPayable.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalClinicAmount.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalNetAmount.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalReduction.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalPaid.toFixed(2)
							+ '</td><td class="col-md-1" align="right">' + totalUnpaid.toFixed(2)
							+ '</td></tr>';
						}*/

					// $("#tableTestVoucherListHead").html(html2);
					$("#tableTestVoucherList").html(htm);
				}
			});
}
