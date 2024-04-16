<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.File"%>
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


<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>


<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
</head>
<style type="text/css">
.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/MAHAHMIS/pharma-resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements

		getCurrentStockCategoryList();
		
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
	});
	
	$(document).on("click","#stockData tr", function() {
		var value=$(this).attr("id");
		$("#stockData tr").each(function(){
			$(this).removeClass("active");
		});
		$(this).addClass("active");
		getCurrentCategoryDetailsById(value);
	});

	function getCurrentStockCategoryList() {
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "getCategoryWiseStock",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setCategoryListResult(r);
			}
		});

	}
	
	
	function getCurrentStockCategoryWiseReport()
	{
		var categoryId=0;
		$("#stockData").find(".active").each(function()
			    {
			categoryId=$(this).attr("id");
			    });
		var categoryName=$('#categoryName'+categoryId).html();
		var inputs = [];
		inputs.push('categoryId=' + categoryId);
		inputs.push('categoryName=' + categoryName);
		inputs.push('totalAmount=' + $('#totalAmount').val());

		var str = inputs.join('&');
	
			jQuery.ajax({
				async : true,
				type : "POST",
				url : "getCategoryWiseStockReport",
				data:str + "&reqType=AJAX",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					alert("Report Generated Successfully");
					setResult(r);
				}
			});
	}

	function getCurrentCategoryDetailsById(value) {
		var categoryId = value;

		if (categoryId != ' ' && categoryId!=null) {
			jQuery.ajax({
				async : true,
				type : "POST",
				data : {
					categoryId : categoryId
				},
				url : "getCategoryWiseStockByCategoryId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					setCategoryByIdListResult(r);
				}
			});
		}
		else
			{
			alert("Please select category name");
			}
	}

	function setCategoryListResult(result) {
		var divContent = "";
		for ( var i = 0; i < result.length; i++) {

			divContent = divContent
					+ "<tr id='" + result[i].categoryId + "'><td class='col-md-1' id='categoryName"+result[i].categoryId+"'>"
					+ result[i].categoryName + "</td></tr>";

		}
		$('#stockData').html(divContent);

	}

	function setCategoryByIdListResult(result) {
		var divContent = "";
		total=0;
		if(result.length>0)
			{
		for ( var i = 0; i < result.length; i++) {

			divContent = divContent + "<tr><td class='col-md-1'>"
					+ result[i].productName + "</td><td class='col-md-1'>"
					+ result[i].productUnit + "</td><td class='col-md-1'>"
					+ result[i].productPacking + "</td><td class='col-md-1'>"
					+ result[i].stockInHand + "</td><td class='col-md-1'>"
					+ result[i].purRate + "</td></tr>";
					
			calculateTotalAmount(result[i].purRate);

		}
		
		$("#totalAmount").val(total.toFixed(3));
		$("#totalAmount2").html(total.toFixed(3));
		$('#categoryData').html(divContent);
			}
		else
			{
			alert("Record not found");
			divContent = "";
			$("#totalAmount").val('');
			document.getElementById("categoryData").innerHTML = "";
			
			
			}

	}

	function calculateTotalAmount(amount) {

		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			total = total + parseFloat(amount);
		}
	}

	function setResult(result) {
		var splitResult = result.split('$');
		$('#template')
				.html(
						"<button onclick='getCurrentStockCategoryWiseReport()' class='btn btn-xs btn-success' type='button'>Get"
								+ "Report</button>  <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/MAHAHMIS/ehat_Reports/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
								/* + "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/MAHAHMIS/ehat_Reports/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
								 */+ "");
	}

