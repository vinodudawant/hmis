package com.hms.accessmanagement.dao;

import com.hms.dto.ModuleMasterDto;
import com.hms.dto.NewUserAccessDto;

public interface NewUserAccessDao {

	public ModuleMasterDto getModuleList();
	
	public NewUserAccessDto getUserAccessToPage(int moduleId);
}
