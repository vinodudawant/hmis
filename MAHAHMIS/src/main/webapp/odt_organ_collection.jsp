<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Organ Collection</title>
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
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />


<!-- JQUERY files import END -->

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>

<script type="text/javascript" src="js/organ_collection.js"></script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
String todays_date = formatter.format(currentDate.getTime());

java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat("mm-dd-yyyy");
String todays_date1 = formatter1.format(currentDate.getTime());

java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat("hh:mm");
String todays_time = formatterrr.format(currentDate.getTime());

java.text.SimpleDateFormat formatter2 = new java.text.SimpleDateFormat(
		"dd/MM/yyyy");
String todays_date2 = formatter2.format(currentDate.getTime());
%>


</head>
<body>
	
		<!-- prime loader starts here -->
			<div class="col-md-12 container-fluid" id="primeLoader" style="display:none;z-index:9999;height:100vh;background-color:rgba(13,13,13,0.3);position:absolute;">
		          <div  class="col-md-offset-5 col-md-1" style="overflow: hidden;border-radius:25%;top:30%;background-color:#eee;padding:0;">
		
		              <img src="images/ajax_loader_blue_48.gif" style="top:0;left:0" height="100" width="125" />          
		          </div>
			</div>
		<!-- prime loader ends here -->
	
	<c:if test="${ sessionScope.userType != null }">
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="odt_left_menu.jsp"%>

			<!-- /SIDEBAR -->



			<!-- PAGE -->


			<div id="main-content">
				<!-- SAMPLE BOX CONFIGURATION MODAL FORM-->
				<div class="modal fade" id="box-config" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title">Box Settings</h4>
							</div>
							<div class="modal-body">Here goes box setting content.</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary">Save
									changes</button>
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="odt_organ_collection.jsp">Organ Collection</a></li>
										</ul>

										<!-- /BREADCRUMBS -->
										<div class="clearfix"></div>
									</div>
								</div>
							</div>

							<!-- <div class="function-buttons" style="float: right;">
							<div class="buttons">
								<button type="submit" class="btn btn-success"><i class="fa fa-save"></i> Save</button>
								<button type="button" class="btn btn-danger"> Cancel</button>
							</div>
						</div> -->


							<div class="row">


								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="header-record-search">
												<div class="col-md-12 header-search-record-no"
													id="header_search_donor">
														<div class="row">
															<div class="col-md-12">
																<div class="col-sm-1">
																	<label for="inlineFold" class="control-label">Select
																		Search By</label>
																</div>
																<div class="col-sm-1">
																	<select name="doctor_name" class="form-control"
																		id="searchType">
																		<option value="0">--Select--</option>
																		<option value="1">Collection Id</option>
																		<option value="2">Donor id</option>
																	</select>
																</div>
																<div class="col-md-3">
																	<div class="input-group" id="organRquestDiv">
																		<input class="form-control typeahead"
																			title="Please enter organ id" id="requestSearchId"
																			type="text" placeholder="Organ organ Id or Collection By Id"
																			onkeyup="organCollectionAutoSuggestion(this.id)"> <span
																			class="input-group-btn">
																			<button class="btn btn-primary"
																				style="height: 25px; margin-bottom: 10px" type="button">
																				<span class="fa fa-search" aria-hidden="true"> </span>
																				Search
																			</button>
																		</span>
																	</div>
																</div>
																
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
														<input type="button" onclick="getAllCollectedOrgans()"	class="btn btn-primary" value="Show">
													</div>
																
																
															</div>
														</div>
												</div>

												<div class="clearfix"></div>
											</div>



											<!-- ============================================================================== -->
											<!-- START:Donor Registration Form -->
											<!-- ============================================================================== -->


											<!-- <div class="row"> -->

											<!-- <div class="col-md-12" id="divForEntry"> -->

											<div class="row">
												<div class="col-md-12" id="divForOrganCollection"
													style="display: none">
													<div class="panel panel-primary">
														<div class="panel-heading">Organ Collection</div>
														<div class="panel-body">
															<form id="documentForm" name="documentForm"
																enctype="multipart/form-data" method="post">

																<!-- ============================ Donor name row ====================== -->
																<div class="row">
																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Donor Name
																		</label>
																	</div>
																	<div class="col-md-2">
																		<div class="form-group">
																			<select class="form-control input-SmallText"
																				name="user_title" id="prefix">
																				<option value="0"> -Select Title- </option>
																			</select>
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" name="first_name" id="firstName"
																				class="form-control" placeholder="First name">
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" name="middle_name" id="middleName"
																				class="form-control" placeholder="Middle name">
																		</div>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" name="last_name" id="lastName"
																				class="form-control" placeholder="Last name">
																		</div>
																	</div>
																</div>
																<!-- ============================ END:Donor name row ========================= -->

																<!-- ============================ Organ name and Preservation Method row ====================== -->
																<div class="row">
																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Organ Name
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<select class="form-control input-SmallText"
																				name="organ_name" id="organId">

																			</select>
																		</div>
																	</div>

																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Organ Quantity
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" id="organQuantity"
																				name="organQuantity" class="form-control"
																				placeholder="organ Quantity">

																		</div>
																	</div>
																</div>
																<div class="row">
																<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Preservation Method
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<select class="form-control input-SmallText"
																				name="preservation_method" id="preservationMethodId">
																				<option value="0">- Preservation Method -</option>
																			</select>
																		</div>
																	</div>
																</div>
																<!-- ============================ END:Organ name and Preservation Method row  ========================= -->

																<!-- ============================  Date And Time and Clod Ischemia Time row ====================== -->
																<div class="row">
																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Date And Time
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" class="form-control"
																				placeholder="Date and Time" id="dateTime"
																				name="date_and_time" value="<%=todays_date +"  "+todays_time %>" readonly="readonly">

																		</div>
																	</div>

																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Cold Ischemia Time
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<select class="form-control input-SmallText"
																				name="cold_ischemia_time" id="coldIschemiaTimeId">
																				<option value="0">- Cold Ischemia Time -</option>
																			</select>
																		</div>
																	</div>
																</div>
																<!-- ============================ END:Date And Time and Clod Ischemia Time row  ========================= -->


																<!-- ============================  Surgery Technique and Collected By row ====================== -->
																<div class="row">
																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Surgery Technique
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<select class="form-control input-SmallText"
																				name="surgeryTechnique" id="surgeryTechniqueId">
																				<option value="0">- Surgery Technique-</option>
																			</select>
																		</div>
																	</div>

																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Collected By
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<select class="form-control input-SmallText"
																				name="collected_by" id="collectedByUserId">
																				<option value="0">-- Select Roll Wise Master --</option>
																				<option value="1">doctor</option>
																				<option value="2">nurse</option>
																				<option value="3">lab technician</option>
																			</select>
																		</div>
																	</div>
																</div>
																<!-- ============================ END: Surgery Technique and Collected By row  ========================= -->
																<!-- ============================ Blood Group and Blood Type row ====================== -->
																<div class="row">
																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Blood Group
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<select class="form-control input-SmallText"
																				id="bloodGroupId" name="bloodGroupId">
																				<option value="0">- Select Blood Group-</option>
																			</select>
																		</div>
																	</div>
																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Body Type
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<select class="form-control input-SmallText"
																				name="body_type" id="bodyTypeId">
																				<option value="0">- Body Type-</option>
																			</select>
																		</div>
																	</div>
																</div>
																<!-- ============================ END: Blood Group and Blood Type row  ========================= -->
																<!-- ============================  Size and Upload File row ====================== -->
																<div class="row">
																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span> Size
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="text" id="bodySize" name="size"
																				class="form-control" placeholder="Size">

																		</div>
																	</div>

																	<div class="col-md-2">
																		<label> <span class="required-field"><b
																				style="color: red;">*</b></span>Upload
																		</label>
																	</div>
																	<div class="col-md-3">
																		<div class="form-group">
																			<input type="file" id="uploadOrganCollectionDocsId"
																				class="form-control"
																				name="uploadOrganCollectionDocs" multiple="multiple">
																		</div>
																	</div>
																</div>

																<!-- ============================ Remark ========================= -->
																<div class="row">
																	<div class="col-md-2">
																		<label> Remarks </label>
																	</div>
																	<div class="col-md-7">
																		<div class="form-group">
																			<textarea name="remarks" id="remarks"
																				class="form-control" rows="4" placeholder="Remarks"></textarea>
																		</div>
																	</div>
																</div>
																<!-- ============================ END:Remark ========================= -->


																<!-- ============================ END:  Size and Upload File row  ========================= -->
																<!-- ===== Add button======= -->
															</form>
															<center>
																<button type="submit" class="btn btn-info"
																	onclick="saveCollectedOrgan()">Save</button>
															</center>
															<!-- ===== End:Add button======= -->




														</div>
													</div>


													<!-- 																					 -->
													<!-- </div>		 -->


													<!-- ============================================================================== -->
													<!-- END:Donor Registration Form -->
													<!-- ============================================================================== -->


												</div>

											</div>
											
											<!------------ Start view Document Modal-----------------  -->
													<div class="modal fade bs-example-modal-lg"
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
											
											
											<div class="panel panel-primary" style="margin-top: 20px">
												<div class="panel-heading" id="divEhatContent">Collected
													Organ List</div>
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
																	<th class="col-md-1 center">Collection id</th>
																	<th class="col-md-1 center">Donor id</th>
																	<th class="col-md-1 center">Organ Donor Name</th>
																	<th class="col-md-1 center">Organ Name</th>
																	<th class="col-md-1 center">Organ Collection Date</th>
																	<th class="col-md-1 center">Organ Checkup Date</th>
																	<th class="col-md-1 center">Consent Date</th>
																	<th class="col-md-1 center">Document</th>
																	<th class="col-md-1 center">Edit</th>
																	<th class="col-md-1 center">Delete</th>

																</tr>
															</thead>

															<tbody id="collectedOrgansList">
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
			</div>
		</section>
		<!--/PAGE -->
		<!-- JAVASCRIPTS -->
		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<!-- Auto-Suggestion 8/1/2015-->
		<script type="text/javascript" src="auto/jquery.mockjax.js"></script>
		<script type="text/javascript" src="auto/bootstrap-typeahead.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
		<!-- bootstrap datepicker -->
		<script type="text/javascript"
			src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		<!-- bootstrap datepicker new added  js-->
		<script type="text/javascript"
			src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"></script>
		<script type="text/javascript"
			src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"></script>
		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page
				App.init(); //Initialise plugins and elements

				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				getAllTitle();
				getBloodGroupList();
				getAllBodyType();
				getAllClodIschemiaTime();
				getAllSurgeryTechnique();
				getAllPreservationMethodMaster();
				// get all collected organs
				getAllCollectedOrgans();
				$('#collectedByUserId').select2(); // Added By Annapurna
				

			});
		</script>

		<script type="text/javascript">
			onload = function() {
				// get donors details
				getDonorDetailsById(
		<%=request.getParameter("donorId")%>
			); //aniket_kanse/12/12/21

				// get all organs against checkup list ID:
				getAllOrgansFromCheckupList(
		<%=request.getParameter("checkupListId")%>
			); //aniket_kanse/12/12/21

			}
		</script>
		<!-- /JAVASCRIPTS -->

		<input type="hidden" value="0" id="organCollectionId" />
		<input type="hidden" value="<%=request.getParameter("donorId")%>"
			id="organDonorId" />
		<input type="hidden" value="<%=request.getParameter("treatmentId")%>"
			id="treatmentId" />
		<input type="hidden"
			value="<%=request.getParameter("checkupListId")%>" id="checkupListId" />

		<div id="userDetails" style="display: none;"></div>
		<input type="hidden" value="0" id="usernameValidation" />
		<input id="synchronizeToken" type="hidden"
			value="cbdcb840-12c9-4582-9c0f-abb5511603b3">
		<input type="hidden" value="0" id="userIdForUpdate" />
		<input type="hidden" value="0" id="doctorIdForUpdate" />
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>