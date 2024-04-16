<%-- <%@page import="org.json.simple.JSONObject"%> --%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>User Access Management</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />

<%@include file="inv_header.jsp"%>

</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
	
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
			String todays_date = formatter.format(currentDate.getTime());
		
			HttpSession session2 = request.getSession();
			org.json.simple.JSONObject userObject = (org.json.simple.JSONObject)session2.getAttribute("userJsonObject");
			String userId = "";
			if(userObject.get("userId")!=null){
				userId = userObject.get("userId").toString();
			}
			String fullName = "";
			if(userObject.get("fullName")!=null){
				fullName = userObject.get("fullName").toString();
			}
			String emailId = "";
			if(userObject.get("emailId")!=null){
				emailId = userObject.get("emailId").toString();
			}
			String role = "";
			if(userObject.get("role")!=null){
				role = userObject.get("role").toString();
			}
			String userName1 = "";
			if(userObject.get("userName")!=null){
				userName1 = userObject.get("userName").toString();
			}
			String lastLoginDateTime = "";
			if(userObject.get("lastLoginDateTime")!=null){
				lastLoginDateTime = userObject.get("lastLoginDateTime").toString();
			}
		%>
		
		<script>
		function assignAccess() {
			var userId = "<%=userId%>";
	
			jQuery.ajax({
				type : "POST",
				url : "useraccess/getUser",
				data : {
					"userId" : userId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					//alert('error');
				},
				success : function(response) {
					var privilegeType = response.privilegeType;
				    var roleId = response.roleId;
				    var profileId = response.profileId;
				    var userModuleAccessView = response.userModuleAccessView;
				    var userModuleAccessEdit = response.userModuleAccessEdit;
				    var userModuleAccessDelete = response.userModuleAccessDelete;
				    var userSubModuleAccessView = response.userSubModuleAccessView;
				    var userSubModuleAccessEdit = response.userSubModuleAccessEdit;
				    var userSubModuleAccessDelete = response.userSubModuleAccessDelete;
				    var userSubModuleOnOff = response.userSubModuleAccessOnOff;
				    $("input[name=accessType][value='"+privilegeType+"']").prop("checked",true);
					if (privilegeType == "3") {
						$('#roleDiv').show();
						$('#profileList_chosen').hide();
						$('#tableDiv').hide();
						var roleArray = [];
						if(roleId!=null && roleId!=""){
							var roleId1=roleId.split(",");
							for(var i=0;i<roleId1.length;i++){
								roleArray.push(roleId1[i]);
							}
						}
						$('#roleList').val(roleArray);
						$('.chosen-select').chosen().trigger("chosen:updated");
				    }
					else if (privilegeType == "1"){
						$('#roleDiv').hide();
						$('#profileList_chosen').show();
						$('#tableDiv').hide();
						var profileArray = [];
						if(profileId!=null && profileId!=""){
							var profileId1=profileId.split(",");
							for(var i=0;i<profileId1.length;i++){
								profileArray.push(profileId1[i]);
							}
						}
						$('#profileList').val(profileArray);
						$('.chosen-select').chosen().trigger("chosen:updated");
					}
					else if (privilegeType == "2"){
						$('#moduleBody :checkbox').map(function(){
							$('#'+this.id).prop('checked', false);
						});
						$('#roleDiv').hide();
						$('#profileList_chosen').hide();
						$('#tableDiv').show();
						if(userModuleAccessView!=null && userModuleAccessView!=""){
							var moduleViewAccess=userModuleAccessView.split(",");
							for(var i=0;i<moduleViewAccess.length;i++){
								$('#moduleView_'+moduleViewAccess[i]).prop("checked","checked");
							}
						}
						if(userModuleAccessEdit!=null && userModuleAccessEdit!=""){
							var moduleEditAccess=userModuleAccessEdit.split(",");
							for(var i=0;i<moduleEditAccess.length;i++){
								$('#moduleEdit_'+moduleEditAccess[i]).prop("checked","checked");
							}
						}
						if(userModuleAccessDelete!=null && userModuleAccessDelete!=""){
							var moduleDeleteAccess=userModuleAccessDelete.split(",");
							for(var i=0;i<moduleDeleteAccess.length;i++){
								$('#moduleDelete_'+moduleDeleteAccess[i]).prop("checked","checked");
							}
						}
						if(userSubModuleAccessView!=null && userSubModuleAccessView!=""){
							var subModuleViewAccess=userSubModuleAccessView.split(",");
							for(var i=0;i<subModuleViewAccess.length;i++){
								$('#subModuleView_'+subModuleViewAccess[i]).prop("checked","checked");
							}
						}
						if(userSubModuleAccessEdit!=null && userSubModuleAccessEdit!=""){
							var subModuleEditAccess=userSubModuleAccessEdit.split(",");
							for(var i=0;i<subModuleEditAccess.length;i++){
								$('#subModuleEdit_'+subModuleEditAccess[i]).prop("checked","checked");
							}
						}
						if(userSubModuleAccessDelete!=null && userSubModuleAccessDelete!=""){
							var subModuleDeleteAccess=userSubModuleAccessDelete.split(",");
							for(var i=0;i<subModuleDeleteAccess.length;i++){
								$('#subModuleDelete_'+subModuleDeleteAccess[i]).prop("checked","checked");
							}
						}
						if(userSubModuleOnOff!=null && userSubModuleOnOff!=""){
							var subModuleOnOffAccess=userSubModuleOnOff.split(",");
							for(var i=0;i<subModuleOnOffAccess.length;i++){
								$('#subModuleOnOff_'+subModuleOnOffAccess[i]).prop("checked","checked");
							}
						}
					}
					$('#accessTypeBeforeChange').val(privilegeType);
				}
			});		    
		}
		</script>
	
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
										
										<input type="text" class="hidden" id="masterUserId" value="<%=userId%>">

										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>	</li>
											<li><i class="fa fa-home"></i> <a href="user_access.jsp">User Access Management</a></li>
											<div class="pull-right">
												<button class="btn btn-xs btn-success editUserAccess" id="saveBtn"
													value="Save Now" data-toggle="tooltip"
													data-placement="left" title="Save User Account Details"
													onclick="saveUserAccess()" disabled="disabled">
													<i class="fa fa-save"></i>
												</button>
												<!-- <button onclick="refreshUserAccess()" title=""
													data-placement="left" data-toggle="tooltip"
													class="btn btn-xs btn-danger"
													data-original-title="Refresh">
													<i class="fa fa-refresh"></i>
												</button> -->
											</div>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									
									<div class="col-md-1">
									    <img style="background-color: black; width: 60px; border-radius: 40px; height: 60px;" src="images/patientPhoto.jpg">
									</div>
									
									<div class="col-md-11">
									  	<div class="col-md-12">
											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label col-md-4"
														style="padding-top: 10px;">Full Name</label>
													<div class="col-md-8">
														<input type="text" class="form-control" value="<%=fullName%>" disabled>
													</div>
												</div>
											</div>
											
											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label col-md-4"
														style="padding-top: 10px;">Role</label>
													<div class="col-md-8">
														<input type="text" class="form-control" value="<%=role%>" disabled>
													</div>
												</div>
											</div>
											
											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label col-md-4" style="padding-top: 10px;">User Name</label>
													<div class="col-md-8">
														<input type="text" class="form-control" value="<%=userName1%>" disabled>
													</div>
												</div>
											</div>
										</div>
										<div class="divide-20"></div>
										<div class="col-md-12">
											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label col-md-4"
														style="padding-top: 10px;">Email Id</label>
													<div class="col-md-8">
														<input type="text" class="form-control" value="<%=emailId%>" disabled>
													</div>
												</div>
											</div>
											
											<div class="col-md-4">
												<div class="form-group">
													<label class="control-label col-md-4"
														style="padding-top: 10px;">Last logged in</label>
													<div class="col-md-8">
														<input type="text" class="form-control" value="<%=lastLoginDateTime%>" disabled>
													</div>
												</div>
											</div>
										</div>
  									</div>									
								</div>								
								
								<div class="divide-20"></div>
								<input id="accessTypeBeforeChange" value="1" class="hidden">
								
								<div class="box border blue">
									<div class="box-body" style="padding: 10px 15px 30px;">								
										<div class="col-md-12">
											<div class="col-md-1"
												style="font-weight: bold; margin-top: 10px;">
												Privileges:</div>
											<div class="col-md-4">
												<label class="checkbox input-SmallText"> <input
													type="radio" id="role" value="3" name="accessType"
													checked="checked"> Assign priviliges from existing
													Roles
												</label>
											</div>
											<div class="col-md-4">
												<label class="checkbox input-SmallText"> <input
													type="radio" id="profile" value="1" name="accessType">
													Assign priviliges from existing Profiles
												</label>
											</div>
											<div class="col-md-3">
												<label class="checkbox input-SmallText"> <input
													type="radio" id="manual" value="2" name="accessType">
													Assign priviliges Manually
												</label>
											</div>
										</div>
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
															<div class="panel-heading" id="divEhatContent">Modulewise Access</div>
															<div class="panel-body">
																	<div>
																	<!-- class="panel-body" -->
																	<div id="roleDiv" class="col-md-12" style="display:none;">
																		<select id="roleList" data-placeholder="Choose Role"																		
																			class="chosen-select" multiple tabindex="4">
																		</select>
																	</div>
							
																	<div id="profileDiv" class="col-md-12">
																		<select id="profileList" data-placeholder="Choose Profile"
																			class="chosen-select" multiple tabindex="4">
																		</select>
																	</div>
							
																	<div id="tableDiv" class="col-md-12" style="display:none;">
																		<div class="box border blue">
																			<div class="box-body">
																		<table class="table table-striped">
																			<thead>
																				<tr>
																					<th>Modules</th>
																							<th>View <label class="checkbox-inline"> <input
																									type="checkbox" id="viewAll" onchange="selectAll('viewAll')">
																							</label></th>
																							<th>Create/Edit <label class="checkbox-inline"> <input
																									type="checkbox" id="editAll" onchange="selectAll('editAll')">
																							</label></th>
																					<th>Delete <label class="checkbox-inline"> <input
																									type="checkbox" id="deleteAll" onchange="selectAll('deleteAll')">
																							</label></th>
																					<th>Sub-Module</th>
																				</tr>
																			</thead>
																			<tbody id="moduleBody">
																			</tbody>
																		</table>
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
			<div id="showSubModulesPopup" class="modal fade in">
				<!--End #showSubModulesPopup Popup -->
				<input id="objUserAccess" type="hidden" value="" />
				<%@include file="Footer.jsp"%>
			</div>
			<%-- <%@include file="footer_nobel.jsp"%> --%>
		</section>
		<!--/PAGE -->

	<!-- JAVASCRIPTS -->
	<%@include file="inv_footer.jsp"%>
	
	<!-- CUSTOM SCRIPT -->
	<!-- <script src="js/script.js"></script> -->
	<script src="js/UserAccess.js"></script>
	<script src="js/chosen.jquery.js"></script>
	
	<script>		
		jQuery(document).ready(function() {
			App.setPage("UserManagement"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getAllModule();
			getAllSubModule();
			getAllProfile();
			getAllRole();
			setTimeout(function(){ assignAccess(); }, 1000);		
		});
	</script>
	
	
	<input type="hidden" id=doc_id value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>