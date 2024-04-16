<script type="text/javascript">
	$(function() {
		$("#ehatMod13").addClass("menuActive");
	});
</script>
<!-- SIDEBAR -->
<div id="sidebar" class="sidebar">
	<div class="slimScrollDiv"
		style="position: relative; overflow: hidden; width: auto; height: 608px;">
		<div class="sidebar-menu nav-collapse">

			<ul>
				<li id="repaint" class="has-sub"><a class="" href="#"> <span
						class="menu-text">Repaint</span><span class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span> Bill Print</a></li>
						<li id="hospDetail" class="sub-menu-text"><a class=""
							href="#"><span class="menu-text">Sales Bill
									Print(From-to)</span></a></li>
						<li class="has-sub-sub"><a class="" href="javascript:;"><span
								class="sub-menu-text">Label Printing</span><span class="arrow"></span></a>
							<ul class="sub-sub">
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span> ProductWise</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>NameWise</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>ShelfWise</a></li>
							</ul></li>
					</ul></li>

				<li id="dataEntry" class="TextFont has-sub"><a href="#">Data
						Entry<span class="arrow"></span>
				</a>
					<ul class="sub">
						<li class="has-sub-sub"><a class="" href="javascript:;"><span
								class="sub-menu-text"></span>Change Shelf No<span class="arrow"></span></a>
							<ul class="sub-sub">
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span> ProductWise</a></li>
								<li><a class="" href="hospital_info.jsp"><span
										class="sub-menu-text"></span>ShelfWise</a></li>
							</ul></li>
					</ul></li>

				<li id="similarProducts" class="TextFont has-sub"><a href="#">Similar
						Products</a></li>
				<li id="customerMobileSearch" class="TextFont has-sub"><a
					href="#">Customer Mobile Search</a></li>
				<li id="stockOutEntry" class="TextFont has-sub"><a href="#">Stock
						Out Entry</a></li>
				<li id="discountStructure" class="TextFont has-sub"><a href="#">Discount
						Structure</a></li>
			</ul>
		</div>
	</div>
</div>
<!-- /SIDEBAR -->

<%
	session.setAttribute("moduleName", "Pharmacy");
%>
