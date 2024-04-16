package com.hms.common.dao;

import java.util.List;

import com.hms.common.dto.TmCmLookupDet;

public interface TmCmLookupRepo {
	
	public Integer getLookupIdByCode(String lookupCode);
	List<TmCmLookupDet> getLookupDecById(Integer lookupId);

}
