package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.DdComplaintDto;

public interface DdComplaintDao {

	//int saveComplaintMaster(DdComplaintDto complaint, HttpServletRequest request);

	int saveComplaint(String complaintDetails, HttpServletRequest request);

	/*List<DdComplaintDto> fetchComplaint();*/

	List<DdComplaintDto> fetchComplaint(int treatmentId,String callfrom);

	boolean deleteComplaintMaster(Integer complaintId, Integer userId);

}
