<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

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

<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
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
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- /for Developers  -->



<!-- Application js -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_doctor.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
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
<script>
function validateData() 
{
	
var txtDoctorName  = $('#txtDoctorName').val().toString().trim(); 
var txtAddress  = $('#txtAddress').val().toString().trim(); 
var txtPhone  = $('#txtPhone').val().toString().trim(); 
var txtRegNo  = $('#txtRegNo').val().toString().trim(); 
				
 if($('#txtDoctorName').val()!=null && $('#txtDoctorName').val()!="")
		{ 
				
		  if($('#txtAddress').val()!=null  && $('#txtAddress').val()!="")
			{
			  if($('#txtPhone').val()!=null  && $('#txtPhone').val()!="")
				{  
				  if($('#txtRegNo').val()!=null  && $('#txtRegNo').val()!="")
			       {
					 if(txtDoctorName.length!=0 && txtAddress.length!=0 && txtPhone.length!=0 && txtRegNo.length!=0) 
						  {
					  if($('#doctorId').val()!=null  && $('#doctorId').val()!="")
				       {
						 alert("Record Updated Successfully!");
			             $('#doctorMasterForm').submit();
				       }
					  else
					  {     alert("Record Saved Successfully!");
					         $('#doctorMasterForm').submit();
					 	    
					 	    
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
					  alert("Enter Register number");
					   $('#txtRegNo').focus();
					  }
				}	  
			  else
				  {
				  alert("Enter Phone number");
				   $('#txtPhone').focus();
				  }
			}
		  else
			{
			   alert("Enter Address");
			   $('#txtAddress').focus();
			   
			}
		}
	else
	  {
		alert("Enter Doctor Name");
		 $('#txtDoctorName').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchDoctor($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Doctor Name in Search Box");
	    $('#searchBox').focus();
	}

}

</script>
</head>

<script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
		});
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
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
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
											<li>Date :<%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="/EhatEnterprise/Dashboard.jsp">Home</a>
											</li>
											<li><a href="/EhatEnterprise/pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Doctor Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="validateData();">Save</button>
											</div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Doctor Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Doctor Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitContent($('#searchBox').val())" /> <input
										type="hidden" id="hiddenId" />

								</div>
								<div class='col-md-2-1'  style='padding-top:0%; margin-left:10px;'>
									<input id='' type='button' value='Search' class='edit'
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
														url : "/EhatEnterprise/pharmacy/doctor/autoSuggestionDoctorNames",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].doctorName+"-"+r[i].doctorId;
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


							<%-- <c:choose>
								<c:when test="${not empty success}">
									<div class="alert alert-success" id="msgDiv">${success}</div>
								</c:when>
								<c:when test="${not empty error}">
									<div class="alert alter-danger" id="msgDiv">${error}</div>
								</c:when>
								<c:otherwise>
									<div id="msgDiv"></div>
								</c:otherwise>
							</c:choose> --%>
						<%-- 	<%
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
									<div id="doctorMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">
										<form:form commandName="doctor" id="doctorMasterForm"
											action="/EhatEnterprise/pharmacy/doctor/save" method="post">
											<div class="col-md-12-1 center">
												<h4 id="title">Doctor Master</h4>
											</div>
											<div class="col-md-12-1" style="margin-top: 0px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Doctor Name</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="doctorName" type="text"
														id="txtDoctorName" name="txtDoctorName"
														class="form-control input-SmallText"
														placeholder="doctor name" required="true"
														 />
													<form:hidden path="doctorId" id="doctorId" />
													<!-- onblur="isAlphaWithSpace('txtDoctorName',0,500)" -->
													<div class='col-md-1-1 center'
													style='margin-top: -14px; margin-left:189px; color: red;'>
													<b> *</b>
												   </div>	
												</div>

											</div>
											<div class="col-md-12-1" style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Address</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="doctorAddress" type="text"
														id="txtAddress" name="txtAddress"
													
														class="form-control input-SmallText" placeholder="Address"
														 />
														 	<!-- onblur="isAddress('txtAddress',0,500)" -->
														<div class='col-md-1-1 center'
													        style='margin-top: -14px; margin-left:189px; color: red;'>
													       <b> *</b>
												   </div>	
												</div>

											</div>
											<div class="col-md-12-1" style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Phone</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="doctorPhone" type="text" id="txtPhone"
														name="txtPhone" class="form-control input-SmallText"
														placeholder="Phone Number" maxlength="10"
														onblur="isPhonNo('txtPhone');" />
													<div class='col-md-1-1 center'
													      style='margin-top: -14px; margin-left:189px; color: red;'>
													      <b> *</b>
												   </div>	
												</div>

											</div>

											<div class="col-md-12-1"
												style="margin-top: 9px; margin-bottom: 10px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Reg. No</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="doctorRegNo" type="text" id="txtRegNo"
														name="txtRegNo" class="form-control input-SmallText"
														placeholder="Register Number"  
													
														/>
															<!-- onblur="isNumber('txtRegNo')" -->
													<div class='col-md-1-1 center'
													        style='margin-top: -14px; margin-left:189px; color: red;'>
													     <b> *</b>
												   </div>	
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
														<th style="height: 21.5px;" class="col-md-2"><div>Doctor
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Address</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Phone</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Reg.
																No</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>

												<tbody id="divDoctorList">
													<c:forEach items="${ltDoctorMaster}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="doctorId${row.doctorId }"
																value="${row.doctorId }">
															</td>
															<td class="col-md-2">${row.doctorName }<input
																type="hidden" id="doctorName${row.doctorId }"
																value="${row.doctorName }"></td>
															<td class="col-md-2">${row.doctorAddress }<input
																type="hidden" id="doctorAddress${row.doctorId }"
																value="${row.doctorAddress }"></td>
															<td class="col-md-2">${row.doctorPhone }<input
																type="hidden" id="doctorPhone${row.doctorId }"
																value="${row.doctorPhone }"></td>
															<td class="col-md-2">${row.doctorRegNo }<input
																type="hidden" id="doctorRegNo${row.doctorId }"
																value="${row.doctorRegNo }"></td>
															<td class="col-md-1">
																<button id="btnEdit${row.doctorId}"
																	class="btn btn-xs btn-success"
																	onclick="edit(${row.doctorId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deleteDoctor(${row.doctorId})" value="DELETE">
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
		<%-- <input type="hidden" id="pageName"
				value="<%=request.getParameter("pagename")%>"></input>
			<div style="display: none; display: none;" id="divMyObj"></div>
			<div style="display: none;" id="divForFeesObj"></div>
			<div style="display: none;" id="divForTestObj"></div>
			<div style="display: none;" id="divForOpObj"></div>
			<div style="display: none;" id="divSpSpDisHide"></div>
			<div style="display: none;" id="SponsoredDetailsContent"></div>
			<input type='hidden' id='queryType' value='' /> --%>
		<script type="text/javascript">
				
			</script>
		<%@include file="Pharma_Footer.jsp"%>

	</section>
</body>
</html>
