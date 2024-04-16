package com.hms.common.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.common.dao.TmCmLookupRepo;
import com.hms.common.dto.TmCmLookupDet;

@Service
@Transactional
public class TmLookupServiceImpl implements TmLookupService {
	
	@Autowired
	TmCmLookupRepo tmcmlookuprepo;

	@Override
	public Integer getLookupIdByCode(String lookupCode) {
		// TODO Auto-generated method stub
		return tmcmlookuprepo.getLookupIdByCode(lookupCode);
	}

	@Override
	public List<TmCmLookupDet> getLookupDecById(Integer lookupId) {
		// TODO Auto-generated method stub
		return tmcmlookuprepo.getLookupDecById(lookupId);
	}

}
