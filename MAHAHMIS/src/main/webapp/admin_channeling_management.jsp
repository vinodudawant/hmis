<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Channeling Doctor</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<%@include file="inv_header.jsp"%>
	<!-- include js for development -->
	<script type="text/javascript" src="js/channeling_doctor.js"></script>
	<script type="text/javascript" src="js/validate.js"></script>
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	
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

			<%-- <%@include file="left_menu_admin.jsp"%> --%>
			<!-- //Commented By Annapurna -->
			<%@include file="menu_HelpDesk.jsp"%>

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
												href="admin_channeling_management.jsp">Add Doctor</a></li>
											<li class="pull-right">
											<button class="btn btn-xs btn-info pull-left" type="button" onclick="toggleEntryDiv('divForEntry')">
											<i class="fa fa-plus"></i> Add Doctor
										</button>
											</li>	

										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>
									<div class="col-md-4">
										<div class="input-group" id="documentByName">
											<input class="form-control"
												title="Please enter document name" id="channelID"
												type="text" placeholder="Doctor Name OR Doctor ID"
												onkeyup="channelDoctorAutoSuggestion(this.id)">
											<span class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button"
													onclick="getchanelDoctorMgmtByIdOnClick();">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
										</div>
									</div>
									
									<div class="col-md-4">
										
									</div>
									
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-12" id="divForEntry" style="display: none;">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Doctor Details 
																</div>
															<div class="panel-body">
															
															<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Prefix <b style="color: red">*</b></label> 
																			<select name="prefix" id="prefix" class="col-md-4"
																			style="width: 100%;">
																			<option value="0">--Select--</option>

																		</select>

																	</div>
																	</div>
															
															
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Doctor Name  <b style="color: red">*</b> </label> <input
																				class="form-control tip-focus"	title="Doctor Name" onkeypress="return validatealphabetic(event)"
																				id="dname" type="text" placeholder="Doctor Name">

																		</div>
																	</div>
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Refer Fees <b style="color: red">*</b></label> <input
																				class="form-control tip-focus"	title="Please enter Reference fee" onkeypress="return validateNumbers(event)"
																				id="rfees" type="text" placeholder="Reference fee">

																		</div>
																	</div>
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Refer Doc % <b style="color: red">*</b></label> <input
																				class="form-control tip-focus"	title="Please enter ICD Description" onkeypress="return validateNumPer(event)"
																				id="refDocPer" type="text" placeholder="Refer Doc % ">

																		</div>
																	</div>
																	
																	
																	
																		<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">specialization <b style="color: red">*</b></label> <input
																				class="form-control tip-focus"	title="Please enter specialization" onkeypress="return validatealphabetic(event)"
																				id="spcl" type="text" placeholder="specialization ">

																		</div>
																	</div>
																	
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Hospital Name <b style="color: red">*</b></label> <input
																				class="form-control tip-focus"	title="Please enter Hospital Name" onkeypress="return validatealphabetic(event)"
																				id="hname" type="text" placeholder="Hospital Name ">

																		</div>
																	</div>
																	
																	
																	
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Email <b style="color: red">*</b></label> <input
																				class="form-control tip-focus"	title="Please enter email "
																				id="email" type="text" placeholder="email ">

																		</div>
																	</div>
																	
																	
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Phone No <b style="color: red">*</b></label> <input
																				class="form-control tip-focus"	title="Please enter contact No "onkeypress="return validateNumbers(event)"
																				id="contact" type="text" placeholder="contact No ">

																		</div>
																	</div>
																	
																	
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Mobile No <b style="color: red">*</b></label> <input
																				class="form-control tip-focus"	title="Please enter Mobile No "onkeypress="return validateNumbers(event)"
																				id="mobile" type="text" placeholder="Mobile No ">

																		</div>
																	</div>
																	
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Address <b style="color: red">*</b></label> <input
																				class="form-control tip-focus"	title="Please enter address " onkeypress="return validatealphabetic(event)"
																				id="address" type="text" placeholder="address ">

																		</div>
																	</div>
																	
																	
																	
																	
																	
																	
																	
																	<div class="form-row">
																		<div class="form-group col-md-3">
																		<label for="inputEmail4">Category</label> 
																			<label for="inputEmail4">IPD</label> 
																			<input	id="chkIpd" type="radio" name="typeOfDoctor"  value="ipd" checked="checked"   >
																			<label for="inputEmail4">OPD</label> 
																			<input	id="chkOpd" type="radio" name="typeOfDoctor" value="opd" >
																			<label for="inputEmail4">Diagnostics </label> 
																			<input	id="chkDiagnosis" type="radio" name="typeOfDoctor" value="diagnosis" >
																			<label for="inputEmail4">All</label> 
																			<input	id="all" type="radio" name="typeOfDoctor" value="all" >
																			
																		</div>
																	</div>
																	
																	<button type="button" class="btn btn-success" onclick="saveReferToDoc()" style="margin-top: 15px;">Save</button>
																	<button type="button" class="btn btn-warning" onclick="refershChannelDoctorMgmt()" style="margin-top: 15px;">Clear</button>
															</div>

														</div>

													</div>
												</div>
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 5px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>																
																<div class="panel panel-primary" >
																	<div class="panel-heading" id="divEhatContent">Channeling Doctor
																		</div>
																	<!-- 	// Added by Annapurna -->
																	<div class="panel-body" style="height:300px;overflow-y:scroll; ">
																		<table id="ehatTable" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead" class="fixedheaderdemo">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Doctor ID</th>
																					<th class="col-md-1 center">Prefix Code</th>
																					<th class="col-md-1 center">Doctor Name</th>
																					<th class="col-md-1 center">Refer Fees</th>
																					<th class="col-md-1 center">Refer %</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="channeldoctorMgmtBody">
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
		
			<%@include file="inv_footer.jsp"%>

	<!-- CUSTOM SCRIPT -->

	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#prefix").select2();
			setExistingDoctorTemp();
			defaultFetchPatientTitle('PatientTitle');
		});
	</script>
	<input type="hidden" id="did" value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>