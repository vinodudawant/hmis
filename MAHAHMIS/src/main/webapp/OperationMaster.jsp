<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Operation Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />
<!-- FONTS -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>
<!-- BOOTSTRAP SWITCH -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-switch/bootstrap-switch.min.css" />

<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script src="ehat-design/js/script.js"></script>

<!-- /for Developers  -->
<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- SELECT2 -->
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("hraTypeMasterDetails"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
	//	defaulthraListView('hraTypeMasterDetails','onload');
	//	gethraMAxID();
		fetchOperationmaster();
		unitMasterListOnLoginOM();
		fetchprocedureCatsedradmin();
		/* setAutoPatientName("byName", "onload", "UserMgmt_Database"); */
	};

</script>


</head>
<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_admin.jsp"%>
				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li><a href="OperationMaster.jsp">OperationMaster</a></li>
											
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->
								<div class="col-md-12-1" style="display: none;">
									<div style="font-weight: bold;" class="col-md-1-1">Search
										By:</div>
									<!-- <div class="col-md-2-1" style="padding-left: 2%;"> :</div> -->
									<div style="margin-top: 0px;" class="col-md-2-1 TextFont"
										id="divbyName">
										<input class="typeahead form-control input-SmallText col-md-12-1" name="byName" type="text"
											 id="byName" 
											onkeypress="(this.id,'onload','hraTypeMasterDetails')"/>
									</div>
									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" class="edit"
											onclick="defaulthraListView('hraTypeMasterDetails','search')" />
									</div>
								</div>

								<input type="hidden" id="txtUserID" value="" />

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body" class="col-md-12-1">
										<div class="divide-10"></div>
								<div id="infoDiv" class="col-md-4-1" style="border: 1px solid #b8b8b8; height: 457px;">
								<div id="" style="width: 100%; border: 1px solid #ddd; height: 457px;" class="col-md-13-1">
								<div style="width: 100%; padding-top: 2.5%; padding-left: 10%">
									<div id="headerTag" style="width: 100%;">
										<h3>OPERATION WISE %</h3>
									</div>
									
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont"> ID:</label> 
												<input type="text" class="form-control input-SmallText" disabled="disabled" value="0" name="txtprcID" id="txtprcID">													
									</div>
									
									
													<div class="form-group col-md-9-1">
														<label class=" TextFont" for="e1">Select Unit :</label>
														<div class="divide-10"></div>
														<div class="col-md-12-1"
															style="margin-top: 4px; margin-left: -14px">

															<select id="e1" name="e1" class="col-md-9"
																onchange="unitListSelect()"><option
																	value=<%=session.getAttribute("uId")%>><%=session.getAttribute("uname")%></option>

															</select>

														</div>
													</div>
												
											<div class="form-group col-md-9-1" style="display: none;">
												<div class="divide-10"></div>
											<label class="TextFont"> Procedure Category:</label>
                            <select id="opgrade" class="col-md-9" name="opgrade" style="margin-top: -2px; margin-left:-12px; ">

                                   </select>
                                        </div>	
                                        <div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont"> Step :
											<span class="required text-danger">*</span>
											</label> 
												<input type="text" class="form-control input-SmallText" name="txtpr" id="txtstep" onkeypress="return validatePrice(event)" onkeyup="checkpercentage()">													
									</div>	
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont"> % :
											<span class="required text-danger">*</span> </label> 
											 
												<input type="text"  class="form-control input-SmallText" name="txtpr" id="txtpr" onkeypress="return validatePrice(event)" onkeyup="checkpercentage()">	
												
																							
									</div>
										<div class="form-group col-md-9-1" id="savebtn" style="margin-left:56px;margin-top:12px">
													<input class="btn btn-xs btn-success"	onclick="saveOPmaster()" type="button" value="Save" >
                    <input class="btn btn-xs btn-primary"	onclick="Clearom()" type="button" value="Clear" >
														
													
												</div>
												</div>
								</div>
							</div>
							
										<div class="divide-10"></div>
										<div id="listproTemp" class="col-md-7-1"
											style="margin-left: 4%;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="userID" />
				<input type="hidden" id="querytype" />
				<input type="hidden" id="count" value="0"/>
				<input type="hidden" value="<%=session.getAttribute("userLoginName")%>" id="userNameLogIn" />
				<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
			</div>
			<div><%@include file="Footer.jsp"%></div>
			<div id="userObj" style="display: none;"></div>
		</c:if>
	</section>
</body>
</html>