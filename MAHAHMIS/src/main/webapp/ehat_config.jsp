<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<!-- <head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Masters Configuration | EhatEnterprise</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<script type="text/javascript" src="js/config.js"></script>

<script type="text/javascript">
	onload = function() {
		getAllUnit("onload");
		getAllUnit("unitSelectList");
		getViewDepts("onload");
		getViewDepts("deptSelectList");
		getAllServices("onload");
		getAllServices("servListSelect");
	}
</script>


</head> -->


<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Masters | EhatEnterprise</title>
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
	<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>
	
	<script type="text/javascript" src="js/ehatMaster.js"></script>
	<script type="text/javascript" src="js/dept.js"></script>
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script type="text/javascript" src="js/serviceMaster.js"></script>
	<script type="text/javascript" src="js/config.js"></script>
	
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
										<li>Masters Configuration</li>
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">
								<!-- BOX -->
								<div class="box">
									<div class="box-title">
										<h4><i class="fa fa-bars"></i>Masters Configuration</h4>
										<div class="tools">
											<a href="#" class="btn btn-info btn-xs" onclick="saveMasterConfig()">Save Now</a> 
										
											<a href="#box-config" data-toggle="modal" class="config">
												<i class="fa fa-cog"></i>
											</a>
											<a href="javascript:;" class="reload" onclick=refreshPage()>
												<i class="fa fa-refresh"></i>
											</a>
											<a href="javascript:;" class="collapse">
												<i class="fa fa-chevron-up"></i>
											</a>
											<a href="javascript:;" class="remove">
												<i class="fa fa-times"></i>
											</a>
										</div>
									</div>
									<div class="box-body">
										<ul class="pricing_table row">
											<li class="price_block col-md-4 col-xs-11">
												<h3>Units</h3>
												<div class="price green" id="refresh">
													<div class="price_figure" style="padding: 8px">
														<form class="form-horizontal " action="#">
															  <div class="form-group">
																 <label class="col-md-5 control-label" for="e1">Select Unit</label> 
																 	<div class="col-md-7">
																 	
																		<select id="e1"  class="col-md-12" onchange="unitListSelect()" >
																																																						   
																		</select>										
																											
																 	</div>
															 	</div>	
															 	
															 	<div class="form-group">
																 	<label class="col-md-6 control-label">Remove Unit</label> 
																 
																 	<div class="col-md-3">																 	
																		<input type="checkbox" id="selectall" onclick="selectAllCheckBox()">
																		   																					
																 	</div>
																 	
																 	<div class="col-md-3" style="float:right;padding-top:-2px;padding-right:24px">																 	
																		<button id="delete" class="btn btn" onclick="deleteAllSelected('untLiChk')"><i class="fa fa-trash-o" aria-hidden="true" ></i></button>
																		   																					
																 	</div>
															 	</div>
															 															  
														   </form>	
													</div>
												</div>
												<ul class="features" id="units">
													
												</ul>
												<div class="footer"> 
<!-- 													<a href="#" class="btn btn-info">Save Now</a>
 -->												</div>
											</li> 
											<li class="price_block col-md-4 col-xs-11">
												<h3>Departments</h3>
												<div class="price green">
													<div class="price_figure" style="padding: 8px">
														<form class="form-horizontal " action="#">
															  <div class="form-group">
																 <label class="col-md-5 control-label" for="e2">Select Dept</label> 
																 	<div class="col-md-7">
																		<select id="e2" class="col-md-12"onchange="deptListSelect()">
																		   
																		   
																		   
																		</select>												
																 	</div>
															 	</div>	
															 	<div class="form-group">
																 	<label class="col-md-6 control-label">Remove Depts</label> 
																 
																 	<div class="col-md-3">																 	
																		<input type="checkbox" id="selectallDept" onclick="selectAllCheckBoxdept()">
																		   																					
																 	</div>
																 	
																 	<div class="col-md-3" style="float:right;padding-top:-2px;padding-right:24px">																 	
																		<button id="deleteDept" class="btn btn" onclick="deleteAllSelected('depLiChk');"><i class="fa fa-trash-o"></i></button>
																		   																					
																 	</div>
															 	</div>
															 															  
														   </form>	
													</div>
												</div>
												<ul class="features"id="depts">
													
																							
												</ul>
												<div class="footer">
