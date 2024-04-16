<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <style>
      .circle {
      border-radius: 50%;
    width: 50px;
    height: 50px;
    padding: 10px;
    background: #fff;
    border: 3px solid #000;
    color: #000;
    text-align: center;
    font: 22px Arial, sans-serif;
      }
    </style>
<meta charset="ISO-8859-1">
<title>BMW Dashboard </title>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- TYPEHEAD -->
<script type="text/javascript"
	src="ehat-design/js/typeahead/typeahead.min.js"></script>

<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />

<!-- CUSTOM SCRIPT -->
<script src="ehat-design/js/script.js"></script>
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- JQUERY files import start -->

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

	
<script>
	jQuery(document).ready(function() {
		App.setPage("Patient_Death"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#hospDetail").addClass("anchorActive");
	}
</script>

<!-- JQUERY files import END -->

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>

<script type="text/javascript" src="js/bmw_dashboard.js"></script>
      
      <%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>
<body>
<c:if test="${ sessionScope.userType != null }">
<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="BMW_left_menu.jsp"%>

			<!-- /SIDEBAR -->
		
			

	<!-- PAGE -->
	
		
		<div id="main-content">
			<!-- SAMPLE BOX CONFIGURATION MODAL FORM-->
			<div class="modal fade" id="box-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
				  <div class="modal-content">
					<div class="modal-header">
					  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					  <h4 class="modal-title">Box Settings</h4>
					</div>
					<div class="modal-body">
					  Here goes box setting content.
					</div>
					<div class="modal-footer">
					  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					  <button type="button" class="btn btn-primary">Save changes</button>
					</div>
				  </div>
				</div>
			  </div>
			<!-- /SAMPLE BOX CONFIGURATION MODAL FORM-->
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
										<li>
											<i class="fa fa-home"></i>
											<a href="Dashboard.jsp">Home</a>
										</li>
										<li>BMW Dashboard</li>
									</ul>

									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>

						<div >
						<h3 style="text-align: center;">BMW Dashboard
						</h3>
							
						</div>
			
						
						<div class="row">
							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-body">

								<div class="header-record-search">
									
							<div class="clearfix"></div>
								</div>		
								 <h3 >BMW Requisition Status</h3>
						<div class="" >
							<div class="panel-body primary" style="height: 439px;width: 1686px;" >
							 <!-- ============================ circle Shape row  ====================== -->
							
							 <div class="row">	
								 <div class="col-md-3">
										<div class="circle" id="openCount" style="background:#fd6811">0</div>
										<br>										
										<h6>
<!-- 										<span class="badge badge-secondary" style="color: #7a7676;background-color: #e7abab;"onclick="openRequisitionJsp()">Raised</span>
 -->											
										<button type="button" class="badge badge-secondary" style="color: #7a7676;background-color: #e7abab;" onclick="openRequisitionJsp()">Raised</button>	
										</h6>
								</div>	
								<div class="col-md-3">
										<div class="circle" id="approveCount" style="background:#28a119">4</div>	
										<br>
										
										<h6><button type="button" class="badge badge-secondary" style="color: #7a7676;background-color: #e7abab;" onclick="openBmwApproveJsp()">Approved</button></h6>
								</div>	
								<div class="col-md-3">
										<div class="circle" id="assignCount" style="background:#2ce5cb">0</div>
										<br>	
										
										<h6><button type="button" class="badge badge-secondary" style="color: #7a7676;background-color: #e7abab;" onclick="openBmwAssignedJsp()">Assigned</button></h6>
								</div>	
								<div class="col-md-3">
										<div class="circle" id="completeCount" style="background:#4763efeb">3</div>
										<br>
									
										<h6><button type="button" class="badge badge-secondary" style="color: #7a7676;background-color: #e7abab;" onclick="openBmwCompleteJsp()">Complete</button></h6>	
								</div>	
						
							</div>	
							 
							 <!-- ============================ End:circle Shape row  ====================== -->
							  <!-- ============================ Square box red row ====================== -->
							 <div class="row">	
								 <div class="col-md-3">
								 	<div class="Small-box-red" >
									<h1 class="circle" id="redOpenCount" style="background:#E74C3C">0</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-red" >
									<h1 class="circle" id="redApproveCount" style="background:#E74C3C">2</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-red" >
									<h1 class="circle" id="redAssignCount" style="background:#E74C3C">2</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-red" >
									<h1 class="circle" id="redCompleteCount" style="background:#E74C3C">2</h1></div>
								 </div>
							 </div>
							   <!-- ============================ End :Square box red  ====================== -->
							    <!-- ============================ Square box yellow  ====================== -->
							 <div class="row">	
								 <div class="col-md-3">
								 	<div class="Small-box-yellow" >
									<h1 class="circle" id="yellowOpenCount"  style="background:#F1C40F">0</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-yellow" >
									<h1 class="circle" id="yellowApproveCount" style="background:#F1C40F">0</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-yellow" >
									<h1 class="circle" id="yellowAssignCount" style="background:#F1C40F">0</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-yellow" >
									<h1 class="circle" id="yellowCompleteCount" style="background:#F1C40F">0</h1></div>
								 </div>
							 </div>
							  <!-- ============================End: Square box yellow  ====================== -->
							   <!-- ============================ Square box green  ====================== -->
							  <div class="row">	
								 <div class="col-md-3">
								 	<div class="Small-box-green" >
									<h1 class="circle" id="greenOpenCount" style="background:#28a119">0</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-green" >
									<h1 class="circle" id="greenApproveCount" style="background:#28a119">1</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-green" >
									<h1 class="circle" id="greenAssignCount" style="background:#28a119">0</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-green" >
									<h1 class="circle" id="greenCompleteCount" style="background:#28a119">1</h1></div>
								 </div>
							 </div>
							  <!-- ============================End: Square box green  ====================== -->
							   <!-- ============================ Square box black  ====================== -->
							   <div class="row">	
								 <div class="col-md-3">
								 	<div class="Small-box-black" >
									<h1 class="circle" id="blackOpenCount" style="background:#2C3E50">0</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-black" >
									<h1 class="circle" id="blackApproveCount" style="background:#2C3E50" >1</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-black" >
									<h1 class="circle" id="blackAssignCount" style="background:#2C3E50">1</h1></div>
								 </div>
								 <div class="col-md-3">
								 	<div class="Small-box-black" >
									<h1 class="circle" id="blackCompleteCount" style="background:#2C3E50">0</h1></div>
								 </div>
							 </div>
							  <!-- ============================End: Square box black  ====================== -->
							</div>
						</div>

									</div>
								</div>

							</div>
						</div>
						
						<div class="footer-tools">
							<span class="go-top">
								<i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div><!-- /CONTENT-->
				</div>
			</div>
		</div>
		</div>
	</section>
	<!--/PAGE -->
	<!-- JAVASCRIPTS -->
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
	<!-- Auto-Suggestion 8/1/2015-->
	<script type="text/javascript" src="auto/jquery.mockjax.js"></script>
	<script type="text/javascript" src="auto/bootstrap-typeahead.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- bootstrap datepicker -->
	<script type="text/javascript" src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
	<!-- bootstrap datepicker new added  js-->
	<script type="text/javascript" src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"></script>
	<script type="text/javascript" src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("index");  //Set current page
			App.init(); //Initialise plugins and elements
			
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			
			
			
			
		});
	</script>
	
	<script type="text/javascript">
	onload = function() {

		getBmwRequisitionCount();
		getBmwBagWiseCount();
		
		 
	}
</script>
	<!-- /JAVASCRIPTS -->

</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>