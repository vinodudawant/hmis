/** Function to set employee Details for HR module* */

function setEmployeeDetailsDetails(pageName) {
	var ajaxResponce = $("#myObj").html();
	userBean = eval('(' + ajaxResponce + ')');
	
	if(userBean!=null){
	var title;
	if (userBean.title == null) {
		title = "";
	} else {
		title = userBean.title;
	}
	var fname;
	if (userBean.fname == null) {
		fname = "";
	} else {
		fname = userBean.fname;
	}
	var mname;
	if (userBean.mname == null) {
		mname = "";
	} else {
		mname = userBean.mname;
	}
	var lname;
	if (userBean.lname == null) {
		lname = "";
	} else {
		lname = userBean.lname;
	}

	var fullname = title + ' ' + fname + ' ' + mname + ' ' + lname;
	var createdDate = (userBean.cd).split("-");
	var newDate = "";

	if ((createdDate.length) == 1) {
		newDate = (userBean.cd);
	} else {
		newDate = (createdDate[2] + "/" + createdDate[1] + "/" + createdDate[0]);
	}

	$("#userNm").val(userBean.un);
	$("#fullName").val(fullname);
	$("#password").val(userBean.up);
	$("#userType").val(userBean.ut);
	$("#status").val(userBean.st);
	$("#createdDate").val(newDate);
	$("#empIdhr").val(userBean.empIdhr);//
	//@Name: paras suryawanshi @date: 18-5-2017 @reason: doctor type master
	var dcTypeMasterID =userBean.dcTypeMasterID;
	if(dcTypeMasterID!=0){
	 $("#dcTypeMaster").css('display','block');   
		getDcTypeMasterList(); 
		$("#seldcTypeMaster").val(userBean.dcTypeMasterID);
		
		
		
		//added by kishor @date: 15-3-2018 @reason: set multiple doctor type master
		var doctorTypeIdListArry = [];
		if(userBean.doctorTypeIdList!=null && userBean.doctorTypeIdList!=""){
			var doctorType=userBean.doctorTypeIdList.split(",");
			for(var i=0;i<doctorType.length;i++){
				doctorTypeIdListArry.push(doctorType[i]);
			}
		}
	
		$('#seldcTypeMaster1').select2('val', doctorTypeIdListArry);
		//var id=userBean.doctorTypeIdList;
		
		//$("#seldcTypeMaster1").select2('val',id);
		//alert(userBean.doctorTypeIdList);

	}
	var mulSelArray = [];
	if(userBean.mulSelunit!=null && userBean.mulSelunit!=""){
		var mulSelunitId=userBean.mulSelunit.split(",");
		for(var i=0;i<mulSelunitId.length;i++){
			mulSelArray.push(mulSelunitId[i]);
		}
	}
	//$('#mulSelunit').val(mulSelArray);
	$('#mulSelunit').select2('val', mulSelArray);

	
	var mulDeptidArry = [];
	if(userBean.mulDeptid!=null && userBean.mulDeptid!=""){
		var mulDeptID=userBean.mulDeptid.split(",");
		for(var i=0;i<mulDeptID.length;i++){
			mulDeptidArry.push(mulDeptID[i]);
		}
	}
	//$('#mulSelunit').val(mulDeptidArry);
	$('#deptName').select2('val', mulDeptidArry);
		
	var mulServiceArry = [];
	if(userBean.mulServiceid!=null && userBean.mulServiceid!=""){
		var mulServiceID=userBean.mulServiceid.split(",");
		for(var i=0;i<mulServiceID.length;i++){
			mulServiceArry.push(mulServiceID[i]);
		}
	}
	//$('#mulSelunit').val(mulDeptidArry);
	$('#serviceName').select2('val', mulServiceArry);
	//end
		
	setTimeout(function() {
		$("#title").val(userBean.title).attr('selected','selected');
		},250);
	$("#fn").val(userBean.fname);
	$("#mn").val(userBean.mname);
	$("#ln").val(userBean.lname);

	
	if (pageName == "AdminEmployeeForm"){
		$('#softwareUsed').removeAttr('checked');
		getHrDetails($("#empId").val());
	}
	}
	else{
		getNextUserId();
	}
}

//By Amol Saware
function getNextUserId(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getNextUserId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;
			var yyyy = today.getFullYear();
			var todayDate = dd+"/"+mm+"/"+yyyy;
			$('#empId').val(response);
			$('#createdDate').val(todayDate);
			$("#queryType").val('insert');
			$('#usernameValidation').val("1");
		}
	});
}

//By Amol Saware
function getAllRoleForHr(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getAllRole",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var roleListForHr = "<option value=''>Select</option>";
			for(var i=0;i<response.length;i++){
				roleListForHr = roleListForHr + "<option value='"+response[i].roleName+"'>"+response[i].roleName+"</option>";
			}
			$('#userType').html(roleListForHr);
			$('#userType').select2();	//added by sandip
		}
	});
}

//By Amol Saware
function setFullName(){
	var title = $("#title").val();
	var fname = $("#fn").val();
	var mname = $("#mn").val();
	var lname = $("#ln").val();
	if (title == null || title == "select") {
		title = "";
	} 
	if (fname == null) {
		fname = "";
	}
	if (mname == null) {
		mname = "";
	}
	if (lname == null) {
		lname = "";
	}
	var fullname = title + ' ' + fname + ' ' + mname + ' ' + lname;
	$("#fullName").val(fullname);
}

//By Amol Saware
function validateUsername(current){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/validateUsername",
		timeout : 1000 * 60 * 5,
		data:{
			"username" : current.value,
			"employeeId" : $('#empId').val()
		},
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var queryType = $("#queryType").val();
			if(queryType=="insert" && response!="notFound"){
				$('#userNm').css('border','1px solid red');
				alertify.error("Sorry username already exist..!");
				$('#saveUserDetails').attr('disabled','disabled');
				$('#usernameValidation').val("1");
			}
			else if(queryType=="update" && response=="found"){
				$('#userNm').css('border','1px solid red');
				alertify.error("Sorry username already exist..!");
				$('#saveUserDetails').attr('disabled','disabled');
				$('#usernameValidation').val("1");
			}
			else{
				$('#userNm').css('border','');
				$('#saveUserDetails').removeAttr('disabled');
				$('#usernameValidation').val("0");
			}
		}
	});
}

function setSalaryView(value) {
	// alert(value);
	// ajaxResponse=$("#response").val();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.ul.length; i++) {

		if (myArray.ul[i].ui == value) {

			myObj1 = myArray.ul[i];
			userId = myArray.ul[i].ui;

			break;
		}
	}
	myObj = JSON.stringify(myObj1);

	window.location.href = "HRSalaryForm.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&userID=" + value;

}
var doctorSpecilizationTempAdmin = "<select	id='speName' style='width: 90%;'  name='selDocName' id='selDocName'  onchange='tempSetSpDept()' ><option value='0'>-select-</option>{#foreach $T.liSplz as spl}<option value='{$T.spl.splzId}'>{$T.spl.splzNm}</option>{#/for}</select>*";

function fetchDoctorSpecilizations() {

	var inputs = [];
	inputs.push('action=fetchDoctorSpecilizations');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			doctorBean = eval('(' + ajaxResponse + ')');
			$("#specialization").setTemplate(doctorSpecilizationTempAdmin);
			$("#specialization").processTemplate(doctorBean);

			/*
			 * var userDetails = $("#userDetails").html(); userDetails =
			 * eval('(' + userDetails + ')'); if (userDetails.listDoctor.length !=
			 * 0) { $("#speName").val(userDetails.listDoctor[0].sp); }
			 */
		}
	});

}

var doctorDepartmentTempForAdmin = "<select	id='deptName' style='width: 90%;'  name='selDocName' id='selDocName'  onchange='tempSetSpDept()' ><option value='0'>-select-</option>{#foreach $T.liDep as dpl}<option value='{$T.dpl.depId}'>{$T.dpl.depNm}</option>{#/for}</select>*";

function fetchHospitalDepartments() {

	var inputs = [];
	inputs.push('action=fetchHospitalDepartments');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			doctorBean = eval('(' + ajaxResponse + ')');

			$("#departments").setTemplate(doctorDepartmentTempForAdmin);
			$("#departments").processTemplate(doctorBean);

			/*
			 * var userDetails = $("#userDetails").html(); userDetails =
			 * eval('(' + userDetails + ')'); if (userDetails.listDoctor.length !=
			 * 0) { $("#deptName").val(userDetails.listDoctor[0].dept); }
			 */
		}
	});

}

function setNewEmpTemp(value, enmName) {
	// alert(value);

	window.location.href = "EmployeeForm.jsp?" + "docType=" + value;

}
function makeSalary(value) {
	/*
	 * myArray = JSON.parse(ajaxResponse);
	 * 
	 * for ( var i = 0; i < myArray.ul.length; i++) {
	 * 
	 * if (myArray.ul[i].ui == value) {
	 * 
	 * myObj1 = myArray.ul[i]; userId = myArray.ul[i].ui;
	 * 
	 * break; } } myObj = JSON.stringify(myObj1);
	 */
	window.location.href = "HRMakeSalary.jsp?" + "&userID=" + value;

}

function splitNameId() {

	setTimeout(function() {
		var empNameId = $("#empNameId").val();

		var arr = empNameId.split("_");
		$("#empNameId").val(arr[0]);
		$("#uID").val(arr[1]);
		getSalarySlipForEmp(arr[1]);
	}, 500);

	setTimeout(function() {

	}, 900);

}
function getSalaryDetails() {
	var user_id = $("#userID").val();
	var inputs = [];
	inputs.push('action=getSalaryDetails');
	inputs.push('user_id=' + user_id);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#ajaxResponse").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#fname").val(pobj1.listSm[0].fn);
			// alert(pobj1.listSm[0].fn);
			$("#userType").val(pobj1.listSm[0].ut);
			$("#efDate").val(pobj1.listSm[0].ed);
			$("#annSal").val(pobj1.listSm[0].ctc);
			$("#basSal").val(pobj1.listSm[0].bs);
			$("#grossSal").val(pobj1.listSm[0].gs);
			$("#idSalaryMaster").val(pobj1.listSm[0].idsm);

		}
	});
}

function saveSalaryDetails() {

	if (($("#workingdayleaves").val()) == null
			|| ($("#workingdayleaves").val()) == 0) {
		alert("Please enter no of working days!!");
		return false;
	}
	if (($("#otherallowance").html()) == null
			|| ($("#otherallowance").html()) == 0) {
		$("#otherallowance").html(0);

	}

	if (($("#idSalaryMaster").val()) == "")

		$("#queryType").val('insert');
	else
		$("#queryType").val('update');
	var monthlygross;

	var user_id = $("#userID").val();
	var efDate = $("#createddate").html();
	// var annSal = $("#annSal").val();
	var basSal = $("#basic").html();
	var monthlygrossSal = $("#monthlygross").html();
	var houserentAllowance = $("#houserent").html();
	var medical = $("#medical").val();
	var conveyance = $("#conveyance").val();
	var lta = $("#lta").val();
	var otherallowance = $("#otherallowance").html();
	var incentive = $("#incentive").val();
	var reimburse = $("#reimburse").val();
	var grosssal = $("#grosssal").html();
	var netpayable = $("#netpayable").html();
	var noofworkingdays = $("#workingdayleaves").val();
	var noofleavestaken = $("#leaves").val();
	var noofdeductedleaves = $("#deductleave").val();
	var plvpVal = $("#plvpvalue").html();
	var payablesal = $("#payablesal").html();
	if (payablesal == "") {
		payablesal = 0;
	}
	var tds = $("#tds").html();
	var professionalTax = $("#professionaltax").html();
	var totaldeduction = $("#totaldeduct").html();
	var panno = $("#panno").html();
	var otherdeductions = $("#otherdeductions").html();
	var leavedeductions = $("#leavedeductions").html();
	var createddate = $("#createddate").html();
	var month = $("#month").html();
	var queryType = $("#queryType").val();
	var PF = $("#PF").html();
	var inputs = [];
	inputs.push('action=saveSalaryDetails');
	inputs.push('user_id=' + user_id);
	inputs.push('efDate=' + efDate);
	// inputs.push('annSal=' + annSal);
	inputs.push('basSal=' + basSal);
	inputs.push('monthlygrossSal=' + monthlygrossSal);
	inputs.push('houserentAllowance=' + houserentAllowance);
	inputs.push('medical=' + medical);
	// inputs.push('conveyance=' + conveyance);
	inputs.push('lta=' + lta);
	inputs.push('otherallowance=' + otherallowance);
	inputs.push('incentive=' + incentive);
	inputs.push('reimburse=' + reimburse);
	inputs.push('grosssal=' + grosssal);
	inputs.push('netpayable=' + netpayable);
	inputs.push('noofworkingdays=' + noofworkingdays);
	inputs.push('noofleavestaken=' + noofleavestaken);
	inputs.push('noofdeductedleaves=' + noofdeductedleaves);
	inputs.push('plvpVal=' + plvpVal);
	inputs.push('payablesal=' + payablesal);
	inputs.push('tds=' + tds);
	inputs.push('professionalTax=' + professionalTax);
	inputs.push('totaldeduction=' + totaldeduction);
	inputs.push('panno=' + panno);
	inputs.push('otherdeductions=' + otherdeductions);
	inputs.push('leavedeductions=' + leavedeductions);
	inputs.push('createddate=' + createddate);
	inputs.push('month=' + month);
	inputs.push('PF=' + PF);
	inputs.push('queryType=' + queryType);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			// window.location = "SalaryManagement.jsp";
		}
	});

}

var ViewAllPrevSalarySlipTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 14%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Salary Month/Year </div><div style='width: 35%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Employee Name </div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Payable Salary </div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Salary Slip</div></div></div><div style='width: 100%;border: 1px solid #436a9d;height: 100%;overflow-y: scroll;'>{#foreach $T.listSalaryComponanat as listSalaryComponanat}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}' style='width: 15%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.listSalaryComponanat.month}{$T.listSalaryComponanat.year}</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: left;' id='uname{count}'> {empNameId}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;' id='utype{count}'>{$T.listSalaryComponanat.paySal}</div><div style='width: 20%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='VIEW SALARY SLIP' id='btnEdit{count}' onclick='viewSalarySlip({$T.listSalaryComponanat.idsc})'/></div></div>{#/for}</div>";

function getSalarySlipForEmp(user_id) {
	// var user_id = $("#uID").val();
	var inputs = [];
	inputs.push('action=getSalarySlipForEmp');
	inputs.push('user_id=' + user_id);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			// alert($('#empNameId').val());
			empNameId = $('#empNameId').val();
			pobj = eval('(' + ajaxResponse + ')');

			$("#userMangTemp").setTemplate(ViewAllPrevSalarySlipTemp);
			$("#userMangTemp").processTemplate(pobj, empNameId);

		}
	});
}
function saveSalarySlip() {

	var user_id = $("#userID").val();
	var annSal = $("#annSal").val();
	var month = $("#month option:selected").text();
	var year = $("#year").val();
	var txtDate = $("#txtDate").val();
	var totalDays = $("#totalDays").val();
	var presentDays = $("#presentDays").val();
	var absentDays = $("#absentDays").val();
	var paidDays = $("#paidDays").val();
	var unpaidDays = $("#unpaidDays").val();
	var latemin = $("#latemin").val();
	var monSecDed = $("#monSecDed").val();
	var paySal = $("#paySal").val();
	var txtSalaryComp=$("#txtSalaryComp").val();
	
	if (txtDate == "") {
		alert("Plesae enter date..! ");
		return false;
	} else if (totalDays == "") {

		alert("Please enter Total Days..!");
		return false;
	} else if (presentDays == "") {
		alert("Please enter Present Days...!");
		return false;
	} else if (latemin == "") {
		alert("Please enter Late Miniute...!");
		return false;
	}
	var inputs = [];

	inputs.push('action=saveSalarySlip');
	inputs.push('user_id=' + user_id);
	inputs.push('annSal=' + annSal);
	inputs.push('month=' + month);
	inputs.push('year=' + year);
	inputs.push('txtDate=' + txtDate);
	inputs.push('totalDays=' + totalDays);
	inputs.push('presentDays=' + presentDays);
	inputs.push('absentDays=' + absentDays);
	inputs.push('paidDays=' + paidDays);
	inputs.push('unpaidDays=' + unpaidDays);
	inputs.push('latemin=' + latemin);
	inputs.push('monSecDed=' + monSecDed);
	inputs.push('paySal=' + paySal);
	inputs.push('txtSalaryComp=' + txtSalaryComp);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location = "SalaryManagement.jsp";
		}
	});

}

var salarySlipDetailsTemp = '<div id="tableContent"	style="width: 80%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float:;"><table style="border: 0px solid; padding-left: 10%; padding-top: 1%; width: 100%"	cellpadding="0" cellspacing="0"><tr><td align="center" style="border: 1px solid; width: 25%;">Employee Name</td><td id="txtEmpName" style="width: 31%; border: 0.2px solid;">{empNameId}</td><td align="center" style="border: 1px solid; width: 25%;">Effective Date</td><td style="width: 20%;border: 0.2px solid;"id="txtDate"></td></tr><tr><td align="center" style="border: 1px solid; width: 25%;">Employee Designation</td><td style="width: 31%;border: 0.2px solid;"></td><td align="center" style="border: 1px solid; width: 25%;">Salary Month/Year</td><td style="width: 20%;border: 0.2px solid;">{$T.month}&nbsp;{$T.year}</td></tr></table></div><div id="tableContent" style="width: 80%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float:;"><table style="border: 0px solid; padding-left: 10%; padding-top: 1%; width: 100%" cellpadding="0" cellspacing="0"><tr><td	style="border: 1px solid; text-align: right; padding-right: 5px; width: 56%">Annual	Gross</td><td id="totalDuration" style="border: 1px solid; text-align: right; padding-right: 5px; width: 44%">{$T.ans}</td></tr><tr><td	style="border: 1px solid; text-align: right; padding-right: 5px; width: 56%">Monthly Gross</td><td id="totalDays" style="border: 1px solid; text-align: right; padding-right: 5px; width: 44%">{$T.gs}</td></tr><tr><td style="border: 1px solid; text-align: right; padding-right: 5px; width: 56%">Monthly Allowances</td><td id="absentDays" style="border: 1px solid; text-align: right; padding-right: 5px; width: 44%"></td></tr><tr><td style="border: 1px solid; text-align: right; padding-right: 5px; width: 56%">Professional Tax</td><td id="presentDays" style="border: 1px solid; text-align: right; padding-right: 5px; width: 44%">{$T.pt}</td></tr><tr><td style="border: 1px solid; text-align: right; padding-right: 5px; width: 56%">Monthly Deduction</td><td id="monSecDed"	style="border: 1px solid; text-align: right; padding-right: 5px; width: 44%"></td></tr><tr><td	style="border: 1px solid; text-align: right; padding-right: 5px; width: 56%">Payable Salary</td><td id="paySal"	style="border: 1px solid; text-align: right; padding-right: 5px; width: 44%">{$T.paySal}</td></tr></table></div>';

