var remVals = [];
var QueryString = "insert";
var rowCount = 1;
var count = 1;
var sr = 1;
var sr1 = 1;
var ilSize;
var i = 1;
var i1 = 0;
var mm = 1;
var response111;
var ajaxResponse = "";
var pathalogyHeadingTemplate = "<div class='divide-10'></div><div class='divide-20'></div> <label class='TextFont col-md-9-1'>Select Heading <b style='color: red; padding-left: 5%'>*</b> </label> <select id='selHeading'  onchange='loadPathalogyTestsHeadingWiseForTPA("
		+ '"'
		+ "onload"
		+ '"'
		+ ")' class='form-control input-SmallText TextFont'> <option value='select'>SELECT</option> {#foreach $T.lbHedLi as lbHedLi} <option value='{$T.lbHedLi.idHed}'>{$T.lbHedLi.hcod} - {$T.lbHedLi.hedNm}</option> {#/for} </select>";

var divTestTemp =  "<div id='divTest' >"
	+ "<div class='divide-20'></div>"
	+ "<div class='col-md-11-1' style='margin-left:2%;'>"
	+ "<div style='font-weight: bold;' class='col-md-1-1'>Search By:</div>"
	+ "<div style='font-weight: bold;' class='col-md-1-1'>Service Name</div>"
	+ "<div class='form-group col-md-2-1'>"
	+ "<input class='form-group' name='txtBxTestName' type='text' id='txtBxTestName' />"
	+ "</div>"
	+ "<div class='form-group col-md-2-1'>"
	+ "<input type='button' value='Search' class='edit' id='btnSearch' onclick='setDiscountResTempHallwise("+'"'+"searchTest"+'"'+")' />"
	+ "</div>"
	+ "</div>"
	+ "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: -10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th style='height: 21.5px; width: 52px;'><label class='TextFont'>#</label></th>"
	+ "<th style='height: 21.5px; width: 410px;'><label class='TextFont'>Service Name</label></th>"
	+ "<th style='height: 21.5px; width: 320px;'><label class='TextFont'>Sponsored Service Charges</label></th>"
	+ "<th style='height: 21.5px; width: 320px;'><label class='TextFont'>Patient Service Charges</label></th>"
	+ "</tr>"
	+ "</thead>"
	+ "</table>"
	
	+ "</div>"
	+ "<div class='col-sm-12-1' id='pathologyTestSearch' style='margin-top: -22px; border: 1px solid #b8b8b8; overflow-y: scroll; height: 345px; max-height: auto;'>"
	+ "<table class='table table-bordered table-striped table-condensed cf'>"
	+"<div id='wait' style='display: none; width: 69px; height: 89px; border: 0px solid black; position: absolute; top: 50%; left: 43%; padding: 2px;'> "
	+ "<img src='css/images/wait1.gif' width='64' height='64' /></div>"
	
	+ "<tbody>"
	+ "{#foreach $T.testList as tl}"
	+ "<tr>"
	+ "<td style='height: 21.5px; width: 50px;'>{count}.</td>"
	+ "<td style='height: 21.5px; width: 407px;' id='divPi{count}'>{$T.tl.tname}</td>"
	+ "<td style='height: 21.5px; width: 323px;'><input style='text-align: right;' type='text' id='tCharge{count}' class='form-control input-SmallText margin-1' name='tCharge' "
	+ "value='{$T.tl.pay}' onkeypress='return validatePrice(event)' /></td>"
	+ "<td style='height: 21.5px;  width: 281px;'><input style='text-align: right;' type='text' id='ptCharge{count}' class='form-control input-SmallText margin-1' name='ptCharge' "
	+ "value='{$T.tl.testPatientCharges}' onkeypress='return validatePrice(event)' /></td>"
	+ "<td style='height: 21.5px;'>{#if $T.tl.testChargesApplicableFlag=='Y'} <input type='checkbox' "
	+ "id='chargesApplicableFlag{count++}' name='chargesApplicableFlag' checked='checked' "
	+ "value='{$T.tl.testChargesApplicableFlag}' style='width: 40%;' /> {#else} <input type='checkbox' "
	+ "id='chargesApplicableFlag{count++}' value='{$T.tl.testChargesApplicableFlag}' "
	+ "name='chargesApplicableFlag' style='width: 40%;' /> {#/if} </td>"
	+ "</tr> {#/for} "
	+ "<input type='hidden' id='txtRowCount' value='{count}' />"
	+ "</tbody>" + "</table>" + "</div>"
	+ "<div style='display: none;' id='divAjaxRepo'></div>" + "</div>";


