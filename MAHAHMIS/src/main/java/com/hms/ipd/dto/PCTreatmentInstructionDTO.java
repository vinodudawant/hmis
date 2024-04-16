package com.hms.ipd.dto;

import java.io.Serializable;
import java.util.Objects;

@SuppressWarnings("serial")
public class PCTreatmentInstructionDTO implements Serializable{

	private Integer idpctreatmentinstruction; 
	private String idTreatmentTopic;
	private String topicName;
	private String instructionName;
	
	public Integer getIdpctreatmentinstruction() {
		return idpctreatmentinstruction;
	}
	public void setIdpctreatmentinstruction(Integer idpctreatmentinstruction) {
		this.idpctreatmentinstruction = idpctreatmentinstruction;
	}
	public String getIdTreatmentTopic() {
		return idTreatmentTopic;
	}
	public void setIdTreatmentTopic(String idTreatmentTopic) {
		this.idTreatmentTopic = idTreatmentTopic;
	}
	public String getTopicName() {
		return topicName;
	}
	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}
	public String getInstructionName() {
		return instructionName;
	}
	public void setInstructionName(String instructionName) {
		this.instructionName = instructionName;
	}
	
	public PCTreatmentInstructionDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "PCTreatmentInstructionDTO [idpctreatmentinstruction=" + idpctreatmentinstruction + ", idTreatmentTopic="
				+ idTreatmentTopic + ", topicName=" + topicName + ", instructionName=" + instructionName + "]";
	}
	@Override
	public int hashCode() {
		return Objects.hash(idTreatmentTopic, idpctreatmentinstruction, instructionName, topicName);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PCTreatmentInstructionDTO other = (PCTreatmentInstructionDTO) obj;
		return Objects.equals(idTreatmentTopic, other.idTreatmentTopic)
				&& Objects.equals(idpctreatmentinstruction, other.idpctreatmentinstruction)
				&& Objects.equals(instructionName, other.instructionName) && Objects.equals(topicName, other.topicName);
	}

	
	
}
