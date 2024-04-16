package com.hms.doctordesk.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="dd_individualtreatmentinstruction")
public class IndividualTreatmentInstructionDto {
	
	@Id
	@GeneratedValue
	@Column(name="idindividualtreatmentinstruction")
	private int idindividualtreatmentinstruction;
	
	@Column(name="treatmentId")
	private Integer treatmentId;
	
	@Column(name="status")
	private String status="N";
	
	@Column(name="reportInstruction_ID_FK")
	private Integer reportInstruction_ID_FK;
	
	@Column(name = "mandatoryInstFlag",columnDefinition="varchar(2) default 'N'")
	private String mandatoryInstFlag="N";
	
	@Transient
	private List<IndividualTreatmentInstructionDto> lstList;

	public int getIdindividualtreatmentinstruction() {
		return idindividualtreatmentinstruction;
	}

	public void setIdindividualtreatmentinstruction(int idindividualtreatmentinstruction) {
		this.idindividualtreatmentinstruction = idindividualtreatmentinstruction;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getReportInstruction_ID_FK() {
		return reportInstruction_ID_FK;
	}

	public void setReportInstruction_ID_FK(Integer reportInstruction_ID_FK) {
		this.reportInstruction_ID_FK = reportInstruction_ID_FK;
	}

	public List<IndividualTreatmentInstructionDto> getLstList() {
		return lstList;
	}

	public void setLstList(List<IndividualTreatmentInstructionDto> lstList) {
		this.lstList = lstList;
	}

	public String getMandatoryInstFlag() {
		return mandatoryInstFlag;
	}

	public void setMandatoryInstFlag(String mandatoryInstFlag) {
		this.mandatoryInstFlag = mandatoryInstFlag;
	}
	
	

}
