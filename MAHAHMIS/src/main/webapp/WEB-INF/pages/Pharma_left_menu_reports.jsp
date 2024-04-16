<%@page import="java.util.ResourceBundle"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="org.json.JSONArray"%>


<!-- SIDEBAR -->
<div id="sidebar" class="sidebar">
	<div class="slimScrollDiv"
		style="position: ; overflow: scroll; width: auto; height: 100%">
		<div class="sidebar-menu nav-collapse">

			<ul>
				<li id="list" class="has-sub"><a class="" href="#"> <span
						class="menu-text">List</span><span class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href="getCompanyListReportPageNew"><span
								class="sub-menu-text"></span> Company List</a></li>

						<li style="display: none;"><a class=""
							href="../report/getSupplierListReportPage"><span
								class="sub-menu-text"></span> Supplier List</a></li>
								
						<!-- <li><a class=""
							href="getProductAllListReportPageNew"><span
								class="sub-menu-text"></span> Product List</a></li> -->
								
						<li id="productList" class="has-sub-sub"
							style="margin-bottom: 10px;"><a href="javascript:;" class="">
								<span class="sub-menu-text">Product List</span> <span
								class="arrow"></span>
						</a>

							<ul class="sub-sub">
								<li style="display: none;"><a class=""
									href="../report/getmasterListReportPage"><span
										class="sub-menu-text"></span> Product Master List</a></li>
								<li><a class="" href="getProductAllListReportPage"><span
										class="sub-menu-text"></span> All</a></li>
								<li><a class="" href="getProductCompanyListReportPage"><span
										class="sub-menu-text"></span> Company Wise</a></li>
							</ul></li>
						<!-- <li id="productList" class="has-sub-sub"
							style="margin-bottom: 10px;"><a href="javascript:;" class="">
								<span class="sub-menu-text">Product List</span> <span
								class="arrow"></span>
						</a>

							<ul class="sub">
								<li style="display: none;"><a class=""
									href="../report/getmasterListReportPage"><span
										class="sub-menu-text"></span> Product Master List</a></li>
								<li><a class="" href="getProductAllListReportPage"><span
										class="sub-menu-text"></span> All</a></li>
								<li><a class="" href="getProductCompanyListReportPage"><span
										class="sub-menu-text"></span> Company Wise</a></li>
							</ul></li> -->

						<!-- 	<li  id="partyList" class="has-sub-sub"><a class="" href="javascript:;"><span
								class="sub-menu-text">Party List</span><span style="margin-top:0px;" class="arrow"></span></a>
								
							<ul class="sub-sub">
							
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span> Crditors List</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span> Creditors(Opening Bal)</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Debtor List</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Debtors(Opening Bal)</a></li>
							</ul></li>	 -->
						<li><a class="" href="../report/getDrugListReportPage"><span
								class="sub-menu-text">Drug List</span></a></li>
						<li><a class="" href="../report/getCreditListReportPage"><span
								class="sub-menu-text">Credit Note List</span></a></li>
						<li><a class="" href="../report/getDebitListReportPageNew"><span
								class="sub-menu-text">Debit Note List</span></a></li>
						<li><a class="" href="../report/getPartywiseDBNoteNew"><span
								class="sub-menu-text">Partywise DB Note</span></a></li>

						<li class="has-sub-sub"><a class="" href="javascript:;"><span
								class="sub-menu-text">Voucher List</span><span class="arrow"></span></a>
							<ul class="sub">
								<li><a class="" href="../report/getCashReceiptReportPageNew"><span
										class="sub-menu-text"></span> Cash Receipts</a></li>
								<li><a class="" href="../report/getCashPaidReportPageNew"><span
										class="sub-menu-text"></span> Cash Paid</a></li>
								<li><a class="" href="../report/getChequeReceiptReportPageNew"><span
										class="sub-menu-text"></span>Cheque Receipt</a></li>
								<li><a class="" href="../report/getChequePaidReportPageNew"><span
										class="sub-menu-text"></span>Cheque Paid</a></li>
							</ul></li>
						<!-- <li><a class="" href="doctorSpecialities.jsp"><span
								class="sub-menu-text">Group List</span></a></li> -->
					</ul></li>

				<li id="expiry" class="TextFont has-sub"><a href="#">Expiry<span
						class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href="getExpiryAllPage"><span
								class="sub-menu-text"></span>Near Expiry Report(All)</a></li>
					
						<li><a class="" href="getExpiryCompanyWisePage"><span
								class="sub-menu-text"></span>Near Expiry Report(CompanyWise)</a></li>
						<li><a class="" href="getExpiryShelfWisePage"><span
								class="sub-menu-text"></span>Near Expiry Report(Shelf)</a></li>
						<li><a class="" href="getExpiredProductReport"><span
								class="sub-menu-text"></span>Expired Products Report</a></li> 
					</ul></li>
				<li id="stock" class="TextFont has-sub"><a href="#">Stock<span
						class="arrow"></span></a>
					<ul class="sub">
					<li><a class="" href="getStockCurrentProductWisePage"><span
									class="sub-menu-text"> </span>Current Stock(ProductWise)</a></li>
						<li><a class="" href="getStockCurrentCompanyWisePage"><span
								class="sub-menu-text"></span>Current Stock(CompanyWise)</a></li>
						<li><a class="" href="getStockCurrentBatchWisePage"><span
								class="sub-menu-text"></span>Current Stock(BatchWise)</a></li>
						<!-- 	<li><a class="" href="getStockCurrentStoreWisePage"><span
								class="sub-menu-text"></span>Current Stock(StoreWise)</a></li>	 -->

						<!-- <li><a class="" href=""><span
								class="sub-menu-text"></span>OPENING STOCK BATCHWISE</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>STOCK REPORT WITH DRUG NAME</a></li> -->
						<li><a class="" href="getStockCurrentShelfWisePage"><span
								class="sub-menu-text"></span>SHELFWISE STOCK</a></li>
						<!--  <li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>STOCK CORRECTION</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>PRODUCT LEDGER</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>PRODUCT LEDGER BATCHWISE</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>NON-MOVING ITEMS</a></li>  -->
						<li><a class="" href="getProductBelowMinLevelPage"><span
								class="sub-menu-text"></span>ITEMS-BELOW MIN. LEVEL</a></li>
						<li><a class="" href="getStockCurrentCategoryWisePage"><span
								class="sub-menu-text"></span>CATEGORYWISE STOCK</a></li>

						<li><a class="" href="getStockCurrentDrugWisePage"><span
								class="sub-menu-text"></span>DRUGWISE STOCK</a></li>
						<li><a class="" href="../report/getStorewiseSaleReportPage"><span
								class="sub-menu-text"></span>STOREWISE STOCK</a></li>

						
						
						<!-- old hide 
						<li><a class="" href="getStockCurrentWisePage"><span
									class="sub-menu-text"> </span>Current Stock Report</a></li>
						<li><a class="" href="getProductBelowMinLevelPage"><span
								class="sub-menu-text"></span>Level-Wise Report</a></li>-->
						
					</ul></li>
				<li id="purchase" class="TextFont has-sub"><a href="#">Purchase<span
						class="arrow"></span></a>
					<ul class="sub">
						<li style="display: none;"><a class=""
							href="getPurchaseProductWiseandven"><span
								class="sub-menu-text"></span>PRODUCTWISE PURCHASE REPORT</a></li>
						<li style="display: none;"><a class=""
							href="getpurchaseDetails"><span class="sub-menu-text"></span>
								PURCHASE DETAILS REPORT</a></li>

						<li style="display: none"><a class="" href="getPurchaseProductWisePage"><span
								class="sub-menu-text"></span>PRODUCTWISE PURCHASE</a></li>
						<li><a class="" href="getPurchaseBatchWisePage"><span
								class="sub-menu-text"></span>BATCHWISE PURCHASE</a></li>
						<!-- <li><a class="" href="getPurchaseNewProductPage"><span
								class="sub-menu-text"></span>NEW PRODUCTS</a></li> -->
						<li><a class="" href="getPurchasePatyWisePage"><span
								class="sub-menu-text"></span>PARTYWISE PURCHASE BILLS</a></li>
						<!-- <li><a class="" href="getPurchasNewePatyWisePage"><span
								class="sub-menu-text"></span>PARTYWISE PURCHASE  Report</a></li>	 -->	
						<li><a class="" href="getPurchaseDiscountPage"><span
								class="sub-menu-text"></span>DISCOUNT REPORT</a></li>
						<li><a class="" href="getPurchaseDiscountPageNew"><span
								class="sub-menu-text"></span>DISCOUNT REPORT NEW</a></li>
						<!-- <li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>ALL PARTY SUMMARY WITH VAT</a></li>  -->
						<li><a class="" href="getPurchaseCategoryWisePage"><span
								class="sub-menu-text"></span>CATEGORYWISE PURCHASE</a></li>
						<li><a class="" href="getPurchaseCompanyWisePage"><span
								class="sub-menu-text"></span>COMPANY-WISE PURCHASE</a></li>
						<li><a class="" href="getPurchasePendingBillPage"><span
								class="sub-menu-text"></span>DUE PURCHASE BILLS</a></li>
						<li><a class="" href="getPurchaseDayBookReportPage"><span
								class="sub-menu-text"></span>Purchase Day Book Report</a></li>
