package com.hms.ot.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ot.dao.OperationMangeDao;
import com.hms.ot.dto.OperationTypeTbl;
import com.hms.ot.service.OperationMangeService;

@Service
@Transactional
public class OperationMangeServiceImpl implements OperationMangeService {

	@Autowired
	OperationMangeDao operationMangeDao;

	@Override
	public List<String> fetchOperationType(String letter) {
		List<String> listName = new ArrayList<String>();
		List<OperationTypeTbl> list=operationMangeDao.fetchOperationType(letter);
		for (OperationTypeTbl obj : list) {
			String GroupName = "";
			if (null != obj.getName()) {
				GroupName = obj.getName() + "_"
						+ obj.getIdoperationTypeTbl();
			}
			listName.add(GroupName);
		}
		return listName;
	}

	@Override
	public String saveoperationType(OperationTypeTbl obj) {
		return operationMangeDao.saveoperationType(obj);
	}

	@Override
	public String deletePT(int pTId) {
		return operationMangeDao.deletePT(pTId);
	}
}
