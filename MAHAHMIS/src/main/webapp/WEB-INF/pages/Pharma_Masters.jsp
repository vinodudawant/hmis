
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<link
	href="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">

<!-- JQUERY -->
<script
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>


<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/js/jqx-widgets/jqx.base.css"/>">

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>

<%-- <script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxchart.js"/>"></script> --%>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdraw.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxchart.core.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/jqx-widgets/pie.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_nearexpiry.js"/>"></script>
	
<style type="text/css">
.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('../.././pharmacy/resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
</head>


<%-- <%
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
	"dd/MM/yyyy");
	String date = simpleDateFormat.format(new Date());
%> --%>

<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements

		getTotalSaleData();

		getMinLevelProduct();

		getPendingIndent();

		getHospitalPaymentDetails();

		fetchBatchDetailsByExpiry();
		
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
		
		setUserAccess();
	});
	
	
	function setUserAccess() {

		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../../pharmacy/access/setUserAccessSession",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
			}
		});
	}

	function getTotalSaleData() {

		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../.././pharmacy/purchase/getTotalSaleByDate",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				sample(r);

			}
		});
	}

	function getMinLevelProduct() {
		$('#loadingImage1').show();
		jQuery
				.ajax({
					async : true,
					type : "GET",
					url : "../../pharmacy/productMinLevel/getMinLevelProductListnew",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						
						setNotificationData(r);
						$('#loadingImage1').css({'z-index':'1000000','margin-top':'10%'});
						$('#loadingImage1').hide();
						
					}
				});
	}

	function getHospitalPaymentDetails() {
		/* $('#loadingImage').show(); */
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../../pharmacy/common/getHospitalPaymentDetails",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				var result = $.parseJSON(r);
				setHospitalPaymentData(result);
			}
		});
	}

	function setHospitalPaymentData(result) {

		var divContent = "";
		if (result.length > 0) {

			for ( var i = 0; i < result.length; i++) {
				divContent = divContent
						+ "<a onclick='fetchHospitalPaymentDetailsById("+result[i].receiveId+")'><div class='well well-sm'><strong>Date Name-</strong>"
						+ result[i].hospitalDate
						+ "&nbsp;&nbsp;&nbsp;<strong>Narration-</strong>"
						+ result[i].narration
						+ "&nbsp;&nbsp;&nbsp;<strong>Paid By Hospital-</strong>"
						+ result[i].paidByHospital
						+ "&nbsp;&nbsp;&nbsp;<strong>Receive By Hospital-</strong>"
						+ result[i].receiveByHospital;
				if (result[i].isRead == '0') {
					divContent = divContent
							+ "&nbsp;&nbsp;&nbsp;<span style='background-color:red' class=badge>New</span>";
				}
				divContent = divContent + "</a></div>";
			}
			$('#loadingImage').hide();
			$('#hospitalPaymentDetails').html(divContent);

		} else {
			$('#well')
					.append(
							"<div class='well well-sm'><strong>No Details Available</h4></strong>");
			$('#loadingImage').hide();
		}
	}
	
	function fetchHospitalPaymentDetailsById(receiveId)
	{
		jQuery.ajax({
			async : true,
			type : "GET",
			data:
				{
					receiveId:receiveId,
				},
			url : "../../pharmacy/common/getHospitalPaymentDetailsById",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				
				var result=$.parseJSON(r);
				$("#hospital_pop_up").dialog({ title: "Hospital Payment Details",modal: true,width:500});
				
				$("#popUpHospitalPaymentData").html("<div class='col-md-12-1' style='margin-top:9px;'><div class='col-md-6-1'>Patient Name :</div>  <div class='col-md-6-1'>"+result.fName+" "+result.mName+" "+result.lName+"</div></div>");
				$("#popUpHospitalPaymentData").append("<div class='col-md-12-1' style='margin-top:9px;'><div class='col-md-6-1'>Date :</div>  <div class='col-md-6-1'>"+result.hospitalDate+"</div></div>");
				$("#popUpHospitalPaymentData").append("<div class='col-md-12-1' style='margin-top:9px;'><div class='col-md-6-1'>Paid By Hospital :</div>  <div class='col-md-6-1'>"+result.paidByHospital+"</div></div>");
				$("#popUpHospitalPaymentData").append("<div class='col-md-12-1' style='margin-top:9px;'><div class='col-md-6-1'>Receive By Hospital :</div>  <div class='col-md-6-1'>"+result.receiveByHospital+"</div></div>");

			}
		});
	}
	
	function closePopUp()
	{
		$('#hospital_pop_up').dialog('close');
		getHospitalPaymentDetails();
	}

	function setNotificationData(result) {
		if (result.length > 0) {
			for ( var i = 0; i < result.length; i++) {
				$('#well')
						.append(
								"<div class='well well-sm'><strong>Product Name-</strong>"
										+ result[i].productName
										+ "&nbsp;&nbsp;&nbsp;<strong>MinLevel-</strong>"
										+ result[i].minLevel
										+ "&nbsp;&nbsp;&nbsp;<strong>MaxLevel-</strong>"
										+ result[i].maxLevel
										+ "&nbsp;&nbsp;&nbsp;<strong>Available Stock-</strong>"
										+ result[i].stock + "</div>");
			}
			$('#loadingImage').hide();

		} else {
			$('#well')
					.append(
							"<div class='well well-sm'><strong>No Product Available</h4></strong>");
			$('#loadingImage').hide();
		}
	}

	function getPendingIndent() {
		$('#loadingImage2').show();
	/* 	$('#loadingImage').show(); */
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../../pharmacy/indentSale/getPendingIndentDetailsForMaster",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				 setIndentData(r); 
				$('#loadingImage2').css({'z-index':'1000000','margin-top':'10%'});
				$('#loadingImage2').hide();
			}
		});
	}

	 function setIndentData(result) {
		if (result.length > 0) {
			for ( var i = 0; i < result.length; i++) {
				$('#indentData')
						.append(
								"<div class='well well-sm'><strong>Indent Date-</strong>"
										+ getDate(result[i].indentDate)
										+ ""
										+ "&nbsp;&nbsp;&nbsp;<strong>Require Quantity-</strong>"
										+ (result[i].qty)
										+ "&nbsp;&nbsp;&nbsp;<strong>Received From-</strong>"
										+ result[i].indentReceivedFrom
										+ "</div>");
			}
			if (result.length > 0)
				$('#indentCount').append(
						"<span class='badge' style='background-color:red'>"
								+ result.length + "</span> Pending Indents");
			else
				$('#indentCount')
						.append(
								"<span class='badge' style='background-color:red'>0</span> Pending Indents");

		} else {
			$('#indentData')
					.append(
							"<div class='well well-sm'><strong>No Pending Indent Available</strong></div>");

		}
	} 
