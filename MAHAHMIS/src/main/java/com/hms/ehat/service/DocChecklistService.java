package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.FolderDocDto;

public interface DocChecklistService {
	public int saveorUpdateDocChecklist(DocChecklistDto docobj,HttpServletRequest request);

	public List<DocChecklistDto> getAllDocChecklist(HttpServletRequest request);

	public DocChecklistDto editDocChecklist(Integer docId);

	public boolean deletefDocChecklist(Integer docId, HttpServletRequest request);

}