function viewSalarySlip(idsc) {
	empNameId = $('#empNameId').val();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.listSalaryComponanat.length; i++) {

		if (myArray.listSalaryComponanat[i].idsc == idsc) {

			myObj1 = myArray.listSalaryComponanat[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj1);

	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	// alert(empName);
	$("#userMangTemp").setTemplate(salarySlipDetailsTemp);
	$("#userMangTemp").processTemplate(userBean, empNameId);

}

function calPayableSalary() {

	var grossSal = $("#grossSal").val();
	var perDaySal = grossSal / 30;

	var unpaidDays = $("#unpaidDays").val();
	var salDeduction = FloatTO(perDaySal * unpaidDays);
	var netSal = Math.round(grossSal - salDeduction);

	$("#paySal").val(netSal);
}

/** *****************Leave Management************************** */

function createDivLeave() {

	for ( var i = 0; i < pobj.listLeaveAp.length; i++) {

		if (pobj.listLeaveAp[i].status == "P") {
			alert("You can Not apply!  Beacause Your Previous Leave Application is allready Pending for approval...");
			return false;
		}
		j++;
	}
	
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var appDate = $("#appDate" + rowCount + "").val();
		var from = $("#from" + rowCount + "").val();
		var to = $("#to" + rowCount + "").val();
		var days = $("#days" + rowCount + "").val();
		var balance = $("#balance" + rowCount + "").val();
		if (appDate == "" || from == "" && to == "" && days == ""
				&& balance == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;

	divId = "tr" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	//x.setAttribute('style', 'width: 100%; ');
	document.getElementById("leaveDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<td class="col-sm-1-1 center" style="height: 21.5px;">'
			+ (rowCount)
			+ '</td><td class="col-sm-3-1 center" style="height: 21.5px;"><input type="text" id="appDate'
			+ (rowCount)
			+ '" class="form-control input-SmallText" /></td><td class="col-sm-2-1 center" style="height: 21.5px;"><input type="text" onclick=displayCalendar(document.getElementById(this.id),\'dd/mm/yyyy\',this) readonly="readonly" '
			+ '" id="from'
			+ (rowCount)
			+ '" class="form-control input-SmallText" /></td><td class="col-sm-2-1 center" style="height: 21.5px;" id="divPi2" ><input type="text" onclick=displayCalendar(document.getElementById(this.id),\'dd/mm/yyyy\',this) readonly="readonly" '
			+ '" id="to'
			+ (rowCount)
			+ '" class="form-control input-SmallText" /></td><td class="col-sm-1-1 center" style="height: 21.5px;"><input type="text" id="days'
			+ (rowCount)
			+ '" class="form-control input-SmallText" readonly="readonly" onclick="calculateDays('
			+ (rowCount)
			+ ')" /></td><td class="col-sm-2-1 center" style="height: 21.5px;">'
			+'<input type="button" disabled="disabled" value="Check Status" id="approve'
			+ (rowCount)
			+ '" class="btn btn-xs btn-danger" /></td><td class="col-sm-1-1 center" style="height: 21.5px;"><input type="checkbox" style="font-size: 10px;"  id="chkbox'
			+ (rowCount) + '" /></td><input id="idlm'+(rowCount)+'" type="hidden" value="0"></tr>';

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
}

var fetchLeavelist = '{#foreach $T.listLeaveAp as listLeaveAp}'
	+'<tr id="tr{count}">'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;">{count}</td>'
	+'<td class="col-sm-3-1 center" style="height: 21.5px;">'
	+'<input type="text" class="form-control input-SmallText" id="appDate{count}" value="{$T.listLeaveAp.reason}" /></td>'
	+'<td class="col-sm-2-1 center" style="height: 21.5px;">'
	+'<input type="text" class="form-control input-SmallText" id="from{count}" value="{$T.listLeaveAp.from}" onclick="displayCalendar(document.getElementById(\'from{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly" /></td>'
	+'<td class="col-sm-2-1 center" style="height: 21.5px;" id="divPi2">'
	+'<input type="text" class="form-control input-SmallText" id="to{count}" value="{$T.listLeaveAp.to}" onclick="displayCalendar(document.getElementById(\'to{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly" /></td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;">'
	+'<input type="text" class="form-control input-SmallText" id="days{count}" readonly="readonly" onclick="calculateDays({count})" value="{$T.listLeaveAp.days}" /></td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;">'
	+'<input type="button" class="btn btn-xs btn-danger" id="approve{count}" value="Check Status" onclick="showLeaveStatus({$T.listLeaveAp.idlm},{count})" /></td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;">'
	+'<input type="checkbox" id="chkbox{count}" name="chkbox{count}" style="font-size: 10px;" /></td>'
	+'<input id="idlm{count}" type="hidden" value="{$T.listLeaveAp.idlm}"></tr>'
	+'<input id="temp{$T.listLeaveAp.idlm}" type="hidden" value="{count++}" >{#/for}'
	+'<input id="RowCount" name="RowCount" type="hidden" value="{--count}">'
	+'<input id="addRowCount" name="addRowCount" type="hidden" value="{count}">';

var fetchLeavelistforHR = '{#foreach $T.listLeaveAp as listLeaveAp}<div style="width: 100%; height: 28px; border-bottom: 1px solid #09C;" id="idLeaveApplication{count}"><div style="width: 3%; height: 23px; text-align: center; border-right: 1px solid #069; border-left: 1px solid #069; padding-top: 5px;">{count}</div><div style="width: 12.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.listLeaveAp.ename}</div><div style="width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.listLeaveAp.apdate}</div><div style="width: 7.9%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{$T.listLeaveAp.reason}</div><div id="from{count}" style="width: 7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;">{$T.listLeaveAp.from}</div><div id="to{count}" style="width: 8.2%; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px; text-align: center;">{$T.listLeaveAp.to}</div><div style="width: 5.9%; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px; text-align: center;">{$T.listLeaveAp.days}</div><div id="balance{count}" style="width: 5.1%; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px; text-align: center;">{$T.listLeaveAp.balance}</div><div style="width: 4%; height: 25px; padding-left: 0%; padding-top: 3px; text-align: center; border-right: 1px solid #069;"><input type="radio" id="approve{count}" name="approve{count}" style="width: 90%;" onclick="setApproveDates({count})" ></div><div style="width: 4%; height: 25px; padding-left: 0%; padding-top: 3px; text-align: center; border-right: 1px solid #069;"><input type="radio" name="approve{count}" id="Napprove{count}" style="width: 90%;" onclick="setNonApprove({count})" ></div><div style="width: 8.3%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;"><input type="text" readonly="readonly" onclick="setDatecalender({count})" value="{$T.listLeaveAp.apFrm}" id="Apfrom{count}"  style="width: 90%;"></div><div id="divPi2" style="width: 7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;"><input type="text" readonly="readonly" value="{$T.listLeaveAp.apTo}" onclick="setDatecalender({count})" id="Apto{count}" style="width: 90%;"></div><div style="width: 6%; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px; text-align: center;"><input type="text" readonly="readonly" value="{$T.listLeaveAp.apDays}" id="Apdays{count}" style="width: 70%;"   onclick="calculateDays({count})" ></div><div style="width: 2%; height: 25px; padding-left: 0%; padding-top: 3px; text-align: center; "><input type="checkbox" id="chkbox{count}" style="width: 90%;"></div><input type="hidden" value="{$T.listLeaveAp.idlm}" id="idlm{count}"><input type="hidden" value="{$T.listLeaveAp.uid}" id="userId{count++}"></div>{#/for}<input id="RowCount" name="RowCount" type="hidden" value="{--count}"><input id="addRowCount" name="addRowCount" type="hidden" value="{count}">';

var fetchLeavelistforHRPending = '{#foreach $T.listLeaveAp as listLeaveAp}{#if $T.listLeaveAp.st == "P"}'
	+'<tr id="idLeaveApplication{count}">'
	+'<td class="center" style="height: 21.5px;width:3%;">{count}</td>'
	+'<td class="center" style="height: 21.5px;width:17.8%;">{$T.listLeaveAp.ename}</td>'
	+'<td class="center" style="height: 21.5px;width:13.2%;">{$T.listLeaveAp.reason}</div>'
	+'<td class="center" style="height: 21.5px;width:7%;">{$T.listLeaveAp.apdate}</div>'
	+'<td class="center" style="height: 21.5px;width:7.2%;" id="from{count}">{$T.listLeaveAp.from}</td>'
	+'<td class="center" style="height: 21.5px;width:6.8%;" id="to{count}" >{$T.listLeaveAp.to}</td>'
	+'<td class="center" style="height: 21.5px;width:5.2%;">{$T.listLeaveAp.days}</td>'
	+'<td class="center" style="height: 21.5px;width:6.9%;" id="balance{count}" >{$T.listLeaveAp.balance}</td>'
	+'<td class="" style="height: 21.5px;width:3%;" >'
	+'{#if $T.listLeaveAp.approve == 1}'
	+'<input type="radio" id="approve{count}" name="approve{count}" onclick="setApproveDates({count})" checked="checked" />'
	+"{#else}"
	+'<input type="radio" id="approve{count}" name="approve{count}" onclick="setApproveDates({count})" />'
	+'{#/if}</td>'
	+'<td class="" style="height: 21.5px;width:3%;" >'
	+'{#if $T.listLeaveAp.approve == 0}'
	+'<input type="radio" name="approve{count}" id="Napprove{count}" onclick="setNonApprove({count})" checked="checked" />'
	+"{#else}"
	+'<input type="radio" name="approve{count}" id="Napprove{count}" onclick="setNonApprove({count})" />'
	+'{#/if}</td>'
	+'<td class="center" style="height: 21.5px;width:9.9%;">'
	+'<input type="text" class="form-control input-SmallText" value="{$T.listLeaveAp.apFrm}" id="Apfrom{count}" onclick="displayCalendar(document.getElementById(\'Apfrom{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly" /></td>'
	+'<td class="center" style="height: 21.5px;width:9.9%;">'
	+'<input type="text" class="form-control input-SmallText" value="{$T.listLeaveAp.apTo}" id="Apto{count}" onclick="displayCalendar(document.getElementById(\'Apto{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly"/></td>'
	+'<td class="center" style="height: 21.5px;width:8%;" >'
	+'<input type="text" class="form-control input-SmallText" readonly="readonly" value="{$T.listLeaveAp.apDays}" id="Apdays{count}" onclick="calculateDays({count})" /></td>'
	+'<td class="" style="height: 21.5px;">'
	+'<input type="checkbox" id="chkbox{count}" /></td>'
	+'<input type="hidden" value="{$T.listLeaveAp.idlm}" id="idlm{count}">'
	+'<input type="hidden" value="{$T.listLeaveAp.uid}" id="userId{count++}"></tr>{#/if}{#/for}'
	+'<input id="RowCount" name="RowCount" type="hidden" value="{--count}">'
	+'<input id="addRowCount" name="addRowCount" type="hidden" value="{count}">';


/*
 * Template for Cancel 		-->Touheed (28-09-2015)
 */

var fetchLeavelistforHRCancel = '{#foreach $T.listLeaveAp as listLeaveAp}{#if $T.listLeaveAp.selCancellation == "cancel"}'
	+'<tr id="idLeaveApplication{count}">'
	+'<td class="center" style="height: 21.5px;width:3%;">{count}</td>'
	+'<td class="center" style="height: 21.5px;width:17.8%;">{$T.listLeaveAp.ename}</td>'
	+'<td class="center" style="height: 21.5px;width:13.2%;">{$T.listLeaveAp.reason}</div>'
	+'<td class="center" style="height: 21.5px;width:7%;">{$T.listLeaveAp.apdate}</div>'
	+'<td class="center" style="height: 21.5px;width:7.2%;" id="from{count}">{$T.listLeaveAp.from}</td>'
	+'<td class="center" style="height: 21.5px;width:6.8%;" id="to{count}" >{$T.listLeaveAp.to}</td>'
	+'<td class="center" style="height: 21.5px;width:5.2%;">{$T.listLeaveAp.days}</td>'
	+'<td class="center" style="height: 21.5px;width:6.9%;" id="balance{count}" >{$T.listLeaveAp.balance}</td>'
	+'<td class="" style="height: 21.5px;width:3%;" >'
	+'{#if $T.listLeaveAp.approve == 1}'
	+'<input type="radio" id="approve{count}" name="approve{count}" onclick="setApproveDates({count})" checked="checked" />'
	+"{#else}"
	+'<input type="radio" id="approve{count}" name="approve{count}" onclick="setApproveDates({count})" />'
	+'{#/if}</td>'
	+'<td class="" style="height: 21.5px;width:3%;" >'
	+'{#if $T.listLeaveAp.approve == 0}'
	+'<input type="radio" name="approve{count}" id="Napprove{count}" onclick="setNonApprove({count})" checked="checked" />'
	+"{#else}"
	+'<input type="radio" name="approve{count}" id="Napprove{count}" onclick="setNonApprove({count})" />'
	+'{#/if}</td>'
	+'<td class="center" style="height: 21.5px;width:9.9%;">'
	+'<input type="text" class="form-control input-SmallText" value="{$T.listLeaveAp.apFrm}" id="Apfrom{count}" onclick="displayCalendar(document.getElementById(\'Apfrom{count}\'),\'dd/mm/yyyy\',this.id)" readonly="readonly" /></td>'
	+'<td class="center" style="height: 21.5px;width:9.9%;">'
	+'<input type="text" class="form-control input-SmallText" value="{$T.listLeaveAp.apTo}" id="Apto{count}" onclick="displayCalendar(document.getElementById(\'Apto{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly"/></td>'
	+'<td class="center" style="height: 21.5px;width:8%;" >'
	+'<input type="text" class="form-control input-SmallText" readonly="readonly" value="{$T.listLeaveAp.apDays}" id="Apdays{count}" onclick="calculateDays({count})" /></td>'
	+'<td class="" style="height: 21.5px;">'
	+'<input type="checkbox" id="chkbox{count}" /></td>'
	+'<input type="hidden" value="{$T.listLeaveAp.idlm}" id="idlm{count}">'
	+'<input type="hidden" value="{$T.listLeaveAp.uid}" id="userId{count++}"></tr>{#/if}{#/for}'
	+'<input id="RowCount" name="RowCount" type="hidden" value="{--count}">'
	+'<input id="addRowCount" name="addRowCount" type="hidden" value="{count}">';

/*
 * Template for Update		-->Touheed (28-09-2015)
 */

var fetchLeavelistforHRUpdate = '{#foreach $T.listLeaveAp as listLeaveAp}{#if $T.listLeaveAp.selCancellation == "update"}'
	+'<tr id="idLeaveApplication{count}">'
	+'<td class="center" style="height: 21.5px;width:3%;">{count}</td>'
	+'<td class="center" style="height: 21.5px;width:17.8%;">{$T.listLeaveAp.ename}</td>'
	+'<td class="center" style="height: 21.5px;width:13.2%;">{$T.listLeaveAp.reason}</div>'
	+'<td class="center" style="height: 21.5px;width:7%;">{$T.listLeaveAp.apdate}</div>'
	+'<td class="center" style="height: 21.5px;width:7.2%;" id="from{count}">{$T.listLeaveAp.from}</td>'
	+'<td class="center" style="height: 21.5px;width:6.8%;" id="to{count}" >{$T.listLeaveAp.to}</td>'
	+'<td class="center" style="height: 21.5px;width:5.2%;">{$T.listLeaveAp.days}</td>'
	+'<td class="center" style="height: 21.5px;width:6.9%;" id="balance{count}" >{$T.listLeaveAp.balance}</td>'
	+'<td class="" style="height: 21.5px;width:3%;" >'
	+'{#if $T.listLeaveAp.approve == 1}'
	+'<input type="radio" id="approve{count}" name="approve{count}" onclick="setApproveDates({count})" checked="checked" />'
	+"{#else}"
	+'<input type="radio" id="approve{count}" name="approve{count}" onclick="setApproveDates({count})" />'
	+'{#/if}</td>'
	+'<td class="" style="height: 21.5px;width:3%;" >'
	+'{#if $T.listLeaveAp.approve == 0}'
	+'<input type="radio" name="approve{count}" id="Napprove{count}" onclick="setNonApprove({count})" checked="checked" />'
	+"{#else}"
	+'<input type="radio" name="approve{count}" id="Napprove{count}" onclick="setNonApprove({count})" />'
	+'{#/if}</td>'
	+'<td class="center" style="height: 21.5px;width:9.9%;">'
	+'<input type="text" class="form-control input-SmallText" value="{$T.listLeaveAp.apFrm}" id="Apfrom{count}" onclick="displayCalendar(document.getElementById(\'Apfrom{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly" /></td>'
	+'<td class="center" style="height: 21.5px;width:9.9%;">'
	+'<input type="text" class="form-control input-SmallText" value="{$T.listLeaveAp.apTo}" id="Apto{count}" onclick="displayCalendar(document.getElementById(\'Apto{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly"/></td>'
	+'<td class="center" style="height: 21.5px;width:8%;" >'
	+'<input type="text" class="form-control input-SmallText" readonly="readonly" value="{$T.listLeaveAp.apDays}" id="Apdays{count}" onclick="calculateDays({count})" /></td>'
	+'<td class="" style="height: 21.5px;">'
	+'<input type="checkbox" id="chkbox{count}" /></td>'
	+'<input type="hidden" value="{$T.listLeaveAp.idlm}" id="idlm{count}">'
	+'<input type="hidden" value="{$T.listLeaveAp.uid}" id="userId{count++}"></tr>{#/if}{#/for}'
	+'<input id="RowCount" name="RowCount" type="hidden" value="{--count}">'
	+'<input id="addRowCount" name="addRowCount" type="hidden" value="{count}">';


/*
 * Template for AprNonapr		-->Touheed (28-09-2015)
 */

var fetchLeavelistforAprNonapr = '{#foreach $T.listLeaveAp as listLeaveAp}{#if (($T.listLeaveAp.st == "P" || $T.listLeaveAp.st == "S") && $T.listLeaveAp.selCancellation == "N")}'
	+'<tr id="idLeaveApplication{count}">'
	+'<td class="center" style="height: 21.5px;width:3%;">{count}</td>'
	+'<td class="center" style="height: 21.5px;width:17.8%;">{$T.listLeaveAp.ename}</td>'
	+'<td class="center" style="height: 21.5px;width:13.2%;">{$T.listLeaveAp.reason}</div>'
	+'<td class="center" style="height: 21.5px;width:7%;">{$T.listLeaveAp.apdate}</div>'
	+'<td class="center" style="height: 21.5px;width:7.2%;" id="from{count}">{$T.listLeaveAp.from}</td>'
	+'<td class="center" style="height: 21.5px;width:6.8%;" id="to{count}" >{$T.listLeaveAp.to}</td>'
	+'<td class="center" style="height: 21.5px;width:5.2%;">{$T.listLeaveAp.days}</td>'
	+'<td class="center" style="height: 21.5px;width:6.9%;" id="balance{count}" >{$T.listLeaveAp.balance}</td>'
	+'<td class="" style="height: 21.5px;width:3%;" >'
	+'{#if $T.listLeaveAp.approve == 1}'
	+'<input type="radio" id="approve{count}" name="approve{count}" onclick="setApproveDates({count})" checked="checked" />'
	+"{#else}"
	+'<input type="radio" id="approve{count}" name="approve{count}" onclick="setApproveDates({count})" />'
	+'{#/if}</td>'
	+'<td class="" style="height: 21.5px;width:3%;" >'
	+'{#if $T.listLeaveAp.approve == 0}'
	+'<input type="radio" name="approve{count}" id="Napprove{count}" onclick="setNonApprove({count})" checked="checked" />'
	+"{#else}"
	+'<input type="radio" name="approve{count}" id="Napprove{count}" onclick="setNonApprove({count})" />'
	+'{#/if}</td>'
	+'<td class="center" style="height: 21.5px;width:9.9%;">'
	+'<input type="text" class="form-control input-SmallText" value="{$T.listLeaveAp.apFrm}" id="Apfrom{count}" onclick="displayCalendar(document.getElementById(\'Apfrom{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly" /></td>'
	+'<td class="center" style="height: 21.5px;width:9.9%;">'
	+'<input type="text" class="form-control input-SmallText" value="{$T.listLeaveAp.apTo}" id="Apto{count}" onclick="displayCalendar(document.getElementById(\'Apto{count}\'),\'dd/mm/yyyy\',this)" readonly="readonly"/></td>'
	+'<td class="center" style="height: 21.5px;width:8%;" >'
	+'<input type="text" class="form-control input-SmallText" readonly="readonly" value="{$T.listLeaveAp.apDays}" id="Apdays{count}" onclick="calculateDays({count})" /></td>'
	+'<td class="" style="height: 21.5px;">'
	+'<input type="checkbox" id="chkbox{count}" /></td>'
	+'<input type="hidden" value="{$T.listLeaveAp.idlm}" id="idlm{count}">'
	+'<input type="hidden" value="{$T.listLeaveAp.uid}" id="userId{count++}"></tr>{#/if}{#/for}'
	+'<input id="RowCount" name="RowCount" type="hidden" value="{--count}">'
	+'<input id="addRowCount" name="addRowCount" type="hidden" value="{count}">';



var leaveStatus = '<tr id="tr1">'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;">1</td>'
	+'<td class="col-sm-3-1 center" style="height: 21.5px;" id="approveStatus"></td>'
	+'<td class="col-sm-2-1 center" style="height: 21.5px;">{$T.apFrm}</td>'
	+'<td class="col-sm-2-1 center" style="height: 21.5px;">{$T.apTo}</td>'
	+'<td class="col-sm-2-1 center" style="height: 21.5px;" id="divPi2">{$T.apDays}</td>'
	+'<td class="col-sm-2-1 center" style="height: 21.5px;">'
	+'<select class="form-control input-SmallText" id="selCancellation" onchange="cancellationOnchange()">'
	+'<option value="Select">-Select-</option>'
	+'<option value="cancel">Cancellation</option><option value="update">Update Shedule</option></select>'
	+'</td></tr>'
	+'<input id="tempCount" type="hidden" value="{$T.idlm}">';

var count = 1;

function cancellationOnchange() {
	var tempCount = $("#tempCount").val();
	var countvar = $("#temp" + tempCount).val();

	// alert(countvar);
	$("#appDate" + countvar).attr('disabled',false);
	$("#from" + countvar).attr('disabled',false);
	$("#to" + countvar).attr('disabled',false);
	$("#days" + countvar).attr('disabled',false);
	$("#chkbox" + countvar).attr('disabled',false);
	$('input[name=chkbox' + countvar + ' ]').attr('checked', true);
}
function setNonApprove(countVar) {
	$("#Apfrom" + countVar).val('');
	$("#Apto" + countVar).val('');
	$("#Apdays" + countVar).val('');

	$("#Apfrom" + countVar).attr('disabled', 'disabled');
	$("#Apto" + countVar).attr('disabled', 'disabled');
	$("#Apdays" + countVar).attr('disabled', 'disabled');

	$("#Apfrom" + countVar).attr('style',
			'width: 90%; background-color: lightgray;');
	$("#Apto" + countVar).attr('style',
			'width: 90%; background-color: lightgray;');
	$("#Apdays" + countVar).attr('style',
			'width: 70%; background-color: lightgray;');
}
function setApproveDates(countVar) {

	$("#Apfrom" + countVar).attr('style', 'width: 90%;');
	$("#Apto" + countVar).attr('style', 'width: 90%;');
	$("#Apdays" + countVar).attr('style', 'width: 70%;');

	$("#Apfrom" + countVar).removeAttr('disabled');
	$("#Apto" + countVar).removeAttr('disabled');
	$("#Apdays" + countVar).removeAttr('disabled');

	var from = $("#from" + countVar).html();
	var to = $("#to" + countVar).html();
	$("#Apfrom" + countVar).val(from);
	$("#Apto" + countVar).val(to);
}
function updateLeaveApplication() {

	var listLeaveApobj = {
		listLeaveAp : []
	};
	var count = 0;
	var rowCount = $("#RowCount").val();

	for ( var i = 1; i <= rowCount; i++) {
		count++;
		var chkval = $('#chkbox' + i).attr('checked') ? 1 : 0;
		if (chkval == 1) {
			var approve = ($("#approve" + i)).is(':checked') ? 1 : 0;
			var Apfrom = $("#Apfrom" + count + "").val();
			var Apto = $("#Apto" + count + "").val();
			var Apdays = $("#Apdays" + count + "").val();
			var balance = $("#balance" + count + "").html();

			var idlm = $("#idlm" + count + "").val();
			var userId = $("#userId" + count + "").val();
			if (approve == 1 && (Apfrom == "" || Apto == "" || Apdays == "")) {
				alert("You can not save empty fields.");
				return false;
			}
			if (Apfrom != undefined) {

				listLeaveApobj.listLeaveAp.push({
					"apFrm" : Apfrom,
					"apTo" : Apto,
					"apDays" : Apdays,
					"balance" : balance,
					"approve" : approve,
					"idlm" : idlm,
					"uid" : userId
				});
			}
		}

	}
	if (listLeaveApobj.listLeaveAp.length == 0) {
		alert("Please Check On To which Leave shall be Approve/Non Approve!! ");
		return false;
	}
	listLeaveApobj = JSON.stringify(listLeaveApobj);

	var inputs = [];
	inputs.push('action=UpdateLeavesDetails');
	inputs.push('listLeaveApobj=' + listLeaveApobj);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {

			alert(ajaxResponse);
			location.reload();
		}
	});
}
function saveLeavesDetails() {

	var queryType = $("#queryType").val();
	var balance = $("#balLeaves").val();
	var listLeaveApobj = {
		listLeaveAp : []
	};
	var rowCount = $("#RowCount").val();
	var count = 0;
	if (rowCount == 0) {
		alert("You can not save empty fields.");
		return false;
	}

	for ( var i = 1; i <= rowCount; i++) {
		count++;
		var chkval = $('#chkbox' + i).attr('checked') ? 1 : 0;
		if (chkval == 1) {
			var appDate = $("#appDate" + count + "").val();
			var from = $("#from" + count + "").val();
			var to = $("#to" + count + "").val();
			var days = $("#days" + count + "").val();
			var selCancellation = $("#selCancellation").val();
			var approve = ($("#approve" + i)).is(':checked') ? 1 : 0;
			var idlm = $("#idlm" + count + "").val();
			if (appDate == "" || from == "" || to == "" || days == ""
					|| balance == "") {

				alert("You can not save empty fields.");
				return false;

			} else if (appDate != undefined) {

				listLeaveApobj.listLeaveAp.push({
					"apdate" : appDate,
					"from" : from,
					"to" : to,
					"days" : days,
					"balance" : balance,
					"approve" : approve,
					"idlm" : idlm,
					"selCancellation" : selCancellation
				});
			}
		}
	}

	if (listLeaveApobj.listLeaveAp.length == 0) {
		alert("Please Check The Check Box Of Submitting Application.");
		return false;
	}

	listLeaveApobj = JSON.stringify(listLeaveApobj);

	var inputs = [];
	inputs.push('action=SaveLeavesDetails');
	inputs.push('listLeaveApobj=' + listLeaveApobj);
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {

			alert(ajaxResponse);
			location.reload();
		}
	});

}
function fetchLeavesEmp(callFrom) {

	var inputs = [];
	inputs.push('action=FetchLeavesDetails');
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {

			ajaxResponse = r;
			// alert(ajaxResponse);
			count = 1;
			pobj = eval('(' + ajaxResponse + ')');
			if (callFrom == "LeaveManagement") {
				if (pobj.listLeaveAp.length < 1) {

					$("#queryType").val('insert');

					$("#leaveDiv").html("");

				} else if (pobj.listLeaveAp.length >= 1) {

					$("#idlm").val(pobj.listLeaveAp[0].idlm);

					$("#leaveDiv").html("");
					$("#queryType").val('update');
					$("#leaveDiv").setTemplate(fetchLeavelist);
					$("#leaveDiv").processTemplate(pobj);
					var j = 1;
					for ( var i = 0; i < pobj.listLeaveAp.length; i++) {

						if (pobj.listLeaveAp[i].st == "P") {
							$("#approve" + j).attr('disabled', 'disabled');
						} else {
							$("#appDate" + j).attr('disabled', 'disabled');
							$("#from" + j).attr('disabled', 'disabled');
							$("#to" + j).attr('disabled', 'disabled');
							$("#days" + j).attr('disabled', 'disabled');
							$("#chkbox" + j).attr('disabled', 'disabled');

						}

						j++;

					}
				}
			} else if (callFrom == "LeaveApplication") {
				$("#leaveDiv").setTemplate(fetchLeavelistforHR);
				$("#leaveDiv").processTemplate(pobj);
				var j = 1;
				for ( var i = 0; i < pobj.listLeaveAp.length; i++) {

					(pobj.listLeaveAp[i].approve == 1) ? $(
							'input[id=approve' + j + ']').attr('checked', true)
							: $('input[id=Napprove' + j + ']').attr('checked',
									true);
					if (pobj.listLeaveAp[i].approve == 0)
						setNonApprove(j);
					j++;
				}
			}
		}
	});

}
function sortingLeaveApplication(callFrom) {

	var inputs = [];
	inputs.push('action=FetchLeavesDetails');
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {

			ajaxResponse = r;
			// alert(ajaxResponse);
			count = 1;
			pobj = eval('(' + ajaxResponse + ')');
			
			if (callFrom == "RevisedApp") {
				$("#leaveDiv").setTemplate(fetchLeavelistforHRPending);
				$("#leaveDiv").processTemplate(pobj);
			} else if (callFrom == "CancellationApp") {
				$("#leaveDiv").setTemplate(fetchLeavelistforHRCancel);
				$("#leaveDiv").processTemplate(pobj);
			} else if (callFrom == "UpdationsApp") {
				$("#leaveDiv").setTemplate(fetchLeavelistforHRUpdate);
				$("#leaveDiv").processTemplate(pobj);
			} else if (callFrom == "AprNonaprApp") {
				$("#leaveDiv").setTemplate(fetchLeavelistforAprNonapr);
				$("#leaveDiv").processTemplate(pobj);
			}

		}
	});

}
function showLeaveStatus(idlm) {

	for ( var i = 1; i <= rowCount; i++) {
		count++;
		var chkval = $('#chkbox' + i).attr('checked') ? 1 : 0;
		if (chkval == 1) {

			var r = confirm("You can not Check Status While Previos Until previous status Saved/Update If you cancel Press Ok.!!");
			if (r == true) {
				location.reload();

			} else {
				return false;
			}
		}
	}
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.listLeaveAp.length; i++) {

		if (myArray.listLeaveAp[i].idlm == idlm) {

			myObj1 = myArray.listLeaveAp[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	// alert(empName);

	$("#statusDiv").setTemplate(leaveStatus);
	$("#statusDiv").processTemplate(userBean);

	if (userBean.approve == 1) {
		$("#approveStatus").html('Approve');
	} else {
		$("#approveStatus").html('Non Approve');
	}
	if (userBean.selCancellation == 'N') {
	$("#selCancellation").val("Select");
	}else{
		$("#selCancellation").val(userBean.selCancellation);
	}
}

function cancelLeave() {

	var r = confirm("You Want to Cancel This Leave");
	if (r == true) {

		// var hiddenRowCount = document.getElementById(RowCount);
		var rowCount = $("#RowCount").val();
		// alert(rowCount);
		/* var allVals = []; */
		for ( var n = 1; n <= rowCount; n++) {

			var $radios = $('input:checkbox[name=chkbox' + n + ']');
			if ($radios.is(':checked') == true) {
				idlm = $("#idlm" + n).val();
				$("#idLeaveApplication" + n).remove();

			}
		}

		cancelLeaveStatus(idlm);

	}

}

function cancelLeaveStatus(idlm) {
	var inputs = [];
	inputs.push('action=cancelLeaveStatus');
	inputs.push('allVals=' + idlm);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
					location.reload();
		//	alert(ajaxResponse);
		}
	});
}

