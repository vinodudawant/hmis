<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Sample Dispatch</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/bb_donor_registration_checkuplist.js"></script>
<script type="text/javascript" src="js/bb_blood_collection.js"></script>
<script type="text/javascript" src="js/patient_management.js"></script>
<script type="text/javascript">
	onload = function() {
		defaultFetchPatientTitle("checkuplist");
		getBloodDonorTreatmentDetailsById($("#donorId1").val(),$("#callform").val());
		getAllSampleDispatchList();
	}
	</script>
	


	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
		String todays_date = formatter.format(currentDate.getTime());
		
		java.text.SimpleDateFormat formatter2 = new java.text.SimpleDateFormat(
				"dd/MM/yyyy");
		String todays_date2 = formatter2.format(currentDate.getTime());
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
										<a href="bb_sample_dispatch.jsp">Sample Dispatch</a>
										</li>
										 <button class="btn btn-xs btn-info pull-right" style="float: right;" type="button" id="expandDonor" onclick="toggleSampleDispatch()">
										<i class="fa fa-plus"></i> Expand
									</button>
                          
									</ul>

									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>

						
						
						<div class="row">
						<div class="row">

							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-body">
										 <div class="col-md-12" id="divSampleDispatch" style="display: none"> 
									
									 <div class="function-buttons" style="float: right;">
							<div class="buttons">
								<button type="submit" class="btn btn-success" onclick="saveSampleDispatch()"><i class="fa fa-save" ></i> Save</button>
								<button type="button" class="btn btn-danger"> Cancel</button>
							</div>
						</div>
									
       
								<div class="header-bag-search">
									<div class="col-md-4 header-search-bag-no" id="header_search_donor">
										<div class="form-group">
										<div class="form-group" id="divtext_search_sample_dispatch">
											<input type="text" class="form-control" name="search_donor" id="search_blood_number" placeholder="Search Blood Bag Number" onkeyup="serachBloodBagDetailsById(this.value,'sample')">
										</div>
										</div>
									</div>

									<div class="clearfix"></div>
								</div>		
                      
                     			
			<!-- ============================================================================== -->
			<!-- START:Sample dispatch form -->
			<!-- ============================================================================== -->


							    		<!-- <div class="row"> -->

										
													<!-- <div id="divSampleDispatch" > -->
													<div class="panel panel-primary">
														<div class="panel-heading">Sample dispatch</div>
														<div class="panel-body">

											
															
								
									<div class="row">
										<div class="col-md-2">
											<label>
												<span class="required-field">*</span> Donor Name
											</label>
										</div>
										<div class="col-md-1">
											<div class="form-group">												
												<select class="form-select" name="user_title" id="title">
												 <!--  <option value="Mr">Mr</option>
												 	<option value="Mrs">Mrs</option> -->
												</select>
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="first_name" id="sample_first_name" class="form-control" placeholder="First name">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="middle_name" id="sample_middle_name" class="form-control" placeholder="Middle name">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">	
											<input type="text" name="last_name" id="sample_last_name" class="form-control" placeholder="Last name">
											</div>
										</div>
									</div>

									<div class="row" style="padding: 10px 0 5px;">
										<div class="col-md-2">
											<label style="color: #2874A6;font-size: 12px">
												Sample send for testing
											</label>
										</div>
									</div>

									<div class="row" style="padding: 5px 0;">
										<div class="col-md-2">
											<label>
												Red Cell Serology
											</label>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<label><input type="radio" id="red_cell_serology" name="red_cell_serology" value="1"> Send</label>
											</div>											
										</div>
									</div>

									<div class="row" style="padding: 5px 0;">
										<div class="col-md-2">
											<label>
												Transfusion Transmitted Disease Lab
											</label>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<label><input type="radio" id="transfusion_transmitted_disease_lab" name="transfusion_transmitted_disease_lab" value="2"> Send</label>
											</div>											
										</div>
									</div>

									<div class="row" style="padding: 10px 0 5px;">
										<div class="col-md-2">
											<label style="color: #2874A6;font-size: 12px">
												Sample send for Seperation
											</label>
										</div>
									</div>

									<div class="row" style="padding: 5px 0;">
										<div class="col-md-2">
											<label>
												Component Seperation
											</label>
										</div>
										<div class="col-md-2">
											<div class="form-group">
												<label><input type="radio" id="component_seperation" name="component_seperation" value="3"> Send</label>
											</div>											
										</div>
									</div>

									<!-- <div class="row">
										<div class="col-md-2">
											<label>
												Remarks
											</label>
										</div>
										<div class="col-md-5">
											<div class="form-group">
												<textarea name="remarks" id="sample_dispatch_remarks" class="form-control" rows="5" placeholder="Remarks"></textarea>
											</div>											
										</div>
									</div> -->

													
														</div> 
													</div>
																
											<!-- </div>																					 -->
							    		<!-- </div>		 -->	    


			<!-- ============================================================================== -->
			<!-- END:Sample dispatch form -->
			<!-- ============================================================================== -->


									</div>
								</div>

							</div>
						</div>
						</div>
						
						<!-- Added By Annapurna  -->
						
						
						
					               	<div class="panel panel-default">
										<div class="panel-body">

											 <div class="header-record-search">
											
																
															<div class="col-sm-1">
														<label for="inlineFold" class="control-label">From</label>
													</div>
												
													<div class="col-sm-2">
														<input id="fromDate" class="form-control input-SmallText pull-right"
															type="text"
															onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
															readonly="readonly" name="date" placeholder="Date"
															value="<%=todays_date2%>" style="margin-left: -162px;">
													</div>
													
												
												
												<div class="col-sm-1">
														<label for="inlineFold" class="control-label">To</label>
													</div>
												
												
													<div class="col-sm-2">
														<input id="lastDate" class="form-control input-SmallText pull-right"
															type="text"
															onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
															readonly="readonly" name="date" placeholder="Date"
															value="<%=todays_date2%>" style="margin-left: -162px;">
													</div>
													
													
													<div class="col-sm-1">
														<input type="button" onclick="getAllSampleDispatchList()"	class="btn btn-primary" value="Show">
													</div>
																
																
															</div>
														</div>
												

												<div class="clearfix"></div>
											</div>
                                      <!------------ End view Document Modal-----------------  -->
						
						
						                 <!------------ Start view Document Modal-----------------  -->
													<div class="modal fade bs-example-modal-lg" style="margin-top: 20px"
														id="viewDocModal" tabindex="-1" role="dialog"
														aria-labelledby="myLargeModalLabel" aria-hidden="true">
														<div class="modal-dialog modal-dialog modal-lg">
															<div class="modal-content">
																<div class="modal-header">
																	<button type="button" class="close"
																		data-dismiss="modal" aria-label="Close">
																		<span aria-hidden="true">&times;</span>
																	</button>
																	<div class="row">
																		<div class="col-md-4 col-xs-11">
																			<h3 class="modal-title" id="myModalLabel">View
																				document</h3>
																		</div>
																		<br>
																		<br>
																		<div class="col-md-6 col-xs-11">
																			<h5></h5>
																			<h6 id="documentComment"></h6>
																		</div>
																	</div>
																</div>
																<div class="modal-body">
																	<iframe id="ViewDocumemnt" width="80%" height="330px"></iframe>
																</div>
															</div>
														</div>
													</div>
												
												<!------------ End view Document Modal ------------------ -->
											
											
										 	<div class="panel panel-primary" > 
												<div class="panel-heading" id="divEhatContent">Sample
													Dispatch List</div>
												<div class="panel-body"
													style="overflow: auto; height: 300px">
													<div class="collected-consent-data">
														<div class="block-heading"></div>
													</div>
													<div class="collected-data-table">
														<table class="table table-bordered table-striped">
															<thead id="ehatTHead">
																<tr>
																	<th class="col-md-1 center">Sr. No.</th>
																	<th class="col-md-1 center">Dispatch Id</th>
																	<th class="col-md-1 center">Donor Id</th>
																	<th class="col-md-1 center">Patient Name</th>
																	<th class="col-md-1 center">Bag No</th>
																	<th class="col-md-1 center">Sample Name </th>
																	<!-- <th class="col-md-1 center">Status </th> -->
																																		

																</tr>
															</thead>

															<tbody id="dispatchhlist">
															</tbody>
														</table>


													</div>
												</div>
											</div>


											<div class="clearfix"></div>
										</div>
									</div>

								</div>
							</div>
						<!-- </div> -->
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
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#title").focus();// Added By Annapurna
			$("#title").select2();// Added By Annapurna
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
				clearSampleDispatch();
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
	<input type="hidden" id="bloodSampleDispatchId" value="0" />
	<input type="hidden" id="sampledonorId" value="0" />
	<input type="hidden" id="sampleBloodBagNumber" value="0" />
	<input type="hidden" id="sampleBloodBagId" value="0" />
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>