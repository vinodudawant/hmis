package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.ShelfDocDto;

public interface FolderDocDao {

	public int saveorUpdateFolderDoc(FolderDocDto folderobj);

	public List<FolderDocDto> getAllFolderDoc();
	public FolderDocDto editFolderfDoc(Integer folderId);
	public boolean deleteFolderDoc(FolderDocDto folderobj);
}
