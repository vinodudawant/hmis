package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class BedState {
	private int idbedState;
	private String bedState;
	private String bedStateStatus;
	private List<BedState> bedstatelist;

	@JsonGetter("bsli")
	public List<BedState> getBedstatelist() {
		return bedstatelist;
	}

	@JsonSetter("bsli")
	public void setBedstatelist(List<BedState> bedstatelist) {
		this.bedstatelist = bedstatelist;
	}

	@JsonGetter("bsid")
	public int getIdbedState() {
		return idbedState;
	}

	@JsonSetter("bsid")
	public void setIdbedState(int idbedState) {
		this.idbedState = idbedState;
	}

	@JsonGetter("bs")
	public String getBedState() {
		return bedState;
	}

	@JsonSetter("bs")
	public void setBedState(String bedState) {
		this.bedState = bedState;
	}

	@JsonGetter("bss")
	public String getBedStateStatus() {
		return bedStateStatus;
	}

	@JsonSetter("bss")
	public void setBedStateStatus(String bedStateStatus) {
		this.bedStateStatus = bedStateStatus;
	}

}
