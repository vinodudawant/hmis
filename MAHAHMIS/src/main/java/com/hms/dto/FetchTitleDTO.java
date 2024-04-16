package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class FetchTitleDTO implements Serializable{
	
	List<FetchTitleDTO> titleList=null;
	String fTitle=null;

	public String getfTitle() {
		return fTitle;
	}

	public void setfTitle(String fTitle) {
		this.fTitle = fTitle;
	}

	public List<FetchTitleDTO> getTitleList() {
		return titleList;
	}

	public void setTitleList(List<FetchTitleDTO> titleList) {
		this.titleList = titleList;
	}
	

}
