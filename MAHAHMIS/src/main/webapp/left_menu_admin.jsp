<script type="text/javascript">
	$(function() {
		$("#ehat_module_12").addClass("menuActive");

		var r =JSON.parse($("#divAllSubModules").html());		
		setLeftMenuForModule(r,12);
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