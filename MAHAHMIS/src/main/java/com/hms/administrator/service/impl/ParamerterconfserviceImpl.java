package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.ParameterconfDao;
import com.hms.administrator.dto.ComparamDetails;
import com.hms.administrator.dto.ComparamMaster;
import com.hms.administrator.service.ParameterconfService;

@Service
@Transactional
public class ParamerterconfserviceImpl implements ParameterconfService {

	@Autowired
	ParameterconfDao parameterconfdao;

	@Override
	public Integer savePrefix(ComparamMaster comparammaster, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return parameterconfdao.savePrefix(comparammaster, request);
	}

	@Override
	public List<ComparamMaster> getAllPrefixes() {
		// TODO Auto-generated method stub
		return parameterconfdao.fetchAllPrefixes();
	}

	@Override
	public List<ComparamDetails> getAllprefixDetails(Integer prefix_id) {
		// TODO Auto-generated method stub
		return parameterconfdao.getAllprefixDetails(prefix_id);
	}

	@Override
	public Integer savePrefixDetails(ComparamDetails comparamdetails, Integer prefix_id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return parameterconfdao.savePrefixDetails(comparamdetails, prefix_id, request);
	}

	@Override
	public List<ComparamMaster> getPrefixById(Integer prefix_id) {
		// TODO Auto-generated method stub
		return parameterconfdao.getPrefixById(prefix_id);
	}

	@Override
	public List<ComparamDetails> getPrefixDetailById(Integer prefix_id) {
		// TODO Auto-generated method stub
		return parameterconfdao.getPrefixDetailById(prefix_id);
	}

	@Override
	public Integer editPrefix(ComparamMaster comparammaster, Integer prefix_id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return parameterconfdao.editPrefix(comparammaster, prefix_id, request);
	}
	
	
	
}
