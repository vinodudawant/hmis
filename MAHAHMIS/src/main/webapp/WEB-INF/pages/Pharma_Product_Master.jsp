<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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

<%@include file="pharma_header.jsp"%>

<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<link
	href="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
<!-- <link type="text/css" rel="stylesheet" href="pharmacy/resources/app_js/css/themes/smoothness/jquery-ui-1.7.1.custom.css" />
	<link type="text/css" href="pharmacy/resources/app_js/css/ui.multiselect.css" rel="stylesheet" />
	<link rel="stylesheet" href="pharmacy/resources/app_js/css/common.css" type="text/css" />
	<script type="text/javascript" src="pharmacy/resources/app_js/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="pharmacy/resources/app_js/js/jquery-ui-1.8.custom.min.js"></script>
	<script type="text/javascript" src="pharmacy/resources/app_js/js/plugins/localisation/jquery.localisation-min.js"></script>
	<script type="text/javascript" src="pharmacy/resources/app_js/js/plugins/tmpl/jquery.tmpl.1.1.1.js"></script>
	<script type="text/javascript" src="pharmacy/resources/app_js/js/plugins/blockUI/jquery.blockUI.js"></script>
	<script type="text/javascript" src="pharmacy/resources/app_js/js/ui.multiselect.js"></script> -->

<!-- JQUERY -->
<script
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-jtemplates.js"/>"></script>


<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_product.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script> 
<style type="text/css">
.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('../../pharma-resources/resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
<script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
			showProductMasterDiv();
			$('#txtProduct').focus();
			
			$('#reset').on('click', function() {
				$("#productMasterForm").closest('form').find("input[type=text], textarea").val("");
				$('#txtProduct').focus();
			});
		});
		
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
		
</script>


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

function validateData() 
{
	var isviewListOfProduct=$("#isviewListOfProduct").val();
	if (isviewListOfProduct == "") {
		alert("You Can't save From here you have to fill the product details!!");
		return false;
	}
	var hsn=$("#hsnMaster").val();
    var tax=$("#taxMaster").val();
	
	if(hsn=="--- Select ---"|| hsn==null || hsn=="" || hsn=="null" || hsn==0){
		alert("Please Select HSN!!");
		return false;
	}
	if(tax=="--- Select ---" || tax==null || tax=="" || tax=="null" || tax==0){
		alert("Please Select GST CODE!!");
		return false;
	}
	
	if($('#txtProduct').val()!=null && $('#txtProduct').val()!="")
		{ 
		if($('#txtPreparation1').val()!=null && $('#txtPreparation1').val()!="")
		{
		if($('#txtPreparation').val()!=null && $('#txtPreparation').val()!="" && $('#txtPreparation').val()!='0')
		 { 
		if($('#txtCompany1').val()!=null && $('#txtCompany1').val()!="")
		{
		if($('#txtCompany').val()!=null && $('#txtCompany').val()!="" && $('#txtCompany').val()!='0')
		   { 
			 if($('#txtPacking1').val()!=null && $('#txtPacking1').val()!="")
			{ 
			if($('#txtPacking').val()!=null && $('#txtPacking').val()!="" && $('#txtPacking').val()!='0' )
			   { 
				if($('#txtCategory1').val()!=null && $('#txtCategory1').val()!="")
				{
				if($('#txtCategory').val()!=null && $('#txtCategory').val()!="" && $('#txtCategory').val()!='0' )
				   { 
					if($('#txtUOM1').val()!=null && $('#txtUOM1').val()!="")
					{
					if($('#txtUOM').val()!=null && $('#txtUOM').val()!="" && $('#txtUOM').val()!='0' )
					   { 
						
						if($('#txtUnit').val()!=null && $('#txtUnit').val()!="")
						   { 
							
								if($('#txtDrug1').val()!=null && $('#txtDrug1').val()!="")
								{
								if($('#txtDrug').val()!=null && $('#txtDrug').val()!="" && $('#txtDrug').val()!='0')
								   {
									if($('#txtShelf1').val()!=null && $('#txtShelf1').val()!="")
									{
									if($('#txtShelf').val()!=null && $('#txtShelf').val()!="" && $('#txtShelf').val()!='0')
									   {
										
									if($('#selectVendor').val()!=null && $('#selectVendor').val()!="")
									   {   
										if($('#txtProductId').val()!=null && $('#txtProductId').val()!="")
										   {   
											  if(checkMinLeval()==true)
											  {
										if($('#txtStrength').val()!=0)
											{
											 alert("Record Updated Successfully!");	
								             $('#productMasterForm').submit();
											}
										else
										  {
										  $('#txtStrength').val(1);
										    alert("Record Saved Successfully!");
									        $('#productMasterForm').submit();
										  }
										
											  }
										   }
										 else
											  {    if(checkMinLeval()==true)
												  {
												  if($('#txtStrength').val()!=0)
												 {
											    
											     alert("Record Saved Successfully!");
										         $('#productMasterForm').submit();
												 }
												  else
													  {
													    $('#txtStrength').val(1);
													    alert("Record Saved Successfully!");
												        $('#productMasterForm').submit();
													  }
												  }
	 	    					 	      }
									   }
									 else
									  {
										alert("Enter all mandatory fields");
										 $('#selectVendor').focus();
									  }	
								   }
									else
									{
										alert("Shelf name is not available");
										 $('#txtShelf').focus();
										 $('#txtShelf').val('');
									}	
								   }
									else
									{
										alert("Enter all mandatory fields");
										 $('#txtShelf1').focus();
									}	
								   }
																										
									
								else
								  {
									alert("Drug name is not available");
									 $('#txtDrug1').focus('');
									 $('#txtDrug1').val('');
								  }	
							   }
								else
								  {
									alert("Enter all mandatory fields");
									 $('#txtDrug1').focus();
								  }	
							   }			
						
						else
						  {
							alert("Enter all mandatory fields");
							 $('#txtUnit').focus();
						  }	
					   }
					else
					  {
						alert("UOM is not available");
						 $('#txtUOM1').focus('');
						 $('#txtUOM1').val('');
					  }	
				   }
					else
						  {
							alert("Enter all mandatory fields");
							 $('#txtUOM1').focus();
						  }	
					 }
				
				else
				  {
					alert("Category name is not available");
					 $('#txtCategory1').focus('');
					 $('#txtCategory1').val('');
				  }	
				}
				else
				  {
					alert("Enter all mandatory fields");
					 $('#txtCategory1').focus();
				  }	
				}
				
			
			 else
			   {
				alert("Packing name is not available");
				 $('#txtPacking1').focus('');
				 $('#txtPacking1').val('');
			  }  
		   }
		
			else
			  {
				alert("Enter all mandatory fields");
				 $('#txtPacking1').focus();
			  }	
		   }
			
		else
		  {
			alert("Company name is not available");
			$('#txtCompany1').focus('');
			 $('#txtCompany1').val('');
		  }	
		
		}
			else
			  {
				alert("Enter all mandatory fields");
				 $('#txtCompany1').focus();
			  }	
			
			}
		else
		  {
			alert("Preparation name is not available");
			$('#txtPreparation1').focus('');
			 $('#txtPreparation1').val('');
		  }	
		
		}
			else
			  {
				alert("Enter all mandatory fields");
				 $('#txtPreparation1').focus();
			  }	
			
			}		
			
		
 		
	else
	  {
		alert("Enter all mandatory fields");
		 $('#txtProduct').focus();
	  }	
	
}

