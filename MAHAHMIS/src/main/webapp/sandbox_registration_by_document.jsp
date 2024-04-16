<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Health Id By Document</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
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
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/sandbox_reg_document.js"></script>
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

			<%@include file="sandbox_left_menu.jsp"%>

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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="sandbox_registration_by_document.jsp">Health Id By Document</a></li>
											
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
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Health Id By Document
															</div>
															<div class="panel-body">
																
																<div class="row">
																	<div class="col-md-6">
																		<div class="col-md-4">
																			<label for="organName">Enter Mobile Number</label> 
																			<input class="form-control tip-focus" title="Please enter mobile number" id="mobileNo" name="headNm" type="text" placeholder="Please enter mobile number">
																			<input type = 'hidden' id = 'idHed' value = '0' />
																		</div>
																	    <button type="button" class="btn btn-primary" onclick="generateOtpByMobile();"	style="margin-top: 15px;">Click</button>
																	
																	</div>
																	
																	<div class="col-md-6">
																		<div class="col-md-4">
																			<label for="organName">Verify Mobile OTP</label> 
																			<input class="form-control tip-focus" title="Please enter mobile otp" id="mobileOtp" name="headNm" type="text" placeholder="Please enter mobile otp">
																		</div>
																	    <button type="button" class="btn btn-xs btn-success" onclick="verifyMobileOtp();"	style="margin-top: 15px;">Verify</button>
																	
																	</div>
																</div>
																<br><br>
																<div class="row">
																   <div class="col-md-12">	
																		  <div class="col-md-3">
																		  <label for="organName">Enter First Name</label> <span class="required text-danger">*</span>
																				<input class="form-control tip-focus" title="Please enter first name" id="firstName" name="headNm" type="text" placeholder="Please enter first name">
																	      </div>
																	      
																	       <div class="col-md-3">
																		  <label for="organName">Enter Last Name</label> 
																				<input class="form-control tip-focus" title="Please enter mobile otp" id="lastName" name="headNm" type="text" placeholder="Please enter last name">
																	      </div>
																	      
																	       <div class="col-md-3">
																		  <label for="organName">Enter District Code</label><span class="required text-danger">*</span> 
																				<input class="form-control tip-focus" title="Please enter District Code" id="districtCode" name="headNm" type="text" placeholder="Please enter District Code">
																	      </div>
																	      
																	       <div class="col-md-3">
																		  <label for="organName">Select Document Type</label> <span class="required text-danger">*</span>
																				<select id="documentType" class="form-control tip-focus">
																				<option value ="DRIVING_LICENCE">DRIVING_LICENCE</option>
																				</select>
																	      </div>
																	      
																	       <div class="col-md-3">
																		  <label for="organName">Enter Document Number</label> <span class="required text-danger">*</span>
																				<input class="form-control tip-focus" title="Please enter Document Number" id="documentNumber" name="headNm" type="text" placeholder="Please enter DocuemntNumber">
																	      </div>
																	      
																	      
																	     
																	      
																	       
															        </div>
															 </div>
															 <br><br>
															 <div class="row">
																   <div class="col-md-12">
																    <div class="col-md-3">
																		  <label for="organName">Gender</label> <span class="required text-danger">*</span>
																				<select id="gender" class="form-control tip-focus">
																				<option value ="M">M</option>
																				<option value ="F">F</option>
																				<option value ="O">O</option>
																				</select>
																	      </div>
																	      
																	      
																	       <div class="col-md-3">
																		  <label for="organName">Enter Mobile Number</label> <span class="required text-danger">*</span>
																				<input class="form-control tip-focus" title="Please enter mobile " id="mobileNumber" name="headNm" type="text" placeholder="Please enter mobile number">
																	      </div>
																	      
																	       <div class="col-md-3">
																		  <label for="organName">Enter State Code</label> <span class="required text-danger">*</span>
																				<input class="form-control tip-focus" title="Please enter state Code" id="stateCode" name="headNm" type="text" placeholder="Please enter state code ">
																	      </div>
																	      
																	       <div class="col-md-3">
																		  <label for="organName">Enter year Of Birth</label> <span class="required text-danger">*</span>
																				<input class="form-control tip-focus" title="Please enter year of birth" id="yearOfBirth" name="headNm" type="text" placeholder="Please enter year of birth">
																	      </div>
																	      
																	      <div class="col-md-3">
																		 <button type="button" class="btn btn-primary" onclick="generateHealtIdByDocument();"	style="margin-top: 15px;">Click</button>
																	      <button type="button" class="btn btn-xs btn-success" onclick="verifyDocument();"	style="margin-top: 15px;">Verify Document</button>
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
		<%@include file="footer_nobel.jsp"%>
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
			getLabOrgans("onload");
		});
	</script>
	<input type="hidden" id=stateId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	 </c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if> 
</body>
</html>