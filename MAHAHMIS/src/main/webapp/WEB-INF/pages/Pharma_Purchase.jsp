<%@page import="java.util.ResourceBundle"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
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
<title>Good Receipt Note | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">	
	
	<link
	href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
	
	

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
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- /for Developers  -->

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- Application js -->

<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/moments.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/tooltipsy.min.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/js/morphext.min.js"/>"></script>

<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/js/jqx-widgets/jqx.base.css"/>">

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxmenu.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>

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
	z-index: 100000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/pharma-resources/resources/images/ajax_loader_blue_64.gif')
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
			function openPopUp(){
			$('#po_pending_data').on('shown.bs.modal', function (e) {
			//	alert("hello");
				fetchPendingPOData();
				
			});
			
			$("#searchBox").focus();
		}
		});
		
		/* jQuery(document).ajaxStart(function() {
			
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			
		}); */
		
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
	"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>

<%
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
	"dd/MM/yyyy");
	String date = simpleDateFormat.format(new Date());
%>
</head>
<script type="text/javascript">
	onload = function() {
		var hashes=window.location.href.split("=");
		
		if(hashes.length==1)
		{
		getNextAutoIncrement();
		var inputs = [];
		inputs.push('docId=2');
		
		$('.hastip').tooltipsy({
			css: {
		        'padding': '10px',
		        'max-width': '200px',
		        'color': '#303030',
		        'background-color': '#f5f5b5',
		        'border': '1px solid black',
		        '-moz-box-shadow': '0 0 10px rgba(0, 0, 0, .5)',
		        '-webkit-box-shadow': '0 0 10px rgba(0, 0, 0, .5)',
		        'box-shadow': '0 0 10px rgba(0, 0, 0, .5)',
		        'text-shadow': 'none',
		        'border-radius':'4%'
		    }
		});
	
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/common/getDocNo",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				
			},
			success : function(r) {
				//alert(r);
				$('#txtVouNo').val(r);
			}
		});
		
		document.getElementById("demo").innerHTML = "<h5><b><font color='red'>Credit</font></b></h5>"; 
		
		}
		else{
			$("#getPo").hide();
			//calculateCDAmtForView();
			
		}
		/* myFunction(1); */
		//return setValuesToAutocomplete(null);
	};
	
	shortcut.add("Ctrl+s",function() {
		validateData();
	});
	
	shortcut.add("Ctrl+l",function() {
		backToList('purchase');
	});
	
	shortcut.add("Up", function() {
		setUpfocusData();
	});
	
	shortcut.add("Down", function() {
		setDownfocusData();
	});
	
	shortcut.add("delete", function() {
		deleteRowOnFocusData();
	});
	
	/* shortcut.add("f8", function() {
		window.open("/EhatEnterprise/pharmacy/indentSale/view-frm");

	});
	
	shortcut.add("f6", function() {
		window.open("/EhatEnterprise/pharmacy/counterSale/view-frm");

	});

	shortcut.add("f7", function() {
		window.open("/EhatEnterprise/pharmacy/patientSale/view-frm");

	});  */
</script>
<script type="text/javascript">
	function myFunction(count) {
		if (count == 1) {
			document.getElementById("demo").innerHTML = "<h5><b><font color='red'>Credit</font></b></h5>";
		} else if (count == 2){
			document.getElementById("demo").innerHTML = "<h5><b><font color='red'>Cash</font></b></h5>";
		}else
			document.getElementById("demo").innerHTML = "<h5><b><font color='red'>Card</font></b></h5>";

	}
</script>
<script>
function validateData() 
{

	calculatePurchaseRate();
	for(var j=1;j<=$("#DRRDiv tr:visible").length;j++){
		if($("#remove"+j).is(":visible")){
			if($("#textProductName"+j).val()!=="" && $("#textProductName"+j).val()!==null)
			if(!$("#textAmount"+j).val()){
				alert("Fill information of "+$("#textProductName"+j).val()+" product...!");
				return false;
			}
		}
	}
	var hashes=window.location.href.split("=");
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
		{ 	
		if($('#hiddenVendorId').val()!=null && $('#hiddenVendorId').val()!="")
		{ 	
		if($('#txtBillNo').val()!=null && $('#txtBillNo').val()!="")
		   { 	
			if($('#popup_container2').val()!=null && $('#popup_container2').val()!="")
			   { 
				if($('#popup_container4').val()!=null && $('#popup_container4').val()!="")
				   { 
					 if($('#textProductName1').val()!=null && $('#textProductName1').val()!="")
					   { 
						
						 //alert($("#poId").val());
							if($("#poId").val() == 0 || $("#poId").val() == undefined){
								
								for(var i=0;i<$("#DRRDiv tr:visible").length;i++)
								{
									if($("#remove"+i).is(":visible")){
									if($('#billRate'+i).val()=='' || $('#billRate'+i).val()==null)
										//if($('#billRate'+i).val()=='' || $('#billRate'+i).val()==null || $('#billRate'+i).val()==0 || $('#billRate'+i).val()=='0')
									{
										alert("Please Enter Purchase Rate !");
										$('#billRate'+i).focus();
										return false;
									}
									if($('#textBatch'+i).val()=='' || $('#textBatch'+i).val()==null || $('#textBatch'+i).val()==0 || $('#textBatch'+i).val()=='0')
									{
										alert("Please Select Batch !");
										$('#textBatch'+i).focus();
										return false;
									}
									
									if($('#textExpiry'+i).val()=='' || $('#textExpiry'+i).val()==null || $('#textExpiry'+i).val()==0 || $('#textExpiry'+i).val()=='0')
									{
										alert("Please Enter Expiry Date !");
										$('#textExpiry'+i).focus();
										return false;
									}
									if($('#textMrp'+i).val()=='' || $('#textMrp'+i).val()==null)
									//if($('#textMrp'+i).val()=='' || $('#textMrp'+i).val()==null || $('#textMrp'+i).val()==0 || $('#textMrp'+i).val()=='0')
									{
										alert("Please Enter Sale Rate Or MRP!");
										$('#textMrp'+i).focus();
										return false;
									}
								}	 
								} 
							}else{
							  
							for(var i=0;i<=$("#DRRDiv tr:visible").length;i++)
							{
								if($("#remove"+i).is(":visible")){
							
								if($('#billRate'+i).val()=='' || $('#billRate'+i).val()==null || $('#billRate'+i).val()==0 || $('#billRate'+i).val()=='0')
								{
									alert("Please Enter Purchase Rate !");
									$('#billRate'+i).focus();
									return false;
								}
								if($('#textBatch'+i).val()=='' || $('#textBatch'+i).val()==null || $('#textBatch'+i).val()==0 || $('#textBatch'+i).val()=='0')
								{
									alert("Please Select Batch !");
									$('#textBatch'+i).focus();
									return false;
								}
								
								if($('#textExpiry'+i).val()=='' || $('#textExpiry'+i).val()==null || $('#textExpiry'+i).val()==0 || $('#textExpiry'+i).val()=='0')
								{
									alert("Please Enter Expiry Date !");
									$('#textExpiry'+i).focus();
									return false;
								}
								if($('#textMrp'+i).val()=='' || $('#textMrp'+i).val()==null || $('#textMrp'+i).val()==0 || $('#textMrp'+i).val()=='0')
								{
									alert("Please Enter Sale Rate Or MRP!");
									$('#textMrp'+i).focus();
									return false;
								}
						      }	
							 }
							} 
								if(hashes.length==1)
								  {	
									
								alert("Record Saved Successfully!");
							    $('#purchaseMasterForm').submit();
							    window
								.open("../../pharmacy/purchase/view-frm");
								  }
								else
									{
									alert("Record Saved Successfully!");
								    $('#purchaseMasterForm').submit();
								    window
									.open("../../pharmacy/purchase/view-frm");
									}
							
							/* }  */   
					  } 
					 else {
						alert("Enter Product Name");
						 $('#textProductName1').focus();
					  }	
		          } 
									
					else {
							alert("Enter Due Date");
							 $('#popup_container4').focus();
						  }	
			   } 
				else
				  {
					alert("Enter Bill Date");
					 $('#popup_container2').focus();
				  }	
				}
			
			else
			  {
				alert("Enter Bill Number");
				 $('#txtBillNo').focus();
			  }	
		   }
		else
		  {
			alert("Record Not Found");
			 $('#searchBox').val('');
			 $('#searchBox').focus();
		  }	
		
	}
	else
	  {
		alert("Enter Vendor Name");
		 $('#searchBox').focus();
	  }	
	
}

