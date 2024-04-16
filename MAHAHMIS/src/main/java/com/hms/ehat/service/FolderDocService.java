package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.ShelfDocDto;

public interface FolderDocService {
	public int saveorUpdateFolderDoc(FolderDocDto folderobj,HttpServletRequest request);

	public List<FolderDocDto> getAllFolderDoc(HttpServletRequest request);

	public FolderDocDto editFolderDoc(Integer folderId);

	public boolean deleteFolderfDoc(Integer folderId, HttpServletRequest request);


}
