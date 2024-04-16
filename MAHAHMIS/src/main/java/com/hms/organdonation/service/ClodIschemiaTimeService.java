package com.hms.organdonation.service;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.ClodIschemiaTimeDto;

public interface ClodIschemiaTimeService {

	int saveClodIschemiaTime(ClodIschemiaTimeDto obj, HttpServletRequest request);

	List<ClodIschemiaTimeDto> getAllClodIschemiaTime(HttpServletRequest request);

	ClodIschemiaTimeDto editClodIschemiaTime(Integer clodIschemiaTimeId);

	List<ClodIschemiaTimeDto> clodIschemiaTimeAutoSuggestion(String clodIschemiaTimeName);

	boolean deleteClodIschemiaTime(Integer clodIschemiaTimeId, HttpServletRequest request);

}
