/*shortcut.add("esc", function() {
	$('#sidebar').modal('hide');
});

shortcut.add("Ctrl+h", function() {
	$('#sidebar').modal('show');
});*/

function backToList(value) {
	if (value == 'po') {
		window.open("/EhatEnterprise/pharmacy/po/view", "_self");
	}
	if (value == 'purchase') {
		window.open("/EhatEnterprise/pharmacy/purchase/view", "_self");
	}
	if (value == 'creditNote') {
		window.open("/EhatEnterprise/pharmacy/creditNote/view", "_self");
	}
	if (value == 'debitNote') {
		window.open("/EhatEnterprise/pharmacy/debitNote/view", "_self");
	}
	if (value == 'openingStockEntry') {
		window.open("/EhatEnterprise/pharmacy/openingStockEntry/view", "_self");
	}
	
	if (value == 'counterSale') {
		window.open("/EhatEnterprise/pharmacy/counterSale/view", "_self");
	}
	if (value == 'patientSale') {
		window.open("/EhatEnterprise/pharmacy/patientSale/view", "_self");
	}
	if (value == 'hospitalSale') {
		window.open("/EhatEnterprise/pharmacy/hospitalSalesBill/view", "_self");
	}
	if (value == 'indentSale') {
		window.open("/EhatEnterprise/pharmacy/indentSale/view", "_self");
	}
	if (value == 'cashPaidEntry') {
		window.open("/EhatEnterprise/pharmacy/cashPaidEntry/view", "_self");
	}
	if (value == 'chequePaidEntry') {
		window.open("/EhatEnterprise/pharmacy/chequePaidEntry/view", "_self");
	}
}

function openForm(value) {
	if (value == 'po') {
		window.open("/EhatEnterprise/pharmacy/po/view-frm", "_self");
	}
	if (value == 'purchase') {
		window.open("/EhatEnterprise/pharmacy/purchase/view-frm", "_self");
	}
	if (value == 'creditNote') {
		window.open("/EhatEnterprise/pharmacy/creditNote/view-frm", "_self");
	}
	if (value == 'debitNote') {
		window.open("/EhatEnterprise/pharmacy/debitNote/view-frm", "_self");
	}
	if (value == 'counter') {
		window.open("/EhatEnterprise/pharmacy/counterSale/view-frm", "_self");
	}
	if (value == 'patientSale') {
		window.open("/EhatEnterprise/pharmacy/patientSale/view-frm", "_self");
	}
	if (value == 'indentSale') {
		window.open("/EhatEnterprise/pharmacy/indentSale/view-frm", "_self");
	}
	
}

function setFocusToField(fieldName)
{
	$("#"+fieldName).focus();
}

function removeSlaveFocus(value) {

	if (value == 'frmPurchaseOrderForm') {
		$('#frmPurchaseOrderForm div').each(function() {
			if (this.id == 'last') {
				var i = 0;
				$('#last textarea ').each(function() {
					if (i == 0) {
						$(this).focus();
					}
					;
					i++;
				});
			}

		});
	}
}

