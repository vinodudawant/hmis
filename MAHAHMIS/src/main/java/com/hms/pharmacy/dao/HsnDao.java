package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.HsnMaster;

public interface HsnDao {

	int saveOrUpdateHsn(HsnMaster hsnMaster);

	Boolean deleteHsn(Integer hsnId);

	List<HsnMaster> getAllHsns();

}
