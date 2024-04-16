package com.hms.histopath.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.histopath.dto.HistoPathReportDTO;
import com.hms.histopath.dto.HistopathMaster;

public interface HistopathActionService {
	public int uploadDocuments(List<HistoPathReportDTO> docList);

	List<HistoPathReportDTO> getHistoPathReportDoc(Integer masterid);

	boolean deleteHistoPathDocument(Integer id, HttpServletRequest request);

	HistoPathReportDTO getHistoPathReportDocById(Integer id);

	String updateEmailStatus(String[] document, String mailStatus);

	public HistopathMaster getHistopathMasterById(Integer masterId);

}
