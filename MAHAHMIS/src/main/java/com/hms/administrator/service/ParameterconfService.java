package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.ComparamDetails;
import com.hms.administrator.dto.ComparamMaster;

public interface ParameterconfService {

	public Integer savePrefix(ComparamMaster comparammaster, HttpServletRequest request);
	
	public List<ComparamMaster> getAllPrefixes();
	
	public List<ComparamDetails> getAllprefixDetails(Integer prefix_id);

	public Integer savePrefixDetails(ComparamDetails comparamdetails, Integer prefix_id, HttpServletRequest request);
	
	public List<ComparamMaster> getPrefixById(Integer prefix_id);
	
	public List<ComparamDetails> getPrefixDetailById(Integer prefix_id);

	public Integer editPrefix(ComparamMaster comparammaster, Integer prefix_id, HttpServletRequest request);
	
}
