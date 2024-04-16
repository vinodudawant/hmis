<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<!-- For Prescription Multilpe language -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Previous Mortuary</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />
<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	
		<script src="auto/bootstrap-typeahead.js"></script>
		<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
	
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link rel="stylesheet" type="text/css"
	href="bootstrap-dist/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css"
	href="font-awesome/css/font-awesome.min.css" />

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
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
<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<!-- /for Developers  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script type="text/javascript" src="js/ehat_autopsy.js"></script>



<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("Mortuary_coldRoom_BedWard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		 PreviousMorturysearch();
	};
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
				<%@include file="left_menu_mortuary.jsp"%>

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

								<input type="hidden" id="cold_room_id" name=""
									value="<%=request.getParameter("id")%>">

								<!-- Page Date Print Discards Common Path info -->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header" style="margin-bottom: 5px">
											<ul class="breadcrumb col-md-12">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="ehat_mortuary.jsp">Mortuary</a></li>

												<li>Previous Mortuary</li>
											</ul>
										</div>
									</div>
								</div>

								<div class="col-md-12-1" style="margin-top: 15px;">

									<div class="col-md-2">
										<label class="TextFont">Search by Previous :</label>
									</div>

									<div class="col-md-5-1 "  style="">
										<input type="text" style="margin-top: 0px;" class="col-md-6-1 typeahead form-control input-SmallText" placeholder="Deceased Name.."
										onkeyup="searchPreviousMorturay(this.id);"	 id="searchpreviousmorturay">

										<div class="col-md-2-1 " style="margin-top: -2px;padding-left: 3%;">
										<input  type="button" style=""  class="btn btn-xs btn-primary"
										onclick="searchPreviousMorturay(this.id);" value="search">
											
												
											
										</div>
									</div>
								</div>

								
								<div id="container" class="col-md-12-1 row"
									style="border: 1px solid #ddd; margin-top: 1%;; overflow: auto; height: 400px;">
									<div class="panel-body">
										<table class="table table-bordered table-condensed cf">
											<tbody id="MortuaryPrevioustable">

											</tbody>
										</table>
									</div>
								</div>





								<!-- --Touheed Old patient information remove-- -->

								<!-- class="container" -->
								<!-- id="main-content" -->
							</div>
						</div>
					</div>

					<!-- id="outer" -->
				</div>
			</div>
		</c:if>
	</section>
</body>
</html>