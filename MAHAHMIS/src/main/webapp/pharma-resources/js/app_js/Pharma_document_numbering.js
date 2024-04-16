setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(4000);
}, 5000);

function resetCategoryValues() {
	$('#categoryMaster').find('input:text').val('');
	$('#categoryMaster').find('input:hidden').val('');
}

function deleteDocNum(docNumId) {
	var retVal = confirm("Do you want to delete It?");
	var documentNumId = parseInt(docNumId);
	if (retVal == true) {
		var inputs = [];
		inputs.push('documentNumId=' + documentNumId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/documentNum/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						getDoctorsList();
						if (r == true) {
							$('#msgDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
					}
				});

		return true;
	} else {

	}

}
function edit(docNumId) {

	$('#txtDocNumId').val($('#docNumId' + docNumId).val());
	$('#listDocument').val($('#docName' + docNumId).val());
	$('#txtDocSeries').val($('#docSeries' + docNumId).val());
	$('#txtDocNo').val($('#docNo' + docNumId).val());
	$('#txtPrefix').val($('#docPrefix' + docNumId).val());
	$('#txtSufix').val($('#docSuffix' + docNumId).val());
	$('#listFinancialYear').val($('#yearFinancial' + docNumId).val());
}
function getDoctorsList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/documentNum/docNumsList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setTableContent(r);
		}
	});

	return true;
}

function splitContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenId').val(arr[1]);
		}
	} else {
		$('#hiddenId').val(0);
	}
}

function searchDocNum(docNumId) {

	var documentNumId = parseInt(docNumId);
	var inputs = [];
	inputs.push('docNumId=' + documentNumId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/documentNum/getDocNumById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTableContent(r);
		}
	});
}

// set table content
function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ "<tr> <td style='height: 21.5px;' class='numeric'>"
				+ (i + 1)
				+ "<input type='hidden' value='"
				+ r[i].docNumId
				+ "' id='docNumId"
				+ r[i].docNumId
				+ "'></td> <td style='height: 21.5px;' class=''>"
				+ r[i].documentMaster.docName
				+ "<input type='hidden' value='"
				+ r[i].documentMaster.docId
				+ "' id='docName"
				+ r[i].docNumId
				+ "'> </td> <td style='height: 21.5px;' class=''>"
				+ r[i].docSuffix
				+ ""
				+ r[i].docSeries
				+ "</td> <td style='height: 21.5px;' class=''>"
				+ r[i].yearMaster.yearFinancial
				+ "<input type='hidden' id='yearFinancial"
				+ r[i].docNumId
				+ "' value='"
				+ r[i].yearMaster.yearId
				+ "'></td> <td style='text-align: center;'> <input type='hidden' value='"
				+ r[i].docSeries
				+ "' id='docSeries"
				+ r[i].docNumId
				+ "'> <input type='hidden' value='"
				+ r[i].docNo
				+ "' id='docNo"
				+ r[i].docNumId
				+ "'> <input type='hidden' value='"
				+ r[i].docPrefix
				+ "' id='docPrefix"
				+ r[i].docNumId
				+ "'> <input type='hidden' value='"
				+ r[i].docSuffix
				+ "' id='docSuffix"
				+ r[i].docNumId
				+ "'> <button style='height: 21.5px; text-align: center;' value='EDIT' id='btnEdit"
				+ r[i].docNumId
				+ "' onclick='edit("
				+ r[i].docNumId
				+ ")'> <i class='fa fa-edit' class='edit'></i> </button> </td> <td style='height: 21.5px; text-align: center;'> <button style='height: 21.5px;' value='DELETE' id='btnDelete"
				+ r[i].docNumId
				+ "' onclick='deleteDocNum("
				+ r[i].docNumId
				+ ")'> <i class='fa fa-trash-o' class='edit'></i> </button> </td></tr>";
	}

	$('#documentNumList').html(divContent);
}