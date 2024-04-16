<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function closePopUp() {
		$("#Indent_Sales_Data_Form").hide();
		$("#indentDate").hide();
	}
</script>


<div id="Indent_Sales_Data_Form" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog" style="width: 750px;">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-8 center">
						<h4>
							<i class="fa fa-calendar"></i>Indent Information
						</h4>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1" id="ipdData"></div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">

					<!-- <div class="form-group col-md-7-1"
						style="margin-top: 1px; margin-left: -64px">
						<button type="button" class="btn btn-primary"
							 onclick="closePopUp()"
							>Ok</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Redo</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div> -->
				</div>
			</div>
		</form>
	</div>
</div>


<%@include file="pharma_hospital_sales_batch_pop_up.jsp"%>