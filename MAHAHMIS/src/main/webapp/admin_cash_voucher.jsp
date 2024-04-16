<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Cash Voucher Master </title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
	<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
	<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link rel="stylesheet" type="text/css" href="timepeacker/jquery.datetimepicker.css" />
	<script src="timepeacker/jquery.datetimepicker.js"></script>
	
<!-- include js for development -->
<script type="text/javascript" src="js/admin_masters.js"></script>
<script type="text/javascript" src="js/admin_cash_voucher.js"></script>



</head>
<body>
<c:if test="${ sessionScope.userType != null }">
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="left_menu_admin.jsp"%>
		<!-- /SIDEBAR -->
			<div id="main-content">

				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="admin_cash_voucher.jsp">Cash Voucher</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									
									<form class="form-horizontal col-md-4" role="form">
										<div class="form-group">
											<label class="col-sm-3 control-label">Search BY</label>
											<div class="col-sm-8">
												<select class="tip-focus" id="searchVoucherById"
													name="searchVoucherById" style="width: 100%"
													title="Please select voucher Type">
													<option value=0>--Select Search By--</option>
													<option value=1>By Payee Name</option>
												</select>
											</div>
										</div>
									</form>


								<form class="form-horizontal col-md-3" role="form">
										<div class="form-group">
											<div class="col-sm-8">
												<input type="text" class="tip-focus" id="searchByName"
													 style="width: 100%" title="Please Enter voucher Name" onkeyup="searchVoucherBy()">
											</div>
										</div>
									</form>

									<form class="form-horizontal col-md-1" role="form">
										<div class="form-group">
											<button class="btn btn-primary"
												style="height: 25px; margin-bottom: 10px" type="button" onclick="refreshSearch(),getAllCashVouchers()">
												Refresh
											</button>
										</div>
									</form>

								</div>
							</div>

							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Cash Voucher</div>
															<div class="box-body big" id="divEhatContent">
																<div class="row">

																	<div class="col-md-12 center" style="padding: 10px;">
																		<form class="form-horizontal col-md-4" role="form">
																			<div class="form-group">
																				<label class="col-sm-3 control-label">Voucher
																					Type</label>
																				<div class="col-sm-8">
																					<select class="tip-focus" id="voucherTypeId"
																						name="voucherTypeId" style="width: 100%"
																						title="Please select voucher Type" onchange="setTitle()">
																					</select>
																				</div>
																			</div>
																		</form>
																		
																		
																	</div>
																	
																	<h2 id="title" class="center">Cash Voucher</h2>
																	
																	
																	<div class="col-md-12" style="padding: 10px;">
																	<form class="form-horizontal col-md-6" role="form">
																			<div class="form-group">
																				<label class="col-sm-3 control-label">Group Name</label>
																				<div class="col-sm-8">
																					<select class="tip-focus" id="vouchername" name="vouchername"
																						style="width: 100%" title="Please select group name" onchange="getLedgerHeads(this.value)">
																					</select>
																				</div>
																			</div>
																		</form>
																	
																		<form class="form-horizontal col-md-6" role="form">
																			<div class="form-group">
																				<label class="col-sm-3 control-label">Ledger Heads </label>
																				<div class="col-sm-8">
																					<select class="tip-focus" id="leadgerHeadsId" name="leadgerHeadsId"
																						style="width: 100%" title="Please select Ledger Heads">
																						<option value='0'>--Select Ledger Heads--</option>
																					</select>
																				</div>
																			</div>
																		</form>
																		
																		<form class="form-horizontal col-md-6" role="form">
																			<div class="form-group">
																				<label class="col-sm-3 control-label">Authorised By<b style="color: red">*</b></label>
																				<div class="col-sm-8">
																					<select class="tip-focus" id="authorisedById"
																						name="authorisedById" style="width: 100%"
																						title="Please select authorised By">
																						<option value='0'>--Select Authorised By--</option>
																					</select>
																				</div>
																			</div>
																		</form>


																		<form class="form-horizontal col-md-6" role="form">
																			<div class="form-group">
																				<label class="col-sm-3 control-label">Amount<b style="color: red">*</b></label>
																				<div class="col-sm-8">
																					<input class="form-control tip-focus"
																						title="Please enter amount"
																						id="amount" type="text" onkeypress="return validateNumber(event)"
																						placeholder="amount">

																				</div>
																			</div>
																		</form>
																		
																		<form class="form-horizontal col-md-6" role="form">
																			<div class="form-group">
																				<label class="col-sm-3 control-label">Date<b style="color: red">*</b></label>
																				<div class="col-sm-8">
																					<input class="form-control tip-focus"
																						title="Please enter date" id="dateCashVoucher"
																						type="text" placeholder="date"
																						onclick="displayCalendar(document.getElementById('dateCashVoucher'),'dd/mm/yyyy',this)">
																					
																				</div>
																			</div>
																		</form>
																		
																		<form class="form-horizontal col-md-6" role="form">
																			<div class="form-group">
																				<label class="col-sm-3 control-label">Pay To<b style="color: red">*</b></label>
																				<div class="col-sm-8">
																					<input class="form-control tip-focus"
																						title="Please enter pay to"
																						id="payTo" type="text"
																						placeholder="pay To">

																				</div>
																			</div>
																		</form>
																		
																		<form class="form-horizontal col-md-6" role="form">
																			<div class="form-group">
																				<label class="col-sm-3 control-label">Narration<b style="color: red">*</b></label>
																				<div class="col-sm-8">
																					<textarea class="form-control tip-focus"
																						title="Please Narration" style="resize:none"
																						id="narration" type="text" col="5"
																						placeholder="Narration"></textarea>

																				</div>
																			</div>
																		</form>
																	</div>

																	<form class="form-horizontal col-md-3" role="form">
																		<div class="form-group">
																			<label class="col-sm-4 control-label"></label>
																			<div class="col-sm-4">
																				<input type="button" class="btn btn-primary"
																					onclick="saveCashVoucher()" value="Submit">
																			</div>
																			<div class="col-sm-4">
																				<input type="button" class="btn btn-info"
																					onclick="clearCashVoucherForm()" value="Refresh">
																			</div>
																		</div>
																	</form>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 10px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																	
																</div>
																<div class="panel panel-primary" style="margin-top: 20px">
																	<div class="panel-heading" id="divEhatContent">Vouchers</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<ul class="nav nav-tabs">
																			<li class="active"><a data-toggle="tab"
																				href="#proccessed"><b>Generated Vouchers</b></a></li>
																			<li><a data-toggle="tab" href="#cancelled" onclick="getAllcancelCashVoucher()"><b>Cancelled
																						Vouchers</b></a></li>
																		</ul>
																		<div class="tab-content" id="mainTabs">
																			<div id="proccessed" class="tab-pane fade in active">
																				<table id="ehatTable" cellpadding="0"
																					cellspacing="0" border="0"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th class="col-md-1 center">#</th>
																							<th class="col-md-1 center">Voucher ID</th>
																							<th class="col-md-1 center">Pay To</th>
																							<th class="col-md-1 center">Amount</th>
																							<th class="col-md-1 center">Print</th>
																							<th class="col-md-1 center">Cancel</th>

																						</tr>
																					</thead>
																					<tbody id="cashVoucherDetailsBody">
																					</tbody>
																				</table>
																			</div>
																			<div id="cancelled" class="tab-pane fade">
																				<table id="ehatTable" cellpadding="0"
																					cellspacing="0" border="0"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th class="col-md-1 center">#</th>
																							<th class="col-md-1 center">Voucher ID</th>
																							<th class="col-md-1 center">Pay To</th>
																							<th class="col-md-1 center">Amount</th>
																							<th class="col-md-1 center">Print</th>
																						</tr>
																					</thead>
																					<tbody id="cancelCashVoucherDetailsBody">
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
										</div>
									</div>
								</div>
							</div>
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->

	<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			defaultViewVoucher('ledgerHead');
			fetchAuthorisedBy();
			getGeneralVouchers();
			getAllCashVouchers();
			
		});
	</script>
	<input type="hidden" id=idCashVoucher value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>