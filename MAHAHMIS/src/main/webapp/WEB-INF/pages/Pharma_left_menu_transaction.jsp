<%@page import="java.util.ResourceBundle"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="org.json.JSONArray"%>

<!-- SIDEBAR -->
<div id="sidebar" class="sidebar">
	<div class="slimScrollDiv"
		style="position: relative; overflow: hidden; width: auto; height: 608px;">
		<%
			ResourceBundle bundle = ResourceBundle
					.getBundle("EhatEnterpriseConfigurationFile");

			String goodsReceiptNote = bundle.getObject(
					"pharma_purchase_entry_name").toString();
		%>
		<div class="sidebar-menu nav-collapse">

			<ul>
				<li id="salesBillEntry" class="has-sub"><a class="" href="#"> <span
						class="menu-text">Sales Bill Entry</span><span class="arrow"></span></a>
					<ul class="sub">
						<li id='pharmaMenu-counterSale' class='pharmaMenu'><a class="" href="../../pharmacy/counterSale/view-frm"><span
								class="sub-menu-text"></span> Counter Sale (F6)</a>
						</li>
						<li id='pharmaMenu-patientSale' class='pharmaMenu'><a class="" href="../../pharmacy/patientSale/view-frm"><span
								class="sub-menu-text">Patients Sale Entry (F7)</span></a></li>
					<!-- 	<li id='pharmaMenu-hospitalSale' class='pharmaMenu'><a class="" href="../hospitalSalesBill/view-frm"><span
								class="sub-menu-text">Hospital Sale</span></a></li>		 -->
						<li id='pharmaMenu-indentSale' class='pharmaMenu'><a class="" href="../../pharmacy/indentSale/view-frm"><span
								class="sub-menu-text">Indent Sale (F8)</span></a></li>								
					</ul></li>
					
				<%-- <li id='pharmaMenu-purchase' class="TextFont has-sub pharmaMenu"><a href="../../pharmacy/purchase/view-frm"><%= goodsReceiptNote.toString()%> (F5)</a>
					
				</li> --%>
				
				<li id="purchase" class="has-sub"><a class="" href="#"> <span
						class="menu-text">Good Receipt Note</span><span class="arrow"></span></a>
						<ul class="sub">
						<li id='pharmaMenu-purchase' class='pharmaMenu'><a class="" href="../../pharmacy/purchase/view-frm"><span
								class="sub-menu-text">Good Receipt Note</span></a>
						</li>
					</ul>
						</li>
												
				<li id="purchaseOrder" class="TextFont has-sub"><a href="javascript:;">Purchase Order<span class="arrow"></span></a>
					<ul class="sub">
						<li id='pharmaMenu-po' class='pharmaMenu'><a class="" href="../../pharmacy/po/view-frm"><span
								class="sub-menu-text">Purchase Order(PO)</span></a>
						</li>
						<!-- <li ><a id='pharmaMenu-productBelowMinLevel' class="" href="/EhatEnterprise/pharmacy/productMinLevel/view-frm"><span
								class="sub-menu-text">Product below Minimum Level</span></a></li>
						<li id='pharmaMenu-partywisePo' class='pharmaMenu'><a class="" href="/EhatEnterprise/pharmacy/partywisePo/view-frm"><span
								class="sub-menu-text">Partywise purchase order</span></a></li>
						<li><a id='pharmaMenu-productWithZero' class="" href="/EhatEnterprise/pharmacy/productWithZeroStk/view-frm"><span
								class="sub-menu-text">purchase product with 0 stk</span></a></li> -->
					</ul>
				</li>
				<li id="creditNote" class="TextFont has-sub"><a href="#">Credit Note / Sale Return<span class="arrow"></span></a>
					<ul class="sub">
						<li id='pharmaMenu-creditNote' class='pharmaMenu'><a class="" href="../../pharmacy/creditNote/view-frm"><span
								class="sub-menu-text"></span>Credit Note (F4)</a>
						</li>
					</ul>			
				</li>
				<li id="debitNote" class="TextFont has-sub"><a href="#">Debit Note / Purchase Return<span class="arrow"></span></a>
					<ul class="sub">
						<li id='pharmaMenu-debitNote' class='pharmaMenu'><a class="" href="../../pharmacy/debitNote/view-frm"><span
								class="sub-menu-text"></span> Debit Note</a>
						</li>
					</ul>			
				</li>
			<li id="cashEntry" class="TextFont has-sub"><a href="#">Cash Entry<span class="arrow"></span></a>
					<ul class="sub">
						<li id='pharmaMenu-cashReceiptEntry' class="pharmaMenu"><a class="" href="../../pharmacy/cashReceiptEntry/view"><span
								class="sub-menu-text"></span> Cash Receipt Entry</a>
						</li>
						<!-- <li id='pharmaMenu-cashReceiptPatientSale' class="pharmaMenu"><a class="" href="/EhatEnterprise/pharmacy/cashReceiptPatientSale/view"><span
								class="sub-menu-text"></span> Cash Receipt Patient Sale Entry</a>
						</li>
						<li id='pharmaMenu-cashPaidEntry' class="pharmaMenu"><a class="" href="/EhatEnterprise/pharmacy/cashPaidEntry/view-frm"><span
								class="sub-menu-text">Cash Paid entry</span></a></li> -->
					</ul>		
				</li>
			<!-- 	<li id="chequeEntry" class="TextFont has-sub"><a href="#">Cheque Entry<span class="arrow"></span></a>
					<ul class="sub">
						<li id='pharmaMenu-chequeReceiptEntry' class="pharmaMenu"><a class="" href="/EhatEnterprise/pharmacy/chequeReceiptEntry/view"><span
								class="sub-menu-text"></span> Cheque Receipt Entry</a>
						</li>
						<li id='pharmaMenu-chequeReceiptPatientSale' class="pharmaMenu"><a class="" href="/EhatEnterprise/pharmacy/chequeReceiptPatientSale/view"><span
								class="sub-menu-text"></span> Cheque Receipt Patient Sale Entry</a>
						</li>
						<li id='pharmaMenu-chequePaidEntry' class="pharmaMenu"><a class="" href="/EhatEnterprise/pharmacy/chequePaidEntry/view-frm"><span
								class="sub-menu-text">Cheque Paid entry</span></a>
								
						</li>
					</ul>
				</li> -->
				<li id="chequeEntry" class="TextFont has-sub"><a href="#">Cheque Entry<span class="arrow"></span></a>
					<ul class="sub">
						<li id='pharmaMenu-chequeReceiptEntry' class="pharmaMenu"><a class="" href="../../pharmacy/chequeReceiptEntry/view"><span
								class="sub-menu-text"></span>Cheque Receipt Entry</a>
						</li>
					<!-- 	<li id='pharmaMenu-dueCollection' class="TextFont has-sub pharmaMenu"><a href="../../pharmacy/dueCollection/view">Due Collection</a></li>  -->
						<li id='pharmaMenu-chequePaidEntry' class="pharmaMenu"><a class="" href="../../pharmacy/chequePaidEntry/view-frm"><span
								class="sub-menu-text">Vendor payment</span></a>
						</li>
					</ul>
				</li>
				
				<li id='pharmaMenu-correctionRate' class="TextFont has-sub pharmaMenu"><a href="../../pharmacy/correctionRate/view">Correction Rate<!-- <span class="arrow"></span> --></a>
				</li>
				<li id='pharmaMenu-openingStockEntry' class="TextFont has-sub pharmaMenu"><a href="../../pharmacy/openingStockEntry/view-frm">Opening Stock(F9)</a></li>
				<li id='pharmaMenu-stockOutEntry' class="TextFont has-sub pharmaMenu"><a href="../../pharmacy/stockOutEntry/view">Stock In/Out</a></li>	
				
			    <li id='pharmaMenu-physicalStockupdate' class=""><a href="../../pharmacy/physicalStockUpdate/view">Physical Stock Update</a></li>
				
				<li id='pharmaMenu-physicalStockadjust' class=""><a href="../../pharmacy/physicalStockOutEntry/view">Physical Stock Adjust</a></li>
				 
				<li id='pharmaMenu-view-frm' class="TextFont has-sub pharmaMenu"><a href="../../pharmacy/mrn/view-frm">Store Management</a></li>
				
				<li id='pharmaMenu-mrnIssue' class="TextFont has-sub pharmaMenu"><a href="../../pharmacy/mrn/view.htm">Issue Mrn</a></li>
				
				<li id='pharmaMenu_import_stock' class="TextFont has-sub"><a href="../../pharmacy/pharmacy/importExcel">Import Stock</a></li>
				 
				<li id='pharmaMenu_import_product' class="TextFont has-sub"><a href="../../pharmacy/pharmacy/importProductExcel">Import Product List</a></li>
				
				<li id='pharmaMenu_import_cathLab_product' class="TextFont has-sub"><a href="../../pharmacy/pharmacy/importCathLabProductExcel">Import CathLab Product List</a></li>
				
				<li id='pharmaMenu_cathLabProduct' class="TextFont has-sub"><a href="../../pharmacy/product/cathLabProduct">CathLab Product List</a></li>
				
				<li id='pharmaMenu-dispatchGRN' class="TextFont has-sub"><a href="../../pharmacy/report/getDaywiseGRNPurchasePage">Dispatch GRN</a></li>
				
				<li id='pharmaMenu-billcomparison' class="TextFont has-sub"><a href="../../pharmacy/report/getBillComparision">Bill Comparison</a></li>
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
				var data="<%= (String)jsonObject.get("moduleName") %>";
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
<script type="text/javascript">