function setDiscountResTempHallwise(type) {

	var queryType = $("#queryTypeMain").val();
	if (queryType == "insert") {

		var selDisRefType = $("#selDisRefType").val();

		if (selDisRefType == "operation") {
			count = 1;
			var opObject = $("#divForOpObj").html();

			opObject = eval('(' + opObject + ')');
			$("#divInside").setTemplate(divInside1Temp);
			$("#divInside").processTemplate(opObject);

		} else if (selDisRefType == "Radiology"
				|| selDisRefType == "Cardiology") {
			count = 1;

			var inputs = [];
			inputs.push('action=fetchTest');
			inputs.push('testType=' + encodeURIComponent(selDisRefType));
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
					$("#testDetails").html(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					$("#divInside").setTemplate(divTestTemp);
					$("#divInside").processTemplate(pobj1);
					$("#divForTestObj").html(ajaxResponse);
				}
			});

		} else if (selDisRefType == "fees") {
			$("#divInside").hide();
			count = 1;
			var inputs = [];
			inputs.push('action=fetchDoctorSpeciality');
			inputs.push('corporateAcId=' + $("#sid").val());
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
				success : function(ajaxResponse) {

					feeBean = eval('(' + ajaxResponse + ')');
					// alert(feeBean.liDocSpl[0].wdCon);
					$("#divInside").setTemplate(divFeeTemp);
					$("#divInside").processTemplate(feeBean);
					$("#wdSSCons").val(feeBean.liDocSpl[0].wdCon);
					$("#wdSCons").val(feeBean.liDocSpl[1].wdCon);
					$("#wdSSFollowup").val(feeBean.liDocSpl[0].wdFl);
					$("#wdSFollowup").val(feeBean.liDocSpl[1].wdFl);
					$("#weSSCons").val(feeBean.liDocSpl[0].weCon);
					$("#weSCons").val(feeBean.liDocSpl[1].weCon);
					$("#weSSFollowup").val(feeBean.liDocSpl[0].weFl);
					$("#weSFollowup").val(feeBean.liDocSpl[1].weFl);
					$("#divForFeesObj").html(ajaxResponse);
					$("#divInside").show();
				}
			});

		}
	} else if (queryType == "update") {
	
		$("#divPathologyHeadings").hide();
		var selDisRefType = $("#selDisRefType").val();
		if (selDisRefType == "select") {
			$("#divInside").html("");
			return false;
		}
		if (selDisRefType == "operation") {
			$("#InvTestChrgsTable").css("display", "none");
			$("#divInside").setTemplate($("#divOperationAc").html());
			$("#divInside").processTemplate();
			getHallTypeGrpWisProCharge();

		} else if (selDisRefType == "hallwisipd") {
			
			$("#divInside").setTemplate($("#divHallIPDCharges").html());
			$("#divInside").processTemplate();
			defaultViewHallType();
			

			
		} else if (selDisRefType == "dental"
				|| selDisRefType == "casuality" || selDisRefType == "Radiology") {

			var txtBxTestName = $("#txtBxTestName").val();

			if (txtBxTestName == "") {
				alert("Please Enter Service Name For Search.");
			} else {
				count = 1;
				var inputs = [];
				inputs.push('action=loadTestForUpdate');
				inputs.push('type=' + type);
				inputs.push('txtBxTestName=' + txtBxTestName);
				inputs.push('sp_dic_master_id=' + $("#sid").val());
				inputs.push('testType=' + encodeURIComponent(selDisRefType));
				var str = inputs.join('&');

				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "TreatmentServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(ajaxResponse) {
						TestBean = eval('(' + ajaxResponse + ')');

						$("#divForTestObj").html(ajaxResponse);

						$("#divInside").setTemplate(divTestTemp);
						$("#divInside").processTemplate(TestBean);
					}
				});
			}
		} else if (selDisRefType == "pathology") {
			$("#divInside").html("");
			if (type == "searchTest") {
				$("#divPathologyHeadings").show();
				loadPathalogyTestsHeadingWise('searchTest');
			} else {
				$("#divInside").html('');
				$("#divPathologyHeadings").show();
				var inputs = [];
				inputs.push('action=getGroups');
				inputs.push('strValue=null');
				inputs.push('type=onload');
				inputs.push('heading_id=0');
				var str = inputs.join('&');

				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PathologyServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						ajaxResponse = r;
						count = 1;
						// alert(ajaxResponse);
						pobj1 = eval('(' + ajaxResponse + ')');
						// divPathologyHeadings
						$("#divPathologyHeadings").setTemplate(
								pathalogyHeadingTemplate);
						$("#divPathologyHeadings").processTemplate(pobj1);
						$("#divInside").show();
						$("#divInside").html("");
						$("#divInside")
								.append(
										'<div class="divide-20"></div><div class="col-md-12-1" id = "searchDiv"><div style="" class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Search	By:</label></div><div class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%;">Test Name:</label></div><div style="" class="col-md-2-1 TextFont" id="divbyName"><input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText" /></div><div class="col-md-1-1" style="text-align: center;"><input type="button" value="search"	class="btn btn-xs btn-primary" id="searchTest" onclick="loadPathalogyTestsHeadingWiseForTPA('
												+ "'"
												+ 'search'
												+ "'"
												+ ')" /></div></div><div class="divide-20"></div>');
					}

				});
			}
		} else if (selDisRefType == "fees") {
			count = 1;
			var inputs = [];
			inputs.push('action=fetchDoctorSpeciality');
			inputs.push('corporateAcId=' + $("#sid").val());
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
				success : function(ajaxResponse) {
					// alert(ajaxResponse);
					feeBean = eval('(' + ajaxResponse + ')');
					$("#divInside").setTemplate(divFeeTemp);
					$("#divInside").processTemplate(feeBean);
					// $("#wdSSCons").val(feeBean.liDocSpl[0].wdCon);
					// $("#wdSCons").val(feeBean.liDocSpl[1].wdCon);
					// $("#wdSSFollowup").val(feeBean.liDocSpl[0].wdFl);
					// $("#wdSFollowup").val(feeBean.liDocSpl[1].wdFl);
					// $("#weSSCons").val(feeBean.liDocSpl[0].weCon);
					// $("#weSCons").val(feeBean.liDocSpl[1].weCon);
					// $("#weSSFollowup").val(feeBean.liDocSpl[0].weFl);
					// $("#weSFollowup").val(feeBean.liDocSpl[1].weFl);
					$("#divForFeesObj").html(ajaxResponse);
					$("#divForFeesObj").html(ajaxResponse);
				}
			});
			// var sampleBean;
			// $("#SaveButtonContent").setTemplate(saveButtonTemp);
			// $("#SaveButtonContent").processTemplate(sampleBean);

		} else if (selDisRefType == "hosacc") {
			$("#divInside").setTemplate($("#divHospitalAcc").html());
			$("#divInside").processTemplate();
			fetchHospitalDetails();
			setTimeout(function() {
				fetchHospitalAccDetails();
			}, 500);
		} else if (selDisRefType == "bedcharges") {
			fetchBedCharges("acc");
		} else if (selDisRefType == "Cardiology") {
			$("#divInside").html("");
			$("#divInside")
					.append(
							'<div class="divide-20"></div><div class="col-md-12-1" id = "searchDiv"><div style="" class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Search	By:</label></div><div class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%;">Test Name:</label></div><div style="" class="col-md-2-1 TextFont" id="divbyName"><input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText" /></div><div class="col-md-1-1" style="text-align: center;"><input type="button" value="search"	class="btn btn-xs btn-primary" id="searchTest" onclick="fetchInvTestHallWiseCharges('
									+ "'"
									+ 'search'
									+ "'"
									+ ')" /></div></div><div class="divide-20"></div>');

			fetchInvTestHallWiseCharges("onload");
		} else if (selDisRefType == "ipdserv") {
			$("#divInside").html("");
			$("#divInside")
					.append(
							'<div class="divide-20"></div><div class="col-md-12-1" id = "searchDiv"><div style="" class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Search	By:</label></div><div class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%;">Service Name:</label></div><div style="" class="col-md-2-1 TextFont" id="divbyName"><input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText" /></div><div class="col-md-1-1" style="text-align: center;"><input type="button" value="search"	class="btn btn-xs btn-primary" id="searchTest" onclick="fetchIPDServicesHallWiseCharges('
									+ "'"
									+ 'search'
									+ "'"
									+ ')" /></div></div><div class="divide-20"></div>');

			fetchIPDServicesHallWiseCharges("onload");

		} else if (selDisRefType == "pathologyPkg") {
			$("#divInside").html("");
			$("#divInside")
					.append(
							'<div class="divide-20"></div><div class="col-md-12-1" id = "searchDiv"><div style="" class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Search	By:</label></div><div class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%;">Package Name:</label></div><div style="" class="col-md-2-1 TextFont" id="divbyName"><input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText" /></div><div class="col-md-1-1" style="text-align: center;"><input type="button" value="search"	class="btn btn-xs btn-primary" id="searchTest" onclick="fetchLabPackagesHallWiseCharges('
									+ "'"
									+ 'search'
									+ "'"
									+ ')" /></div></div><div class="divide-20"></div>');

			fetchLabPackagesHallWiseCharges("onload");
		}
	}
}

