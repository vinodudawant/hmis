<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Masters</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
	
	
	<!-- STYLESHEETS --><!--[if lt IE 9]><script src="js/flot/excanvas.min.js"></script><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
	
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
		
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
		
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
		
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/modal/css/component.css" />
	
	<!-- FONTS -->
<!-- 	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'>
 -->	<script src="js/validate.js" type="text/javascript"></script>	
	<script type="text/javascript" src="js/commanAdv.js"></script>
	<!-- Auto-Suggestion 3/12/2014-->
   <script src="auto/jquery.mockjax.js"></script>
   <script src="auto/bootstrap-typeahead.js"></script>
	
	<!-- <script type="text/javascript" src="js/dept.js"></script>
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script type="text/javascript" src="js/serviceMaster.js"></script> -->
<!-- include js for development -->


<script type="text/javascript">
	onload = function() {
		refreshcommanadvMaster("onload");
		//getcommanadvMasterList();
		getcommanadvMasterListNew();
		getAllPayments();
		$("#pi_id").val(0);
		$("#pname").val("");
		$("#patientName").val("");
	} 
</script>

</head>
<body>
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="menu_HelpDesk.jsp"%>

		<!-- /SIDEBAR -->
		<div id="main-content">
			
			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header">
									<!-- STYLER -->

									<!-- /STYLER -->
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li>Masters</li>
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>

						<div class="row">
							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="box border">
									<div class="box-title">
										<h4>
											<i class="fa fa-columns"></i> <span
												class="hidden-inline-mobile">Common Advance Details </span>
										</h4>
									</div>
									<div class="box-body">
										<div class="tabbable header-tabs">
											
											<div class="box border green">

												<div class="box-body big" id="divEhatContent">
													<form class="form-horizontal col-md-1" role="form">
														<div class="form-group">
														
															<label class="control-label">Search By:</label>
															
														</div>
													</form>
												
												
													<form class="form-horizontal col-md-4" role="form">
														<div class="form-group">
														
															<label class="col-sm-4 control-label">Patient Name:</label>
															<div class="col-sm-8">
																<input class="typeahead form-control tip-focus"
																	title="Please enter Patient name" id="patientName"
																	type="text" placeholder="Patient Name" onkeyup="getPatientRecordscadv(this.id,'byname')">
															</div>
														</div>
													</form>
													
													

													<form class="form-horizontal col-md-3" role="form" >
														<div class="form-group">
															<label class="col-sm-4 control-label" id="lblCenterPatientId">Patient ID:</label>
															<div class="col-sm-8">
																<input class=" typeahead form-control tip-focus"
																	title="Please enter  UHID" id="pid"
																	type="text" placeholder="UHID" autocomplete="off">
															</div>
														</div>
													</form>

												

													<form class="form-horizontal col-md-2" role="form">
														<div class="form-group">
															<label class="col-sm-4 control-label"></label>
															<div class="col-sm-8">
																<input type="button" class="btn btn-primary"
																	onclick="getPatientRecordscadv('pid','bypid')" value="Search">
															</div>
														</div>
													</form>
												
												
                             <table border="1"
								class="table table-bordered table-striped table-condensed">
								<thead>
									<!-- <tr style="background-color: transparent;">
									<td colspan="2">Patient ID:<span id="patIDSpan"></span></td>
									<td colspan="2">Patient Name:<span id="patNamSpan"></span></td>
                    					
                  					</tr> -->
									<tr>
										<!-- <th>Date</th> -->
										<th>Patient Name</th>
										<th>Amount</th>
										<th id="threfund" style="display: none;">Refund Amount</th>
										<th>Narration</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<!-- <td><input style="background-color: #FFEFD5;" type='text'
											id="commonAd_Date" readonly="readonly"
											class='form-control input-SmallText' disabled="disabled" /></td> -->
										<td><input type='text' style="background-color: #FFEFD5;" id="pname"
											disabled="disabled" class='form-control input-SmallText' /></td>
										<td><input type='text' id="cadvAmt" onkeypress="return validateNumbers(event)"
									     class='form-control input-SmallText' />
									  
									     </td>
									     <td  class="col-md-2" style="display: none;" id="tdrefund">
									     <input type='text' id="refudAmt" onkeypress="return validateNumbers(event)"
									     class='form-control input-SmallText' value='0' />
									     </td>
										<td><input type='text' id="cadvNarr"
										 class='form-control input-SmallText' /><input
											type='hidden' id="commonAd_querytype" value='insert' /> <input
											type='hidden' id="commonAd_slaveId" value='0' /></td>
									</tr>
								</tbody>
							</table>
							
							<form class="form-horizontal col-md-3" role="form" >
														<div class="form-group">
															<label class="col-sm-4 control-label" >Department<span class="required text-danger">*</span></label>
															<div class="col-sm-8">
																<select name="department" id="department" class=" typeahead form-control tip-focus"
																						style="width: 125%; height: 100" >
																							<option value="0">--Select--</option>
																							<option value="11">All</option>
																							<option value="1">OPD</option>
																							<option value="2">IPD</option>
																							<option value="3">Diagnostic</option>
																							<option value="4">Casualty</option>
																</select>
															</div>
														</div>
													</form>
									<form role="form" class="form-horizontal col-md-4">
								<div class="form-group">
								<label class="col-sm-4 control-label">Paye Mode :</label>
								<div class="col-sm-8">
                               <select onchange="BankOnSelect();" style="width: 100%" id="payMode" class="form-control"></select>								</div>
								</div>
								</form>		
								<form role="form" class="form-horizontal col-md-2">	
								<table id="headerTable">	
										
											<!-- <tr>
												<td style="width: 50%"><label>payMode</label></td>
												<td>
													<select class="form-control" id="payMode" style="width: 100%" onchange="BankOnSelect();">
													</select>												
												</td>	
												<td>
													<button id="btnMultiple" style="display: none;" class="md-trigger" data-modal="modal-11">Multi</button>
												</td>																
												
											</tr> -->	
											
											<tr class="member">
												<td><label>Bank</label></td>
												<td>
													<select class="form-control" id="bankID" style="width: 100%">
														<option value="1">ICICI</option>
														<option value="2">HDFC</option>
														<option value="3">YES BANK</option>
														<option value="4">IDBI</option>
													</select>
												</td>																	
												
											</tr>	
											<tr class="member2">
												<td><label>Number</label></td>
												<td><input type="text" id="batchnumber"></td>
												
											</tr>
											<!-- <tr>
												<td><label>Number</label></td>
												<td><input type="text" id="bnumber"></td>
												
											</tr> -->
											
										<!-- 	<tr>
												<td><label>BankName</label></td>
												<td><input type="text" id="bName"></td>
												
											</tr> -->
																								
											<!-- <tr>
												<td><label>payable</label></td>
												<td><input type="text" id="payable" readonly></td>
												
											</tr> -->
											
										<!-- 	<tr id="trDisc" style="display: none;">
												<td><label>Discount (%)</label></td>
												<td><input type="text" id="discount" value="0" onkeyup="calDiscount()"></td>
												
											</tr>
											
											<tr id="trDiscAmt" style="display: none;">
												<td><label>Discount</label></td>
												<td><input type="text" id="discountAmt" value="0" onkeyup="calDiscountPer()"></td>
												
											</tr> -->
											
										<!-- 	<tr id="discAuth" style="display: none;">
												<td><label>Autherized By</label></td>
												<td>
													<select id="discAuthSel" class="form-control">
														<option value="0">Select</option>
														<option value="1">Mangesh Virkar</option>
														<option value="2">Sameer</option>
														<option value="3">Anurag</option>													
														<option value="4">Vinod</option>														
													</select>	
												</td>
												
											</tr> -->
										<!-- 	
											<tr id="discNarrtn" style="display: none;">
												<td><label>Reason</label></td>
													<td>
													<select id="narrSel" class="form-control">														
													</select>	
												</td>
												
											</tr> -->
											
											<!-- <tr id="discRemark" style="display: none;">
												<td><label>Remark</label></td>
													<td>
													<input type="text" id="txtDiscRemk">
												</td>
												
											</tr> -->
											
											<!-- <tr style="display: none;" id="trRefPer">
												<td><label>Refund (%)</label></td>
												<td><input type="text" onkeyup="calRefundAmtOpd()" id="refPer"></td>
												
											</tr> -->
											
											<!-- <tr>
												<td><label>Now pay</label></td>
												<td><input type="text" id="payNow" value="0" onkeyup="calRefundPerOpd()"></td>
												
											</tr> -->	
											
										<!-- 	<tr>
												
												<td><label>Payee</label></td>
												<td>
													<select class="form-control" style="width: 100%" id="payee" onchange="showSponsor()">
														<option value="1">Patient</option>
														<option value="2">Sponsor</option>													
													</select>
												</td>		
											
											</tr>	 -->											
											
											<tr>
												<td></td>
												<td></td>
											</tr>
											
											<tr>
												<td></td>
												<td></td>
											</tr>	
																																		
										</table>	
										</form>				
							<form role="form" class="form-horizontal col-md-2">
								<div class="form-group">
								<label class="col-sm-4 control-label"></label>
								<div class="col-sm-8">
								<input type="button" value="Save" onclick="saveCommonAdvanceAmount()" class="btn btn-success editUserAccess">
								</div>
								</div>
							</form>		
								<form role="form" class="form-horizontal col-md-2">
								<div class="form-group">
								<label class="col-sm-4 control-label"></label>
								<div class="col-sm-8">
								<input type="button" value="Save And Print" onclick="saveCommonAdvanceAmount('printcadv')" style="display: none;"   class="btn btn-info editUserAccess">
								</div>
								</div>
								</form>		
								<!-- <div class="divide-20"></div> -->
								
                                </div>
                                <div class="box-body big" id="divRow2">
								</div>
								</div>
                                <div class="row" style="margin-top: 10px">
												<div class="col-md-12">
													<!-- BOX -->
													<div class="box border green" id="div1">
														<div class="box-title">
															<h4>
																<i class="fa fa-table"></i>Masters Data
															</h4>
									    	<label onclick="addCommonAdvance()" value="Add" id="addnewCommonAdvanceLabel" class="editUserAccess" style="padding-top: 0px; margin-bottom: 0px; margin-right: 34px; margin-left: 40px; font-size: 13px;">
									        <i class="fa fa-plus"></i> Add New Common Advance</label>
														</div>
														<div class="box-body" id="divEhatList" style="height: 300px;overflow: auto;" >
																												
															<table id="ehatTable" cellpadding="0" cellspacing="0" border="0"
																class="datatable table table-striped table-bordered table-hover">
																<thead id="ehatTHead">
																	<tr>
																		<th>#</th>
																		<th class="col-md-1 center hidden" >Patient ID</th>
																		<th id="thCenterPatientId">Patient ID</th>
																		
																		<th>Patient Name</th>
																		<th>Treatment Count</th>
																		<th >Date</th>
																		<th>Type</th>
																		<th >Receipt No</th>
																		<th>Add Amount</th>
																		<th>Deduct Amount</th>
																		<th>Refund Amount</th>
																		<th>Balance Amount</th>
																		<th>Narration</th>
																		<th>Edit</th>
																		<th>Refund</th>
																	    <th>Refund Receipt</th>
																		<th>Delete</th>
																		<th>Post</th>
																		<th>Print</th>
																		<!-- <th>Type</th>
																		<th>Type</th>	 -->
																		
																	</tr>
																</thead>
																<tbody id="cadvtbody">
																													
																	<!-- <tr class="gradeX">
																		<td>Trident</td>
																		<td>Internet Explorer 4.0</td>
																		<td class="hidden-xs">Win 95+</td>
																		<td class="center">4</td>
																		<td class="center hidden-xs">X</td>
																	</tr>
																	<tr class="gradeC">
																		<td>Trident</td>
																		<td>Internet Explorer 5.0</td>
																		<td class="hidden-xs">Win 95+</td>
																		<td class="center">5</td>
																		<td class="center hidden-xs">C</td>
																	</tr>
																	<tr class="gradeA">
																		<td>Trident</td>
																		<td>Internet Explorer 5.5</td>
																		<td class="hidden-xs">Win 95+</td>
																		<td class="center">5.5</td>
																		<td class="center hidden-xs">A</td>
																	</tr>
																
 -->																</tbody>
													<!-- 			<tfoot id="ehatTFoot">
																	<tr>
																		<th>Rendering engine</th>
																		<th>Browser</th>
																		<th class="hidden-xs">Platform(s)</th>
																		<th>Engine version</th>
																		<th class="hidden-xs">CSS grade</th>
																	</tr>
																</tfoot> -->
															</table>
														</div>
										
													<!-- /BOX -->
												</div>
												
												<!-- <div style="background: #dbdbdb; border-bottom: 1px #dbdbdb; border-top: 1px  #dbdbdb; margin-bottom: 1%; margin-top: 1%;" class="title col-sm-12-1">
												
												<label value='total' class="col-md-2-1" style="padding-top: 13px; font-size: 14px; color: blue;padding-left:1%">Total Amount Available -</label>
												<label style="padding-top: 13px; font-size: 14px; color: blue; padding-left:1%" class="col-md-1-1" id="totalCAdAvaliable"><span class="badge" style="background-color:red">1,000</span></label>
								                <label style="padding-top: 13px; font-size: 14px; color: blue; padding-left:5%" class="col-md-2-1" value="total">
									          Total Advance Amount -
								               </label> <label style="padding-top: 13px; font-size: 14px; color: blue;" class="col-md-1-1" id="totalCAdvance"><span class="badge" style="background-color:red">1,000</span></label>
								               <label style="padding-top: 13px; font-size: 14px; color: blue; padding-left:3%" class="col-md-2-1" value="total">
									          Total Paid Amount -
								              </label> <label style="padding-top: 13px; font-size: 14px; color: blue;" class="col-md-1-1" id="totalCAdPaid"><span class="badge" style="background-color:red">1,000</span></label>
								              <label style="padding-top: 13px; font-size: 14px; color: blue; padding-left:3%" class="col-md-2-1" value="total">
									         Total Refunded Amount -
								              </label> <label style="padding-top: 13px; font-size: 14px; color: blue; padding-left:1%" class="col-md-1-1" id="totalCAdrefund"><span class="badge" style="background-color:red">1,000</span></label>
												
												</div> -->
											</div>

										</div>
									</div>
								</div>
							</div>
							<!-- /NEW ORDERS -->
							<input id="cdrefundid" type="hidden" value="0">
						    <input id="actualrefund" type="hidden" value="0">
							<input id="commonadv_id" type="hidden" value="0">
							<input id="cadv_totalamt" type="hidden" value="0">
							<input id="pi_id" type="hidden" value="0">
							<input id="tr_id" type="hidden" value="0">
							<input id="print_val" class="hidden" value="0">
							<input id="refudAmtFINAL" type="hidden" value="0">
							<input id="deduct_amnt1" type="hidden" value="0">
							<input id="refundid" type="hidden" value="0">
							<input id="refunstatus" type="hidden" value="N">

						</div>
