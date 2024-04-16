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
<script>
    window.onload = function() {

    	$('#authType1').select2();
    	
    }
</script>

<!-- SELECT2 -->
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js">

	$(document).ready(function() {
		$('#authType1').select2();
		
	});
	</script>
		
	
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
					<div class="row" id="phrAddressHIPQR">
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
											<li><a href="sandbox_notify_linking.jsp">By Scanning HIP QR </a></li>
											
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
															<div class="panel-heading" id="divEhatContent">By Scanning HIP QR
															</div>
															<div class="panel-body">
																
																<div class="row">
																	<div class="col-md-12 text-center">
																				<div class="form-group">
																				
																			<select name="list" id="authType1"  onchange="changeFunc();"
																								>
																				 
																				  <option value="DEMOGRAPHICS">DEMOGRAPHICS</option>
																				  <option value="MOBILE_OTP">MOBILE_OTP</option>
																				 
																				</select>
																				
																				</div>
																			</div>
						
																			<div class="col-md-6">

																					<div class="form-group">
																						<label style="margin-right: 14px;"
																							class="control-label ">HealthId<span
																							class="required text-danger">*</span></label>

																						<div class="input-group " style="width: 90%;">

																							<input type="text" class="form-control" id="sbx" 
																							value="">

																							<div class="input-group-addon">
																								@sbx
																							</div>
																						</div>
																					</div>
																					
																					<div class="form-group">
																						<label class="control-label ">Purpose</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								name="mlcEmail" id="purpose" value="LINK" placeholder="purpose" disabled/>
																						</div>
																					</div>
																				</div>
																				<div class="col-md-6">
																					<img src="images/Hospital/demo.png" style="height: 175px;width: 250px;float: right;">
																					
																				</div>
																				<button type="button"  onClick="refreshPage()"
																				>Refresh</button>
																				
																				<!-- <img src="/images/HIPQR.png" alt="Workplace"> -->
																				
														<!-- <div class="col-md-6">		-----------Loading Images--------
														<div style="display: none; overflow: hidden; margin-top:10%" id="ajaxloaderimg" class="center">
															<img src="/EhatEnterprise/images/HIPQR.png" alt="Workplace">
														</div>
														</div> -->
												<!-- -----------Loading Images-------- -->				
																<div class="col-md-6">
																				
																	</div>
																	
															<div class="col-md-12 text center">
																			
																				<div class="form-group">
																				
																			<div class="" style="width: 90%;">
																				<div style="margin-top: 50px;" class="col-sm-3-1" id="col10">		
																					<div style="margin-top: 50px;" class="col-sm-3-1" id="col10"><div class="btn-group">
																					<button id="notifyViaSMS" onclick="authInit();" class="btn btn-xs btn-success">Save</button>
																				</div>
																				</div>
																				</div>	
																				</div>
																				
																				</div>
																				
																				
																	</div>		
														<div  id="demographic">
																	<div class="col-md-6" >
																				<div class="form-group">
																					<label class="control-label ">Full Name</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="fullName"
																							placeholder="Patient Name" />

																					</div>
																				</div>
															           </div>
															           
															           <div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">DOB</label>
																					<div class="" style="width: 90%;">
																					<input type="text" class="form-control input-SmallText" placeholder="dd/mm/yyyy"  name="date" id="dateOfBirth">
																						
																					</div>
																				</div>
																			</div>
															           
															           <div class="col-md-3" >
																				<div class="form-group">
																					<label for="organName">Gender</label> <span class="required text-danger">*</span>
																				<select id="gender" class="form-control tip-focus">
																				<option value ="M">M</option>
																				<option value ="F">F</option>
																				<option value ="O">O</option>
																				</select>
																				</div>
															           </div>
																	
																	
														  </div>
														  
														  <div  id="mobileOTP">
																	<div class="col-md-12" >
																				<div class="form-group">
																					<label class="control-label ">Verify OTP</label>
																					<div class="" style="width: 43%;">
																						<input type="text" class="form-control"
																							name="visa" id="verifyMobileOTP"
																							placeholder="Verify Mobile OTP" />

																					</div>
																				</div>
															           </div>
														  </div>
																
																	<div class="col-md-12 text center">
																			
																				<div class="form-group">
																				
																			<div class="" style="width: 90%;">
																				<div style="margin-top: 50px;" class="col-sm-3-1" id="col10">		
																					<div style="margin-top: 50px;" class="col-sm-3-1" id="col10"><div class="btn-group">
																					<button id="notifyViaSMS" onclick="authConfirm();" class="btn btn-xs btn-success">Confirm</button>
																												</div></div></div>	
																				</div>
																				
																				</div>
																	</div>
																</div>
																
																
																<br><br>
																
															 <br><br>
															
															  <div class="row">
																		     <div class="col-md-6">
																		  <div class="form-group">
																					<label class="control-label ">Add Care Context</label>
																					<div class="" style="width: 43%;">
																						<input type="text" class="form-control"
																							name="visa" id="careContext"
																							placeholder="Add Care Context" />

																					</div>
																				</div>
																		  </div>
																		  
																		  <div class="col-md-6">
																		  <div class="form-group">
																					
																					<div class="" style="width: 43%;">
																						<button id="notifyViaSMS" onclick="addCareContextByMobileOTP1();" class="btn btn-xs btn-success">Add Care Context</button>

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
			//getLabOrgans("onload");
		});
	</script>
	<input type="hidden" id=stateId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="sbx" value="<%=session.getAttribute("healthId")%>">
		<!-- /JAVASCRIPTS -->
	 </c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if> 
</body>
</html>