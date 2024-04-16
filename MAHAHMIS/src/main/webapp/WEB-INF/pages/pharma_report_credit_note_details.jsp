<%@page import="java.util.Comparator"%>
<%@page import="java.util.Collections"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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


<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/pharma_productList_report.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/pharma_sale_register.js"/>"></script>
	
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_credit_Notes.js"/>"></script>	

</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements

		getAllUnit();
	});

	var total = 0;

	function loadPopUp() {

		var fromd = $("#popup_container2").val();
		var tod = $("#popup_container3").val();


		farr = fromd.split('/');
		tarr = tod.split('/');
		
		from = farr[2]+'-'+farr[1]+'-'+farr[0];
		to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];

		if (from != '' && to != '') {//&& $("#treatmentSelect").val() != null

			var inputs = [];
			//inputs.push('treatId=653');
			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getCreditNoteDetailsAll",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#patient_productwise_report").show();

					$("#treatmentIdSpan").html($("#treatmentSelect").val());

					setBatchWiseSaleResult(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}

	}

	function setBatchWiseSaleResult(r) {
		var divContent = "";
		total = 0;
		var free=0;
		
		var tbillamt        =0 ;
		var tbillamtwithgst =0 ;
		var tdiscount       =0;
		var tnetbillamt     =0;
		var tTaxableamt     =0;
		var tcgstper        =0;
		var tcgstamt        =0;
		var tsgstper        =0;
		var tsgstamt        =0;
		var tigstper        =0;
		var tigstamt        =0;
		var tcessper        =0;
		var tcessamt        =0;
		var tcdamtonper     =0;
		var totalgstAmt     =0;
		var totalGstper     =0;
		var totalfinalbill  =0;
		var totalgstamtaftercd=0;

		if (r.length > 0) {
			for ( var i = 0; i < r.length; i++) {

				var gstper =parseFloat(r[i].totalVat0);
				var gstAmt =parseFloat(r[i].totalVat5);
				var billAmt =parseFloat(r[i].netAmt);
				var discount =parseFloat(r[i].discount);
				var cdperc   =r[i].cdperc;

				var date1 = new Date(r[i].createddate);
				//var date2 =date1.toLocaleDateString('en-US');
				const yyyy = date1.getFullYear();
				let mm = date1.getMonth() + 1; // Months start at 0!
				let dd = date1.getDate();

				if (dd < 10) dd = '0' + dd;
				if (mm < 10) mm = '0' + mm;

				const formattedToday = dd + '/' + mm + '/' + yyyy;
				
				
				
				if (discount > 0) {
					peramt = parseFloat(((billAmt * discount) / 100));
					tamount = parseFloat(billAmt - peramt);
				} else {
					tamount =  parseFloat(billAmt);
				}
				
				
				var ftotal = parseFloat(tamount - gstAmt);
				var cdamtonper  = parseFloat(((ftotal * cdperc) / 100));
				var ftotalcdamt = ftotal - cdamtonper;

				var creditNoteType = r[i].creditNoteType;
				
				
				//after cd GST amount
				var gstamtaftercd =parseFloat((ftotalcdamt * gstper) /100);
				//final bill amount 
				var finalbill   = ftotalcdamt + gstamtaftercd;
				
				divContent = divContent
						+ '<tr><td>'+ (i + 1)+'</td>'
						+ '<td>'+ formattedToday +'</td>'
						+ '<td>'+ r[i].patientName+'</td>'
						
					if(creditNoteType=='counterSale'){	
						divContent = divContent +
							'<td>'+ "CS"+ r[i].counterSaleId+'</td>'
						
					}
					else if(creditNoteType=='patientSale'){	
						divContent = divContent +
						 '<td>'+ "PS"+r[i].patientSaleId+'</td>'
						
					}
					else if(creditNoteType=='indentSale'){	
						divContent = divContent 
						+ '<td>'+ "IS" + r[i].indentSaleId+'</td>'
					
					}
					divContent = divContent	
						+ '<td>'+ r[i].productName+'</td>'
						+ '<td>'+ r[i].hsnNo+'</td>'
						+ '<td>'+ billAmt.toFixed(2)+'</td>'
						
						+ '<td>'+ discount+'</td>'
						+ '<td>'+ tamount.toFixed(2)+'</td>'
						+ '<td>'+ ftotal.toFixed(2)+'</td>'
						
						+ '<td>'+ (gstper/2).toFixed(2) +'</td>'
						+ '<td>'+ (gstAmt/2).toFixed(2) +'</td>'
						
						+ '<td>'+ (gstper/2).toFixed(2) +'</td>'
						+ '<td>'+ (gstAmt/2).toFixed(2) +'</td>'
						
						+'</tr>';
						
			   tbillamt        =tbillamt + billAmt ;
			   tdiscount       =tdiscount + discount;
			   tnetbillamt     =tnetbillamt + tamount;
			   tTaxableamt     =tTaxableamt + ftotal;
			   tcgstper        =tcgstper + (gstper/2);
			   tcgstamt        =tcgstamt + (gstAmt/2);
			   tsgstper        =tcgstper;
			   tsgstamt        =tcgstamt;
			   
			   totalfinalbill  =totalfinalbill +finalbill;
			   totalgstamtaftercd=totalgstamtaftercd+gstamtaftercd;
			}
			divContent = divContent
			
			 + '<tr> '
			 + '</tr> '
			 
			 + '<tr> '
			 + '<td colspan="6" align="left">Total</td>'
			 + '<td >'+tbillamt.toFixed(2)+'</td>'
			 
			 + '<td >'+tdiscount.toFixed(2)+'</td>'
			 + '<td >'+tnetbillamt.toFixed(2)+'</td>'
			 
			 + '<td >'+tTaxableamt.toFixed(2)+'</td>'
			 
			 + '<td >0</td>'
			 + '<td >'+tcgstamt.toFixed(2)+'</td>'
			 + '<td >0</td>'
			 
			 + '<td >'+tsgstamt.toFixed(2)+'</td>'
			 + '</tr> ';
		
		} else {
			divContent = "<b><h3>No Record Found</h3></b>";
		}

		$("#saledetailswithgst").html(divContent);
	}

	function calculateTotalAmount(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			total = total + parseFloat(amount);
			$('#totalAmount').val(total.toFixed(2));
		}
	}

	function getTreatmentDetails(patientId) {

		var inputs = [];
		inputs.push('patientId=' + patientId);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../report/getTreatmentDetailsByPatientId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {

						var data = jQuery.parseJSON(r);
						var divContent = "<div class='col-md-4-1'><label for='product'>Select Treatment :</label></div><div class='col-md-6-1'><select id='treatmentSelect' name='treatmentSelect'>";

						for ( var i = 0; i < data.length; i++) {
							divContent = divContent
									+ "<option value="+data[i].treatmentId+">"
									+ data[i].treatmentId + " - "
									+ data[i].status + "</option>";
						}
						divContent = divContent + "</select></div>";
						$("#divTreatmentDetails").html(divContent);
					}
				});
		return true;
	}
