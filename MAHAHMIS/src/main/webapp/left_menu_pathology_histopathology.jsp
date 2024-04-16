<%@ page import="java.util.ResourceBundle"%>
<script type="text/javascript">
	$(function() {
		$("#ehat_module_19").addClass("menuActive");
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
			
			<li class="TextFont ehatSubModule ehat_subModule_622"><a
				href="histopathology_records.jsp"> <i class="fa fa-bar-chart-o fa-fw"></i> <span class="menu-text">Histopath Records</span>
			</a></li>
			
			<li class="TextFont ehatSubModule ehat_subModule_622"><a
				href="histopath_previous_report.jsp"> <i class="fa fa-undo fa-fw"></i> <span class="menu-text">Histopath Previous Report</span>
			</a></li>
			
			
					
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