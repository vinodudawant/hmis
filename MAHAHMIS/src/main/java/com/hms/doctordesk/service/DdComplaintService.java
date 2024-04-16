package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import com.hms.doctordesk.dto.DdComplaintDto;

public interface DdComplaintService {


	int saveComplaint(String complaintDetails, HttpServletRequest request);

	List<DdComplaintDto> fetchComplaint(int treatmentId,String callfrom);

	boolean deleteDDComplaints(Integer complaintId, HttpServletRequest request);

}
