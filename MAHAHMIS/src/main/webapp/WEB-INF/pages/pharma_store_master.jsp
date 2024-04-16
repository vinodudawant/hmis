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

<%-- <link rel="stylesheet" type="text/css"
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
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_store.js"/>"></script> --%>

<%-- <%-- <script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script> --%>
<%-- <script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script> --%>
<!-- CUSTOM SCRIPT -->
<%-- <script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>  --%>
<!--TIMEPEACKER -->
<%-- <link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/timepeacker/jquery.datetimepicker.css"/>" />
<script
	src="<c:url value="/pharmacy/resources/timepeacker/jquery.datetimepicker.js"/>"></script> --%>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_store.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script> 
<%@include file="pharma_header.jsp"%>
</head>
<script>
		jQuery(document).ready(function() {		
			App.setPage("Pharma_Bank_Master");  //Set current page
			App.init(); //Initialise plugins and elements
			
			$('#shiftStartTime').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
			
			$( "#txtStoreAuthentication" ).prop( "checked", false );
			
			$('#shiftEndTime').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
			
			
		});
</script>
<script>
function reset () {
	$("#toggleCSS").attr("href", "<c:url value="/pharma-resources/alertify/alertify.default.css"/>");
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
	var txtStoreName= $('#txtStoreName').val().toString().trim(); 
	
	
	if($('#txtStoreName').val()!=null && $('#txtStoreName').val()!="")
	{
	if($('#txtStoreNumber').val()!=null && $('#txtStoreNumber').val()!="" && $('#txtStoreLocation').val()!=null && $('#txtStoreLocation').val()!="" && $('#txtStoreConPerson').val()!=null 
			&& $('#txtStoreConPerson').val()!="" && $('#txtCodeName').val()!=null && $('#txtCodeName').val()!="" && $('#txtstoreLicenseNumber').val()!=null && $('#txtstoreLicenseNumber').val()!="")
		{ 
		if(txtStoreName.length!=0)
			{
						 if($('#storeId').val()!=null  && $('#storeId').val()!="")
							{
							 setAuthenticationUsers();
					  	       $('#storeMasterForm').submit();
					  	 	  alertify.success("Record Updated Successfully!"); 
							 /*  $('#storeMasterForm').submit(); 
							 saveEditUserAuthentication(); */
							}
						  else
						  {    
						        $('#storeMasterForm').submit();
						        alertify.success("Record Saved Successfully!");
						 	 		 	    
						  }
			}
		else
			{
			alertify.error("Can not insert empty record");
			window.location.href = "view";
			}
		}
	else
	  {
		alertify.error("Enter All fields");
		 $('#txtStoreNumber').focus();
	  }	
	}
	
		
}

function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchStoreforMRN($("#hiddenId").val());
	}
	else
	{	
		alert("Enter store Name in Search Box");
	    $('#searchBox').focus();
	}
}

function editStoreAuthentication(id)
{
	var inputs = [];
	inputs.push('storeId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/store/getStoreById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			setEditStoreAuthentication(r);
		}
	});
	return true;
}

function setEditStoreAuthentication(result)
{
	var storeName=result[0].storeName;
	$("#txtStoreName").val(storeName);
	$("#txtStoreName").attr("readonly",true);
	
	var storeNumber=result[0].storeNumber;
	$("#txtStoreNumber").val(storeNumber);
	
	var storeLocation=result[0].storeLocation;
	$("#txtStoreLocation").val(storeLocation);
	
	var storeContactPerson=result[0].storeContactPerson;
	$("#txtStoreConPerson").val(storeContactPerson);
	
	var storeCodeName=result[0].storeCodeName;
	$("#txtCodeName").val(storeCodeName);
	
	var storeLicenseNumber =result[0].storeLicenseNumber;
	$('#txtstoreLicenseNumber').val(storeLicenseNumber);
	
	var storeId=result[0].storeId;
	$('#storeId').val(storeId);
	
	
	getUserListCondition('edit');
	
	var users=[];
	users=result[0].storeUserId.split(",");
	
	setUserAuthentication(users);
	
}

function saveEditUserAuthentication()
{
	
	var users=null;
	$("#users option:selected").each(function(){
    
    if(users==null)
      users=this.value;
    else 
       users=users+","+(this.value);
	});

	var inputs = [];
	inputs.push('storeId=' + $('#storeId').val());
	inputs.push('users=' + users);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/store/editStoreAuthentication",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert("Record Save Succesfully");
		}
	});
	return true;
}


function setUserAuthentication(users)
{
		alertify.success("Editing Access!");
		var n = 1;
		
		setTimeout(function() {
			for(var i=0;i<users.length;i++)
			{
					$("#users option[value='" + users[i] + "']").prop({
						"selected" : true
					});
			}
			$("#txtStoreAuthentication").prop("checked",true);
		}, 100);
		
		
}