/* 	 function totalQty(result, currentNumber) {
		var total = 0;
		for ( var j = 0; j < result[currentNumber].ltIndentSlave.length; j++) {
			if ((result[currentNumber].ltIndentSlave[j].indentSlaveRequireQty) != "null"
					&& parseInt(result[currentNumber].ltIndentSlave[j].indentSlaveRequireQty) > 0) {
				total = (total + parseInt(result[currentNumber].ltIndentSlave[j].indentSlaveRequireQty));
			}
		}
		return total;
	} */
 
	function getDate(milliseconds) {
		var d = new Date(milliseconds);
		var dd = d.getDate();
		var mm = d.getMonth() + 1; // January is 0!

		var yyyy = d.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}

		return dd + '/' + mm + '/' + yyyy;
	}

	function getMinLevelProductPdf(){
		window.open("../../pharmacy/productMinLevel/MinLevelProductPdf");
	}
	
	function getNearExpiryProductPdf(){
		window.open("../../pharmacy/report/getExpiryAllPage");
	}
	
</script>

<body style="background: white ! important;">
	<section id="page">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_masters.jsp"%>
			<%@include file="pharma_store_mrn_store_pop_up.jsp"%>


			<!-- 			content -->

			<input type="hidden" id="userID" />

			<div id="main-content">
				<div class="container">
					<div class="divide-20"></div>
					<div class="col-md-12-1">

						<div class="col-md-6-1">
							<div class="box border inverse">
								<div class="box-title">
									<h4>
										<i class="fa fa-bitbucket"></i>Today's Total Daily Sale
										CounterSale,IndentSale,HospitalSale,PatientSale
									</h4>
									<div class="tools">
										<a href="#box-config" data-toggle="modal" class="config">
											<i class="fa fa-cog"></i>
										</a>
										<!-- <a href="javascript:;" class="reload">
												<i class="fa fa-refresh"></i>
											</a> -->
										<a href="javascript:;" class="collapse"> <i
											class="fa fa-chevron-up"></i>
										</a> <a href="javascript:;" class="remove"> <i
											class="fa fa-times"></i>
										</a>
									</div>
								</div>
								<div class="box-body "
									style="height: 350px; overflow-y: Scroll; width: 100%;">

									<div id='piechart'
										style="width: 480px; height: 400px; position: relative; left: 0px; top: 0px;">
									</div>
									<!-- <div class="well well-lg"><h4>Large Well</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi nunc, rutrum quis tincidunt ac </div>
										<div class="well well-sm"><h4>Small Well</h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi nunc, rutrum quis tincidunt ac </div> -->

								</div>
							</div>


						</div>

						<div class="col-md-6-1"
							style="padding-left: 1%; padding-right: 0%;">
							<div class="box border purple" class="col-md-3-1">
								<div class="box-title" style="background-color: #a696ce">
									<h4>
										<i class="fa fa-bitbucket"></i>Product Below Min Level
									</h4>
									<div class="tools">
									
									<!-- <a href="#box-config" data-toggle="modal" class="config" onclick = "getMinLevelProductPdf()">
											<i class="fa fa-print"></i>
										</a> -->
										<a href="#box-config" data-toggle="modal" class="config">
											<i class="fa fa-cog"></i>
										</a>
										<!-- <a href="javascript:;" class="reload">
												<i class="fa fa-refresh"></i>
											</a> -->
										<a href="javascript:;" class="collapse"> <i
											class="fa fa-chevron-up"></i>
										</a> <a href="javascript:;" class="remove"> <i
											class="fa fa-times"></i>
										</a>
									</div>
								</div>
								<div class="box-body " id="well"
									style="height: 150px; overflow-y: Scroll; width: 100%;">

									<div style="display: none; overflow: hidden; margin-top:20%" id="loadingImage1"
										class="center">
										<img
											src="../.././images/ajax-loader(1).gif">
									</div>
									

						<!-- svgChart -->		</div>
							</div>
							
							<div class=""
							style="padding-left: 0%; padding-right: 0%; margin-top: -3%;">
							<div class="box border purple">
								<div class="box-title" style="background-color: #a696ce">
									<h4>
										<i class="fa fa-bitbucket"></i>Product Near Expiry
									</h4>
									<div class="tools">
									
									<!-- <a href="#box-config" data-toggle="modal" class="config" onclick = "getNearExpiryProductPdf()">
											<i class="fa fa-print"></i>
										</a> -->
										<a href="#box-config" data-toggle="modal" class="config">
											<i class="fa fa-cog"></i>
										</a>
										
										<a href="javascript:;" class="collapse"> <i
											class="fa fa-chevron-up"></i>
										</a> <a href="javascript:;" class="remove"> <i
											class="fa fa-times"></i>
										</a>
									</div>
								</div>
								<div class="box-body " id="nearexpiryp"
									style="height: 141px; overflow-y: Scroll; width: 100%;">

									<div style="display: none; overflow: hidden; margin-top:20%" id="loadingImage5"
										class="center">
										<img
											src="../.././images/ajax-loader(1).gif">
									</div>
									

								</div>
							</div>
						</div>
							
						</div>

					</div>

					<div class="col-md-12-1">
						<div class="col-md-6-1 box-container ui-sortable">
							<!-- BOX WITHOUT ICONS-->
							<div class="box border purple" style="display: none;">
								<div class="box-title" style="background-color: #a696ce;  ">
									<h4 id='maxProduct'>Hospital Payment Report</h4>
									<div class="tools">
										<a class="config" data-toggle="modal" href="#box-config">
											<i class="fa fa-cog"></i>
										</a>
										<!-- <a class="reload" href="javascript:;">
												<i class="fa fa-refresh"></i>
											</a> -->
										<a class="collapse" href="javascript:;"> <i
											class="fa fa-chevron-down"></i>
										</a> <a class="remove" href="javascript:;"> <i
											class="fa fa-times"></i>
										</a>
									</div>
								</div>
								<div class="box-body" id='hospitalPaymentDetails'
									style="height: 150px; overflow-y: Scroll; width: 100%;">

								</div>
							</div>
							
						</div>

						<div class="col-md-6-1 box-container ui-sortable"
							style="padding-left: 1%; padding-right: 0%;">
							<!-- BOX WITHOUT ICONS-->
							<div class="box border inverse" style="">
								<div class="box-title">
									<h4 id='indentCount'>Indent Notification-You Have</h4>
									<div class="tools">
										<a class="config" data-toggle="modal" href="#box-config">
											<i class="fa fa-cog"></i>
										</a>
										<!-- <a class="reload" href="javascript:;">
												<i class="fa fa-refresh"></i>
											</a> -->
										<a class="collapse" href="javascript:;"> <i
											class="fa fa-chevron-down"></i>
										</a> <a class="remove" href="javascript:;"> <i
											class="fa fa-times"></i>
										</a>
									</div>
								</div>
								<div class="box-body" id='indentData'
									style="height: 150px; overflow-y: Scroll; width: 100%;">

										<div style="display: none; overflow: hidden;" id="loadingImage2"
										class="center">
										<img
											src="../.././images/ajax-loader(1).gif">
									</div>
						
								</div>
							</div>
							<!-- /BOX WITHOUT ICONS-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div>
			<!-- Place at bottom of page -->
		</div>
		<%-- </c:if> --%>

		<div id="hospital_pop_up" class="modal fade in" style="width:400px;">
			<div class="col-md-12-1" style='margin-top:10px;'>
				<div class='col-md-4-1'>
					<img style="margin-right: 0px; margin-left: 0px; margin-top: 0px; height: 175px;" alt="Patient Image" class="img-responsive" id="patImg" name="patImg" src="../../images/patientPhoto.jpg">
				</div>
				
				<div class='col-md-8-1'>
					<div class='col-md-12-1'>
						<center>Patient Information</center>
						<div class='col-md-12-1' style='margin-top:10px;margin-left:10px' id='popUpHospitalPaymentData'></div>
						
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<div class="form-group col-md-7-1" style="margin-top: 15px;">
					<button type="button" class="btn btn-primary"
						id="btnSubContractingMaterialIssueSave"
						name="btnSubContractingMaterialIssueSave"
						onclick="closePopUp()">Ok</button>
					<button type="button" class="btn btn-default" data-dismiss="modal" onclick="closePopUp()">Cancel</button>
				</div>
			</div>

		</div>

		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</section>
	<%-- <input type="hidden" id="txtDate" value="<%=date%>"> --%>
</body>
</html>