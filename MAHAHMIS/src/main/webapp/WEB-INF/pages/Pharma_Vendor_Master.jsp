<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Vendor Payment | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<!--pharma_vendor_address.js <script type="text/javascript" src="js/registration.js"></script> -->
</head>
	<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_vendor.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_vendor_address.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script> 
<%@include file="pharma_header.jsp"%>

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
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
			
			
			$("#txtVendorCode").focus();
			
		});
</script>

<script type="text/javascript">
	onload = function() {
		fetchStateListForReg("state");
		fetchDistrictListForReg("district");
		fetchTalukaListForReg("taluka");
		//getSupplierlist();
		
	}
</script>
<script>
function validateData() 
{
	$('#rowcountAdd').val(0);
	var txtVendorCode= $('#txtVendorCode').val().toString().trim(); 
	var txtVendorName= $('#txtVendorName').val().toString().trim(); 
	var txtArea= $('#txtArea').val().toString().trim(); 
	var txtMobile= $('#txtMobile').val().toString().trim(); 
	var state= $('#stateId').val().toString().trim(); 
	 if($('#addresstable tr').length == 0){
	     alert("Please Enter atleast one address of vendor !!");
	     $('#txtLandline').focus();
	     return false;
     }
	 
	 if(state == ""||state=="null"||state=="undefined"){
	     alert("Please Enter State of Vendor !!");
	     return false;
     }
	
	if($('#txtVendorCode').val()!=null && $('#txtVendorCode').val()!="")
		{ 	if($('#txtVendorName').val()!=null && $('#txtVendorName').val()!="" && $('#stateId').val()!=null && $('#stateId').val()!="")
		   { 	
		/* 	if($('#txtAddress').val()!=null && $('#txtAddress').val()!="")
			   {  */
				/* if($('#txtArea').val()!=null && $('#txtArea').val()!="")
				   { 
					if($('#txtMobile').val()!=null && $('#txtMobile').val()!="")
					   { 
						 if($('#gstNo').val()!=null && $('#gstNo').val()!="")
						   {    */
							 if(txtVendorCode.length!=0 && txtVendorName.length!=0 && state.length!=0)
			                     {
						
								if($('#vendorId').val()!=null && $('#vendorId').val()!="" && $('#vendorId').val() > 0)
								   { 
									alert("Record Updated Successfully!");	
								     $('#vendorMasterForm').submit();
								   }
								   else
								      {     alert("Record Saved Successfully!");
								           $('#vendorMasterForm').submit();
								 	   		 	    
								       }
							   }
							 else
								{
								    alert("Can not insert empty record");
									window.location.href = "view";
								}
						   }
						
						 /* else
						  {
							alert("Enter Vendor GST No");
							 $('#gstNo').focus();
						  }	
					   } 
					else
						  {
							alert("Enter Vendor Mobile Number");
							 $('#txtMobile').focus();
						  }	
					 }
				else
				  {
					alert("Enter Vendor Area");
					 $('#txtArea').focus();
				  }	
				}
			 */
			/* else
			  {
				alert("Enter Vendor Address");
				 $('#txtAddress').focus();
			  }	
		   } */
		else
		  {
			alert("Enter Vendor Name and State" );
			 $('#txtVendorName').focus();
		  }	
		
		}
	else
	  {
		alert("Enter Vendor Code");
		 $('#txtVendorCode').focus();
	  }	
	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchVendor($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Vendor Name in Search Box");
	    $('#searchBox').focus();
	}

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
											<li>Vendor Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div style="margin-left: 10px;" class="li pull-right">
												<button onclick="hideVendorMasterDiv();" class="btn btn-xs btn-danger">View List</button>
											</div>
											
											<div style="margin-left: 9px;" class="li pull-right">
												<button class="btn btn-xs btn-success" onclick="validateData();" type="button"> Save </button>
												
											</div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Vendor Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Vendor Name"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onkeyup="searchVen()" /> <input
										type="hidden" id="hiddenId" />
<!-- onblur="splitVendorContent($('#searchBox').val())" -->
								</div>
								<div class='col-md-2-1'
									style='padding-top: 0%; margin-left: 10px;'>
									<!-- <input id='' type='button' value='Search' class='edit'
										onclick='validateSearch();' /> -->

									<!-- <script type="text/javascript">
										$("#searchBox").autocomplete({
											 source : function(request, response) {
											 
													var findingName = $("#searchBox").val();
													var inputs = [];
													inputs.push('findingName=' + findingName);
													var str = inputs.join('&');

													jQuery.ajax({
														async : true,
														type : "GET",
														data : str + "&reqType=AJAX",
														url : "autoSuggestionv",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															
															$("#vendorList").show();
															
															$("#vendorMaster").hide(1000);
															$("#vendorList").css({
																'height' : '500px',
																'width' : '100%',
																'overflow-y' : 'scroll',
																'max-height' : 'auto',
																'margin-left' : '2%',
																' margin-top' : '-9%'
															});
															setSupplierlist(r);
															/* var availableTags = [];
															for(var i=0;i<r.length;i++)
															{
																availableTags[i]=r[i].vendorName+"-"+r[i].vendorId;
																
															}
															response(availableTags); */
														}
													});
											 }																						
										});	
										</script> -->
								</div>
							</div>


							<div class="panel panel-default"
								style="margin-top: 9px; margin-bottom: 10px;">
								<div class="panel-body">
									<div id="vendorMaster" class="col-md-12-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">
										<form:form commandName="vendor" id="vendorMasterForm"
											action="../../pharmacy/vendor/save" method="post">
											<div class="col-md-12-1 center">
												<h4 id="title">Vendor Master</h4>
											</div>
											<div class="col-md-12-1 " style="margin-top: 0px;">
												<div class="col-md-6-1 " style="margin-top: 0px;">
													<div class="col-md-12-1 " style="margin-top: 0px;display: none">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Vendor Code:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															

															<form:input path="vendorCode" type="text"
																id="txtVendorCode" name="txtVendorCode"
																class="form-control input-SmallText"
																placeholder="Vendor Code" value="0" required="true" readonly="true"/>
															<!-- 	onblur="isUserName('txtVendorCode',0,100)"  -->
															<form:input path="vendorId" type="hidden" id="vendorId" />

														</div>

														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>

													</div>
													
													<div class="col-md-12-1 " style="margin-top: 9px;">

														<div class="col-md-3-1" style="margin-top: 9px;">
															<B>Vendor Name:</B>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															

															<form:input path="vendorName" type="text"
																id="txtVendorName" name="txtVendorName"
																class="form-control input-SmallText"
																placeholder="Vendor Name" required="true" />
															<!--  onblur="isAlphaWithSpace('txtVendorName',0,500)" -->

														</div>

														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>

													</div>
													<br>

												</div>
												<div class="col-md-6-1 " style="margin-top: 0px;">

													<div class="col-md-12-1 " style="margin-top: 0px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Contact Name:</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 9px;">
															
															<!-- <input  type="text" id="txtContactName"
																name="txtContactName"
																class="form-control input-SmallText"
																placeholder="Contact Name" required="true" /> -->
														
														<form:input path="vendorContactPerson" type="text"
																id="txtContactName" name="txtContactName"
																class="form-control input-SmallText"
																placeholder="Contact Name" required="true" />
														</div>

													</div>

													
													<div class="col-md-12-1 " style="margin-top: 5px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>PAN No:</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 9px;">

															<form:input path="vendorVatTin" type="text"
																id="txtVendorVatTin" name="txtvendorVatTin"
																class="form-control input-SmallText"
																placeholder="Pan No" required="true" />
															<!--   onblur="isNumber('txtVendorVatTin')"  -->
														</div>

													</div>

													<div class="col-md-12-1 " style="margin-top: 14px; display: none;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>L.B.T No:</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 9px;">

															<form:input path="vendorLbtNum" type="text"
																id="txtVendorLbtNum" name="txtvendorLbtNum"
																class="form-control input-SmallText"
																placeholder="LBT No" value="0" required="true" />
															<!-- onblur="isNumber('txtVendorLbtNum')" -->
														</div>

													</div>
													<div class="col-md-12-1 " style="margin-top: 26px; display: none;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>CST Tin:</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 9px;">

															<form:input path="vendorCstTin" type="text"
																id="txtVendorCstTin" name="txtVendorCstTin"
																class="form-control input-SmallText"
																placeholder="CST Tin" value="0"  required="true" />
															<!--  onblur="isNumber('txtVendorCstTin')" -->
														</div>

													</div>
													<div class="col-md-12-1 " style="margin-top: 9px; display: none;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Disc.%:</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 9px;">

															<form:input path="vendorDesc" type="text"
																id="txtVendorDesc" name="txtVendorDesc"
																class="form-control input-SmallText"
																placeholder="Disc %" maxlength="2" required="true"
																onblur="isNumber('txtVendorDesc')" />

														</div>

													</div>
													<div class="col-md-12-1 " style="margin-top: 9px; display: none;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>MSCDA PArtyCode:</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 9px;">

															<form:input path="vendorMscdaPartyCode" type="text"
																id="txtVendorMscdaPartyCode"
																name="txtVendorMscdaPartyCode"
																class="form-control input-SmallText"
																placeholder="MSCDA Party Code" value="0"  required="true" />

														</div>

													</div>

												</div>
												<!-- new ui for state city and district  -->

												<div id="divLine2" class="  col-md-12"
													style="margin-left: 0%; margin-top: -1%;">
													
													<div class="divide-20"></div>

													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Landline:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<!-- <input type="text" id="txtLandline" name="txtLandline"
															class="form-control input-SmallText"> -->
															<input 
																type="text" id="txtLandline" name="txtLandline"
																class="form-control input-SmallText"
																placeholder="Landline" maxlength="11" value="0"
																 />
																

														</div>
													</div>

													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Mobile:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															
															<input 
																type="text" id="txtMobile" name="txtMobile"
																class="form-control input-SmallText"
																placeholder="Mobile" maxlength="10" value="0"
																onchange="isMobileNum('txtMobile',10,10);" />
														</div>

														

													</div>
													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Email Id:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															

															<input 
																type="text" id="txtEmailId" name="txtEmailId"
																class="form-control input-SmallText"
																placeholder="Email ID" 
																onblur="ValidateEmail('txtEmailId')" />
															
														</div>

													</div>



													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>GST No:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<input  type="text"
																id="gstNo" name="gstNo" value="0"
																class="form-control input-SmallText"
																placeholder="gst No"  />

														</div>

													</div>
													
													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>City:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<select  id="talukaId"
																name="talukaId" class="form-control input-SmallText"
																placeholder="city" required="true"
																onchange="setCityAndDistrictAndStateForRegistration(this.value,'local')" >
																</select>

														</div>

													</div>
													
													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>District:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<select 
																id="districtId" name="districtId"
																class="form-control input-SmallText" required="true"
																onchange="setTalukaAndCityAndDistrictForRegistration(this.value,'local')" >
																</select>

														</div>

													</div>
													
													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>State:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<select  id="stateId"
																name="stateId" class="form-control input-SmallText"
																placeholder="state" required="true"
																onchange="setTalukaAndCityAndDistrictForRegistration(this.value,'local')">
																</select>

														</div>

													</div>
													
													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Pincode:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<input  type="text"
																id="pincode" name="pincode" value="0"
																class="form-control input-SmallText"
																placeholder="pincode" maxlength="6" />

														</div>

													</div>
													
													
													<br> <br>
													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Area:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															
															<input 
																type="text" id="txtArea" name="txtArea"
																class="form-control input-SmallText" placeholder="Area" value="-"
																 />
															
														</div>

														
													</div>
													<div class="col-md-4-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Address:</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<textarea 
																id="txtAddress" class="col-md-12-1"
																placeholder="Address" value="-" >
																</textarea>
															
														</div>

													</div>
													
													<div class="col-md-4" style="margin-top: 9px;">
														<div class="row" style="width: 100px;">
															<button type="button" class="btn btn-xs btn-success"
																	onclick="AddData();">
																	ADD
														    </button>
															
														</div>
													</div>

