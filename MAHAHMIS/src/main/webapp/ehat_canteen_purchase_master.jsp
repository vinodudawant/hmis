<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>EhatEnterprise |CANTEEN PURCHASE</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
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


<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />

<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">

<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />

<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script>




<script src="js/ehat_canteen_purchase_master.js"></script>


</head>
<body>
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="left_menu_canteen.jsp"%>

		<!-- /SIDEBAR -->
		<div id="main-content">

			<div class="container">
				<div class="row">


					<% ResourceBundle resource = ResourceBundle.getBundle("Ehat");
                      String canteenid=resource.getString("canteenid");
                      Integer canteenids= Integer.parseInt(canteenid); %>


					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header">
									
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li>Canteen Managment system</li>
										<li class="li pull-right"></li>

									</ul>

								</div>
							</div>
						</div>


						<div id="canteendetails" class="col-md-12-1">
							<div class="row">
								<div style="margin-top: -30px"
									class="container box border green panel">

									<div id="canteendiv" class="box-body big ">

										<div class="form-group col-md-3">
											<div class="form-group">
												<div class="col-md-12">
													<div class="select2-container col-md-12"
														id="s2id_listmstr_select" style="width: 100%">
													<input
															class="select2-focusser select2-offscreen"
															id="s2id_autogen1" type="text">
														<div
															class="select2-drop select2-display-none select2-with-searchbox">
															<div class="select2-search">
																<input autocomplete="off" autocorrect="off"
																	autocapitalize="off" spellcheck="false"
																	class="select2-input" type="text">
															</div>
															<ul class="select2-results">
															</ul>
														</div>
													</div>
													<select class="col-md-12 select2-offscreen" name="listmstr"
														id="listmstr_select" style="width: 100%"
														onchange="setDyanamicDiv2('dynamicItem',this.id)"
														tabindex="-1"><option id="firstElmts" value="0">--- Select Category
																				---</option></select>
													<div
														class="col-md-12 select2-container select2-container-multi "
														style="margin-top: 2%; width: 100%">
														<ul id="dynamicItem" class="select2-choices"
															style="overflow-y: scroll; min-height: 70px">
														</ul>
													</div>
												</div>
											</div>
										</div>
										<div style="width: 18%;" class="form-group col-md-3 ">
											<label class="control-label">Purhase Item Name</label><input
												type="text" maxlength="150" placeholder="Item Name"
												id="itemName" title="">

										</div>
								       <div style="width: 18%;" class="form-group col-md-3 ">
											<label class="control-label">Purhase Code Name</label><input
												type="text" placeholder="Code Name" id="codename">
										</div>
										
										
									<div class="form-group col-md-3"> 
	<div class="col-sm-6"> 
			<label for="input-type" class="control-label">Is Category</label> 
			<div id="input-type" class="row"> 
					<div class="col-sm-6"> 
			<label class="radio-inline"> <input 
						name="privilegesType" id="isCategory" value="Y" 
					type="radio" checked="checked" />Yes 
					</label> 
					</div> 
			<div class="col-sm-6"> 
					<label class="radio-inline"> <input 
					 name="privilegesType" id="NoCategor" value="N" 
			 type="radio" />No 
					</label> 
			</div> 
			</div> 
		</div> 
		</div> 

										<div class="col-sm-1">
											<input type="button" value="Save(Ctrl + S)"
												onclick="saveitemmaster()" class="btn btn-success">
										</div>

									</div>

								</div>

							</div>


						</div>


						<div id="canteenList" class="col-md-12-1 panel body "
							style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">

							<div class="tab-content">

								<div id="canteenDiv" class="tab-pane fade in active">

									<div class="col-sm-12">
										<div class="pull-right">
											<div class="dataTables_filter" id="datatable1_filter">
												<label id="searchlabel"><input type="text"
													aria-controls="datatable1" placeholder="Search"
													onkeyup="autosugetionMaster(this.id)" id="byName"
													class="form-control input-sm"></label>
											</div>
										</div>

									</div>

									<table class="table table-hover cf "
										style="Width: 100%; margin-top: 5px;">
										<thead class="cf" style="background: white;">
											<tr>
												<th style="height: 21.5px;" class="col-md-1"><div>Sr
														No</div></th>
												<th style="height: 21.5px;" class="col-md-2"><div>Item
														Id</div></th>
												<th style="height: 21.5px;" class="col-md-2"><div>Item
														Name</div></th>

											
												<th style="height: 21.5px;" class="col-md-2"><div>Code
														Name</div></th>

												<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>


											</tr>
										</thead>

										<tbody id="canteenmaster">

										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>
		</div>
		<div id="pleaseWait" style="text-align: center; display: none;">
			<img style="margin-top: 250px;" height="43px"
				src="images/loading_black.gif" />
			<div style="margin-top: 10px; color: white">
				<b>Please wait...</b>
			</div>
		</div>


		<input type="hidden" id="serviceid" value="<%=canteenids%>"> <input
			type="hidden" id="subId" value="0">



		<%@include file="footer_nobel.jsp"%>
	</section>
	<!--/PAGE -->

	<!-- JAVASCRIPTS -->

	<script
		src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
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

	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			
			
			getlistCanteenMaster();
			fetchAllCategory();
		});
	</script>
	<script type="text/javascript">
		shortcut.add("Ctrl+s", function() {

			saveitemmaster();
		});
		
	</script>

</body>
</html>