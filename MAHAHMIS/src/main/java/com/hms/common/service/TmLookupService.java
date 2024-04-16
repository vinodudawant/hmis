package com.hms.common.service;

import java.util.List;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.administrator.dto.AdminTalukaDTO;
import com.hms.common.dto.TmCmLookupDet;

public interface TmLookupService {
	
	public Integer getLookupIdByCode(String lookupCode);
	List<TmCmLookupDet> getLookupDecById(Integer lookupId);

}
