function setStudyRecordGraph1(data){

	
	var rtovdata = [];
	var ltovdata = [];
	var endodata = [];
	var date = [];
	var data1 = $('#studydata').html();
//	var data= eval('('+ data1 +')');
	
	
	
if(data.follicularReportList.length>0){
		
		for(var i=0;i<data.follicularReportList.length;i++)
		{
				date.push( data.follicularReportList[i].study_date);
				rtovdata.push( parseFloat(data.follicularReportList[i].rtov));
				ltovdata.push( parseFloat(data.follicularReportList[i].ltov));
				endodata.push( parseFloat(data.follicularReportList[i].endo));
			
		}
	}


	
	$('#studyContainer').highcharts({
		title: {
            text: 'Follicular Study Graph',
            x: -20 //center
        },
        xAxis: {
        	title: {
                text: 'Date'
            },
            categories: date 
            	//['2','4','6','8','10','12','14','16','18','20','22','24','26','28','30']
        },
        yAxis: {
            title: {
                text: 'Size(mm)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'RTOV',
            data: rtovdata
            	//[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 12.5, 13.2, 15]
        }, {
            name: 'LTOV',
            data: ltovdata
            	//[0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5, 5, 8, 15]
        }, {
            name: 'ENDO',
            data: endodata
            	//[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 6, 2, 12]
        }]
    });

}
function setStudyRecordGraph(){
	
	var rtovdata = [];
	var ltovdata = [];
	var endodata = [];
	var date = [];
	var data1 = $('#studydata').html();
	var data= eval('('+ data1 +')');
	
	
if(data.follicularReportList.length>0){
		
		for(var i=0;i<data.follicularReportList.length;i++)
		{
				date.push( data.follicularReportList[i].study_date);
				rtovdata.push( parseFloat(data.follicularReportList[i].rtov));
				ltovdata.push( parseFloat(data.follicularReportList[i].ltov));
				endodata.push( parseFloat(data.follicularReportList[i].endo));
			
		}
	}


	
	$('#studyContainer').highcharts({
		title: {
            text: 'Follicular Study Graph',
            x: -20 //center
        },
        xAxis: {
        	title: {
                text: 'Date'
            },
            categories: date 
            	//['2','4','6','8','10','12','14','16','18','20','22','24','26','28','30']
        },
        yAxis: {
            title: {
                text: 'Size(mm)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'RTOV',
            data: rtovdata
            	//[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 12.5, 13.2, 15]
        }, {
            name: 'LTOV',
            data: ltovdata
            	//[0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5, 5, 8, 15]
        }, {
            name: 'ENDO',
            data: endodata
            	//[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 6, 2, 12]
        }]
    });
}

