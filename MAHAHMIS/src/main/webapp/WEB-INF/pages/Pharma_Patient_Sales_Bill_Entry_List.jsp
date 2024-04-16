<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Patient Sale | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


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
	href="<c:url value="../.././pharma-resources/css/morphext.css"/>">
<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

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
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Patient_Sale_Bill.js"/>"></script>
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
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_patient_batch_popup.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/morphext.min.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>

<script type="text/javascript">
onload = function() {
	
	/* autoSuggestionForPateintName1("txtPatientName1", "onload");  */
	
};
</script>
<script>
function validateSearch()
{
	 if($('#txtPatientName1').val()!=null && $('#txtPatientName1').val()!="")
	{ 
		searchPatientSale($("#hiddenPatientId1").val());
	}
	else
	{	
		alert("Enter Patient Name in Search Box");
	    $('#txtPatientName1').focus();
	} 

}
function validateSearch1()
{
	  if($('#txtPatientId').val()!=null && $('#txtPatientId').val()!="")
	{ 
		searchPatientSaleById($("#txtPatientId").val());
	}
	else
	{	
		alert("Enter Patient Id in Search Box");
	    $('#txtPatientId').focus();
	}  

}

function validateSearch2()
{
	  if($('#txtInvoiceId').val()!=null && $('#txtInvoiceId').val()!="")
	{ 
		searchInvoiceSaleById($("#txtInvoiceId").val());
	}
	else
	{	
		alert("Enter Invoice No in Search Box");
	    $('#txtInvoiceId').focus();
	}  

}
</script>
<script>
function reset () {
	$("#toggleCSS").attr("href", "<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>");
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
		/* App.setPage("Pharma_Patient_Sales_Bill_Entry");  //Set current page */
		App.init(); //Initialise plugins and elements
	});
	
	shortcut.add("ctrl+f",function() {
		openForm('patientSale');
	});
