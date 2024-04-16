<%-- <%@include file="pharma_header.jsp"%> --%>

<script type="text/javascript">
shortcut.add("f8", function() {
	window.open("../../pharmacy/indentSale/view-frm");

});
shortcut.add("f9", function() {
	window.open("../../pharmacy/openingStockEntry/view-frm");

});
shortcut.add("f6", function() {
	window.open("../../pharmacy/counterSale/view-frm");

});

shortcut.add("f7", function() {
	window.open("../../pharmacy/patientSale/view-frm");

}); 

shortcut.add("f5", function() {
	window.open("../../pharmacy/purchase/view-frm");
});

shortcut.add("f4", function() {
	window.open("../../pharmacy/creditNote/view-frm");
});
</script>

<div id="HelpMenu" class="modal fade in">
	<div class="modal-dialog" style="width: 520px;">
		<form action="">
			<div class="modal-content" class="col-md-12">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							<i class="fa fa-calendar"></i>Shortcut Keys
						</h4>
					</div>
				</div>
				<div class="modal-body">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2-1" style="margin-top: 0px;"></div>
					</div>
					<table class="table table-condensed table-hover ">
						<tr>
							<th>Shortcut key</th>
							<th>Explanation</th>
						</tr>
						<tr class="active">
							<td>
								<b>ctrl+h</b>
							</td>
							<td>
								Help menu
							</td>
						</tr>
						<tr class="success">
							<td>
								<b>ctrl+s</b>
							</td>
							<td>
								Save
							</td>
						</tr>
						<tr class="warning">
							<td>
								<b>ctrl+l</b>
							</td>
							<td>
								Back to list
							</td>
						</tr>
						
						<tr class="danger">
							<td>
								<b>esc</b>
							</td>
							<td>
								Exit from pop up window
							</td>
						</tr>
						<tr class="info">
							<td>
								<b>ctrl+f</b>
							</td>
							<td>
								Open Form
							</td>
						</tr>
						
						<tr class="active">
							<td>
								<b>ctrl+w</b>
							</td>
							<td>
								exit from slave
							</td>
						</tr>
						
						
						</tr>
						
						
						
						<tr class="success">
							<td>
								<b>f5</b>
							</td>
							<td>
								Purchase Entry
							</td>
						</tr>
						
						<tr class="danger">
							<td>
								<b>f6</b>
							</td>
							<td>
								Counter Sale
							</td>
						</tr>
						
						<tr class="active">
							<td>
								<b>f7</b>
							</td>
							<td>
								Patient Sale
							</td>
						</tr>
						
						<tr class="active">
							<td>
								<b>f8</b>
							</td>
							<td>
								Indent Sale
							</td>
						</tr>
							<tr class="active">
							<td>
								<b>f9</b>
							</td>
							<td>
							Opening Stock
							</td>
						</tr>
						<tr class="active">
							<td>
								<b>f4</b>
							</td>
							<td>
							Credit Note
							</td>
						</tr>
						<tr class="success">
							<td>
								<b>alt+a</b>
							</td>
							<td>
								open alternative product window
							</td>
						</tr>
						<tr class="warning">
							<td>
								<b>Alt+o</b>
							</td>
							<td>
								Open pending indent
							</td>
						</tr>
						<tr class="danger">
							<td>
								<b>Alt+c</b>
							</td>
							<td>
								Open settle bill
							</td>
						</tr>
							<tr class="success">
							<td>
								<b>Alt+p</b>
							</td>
							<td>
								Open purchase order in sale
							</td>
						</tr>
							<tr class="danger">
							<td>
								<b>Alt+d</b>
							</td>
							<td>
								Cloase purchase order in sale
							</td>
						</tr>
						
					</table>

					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">
					<div class="form-group col-md-7-1" style="margin-top: 15px;">
						<button type="submit" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave"
							onclick="setPopUpValues1()" data-dismiss="modal">Ok</button>
						
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

