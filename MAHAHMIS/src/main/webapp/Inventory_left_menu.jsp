<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>


<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<!-- <link rel="stylesheet" type="text/css" href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css" href="bootstrap-dist/css/bootstrap.css" media="screen"> -->
<!-- <link href="css/ExtraCss/inventory_Sales_Quotation.css"
	rel="stylesheet" /> -->
<link href="css/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/ExtraCss/sb-admin-2.css" rel="stylesheet">

<style type="text/css">
</style>
</head>
<body>
	<div id="sidebar" class="sidebar">
		<div class="sidebar-menu nav-collapse" style="margin-top: -51px;">
			<ul>

				<li id="" class="has-sub ehatSubModule ehat_subModule_72" style="display:none;"><a href="inventory_Dashboard.jsp"
					class=""> <i class="fa fa-table fa-fw"></i> <span
						class="menu-text">Dashboard</span></a></li>
				<li id="" class="has-sub ehat_subModule_73" style="display:none;"><a href="javascript:;" class="">
						<i class="fa fa-folder-o fa-fw"></i> <span class="menu-text">Administration</span>
						<span class="arrow"></span>
				</a>
					<ul class="sub">

						<li id="" class="has-sub-sub ehat_subModule_74" style="display:none;"><a href="javascript:;" class="">
								<i class="fa fa-folder-open-o fa-fw"></i> <span class="menu-text">Set
									Up</span><span class="arrow"></span>
						</a>
							<ul class="sub-sub">
								<li class="ehatSubModule ehat_subModule_75" style="display:none;"><a class="" href="inventory_Document_Master.jsp"><span
										class="sub-menu-text">Document Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_"><a class="" href="inventory_Financial_Year.jsp"><span
										class="sub-menu-text">Financial Year</span></a></li>
								<li class="ehatSubModule ehat_subModule_77" style="display:none;"><a class="" href="inventory_Document_SetUp.jsp"><span
										class="sub-menu-text">Document Numbering</span></a></li>
								<li class="ehatSubModule ehat_subModule_78" style="display:none;"><a class="" href="inventory_Tax_SetUp.jsp"><span
										class="sub-menu-text">Tax SetUp</span></a></li>
								<li class="ehatSubModule ehat_subModule_79" style="display:none;"><a class="" href="inventory_Category_Master.jsp"><span
										class="sub-menu-text">Category Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_80" style="display:none;"><a class="" href="inventory_Form_Master.jsp"><span
										class="sub-menu-text">Form Master</span></a></li>
								<!-- <li class="ehatSubModule ehat_subModule_81" style="display:none;"><a class="" href="inventory_Ingredients_Master.jsp"><span
										class="sub-menu-text">Ingredients Master</span></a></li> -->
								<li class="ehatSubModule ehat_subModule_82" style="display:none;"><a class="" href="inventory_Manufacture_Master.jsp"><span
										class="sub-menu-text">Manufacturer Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_83" style="display:none;"><a class="" href="inventory_Warehouse_Master.jsp"><span
										class="sub-menu-text">Warehouse Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_84" style="display:none;"><a class="" href="inventory_Packing_Master.jsp"><span
										class="sub-menu-text">Packing Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_85" style="display:none;"><a class="" href="inventory_subInventory_Master.jsp"><span
										class="sub-menu-text">Subinventory Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_86" style="display:none;"><a class="" href="inventory_Uom_Master.jsp"><span
										class="sub-menu-text">Uom Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_87" style="display:none;"><a class="" href="inventory_ABCRange_Analysis_Master.jsp"><span
										class="sub-menu-text">ABCRange Analysis Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_88" style="display:none;"><a class="" href="inventory_special_tax_master.jsp"><span
										class="sub-menu-text">Charges Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_89" style="display:none;"><a class="" href="Inventory_Hospital_Details.jsp"><span
										class="sub-menu-text">Hospital Details</span></a></li>
								<li class="ehatSubModule ehat_subModule_90" style="display:none;"><a class="" href="Inventory_TermsandCondition_Master.jsp"><span
										class="sub-menu-text">Terms and Condition</span></a></li>
										
										
							</ul>
						</li>

						<li id="" class="has-sub-sub ehat_subModule_91" style="display:none;"><a href="javascript:;" class="">
								<i class="fa fa-folder-open-o fa-fw"></i><span class="menu-text">Masters</span><span
								class="arrow"></span>
						</a>
							<ul class="sub-sub">
								<li class="ehatSubModule ehat_subModule_92" style="display:none;"><a class="" href="inventory_Item_Master.jsp"><span
										class="sub-menu-text">Item master</span></a></li>
								<li class="ehatSubModule ehat_subModule_93" style="display:none;"><a class="" href="inventory_Party_Master_Data.jsp"><span
										class="sub-menu-text">Party master</span></a></li>
							</ul></li>
					</ul></li>
				<li id="" class="has-sub ehat_subModule_94" style="display:none;"><a href="javascript:;"
					class=""> <i class="fa fa-th-large fa-fw"></i> <span
						class="menu-text">Modules</span><span class="arrow"></span></a>
					<ul class="sub">
						<li id="" class="has-sub-sub ehat_subModule_95" style="display:none;"><a href="javascript:;"
							class=""> <i class="fa fa-folder-open-o fa-fw"></i> <span
								class="menu-text">Purchase</span><span class="arrow"></span></a>
							<ul class="sub-sub">
								<li class="ehatSubModule ehat_subModule_"><a href="inventory_Purchase_Request_List.jsp"><span
										class="sub-menu-text">Purchase/Indent Request List</span></a></li>
								<li class="ehatSubModule ehat_subModule_97" style="display:none;"><a class="" href="inventory_Purchase_Quotation.jsp"><span
										class="sub-menu-text">Purchase Quotation</span></a></li>
										<!-- <li><a class="" href="inventory_Purchase_Enquiry.jsp"><span
										class="sub-menu-text">Purchase Enquiry</span></a></li> -->
								<li class="ehatSubModule ehat_subModule_98" style="display:none;"><a class="" href="inventory_Purchase_Order.jsp"><span
										class="sub-menu-text">Purchase Order</span></a></li>
