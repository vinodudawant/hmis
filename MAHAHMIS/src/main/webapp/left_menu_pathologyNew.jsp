<script type="text/javascript">
	$(function() {
		$("#ehat_module_9").addClass("menuActive");
		
		var r =JSON.parse($("#divAllSubModules").html());		
		setLeftMenuForModule(r,9);
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
	session.setAttribute("moduleName", "Lab");
%>
