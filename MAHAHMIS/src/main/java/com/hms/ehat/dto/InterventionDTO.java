package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "ehat_intervention_slave")
public class InterventionDTO implements Serializable{

	
private static final long serialVersionUID = 1L;

@Id
@GeneratedValue
@Column(name = "idintervention_slave")
private int idIntervention;

@Column(name = "idnursing_assessment_paediatric_page_three")
private int idnursing_assessment_paediatric_page_three;

@Column(name = "shift")
private String shiftInven;  

@Column(name = "time")
private String timeInven;  

@Column(name = "behaviour")
private String behaviourInven;  

@Column(name = "intervention")
private String intervention;  

@Column(name = "remarks")
private String remarksInven;  

@Column(name = "status")
private String status;

@Transient
private List<InterventionDTO> interventionListslave;


public List<InterventionDTO> getInterventionListslave() {
	return interventionListslave;
}

public void setInterventionListslave(List<InterventionDTO> interventionListslave) {
	this.interventionListslave = interventionListslave;
}

public int getIdIntervention() {
	return idIntervention;
}

public void setIdIntervention(int idIntervention) {
	this.idIntervention = idIntervention;
}

public int getIdnursing_assessment_paediatric_page_three() {
	return idnursing_assessment_paediatric_page_three;
}

public void setIdnursing_assessment_paediatric_page_three(
		int idnursing_assessment_paediatric_page_three) {
	this.idnursing_assessment_paediatric_page_three = idnursing_assessment_paediatric_page_three;
}

public String getShiftInven() {
	return shiftInven;
}

public void setShiftInven(String shiftInven) {
	this.shiftInven = shiftInven;
}

public String getTimeInven() {
	return timeInven;
}

public void setTimeInven(String timeInven) {
	this.timeInven = timeInven;
}

public String getBehaviourInven() {
	return behaviourInven;
}

public void setBehaviourInven(String behaviourInven) {
	this.behaviourInven = behaviourInven;
}

public String getIntervention() {
	return intervention;
}

public void setIntervention(String intervention) {
	this.intervention = intervention;
}

public String getRemarksInven() {
	return remarksInven;
}

public void setRemarksInven(String remarksInven) {
	this.remarksInven = remarksInven;
}

public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}  

}
