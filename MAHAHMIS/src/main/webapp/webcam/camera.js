function assignAddharCamera() {
																	
	var qType=$("#queryType").val();
	var imgPath="";							
	
	if(qType != "insert"){
		
		var curImg=$("#curPatImg").val();
		if(curImg=="patientPhoto.jpg"){
			
			imgPath = dateTime + "_webcam.jpg";
		}else{
			
			imgPath=curImg;
		}									
		//var patientId=$("#patientId").val(); 
		//imgPath = patientId + "_webcam.jpg";									
		//imgPath =$("#curPatImg").val(); 
	}else{
		
		imgPath = dateTime + "_webcam.jpg";
		//var nextPatId=$("#maxPatId").val(); 
		//imgPath = nextPatId + "_webcam.jpg"; 
	}
	
	var arr=imgPath.split(".");
	var newPath=arr[0];
	
	$("#cameraClick").removeAttr("onclick");
	Webcam.set({
		width : 320,
		height : 240,
		image_format : 'jpeg',
		jpeg_quality : 90,
		upload_name : newPath
	});
	Webcam.attach('#my_camera');								
}

function take_snapshot() {
	// take snapshot and get image data
	Webcam.snap(function(data_uri) {
		// display results in page
		document.getElementById('results').innerHTML = '<img id="capturedImage" src="'+data_uri+'"/>';
	});
}