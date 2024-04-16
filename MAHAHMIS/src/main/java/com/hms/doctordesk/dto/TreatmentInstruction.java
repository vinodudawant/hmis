package com.hms.doctordesk.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="dd_treatmentinstruction")
public class TreatmentInstruction {
	
	
	
	
	@Id
	@GeneratedValue
	@Column(name="idpctreatmentinstruction")
	private int idpctreatmentinstruction;
	
	@Column(name="pCTreatmentInstructionNameID")
	private Integer pCTreatmentInstructionNameID=0;
	
	@Column(name="treatmentId")
	private Integer treatmentId;
	
	@Column(name="status")
	private String status="N";

	@Transient
	private String tempName;
	
	@Transient
	private List<TreatmentInstruction> listTreatmentInstruction;
	
	
	public int getIdpctreatmentinstruction() {
		return idpctreatmentinstruction;
	}

	public String getTempName() {
		return tempName;
	}

	public void setTempName(String tempName) {
		this.tempName = tempName;
	}

	public void setIdpctreatmentinstruction(int idpctreatmentinstruction) {
		this.idpctreatmentinstruction = idpctreatmentinstruction;
	}

	public Integer getpCTreatmentInstructionNameID() {
		return pCTreatmentInstructionNameID;
	}

	public void setpCTreatmentInstructionNameID(Integer pCTreatmentInstructionNameID) {
		this.pCTreatmentInstructionNameID = pCTreatmentInstructionNameID;
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

	public List<TreatmentInstruction> getListTreatmentInstruction() {
		return listTreatmentInstruction;
	}

	public void setListTreatmentInstruction(List<TreatmentInstruction> listTreatmentInstruction) {
		this.listTreatmentInstruction = listTreatmentInstruction;
	}

	
	
	
	
	

}