function fetchInvTestHallWiseCharges(search) {

	$("#searchDiv")
			.append(
					'<table id="InvTestChrgsTable" class="table table-bordered table-condensed cf table-fixed" style="margin-bottom: 9px; width: 500%; max-width: 1000%; margin-top: 2.2%;"><thead><tr id="InvstTestHeading"></tr></thead><tbody class="table-striped"><tr id="Test0"></tr></tbody></table>');
	var sid = $("#sid").val();
	count = 1;
	var searchText = "";
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Test Name !");
			setFocus("#byName");
		}
	}
	var inputs = [];
	inputs.push('action=fetchInvstTestForTPAhallwiseCharges');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	inputs.push('sid=' + encodeURIComponent(sid));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
					var result = res;
					// alert(result);
					$("#testDetails").html(result);
					var testObj = eval('(' + result + ')');

					if (searhFlag == "search" && testObj.invstList.length == 0) {
						alert("Investigation Test Not Found");
						$("#byName").val("");
						location.reload();
					}
					$('#InvTestChrgsTable > thead > tr:nth-child(n+2)')
							.remove();
					$('#InvTestChrgsTable > tbody > tr:nth-child(n+2)')
							.remove();

					var halllist = $("#hallDetailDiv").html();
					var halldetails = eval('(' + halllist + ')');

					var investigationTestCharges = "";
					// setTimeout(function() {

					investigationTestCharges = investigationTestCharges
							+ "<tr id = 'headerTr'>"
							+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
							+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>Investigation Test Name</div></th>"
							+ "<th class='center' style = 'width: 70px;'><div class='TextFont'>Test Code</div></th>"
							+ "<th class='center' style = 'width: 150px;'><div class='TextFont'>Test Group</div></th>"
							// + "<th class='center' style = 'width:
							// 150px;'><div class='TextFont'>Applicable
							// Flag</div></th>"
							+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";
					$
							.each(
									halldetails.hl,
									function(name, value) {
										investigationTestCharges = investigationTestCharges
										+ "<th class='center' style = 'width: 110px;' ><div class='col-sm-12-1'><div class='TextFont col-sm-12-1'>"
										+ value.hn
										+ "</div><div class='col-sm-12-1' style = 'margin-top: 10px;'><div class='col-sm-8-1'>Pay</div><div class='col-sm-4-1'>Co-Pay</div></div></div></th>";
									});
					investigationTestCharges = investigationTestCharges
							+ "</tr></thead>";
					$('#InvstTestHeading').after(investigationTestCharges);

					var count = 1;

					$
							.each(
									testObj.invstList,
									function(name, value) {

										var investigationTestbody = "";
										investigationTestbody = investigationTestbody
												+ "<tr id=Test"
												+ count
												+ "><td class='center' style='height: 21.5px;width: 30px;'>"
												+ value.invstId
												+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
												+ value.invstTestName
												+ "</td><td class='center' style='height: 21.5px;width: 70px;'>"
												+ value.invstTestCode
												+ "</td><td class='center' style='height: 21.5px;width: 150px;'>"
												+ value.testGroup + "</td>";

										var invTestChrgs = 0;
										var pay = 0;
										var copay = 0;
										var slaveid = 0;
										var hallid = 0;
										var testappFlag = "N";

										var checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
												+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");

										if (value.hallWsTestChrgsList.length > 0) {
											for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
												if (value.hallWsTestChrgsList[j].hallID == 0) {
													invTestChrgs = value.hallWsTestChrgsList[j].chrgs;
													pay = value.hallWsTestChrgsList[j].pay;
													copay = value.hallWsTestChrgsList[j].copay_chrgs;
													slaveid = value.hallWsTestChrgsList[j].slaveId;
													hallid = 0;
													testappFlag = value.hallWsTestChrgsList[j].testappflg;
													if(pay == 0){
														pay = value.hallWsTestChrgsList[j].chrgs - copay;
													}
													if (testappFlag == "Y") {
														checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
													}

													investigationTestbody = investigationTestbody
															+ "<td class='center' style='height: 21.5px;width: 110px;' class='col-md-12-1'>"
															+ (checkbox)
															+ "<input class='form-control input-SmallText col-md-5-1' type = 'text'  id=PayTestID"
															+ value.invstId+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ pay
															+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
															+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
															+ value.invstId+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
															+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
															+ "<input type='hidden' id = 'invtestchargesslaveID"
															+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
												}
											}
										} else {
											if (testappFlag == "Y") {
												checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
														+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
											}

											investigationTestbody = investigationTestbody
													+ "<td class='center' style='height: 21.5px;width: 110px;' class='col-md-12-1'>"
													+ (checkbox)
													+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
													+ value.invstId+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ value.testCharge
													+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
													+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
													+ value.invstId+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
													+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
													+ "<input type='hidden' id = 'invtestchargesslaveID"
													+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
										}
										$
												.each(
														halldetails.hl,
														function(name,
																hallvalue) {

															var isPresent = 0;
															for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
																if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
																	invTestChrgs = value.hallWsTestChrgsList[i].chrgs;
																	pay = value.hallWsTestChrgsList[i].pay;
																	copay = value.hallWsTestChrgsList[i].copay_chrgs;
																	slaveid = value.hallWsTestChrgsList[i].slaveId;
																	hallid = value.hallWsTestChrgsList[i].hallID;
																	testappFlag = value.hallWsTestChrgsList[i].testappflg;
																	if(pay == 0){
																		pay = value.hallWsTestChrgsList[i].chrgs - copay;
																	}
																	isPresent = 1;
																	break;
																}
															}

															if (isPresent > 0) {
																if (testappFlag == "Y") {
																	checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																			+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																} else {
																	checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
																			+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																}

																investigationTestbody = investigationTestbody
																		+ "<td class='center' style='height: 21.5px;width: 110px;' class='col-md-12-1'>"
																		+ (checkbox)
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
																		+ value.invstId+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ pay
																		+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
																		+ value.invstId+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
																		+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input type='hidden' id = 'invtestchargesslaveID"
																		+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
															} else {

																invTestChrgs = value.testCharge;
																pay = 0;
																copay = 0;
																slaveid = 0;
																hallid = hallvalue.hi;
																testappFlag = "N";

																if (testappFlag == "Y") {
																	checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																			+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																} else {
																	checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
																			+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																}

																investigationTestbody = investigationTestbody
																		+ "<td class='center' style='height: 21.5px;width: 110px;' class='col-md-12-1'>"
																		+ (checkbox)
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
																		+ value.invstId+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ invTestChrgs
																		+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
																		+ value.invstId+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
																		+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input type='hidden' id = 'invtestchargesslaveID"
																		+ value.invstId+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
															}
														});

										investigationTestbody = investigationTestbody
												+ "</tr>";

										$('#Test' + (count - 1)).after(
												investigationTestbody);
										count++;

									});
				}
			});

}