<!-- 													<a href="#" class="btn btn-info">Save Now</a>
 -->												</div>
											</li> 
											<li class="price_block col-md-4 col-xs-11">
												<h3>Services</h3>
												<div class="price green">
													<div class="price_figure" style="padding: 8px">
														<form class="form-horizontal " action="#">
															  <div class="form-group">
																 <label class="col-md-5 control-label" for="e4">Select Service</label> 
																 
																 	<div class="col-md-7">																 	
																		<select id="e4" class="col-md-12"onchange="servListSelect()">
																		    
																		   
																		</select>												
																 	</div>
															 	</div>	
															 	 	<div class="form-group">
																 	<label class="col-md-6 control-label">Remove Service</label> 
																 
																 	<div class="col-md-3">																 	
																		<input type="checkbox" id="selectallService" onclick="selectAllCheckBoxService()">
																		   																					
																 	</div>
																 	
																 	<div class="col-md-3" style="float:right;padding-top:-2px;padding-right:24px">																 	
																		<button id="deleteService"  class="btn btn" onclick="deleteAllSelected('serLiChk')"><i class="fa fa-trash-o"  ></i></button>
																		   																					
																 	</div>
															 	</div>
															 	
															 															  
														   </form>	
													</div>
												</div>
												<ul class="features"id="services">
													
																										
												</ul>
												<div class="footer">
<!-- 													<a href="#" class="btn btn-info">Save Now</a>
 -->												</div>
											</li>											
										</ul>
										
										
										<ul class="skeleton pricing_table" style="margin-top: 100px; overflow: hidden;">
											<li class="label" style="margin: 0 none;">ul.pricing_table</li>
											<li class="price_block">
												<span class="label">li.price_block</span>
												<h3><span class="label">h3</span></h3>
												<div class="price">
													<span class="label">div.price</span>
													<div class="price_figure">
														<span class="label">div.price_figure</span>
														<span class="price_number">
															<span class="label">span.price_number</span>
														</span>
														<span class="price_tenure">
															<span class="label">span.price_tenure</span>
														</span>
													</div>
												</div>
												<ul class="features">
													<li class="label">ul.features</li>
													<br /><br /><br />
												</ul>
												<div class="footer">
													<span class="label">div.footer</span>
												</div>
											</li>
											
											
											<li class="price_block" style="opacity: 0.5;">
												<span class="label">li.price_block</span>
												<h3><span class="label">h3</span></h3>
												<div class="price">
													<span class="label">div.price</span>
													<div class="price_figure">
														<span class="label">div.price_figure</span>
														<span class="price_number">
															<span class="label">span.price_number</span>
														</span>
														<span class="price_tenure">
															<span class="label">span.price_tenure</span>
														</span>
													</div>
												</div>
												<ul class="features">
													<li class="label">ul.features</li>
													<br /><br /><br />
												</ul>
												<div class="footer">
													<span class="label">div.footer</span>
												</div>
											</li>
											<li class="price_block" style="opacity: 0.25;">
												<span class="label">li.price_block</span>
												<h3><span class="label">h3</span></h3>
												<div class="price">
													<span class="label">div.price</span>
													<div class="price_figure">
														<span class="label">div.price_figure</span>
														<span class="price_number">
															<span class="label">span.price_number</span>
														</span>
														<span class="price_tenure">
															<span class="label">span.price_tenure</span>
														</span>
													</div>
												</div>
												<ul class="features">
													<li class="label">ul.features</li>
													<br /><br /><br />
												</ul>
												<div class="footer">
													<span class="label">div.footer</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<!-- /BOX -->
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
														<div class="box-body" id="divEhatList">
															<table id="ehatTable1" cellpadding="0" cellspacing="0" border="0"
																class="datatable table table-striped table-bordered table-hover">
																<thead id="ehatTHead1">
																	<!-- <tr>
																		<th>Rendering engine</th>
																		<th>Browser</th>
																		<th class="hidden-xs">Platform(s)</th>
																		<th>Engine version</th>
																		<th class="hidden-xs">CSS grade</th>
																	</tr> -->
																</thead>
																<tbody id="ehatTBody">
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
						
						
						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
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
			
			//getAllUnit("onload");
			//getAllUnit("unitSelectList");
			getAllUnitListMaster();
			getViewDepts("onload");
			getViewDepts("deptSelectList");
			getAllServices("onload");
			getAllServices("servListSelect");
			getConfigTemp();//to get master config template

		});
	</script>
		
	<!-- /JAVASCRIPTS -->
	<input type="hidden" id="liListCount" value="0">
	<input type="hidden" id="liListCountDept" value="0">
	<input type="hidden" id="liListCountService" value="0">
	<input type="hidden" id=setcount value="0">	
</body>
</html>