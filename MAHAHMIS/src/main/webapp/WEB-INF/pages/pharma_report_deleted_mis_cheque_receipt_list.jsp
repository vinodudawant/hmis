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


<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>


<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.base.css"/>">

<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.energyblue.css"/>"
	type="text/css" />

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxmenu.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.filter.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/demos.js"/>"></script>


<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>



<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>

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
	z-index: 10000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/EhatEnterprise/pharmacy/resources/images/ajax_loader_blue_64.gif')
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
		
		getDeletedChequeList();

		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
	});

	function getDeletedChequeList() {
		jQuery.ajax({
			type : "GET",
			url : "getDeletedChequeReceiptList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setDeletedChequeListResult(r);
			}
		});

	}

	function getDeletedChequeReport() {
				jQuery.ajax({
					async : true,
					type : "POST",
					url : "getDeletedChequeReceiptReport",
					
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						alert("report generated successfully");
						setResult(r);
					}
				});
	}

	function setDeletedChequeListResult(result) {
		var data = result;
		// prepare the data
		var source = {
			datatype : "json",
			datafields : [ {
				name : 'chequeNum',
				type : 'string'
			},
			{
				name : 'vendorName',
				type : 'string'
			},
			{
				name : 'vendorBankName',
				type : 'string'
			}, {
				name : 'pharmacyBank',
				type : 'string'
			}, {
				name : 'amount',
				type : 'string'
			},  {
				name : 'madeBy',
				type : 'string'
			},
			
			
			],
			localdata : data
		};

		/*  var columnrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
		 	 calculateTotalAmount(value);
		      $("#totalAmount").val(total.toFixed(3));
		 }; */
		 
		

		    var dataAdapter = new $.jqx.dataAdapter(source, {
                downloadComplete: function (data, status, xhr) { },
                loadComplete: function (data) { },
                loadError: function (xhr, status, error) { }
            });
		    
		$("#jqxgrid")
				.jqxGrid(
						{
							width : 900,
							source : dataAdapter,
							columnsresize : true,
							pageable : true,
							showstatusbar : true,
							autoheight : true,
							sortable : true,
							altrows : true,
							enabletooltips : true,
							theme : 'energyblue',
							renderstatusbar : function(statusbar) {
								// appends buttons to the status bar.
								var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
								/* var addButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/add.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Add</span></div>"); */
								var deleteButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/close.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Delete</span></div>");
								var reloadButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/refresh.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Reload</span></div>");
								var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
								/* container.append(addButton); */
								container.append(deleteButton);
								container.append(reloadButton);
								container.append(searchButton);
								statusbar.append(container);
							/* 	addButton.jqxButton({
									width : 60,
									height : 20
								});
							 */	deleteButton.jqxButton({
									width : 65,
									height : 20
								});
								reloadButton.jqxButton({
									width : 65,
									height : 20
								});
								searchButton.jqxButton({
									width : 50,
									height : 20
								});
								// add new row.
								/* addButton.click(function(event) {
									var datarow = generatedata(1);
									$("#jqxgrid").jqxGrid('addrow', null,
											datarow[0]);
								});
								 */// delete selected row.
								deleteButton.click(function(event) {
									var selectedrowindex = $("#jqxgrid")
											.jqxGrid('getselectedrowindex');
									var rowscount = $("#jqxgrid").jqxGrid(
											'getdatainformation').rowscount;
									var id = $("#jqxgrid").jqxGrid('getrowid',
											selectedrowindex);
									$("#jqxgrid").jqxGrid('deleterow', id);
								});
								// reload grid data.
								reloadButton.click(function(event) {
									$("#jqxgrid").jqxGrid({
										source : dataAdapter
									});
								});
								// search for a record.
								searchButton.click(function(event) {
									var offset = $("#jqxgrid").offset();
									$("#jqxwindow").jqxWindow('open');
									$("#jqxwindow").jqxWindow('move',
											offset.left + 30, offset.top + 30);
								});
							},
							columns : [ {
								text : 'Cheque Number',
								datafield : 'chequeNum',
								width : 300
								
							}, 
							{
								text : 'Vendor Name',
								datafield : 'vendorName',
								width : 100
								
							},							
							{
								text : 'Vendor Bank',
								datafield : 'vendorBankName',
								width : 100
							}, {
								text : 'Pharmacy Bank',
								datafield : 'pharmacyBank',
								width : 150
							}, {
								text : 'Amount',
								datafield : 'amount',
								width : 150
							}, {
								text : 'Entry Made by',
								datafield : 'madeBy',
								width : 150
							},
							 
							 ],

						});

		$("#jqxwindow").jqxWindow({
			resizable : false,
			autoOpen : false,
			width : 210,
			height : 180
		});
		// create find and clear buttons.
		$("#findButton").jqxButton({
			width : 70
		});
		$("#clearButton").jqxButton({
			width : 70
		});
		// create dropdownlist.
		$("#dropdownlist").jqxDropDownList({
			autoDropDownHeight : true,
			selectedIndex : 0,
			width : 200,
			height : 23,
			source : [ 'Vou No' ]
		});
		if (theme != "") {
			$("#inputField").addClass('jqx-input-' + theme);
		}
		// clear filters.
		$("#clearButton").click(function() {
			$("#jqxgrid").jqxGrid('clearfilters');
		});
		// find records that match a criteria.
		$("#findButton").click(
				function() {
					$("#jqxgrid").jqxGrid('clearfilters');
					var searchColumnIndex = $("#dropdownlist").jqxDropDownList(
							'selectedIndex');
					var datafield = "";
					switch (searchColumnIndex) {
					case 0:
						datafield = "vouNo";
						break;
					}
					var searchText = $("#inputField").val();
					var filtergroup = new $.jqx.filter();
					var filter_or_operator = 1;
					var filtervalue = searchText;
					var filtercondition = 'contains';
					var filter = filtergroup.createfilter('stringfilter',
							filtervalue, filtercondition);
					filtergroup.addfilter(filter_or_operator, filter);
					$("#jqxgrid").jqxGrid('addfilter', datafield,
							filtergroup);
					// apply the filters.
					$("#jqxgrid").jqxGrid('applyfilters');
				});

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
						"<button onclick='getDeletedChequeReport()' class='btn btn-xs btn-success' type='button'>Get"
								+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
								+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
								+ "");
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
											<li>Purchase Bills Delete Report</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<!-- <li class="pull-right" id="template">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getPharmacyCompanyWiseProductReport()">Get
													Product Report</button> <button class="btn btn-xs btn-danger">Discard</button>
											</li> -->

											<li id="template" class="pull-right">
												<button onclick="getDeletedChequeReport();"
													class="btn btn-xs btn-success" type="submit">Get
													Report</button> <!-- <button class="btn btn-xs btn-danger">Discard</button> -->
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
											<h4 id="title" class="center">Deleted Cheque Receipt Report</h4>
										</div>

									</div>
									<div class="col-md-12"
										style="overflow-y: scroll; width: 100%; height: 400px; max-height: auto;">
										<div id='jqxWidget'>
											<div class="col-md-12-1" id='jqxgrid'
												style="margin-top: 2%;"></div>
											<div id="jqxwindow">
												<div>Find Record</div>
												<div style="overflow: hidden;">
													<div>Find what:</div>
													<div style='margin-top: 5px;'>
														<input id='inputField' type="text" class="jqx-input"
															style="width: 200px; height: 23px;" />
													</div>
													<div style="margin-top: 7px; clear: both;">Look in:</div>
													<div style='margin-top: 5px;'>
														<div id='dropdownlist' style="background: #a4bed4"></div>
													</div>
													<div>
														<input type="button"
															style='margin-top: 15px; margin-left: 50px; float: left;'
															value="Find" id="findButton" /> <input type="button"
															style='margin-left: 5px; margin-top: 15px; float: left;'
															value="Clear" id="clearButton" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-md-1-1"
									style="height: 100%; margin-top: 2%; padding-left: 20px;"></div>

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