<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Barcode Generation</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/bb_donor_registration_checkuplist.js"></script>

	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
		String todays_date = formatter.format(currentDate.getTime());
		
	%>
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

			<%@include file="bb_left_menu.jsp"%>

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
										<li>
											<i class="fa fa-home"></i>
											<a href="index.html">Home</a>
										</li>
										<li>
										<a href="bb_barcode_generation.jsp">Barcode Generation</a>
										</li>
									</ul>

									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>

						<div class="function-buttons" style="float: right;">
							<div class="buttons">
								<button type="submit" class="btn btn-success"><i class="fa fa-save"></i> Save</button>
								<button type="button" class="btn btn-danger"> Cancel</button>
							</div>
						</div>
			
						
						<div class="row">

							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-body">

			<!-- ============================================================================== -->
			<!-- START:Barcode Generation form -->
			<!-- ============================================================================== -->


							    		<!-- <div class="row"> -->

											<!-- <div class="col-md-12" id="divForEntry"> -->
													
													<div class="panel panel-primary">
														<div class="panel-heading">Barcode Generation</div>
														<div class="panel-body">

											
															
								<!-- <form action="#" method="POST">

									<div class="row" style="padding: 15px 0;">
										<div class="col-md-12">
											<label style="color: #2874A6;font-size: 12px">
												New Barcode Generate
											</label>
										</div>
									</div>

									<div class="row" style="padding: 5px 0;">
										<div class="col-md-3">
											<div class="form-group">
											<label> Quantity</label>
												<input type="text" class="form-control" name="quantity" placeholder="Enter quantity">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group" style="padding: 5px 0 0">
											<label> </label>
												<input type="text" class="form-control" name="code" placeholder="From HWA** to HWA***">
											</div>
										</div>
										<div class="col-md-12">
											<button type="submit" class="btn btn-primary">Generate</button>
										</div>
									</div>

								</form>		 -->


															
								<div action="#" method="POST">

									<div class="row" style="padding: 20px 0 15px;">
										<div class="col-md-12">
											<label style="color: #2874A6;font-size: 12px">
												Barcode Generate From Existing Bag
											</label>
										</div>
									</div>

									<div class="row" style="padding: 5px 0;">
										<div class="col-md-3">
											<div class="form-group">
											<label> Blood Bag Number</label>
											
										<div class="form-group" id="divtext_search_bag_number">
											<input type="text" class="form-control" name="search_donor" id="search_bag_number" placeholder="Search Blood Bag Number" onkeyup="serachBloodBagNumberById(this.value,'barcode')">
										</div>
													<!-- <select class="form-select" name="blood_bag_no" id="blood_bag_no" onclick="getBagDetails()">
														<option value="">BAG001</option>
														<option value="">BAG002</option>
														<option value="">BAG003</option>
													</select> -->
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
											<label> Quantity</label>
												<input type="text" class="form-control" id="quantity" name="quantity" placeholder="Enter quantity">
											</div>
										</div>
										<div class="col-md-12">
											<button type="submit" class="btn btn-primary" onclick="bagDetailsBarcodePrint('barcodeGeneration')">Generate</button>
										</div>
									</div>

								</div>	

														</div> 
													</div>
																
											<!-- </div>																					 -->
							    		<!-- </div>		 -->	    


			<!-- ============================================================================== -->
			<!-- END:Barcode Generation form -->
			<!-- ============================================================================== -->


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
			getSampleDetails('onload');
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
		});

		$(document).ready(function(){
			$('#collection_menu').click(function(){
				$('#outdoor_details').hide();
			})
		})

		$(document).ready(function(){
			$('#collection_menu1').click(function(){
				$('#outdoor_details').show();
			})
		})

		$(document).ready(function(){
			$('#donor_menu_existing').click(function(){
				$('#header_search_donor').show();
				$('#existing_donor').show();
			})
		})

		$(document).ready(function(){
			$('#donor_menu_new').click(function(){
				$('#header_search_donor').hide();
				$('#existing_donor').hide();
				
			})
		})
		
	</script>
	
	<input type="hidden" value="111" id="userID" />
	<input type="hidden" value="0" id="doctorId"  />
	<div id="userDetails" style="display: none;"></div>
	<input type="hidden" value="0" id="usernameValidation" />
	<input id="synchronizeToken" type="hidden" value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
	
	<input type="hidden" value="0" id="userIdForUpdate" />
	<input type="hidden" value="0" id="doctorIdForUpdate" />
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="donorTreatmentId" value="1"/>
	<input type="hidden" id="bagDetailsNo" value="0" />
	<input type="hidden" id="sampledonorId" value="0" />
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>