<div class="md-modal md-effect-11" id="modal-11"
		style="border-radius: 10px;">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">
				<!-- <button type="button" style="font-size: 1.5em; color: red" 
					class="md-close close" data-dismiss="modal">&times;</button> -->
				<center>
					<h4 class="modal-title">
						<b>Multiple Payment Modes</b>
					</h4>
				</center>				

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">						
							
							<div class="li pull-right" style="width: 100px">
								<button value="+" id="btnAddNew" type="button" style="margin: 7px;float: left;margin-left: 40px"
									class="btn btn-xs btn-success" onclick="toCreateTr()">+</button>
								<button value="_" id="btnDelete" type="button" style="margin: 7px;" 
									class="btn btn-xs btn-success" onclick="toRemoveTr('RowCount')">-</button>
							</div>

						</ul>
						<div class="divide-10"></div>
						
						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "
								id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">
											
											<div style="width: 100%;; font-weight: bold; height: 150Px;">
												
												<table border="1" class="table table-bordered table-striped table-condensed"
													id="multiPayTable">
													<thead>
														<tr>
															<th class="col-md-2-2 center">Select</th>
															<th class="col-md-2-1 center">Pay Mode</th>
															<th class="col-md-2-2 center">Amount</th>															
															<th class="col-md-2-1 center">Bank</th>
															<th class="col-md-2-2 center">Bank No.</th>
															<th class="col-md-2-2 center">Acc No.</th>															
														</tr>
													</thead>
													<tbody	style="overflow-y: scroll; border: 1px solid #436a9d;" id="multiPayTbody">
																							
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

				<!-- </div> -->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-3">
							<label for="email">Payable:</label> <input type="text"
								class="form-control" id="multiPayable" value="0"
								readonly="readonly">
						</div>
						
						<div class="form-group col-md-3">
							<label for="pwd">Pay Now :</label> <input type="text"
								class="form-control" id="multiPayNow" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-2">
							<label for="pwd">Remain :</label> <input type="text"
								class="form-control" id="multiRemain" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button" class="form-control btn btn-primary md-close"
								id="idForClose"	onclick="saveCommonAdvanceAmount()" data-dismiss="modal">Submit</button>							
						</div>
						
						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							
							<button type="button" id="idForCloseP" class="form-control btn btn-primary md-close"
								onclick="closePopup()" data-dismiss="modal">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>
						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
						<div style="display: none;" id="ajaxcadvresposnse"></div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>
		</div>
		</div>
		<%@include file="footer_nobel.jsp"%>
	</section>
	<!--/PAGE -->
	
<!-- JAVASCRIPTS -->
			<script src="ehat-design/modal/js/classie.js"></script>
	<script src="ehat-design/modal/js/modalEffects.js"></script>
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>
	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("dynamic_table");  //Set current page 
			App.init(); //Initialise plugins and elements  
			
		});
	</script>
		
<!-- /JAVASCRIPTS -->
	
</body>
</html>