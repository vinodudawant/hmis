<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Blood Request Sample Acknowledge</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/blood_bank.js"></script>
<script type="text/javascript" src="js/blood_issue.js"></script>

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
										<a href="bb_booldrequest_sample_acknowledge.jsp">Blood Request Sample Acknowledge</a>
										</li>
									</ul>

									<!-- /BREADCRUMBS -->
									<div class="clearfix"></div>
								</div>
							</div>
						</div>

						<div class="function-buttons" style="float: right;">
							<div class="buttons">
								<button type="submit" class="btn btn-success" onclick="savePatientSampleAcknowledge('2')"><i class="fa fa-save"></i> Accept</button>
								<button type="submit" class="btn btn-warning" onclick="savePatientSampleAcknowledge('3')"><i class="fa fa-ban"></i> Reject</button>
								<!-- <button type="button" class="btn btn-danger"> Cancel</button> -->
							</div>
						</div>
			
						
						<div class="row">

							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="panel panel-default">
									<div class="panel-body">

			<!-- ============================================================================== -->
			<!-- START:Filter menu form -->
			<!-- ============================================================================== -->


							    		<!-- <div class="row"> -->

											<!-- <div class="col-md-12" id="divForEntry"> -->
													
													<div class="panel panel-primary">
														<div class="panel-heading">Sample Acknowledge</div>
														<div class="panel-body">

											
															
								<form action="#" method="POST">

									<div class="filter-menu">
										<div class="row">
											<div class="col-md-1">
												<label style="padding: 4px 0 0">From date</label>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<input type="text" class="form-control" id="form_date" name="from_date" value="<%=todays_date%>"
													onclick="displayCalendar(document.getElementById('form_date'),'dd-mm-yyyy',this)" readonly="readonly" >
												</div>
											</div>

											<div class="col-md-1">
												<label style="padding: 4px 0 0">To date</label>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<input type="text" class="form-control" id="to_date" name="to_date" value="<%=todays_date%>" 
													onclick="displayCalendar(document.getElementById('to_date'),'dd-mm-yyyy',this)" readonly="readonly">
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-md-1">
												<label style="padding: 5px 0 0">Status</label>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<select class="form-select" name="status" id="status">
														<option value="1" onclick="getSampleAckDetails('pending')">Pending</option>
														<option value="2" onclick="getSampleAckDetails('accept')">Accept</option> 
														<option value="3" onclick="getSampleAckDetails('reject')">Reject</option> 
													</select>
												</div>
											</div>

											<div class="col-md-1">
												<label style="padding: 5px 0 0">Request Number</label>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<!-- <input type="text" class="form-control" id="request_number" name="request_number"> -->
													<select class="form-select"  id="request_number" name="request_number" style="width: 300px">
														<option value="0">Select</option>
													</select>
												</div>
											</div>
										</div>

										<div class="button-submit">
											<div class="row">
												<div class="col-md-3">
													<button type="button"class="btn btn-primary" onclick="getDetails();">
														Show
													</button>
												</div>
											</div>
										</div>
									</div>

								</form>				
			<!-- ============================================================================== -->
			<!-- END:Filter menu form -->
			<!-- ============================================================================== -->		


			<div class="table-responsive data-for-data-table">
				<table id="example" class="table table-striped table-bordered" style="width:100%">
			        <thead>
			            <tr>
			                <th>Priority</th>
			                <th>Patient Name</th>
			                <th>Request Number</th>
			                <th>Ward Name</th>
			                <th>Date and Time</th>
			                <th style="width: 5%">Received</th>
			                <th>Remark</th>
			            </tr>
			        </thead>
			        <tbody id="patientSampleDetails">
			            <%-- <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr>

			            <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr> --%>

			            <%-- <tr>
			            	<td>Urgent</td>
			            	<td>Sagar Shinde</td>
			            	<td>REQ00001</td>
			            	<td>48</td>
			            	<td>14/05/2021 04:50 PM</td>
			            	<td>
			            		<center>
			            			<input type="checkbox" name="check">
			            		</center>
			            	</td>
			            	<td>
			            		No Remarks
			            	</td>
			            </tr> --%>
			        </tbody>
			    </table>
			</div>
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
			getDetails('onload');
			$("#request_number").select2();
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
	<input type="hidden" id="patientSampleDispatchId" value="0" />
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>