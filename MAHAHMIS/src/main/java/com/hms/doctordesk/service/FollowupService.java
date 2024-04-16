package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.FollowupDto;

public interface FollowupService {

	int saveFollowup(FollowupDto follow, HttpServletRequest request);

	List<FollowupDto> getFollowup(int treatmentId);

}
