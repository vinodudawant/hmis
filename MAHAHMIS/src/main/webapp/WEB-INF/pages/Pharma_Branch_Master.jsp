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

</head>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_branch.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script> 
<%@include file="pharma_header.jsp"%>

<script>
		jQuery(document).ready(function() {		
			App.setPage("Pharma_Branch_Master");  //Set current page
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

<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
<script>
function validateData() 
{
	var txtBranchName= $('#txtBranchName').val().toString().trim(); 
	var txtBranchAddress= $('#txtBranchAddress').val().toString().trim();
	var txtPhone= $('#txtPhone').val().toString().trim();
	
	
	if($('#txtBranchName').val()!=null && $('#txtBranchName').val()!="")
		{ 
				
		  if($('#txtBranchAddress').val()!=null  && $('#txtBranchAddress').val()!="")
			{
			  if($('#txtPhone').val()!=null  && $('#txtPhone').val()!="")
				{
				  if($('#selectBank').val()!=null  && $('#selectBank').val()!="")
					{
					  if(txtBranchName.length!=0 && txtBranchAddress.length!=0 && txtPhone.length!=0)
						{
					  if($('#branchId').val()!=null  && $('#branchId').val()!="")
						{
						  alert("Record Updated Successfully!");
				           $('#branchMasterForm').submit();
						}
					  else
					  {     alert("Record Saved Successfully!");
					      $('#branchMasterForm').submit();
					 	 		 	    
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
				  alert("Select Bank Name!");
				   $('#selectBank').focus();
				  }
				}
			  else
				  {
				  alert("Enter Phone Number!");
				   $('#txtPhone').focus();
				  }
			}
		  else
			{
			   alert("Enter Branch Address!");
			   $('#txtBranchAddress').focus();
			   
			}
		}
	else
	  {
		alert("Enter Branch Name!");
		 $('#txtBranchName').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBranch').val()!=null && $('#searchBranch').val()!="")
	{ 
		searchBranch($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Branch Name in Search Box");
	    $('#searchBranch').focus();
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
											<li>Date :  <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a>
											</li>
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Branch Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success"
													onclick="validateData();">Save</button> <!-- <button class="btn btn-xs btn-warning">Print</button>
													<button class="btn btn-xs btn-danger">Discard</button> -->
									</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Branch Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBranch' name='searchBranch'
										placeholder="Branch Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitBranchContent($('#searchBranch').val())" /> <input
										type="hidden" id="hiddenId" />

								</div>
								<div class='col-md-2-1'  style='padding-top:0%; margin-left:10px;'>
									<input type='button' value='Search' class='edit'
										onclick='validateSearch();' />

									<script type="text/javascript">
										$("#searchBranch").autocomplete({
										 source : function(request, response) {
										var findingName = $("#searchBranch").val();
										var inputs = [];
										inputs.push('letter=' + findingName);
										var str = inputs.join('&');
										jQuery.ajax({
											async : true,
											type : "POST",
											data : str + "&reqType=AJAX",
											url : "../../pharmacy/branch/autoSuggestionBranchNames",
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
												 	availableTags[i]=r[i].branchName+"$"+r[i].branchId;
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
						<%-- 	<c:if test="${not empty success}">
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
							<div class="panel panel-default">
								<div class="panel-body">
									<div id="branchMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">

										<form:form commandName="branch" id="branchMasterForm"
											action="../../pharmacy/branch/save" method="post">

											<div class="col-md-12-1 center">
												<h4 id="title">Branch Master</h4>
											</div>
											<div class="col-md-12-1">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Branch Name</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">

													<form:input  autocomplete="off" path="branchName" type="text"
														id="txtBranchName" name="txtBranchName"
														class="form-control input-SmallText"
														placeholder="Branch Name"  required="true"
														
														 />
														 <!-- onblur="isAlphaWithSpace('txtBranchName',0,500)" -->
                                                    <div class='col-md-1-1 center'
													style='margin-top: -14px; margin-left:195px; color: red;'>
													<b> *</b>
												   </div>	
													<form:input path="branchId" id="branchId" type="hidden"></form:input>
												</div>
											</div>

											<div class="col-md-12-1" style="margin-top: 9px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Branch Address</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:textarea path="branchAddress" type="text"
														id="txtBranchAddress" name="txtBranchAddress"
														placeholder="Branch Address" class="" style="width:97%;"
														 />
														 
														 <!-- onblur="isAddress('txtBranchAddress',0,1000)" -->
												<div class='col-md-1-1 center'
													style='margin-top: -14px; margin-left:195px; color: red;'>
													<b> *</b>
												   </div>	
												</div>
											</div>

											<div class="col-md-12-1" style="margin-top: 9px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Phone</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="branchPhone" type="text" autocomplete="off"
													 id="txtPhone"
														name="txtPhone" placeholder="Phone" maxlength="10"
														class="form-control input-SmallText"
														onblur="isPhonNo('txtPhone')" 
														 />
												 <div class='col-md-1-1 center'
													style='margin-top: -14px; margin-left:195px; color: red;'>
													<b> *</b>
												   </div>	
												</div>

											</div>

											<div class="col-md-12-1" style="margin-top: 9px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Mobile</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="branchMobileNum" type="text" autocomplete="off"
														id="txtMobile" name="txtMobile" placeholder="Mobile"
														class="form-control input-SmallText"  maxlength="10"
														onblur="isMobileNum('txtMobile')" 
														/>
												
												</div>


											</div>
											<div class="col-md-12-1"
												style="margin-top: 9px; margin-bottom: 10px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Email</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="branchEmailId" type="text" autocomplete="off" id="txtEmail"
														name="txtEmail" placeholder="Email"
														class="form-control input-SmallText" 
														onblur="ValidateEmail('txtEmail')" 
														/>
												</div>
											</div>



											<div class="col-md-12-1"
												style="margin-top: 9px; margin-bottom: 10px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b> Bank </b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<!-- <input type="text" id="txtBank"
														class="ui-autocomplete-input form-control input-SmallText"
														placeholder="Bank" maxlength="25" required
														onblur="splitBankContent($('#txtBank').val())"> -->

													<form:select path="bankMasters" items="${banks}"
														itemLabel="bankName" id="selectBank" itemValue="bankId"
														multiple="true" class="col-md-10-1 tokenize-sample" />
												<div class='col-md-1-1 center'
													style='margin-top: -14px; margin-left:195px color: red;'>
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
														<th style="height: 21.5px;" class="col-md-1"><div>Sr No</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Branch
																Name</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Branch
																Address</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Bank</div></th>

														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>


												<tbody id="divBranchList">
													<c:forEach items="${branchMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="branchId${row.branchId }"
																value="${row.branchId }">
															</td>
															<td class="col-md-1">${row.branchName }<input
																type="hidden" id="branchName${row.branchId }"
																value="${row.branchName }"></td>

															<td class="col-md-1">${row.branchAddress }<input
																type="hidden" id="branchAddress${row.branchId }"
																value="${row.branchAddress}">
															</td>

															<td style="display: none;" class="col-md-2 center">${row.branchPhone
																}<input type="hidden" id="branchPhone${row.branchId }"
																value="${row.branchPhone}">
															</td>

															<td style="display: none;" class="col-md-2 center">${row.branchMobileNum
																}<input type="hidden"
																id="branchMobileNum${row.branchId }"
																value="${row.branchMobileNum}">
															</td>

															<td style="display: none;" class="col-md-2 center">${row.branchEmailId
																}<input type="hidden" id="branchEmailId${row.branchId }"
																value="${row.branchEmailId}">
															</td>

															<td class="col-md-1"><c:forEach
																	items="${row.bankMasters}" var="bank"
																	varStatus="status"> 
																			${bank.bankName}
																	<input type="hidden"
																		id="bankId${row.branchId }${status.index+1}"
																		value="${bank.bankId}">
																</c:forEach> <c:set value="${fn:length(row.bankMasters)}"
																	var="bankCount">
																</c:set> <input type="hidden" value="${bankCount}"
																id="hiddenBankCount${row.branchId}" /></td>

															<td class="col-md-1">
																<button id="btnEdit${row.branchId}"
																	class="btn btn-xs btn-success"
																	onclick="editBranch(${row.branchId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deleteBranch(${row.branchId})" value="DELETE">
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
			
		<%@include file="Pharma_Footer.jsp"%></div>
		</div>
		<script type="text/javascript">
			</script>
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</section>
</body>
</html>