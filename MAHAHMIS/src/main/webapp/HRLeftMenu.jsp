<script type="text/javascript">
	$(function() {
		$("#ehat_module_13").addClass("menuActive");
		
		var r =JSON.parse($("#divAllSubModules").html());		
		setLeftMenuForModule(r,13);			
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
	session.setAttribute("moduleName", "HR");
%>