/** ****************Leave Management************************** */

/** start HR Salary Details* */
/** Richa code for employee salary details * */
function setUserDetails() {
	var ajaxResponce = $("#myObj").html();

	var plvpval;

	userBean = eval('(' + ajaxResponce + ')');
	var today_date = new Date();

	var today_year = today_date.getFullYear();

	var today_month = (today_date.getMonth()) + 1;

	var today_day = today_date.getDate();

	var todaydate = today_year + "-" + today_month + "-" + today_day;
	var months = [ 'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December' ];
	var date = new Date();
	var month = months[date.getMonth()] + '-' + date.getFullYear();
	$("#userNm").val(userBean.un);
	
	var empName=userBean.fname +" "+ userBean.mname + " "+ userBean.lname;
	
	$("#divUserName").html(empName);
	
	
	$("#divUserId").html(userBean.ui);
	
	$("#fname").html(empName);
	$("#spanUserName").html(empName);
	$("#empno").html(userBean.ui);
	$("#joiningdate").html(userBean.obd.doj);
	$("#designation").html(userBean.ut);
	$("#deptname").html(userBean.obd.depNm);
	$("#allowedleaves").html(userBean.obd.aplLeaves);
	$("#salary").html(userBean.obd.ctc);
	// calculateEmployeeTDS();
	$("#plvppercent").html(userBean.obd.plvp);
	
	//suraj code to add toFixed
	plvpval = ((userBean.obd.plvp) / 100) * (userBean.obd.ctc);
	$("#plvpvalue").html(plvpval.toFixed(2));
	
	//suraj code to add toFixed
	monthlygross = Math.round(((userBean.obd.ctc) - (plvpval)) / 12);
	$("#monthlygross").html(monthlygross.toFixed(2));
	$("#panno").html(userBean.obd.pan);
	$("#password").val(userBean.up);
	$("#userType").val(userBean.ut);
	$("#status").val(userBean.st);
	
	//suraj code for toFixed
	$("#grosssal").html(monthlygross.toFixed(2));
	$("#grosst").html(monthlygross);
	$("#dob").val(userBean.obd.udob);
	$("#createddate").html(todaydate);
	$("#month").html(month);
	$("#divDepartment").html(userBean.obd.depNm);
	
	calculateEmployeeTDS();
	var tds = $("#tds").html();
	var totaldeduction = 0;
	var otherdeduct = $("#otherdeductions").html();
	var professionaltax = $("#professionaltax").html();
	calculateSalaryComponent();

}

