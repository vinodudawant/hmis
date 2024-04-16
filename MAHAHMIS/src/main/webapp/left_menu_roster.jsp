<script type="text/javascript">
	$(function() {
		$("#ehat_module_2").addClass("menuActive");

		var r =JSON.parse($("#divAllSubModules").html());		
		setLeftMenuForModule(r,2);			
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
	session.setAttribute("moduleName", "Roster Management");
%>