<!-- 
						<li><a class="" href="getDaywisePurchasePage"><span
								class="sub-menu-text"></span>Daywise PURCHASE</a></li> -->
						<li><a class="" href="getPurchasePartywisePage"><span
								class="sub-menu-text"></span>J1(Party-Wise Purchase Information)</a></li>
						
						<!-- <li><a class="" href="getGRNreportPage"><span
								class="sub-menu-text"></span>GRN Report</a></li> -->
						<!-- 	<li><a class="" href="../report/getPartywiseLedgerPage"><span
								class="sub-menu-text"></span>Party Ledger</a></li>		 -->

					</ul></li>
				<li id="sales" class="TextFont has-sub"><a href="#">Sales<span
						class="arrow"></span></a>
					<ul class="sub">
						<li><a class=""
							href="../pharmacyReport/getSalesProductBatchReportPage"><span
								class="sub-menu-text"></span>PRODUCT-BATCH WISE</a></li>
					<!-- 	<li><a class=""
							href="../report/getSalesProductPartyReportPage"><span
								class="sub-menu-text"></span>PRODUCT-PARTY WISE</a></li> -->
						<!-- <li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>PARTYWISE SALE(DEBTOR)</a></li> -->
						<!-- <li><a class=""
							href="../report/getSalesPartyProductReportPage"><span
								class="sub-menu-text"></span>PARTY-PRODUCT WISE</a></li> -->
						<li><a class="" href="../report/getSalesDailySalesReportPage"><span
								class="sub-menu-text"></span>DAILY SALES REPORT</a></li>
						<li><a class=""
							href="../report/getSalesDailySalesReportStorewisePage"><span
								class="sub-menu-text"></span>DAILY SALES REPORT STOREWISE</a></li>
						<li><a class="" href="../report/getSalesTotalSalesReportPage"><span
								class="sub-menu-text"></span>Total SALES REPORT</a></li>
						<li><a class=""
							href="../report/getSalesTotalSalesWithPurchaseRateReportPage"><span
								class="sub-menu-text"></span>Total SALES WITH PURCHASE RATE
								REPORT</a></li>
						<li><a class="" href="../report/getSalesPatientVouwise"><span
								class="sub-menu-text"></span>PATIENT SALE(VOU.WISE)</a></li>
						<li><a class="" href="../report/getSalesPatientProductwise"><span
								class="sub-menu-text"></span>PATIENT SALES(PRODUCTWISE)</a></li>
						<!-- <li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>CASH SALE FROM-TO BILL RANGE</a></li> -->

						<!-- <li class="has-sub-sub"><a class="" href="javascript:;"><span
								class="sub-menu-text"></span>PENDING CC BILLS<span class="arrow"></span></a>
							<ul class="sub-sub">
								<li><a class="" href=""><span
										class="sub-menu-text"></span>All</a></li>
								<li><a class="" href=""><span
										class="sub-menu-text"></span> PATIENTWISE</a></li>
							</ul></li> -->
						<!-- 	<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>IPD/OPD SALE</a></li>  -->
						<li><a class="" href="../report/getSalesSchH1ReportPage"><span
								class="sub-menu-text"></span>SCH H1 SALES REPORT</a></li>

						<li><a class="" href="../report/getSalesSchXReportPage"><span
								class="sub-menu-text"></span>SCH X SALES REPORT</a></li>

						<li><a class="" href="../report/getSalesSchNDPSReportPage"><span
								class="sub-menu-text"></span>SCH NDPS SALES REPORT</a></li>

						<li><a class="" href="../report/getSalesSchNRXReportPage"><span
								class="sub-menu-text"></span>SCH NRX SALES REPORT</a></li>

						<li><a class=""
							href="../report/getSalesUserWiseDailySalesReportPage"><span
								class="sub-menu-text"></span>UserWise Daily SALES REPORT</a></li>

						<!-- 			            <li><a class="" href="../report/getAllSalesTotalPage"><span
								class="sub-menu-text"></span>J2</a></li>	
 -->
						<!-- <li><a class="" href="../report/getAllPatientSalesTotalPage"><span
								class="sub-menu-text"></span>J2</a></li> -->
								<!--AKshata Desai  -->
						<li><a class="" href="../pharmacyReport/getAllPatientSalesTotalPage"><span
								class="sub-menu-text"></span>J2</a></li>		
								

						<li><a class="" href="../pharmacyReport/getPatientLedgerReportPage"><span
								class="sub-menu-text"></span>Patient Ledger</a></li>

						<li><a class="" href="../pharmacyReport/getCancelIndentPage"><span
								class="sub-menu-text"></span>Cancel Indent </a></li>
								<li><a class="" href="../report/getCategoriwiseReportPageNew"><span
								class="sub-menu-text"></span>Category-wise Report </a></li>

					<!-- 	<li><a class="" href="../report/getCategoriwiseReportPage"><span
								class="sub-menu-text"></span>Category Wise Total Report </a></li>
								<li><a class="" href="../report/getCategoriwiseReportPage"><span
								class="sub-menu-text"></span>Category Wise Total Report </a></li>
								<li><a class="" href="getCategoriwiseReportPage"><span
								class="sub-menu-text"></span>Category Wise Total Report </a></li>
								
								<li><a class="" href="getCategoriwisedailysalereportPageNew"><span
								class="sub-menu-text"></span>Category Wise daily store report </a></li>

						<li><a class=""
							href="../report/getSpecificCategoriwiseReportPage"><span
								class="sub-menu-text"></span>Category Wise Report </a></li> -->

						<%
							ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
																					String hospitalName= bundle.getObject("hospitalname").toString();
																					/* String userType= bundle.getObject("user").toString(); */
																					
																					String sessionUserType=(String)session.getAttribute("userType");
																					
																					if(sessionUserType!=null)
																						if(hospitalName.equals("apple") && sessionUserType.equals("admin"))
																						{
						%>
						<li><a class="" href="../report/getFifthCounterPage"><span
								class="sub-menu-text"></span>SSR Counter Daily SALE</a></li>

						<li><a class="" href="../report/getFifthCounterTotalPage"><span
								class="sub-menu-text"></span>SSR Counter Total SALE</a></li>
						<%
							}
						%>

					</ul></li>
				<!--  <li class="TextFont has-sub"><a class="" href="javascript:;" ><span
								class="sub-menu-text"></span>Hospital
						Reports<span class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href=""><span
								class="sub-menu-text"></span>Statement List</a></li>
						<li><a class="" href=""><span
								class="sub-menu-text"></span>HOSPITAL SALE(ALL)</a></li>
						<li class="has-sub-sub"><a class="" href="javascript:;">
						<span class="sub-menu-text"></span>SALE SUMMARY<span class="arrow"></span></a>
							<ul class="sub-sub">
								<li><a class="" href=""><span
										class="sub-menu-text"></span>PATIENTWISE</a></li>
								<li><a class="" href=""><span
										class="sub-menu-text"></span>WARDWISE</a></li>
							</ul></li>
					</ul></li>  -->

				<!-- <li id="accounts" class="TextFont has-sub"><a href="#">Accounts<span
						class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>SALES REGISTER</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>PURCHASE REGISTER</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>CASH BOOK</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>BANK BOOK</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>General Ledger</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Creditors Ledger</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Debtors Ledger</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Sundry Creditors</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Sundry debtors</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Daily Cash Closing</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Final Accounts</a></li>
					</ul></li>  -->
				<!-- <li id="vat" class="TextFont has-sub"><a href="#">VAT<span
						class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href="getMonthWiseVatPurchasePage"><span
								class="sub-menu-text"></span>MonthWise Vat Purchase</a></li>
						<li><a class="" href="getDateWiseVatPurchasePage"><span
								class="sub-menu-text"></span>DateWise Vat Purchase</a></li>
						<li><a class="" href="getVouWiseVatPurchasePage"><span
								class="sub-menu-text"></span>Voucher Wise Vat Purchase</a></li>
						<li><a class="" href="getAllPartyWiseVatPurchasePage"><span
								class="sub-menu-text"></span>Partywise vat purchase</a></li>
						
					</ul></li> -->

				<li id="vat" class="TextFont has-sub"><a href="#">GST<span
						class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href="getMonthWiseVatPurchasePage"><span
								class="sub-menu-text"></span>MonthWise GST Purchase</a></li>
						<li><a class="" href="getDateWiseVatPurchasePage"><span
								class="sub-menu-text"></span>DateWise GST Purchase</a></li>
						<li><a class="" href="getVouWiseVatPurchasePage"><span
								class="sub-menu-text"></span>Voucher Wise GST Purchase</a></li>
						<li><a class="" href="getAllPartyWiseVatPurchasePage"><span
								class="sub-menu-text"></span>Partywise GST purchase</a></li>
						<li><a class="" href="getHsnWiseGSTPurchasePage"><span
								class="sub-menu-text"></span>HSN Wise GST Purchase</a></li>
						<li><a class="" onclick="fun1()"><span
								class="sub-menu-text"></span>GST Sale Report</a></li>
						<!-- <li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Vat on sale billwise</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Monthwise vat sale</a></li> -->
					</ul></li>


				<li class="TextFont has-sub"><a href="#">M.I.S. REPORTS<span
						class="arrow"></span>
				</a>
					<ul class="sub">
						<li><a class="" href="getMisDailyBusinessPage"><span
								class="sub-menu-text"></span>Daily Business Summary</a></li>

						<li><a class="" href="getItemLagderPage"><span
								class="sub-menu-text"></span>Item Ledger</a></li>

						<!--  <li class="has-sub-sub" style="margin-bottom:10px;"><a class="" href="javascript:;"><span
								class="sub-menu-text"></span>Changed Vouchers<span class="arrow"></span></a>
							<ul class="sub-sub">
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Changed sales bill</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Change purchase bill</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Changed cash receipts</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Changed cash paid</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Changed cheque receipts</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Changed cheque paid</a></li>
							</ul></li> 
							 -->
						<li class="has-sub-sub" style="margin-bottom: 10px;"><a
							class="" href="javascript:;"><span class="sub-menu-text"></span>Deleted
								Vouchers<span class="arrow"></span></a>
							<ul class="sub-sub">
								<li><a class=""
									href="../report/getSalesTotalDeletedSalesReportPage"><span
										class="sub-menu-text"></span>Deleted Sales bill</a></li>
								<li><a class="" href="../report/getDeletedPurchasePage"><span
										class="sub-menu-text"></span>Deleted Purchase bills</a></li>
								<li><a class=""
									href="../report/getCashReceiptDeletedReportPage"><span
										class="sub-menu-text"></span>Deleted cash receipts</a></li>
								<li><a class=""
									href="../report/getDeletedCashPaidReportPage"><span
										class="sub-menu-text"></span>Deleted cash paid</a></li>
								<li><a class=""
									href="../report/getChequeReceiptDeletedReportPage"><span
										class="sub-menu-text"></span>Deleted cheque receipts</a></li>
								<li><a class=""
									href="../report/getDeletedChequePaidReportPage"><span
										class="sub-menu-text"></span>Deleted cheque paid</a></li>
								<li><a class="" href="../report/getDeletedIndentSale"><span
										class="sub-menu-text"></span>Deleted Indent Sale</a></li>

							</ul></li>

						<!-- <li class="has-sub-sub" style="margin-bottom:10px;"><a class="" href="javascript:;"><span
								class="sub-menu-text"></span>Profit Report<span class="arrow"></span></a>
							<ul class="sub-sub">
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Daily Profit</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Monthly Profit</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Company wise profit</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Productwise profit</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Partywise profit Debtor</a></li>
							</ul></li>  -->
						<!-- <li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Daily cash Transaction</a></li>
								
						<li class="has-sub-sub" style="margin-bottom:10px;"><a class="" href="javascript:;"><span
								class="sub-menu-text"></span>Bank Statement<span class="arrow"></span></a>
							<ul class="sub-sub">
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>Companywise</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>ProductWise</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>categorywise</a></li>

							</ul></li> 
						 <li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Vat on sale billwise</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Stock in report</a></li>
	 -->
						<li><a class="" href="getMisStockOutPage"><span
								class="sub-menu-text"></span>Stock out report</a></li>
					</ul></li>
				<li id="credit Note" class="TextFont has-sub"><a href="#">Credit
						Note<span class="arrow"></span>
				</a>

					<ul class="sub">
						<li><a class="" href="getCreditNoteDetailsPage"><span
								class="sub-menu-text"></span>Credit Note Details</a></li>
					</ul></li>

				<li id="credit Note" class="TextFont has-sub"><a href="#">Pharmacy
						Collection<span class="arrow"></span>
				</a>

					<ul class="sub">
						<li><a class="" href="getPharmacyCollectionPage"><span
								class="sub-menu-text"></span>Pharmacy Collection</a></li>
					</ul></li>
				<li id="credit Note" class="TextFont has-sub"><a href="#">Pharmacy
						Due Collection<span class="arrow"></span>
				</a>

					<ul class="sub">
						<li><a class="" href="getPharmacyDueCollectionPage"><span
								class="sub-menu-text"></span>Pharmacy Due Collection</a></li>
					</ul></li>

			
				<li id="vatsss" class="TextFont has-sub"><a href="#">New
						Reports<span class="arrow"></span>
				</a>
					<ul class="sub">
						<li><a class="" href="../report/getSupplierListReportPage"><span
								class="sub-menu-text"></span> Supplier List</a></li>
						<li><a class="" href="../report/getmasterListReportPage"><span
								class="sub-menu-text"></span> Product Master List</a></li>

						<li><a class="" href="getPurchaseProductWiseandven"><span
								class="sub-menu-text"></span>PRODUCTWISE PURCHASE REPORT</a></li>
						<li><a class="" href="getpurchaseDetails"><span
								class="sub-menu-text"></span> PURCHASE DETAILS REPORT</a></li>
                        <li><a class="" href="itemwisemnfsalestockreport"><span
								class="sub-menu-text"></span> ITEM WISE MNF WISE SALE STOCK REPORT</a></li>
						<li><a class="" href="getpurchaseOrderDetails"><span
								class="sub-menu-text"></span> PURCHASE ORDER</a></li>
								
						<li><a class="" href="getpurchaseRegisterDetails"><span
								class="sub-menu-text"></span> PURCHASE REGISTER</a></li>
							
							<li><a class="" href="getpurchasereturn"><span
								class="sub-menu-text"></span> PURCHASE RETURN(DebitNote)</a></li>
								
						<li><a class="" href="getpurchaseDetailswithgst"><span
								class="sub-menu-text"></span> PURCHASE REPORT WITH GST</a></li>
								
						<li><a class="" href="getPurchaseRetrunDetailsWithGst"><span
								class="sub-menu-text"></span> PURCHASE RETURN REPORT WITH GST</a></li>

						<li><a class="" href="getSaleReportWithGSt"><span
								class="sub-menu-text"></span> SALE REPORT WITH GST</a></li>
								
						<li><a class="" href="getCreditNoteDetailsPage"><span
								class="sub-menu-text"></span> SALE RETURN REPORT WITH GST</a></li>
								
							

						<li><a class="" href="purchaselistdetailswithsalevalue"><span
								class="sub-menu-text"></span> PURCHASE LIST DETAIL WITH SALE
								VALUE</a></li>

						<li><a class="" href="getSaleRegisterReport"><span
								class="sub-menu-text"></span> Sale Register Report</a></li>

						<li><a class="" href="getPatientwiseSaleReportPage"><span
								class="sub-menu-text"></span> Patient_Wise Sale Report</a></li>

								
						<li><a class="" href="getpurchasetaxreport"><span
								class="sub-menu-text"></span> PURCHASE TAX REPORT</a></li>
								
						<li><a class="" href="getSaletaxreport"><span
								class="sub-menu-text"></span> SALE TAX REPORT</a></li>
								
						<li><a class="" href="getSummarydocreport"><span
								class="sub-menu-text"></span>SUMMARY DOC</a></li>
								
						<li><a class="" href="getWardwiseCollection"><span
								class="sub-menu-text"></span>Ward Wise Collection</a></li>
								
						<li><a class="" href="getReceivedMRNReport"><span
								class="sub-menu-text"></span>Received MRN Report</a></li>
								
						<li><a class="" href="getPendingMRNReport"><span
								class="sub-menu-text"></span>Pending MRN Report</a></li>		
								
								
					</ul></li>
					<li id="newss" class="TextFont has-sub"><a href="#">New <span
						class="arrow"></span>
				</a>
					<ul class="sub">
						<li><a class="" href="getSaleReportWithGStwhole"><span
								class="sub-menu-text"></span> SALE REPORT WITH GST(whole)</a></li>
						<li><a class="" href="getDateWiseStockReport"><span
								class="sub-menu-text"></span>Date_Wise Stock Report</a></li>
					</ul>
				</li>
				
				<li id="sharadhareport" class="TextFont has-sub"><a href="#">Hospital Report<span class="arrow"></span>
				</a>
					<ul class="sub">
						<li><a class="" href="getPurchasNewePatyWisePage"><span
								class="sub-menu-text"></span>PARTYWISE PURCHASE Report</a></li>
					

						<li><a class="" href="getBillWiseSale"><span
								class="sub-menu-text"></span>BILL WISE SALES REPORT</a></li>
					
						<!-- <li><a class="" href="getBillWiseSalereturn"><span
								class="sub-menu-text"></span>BILL WISE SALES RETURN</a></li> -->		
						

						<li><a class="" href="getGRNreportPage"><span
								class="sub-menu-text"></span>GRN Report</a></li>
						<li>
					</ul></li>

			</ul>

			
			<!-- /SIDEBAR MENU -->
		</div>
	</div>