function calculateSalaryComponent() {
	var inputs = [];
	inputs.push('action=fetchHrSalaryComponent');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {

			var monthlygross;
			$("#masterresponce").val(ajaxResponse);
			monthlygross = $("#monthlygross").html();
			pobj = eval('(' + ajaxResponse + ')');

			var basic=0;
			basic = Math.round(($("#monthlygross").html())
					* ((pobj.basic) / 100));
			
			//suraj code for toFixed
			$("#basic").html(basic.toFixed(2));
			
			var houserent = (($("#basic").html()) * ((pobj.hr) / 100));
			var lta = (((monthlygross) * (pobj.lta)) / 100);
			var wash = Math.round(((monthlygross * (pobj.wash)) / 100));
			
			//suraj code to add toFixed
			var pfAmount=(($("#basic").html()) * ((pobj.pf) / 100));
			var PF = pfAmount.toFixed(2);
			var total = basic + houserent + lta + wash;
			var otherallowance = monthlygross - total;
			$("#lta").val(lta);
			
			//suraj code for toFiced
			$("#houserent").html(houserent.toFixed(2));
			$("#medical").val(wash);
			$("#PF").html(PF);
			
			//suraj code for toFixed
			var salDep=pobj.sdp;
			$("#sdp").html(salDep.toFixed(2));
			
			$("#otherallowance").html(otherallowance);
		}
	});
}

function calculateLTASalary() {

	var ajaxResponce = $("#myObj").html();
	var monthlygross;
	monthlygross = $("#monthlygross").html();
	var noofworkingdays = $("#workingdayleaves").val();
	var payabledays = $("#payabledays").html();
	var a = ((noofworkingdays) / (payabledays));
	var payablesal = ((monthlygross) * a);

	var lta = Math.round(((payablesal) * ((pobj.lta) / 100)));
	if (lta > monthlygross) {

	}
	
	//suraj code for toFixed
	$("#lta").html(lta.toFixed(2));
	// calculateOtherAllowance();

}
function calculatePayableSalary() {

	var ajaxResponce = $("#myObj").html();
	var monthlygross;
	monthlygross = $("#monthlygross").html();
	var noofworkingdays = $("#workingdayleaves").val();
	var medical = 0;
	var conveyance = 0;
	var basic = 0;
	var houserent = 0;
	var lta = 0;
	medical = $("#medical").val();// washing Allowance
	// conveyance = $("#conveyance").val();
	basic = $("#basic").html();
	houserent = $("#houserent").html();
	lta = $.trim($("#lta").val());
	var total1 = (parseFloat(basic) + parseFloat(houserent)
			+ parseFloat(medical) + parseFloat(lta));
	totaldeduction = Math.round(parseFloat($("#professionaltax").html()))
			+ parseFloat($("#tds").html()) + parseFloat($("#PF").html())
			+ parseFloat($("#otherdeductions").html())
			+ parseFloat($("#sdp").html());
	
	//suraj code for toFixed
	$("#totaldeduct").html(totaldeduction.toFixed(2));
	var total = 0;
	total = Math.round(((monthlygross) - (totaldeduction)));
	
	//suraj code for toFixed
	$("#netpayable").html(total.toFixed(2));
	
	$("#divNetPayable").html(total.toFixed(2));
	
	
	$("#payablesal").html(total.toFixed(2));

}
function setPreviousUserDetails() {
	
	
	
	var ajaxResponce = $("#myObj").html();
	// var ajaxResponce=$("#response").val();
	var plvpval;
	var monthlygross;
	userBean = eval('(' + ajaxResponce + ')');
	$("#userNm").val(userBean.un);
	$("#fname").html(userBean.listDoc.dn);
	
	//suraj code to set employee name and no
	var empName=userBean.listDoc.dn;
	
	$("#divUserName").html(empName);
	
	
	$("#divUserId").html(userBean.listDoc.ui);
	
	$("#spanUserName").html(empName);
	
	$("#empno").html(userBean.listDoc.ui);
	$("#joiningdate").html(userBean.listDoc.doj);
	$("#designation").html(userBean.listDoc.dt);
	$("#deptname").html(userBean.listDoc.depNm);
	$("#allowedleaves").html(userBean.listDoc.aplLeaves);
	$("#salary").html(userBean.listDoc.ctc);
	$("#plvppercent").html(userBean.listDoc.plvp);
	plvpval = ((userBean.listDoc.plvp) / 100) * (userBean.listDoc.ctc);
	$("#plvpvalue").html(plvpval);
	monthlygross = Math.round(((userBean.listDoc.ctc) - (plvpval)) / 12);
	$("#monthlygross").html(monthlygross);
	$("#panno").html(userBean.panno);
	$("#password").val(userBean.up);
	$("#userType").val(userBean.ut);
	$("#status").val(userBean.st);
	$("#createdDate").val(userBean.cd);
	$("#grosssal").html(monthlygross);
	$("#lta").html(userBean.lta);
	$("#medical").val(userBean.med);
	$("#otherallowance").html(userBean.otha);
	$("#incentive").val(userBean.inct);
	$("#reimburse").val(userBean.reim);
	$("#grosssal").html(userBean.grosssal);
	$("#totaldeduct").html(userBean.totaldeduct);
	$("#conveyance").val(userBean.conv);
	$("#netpayable").html(userBean.netpay);
	
	//suraj code to display in netpayable
	$("#divNetPayable").html((userBean.netpay).toFixed(2));
	
	$("#houserent").html(userBean.hra);
	$("#basic").html(userBean.basic);
	$("#workingdayleaves").val(userBean.nofw);
	$("#leaves").val(userBean.Apdays);
	$("#deductleave").val(userBean.Apdays);
	$("#deptname").html(userBean.listDoc.depNm);
	$("#payablesal").html(userBean.paidsal);
	$("#tds").html(userBean.tds);
	$("#leavedeductions").html(userBean.leavededuct);
	$("#otherdeductions").html(userBean.netDeduct);
	$("#createddate").html(userBean.salcredate);
	var month = userBean.month;
	var year = userBean.year;
	var my = month + "-" + year;
	$("#month").html(my);
	var totaldeduction = 0;
	var otherdeduct = $("#otherdeductions").html();
	var professionaltax = $("#professionaltax").html();
	var tds = $("#tds").html();
	var PF = $("#PF").html();
	var leavedeductions = $("#leavedeductions").html();
	var leaves = userBean.Apdays;
	var workingdayleaves = userBean.nofw;
	var payabledays = workingdayleaves - leaves;
	$("#payabledays").html(payabledays);
	$("#allowedleaves").html(userBean.apl);

	/*
	 * totaldeduction = (parseFloat((otherdeduct)) +
	 * parseFloat((professionaltax)) + parseFloat((tds)) +
	 * parseFloat((leavedeductions))+ parseFloat((PF)));
	 */
	totaldeduction = userBean.totaldeduct;
	var others = userBean.netDeduct;
	totaldeduction = (parseFloat((totaldeduction)) + parseFloat((others)));
	$("#totaldeduct").html(totaldeduction);
	var total = 0;
	total = ((monthlygross) - (totaldeduction));
	var washing = $("#medical").html();
	total = total + washing;
	total = total + $("#netpayable").html(total);
	/*
	 * if (pageName == "AdminEmployeeForm") getHrDetails($("#empId").val());
	 */
	/*
	 * else if (pageName == "SetSalary") getSalaryDetails();
	 */
	/*
	 * else if(pageName == "MakeSalary") getSalaryDetails();
	 */

	calculateSalaryComponent();
}

