<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>EhatEnterprise |import Masters </title>
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
	
		
	
	<script type="text/javascript" src="js/ehatImportMaster.js"></script>
	<!-- <script type="text/javascript" src="js/dept.js"></script>
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script type="text/javascript" src="js/serviceMaster.js"></script>
	<script type="text/javascript" src="js/subService.js"></script>
	
	<script type="text/javascript" src="js/chargesMaster.js"></script>
	<script src="js/chargesMasterSlave.js"></script> -->
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
										<li>Masters</li>
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
											
								               <li class="ehatListimport" id="hall" onclick="setNewTempimport(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Hall Import</span><span class="badge badge-blue font-11" id="hallCount"> </span>
														</a></li>		
															
												<li class="ehatListimport" id="sponsor" onclick="setNewTempimport(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Sponsor Import</span><span class="badge badge-blue font-11" id="sponsorCount"> </span>
														</a></li>
														
												
														
												<li class="ehatListimport" id="subChrgsMasters" onclick="setNewTempimport(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Sub-Charges Import</span><span class="badge badge-blue font-11" id="subChrgCount"> </span>
														</a></li>
											
												
											
												<li class="ehatListimport" id="subServMasters" onclick="setNewTempimport(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Sub-Service Import</span>
														<span class="badge badge-blue font-11" id="subCount"> </span>
														</a></li>
											
												<li class="active ehatListimport" id="servMasters" onclick="setNewTempimport(this.id);" ><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Service Import</span>
														<span class="badge badge-blue font-11" id="servCount"> </span>														
														</a></li>
												
												<!-- <li class="ehatListimport" id ="deptMaster" onclick="setNewTemp(this.id);"><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Department Master</span>
														<span class="badge badge-blue font-11" id="deptCount"> 0</span>		
														</a></li>
																
												<li id ="unitMaster" onclick="setNewTemp(this.id);" class="active ehatListimport "><a ><i
														class="fa fa-bookmark"></i> <span
														class="hidden-inline-mobile">Unit Master</span>
														<span class="badge badge-blue font-11" id="unitCount"> 0</span>		
														</a></li>			 -->							

											</ul>

											
											
											
											<!-- <div class="container box border green" style="margin-top: -30px"> -->
                                                
                                                <div class="box-body big" id="divEhatContentimport">

                                                </div>
                                                
                                            <!-- </div> -->

											

										</div>
									</div>
								</div>
							</div>
							<!-- /NEW ORDERS -->

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
			setNewTempimport("servMasters"); 
			 //setNewTemp("servMasters"); 
			// importMasterExcel();
				
		});
		
		/* onload = function() {		
			setNewTempimport("servMasters"); 
		} */
	</script>
	
	<input type="hidden" id="hiddenImport" value="servMasters">	
<!-- /JAVASCRIPTS -->
	
</body>
</html>