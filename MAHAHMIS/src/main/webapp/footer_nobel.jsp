<%-- <%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%> --%>
<script type="text/javascript">	
	var patientIdLabel = $("#patientIdLabel").val();
	$("#lblCenterPatientId").text(patientIdLabel+" :");
	$("#thCenterPatientId").text(patientIdLabel);	
	$("#thCenterPatientId1").text(patientIdLabel);	
</script>
<div id="footer" class="container">
	<nav class="navbar navbar-default navbar-fixed-bottom">
		<div class="navbar-inner navbar-content-center center">
			<input type="hidden" id="synchronizeToken" value="" />
			<!-- <p class="text-muted credit" style="color: white;">
				Copyrights reserved by Orcasys Pvt. Ltd. <a class="weblink"
					href="http://www.orcasys.co/">www.orcasys.co</a>
			</p> -->
		</div>
	</nav>
</div>


