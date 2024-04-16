package com.hms.pharmacy.service;
import java.util.List;

import com.hms.pharmacy.pojo.HsnMaster;

public interface HsnService 
{
	int saveOrUpdateHsn(HsnMaster HsnMaster);

	Boolean deleteHsn(Integer HsnId);
	
	List<HsnMaster> getAllHsn();

}
