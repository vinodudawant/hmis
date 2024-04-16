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

</head>
	<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_tax.js"/>"></script>
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
	var txtName= $('#txtTaxName').val().toString().trim();
	var txtTaxRate= $('#txtTaxRate').val().toString().trim();
	
	if($('#txtTaxName').val()!=null && $('#txtTaxName').val()!="")
		{ 
				
		 /*  if($('#txtTaxDesc').val()!=null  && $('#txtTaxDesc').val()!="")
			{ */
			  if($('#txtTaxRate').val()!=null  && $('#txtTaxRate').val()!="" && $('#txtTaxRate').val()!=0.0)
				{
				  if(txtName.length!=0 && txtTaxRate.length!=0)
					 {
				  if($('#taxId').val()!=null  && $('#taxId').val()!="")
					{
					 alert("Record Updated Successfully!");
				     $('#taxMasterForm').submit();
					}
				  else
				  {     alert("Record Saved Successfully!");
				        $('#taxMasterForm').submit();
					 	   
				  }
				}
				  else
					  {
					    //alert("Can not insert empty record");
						window.location.href = "view";
					  }
					  }
			  else
				  {
				   alert("Enter Tax Rate");
				   $('#txtTaxRate').focus();
				   
				  }
			}
		 /*  else
			{
			   alert("Enter Tax Desc Name");
			   $('#txtTaxDesc').focus();
			   
			}
		} */
	else
	  {
		alert("Enter Tax Name");
		 $('#txtTaxName').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchTax($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Tax Name in Search Box");
	    $('#searchBox').focus();
	}

}

</script>


<script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
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
											<li>GST Master</li>
											<!-- 	<li><i class="fa fa-question"></i></li>
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
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>GST Code</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="GST Code Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitContent($('#searchBox').val());" /> <input
										type="hidden" id="hiddenId" />
									<!-- ,isAlphabet('searchBox',0,25) -->
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
										url : "../../pharmacy/tax/autoSuggestionTax",
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
											 	availableTags[i]=r[i].taxName+"-"+r[i].taxId;
											}
											response(availableTags);
										}
										});
									 }																						
									});	
									</script>

								</div>
							</div>
							<%-- <div class="divide-20"></div>
							<c:if test="${not empty success}">
								<div class="alert alert-success" id="msgDiv">${success}</div>
							</c:if>
							<c:if test="${not empty error}">
								<div class="alert alter-danger" id="msgDiv">${error}</div>
							</c:if> --%>

							<%-- 	<div class="divide-20"></div>
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
								<div class="panel-body"
									style="margin-top: 9px; margin-bottom: 10px;">
									<div id="taxMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">

										<form:form commandName="tax" id="taxMasterForm" action="../../pharmacy/tax/save"
											method="post">


											<div class="col-md-12-1 center">
												<h4 id="title">GST Code</h4>
											</div>


	                                       <div class="col-md-12-1 "
												style="margin-top: 9px; margin-bottom: 10px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>GST Type</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:select path="type" id="txtTaxDesc" name="txtTaxDesc">
														<form:option value="1">GST</form:option>
														<form:option value="0">Free</form:option>
													</form:select>

												</div>
											</div>

											<div class="col-md-12-1 "
												style="margin-top: 9px; margin-bottom: 10px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>GST Code</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="taxName" type="text" autocomplete="off"
													 id="txtTaxName"
														name="txtTaxName" class="form-control input-SmallText"
														placeholder="GST Code" required="true" />
													<!--    onblur="isUserName('txtTaxName',0,25)" -->
													<form:hidden path="taxId" id="taxId" />
												</div>
												<div class='col-md-1-1 center'
													style='padding-top: -2%; margin-left: 300px; color: red;'>
													<b> *</b>
												</div>

											</div>

										<%-- 	<div class="col-md-12-1 "
												style="margin-top: 9px; margin-bottom: 10px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>GST Type</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:select path="type" id="txtTaxDesc" name="txtTaxDesc">
														<form:option value="1">GST</form:option>
														<form:option value="0">Free</form:option>
													</form:select>

												</div>
											</div> --%>
											<div class="col-md-12-1 "
												style="margin-top: 9px; margin-bottom: 10px;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>GST Rate </b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">

													<form:input path="taxRate" type="text" autocomplete="off"
													 id="txtTaxRate"
														name="txtTaxRate" class="form-control input-SmallText"
														placeholder="Rate" required="true"
														onblur="isFloatingPoint('txtTaxRate')" />
													<div class='col-md-1-1 center'
														style='padding-top: -2%; margin-left: 190px; color: red;'>
														<b> *</b>
													</div>
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
														<th style="height: 21.5px;" class="col-md-1"><div>Sr
																No</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>GST
																Code</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>CGST</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>SGST
															</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>IGST</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Type
															</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>

												<tbody id="divTaxList">
													<c:forEach items="${taxMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="taxId${row.taxId }"
																value="${row.taxId }">
															</td>
															<td class="col-md-2">${row.taxName }<input
																type="hidden" id="taxName${row.taxId }"
																value="${row.taxName }"></td>

															<td class="col-md-2">${row.taxRate/2 }<input
																type="hidden" id="cgstRate${row.taxId }"
																value="${row.taxRate/2 }"></td>

															<td class="col-md-2">${row.taxRate/2 }<input
																type="hidden" id="sgstRate${row.taxId }"
																value="${row.taxRate/2 }"></td>

															<td class="col-md-2">${row.taxRate }<input
																type="hidden" id="igstRate${row.taxId }"
																value="${row.taxRate }">
																<input
																type="hidden" id="type${row.taxId }"
																value="${row.type }"></td>
															<c:choose>
																<c:when test="${row.type ==1}">
																	<td class="col-md-2">GST</td>
																</c:when>
																<c:otherwise>
																	<td class="col-md-2">Free</td>
																</c:otherwise>
															</c:choose>
															<td class="col-md-1">
																<button id="btnEdit${row.taxId}"
																	class="btn btn-xs btn-success"
																	onclick="editTax(${row.taxId})" value="EDIT">
																	<i class='fa fa-edit' class='edit'></i>
																</button>
															</td>
															<td class="col-md-1">
																<button type="button" id="btnDelete2"
																	class="btn btn-xs btn-success"
																	onclick="deleteTax(${row.taxId})" value="DELETE">
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
