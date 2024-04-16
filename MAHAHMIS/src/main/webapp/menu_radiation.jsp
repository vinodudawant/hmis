<script type="text/javascript" src="js/UserAccess.js"></script>
<%@ page import="java.util.ResourceBundle"%>
<script type="text/javascript">
	 $(function() {
		$("#ehat_module_17").addClass("menuActive");
		onload = function() {
			
			getUserAccessToPage(17);				
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
	session.setAttribute("moduleName", "radiation");
%>