<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Result Master</title>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css" id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet" media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript" src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<!-- /for Developers  -->
<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
    href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for table auto complete-------------- -->

<!-- Auto-Suggestion 8/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("ehat_surgerytempmaster"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">
	onload = function() {
		
		$("#empDet").addClass("anchorActive");
		fetchQuestionMaster("result");
		
	}

	
</script>
</head>
<body>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
	<c:if test="${ sessionScope.userType != null }">

		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header"> <%@include
				file="Menu_Header.jsp"%> </header>
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
									<div class="page-header" style="height: 32px;">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
										<li><a href="ehat_result.jsp">Result Master</a></li>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->


							<div class=""></div>
							<div class="row">
							<div class="col-xs-12 " style="">
								<div class="panel panel-default" style="height:595px;margin-top:-9px;">
									<div class="panel-heading" style="background-color: #6a90cb; ">
<label class="control-label lblBold" style="">
  <font size="4" style="color:white">Result Master</font></label>	</div>
										<div class="panel-body" >
									<!-- Start Code for #OTNotes GUI -->
											<div id="iOTNotes" class="col-md-12-1 " style="height:391px;">
											
													<div class="col-md-4-1" style="margin-top: 2px;border: 1px solid #ddd;height:375px;">
														<div class="form-group Remove-Padding col-md-12-1" style="padding-left: 5%;margin-top:12px">
															<div class="col-md-3-1" style="margin-top: 10px;">
																<label class="TextFont">Master List</label>
															</div>
															
														<div class="col-md-12-1" style="margin-top: 14px;">
			      	<select  name="labname" id="testname"style="width: 200px"	onchange="editquestionmasterresult()">
	                  </select>
														
														</div>
															<div class="col-md-12-1" style="margin-top: 55px;">
																<label class="TextFont">Result</label>
															</div>
														<div class="col-md-12-1" style="margin-top: 14px;">

															<div class="">
																<input type="text"
																	style="height: 50px; width: 90%; margin-left: 1%; font-size: 20px;"
																	onkeypress="return validateNumOnly(event);"
																	id="txtresult">
															</div>

															<!--   <div class="col-md-3-1" style="margin-left:149px"><input type="submit" value="ADD" onclick="questioncount()" class="btn btn-primary" style="width:71%"></div>
 -->
														</div>
														<!-- 														<div class="col-md-12-1"style="margin-top: 14px;"><input type="submit" value="Save" onclick="SaveQuestionMaster()" class="btn btn-success"  style="width:48%"></div>
 -->
														<div class=" col-md-12-1" id="idText"
															style="margin-top: 14px;">
															<label class="TextFont">Text:</label>
														<!-- 	<button onclick="Addtext()"
																style="width: 31px; height: -24px; margin-left: 8px; margin-top: 2px">+</button>
															<button onclick="setChkremovetext()"
																style="width: 31px; height: -24px; margin-left: 8px; margin-top: 2px">-</button> -->

															<table class="table table-hover">


																<tbody id="totaltext">
																	<tr>
																		<th class="col-md-6-1 center" style="height: 21.5px;">
																			<input type="text" value="-" id="txtText"
																			name="txtText" class="form-control input-SmallText" style=" font-weight: bold;">
																		</th>
																		<th class="col-md-1 center"><input
																			type="checkbox" id="chktext" name="chktext"></th>

																	</tr>
																</tbody>
															</table>
														</div>
													</div>
										
														
													</div>
												<div class="col-md-8-1" style="margin-top: -8px;padding-left: 10px;">
															
													
								
																									
															<div class="col-md-6-1" style="margin-top: 10px;">
														<div style="margin-top:-2px;margin-left:-15px;width:800px" class="col-xs-10 col-sm-4 col-md-6 col-lg-6">
								<div class="panel panel-default" >
									<div class="panel-heading" style="background-color: #6a90cb "><label class="control-label lblBold"><font size="2" style="color:white">Question List </font></label></div>
										<div class="panel-body"style="height: 474px; overflow: auto;">
								<!-- 	<div class="col-md-12-1"  >
											
										</div> -->
										<div class="row"></div>
										<table class="table table-hover">
										<tbody id="tquestionmaster">
										</tbody>
                             </table></div></div></div></div>
													
												
												</div>
													
												<!-- <div class="col-md-12-1" style="border-top:1px solid #ddd;width:1083px;margin-left:-15px;margin-top:0px;height:18px">
												</div> -->
											</div>
							
											
											<!-- End Code for #OTNotes GUI -->
										</div>
								</div>
							</div>
							</div>

									</div>
								</div>

						</div>
					</div>
				</div>
				<%@include file="Footer.jsp"%></div>
			<div id="userObj" style="display: none;"></div>
			<input type="hidden" value="0" id="corporateAcId" />
		</div>


	</c:if>
<script src="ehat-design/js/script.js"></script>
		<!-- SELECT2 -->
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
</body>
</html>