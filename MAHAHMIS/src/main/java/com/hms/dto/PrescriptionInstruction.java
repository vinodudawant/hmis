package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="prescription_instruction")
public class PrescriptionInstruction implements Serializable {

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idprescription_Instruction")
	private int	presciptionInstructionId;
	
	@Column(name = "english_Instruction")
	private String englishInstruction;
	
	@Column(name = "hindi_Instruction")
	private String hindiInstruction;
	
	@Column(name = "marathi_Instruction")
	private String marathiInstruction;
	
	@Column(name = "refTo")
	private String refTo;
	
	@Column(name = "marathi_Instruction_forPrint")
	private String marathiInstruction_forPrint;
	
	@Column(name = "hindi_Instruction_forPrint")
	private String hindiInstructionforPrint;
	
	@Column(name="status",columnDefinition = "varchar(2) default 'Y'")
	private String status="Y";
	
	@Column(name = "unicode")
	private String unicode;
	
	@Transient
	private List<PrescriptionInstruction> prescriptionInstructionList;
	
	public int getPresciptionInstructionId() {
		return presciptionInstructionId;
	}
	public void setPresciptionInstructionId(int presciptionInstructionId) {
		this.presciptionInstructionId = presciptionInstructionId;
	}
	public String getEnglishInstruction() {
		return englishInstruction;
	}
	public void setEnglishInstruction(String englishInstruction) {
		this.englishInstruction = englishInstruction;
	}
	public String getHindiInstruction() {
		return hindiInstruction;
	}
	public void setHindiInstruction(String hindiInstruction) {
		this.hindiInstruction = hindiInstruction;
	}
	public String getMarathiInstruction() {
		return marathiInstruction;
	}
	public void setMarathiInstruction(String marathiInstruction) {
		this.marathiInstruction = marathiInstruction;
	}
	public String getMarathiInstruction_forPrint() {
		return marathiInstruction_forPrint;
	}
	public void setMarathiInstruction_forPrint(String marathiInstruction_forPrint) {
		this.marathiInstruction_forPrint = marathiInstruction_forPrint;
	}
	
	public List<PrescriptionInstruction> getPrescriptionInstructionList() {
		return prescriptionInstructionList;
	}
	public void setPrescriptionInstructionList(
			List<PrescriptionInstruction> prescriptionInstructionList) {
		this.prescriptionInstructionList =prescriptionInstructionList;
	}
	public String getRefTo() {
		return refTo;
	}
	public void setRefTo(String refTo) {
		this.refTo = refTo;
	}
	public String getHindiInstructionforPrint() {
		return hindiInstructionforPrint;
	}
	public void setHindiInstructionforPrint(String hindiInstructionforPrint) {
		this.hindiInstructionforPrint = hindiInstructionforPrint;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUnicode() {
		return unicode;
	}
	public void setUnicode(String unicode) {
		this.unicode = unicode;
	}

	
}
