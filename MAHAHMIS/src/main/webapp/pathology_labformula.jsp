<!DOCTYPE html >
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Assign Pathology Tests</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css"/>
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->



<!-- New Js Files -->
<script type="text/javascript" src="js/jquery/jquery-2.0.3.min.js"></script>
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
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/pathology_labformula.js"></script>
<!-- TYPEHEAD -->
<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("labFormulaGenration"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#pathManagement").addClass("anchorActive");

		getLabFormulaHeadings("onload");
	}
</script>
</head>

<body>
	<c:if test="${ sessionScope.userType != null  }">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
<%-- 				<%@include file="Menu_Header.jsp"%> --%>
			<%@include file="Menu_Header_Nobel.jsp"%>
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
											<li><a href="pathology_dashboard.jsp">LIS</a></li>
											<li>Lab Formula</li>
											<div class="pull-right">
												<button class="btn btn-xs btn-success"
													onclick="saveLabFormula1()">Save</button>
											</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->

							<div class="col-md-12-1">
								<div style="border: 1px solid #436a9d;" id="infoDiv"  class="col-md-4-1">
									<div
										style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold; color: #FFF; text-align: center;'>
										Headings</div>
									<div id="HeadingDiv" style='width: 100%; overflow-y: scroll; height: 250px'>
										<table id="headingTable" style="overflow: auto;" class="table table-bordered table-hover table-responsive">
											<tbody id="headingTableBody" style="overflow-x: scroll; border: 1px solid #436a9d;"></tbody>
										</table>
									</div>
								</div>

								<div
									style="border: 1px solid #436a9d;" class="col-md-4-1">
									<div
										style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold; color: #FFF; text-align: center;'>
										Titles</div>
									<div id="testDiv"
										style='width: 100%; height: 250px; overflow-y: scroll;'></div>
								</div>

								<div
									style="border: 1px solid #436a9d;"
									id="infoDiv" class="col-md-4-1">
									<div
										style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold; color: #FFF; text-align: center;'>
										Fields</div>
									<div id="assignTestDiv"
										style='width: 100%; overflow-y: scroll; height: 250px'></div>
								</div>
							</div>

						
						
							<div
								style=" margin-top: 20px; border: 1px solid #436a9d;" class="col-md-3-1">
								<div
									style='width: 98.1%; background-color: #436a9d; padding: 3px; font-weight: bold; color: #FFF; text-align: center;'>
									First Half Of Formula</div>
								<div style="width: 100%;">
									<input
										style="width: 98%; margin-top: 13px; margin-bottom: 13px;"
										onclick="setFormilaSideInducator('FH')" id="txtFHform">
								</div>
							</div>
							<div style="padding: 10px; margin-top: 41px;"  class="col-md-1-1 center">
								<b style="font-size: 20px;">=</b>
							</div>
							
							
							<div
								style=" border: 1px solid #436a9d; margin-top: 20px;float: right;"
								id="infoDiv"  class="col-md-8-1">
								<div
									style='width: 99.2%; background-color: #436a9d; padding: 3px; font-weight: bold; color: #FFF; text-align: center;'>
									Second Half Of Formula</div>
								<div>
									<textarea rows="1" cols="115"
										style="margin-top: 5px; margin-bottom: 5px;"
										onclick="setFormilaSideInducator('SH')" id="texArSHform"></textarea>
								</div>
							</div>
							<div
								style=" border: 1px solid #436a9d; margin-top: 10px;float: right;"
								id="infoDiv"  class="col-md-8-1">
								<div
									style='width: 99.2%; background-color: #436a9d; padding: 3px; font-weight: bold; color: #FFF; text-align: center;'>
									Operators</div>
								<div>
									<input type="button" value="+" style="margin: 5px;"
										title="Plus" onclick="sendSymbToSH('+')"><input
										type="button" value="-" style="margin: 5px;" title="Minus"
										onclick="sendSymbToSH('-')"><input type="button"
										style="margin: 5px;" value="*" title="Multiply"
										onclick="sendSymbToSH('*')"><input type="button"
										style="margin: 5px;" value="/" title="Divide"
										onclick="sendSymbToSH('/')"><input type="button"
										style="margin: 5px;" value="(" title="Open Parentheses"
										onclick="sendSymbToSH('(')"><input type="button"
										style="margin: 5px;" value=")" title="Close Parentheses"
										onclick="sendSymbToSH(')')"><input type="button"
										style="margin: 5px;" value="**" title="Power"
										onclick="sendSymbToSH('**')">
								</div>
							</div>
							
							
							
							<div
								style=" margin-top: 10px; text-align: center; margin-right: 27px;"  class="col-md-3-1 center">
								<!-- <input name="#login-box" class="login-window edit" type="submit"
									id="submit" value="View Lab Formula"
									onclick="featchLabFormulas()" /> -->
								<input class=" btn btn-xs btn-primary" name="#login-box" id="submit" value="View Lab Formula" type="button"  onclick="featchLabFormulas()" value="Search">
							</div>

							</div>

							

						
					</div>
				</div>
			</div>
		</div>
		<%@include file="Footer.jsp"%>

		<div style="display: none;" id="featchProAndTestTemp">
			
		</div>

		<div id="iPopupFormula" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-11-1"
					style="margin-top: 7%; margin-left: 9%;">
					<div class="modal-header">
						 
						  <h4>Lab Formula:</h4>
						  <div style="margin-left: 85%;margin-top:-6%">
						   <button class="btn btn-xs btn-danger" aria-label="Close"
								title="Close" data-dismiss="modal" type="button"
								style="margin-top: 0%; margin-left: 0%"
								onclick="hideiPopupFormula()">
								<i class="fa fa-times"></i>
							</button>

							<button class="btn btn-xs btn-success" title="Edit"
								style="margin-top: 0%; margin-left: 0%" data-original-title="savepass " data-toggle="tooltip"
								data-placement="left" onclick="editLabFormula1()">
								<i class="fa fa-edit"></i>
							</button>

							<button class="btn btn-xs btn-danger" aria-label="Delete Formula"
								title="Delete Formula" data-dismiss="modal" type="button"
								style="margin-top: 0%; margin-left: 0%"
								onclick="deleteLabFormula1()">
								<i class="fa fa-trash-o"></i>
							</button>
                         </div>

						</div>
						<div class="modal-body">

						<div class="col-md-12-1" id="divbyName">
							<label> <span> Search Value: <input id="byName" onkeyup="labFormulaAutoSugg(this.id);"
									type="text" style="width: 200px;" value=""> <input
									class="btn btn-xs btn-primary" type="button"
									style="width: 50px;"
									value="Search">
							</span>
							</label>
						</div>

						<div class="panel">
							<div class="panel-body" style="overflow: auto; height: 300px">
								<table id="ehatTable"
									class="datatable table  table-bordered">
									<thead id="ehatTHead">
										<tr>
											<th class="col-md-1 center">#</th>
											<th class="col-md-1 center">Test Name</th>
											<th class="col-md-1 center">Formula</th>										
										</tr>
									</thead>

									<tbody id="formulalist">
									</tbody>
								</table>
							</div>
						</div>						
					</div>

				</div>
			</div>
		</div>

		<input type="hidden" id="selIndi" value="FH">
		<input type="hidden" id="leftSide">
		<input type="hidden" id="rightSide">

		<input type="hidden" id="resultTestId">
		<input type="hidden" id="idLabFormula" value="0">

		<div style="display: none;" id="labFormulasData"></div>

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>