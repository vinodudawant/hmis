package com.hms.dto;

import java.util.List;

public class RadioImageMaster {
	
	private int Treatment_ID;
	private String File_Path;
	private String date_time;
	
	List<RadioImageMaster> rdimglist;
	
	public List<RadioImageMaster> getRdimglist() {
		return rdimglist;
	}
	public void setRdimglist(List<RadioImageMaster> rdimglist) {
		this.rdimglist = rdimglist;
	}
	public int getTreatment_ID() {
		return Treatment_ID;
	}
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	public String getFile_Path() {
		return File_Path;
	}
	public void setFile_Path(String file_Path) {
		File_Path = file_Path;
	}
	public String getDate_time() {
		return date_time;
	}
	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}
	
	
	

}