</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
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
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a
												href="../../Dashboard.jsp">Home</a></li>
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Shift Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="validateData();">Save</button>
												<!-- <button class="btn btn-xs btn-danger">Discard</button> -->
											</div>
										</ul>

									</div>
								</div>
							</div>

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Store Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Store Name"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitContent($('#searchBox').val());" /> <input
										type="hidden" id="hiddenId" />
									<!-- ,isAlphaWithSpace('searchBox',0,25) -->
								</div>
								<div class='col-md-2-1'
									style='padding-top: 0%; margin-left: 10px;'>
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
														url : "../../pharmacy/store/autoSuggestionStore",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].storeName+"-"+r[i].storeId;
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

							<div class="">
								<div class="panel-body">
									<div id="shiftMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px;">


										<div class="panel panel-primary">
											<div class="panel-heading" style="background-color: #d9edf7;">
												<h3 class="panel-title">
													<b>Store Master</b>
												</h3>
											</div>
											<div class="panel-body">
												<form:form commandName="store" id="storeMasterForm"
													action="../../pharmacy/store/save" method="post">

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Store Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="storeName" type="text" autocomplete="off"
																id="txtStoreName" name="txtStoreName"
																placeholder="Store Name"
																class="form-control input-SmallText"
																onblur="isName('txtStoreName')" />

															<form:input type="hidden" id="storeId" path="storeId" />
															<!-- onblur="isAlphaWithSpace('txtBankName',0,1000)" -->

														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>


													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Store Number</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="storeNumber" type="text" autocomplete="off"
																id="txtStoreNumber" name="txtStoreNumber"
																placeholder="Store Number"
																class="form-control input-SmallText" />


															<!-- onblur="isAlphaWithSpace('txtBankName',0,1000)" -->

														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>

													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Store Location</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="storeLocation" type="text" autocomplete="off"
																id="txtStoreLocation" name="txtStoreLocation"
																placeholder="Store Location"
																class="form-control input-SmallText" />
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Contact Person</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="storeContactPerson" type="text" autocomplete="off"
																id="txtStoreConPerson" name="txtStoreConPerson"
																placeholder="Contact Person"
																class="form-control input-SmallText" />
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Code Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="storeCodeName" type="text" autocomplete="off"
																id="txtCodeName" name="txtCodeName"
																placeholder="Code Name"
																class="form-control input-SmallText" />
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>License Number</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="storeLicenseNumber" type="text" autocomplete="off"
																id="txtstoreLicenseNumber" name="txtstoreLicenseNumber"
																placeholder="License Number"
																class="form-control input-SmallText" />
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Store Lock</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:checkbox path="storeLock" id="txtStoreLock"
																name="txtStoreLock" class="form-control input-SmallText"
																value="0" />
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Authentication</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:checkbox path="storeAuthentication"
																id="txtStoreAuthentication"
																name="txtStoreAuthentication"
																class="form-control input-SmallText" value="1"
																onclick="getUserListCondition('add')" />
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-12-1" style="margin-top: 9px;"
															id='userData'></div>
													</div>

													<form:hidden path="storeUserId" id='storeUserId' value='0' />


												</form:form>
											</div>
										</div>
									</div>
									<%-- <div class="panel panel-primary col-md-4-1">
										<div class="panel-heading" style="background-color: #d9edf7">
											<h3 class="panel-title">
												<strong>Store Master</strong>
											</h3>
										</div>
										<div class="panel-body ">
											<div id="storeMaster" class="col-md-12-1"
												style="height: 100%; margin-top: 0%; padding-left: 20px;>
												
												<form:form commandName="store" id="storeMasterForm"
											action="/EhatEnterprise/pharmacy/store/save" method="post">
											<div class="col-md-12-1" style="margin-top: 0px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Store Name</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="storeName" type="text" id="txtStoreName"
														name="txtStoreName" placeholder="Shift Type"
														class="form-control input-SmallText" />

													
													<!-- onblur="isAlphaWithSpace('txtBankName',0,1000)" -->
												<form:hidden path="storeId" id="storeId" />
												</form:form>
											</div>

											<div class='col-md-1-1' style='margin-top: 9px; color: red;'>
												<b> *</b>
											</div>

										</div>
									</div> --%>

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
														<th style="height: 21.5px;" class="col-md-1"><div>Sr
																No</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Store
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Authenticate
																person</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Edit</div></th>
														<!-- <th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th> -->
													</tr>

												</thead>

												<tbody id="divSubStoreMasters">
													<c:forEach items="${subStoreMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="storeId${row.storeId }"
																value="${row.storeId }"></td>
															<td class="col-md-2">${row.storeName } <input
																type="hidden" id="storeName${row.storeId }"
																value="${row.storeName }"></td>


															<td class="col-md-2">${row.storeUserId } <input
																type="hidden" id="storeUserId${row.storeId }"
																value="${row.storeUserId }"> <input
																type="hidden" id="storeAuthentication${row.storeId }"
																value="${row.storeAuthentication }">

															</td>


															<td class="col-md-2">
																<button value="EDIT"
																	onclick="editStoreAuthentication(${row.storeId })"
																	class="btn btn-xs btn-success" id="">
																	<i class="fa fa-edit"></i>
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

				<div class="ajaxmodal">
					<!-- Place at bottom of page -->
				</div>
				<script type="text/javascript">
			</script>

				<%@include file="Pharma_Footer.jsp"%>
	</section>
</body>
</html>