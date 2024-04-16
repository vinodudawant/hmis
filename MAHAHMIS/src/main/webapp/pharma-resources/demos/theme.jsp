<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link rel='stylesheet' type='text/css' href='cupertino/theme.css' />
<link rel='stylesheet' type='text/css'
	href='../fullcalendar/fullcalendar.css' />
<link rel='stylesheet' type='text/css'
	href='../fullcalendar/fullcalendar.print.css' media='print' />
<script type='text/javascript' src='../jquery/jquery-1.8.1.min.js'></script>
<script type="text/javascript" src="../js/config-combined.js"></script>
<script type='text/javascript'
	src='../jquery/jquery-ui-1.8.23.custom.min.js'></script>
<script type='text/javascript' src='../fullcalendar/fullcalendar.min.js'></script>
<script type="text/javascript" src="../js/appointment.js"></script>
<script type='text/javascript'>
	onload = function() {
		fetchAllDoctor();

	};
</script>

<!-- <script type='text/javascript'>
	$(document).ready(function() {

		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		$('#calendar').fullCalendar({
			theme : true,
			header : {
				left : 'prev,next today',
				center : 'title',
				right : 'month,agendaWeek,agendaDay'
			},
			editable : true,
			events : [ {
				title : 'All Day Event',
				start : new Date(y, m, 1)
			}, {
				title : 'Long Event',
				start : new Date(y, m, d - 5),
				end : new Date(y, m, d - 2)
			}, {
				id : 999,
				title : 'Repeating Event',
				start : new Date(y, m, d - 3, 16, 0),
				allDay : false
			}, {
				id : 999,
				title : 'Repeating Event',
				start : new Date(y, m, d + 4, 16, 0),
				allDay : false
			}, {
				title : 'Meeting',
				start : new Date(y, m, d, 10, 30),
				allDay : false
			}, {
				title : 'Lunch',
				start : new Date(y, m, d, 12, 0),
				end : new Date(y, m, d, 14, 0),
				allDay : false
			}, {
				title : 'Birthday Party',
				start : new Date(y, m, d + 1, 19, 0),
				end : new Date(y, m, d + 1, 22, 30),
				allDay : false
			}, {
				title : 'Click for Google',
				start : new Date(y, m, 28),
				end : new Date(y, m, 29),
				url : 'http://google.com/'
			} ]
		});

	});
</script> -->




<style type='text/css'>
body {
	text-align: center;
	font-size: 13px;
	font-family: "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
}
</style>
</head>
<body>
	<div style="width: 100%; margin-bottom: 15px; text-align: left;">
		Doctor Name : &nbsp; <select id="selDocNm" style="width: 20%;"></select>
	</div>
	<div id='calendar' style="width: 900px; margin: 0 auto;"></div>
</body>
</html>
