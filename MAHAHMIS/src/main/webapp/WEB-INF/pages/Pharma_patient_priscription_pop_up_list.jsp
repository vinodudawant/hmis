<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function hidePopUp() {
		location.reload(true);
	}
</script>

<div id="patient_prescription_data" class="modal fade in" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" style="width: 900px;">
		<div class="modal-content">
			<div class="modal-header ">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="exampleModalLabel">Patient Prescription</h4>
			</div>
			<div class="modal-body col-md-12 panel panel-default">

				<div class="col-md-12-1" id='indentPendingData'
					style="margin-top: 3%;"><b><h3><font color='red'>Loading Data.....</font></h3></b></div>

			</div>

			<div class="modal-footer"></div>
		</div>

	</div>
</div>
