<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
function validateLoginDetails()
{
	if($('#txtPassword').val()!=null && $('#txtPassword').val()!='')
	{
		if($('#txtPassword').val()=='user@123')
		{
			var favorite = [];

			$.each($("input[name='approvalCheckbox']:checked"), function() {
				favorite.push($(this).val());
			});

			if (favorite.length == 0) {
				alert("Please select checkbox to Approval");
			}
			else
			{	
				var inputs = [];
				inputs.push('mrnIdArray=' + favorite);
				var str = inputs.join('&');
				jQuery
						.ajax({
							async : true,
							type : "POST",
							data : str + "&reqType=AJAX",
							url : "setApprovalStatus",
							timeout : 1000 * 60 * 5,
							cache : false,
							error : function() {
								alert('error');
							},
							success : function(r) {
								alertify.success(r);
								$("#authentication_pop_up").dialog( "close" );
								setApproval();
							}
						});
			}	
		}
		else
		{
			alertify.error("please Enter Correct Password");
		}	
	}
	else
	{
		alertify.error("please Enter Password");
	}	
}
</script>

<div id="authentication_pop_up" class="modal fade in">
	<div class="col-md-10-1">

		<div class="form-group" style="margin-top: 10px;">
			Enter Password <input type="password" id="txtPassword"
				name="txtPassword" class="form-control typeahead"
				placeholder="Password" tabindex="1"
				autofocus="autofocus" autocomplete="off"
				>
		</div>

	</div>
	<div class="modal-footer">
		<div class="form-group col-md-7-1" style="margin-top: 15px;">
			<button type="button" class="btn btn-primary"
				id="btnSubContractingMaterialIssueSave"
				name="btnSubContractingMaterialIssueSave"
				onclick="validateLoginDetails()">Ok</button>
			<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
		</div>
	</div>

</div>