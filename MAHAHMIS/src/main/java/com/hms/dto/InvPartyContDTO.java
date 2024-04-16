package com.hms.dto;

import java.util.List;

public class InvPartyContDTO {
	
	private Integer partyContId;
	private Integer partyId;
	
	private String  partyName;
	private String  partyPrority;
	private String  partyFomDate;
	private String partyRefrncNo;
	
	private String  partyToDate;
	private Double  partyMrp;
	private Double  partyRate;
	
	
	private Double partyProfit;
	
	private String curnUstId;
	private Integer itemId;
	private String  fileName;
	private String withOrWithoutCont;
	
	private List<InvPartyContDTO>ltContDTOs;
	public String getCurnUstId() {
		return curnUstId;
	}


	public void setCurnUstId(String curnUstId) {
		this.curnUstId = curnUstId;
	}


	public String getCurUsrName() {
		return curUsrName;
	}


	public void setCurUsrName(String curUsrName) {
		this.curUsrName = curUsrName;
	}


	private String curUsrName;


	public Integer getPartyContId() {
		return partyContId;
	}


	public void setPartyContId(Integer partyContId) {
		this.partyContId = partyContId;
	}


	public String getPartyName() {
		return partyName;
	}


	public void setPartyName(String partyName) {
		this.partyName = partyName;
	}


	public String getPartyPrority() {
		return partyPrority;
	}


	public void setPartyPrority(String partyPrority) {
		this.partyPrority = partyPrority;
	}


	public String getPartyFomDate() {
		return partyFomDate;
	}


	public void setPartyFomDate(String partyFomDate) {
		this.partyFomDate = partyFomDate;
	}


	public String getPartyRefrncNo() {
		return partyRefrncNo;
	}


	public void setPartyRefrncNo(String partyRefrncNo) {
		this.partyRefrncNo = partyRefrncNo;
	}


	public String getPartyToDate() {
		return partyToDate;
	}


	public void setPartyToDate(String partyToDate) {
		this.partyToDate = partyToDate;
	}


	public Double getPartyMrp() {
		return partyMrp;
	}


	public void setPartyMrp(Double partyMrp) {
		this.partyMrp = partyMrp;
	}


	public Double getPartyRate() {
		return partyRate;
	}


	public void setPartyRate(Double partyRate) {
		this.partyRate = partyRate;
	}


	public Double getPartyProfit() {
		return partyProfit;
	}


	public void setPartyProfit(Double partyProfit) {
		this.partyProfit = partyProfit;
	}


	public Integer getPartyId() {
		return partyId;
	}


	public void setPartyId(Integer partyId) {
		this.partyId = partyId;
	}


	public Integer getItemId() {
		return itemId;
	}


	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}


	public List<InvPartyContDTO> getLtContDTOs() {
		return ltContDTOs;
	}


	public void setLtContDTOs(List<InvPartyContDTO> ltContDTOs) {
		this.ltContDTOs = ltContDTOs;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getWithOrWithoutCont() {
		return withOrWithoutCont;
	}


	public void setWithOrWithoutCont(String withOrWithoutCont) {
		this.withOrWithoutCont = withOrWithoutCont;
	}
	

	
	

}
