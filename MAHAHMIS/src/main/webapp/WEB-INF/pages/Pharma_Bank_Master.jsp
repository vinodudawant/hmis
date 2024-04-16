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


<!-- Application js -->
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_bank.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script> 
<%@include file="pharma_header.jsp"%>



</head>
<script>
		jQuery(document).ready(function() {		
			App.setPage("Pharma_Bank_Master");  //Set current page
			App.init(); //Initialise plugins and elements
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
	var txtBankName= $('#txtBankName').val().toString().trim(); 
	
	
	if($('#txtBankName').val()!=null && $('#txtBankName').val()!="")
		{ 
		if(txtBankName.length!=0)
			{
     		  if($('#bankId').val()!=null  && $('#bankId').val()!="")
					{
					// alert("Record Updated Successfully!");
			  	     $('#bankMasterForm').submit();
					}
				  else
				  {   //  alert("Record Saved Successfully!");
				        $('#bankMasterForm').submit();
				 	 		 	    
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
		alert("Enter Bank Name");
		 $('#txtBankName').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchBank($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Bank Name in Search Box");
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
											<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a>
											</li>
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Bank Master</li>
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
								<div class='col-md-1-1'>Bank Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Bank Name"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitContent($('#searchBox').val());" /> <input
										type="hidden" id="hiddenId" />
										<!-- ,isAlphaWithSpace('searchBox',0,25) -->
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
														url : "../../pharmacy/bank/autoSuggestionBankNames",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].bankName+"$"+r[i].bankId;
															}
															response(availableTags);
														}
													});
											 }																						
										});	
										</script>
								</div>
							</div>
							<!-- /Common -->
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
							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="divide-20"></div>
							<div class="">
								<div class="panel-body">
									<div id="bankMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">
										<form:form commandName="bank" id="bankMasterForm"
											action="../../pharmacy/bank/save" method="post">
											<div class="col-md-12-1 center">
												<h4 id="title">Add Our Bank</h4>
											</div>
											<div class="col-md-12-1" style="margin-top: 0px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Bank Name</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="bankName" type="text" autocomplete="off"
													 id="txtBankName"
														name="txtBankName" placeholder="Bank name"
														class="form-control input-SmallText" 
														/>
														<!-- onblur="isAlphaWithSpace('txtBankName',0,1000)" -->
													<form:hidden path="bankId" id="bankId" />
													<div class='col-md-1-1 center'
													style='padding-top:-1%; margin-left:191px; color: red;'>
													<b> *</b>
												</div>	
												</div>
												

											</div>
											<div class="col-md-12-1" style="margin-top: 9px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Opening Debit</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="bankOpeningDebit" type="text" autocomplete="off"
													
														id="txtDebit" name="txtDebit" placeholder="Opening Debit"
														class="form-control input-SmallText" onblur="isFloatingPoint('txtDebit',0,500);" />
												</div>
											</div>
											<div class="col-md-12-1"
												style="margin-top: 9px; margin-bottom: 10px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Opening Credit</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="bankOpeningCredit" type="text" autocomplete="off"
													
														id="txtCredit" name="txtCredit" placeholder="Opening Credit"
														class="form-control input-SmallText" onblur="isFloatingPoint('txtCredit',0,500),checkValue();"/>
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
														<th style="height: 21.5px;" class="col-md-2"><div>Bank
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>

												</thead>

												<tbody id="divBankList">
													<c:forEach items="${ltBankMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="bankId${row.bankId }"
																value="${row.bankId }"></td>
															<td class="col-md-2">${row.bankName } <input
																type="hidden" id="bankName${row.bankId }"
																value="${row.bankName }"></td>
															<td style="display: none" id="txtDebit">${row.bankOpeningDebit}
																<input type="hidden" id="OpeningDebit${row.bankId }"
																value="${row.bankOpeningDebit }">
															</td>

															<td style="display: none" id="txtCredit">${row.bankOpeningCredit}
																<input type="hidden" id="OpeningCredit${row.bankId }"
																value="${row.bankOpeningCredit }">
															</td>

															<td class="col-md-1">
																<button id="btnEdit${row.bankId}"
																	class="btn btn-xs btn-success" 	onclick="editBank(${row.bankId})"
																 value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deleteBank(${row.bankId})" value="DELETE">
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
			<div class="ajaxmodal">
				<!-- Place at bottom of page -->
			</div>
			<script type="text/javascript">
			</script>
			
			<%@include file="Pharma_Footer.jsp"%>
		</div>
	</section>
</body>
</html>