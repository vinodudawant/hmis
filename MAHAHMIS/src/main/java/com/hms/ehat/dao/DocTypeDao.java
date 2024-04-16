package com.hms.ehat.dao;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.DocTypDto;

public interface DocTypeDao {
	int saveDoctorTypeMaster(DocTypDto docTypDto);
	List<DocTypDto> getDoctyp();
	int deleteDoctypMaster(Integer dcId, DocTypDto docTypDto);
	List<DocTypDto> getAutodetails(String findingName);
}