</script>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
	"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>

<body style="background: white ! important;">
	<section id="page">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_reports.jsp"%>


			<!-- 			content -->

			<input type="hidden" id="userID" />
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
											<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
											<li>Sale Return Register Report</li>

											<!-- <li class="pull-right" id="template" style="display: none;">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getReportForPharmacyCompanyList();">Get
													Vendor Report</button> 
											</li> -->
											<li class="pull-right">
												<button id="btnExport"
													class="btn btn-xs btn-info pull-right" value="Excel"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Excel">Export To Excel</button> <script
													type="text/javascript">
														$("[id$=btnExport]")
																.click(
																		function(
																				e) {
																			window
																					.open('data:application/vnd.ms-excel,'
																							+ encodeURIComponent($(
																									'div[id$=salereportListwithgst]')
																									.html()));
																			e
																					.preventDefault();
																		});
													</script>
											</li>
										</ul>

									</div>
								</div>
							</div>


							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="col-md-12-1">


								<div id="companyReport" class="col-md-12-1"
									style="height: 50%; margin-top: -1%; padding-left: 20px; border: 1px solid #b8b8b8;">

									<div class="col-md-12-1" style="margin-top: 0%">

										<div class="col-md-4-1"
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>From:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">

												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="From Date" required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>To:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" class="form-control input-SmallText"
													placeholder="To Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px; display: none">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Doctor Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox1"
													class="form-control input-SmallText ui-autocomplete-input typeahead1"
													type="text" autocomplete="off" name="searchBox1"
													placeholder="Doctor Name"
													onkeyup="setAutoDoctorName('searchBox1','onload','OPD_Appoinment')">


											</div>
										</div>

									</div>

									<div class="col-md-12-1" style="display: none">

										<div class="col-md-4-1 "
											style="margin-top: 6px; margin-bottom: 10px;">


											<input type="radio" value="0" onclick="myFunction(1)"
												name="purTransType" id="rdoCashCredit"> <b>Credit</b>
											<input type="radio" value="1" style="margin-left: 2%;"
												onclick="myFunction(2)" name="purTransType" id="rdoCash">
											<b>Cash</b> <input type="radio" value="2"
												style="margin-left: 2%;" onclick="myFunction(3)"
												name="purTransType" id="rdoCard"> <b>Card </b> <input
												type="radio" value="3" checked="true"
												style="margin-left: 2%;" onclick="myFunction(3)"
												name="purTransType" id="rdoCard"> <b>All </b>


										</div>


										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Hospital Unit:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<select class="form-control input-SmallText" style=""
													id="unitId">

												</select>
											</div>
										</div>

									</div>

									<div class="col-md-12-1">



										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;display: none">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Patient Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox5"
													class="form-control input-SmallText ui-autocomplete-input typeahead3"
													type="text" autocomplete="off" name="searchBox5"
													placeholder="Patient Name"
													onkeyup="autoSuggestionForPateintNameIndentSale1('searchBox5', 'onchange');">
											</div>




										</div>



										<div style="margin-top: 0px; margin-bottom: 10px"
											class="col-md-4-1">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 5%;" onclick="loadPopUp()"
													id="getproductData" type="button"
													class="btn btn-xs btn-success">Get Data</button>
											</div>

										</div>
									</div>

								</div>

								<div class="col-md-12-1 panel-body"
									style="border: 2px solid; margin-top: 2%;"
									id="salereportListwithgst">
									<div class="col-md-12-1 center" style="margin-bottom: 10px;">


										<table>
											<thead>
												<tr>
													<th colspan="7" align="center"><h4
															id="titlesalewithgst" align="center">Sale Return
															Register Report</h4></th>
												</tr>
												<tr>
													<th align="center"></th>
												</tr>

											</thead>
										</table>

									</div>

									<div class="col-md-12-1"
										style='height: 485px; max-height: auto; overflow-x: scroll; overflow-y: scroll;'>

										<div class="tab-content">
											<div class="tab-pane fade in active">
												<table
													class='table table-bordered table-condensed cf table-fixed'
													style='margin-bottom: 9px; overflow-x: scroll; overflow-y: scroll; max-width: 1000%;'>
													<thead style="background-color: lightgray;">
														<tr>
															<th>Sr No</th>
															<th>DATE</th>
															<th>PATIENT NAME</th>
															
															 <th>INVOICE NO</th>
															<th>PRODUCT NAME</th>
															<th>HSN CODE</th>
															<th>BILL AMOUNT</th>
															<th>DISCOUNT AMT</th>
															
															<th>NET BILL AMOUNT</th>
															<th>TAXABLE AMOUNT</th>

															<th>CGST%</th>
															<th>CGST Amt</th>
															<th>SGST%</th>
															<th>SGST Amt</th>
														</tr>
													</thead>
													<tbody id="saledetailswithgst">
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
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<input type="hidden" id="hiddenProductId" value="0"> <input
			type="hidden" id="hiddencompanyId" value="0"> <input
			type="hidden" id="hiddencategoryId" value="0"> <input
			type="hidden" id="hiddenvendorId" value="0"> <input
			type="hidden" id="hiddenPatientId" value="0">

		<%-- </c:if>  --%>
	</section>
</body>
</html>