</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
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

			<%@include file="Pharma_left_menu_reports.jsp"%>

			<!-- 			content -->

			<input type="hidden" id="userID" />
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
											<li>CategoryWise Stock Report</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<!-- <li class="pull-right" id="template">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getPharmacyCompanyWiseProductReport()">Get
													Product Report</button> <button class="btn btn-xs btn-danger">Discard</button>
											</li> -->

											<li id="template" class="pull-right">
												<button onclick="getCurrentStockCategoryWiseReport();"
													class="btn btn-xs btn-success" type="submit">Get
													Report</button> <!-- <button class="btn btn-xs btn-danger">Discard</button> -->
											</li>
											<li class="pull-right">
                                            <button id="btnExport"
												class="btn btn-xs btn-info pull-right" value="Excel"
												title="" data-placement="left" data-toggle="tooltip"
												data-original-title="Excel">Export To Excel</button>

											<script type="text/javascript">
												$("[id$=btnExport]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-excel,'
																					+ encodeURIComponent($(
																							'div[id$=reportList]')
																							.html()));
																	e
																			.preventDefault();
																});
											</script>
											</li>
										</ul>

									</div>
								</div>
							</div>
							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="col-md-12-1">
								<div class="col-md-12"
									style="height: 100%; margin-top: 2%; padding-left: 20px; border: 1px solid #b8b8b8;">

									<div class="col-md-12-1" style="margin-top: 2%;">
										<div class="col-md-12-1">
											<h4 id="title" class="center">Current Stock
												Valuation(CategoryWise)</h4>
										</div>

									</div>
									<div class="col-md-4"
										style="overflow-y: scroll; width: 40%; height: 400px; max-height: auto;">
										<table
											class='table  table-bordered table-striped header-fixed cf'
											border=1 style="margin-top: 2%">
											<thead style="">
												<tr>
													<th class="col-md-8">Category Name</th>
													
												</tr>
											</thead>
											<tbody id='stockData' class="success">
											</tbody>

										</table>
									</div>

									<div class="col-md-4" id="reportList"
										style="overflow-y: scroll; width:60%; height: 400px; max-height: auto;">
										<table
											class='table  table-bordered table-striped header-fixed cf'
											border=1 style="margin-top: 2%">
											<thead style="">
												<tr>
													<th class="col-md-1">Product</th>
													<th class="col-md-1">Unit</th>
													<th class="col-md-1">Pack</th>
													<th class="col-md-1">Stock</th>
													<th class="col-md-1">Amount</th>
												</tr>
											</thead>
											<tbody id='categoryData' class="success">
											</tbody>
											<tr>
												<td colspan="5"><span style="float:right"><strong>Total Amount</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="totalAmount" id="totalAmount" readonly style="float:right" placeholder="Total Amount"></span></td>
											</tr>
											
												<tr style="display: none;">
													<td class="col-md-1"></td>
													<td class="col-md-1"></td>

													<td class="col-md-1"></td>
													<td class="col-md-1"></td>
													<td class="col-md-1" id="totalAmount2" ></td>
												</tr>
											
										</table>

									</div>

								</div>

								<div class="col-md-1-1"
									style="height: 100%; margin-top: 2%; padding-left: 20px;"></div>

								<%-- <div class="col-md-6-1"
										style="padding-left: 1%; padding-right: 0%;">
										<div class="box border purple">
											<div class="box-title" style="background-color: #a696ce">
												<h4>
													<i class="fa fa-bitbucket"></i>ProductWise Stock
													Report(BatchWise) Report
												</h4>
												<div class="tools">
													<a href="#box-config" data-toggle="modal" class="config">
														<i class="fa fa-cog"></i>
													</a>
													<!-- <a href="javascript:;" class="reload">
												<i class="fa fa-refresh"></i>
											</a> -->
													<a href="javascript:;" class="collapse"> <i
														class="fa fa-chevron-up"></i>
													</a> <a href="javascript:;" class="remove"> <i
														class="fa fa-times"></i>
													</a>
												</div>
											</div>
											<div class="box-body " id='well'
												style="height: 350px; overflow-y: Scroll; width: 100%;">

												<div class="col-md-12-1" style="border: 2px solid;"
													id="reportList">
													<div class="col-md-12-1 center"
														style="margin-bottom: 10px;"></div>
													<div class="col-md-12-1"
														style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">
														<table border='1'
															class="table table-striped table-bordered header-fixed cf "
															style="Width: 100%; margin-top: 5px;">
															<thead class="cf" style="background: white;">
																<tr>
																	<th>File Id</th>
																	<th>File Name</th>
																	<th>Date</th>
																</tr>
															</thead>
															<tbody>
																<%
																	File folder = new File(
																			request.getRealPath("/ehat_Reports/Pharmacy/Sales/totalsale/"));
																	File[] listOfFiles = folder.listFiles();

																	if (listOfFiles != null) {
																		for (int i = 0; i < listOfFiles.length; i++) {
																%>
																<tr>
																	<td><%=i + 1%></td>
																	<td>
																		<%
																			if (listOfFiles[i].isFile()) {
																		%> <a
																		href='/MAHAHMIS/ehat_Reports/Pharmacy/Sales/totalsale/<%=listOfFiles[i].getName()%>'><%=listOfFiles[i].getName()%></a>
																	</td>
																	<td>
																		<%
																			SimpleDateFormat sdf = new SimpleDateFormat(
																								"dd/MM/yyyy HH:mm:ss");

																						/* System.out.println("After Format : " + sdf.format(listOfFiles[i].lastModified())); */
																		%> <%=sdf.format(listOfFiles[i].lastModified())%>
																	</td>
																</tr>
																<%
																	}
																		}
																	}
																%>
															</tbody>
														</table>
													</div>
												</div>

											</div>
										</div>
									</div> --%>



							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<%-- </c:if> --%>
	</section>
	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</body>
</html>