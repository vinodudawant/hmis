<script type="text/javascript" src="js/UserAccess.js"></script>
<%@ page import="java.util.ResourceBundle"%>
<script type="text/javascript">
	$(function() {
		$("#ehat_module_3").addClass("menuActive");
         onload = function() {
			
			//getUserAccessToPage(3);
			var r =JSON.parse($("#divAllSubModules").html());		
			setLeftMenuForModule(r,3);							
		}
	});
	</script>

	<!-- SIDEBAR -->
	<div id="sidebar" class="sidebar">
		<div class="sidebar-menu nav-collapse">
			<ul id="leftMenuUl">
				

			</ul>
			<!-- /SIDEBAR MENU -->
		</div>
	</div>

<%
	session.setAttribute("moduleName", "DoctorDesk");
%>