<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/responsive.css"/>">
<link
	href="<c:url value="/pharmacy/resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="/pharmacy/resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<link
	href="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">

<!-- JQUERY -->
<script
	src="<c:url value="/pharmacy/resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
<!-- /for Developers  -->

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- Application js -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_patient.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<script>
function reset () {
	$("#toggleCSS").attr("href", "<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>");
	alertify.set({
		notifier:{
	        // auto-dismiss wait time (in seconds)  
	        delay:5,
	        // default position
	        position:'top-right'
	    },	
	labels : {
	ok     : "OK",
	cancel : "Cancel"
	
	},
	delay : 5000,
	buttonReverse : false,
	buttonFocus   : "ok"
	
	});
	
}
</script>
</head>
<script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
		});
</script>
<script>
function validateData() 
{
	var txtPatCode  = $('#txtPatCode').val().toString().trim(); 
	var txtPatName  = $('#txtPatName').val().toString().trim(); 
	var txtPatAddress  = $('#txtPatAddress').val().toString().trim(); 
	var txtPatMobile  = $('#txtPatMobile').val().toString().trim(); 
	
	 if($('#txtPatCode').val()!=null && $('#txtPatCode').val()!="")
		{ 	if($('#txtPatName').val()!=null && $('#txtPatName').val()!="")
		   { 	
			if($('#txtPatAddress').val()!=null && $('#txtPatAddress').val()!="")
			   { 
				if($('#txtPatMobile').val()!=null && $('#txtPatMobile').val()!="")
				   { 
					if(txtPatCode.length!=0 && txtPatName.length!=0 && txtPatAddress.length!=0 && txtPatMobile.length!=0) 
					{
					if($('#patId').val()!=null && $('#patId').val()!="")
					   { 
						alert("Record Updated Successfully!");
		                  $('#patientMasterForm').submit();
					   }
					 else
					  {     alert("Record Saved Successfully!");
					        $('#patientMasterForm').submit();
					   	    
					  }
							 
					 }
					else
						{
						alert("Can not insert empty record");
						window.location.href = "view";
						
						}
						}
					
				else
				  {
					alert("Enter Patient Mobile Number");
					 $('#txtPatMobile').focus();
				  }	
				}
			
			else
			  {
				alert("Enter Patient Address");
				 $('#txtPatAddress').focus();
			  }	
		   }
		else
		  {
			alert("Enter Patient Name");
			 $('#txtPatName').focus();
		  }	
		
		}
	else
	  {
		alert("Enter Patient Code");
		 $('#txtPatCode').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchPatient($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Patient Name in Search Box");
	    $('#searchBox').focus();
	}

}
</script>
	<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_masters.jsp"%>

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date :  <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="/EhatEnterprise/Dashboard.jsp">Home</a>
											</li>
											<li><a href="/EhatEnterprise/pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Patient Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success"
													onclick="validateData();">Save</button>

											</div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Patient Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Patient Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitPatientMasterContent($('#searchBox').val())" />
									<input type="hidden" id="hiddenId" />

								</div>
								<div class='col-md-2-1'  style='padding-top:0%; margin-left:10px;'>
									<input id='btnSearch' type='button' value='Search' class='edit'
										onclick='validateSearch();' />

									<script type="text/javascript">
										$("#searchBox").autocomplete({
											 source : function(request, response) {
											 
													var findingName = $("#searchBox").val();
													var inputs = [];
													inputs.push('letter=' + findingName);
													var str = inputs.join('&');

													jQuery.ajax({
														async : true,
														type : "GET",
														data : str + "&reqType=AJAX",
														url : "autoSuggestionPatient",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].patName+"-"+r[i].patId;
															}
															response(availableTags);
														}
													});
											 }																						
										});	
										</script>
								</div>
							</div>
							<div class="divide-20"></div>
							<%-- <c:if test="${not empty success}">
								<div class="alert alert-success" id="msgDiv">${success}</div>
							</c:if>
							<c:if test="${not empty error}">
								<div class="alert alter-danger" id="msgDiv">${error}</div>
							</c:if> --%>
							<%-- <%
								if (request.getParameter("msg") != null) {
							%>

							<script type="text/javascript">
									reset();
									alertify.success("Record Saved Succesfully");
								</script>

							<%
								} else {
							%>
							<div id="resultDiv"></div>
							<%
								}
							%> --%>


							<div class="panel panel-default">
								<div class="panel-body">
									<div id="patientMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">
										<form:form commandName="patient" id="patientMasterForm"
											action="/EhatEnterprise/pharmacy/patient/save" method="post">


											<div class="col-md-12-1 center">
												<h4 id="title">Patient Master</h4>
											</div>

											<br>
											<div class="col-md-12-1 " style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Patient Code</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="patCode" type="text" id="txtPatCode"
														name="txtPatCode" class="form-control input-SmallText"
														placeholder="Patient Code"  required="true"
													/><!-- 	onblur="isUserName('txtPatCode',0,100)"  -->
													<div class='col-md-1-1 center'
														style='margin-top: -14px; margin-left: 189px; color: red;'>
														<b> *</b>
													</div>
													<form:hidden path="patId" id="patId" />
												</div>
											</div>

											<div class="col-md-12-1 " style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Patient Name</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="patName" type="text" id="txtPatName"
														name="txtPatName" class="form-control input-SmallText"
														placeholder="Patient Name"  required="true"
														/>
														<!-- onblur="isAlphaWithSpace('txtPatName',0,600)"  -->
													<div class='col-md-1-1 center'
														style='margin-top: -14px; margin-left: 189px; color: red;'>
														<b> *</b>
													</div>

												</div>
											</div>

											<div class="col-md-12-1 " style="margin-top: 9px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Address</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:textarea path="patAddress" id="txtPatAddress"
														name="txtPatAddress" style="width:97%;"
														
														placeholder="Address"  required="true" />
														<!-- onblur="isAddress('txtPatAddress',0,500)" -->
													<div class='col-md-1-1 center'
														style='margin-top: -14px; margin-left: 189px; color: red;'>
														<b> *</b>
													</div>

												</div>
											</div>

											<div class="col-md-12-1 " style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Phone</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="patPhone" type="text" id="txtPatPhone"
														name="txtPatPhone" class="form-control input-SmallText"
														placeholder="Phone" maxlength="10" required="true"
														onblur="isPhonNo('txtPatPhone',0,10);" />


												</div>
											</div>

											<div class="col-md-12-1 " style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Mobile No</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="patMobile" type="text" id="txtPatMobile"
														name="txtPatMobile" class="form-control input-SmallText"
														placeholder="Mobile" maxlength="10" required="true"
														onblur="isMobileNum('txtPatMobile')" />
													<div class='col-md-1-1 center'
														style='margin-top: -14px; margin-left: 189px; color: red;'>
														<b> *</b>
													</div>


												</div>
											</div>

											<div class="col-md-12-1 " style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Email</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="patEmail" type="text" id="txtPatEmail"
														name="txtPatEmail" class="form-control input-SmallText"
														placeholder="Email"  required="true"
														onblur="ValidateEmail('txtPatEmail')" />


												</div>
											</div>

											<div class="col-md-12-1 " style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>DOB</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="patDOB" type="text" id="txtPatDOB"
														name="txtPatDOB" class="form-control input-SmallText"
														readonly="true" placeholder="DOB" required="true"
														onclick="displayCalendar(document.getElementById('txtPatDOB'),'dd/mm/yyyy',this)"
														onchange="checkBirthdate('txtPatDOB');" />

												</div>
											</div>

											<div class="col-md-12-1 " style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Opening Debit</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="patOpeningDebit" type="text"
														id="txtPatOpeningDebit" name="txtPatOpeningDebit"
														class="form-control input-SmallText"
														placeholder="Opening Debit"  required="true"
														onblur="isFloatingPoint('txtPatOpeningDebit')" />



												</div>
											</div>

											<div class="col-md-12-1 "
												style="margin-top: 9px; margin-bottom: 10px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Opening Credit</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="patOpeningCredit" type="text"
														id="txtPatOpeningCredit" name="txtPatOpeningCredit"
														class="form-control input-SmallText"
														placeholder="Opening Credit" 
														required="true" onblur="isFloatingPoint('txtPatOpeningCredit')" />



												</div>
											</div>
										</form:form>
									</div>

									<div
										style="width: 55%; margin-left: 3%; float: left; height: 100%;">
										<!-- <div id="SearchHospital" style="width: 100%; padding: 2%;"></div>	 -->
										<div
											style="width: 100%; overflow-y: scroll; height: 300px; max-height: auto; margin-left: 2%;">
											<table
												class="table table-striped table-bordered header-fixed cf "
												style="Width: 100%; margin-top: 5px;">
												<thead class="cf" style="background: white;">
													<tr>
														<th style="height: 21.5px;" class="col-md-1"><div>Sr No</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Patient
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Address</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Mobile
																No</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>

												<tbody id="divPatientList">
													<c:forEach items="${patientMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="patId${row.patId }"
																value="${row.patId }">
															</td>
															<td class="col-md-2">${row.patName }<input
																type="hidden" id="patName${row.patId }"
																value="${row.patName }"></td>

															<td class="col-md-2">${row.patAddress }<input
																type="hidden" id="patAddress${row.patId }"
																value="${row.patAddress }"></td>

															<td class="col-md-2">${row.patMobile }<input
																type="hidden" id="patMobile${row.patId }"
																value="${row.patMobile }"></td>

															<td style="display: none;" class="col-md-2 center">${row.patCode
																}<input type="hidden" id="patCode${row.patId }"
																value="${row.patCode }">
															</td>

															<td style="display: none;" class="col-md-2 center">${row.patPhone
																}<input type="hidden" id="patPhone${row.patId }"
																value="${row.patPhone }">
															</td>

															<td style="display: none;" class="col-md-2 center">${row.patEmail
																}<input type="hidden" id="patEmail${row.patId }"
																value="${row.patEmail }">
															</td>

															<td style="display: none;" class="col-md-2 center">
																<c:set var="DateOfBirth" value="${row.patDOB}" /> <fmt:formatDate
																	value="${DateOfBirth}" var="DateOfBirth"
																	pattern="dd/MM/yyyy" /> <c:out value="${DateOfBirth}"></c:out>
																<input type="hidden" id="patDOB${row.patId}"
																value="<c:out value="${DateOfBirth}"></c:out>">
															</td>
															<%-- <td style="display: none;" class="col-md-2 center">${row.patDOB
																	}<input type="hidden" id="patDOB${row.patId }"
																	value="${row.patDOB }">
																</td>
 --%>
															<td style="display: none;" class="col-md-2 center">${row.patOpeningDebit
																}<input type="hidden" id="patOpeningDebit${row.patId }"
																value="${row.patOpeningDebit }">
															</td>

															<td style="display: none;" class="col-md-2 center">${row.patOpeningCredit
																}<input type="hidden" id="patOpeningCredit${row.patId }"
																value="${row.patOpeningCredit }">
															</td>

															<td class="col-md-1">
																<button id="btnEdit${row.patId}"
																	class="btn btn-xs btn-success" type="button"
																	onclick="editPatient(${row.patId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deletePatient(${row.patId})" value="DELETE">
																	<i class="fa fa-trash-o"></i>
																</button>
															</td>
														</tr>
													</c:forEach>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<%@include file="Pharma_Footer.jsp"%>

	</section>
</body>
</html>

