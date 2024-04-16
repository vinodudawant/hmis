package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class LabFormula implements Serializable {

	private int idlabFormula;
	private String expTestId;
	private int resultTestId;
	private String formulaLH;
	private String formStatus;

	private List<LabFormula> labFormulaList;

	@JsonGetter("LHForm")
	public String getFormulaLH() {
		return formulaLH;
	}

	public void setFormulaLH(String formulaLH) {
		this.formulaLH = formulaLH;
	}

	@JsonGetter("idlf")
	public int getIdlabFormula() {
		return idlabFormula;
	}

	public void setIdlabFormula(int idlabFormula) {
		this.idlabFormula = idlabFormula;
	}

	@JsonGetter("extstid")
	public String getExpTestId() {
		return expTestId;
	}

	public void setExpTestId(String expTestId) {
		this.expTestId = expTestId;
	}

	@JsonGetter("retstid")
	public int getResultTestId() {
		return resultTestId;
	}

	public void setResultTestId(int resultTestId) {
		this.resultTestId = resultTestId;
	}

	@JsonGetter("frmst")
	public String getFormStatus() {
		return formStatus;
	}

	public void setFormStatus(String formStatus) {
		this.formStatus = formStatus;
	}

	@JsonGetter("lbfrmLi")
	public List<LabFormula> getLabFormulaList() {
		return labFormulaList;
	}

	public void setLabFormulaList(List<LabFormula> labFormulaList) {
		this.labFormulaList = labFormulaList;
	}
}