</div>

												



												<div id="divLine2" class="  col-md-12"
													style="margin-left: 0%; margin-top: -1%;">
													
													<div class="divide-20"></div>


												</div>

												<div class="box-body"
													style="height: 100px; overflow-y: scroll; border: 1px solid #ddd;">
													<div  class='col-sm-12-1' style="margin-top: 1%;">
														<table id="addressDiv" class='table table-bordered' style='width: 100%;'
															>
															<thead class='cf' id='popupheader'>
																<tr>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>#</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'>Address</th>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>City Name</div></th>

																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>District Name</div></th>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>State Name</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>GST No</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Phone Number</div></th>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Email ID</div></th>


																</tr>
															</thead>

															<tbody id="addresstable">



															</tbody>

														</table>
													</div>
												</div>

												
											</div>
										</form:form>
									</div>

									<div id="vendorList"
										class="col-md-12-1 " style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto; display: none;">
										
										<div class="tab-content">
										<div style="margin-top: 10px;" class="col-md-12-1">
											<button onclick="showVendorMasterDiv();" class="btn btn-xs btn-success">Add New</button>
											
										</div>
                                            <div id="suplierDiv" class="tab-pane fade in active">
											
											
										
											<table
												class="table table-hover cf "
												style="Width: 100%; margin-top: 5px;">
												<thead class="cf" style="background: white;">
													<tr>
													
														<th style="height: 21.5px;" class="col-md-1"><div>Sr
																No</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Vendor
																Id</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Supplier
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Contact
																Person</div></th>
														<!-- <th style="height: 21.5px;" class="col-md-2"><div>Vendor
																Code</div></th> -->
														
														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Vendor
																Add</div></th>
														<!-- <th style="height: 21.5px;" class="col-md-1"><div>Sr
																No</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Vendor
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Vendor
																Code</div></th>
														
														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Vendor
																Add</div></th> -->
													</tr>
												</thead>

												<tbody id="divVendorList">
												<c:forEach items="${vendorMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="vendorId${row.vendorId }"
																value="${row.vendorId }">
															</td>
															
															<td class="col-md-1">${row.vendorId} <input
																type="hidden" id="vendorId${row.vendorId}"
																value="${row.vendorId }">
															</td>
															
															<td class="col-md-2">${row.vendorName}<input
																type="hidden" id="vendorName${row.vendorId}"
																value="${row.vendorName }"></td>
															
															<td class="col-md-2">${row.vendorContactPerson} <input 
															type="hidden" id="vendorContactPerson${row.vendorId }"
																value="${row.vendorContactPerson }">
															</td>

															<td style="display: none" id="vendorCode">${row.vendorCode
																} <input type="hidden" id="vendorCode${row.vendorId}"
																value="${row.vendorCode }">
															</td>
	
																
														<td style="display: none" id="vendorContactPerson">${row.vendorContactPerson
																} <input type="hidden"
																id="vendorContactPerson${row.vendorId }"
																value="${row.vendorContactPerson }">
															</td>
															<td style="display: none" id="vendorDrugLicNum">${row.vendorDrugLicNum
																} <input type="hidden"
																id="vendorDrugLicNum${row.vendorId }"
																value="${row.vendorDrugLicNum }">
															</td>
															<td style="display: none" id="vendorVatTin">${row.vendorVatTin
																} <input type="hidden" id="vendorVatTin${row.vendorId }"
																value="${row.vendorVatTin }">
															</td>

															<td style="display: none" id="vendorLbtNum">${row.vendorLbtNum
																} <input type="hidden" id="vendorLbtNum${row.vendorId }"
																value="${row.vendorLbtNum }">
															</td>

															<td style="display: none" id="vendorCstTin">${row.vendorCstTin
																} <input type="hidden" id="vendorCstTin${row.vendorId }"
																value="${row.vendorCstTin }">
															</td>
															<td style="display: none" id="vendorDesc">${row.vendorDesc
																} <input type="hidden" id="vendorDesc${row.vendorId }"
																value="${row.vendorDesc }">
															</td>
															<td style="display: none" id="vendorMscdaPartyCode">${row.vendorMscdaPartyCode
																} <input type="hidden"
																id="vendorMscdaPartyCode${row.vendorId }"
																value="${row.vendorMscdaPartyCode }">
															</td>

															<td class="col-md-1">
																<button id="btnEdit${row.vendorId}"
																	class="btn btn-xs btn-success"
																	onclick="editVendor(${row.vendorId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deleteVendor(${row.vendorId})" value="DELETE">
																	<i class="fa fa-trash-o"></i>
																</button>
															</td>
															
															<td class="col-md-1"> <a href="#venAdd${(count.index)}" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle">
																<button>
																	<i class="fa fa-chevron-down"></i>
																</button></a>
															
															<div id="venAdd${(count.index)}" class="panel-collapse collapse"
													style="height: 0px;">
													<div  class='panel-body'>
														<table id="vendoraddress" class='table table-hover' >
															<thead>
																<tr>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>#</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'>Address</th>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>City Name</div></th>

																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>District Name</div></th>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>State Name</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>GST No</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Phone Number</div></th>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Email ID</div></th>


																</tr>
															</thead>

															<tbody id="addresstable">

                                            <c:forEach items="${row.vendorAddresses}" var="vendor" varStatus="count">
														<tr>
															<td class="col-md-1">${(count1.index)+1} <input
																type="hidden" id="vendorAddressId${vendor.vendorAddressId }"
																value="${vendor.vendorAddressId }">
															</td>
															
															<td class="col-md-1">${vendor.vendorAddress} <input
																type="hidden" id="vendorAddress${vendor.vendorAddress}"
																value="${vendor.vendorAddressId }">
															</td>
															
															<td class="col-md-2">${vendor.city}<input
																type="hidden" id="city${vendor.city}"
																value="${vendor.vendorAddressId }"></td>
																
														<td class="col-md-2">${vendor.district} <input 
															type="hidden" id="district${vendor.district }"
																value="${vendor.vendorAddressId }">
															</td>
															
															<td class="col-md-2">${vendor.state} <input 
															type="hidden" id="state${vendor.state }"
																value="${vendor.vendorAddressId }">
															</td>
															
															
															<td class="col-md-2">${vendor.gstNo} <input 
															type="hidden" id="gstNo${vendor.gstNo }"
																value="${vendor.vendorAddressId }">
															</td>
															
															<td class="col-md-2">${vendor.vendorMobileNumber} <input 
															type="hidden" id="vendorMobileNumber${vendor.vendorMobileNumber }"
																value="${vendor.vendorAddressId }">
															</td>
															
															<td class="col-md-2">${vendor.vendorEmailId} <input 
															type="hidden" id="vendorEmailId${vendor.vendorEmailId }"
																value="${vendor.vendorAddressId }">
															</td>

															<td style="display: none" id="vendorAddressId">${vendor.vendorAddressId
																} <input type="hidden" id="vendorAddressId${vendor.vendorAddressId}"
																value="${vendor.vendorAddressId }">
															</td>
															<td style="display: none" id="vendorAddress">${vendor.vendorAddress
																} <input type="hidden" id="vendorAddress${row.vendorAddress}"
																value="${vendor.vendorAddressId }">
															</td>
															<td style="display: none" id="vendorArea">${vendor.vendorArea
																} <input type="hidden" id="vendorArea${vendor.vendorArea}"
																value="${vendor.vendorAddressId }">
															</td>
															<td style="display: none" id="city">${vendor.city
																} <input type="hidden" id="city${vendor.city}"
																value="${vendor.vendorAddressId }">
															</td>
															<td style="display: none" id="state">${vendor.state
																} <input type="hidden" id="state${vendor.state}"
																value="${vendor.vendorAddressId }">
															</td>
															
															<td style="display: none" id="gstNo">${vendor.gstNo
																} <input type="hidden" id="gstNo${vendor.gstNo}"
																value="${vendor.vendorAddressId }">
															</td>
															<td style="display: none" id="vendorEmailId">${vendor.vendorEmailId
																} <input type="hidden" id="vendorEmailId${vendor.vendorEmailId}"
																value="${vendor.vendorAddressId }">
															</td>
															<td style="display: none" id="vendorMobileNumber">${vendor.vendorMobileNumber
																} <input type="hidden" id="vendorMobileNumber${vendor.vendorMobileNumber}"
																value="${vendor.vendorAddressId }">
															</td>
															<td style="display: none" id="vendorLandline">${vendor.vendorLandline
																} <input type="hidden" id="vendorLandline${vendor.vendorLandline}"
																value="${vendor.vendorAddressId }">
															</td>
															
															</tr>
														</c:forEach>

															</tbody>

														</table>
													</div>
												</div>
															
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
		</div>
		<input type="hidden" id="AddBTN" value="N">
		<input type="hidden" id="hiddenVendorAddId" value="0">
		<input type="hidden" id="rowcountAdd" value="0">
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