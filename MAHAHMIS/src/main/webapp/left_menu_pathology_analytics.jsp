<%@ page import="java.util.ResourceBundle"%>
<script type="text/javascript">
	$(function() {
		$("#ehat_module_18").addClass("menuActive");
	});
</script>
<div id="sidebar" class="sidebar">
	<div class="sidebar-menu nav-collapse">
	
		<ul>
			<%
				ResourceBundle resourceBundleEhat1 = ResourceBundle
						.getBundle("Ehat");
				String pathMngmnt = resourceBundleEhat1.getObject(
						"pathologyManagement").toString();
				if (pathMngmnt.equalsIgnoreCase("on")) {
			%>
			<!-- <li id="ris" class="TextFont ehatSubModule ehat_subModule_612"
				style="display: none;"><a href="pathology_machine_utilization_report.jsp"> <i
					class="fa fa-credit-card fa-fw"></i> <span class="menu-text">Machine Utilization Report</span></a>
			</li> -->
			<li class="TextFont ehatSubModule ehat_subModule_618" style="display:none;"><a
				href="ehat_daily_collection_report.jsp"> <i class="fa fa-bar-chart-o fa-fw"></i> <span class="menu-text">Daily Collection Report</span>
			</a></li>
			
			<li class="TextFont ehatSubModule ehat_subModule_619" style="display:none;">
				<a href="pathology_test_patient_details_report.jsp">
				<i class="fa fa-fw"><img alt="" height="19px;" width="19px;" src="images/science-512.png"></i>
				Patient Test Details Report</a>
			</li>
					
			<li class="TextFont ehatSubModule ehat_subModule_620" style="display:none;">
				<a href="pathology_TestCountSummary_Report.jsp">
				<i class="fa fa-fw"><img alt="" height="19px;" width="19px;" src="images/science-512.png"></i>
				Test Count Summary Report</a>
			</li>
					
			<li class="TextFont ehatSubModule ehat_subModule_621" style="display:none;">
				<a href="pathology_tat_Report.jsp">
				<i class="fa fa-fw"><img alt="" height="19px;" width="19px;" src="images/science-512.png"></i>
				TAT Report</a>
			</li>
					
			<%
				}
			%>

			<%
				String haemodiaFlow = resourceBundleEhat1.getObject(
						"haemodialysisFlow").toString();
				if (haemodiaFlow.equalsIgnoreCase("on")) {
			%>
			<%
				}
			%>

		</ul>
		<!-- /SIDEBAR MENU -->
	</div>
</div>
<!-- /SIDEBAR -->
<%
	session.setAttribute("moduleName", "Lab");
%>