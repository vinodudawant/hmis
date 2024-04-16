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
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_hsn.js"/>"></script>
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
	var txtHsnNo  = $('#txtHsnNo').val().toString().trim(); 
	
	if($('#txtHsnNo').val()!=null && $('#txtHsnNo').val()!="")
		{ 
		
			  if(txtHsnNo.length!=0)
				{
			  if($('#hsnId').val()!=null  && $('#hsnId').val()!="" && $('#hsnId').val()!=0)
				  {	 
				 
				  alert("Record Updated Successfully!");	
				    $('#hsnMasterForm').submit();
				   
				      
				  }
			  else
				  {     alert("Record Saved Successfully!");
				 	     $('#hsnMasterForm').submit();
				 	    
				 	    
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
		alert("Enter Hsn No");
		 $('#txtHsnNo').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchHsn($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Hsn No in Search Box");
	    $('#searchBox').focus();
	}

}

</script>

<script>
		jQuery(document).ready(function() {		
			App.setPage("Pharma_hsn_master");  //Set current page
			App.init(); //Initialise plugins and elements
			
			$("#txtHsnNo").focus();
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
											<li><i class="fa fa-home"></i> <a
												href="/../../Dashboard.jsp">Home</a></li>
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>HSN Master</li>
											
										</ul>
									</div>
								</div>
							</div>

							<!-- /Common -->
							<div class="divide-20"></div>
						
							<div class="panel panel-default">
								<div class="panel-body">
									<div id="HsnContent" class="col-md-4-1"
										style="height: 100%; margin-top: 1%; padding-left: 20px; border: 1px solid #b8b8b8;">
										<form:form commandName="hsn" id="hsnMasterForm"
											action="../../pharmacy/hsn/save" method="post">
											<div class='col-md-12-1 center'>
												<h4>HSN Master</h4>
											</div>
											<div class='divide-20'></div>

											<div class="form-group Remove-Padding col-md-12-1"
												style="margin-left: 6px;">
												<div class='divide-20'></div>
												<div class='col-md-4-1' style='padding-top: 2%;'>
													<b>HSN No</b>
												</div>
												<div class='col-md-5-1 center'
													style='padding-top: 2%; color: red;'>
													<form:input path="hsnNo" id='txtHsnNo'
														name='txtHsnNo' type='text' autocomplete="off" placeholder="Hsn No"
														class="form-control input-SmallText" />
													<form:hidden path="hsnId" id="hsnId" />

												</div>
												<div class='col-md-1-1 '
													style='padding-top: 2%; color: red;'>
													<b> *</b>
												</div>
											</div>

											<div class='col-md-12-1 center'
												style="margin-top: 9px; margin-bottom: 10px;">
												<button type="button" class="btn btn-xs btn-success"
													onclick="validateData()">
													Save <i class="fa fa-save"></i>
												</button>
											</div>

										</form:form>
									</div>
									<div
										style="width: 55%; margin-left: 3%; float: left; height: 100%;">
										<div
											style="width: 100%; overflow-y: scroll; height: 300px; max-height: auto; margin-left: 2%;">
											<table
												class="table table-striped table-bordered header-fixed cf "
												style="Width: 100%; margin-top: 5px;">
												<thead class="cf" style="background: white;">
													<tr>
														<th style="height: 21.5px;" class="col-md-1"><div>Sr
																No</div></th>
														<th style="height: 21.5px;" class="col-md-2"><div>Hsn
																No</div></th>

														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>
												</thead>

												<tbody id="divHsnList">
													<c:forEach items="${ltHsnMasters}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${(count.index)+1} <input
																type="hidden" id="hsnId${row.hsnId }"
																value="${row.hsnId }"></td>
															<td class="col-md-2">${row.hsnNo } <input
																type="hidden" id="hsnNo${row.hsnId}" value="${row.hsnNo }"></td>

															<td class="col-md-1">
																<button id="btnEdit${row.hsnId}"
																	class="btn btn-xs btn-success"
																	onclick="editHsn(${row.hsnId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete2" class="btn btn-xs btn-success"
																	onclick="deleteHsn(${row.hsnId})" value="DELETE">
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
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		
		<!-- <div id="hsnListDiv" style="display: none;"></div> -->
		<%@include file="Pharma_Footer.jsp"%>
	</section>
</body>
</html>