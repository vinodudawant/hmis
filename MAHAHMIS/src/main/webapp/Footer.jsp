<%-- <%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%> --%>
<!-- <script type="text/javascript">
	$(window).ready(function() {
		var selectedTab = $('.menuActive').text();
		var inputs = [];
		inputs.push(' ');
		<c:forEach items="${sessionScope.permissions}" var="permission">
			inputs.push('${permission}');
		</c:forEach>
	
		var isPermitted = false;
		for(var i=0; i < inputs.length; i++){
			var tabName = inputs[i];
			if(selectedTab.indexOf(tabName) >=0){
				isPermitted  = true;
				break;
			}
		}
		
		if(!isPermitted){
			window.location = "accessdenied.jsp";
		} 
	});
</script> -->

<%-- <%@include file="ehat_user_access_control.jsp"%> --%>
<script type="text/javascript">	
	var patientIdLabel = $("#patientIdLabel").val();	
	$("#lblCenterPatientId").text(patientIdLabel+" :");
	$("#thCenterPatientId").html(patientIdLabel);
	$("#thCenterPatientId1").html(patientIdLabel);
	$("#thCenterPatientId2").html(patientIdLabel);
	$("#thCenterPatientId3").html(patientIdLabel);
	$("#thCenterPatientId4").html(patientIdLabel);
	$("#thCenterPatientId5").html(patientIdLabel);
</script>

<div id="footer" class="container">
	<nav class="navbar navbar-default navbar-fixed-bottom">
		<div class="navbar-inner navbar-content-center center">
			<input type="hidden" id="synchronizeToken" value="" />
			<!-- <p class="text-muted credit" style="color: white;">
				Copyrights reserved by Orcasys Pvt. Ltd. <a
					style="margin-left: 5px;" href="http://www.orcasys.co/">www.orcasys.co</a>
			</p> -->
		</div>
	</nav>
</div>
<!-- <div id="footer" style="height: 3%;">
	<input type="hidden" id="synchronizeToken" value="" />
	<div
		style="text-align: center; float: none; color: #FFF; padding-top: 0.3%;">Copyrights
		reserved by Orcasys Pvt. Ltd.</div>
</div> -->