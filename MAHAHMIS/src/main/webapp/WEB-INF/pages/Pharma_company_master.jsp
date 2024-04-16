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

<!-- for Developers  -->

<%-- <script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script> --%>
<!-- /for Developers  -->

<!-- Application js -->
<%@include file="pharma_header.jsp"%>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_company.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script> 
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
</head>
<script>
function validateData() 
{
	var txtCompanyName  = $('#txtCompanyName').val().toString().trim(); 
	var txtShortName  = $('#txtShortName').val().toString().trim();
		
	if($('#txtCompanyName').val()!=null && $('#txtCompanyName').val()!="")
		{ 
				
		  if($('#txtShortName').val()!=null  && $('#txtShortName').val()!="")
			{
			  if(txtCompanyName.length!=0 && txtShortName.length!=0)
				{
			  if($('#compId').val()!=null  && $('#compId').val()!="")
				  {	 
				 
				  //alert("Record Updated Successfully!");	
				    $('#companyMasterForm').submit();
				   
				      
				  }
			  else
				  {    
				  // alert("Record Saved Successfully!");
				 	     $('#companyMasterForm').submit();
				 	    
				 	    
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
			   alert("Enter Company Short Name");
			   $('#txtShortName').focus();
			   
			}
		}
	else
	  {
		alert("Enter Company Name");
		 $('#txtCompanyName').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchCompany($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Company Name in Search Box");
	    $('#searchBox').focus();
	}

}
</script>

<script>
		jQuery(document).ready(function() {		
			App.setPage("Pharma_company_master");  //Set current page
			App.init(); //Initialise plugins and elements
			
			$("#txtCompanyName").focus();
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
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a>
											</li>
											<li><a href="../../pharmacy/masters">Pharmacy</a></li>
											<li>Company Master</li>
										<!-- 	<li><i class="fa fa-question"></i></li> -->
											<!-- <li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<!-- <button type="submit" class="btn btn-xs btn-success"
													onclick="validateData()">Save</button> 
												<!-- <button class="btn btn-xs btn-warning">Print</button>
												<button class="btn btn-xs btn-danger">Discard</button> -->
											</div>
										</ul>
									</div>
								</div>
							</div>

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Company Name</div>
								<div class='col-md-2-1'>

									<input type="text" id='searchBox' name='searchBox'
										placeholder="Company Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitContent($('#searchBox').val())" /> <input
										type="hidden" id="hiddenId" />
									<!-- 	,isCompanyName('searchBox',0,25); -->
								</div>
								<div class='col-md-2-1'  style='padding-top:0%; margin-left:10px;'>
									<input type="button" value="Search" class="edit"
										onclick='validateSearch();'>
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
														url : "../../pharmacy/company/autoSuggestionCompanyNames",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].compName+"-"+r[i].compId;
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
							<!-- /Common -->
							<div class="divide-20"></div>
							<%-- <%
								if (request.getParameter("msg") != null) {
							%>

							<script type="text/javascript">
									reset();
									
									alertify.success("Record Saved succeesfully!");
								</script>

							<%
								} else {
							%>
							<div id="resultDiv"></div>
							<%
								}
							%>
									 --%>					
							<div class="panel panel-default">
								<div class="panel-body">
									<div id="CompanyContent" class="col-md-4-1"
										style="height: 100%; margin-top: 1%; padding-left: 20px; border: 1px solid #b8b8b8;">
										<form:form commandName="company" id="companyMasterForm"
											action="../../pharmacy/company/save"
											method="post">
											<div class='col-md-12-1 center'>
												<h4>Company Master</h4>
											</div>
											<div class='divide-20'></div>

											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-left: 6px;">
												<div class='divide-20'></div>
												<div class='col-md-4-1' style='padding-top: 2%;'>
													<b>Company Name</b>
												</div>
												<div class='col-md-5-1 center'
													style='padding-top: 2%; color: red;'>
													<form:input path="compName" id='txtCompanyName'
														name='txtCompanyName' type='text' autocomplete="off" 
														placeholder="company name" class="form-control input-SmallText"
														/>
												<!-- onblur="isCompanyName('txtCompanyName',3,25)" -->
													<form:hidden path="compId" id="compId" />

												</div>
												<div class='col-md-1-1 '
													style='padding-top:  2%;  color: red;'>
													<b> *</b>
												</div>	
											</div>
											<div class='form-group Remove-Padding col-md-12-1'>
												<div class='divide-20'></div>
												<div class='col-md-4-1' style='padding-top:  5%;margin-left:9px'>
													<b>Short Name</b>
												</div>
												<div class='col-md-5-1 center'
													style='padding-top: 5%; margin-left:-4px; margin-bottom:9px'>
													<form:input path="compShortName" id='txtShortName'
														name='txtShortName' type='text' autocomplete="off" placeholder="short name"
														class="form-control input-SmallText" 
														/>
                                        <!--  onblur="isCompanyName('txtShortName',0,8);" -->
												</div>
												<div class='col-md-1-1'
													style='padding-top:  5%; color: red;'>
													<b> *</b>
												</div>
											</div>
											
											
											<div class='col-md-12-1 center' style="margin-top: 9px; margin-bottom: 10px;">
													<button type="button" class="btn btn-xs btn-success"
													onclick="validateData()">Save <i class="fa fa-save"></i></button>
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
														<th style="height: 21.5px;" class="col-md-2"><div>Company
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Short
																Name</div></th>

														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>

												<tbody id="divCompanyList">
													<c:forEach items="${ltCompanyMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="compId${row.compId }"
																value="${row.compId }"></td>
															<td class="col-md-2">${row.compName } <input
																type="hidden" id="companyName${row.compId }"
																value="${row.compName }"></td>

															<td class="col-md-2">${row.compShortName } <input
																type="hidden" id="shortName${row.compId }"
																value="${row.compShortName }">
															</td>
															<td class="col-md-1">
																<button id="btnEdit${row.compId}"
																	class="btn btn-xs btn-success"
																	onclick="editcomp(${row.compId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deleteCompany(${row.compId})" value="DELETE">
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
		<!-- <div id="companyListDiv" style="display: none;"></div> -->
		<%@include file="Pharma_Footer.jsp"%>
	</section>
</body>
</html>