function setTempRecordGraph(vType){
	var am8 = 0;
	var am9 = 0;
	var am10 = 0;
	var am11 = 0;
	var am12 = 0;
	var am1 = 0;
	var am2 = 0;
	var am3 = 0;
	var am4 = 0;
	var am5 = 0;
	var am6 = 0;
	var am7 = 0;
	var pm8 = 0;
	var pm9 = 0;
	var pm10 = 0;
	var pm11 = 0;
	var pm12 = 0;
	var pm1 = 0;
	var pm2 = 0;
	var pm3 = 0;
	var pm4 = 0;
	var pm5 = 0;
	var pm6 = 0;
	var pm7 = 0;
	
	var g1am8=0;
	var g1am8 = 0;
	var g1am9 = 0;
	var g1am10 = 0;
	var g1am11 = 0;
	var g1am12 = 0;
	var g1g1am1 = 0;
	var g1am2 = 0;
	var g1am3 = 0;
	var g1am4 = 0;
	var g1am5 = 0;
	var g1am6 = 0;
	var g1am7 = 0;
	var g1pm8 = 0;
	var g1pm9 = 0;
	var g1pm10 = 0;
	var g1pm11 = 0;
	var g1pm12 = 0;
	var g1pm1 = 0;
	var g1pm2 = 0;
	var g1pm3 = 0;
	var g1pm4 = 0;
	var g1pm5 = 0;
	var g1pm6 = 0;
	var g1pm7 = 0;
	
	var pobj = $('#chartObj').html();
	var pobj1= eval('('+ pobj +')');
	
	if(pobj1.listReport.length>0){
		
		/*if(pobj1.listReport[0].cname == "TEMPERATURE (*F)"){*/
		if(vType == "Temp"){
			pobj1 = pobj1.listReport[0];
			
			am8 = pobj1.am8;
			am9 = pobj1.am9;
			am10 = pobj1.am10;
			am11 = pobj1.am11;
			am12 = pobj1.am12;
			am1 = pobj1.am1;
			am2 = pobj1.am2;
			am3 = pobj1.am3;
			am4 = pobj1.am4;
			am5 = pobj1.am5;
			am6 = pobj1.am6;
			am7 = pobj1.am7;
			pm8 = pobj1.pm8;
			pm9 = pobj1.pm9;
			pm10 = pobj1.pm10;
			pm11 = pobj1.pm11;
			pm12 = pobj1.pm12;
			pm1 = pobj1.pm1;
			pm2 = pobj1.pm2;
			pm3 = pobj1.pm3;
			pm4 = pobj1.pm4;
			pm5 = pobj1.pm5;
			pm6 = pobj1.pm6;
			pm7 = pobj1.pm7;
		}
		if(vType == "Pulse"){
			pobj1 = pobj1.listReport[1];
			
			am8 = pobj1.am8;
			am9 = pobj1.am9;
			am10 = pobj1.am10;
			am11 = pobj1.am11;
			am12 = pobj1.am12;
			am1 = pobj1.am1;
			am2 = pobj1.am2;
			am3 = pobj1.am3;
			am4 = pobj1.am4;
			am5 = pobj1.am5;
			am6 = pobj1.am6;
			am7 = pobj1.am7;
			pm8 = pobj1.pm8;
			pm9 = pobj1.pm9;
			pm10 = pobj1.pm10;
			pm11 = pobj1.pm11;
			pm12 = pobj1.pm12;
			pm1 = pobj1.pm1;
			pm2 = pobj1.pm2;
			pm3 = pobj1.pm3;
			pm4 = pobj1.pm4;
			pm5 = pobj1.pm5;
			pm6 = pobj1.pm6;
			pm7 = pobj1.pm7;
		}		
		if(vType == "Bp"){
			pobj1 = pobj1.listReport[2];
			
			var sp1=pobj1.am8.split("/");
			am8=sp1[0];
			g1am8=sp1[1];
			
			var sp2=pobj1.am9.split("/");
			am9=sp2[0];
			g1am9=sp2[1];
			
			var sp3=pobj1.am10.split("/");
			am10=sp3[0];
			g1am10=sp3[1];
			
			var sp4=pobj1.am11.split("/");
			am11=sp4[0];
			g1am11=sp4[1];
			
			var sp5=pobj1.am12.split("/");
			am12=sp5[0];
			g1am12=sp5[1];
			
			var sp6=pobj1.pm1.split("/");
			pm1=sp6[0];
			g1pm1=sp6[1];
			
			var sp7=pobj1.pm2.split("/");
			pm2=sp7[0];
			g1pm2=sp7[1];
			
			var sp8=pobj1.pm3.split("/");
			pm3=sp8[0];
			g1pm3=sp8[1];
			
			var sp9=pobj1.pm4.split("/");
			pm4=sp9[0];
			g1pm4=sp9[1];
			
			
			var sp10=pobj1.pm5.split("/");
			pm5=sp10[0];
			g1pm5=sp10[1];
			
			var sp11=pobj1.pm6.split("/");
			pm6=sp11[0];
			g1pm6=sp11[1];
			
			var sp12=pobj1.pm7.split("/");
			pm7=sp12[0];
			g1pm7=sp12[1];
			
			var sp13=pobj1.pm8.split("/");
			pm8=sp13[0];
			g1pm8=sp13[1];
			
			
			var sp14=pobj1.pm9.split("/");
			pm9=sp14[0];
			g1pm9=sp14[1];
			
			var sp15=pobj1.pm10.split("/");
			pm10=sp15[0];
			g1pm10=sp15[1];
			
			var sp16=pobj1.pm11.split("/");
			pm11=sp16[0];
			g1pm11=sp16[1];
			
			var sp17=pobj1.pm12.split("/");
			pm12=sp17[0];
			g1pm12=sp17[1];
			
			var sp18=pobj1.am1.split("/");
			am1=sp18[0];
			g1am1=sp18[1];
			
			var sp19=pobj1.am2.split("/");
			am2=sp19[0];
			g1am2=sp19[1];
			
			var sp20=pobj1.am3.split("/");
			am3=sp20[0];
			g1am3=sp20[1];
			
			var sp21=pobj1.am4.split("/");
			am4=sp21[0];
			g1am4=sp21[1];
			
			var sp22=pobj1.am5.split("/");
			am5=sp22[0];
			g1am5=sp22[1];
			
			var sp23=pobj1.am6.split("/");
			am6=sp23[0];
			g1am6=sp23[1];
			
			var sp24=pobj1.am7.split("/");
			am7=sp24[0];
			g1am7=sp24[1];
			
			
			
			/*alert(am8 +" / "+g1am8);*/
			
			/*am8 = pobj1.am8;
			am9 = pobj1.am9;
			am10 = pobj1.am10;
			am11 = pobj1.am11;
			am12 = pobj1.am12;
			am1 = pobj1.am1;
			am2 = pobj1.am2;
			am3 = pobj1.am3;
			am4 = pobj1.am4;
			am5 = pobj1.am5;
			am6 = pobj1.am6;
			am7 = pobj1.am7;
			pm8 = pobj1.pm8;
			pm9 = pobj1.pm9;
			pm10 = pobj1.pm10;
			pm11 = pobj1.pm11;
			pm12 = pobj1.pm12;
			pm1 = pobj1.pm1;
			pm2 = pobj1.pm2;
			pm3 = pobj1.pm3;
			pm4 = pobj1.pm4;
			pm5 = pobj1.pm5;
			pm6 = pobj1.pm6;
			pm7 = pobj1.pm7;*/
			
			
		}
		if(vType == "Spo"){
			pobj1 = pobj1.listReport[3];
			
			am8 = pobj1.am8;
			am9 = pobj1.am9;
			am10 = pobj1.am10;
			am11 = pobj1.am11;
			am12 = pobj1.am12;
			am1 = pobj1.am1;
			am2 = pobj1.am2;
			am3 = pobj1.am3;
			am4 = pobj1.am4;
			am5 = pobj1.am5;
			am6 = pobj1.am6;
			am7 = pobj1.am7;
			pm8 = pobj1.pm8;
			pm9 = pobj1.pm9;
			pm10 = pobj1.pm10;
			pm11 = pobj1.pm11;
			pm12 = pobj1.pm12;
			pm1 = pobj1.pm1;
			pm2 = pobj1.pm2;
			pm3 = pobj1.pm3;
			pm4 = pobj1.pm4;
			pm5 = pobj1.pm5;
			pm6 = pobj1.pm6;
			pm7 = pobj1.pm7;
		}		
	}

	var vitalType="";
	var vtext="";
	var vname="";
	
	if(vType == "Temp"){
		
		vitalType="Temperature Graph";
		vtext="Temp(*Celsius)";
		vname="Temperature";		
	}
	if(vType == "Pulse"){
		
		vitalType="Pulse Graph";
		vtext="Pulse(*bpm)";
		vname="Pulse";
	}
	if(vType == "Bp"){
		
		vitalType="Bp Graph";
		vtext="Bp(*Millimeters)";
		vname="Bp";
	}
	if(vType == "Spo"){
		
		vitalType="Spo Graph";
		vtext="Spo(*F)";
		vname="Spo";
	}
	
	$('#tempratureContainer').highcharts({
		title: {
            text: vitalType,
            x: -20 //center
        },
        xAxis: {
        	title: {
                text: 'Time'
            },
            categories: ['am8','am9','am10','am11','am12','pm1','pm2','pm3','pm4','pm5','pm6','pm7','pm8','pm9','pm10','pm11','pm12','am1','am2','am3','am4','am5','am6','am7']
        },
        yAxis: {
            title: {
                text: vtext
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: vname,
            data: [parseFloat(am8),parseFloat(am9),parseFloat(am10),parseFloat(am11),parseFloat(am12),parseFloat(pm1),parseFloat(pm2),parseFloat(pm3),parseFloat(pm4),parseFloat(pm5),parseFloat(pm6),parseFloat(pm7),parseFloat(pm8),parseFloat(pm9),parseFloat(pm10),parseFloat(pm11),parseFloat(pm12),parseFloat(am1),parseFloat(am2),parseFloat(am3),parseFloat(am4),parseFloat(am5),parseFloat(am6),parseFloat(am7)]
        }]
    });
	
	$('#myModalLabel').html(vitalType);
}