function saveInvTestChargesSlaveSpecialDiscount() {

	var result = $("#testDetails").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#hallDetailDiv").html();
	var halldetails = eval('(' + halllist + ')');
	var sid = $("#sid").val();
	var investTestObj = 0;

	investTestObj = {
		invstList : []

	};

	for ( var i = 0; i < testObj.invstList.length; i++) {

		var testid = testObj.invstList[i].invstId;
		var hallid = 0;
		var charges = testObj.invstList[i].testCharge;
		var pay_charges = $("#PayTestID" + testid + "-HallID0" + "_TPAID" + sid).val();
		var copay_charges = $("#CopayTestID" + testid + "-HallID0" + "_TPAID" + sid).val();
		var slaveid = $("#invtestchargesslaveID" + testid + "-0_" + sid).val();
		var appflag = "";

		if ($("#appFlag" + testid + "-0_" + sid).is(":checked")) {
			appflag = "Y";
		} else {
			appflag = "N";
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"pay" : pay_charges,
			"copay_chrgs" : copay_charges,
			"slaveId" : slaveid,
			"testappflg" : appflag
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = testObj.invstList[i].testCharge;
			var pay_chrg = $("#PayTestID" + testid + "-HallID" + hlid + "_TPAID" + sid).val();
			var copay_chrgs = $("#CopayTestID" + testid + "-HallID" + hlid + "_TPAID" + sid).val();
			var slvid = $("#invtestchargesslaveID" + testid + "-" + hlid + "_" + sid).val();

			if ($("#appFlag" + testid + "-" + hlid + "_" + sid).is(":checked")) {
				appflag = "Y";
			} else {
				appflag = "N";
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"pay" : pay_chrg,
				"copay_chrgs" : copay_chrgs,
				"slaveId" : slvid,
				"testappflg" : appflag
			});
		}

		investTestObj.invstList.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"invstId" : testid
		});
	}

	investTestObj = JSON.stringify(investTestObj);
	var inputs = [];
	inputs.push('action=saveInvTestHallWiseCharges');
	inputs.push('investTestObj=' + encodeURIComponent(investTestObj));
	inputs.push('sid=' + encodeURIComponent(sid));
	inputs.push('pageType=' + encodeURIComponent("SpecialDiscount"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
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

function fetchIPDServicesHallWiseCharges(search) {

	$("#searchDiv")
			.append(
					'<table id="IpdServiceChrgsTable" class="table table-bordered table-condensed cf table-fixed" style="margin-bottom: 9px; width: 500%; max-width: 1000%; margin-top: 2.2%;"><thead><tr id="IpdServiceHeading"></tr></thead><tbody class="table-striped"><tr id="Service0"></tr></tbody></table>');
	var sid = $("#sid").val();
	count = 1;
	var searchText = "";
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Service Name !");
			setFocus("#byName");
		}
	}
	var inputs = [];
	inputs.push('action=fetchIPDServicesForTPAhallwiseCharges');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	inputs.push('sid=' + encodeURIComponent(sid));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
					var result = res;
					// alert(result);
					$("#testDetails").html(result);
					var testObj = eval('(' + result + ')');

					if (searhFlag == "search" && testObj.testList.length == 0) {
						alert("Investigation Test Not Found");
						$("#byName").val("");
						location.reload();
					}
					$('#IpdServiceChrgsTable > thead > tr:nth-child(n+2)')
							.remove();
					$('#IpdServiceChrgsTable > tbody > tr:nth-child(n+2)')
							.remove();

					var halllist = $("#hallDetailDiv").html();
					var halldetails = eval('(' + halllist + ')');

					var ipdServiceCharges = "";
					// setTimeout(function() {
					
					ipdServiceCharges = ipdServiceCharges
							+ "<tr id = 'headerTr'>"
							+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
							+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>IPD Service Name</div></th>"
							+ "<th class='center' style = 'width: 110px;'><div class='TextFont'>OPD Charges</div></th>";
					$
							.each(
									halldetails.hl,
									function(name, value) {
										ipdServiceCharges = ipdServiceCharges
										+ "<th class='center' style = 'width: 110px;' ><div class='col-sm-12-1'><div class='TextFont col-sm-12-1'>"
										+ value.hn
										+ "</div><div class='col-sm-12-1' style = 'margin-top: 10px;'><div class='col-sm-8-1'>Pay</div><div class='col-sm-4-1'>Co-Pay</div></div></div></th>";
									});
					ipdServiceCharges = ipdServiceCharges + "</tr></thead>";
					$('#IpdServiceHeading').after(ipdServiceCharges);

					$
							.each(
									testObj.testList,
									function(name, value) {

										var ipdServiceChargesbody = "";
										ipdServiceChargesbody = ipdServiceChargesbody
												+ "<tr id=Service"
												+ count
												+ "><td class='center' style='height: 21.5px;width: 30px;'>"
												+ value.test_ID
												+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
												+ value.tname + "</td>";

										var ipdServiceChrgs = 0;
										var pay = 0;
										var copay = 0;
										var slaveid = 0;
										var hallid = 0;
										var testappFlag = "N";

										var checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
												+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");

										if (value.hallWsTestChrgsList.length > 0) {
											for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
												if (value.hallWsTestChrgsList[j].hallID == 0) {
													ipdServiceChrgs = value.hallWsTestChrgsList[j].chrgs;
													pay = value.hallWsTestChrgsList[j].pay;
													copay = value.hallWsTestChrgsList[j].copay_chrgs;
													slaveid = value.hallWsTestChrgsList[j].slaveId;
													hallid = 0;
													testappFlag = value.hallWsTestChrgsList[j].testappflg;
													if(pay == 0){
														pay = value.hallWsTestChrgsList[j].chrgs - copay;
													}
													if (testappFlag == "Y") {
														checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
													}

													ipdServiceChargesbody = ipdServiceChargesbody
															+ "<td class='center' style='height: 21.5px;width: 110px;' class='col-md-12-1'>"
															+ (checkbox)
															+ "<input class='form-control input-SmallText col-md-5-1' type = 'text'  id=PayTestID"
															+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ pay
															+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
															+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
															+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
															+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
															+ "<input type='hidden' id = 'ipdservicechargesslaveID"
															+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
												}
											}
										} else {
											if (testappFlag == "Y") {
												checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
														+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
											}

											ipdServiceChargesbody = ipdServiceChargesbody
													+ "<td class='center' style='height: 21.5px;width: 110px;' class='col-md-12-1'>"
													+ (checkbox)
													+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
													+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ value.charges1
													+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
													+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
													+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
													+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
													+ "<input type='hidden' id = 'ipdservicechargesslaveID"
													+ value.test_ID	+ "-"+ hallid+ "_"+ sid	+ "' value = '"+ slaveid+ "' /></td>";
										}
										$
												.each(
														halldetails.hl,
														function(name,
																hallvalue) {

															var isPresent = 0;
															for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
																if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
																	ipdServiceChrgs = value.hallWsTestChrgsList[i].chrgs;
																	pay = value.hallWsTestChrgsList[i].pay;
																	copay = value.hallWsTestChrgsList[i].copay_chrgs;
																	slaveid = value.hallWsTestChrgsList[i].slaveId;
																	hallid = value.hallWsTestChrgsList[i].hallID;
																	testappFlag = value.hallWsTestChrgsList[i].testappflg;
																	
																	if(pay == 0){
																		pay = value.hallWsTestChrgsList[i].chrgs - copay;
																	}
																	isPresent = 1;
																	break;
																}
															}

															if (isPresent > 0) {
																if (testappFlag == "Y") {
																	checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																} else {
																	checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
																			+ value.test_ID	+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																}

																ipdServiceChargesbody = ipdServiceChargesbody
																		+ "<td class='center' style='height: 21.5px;width: 110px;' class='col-md-12-1'>"
																		+ (checkbox)
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid + " value = '"+ pay
																		+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
																		+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input type='hidden' id = 'ipdservicechargesslaveID"
																		+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
															} else {

																ipdServiceChrgs = value.charges1;
																pay = 0;
																copay = 0;
																slaveid = 0;
																hallid = hallvalue.hi;
																testappFlag = "N";

																if (testappFlag == "Y") {
																	checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																} else {
																	checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																}

																ipdServiceChargesbody = ipdServiceChargesbody
																		+ "<td class='center' style='height: 21.5px;width: 110px;' class='col-md-12-1'>"
																		+ (checkbox)
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ ipdServiceChrgs
																		+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
																		+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input type='hidden' id = 'ipdservicechargesslaveID"
																		+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
															}

														});

										ipdServiceChargesbody = ipdServiceChargesbody
												+ "</tr>";

										$('#Service' + (count - 1)).after(
												ipdServiceChargesbody);
										count++;

									});
				}
			});
}

