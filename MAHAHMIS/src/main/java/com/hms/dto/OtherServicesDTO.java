package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class OtherServicesDTO implements Serializable{
	
	private int OSId=0,OSCharges=0;
	
	private String OSName=null;
	
	private List<OtherServicesDTO> OSList=null;
	private List<HallWiseTestChargesDTO> hallWsTestChrgsList=null;
	
	@JsonGetter("osid")
	public int getOSId() {
		return OSId;
	}
	@JsonSetter("osid")
	public void setOSId(int oSId) {
		OSId = oSId;
	}
	@JsonGetter("oscharges")
	public int getOSCharges() {
		return OSCharges;
	}
	@JsonSetter("oscharges")
	public void setOSCharges(int oSCharges) {
		OSCharges = oSCharges;
	}
	@JsonGetter("osname")
	public String getOSName() {
		return OSName;
	}
	@JsonSetter("osname")
	public void setOSName(String oSName) {
		OSName = oSName;
	}
	@JsonGetter("oslist")
	public List<OtherServicesDTO> getOSList() {
		return OSList;
	}
	@JsonSetter("oslist")
	public void setOSList(List<OtherServicesDTO> oSList) {
		OSList = oSList;
	}
	@JsonGetter("hallWsTestChrgsList")
	public List<HallWiseTestChargesDTO> getHallWsTestChrgsList() {
		return hallWsTestChrgsList;
	}
	@JsonSetter("hallWsTestChrgsList")
	public void setHallWsTestChrgsList(
			List<HallWiseTestChargesDTO> hallWsTestChrgsList) {
		this.hallWsTestChrgsList = hallWsTestChrgsList;
	}
	
	

}
