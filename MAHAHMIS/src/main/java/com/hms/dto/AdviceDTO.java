package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class AdviceDTO {
	private int adviceID;

	private String procedureType;
	private String procedureGroup;
	private String procedureName;
	private String indicationSurgery;
	private String riskFactor;
	private String operationName;
	private String adviceDate;
	private List<AdviceDTO> adviceDTOList;
	private String radical;
    private String palliative;

	@JsonGetter("riskFactor")
	public String getRiskFactor() {
		return riskFactor;
	}
	@JsonSetter("riskFactor")
	public void setRiskFactor(String riskFactor) {
		this.riskFactor = riskFactor;
	}

	@JsonGetter("adviceID")
	public int getAdviceID() {
		return adviceID;
	}

	@JsonSetter("adviceID")
	public void setAdviceID(int adviceID) {
		this.adviceID = adviceID;
	}

	@JsonGetter("procedureType")
	public String getProcedureType() {
		return procedureType;
	}

	@JsonSetter("procedureType")
	public void setProcedureType(String procedureType) {
		this.procedureType = procedureType;
	}

	@JsonGetter("procedureGroup")
	public String getProcedureGroup() {
		return procedureGroup;
	}

	@JsonSetter("procedureGroup")
	public void setProcedureGroup(String procedureGroup) {
		this.procedureGroup = procedureGroup;
	}

	@JsonGetter("procedureName")
	public String getProcedureName() {
		return procedureName;
	}

	@JsonSetter("procedureName")
	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}
	
	@JsonGetter("operationName")
	public String getOperationName() {
		return operationName;
	}

	@JsonSetter("operationName")
	public void setOperationName(String operationName) {
		this.operationName = operationName;
	}

	@JsonGetter("indicationSurgery")
	public String getIndicationSurgery() {
		return indicationSurgery;
	}

	@JsonSetter("indicationSurgery")
	public void setIndicationSurgery(String indicationSurgery) {
		this.indicationSurgery = indicationSurgery;
	}

	@JsonGetter("adviceDate")
	public String getAdviceDate() {
		return adviceDate;
	}

	@JsonSetter("adviceDate")
	public void setAdviceDate(String adviceDate) {
		this.adviceDate = adviceDate;
	}

	@JsonGetter("adviceDTOList")
	public List<AdviceDTO> getAdviceDTOList() {
		return adviceDTOList;
	}

	@JsonSetter("adviceDTOList")
	public void setAdviceDTOList(List<AdviceDTO> adviceDTOList) {
		this.adviceDTOList = adviceDTOList;
	}
	
	@JsonGetter("radical")
    public String getRadical() {
        return radical;
    }
    @JsonSetter("radical")
    public void setRadical(String radical) {
        this.radical = radical;
    }
    @JsonGetter("palliative")
    public String getPalliative() {
        return palliative;
    }
    @JsonSetter("palliative")
    public void setPalliative(String palliative) {
        this.palliative = palliative;
    }
}
