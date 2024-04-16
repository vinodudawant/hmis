<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Operation Management</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

	<!-- include js for development -->
	<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
	<script type="text/javascript" src="js/Admin.js"></script>
	
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
										
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li>Operation Management</li>	
											<div class="li pull-right">
												<button class="btn btn-xs btn-success editUserAccess"
													data-toggle="tooltip" data-placement="left" title="Save"
													onclick="saveGroupCatWiseProCharges();"	disabled><i class="fa fa-save"></i>
												</button>
												
												<button class="btn btn-xs btn-warning editUserAccess"
													data-toggle="tooltip" data-placement="left" title="Save"
													onclick="clearGroupCatWiseProCharges();" disabled><i class="fa fa-refresh"></i>
												</button>
											</div>										
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>
							
							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-12" id="divForEntry">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-body">
																<div class="form-row">

																	<div class="form-group col-md-4"> 
																		<label for="inputEmail4">Procedure Category</label>
																		<select id="opgrade" class="input-SmallText TextFont col-md-12"></select>
																	</div>
																	
																	<div class="form-group col-md-4"> 
																		<label for="inputEmail4">Sponsor</label>
																		<select name="listmstr" id="listmstr_select_chargesinfo" class="input-SmallText TextFont col-md-12"
																			onchange="setDyanamicDiv('dynamicItemsponser',this.id,'sponsor'),setDyanamicDivForChargesinfo('dynamicItemsinfo',this.id)">
																			<option id="firstElmts2">--- Select Charges	Info ---</option>
																		</select>
																		<!-- <select name="listmstr" id="listmstr_select_chargesinfo" class="input-SmallText TextFont col-md-12"
																			onchange="featchGrpCatWiseProChargeAdmin()">
																			<option id="firstElmts2">--- Select Charges	Info ---</option>
																		</select> -->
																		<div
																		class="col-md-12 select2-container select2-container-multi "
																		style="margin-top: 5%;">
																		<ul id="dynamicItemsponser" class="select2-choices"
																			style="overflow-y: scroll; min-height: 70px;"> 

																		</ul>
																	</div>
																	</div>

																	


																	<div class="form-group col-md-4"> 
																		<label for="inputEmail4">Procedure Group</label>
																		<select id="department"	class="input-SmallText TextFont col-md-12"
																			onchange=" featchGrpCatWiseProChargeAdmin()">
																			<option value="0">-SELECT-</option>
																		</select>
																	</div>
																</div>
																
															</div>
														</div>
													</div>
												</div>
												
												<div class="col-md-12">
													<div class="divide-10"></div>
													<div class="container">
														<div class="panel panel-primary" >
															<div class="panel-body" style="overflow: auto;height: 400px">
																<table id="fixed_header" class="table table-striped table-bordered">
																	<thead id="ehatTHead" class="fixedheaderdemo">
																		<tr>
																			<th class="col-md-1 center">Hall Type</th>
																			<th class="col-md-2 center">Surgeon Charges</th>
																		</tr>
																	</thead>
																	<tbody id="hallwisecharges" style="height: 100px;">
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
	
	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#opgrade").val('1');
			//getHallTypeGrpWisProCharge();
			fetchHallTypeProchargeOpration();
			//getoperation();
			//fetchDepartmentForOTSchedule();
			//fetchDepartmentForOTSchedule()
			fetchprocedureCatsedradmin();
			fetchProcedureGroupAdmin();
			getAllChargeslot();	
		});
	</script>
	<!-- /JAVASCRIPTS -->
		<input id="masterModuleId" class="hidden">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input id='queryType' type='hidden' />
		<div id="operationDataDiv" style="display: none;"></div>
		<div id="divfetchHallType" style="display: none;"></div>
		<input type="hidden" id="count" value="">
		
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>