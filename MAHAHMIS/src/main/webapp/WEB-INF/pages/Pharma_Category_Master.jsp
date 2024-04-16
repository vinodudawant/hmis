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




<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script> 
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_category.js"/>"></script>
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
</head>
<script>
function validateData() 
{
	var txtCategoryName  = $('#txtCategoryName').val().toString().trim(); 
		
	 if($('#txtCategoryName').val()!=null && $('#txtCategoryName').val()!="")
		{ 	
		if(txtCategoryName.length!=0 )
		{
		if($('#catId').val()!=null && $('#catId').val()!="")
		{ 	
			  alert("Record Updated Successfully");	
		      $('#categoryMasterForm').submit();
		}
		else
			{
			  alert("Record Saved Successfully");
			  $('#categoryMasterForm').submit();
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
		alert("Enter Category Name");
		 $('#txtCategoryName').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchCategory($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Category Name in Search Box");
	    $('#searchBox').focus();
	}

}
</script>
<script>
		jQuery(document).ready(function() {		
			App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
			
			$("#txtCategoryName").focus();
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
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Category Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<!-- <button type="submit" class="btn btn-xs btn-success"
													onclick="validateData();">Save</button>  --><!-- <button class="btn btn-xs btn-warning">Print</button>
													<button class="btn btn-xs btn-danger">Discard</button> -->
											</div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Category Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Category Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitCategoryContent($('#searchBox').val());" /> <input
										type="hidden" id="hiddenId" />
										<!-- ,isAlphaWithDigitSpace('searchBox',0,25) -->
								</div>
								<div class='col-md-2-1' style='padding-top:0%; margin-left:10px;'>
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
														url : "../../pharmacy/category/autoSuggestionCategoryNames",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].catName+"$"+r[i].catId;
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
							<%-- <c:if test="${not empty msg}">
								<div class="alert alert-success" id="msgDiv">${msg}</div>
							</c:if>
							<c:if test="${not empty error}">
								<div class="alert alter-danger" id="msgDiv">${error}</div>
							</c:if> 
							<div id="resultDiv"></div> --%>

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
									<div id="categoryMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 1%; padding-left: 20px; border: 1px solid #b8b8b8;">

										<form:form commandName="category" id="categoryMasterForm"
											action="../../pharmacy/category/save"
											method="post">


											<div class="col-md-12-1 center" style="margin-top: 9px;">
												<h4 id="title">Category Master</h4>
											</div>
											<div class="col-md-12-1" style="margin-top: 9px;"></div>
											<div class="col-md-12-1"
												style="margin-top: 9px; margin-bottom: 10px;">

												<div class="col-md-4-1" style="margin-top: -9px;">
													<b>Category Name</b>
												</div>
												<div class="col-md-7-1" style="margin-top: -9px;">

													<form:input path="catName" type="text" autocomplete="off"
													 id="txtCategoryName"
														name="txtCategoryName"
														class="form-control input-SmallText"
														placeholder="Category Name" required="true" 
														
														/>
														<!-- onblur="isAlphaWithDigitSpace('txtCategoryName',0,25)" -->
                                                   
													<form:hidden path="catId" id="catId" />
												</div>
												
												<div class='col-md-1-1'
													style='margin-top: -9px; color: red;'>
													<b> *</b>
												</div>
											</div>
											
											<div class='col-md-12-1 center' style="margin-top: 9px; margin-bottom: 10px;">
												<button type="button" class="btn btn-xs btn-success"
													onclick="validateData();">Save<i class="fa fa-save"></i></button> 
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
														<th style="height: 21.5px;" class="col-md-2"><div>
																Category Name</div></th>

														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>

												<tbody id="CategoryContent">
													<c:forEach items="${ltCategoryMaster}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1}<input
																type="hidden" id="catId${row.catId }"
																value="${row.catId }"></td>

															<td class="col-md-2">${row.catName }<input
																type="hidden" id="categoryName${row.catId }"
																value="${row.catName }"></td>

															<td class="col-md-1">
																<button id="btnEdit${row.catId}"
																	class="btn btn-xs btn-success"
																	onclick="editCategory(${row.catId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete4" class="btn btn-xs btn-success"
																	onclick="deleteCategory(${row.catId})" value="DELETE">
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

	</section>
</body>
</html>