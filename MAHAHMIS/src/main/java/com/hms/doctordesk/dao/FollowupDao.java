package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.FollowupDto;

public interface FollowupDao {

	int saveFollowup(FollowupDto follow, HttpServletRequest request);

	List<FollowupDto> getFollowup(int treatmentId);

}
