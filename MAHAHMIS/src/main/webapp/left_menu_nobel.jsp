<script type="text/javascript" src="js/UserAccess.js"></script>

<script type="text/javascript">
	$(function() {
		$("#ehat_module_11").addClass("menuActive");
		onload = function() {
			
			//getUserAccessToPage(11);
			var r =JSON.parse($("#divAllSubModules").html());		
			setLeftMenuForModule(r,11);							
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
	session.setAttribute("moduleName", "admin");
%>