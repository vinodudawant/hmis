package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class PhysiotherapyTestDTO implements Serializable{

	private int physiotherapyId=0,testCharges=0;
	
	private String physiotherapyTestName=null;
	
	private List<PhysiotherapyTestDTO> physiotherapyList=null;
	private List<HallWiseTestChargesDTO> hallWsTestChrgsList=null;
	
	
	
	public int getPhysiotherapyId() {
		return physiotherapyId;
	}
	public void setPhysiotherapyId(int physiotherapyId) {
		this.physiotherapyId = physiotherapyId;
	}
	public String getPhysiotherapyTestName() {
		return physiotherapyTestName;
	}
	public void setPhysiotherapyTestName(String physiotherapyTestName) {
		this.physiotherapyTestName = physiotherapyTestName;
	}
	public List<PhysiotherapyTestDTO> getPhysiotherapyList() {
		return physiotherapyList;
	}
	public void setPhysiotherapyList(List<PhysiotherapyTestDTO> physiotherapyList) {
		this.physiotherapyList = physiotherapyList;
	}
	public List<HallWiseTestChargesDTO> getHallWsTestChrgsList() {
		return hallWsTestChrgsList;
	}
	public void setHallWsTestChrgsList(
			List<HallWiseTestChargesDTO> hallWsTestChrgsList) {
		this.hallWsTestChrgsList = hallWsTestChrgsList;
	}
	
	public int getTestCharges() {
		return testCharges;
	}
	public void setTestCharges(int testCharges) {
		this.testCharges = testCharges;
	}
}