<!-- 										<li class="ehatSubModule ehat_subModule_98" style="display:none;"><a class="" href="inventory_Purchase_Order_plain.jsp"><span
										class="sub-menu-text">Plain Purchase Order</span></a></li> -->
								<li class="ehatSubModule ehat_subModule_99" style="display:none;"><a class="" href="inventory_Good_Receipt_Note.jsp"><span
										class="sub-menu-text">Goods Receipt Note</span></a></li>
								<li class="ehatSubModule ehat_subModule_100" style="display:none;"><a class="" href="inventory_openig_stock.jsp"><span class="sub-menu-text">Openig Stock/Closing Stock</span></a></li>
											
								<li class="ehatSubModule ehat_subModule_101" style="display:none;"><a class="" href="inventory_Purchase_Invoice.jsp"><span
										class="sub-menu-text">Purchase Invoice</span></a></li>
								<li class="ehatSubModule ehat_subModule_102" style="display:none;"><a class="" href="inventory_Purchase_Return.jsp"><span
										class="sub-menu-text">Purchase Return</span></a></li>
								<li class="ehatSubModule ehat_subModule_164" style="display:none;"><a class="" href="inventory_Purchase_expense.jsp"><span
										class="sub-menu-text">Other Expenses</span></a></li>
										<li class="ehatSubModule ehat_subModule_165" style="display:none;"><a class="" href="Inwarditem.jsp"><span
										class="sub-menu-text">Item Inward Verifcation</span></a></li>
							</ul></li>
						<li id="" class="has-sub-sub ehat_subModule_103" style="display:none;"><a href="javascript:;"
							class=""> <i class="fa fa-folder-open-o fa-fw"></i> <span
								class="menu-text">Store</span><span class="arrow"></span></a>
							<ul class="sub-sub">
								<li class="ehatSubModule ehat_subModule_104" style="display:none;"><a class=""
									href="inventory_Material_Request_Note_List.jsp"><span
										class="sub-menu-text">Material Request Note List</span></a></li>
								<li class="ehatSubModule ehat_subModule_105" style="display:none;"><a class="" href="inventory_Purchase_Request.jsp"><span
										class="sub-menu-text">Purchase Request</span></a></li>
								<li id="" class="has-sub-sub ehat_subModule_106" style="display:none;"><a href="javascript:;"
									class=""> <i class="fa fa-folder-open-o fa-fw																																																						"></i> <span
										class="menu-text">Inventory</span><span class="arrow"></span></a>
									<ul class="sub-sub">
										<li class="ehatSubModule ehat_subModule_107" style="display:none;"><a class="" href="inventory_Goods_Issue.jsp"><span
												class="sub-menu-text">Goods Issue</span></a></li>
										<li class="ehatSubModule ehat_subModule_108" style="display:none;"><a class="" href="inventory_Good_Receipt.jsp"><span
												class="sub-menu-text">Goods Receipt</span></a></li>
									</ul></li>
								<li class="ehatSubModule ehat_subModule_109" style="display:none;"><a class="" href="inventory_Stock_Audit.jsp"><span
										class="sub-menu-text">Stock Audit</span></a></li>
							<!-- <li><a class="" href="DemoforMRNReturn.jsp"><span
										class="sub-menu-text">Mrn Return</span></a></li> -->
										
										

							</ul>							
						</li>
					</ul></li>
				<li id="" class="has-sub ehat_subModule_110" style="display:none;"><a
					href="inventory_Materail_Request_Note.jsp" class=""> <i	class="fa fa-shopping-cart fa-fw"></i> <span class="menu-text">Sub-Inventory</span></a></li>
						
						<li id="" class="has-sub ehat_subModule_111" style="display:none;"><a href="javascript:;"  class=""> <i class="fa fa-folder-open-o fa-fw"></i> <span class="menu-text">Reports</span> <span class="arrow"></span></a>
						
						<ul class="sub">
								<!-- jitendra <li class="ehatSubModule ehat_subModule_112" style="display:none;"><a class="" href="Inventory_Report_Category _Wise_Item_SubItem_List.jsp"><span	class="sub-menu-text">Category Item and Sub Item List</span></a></li> -->
								<li class="ehatSubModule ehat_subModule_113" style="display:none;"><a class="" href="Inventory_Report_Category _wise_Purchase.jsp"><span	class="sub-menu-text">Category Wise Purchase</span></a></li> 
									 <!-- <li><a class="" href="Inventory_Report_Category _wise_Billing.jsp"><span	class="sub-menu-text">Category-Wise Bills</span></a></li> -->
									<li class="ehatSubModule ehat_subModule_114" style="display:none;"><a class="" href="Inventory_Report_Category_wise_Stock_Listing.jsp"><span 	class="sub-menu-text">Category-Wise Stock Listing</span></a></li>
									<!-- <li><a class="" href="#"><span	class="sub-menu-text">Chemical-Composition Wise Item Listing</span></a></li>
									<li><a class="" href="#"><span	class="sub-menu-text">Company-Wise Bills</span></a></li>
										<li><a class="" href="#"><span class="sub-menu-text">Inventory velocity</span></a></li>
										<li><a class="" href="#"><span	class="sub-menu-text">Group Wise Category Purchase</span></a></li>
										<li><a class="" href="#"><span class="sub-menu-text">Group-Wise Service Listing</span></a></li>
										<li><a class="" href="#"><span
										class="sub-menu-text">Non Moving Items Doctor-Wise</span></a></li>
																				<li><a class="" href="#"><span
										class="sub-menu-text">Non-Moving Items</span></a></li>
										 										 
										<li><a class="" href="#"><span
										class="sub-menu-text">Previous Day Stock Report</span></a></li>
										<li><a class="" href="#"><span
										class="sub-menu-text">Product-Wise Bills Summary</span></a></li> -->
										
										
										<!-- jitendra
										<li class="ehatSubModule ehat_subModule_115" style="display:none;"><a class="" href="Inventory_Report_XYZ_Analysis_for_Purchase_Price.jsp"><span class="sub-menu-text">XYZ Analysis for Purchase Price</span></a></li>
										<li class="ehatSubModule ehat_subModule_116" style="display:none;"><a class="" href="Inventory_Report_XYZ_Analysis_for_Sales_Price.jsp"><span class="sub-menu-text">XYZ Analysis for Sales Price</span></a></li>
										<li class="ehatSubModule ehat_subModule_117" style="display:none;"><a class="" href="Inventory_Report_HML_Analysis_for_Purchase_Price.jsp"><span class="sub-menu-text">HML Analysis for Purchase Price</span></a></li>
										<li class="ehatSubModule ehat_subModule_118" style="display:none;"><a class="" href="Inventory_Report_HML_Analysis_for_Sales_Price.jsp"><span class="sub-menu-text">HML Analysis for Sales Price</span></a></li>
										
										<li class="ehatSubModule ehat_subModule_119" style="display:none;"><a class="" href="Inventory_Report_VED_Analysis_for_Items.jsp"><span class="sub-menu-text">VED Analysis Report</span></a></li>
										<li class="ehatSubModule ehat_subModule_120" style="display:none;"><a class="" href="Inventory_Report_SDE_Analysis_for_Items.jsp"><span class="sub-menu-text">SDE Analysis Report</span></a></li>
										<li class="ehatSubModule ehat_subModule_121" style="display:none;"><a class="" href="Inventory_Report_ABC_Analysis_for_Items.jsp"><span class="sub-menu-text">ABC Analysis Report</span></a></li>
										<li class="ehatSubModule ehat_subModule_122" style="display:none;"><a class="" href="Inventory_Report_FSN_Analysis_for_Items.jsp"><span class="sub-menu-text">FSN Analysis Report</span></a></li>
										<li class="ehatSubModule ehat_subModule_123" style="display:none;"><a class="" href="Inventory_Report_Item_Legder.jsp"><span class="sub-menu-text">Item Ledger</span></a></li> -->
										<!-- <li><a class="" href="Inventory_Report_ABC_VED_Matrix_Analysis_for_Items.jsp"><span class="sub-menu-text">ABC-VED Matrix Analysis Report</span></a></li> -->
										
										<li class="ehatSubModule ehat_subModule_124" style="display:none;"><a class="" href="Inventory_Report_Items_At_Re-Oder_level.jsp"><span class="sub-menu-text">Items stock below minimum level</span></a></li>
										<!-- jitendra <li class="ehatSubModule ehat_subModule_125" style="display:none;"><a class="" href="Inventory_Report_Company_wise_purchase.jsp"><span	class="sub-menu-text">Company Wise Purchase</span></a></li>
										<li class="ehatSubModule ehat_subModule_126" style="display:none;"><a class="" href="Inventory_Report_Purchase_Return_Register.jsp"><span class="sub-menu-text">Purchase Return Register</span></a></li>
										<li class="ehatSubModule ehat_subModule_127" style="display:none;"><a class="" href="Inventory_Report_Supplier_Wise_Invoice_Listing.jsp"><span class="sub-menu-text">Supplier Wise Invoice Listing</span></a></li>
										
										<li class="ehatSubModule ehat_subModule_128" style="display:none;"><a class="" href="Inventory_Report_Supplier_Wise_Stock_Listing.jsp"><span class="sub-menu-text">Supplier-Wise Stock Listing</span></a></li> -->
										
										<!-- <li><a class="" href="Inventory_Report_Outlet-Wise_Stock_Listing.jsp"><span class="sub-menu-text">Outlet-Wise Stock Listing</span></a></li> -->
										<!-- jitendra
										<li class="ehatSubModule ehat_subModule_129" style="display:none;"><a class="" href="Inventory_Report_Purchase_Day_Book_BY_Invoice_Date.jsp"><span	class="sub-menu-text">Purchase Day Book(Invoice Date)</span></a></li>	
										
										<li class="ehatSubModule ehat_subModule_130" style="display:none;"><a class="" href="Inventory_Report_Outlet_Wise_Consumption_Issue.jsp"><span	class="sub-menu-text">Outlet Wise Consumption Issue</span></a></li>
										
										<li class="ehatSubModule ehat_subModule_131" style="display:none;"><a class="" href="Inventory_Report_Supplier_Wise_Expiry.jsp"><span	class="sub-menu-text">Supplier Wise Expiry</span></a></li>
										
										<li class="ehatSubModule ehat_subModule_132" style="display:none;"><a class="" href="Inventory_Report_Outlet_Wise_Re-Order_Level_and_stock.jsp">	<span class="sub-menu-text"> Outlet-Wise Re-Order Level and stock </span></a></li> -->
														
										 <!-- <li><a class="" href="Inventory_Report_Outlet_Wise_Stock_Transfer_Detailed.jsp"><span	class="sub-menu-text">Outlet-Wise Stock Transfer(Detailed)</span></a></li> -->
										 
										 
										 <!-- jitendra shraddha --> <li class="ehatSubModule ehat_subModule_130" style="display:none;"><a class="" href="Inventory_Report_Outlet_Wise_Consumption_Issue.jsp"><span	class="sub-menu-text">Outlet Wise Consumption Issue</span></a></li>
										<li class="ehatSubModule ehat_subModule_131" ><a class="" href="Inventory_Report_sub_itemstock.jsp"><span	class="sub-menu-text">Subinventory Wise Item Stock</span></a></li>
												
							</ul>
													
						</li>
						
						
						<li id="" class="has-sub ehat_subModule_133" style="display:none;"><a href="javascript:;"  class=""> <i class="fa fa-folder-open-o fa-fw"></i> <span class="menu-text">Masters Reports</span> <span class="arrow"></span></a>
					
							<ul class="sub">
							 <li class="ehatSubModule ehat_subModule_167" style="display:none;"><a class="" href="inventory_GST_Report.jsp"><span
										class="sub-menu-text">Purchase Report With GST</span></a></li> <!-- jitendra shraddha -->
							<li class="ehatSubModule ehat_subModule_134" style="display:none;"><a class="" href="Inventory_Report_Document_master.jsp"><span
										class="sub-menu-text">Document Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_135" style="display:none;"><a class="" href="Inventory_Report_Financial_Year_master.jsp"><span
										class="sub-menu-text">Financial Year</span></a></li>
								<li class="ehatSubModule ehat_subModule_136" style="display:none;"><a class="" href="Inventory_Report_Document_Numbering_master.jsp"><span
										class="sub-menu-text">Document Numbering</span></a></li>
								<li class="ehatSubModule ehat_subModule_137" style="display:none;"><a class="" href="Inventory_Report_Tax_SetUp_Master.jsp"><span
										class="sub-menu-text">Tax SetUp</span></a></li>
								<li class="ehatSubModule ehat_subModule_138" style="display:none;"><a class="" href="Inventory_Report_Category_master.jsp"><span
										class="sub-menu-text">Category Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_139" style="display:none;"><a class="" href="Inventory_Report_Form_master.jsp"><span
										class="sub-menu-text">Form Master</span></a></li>
								<!-- <li class="ehatSubModule ehat_subModule_140" style="display:none;"><a class="" href="Inventory_Report_Ingredients_master.jsp"><span
										class="sub-menu-text">Ingredients Master</span></a></li> -->
								<li class="ehatSubModule ehat_subModule_141" style="display:none;"><a class="" href="Inventory_Report_Manufacture_master.jsp"><span
										class="sub-menu-text">Manufacturer Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_142" style="display:none;"><a class="" href="Inventory_Report_Warehouse_master.jsp"><span
										class="sub-menu-text">Warehouse Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_143" style="display:none;"><a class="" href="Inventory_Report_Packing_master.jsp"><span
										class="sub-menu-text">Packing Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_144" style="display:none;"><a class="" href="Inventory_Report_subInventory_master.jsp"><span
										class="sub-menu-text">Subinventory Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_145" style="display:none;"><a class="" href="Inventory_Report_Uom_master.jsp"><span
										class="sub-menu-text">Uom Master</span></a></li>
								<li class="ehatSubModule ehat_subModule_146" style="display:none;"><a class="" href="Inventory_Report_Item_master.jsp"><span
										class="sub-menu-text">Item master</span></a></li>
								<li class="ehatSubModule ehat_subModule_147" style="display:none;"><a class="" href="Inventory_Report_Party_master.jsp"><span
										class="sub-menu-text">Party master</span></a></li>
								<!-- jitendra <li class="ehatSubModule ehat_subModule_148" style="display:none;"><a class="" href="Inventory_Report_SubInventory_Complete_ Report.jsp"><span
										class="sub-menu-text">Outlet-Wise Stock Transfer Report</span></a></li> -->
								<li class="ehatSubModule ehat_subModule_149" style="display:none;"><a class="" href="Inventory_Report_Current_Stock_Report.jsp"><span
										class="sub-menu-text">Inventory Current Stock Report</span></a></li>
								<li class="ehatSubModule ehat_subModule_150" style="display:none;"><a class="" href="Inventory_Item_Wise_Current_Stock_Report_ByID.jsp"><span class="sub-menu-text">Inventory Item wise Current Stock Report</span></a></li>
								<!-- jitendra <li class="ehatSubModule ehat_subModule_151" style="display:none;"><a class="" href="Inventory_Report_Purchase_Day_Book.jsp"><span class="sub-menu-text">Purchase Day Book(Purchase Date)</span></a></li>
								
								<li class="ehatSubModule ehat_subModule_152" style="display:none;"><a class="" href="Inventory_Report_Pending_Purchase_Order_Book.jsp"><span class="sub-menu-text">Pending_Purchase_Order_Book</span></a></li>
								
								<li class="ehatSubModule ehat_subModule_153" style="display:none;"><a class="" href="Inventory_Report_Pending_Purchase_Quotation_Book.jsp"><span class="sub-menu-text">Pending_Purchase Quotation BooK</span></a></li> -->
								<li class="ehatSubModule ehat_subModule_154" style="display:none;"><a class="" href="Inventory_Report_Openig_Stock.jsp"><span class="sub-menu-text">Openig Stock </span></a></li>
								<li class="ehatSubModule ehat_subModule_155" style="display:none;"><a class="" href="Inventory_Report_Deleted_Item_List.jsp"><span class="sub-menu-text">Deleted Item List</span></a></li>
								<li class="ehatSubModule ehat_subModule_156" style="display:none;"><a class="" href="Inventory_Mrn_Pending_Report.jsp"><span class="sub-menu-text">Mrn Pending List</span></a></li>
								
								<li class="ehatSubModule ehat_subModule_157" style="display:none;"><a class="" href="Inventory_Report_Deleted_Mrn_List.jsp"><span class="sub-menu-text">Deleted Mrn List</span></a></li>
								
								<li class="ehatSubModule ehat_subModule_158" style="display:none;"><a class="" href="Inventory_Closing_Stock_Report.jsp"><span class="sub-menu-text">Closing Stock</span></a></li>
								
								<li class="ehatSubModule ehat_subModule_159" style="display:none;"><a class="" href="Inventory_Opening_Stock_Report_without_Grn.jsp"><span class="sub-menu-text">Openig Stock withOut GRN</span></a></li>
									
								<li class="ehatSubModule ehat_subModule_160" style="display:none;"><a class="" href="Inventory_Report_itemwise_Purchase_history.jsp"><span class="sub-menu-text">Item Wise Purchase history</span></a></li>
								
								<li class="ehatSubModule ehat_subModule_161" style="display:none;"><a class="" href="Inventory_Report_itemwise_Grn_history.jsp"><span class="sub-menu-text">Item Wise GRN history</span></a></li>
								
								<li class="ehatSubModule ehat_subModule_162" style="display:none;"><a class="" href="Inventory_All_SubInventory_Report.jsp"><span class="sub-menu-text">All SubInventory Report</span></a></li>
								
								<li class="ehatSubModule ehat_subModule_163" style="display:none;"><a class="" href="inventory_all_subinventory_wise_consumption_issue_report.jsp"><span class="sub-menu-text">All Cosumption wise issue Report</span></a></li>
								
								<!-- jitendra <li><a class="" href="inventory_Report_Grn_Vmi.jsp"><span class="sub-menu-text">GRN VMI Report</span></a></li> -->
								
																										
							</ul>
							</li>
							
							
							
							<li id="" class="has-sub ehat_subModule_133" style="display:none;"><a href="ehat_dispach_new.jsp"  class=""> <i class="fa fa-folder-open-o fa-fw"></i> <span class="menu-text">Dispach</span> </a>
					
							</li>
							
							
							<!-- By Tarique Aalam -->
							<!-- <li id="" class="has-sub ehat_subModule_135" style="display:none;"><a href="ehat_block_patient_list.jsp"  class=""> <i class="fa fa-folder-open-o fa-fw"></i> <span class="menu-text">Block Patient List</span> </a>
							</li>  -->
						
						
						
			</ul>

			<!--  <li>
