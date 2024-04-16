package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabWorksheetViewDto;

public interface LabWorkSheetService {

	LabWorksheetViewDto getLabWorksheetDash(String txtFdate, String txtTdate,
			Integer frmRecNo, Integer toRecNo, String type,
			HttpServletRequest request);

	LabWorksheetViewDto getLabWorksheetReportData(String txtFdate,
			String txtTdate, Integer frmRecNo, Integer toRecNo, String type,
			HttpServletRequest request);

	public List<LabProfileDTO> checkTestIsTemplate();

}