</div>
<!-- /SIDEBAR -->

<script type="text/javascript">
		var moduleAccess=[];
</script>


<%
	String pharmacyAccess=(String)session.getAttribute("pharmacyAccess");
	
	try
	{
		JSONArray newJArray = new JSONArray(pharmacyAccess);
		List<String> lists=new ArrayList<String>();
		
		for(int i=0;i<newJArray.length();i++)
		{
	JSONObject jsonObject=newJArray.getJSONObject(i);
	lists.add((String)jsonObject.get("moduleName"));
%>
<script type="text/javascript">
				var data="<%=(String)jsonObject.get("moduleName")%>";
				moduleAccess.push(data);
			</script>

<%
	}
	}
	catch(Exception e)
	{
		e.printStackTrace();
	}
%>
<%
	String userType=(String)session.getAttribute("userType");
%>

<script type="text/javascript">
    var userType="<%=userType%>	";
	var count = 0;
	var url = "error-page";
	for ( var i = 0; i < moduleAccess.length; i++) {
		if (userType == "admin") {
			/* if(moduleAccess[i].trim()=="masters")
			{
				count=1;
			} */
			count = 1;
		} else {
			if (moduleAccess[i].trim() == "report") {
				count = 1;

			} else {
				url = "../pharmacy/transaction";
			}
		}
	}
	if (count == 0) {
		window.location = url;
	}
	function fun1() {
		sessionStorage.setItem("val", "1");
		location.href = "../report/getSalesPatientProductwise";
	}
	function fun2() {
		sessionStorage.setItem("val", "0");
		location.href = "../report/getSalesPatientProductwise";
	}
	function getExel() {
		
		//window.open('data:application/vnd.ms-excel,'
				//+ encodeURIComponent($('div[id$=exelDiv]').html()));
		//e.preventDefault();
	        var dt = new Date();
	        var day = dt.getDate();
	        var month = dt.getMonth() + 1;
	        var year = dt.getFullYear();
	        var postfix = day + "." + month + "." + year;
	        var a = document.createElement('a');
	        var data_type = 'data:application/vnd.ms-excel';
	        var table_div = document.getElementById('exelDiv');
	        var table_html = table_div.outerHTML.replace(/ /g, '%20');
	        a.href = data_type + ', ' + table_html;
	        a.download = 'Daily Sale_Report_' + postfix + '.xls';
	        a.click();
	        e.preventDefault();		
							
	}
</script>