function saveIPDServicesChargesSlaveSpecialDiscount() {

	var result = $("#testDetails").html();
	var serviceObj = eval('(' + result + ')');
	var halllist = $("#hallDetailDiv").html();
	var halldetails = eval('(' + halllist + ')');
	var sid = $("#sid").val();

	var TestObj = 0;
	TestObj = {
		testList : []
	};

	for ( var i = 0; i < serviceObj.testList.length; i++) {

		var testid = serviceObj.testList[i].test_ID;
		var test_type = serviceObj.testList[i].ipdservicetype;
		var hallid = 0;
		var charges = serviceObj.testList[i].charges1;
		var pay_charges = $("#PayTestID" + testid + "-HallID0" + "_TPAID" + sid).val();
		var copay_charges = $("#CopayTestID" + testid + "-HallID0" + "_TPAID" + sid).val();
		var slaveid = $("#ipdservicechargesslaveID" + testid + "-0_" + sid).val();
		var appflag = "";

		if ($("#appFlag" + testid + "-0_" + sid).is(":checked")) {
			appflag = "Y";
		} else {
			appflag = "N";
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"pay" : pay_charges,
			"copay_chrgs" : copay_charges,
			"slaveId" : slaveid,
			"testappflg" : appflag
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = serviceObj.testList[i].charges1;
			var pay_chrgs = $("#PayTestID" + testid + "-HallID" + hlid + "_TPAID" + sid).val();
			var copay_chrgs = $("#CopayTestID" + testid + "-HallID" + hlid + "_TPAID" + sid).val();
			var slvid = $("#ipdservicechargesslaveID" + testid + "-" + hlid + "_" + sid).val();

			if ($("#appFlag" + testid + "-" + hlid + "_" + sid).is(":checked")) {
				appflag = "Y";
			} else {
				appflag = "N";
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"pay" : pay_chrgs,
				"copay_chrgs" : copay_chrgs,
				"slaveId" : slvid,
				"testappflg" : appflag
			});
		}

		TestObj.testList.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"test_ID" : testid,
			"ipdservicetype" : test_type
		});
	}

	TestObj = JSON.stringify(TestObj);
	var inputs = [];
	inputs.push('action=saveServicesHallWiseCharges');
	inputs.push('serviceObj=' + encodeURIComponent(TestObj));
	inputs.push('sid=' + encodeURIComponent(sid));
	inputs.push('pageType=' + encodeURIComponent("SpecialDiscount"));
	inputs.push('testType=' + encodeURIComponent(""));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
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

