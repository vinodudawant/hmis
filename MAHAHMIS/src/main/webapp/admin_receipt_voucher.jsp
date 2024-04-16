 <%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Receipt Voucher</title>
<meta name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
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

<!-- include js for development --><!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- <script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>

<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/report.js"></script>
<script type="text/javascript" src="js/district_taluka_city.js"></script> -->

<script type="text/javascript" src="js/voucher.js"></script>
<script type="text/javascript" src="js/administrator.js"></script>
<script type="text/javascript" src="js/ipdTreatment.js"></script>
<script type="text/javascript" src="js/admin_masters.js"></script>
<script type="text/javascript" src="js/admin_cash_voucher.js"></script>


</head>

<%
    java.util.Calendar currentDate = java.util.Calendar.getInstance();
    java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
            "dd-MM-yyyy");
    String todays_date = formatter.format(currentDate.getTime());
%>
<body>


    <c:if test="${ sessionScope.userType != null }">
        <!-- HEADER -->
        <header class="navbar clearfix" id="header">

            <%@include file="Menu_Header_Nobel.jsp"%>

        </header>
        <!--/HEADER -->

        <!-- PAGE -->
        <section id="page">
            <!-- SIDEBAR -->

            <%@include file="left_menu_admin.jsp"%>

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
                                            <%-- <li>Date : <%=todays_date%></li> --%>
                                                <li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
                                                </li>
                                                <li><a href="">Administrator</a></li>
                                                <li>Receipt Voucher</li>

                                        </ul>
                                        <!-- /BREADCRUMBS -->

                                    </div>
                                </div>
                            </div>

                            <div class="row">

                                <div class="col-md-12">
                                    <div class="col-sm-1">
                                        <label for="inlineFold" class="control-label">Search By</label>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="input-group" id="documentByName">
                                            <input class="form-control"    title="Please enter Tax name" id="byType" onkeyup="autoSuggRcptVchrCmnyNm(this.id,'auto');" type="text" placeholder="Company Name" data-name="taxValueTaxMaster">
                                            <span class="input-group-btn">
                                                <button class="btn btn-primary"    style="height: 25px; margin-bottom: 10px" type="button"    onclick="autoSuggRcptVchrCmnyNm(this.id,'search');">
                                                    <span class="fa fa-search" aria-hidden="true"> </span>
                                                    Search
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                   
                                    <div class="col-md-4">
                                        <button class="btn btn-xs btn-info pull-left" type="button" onclick="toggleEntryDiv('divForEntry')">
                                            <i class="fa fa-plus"></i> Add New Voucher
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="row">

                                <!-- NEW ORDERS -->
                                <div class="col-md-12">
                                    <div class="panel panel-default">
                                        <div class="panel-body">

                                            <div class="row">
                                                <div class="col-md-12" id="divForEntry" style="">
                                                    <div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Expense
																Voucher</div>
															<div class="panel-body">
																<form id="financialFormId">
																	<div class="row">

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Company Name:</label> <input
																				type="text" name="companyName" id="companyName"
																				placeholder="Company Name" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please enter Company Name">
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Received From: </label> <input
																				type="text" name="paymentTo" id="receivedFrom"
																				placeholder="Received From" style="width: 100%;"
																				class="form-control tip-focus"
																				title="Please enter Payment to">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Group Name: <b
																				style="color: red;">*</b></label> <select
																				onchange="getLedgerHeads(this.value)"
																				style="width: 100%" name="select"
																				id="vouchername">
																			</select>
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Ledger Head:</label> <select
																				style="width: 100%" name="select"
																				id="leadgerHeadsId">
																			</select>
																		</div>
																	</div>



																	<!-- -----2nd Row------- -->

																	<div class="row">

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Ref To:</label> <select
																				id="selRefTo" name="select" style="width: 100%">
																				<option value="0">--Select--</option>
																				<option value="1">OPD</option>
																				<option value="2">IPD</option>
																				<option value="3">Diagnostic</option>

																			</select>
																		</div>

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Total Amount:<b
																				style="color: red;">*</b></label> <input type="text"
																				placeholder="Total Amount"
																				onkeypress="return validateNumbers(event)"
																				id="txtAmount" style="width: 100%"
																				onkeyup="test_skill_voucher();">
																		</div>
																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Amount Paid: <b
																				style="color: red;">*</b></label> <input type="text"
																				maxlength="15" placeholder="Total Paid"
																				style="width: 100%;" id="amountPaid"  onkeypress="return validateNumOnly(event)"
																				onkeyup="ConvertAmountInWords('ExpVoucher')" />
																		</div>


																		<div class="form-group col-md-3">
																			<label for="inputEmail4">In Words:</label> <input
																				type="text" placeholder="In Words"
																				style="width: 100%;" id="amountInWords"
																				readonly="readonly" />
																		</div>
																	</div>


																	<!-- -----3rd Row------- -->

																	<div class="row">

																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Payment Mode:<b
																				style="color: red;">*</b>
																			</label> <select onchange="enterChequeNo()"
																				style="width: 100%" name="select" id="selAmountType">
																				<option value="0">-Select-</option>
																				<option value="1">Cash</option>
																				<option value="2">Cheque</option>
																			</select>
																		</div>


																		<div class="form-group col-md-3" id="chequeNo"
																			style="display: none;">
																			<label for="inputEmail4">Cheque Number: </label> <input
																				type="text" style="width: 100%;" maxlength="6"
																				onkeypress="return validateNumberByRegEx('chequeNumber')"
																				id="chequeNumber" onkeyup="test_skill_voucher()"
																				value="0">
																		</div>


																		<div class="form-group col-md-3">
																			<label for="inputEmail4">Remark: </label> <input
																				type="text" style="width: 100%" class="col-md-12-1"
																				id="txtRemark" placeholder="Remark"
																				onkeyup="test_skill_voucher()">
																		</div>

																		<div class="form-group col-md-3">
																			<button type="button"
																				class="btn btn-success editUserAccess"
																				onclick="saveReceiptVoucher();" disabled="disabled"
																				style="margin-top: 15px;">Save</button>

																			<button type="button" class="btn btn-warning"
																				onclick="clearVoucher()" style="margin-top: 15px;">Clear</button>
																			<button type="button" class="btn btn-danger"
																				onclick="deleteReceiptVoucher();"
																				style="margin-top: 15px;">Delete</button>
																			
																			
																			
																		</div>
																		<!-- <div class="form-group col-md-3">
																			<button type="button" 	class="btn btn-success editUserAccess"
																				onclick="printReceiptVoucher(receiptVoucherId)"
																				style="margin-top: 15px;">Print</button>
																		</div> -->
																	</div>

																</form>
															</div>

														</div>

													</div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="tabbable header-tabs">
                                                        <div class="row" style="margin-top: 5px">
                                                            <div class="col-md-12">
                                                                <div class="col-sm-12">
                                                                    <div class="pull-right">
                                                                        <div id="datatable1_filter" class="dataTables_filter">
                                                                            <label id="searchlabel"> </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="panel panel-primary">
                                                                    <div class="panel-heading" id="divEhatContent">Voucher Details</div>
                                                                    <div class="panel-body" style="overflow: auto;height: 400px">
                                                                        <table id="ehatTable" class="datatable table table-striped table-bordered">
                                                                            <thead id="ehatTHead">
                                                                                <tr>
                                                                                    <th class="col-md-1 center">#</th>
                                                                                    <th class="col-md-1 center">Date</th>
                                                                                    <th class="col-md-2 center">Company Name</th>
                                                                                    <th class="col-md-1 center">Mode</th>
                                                                                    <th class="col-md-1 center">Group</th>
                                                                                    <th class="col-md-2 center">Ledger Head</th>
                                                                                    <th class="col-md-1 center">Ref To</th>
                                                                                    <th class="col-md-1 center">Payment To</th>
                                                                                    <th class="col-md-1 center">Amount</th>
                                                                                    <th class="col-md-1 center">Paid Amount</th>
                                                                                    <th class="col-md-1 center">Edit</th>
                                                                                    <th class="col-md-1 center">Print</th>
                                                                                    <th class="col-md-1 center">Delete</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="container">
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
                            </div>
                            <!-- /NEW ORDERS -->

                        </div>

                        <div class="footer-tools">
                            <span class="go-top"> <i class="fa fa-chevron-up"></i> Top
                            </span>
                        </div>
                    </div>
                    <!-- /CONTENT-->
                </div>
            </div>            
            <div id="pleaseWait" style="text-align: center; display: none;">
                <img style="margin-top: 250px;" height="43px"
                    src="images/loading_black.gif" />
                <div style="margin-top: 10px; color: white">
                    <b>Please wait...</b>
                </div>
            </div>
            <%@include file="footer_nobel.jsp"%>
        </section>
        <!--/PAGE -->

        <!-- JAVASCRIPTS -->
       
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

    <script src="auto/jquery.mockjax.js"></script>
    <script src="auto/bootstrap-typeahead.js"></script>
    <!-- CUSTOM SCRIPT -->

    <script>
       
        jQuery(document).ready(function() {
            App.setPage("wizards_validations"); //Set current page
            App.init(); //Initialise plugins and elements  
            $(function() {
                $('[data-toggle="tooltip"]').tooltip();
               
            });

            $("#txtCharges").val(0);
            $("#txtpayMode").val("");
            $("#txtRemark").val("");
            $("#txtAmount").val(0);
            //$("#byType").val("");
            $("#queryType").val("insert");
            $("#expenceVoucher").addClass("anchorActive");
            viewReceiptVoucher("onload");
          //  expenseVoucherGroup();
            defaultViewVoucher('ledgerHead');
			getAuthorisedDoctorList();
			getGeneralVouchers();
			getAllCashVouchers();

           
        });
       
        function enterChequeNo() {
            var str = $('#selAmountType :selected').text();

            if (str == '-Select-') {
                $("#chequeNo").hide();
            } else if (str == 'Cheque') {
                $("#chequeNo").show();
            } else if (str == 'Cash') {
                $("#chequeNo").hide();
            }
        };
       
        function toggleEntryDiv(id){
           
            /*$("#"+id).slideToggle('slow', function() {
            });*/
            if(id == "divForEdit"){
          	  $("#divForEntry").show('slow');
              
            }else{
            	$("#divForEntry").toggle('slow');

            }     
        }
    </script>
    <input type="hidden" id=txttaxmastercode value="0">
    <input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
    <input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">

    <input type="hidden" id="queryType" name="queryType" value="insert" />
    <input type="hidden" id="ipdID" name="ipdID" value="" />
    <input type="hidden" id="idipdExpenceVoucher" name="idipdExpenceVoucher" value="0" />
    <div style="display: none;" id="DivResponse"></div>
    <div style="display: none;" id="DivIDResponse"></div>	
    <div id="hospDetails" style="display: none;"></div>
    <input type="hidden" id="page_name" value=""></input>
    <input type="hidden" id="ledgerHeadType" value="LedgerHeadGroup"></input>
    <input type="hidden" id="RowCount" name="RowCount" value="0" />
    <input type="hidden" id="vouName" value="0" />
    <input id="addRowCount" name="addRowCount" type="hidden" value="0" />
     <input id="recNo" name="recNo" type="hidden" value="" />
    <input id="bdate" name="bdate" type="hidden" value="<%=todays_date%>" />
    <input type="hidden" id="receiptVoucherId" name="receiptVoucherId" value="">
    
        <!-- /JAVASCRIPTS -->
    </c:if>
    <c:if test="${sessionScope.userType == null}">
        <jsp:forward page="index.jsp"></jsp:forward>
    </c:if>
</body>
</html>
 


