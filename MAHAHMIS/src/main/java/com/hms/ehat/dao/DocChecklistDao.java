package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.FolderDocDto;

public interface DocChecklistDao {
	public int saveorUpdateDocchecklist(DocChecklistDto docobj);

	public List<DocChecklistDto> getAllDocCheckList();
	public DocChecklistDto editDocChecklist(Integer docid);
	public boolean deleteDocChecklist(DocChecklistDto docobj);


}
