package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.service.FolderDocService;

@Controller 
@RequestMapping(value="/folderdoc")
public class FolderDocController {

	@Autowired
	FolderDocService folderdocservice;
	@RequestMapping(value = "/saveFolderDoc", method = RequestMethod.POST)
	@ResponseBody
	public int saveFolderDoc(FolderDocDto folderobj,
			HttpServletRequest request) {
		int response = folderdocservice.saveorUpdateFolderDoc(folderobj, request);
		
		return response;	
	}	
	
	@RequestMapping(value = "/getAllFolderfDoc", method = RequestMethod.POST)
	public @ResponseBody
	FolderDocDto getAllFolderfDoc(HttpServletRequest request) {
		List<FolderDocDto> ltDeptMasters = new ArrayList<FolderDocDto>();
		ltDeptMasters = folderdocservice.getAllFolderDoc(request);
		FolderDocDto obj = new FolderDocDto();
		obj.setLstfolderDoc(ltDeptMasters);
		return obj;
	}	
	
	@RequestMapping(value = "/editFolderDoc", method = RequestMethod.GET)
	public @ResponseBody
	FolderDocDto editFolderDoc(@RequestParam("folderId") Integer folderId) {
		FolderDocDto obj = new FolderDocDto();
		obj = folderdocservice.editFolderDoc(folderId);		
		return obj;
	}	
	
	@RequestMapping(value = "/deleteFolderDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteFolderDoc(@RequestParam("folderId") Integer folderId,HttpServletRequest request) {
		boolean response = folderdocservice.deleteFolderfDoc(folderId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
}
