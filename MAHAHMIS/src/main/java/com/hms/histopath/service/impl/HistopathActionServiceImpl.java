package com.hms.histopath.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.histopath.dao.HistopathActionDao;
import com.hms.histopath.dto.HistoPathReportDTO;
import com.hms.histopath.dto.HistopathMaster;
import com.hms.histopath.service.HistopathActionService;

@Service
@Transactional
public class HistopathActionServiceImpl implements HistopathActionService {

	@Autowired
	HistopathActionDao histopathActionDao;

	@Override
	public int uploadDocuments(List<HistoPathReportDTO> docList) {
		return histopathActionDao.uploadDocuments(docList);
	}

	@Override
	public List<HistoPathReportDTO> getHistoPathReportDoc(Integer masterid) {
		return histopathActionDao.getHistoPathReportDoc(masterid);
	}

	@Override
	public boolean deleteHistoPathDocument(Integer id, HttpServletRequest request) {
		return histopathActionDao.deleteHistoPathDocument(id, request);
	}

	@Override
	public HistoPathReportDTO getHistoPathReportDocById(Integer id) {
		return histopathActionDao.getHistoPathReportDocById(id);
	}

	@Override
	public String updateEmailStatus(String[] document, String mailStatus) {
		return histopathActionDao.updateEmailStatus(document, mailStatus);
	}

	@Override
	public HistopathMaster getHistopathMasterById(Integer masterId) {
		return histopathActionDao.getHistopathMasterById(masterId);
	}

}