function changeVmiFlag(){
	if($("#isVMI").prop("checked") == true){
		$("#vmi").val(1);
	}
	else
		$("#vmi").val(0);
}

</script>
<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="Pharma_PopUp_Product_Master.jsp"%>
			<%@include file="HelpMenu.jsp"%>
			<%@include file="Pharma_Purchase_Pending_Bills.jsp"%>
			<%@include file="pharma_po_pending_pop_up.jsp"%>
			<%-- <%
				ResourceBundle bundle = ResourceBundle
						.getBundle("EhatEnterpriseConfigurationFile");

				String goodsReceiptNote = bundle.getObject(
						"pharma_purchase_entry_name").toString();
			%> --%>

			<div id="main-content">
				<div class="container">
					<c:set scope="session" value="${fn:length(purchase.ltPurSlave)}"
						var="slaveCount"></c:set>

					<form:form commandName="purchase" id="purchaseMasterForm"
						action="../../pharmacy/purchase/save" method="POST">
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
												<li><a
													href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li><%=goodsReceiptNote.toString()%></li>
												<!-- 	<li><i class="fa fa-question"></i></li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li> -->
												<div class="li pull-right" style="margin-left: 9px;">
													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="validateData();">Save and
														Print(Ctrl+S)</button>

												</div>
												<div class="li pull-right" style="margin-left: 9px;">
													<a class="btn btn-xs btn-info"
														href="../../pharmacy/purchase/view">Back to
														List</a>
												</div>

											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<!-- <div class="divide-40"></div> -->
								<div class="col-md-12-1">
									<!-- <h5>
										<font color="tomato">Purchase Entry</font>
									</h5> -->

									<div class="col-md-12-1">
										<div class="col-md-2-1">

											<font color="tomato" style="font-size: 19px"><%=goodsReceiptNote.toString()%></font>
										</div>
										<div id="indentNumber" class="col-md-6-1">

											<div class="">
												<button type="button" data-toggle="modal" id="getPo" onclick="fetchPendingPOData()" 
													data-target="#po_pending_data" class="btn btn-xs btn-info">GET
													PO</button>
												<span style="font: bold; margin-left: 257px">VMI :</span> <input
													type="checkbox" id="isVMI" onclick="changeVmiFlag()"
													value="1">
											</div>

										</div>
									</div>
								</div>
								<div class="row">
									<div class="panel-body col-md-12-1">
										<div class="panel-body">
											<div id="chequePaid" class="col-md-4-1"
												style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-3-1" style="margin-top: 0px;">
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Vendor Name </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:hidden value="purchase" id="purchase" path="" />
															<form:hidden id="purId" path="purId" />
															<form:hidden id="txtVat5withoutDisc"
																path="purWithoutDiscTaxVat5" value='0' />
															<form:hidden id="txtVat12withoutDisc"
																path="purWithoutDiscTaxVat12" value='0' />
															<form:hidden id="hiddenVendorId"
																path="vendorMaster.vendorId" />
															<form:hidden id="hiddenVendoraddId"
																path="vendorAddress.vendorAddressId" />
															<form:hidden id="vmi" path="vmi" />
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<input type="text" id='searchBox' name='searchBox'
																		placeholder="Vendor Name"
																		class="ui-autocomplete-input form-control input-SmallText"
																		onblur="splitPurchase($('#searchBox').val());" />
																	<!--  ,isAlphaWithSpace('searchBox',0,200) -->
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<input type="text" id='searchBox' name='searchBox'
																		placeholder="Name"
																		class="ui-autocomplete-input form-control input-SmallText"
																		value="${purchase.vendorMaster.vendorName}"
																		onblur="splitPurchase($('#searchBox').val());" />

																	<input type="hidden" value=''>
																</c:when>
															</c:choose>
															<script type="text/javascript">
																$("#searchBox")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#searchBox")
																								.val();
																						var id='searchBox';
																						var inputs = [];
																						 inputs
																								.push('letter='
																										+ findingName); 
																										/* inputs
																										.push('findingName='
																												+ findingName); */
																						
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/vendor/autoSuggestionVendor",
																									// fetchVendorListwithmultipleAdd
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
																										//setCashReceiptEntry(r,id);
																										//alert("REach");
																									    var availableTags = [];
																										for (var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].vendorName
																													+ "-"
																													+ r[i].vendorId
																													;

																										}
																										response(availableTags); 
																									}

																								});
																					}
																				});
															</script>
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div>
														</div>

													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Address</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount !=0}">
																	<textarea id="txtAddress" name="txtAddress"
																		class="form-control input-SmallText"
																		placeholder="Address"
																		${purchase.vendorAddress.vendorAddress} maxlength="50"
																		required readonly>${purchase.vendorAddress.vendorAddress} </textarea>
																</c:when>
																<c:when test="${slaveCount ==0}">
																	<form:textarea path="" id="txtAddress"
																		name="txtAddress" class="form-control input-SmallText"
																		placeholder="Address" maxlength="50" required="true"
																		readonly="true" />
																</c:when>
															</c:choose>
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">

														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Phone </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="" type="text" id="txtPhone"
																		name="txtPhone" class="form-control input-SmallText"
																		placeholder="Phone" maxlength="10" required="true"
																		readonly="true" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<input type="text" id="txtPhone" name="txtPhone"
																		class="form-control input-SmallText"
																		placeholder="Phone" maxlength="10" required
																		value="${purchase.vendorAddress.vendorMobileNumber}"
																		readonly>
																</c:when>
															</c:choose>
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">

														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> State </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">


																	<select id="vendorState" class="col-md-12-1">
																		<%-- <option value="${purchase.vendorAddress.vendorAddressId}" selected>${purchase.vendorAddress.state}</option>
																		 --%>
																	</select>
																	<input id="stateIds" type="hidden" value="0">
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<select id="vendorState" onchange="changeVendorAdd()"
																		class="col-md-12-1">
																		<c:forEach items="${vendorAddr}" var="row"
																			varStatus="count">
																			<c:choose>
																				<c:when
																					test="${purchase.vendorAddress.vendorAddressId == row.vendorAddressId}">
																					<option
																						value="${row.vendorAddressId}"
																						selected>${row.state}</option>
																				</c:when>
																				<c:otherwise>
																					<option value="${row.vendorAddressId}">${row.state}</option>
																				</c:otherwise>
																			</c:choose>
																		</c:forEach>
																	</select>
																	<input id="stateIds" type="hidden"
																		value="${purchase.vendorAddress.stateId}">
																</c:when>
															</c:choose>
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
													<%-- <div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">

														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> State </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															
															<select id="vendorState" onclick="changeVendorAdd()" >
															<option value="${purchase.vendorAddress.state}">--Select State--</option>
															</select>
															
															
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div> --%>

												</div>

												<div class="col-md-3-1 " style="margin-top: 0px;">






													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Bill No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="purBillNo" type="text" id="txtBillNo"
																		name="txtBillNo"
																		class="form-control input-SmallText hastip"
																		placeholder="Bill No" required="true"
																		onblur="IsAvailableBillNum(this.value);"
																		title="Please Enter Unique Bill Number per vendor" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:input path="purBillNo" type="text" id="txtBillNo"
																		name="txtBillNo"
																		class="form-control input-SmallText hastip"
																		placeholder="Bill No" required="true" readonly="true"
																		value="${purchase.purBillNo}"
																		title="Please Enter Unique Bill Number per vendor" />
																</c:when>
															</c:choose>
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div>

														</div>
														<div class="col-md-1-1" id="check"
															style="margin-top: 0px;"></div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Bill Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="purBillDate" type="text"
																		id="popup_container2" name="txtBillDate"
																		class="form-control input-SmallText" readonly="true"
																		placeholder="Bill Date" required="true" tabindex="-1"
																		value="<%=date%>"
																		onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:input path="purBillDate" type="text"
																		id="popup_container2" name="txtBillDate"
																		class="form-control input-SmallText" readonly="true"
																		tabindex="-1" placeholder="Bill Date" required="true"
																		onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)" />
																</c:when>
															</c:choose>
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<%-- <b><%=goodsReceiptNote.toString()%> No</b> --%>
															<b>GRN No</b>

														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="purId" type="text" id="txtOrderNo1"
																		readonly="true" name="txtOrderNo1"
																		class="form-control input-SmallText"
																		placeholder="Order No" required="true" tabindex="-1" />

																	<form:hidden path="poId" id="poId" />

																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:input path="purId" type="text" id="txtOrderNo1"
																		readonly="true" name="txtOrderNo1"
																		class="form-control input-SmallText"
																		placeholder="Order No" required="true" tabindex="-1" />

																</c:when>
															</c:choose>

														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Vendor GST No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="" type="text" id="vengstNo"
																		name="vengstNo" class="form-control input-SmallText"
																		placeholder="vendor gst" required="true" tabindex="-1"
																		readonly="true" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<input type="text" id="vengstNo" name="vengstNo"
																		class="form-control input-SmallText"
																		placeholder="vendor gst" required
																		value="${purchase.vendorAddress.gstNo}" readonly
																		tabindex="-1">
																</c:when>
															</c:choose>
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div>

														</div>
														<div class="col-md-1-1" id="check"
															style="margin-top: 0px;"></div>
													</div>

												</div>

												<div class="col-md-3-1 " style="margin-top: 0px;">
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Entry Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="purEntryDate" type="text"
																		id="popup_container3" name="txtEntryDate"
																		class="form-control input-SmallText" readonly="true"
																		placeholder="Entry Date" required="true" tabindex="-1"
																		value="<%=date%>"
																		onfocus="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)" />
																	<div class='col-md-1-1 center'
																		style='margin-top: -14px; margin-left: 130px; color: red;'>
																		<b> *</b>
																	</div>
																</c:when>

																<c:when test="${slaveCount !=0}">
																	<form:input path="purEntryDate" type="text"
																		id="popup_container3" name="txtEntryDate"
																		class="form-control input-SmallText" readonly="true"
																		tabindex="-1" placeholder="Entry Date" required="true"
																		onfocus="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)" />
																	<div class='col-md-1-1 center'
																		style='margin-top: -14px; margin-left: 130px; color: red;'>
																		<b> *</b>
																	</div>
																</c:when>
															</c:choose>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Due Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="purDueDate" type="text"
																		id="popup_container4" name="txtDueDate"
																		class="form-control input-SmallText" readonly="true"
																		placeholder="Due Date" required="true" tabindex="-1"
																		value="<%=date%>"
																		onfocus="displayCalendar(document.getElementById('popup_container4'),'dd/mm/yyyy',this)" />
																	<div class='col-md-1-1 center'
																		style='margin-top: -14px; margin-left: 130px; color: red;'>
																		<b> *</b>
																	</div>
																</c:when>

																<c:when test="${slaveCount !=0}">
																	<form:input path="purDueDate" type="text"
																		id="popup_container4" name="txtDueDate"
																		class="form-control input-SmallText" readonly="true"
																		tabindex="-1" placeholder="Due Date" required="true"
																		onfocus="displayCalendar(document.getElementById('popup_container4'),'dd/mm/yyyy',this)" />
																	<div class='col-md-1-1 center'
																		style='margin-top: -14px; margin-left: 130px; color: red;'>
																		<b> *</b>
																	</div>
																</c:when>
															</c:choose>

														</div>
													</div>

													<div id='poDiv' style="margin-top: 9px; display: none"
														class="col-md-12-1">
														<div style="margin-top: 0px;" class="col-md-5-1">
															<b> PO number </b>
														</div>
														<div style="margin-top: 0px;" class="col-md-7-1">

															<input type="text" value="" readonly="readonly"
																required="true" class="form-control input-SmallText"
																name="txtPOId" placeholder="Phone" id="txtPOId">
														</div>
													</div>

													<!--Added by Vikas Godse-Start-->
													<div class="col-md-4-1" style="margin-top: 0px;">
														<b> Delivery Chalan Number </b>
													</div>
													<div class="col-md-7-1"
														style="margin-top: 9px; margin-left: 17px">
														<form:input path="ltPurSlave[0].delChalanNumber"
															name="delChalanNumber" type="text"
															class="form-control input-SmallText"
															placeholder="Del Chalan No." id="txtdCN" />
													</div>
													<!-- End -->

												</div>

												<div class="col-md-4-1  panel-default"
													style="margin-top: 0px; background-color: #a8bc7b; border-radius: 10%; margin-left: 4%; border-style: dashed; border-width: 3px">
													<div class="col-md-12-1"
														style="margin-top: 9px; margin-left: 4%;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Vou No</b>
														</div>
														<div class="col-md-9-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input type="text" readonly="true" path="purDocId"
																		id="txtVouNo" name="txtVouNo"
																		class="form-control input-SmallText"
																		placeholder="Vou No" maxlength="10" required="true"
																		tabindex="-1" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:input type="text" readonly="true" path="purDocId"
																		id="" name="" class="form-control input-SmallText"
																		placeholder="Vou No" maxlength="10" required="true"
																		tabindex="-1" />
																</c:when>
															</c:choose>
														</div>
													</div>
													<div class="col-md-12-1 center" style="margin-top: 9px;">
														<!-- <div class="col-md-12-1 panel panel-default" style="margin-top: 0px;"> -->

														<c:choose>
															<c:when test="${slaveCount ==0}">
																<form:radiobutton path="purTransType" name="theme"
																	checked="true" value='0' id="rdoCashCredit"
																	onclick="myFunction(1)" />
																<b>Credit</b>
																<form:radiobutton style="margin-left:2%;"
																	path="purTransType" value='1' name="theme" id="rdoCash"
																	onclick="myFunction(2)" />
																<b>Cash</b>
																<form:radiobutton style="margin-left:2%;"
																	path="purTransType" value='2' name="theme" id="rdoCard"
																	onclick="myFunction(3)" />
																<b>Card </b>
																<!-- </div> -->
															</c:when>
															<c:when test="${slaveCount !=0}">
																<c:if test="${purchase.purTransType ==0}">
																	<form:radiobutton path="purTransType" name="theme"
																		checked="true" value='0' id="rdoCashCredit"
																		onclick="myFunction(1)" />
																	<b>Credit</b>
																	<form:radiobutton style="margin-left:2%;"
																		path="purTransType" value='1' name="theme"
																		id="rdoCash" onclick="myFunction(2)" />
																	<b>Cash</b>
																	<form:radiobutton style="margin-left:2%;"
																		path="purTransType" value='2' name="theme"
																		id="rdoCard" onclick="myFunction(3)" />
																	<b>Card </b>
																</c:if>
																<c:if test="${purchase.purTransType ==1}">
																	<form:radiobutton path="purTransType" name="theme"
																		value='0' id="rdoCashCredit" onclick="myFunction(1)" />
																	<b>Credit</b>
																	<form:radiobutton style="margin-left:2%;"
																		checked="true" path="purTransType" value='1'
																		name="theme" id="rdoCash" onclick="myFunction(2)" />
																	<b>Cash</b>
																	<form:radiobutton style="margin-left:2%;"
																		path="purTransType" value='2' name="theme"
																		id="rdoCard" onclick="myFunction(3)" />
																	<b>Card </b>
																</c:if>
																<c:if test="${purchase.purTransType ==2}">
																	<form:radiobutton path="purTransType" name="theme"
																		value='0' id="rdoCashCredit" onclick="myFunction(1)" />
																	<b>Credit</b>
																	<form:radiobutton style="margin-left:2%;"
																		path="purTransType" value='1' name="theme"
																		id="rdoCash" onclick="myFunction(2)" />
																	<b>Cash</b>
																	<form:radiobutton style="margin-left:2%;"
																		checked="true" path="purTransType" value='2'
																		name="theme" id="rdoCard" onclick="myFunction(3)" />
																	<b>Card </b>
																</c:if>
															</c:when>
														</c:choose>
													</div>
													<div class="col-md-12-1 center" style="margin-top: 2px;">
														<p id="demo"></p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div id="HSTDiv"
									style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
									<div class="col-md-12-1">
										<input type="button" value="-" class="btn btn-xs btn-success"
											style="margin: 7px; float: right" onclick="deleteRow();">
									</div>
									<table id="purchaseTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr id="h">
												<th class="col-md- center">Sr.</th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Product</div></th>
												<th class='col-md-1-0 center' style='height: 21.5px;'><div
														class='TextFont'>Unit</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Pack</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Com</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Bill Rate</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Qty</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Schm</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Schm Amt</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Batch</div></th>
												<th class=' col-md-1-0 center' style='height: 21.5px;'><div
														class='TextFont'>Expiry</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Disc</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>HSN NO</div></th>
												<th class=' col-md-1-0 center' style='height: 21.5px;'><div
														class='TextFont'>GST%</div></th>

												<th class=' col-md-1-0 center' style='height: 21.5px;'><div
														class='TextFont'>IGST%</div></th>

												<th class=' col-md-1-0 center'
													style='height: 21.5px; display: none'><div
														class='TextFont'>CESS%</div></th>

												<th class=' col-md-1-1 center'
													style='height: 21.5px; display: none'><div
														class='TextFont'>Prft%</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>M.R.P</div></th>
												<th class=' col-md-1-1 center'
													style='height: 21.5px; display: none'><div
														class='TextFont'>Rate</div></th>
												<th class=' col-md-1-1 center'
													style='height: 21.5px; display: none''><div
														class='TextFont'>Pur Rate</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Amount</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Select</div></th>
												<!-- <th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Select</div></th>		 -->
											</tr>
										</thead>
										<tbody id="DRRDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">

											<c:choose>
												<c:when test="${slaveCount ==0}">
													<tr id="remove1">
														<td><label class='input-SmallText'>1</label> <input
															type='hidden' id='hiddenCurrentRow' value='0' /></td>

														<td><form:hidden id="purSlaveId0"
																path="ltPurSlave[0].purSlaveId" /> <form:hidden
																id="hiddenProductId1"
																path="ltPurSlave[0].productMaster.productId" /> <form:input
																path="ltPurSlave[0].productMaster.productName"
																type='text'
																class='form-control input-SmallText # deleteGroup1 # textProductName1'
																id="textProductName1" autocomplete="off"
																onkeypress=" setValuesToAutocomplete(event,1)" />
															<%-- onclick="load(1,${count.index+1})" 	<form:hidden id="textPurIssueQty1"
																path="ltPurSlave[0].purchaseEntrySlaveIssueQty" /> data-toggle="modal" data-target="#Sales_Quotation_Form"--%>
														</td>

														<td><form:input type='text'
																path="ltPurSlave[0].productMaster.productUnit"
																class='form-control input-SmallText' id="textUnit1"
																readonly="true" tabindex="-1"></form:input></td>

														<td><form:input type='text'
																path="ltPurSlave[0].productMaster.packingMaster.packType"
																readonly="true" class='form-control input-SmallText'
																id="textPack1" tabindex="-1"></form:input></td>

														<td><form:input type='text'
																path="ltPurSlave[0].productMaster.companyMaster.compShortName"
																readonly="true" class='form-control input-SmallText'
																id="textCom1" tabindex="-1"></form:input></td>

														<td><form:input type='text'
																path="ltPurSlave[0].purSlaveBillRate"
																class='form-control input-SmallText' id="billRate1"
																onblur="calculatePopUpTotalAmount(1),calculateDiscount(1),calculateVatAmount(1),isFloatingPoint('billRate1');" /></td>

														<td><form:input type='text'
																path="ltPurSlave[0].purSlaveQty"
																class='form-control input-SmallText' id="textQty1"
																onblur="calculatePopUpTotalAmount(1),isNumber('textQty1');" /></td>

														<td><form:input type='text'
																path="ltPurSlave[0].purSlaveScheme"
																class='form-control input-SmallText' id="textSchm1" /></td>
														<!-- onblur="calSchemeAmt(1)" -->

														<td><form:input type='text'
																path="ltPurSlave[0].purSlaveSchemeAmt"
																class='form-control input-SmallText' id="textSchmAmt1"
																onblur="funSchemeAmt(1)" /></td>

														<td><form:input type='text'
																path="ltPurSlave[0].productMaster.batchMaster[0].batchCode"
																class='form-control input-SmallText batchclass'
																id="textBatch1"
																onblur="checkBatchAvailability(this.value);" /></td>

														<td><form:input type='text'
																path="ltPurSlave[0].productMaster.batchMaster[0].batchExpDate"
																class='form-control input-SmallText' id="textExpiry1"
																onblur="isExpiryDateGRN(1);" /></td>

														<td><form:input type='text'
																path="ltPurSlave[0].purDisc"
																class='form-control input-SmallText' id="textDisc1"
																onblur="calculateDiscount(1),isFloatingPoint('textDisc1');"
																onchange="chkDiscount();" /></td>
														<td><form:input type='text'
																path="ltPurSlave[0].purHsn"
																class='form-control input-SmallText' id="textHsn1"
																readonly="true" tabindex="-1" /></td>
														<td><form:input type='text'
																path="ltPurSlave[0].purVat"
																class='form-control input-SmallText' id="textNewVat1" /></td>

														<td><form:input type='text'
																path="ltPurSlave[0].purIgst"
																class='form-control input-SmallText' id="textIgst1" /></td>

														<td style="display: none"><form:input type='text'
																path="ltPurSlave[0].purCess"
																class='form-control input-SmallText' id="textCess1" /></td>



														<td style="display: none"><form:input type='text'
																path="" class='form-control input-SmallText'
																id="textPrft1" readonly="true" tabindex="-1" /></td>

														<td><form:input type='text'
																path="ltPurSlave[0].purSlaveMrp"
																class='form-control input-SmallText' id="textMrp1"
																onblur="setRateValue(1),calculateProffit(1),calculatePopUpTotalAmount(1);" /></td>

														<td style="display: none"><form:input type='text'
																path="ltPurSlave[0].purslaverate"
																class='form-control input-SmallText' id="textRate1"
																readonly="true" tabindex="-1" /></td>



														<td style="display: none"><form:input type='text'
																path="ltPurSlave[0].purSlavePurchaseRate"
																class='form-control input-SmallText'
																id="textPurchaseRate1" readonly="true" /></td>

														<td><form:input type='text'
																path="ltPurSlave[0].purSlaveAmt"
																class='form-control input-SmallText' id="textAmount1"
																readonly="true" tabindex="-1" /></td>

														<td style="display: none;"><form:input
																path="ltPurSlave[0].productMaster.batchMaster[0].batchId"
																type="text" id="textBatchId1" name="textBatchId1"
																class='form-control input-SmallText' readonly="true" />
														</td>


														<td style="display: none;"><form:input
																path="ltPurSlave[0].purDiscAmt" type="text"
																id="textDiscAmt1" name="textDiscAmt1"
																class='form-control input-SmallText' readonly="true" />
														</td>

														<td style="display: none;"><form:input path=""
																type="text" id="textVatAmt1" name="textVatAmt1"
																class='form-control input-SmallText' readonly="true" />
														</td>

														<td><input type="checkbox" name="deleteGroup"
															value="1" id="deleteGroup1"></td>
													</tr>
												</c:when>

												<c:when test="${slaveCount !=0}">
													<c:forEach items="${purchase.ltPurSlave}" var="row"
														varStatus="count">
														<tr id="remove${count.index+1}">
															<td><label class='input-SmallText'>${(count.index)+1}</label>
																<input type='hidden' id='hiddenCurrentRow'
																value='${count.index+1}' /></td>

															<form:hidden id="purSlaveId${count.index+1}"
																path="ltPurSlave[${(count.index)}].purSlaveId" />

															<form:hidden id="batchId${count.index+1}"
																path="ltPurSlave[${(count.index)}].batchMaster.batchId" />

															<form:hidden id="hiddenProductId${count.index+1}"
																path="ltPurSlave[${(count.index)}].productMaster.productId" />

															<%--  	<form:hidden id="textPurIssueQty${count.index+1}"
																path="ltPurSlave[${(count.index)}].purchaseEntrySlaveIssueQty" /> --%>

															<td><form:input
																	path="ltPurSlave[${(count.index)}].productMaster.productName"
																	type='text' class='form-control input-SmallText'
																	readonly="true" id="textProductName${count.index+1 }"
																	tabindex="-1"
																	onkeypress=" setValuesToAutocomplete(event,${count.index+1 })"></form:input></td>


															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].productMaster.productUnit"
																	class='form-control input-SmallText'
																	id="textUnit${count.index+1 }" readonly="true"
																	tabindex="-1"></form:input></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].productMaster.packingMaster.packType"
																	readonly="true" class='form-control input-SmallText'
																	id="textPack${count.index+1 }" tabindex="-1"></form:input></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].productMaster.companyMaster.compShortName"
																	readonly="true" class='form-control input-SmallText'
																	id="textCom${count.index+1 }" tabindex="-1"></form:input></td>

															<td><form:input type='text'
																	path="ltPurSlave[${count.index}].purSlaveBillRate"
																	class='form-control input-SmallText'
																	id="billRate${count.index+1 }"
																	onblur="calculatePopUpTotalAmount(${count.index}),calculateVatAmount(${count.index}),isFloatingPoint('billRate${count.index+1 }'),calculateDiscount(${count.index});" /></td>


															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purSlaveQty"
																	class='form-control input-SmallText'
																	id="textQty${count.index+1 }"
																	onblur="calculatePopUpTotalAmount(${count.index+1 }),isNumber('textQty${count.index+1 }');" /></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purSlaveScheme"
																	class='form-control input-SmallText'
																	id="textSchm${count.index+1 }" /></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purSlaveSchemeAmt"
																	class='form-control input-SmallText'
																	id="textSchmAmt${count.index+1 }"
																	onblur="funSchemeAmt(${count.index+1 })" /></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].productMaster.batchMaster[0].batchCode"
																	class='form-control input-SmallText batchclass'
																	id="textBatch${(count.index)+1 }"
																	value="${row.batchMaster.batchCode}"
																	onblur="checkBatchAvailability(this.value);" /></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].productMaster.batchMaster[0].batchExpDate"
																	class='form-control input-SmallText'
																	id="textExpiry${(count.index)+1 }"
																	value="${row.batchMaster.batchExpDate}"
																	onblur="isExpiryDateGRN(${(count.index)+1 });" /></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purDisc"
																	class='form-control input-SmallText'
																	id="textDisc${count.index+1 }"
																	onblur="calculateDiscount(${count.index+1 }),isFloatingPoint('textDisc${count.index+1 }');"
																	onchange="chkDiscount();" /></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purHsn"
																	class='form-control input-SmallText'
																	id="textHsn${count.index+1 }" readonly="true"
																	tabindex="-1" /></td>

															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purVat"
																	class='form-control input-SmallText'
																	id="textNewVat${count.index+1 }" readonly="true"
																	tabindex="-1" /></td>


															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purIgst"
																	class='form-control input-SmallText'
																	id="textIgst${count.index+1 }" readonly="true"
																	tabindex="-1" /></td>

															<td style="display: none"><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purCess"
																	class='form-control input-SmallText'
																	id="textCess${count.index+1 }" readonly="true"
																	tabindex="-1" /></td>


															<td style="display: none"><form:input type='text'
																	path="" class='form-control input-SmallText'
																	id="textPrft${count.index+1 }" readonly="true"
																	tabindex="-1" /></td>
															<td><form:input type='text'
																	path="ltPurSlave[${(count.index)}].purSlaveMrp"
																	class='form-control input-SmallText'
																	id="textMrp${count.index+1 }"
																	onblur="setRateValue(${count.index+1 }),calculateProffit(${count.index+1 }),calculatePopUpTotalAmount(${count.index+1 });" /></td>

															<td style="display: none"><form:input type='text'
																	path="ltPurSlave[${count.index}].purslaverate"
																	class='form-control input-SmallText' id="textRate1"
																	readonly="true" /></td>



															<td style="display: none"><form:input type='text'
																	path="ltPurSlave[${count.index}].purSlavePurchaseRate"
																	class='form-control input-SmallText'
																	id="textPurchaseRate${count.index+1 }" readonly="true" /></td>

															<td><form:input type='text'
																	path="ltPurSlave[${count.index}].purSlaveAmt"
																	class='form-control input-SmallText'
																	id="textAmount${count.index+1 }" readonly="true"
																	tabindex="-1" /></td>


															<td style="display: none;"><form:input
																	path="ltPurSlave[${count.index}].purDiscAmt"
																	type="text" id="textDiscAmt${count.index+1}"
																	name="textDiscAmt${count.index+1}"
																	class='form-control input-SmallText' readonly="true" />
															</td>

															<td style="display: none;"><form:input path=""
																	type="text" id="textVatAmt${count.index+1}"
																	name="textVatAmt${count.index+1}"
																	class='form-control input-SmallText' readonly="true" />
															<td style="display: none;"><form:input
																	path="ltPurSlave[${count.index}].productMaster.batchMaster[0].batchId"
																	type="text" id="textBatchId${count.index+1 }"
																	name="textBatchId${count.index+1 }"
																	class='form-control input-SmallText' readonly="true"
																	value="${row.batchMaster.batchId}" />
															<td><input type="checkbox" name="deleteGroup"
																value="${count.index+1}" disabled="true"
																id="deleteGroup${count.index+1}"></td>
														</tr>
													</c:forEach>
													<tr id="remove${slaveCount+1}">
														<td><label class='input-SmallText'>${slaveCount+1}</label></td>
														<td><input type='hidden' id='hiddenCurrentRow'
															value='${slaveCount+1}' /> <form:hidden
																path="ltPurSlave[${slaveCount}].purSlaveId" /> <form:hidden
																path="ltPurSlave[${slaveCount}].productMaster.productId"
																id="hiddenProductId${slaveCount+1}" /> <form:input
																path="ltPurSlave[${slaveCount}].productMaster.productName"
																type='text' class='form-control input-SmallText'
																id="textProductName${slaveCount+1}"
																onkeypress=" setValuesToAutocomplete(event,${slaveCount+1});" />
															<form:hidden id="batchId${slaveCount+1}"
																path="ltPurSlave[${slaveCount}].batchMaster.batchId" />

															<%-- 	<form:hidden
																id="textPurIssueQty${slaveCount+1}"
																path="ltPurSlave[${slaveCount}].purchaseEntrySlaveIssueQty" /> --%>
														</td>
														<td><form:input
																path="ltPurSlave[${slaveCount}].productMaster.productUnit"
																type='text' class='form-control input-SmallText'
																id="textUnit${slaveCount+1}" tabindex="-1"
																readonly='true' /></td>
														<td><form:input
																path="ltPurSlave[${slaveCount}].productMaster.packingMaster.packType"
																type='text' class='form-control input-SmallText'
																id="textPack${slaveCount+1}" readonly="true"
																tabindex="-1" /></td>
														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].productMaster.companyMaster.compShortName"
																class='form-control input-SmallText'
																id="textCom${slaveCount+1}" readonly='true'></form:input></td>


														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].purSlaveBillRate"
																class='form-control input-SmallText'
																id="billRate${slaveCount+1}"
																onblur="calculatePopUpTotalAmount(${slaveCount+1}),,calculateVatAmount(${slaveCount+1}),isFloatingPoint('billRate${slaveCount+1}'),calculateDiscount(${slaveCount+1});" /></td>

														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].purSlaveQty"
																class='form-control input-SmallText'
																id="textQty${slaveCount+1}"
																onblur="calculatePopUpTotalAmount(${slaveCount+1}),isNumber('textQty${slaveCount+1}');" /></td>

														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].purSlaveScheme"
																class='form-control input-SmallText'
																id="textSchm${slaveCount+1}" /></td>

														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].purSlaveSchemeAmt"
																class='form-control input-SmallText'
																id="textSchmAmt${slaveCount+1}"
																onblur="funSchemeAmt(${slaveCount+1 })" /></td>

														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].productMaster.batchMaster[0].batchCode"
																class='form-control input-SmallText batchclass'
																id="textBatch${slaveCount+1}"
																onblur="checkBatchAvailability(this.value);" /></td>


														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].productMaster.batchMaster[0].batchExpDate"
																class='form-control input-SmallText'
																id="textExpiry${slaveCount+1}"
																onblur="isExpiryDateGRN(${slaveCount+1});" /></td>


														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].purDisc"
																class='form-control input-SmallText'
																id="textDisc${slaveCount+1}"
																onblur="calculateDiscount(${slaveCount+1}),isFloatingPoint('textDisc${slaveCount+1}');"
																onchange="chkDiscount();" /></td>


													<%-- 	<td><form:input type='text'
																path="ltPurSlave[${(slaveCount)}].purHsn"
																class='form-control input-SmallText'
																id="textHsn${slaveCount+1 }" readonly="true" /></td> --%>

														<%-- <td><form:input type='text'
																path="ltPurSlave[${(slaveCount)}].purVat"
																class='form-control input-SmallText'
																id="textNewVat${slaveCount+1 }" readonly="true" /></td> --%>


														<%-- <td><form:input type='text'
																path="ltPurSlave[${(slaveCount)}].purIgst"
																class='form-control input-SmallText'
																id="textIgst${slaveCount+1 }" readonly="true" /></td> --%>
