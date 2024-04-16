<script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script>

<script type="text/javascript">
	$(function() {
		$("#ehat_module_14").addClass("menuActive");
	});
	
	shortcut.add("f8", function() {
		window.open("/EhatEnterprise/hisabDiagnostics.jsp");
	});
	
	shortcut.add("f9", function() {
		window.open("/EhatEnterprise/hisabOpd.jsp");
	});
	
	shortcut.add("f10", function() {
		window.open("/EhatEnterprise/hisabIpd.jsp");
	});
	
	shortcut.add("f11", function() {
		window.open("/EhatEnterprise/hisabVouchers.jsp");
	});
	
	shortcut.add("f12", function() {
		window.open("/EhatEnterprise/hisabVouchers.jsp");
	});
	
</script>

<div id="sidebar" class="sidebar sidebar-fixed">
	<div class="sidebar-menu nav-collapse">
		<ul>

			<li id="home" class="TextFont"><a href="ehat_finance_dashboard.jsp">
					<i class="fa fa-th-large fa-fw"></i><span class="menu-text">Dashboard</span>
			</a></li>

			<li id="profile" class="TextFont"><a href="hisabDiagnostics.jsp">
					<i class="fa fa-fw"><img width="19px;" height="19px;"
						src="images/science-512.png" alt=""></i> <span class="menu-text">Diagnosis
						Finance (F8)</span>
			</a></li>


			<li id="leave" class="TextFont"><a href="hisabOpd.jsp"> <i
					class="fa fa-stethoscope fa-fw"></i><span class="menu-text">OPD
						Finance (F9)</span>
			</a></li>

			<li id="complaint" class="TextFont"><a href="hisabIpd.jsp">
					<i class="fa fa-fw"> <img width="17px;" height="10px;"
						src="images/bedEmpty.png" alt="">
				</i> <span class="menu-text">IPD Finance (F10)</span>
			</a></li>
			
			
			<li id="" class="has-sub"><a href="hisabVouchers.jsp" class=""> <i
					class="fa fa-credit-card fa-fw"></i> <span class="menu-text">Vouchers Hisab</span>
					<!-- <span class="arrow"></span> -->
			</a>
			<!-- <ul class="sub">

					<li class="has-sub-sub">
						<a href="cashVoucherHisab.jsp" class="">
							<i class="fa fa-folder-open-o fa-fw"></i> <span class="menu-text">Cash
								Voucher</span>
						</a>						
					</li>
					
					<li class="has-sub-sub">
						<a href="cashVoucherHisab.jsp" class="">
							<i class="fa fa-folder-open-o fa-fw"></i> 
								<span class="menu-text">RBMSN Voucher</span>								
						</a>
					</li>
					
					<li class="has-sub-sub">
						<a href="cashVoucherHisab.jsp" class="">
							<i class="fa fa-folder-open-o fa-fw"></i> 
								<span class="menu-text">DOD Voucher</span>							
						</a>
					</li>
					
					<li class="has-sub-sub">
						<a href="cashVoucherHisab.jsp" class="">
							<i class="fa fa-folder-open-o fa-fw"></i> 
								<span class="menu-text">Motivator Voucher</span>							
						</a>
					</li>
					
					<li class="has-sub-sub">
						<a href="cashVoucherHisab.jsp" class="">
							<i class="fa fa-folder-open-o fa-fw"></i> 
								<span class="menu-text">Expense Voucher</span>							
						</a>
					</li>			
					
				</ul> -->
			</li>
			
			<!-- <li id="professionalFeesNoble" class="TextFont has-sub"><a
					href="javascript:;" class=""> <i class="fa fa-credit-card fa-fw"></i>
						<span class="menu-text">Professional Fees </span><span class="arrow"></span>
				</a>
					<ul class="sub">
					<li><a href="doctors_payment_group_master.jsp">Group Master</a></li>
					<li><a href="profees_percent_master.jsp">Percentage Master</a></li>
						<li><a href="profees_doctors_payment.jsp">Professional Fees doctor payment</a></li>
						<li><a href="doctors_payment_generated_vouchers.jsp">All Generated Vouchers</a></li>
						<li><a href="profees_doctors_payable_report.jsp">Reports </a>
						<ul class="sub1">
							<li><a href="profees_doctors_report.jsp" style="color: #555555;">Doctor's Payable Report</a></li>
							<li><a href="profees_group_doctor_report.jsp" style="color: #555555;">Doctor's Group Wise Report</a></li>
							<li><a href="profees_diagnostics_payable_report.jsp" style="color: #555555;">Diagnostics Payable Report</a></li>
							<li><a href="profees_business_summary_doctors.jsp" style="color: #555555;">Business Summary Report Doctor's </a></li>
							<li><a href="profees_business_summary_hospital.jsp" style="color: #555555;">Business Summary Report Hospital </a></li>
						
						</ul>
						</li>
						
					</ul>
			</li> -->
			
			
			<li id="complaint" class="TextFont"><a href="hisabProFees.jsp">
					<i class="fa fa-credit-card fa-fw"> 
				</i> <span class="menu-text">Professional Fees Finance</span>
			</a></li>
			
			
		</ul>

	</div>
	<!-- /.sidebar-collapse -->