function calculateGrossReimburse() {
	var total = 0;
	var total1 = 0;
	var reimburse = $("#reimburse").val();

	/*
	 * if($("#reimburse").is(":focus")) { reimburse=0; } else
	 * if($("#incentive").is(":focus")) { incentive=0; }
	 */
	if (reimburse != "") {
		total = (parseFloat(reimburse));
		var grosstotal = $("#grosssal").html();
		total1 = parseFloat(total) + parseFloat(grosstotal);
		$("#grosssal").html(total1.toFixed(2));
	}
	var grosstotal1 = $("#grosssal").html();
	var totaldeduct = $("#totaldeduct").html();
	var netpayable = (grosstotal1 - totaldeduct);
	$("#netpayable").html(netpayable);

}
function calculateGrossIncentive() {
	var total = 0;
	var total1 = 0;

	var incentive = $("#incentive").val();
	var reimburse = $("#reimburse").val();
	/*
	 * if($("#reimburse").is(":focus")) { reimburse=0; } else
	 * if($("#incentive").is(":focus")) { incentive=0; }
	 */
	if (incentive != "" && reimburse == 0) {
		total = (parseFloat(incentive));
		var grosstotal = $("#grosst").html();
		total1 = parseFloat(total) + parseFloat(grosstotal);
		$("#grosssal").html(total1.toFixed(2));
	} else if (reimburse != "" && incentive == 0) {
		total = (parseFloat(reimburse));
		var grosstotal = $("#grosst").html();
		total1 = parseFloat(total) + parseFloat(grosstotal);
		$("#grosssal").html(total1.toFixed(2));

	} else {
		total = (parseFloat(incentive)) + (parseFloat(reimburse));
		var grosstotal = $("#grosst").html();
		total1 = parseFloat(total) + parseFloat(grosstotal);
		$("#grosssal").html(total1.toFixed(2));

	}
	var grosstotal1 = $("#grosst").html();
	var totaldeduct = $("#totaldeduct").html();
	var netpayable = (grosstotal1 - totaldeduct);
	$("#netpayable").html(netpayable);

}
function calculateLeaveDeduction() {
	
	var ajaxResponce = $("#myObj").html();
	userBean = eval('(' + ajaxResponce + ')');
	var plvp = $("#plvppercent").html();
	var ctc = $("#salary").html();
	var plvpval = ((plvp) / 100) * (ctc);
	var monthlygross = Math.round(((ctc) - (plvpval)) / 12);
	var workingdays = $("#workingdayleaves").val();
	var deductedleave = $("#deductleave").val();
	if (($("#workingdayleaves").val()) == "0") {
		alert("Please enter number of working days first!!");
		var zero = 0.0;
		$("#leavedeductions").html(zero);
		return;
	}

	var leavededuction = Math
			.round(((monthlygross / workingdays) * deductedleave));
	$("#leavedeductions").html(leavededuction);
	var tds = $("#tds").html();
	var totaldeduction = 0;
	var otherdeduct = $("#otherdeductions").html();
	var professionaltax = $("#professionaltax").html();
	//var tds = $("#tds").html();
	var leavedeductions = $("#leavedeductions").html();
	var sdp=$("#sdp").html();
	var pf=$("#PF").html();
	
	totaldeduction = ((parseFloat((otherdeduct)) + parseFloat((professionaltax))
					+ parseFloat((tds)) + parseFloat((sdp))+ parseFloat((pf))+ parseFloat((leavedeductions))));
	$("#totaldeduct").html(totaldeduction.toFixed(2));
	var total = 0;
	total = (((monthlygross) - (totaldeduction)));
	$("#netpayable").html(total.toFixed(2));
}
function calculateOtherAllowance() {
	var total = 0;
	var medical = 0;
	var conveyance = 0;
	medical = $("#medical").val();
	if (medical == "" || medical == undefined)
		medical = 0;
	conveyance = $("#conveyance").val();
	if (conveyance == "" || conveyance == undefined)
		conveyance = 0;
	/*
	 * if (($("#medical").val()) == "0") { alert("Please enter medical");
	 * $("#otherallowance").html(0); return; }
	 *//*
		 * else if (($("#conveyance").val()) == ("0")) { alert("Please enter
		 * conveyance"); $("#medical").html(0); return; }
		 */
	// else
	if (($("#workingdayleaves").val()) == ("0")) {

		alert("Please enter working days");
		$("#otherallowance").html(0);
		$("#medical").val(0);
		return;
	}
	var otherallowance = 0;
	var basic = 0;
	var houserent = 0;
	var lta = 0;
	basic = $("#basic").html();
	houserent = $("#houserent").html();
	lta = $.trim($("#lta").html());

	if (lta == "" || lta == undefined)
		lta = 0;

	// alert(medical);
	// alert(conveyance);

	total = (parseFloat(basic) + parseFloat(houserent) + parseFloat(medical)
			+ parseFloat(conveyance) + parseFloat(lta));

	monthlygross = $("#monthlygross").html();
	var a = 0;
	if ((parseInt(total) > parseInt(monthlygross))
			&& parseInt(monthlygross) != 0 && (parseInt(total) != 0)) {
		alert("Please enter a lesser amount");
		$("#otherallowance").html(0);
		$("#medical").html(0);
		$("#otherallowance").html(0);
		return;
	}
	otherallowance = Math.round((monthlygross) - (total));
	// alert("otherallowance" + otherallowance);
	var total1 = (parseFloat(otherallowance) + parseFloat(total));
	if ((Math.round(parseFloat(total1)) != parseFloat(monthlygross))
			&& (parseFloat(monthlygross) != 0)) {
		$("#medical").val(0);
		$("#conveyance").val(0);
		alert("Please enter a lesser amount!!");
	}

	else
		$("#otherallowance").html(otherallowance);

}
/**
 * ******************************************End of employee salary
 * details**************************************************************************
 */
function saveHrSalaryComponent() {

	var txtBasic = $("#txtBasic").val();
	var txtHouseRent = $("#txtHouseRent").val();
	var txtLTA = $("#txtLTA").val();

	var txtwash = $("#txtwash").val();
	var txtPf = $("#txtPf").val();
	var txtLate = $("#txtLate").val();
	var txtsdp = $("#txtsdp").val();

	var hiddenSalaryComponentId = $("#hiddenSalaryComponentId").val();

	if (txtBasic == "") {
		alert("basic must be filled out");
		return false;
	} else if (txtHouseRent == "") {
		alert("house rent must be filled out");
		return false;
	} else if (txtLTA == "") {
		alert("LTA must be filled out");
		return false;
	} else if (txtwash == "") {
		alert("Washing Allowance must be filled out");
		return false;
	} else if (txtPf == "") {
		alert("PF must be filled out");
		return false;
	} else if (txtLate == "") {
		alert("Late Amount must be filled out");
		return false;
	} else if (txtsdp == "") {
		alert("Salary Deposite must be filled out");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveHrSalaryComponent');
	inputs.push('txtBasic=' + txtBasic);
	inputs.push('txtHouseRent=' + txtHouseRent);
	inputs.push('txtLTA=' + txtLTA);
	inputs.push('txtwash=' + txtwash);
	inputs.push('txtPf=' + txtPf);
	inputs.push('txtLate=' + txtLate);
	inputs.push('txtsdp=' + txtsdp);
	inputs.push('hiddenSalaryComponentId=' + hiddenSalaryComponentId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {

			alert(ajaxResponse);

		}
	});
}

function fetchHrSalaryComponent() {
	var inputs = [];
	inputs.push('action=fetchHrSalaryComponent');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {

			// alert(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');
			$("#txtBasic").val(pobj.basic);
			$("#txtHouseRent").val(pobj.hr);
			$("#txtLTA").val(pobj.lta);
			$("#hiddenSalaryComponentId").val(pobj.salCompId);
			$("#txtwash").val(pobj.wash);
			$("#txtPf").val(pobj.pf);
			$("#txtLate").val(pobj.late);
			$("#txtsdp").val(pobj.sdp);

		}
	});
}
/** Richa code for employee age calculation * */
function calculateEmployeeAge() {

	var dob = $("#dob").val();
	// alert(dob);
	if (dob != "") {
		var ddob = dob.split("-");

		var birth_year = ddob[0];
		// alert(birth_year);
		var birth_month = ddob[1];
		// alert(birth_month);
		var birth_day = ddob[2];
		// alert(birth_day);
		var today_date = new Date();
		var today_year = today_date.getFullYear();
		var today_month = today_date.getMonth();
		var today_day = today_date.getDate();
		var age = 0;
		today_month++;

		if (today_year > birth_year) {
			age = today_year - birth_year;

		} else if (today_year == birth_year) {

			if (today_month > birth_month) {

				age = today_month - birth_month;

			} else if (today_month == birth_month) {

				if (today_day > birth_day) {

					age = today_day - birth_day;

				} else if (today_day == birth_day) {
					age = 0;

				}
			}
		}
		$("#age").val(age);
	}
}
/** end of code for employee age calculation * */
/** Function to calculate TDS of employees * */
function calculateEmployeeTDS() {
	calculateEmployeeAge();
	var dateofbirth = $("#dob").val();
	// alert("dob" +dateofbirth);
	var employeeAge = $("#age").val();
	// alert("age" +employeeAge);r
	var employeeCTC = $("#salary").html();
	// alert("employeeCTC" +employeeCTC);
	var yearlyTDS = 0;
	var tdsApplicableAmount = 0;
	if (employeeAge < 60 && employeeCTC > 200000) {
		if (employeeCTC > 200000 && employeeCTC < 500000) {
			tdsApplicableAmount = employeeCTC - 200000;
			yearlyTDS = tdsApplicableAmount * 0.1;
		} else if (employeeCTC > 500000 && employeeCTC < 1000000) {
			tdsApplicableAmount = employeeCTC - 500000;
			yearlyTDS = 30000 + (tdsApplicableAmount * 0.2);
		} else if (employeeCTC > 1000000) {
			tdsApplicableAmount = employeeCTC - 1000000;
			yearlyTDS = 130000 + (tdsApplicableAmount * 0.3);
		}
	} else if (employeeAge > 60 && employeeAge < 80 && employeeCTC > 250000) {
		if (employeeCTC > 250000 && employeeCTC < 500000) {
			tdsApplicableAmount = employeeCTC - 250000;
			yearlyTDS = tdsApplicableAmount * 0.1;
		} else if (employeeCTC > 500000 && employeeCTC < 1000000) {
			tdsApplicableAmount = employeeCTC - 500000;
			yearlyTDS = 25000 + (tdsApplicableAmount * 0.2);
		} else if (employeeCTC > 1000000) {
			tdsApplicableAmount = employeeCTC - 1000000;
			yearlyTDS = 125000 + (tdsApplicableAmount * 0.3);
		}
	} else if (employeeAge > 80 && employeeCTC > 500000) {
		if (employeeCTC > 500000 && employeeCTC < 1000000) {
			tdsApplicableAmount = employeeCTC - 500000;
			yearlyTDS = (tdsApplicableAmount * 0.2);
		} else if (employeeCTC > 1000000) {
			tdsApplicableAmount = employeeCTC - 1000000;
			yearlyTDS = 100000 + (tdsApplicableAmount * 0.3);
		}
	}
	var monthlyTDS = Math.round(yearlyTDS / 12);
	// suraj code for toFixed
	
	$("#tds").html(monthlyTDS.toFixed(2));
}
/** start HR Salary Details* */

/** Richa code for employee previous salary details * */
// var ViewHRPrevSalaryDetailsTemp = "<div style='width: 98%; background-color:
// #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div
// style='width: 6%; border: 1px solid #FFF; color: #FFF; text-align:
// center;'>#</div><div style='width: 14%; border: 1px solid #FFF; color: #FFF;
// padding-left: 1%; padding-right: 1%; text-align: center;'>Salary
// Month/Year</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF;
// padding-left: 1%; padding-right: 1%; text-align: center;'>Payable
// Salary</div><div style='width: 20%; border: 1px solid #FFF; color: #FFF;
// padding-left: 1%; padding-right: 1%; text-align: center;'>View Salary
// Details</div></div></div><div style='width: 100%; border: 1px solid #436a9d;
// height: 100%; overflow-y: scroll;'>{#foreach $T.listSm as listSm}<div
// style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div
// style='width: 7%; height: 23px; text-align: center; border-right: 1px solid
// #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}' style='width:
// 15%; height:23px; border-right: 1px solid #069; padding-left: 1%;
// padding-top: 5px; text-align: center;'>{$T.listSm.ed}</div><div style='width:
// 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%;
// padding-top: 5px; text-align: center;'
// id='utype{count}'>{$T.listSm.paysal}</div><div style='width: 21%; height:
// 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input
// style='font-size: 10px;' type='button' value='VIEW PREVIOUS SALARY'
// id='btnEdit{count}' onclick='setHRSalaryView({$T.listSm.idsm})'
// /></div></div>{#/for}</div>";
var ViewHRPrevSalaryDetailsTemp = "{#foreach $T.listSm as listSm}<tr>	<td class='col-md-1-1'>{count++}.</td><td class='numeric col-md-4-1' id='divPi{count}' style='text-align: center';>{$T.listSm.ed}</td><td class='col-md-4-1' id='uname{count}' style='text-align: center';>{$T.listSm.paysal}</td><td class='numeric col-md-4-1' id='utype{count}' style='text-align: center';><input style='font-size: 10px;' type='button'			value='VIEW PREVIOUS SALARY' id='btnEdit{count}'onclick='setHRSalaryView({$T.listSm.componentid})' /></td></tr>{#/for}";
function splitEmployeeNameId() {

}

function fetchHRPrevSalaryDetails(user_id) {
	// splitEmployeeNameId();
	// var user_id = $("#empNameId").val();

	var empNameId = $("#empNameId").val();

	var arr = empNameId.split("_");
	// $("#empNameId").val(arr[0]);
	$("#uID").val(arr[1]);
	var user_id = arr[1];
	// var user_id = $("#uID").val();
	var month = $("#month").val();
	var year = $("#year").val();

	var inputs = [];
	inputs.push('user_id=' + empNameId);
	inputs.push('month=' + month);
	inputs.push('year=' + year);
	inputs.push('action=fetchHRPrevSalaryDetails');
	inputs.push();
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			$("#response").val(ajaxResponse);
			// alert(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');

			$("#userMangTemp").setTemplate(ViewHRPrevSalaryDetailsTemp);
			$("#userMangTemp").processTemplate(pobj);

		}
	});

}
function setHRSalaryView(value) {
	var ajaxResponse = $("#response").val();

	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.listSm.length; i++) {

		if (myArray.listSm[i].componentid == value) {

			myObj1 = myArray.listSm[i];
			userId = myArray.listSm[i].idsm;

			break;
		}
	}
	myObj = JSON.stringify(myObj1);

	window.location.href = "PreviousHRSalaryForm.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&userID=" + value;

}

/** end of employee previous salary calculation * */

