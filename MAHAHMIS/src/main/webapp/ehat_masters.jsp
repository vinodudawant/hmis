<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>EhatEnterprise |Masters </title>
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
		
	<!-- STYLESHEETS --><!--[if lt IE 9]><script src="js/flot/excanvas.min.js"></script><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
	
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
	
	<!-- FONTS -->
	<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'> -->
		
	<script type="text/javascript" src="js/ehatMaster.js"></script>
	<script type="text/javascript" src="js/dept.js"></script>
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script type="text/javascript" src="js/serviceMaster.js"></script>
	<script type="text/javascript" src="js/subService.js"></script>
	
	<script type="text/javascript" src="js/chargesMaster.js"></script>
	<script src="js/chargesMasterSlave.js"></script>
	<script src="js/ehat_center.js"></script>
	
	<script type="text/javascript" src="js/hospitalDetailAdministrator.js"></script>
<!-- include js for development -->

</head>
<body>
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
										<li><i class="fa fa-home"></i> <a href="ehat_masters.jsp">Masters</a>
										</li>
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>

						<div class="row">
							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="box border">
									<div class="box-title">
										<h4>
											<i class="fa fa-colum"></i> <span
												class="hidden-inline-mobi"></span>
										</h4>
									</div>
									<div class="box-body">
										<div class="tabbable header-tabs">
											<ul class="nav nav-tabs">
											
												<li class="ehatList" id="subChrgsMaster" onclick="setNewTemp(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Sub-Charges Master</span><span class="badge badge-blue font-11" id="subChrgCount"> 0</span>
														</a></li>
											
												<li class="ehatList" id="chrgsMaster" onclick="setNewTemp(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Charges Master</span><span class="badge badge-blue font-11" id="chrgCount"> 0</span>
														</a></li>
											
												<li class="ehatList" id="subServMaster" onclick="setNewTemp(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Sub-Service Master</span>
														<span class="badge badge-blue font-11" id="subCount"> 0</span>
														</a></li>
											
												<li class="ehatList" id="servMaster" onclick="setNewTemp(this.id);" ><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Service Master</span>
														<span class="badge badge-blue font-11" id="servCount"> 0</span>														
														</a></li>
												
												<li class="ehatList" id ="deptMaster" onclick="setNewTemp(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Department Master</span>
														<span class="badge badge-blue font-11" id="deptCount"> 0</span>		
														</a></li>
																
												<li id ="unitMaster" onclick="setNewTemp(this.id);" class="active ehatList "><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Unit Master</span>
														<span class="badge badge-blue font-11" id="unitCount"> 0</span>		
														</a></li>										

											</ul>

											<!-- <div class="box border green"  style="margin-top: -35px;">

												<div class="box-body big" id="divEhatContent"
													class="select2-container select2-container-multi">

													<div class='form-group Remove-Padding col-md-4'
														style="display: none;">
														<label class='TextFont col-md-4-1'>Sub ID</label> <input
															id='subId' type='text' placeholder='Slave ID'
															style='background-color: #ddd'
															class='form-control input-SmallText col-md-7-1'
															readonly='readonly' style='margin-left:0%;' value='0' />
													</div>

													<div class="form-group Remove-Padding col-md-4">
														<div class="form-group">
															<div class="col-md-8">
																<select name="listmstr" id="listmstr_select"
																	style="width: 100%"
																	onchange="setDyanamicDiv('dynamicItem',this.id)">
																	<option id="firstElmt">Select Master</option>
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

													<div class='form-group Remove-Padding col-md-4'>

														<label class='TextFont col-md-5'>Category Name </label> <input
															id='categoryName' type='text' placeholder='Category Name'
															class='form-control input-SmallText col-md-7 form-control tip-focus'
															title='Please enter category name' required
															maxlength='150' />
													</div>

													<div class='form-group Remove-Padding col-md-4'>

														<label class='TextFont col-md-5'>Code Name </label> <input
															id='codeName' type='text' placeholder='Code Name'
															class='form-control input-SmallText col-md-7 form-control tip-focus'
															title='Please enter code name' required maxlength='150' />
													</div>

													<div class="form-group Remove-Padding col-md-4">
														<div class="col-sm-6">
															<label for="input-type">Is Category</label>
															<div id="input-type" class="row">
																<div class="col-sm-6">
																	<label class="radio-inline"> <input
																		name="privilegesType" id="isCategory" value="=Y"
																		type="radio" checked="checked" />Yes
																	</label>
																</div>
																<div class="col-sm-6">
																	<label class="radio-inline"> <input
																		name="privilegesType" id="noCategory" value="N"
																		type="radio" />No
																	</label>
																</div>
															</div>
														</div>
													</div>

													</div>

													<div id="roleTableDiv"
														class='form-group Remove-Padding col-md-12'
														style='padding-right: 8px; margin-top: 13px; display: none;'>
														<div class='divide-20'></div>

														<label class='TextFont col-md-4-1'>Charges<b
															style='color: red; padding-left: 3px;'>*</b></label> <input
															id='charges' type='text' placeholder='Charges'
															class='form-control input-SmallText col-md-7-1 form-control tip-focus'
															title='Please enter charges' required='true'
															style='margin-left: 0%;' maxlength='150' />
													</div>

													<div id="isModify"
														style="padding-right: 8px; margin-top: 10px; display: none;"
														class="form-group Remove-Padding col-md-12-1">
														<div class="divide-20"></div>
														<label class="TextFont col-md-4-1">IsModify<b
															style="color: red; padding-left: 3px;">*</b></label> <label
															class="checkbox input-SmallText col-md-8-1"> <input
															type="radio" id="isCategory" value="Y"
															name="privilegesModify" checked="checked" /> Yes 
														</label> <label
															class="checkbox input-SmallText col-md-offset-4 col-md-8-1">
															<input type="radio" id="noCategory" value="N"
															name="privilegesModify" /> No

														</label>
													</div>
												
												</div>

												<div class="box-body big" id="divRow2">
												</div>
												
												
											</div>
											
											</div> -->
											
											
											<div class="container box border primary" style="margin-top: -30px">
                                                
                                                <div class="box-body big" id="divEhatContent">

                                                </div>
                                                
                                            </div>

											<div class="row" style="margin-top: 10px">
												<div class="col-md-12">
													<!-- BOX -->
													<div class="box border primary" id="div1">
														<div class="box-title">
															<h4>
																<i class="fa fa-table"></i>Masters Data
															</h4>
															
														</div>
														<div class="box-body" id="divEhatList" style="height: 300px;overflow: auto;" >
															<!-- <div class="row"> -->
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> <!-- <input class="form-control input-sm"
																				type="text" aria-controls="datatable1"
																				placeholder="Search"> -->
																			</label>
																		</div>
																	</div>														
																	
																</div>
															<!-- </div> -->
														
															<table id="ehatTable" cellpadding="0" cellspacing="0" border="0"
																class="datatable table table-striped table-bordered table-hover">
																<thead id="ehatTHead">
																	<!-- <tr>
																		<th>Rendering engine</th>
																		<th>Browser</th>
																		<th class="hidden-xs">Platform(s)</th>
																		<th>Engine version</th>
																		<th class="hidden-xs">CSS grade</th>
																	</tr> -->
																</thead>
																<tbody id="ehatTBody">
																
																
															<!-- 	<script>setNewTemp("unitMaster");</script> -->
																
																	<!-- <tr class="gradeX">
																		<td>Trident</td>
																		<td>Internet Explorer 4.0</td>
																		<td class="hidden-xs">Win 95+</td>
																		<td class="center">4</td>
																		<td class="center hidden-xs">X</td>
																	</tr>
																	<tr class="gradeC">
																		<td>Trident</td>
																		<td>Internet Explorer 5.0</td>
																		<td class="hidden-xs">Win 95+</td>
																		<td class="center">5</td>
																		<td class="center hidden-xs">C</td>
																	</tr>
																	<tr class="gradeA">
																		<td>Trident</td>
																		<td>Internet Explorer 5.5</td>
																		<td class="hidden-xs">Win 95+</td>
																		<td class="center">5.5</td>
																		<td class="center hidden-xs">A</td>
																	</tr> -->
																

																</tbody>
																<tfoot id="ehatTFoot">
																	<!-- <tr>
																		<th>Rendering engine</th>
																		<th>Browser</th>
																		<th class="hidden-xs">Platform(s)</th>
																		<th>Engine version</th>
																		<th class="hidden-xs">CSS grade</th>
																	</tr> -->
																</tfoot>
															</table>
														</div>
													</div>
													<!-- /BOX -->
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
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			
			getAllUnitForHospitalInfo();//Added By Annapurna
			setNewTemp("unitMaster"); 
			getUnitCount();//count of total unit
			getDeptCount();//count of total dept
			getServiceCount();//count of total service
			getSubServiceCount();//count of subservice
			getChargesMasterCount();//count of charges
			getSubChargesCount();//count of sub charges			
		});
	</script>
	
<input type="hidden" id="hiddenImport" value="servMaster">	
<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		
<!-- /JAVASCRIPTS -->
	
</body>
</html>