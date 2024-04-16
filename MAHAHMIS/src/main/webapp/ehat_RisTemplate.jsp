<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en">
<head>
<title>RIS Template</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
    href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
    href="ehat-design/alertify/alertify.default.css" />
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>


<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">


<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- MARKDOWN -->
<script type="text/javascript"
	src="js/bootstrap-markdown/js/markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/to-markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/bootstrap-markdown.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>


<!-- COOKIE -->
<script type="text/javascript"
	src="js/jQuery-Cookie/jquery.cookie.min.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- for Developers  -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/pop_up.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script type="text/javascript" src="js/ehat_viewRis_modified.js"></script> <!-- aniket kanse, 25 JAN 22 -->

<style>
#draggable {
	width: 150px;
	height: 150px;
	padding: 0.5em;
}
</style>


<script>
	jQuery(document).ready(function() {
		App.setPage("CustomizeTemplate"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {

		//fetchRisTest("RadioGroup");
		//fetchRisTestList();
		
		fetchRisTemplateType();	// aniket kanse, 25 JAN 22
		getRisTemplateDetails();

	}
</script>
</head>

<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_pathologyNew.jsp"%>
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
												<li>Customize Template</li>
												<li><i class="fa fa-question"></i></li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li>
												<div class="pull-right li">
													<button class="btn btn-xs btn-success"
														onclick="saveRisTemplate1('RIS')">Save</button>

												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->


								<div style="margin-top: 9px;" class="col-md-12-1">

									<div class="col-md-5-1">
										<div class="col-md-2-1 form-group">Template List</div>
										<div class="col-md-4-1">
											<select id="selRisTempList" name="selRisTempList"
												style="margin-top: 0px;"
												class="col-md-11-1 form-control input-SmallText ">
												<option onclick="setNewCustomizeTemp()" value="0">NewTemplate</option>
											</select> <input type="hidden" name="idTempMast" value="0"
												id="idTempMast">
										</div>

										<div class="col-md-2-1 form-group">Template Type</div>
										<div class="col-md-4-1">
											<select id="selRisTempType" style="margin-top: 0px;"
												class="col-md-11-1 form-control input-SmallText ">
												<!-- <option value="Select" onclick="setTemplateFunc()">-Select-</option> -->



											</select>
										</div>

									</div>

									<!-- 	<div id="tempHistDiv" class="col-md-3-1">
										<div class="col-md-5-1 form-group">
											Speclization<b style="color: red; padding-left: 3px;">*</b>
										</div>
										<div class="col-md-7-1">
											<select id="selDocSpec" style="margin-top: 0px;" class="col-md-11-1 form-control input-SmallText "></select>
										</div>
									</div>
									 -->

									<div class="col-md-3-1">
										<div class="col-md-5-1 form-group">
											Template Name<b style="color: red; padding-left: 3px;">*</b>
										</div>
										<div class="col-md-7-1">
											<input type="text"
												class="col-md-11-1 form-control input-SmallText " value=""
												style="margin-top: 0px;" id="risTemplateName">
										</div>
									</div>

								</div>


								<div class="panel panel-default col-md-12-1"
									style="margin-top: 0px;">
									<div class="panel-body">
										<div id="move" style="width: 100%; display: none;"
											class="ui-resizable ui-draggable ui-draggable-handle">
											<textarea class="ckeditor ui-widget-content " name="editor1"
												title="Rich Text Editor, editor1" placeholder="Content"
												id="editor1"></textarea>
										</div>

										<div id="historyTemp" style="width: 100%;"
											class="tabbable ui-resizable ui-draggable ui-draggable-handle">
											<ul class="nav nav-tabs">
												<li class="active"><a data-toggle="tab"
													href="#Subjective"><i class="fa fa-home"></i> <span
														class="hidden-inline-mobile">Subjective</span></a></li>

											</ul>
											<div class="divide-10"></div>
											<div class="tab-content">
												<div ID="Subjective" class="tab-pane fade in active">
													<textarea class="ckeditor ui-widget-content "
														name="RiseditorSubjective"
														title="Rich Text Editor, RiseditorSubjective"
														placeholder="Content" id="RiseditorSubjective"></textarea>
												</div>
												<div ID="Objective" class="tab-pane fade">
													<textarea class="ckeditor ui-widget-content "
														name="editorObjective"
														title="Rich Text Editor, editorObjective"
														placeholder="Content" id="editorObjective"></textarea>
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

			<!-- <div style="width: 100%;color: #333; background-color: #EEEEEE; padding: 1%;">
										<textarea name="content" id="editor1" style="width: 100%;"></textarea> -->

			<%@include file="Footer.jsp"%>
			<input type="hidden" id="qurType" value="insert">
			<input type="hidden" id="updateTempId" value="0">
			<input type="hidden" id="pageName" value="Admin">
			<div id="customizeTemplateDiv" style="display: none;"></div>
			<div id="divDocSpec" style="display: none;"></div>
			<input type='hidden' style="display: none" id='risTemplateId' value='0' />
			<input type="hidden" value="<%=session.getAttribute("myObj")%>"
				id="patdet" />

		</c:if>
	</section>
</body>
</html>