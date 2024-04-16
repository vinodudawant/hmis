
package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class InvestigationTestDto implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 996486314494837920L;
	private int invstId;
	private int testGroupId;
	private int bodyPartId;
	
	private String invstTestName;
	private String invstTestCode;
	private String testGroup;
	private String bodyPart;
	private String searhFlag;
	private String searchText;
	private int testCharge;
	private Double motivatorCash=0.0;
	private Double motivatorSponsored=0.0;
	private Double clinicPercent=0.0;
	private int id_invtest;
	
	
	//invstId, testGroupId, bodyPartId, invstTestName, invstTestCode, testGroup, bodyPart
	
	
	
	public int getId_invtest() {
		return id_invtest;
	}

	public void setId_invtest(int id_invtest) {
		this.id_invtest = id_invtest;
	}
	
	public Double getClinicPercent() {
		return clinicPercent;
	}

	

	public void setClinicPercent(Double clinicPercent) {
		this.clinicPercent = clinicPercent;
	}

	public Double getMotivatorCash() {
		return motivatorCash;
	}

	public Double getMotivatorSponsored() {
		return motivatorSponsored;
	}

	public void setMotivatorCash(Double motivatorCash) {
		this.motivatorCash = motivatorCash;
	}

	public void setMotivatorSponsored(Double motivatorSponsored) {
		this.motivatorSponsored = motivatorSponsored;
	}

	private List<InvestigationTestDto> invstList;
	private List<HallWiseTestChargesDTO> hallWsTestChrgsList;

	public int getInvstId() {
		return invstId;
	}

	public void setInvstId(int invstId) {
		this.invstId = invstId;
	}

	public String getInvstTestName() {
		return invstTestName;
	}

	public void setInvstTestName(String invstTestName) {
		this.invstTestName = invstTestName;
	}

	public String getInvstTestCode() {
		return invstTestCode;
	}

	public void setInvstTestCode(String invstTestCode) {
		this.invstTestCode = invstTestCode;
	}

	public String getTestGroup() {
		return testGroup;
	}

	public void setTestGroup(String testGroup) {
		this.testGroup = testGroup;
	}

	public String getBodyPart() {
		return bodyPart;
	}

	public void setBodyPart(String bodyPart) {
		this.bodyPart = bodyPart;
	}

	public int getTestGroupId() {
		return testGroupId;
	}

	public void setTestGroupId(int testGroupId) {
		this.testGroupId = testGroupId;
	}

	public int getBodyPartId() {
		return bodyPartId;
	}

	public void setBodyPartId(int bodyPartId) {
		this.bodyPartId = bodyPartId;
	}

	public List<InvestigationTestDto> getInvstList() {
		return invstList;
	}

	public void setInvstList(List<InvestigationTestDto> invstList) {
		this.invstList = invstList;
	}

	public String getSearhFlag() {
		return searhFlag;
	}

	public void setSearhFlag(String searhFlag) {
		this.searhFlag = searhFlag;
	}

	public String getSearchText() {
		return searchText;
	}

	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}

	public int getTestCharge() {
		return testCharge;
	}

	public void setTestCharge(int testCharge) {
		this.testCharge = testCharge;
	}

	public List<HallWiseTestChargesDTO> getHallWsTestChrgsList() {
		return hallWsTestChrgsList;
	}

	public void setHallWsTestChrgsList(List<HallWiseTestChargesDTO> hallWsTestChrgsList) {
		this.hallWsTestChrgsList = hallWsTestChrgsList;
	}
 
}
