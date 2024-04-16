package com.hms.organdonation.service;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.BodySizeDto;

public interface BodySizeService {

	int saveBodySize(BodySizeDto obj, HttpServletRequest request);

	List<BodySizeDto> getAllBodySize(HttpServletRequest request);

	BodySizeDto editBodySize(Integer bodySizeId);

	boolean deleteBodySize(Integer bodySizeId, HttpServletRequest request);

	List<BodySizeDto> bodySizeAutoSuggestion(String bodySizeName);

}
