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
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script> --%>

<!-- for Developers  -->

<%-- <script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script> --%>


<%-- 
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script> --%>


<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<%-- <script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script> --%>
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->
<%-- <script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script> --%>
	<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_drug.js"/>"></script>
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
function validateData() 
{
	var txtDrugName= $('#txtDrugName').val().toString().trim(); 
	var txtTheraupticUse= $('#txtTheraupticUse').val().toString().trim(); 
	
	
	if($('#txtDrugName').val()!=null && $('#txtDrugName').val()!="")
	{ 
		if($('#txtTheraupticUse').val()!=null && $('#txtTheraupticUse').val()!="")
		{ 
			 if(txtDrugName.length!=0 && txtTheraupticUse!=0)
			 {
				if($('#txtDrugId').val()!=null && $('#txtDrugId').val()!="")
				{ 
					
					  alert("Record Updated Successfully!");		
				      $('#drugMasterForm').submit();
				}
				else
				 {
					alert("Record Saved Successfully!");
				        $('#drugMasterForm').submit();
					 	   
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
			alert("Enter Therauptic Use");
			 $('#txtTheraupticUse').focus();
			}
	}
	else
	{
		alert("Enter Drug/Generic Name");
		 $('#txtDrugName').focus();
	}	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchDrug($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Drug/Generic Name in Search Box");
	    $('#searchBox').focus();
	}

}

</script>


</head>

<script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
			
			$("#txtDrugName").focus();
		});
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
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a
												href="../../Dashboard.jsp">Home</a></li>
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Drug Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<!-- <div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success"
													onclick="validateData();">Save</button>
												
											</div> -->
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-2-1'>Drug/Generic Name</div>
								<div class='col-md-2-1'
									style='padding-top: 0%; margin-left: -75px;'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Drug/Generic Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitContent($('#searchBox').val());" /> <input
										type="hidden" id="hiddenId" />
									<!-- ,isName('searchBox',0,25) -->
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
										url : "../../pharmacy/drug/autoSuggestionDrug",
										timeout : 1000 * 60 * 5,
										catche : false,
										error : function()
										{
											alert('error');
										},
										success : function(r) 
										{
											var availableTags = [];
											for(var i=0;i<r.length;i++){
											 	availableTags[i]=r[i].drugName+"-"+r[i].drugId;
											}
											response(availableTags);
										}
										});
									 }																						
									});	
									</script>

								</div>
							</div>
							<%--<div class="divide-20"></div>
							 <c:if test="${not empty success}">
								<div class="alert alert-success" id="msgDiv">${success}</div>
							</c:if>
							<c:if test="${not empty error}">
								<div class="alert alter-danger" id="msgDiv">${error}</div>
							</c:if> --%>
							<%-- <div class="divide-20"></div>
							<%
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

							<div class="panel panel-default"
								style="margin-top: 9px; margin-bottom: 10px;">
								<div class="panel-body">
									<div id="drugMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">

										<form:form commandName="drug" id="drugMasterForm"
											action="../../pharmacy/drug/save" method="post">

											<div class="col-md-12-1 center">
												<h4 id="title">Drug/Generic Master</h4>
											</div>
											<div class="col-md-12-1" style='margin-top: 4px;'>

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Drug/Generic Name</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">

													<%-- <form:input path="drugName" type="text" id="txtDrugName"
														name="txtDrugName" class="form-control input-SmallText"
														placeholder="Drug/Generic Name" required="true" 
														
														/> --%>
													<form:textarea path="drugName" type="text" id="txtDrugName"
														name="txtDrugName" class="col-md-11-1"
														placeholder="Drug/Generic Name" required="true"
														style="width:97%" />

													<!--   onblur="isName('txtDrugName',0,25)" -->
													<form:input path="drugId" id="txtDrugId" type="hidden"></form:input>

												</div>
												<div class='col-md-1-1' style='margin-top: 9px; color: red;'>
													<b> *</b>
												</div>
											</div>

											<div class="col-md-12-1" style="margin-top: 9px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Therapeutic Use</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="drugTheraupticUse" type="text" 
														id="txtTheraupticUse" name="txtTheraupticUse" autocomplete="off"
														
														placeholder="Therauptic Use"
														class="form-control input-SmallText" />
													<!-- onblur="sAlphabet('txtTheraupticUse',0,25)" -->

												</div>
												<div class='col-md-1-1' style='margin-top: 9px; color: red;'>
													<b> *</b>
												</div>
											</div>

											<div class="col-md-12-1" style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Discount</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:radiobutton path="drugDisc" id="radioDiscountYes"
														name="radioDiscount" value="1" checked="true" />
													Yes
													<form:radiobutton path="drugDisc" id="radioDiscountNo"
														name="radioDiscount" style="margin-left:11px;" value="0" />
													No
												</div>
											</div>

											<div class="col-md-12-1" style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Scheduled "H1"</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:radiobutton path="drugScheduleH1"
														id="radioScheduledNo" name="radioScheduled" checked="true"
														value="0" />
													No
													<form:radiobutton path="drugScheduleH1"
														id="radioScheduledYes" name="radioScheduled" value="1"
														style="margin-left:17px;" />
													Yes

												</div>
											</div>

											<div class="col-md-12-1" style="margin-top: 9px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Billing Must</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:radiobutton path="drugBillingMust"
														id="radioBillingNo" name="radioBilling" checked="true"
														value="0" />
													No
													<form:radiobutton path="drugBillingMust"
														id="radioBillingYes" name="radioBilling" value="1"
														style="margin-left:17px;" />
													Yes
												</div>
												<!-- <div class="col-md-1-1" style=" color: red; padding-left: 3%">
												<b>*</b>
											</div> -->
											</div>

											<div class="col-md-12-1"
												style="margin-top: 9px; margin-bottom: 10px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Stock Hold</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:radiobutton path="drugStockHold" id="radioStockNo"
														name="radioStock" value="0" checked="true" />
													No
													<form:radiobutton path="drugStockHold" id="radioStockYes"
														name="radioStock" value="1" style="margin-left:17px;" />
													Yes

												</div>
												<!-- <div class="col-md-1-1" style=" color: red; padding-left: 3%">
												<b>*</b>
											</div> -->
											</div>

											<div class="col-md-12-1 center"
												style="margin-top: 9px; margin-bottom: 10px;">
												<button class="btn btn-xs btn-success"
													onclick="validateData();" type="button">Save <i class="fa fa-save"></i></button>
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
														<th style="height: 21.5px;" class="col-md-1"><div>Sr
																No</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Drug/Generic
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Therauptic
																Use</div></th>

														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>

												<tbody id="divDrugList">
													<c:forEach items="${drugMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="drugId${row.drugId }"
																value="${row.drugId }">
															</td>
															<td class="col-md-2">${row.drugName }<input
																type="hidden" id="drugName${row.drugId }"
																value="${row.drugName }"></td>

															<td class="col-md-2">${row.drugTheraupticUse }<input
																type="hidden" id="drugTheraupticUse${row.drugId }"
																value="${row.drugTheraupticUse }">
															</td>

															<td class="col-md-2" style="display: none;">${row.drugDisc
																}<input type="hidden" id="drugDisc${row.drugId }"
																value="${row.drugDisc }">
															</td>

															<td class="col-md-2" style="display: none;">${row.drugBillingMust
																}<input type="hidden" id="drugBillingMust${row.drugId }"
																value="${row.drugBillingMust }">
															</td>

															<td class="col-md-2" style="display: none;">${row.drugScheduleH1
																}<input type="hidden" id="drugScheduleH1${row.drugId }"
																value="${row.drugScheduleH1 }">
															</td>

															<td class="col-md-2" style="display: none;">${row.drugStockHold
																}<input type="hidden" id="drugStockHold${row.drugId }"
																value="${row.drugStockHold }">
															</td>

															<td class="col-md-1">
																<button id="btnEdit${row.drugId}"
																	class="btn btn-xs btn-success"
																	onclick="editDrug(${row.drugId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deleteDrug(${row.drugId})" value="DELETE">
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