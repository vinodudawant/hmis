package com.hms.doctordesk.dao;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import com.hms.doctordesk.dto.ComplaintMasterDto;


public interface ComplaintMasterDao {

	int saveComplaintMaster(ComplaintMasterDto complaint, HttpServletRequest request);

	List<ComplaintMasterDto> getAllComplaintMaster(HttpServletRequest request);
	
	public ComplaintMasterDto editComplaintMaster(Integer complaintId);

	boolean deleteComplaintMaster(Integer complaintId, Integer userdId);

	List<ComplaintMasterDto> centerComplaintAutoSuggestion(String complaintName,String complaintCode);

	

}
