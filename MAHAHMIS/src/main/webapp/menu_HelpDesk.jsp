<script type="text/javascript">
	
	$(function() {
		
		$("#ehat_module_1").addClass("menuActive");
		
		var menuHeaderName = $("#menuHeaderName").val();
		var r =JSON.parse($("#divAllSubModules").html());
		setLeftMenuForModule(r,1,menuHeaderName);	
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
	session.setAttribute("moduleName", "opd");
%>
