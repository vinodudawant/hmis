package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import com.hms.ehat.dto.DocTypDto;

public interface DocTypService {

	int saveDoctorTypeMaster(DocTypDto docTypDto,
			HttpServletRequest request);

	List<DocTypDto> getDoctyp();
	List<DocTypDto> getAutodetails(String findingName);
	int deleteDoctypMaster(Integer dcId, HttpServletRequest request);

}
