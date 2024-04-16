<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Doctor Round Template</title>
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
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>


<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("DoctorRoundTemplate"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script>
/* function getNextId() {
	//alert("in");
	var tableName = "ehat_doctor_round_template";

	var inputs = [];
	inputs.push('action=getNextId');
	inputs.push('tableName=' + tableName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
				$("#txtTemplateId").val(r);
		}
	});
} */// function getNextId end
</script>

<script type="text/javascript">
	onload = function() {
		
		//getNextId();
		fetchDoctorRoundTemplate("onload");
		setAutoSuggestTempName("byName", "onload", "doctorRoundTemplate");
	}
</script>
</head>

<body style="background: white ! important;">

	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">

				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_IPDMain.jsp"%>
				<!--End Left Menu -->
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

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%>
												</li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">IPD</a></li>
												<li>Masters</li>
												<li><a href="DoctorRoundTemplate.jsp">Doctor Round Template</a></li>
												
												<div class="li pull-right">
													<button class="btn btn-xs btn-success editUserAccess" onclick="saveDoctorRoundTemplate();" title="Save/Update Template" data-placement="left" data-toggle="tooltip">
													<i class="fa fa-save"></i>
													</button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<div class="col-md-12-1">
										<div class="col-md-1-1" style="">
										<label class="TextFont" style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Search By:</label>
										</div>
										<div class="col-md-1-1">
										<label class="TextFont" style=" margin-top: 3%;">Template Name:</label>
										</div>
										<div id="divbyName" class="col-md-2-1 TextFont" style="">
										<input name="byName" type="text" id="byName"
										class="typeahead form-control input-SmallText" />
										</div>
										<div class="col-md-1-1" style="text-align: center;">
										<input id="btnSearch" class="btn btn-xs btn-primary" type="button" onclick="SearchDoctorRoundTemplate()" value="search">
										</div>
								</div>

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">
									
									<div id="AddContentBox" class="col-sm-4-1" style="height: 475px; margin-top: 1%; padding-left: 2%; text-align: left; border: 1px solid #ddd;">
										<div class="col-md-12-1 center">
											<div class="divide-20"></div>
											<h4>Doctor Round Template:</h4>
											<div class="divide-20"></div>
										</div>
										
										<div class="form-group Remove-Padding col-md-12-1" style="padding-top: 3%;">
											<div class="divide-20" style="display: none;"></div>
											<div class="row" style="display: none;">
											<div class="col-md-4-1">Template ID:</div>
											<div class="col-md-6-1 center">
												<input id="txtTemplateId" class="col-md-12-1 form-control input-SmallText" readonly="readonly" name="txtTemplateId">
											</div>
											</div>
											<div class="divide-20"></div>
											<div class="row">
											<div class="col-md-4-1" style="margin-top:10px;">Template Name:<b style="color: red; padding-left: 3px;">*</b></div>
											<div class="col-md-6-1 center" style="margin-top:15px">
												<input id="txtTemplateName" class="col-md-12-1 form-control input-SmallText"  value="" placeholder="Template Name" name="txtTemplateName">
											</div>
											</div>
											<div class="divide-20"></div>
											<div class="row">
											<div class="col-md-4-1" style="margin-top:20px;">Clinical Notes:<b style="color: red; padding-left: 3px;">*</b></div>
											<div class="col-md-7-1 center" style="margin-top:15px">
												<textarea id="txtClinicalNotes" rows="3" class="form-control" placeholder="Clinical Notes" 
												onkeypress="return validateComma(event)"></textarea>
											</div>
											</div>
											<div class="divide-20"></div>
											<div class="row">
											<div class="col-md-4-1" style="margin-top:20px;">Investigation Advice:</div>
											<div class="col-md-7-1 center" style="margin-top:15px">
												<textarea id="txtInvestigationAdvice" rows="3" class="form-control" placeholder="Investigation Advice" 
												onkeypress="return validateComma(event)"></textarea>
											</div>
											</div>
											<div class="divide-20"></div>
											<div class="row">
											<div class="col-md-4-1" style="margin-top:20px;">Other:</div>
											<div class="col-md-7-1 center" style="margin-top:15px">
												<textarea id="txtOther" rows="3" class="form-control" placeholder="Other"></textarea>
											</div>
											</div>
										</div>
										
									</div>
									<div id="PrevListBox" class="col-sm-7-1" style="margin-left: 4%; float: left;">
										<div class="col-md-12-1" style="margin-top: 3%;">
											<table class="table table-bordered table-condensed cf" style="margin-bottom: 9px; width: 100%;">
												<thead class="cf">
													<tr>
													<th class="col-md-1-1 center" style="height: 21.5px;">
													<div class="TextFont">#</div>
													</th>
													<th class="col-md-2-1 " style="height: 21.5px;">
													<div class="TextFont">Template Id</div>
													</th>
													<th class="col-md-3-1" style="height: 21.5px;">
													<div class="TextFont">Template Name</div>
													</th>
													<th class="col-md-3-1" style="height: 21.5px; padding-left: -10px;">
													<div class="TextFont">Clinical Notes</div>
													</th>
													<th class="col-md-1-1 center" style="height: 21.5px;">
													<div class="TextFont">Edit</div>
													</th>
													<th class="col-md-1-1 center" style="height: 21.5px;">
													<div class="TextFont">Delete</div>
													</th>
													</tr>
												</thead>
											</table>
										</div>
										<div id="nursingNoteDiv" class="col-md-12-1" style="height: 450px; max-height: auto; overflow-y: scroll; border: 1px solid #ddd;">
											<table class='table table-striped table-condensed cf'>
													<tbody id="drtTable">
													</tbody>
												</table>
										</div>
										
									</div>
										
									</div>
									
								</div>
							</div>
							<!-- End id="content" -->
						</div>
						<!-- End class="row" -->
					</div>
					<!-- class="container" -->
				</div>
				<!-- id="main-content" -->
			</div>
			<!-- id="outer" -->

			<div><%@include file="Footer.jsp"%></div>
			<div id="nursingnotesAjax" style="display: none;"></div>
			<input id="btnName" style="display: none;" type="text" name="btnName" value="save">
		</c:if>
	</section>
</body>
</html>