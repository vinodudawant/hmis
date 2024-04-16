package com.hms.ehat.controller;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.pharmacy.upload.FilePath;

@Controller 
@RequestMapping(value="/uploadDoc")
public class UploadDoucmentController {

	@RequestMapping(value = "/uploadDmsDoc", method = RequestMethod.POST)
	@ResponseBody
	public String uploadDocuments(@RequestParam("ifile") MultipartFile[] uploadfiles,@RequestParam("folderName") String folderName) {
		String uploadDir = "documents";		
		try{
			for (MultipartFile file : uploadfiles) {

	            if (file.isEmpty()) {
	                continue; 
	            }
	            uploadDir = FilePath.getFolderPath(folderName);
	            Path path = Paths.get(uploadDir);
				Files.createDirectories(path);
				//Files.setAttribute(path, "dos:hidden", true);
	            
				java.io.File uploadPath = new java.io.File(uploadDir);	            	            
	            String fileName = file.getOriginalFilename();
	            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
	            
	            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
                stream.write(file.getBytes());
                stream.close();
			}
		}catch (Exception e){			  
				
			e.printStackTrace();
		}
		return null;
	}	
}
