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

	<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_document.js"/>"></script>
<%@include file="pharma_header.jsp"%>


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
	var txtDocumentName  = $('#txtDocumentName').val().toString().trim(); 
		
	if($('#txtDocumentName').val()!=null && $('#txtDocumentName').val()!="")
		{ 	
		if(txtDocumentName.length!=0)
		{
		   if($('#txtDocId').val()!=null && $('#txtDocId').val()!="")
		    { 	
			  // alert("Record Updated Successfully!");
		      $('#documentMasterForm').submit();
		    }
		   else
			   {
			   //alert("Record Saved Successfully!");
			     $('#documentMasterForm').submit();
			   }
		}
		else
			{
			alert("Can not insert empty record");
			window.location.href = "view_doc";		
			}
		}
	else
	  {
		alert("Enter Document Name");
		 $('#txtDocumentName').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchDocument($("#hiddenId").val());
	}
	else
	{	
		alert("Enter Document Name in Search Box");
	    $('#searchBox').focus();
	}

}
</script>


</head>

<script>
		jQuery(document).ready(function() {		
			App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
		});
</script>


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
											<li>Document Master</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success"
													onclick="validateData();">Save</button>
											</div>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div id="SearchContent" class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Document Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Document Name Here"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitContent($('#searchBox').val())" /> <input
										type="hidden" id="hiddenId" />

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
														url : "../../pharmacy/document/autoSuggestionDocumentNames",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++){
																availableTags[i]=r[i].docName+"-"+r[i].docId;
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
									<div id="documentMaster" class="col-md-4-1"
										style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">
										<form:form
											action="../../pharmacy/document/save_document"
											commandName="document" id="documentMasterForm" method="post">
											<div class="col-md-12-1 center">
												<h4 id="title">Document Master</h4>
											</div>

											<div class="col-md-12-1 "
												style="margin-top: 9px; margin-bottom: 10px;">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b>Document Name</b>
												</div>
												<div class="col-md-7-1" style="margin-top: 9px;">
													<form:input path="docName" type="text" autocomplete="off"
													 id="txtDocumentName"
														name="txtDocumentName"
														class="form-control input-SmallText"
														placeholder="Document Name"  required="true" />
														<!-- onblur="isAlphaWithSpace('txtDocumentName',0,25)" -->

													<form:hidden path="docId" id="txtDocId" />
												</div>
												<div class="col-md-1-1"
													style="color: red; padding-left: 3%; margin-top: 9px;">
													<b>*</b>
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
														<th style="height: 21.5px;" class="col-md-2"><div>
																Document Name</div></th>

														<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
													</tr>

												</thead>


												<tbody id="divDocumentList">
													<c:forEach items="${ltDocumentMaster}" var="row"
														varStatus="count">
														<tr>
															<td class="col-md-1">${count.index+1}<input
																type="hidden" id="docId${row.docId }"
																name="docId${row.docId }" value="${row.docId }">
															</td>
															<td class="col-md-2">${row.docName }<input
																type="hidden" id="docName${row.docId }"
																name="docName${row.docId }" value="${row.docName }"></td>
															<td class="col-md-1">
																<button id="btnEdit${row.docId}"
																	class="btn btn-xs btn-success"
																	onclick="editDocument(${row.docId})" value="EDIT">
																	<i class="fa fa-edit"></i>
																</button>
															</td>
															<td class="col-md-1">
																<button id="btnDelete${row.docId}"
																	class="btn btn-xs btn-success"
																	onclick="deleteDocument(${row.docId})" value="DELETE">
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
		<%-- 	<input type="hidden" id="pageName"
					value="<%=request.getParameter("pagename")%>"></input>
				<div style="display: none; display: none;" id="divMyObj"></div>
				<div style="display: none;" id="divForFeesObj"></div>
				<div style="display: none;" id="divForTestObj"></div>
				<div style="display: none;" id="divForOpObj"></div>
				<div style="display: none;" id="divSpSpDisHide"></div>
				<div style="display: none;" id="SponsoredDetailsContent"></div>
				<input type='hidden' id='queryType' value='' />
				<script type="text/javascript">
					
				</script> --%>
		<%@include file="Pharma_Footer.jsp"%>
	</section>
</body>
</html>