=======
	 <div id="sidebar" class="sidebar">
	<div class="sidebar-menu nav-collapse">
                    <ul class="nav" id="side-menu"  >
                       
                      <li>
                                            <a href="inventory_Dashboard.jsp" style="color:black;">Dashboard</a>
                                        </li>
                               <li>
                            <a href="#" style="color:black;" class="font-13"> Administration<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                             
                                        <li>
                                    <a href="#" style="color:black;" class="font-13">Set Up <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                         <li>
                                            <a href="inventory_Document_Master.jsp" style="color:black;">Document Master</a>
                                        </li> 
                                        <li>
                                            <a href="inventory_Financial_Year.jsp" style="color:black;">Financial Year</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Document_SetUp.jsp" style="color:black;">Document Numbering</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Tax_SetUp.jsp" style="color:black;">Tax SetUp</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Category_Master.jsp" style="color:black;">Category Master</a>
                                        </li>
                                      
                                        <li>
                                            <a href="inventory_Form_Master.jsp" style="color:black;">Form Master</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Ingredients_Master.jsp" style="color:black;">Ingredients Master</a>
                                        </li>
                                         <li>
                                            <a href="inventory_Manufacture_Master.jsp" style="color:black;">Manufacture Master</a>
                                        </li>
                                         <li>                                      
                                            <a href="inventory_Warehouse_Master.jsp" style="color:black;">Warehouse Master</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Packing_Master.jsp" style="color:black;">Packing Master</a>
                                        </li>
                                         <li>
                                            <a href="inventory_subInventory_Master.jsp" style="color:black;">Sub Inventory Master</a>
                                        </li>
                                         <li>
                                            <a href="inventory_Uom_Master.jsp" style="color:black;">Uom Master</a>
                                        </li>
                                       
                                    </ul>
                                    <!-- /.nav-third-level -->
                             <!--    </li>
                                
                                
                                <li>
                                    <a href="#" style="color:black;" class="font-13">Masters<span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                         
                                        <li>
                                            <a href="#" style="color:black;">Store</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Item_Master.jsp" style="color:black;">Item</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Party_Master_Data.jsp" style="color:black;">Party</a>
                                        </li>
                                    </ul>
                                    /.nav-third-level
                                </li>
                            </ul>
                            /.nav-second-level
                        </li>
                        <li>
                            <a href="#" style="color:black;" class="font-13"> Modules<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level"> -->
                          
                                <!-- <li>
                                    <a href="#" style="color:black;">Sales<span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                         
                                        <li>
                                            <a href="inventory_Sales_Quotation.jsp" style="color:black;">Quotation</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Sales_Order.jsp" style="color:black;">Sales Order</a>
                                        </li>
                                        
                                    </ul> -->
                                    <!-- /.nav-third-level -->
                              <!--   </li> -->
                               <!--  <li>
                                    <a href="#" style="color:black;" class="font-13">Purchase <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                         
                                        <li>
                                            <a href="inventory_Purchase_Request_List.jsp" style="color:black;">Purchase Request List</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Purchase_Quotation.jsp" style="color:black;">Purchase Quotation</a>
                                        </li>
                                         <li>
                                            <a href="inventory_Purchase_Order.jsp" style="color:black;">Purchase Order</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Good_Receipt_Note.jsp" style="color:black;">Goods Receipt Note</a>
                                        </li>
                                         <li>
                                            <a href="inventory_Purchase_Invoice.jsp" style="color:black;">Purchase Invoice</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Purchase_Return.jsp" style="color:black;">Purchase Return</a>
                                        </li>
                                    </ul>
                                    
                                </li>  -->
			<!--     <li>
                                    <a href="#" style="color:black;" class="font-13">Store <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                         
                                        <li>
                                            <a href="inventory_Material_Request_Note_List.jsp" style="color:black;">Material Request List</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Purchase_Request.jsp" style="color:black;">Purchase Request</a>
                                        </li>
                                         <li>
                                            <a href="#" style="color:black;" class="font-13">Inventory <span class="fa arrow"></span></a>
                                            <ul class="nav nav-third-level">
                                         
                                        <li>
                                            <a href="inventory_Goods_Issue.jsp" style="color:black;">Goods Issue</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Good_Receipt.jsp" style="color:black;">Goods Receipt</a>
                                        </li>
                                       
                                        
                                    </ul>
                       </li>
                                        <li>
                                            <a href="inventory_Stock_Audit.jsp" style="color:black;">Stock Audit</a>
                                        </li>
                                        
                                    </ul>
                                    /.nav-third-level
                                </li>
                                      <li>
                                            <a href="inventory_Materail_Request_Note.jsp" style="color:black;">Sub-Inventory<span></span></a>
                                        </li>
                                 <li>
                                    <a href="#" style="color:black;" class="font-13">Sub-Inventory <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                         
                                        <li>
                                            <a href="inventory_Materail_Request_Note.jsp" style="color:black;">Material Request Note</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Material_Receipt.jsp" style="color:black;">Material Receipt</a>
                                        </li>
                                    </ul>
                                    /.nav-third-level
                                </li>
                                 <li>
                                    <a href="#" style="color:black;" class="font-13">Quality <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                         
                                        <li>
                                            <a href="#" style="color:black;">Inward Inspection</a>
                                        </li>
                                        
                                    </ul>
                                    /.nav-third-level
                                </li>
                                          <li>
                                    <a href="#" style="color:black;" class="font-13">Sub Contracting <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                         
                                        <li>
                                            <a href="inventory_Sub_Contracting_Material_Issue.jsp" style="color:black;">Material Issue</a>
                                        </li>
                                        <li>
                                            <a href="inventory_Sub_Contracting_Material_Receipt.jsp" style="color:black;">Material Receipt</a>
                                        </li>
                                    </ul>
                                    /.nav-third-level
                                </li>
                            </ul>
                            /.nav-second-level
                        </li>
                        
                    </ul> -->
		</div>
		<!-- /.sidebar-collapse -->
	</div>

	<%
		session.setAttribute("moduleName", "inventory");
	%>

	<script src="js/ExtraJs/metisMenu.min.js"></script>
	<script type="text/javascript">
		 $(function() {
			$("#ehat_module_7").addClass("menuActive");

		});

		/*
		function showPrint() {
			window.open("ProductReportPdf.jsp");
		} */
	</script>
	<script src="js/ExtraJs/sb-admin-2.js"></script>
	<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
</body>
</html>