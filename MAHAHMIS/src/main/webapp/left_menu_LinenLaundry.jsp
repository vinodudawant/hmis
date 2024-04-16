<script type="text/javascript">
	$(function() {
		$("#ehat_module_18").addClass("menuActive");
			
		var r =JSON.parse($("#divAllSubModules").html());		
		setLeftMenuForModule(r,18);
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
	session.setAttribute("moduleName", "Loundry");
%>