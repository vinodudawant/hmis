shortcut.add("esc", function() {
	$('#HelpMenu').modal('hide');
});

shortcut.add("Ctrl+h", function() {
	$('#HelpMenu').modal('show');
});

function viewAllExpiryProduct() 
{
$("#view_expiry_popUp_form").modal("show");
fetchBatchDetailsByExpiry();
}

function backToList(value) {
	if (value == 'po') {
		window.open("/MAHAHMIS/pharmacy/po/view", "_self");
	}
	if (value == 'purchase') {
		window.open("/MAHAHMIS/pharmacy/purchase/view", "_self");
	}
	if (value == 'creditNote') {
		window.open("/MAHAHMIS/pharmacy/creditNote/view", "_self");
	}
	if (value == 'debitNote') {
		window.open("/MAHAHMIS/pharmacy/debitNote/view", "_self");
	}
	if (value == 'openingStockEntry') {
		window.open("/MAHAHMIS/pharmacy/openingStockEntry/view", "_self");
	}
	
	if (value == 'counterSale') {
		window.open("/MAHAHMIS/pharmacy/counterSale/view", "_self");
	}
	if (value == 'patientSale') {
		window.open("/MAHAHMIS/pharmacy/patientSale/view", "_self");
	}
	if (value == 'hospitalSale') {
		window.open("/MAHAHMIS/pharmacy/hospitalSalesBill/view", "_self");
	}
	if (value == 'indentSale') {
		window.open("/MAHAHMIS/pharmacy/indentSale/view", "_self");
	}
	if (value == 'cashPaidEntry') {
		window.open("/MAHAHMIS/pharmacy/cashPaidEntry/view", "_self");
	}
	if (value == 'chequePaidEntry') {
		window.open("/MAHAHMIS/pharmacy/chequePaidEntry/view", "_self");
	}
	if (value == 'correctionRateList') {
		window.open("/MAHAHMIS/pharmacy/correctionRate/view", "_self");
	}
}

function openForm(value) {
	if (value == 'po') {
		window.open("/MAHAHMIS/pharmacy/po/view-frm", "_self");
	}
	if (value == 'purchase') {
		window.open("/MAHAHMIS/pharmacy/purchase/view-frm", "_self");
	}
	if (value == 'creditNote') {
		window.open("/MAHAHMIS/pharmacy/creditNote/view-frm", "_self");
	}
	if (value == 'debitNote') {
		window.open("/MAHAHMIS/pharmacy/debitNote/view-frm", "_self");
	}
	if (value == 'counter') {
		window.open("/MAHAHMIS/pharmacy/counterSale/view-frm", "_self");
	}
	if (value == 'counterSale') {
		window.open("/MAHAHMIS/pharmacy/counterSale/view-frm", "_self");
	}
	if (value == 'patientSale') {
		window.open("/MAHAHMIS/pharmacy/patientSale/view-frm", "_self");
	}
	if (value == 'indentSale') {
		window.open("/MAHAHMIS/pharmacy/indentSale/view-frm", "_self");
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

