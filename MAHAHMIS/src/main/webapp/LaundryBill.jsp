<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Laundry Bill</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">


<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/validate.js"></script>
<link rel="stylesheet" type="text/css" href="js/datePicker.css" />
<script type="text/javascript" src="js/jquery.datePicker-min.js"></script>
<script src="js/jquery.datePicker-min.js" type="text/javascript"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	$(window).ready(function() {
		$('#popup_container2').datePicker({
			clickInput : true
		});
		$('#popup_container3').datePicker({
			clickInput : true
		});
	});
</script>
<script type="text/javascript">
	onload = function() {
		setLaundryItemNameTemplate(1);
		setOwnerNameTemplate();
		$("#laundry").addClass("anchorActive");
	}
</script>
<script src="js/jquery.datePicker-min.js" type="text/javascript">
	function validateUnitM(unit, id) {

		if (isNaN(unit) == true) {
			alert("Please enter number only");
			$("#" + id).val("");
			return false;
		}
	}
	function addRow(tableID, txtRowCount) {
		//alert("Fun addRow get Called");
		var table = document.getElementById(tableID);
		var hiddenRowCount = document.getElementById(txtRowCount);

		var rowCount = table.rows.length;

		var totalRow = document.getElementById("txtTotalRow").value;
		//alert(totalRow);

		if (totalRow == 0) {
			totalRow = rowCount;
			document.getElementById("txtTotalRow").value = ++totalRow;
		} else {
			document.getElementById("txtTotalRow").value = ++totalRow;

		}
		document.getElementById("rowCount").value = ++rowCount;
		--rowCount;

		hiddenRowCount.value = rowCount;
		var row = table.insertRow(rowCount);

		var cell1 = row.insertCell(0);
		cell1.setAttribute('align', 'center');
		cell1.style.width = "5%";
		// cell1.style.text-align = "center";  
		cell1.style.padding = "2.15pt 5.75pt 2.15pt 5.75pt";
		cell1.style.height = ".2in";
		cell1.innerHTML = eval(parseInt(
				document.getElementById("txtTotalRow").value, 10));
		var cell2 = row.insertCell(1);
		cell2.style.width = "28%";
		cell2.style.padding = "2.15pt 5.75pt 2.15pt 5.75pt";
		cell2.style.height = ".2in";

		var element2 = document.createElement("div");

		element2.id = "lItem"
				+ eval(parseInt(document.getElementById("txtTotalRow").value,
						10));
		var divID = eval(parseInt(document.getElementById("txtTotalRow").value,
				10));
		element2.setAttribute("style", "width:100%");

		element2.size = "44";
		//style="border-width: 2px; border-color: activeborder;"
		cell2.setAttribute('align', 'center');
		cell2.appendChild(element2);

		var cell3 = row.insertCell(2);

		//cell3.setAttribute('colspan', '2');
		cell3.style.width = "18%";
		cell3.style.padding = "2.15pt 3.75pt 2.15pt 5.75pt";
		cell3.style.height = ".2in";
		//cell3.style.paddingright="101px";
		var element3 = document.createElement("input");
		element3.type = "text";
		element3.size = "22";
		element3.id = "txtUnit"
				+ eval(parseInt(document.getElementById("txtTotalRow").value,
						10));

		element3.setAttribute("style",
				"border: 1px solid #069;text-align: right;padding-right:10px");
		/* element3.onkeypress = function() {
			//alert("hi");
			validateUnitM(element3.value);

		} */
		element3.onkeyup = function() {
			validateUnitM(element3.value, this.id);
			setEachTotal(element4.id, element3.id, element5.id, this.id);

		}

		cell3.setAttribute('align', 'center');
		cell3.appendChild(element3);

		var cell4 = row.insertCell(3);
		cell4.style.width = "18%";
		cell4.style.padding = "2.15pt 7.8pt 2.15pt 5.75pt";
		cell4.style.height = ".2in";
		//cell4.style.padding-right="1.6%";
		var element4 = document.createElement("input");
		element4.type = "text";
		element4.size = "22";
		element4.id = "txtUnitPrice"
				+ eval(parseInt(document.getElementById("txtTotalRow").value,
						10));
		element4.setAttribute("style",
				"border: 1px solid #069;text-align: right;padding-right:10px");
		element4.setAttribute("readonly", "readonly");

		element4.type = "text";

		cell4.setAttribute('align', 'center');
		cell4.appendChild(element4);

		var cell5 = row.insertCell(4);
		cell5.style.width = "20%";
		cell5.style.padding = "2.15pt .15in 2.15pt .15in";
		cell5.style.height = ".2in";
		//cell5.style.padding.left = "20%";
		var element5 = document.createElement("input");
		element5.type = "text";
		element5.size = "22";
		element5.id = "txtPerItemTotal"
				+ eval(parseInt(document.getElementById("txtTotalRow").value,
						10));
		//cell5.setAttribute("style", "padding-left: 15px");
		element5.setAttribute("style",
				"border: 1px solid #069;text-align: right;padding-right:10px");
		element5.setAttribute("readonly", "readonly");
		//cell5.setAttribute('align', 'center');
		cell5.appendChild(element5);

		var cell6 = row.insertCell(5);
		cell6.style.width = "8%";
		cell6.style.padding = "2.15pt .15in 2.15pt .15in";
		cell6.style.height = ".2in";
		var element6 = document.createElement("input");
		element6.type = "checkbox";
		cell6.appendChild(element6);

		$(".auto").autocomplete(
				"AutoSuggetionServlet?auto=medicineOfDist&did="
						+ $("#did").val());

		setLaundryItemNameTemplate(divID);

	}
	function deleteRow(dataTable) {

		//alert(dataTable);

		try {
			var table = document.getElementById(dataTable);
			var rowCount = table.rows.length;

			for ( var i = 0; i < rowCount; i++) {
				var row = table.rows[i];
				var chkbox = row.cells[5].childNodes[0];
				//alert(chkbox);
				if (null != chkbox && true == chkbox.checked) {
					table.deleteRow(i);
					//alert(chkbox.value);
					var ipid = chkbox.value;

					//deleteRowPO(ipid);

					rowCount--;
					i--;
				}

			}

		} catch (e) {
			//alert(e);
		}
		setSubTotal();
	}

	function closeWindow() {

		$('#rightContActual').mouseover(function() {

		});
	}

	function printDiv(divName) {

		var duedate = $("#popup_container2").val();

		var total = $("#txtSubtotal").val();
		var selOwnerName = $("#selOwnerName").find(':selected').text();

		var sign = $("#txtSign").val();

		var rowcount = $("#rowCount").val();
		//alert(rowcount);
		if (rowcount == "{--rowCount}") {
			rowcount = 1;
		}

		var a = [];
		var b = [];
		var c = [];
		var d = [];

		for ( var j = 1; j <= rowcount; j++) {
			if ($("#selLitemName" + j).val() == undefined) {
			} else {

				a[j] = $("#selLitemName" + j).find(':selected').text();
				b[j] = $("#txtUnitPrice" + j).val();
				c[j] = $("#txtUnit" + j).val();
				d[j] = $("#txtPerItemTotal" + j).val();
			}
		}

		var WindowObject = window.open('', ' ', '');
		WindowObject.document
				.writeln('<html><body><h1 align="center">$tag________y Bil_Laundry Bill_$tag__$tag__$tag_______________$tag <div	style="width: 96.8%;  font-weight: bold;height:20px"> <div style="width: 100%;">  <div	style="width: 5%;  color: #000; text-align: center; float: left;">Date:'
						+ duedate
						+ ' _$tag__$tag__$tag_______________$tag_$tag_	<div	style="width: 32%;  color: #000; padding-left: 25%;  float: left;padding-right: 1%; text-align: center;">To Whom:'
						+ selOwnerName
						+ '_$tag__$tag__$tag_______________$tag_$tag__$tag_ _$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag______________paddin$tag__$tag__$tag__$tag_<div	style="width: 100%; padding-top:2%; font-weight: bold; height:20px"> <div style="width: 100%;">  <div	style="width: 5%; border: 1px solid #000; color: #000; text-align: center; float: left;"># _$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag_	<div	style="width: 32%; border: 1px solid #000; color: #000; padding-left: 1%;  float: left;padding-right: 1%; text-align: center;">LAUNDRY ITEMS_$tag><div __$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag_<div style="width: 16.5%; border: 1px solid #000; color: #000; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">UNIT PRICE_$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag_<div	style="width: 21.5%; border: 1px solid #000; color: #000; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">UNIT_$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag_<div	 style="width: 15%; border: 1px solid #000; color: #000; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">TOTAL_$tag__$tag__$tag______ style___$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag_ _$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__r ( va$tag__$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag_<div style="height:700px;border: 1px solid #000;width: 98.7%">');

		for ( var i = 1; i <= rowcount; i++) {
			if ($("#selLitemName" + i).val() == undefined) {
			} else {
				WindowObject.document
						.writeln(' <div style="width: 101.3%;">  <div	style="width: 5%; border: 1px solid ;  text-align: center; float: left;">'
								+ i
								+ '_$tag__$tag__$tag_______________$tag_$tag__$taid ;  g__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag_	<div	style="width: 32%; border: 1px solid ;  padding-left: 1%;  float: left;padding-right: 1%; text-align: center;">'
								+ a[i]
								+ '_$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag_<div style="width: 16.5%; border: 1px solid ;  padding-left: 1%; float: left; padding-right: 1%; text-align: right;">'
								+ b[i]
								+ '_$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag_<div	style="width: 21.5%; border: 1px solid;  padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
								+ c[i]
								+ '_$tag__$tag__$tag____________; bordg_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag_<div	 style="width: 15%; border: 1px solid ;  padding-left: 1%; float: left; padding-right: 1%; text-align: right;">'
								+ d[i]
								+ '_$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$t: 100%ag__$tag__$tag__$tag__$tag__$tag_ _$tag__$tag__$tag_______________$tag_$tag__$tag__$tag__$tag__$tag__$tag__$tag__$tag__$t 100%;ag__$tag__$tag__$tag__$tag__$tag__$tag__$tag_');

			}
		}
		WindowObject.document
				.writeln('_$tag__$tag__$tag_______________$t<div	sgyle="w__$tag__$tag__$tag__$tag__$tag__$tag__$tn: center; flg__$tag__$tag__$tag__$tag__$tag__$tag__$tag_<div style="width: 100%;">  <div	style="width: 5%; border: 1px solid ;  text-align;></div>')
</script>

<style>
/* Font Definitions */
@font-face {
	font-family: Tahoma;
	panose-1: 2 11 6 4 3 5 4 4 2 4;
	mso-font-charset: 0;
	mso-generic-font-family: swiss;
	mso-font-pitch: variable;
	mso-font-signature: -520081665 -1073717157 41 0 66047 0;
}

/* Style Definitions */
p.MsoNormal,li.MsoNormal,div.MsoNormal {
	mso-style-unhide: no;
	mso-style-qformat: yes;
	mso-style-parent: "";
	margin: 0in;
	margin-bottom: .0001pt;
	line-height: 110%;
	mso-pagination: widow-orphan;
	font-size: 8.5pt;
	mso-bidi-font-size: 9.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-fareast-font-family: "Times New Roman";
	mso-bidi-font-family: "Times New Roman";
	letter-spacing: .2pt;
}

h1 {
	mso-style-unhide: no;
	mso-style-qformat: yes;
	mso-style-next: Normal;
	margin: 0in;
	margin-bottom: .0001pt;
	text-align: right;
	line-height: 110%;
	mso-pagination: widow-orphan;
	mso-outline-level: 1;
	font-size: 20.0pt;
	mso-bidi-font-size: 9.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-bidi-font-family: "Times New Roman";
	color: gray;
	letter-spacing: .2pt;
	mso-font-kerning: 0pt;
	mso-bidi-font-weight: normal;
}

h2 {
	mso-style-unhide: no;
	mso-style-qformat: yes;
	mso-style-next: Normal;
	margin-top: 7.0pt;
	margin-right: 0in;
	margin-bottom: 0in;
	margin-left: 0in;
	margin-bottom: .0001pt;
	line-height: 110%;
	mso-pagination: widow-orphan;
	mso-outline-level: 2;
	font-size: 12.0pt;
	mso-bidi-font-size: 9.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-bidi-font-family: "Times New Roman";
	letter-spacing: .2pt;
	mso-bidi-font-weight: normal;
}

h3 {
	mso-style-unhide: no;
	mso-style-qformat: yes;
	mso-style-next: Normal;
	margin: 0in;
	margin-bottom: .0001pt;
	line-height: 110%;
	mso-pagination: widow-orphan;
	mso-outline-level: 3;
	font-size: 8.5pt;
	mso-bidi-font-size: 9.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-bidi-font-family: "Times New Roman";
	letter-spacing: .2pt;
	font-weight: normal;
	font-style: italic;
	mso-bidi-font-style: normal;
}

h4 {
	mso-style-unhide: no;
	mso-style-qformat: yes;
	mso-style-link: "Heading 4 Char";
	mso-style-next: Normal;
	margin: 0in;
	margin-bottom: .0001pt;
	line-height: 110%;
	mso-pagination: widow-orphan;
	mso-outline-level: 4;
	font-size: 8.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-bidi-font-family: "Times New Roman";
	text-transform: uppercase;
	letter-spacing: .2pt;
	mso-bidi-font-weight: normal;
}

p.MsoAcetate,li.MsoAcetate,div.MsoAcetate {
	mso-style-noshow: yes;
	mso-style-unhide: no;
	margin: 0in;
	margin-bottom: .0001pt;
	line-height: 110%;
	mso-pagination: widow-orphan;
	font-size: 8.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-fareast-font-family: "Times New Roman";
	letter-spacing: .2pt;
}

p.NumberedList,li.NumberedList,div.NumberedList {
	mso-style-name: "Numbered List";
	mso-style-unhide: no;
	margin-top: 0in;
	margin-right: 0in;
	margin-bottom: 6.0pt;
	margin-left: .2in;
	text-indent: -.2in;
	line-height: 110%;
	mso-pagination: widow-orphan;
	mso-list: l1 level1 lfo2;
	tab-stops: list .2in;
	font-size: 7.5pt;
	mso-bidi-font-size: 9.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-fareast-font-family: "Times New Roman";
	mso-bidi-font-family: "Times New Roman";
	letter-spacing: .2pt;
}

p.CenteredHeading,li.CenteredHeading,div.CenteredHeading {
	mso-style-name: "Centered Heading";
	mso-style-unhide: no;
	margin: 0in;
	margin-bottom: .0001pt;
	text-align: center;
	line-height: 110%;
	mso-pagination: widow-orphan;
	font-size: 8.0pt;
	mso-bidi-font-size: 9.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-fareast-font-family: "Times New Roman";
	mso-bidi-font-family: "Times New Roman";
	letter-spacing: .2pt;
	font-weight: bold;
	mso-bidi-font-weight: normal;
}

p.RightAlignedHeading,li.RightAlignedHeading,div.RightAlignedHeading {
	mso-style-name: "Right Aligned Heading";
	mso-style-unhide: no;
	margin: 0in;
	margin-bottom: .0001pt;
	text-align: right;
	line-height: 110%;
	mso-pagination: widow-orphan;
	font-size: 8.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-fareast-font-family: "Times New Roman";
	mso-bidi-font-family: "Times New Roman";
	text-transform: uppercase;
	letter-spacing: .2pt;
}

span.Heading4Char {
	mso-style-name: "Heading 4 Char";
	mso-style-unhide: no;
	mso-style-locked: yes;
	mso-style-link: "Heading 4";
	mso-ansi-font-size: 8.0pt;
	mso-bidi-font-size: 8.0pt;
	font-family: "Tahoma", "sans-serif";
	mso-ascii-font-family: Tahoma;
	mso-hansi-font-family: Tahoma;
	text-transform: uppercase;
	letter-spacing: .2pt;
	mso-ansi-language: EN-US;
	mso-fareast-language: EN-US;
	mso-bidi-language: AR-SA;
	font-weight: bold;
	mso-bidi-font-weight: normal;
}

@page WordSection1 {
	size: 8.5in 11.0in;
	margin: .5in .5in 36.7pt .5in;
	mso-header-margin: .5in;
	mso-footer-margin: .5in;
	mso-paper-source: 0;
}

div.WordSection1 {
	page: WordSection1;
}

/* List Definitions */
@
list l0 {
	mso-list-id: 161624349;
	mso-list-type: hybrid;
	mso-list-template-ids: -1236383228 67698703 67698713 67698715 67698703
		67698713 67698715 67698703 67698713 67698715;
}

@
list l0:level1 {
	mso-level-tab-stop: .25in;
	mso-level-number-position: left;
	margin-left: .25in;
	text-indent: -.25in;
}

@
list l0:level2 {
	mso-level-number-format: alpha-lower;
	mso-level-tab-stop: .75in;
	mso-level-number-position: left;
	margin-left: .75in;
	text-indent: -.25in;
}

@
list l0:level3 {
	mso-level-number-format: roman-lower;
	mso-level-tab-stop: 1.25in;
	mso-level-number-position: right;
	margin-left: 1.25in;
	text-indent: -9.0pt;
}

@
list l0:level4 {
	mso-level-tab-stop: 1.75in;
	mso-level-number-position: left;
	margin-left: 1.75in;
	text-indent: -.25in;
}

@
list l0:level5 {
	mso-level-number-format: alpha-lower;
	mso-level-tab-stop: 2.25in;
	mso-level-number-position: left;
	margin-left: 2.25in;
	text-indent: -.25in;
}

@
list l0:level6 {
	mso-level-number-format: roman-lower;
	mso-level-tab-stop: 2.75in;
	mso-level-number-position: right;
	margin-left: 2.75in;
	text-indent: -9.0pt;
}

@
list l0:level7 {
	mso-level-tab-stop: 3.25in;
	mso-level-number-position: left;
	margin-left: 3.25in;
	text-indent: -.25in;
}

@
list l0:level8 {
	mso-level-number-format: alpha-lower;
	mso-level-tab-stop: 3.75in;
	mso-level-number-position: left;
	margin-left: 3.75in;
	text-indent: -.25in;
}

@
list l0:level9 {
	mso-level-number-format: roman-lower;
	mso-level-tab-stop: 4.25in;
	mso-level-number-position: right;
	margin-left: 4.25in;
	text-indent: -9.0pt;
}

@
list l1 {
	mso-list-id: 1924298015;
	mso-list-type: hybrid;
	mso-list-template-ids: -561466844 -1472040928 67698713 67698715 67698703
		67698713 67698715 67698703 67698713 67698715;
}

@
list l1:level1 {
	mso-level-style-link: "Numbered List";
	mso-level-tab-stop: .2in;
	mso-level-number-position: left;
	margin-left: .2in;
	text-indent: -.2in;
	mso-ansi-font-size: 8.0pt;
	mso-bidi-font-size: 8.0pt;
	font-family: "Arial", "sans-serif";
	mso-bidi-font-family: "Times New Roman";
}

@
list l1:level2 {
	mso-level-number-format: alpha-lower;
	mso-level-tab-stop: 1.0in;
	mso-level-number-position: left;
	text-indent: -.25in;
}

@
list l1:level3 {
	mso-level-number-format: roman-lower;
	mso-level-tab-stop: 1.5in;
	mso-level-number-position: right;
	text-indent: -9.0pt;
}

@
list l1:level4 {
	mso-level-tab-stop: 2.0in;
	mso-level-number-position: left;
	text-indent: -.25in;
}

@
list l1:level5 {
	mso-level-number-format: alpha-lower;
	mso-level-tab-stop: 2.5in;
	mso-level-number-position: left;
	text-indent: -.25in;
}

@
list l1:level6 {
	mso-level-number-format: roman-lower;
	mso-level-tab-stop: 3.0in;
	mso-level-number-position: right;
	text-indent: -9.0pt;
}

@
list l1:level7 {
	mso-level-tab-stop: 3.5in;
	mso-level-number-position: left;
	text-indent: -.25in;
}

@
list l1:level8 {
	mso-level-number-format: alpha-lower;
	mso-level-tab-stop: 4.0in;
	mso-level-number-position: left;
	text-indent: -.25in;
}

@
list l1:level9 {
	mso-level-number-format: roman-lower;
	mso-level-tab-stop: 4.5in;
	mso-level-number-position: right;
	text-indent: -9.0pt;
}

ol {
	margin-bottom: 0in;
}

ul {
	margin-bottom: 0in;
}
</style>




</head>

<%
	Calendar curreCalendar = Calendar.getInstance();
	SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = formatter.format(curreCalendar.getTime());
%>

<body style="background: white ! important;">
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<c:if test="${ sessionScope.userType != null }">
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>
					<form name="form1">
						<div
							style="width: 20%; float: right; padding-left: 20%; padding-top: 2%;">

						</div>

						<div
							style="width: 20%; float: left; padding-left: 20%; padding-top: 0%;"
							id="111111">
							<div
								style="width: 92%; float: right; padding-top: 3%; padding-right: 8%"
								id="2222222">
								<div style="padding-right: 2%; width: 30%;">
									<input
										style="font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;"
										type="button" value="Save Now" onclick="saveLaundryBill()" />
								</div>
								<div style="padding-right: 2%; width: 30%;">
									<input
										style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"
										type="button" value="Print"
										onclick="printDiv('rightContActual')" />
								</div>


							</div>
						</div>
				</div>
			</div> -->

			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="left_menu_maintenance.jsp"%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_OPD_Database.jsp">Help Desk</a></li>
											<li>View Database</li>
											<li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li>
											<li class="pull-right">
												<button class="btn btn-xs btn-success">Save</button>
												<button class="btn btn-xs btn-warning">Print</button>
												<button class="btn btn-xs btn-danger">Discard</button>
											</li>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div style="font-weight: bold;" class="col-md-1">Date</div>
							<div style="padding-left: 2%;" class="col-md-2 TextFont">
								<input style="width: 90%; font-size: 13px;" type="text"
									readonly="readonly" id="popup_container2"
									value="<%=todays_date%>" onchange="setLaundryBillTemp()" />
							</div>
							<div class="col-md-1">To Whom</div>
							<div class="col-md-1" style="width: 13%" id="lOwner"></div>


							<div id="rightContActual" onmouseover="closeWindow()"
								style="margin-top: 30px;">

								<div class=WordSection1 style="width: 100%; height: 100%">

									<%-- <p class=MsoNormal>
										<o:p>&nbsp;</o:p>
									</p>

									<div
										style="width: 98%; padding-top: 0%; font-weight: bold; padding-left: 0%;">
										<div
											style="width: 95.1%; border: 0px solid #FFF; color: #FFF; padding-left: 1%; padding-top: 1%; padding-right: 1%; text-align: center; padding-bottom: 0.2%; background-color: #436a9d;">
											<div style="width: 8%;">Date</div>

											<div style="width: 12%;">
												<input style="width: 90%; font-size: 13px;" type="text"
													readonly="readonly" id="popup_container2"
													value="<%=todays_date%>" onchange="setLaundryBillTemp()" />
											</div>
											<div style='width: 8%; padding-left: 2%'>To Whom</div>
											<div style='width: 18%;' id="lOwner"></div>

										</div>

									</div> --%>

									<div class="panel panel-default">
										<div class="panel-body">
											<div style="width: 100%;">
												<div class="col-md-12-1">
													<table class="table table-bordered table-condensed cf"
														style="width: 1090px; margin-top: 10px;">
														<thead class='cf'>
															<tr>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>

																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>LAUNDRY ITEMS</div></th>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>QUANTITY</div></th>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>RATE</div></th>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>TOTAL</div></th>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>

																		<img width="18" height="18"
																			onclick="addRow('tblItems','txtRowCount')"
																			src="images/plus.jpg" /><img width="18" height="18"
																			onclick="deleteRow('tblItems')"
																			src="images/minus.jpg" /><input type="hidden"
																			id="txtTotalRow" value="0" /><input type="hidden"
																			id="txtRowCount" value="0" />
																	</div></th>
															</tr>
														</thead>
													</table>
												</div>



												<div class='col-md-12-1'
													style='margin-top: -21px; overflow-y: scroll; width: 1090px; height: 240px; max-height: auto;'>
													<table class=MsoNormalTable border=1 cellspacing=0
														cellpadding=0 id="dataTable" width=95
														style='width: 7.5in; border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-padding-alt: 2.15pt 5.75pt 2.15pt 5.75pt; mso-border-insideh: .5pt solid windowtext; mso-border-insidev: .5pt solid windowtext'>

														<tr>
															<td colspan="10">
																<div style="width: 100%">

																	<table border=1 cellspacing=0 cellpadding=0 width=95
																		style='width: 11.150in;' id="tblItems">
																		<tr>
																			<td class='col-md-1-1 center'>1 <input
																				type="hidden"
																				value="<%=request.getParameter("did")%>" id="txtDid"
																				name="txtDid" /></td>

																			<td class='col-md-1-1 center'>
																				<div id="lItem1" style="width: 100%"></div>
																			</td>

																			<td class='col-md-1-1 center'><input
																				name="txtUnit1" type="text" id="txtUnit1" size="22"
																				style="border: 1px solid #069; text-align: right; padding-right: 10px"
																				onkeyup="setEachTotal('txtUnitPrice1', 'txtUnit1', 'txtPerItemTotal1','txtUnit1')"
																				onkeypress="return validatePrice(event)" /></td>
																			<td class='col-md-1-1 center'><input
																				style="border: 1px solid #069;; text-align: right; padding-right: 10px"
																				readonly="readonly" name="txtUnitPrice1" type="text"
																				id="txtUnitPrice1" size="22" /></td>

																			<td class='col-md-1-1 center'><input
																				name="total" type="text" id="txtPerItemTotal1"
																				style="border: 1px solid #069; text-align: right; padding-right: 10px"
																				name="txtPerItemTotal1" size="22"
																				readonly="readonly"
																				onkeypress="return validatePrice(event)" /></td>

																			<td class='col-md-1-1 center'><input
																				type='checkbox' name='chk'
																				value='{$T.pili.po_items_id}' /></td>

																		</tr>
																	</table>

																	<input id='rowCount' type='hidden' value='{--rowCount}' />
																</div>
															</td>
														</tr>


														<tr>
															<td colspan="5" align="right"
																style="border: none; padding-bottom: 5px; padding-top: 10px;">
																<p class=RightAlignedHeading>
																	<b>GRAND TOTAL &nbsp;&nbsp;&nbsp;</b>
																</p>
															</td>
															<td
																style='width: 28.5%; border: none; padding: 2.15pt .15in 2.15pt .15in; border-right: solid windowtext 1.0pt; border-left: solid windowtext 1.0pt; padding-bottom: 3px; padding-top: 10px; height: .2in; padding-left: 0.8%'>
																<p class=MsoNormal>
																	<o:p>&nbsp;</o:p>
																	<label> <input
																		style="border: 1px solid #069; text-align: right; padding-right: 10px; background-color: lightgray"
																		name="txtSubtotal" type="text" id="txtSubtotal"
																		size="22" value="0"
																		onkeypress="return validatePrice(event)"
																		readonly="readonly" /></label>
																</p>
															</td>
														</tr>

														<tr>

															<td colspan="5" align="right"
																style="border: none; padding-top: 5px; padding-bottom: 10px;">
																<p class=RightAlignedHeading>
																	<b>SIGN&nbsp;&nbsp;&nbsp;</b>
																</p>
															</td>
															<td
																style='width: 27.1%; border: none; padding: 2.15pt .15in 2.15pt .15in; border-right: solid windowtext 1.0pt; border-left: solid windowtext 1.0pt; padding-top: 5px; border-bottom: solid windowtext 1.0pt; padding-bottom: 10px; height: .2in; padding-left: 0.8%'>
																<p class=MsoNormal>
																	<o:p>&nbsp;</o:p>
																	<label> <input readonly="readonly"
																		value="<%=session.getAttribute("userName")%>"
																		style="border: 1px solid #069; text-align: right; padding-right: 10px"
																		name="txtSign" type="text" id="txtSign" size="22" /></label>
																</p>
															</td>
														</tr>
													</table>

												</div>

												<div style="float: right"></div>

											</div>
										</div>
									</div>


									<%-- <div style="width: 100%; padding-top: 0px;">
										<div
											style="width: 93%; background-color: #436a9d; padding: 1%; font-weight: bold; border: 1px solid #069;">
											<div style="width: 100%;">
												<div
													style="width: 4%; border: 1px solid #FFF; color: #FFF; text-align: center;">#
													No.</div>
												<div
													style="width: 27%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">LAUNDRY
													ITEMS</div>
												<div
													style="width: 16.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">QUANTITY
												</div>
												<div
													style="width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">RATE</div>
												<div
													style="width: 19%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">TOTAL</div>
												<div style="width: 5%; color: #069; margin-left: 5px;">

													<img width="18" height="18"
														onclick="addRow('tblItems','txtRowCount')"
														src="images/plus.jpg"><img width="18" height="18"
														onclick="deleteRow('tblItems')" src="images/minus.jpg"><input
														type="hidden" id="txtTotalRow" value="0" /><input
														type="hidden" id="txtRowCount" value="0">
												</div>
											</div>
										</div>
										<div style="" align=center>

											<table class=MsoNormalTable border=1 cellspacing=0
												cellpadding=0 id="dataTable" width=95
												style='width: 7.5in; border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-padding-alt: 2.15pt 5.75pt 2.15pt 5.75pt; mso-border-insideh: .5pt solid windowtext; mso-border-insidev: .5pt solid windowtext'>


												<tr>
													<td colspan="10">
														<div style="width: 100%">


															<table border=1 cellspacing=0 cellpadding=0 width=95
																style='width: 10.750in;' id="tblItems">
																<tr>
																	<td
																		style='width: 5%; padding: 2.15pt 5.75pt 2.15pt 5.75pt; height: .2in; text-align: center'>1
																		<input type="hidden"
																		value="<%=request.getParameter("did")%>" id="txtDid"
																		name="txtDid">
																	</td>

																	<td
																		style='width: 28%; border-top: none; padding: 2.15pt 5.75pt 2.15pt 5.75pt; padding-left: 0.6%; text-align: center;'>
																		<div id="lItem1" style="width: 100%"></div>

																	</td>

																	<td
																		style='width: 18%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in; padding-left: 1.1%;'>
																		<input name="txtUnit1" type="text" id="txtUnit1"
																		size="22"
																		style="border: 1px solid #069; text-align: right; padding-right: 10px"
																		onkeyup="setEachTotal('txtUnitPrice1', 'txtUnit1', 'txtPerItemTotal1','txtUnit1')"
																		onkeypress="return validatePrice(event)">
																	</td>
																	<td
																		style='width: 18%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><input
																		style="border: 1px solid #069;; text-align: right; padding-right: 10px"
																		readonly="readonly" name="txtUnitPrice1" type="text"
																		id="txtUnitPrice1" size="22"></td>

																	<td
																		style='width: 20%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in;'>
																		<input name="total" type="text" id="txtPerItemTotal1"
																		style="border: 1px solid #069; text-align: right; padding-right: 10px"
																		name="txtPerItemTotal1" size="22" readonly="readonly"
																		onkeypress="return validatePrice(event)">
																	</td>

																	<td
																		style='width: 8%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><INPUT
																		type='checkbox' name='chk'
																		value='{$T.pili.po_items_id}' /></td>

																</tr>
															</table>

															<input id='rowCount' type='hidden' value='{--rowCount}'>
														</div>
													</td>
												</tr>






												</tr>
												<tr>

													<td colspan="5" align="right"
														style="border: none; padding-bottom: 5px; padding-top: 10px;">
														<p class=RightAlignedHeading>
															<b>GRAND TOTAL &nbsp;&nbsp;&nbsp;</b>
														</p>
													</td>
													<td
														style='width: 28.5%; border: none; padding: 2.15pt .15in 2.15pt .15in; border-right: solid windowtext 1.0pt; border-left: solid windowtext 1.0pt; padding-bottom: 3px; padding-top: 10px; height: .2in; padding-left: 0.8%'>
														<p class=MsoNormal>
															<o:p>&nbsp;</o:p>
															<label> <input
																style="border: 1px solid #069; text-align: right; padding-right: 10px; background-color: lightgray"
																name="txtSubtotal" type="text" id="txtSubtotal"
																size="22" value="0"
																onkeypress="return validatePrice(event)"
																readonly="readonly"></label>
														</p>
													</td>
												</tr>

												<tr>

													<td colspan="5" align="right"
														style="border: none; padding-top: 5px; padding-bottom: 10px;">
														<p class=RightAlignedHeading>
															<b>SIGN&nbsp;&nbsp;&nbsp;</b>
														</p>
													</td>
													<td
														style='width: 27.1%; border: none; padding: 2.15pt .15in 2.15pt .15in; border-right: solid windowtext 1.0pt; border-left: solid windowtext 1.0pt; padding-top: 5px; border-bottom: solid windowtext 1.0pt; padding-bottom: 10px; height: .2in; padding-left: 0.8%'>
														<p class=MsoNormal>
															<o:p>&nbsp;</o:p>
															<label> <input readonly="readonly"
																value="<%=session.getAttribute("userName")%>"
																style="border: 1px solid #069; text-align: right; padding-right: 10px"
																name="txtSign" type="text" id="txtSign" size="22"></label>
														</p>
													</td>
												</tr>
											</table>

										</div>

										<div style="float: right"></div>

									</div> --%>

								</div>
								<div id="divDObj" style="visibility: hidden"><%=request.getParameter("myObj")%></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<%@include file="Footer.jsp"%>
		</div>
		<div id="laundryItemDiv" style="display: none;"></div>
	</c:if>
</body>
</html>