function loadPathalogyTestsHeadingWiseForTPA(search) {

	/*$("#divInside").html("");
	$("#divInside")
			.append(
					'<div class="divide-20"></div><div class="col-md-12-1" id = "searchDiv"><div style="" class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Search	By:</label></div><div class="col-md-1-1"><label class="TextFont" style="margin-left: 10%; margin-top: 3%;">Service Name:</label></div><div style="" class="col-md-2-1 TextFont" id="divbyName"><input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText" /></div><div class="col-md-1-1" style="text-align: center;"><input type="button" value="search"	class="btn btn-xs btn-primary" id="searchTest" onclick="loadPathalogyTestsHeadingWiseForTPA('
							+ "'"
							+ 'search'
							+ "'"
							+ ')" /></div></div><div class="divide-20"></div>');
*/
	$("#searchDiv")
			.append(
					'<table id="PathoTestChrgsTable" class="table table-bordered table-condensed cf table-fixed" style="margin-bottom: 9px; width: 500%; max-width: 1000%; margin-top: 2.2%;"><thead><tr id="PathotestHeading"></tr></thead><tbody class="table-striped"><tr id="Test0"></tr></tbody></table>');

	var sid = $("#sid").val();
	count = 1;
	var searchText = "";
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Test Name !");
			setFocus("#byName");
		}
	}

	var selDisRefType = $("#selDisRefType").val();
	var heading = $("#selHeading").val();
	// alert(heading);
	count = 1;
	var inputs = [];
	inputs.push('action=loadPathologyTestForTPA');
	inputs.push('type=' + searhFlag);
	inputs.push('txtBxTestName=' + searchText);
	inputs.push('sp_dic_master_id=' + $("#sid").val());
	inputs.push('heading=' + heading);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {
					var result = ajaxResponse;
					// alert(result);
					$("#testDetails").html(result);
					var testObj = eval('(' + result + ')');

					if (searhFlag == "search" && testObj.testList.length == 0) {
						alert("Investigation Test Not Found");
						$("#byName").val("");
						location.reload();
					}
					$('#PathoTestChrgsTable > thead > tr:nth-child(n+2)')
							.remove();
					$('#PathoTestChrgsTable > tbody > tr:nth-child(n+2)')
							.remove();

					var halllist = $("#hallDetailDiv").html();
					var halldetails = eval('(' + halllist + ')');

					var labTestCharges = "";
					// setTimeout(function() {

					labTestCharges = labTestCharges
							+ "<tr id = 'headerTr'>"
							+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
							+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>Pathology Test Name</div></th>"
							+ "<th class='center' style = 'width: 70px;'><div class='TextFont'>Test Code</div></th>"
							+ "<th class='center' style = 'width: 50px;'><div class='TextFont'>Test Type</div></th>"
							+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";
					$
							.each(
									halldetails.hl,
									function(name, value) {
										labTestCharges = labTestCharges
										+ "<th class='center' style = 'width: 100px;' ><div class='col-sm-12-1'><div class='TextFont col-sm-12-1'>"
										+ value.hn
										+ "</div><div class='col-sm-12-1' style = 'margin-top: 10px;'><div class='col-sm-8-1'>Pay</div><div class='col-sm-4-1'>Co-Pay</div></div></div></th>";
									});
					labTestCharges = labTestCharges + "</tr></thead>";
					$('#PathotestHeading').after(labTestCharges);

					var count = 1;

					$
							.each(
									testObj.testList,
									function(name, value) {

										var labTestbody = "";
										labTestbody = labTestbody
												+ "<tr id=Test"
												+ count
												+ "><td class='center' style='height: 21.5px;width: 30px;'>"
												+ value.test_ID
												+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
												+ value.tname
												+ "</td><td class='center' style='height: 21.5px;width: 70px;'>"
												+ value.ipdservicetype
												+ "</td><td class='center' style='height: 21.5px;width: 70px;'>"
												+ value.test_report + "</td>";

										var labTestChrgs = 0;
										var pay = 0;
										var copay = 0;
										var slaveid = 0;
										var hallid = 0;
										var testappFlag = "N";

										var checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
												+ value.test_ID
												+ "-"
												+ hallid
												+ "_"
												+ sid
												+ "' value = '"
												+ testappFlag + "' />");

										if (value.hallWsTestChrgsList.length > 0) {
											for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
												if (value.hallWsTestChrgsList[j].hallID == 0) {
													labTestChrgs = value.hallWsTestChrgsList[j].chrgs;
													pay = value.hallWsTestChrgsList[j].pay;
													copay = value.hallWsTestChrgsList[j].copay_chrgs;
													slaveid = value.hallWsTestChrgsList[j].slaveId;
													hallid = 0;
													testappFlag = value.hallWsTestChrgsList[j].testappflg;
													if(pay == 0){
														pay = value.hallWsTestChrgsList[j].chrgs - copay;
													}
													
													if (testappFlag == "Y") {
														checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
													}

													labTestbody = labTestbody
															+ "<td class='center' style='height: 21.5px;width: 100px;' class='col-md-12-1'>"
															+ (checkbox)
															+ "<input class='form-control input-SmallText col-md-5-1' type = 'text'  id=PayTestID"
															+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ pay
															+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
															+ "<input class='form-control input-SmallText col-md-5-1' type = 'text'  id=CopayTestID"
															+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
															+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
															+ "<input type='hidden' id = 'labtestchargesslaveID"
															+ value.test_ID+ "-" + hallid+ "_" + sid+ "' value = '"+ slaveid+ "' /></td>";
												}
											}
										} else {
											if (testappFlag == "Y") {
												checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
														+ value.test_ID+ "-"+ hallid+ "_"+ sid
														+ "' value = '"
														+ testappFlag + "' />");
											}

											labTestbody = labTestbody
													+ "<td class='center' style='height: 21.5px;width: 100px;' class='col-md-12-1'>"
													+ (checkbox)
													+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
													+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ value.charges1
													+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
													+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
													+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
													+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
													+ "<input type='hidden' id = 'labtestchargesslaveID"
													+ value.test_ID + "-"+ hallid + "_" + sid+ "' value = '" + slaveid+ "' /></td>";
										}
										$
												.each(
														halldetails.hl,
														function(name,
																hallvalue) {

															var isPresent = 0;
															for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
																if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
																	labTestChrgs = value.hallWsTestChrgsList[i].chrgs;
																	pay = value.hallWsTestChrgsList[i].pay;
																	copay = value.hallWsTestChrgsList[i].copay_chrgs;
																	slaveid = value.hallWsTestChrgsList[i].slaveId;
																	hallid = value.hallWsTestChrgsList[i].hallID;
																	testappFlag = value.hallWsTestChrgsList[i].testappflg;
																	if(pay == 0){
																		pay = value.hallWsTestChrgsList[i].chrgs - copay;
																	}
																	// alert(testappFlag);
																	isPresent = 1;
																	break;
																}
															}

															if (isPresent > 0) {
																if (testappFlag == "Y") {
																	checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																} else {
																	checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																}

																labTestbody = labTestbody
																		+ "<td class='center' style='height: 21.5px;width: 100px;' class='col-md-12-1'>"
																		+ (checkbox)
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ pay
																		+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
																		+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input type='hidden' id = 'labtestchargesslaveID"
																		+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
															} else {

																labTestChrgs = value.charges1;
																pay = 0;
																copay = 0;
																slaveid = 0;
																hallid = hallvalue.hi;
																testappFlag = "N";

																if (testappFlag == "Y") {
																	checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																} else {
																	checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																}

																labTestbody = labTestbody
																		+ "<td class='center' style='height: 21.5px;width: 100px;' class='col-md-12-1'>"
																		+ (checkbox)
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ labTestChrgs
																		+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
																		+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input type='hidden' id = 'labtestchargesslaveID"+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
															}
														});

										labTestbody = labTestbody + "</tr>";

										$('#Test' + (count - 1)).after(
												labTestbody);
										count++;

									});
				}
			});
}

