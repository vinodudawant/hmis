package com.hms.accessmanagement.service;

import com.hms.dto.ModuleMasterDto;
import com.hms.dto.NewUserAccessDto;

public interface NewUserAccessService {

	public ModuleMasterDto getModuleList();
	
	public NewUserAccessDto getUserAccess(int moduleId);
	

}
