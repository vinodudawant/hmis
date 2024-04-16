package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import com.hms.doctordesk.dto.ComplaintMasterDto;


public interface ComplaintMasterService {

	int saveComplaintMaster(ComplaintMasterDto complaint, HttpServletRequest request);

	List<ComplaintMasterDto> getAllComplaintMaster(HttpServletRequest request);
	
	public ComplaintMasterDto editComplaintMaster(Integer complaintId);

	boolean deleteComplaintMaster(Integer complaintId, HttpServletRequest request);

	List<ComplaintMasterDto> centerComplaintAutoSuggestion(String complaintName,String complaintCode);

	

}