function saveLabTestChargesSlaveSpecialDiscount() {

	var result = $("#testDetails").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#hallDetailDiv").html();
	var halldetails = eval('(' + halllist + ')');
	var sid = $("#sid").val();

	var labTestObj = 0;
	labTestObj = {
			tli : []
	};

	for ( var i = 0; i < testObj.testList.length; i++) {

		var testid = testObj.testList[i].test_ID;
		var testreport = testObj.testList[i].test_report;
		var hallid = 0;
		var charges = testObj.testList[i].charges1;
		var pay_charges = $("#PayTestID" + testid + "-HallID0" + "_TPAID" + sid).val();
		var copay_charges = $("#CopayTestID" + testid + "-HallID0" + "_TPAID" + sid).val();
		var slaveid = $("#labtestchargesslaveID" + testid + "-0_" + sid).val();

		var appflag = "";

		if ($("#appFlag" + testid + "-0_" + sid).is(":checked")) {
			appflag = "Y";
		} else {
			appflag = "N";
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"pay" : pay_charges,
			"copay_chrgs" : copay_charges,
			"slaveId" : slaveid,
			"testappflg" : appflag
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = testObj.testList[i].charges1;
			var Paychrg = $("#PayTestID" + testid + "-HallID" + hlid + "_TPAID" + sid).val();
			var Cochrg = $("#CopayTestID" + testid + "-HallID" + hlid + "_TPAID" + sid).val();
			var slvid = $("#labtestchargesslaveID" + testid + "-" + hlid + "_" + sid).val();

			if ($("#appFlag" + testid + "-" + hlid + "_" + sid).is(":checked")) {
				appflag = "Y";
			} else {
				appflag = "N";
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"pay" : Paychrg,
				"copay_chrgs" : Cochrg,
				"slaveId" : slvid,
				"testappflg" : appflag
			});
		}

		labTestObj.tli.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"tid" : testid,
			"vt" : testreport
		});
	}

	TestObj = JSON.stringify(labTestObj);
	var inputs = [];
	inputs.push('action=saveLabTestHallWiseCharges');
	inputs.push('TestObj=' + encodeURIComponent(TestObj));
	inputs.push('sid=' + encodeURIComponent(sid));
	inputs.push('pageType=' + encodeURIComponent("SpecialDiscount"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
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

function fetchLabPackagesHallWiseCharges(search) {

	$("#searchDiv")
			.append(
					'<table id="PathoPkgChrgsTable" class="table table-bordered table-condensed cf table-fixed" style="margin-bottom: 9px; width: 500%; max-width: 1000%; margin-top: 2.2%;"><thead><tr id="PathotestHeading"></tr></thead><tbody class="table-striped"><tr id="Test0"></tr></tbody></table>');

	var sid = $("#sid").val();
	count = 1;
	var searchText = "";
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Package Name !");
			setFocus("#byName");
		}
	}

	count = 1;
	var inputs = [];
	inputs.push('action=loadPathologyPackagesForTPA');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + searchText);
	inputs.push('sp_dic_master_id=' + sid);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {
					var result = ajaxResponse;
					// alert(result);
					$("#testDetails").html(result);
					var testObj = eval('(' + result + ')');

					if (searhFlag == "search" && testObj.testList.length == 0) {
						alert("Investigation Test Not Found");
						$("#byName").val("");
						location.reload();
					}
					$('#PathoPkgChrgsTable > thead > tr:nth-child(n+2)')
							.remove();
					$('#PathoPkgChrgsTable > tbody > tr:nth-child(n+2)')
							.remove();

					var halllist = $("#hallDetailDiv").html();
					var halldetails = eval('(' + halllist + ')');

					var labTestCharges = "";
					// setTimeout(function() {

					labTestCharges = labTestCharges
							+ "<tr id = 'headerTr'>"
							+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
							+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>Pathology Package Name</div></th>"
							+ "<th class='center' style = 'width: 50px;'><div class='TextFont'>Test Type</div></th>"
							+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";
					$
							.each(
									halldetails.hl,
									function(name, value) {
										labTestCharges = labTestCharges
												+ "<th class='center' style = 'width: 100px;' ><div class='col-sm-12-1'><div class='TextFont col-sm-12-1'>"
												+ value.hn
												+ "</div><div class='col-sm-12-1' style = 'margin-top: 10px;'><div class='col-sm-8-1'>Pay</div><div class='col-sm-4-1'>Co-Pay</div></div></div></th>";
									});
					labTestCharges = labTestCharges + "</tr></thead>";
					$('#PathotestHeading').after(labTestCharges);

					var count = 1;

					$
							.each(
									testObj.testList,
									function(name, value) {

										var labTestbody = "";
										labTestbody = labTestbody
												+ "<tr id=Test"
												+ count
												+ "><td class='center' style='height: 21.5px;width: 30px;'>"
												+ value.test_ID
												+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
												+ value.tname
												+ "</td><td class='center' style='height: 21.5px;width: 70px;'>"
												+ value.test_report + "</td>";

										var labTestChrgs = 0;
										var pay = 0;
										var slaveid = 0;
										var hallid = 0;
										var copay = 0;
										var testappFlag = "N";

										var checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
												+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");

										if (value.hallWsTestChrgsList.length > 0) {
											for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
												if (value.hallWsTestChrgsList[j].hallID == 0) {
													labTestChrgs = value.hallWsTestChrgsList[j].chrgs;
													pay = value.hallWsTestChrgsList[j].pay;
													copay = value.hallWsTestChrgsList[j].copay_chrgs;
													slaveid = value.hallWsTestChrgsList[j].slaveId;
													hallid = 0;
													testappFlag = value.hallWsTestChrgsList[j].testappflg;
													if(pay == 0){
														pay = value.hallWsTestChrgsList[j].chrgs - copay;
													}
													
													if (testappFlag == "Y") {
														checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																+ value.test_ID + "-" + hallid + "_" + sid + "' value = '" + testappFlag + "' />");
													}

													labTestbody = labTestbody
															+ "<td class='center' style='height: 21.5px;width: 100px;' class='col-md-12-1'>"
															+ (checkbox)
															+ "<input class='form-control input-SmallText col-md-5-1' type = 'text'  id=PayTestID"
															+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ pay
															+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
															+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
															+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
															+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
															+ "<input type='hidden' id = 'labtestchargesslaveID"
															+ value.test_ID+ "-" + hallid+ "_" + sid+ "' value = '"+ slaveid+ "' /></td>";
												}
											}
										} else {
											if (testappFlag == "Y") {
												checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
														+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
											}

											labTestbody = labTestbody
													+ "<td class='center' style='height: 21.5px;width: 100px;' class='col-md-12-1'>"
													+ (checkbox)
													+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
													+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ value.charges1
													+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
													+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
													+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
													+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
													+ "<input type='hidden' id = 'labtestchargesslaveID"
													+ value.test_ID + "-"+ hallid + "_" + sid+ "' value = '" + slaveid+ "' /></td>";
										}
										$
												.each(
														halldetails.hl,
														function(name,
																hallvalue) {

															var isPresent = 0;
															for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
																if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
																	labTestChrgs = value.hallWsTestChrgsList[i].chrgs;
																	pay = value.hallWsTestChrgsList[i].pay;
																	copay = value.hallWsTestChrgsList[i].copay_chrgs;
																	slaveid = value.hallWsTestChrgsList[i].slaveId;
																	hallid = value.hallWsTestChrgsList[i].hallID;
																	testappFlag = value.hallWsTestChrgsList[i].testappflg;
																	if(pay == 0){
																		pay = value.hallWsTestChrgsList[i].chrgs - copay;
																	}
																	// alert(testappFlag);
																	isPresent = 1;
																	break;
																}
															}

															if (isPresent > 0) {
																if (testappFlag == "Y") {
																	checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																} else {
																	checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																}

																labTestbody = labTestbody
																		+ "<td class='center' style='height: 21.5px;width: 100px;' class='col-md-12-1'>"
																		+ (checkbox)
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ pay
																		+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
																		+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input type='hidden' id = 'labtestchargesslaveID"
																		+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
															} else {

																labTestChrgs = value.charges1;
																pay = 0;
																copay = 0;
																slaveid = 0;
																hallid = hallvalue.hi;
																testappFlag = "N";

																if (testappFlag == "Y") {
																	checkbox = ("<input type='checkbox' checked='checked' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																} else {
																	checkbox = ("<input type='checkbox' class='col-md-1-1' id='appFlag"
																			+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ testappFlag + "' />");
																}

																labTestbody = labTestbody
																		+ "<td class='center' style='height: 21.5px;width: 100px;' class='col-md-12-1'>"
																		+ (checkbox)
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=PayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ labTestChrgs
																		+ "' style = 'text-align:right;margin-left: 4px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input class='form-control input-SmallText col-md-5-1' type = 'text' id=CopayTestID"
																		+ value.test_ID+ "-HallID"+ hallid+ "_TPAID"+ sid+ " value = '"+ copay
																		+ "' style = 'text-align:right;margin-left: 2px;margin-top: 1px;' onkeypress='return validateNumbers(event)' />"
																		+ "<input type='hidden' id = 'labtestchargesslaveID"
																		+ value.test_ID+ "-"+ hallid+ "_"+ sid+ "' value = '"+ slaveid+ "' /></td>";
															}
														});

										labTestbody = labTestbody + "</tr>";

										$('#Test' + (count - 1)).after(
												labTestbody);
										count++;

									});
				}
			});
}

