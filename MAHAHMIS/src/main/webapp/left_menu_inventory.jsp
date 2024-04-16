<script type="text/javascript">
	$(function() {
		$("#ehat_module_7").addClass("menuActive");

	});
	
	function showPrint() {
		window.open("ProductReportPdf.jsp");
	}
</script>

<div
	style="padding-top: 0.5px; float: left; height: 100%; background-color: #f3f3f3; margin-top: 0px;">
	<ul id="verticalmenu" class="glossymenu"
		style="background-color: #f3f3f3;">
		<!-- <li id="liinventory"><a href="Inventory.jsp">Inventory</a></li> -->

		<li id="limasters" class="TextFont dropdown-submenu"><a href="#">Masters</a>
			<ul class="dropdown-menu">
				<li class="TextFont"><a href="Product_master.jsp">Product
						Master</a></li>
				<li class="TextFont"><a href="Category_master.jsp">Category
						Master</a></li>
				<li class="TextFont"><a href="Manufacturer_master.jsp">Manufacturer
						Master</a></li>
				<li class="TextFont"><a href="Form_master.jsp">Form Master</a></li>
				<li class="TextFont"><a href="Packing_master.jsp">Packing
						Master</a></li>
				<li class="TextFont"><a href="Ingredients_master.jsp">Ingredients
						Master</a></li>
				<li class="TextFont"><a href="Shelf_master.jsp">Shelf
						Master</a></li>
				<li class="TextFont"><a href="Vendor_master.jsp">Vendor
						Master</a></li>
				<li class="TextFont"><a href="Uom_master.jsp">Uom Master</a></li>
				<li class="TextFont"><a href="Template_master.jsp">Template
						Master</a></li>
				<li class="TextFont"><a href="Trolley_master.jsp">Trolley
						Master</a></li>

			</ul></li>

		<!-- 			<li id="linursetrolley"><a href="NursingTrolley.jsp">Nursing
					Trolley</a></li>
			<li id="licathtrolley"><a href="CathTrolley.jsp">Cath
					Trolley</a></li> -->

		<li id="liReqmasters" class="TextFont"><a
			href="TrolleyRequirementMaster.jsp">Requirement</a></li>


		<li id="liorder" class="TextFont dropdown-submenu"><a href="#">Purchase
				Enquiry</a>
			<ul class="dropdown-menu">
				<li id="licathtrolley" class="TextFont"><a
					href="PurchaseEnq.jsp">Purchase Enquiry</a></li>
				<li id="licathtrolley" class="TextFont"><a
					href="PurchaseEnqDatabase.jsp">View Purchase Enquiry</a></li>
			</ul></li>

		<li id="liorder" class="TextFont dropdown-submenu"><a href="#">Purchase
				Order</a>
			<ul class="dropdown-menu">
				<li class="TextFont"><a href="PurchaseOrder.jsp">New Order</a></li>
				<li class="TextFont"><a href="PurchaseOrderDatabase.jsp">Placed
						Order</a></li>
			</ul></li>


		<li id="ligrnmaster" class="TextFont dropdown-submenu"><a
			href="#">GRN</a>

			<ul class="dropdown-menu">
				<li class="TextFont"><a href="GRNDashBoard.jsp">GRN List</a></li>
				<li class="TextFont"><a href="GrnMaster.jsp">Generate GRN</a></li>
			</ul></li>

		<li id="liginmaster" class="TextFont dropdown-submenu"><a
			href="#">GIN</a>

			<ul class="dropdown-menu">
				<li class="TextFont"><a href="GINDashBoard.jsp">GIN List</a></li>
				<li class="TextFont"><a href="GinMaster.jsp">Generate GIN</a></li>
			</ul></li>

		<li id="ligrntrollymaster" class="TextFont"><a
			href="TrollyGRN.jsp">Trolley GRN</a></li>
		<li id="liorder"><a href="#" class="TextFont dropdown-submenu">Stock
				Adjustment</a>
			<ul class="dropdown-menu">
				<li id="licathtrolley" class="TextFont"><a href="StockAdj.jsp">Stock
						Adjustment</a></li>

				<li id="licathtrolley" class="TextFont"><a
					href="StockAdjDatabase.jsp">View Stock Adjustment</a></li>
			</ul></li>
		<li id="liStockCard" class="TextFont"><a href="StockCard.jsp">Stock
				Card</a></li>
		<li id="liorder" class="TextFont dropdown-submenu"><a href="#">Reports</a>
			<ul class="dropdown-menu">
				<li id="licathtrolley" class="TextFont"><a
					onclick="showPrint();">Product Reports</a></li>
			</ul></li>


	</ul>

</div>