/** Richa code for print of salary calculation * */
function printSalaryReceipt(type) {

	var today_date = new Date();
	var today_year = today_date.getFullYear();
	var today_month = (today_date.getMonth()) + 1;
	var today_day = today_date.getDate();
	var todaydate = today_year + "-" + today_month + "-" + today_day;
	var months = [ 'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December' ];
	if (type == "offer") {

		var WindowObject = window.open('', ' ', '');
		WindowObject.document.writeln('<html><body>');
		WindowObject.document
				.write('<html><head></head><body><div style="border: 1px solid black;">Company Name:<table width="100%" style="border: 1px solid black;" cellpadding="0" cellspacing="0">'
						+ '<thead><tr><th style="border-bottom: 1px solid black;">Month</th><th style="border-bottom: 1px solid black;">'
						+ $("#month").html()
						+ '</th><th style="border-bottom: 1px solid black;">Date</th>'
						+ '<th style="border-bottom: 1px solid black;">'
						+ $("#createddate").html()
						+ '</th></tr></thead>'
						+ '<tbody><tr><td>Employee No</td><td>'
						+ $("#empno").html()
						+ '</td><td>Pan No</td><td>'
						+ $("#panno").html()
						+ '</td></tr>'
						+ '<tr><td>Employee Name</td><td>'
						+ $("#fname").html()
						+ '</td><td>No Of Working Days</td>	<td>'
						+ $("#workingdayleaves").val()
						+ '</td></tr>'
						+ '<tr><td>Department</td><td>'
						+ $("#deptname").html()
						+ '</td><td>No Of Leaves Taken</td><td>'
						+ $("#leaves").val()
						+ '</td></tr>'
						+ '<tr><td>Designation</td><td>'
						+ $("#designation").html()
						+ '</td><td>No of Allowed leaves</td><td>'
						+ $("#allowedleaves").html()
						+ '</td></tr>'
						+ '<tr><td>Joining Date</td><td>'
						+ $("#joiningdate").html()
						+ '</td><td>No of Deducted Leaves</td><td>'
						+ $("#deductleave").val()
						+ '</td></tr>'
						+ '<tr><td>CTC</td><td>'
						+ $("#salary").html()
						+ '</td><td>Payable Days</td><td>'
						+ $("#payabledays").html()
						+ '</td></tr>'
						+ '<tr><td>PLVP Percentage</td><td>'
						+ $("#plvppercent").html()
						+ '</td><td>Monthly Gross</td><td>'
						+ $("#monthlygross").html()
						+ '</td></tr><td>PLVP Value</td><td>'
						+ $("#plvpvalue").html()
						+ '</td><td>Payable Salary</td><td>'
						+ $("#payablesal").html()
						+ '</td></tr>'
						+ '<tr><td>Basic</td><td>'
						+ $("#basic").html()
						+ '</td><td>TDS</td><td>'
						+ $("#tds").html()
						+ '</td></tr>'
						+ '<tr><td>Stipend</td><td>0</td><td>Profession Tax</td><td>'
						+ $("#professionaltax").html()
						+ '</td></tr>'
						+ '<tr><td>House Rent Allowance</td><td>'
						+ $("#houserent").html()
						+ '</td><td>PF</td><td>'
						+ $("#PF").html()
						+ '</td></tr><tr><td>Washing Allowance</td><td>'
						+ $("#medical").val()
						+ '</td><td>Other Deductions</td><td>'
						+ $("#otherdeductions").html()
						+ '</td></tr><tr><td>Conveyance Allowance</td><td>'
						+ $("#lta").html()
						+ '</td><td></td><td></td></tr>'
						+ '</td><td></td><td></td></tr>'
						+ '<tr><td>Other Allowance</td><td>'
						+ $("#otherallowance").html()
						+ '</td><td>Salary Advance</td><td>-</td></tr>'
						+ '<tr><td>Incentive/Commission</td><td>'
						+ $("#incentive").val()
						+ '</td><td>Salary Deposite</td><td>100</td></tr>'
						+ '<tr><td style="border-bottom: 1px solid black;">Reimbursement of Expenses</td><td style="border-bottom: 1px solid black;">'
						+ $("#reimburse").val()
						+ '</td><td style="border-bottom: 1px solid black;">-</td><td style="border-bottom: 1px solid black;">-</td></tr>'
						+ '<tr><td  style="border-bottom: 1px solid black;">Gross Salary</td><td  style="border-bottom: 1px solid black;">'
						+ $("#grosssal").html()
						+ '</td><td style="border-bottom: 1px solid black;">Total Deduction</td>'
						+ '<td  style="border-bottom: 1px solid black;">'
						+ $("#totaldeduct").html()
						+ '</td></tr>'
						+ '<tr><td>Net Payable</td><td >'
						+ $("#netpayable").html()
						+ '</td><td></td><td></td></tr></tbody></table></div><div style="text-align:left;"><br></br><br></br>Computer generated Pay Slip-No Signature Required</div></body></html>');

	} else if (type == "slip") {
		var ajaxResponce = $("#ajaxResponse").val();
		var month = $("#month").val();
		var year = $("#year").val();
		var slipmonh = month + " " + year;
		var txtDate = $("#txtDate").val();
		userBean = eval('(' + ajaxResponce + ')');
		var apl = userBean.listSm[0].apl;
		var absentDays = $("#absentDays").val();
		var dl = apl - absentDays;
		var yplvp = userBean.listSm[0].plvpval;
		var mplvp = yplvp / 12;
		var totaldeduction = parseInt(userBean.listSm[0].tds)
				+ parseInt(userBean.listSm[0].PF) + parseInt(300)
				+ parseInt($("#monSecDed").val());
		var WindowObject = window.open('', ' ', '');
		WindowObject.document.writeln('<html><body>');
		WindowObject.document
				.write('<html><head></head><body><div style="border: 1px solid black;">Company Name:<table width="100%" style="border: 1px solid black;" cellpadding="0" cellspacing="0">'
						+ '<thead><tr><th style="border-bottom: 1px solid black;">Month</th><th style="border-bottom: 1px solid black;">'
						+ slipmonh
						+ '</th><th style="border-bottom: 1px solid black;">Date</th>'
						+ '<th style="border-bottom: 1px solid black;">'
						+ txtDate
						+ '</th></tr></thead>'
						+ '<tbody><tr><td>Employee No</td><td>'
						+ $("#userID").val()
						+ '</td><td>Pan No</td><td>'
						+ userBean.listSm[0].panno
						+ '</td></tr>'
						+ '<tr><td>Employee Name</td><td>'
						+ userBean.listSm[0].fn
						+ '</td><td>No Of Working Days</td>	<td>'
						+ $("#totalDays").val()
						+ '</td></tr>'
						+ '<tr><td>Department</td><td>'
						+ userBean.listSm[0].deptname
						+ '</td><td>No Of Leaves Taken</td><td>'
						+ $("#absentDays").val()
						+ '</td></tr>'
						+ '<tr><td>Designation</td><td>'
						+ userBean.listSm[0].ut
						+ '</td><td>No of Allowed leaves</td><td>'
						+ userBean.listSm[0].apl
						+ '</td></tr>'
						+ '<tr><td>Joining Date</td><td>'
						+ userBean.listSm[0].doj
						+ '</td><td>No of Deducted Leaves</td><td>'
						+ $("#absentDays").val()
						+ '</td></tr>'
						+ '<tr><td>CTC</td><td>'
						+ userBean.listSm[0].ctc
						+ '</td><td>Payable Days</td><td>'
						+ $("#presentDays").html()
						+ $("#paidDays").html()
						+ '</td></tr>'
						+ '<tr><td>PLVP Percentage</td><td>'
						+ userBean.listSm[0].plvpPer
						+ '</td><td>Monthly Gross</td><td>'
						+ userBean.listSm[0].mg
						+ '</td></tr><td>PLVP Value</td><td>'
						+ mplvp
						+ '</td><td>Payable Salary</td><td>'
						+ $("#paySal").val()
						+ '</td></tr>'
						+ '<tr><td>Basic</td><td>'
						+ userBean.listSm[0].bs
						+ '</td><td>TDS</td><td>'
						+ userBean.listSm[0].tds
						+ '</td></tr>'
						+ '<tr><td>Stipend</td><td>0</td><td>Profession Tax</td><td>'
						// + userBean.listSm[0].professtax
						+ 200
						+ '</td></tr>'
						+ '<tr><td>House Rent Allowance</td><td>'
						+ userBean.listSm[0].hra
						+ '</td><td>PF</td><td>'
						+ userBean.listSm[0].PF
						+ '</td></tr><tr><td>Washing Allowance</td><td>'
						+ userBean.listSm[0].med

						+ '</tr><tr><td>Conveyance Allowance</td><td>'
						+ userBean.listSm[0].lta
						+ '<td>Other Deduction</td><td>'
						+ $("#monSecDed").val()
						+ '</td><tr><td>Other Allowance</td><td>'
						+ userBean.listSm[0].otha
						+ '</td><td>Salary Advance</td><td>-</td></tr>'
						+ '<tr><td>Incentive/Commission</td><td>'
						+ userBean.listSm[0].inct
						+ '</td><td>Salary Deposite</td><td>100</td></tr>'
						+ '<tr><td style="border-bottom: 1px solid black;">Reimbursement of Expenses</td><td style="border-bottom: 1px solid black;">'
						+ userBean.listSm[0].reim
						+ '</td><td style="border-bottom: 1px solid black;">-</td><td style="border-bottom: 1px solid black;">-</td></tr>'
						+ '<tr><td  style="border-bottom: 1px solid black;">Gross Salary</td><td  style="border-bottom: 1px solid black;">'
						+ userBean.listSm[0].mg
						+ '</td><td style="border-bottom: 1px solid black;">Total Deduction</td>'
						+ '<td  style="border-bottom: 1px solid black;">'
						+ totaldeduction
						+ '</td></tr>'
						+ '<tr><td>Net Payable</td><td >'
						+ $("#paySal").val()
						+ '</td><td></td><td></td></tr></tbody></table></div><div style="text-align:left;"><br></br><br></br>Computer generated Pay Slip-No Signature Required</div></body></html>');
	} else {

		var WindowObject = window.open('', ' ', '');
		WindowObject.document.writeln('<html><body>');
		WindowObject.document
				.write('<html><head></head><body><div style="border: 1px solid black;">Company Name:<table width="100%" style="border: 1px solid black;" cellpadding="0" cellspacing="0">'
						+ '<thead><tr><th style="border-bottom: 1px solid black;">Month</th><th style="border-bottom: 1px solid black;">'
						+ $("#month").html()
						+ '</th><th style="border-bottom: 1px solid black;">Date</th>'
						+ '<th style="border-bottom: 1px solid black;">'
						+ $("#createddate").html()
						+ '</th></tr></thead>'
						+ '<tbody><tr><td>Employee No</td><td>'
						+ $("#empno").html()
						+ '</td><td>Pan No</td><td>'
						+ $("#panno").html()
						+ '</td></tr>'
						+ '<tr><td>Employee Name</td><td>'
						+ $("#fname").html()
						+ '</td><td>No Of Working Days</td>	<td>'
						+ $("#workingdayleaves").val()
						+ '</td></tr>'
						+ '<tr><td>Department</td><td>'
						+ $("#deptname").html()
						+ '</td><td>No Of Leaves Taken</td><td>'
						+ $("#leaves").val()
						+ '</td></tr>'
						+ '<tr><td>Designation</td><td>'
						+ $("#designation").html()
						+ '</td><td>No of Allowed leaves</td><td>'
						+ $("#allowedleaves").html()
						+ '</td></tr>'
						+ '<tr><td>Joining Date</td><td>'
						+ $("#joiningdate").html()
						+ '</td><td>No of Deducted Leaves</td><td>'
						+ $("#deductleave").val()
						+ '</td></tr>'
						+ '<tr><td>CTC</td><td>'
						+ $("#salary").html()
						+ '</td><td>Payable Days</td><td>'
						+ $("#payabledays").html()
						+ '</td></tr>'
						+ '<tr><td>PLVP Percentage</td><td>'
						+ $("#plvppercent").html()
						+ '</td><td>Monthly Gross</td><td>'
						+ $("#monthlygross").html()
						+ '</td></tr><td>PLVP Value</td><td>'
						+ $("#plvpvalue").html()
						+ '</td><td>Payable Salary</td><td>'
						+ $("#payablesal").html()
						+ '</td></tr>'
						+ '<tr><td>Basic</td><td>'
						+ $("#basic").html()
						+ '</td><td>TDS</td><td>'
						+ $("#tds").html()
						+ '</td></tr>'
						+ '<tr><td>Stipend</td><td>0</td><td>Profession Tax</td><td>'
						+ $("#professionaltax").html()
						+ '</td></tr>'
						+ '<tr><td>House Rent Allowance</td><td>'
						+ $("#houserent").html()
						+ '</td><td>PF</td><td>'
						+ $("#PF").html()
						+ '</td></tr><tr><td>Washing Allowance</td><td>'
						+ $("#medical").val()
						+ '</td><td>Other Deductions</td><td>'
						+ $("#otherdeductions").html()
						+ '</td></tr><tr><td>Conveyance Allowance</td><td>'
						+ $("#lta").html()
						+ '</td><td></td><td></td></tr>'
						+ '</td><td></td><td></td></tr>'
						+ '<tr><td>Other Allowance</td><td>'
						+ $("#otherallowance").html()
						+ '</td><td>Salary Advance</td><td>-</td></tr>'
						+ '<tr><td>Incentive/Commission</td><td>'
						+ $("#incentive").val()
						+ '</td><td>Salary Deposite</td><td>100</td></tr>'
						+ '<tr><td style="border-bottom: 1px solid black;">Reimbursement of Expenses</td><td style="border-bottom: 1px solid black;">'
						+ $("#reimburse").val()
						+ '</td><td style="border-bottom: 1px solid black;">-</td><td style="border-bottom: 1px solid black;">-</td></tr>'
						+ '<tr><td  style="border-bottom: 1px solid black;">Gross Salary</td><td  style="border-bottom: 1px solid black;">'
						+ $("#grosssal").html()
						+ '</td><td style="border-bottom: 1px solid black;">Total Deduction</td>'
						+ '<td  style="border-bottom: 1px solid black;">'
						+ $("#totaldeduct").html()
						+ '</td></tr>'
						+ '<tr><td>Net Payable</td><td >'
						+ $("#netpayable").html()
						+ '</td><td></td><td></td></tr></tbody></table></div><div style="text-align:left;"><br></br><br></br>Computer generated Pay Slip-No Signature Required</div></body></html>');

	}
	WindowObject.document.writeln('</body></html>');
	WindowObject.document.close();
	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

}