function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchProduct($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Product Name in Search Box");
	    $('#searchBox').focus();
	}

}
function checkMinLeval()
{
	var min=  parseInt($('#txtMinimumLvl').val());
	var max=  parseInt($('#txtMaximumLvl').val());
	if(min>max)
		{
		alert("Minimum level should be less than maximum level");
		$('#txtMinimumLvl').val('');
		$('#txtMaximumLvl').val('');
		return false;
		}
	return true;
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
											<li><i class="fa fa-home"></i> <a
												href="../../Dashboard.jsp">Home</a></li>
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Product Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success"
													onclick="validateData();">Save</button>
												<!-- <button class="btn btn-xs btn-warning">Print</button>
									<button class="btn btn-xs btn-danger">Discard</button> -->
											</div>


											<div class="li pull-right" style='margin-left: 10px;'>
												<button class="btn btn-xs btn-danger" type="button"
													id="reset">
													Clear<i class="fa fa-eraser"></i>
												</button>
											</div>

											<div class="li pull-right" style='margin-left: 10px;'>
												<button class="btn btn-xs btn-danger"
													onclick="hideProductMasterDiv();">View List</button>
											</div>



										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->

							<!-- <div class="divide-40"></div> -->
							<div class="col-md-12-1" style="margin-top: -2%">
								<b>Product Master</b>
							</div>
							<div class="row">
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
								<div class="panel-body col-md-12-1">
									<div class="panel-body">

										<div id="productMaster" class="col-md-4-1"
											style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">

											<form:form name="product" commandName="product"
												id="productMasterForm" action="save" method="post"
												enctype="multipart/form-data">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<!-- <div class="col-md-7-1" style="margin-top: 9px;"> -->
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Product/Brand Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="productName" type="text"
																id="txtProduct" name="txtProduct"
																class="form-control input-SmallText"
																placeholder="Product/Brand Name" required="true" />
															<!-- 	onblur="isProductName('txtProduct',0,10)"  -->

															<form:input path="productId" type="hidden"
																id="txtProductId" />

															<form:input path="productCreatedBy" type="hidden"
																id="txtCreatedBy" />

															<form:input path="productIp" type="hidden"
																id="txtProductIp" />
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Short Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="productShortName" type="text"
																id="txtShortName" name="txtShortName"
																class="form-control input-SmallText"
																placeholder="Short Name" required="true" />
															<!--  onblur="isName('txtShortName',0,10)" -->
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Preparation Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<input type="text" id="txtPreparation1"
																class="ui-autocomplete-input form-control input-SmallText"
																placeholder="Preparation" required
																onchange="setPreparation();"
																onblur="splitPreparationContent($('#txtPreparation1').val())" />
															<!--  ,isName('txtPacking1',0,25); -->
															<form:input path="preparationMaster.preparationId"
																type="hidden" id="txtPreparation" name="txtPreparation"
																value='0' />


															<script type="text/javascript">
																$(
																		"#txtPreparation1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#txtPreparation1")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/preparation/autoSuggestionPreparationNames",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].preparationName
																													+ "-"
																													+ r[i].preparationId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>

														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Strength/Capacity</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<input type="text" id="txtStrength1"
																class="ui-autocomplete-input form-control input-SmallText"
																placeholder="Strength/Capacity" required
																onchange="setStrength();"
																onblur="splitStrengthContent($('#txtStrength1').val());" />
															<!--  ,isName('txtPacking1',0,25); -->
															<form:input path="strengthMaster.strengthId"
																type="hidden" id="txtStrength" name="txtStrength"
																value='1' />


															<script type="text/javascript">
																$(
																		"#txtStrength1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#txtStrength1")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/strength/autoSuggestionStrengthNames",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].strengthName
																													+ "-"
																													+ r[i].strengthId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>

														</div>
													</div>



													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Company </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<div class="col-md-8-1" style="margin-top: 9px;">
																<input type="text" id="txtCompany1"
																	class="ui-autocomplete-input form-control input-SmallText"
																	placeholder="Company" required onchange="setCom();"
																	onblur="splitCompanyContent($('#txtCompany1').val())">

																<form:input path="companyMaster.compId" type="hidden"
																	id="txtCompany" value='0' />
																<script type="text/javascript">
																	$(
																			"#txtCompany1")
																			.autocomplete(
																					{
																						source : function(
																								request,
																								response) {

																							var findingName = $(
																									"#txtCompany1")
																									.val();
																							var inputs = [];
																							inputs
																									.push('letter='
																											+ findingName);
																							var str = inputs
																									.join('&');

																							jQuery
																									.ajax({
																										async : true,
																										type : "GET",
																										data : str
																												+ "&reqType=AJAX",
																										url : "../../pharmacy/company/autoSuggestionCompanyNames",
																										timeout : 1000 * 60 * 5,
																										catche : false,
																										error : function() {
																											alert('error');
																										},
																										success : function(
																												r) {
																											var availableTags = [];
																											for ( var i = 0; i < r.length; i++) {
																												availableTags[i] = r[i].compName
																														+ "-"
																														+ r[i].compId+"-"+r[i].compShortName;
																											}
																											response(availableTags);
																										}
																									});
																						}
																					});
																</script>
																<div class='col-md-1-1 center'
																	style='margin-top: -14px; margin-left: 203px; color: red;'>
																	<b> *</b>
																</div>
															</div>
															<div class="col-md-3-1" style="margin-top: 9px;">
																<form:input path="" type="text" id="txtCompany2"
																	name="txtCompany2" class="form-control input-SmallText"
																	placeholder="Company" disabled="true" />
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Packing</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<input type="text" id="txtPacking1"
																class="ui-autocomplete-input form-control input-SmallText"
																placeholder="Packing" required onchange="setPack();"
																onblur="splitPacking($('#txtPacking1').val());">
															<!--  ,isName('txtPacking1',0,25); -->
															<form:input path="packingMaster.packId" type="hidden"
																id="txtPacking" name="txtPacking" value='1' />


															<script type="text/javascript">
																$(
																		"#txtPacking1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#txtPacking1")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/packing/autoSuggestionPackingNames",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										//alert(r);
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].packType
																													+ "-"
																													+ r[i].packId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Category</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<input type="text" id="txtCategory1"
																class="ui-autocomplete-input form-control input-SmallText"
																placeholder="Category" required onchange="setCat();"
																onblur="splitCategory($('#txtCategory1').val());">
															<!--  ,isAlphaWithDigitSpace('txtCategory1',0,25) -->
															<form:input path="categoryMaster.catId" type="hidden"
																id="txtCategory" name="txtCategory" value='1' />

															<script type="text/javascript">
																$(
																		"#txtCategory1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var findingName = $(
																								"#txtCategory1")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');
																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/category/autoSuggestionCategoryNames",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].catName
																													+ "-"
																													+ r[i].catId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<!-- <div class="col-md-7-1" style="margin-top: 9px;"> -->
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> UOM</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<input type="text" id="txtUOM1"
																class="ui-autocomplete-input form-control input-SmallText"
																placeholder="UOM" required onchange="setUom();"
																onblur="splitUOMContent($('#txtUOM1').val())">
															<!--  ,isAlphabet('txtUOM1',0,25); -->
															<form:input path="uomMaster.uomId" type="hidden"
																id="txtUOM" name="txtUOM" value='0' />

															<script type="text/javascript">
																$("#txtUOM1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var findingName = $(
																								"#txtUOM1")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');
																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/uom/autoSuggestionUomNames",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].uomName
																													+ "$$"
																													+ r[i].uomId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Unit</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="productUnit" type="text" id="txtUnit"
																name="txtUnit" class="form-control input-SmallText"
																placeholder="Unit" required="true"
																onblur="isFloatingPoint('txtUnit',0,100)" />
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> HSN</b>
														</div>


														<div class='col-md-6-1'
															style='margin-top: 9px; color: red;'>
														
															<form:select path="hsnMaster.hsnId" id="hsnMaster" onchange="setHsn()">
																<form:option value="0" label="--- Select ---"/>
																<c:forEach var="hsn" items="${hsnMasters}">
																	<form:option value="${hsn.hsnId}">
																		<c:out value="${hsn.hsnNo}" />
																	</form:option>
																</c:forEach>
															</form:select>
															<form:input type="hidden" path="hsn" value="0" id="txtHsn"></form:input>
															<form:input type="hidden" path="sgst" value="0"></form:input>
															<form:input type="hidden" path="cgst" value="0"></form:input>
															<form:input type="hidden" path="igst" value="0"></form:input>
															<form:input type="hidden" path="cess" value="0"></form:input>
														<b> *</b>
														</div>
														
														</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> GST Code</b>
														</div>
														<div class='col-md-6-1'
															style='margin-top: 9px; color: red;'>

															<form:select path="taxMaster.taxId" id="taxMaster">
																<form:option value="0" label="--- Select ---"/>
																<c:forEach var="tax" items="${taxMasters}">
																	<form:option value="${tax.taxId}">
																		<c:out value="${tax.taxName}" />
																	</form:option>
																</c:forEach>
															</form:select>
														</div>
														
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> VMI/Consignment Item</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:checkbox path="cathlapFlag" value="1"
																id="cathlapFlagYes" name="cathlapFlag" onclick="changeCathFlag()" />
														<%-- 	Yes
															<form:radiobutton path="cathlapFlag" value="0"
																id="cathlapFlagNo" name="cathlapFlag"
																style="margin-left: 12px;" checked="true" />
															No --%>
														</div>

													</div>

												</div>

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Drug/Generic Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<input type="text" id="txtDrug1"
																class="ui-autocomplete-input form-control input-SmallText"
																placeholder="Drug/Generic Name" required
																onchange="setDrg();"
																onblur="splitIngredientContent($('#txtDrug1').val());">
															<!--   ,isName('txtDrug1',0,25) -->
															<form:input path="drugMaster.drugId" type="hidden"
																id="txtDrug" value='0' />

															<script type="text/javascript">
																$(
																		"#txtDrug1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var findingName = $(
																								"#txtDrug1")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');
																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/drug/autoSuggestionDrug",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].drugName
																													+ "$$"
																													+ r[i].drugId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Shelf Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<input type="text" id="txtShelf1"
																class="ui-autocomplete-input form-control input-SmallText"
																placeholder="Shelf Name" required onchange="setShlef();"
																onblur="splitShelf($('#txtShelf1').val())">
															<!--  ,isAlphaWithDigitSpace('txtShelf1',0,25); -->
															<form:input path="shelfMaster.shelfId" type="hidden"
																id="txtShelf" value='0' />

															<script type="text/javascript">
																$("#txtShelf1")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {
																						var findingName = $(
																								"#txtShelf1")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');
																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/shelf/autoSuggestionShelfNames",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].shelfName
																													+ "$$"
																													+ r[i].shelfId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Select Vendor</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;"
															id="divVendorList">
															<form:select path="vendorMasters" items="${vendors}"
																itemLabel="vendorName" itemValue="vendorId"
																class="form-control " multiple="true" id="selectVendor"
																selected="true" />
														</div>
														<div class='col-md-1-1'
															style='margin-top: 9px; color: red;'>
															<b> *</b>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Short-List</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="productShortList" value="1"
																id="radioShortListYes" name="radioShortList"
																checked="true" />
															Yes
															<form:radiobutton path="productShortList" value="0"
																id="radioShortListNo" name="radioShortList"
																style="margin-left: 12px;" />
															No
														</div>

													</div>
													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<!-- <div class="col-md-7-1" style="margin-top: 9px;"> -->
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Sale Disc. </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<form:radiobutton path="productSaleDisc" value="1"
																id="radioSaleYes" name="radioSale" checked="true" />
															Yes
															<form:radiobutton path="productSaleDisc" value="0"
																id="radioSaleNo" name="radioSale"
																style="margin-left: 12px;" />
															No
														</div>

													</div>

													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Billing Must . </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<form:radiobutton path="productBillingMust" value="0"
																id="radioBillingNo" name="radioBilling" checked="true" />
															No
															<form:radiobutton path="productBillingMust" value="1"
																id="radioBillingYes" name="radioBilling"
																style="margin-left: 18px;" />
															Yes
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Sch. "H1" </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="productH1" value="0"
																id="radioH1No" name="radioH1" checked="true" />
															No
															<form:radiobutton path="productH1" value="1"
																id="radioH1Yes" name="radioH1"
																style="margin-left: 18px;" />
															Yes

														</div>


													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>NRX </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="productNrx" value="0"
																id="radioNrxNo" name="radioNrx" checked="true" />
															No
															<form:radiobutton path="productNrx" value="1"
																id="radioNrxYes" name="radioNrx"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Nutraceutical</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<input type="radio" value="0" onclick="setNuracalvalue('0')"
																id="radioNutracalNo" name="radioNutracal" checked="true" />
															No
															<input type="radio"  value="1" onclick="setNuracalvalue('1')"
																id="radioNutracalYes" name="radioNutracal"
																style="margin-left: 18px;"/>
															Yes
														</div>
														
														
														<form:input path="nutracalProduct" type="hidden"
																id="nutracalProduct" name="txtProduct"
																class="form-control input-SmallText" value="1"  />


													</div>
													
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Sch. "X" </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="productX" value="0"
																id="radioSchXNo" name="radioSCHX" checked="true" />
															No
															<form:radiobutton path="productX" value="1"
																id="radioSchXYes" name="radioSCHX"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Sch. "NDPS" </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="productNdps" value="0"
																id="radioSchNdpsNo" name="radioSCHNdps" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes" name="radioSCHNdps"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Restricted Antibiotics </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo1" name="radioSCHNdps1" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes1" name="radioSCHNdps1"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Narcotic Drugs </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo2" name="radioSCHNdps2" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes2" name="radioSCHNdps2"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>High Risk Drug </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo3" name="radioSCHNdps3" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes3" name="radioSCHNdps3"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Look A Like Drug </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo4" name="radioSCHNdps4" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes4" name="radioSCHNdps4"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Sound A Like Drug </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo5" name="radioSCHNdps5" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes5" name="radioSCHNdps5"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Cold Storage Drug </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo6" name="radioSCHNdps6" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes6" name="radioSCHNdps6"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Chemo Drug </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo7" name="radioSCHNdps7" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes7" name="radioSCHNdps7"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Emergency Medicines </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo8" name="radioSCHNdps8" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes8" name="radioSCHNdps8"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Formulary Drug </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo9" name="radioSCHNdps9" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes9" name="radioSCHNdps9"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Anaesthetic Drug </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo0" name="radioSCHNdps0" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes0" name="radioSCHNdps0"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Consumable Item </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo11" name="radioSCHNdps11" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes11" name="radioSCHNdps11"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Drug Taken Empty Stomach</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo12" name="radioSCHNdps12" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes12" name="radioSCHNdps12"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Drug-Drug Interaction </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo13" name="radioSCHNdps13" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes13" name="radioSCHNdps13"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Food Drug Interaction </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo14" name="radioSCHNdps14" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes14" name="radioSCHNdps14"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Implant </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="" value="0"
																id="radioSchNdpsNo15" name="radioSCHNdps15" checked="true" />
															No
															<form:radiobutton path="" value="1"
																id="radioSchNdpsYes15" name="radioSCHNdps15"
																style="margin-left: 18px;" />
															Yes
														</div>


													</div>
													

												</div>

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Batch </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 5px;">
															<form:radiobutton path="productBatch" value="0"
																id="radioBatchNo" name="radioBatch" />
															No
															<form:radiobutton path="productBatch" value="1"
																id="radioBatchYes" name="radioBatch"
																style="margin-left: 18px;" checked="true" />
															Yes
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Minimum Lvl</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="productMinLevel" type="text"
																id="txtMinimumLvl" name="txtMinimumLvl"
																class="form-control input-SmallText"
																placeholder="Minimum Lvl"
																onblur="isNumber('txtMinimumLvl',0,100)" required="true" />


														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Maximum Lvl</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="productMaxLevel" type="text"
																id="txtMaximumLvl" name="txtMaximumLvl"
																class="form-control input-SmallText"
																placeholder="Maximum Lvl"
																onblur="isNumber('txtMaximumLvl',0,100)" required="true" />
														</div>


													</div>
													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Description</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:textarea path="productDesc" type="text"
																id="txtDescription" name="txtDescription"
																class="form-control input-SmallText"
																placeholder="Description" required="true" />
															<!--  onblur="isAlphaWithDigitSpace('txtDescription',0,200)" -->
														</div>
													</div>

													<%-- <div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Add Photo</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="" type="file" id="txtPhoto"
																name="imgFile" />

														</div>
													</div> --%>
													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Rate% With Margin</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="productMarginRate" type="text"
																id="txtMarginRate" name="txtMarginRate"
																class="form-control input-SmallText"
																placeholder="Rate% With Margin" required="true"
																onblur="isFloatingPoint('txtMarginRate')" />
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Rate equals to MRP</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:radiobutton path="rateEqualsMrp" value="0"
																id="radioRateWithMrpNo" name="radioRateWithMrp" />
															No
															<form:radiobutton path="rateEqualsMrp" value="1"
																id="radioRateWithMrpYes" name="radioRateWithMrp"
																style="margin-left: 18px;" checked="true" />
															Yes
														</div>


													</div>
													
														
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 9px;"></div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<div class="col-md-8-1" style="margin-top: -4px;">
																<form:radiobutton path="productPrescription" value="0"
																	id="radioProductWithPrescription"
																	name="radioPrescription" />
																Product With prescription
															</div>
															<div class="col-md-11-1"
																style="margin-top: 3px; margin-left: -17px">
																<form:radiobutton path="productPrescription" value="1"
																	id="radioProductWithoutPrescription"
																	name="radioPrescription" style="margin-left: 18px;"
																	checked="true" />
																Product Without prescription
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Fixed Discount-Sale</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="productFixDiscount" type="text"
																id="txtDiscount" name="txtDiscount"
																class="form-control input-SmallText"
																placeholder="Fixed Discount-Sale" required="true"
																onblur="isFloatingPoint('txtDiscount',0,100)" />
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Schm.Qty. 1</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<div class="col-md-5-1" style="margin-top: 0px;">
																<form:input path="productScheme1" type="text"
																	id="txtSchmQty1-1" name="txtSchmQty1"
																	class="form-control input-SmallText"
																	style="width: 100%;" placeholder="Schm.Qty. 1-1"
																	required="true"
																	onblur="isFloatingPoint('txtSchmQty1-1',0,100)" />

															</div>
															<div class="col-md-2-1 center" style="margin-top: 0px;">
																<b>for</b>
															</div>
															<div class="col-md-5-1" style="margin-top: 0px;">
																<form:input path="productScheme1Qty" type="text"
																	id="txtSchmQty1-2" name="txtSchmQty1-2"
																	class="form-control input-SmallText"
																	style="width: 100%;" placeholder="Schm.Qty. 1-2"
																	required="true"
																	onblur="isFloatingPoint('txtSchmQty1-2',0,100)" />
															</div>

														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Schm.Qty. 2</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<div class="col-md-5-1" style="margin-top: 0px;">
																<form:input path="productScheme2" type="text"
																	id="txtSchmQty2-1" name="txtSchmQty2-1"
																	class="form-control input-SmallText"
																	style="width: 100%;" placeholder="Schm.Qty.2-1"
																	required="true"
																	onblur="isFloatingPoint('txtSchmQty2-1',0,100)" />
															</div>
															<div class="col-md-2-1 center" style="margin-top: 0px;">
																<b>for</b>
															</div>
															<div class="col-md-5-1" style="margin-top: 0px;">
																<form:input path="productScheme2Qty" type="text"
																	id="txtSchmQty2-2" name="txtSchmQty2-2"
																	class="form-control input-SmallText"
																	style="width: 100%;" placeholder="Schm.Qty.2-2"
																	required="true"
																	onblur="isFloatingPoint('txtSchmQty2-2',0,100)" />
															</div>
														</div>
													</div>

													<div class="col-md-12-1"
														style="margin-top: 0px; margin-bottom: 10px; display: none;">
														<div class="col-md-4-1" style="margin-top: 9px;">
															<b> Schm.Qty. 3</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<div class="col-md-5-1" style="margin-top: 0px;">
																<form:input path="productScheme3" type="text"
																	id="txtSchmQty3-1" name="txtSchmQty3-1"
																	class="form-control input-SmallText"
																	style="width: 100%;" placeholder="Schm.Qty.3-1"
																	required="true"
																	onblur="isFloatingPoint('txtSchmQty3-1',0,100)" />
															</div>
															<div class="col-md-2-1 center" style="margin-top: 0px;">
																<b>for</b>
															</div>
															<div class="col-md-5-1" style="margin-top: 0px;">
																<form:input path="productScheme3Qty" type="text"
																	id="txtSchmQty3-2" name="txtSchmQty3-2"
																	class="form-control input-SmallText"
																	style="width: 100%;" placeholder="Schm.Qty.3-2"
																	required="true"
																	onblur="isFloatingPoint('txtSchmQty3-2',0,100)" />
															</div>
														</div>
													</div>


												</div>
											</form:form>
										</div>

									</div>

								</div>
								<div class="col-md-12-1" style="margin-top: 0px;"
									id="productlist1">
									<div id="SearchContent" class="col-md-6-1">
										<div class='col-md-1-1'>Search By:</div>
										<div class='col-md-1-1'>Product Name</div>
										<div class='col-md-2-1'>
											<input type="text" id='searchBox' name='searchBox'
												placeholder="Product Name"
												class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
												onblur="splitContent($('#searchBox').val())" /> <input
												type="hidden" id="hiddenId" />

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
															url : "autoSuggestionProductlist",
															timeout : 1000 * 60 * 5,
															catche : false,
															 error : function(event, request, settings) { 
																 alert("error");
													 		}, 
															success : function(r) {
																var availableTags = [];
																for(var i=0;i<r.length;i++)
																	{
																		availableTags[i]=r[i].productName+"$$"+r[i].productId;
																	
																	}
																	
																	response(availableTags);
															}
														});
												 }																						
											});	
											</script>
										</div>
										<div class="col-md-12-1" style="margin-top: 10px;">
											<button class="btn btn-xs btn-success"
												onclick="showProductMasterDiv();">Add New</button>
											<!-- <button class="btn btn-xs btn-warning">Print</button>
									<button class="btn btn-xs btn-danger">Discard</button> -->


											<!-- <button class="btn btn-xs btn-warning">Print</button>
									<button class="btn btn-xs btn-danger">Discard</button> -->
										</div>





									</div>


									<div id="" class="col-md-6-1"
										style="width: 65%; margin-left: 25%; float: left; height: 100%;">
										<!-- <div id="SearchHospital" style="width: 100%; padding: 2%;"></div>	 -->
										<div id="productList"
											style="width: 100%; height: 220px; max-height: auto; margin-left: 2%; margin-top: -9%;">
											<table
												class="table table-striped table-bordered header-fixed cf "
												style="Width: 100%; margin-top: 5px;">
												<thead class="cf" style="background: white;">
													<tr>
														<th style="height: 21.5px;" class="col-md-1"><div>Sr
																No</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>Product
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>Company</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>Packing</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>Category</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>UOM</div></th>
														<!-- <th style="height: 21.5px;" class="col-md-2 "><div>Tax</div></th> -->
														<th style="height: 21.5px;" class="col-md-2 "><div>Drug</div></th>

														<th style="height: 21.5px;" class="col-md-2 "><div>Shelf</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>Unit</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>Vendor</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>Preparation</div></th>
														<th style="height: 21.5px;" class="col-md-2 "><div>Strength</div></th>
														<th style="height: 21.5px;" class="col-md-1 "><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1 "><div>Delete</div></th>
													</tr>

												</thead>



												<tbody id="divProductList" style="overflow-y: scroll;">
													<c:forEach items="${productMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1 ">${(count.index)+1} <input
																type="hidden" id="productId${row.productId }"
																value="${row.productId }">
															</td>
															<td class="col-md-2 ">${row.productName }<input
																type="hidden" id="productName${row.productId }"
																value="${row.productName }"> <input
																type="hidden" id="hsn${row.productId }"
																value="${row.hsn }"> <input type="hidden"
																id="cathlapFlag${row.productId }"
																value="${row.cathlapFlag }">
                                                                 
                                                                 <input
																type="hidden" id="hsnNumber${row.productId }"
																value="${row.hsn }">
																<input
																type="hidden" id="cathLabFlag${row.productId }"
																value="${row.cathlabFlag }"> 
																 
																<input
																type="hidden" id="gstNumber${row.productId }"
																value="${row.taxMaster.taxId }"> 
																
																
															</td>



															<td class="col-md-2 ">${row.companyMaster.compName}<input
																type="hidden" id="productCompanyId${row.productId }"
																value="${row.companyMaster.compId }"> <input
																type="hidden" id="productCompanyName${row.productId }"
																value="${row.companyMaster.compName }">

															</td>




															<td class="col-md-2 ">${row.packingMaster.packType}
																<input type="hidden" id="productPackId${row.productId }"
																value="${row.packingMaster.packId }"> <input
																type="hidden" id="productPackType${row.productId }"
																value="${row.packingMaster.packType }">

															</td>

															<td class="col-md-2 ">${row.categoryMaster.catName}<input
																type="hidden" id="productCategoryId${row.productId }"
																value="${row.categoryMaster.catId }"> <input
																type="hidden" id="productCategoryName${row.productId }"
																value="${row.categoryMaster.catName}">
															</td>

															<td class="col-md-2 ">${row.uomMaster.uomName}<input
																type="hidden" id="productUomId${row.productId }"
																value="${row.uomMaster.uomId }"> <input
																type="hidden" id="productUomName${row.productId }"
																value="${row.uomMaster.uomName }">
															</td>

															<%-- <td class="col-md-2 " id="productHsn${row.productId }"><c:forEach
																	items="${row.taxMaster}" var="tax" varStatus="status"> 
																			${tax.taxName}<input type="hidden"
																		id="productTax${row.productId }${status.index+1}"
																		value="${tax.taxId}">
																</c:forEach> <c:set value="${fn:length(row.taxMaster)}"
																	var="taxCount"></c:set> <input type="hidden"
																value="${taxCount}" id="hiddenTaxCount${row.productId }" />

															</td>
 --%>
															<td class="col-md-2 ">${row.drugMaster.drugName}<input
																type="hidden" id="productIngredientId${row.productId }"
																value="${row.drugMaster.drugId }"> <input
																type="hidden"
																id="productIngredientContent${row.productId }"
																value="${row.drugMaster.drugName }">
															</td>

															<td class="col-md-2 ">${row.shelfMaster.shelfName}<input
																type="hidden" id="productShelfId${row.productId }"
																value="${row.shelfMaster.shelfId }"> <input
																type="hidden" id="productShelfName${row.productId }"
																value="${row.shelfMaster.shelfName }">
															</td>


															<td class="col-md-2 ">${row.productUnit}<input
																type="hidden" id="productUnit${row.productId }"
																value="${row.productUnit}"></td>

															<td class="col-md-2 " style="display: none;">${row.productShortName}<input
																type="hidden" id="productShortName${row.productId }"
																value="${row.productShortName}"></td>

															<td class="col-md-2 " style="display: none;">${row.productPrescription}<input
																type="hidden"
																id="productPrescriptionData${row.productId }"
																value="${row.productPrescription}"></td>

															<td class="col-md-2 "><c:forEach
																	items="${row.vendorMasters}" var="vendor"
																	varStatus="status">  
     																		${vendor.vendorName}<input type="hidden"
																		id="productVendor${row.productId }"
																		value="${vendor.vendorId}">
																</c:forEach> <c:set value="${fn:length(row.vendorMasters)}"
																	var="vendorCount"></c:set> <input type="hidden"
																value="${vendorCount}"
																id="hiddenVendorCount${row.productId }" /></td>

															<td class="col-md-2 ">${row.preparationMaster.preparationName}<input
																type="hidden" id="productPreparationId${row.productId }"
																value="${row.preparationMaster.preparationId}">
																<input type="hidden"
																id="productPreparationName${row.productId }"
																value="${row.preparationMaster.preparationName}">
															</td>

															<td class="col-md-2 ">${row.strengthMaster.strengthName}<input
																type="hidden" id="productStrengthId${row.productId }"
																value="${row.strengthMaster.strengthId}"> <input
																type="hidden" id="productStrengthName${row.productId }"
																value="${row.strengthMaster.strengthName}">
															</td>

															<td class="col-md-2 " style="display: none;">${row.productShortList}<input
																type="hidden" id="productShortList${row.productId }"
																value="${row.productShortList}"></td>

															<td class="col-md-2 " style="display: none;">${row.productSaleDisc}<input
																type="hidden" id="productSaleDisc${row.productId }"
																value="${row.productSaleDisc}"></td>

															<td class="col-md-2 " style="display: none;">${row.productBillingMust}<input
																type="hidden" id="productBillingMust${row.productId }"
																value="${row.productBillingMust}"></td>

															<td class="col-md-2 " style="display: none;">${row.productH1}<input
																type="hidden" id="productH1${row.productId}"
																value="${row.productH1}"></td>


															<td class="col-md-2 " style="display: none;">${row.rateEqualsMrp}<input
																type="hidden" id="rateEqualMrp${row.productId }"
																value="${row.rateEqualsMrp}"></td>

															<td class="col-md-2 " style="display: none;">${row.productNrx}<input
																type="hidden" id="productNrx${row.productId}"
																value="${row.productNrx}"></td>

															<td class="col-md-2 " style="display: none;">${row.productCreatedBy}<input
																type="hidden" id="txtCreatedBy${row.productId}"
																value="${row.productCreatedBy}"></td>

															<td class="col-md-2 " style="display: none;">${row.productIp}<input
																type="hidden" id="txtProductIp${row.productId}"
																value="${row.productIp}"></td>

															<td class="col-md-2 " style="display: none;">${row.productX}<input
																type="hidden" id="productNewX${row.productId}"
																value="${row.productX}"></td>

															<td class="col-md-2 " style="display: none;">${row.productNdps}<input
																type="hidden" id="productNewNdps${row.productId}"
																value="${row.productNdps}"></td>

															<td class="col-md-2 " style="display: none;">${row.productBatch}<input
																type="hidden" id="productBatch${row.productId }"
																value="${row.productBatch}"></td>



															<td class="col-md-2 " style="display: none;">${row.productMinLevel}<input
																type="hidden" id="productMinLevel${row.productId }"
																value="${row.productMinLevel}"></td>


															<td class="col-md-2 " style="display: none;">${row.productMaxLevel}<input
																type="hidden" id="productMaxLevel${row.productId }"
																value="${row.productMaxLevel}"></td>

															<td class="col-md-2 " style="display: none;">${row.productDesc}<input
																type="hidden" id="productDesc${row.productId }"
																value="${row.productDesc}"></td>

															<td class="col-md-2 " style="display: none;">${row.productPhotoUrl}<input
																type="hidden" id="productPhotoUrl${row.productId }"
																value="${row.productPhotoUrl}"></td>

															<td class="col-md-2 " style="display: none;">${row.productMarginRate}<input
																type="hidden" id="productMarginRate${row.productId }"
																value="${row.productMarginRate}"></td>

															<td class="col-md-2 " style="display: none;">${row.productFixDiscount}<input
																type="hidden" id="productFixDiscount${row.productId }"
																value="${row.productFixDiscount}"></td>

															<td class="col-md-2 " style="display: none;">${row.productScheme1}<input
																type="hidden" id="productScheme1${row.productId }"
																value="${row.productScheme1}"></td>

															<td class="col-md-2 " style="display: none;">${row.productScheme1Qty}<input
																type="hidden" id="productScheme1Qty${row.productId }"
																value="${row.productScheme1Qty}"></td>

															<td class="col-md-2 " style="display: none;">${row.productScheme2}<input
																type="hidden" id="productScheme2${row.productId }"
																value="${row.productScheme2}"></td>

															<td class="col-md-2 " style="display: none;">${row.productScheme2Qty}<input
																type="hidden" id="productScheme2Qty${row.productId }"
																value="${row.productScheme2Qty}"></td>

															<td class="col-md-2 " style="display: none;">${row.productScheme3}<input
																type="hidden" id="productScheme3${row.productId }"
																value="${row.productScheme3}"></td>

															<td class="col-md-2 " style="display: none;">${row.productScheme3Qty}<input
																type="hidden" id="productScheme3Qty${row.productId }"
																value="${row.productScheme3Qty}"></td>
																
															<td class="col-md-2 " style="display: none;">${row.nutracalProduct}<input
																type="hidden" id="nutracalProduct${row.productId }"
																value="${row.nutracalProduct}"></td>

																

															<td class="col-md-1 ">
																<button id="btnEdit${row.productId}"
																	class="btn btn-xs btn-success"
																	onclick="editProduct(${row.productId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1 ">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deleteProduct(${row.productId})"
																	value="DELETE">
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
       <input type="hidden" id="isviewListOfProduct" value="NO">
		
		<script type="text/javascript">
				function setHsn(){
					var a=$("#hsnMaster").val();
					$("#txtHsn").val($.trim(a));
				};
			</script>
		<%@include file="Pharma_Footer.jsp"%>
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>

	</section>
</body>
</html>