function setTempRecordGraphForBp(vType){
	var am8 = 0;
	var am9 = 0;
	var am10 = 0;
	var am11 = 0;
	var am12 = 0;
	var am1 = 0;
	var am2 = 0;
	var am3 = 0;
	var am4 = 0;
	var am5 = 0;
	var am6 = 0;
	var am7 = 0;
	var pm8 = 0;
	var pm9 = 0;
	var pm10 = 0;
	var pm11 = 0;
	var pm12 = 0;
	var pm1 = 0;
	var pm2 = 0;
	var pm3 = 0;
	var pm4 = 0;
	var pm5 = 0;
	var pm6 = 0;
	var pm7 = 0;
	
	var g1am8 = 0;
	var g1am8 = 0;
	var g1am9 = 0;
	var g1am10 = 0;
	var g1am11 = 0;
	var g1am12 = 0;
	var g1am1 = 0;
	var g1am2 = 0;
	var g1am3 = 0;
	var g1am4 = 0;
	var g1am5 = 0;
	var g1am6 = 0;
	var g1am7 = 0;
	var g1pm8 = 0;
	var g1pm9 = 0;
	var g1pm10 = 0;
	var g1pm11 = 0;
	var g1pm12 = 0;
	var g1pm1 = 0;
	var g1pm2 = 0;
	var g1pm3 = 0;
	var g1pm4 = 0;
	var g1pm5 = 0;
	var g1pm6 = 0;
	var g1pm7 = 0;
	
	var pobj = $('#chartObj').html();
	var pobj1= eval('('+ pobj +')');
	
	if(pobj1.listReport.length>0){
		
		/*if(pobj1.listReport[0].cname == "TEMPERATURE (*F)"){*/
		if(vType == "Bp"){
			pobj1 = pobj1.listReport[2];
			
			var sp1=pobj1.am8.split("/");
			am8=sp1[0];
			g1am8=sp1[1];
			
			var sp2=pobj1.am9.split("/");
			am9=sp2[0];
			g1am9=sp2[1];
			
			var sp3=pobj1.am10.split("/");
			am10=sp3[0];
			g1am10=sp3[1];
			
			var sp4=pobj1.am11.split("/");
			am11=sp4[0];
			g1am11=sp4[1];
			
			var sp5=pobj1.am12.split("/");
			am12=sp5[0];
			g1am12=sp5[1];
			
			var sp6=pobj1.pm1.split("/");
			pm1=sp6[0];
			g1pm1=sp6[1];
			
			var sp7=pobj1.pm2.split("/");
			pm2=sp7[0];
			g1pm2=sp7[1];
			
			var sp8=pobj1.pm3.split("/");
			pm3=sp8[0];
			g1pm3=sp8[1];
			
			var sp9=pobj1.pm4.split("/");
			pm4=sp9[0];
			g1pm4=sp9[1];
			
			
			var sp10=pobj1.pm5.split("/");
			pm5=sp10[0];
			g1pm5=sp10[1];
			
			var sp11=pobj1.pm6.split("/");
			pm6=sp11[0];
			g1pm6=sp11[1];
			
			var sp12=pobj1.pm7.split("/");
			pm7=sp12[0];
			g1pm7=sp12[1];
			
			var sp13=pobj1.pm8.split("/");
			pm8=sp13[0];
			g1pm8=sp13[1];
			
			
			var sp14=pobj1.pm9.split("/");
			pm9=sp14[0];
			g1pm9=sp14[1];
			
			var sp15=pobj1.pm10.split("/");
			pm10=sp15[0];
			g1pm10=sp15[1];
			
			var sp16=pobj1.pm11.split("/");
			pm11=sp16[0];
			g1pm11=sp16[1];
			
			var sp17=pobj1.pm12.split("/");
			pm12=sp17[0];
			g1pm12=sp17[1];
			
			var sp18=pobj1.am1.split("/");
			am1=sp18[0];
			g1am1=sp18[1];
			
			var sp19=pobj1.am2.split("/");
			am2=sp19[0];
			g1am2=sp19[1];
			
			var sp20=pobj1.am3.split("/");
			am3=sp20[0];
			g1am3=sp20[1];
			
			var sp21=pobj1.am4.split("/");
			am4=sp21[0];
			g1am4=sp21[1];
			
			var sp22=pobj1.am5.split("/");
			am5=sp22[0];
			g1am5=sp22[1];
			
			var sp23=pobj1.am6.split("/");
			am6=sp23[0];
			g1am6=sp23[1];
			
			var sp24=pobj1.am7.split("/");
			am7=sp24[0];
			g1am7=sp24[1];
			
		}
	}

	var vitalType="";
	var vtext="";
	var vname="";
	if(vType == "Bp"){
		
		vitalType="Blood Pressure Graph";
		vtext="Bp(*Millimeters)";
		vname="Diastolic Blood Pressure";
		vname1="Systolic Blood Pressure";
	}
	
	$('#tempratureContainer').highcharts({
		title: {
            text: vitalType,
            x: -20 //center
        },
        xAxis: {
        	title: {
                text: 'Time'
            },
            categories: ['am8','am9','am10','am11','am12','pm1','pm2','pm3','pm4','pm5','pm6','pm7','pm8','pm9','pm10','pm11','pm12','am1','am2','am3','am4','am5','am6','am7']
        },
        yAxis: {
            title: {
                text: vtext
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: vname,
            data: [parseFloat(am8),parseFloat(am9),parseFloat(am10),parseFloat(am11),parseFloat(am12),parseFloat(pm1),parseFloat(pm2),parseFloat(pm3),parseFloat(pm4),parseFloat(pm5),parseFloat(pm6),parseFloat(pm7),parseFloat(pm8),parseFloat(pm9),parseFloat(pm10),parseFloat(pm11),parseFloat(pm12),parseFloat(am1),parseFloat(am2),parseFloat(am3),parseFloat(am4),parseFloat(am5),parseFloat(am6),parseFloat(am7)]
        },
        {
            name: vname1,
            data: [parseFloat(g1am8),parseFloat(g1am9),parseFloat(g1am10),parseFloat(g1am11),parseFloat(g1am12),parseFloat(g1pm1),parseFloat(g1pm2),parseFloat(g1pm3),parseFloat(g1pm4),parseFloat(g1pm5),parseFloat(g1pm6),parseFloat(g1pm7),parseFloat(g1pm8),parseFloat(g1pm9),parseFloat(g1pm10),parseFloat(g1pm11),parseFloat(g1pm12),parseFloat(g1am1),parseFloat(g1am2),parseFloat(g1am3),parseFloat(g1am4),parseFloat(g1am5),parseFloat(g1am6),parseFloat(g1am7)]
        }]
    });
	
	$('#myModalLabel').html(vitalType);
}