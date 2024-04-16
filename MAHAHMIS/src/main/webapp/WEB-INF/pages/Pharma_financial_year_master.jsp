<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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


<%-- <!-- JQUERY -->
<script
	src="<c:url value="/pharmacy/resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script> --%>
<!-- BOOTSTRAP -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_year.js"/>"></script>

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
			App.setPage("Pharma_financial_year_master");  //Set current page
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
</head>
<script>
function validateData() 
{
	
	if($('#txtYearStartDate').val()!=null && $('#txtYearStartDate').val()!="")
		{ 
		    if($('#txtYearEndDate').val()!=null && $('#txtYearEndDate').val()!="")
		      { 
		    	 if($('#txtYearId').val()!=null && $('#txtYearId').val()!="")
			      { 
		    	//	 alert("Record Updated Successfully!");
		    		 $('#frmYearMasterForm').submit();
			      }
		    	 else
				   {
				    // alert("Record Saved Successfully!");
				     $('#frmYearMasterForm').submit();
				   }
		      }
		    else
		    alert("Enter Year End Date");
		    $('#txtYearStartDate').focus();
		}
	else
	  {
		alert("Enter Year Start Date");
		 $('#txtYearStartDate').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchYear($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Year in Search Box");
	    $('#searchBox').focus();
	}

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
											<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a>
											</li>
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Financial Year</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success"
													onclick="validateData();">Save</button>
												<!-- <button class="btn btn-xs btn-warning">Print</button>
												<button class="btn btn-xs btn-danger">Discard</button> -->
											</div>
										</ul>
									</div>
								</div>
							</div>
							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1' style="margin-right: 0%;">Financial Year</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Financial Year "
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitContent($('#searchBox').val())" /> <input
										type="hidden" id="hiddenId" />

								</div>
								<div class='col-md-2-1' style='padding-top:0%; margin-left:10px;'>
									<input id='' type='button' value='Search' class='edit'
										onclick='validateSearch();' />

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
																				url : "../../pharmacy/year/autoSuggestionYear",
																				timeout : 1000 * 60 * 5,
																				catche : false,
																				error : function() {
																					alert('error');
																				},
																				success : function(
																						r) {
																					var availableTags = [];
																					for ( var i = 0; i < r.length; i++) {
																						availableTags[i] = r[i].yearFinancial
																								+ "-"
																								+ r[i].yearId;
																					}
																					response(availableTags);
																				}
																			});
																}
															});
										</script>
								</div>
							</div>
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
								
																			
							<!-- /Common -->
							<div class="divide-20"></div>
							<div class="panel panel-default">
								<div class="panel-body">
									<div id="yearContent" class="panel-body col-md-12-1"
										style="width: 40%; height: 100%; margin-top: 1%; padding-left: 20px; text-align: left; float: left; border: 1px solid #436a9d;">

										<form:form action="../../pharmacy/year/save"
											method="post" commandName="year" id="frmYearMasterForm">
											<div class='col-md-12-1 center'>
												<h4>Financial Year Master</h4>
											</div>
											<div class='divide-20'></div>

											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-left: 6px;">
												<div class='divide-20'></div>
												<div class='col-md-4-1' style='margin-left:-3px; padding-top: 4%;'>Year
													Start Date</div>
												<div class="col-md-5-1" style="margin-top: 5px;color: red; margin-left:4px;">

													<form:input type="text" placeholder="Year start date"
														style="margin-left: 6%;" disabled="disabled" value="<%=todays_date%>"
														class="form-control input-SmallText col-md-9-1 margin-1"
														id="txtYearStartDate" name="txtYearStartDate" readonly="true"
														onclick="displayCalendar(document.getElementById('txtYearStartDate'),'dd/mm/yyyy',this)"
													 path="yearStartDate"
														onchange="setFinancialYear()" />

													<form:hidden path="yearId" id="txtYearId" />


													<div class='col-md-1-1 center'
													style='padding-top:9%; margin-left:0px; color: red;'>
													<b> *</b>
												</div>
												</div>
											</div>
											<div class='form-group Remove-Padding col-md-12-1'>
												<div class='divide-20'></div>
												<div class='col-md-4-1' style='padding-top: 2%;'>Year
													End Date</div>
												<div class='col-md-5-1 center'
													style='padding-top: 2%; color: red;'>
													<form:input type="text" placeholder="Year end date"
														readonly="true" id="txtYearEndDate" name="txtYearEndDate"
														path="yearEndDate" onfocus="setFinancialYear()" />

													<b> *</b>
												</div>
											</div>
											<div class='form-group Remove-Padding col-md-12-1'>
												<div class='divide-20'></div>
												<div class='col-md-4-1' style='padding-top: 2%;'>Financial
													Year</div>
												<div class='col-md-5-1 center'
													style='padding-top: 2%; color: red;'>
													<form:input path="yearFinancial" id='txtFinancialYear'
														type='text' name='txtFinancialYear'
														placeholder="Financial Year" readonly="true" />
													<b> *</b>
												</div>

											</div>

										</form:form>
									</div>
									<div
										style="width: 55%; margin-left: 3%; float: left; height: 100%;">
										<!-- <div id="SearchHospital" style="width: 100%; padding: 2%;"></div>	 -->
										<div class='divide-20'></div>
										<div class='divide-20'></div>



										<div
											style="width: 100%; margin-top: -29px; overflow-y: scroll; height: 445px; max-height: auto; margin-left: 2%;">

											<table
												class="table table-striped table-bordered header-fixed cf "
												style="Width: 100%; margin-top: 1px;">
												<thead class="cf" style="background: white;">
													<tr>
														<th style="height: 21.5px;" class="col-md-1"><div>Sr No</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Start
																Date</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>End
																Date</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Financial Year</div></th>

														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>
												<tbody id='divYearList'>
													<c:forEach items="${ltYearMaster}" var="row"
														varStatus="count">
														<tr>
															<td style='height: 21.5px;' class='numeric'>${count.index+1
																}<input type="hidden" id="yearId${row.yearId }"
																value="${row.yearId }">
															</td>
															<td style='height: 21.5px;' class=''><c:set
																	var="now" value="${row.yearStartDate}" /> <fmt:formatDate
																	value="${now}" var="parsedStartDate"
																	pattern="dd/MM/yyyy" /> <c:out
																	value="${parsedStartDate}"></c:out> <input
																type="hidden" id="yearStartDate${row.yearId }"
																value="<c:out value="${parsedStartDate}"></c:out>">

															</td>
															<td style='height: 21.5px;' class=''><c:set
																	var="now1" value="${row.yearEndDate}" /> <fmt:formatDate
																	value="${now1}" var="parsedEndDate"
																	pattern="dd/MM/yyyy" /> <c:out
																	value="${parsedEndDate}"></c:out> <input type="hidden"
																id="yearEndDate${row.yearId}"
																value="<c:out value="${parsedEndDate}"></c:out>">

															</td>
															<td style='height: 21.5px;' class=''>${row.yearFinancial
																} <input type="hidden" id="yearFinancial${row.yearId }"
																value="${row.yearFinancial
														}">
															</td>
															<td style="text-align: left;">
																<button style='height: 21.5px; text-align: center;'
																	value='EDIT' id='btnEdit${row.yearId }'
																	onclick='editFinacial(${row.yearId })'
																	class="btn btn-xs btn-success">
																	<i class='fa fa-edit' class='edit'></i>
																</button>
															</td>
															<td style='height: 21.5px; text-align: left;'>
																<button style='height: 21.5px;' value='DELETE'
																	id='btnDelete${row.yearId }'
																	onclick='deleteYear(${row.yearId })'
																	class="btn btn-xs btn-success">
																	<i class='fa fa-trash-o' class='edit'></i>
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
					<div id="yearListDiv" style="display: none;"></div>


					<%@include file="Pharma_Footer.jsp"%>
				</div>
			</div>
		</div>
	</section>
</body>
</html>