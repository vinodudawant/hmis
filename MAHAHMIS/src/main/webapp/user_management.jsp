
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Admin Employee Form</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- include js for development -->
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/HR.js"></script>
<script type="text/javascript" src="js/usrDocNew.js"></script>
<script type="text/javascript" src="js/users.js"></script>
<script type="text/javascript" src="js/hospitalDetailAdministrator.js"></script>

<script src="jquery/jquery.ajaxfileupload.js" ></script>

<script lang="Javascript">
/* $(document).click(function() {
	$('input[type="file"]').ajaxfileupload({
		'action' : 'UploadDocServlet1',
	});
}); */
</script>

	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
		String todays_date = formatter.format(currentDate.getTime());
	%>
	
	
 <style>
        .form-group.col-md-3 ul.select2-choices {
   height: 100px;
  overflow-y: scroll;
}

 /* Optionally, you can style individual items within the dynamic content */
.form-group.col-md-3 .select2-choices .select2-search-choice {
    background-color: #f0f0f0; /* Set background color */
    border: 1px solid #ccc; /* Set border */
    margin: 5px; /* Set margin */
} 

/* Optionally, style the input field within the dynamic content */
.form-group.col-md-3 .select2-choices .select2-search-field input {
    width: 100%; /* Set width to 100% */
}
    </style>

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

			<%@include file="HRLeftMenu.jsp"%>

			<!-- /SIDEBAR -->
			<div id="main-content">

				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="HRManagement.jsp">User Details</a></li>
											<div class="pull-right">
												<button class="btn btn-xs btn-success" id="saveUserDetails"
													onclick="saveUsrDoc('admin')">Save</button>
											</div>								
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
												<div class="col-md-12" id="divForEntry">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">User Details</div>
															<div class="panel-body">
																<div class="form-row">
																	
																	<div class="form-group col-md-3 hidden">
																		<label for="inputEmail4">Employee ID</label>
																		<input class="form-control tip-focus" title="Please enter module name" readonly id="empId" type="text" value="<%=request.getParameter("userID")%>">
																	</div>
																
																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Employee HR ID</label>
																		<input class="form-control tip-focus" title="Please enter module name" id="empIdhr" type="text" placeholder="Employee HR ID">
																	</div>
																	
																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Employee Type<span
																		class="required text-danger">*</span></label>
																		<select id="userType" class="tip-focus" style="width:100%" onchange="getDcTypeMasterList();"></select>																		 
																	</div>
																	
																	<div class="form-group col-md-4"  id="dicDocTypeMaster">
																		<label for="inputEmail4">Doctor Type</label>
																		<select id="seldcTypeMaster"  multiple="multiple" style="width:100%"  class="tip-focus"></select>
																																			
																	</div> 
																	
																	<div class="form-group col-md-3">
																		<label for="inputEmail4">Created Date</label>
																		<input class="form-control tip-focus" title="Please enter module name" id="createdDate" value="<%=todays_date%>" type="text" placeholder="Created Date" readonly>
																	</div>
																	
																</div>																
															</div>
														</div>
														
														
														<div class="panel panel-primary">
															<div class="panel-heading">Applicant Information</div>
															<div class="panel-body">
															
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Title<span
																	class="required text-danger">*</span></label>
																	<select id="title" class="form-control tip-focus" onchange="setFullName()"></select>
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">First Name<span
																		class="required text-danger">*</span></label>
																	<input class="form-control tip-focus" title="Please enter First Name" id="fn" type="text" placeholder="First Name" onkeyup="setFullName()" onkeypress="return validatealphabetic(event)">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Middle Name</label>
																	<input class="form-control tip-focus" title="Please enter Middle Name" id="mn" type="text" placeholder="Middle Name" onkeyup="setFullName()" onkeypress="return validatealphabetic(event)">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Last Name<span
																	class="required text-danger">*</span></label>
																	 <input class="form-control tip-focus" title="Please enter Last Name" id="ln" type="text" placeholder="Last Name" onkeyup="setFullName()" onkeypress="return validatealphabetic(event)">
																</div>																
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">User Name<span
																	class="required text-danger">*</span></label>
																	 <input class="form-control tip-focus" title="Please enter User Name" id="userNm" type="text" placeholder="User Name">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Password<span
																	class="required text-danger">*</span></label>
																	 <input class="form-control tip-focus" title="Please enter Password" id="password" type="password" placeholder="Password">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Full Name</label>
																	 <input class="form-control tip-focus" title="Please enter Full Name" id="fullName" type="text" placeholder="Full Name" readonly>
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Fixed Income</label>
																	 <input class="form-control tip-focus" title="Please enter Fixed Income" id="fixedIncome" type="text" placeholder="Fixed Income" value="0.0" onkeypress="return validateNumbers(event)">
																</div>
																
																<div id="docSep" style="display: none;">
																<!-- <div class="form-group col-md-3">
																	<label for="inputEmail4">Specialization<span
																	class="required text-danger">*</span></label>
																	<select id="specialization" class="form-control tip-focus" onchange="setDyanamicDivspeciali('specializationName',this.id,'Specialization')">
																	</select>
																																 
																</div> -->
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Department<span
																	class="required text-danger">*</span></label>
																	<select id="departments" class="tip-focus" style="width:100%" >
																		<!-- <option value="0">--- Select ---</option> -->
																	</select>
																</div>
																
																<div class="form-group col-md-3 select2-container select2-container-multi">
																	<label for="inputEmail4">Selected Specialization<span
																	class="required text-danger">*</span></label>
																<!-- <ul id="specializationName" class="select2-choices"
																			style="overflow-y: scroll; min-height: 70px;"> 

																</ul> -->
																<select id="specializationName" multiple class="tip-focus" style="width: 200px"  name="specializationName"></select>
																</div>
																
																
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Speciality<span
																	class="required text-danger">*</span></label>
																	<select id="selSpeciality" class="form-control tip-focus">
																		<option value="0">--- Select ---</option>
																	</select>
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Consultant Fee</label>
																	 <input class="form-control tip-focus" title="Please enter Consultant Fee" id="doctorfee" type="text" placeholder="Consultant Fee" value="0.0" onkeypress=" return validateNumbers(event)"> 
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Doctor Initial</label>
																	 <input class="form-control tip-focus" title="Please enter Doctor Initial" id="docIni" type="text" placeholder="Doctor Initial">
																</div>
																</div>
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Referral%</label>
																	 <input class="form-control tip-focus" title="Please enter Referral%" id="referalPercent" type="text" placeholder="Referral%" value="0.0" onkeyup="return isGTHundred('referalPercent');" 
																	 		maxlength="5" onkeypress="return isPercentKey(event,'referalPercent');">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Follow up fees</label>
																	 <input class="form-control tip-focus" title="Please enter Follow up fees" id="folloupFees" type="text" placeholder="Follow up fees" maxlength="5" value="0.0" onkeypress="return validateNumOnly(event)">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Follow up weekend</label>
																	 <input class="form-control tip-focus" title="Please enter Follow up weekend" id="folloupWeekend" type="text" placeholder="Follow up weekend" maxlength="5" value="0" onkeypress="return validateNumOnly(event)">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Qualification</label>
																	 <input class="form-control tip-focus" title="Please enter Qualification" id="qualification" type="text" placeholder="Qualification">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Designation</label>
																	 <input class="form-control tip-focus" title="Please enter Designation" id="designation" type="text" placeholder="Designation">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Reg. No.</label>
																	 <input class="form-control tip-focus" title="Please enter Reg. No." id="regNo" type="text" placeholder="Reg. No." value="0" onkeypress="return validateNumOnly(event)">
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Mobile No</label>
																	 <input class="form-control tip-focus" title="Please enter Mobile No" id="mobile" name="mobile" value="0" onkeypress="return validateNumOnly(event)" type="text" maxlength="10"  placeholder="Mobile No">
																</div>
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Email</label>
																	 <input class="form-control tip-focus" title="Please enter Email" id="email" name="email"  type="text"   placeholder="Email"> 
																
																</div>
																
																<!-- <div class="form-group col-md-3">
																	<label for="inputEmail4">Discount Authorization</label>
																	<select id="motivatorAuthorisation" class="form-control tip-focus">
																		<option value="Unauthorised" selected>Unauthorized </option>
																		<option value="Authorised">Authorized </option>																		
																	</select>
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Software User</label>
																	 <input class="form-control tip-focus" title="Please enter module name" style="height: 15px;" id="softwareUsed" type="checkbox" checked="checked">
																</div> -->
																<div class="row">
																<div class="col-md-12">
																 <div class="form-group col-md-3">
																	<label for="inputEmail4">Add User Signature</label>
																	 <input class="form-control tip-focus" style="height: 15px;" id="softwareUsedChk" onchange="checkbox()" type="checkbox">
																</div> 
																<div id="doc1" style="display: none;">
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Doctor Signature</label>
																	<form id="docSignUploadfrm" name="docSignUploadfrm">
																		<input class="form-control tip-focus" id="signature1" name="signature" type="file" onchange="uploadDoctorSign()" placeholder="File Name">
																		<div id="doctorSignName" style="font-weight: bold; color: green;"></div>
																	</form>
																</div>
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Doctor Name</label>
																	 <input class="form-control tip-focus" title="Please enter Doctor Name" id="docName1" name="Doctor Name" onkeypress="" type="text" placeholder="Doctor Signature">
																</div>
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Technician Signature</label>
																	<form id="docSignUploadfrm11" name="docSignUploadfrm11">
																		<input class="form-control tip-focus" id="signature2" name="signature" type="file" onchange="uploadTechSign()" placeholder="File Name">
																		<div id="technicianSignName" style="font-weight: bold; color: green;"></div>
																	</form>
																</div>
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Technician Name</label>
																	 <input class="form-control tip-focus" title="Please enter Technician Name" id="techName1" name="Technician Name" onkeypress="" type="text" placeholder="Technician Signature">
																</div>
																</div>
																</div>
																</div>
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Discount Authorization</label>
																	<select id="motivatorAuthorisation" class="form-control tip-focus">
																		<option value="Unauthorised" selected>Unauthorized </option>
																		<option value="Authorised">Authorized </option>																		
																	</select>
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Software User</label>
																	 <input class="form-control tip-focus" title="Please enter module name" style="height: 15px;" id="softwareUsed" type="checkbox" checked="checked">
																</div>
															</div>
														</div>
														
														
														<div class="panel panel-primary">
															<div class="panel-heading">Service Access Details</div>
															<div class="panel-body">
															
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Select Units<span
																	class="required text-danger">*</span></label>																	
																	<select id=mulSelunit multiple class="tip-focus" style="width: 200px" name="mulSelunit"></select>
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Select Departments<span
																	class="required text-danger">*</span></label>
																	<select id="deptName" multiple class="tip-focus" style="width: 200px"  name="deptName"></select>
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputEmail4">Select Services<span
																	class="required text-danger">*</span></label>
																	<select id="serviceName" multiple class="tip-focus" style="width: 200px"  name="serviceName"></select>																	
																</div>
															
																<div class="form-group col-md-3">
																	<label for="inputEmail4">All Services</label>
																	<input id="allServiceChk" type="checkbox" class="tip-focus" onclick="selectAllServices()"> 
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

	<!-- JAVASCRIPTS -->
	<%@include file="inv_footer.jsp"%>
	
	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
				$("#userType").select2();
			});


			

			//fetchDoctorSpecilizations();
			//fetchHospitalDepartments();
			//fetchDoctorSpeciality();
			getAllRoleForHr();
			//setTempAllUnitList();
	     	getAllUnit();// added by paras 
	     	getViewDeptsInHr();//added by sagar 
	     	getAllServicesInHr(); //added by sagar 
	     	getSpecializationInfoForUserMgmt();//added by dayanand
	     	getFetchSaveHospitalDepartmentForUserMgmt();//added by dayanand
	     	defaultViewDoctorSpeciality();//added by dayanand
	     	
	     	$("#mulSelunit").select2();
			$("#deptName").select2();
			$("#serviceName").select2();
			$("#seldcTypeMaster").select2();
			$("#specializationName").select2();

	     	title("AdminEmployeeForm");
			/* setTimeout(function() {
				
				setEmployeeDetailsDetails('AdminEmployeeForm');
				
			}, 1000);
			setEmployeeDetails(); */
			$("#empDet").addClass("anchorActive");
			
			//For User Access management by Amol Saware
			setTimeout(function(){userAccess();},500);	
			<%-- var tk2 = <%=request.getParameter("querytype")%>;
			setTimeout(function() {
			setQueryStatus(tk2);
			}, 1000); --%>

			getUser1(<%=request.getParameter("userID")%>);

			var tk = <%=request.getParameter("querytype")%>;
			if(tk=="update"){
				$("#queryType").val("update");
			}else{
				$("#queryType").val("insert");
			}	

			
		});
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
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>