/** end of code for print of salary calculation * */

function days_between(date1, date2) {
	// The number of milliseconds in one day
	var ONE_DAY = 1000 * 60 * 60 * 24;
	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();
	// Calculate the difference in milliseconds
	var difference_ms = Math.abs(date1_ms - date2_ms);
	// Convert back to days and return
	return Math.round(difference_ms / ONE_DAY);
}
$(document).ready(function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');
	} catch (e) {
	}

	try {
		$.unblockUI();
	} catch (e) {
	}
	if (window.initLogOut)
		initLogOut();
});
function validateDateOnlyHR(fieldId) {
	var id = fieldId.id;
	var idate = $("#" + id).val();
	var temp = (idate).split("-");

	var currentDate = temp[2] + "-" + temp[1] + "-" + temp[0];

	dateReg = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
	if (dateReg.test(currentDate) || currentDate == "undefined-undefined-") {
	} else {
		alert("Please Enter Valid Date in yyyy-mm-dd format");
		$("#" + id).val("");
	}
}
function calculaeDays() {

	var totalDays = $("#totalDays").val();
	var presentDays = $("#presentDays").val();
	if (presentDays > totalDays) {
		alert("present days value can not be greater than total days");
		$("#presentDays").val("");
		$("#absentDays").val(" ");
		return false;
	}
	var absentDays = totalDays - presentDays;
	$("#absentDays").val(absentDays);

}
function calculaeabsentDays() {
	var totalDays = $("#totalDays").val();
	var absentDays = $("#absentDays").val(absentDays);
	if ($("#presentDays").val() == "" || $("#presentDays").val() == undefined) {
		alert("Please enter Present Days value first");
		return false;
	}
	if (absentDays == null || absentDays == undefined) {
		absentDays = 0;
	}
	var presentDays = totalDays - absentDays;
	$("#presentDays").val(presentDays);
}
function calculatelatededuction() {
	var presentDays = $("#presentDays").val();
	if (presentDays == "" || presentDays == undefined) {
		$("#latemin").val("");
		alert("Please Enter Present Days");
		return false;

	}
	var ajaxResponse = $("#ajaxResponse").val();
	pobj1 = eval('(' + ajaxResponse + ')');
	var absentDays = $("#absentDays").val();
	var paidDays = $("#paidDays").val();
	if (paidDays == "") {
		paidDays = 0;
	}
	var unpaidDays = $("#unpaidDays").val();
	if (unpaidDays == "") {
		unpaidDays = 0;
	}

	var netdays = absentDays - paidDays;
	var totalDays = $("#totalDays").val();
	var med = pobj1.listSm[0].med;
	var lta = pobj1.listSm[0].lta;
	
	$("#txtSalaryComp").val(pobj1.listSm[0].idsm);
	var paysal = pobj1.listSm[0].paysal;
	var a = parseFloat(med);
	var b = parseFloat(totalDays);
	var c = parseFloat(netdays);
	var netmed = (a / b) * (c);
	// alert(netmed);
	var netlta = (lta / totalDays) * netdays;

	var masterresponce = $("#masterresponce").val();
	masterresponce = eval('(' + masterresponce + ')');
	var late = masterresponce.late;
	var late_min = $("#latemin").val();
	late_deduction = late * late_min;
	var netdeduc = netmed + netlta + late_deduction;
	var netpaysal = paysal - netdeduc;
	// var netsal = netpaysal - late_deduction;
	// $("#paySal").val(netsal);
	$("#monSecDed").val(netdeduc);
	$("#paySal").val(netpaysal);

}
function editable1() {
	if ((document.getElementById("checkbox1").checked == false)) {
		$("#paidDays").removeAttr('readonly', 'readonly');
	} else if ((document.getElementById("checkbox1").checked == true)) {
		$("#paidDays").attr('readonly', 'true');
	}
}
function editable2() {
	if ((document.getElementById("checkbox2").checked == false)) {
		$("#unpaidDays").removeAttr('readonly', 'readonly');
	} else if ((document.getElementById("checkbox2").checked == true)) {
		$("#unpaidDays").attr('readonly', 'true');
	} else {

	}
}
function checkabsentdays() {
	var absentDays = $("#absentDays").val();
	var presentDays = $("#presentDays").val();
	if (presentDays == "" || presentDays == undefined) {

		alert("Please enter Present Days");
		return false;
	}
	if (absentDays == 0) {
		if ((document.getElementById("checkbox1").checked == false)) {
			var paidDays = $("#paidDays").val();
			// alert(paidDays);
			if (paidDays != 0) {
				$("#paidDays").val("");
				alert("Please enter paid Days  zero as absent days are zero");
			}
		}
	}
}
function checkabsentdays2() {
	var absentDays = $("#absentDays").val();
	var presentDays = $("#presentDays").val();
	if (presentDays == "" || presentDays == undefined) {

		alert("Please enter Present Days");
		return false;
	}
	if (absentDays == 0) {
		if ((document.getElementById("checkbox2").checked == false)) {
			var unpaidDays = $("#unpaidDays").val();
			// alert(paidDays);
			if (unpaidDays != 0) {
				$("#unpaidDays").val("");
				alert("Please enter unpaid Days  zero as absent days are zero");
			}
		}
	}
}
function checkTotalDays() {
	if ($("#totalDays").val() > 31) {
		$("#totalDays").val("");
		alert("Please Enter Valid Total Days");

	}
}

//start:date picker on pop up
function calenderDisplay(id)
{
new JsDatePick({
	useMode : 2,
	target : id,
	yearsRange : [ 1920, 2099 ],
	limitToToday : false,
	/* cellColorScheme:"beige", */
	dateFormat : "%d/%m/%Y",
	imgPath : "../img/",
	weekStartDay : 1,
});
// end:date picker on pop up 


}

function saveTDSMaster() {

	jQuery.ajax({
		async : false,
		type : "POST",
		data:{
			txtSlabName:$("#txtSlabName").val(),
			txtSlabMinValue:$("#txtSlabMinValue").val(),
			txtSlabMaxValue:$("#txtSlabMaxValue").val(),
			txtSlabPercnt:$("#txtSlabPercnt").val(),
			txtSlabUserAge:$("#txtSlabUserAge").val(),
		},
		url : "SaveTDSMaster",
		
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			alertify.success("TDS Slab Save Successfully");
			$(".form-horizontal").find("input").val('');
			getTDSMasters();
			$("#txtSlabName").focus();
		}
	});

}

function getTDSMasters() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "pharmacy/common/getTDSSlabMaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var parseData=jQuery.parseJSON(r);
			setTDSSlabData(parseData.result);
		}
	});

}

function setTDSSlabData(result)
{
	
	var divContent="";
	
	for(var i=0;i<result.length;i++)
	{
		divContent=divContent+"<tr><td>"+(i+1)+"</td> <td>"+result[i].tds_slab_name+"</td> <td>"+result[i].tds_slab_min_value+"</td> <td>"+result[i].tds_slab_max_value+"</td> <td>"+result[i].tds_slab_percnt+"</td> <td>"+result[i].tds_slab_age+"</td></tr>";
	}
	
	$("#tableTdsSlabList").html(divContent);
}
//Author:Tushar, @14Mar2017

function savePharmaPrintMaster() {
	
	var selUserModule = $("#selUserModule").val();
	if(selUserModule == 0 || selUserModule == null){
		alert("Please Select Module Name...");
		$("#selUserModule").focus();
		return false;
	}
	jQuery.ajax({
		async : false,
		type : "POST",
		data:{
			txtPrintId:$("#txtPrintId").val(),
			txtBillName:$("#txtBillName").val(),
			txtDrugLicNo:$("#txtDrugLicNo").val(),
			txtFoodLicNo:$("#txtFoodLicNo").val(),
			txtVatTinNo:$("#txtVatTinNo").val(),
			selUserModule:$("#selUserModule").val(),
		},
		url : "pharmacy/common/savePharmaPrintMaster",
		
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var parseData=jQuery.parseJSON(r);
			if(parseData == "1"){
				alertify.success("Pharma Print Save Successfully");	
			}else if(parseData == "2"){
				alertify.success("Pharma Print Update Successfully");
			}else if(parseData == "0" || parseData == ""){
				alertify.success("Module Name Already Present in List");
			}
			$(".form-horizontal").find("input").val('');
			getPharmaPrintMasters();
			$("#txtPrintId").val("");
			$("#txtDrugLicNo").val("");
			$("#txtFoodLicNo").val("");
			$("#txtVatTinNo").val("");
			$("#selUserModule").val("");
			$("#txtBillName").focus();
		}
	});

}

function getPharmaPrintMasters() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "pharmacy/common/getPharmaPrintMasters",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var parseData=jQuery.parseJSON(r);
			setPharmaPrintData(parseData.result);
		}
	});

}

function setPharmaPrintData(result)
{
	var divContent="";
	
	for(var i=0;i<result.length;i++)
	{
		divContent=divContent+"<tr><td>"+(i+1)+"</td> <td class='col-md-2-1' style='width: 20%'>"+result[i].billName+"</td> <input type='hidden' id='billName"+result[i].idehat_pharma_print_master+"' value='"+result[i].billName+"'>"
				+ "<td class='col-md-2-1' style='width: 20%'>"+result[i].drugLicenseNo+"</td><input type='hidden' id='drugLicenseNo"+result[i].idehat_pharma_print_master+"' value='"+result[i].drugLicenseNo+"'> "
				+ "<td class='col-md-2-1' style='width: 20%'>"+result[i].foodLicenseNo+"</td><input type='hidden' id='foodLicenseNo"+result[i].idehat_pharma_print_master+"' value='"+result[i].foodLicenseNo+"'>"
				+ "<td class='col-md-2-1' style='width: 20%'>"+result[i].vatTinNo+"</td><input type='hidden' id='vatTinNo"+result[i].idehat_pharma_print_master+"' value='"+result[i].vatTinNo+"'>"
				+ "<td class='col-md-2-1' style='width: 20%'>"+result[i].moduleName+"</td><input type='hidden' id='userModule"+result[i].idehat_pharma_print_master+"' value='"+result[i].moduleId+"'>"
				+ "<td class='col-md-1-1'><button id='btnEdit"
				+ result[i].idehat_pharma_print_master + "' class='btn btn-xs btn-success' onclick='editPharmaPrint("
				+ result[i].idehat_pharma_print_master + ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td>"
				+ "<td class='col-md-1-1'><button id='btnDelete' class='btn btn-xs btn-success' onclick='deletePharmaPrint("
				+ result[i].idehat_pharma_print_master + ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td></tr>";
	}
	$("#tablePrintMasterList").html(divContent);
	$("#txtPrintId").val("");
	$("#txtBillName").focus();
	$('#selUserModule').removeAttr('disabled');
}

function editPharmaPrint(printId) {
	$('#txtPrintId').val(printId);
		$('#txtBillName').val($('#billName' + printId).val());
		$('#txtDrugLicNo').val($('#drugLicenseNo' + printId).val());
		$('#txtFoodLicNo').val($('#foodLicenseNo' + printId).val());
		$('#txtVatTinNo').val($('#vatTinNo' + printId).val());
		$('#selUserModule').attr('disabled', 'disabled');
		$('#selUserModule').val($('#userModule' + printId).val());
}

function deletePharmaPrint(printId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		alertify.success("Record deleted successfully");

		var inputs = [];
		inputs.push('printId=' + printId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "pharmacy/common/deletePharmaPrint",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						if (r == true) {
							/*$('#msgDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						getPharmaPrintMasters();
						//window.location.href = "ehat_pharma_print_master.jsp";
					}
				});

		return true;
	} else {

	}
}