<%-- 
														<td style="display: none"><form:input type='text'
																path="ltPurSlave[${(slaveCount)}].purCess"
																class='form-control input-SmallText'
																id="textCess${slaveCount+1 }" readonly="true" /></td> --%>



														<td style="display: none"><form:input type='text'
																path="" class='form-control input-SmallText'
																id="textPrft${slaveCount+1}" readonly='true' /></td>

														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].purSlaveMrp"
																class='form-control input-SmallText'
																id="textMrp${slaveCount+1}"
																onblur="setRateValue(${slaveCount+1}),calculateProffit(${slaveCount+1});" /></td>

														<td style="display: none"><form:input type='text'
																path="ltPurSlave[${slaveCount}].purslaverate"
																class='form-control input-SmallText'
																id="textRate${slaveCount+1}" readonly='true' /></td>



														<td style="display: none"><form:input type='text'
																path="ltPurSlave[${slaveCount}].purSlavePurchaseRate"
																class='form-control input-SmallText'
																id="textPurchaseRate${slaveCount+1 }" readonly="true" /></td>

														<td><form:input type='text'
																path="ltPurSlave[${slaveCount}].purSlaveAmt"
																class='form-control input-SmallText'
																id="textAmount${slaveCount+1}" readonly='true' /></td>


														<td style="display: none;"><form:input
																path="ltPurSlave[${slaveCount}].productMaster.batchMaster[0].batchId"
																type="text" id="textBatchId${slaveCount+1}"
																name="textBatchId${slaveCount+1}"
																class='form-control input-SmallText' readonly="true"
																value="${row.batchMaster.batchId}" />
														<td><input type="checkbox" name="deleteGroup"
															value="${slaveCount+1}" id="deleteGroup${slaveCount+1}"></td>


														<td style="display: none;"><form:input
																path="ltPurSlave[${slaveCount}].purDiscAmt" type="text"
																id="textDiscAmt${slaveCount+1}"
																name="textDiscAmt${slaveCount+1}"
																class='form-control input-SmallText' readonly="true" />
														<td style="display: none;"><form:input path=""
																type="text" id="textVatAmt${slaveCount+1}"
																name="textVatAmt${slaveCount+1}"
																class='form-control input-SmallText' readonly="true" />

														</td>
													</tr>

												</c:when>

											</c:choose>
										</tbody>

									</table>
								</div>
								<div class="col-md-12-1 " style="margin-top: 0px;">
									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px;">

										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Less</b>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b>Item Disc.</b>
											</div>

											<div class="col-md-8-1 marginBottomClass"
												style="margin-top: -3px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purItemDisc" type="text"
															id="txtItemDisc" readonly="true" name="txtItemDisc"
															class="form-control input-SmallText"
															placeholder="Item Disc" maxlength="10"
															onblur="isFloatingPoint('txtItemDisc'),CheckGrossAmt()" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purItemDisc" type="text"
															id="txtItemDisc" name="txtItemDisc"
															class="form-control input-SmallText"
															placeholder="Item Disc" maxlength="10" readonly="true"
															onblur="isFloatingPoint('txtItemDisc'),CheckGrossAmt()" />
													</c:when>
												</c:choose>
											</div>

										</div>

										<div style="display: none">
											<div class="col-md-12-1 " style="margin-top: 0px;">
												<div class="col-md-4-1" style="margin-top: 0px;">
													<b>Schm.Disc.</b>
												</div>
												<div class="col-md-8-1 marginBottomClass"
													style="margin-top: -0px;">
													<c:choose>
														<c:when test="${slaveCount !=0}">
															<form:input path="purSchmDisc" type="text"
																id="txtSchmDisc" name="txtSchmDisc"
																class="form-control input-SmallText"
																placeholder="Schm.Disc" maxlength="10"
																value="${purchase.purSchmDisc}"
																onblur="isFloatingPoint('txtSchmDisc'),CheckGrossAmt()" />
														</c:when>
														<c:when test="${slaveCount ==0}">
															<form:input path="purSchmDisc" type="text"
																id="txtSchmDisc" name="txtSchmDisc"
																class="form-control input-SmallText"
																placeholder="Schm.Disc" maxlength="10" value='0'
																onblur="isFloatingPoint('txtSchmDisc'),CheckGrossAmt()" />
														</c:when>
													</c:choose>
												</div>
											</div>

											<div class="col-md-12-1" style="margin-top: 0px;">
												<div class="col-md-4-1" style="margin-top: 0px;">
													<b>Spl.Disc.</b>
												</div>
												<div class="col-md-8-1 marginBottomClass"
													style="margin-top: -0px;">
													<c:choose>
														<c:when test="${slaveCount !=0}">
															<form:input path="purSplDisc" type="text" id="txtSplDisc"
																name="txtSplDisc" class="form-control input-SmallText"
																placeholder="Spl.Disc" maxlength="10"
																value="${purchase.purSplDisc}"
																onblur="isFloatingPoint('txtSplDisc'),CheckGrossAmt()" />
														</c:when>
														<c:when test="${slaveCount ==0}">
															<form:input path="purSplDisc" type="text" id="txtSplDisc"
																name="txtSplDisc" class="form-control input-SmallText"
																placeholder="Spl.Disc" maxlength="10" value='0'
																onblur="isFloatingPoint('txtSplDisc'),CheckGrossAmt()" />
														</c:when>
													</c:choose>
												</div>


											</div>

											<div class="col-md-12-1"
												style="margin-top: 0px; margin-bottom: 0px;">
												<div class="col-md-4-1" style="margin-top: 0px;">
													<b>Debit Amt</b>
												</div>
												<div class="col-md-8-1 marginBottomClass"
													style="margin-top: -0px;">
													<c:choose>
														<c:when test="${slaveCount !=0}">
															<form:input path="purDebitAmt" type="text"
																id="txtdebitAmt1" name="txtdebitAmt1"
																class="form-control input-SmallText"
																placeholder="Debit Amt" maxlength="10"
																value="${purchase.purDebitAmt}"
																onblur="isFloatingPoint('txtdebitAmt1'),CheckGrossAmt();" />
														</c:when>
														<c:when test="${slaveCount ==0}">
															<form:input path="purDebitAmt" type="text"
																id="txtdebitAmt1" name="txtdebitAmt1"
																class="form-control input-SmallText"
																placeholder="Debit Amt" maxlength="10" value='0'
																onblur="isFloatingPoint('txtdebitAmt1'),CheckGrossAmt();" />
														</c:when>
													</c:choose>
												</div>
											</div>
										</div>


										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-4-1" style="margin-top: 0px;">
												<b>C.D%</b>
											</div>
											<div class="col-md-4-1 marginBottomClass"
												style="margin-top: 0px;">

												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="CD" type="text" id="txtCD1"
															class="form-control input-SmallText" placeholder="C.D%"
															required="true" value="${purchase.CD}"
															onblur="isFloatingPoint('txtCD1'),CheckGrossAmt();" />

													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="CD" type="text" id="txtCD1"
															name="txtCD1" class="form-control input-SmallText"
															placeholder="C.D%" maxlength="10"
															onblur="isFloatingPoint('txtCD1'),CheckGrossAmt();" />

													</c:when>
												</c:choose>


											</div>
											<div class="col-md-4-1 marginBottomClass"
												style="margin-top: -21px; margin-left: 122px">

												<form:input path="CDAmt" type="text" id="txtCDAmt"
													name="txtCDAmt" class="form-control input-SmallText"
													placeholder="C.DAmount" maxlength="10"
													onblur="calculateTotalLess(this.value),calPerForCon();" />
											</div>
										</div>

									</div>

									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">

										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Add</b>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Octroi</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purOctroi" type="text" id="txtOctroi"
															name="txtOctroi" class="form-control input-SmallText"
															placeholder="Octroi" maxlength="10"
															value="${purchase.purOctroi}"
															onblur="isFloatingPoint('txtOctroi'),calculateTotalAdd();" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purOctroi" type="text" id="txtOctroi"
															name="txtOctroi" class="form-control input-SmallText"
															placeholder="Octroi" maxlength="10"
															onblur="isFloatingPoint('txtOctroi'),calculateTotalAdd();" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Surcharge</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purSurcharge" type="text"
															id="txtSurcharge" name="txtSurcharge"
															class="form-control input-SmallText"
															value="${purchase.purSurcharge}" placeholder="Surcharge"
															maxlength="10"
															onblur="isFloatingPoint('txtSurcharge'),calculateTotalAdd();" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purSurcharge" type="text"
															id="txtSurcharge" name="txtSurcharge"
															class="form-control input-SmallText"
															placeholder="Surcharge" maxlength="10"
															onblur="isFloatingPoint('txtSurcharge'),calculateTotalAdd();" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Credit Amt</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purCreditAmt" type="text"
															id="txtCreditAmt" name="txtCreditAmt"
															class="form-control input-SmallText"
															value="${purchase.purCreditAmt}" placeholder="Credit Amt"
															maxlength="10"
															onblur="isFloatingPoint('txtCreditAmt'),calculateTotalAdd();" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purCreditAmt" type="text"
															id="txtCreditAmt" name="txtCreditAmt"
															class="form-control input-SmallText"
															placeholder="Credit Amt" maxlength="10"
															onblur="isFloatingPoint('txtCreditAmt'),calculateTotalAdd();" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Freight</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purFreight" type="text" id="txtFreight"
															name="txtFreight" class="form-control input-SmallText"
															placeholder="Freight" maxlength="10"
															value="${purchase.purFreight}"
															onblur="isFloatingPoint('txtFreight'),calculateTotalAdd();" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purFreight" type="text" id="txtFreight"
															name="txtFreight" class="form-control input-SmallText"
															placeholder="Freight" maxlength="10"
															onblur="isFloatingPoint('txtFreight'),calculateTotalAdd();" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;"></div>
									</div>

									<div class="col-md-2-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">
										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Tax Info.</b>
										</div>
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>GST Total:</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">

														<form:input path="purTaxVat5" type="text" id="txtVat5"
															name="txtVat5" class="form-control input-SmallText"
															readonly="true" placeholder="GST" maxlength="10"
															value="${purchase.purTaxVat5}" />

													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purTaxVat5" type="text" id="txtVat5"
															name="txtVat5" class="form-control input-SmallText"
															placeholder="GST" maxlength="10" readonly="true" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>IGST Total:</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purTaxVat12" type="text" id="txtVat12"
															name="txtVat12" class="form-control input-SmallText"
															readonly="true" placeholder="gst" maxlength="10"
															value="${purchase.purTaxVat12}" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purTaxVat12" type="text" id="txtVat12"
															name="txtVat12" class="form-control input-SmallText"
															placeholder="gst" maxlength="10" readonly="true" />
													</c:when>
												</c:choose>


											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>CESS Total:</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purTaxLbt" type="text" id="txtlbt"
															name="txtlbt" class="form-control input-SmallText"
															placeholder="cess" maxlength="10"
															value="${purchase.purTaxLbt}" readonly="true" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purTaxLbt" type="text" id="txtlbt"
															name="txtlbt" class="form-control input-SmallText"
															placeholder="cess" maxlength="10" readonly="true" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;"
											hidden="true">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>CST</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purTaxCst" type="text" id="txtcst"
															name="txtcst" class="form-control input-SmallText"
															placeholder="CST" maxlength="10"
															value="${purchase.purTaxCst}" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purTaxCst" type="text" id="txtcst"
															name="txtcst" class="form-control input-SmallText"
															placeholder="CST" maxlength="10" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>TAX Total:</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purTotalVat" type="text"
															id="txtTotalVat" class="form-control input-SmallText"
															placeholder="Total Vat" required="true"
															value="${purchase.purTotalVat}" readonly="true" />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input id="txtTotalVat"
															class="form-control input-SmallText" type="text"
															name="txtTotalVat" readonly="true" path="purTotalVat"
															placeholder="Total Vat" value='0' />
													</c:when>
												</c:choose>
											</div>
										</div>
									</div>

									<div class="col-md-1-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%" hidden="true">

										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Other</b>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-12-1" style="margin-top: 9px;">
												<b>Round</b>
											</div>
											<div class="col-md-12-1" style="margin-top: 0px;">
												<%-- <c:choose>
													<c:when test="${slaveCount !=0}">
												<form:input path="purRound" type="text" id="txtRound"
													name="txtRound" class="form-control input-SmallText"
													placeholder="Round" maxlength="10"  value="${purchase.purRound}" readonly="true"
													 />
													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purRound" type="text" id="txtRound"
													name="txtRound" class="form-control input-SmallText"
													placeholder="Round" maxlength="10"
													onblur="isFloatingPoint('txtRound'),setRoundNetAmount()" />
													</c:when>
												</c:choose>	 --%>
												<c:choose>
													<c:when test="${slaveCount !=0}">

														<button type="button" id="round"
															class="btn btn-xs btn-info">Round</button>
													</c:when>
													<c:when test="${slaveCount ==0}">

														<button type="button" id="round"
															class="btn btn-xs btn-info"
															onclick="setRoundNetAmount();">Round</button>
													</c:when>
												</c:choose>


											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-12-1 panel panel-default"
												style="margin-top: 9px;"></div>
										</div>
									</div>
									<div class="col-md-1-1 panel panel-default"
										style="margin-top: 9px; margin-left: 2%">
										<div style="margin-top: 0px;" class="col-md-12-1 center">
											<b>Debit Notes</b>
										</div>

										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-12-1" style="margin-top: 0px;">
												<b>Count</b>
											</div>
											<div class="col-md-12-1 center" style="margin-top: 0px;">
												<form:input path="" type="text" id="txtCount"
													name="txtCount" class="form-control input-SmallText"
													placeholder="Count" maxlength="10"
													onblur="isFloatingPoint('txtCount');" />

											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-12-1" style="margin-top: 0px;">
												<b>Amount</b>
											</div>
											<div class="col-md-12-1 center" style="margin-top: 0px;">
												<form:input path="" type="text" id="textAmount"
													name="textAmount" class="form-control input-SmallText"
													placeholder="Amount" maxlength="10"
													onblur="isFloatingPoint('textAmount');" />

											</div>
										</div>


									</div>

									<div class="col-md-2-1 center"
										style="margin-top: 9px; margin-left: 6%;">

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 5px;">
												<b>Gross Amount</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purGrossAmt" type="text" id="txtGross"
															name="txtGross" class="form-control input-SmallText"
															placeholder="Gross Amount" maxlength="10" required="true"
															readonly="true" value="${purchase.purGrossAmt}" />

													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purGrossAmt" type="text" id="txtGross"
															name="txtGross" class="form-control input-SmallText"
															value='0' placeholder="Gross Amount" maxlength="10"
															required="true" readonly="true"
															onblur=" calculateNetAmount();" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Less</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purLess" type="text" id="txtLess"
															name="txtLess" class="form-control input-SmallText"
															placeholder="Less" maxlength="10" required="true"
															readonly="true" value="${purchase.purLess}" />

													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purLess" type="tex902t" id="txtLess"
															name="txtLess" value='0'
															class="form-control input-SmallText" placeholder="Less"
															maxlength="10" required="true" readonly="true" />
														<%-- onblur="CheckGrossAmt();" /> --%>
													</c:when>
												</c:choose>

											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Add</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purAdd" id="txtAdd" name="txtAdd"
															class="form-control input-SmallText" placeholder="Add"
															maxlength="10" readonly="true" value="${purchase.purAdd}" />

													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purAdd" type="text" id="txtAdd"
															name="txtAdd" value='0'
															class="form-control input-SmallText" placeholder="Add"
															maxlength="10" required="true" readonly="true" />
													</c:when>
												</c:choose>
											</div>
										</div>

										<div class="col-md-12-1" style="margin-top: 0px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>GST</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purVat" type="text" id="textVat"
															class="form-control input-SmallText" placeholder="Vat"
															maxlength="10" required="true" value="${purchase.purVat}"
															readonly="true" />

													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purVat" type="text" id="textVat"
															name="textVat" value='0'
															class="form-control input-SmallText" placeholder="Vat"
															maxlength="10" required="true" readonly="true" />
													</c:when>
												</c:choose>
											</div>

										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Net Amount</b>
											</div>
											<div class="col-md-7-1 marginBottomClass"
												style="margin-top: 0px;">
												<c:choose>
													<c:when test="${slaveCount !=0}">
														<form:input path="purNetAmt" type="text" id="txtNetAmt"
															name="txtNetAmt" class="form-control input-SmallText"
															placeholder="Net Amount" maxlength="10" required="true"
															readonly="true" value="${purchase.purNetAmt}" />

													</c:when>
													<c:when test="${slaveCount ==0}">
														<form:input path="purNetAmt" type="text" id="txtNetAmt"
															value='0' name="txtNetAmt"
															class="form-control input-SmallText"
															placeholder="Net Amount" maxlength="10" required="true"
															readonly="true" />
													</c:when>
												</c:choose>
											</div>

										</div>
									</div>

								</div>

								<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
								<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
								<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div>
							</div>
						</div>

						<c:choose>
							<c:when test="${slaveCount ==0}">
								<input type="hidden" value="1" id="RowCount">
							</c:when>
							<c:when test="${slaveCount !=0}">
								<input type="hidden" value="${slaveCount+1}" id="RowCount">
								<script> /* calculateVat(); */CheckGrossAmt(); </script>
							</c:when>
						</c:choose>
						<%@include file="Pharma_Footer.jsp"%>
					</form:form>
				</div>
			</div>
		</div>

		<input id="trcount" type="hidden" value="0">
		<!--  <input id="stateIds" type="hidden" value="0"> -->
		<!-- <div id="hiddenState"></div> -->
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>

	</section>
</body>
</html>