function saveLabPackagesChargesSlaveSpecialDiscount() {
	
	var result = $("#testDetails").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#hallDetailDiv").html();
	var halldetails = eval('(' + halllist + ')');
	var sid = $("#sid").val();

	var labPkgObj = 0;
	labPkgObj = {
		lbpkgli : []
	};

	for ( var i = 0; i < testObj.testList.length; i++) {

		var testid = testObj.testList[i].test_ID;
		var testreport = testObj.testList[i].test_report;
		var hallid = 0;
		var charges = testObj.testList[i].charges1;
		var Paycharges = $("#PayTestID" + testid + "-HallID0" + "_TPAID" + sid).val();
		var Copaycharges = $("#CopayTestID" + testid + "-HallID0" + "_TPAID" + sid).val();
		var slaveid = $("#labtestchargesslaveID" + testid + "-0_" + sid).val();

		var appflag = "";

		if ($("#appFlag" + testid + "-0_" + sid).is(":checked")) {
			appflag = "Y";
		} else {
			appflag = "N";
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"pay" : Paycharges,
			"copay_chrgs" : Copaycharges,
			"slaveId" : slaveid,
			"testappflg" : appflag
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrgs = testObj.testList[i].charges1;
			var Paychrg = $("#PayTestID" + testid + "-HallID" + hlid + "_TPAID" + sid).val();
			var Cochrg = $("#CopayTestID" + testid + "-HallID" + hlid + "_TPAID" + sid).val();
			var slvid = $("#labtestchargesslaveID" + testid + "-" + hlid + "_" + sid).val();

			if ($("#appFlag" + testid + "-" + hlid + "_" + sid).is(":checked")) {
				appflag = "Y";
			} else {
				appflag = "N";
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrgs,
				"pay" : Paychrg,
				"copay_chrgs" : Cochrg,
				"slaveId" : slvid,
				"testappflg" : appflag
			});
		}

		labPkgObj.lbpkgli.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"idlbpkg" : testid,
			"pkgst" : testreport
		});
	}

	labPkgObj = JSON.stringify(labPkgObj);
	var inputs = [];
	inputs.push('action=saveLabPackageHallWiseCharges');
	inputs.push('packageObj=' + encodeURIComponent(labPkgObj));
	inputs.push('sid=' + encodeURIComponent(sid));
	inputs.push('pageType=' + encodeURIComponent("SpecialDiscount"));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
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

function saveDiscountDetailHAllWise() {
	// pathologyTestSearch.bluer();
	var selDisRefType = $("#selDisRefType").val();

	if (selDisRefType == "operation") {
		saveGrpCatWiseProCharge();
	} else if (selDisRefType == "hosacc") {
		saveHospitalAcc();
	} else if (selDisRefType == "Radiology" || selDisRefType == "dental"
			|| selDisRefType == "casuality") {
		saveToDisc();
	} else if (selDisRefType == "fees") {
		// alert($("#txtSpecialityCount").val());
		saveDoctorSpeciality($("#txtSpecialityCount").val());
	} else if (selDisRefType == "hallwisipd") {
		saveHallAccountTypeDetails();
	} else if (selDisRefType == "bedcharges") {
		saveBedCharges();
	} else if (selDisRefType == "Cardiology") {
		saveInvTestChargesSlaveSpecialDiscount();
	} else if (selDisRefType == "ipdserv") {
		saveIPDServicesChargesSlaveSpecialDiscount();
	} else if (selDisRefType == "pathology") {
		saveLabTestChargesSlaveSpecialDiscount();
	} else if (selDisRefType == "pathologyPkg") {
		saveLabPackagesChargesSlaveSpecialDiscount();
	}
}