$("#sidebar").find("li.pharmaMenu").each(function()
{
	$(this).hide();
});
var saleMenu=0;
var poMenu=0;
var creditMenu=0;
var debitMenu=0;
var cashReceiptMenu=0;
var chequeReceiptMenu=0;
var dispatchGRN=0;

//Added By BILAL For Access Managment 
//To dispatch GRN and product list
//12-01-2018
var physicalStockupdate=0;
var physicalStockadjust=0;
var import_stock=0;
var import_product=0;
var import_cathLab_product=0;
var cathLabProduct=0;
var billcomparison=0;

for(var i=0;i<moduleAccess.length;i++)
{
	
	if(moduleAccess[i].trim()=="mrn/view.htm")
	{
		$("#pharmaMenu-mrnIssue").show();
	}
	else if(moduleAccess[i].trim()=="mrn/view-frm")
	{
		$("#pharmaMenu-view-frm").show();
	}
	else
	{
		$("#pharmaMenu-"+moduleAccess[i]).show();
	}	
	
	if(moduleAccess[i].trim()=="counterSale" || moduleAccess[i].trim()=="patientSale" || moduleAccess[i].trim()=="hospitalSale" || moduleAccess[i].trim()=="indentSale")
	{
		saleMenu=1;
	}
	
	if(moduleAccess[i].trim()=="partywisePo" || moduleAccess[i].trim()=="po")
	{
		poMenu=1;
	}
	if(moduleAccess[i].trim()=="partywisePo" || moduleAccess[i].trim()=="po")
	{
		poMenu=1;
	}
	if(moduleAccess[i].trim()=="creditNote")
	{
		creditMenu=1;
	}
	if(moduleAccess[i].trim()=="debitNote")
	{
		debitMenu=1;
	}
	if(moduleAccess[i].trim()=="cashReceiptEntry")
	{
		cashReceiptMenu=1;
	}
	if(moduleAccess[i].trim()=="chequeReceiptEntry" || moduleAccess[i].trim()=="dueCollection" || moduleAccess[i].trim()=="chequePaidEntry")
	{
		chequeReceiptMenu=1;
	}
	
	//Added By BILAL For Access Managment 
	//To dispatch GRN and product list
    //12-01-2018
	if(moduleAccess[i].trim()=="dispatchGRN")
	{
		dispatchGRN=1;
	}
	
	if(moduleAccess[i].trim()=="physicalStockupdate")
	{
		physicalStockupdate=1;
	}
	
	if(moduleAccess[i].trim()=="physicalStockadjust")
	{
		physicalStockadjust=1;
	}
	if(moduleAccess[i].trim()=="import_stock")
	{
		import_stock=1;
	}
	if(moduleAccess[i].trim()=="import_product")
	{
		import_product=1;
	}
	if(moduleAccess[i].trim()=="import_cathLab_product")
	{
		import_cathLab_product=1;
	}
	if(moduleAccess[i].trim()=="cathLabProduct")
	{
		cathLabProduct=1;
	}
	if(moduleAccess[i].trim()=="billcomparison")
	{
		billcomparison=1;
	}
		
}	
if(saleMenu==0)
{
	$("#salesBillEntry").hide();
}
if(poMenu==0)
{
	$("#purchaseOrder").hide();
}
if(creditMenu==0)
{
	$("#creditNote").hide();
}
if(debitMenu==0)
{
	$("#debitNote").hide();
}
if(cashReceiptMenu==0)
{
	$("#cashEntry").hide();
}
if(chequeReceiptMenu==0)
{
	$("#chequeEntry").hide();
}
//Added By BILAL 
//For user Access managment 
//12-01-2018 'pharmaMenu-billcomparison'
if(dispatchGRN==0)
{
	$("#pharmaMenu-dispatchGRN").hide();
}

if(physicalStockupdate==0)
{
	$("#pharmaMenu-physicalStockupdate").hide();
}
if(physicalStockadjust==0)
{
	$("#pharmaMenu-physicalStockadjust").hide();
}
if(import_stock==0)
{
	$("#pharmaMenu_import_stock").hide();
}
if(import_product==0)
{
	$("#pharmaMenu_import_product").hide();
}
if(import_cathLab_product==0)
{
	$("#pharmaMenu_import_cathLab_product").hide();
}
if(cathLabProduct==0)
{
	$("#pharmaMenu_cathLabProduct").hide();
}
if(billcomparison ==0)
{
	$("#pharmaMenu-billcomparison").hide();
	}
</script>