</script>
</head>
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

			<%@include file="Pharma_left_menu_transaction.jsp"%>

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
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
												<li>Patient Sales Bill Entry</li>
											<div class="li pull-right" style="margin-left: 9px;"><a
												href="../../pharmacy/patientSale/view-frm"
												class="btn btn-xs btn-info">New Patient Sale Entry(Ctrl+f)</a></div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							                                    <div id="SearchContent" class="col-md-12-1" style="margin-bottom:32px;">
							                                         <div class="col-md-4-1" style="padding-left: 10px;">
													                      <div class="col-md-2-1">
																			<label class="checkbox input-SmallText"> <input
																				id="OPDchkC" checked="true"
																				type="radio" value="opd" name="typeOfpatient1"
																				style="margin-top: 0px !important;"> OPD
																			</label>
																		</div>
																		<div class="col-md-2-1">
																			<label class="checkbox input-SmallText"> <input
																				id="IPDchkC" type="radio"
																				value="ipd" name="typeOfpatient1"
																				style="margin-top: 0px !important;"> IPD
																			</label>
																		</div>
																		<div class="col-md-3-1">
																			<label class="checkbox input-SmallText "> <input
																				id="chkEntireDatabaseC"
																				type="radio" value="diagnosis"
																				name="typeOfpatient1"
																				style="margin-top: 0px !important;"> Entire
																				Database
																			</label>
																		</div>
							                                            </div>
							   <div class="col-md-9-1" style="margin-left:-162px;margin-top:9px;">                             
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1'>Patient Name</div>
								<div class='col-md-2-1' style="margin-left:-12px;margin-top:-8px;">
							                        <input name="txtPatientName1" type="text" id="txtPatientName1" autocomplete="off"
										            class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1 " onblur="splitContentOfPatientList($('#txtPatientName1').val())" /> 
										            	<input type="hidden" id="hiddenPatientId1" />
										            	
										            	<script type="text/javascript">
										            		$("#txtPatientName1")
																	.autocomplete(
																			{
																				source : function(
																						request,
																						response) {

																					var findingName = $(
																							"#txtPatientName1")
																							.val();
																					var inputs = [];
																					inputs
																							.push('patientName='
																									+ findingName);
																					
																					var typeOfpatient = $('input[name="typeOfpatient1"]:checked').val();

																					if (typeOfpatient == "diagnosis") {
																						inputs.push('isEdit=yes');
																					} else {
																						inputs.push('isEdit=no');
																					}


																					//inputs.push('action=fetchPharmaPateintNameAutosugg');
																					inputs.push('typeOfpatient=' + typeOfpatient);
																					var str = inputs
																							.join('&');

																					jQuery
																							.ajax({
																								async : true,
																								type : "GET",
																								data : str
																										+ "&reqType=AJAX",
																									//	url : "../../fetchPateintNameAutosugg",
																								url : "../../pharmacy/patientSale/fetchPharmaPatientNameAutoSuggest",
																								timeout : 1000 * 60 * 5,
																								catche : false,
																								error : function() {
																									alert('error');
																								},
																								success : function(
																										r) {
																									var availableTags = [];

																									//ajaxResponse = eval('(' + r + ')');

																									for ( var i = 0; i < r.length; i++) {



																										availableTags
																												.push(r[i].f_name
																														+ " "
																														+ r[i].m_name
																														+ " "
																														+ r[i].l_name	
																														+ "__"
																														+ r[i].patientId
																														+ "_"
																														+ r[i].treatmentId
																														+ "_"
																														+ r[i].mobile);
																									
																									}
																									response(availableTags);
																								}
																							});
																				}
																			});
														</script> 
										

								</div>
										             
										            
										  	       <!--   onkeypress="autoSuggestionForPateintName1('txtPatientName1', 'onchange');" --> 
										  	                         
									
							<div class='col-md-2-1' style="margin-left:9px;margin-top:-10px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch();' />
							</div>
							<div class='col-md-1-1' style="margin-left:-75px;margin-top:-10px;">Patient Id</div>
								<div class='col-md-2-1' style="margin-left:-25px;margin-top:-10px;">
							   <input name="txtPatientId" type="text" id="txtPatientId" autocomplete="off"
				                 class="typeahead form-control input-SmallText "/>
								</div>
								
							<div class='col-md-2-1' style="margin-left: 1px;margin-top:-11px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch1();' />
								</div>
								
									<div class='col-md-1-1' style="margin-left:-70px;margin-top:-10px;">Invoice No</div>
								<div class='col-md-2-1' style="margin-left:-15px;margin-top:-10px;">
							   <input name="txtInvoiceId" type="text" id="txtInvoiceId" autocomplete="off"
				                 class="typeahead form-control input-SmallText "/>
								</div>
								
							<div class='col-md-1-1' style="margin-right: -29px;margin-top:-12px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch2();' />
								</div>
								
								
								<!-- <div class='col-md-1-1'>Invoice No</div>
								<div class='col-md-2-1'>
							   <input name="txtInvoiceNo" type="text" id="txtInvoiceNo" autocomplete="off"
				                 class="typeahead form-control input-SmallText "/>

								</div>
							<div class='col-md-2-1' style="margin-left: 9px;margin-top:-11px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch2();' />
								</div>
								 -->
								
                            </div>
                <!--     <div class="col-md-8-1" style="padding-left:718px;margin-top:-24px;">                             
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Patient Id</div>
								<div class='col-md-2-1'>
							   <input name="txtPatientId" type="text" id="txtPatientId" autocomplete="off"
				                 class="typeahead form-control input-SmallText "/>
										<input
										type="hidden" id="hiddenPatientId1" />

								</div>
							<div class='col-md-2-1' style="margin-left: 9px;margin-top:-11px;">
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch1();' />
								</div>
                            </div> -->

							</div>
							<div class="divide-20"></div>

							<div class="col-md-11-1"
								style="height: 5%; max-height: auto; margin-left: 0%;">
								<div class="container-main col-md-7-1"
										style="overflow-y: scroll; height: 450px; maxheight: auto; border: 1px solid #b8b8b8;">
								<table
									class="table table-striped table-bordered header-fixed cf "
									style="margin-top: 10px; width: 100%;">
									<thead class="cf" style="background: white;">
										<tr>
											<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
											 <th style="height: 21.5px;" class="col-md-2 center"><div>Invoice No
													</div></th> 
													 <th style="height: 21.5px;" class="col-md-2 center"><div>Patient
													Id</div></th> 
											 <th style="height: 21.5px;" class="col-md-2 center"><div>Patient
													Name</div></th> 
											<th style="height: 21.5px;" class="col-md-2 center"><div>Doctor
													Name</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Date</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Net Amount
													</div></th>
											<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
										<!-- <th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th> -->
										<th style="height: 21.5px;" class="col-md-1 center"><div>View</div></th> 
										
										
										<!-- 	<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th> -->
										</tr>
									
											<tbody id="divPatientSaleList">
												<c:forEach items="${ltPatientSaleMasters}" var="row"
													varStatus="count">
													<tr>
														 <td class="col-md-1 center">${(count.index)+1} <input
															type="hidden" id="patientSaleBillId${row.patientSalesBillId}" value="${row.patientSalesBillId}">
														</td> 
														 <td class="col-md-2 center">${row.patientSalesBillCD}<input
															type="hidden" id="patientSaleBillId${row.patientSalesBillCD}"
															value="${row.patientSalesBillCD}"></td> 
															
														<td class="col-md-2 center">${row.patientId}<input
															type="hidden" id="patientId${row.patientId}"
															value="${row.patientId}"></td> 
														
														<%-- <td style="display: none" id="txtCredit">${row.patientId}
																				<input type="hidden"
																				id="patientId${row.patientSalesBillId}"
																				value="${row.patientId}">
															</td>  --%>
															
														 <td class="col-md-2 center">${row.patientSalesBillPrescription}<input
															type="hidden" id="patientName${row.patientSalesBillId}"
															value="${row.patientSalesBillPrescription}"></td> 

												          <td class="col-md-2 center">${row.patientSalesBillAdd
															}<input type="hidden" id="DoctorName${row.patientSalesBillId}"
															value="${row.patientSalesBillAdd}">
														</td>
														
                                                             

														<%-- <td class="col-md-2 center">
														<c:set var="patientBillDate" value="${row.patientBillDate}" /> 
														<fmt:formatDate value="${patientBillDate}" var="patientBillDate" pattern="dd/MM/yyyy" />
															<c:out value="${patientBillDate}"></c:out> <input
															type="hidden" id="patientSaleBillDate${row.patientSalesBillId}"
															value="<c:out value="${patientBillDate}"></c:out>">
														</td>  --%>
														
														<td class="col-md-2 center">${row.patientBillMode}<input
															type="hidden" id="PatientBillMode${row.patientSalesBillId}"
															value="${row.patientBillMode}"></td>
														
														<td class="col-md-2 center">${row.patientSalesBillNarration}<input
															type="hidden" id="PatientNaration${row.patientSalesBillId}"
															value="${row.patientSalesBillNarration}"></td>

														<%-- <td class="col-md-2 center"><button
																id="btnPrint${row.patientSalesBillId}" class="btn btn-xs btn-success"
																onclick="printlabReportDiv();" value="PRINT">
																<i class="fa fa-print"></i>
															</button> 
															
														<a
															id="btnPrint${row.patientSalesBillId}" class="btn btn-xs btn-success"
															href="/EhatEnterprise/pharmacy/patientSale/printView?patientSaleId=${row.patientSalesBillId}">
																<i class="fa fa-print"></i>
														</a>
														</td> --%>
														
														<td class="col-md-2 center">
														<button
															id="btnPrint${row.patientSalesBillId}" class="btn btn-xs btn-success"
															onclick="patientSalePrint(${row.patientSalesBillId});">
																<i class="fa fa-print"></i>
														</button>
														</td>
														
														<td class="col-md-2 center"><a
																id="btnEdit${row.patientSalesBillId}" class="btn btn-xs btn-success"  
																href="../../pharmacy/patientSale/view-bill?patientSalesBillId=${row.patientSalesBillId}&previousBalance=${row.patientSalePreviousBalance}&BillMode=${row.patientSalesBillDocNo}&&treatmentId=${row.patientSaleTreatmentId}"><i class="fa fa-eye View"></i></a>
															</td> 
															
														
															
													<%-- 	<td class="col-md-1 center">
															<button id="btnDelete2" class="btn btn-xs btn-success"
																onclick="deletePatientSale(${row.patientSalesBillId})" value="DELETE">
																<i class="fa fa-trash-o"></i>
															</button>
														</td> --%>
														
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
			<%@include file="Pharma_Footer.jsp"%></div>

	</section>
</body>
</html>