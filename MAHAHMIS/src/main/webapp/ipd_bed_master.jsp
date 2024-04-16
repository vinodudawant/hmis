<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Bed | Management</title>
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
	
	<!-- include js for development -->
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/ipd_bed_master.js"></script>
	<script type="text/javascript" src="js/validate.js"></script>
	<script type="text/javascript" src="js/chargesMaster.js"></script>

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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="UserManagement.jsp">Administrator</a></li>
											<li><a href="bedState.jsp">IPD Management</a></li>
											<li>Bed Management</li>
											<div id="divSaveBtn" class="pull-right">
												<div class="col-sm-4">
													<input type="button" class="btn btn-xs btn-success editUserAccess"
														id="btnSave" onclick="saveChargesMasterSlave()" value="Submit">
												</div>
												<div class="col-sm-4">
													<input type="button" class="btn btn-xs btn-warning" onclick="refreshChargesMasterSlave()" value="Refresh">
												</div>
											</div>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<!-- <div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>
									<div class="col-md-4">
										<div class="input-group" id="documentByName">
											<input class="form-control"
												title="Please enter document name" id="searchwardtypename"
												type="text" placeholder="Search Text"
												onkeyup="inventoryDocumentAutoSuggestion(this.id,'doumentMaster')">
											<span class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button"
													onclick="fetchHallTypeandCharges();">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4"></div>
									<div class="col-md-4"></div>

								</div>
							</div> -->

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row" id="divHallList">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary" id="divForEntr">
															<div class="panel-heading" id="divEhatContent">Bed Master</div>
															<div class="panel-body">
															
																<div class="form-row">
																	<div class="form-group col-md-4">
																		<div class="form-group">
																			<div class="col-md-12">
																				<select class="col-md-8" name="listmstr"
																					id="listmstr_select" style="width: 100%"
																					onchange="setDyanamicDivForCharges('dynamicItem',this.id)">
																					<option id="firstElmt">--- Select Master ---</option>
																				</select>
																				<div class="col-md-12 select2-container select2-container-multi "
																					style="margin-top: 2%; width: 100%">
																					<ul id="dynamicItem" class="select2-choices"
																						style="overflow-y: scroll; min-height: 70px">
																					</ul>
																				</div>
																			</div>
																		</div>
																	</div>
																	
																	<div class="form-group col-md-3" style="display: none;">
																		<label class="control-label col-md-4">Master of Master</label> 
																		<input id="subId" type="text" value="0" />
																	</div>

																	<div class="form-group col-md-4" style="display: none;">
																		<label class="control-label col-md-4">Sub ID</label>
																		<input id="slaveId" type="text" placeholder="Slave ID" style="background-color: #ddd"	
																			class="form-control input-SmallText col-md-7"	readonly="readonly" style="margin-left:0%;" value="0" />
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label class="control-label">HallType/Hall Name</label> 
																		<input id="categoryName" type="text" placeholder="HallType/Hall Name"
																			class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please Enter HallType/Hall Name" required maxlength="150" />
																	</div>

																	<div class="form-group col-md-2 hide">
																		<label class="control-label">Code Name </label> 
																		<input id="codeName" type="text"
																			placeholder="Code Name"	class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please enter code name" required	maxlength="150" />
																	</div>
																	
																	<div class="form-group col-md-2">
																		<div class="col-sm-12">
																			<label for="input-type" class="control-label">Is
																				Category</label>
																			<div id="input-type" class="row">
																				<div class="col-sm-6">
																					<label class="radio-inline"> <input onclick="setIsCategoryWiseInput()"
																						name="privilegesTypes" id="isCategorys" value="Y"
																						type="radio" checked="checked" />Yes
																					</label>
																				</div>
																				<div class="col-sm-6">
																					<label class="radio-inline"> <input onclick="setIsCategoryWiseInput()"
																						name="privilegesTypes" id="NoCategors" value="N"
																						type="radio" />No
																					</label>
																				</div>
																			</div>
																		</div>
																		<div class="col-sm-6 hide">
																			<label for="input-type" class="control-label">Is
																				PPN</label>
																			<div id="input-type" class="row">
																				<div class="col-sm-6">
																					<label class="radio-inline"> <input
																						name="ppnTypes" id="yesPpn" value="Y" type="radio" />Yes
																					</label>
																				</div>
																				<div class="col-sm-6">
																					<label class="radio-inline"> <input
																						name="ppnTypes" id="noPpn" value="N" type="radio"
																						checked="checked" />No
																					</label>
																				</div>
																			</div>
																		</div>
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label class="control-label">Rehab Package Charges</label> 
																		<input id="rehPackCharges" type="text" placeholder="Number" class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please enter Number" required maxlength="150" value="0" />
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label class="control-label">No of beds</label> 
																		<input id="noOfBeds" type="text" placeholder="Number" class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please enter Number" required maxlength="150" value="0" />
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label class="control-label">Normal Nursing Charges</label> 
																		<input id="normalNurseCharges" type="text" placeholder="Number" class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please enter Number" required maxlength="150" value="0" />
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label class="control-label">Isolation Nursing Charges </label> 
																		<input id="isoNurseCharges" type="text" placeholder="Number" class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please enter Number" required maxlength="150" value="0" />
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label class="control-label">Normal Bed Charges</label> 
																		<input id="normalBedCharges" type="text" placeholder="Number" class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please enter Number" required maxlength="150" value="0" />
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label class="control-label">Isolation Bed Charges </label> 
																		<input id="isoBedCharges" type="text" placeholder="Number" class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please enter Number" required maxlength="150" value="0" />
																	</div>

																	<div class="form-group col-md-2 hide">
																		<label class="control-label" style="display: none">Sub-charges Number </label> 
																		<input id="numbr" type="text" placeholder="Number" class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="Please enter Number" required maxlength="150" style="display: none" value="0" />
																	</div>

																	<div class="form-group col-md-1n hide">
																		<label class="control-label" style="display: none">Discount</label> 
																		<input id="disc" type="text" value=0
																			placeholder="Number" class="form-control input-SmallText col-md-7 form-control tip-focus"
																			title="%" required maxlength="3" onblur="checkDisc()" style="display: none" />
																	</div>

																	<!-- <div class="form-group col-md-2" style="top: 15px">
																		<div class="col-sm-6">
																			<input type="button"
																				class="btn btn-success editUserAccess" disabled
																				onclick="saveChargesMasterSlave()" value="Submit">
																		</div>
																		<div class="col-sm-6">
																			<input type="button" class="btn btn-primary"
																				onclick="refreshChargesMasterSlave()"
																				value="Refresh">
																		</div>
																	</div> -->

																	<div class="form-group col-md-3" style="width: 0%;display: none;">

																		<form name="importExcelForm" id="importExcelForm">
																			<div class="col-sm-6" style="width: 33%;">
																				<input type="file" required id="importFile"
																					name="file">
																			</div>
																			<div class="col-sm-4" style="width: 33%;">
																				<input type="submit"
																					class="btn btn-xs btn-info editUserAccess" disabled
																					onclick="importMasterExcel();" value="Start Import">
																			</div>
																		</form>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-12">
														<div class="tabbable header-tabs">
															<div class="row">
																<div class="col-md-12">
																	<div class="panel panel-primary">
																		<div class="panel-heading" id="divEhatContent">Bed Master Table</div>
																		<div class="box-body" id="divEhatList" style="height: 300px;overflow: auto;" >
																			<!-- <div class="row"> -->
																			<div class="col-sm-12">
																				<div class="pull-right" style="margin-top: 4px">
																					<div id="datatable1_filter" class="dataTables_filter">
																						<label id="searchlabel"> <!-- <input class="form-control input-sm"
																							type="text" aria-controls="datatable1"
																							placeholder="Search"> -->
																						</label>
																					</div>
																				</div>														
																			</div>
																			<!-- </div> -->
																		
																			<table id="ehatTable" class="datatable table table-striped table-bordered table-hover">
																				<thead id="ehatTHead">
																					
																				</thead>
																				<tbody id="ehatTBody">
				
																				</tbody>
																				<tfoot id="ehatTFoot">
																					
																				</tfoot>
																			</table>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											
											<div class="row" id="divBedDetails" style="display: none;">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">
															<div class="col-md-12">
																<div class="panel panel-primary">
																	<div class="panel-heading">Bed Details Table</div>
																	<div class="box-body" id="divEhatList" style="height: 450px;overflow: auto;" >
																	
																		<table id="ehatTable" class="datatable table table-striped table-bordered table-hover">
																			<thead>
																				<tr>
																					<th>Sr.No</th>
																					<th>Bed Id</th>
																					<th>Hall Name</th>
																					<th>Bed Name</th>
																					<th>Delete</th>
																				</tr>
																			</thead>
																			<tbody id="tBodyBedDetails">
			
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
								<!-- /NEW ORDERS -->

							</div>

							<div class="footer-tools">
								<span class="go-top"> <i class="fa fa-chevron-up"></i>
									Top
								</span>
							</div>
						</div>
						<!-- /CONTENT-->
					</div>
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

			$("#listmstr_select").select2();
			$("#searchlabel").html('<input class="form-control input-sm" id="byName2" onkeyup="autoSuggessionBedMaster(this.id)" '
								  +' type="text" placeholder="Search" aria-controls="datatable1">');
			  
			//handleHomePageTooltips();
			getAllChargesMaster();
			getChargesMasterSlaveList();
			//$('#hiddenImport').val(id);
			$("#wardTypeHall").select2();
			$("#UnitsId").select2();	
			setIsCategoryWiseInput();		
		});
	</script>
		<input type="hidden" id=doc_id value="0">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="userNameLogIn" value="<%=session.getAttribute("userLoginName")%>" />
		<input type="hidden" id="hallType_id" value="">
		<input type="hidden" id="hallTypecharge_id1" value="">
		<input type="hidden" id="hallTypecharge_id2" value="">
		<input type="hidden" id=bedListSize value="0">	
		<input type="hidden" id=callFromForSave value="insert">	
		<input type="hidden" id=noOfBedsForUpdate value="0">	

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>