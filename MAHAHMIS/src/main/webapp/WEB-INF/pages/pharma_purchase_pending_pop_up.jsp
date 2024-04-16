<%@page import="java.util.ResourceBundle"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function hidePopUp() {
		location.reload(true);
	}
</script>

<div id="purchase_entry_data" class="modal fade in" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" style="width: 900px;">
		<div class="modal-content">
			<div class="modal-header ">
			 <%
				ResourceBundle bundle1 = ResourceBundle
						.getBundle("EhatEnterpriseConfigurationFile");

				String goodsReceiptNote1 = bundle1.getObject(
						"pharma_purchase_entry_name").toString();
			%> 
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="exampleModalLabel"><%= goodsReceiptNote1.toString()%></h4>
			</div>
			
			<div class="modal-body col-md-12 panel panel-default" style="overflow-y:scroll;height:500px;">

				<div class="col-md-12-1" id='indentPendingData'
					style="margin-top: 3%;"><b><h3><font color='red'>Loading Data.....</font></h3></b></div>

			</div>

			<div class="modal-footer"></div>
		</div>

	</div>
</div>
