package com.hms.ivf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ivf.dao.IVFCalenderDao;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.service.IVFCalenderService;

@Service
public class IVFCalenderServiceImpl implements IVFCalenderService {

	@Autowired
	IVFCalenderDao ivfdao;
	
	@Override
	@Transactional
	public int saveIvfCalender(IVFFollicularStudy obj) {
		
		return ivfdao.saveIvfCalender(obj);
	}

}