</div>


<!-- SIDEBAR -->
<!-- <div id="sidebar" class="sidebar">
	<div class="slimScrollDiv"
		style="position: relative; overflow: hidden; width: auto; height: 608px;">
	<div class="sidebar-menu nav-collapse">

		<ul id="verticalmenu" class="glossymenu" style="background-color: #f3f3f3;">

			<li id="home" class="TextFont"><a href="hisabDashboard.jsp">
					<i class="fa fa-th-large fa-fw"></i><span class="menu-text">Dashboard</span>
			</a></li>

			<li id="profile" class="TextFont"><a href="hisabDiagnostics.jsp">
					<i class="fa fa-fw"><img width="19px;" height="19px;"
						src="images/science-512.png" alt=""></i> <span class="menu-text">Diagnosis
						Hisab (F8)</span>
			</a></li>


			<li id="leave" class="TextFont"><a href="hisabOpd.jsp"> <i
					class="fa fa-stethoscope fa-fw"></i><span class="menu-text">OPD
						Hisab (F9)</span>
			</a></li>

			<li id="complaint" class="TextFont"><a href="hisabIpd.jsp">
					<i class="fa fa-fw"> <img width="17px;" height="10px;"
						src="images/bedEmpty.png" alt="">
				</i> <span class="menu-text">IPD Hisab (F10)</span>
			</a></li>
			
			<li id="complaint" class="TextFont"><a href="hisabVouchers.jsp">
					<i class="fa fa-fw"> <img width="17px;" height="10px;"
						src="images/bedEmpty.png" alt="">
				</i> <span class="menu-text">Vouchers Hisab (F11)</span>
			</a>
			</li>
			
			<li id="limasters" class="TextFont dropdown-submenu"><a href="#">Vouchers Hisab (F11)</a>
			<ul class="dropdown-menu">
				<li id="licathtrolley" class="TextFont"><a
					href="PurchaseEnq.jsp">Cash Voucher</a></li>
				<li id="licathtrolley" class="TextFont"><a
					href="PurchaseEnqDatabase.jsp">RBMSN Voucher</a></li>
				<li id="licathtrolley" class="TextFont"><a
					href="PurchaseEnqDatabase.jsp">DOD Voucher</a></li>
				<li id="licathtrolley" class="TextFont"><a
					href="PurchaseEnqDatabase.jsp">Motivator Voucher</a></li>
				<li id="licathtrolley" class="TextFont"><a
					href="PurchaseEnqDatabase.jsp">Expense Voucher</a></li>
			</ul></li>

		</ul>
		
	</div>
</div> 
</div> -->







<!-- 
<script src="js/ExtraJs/metisMenu.min.js"></script>
<script type="text/javascript">
		 $(function() {
			$("#ehatMod7").addClass("menuActive");

		});
</script> -->

							  
<!-- </div> -->


<%
	session.setAttribute("moduleName", "Hisab");
%>