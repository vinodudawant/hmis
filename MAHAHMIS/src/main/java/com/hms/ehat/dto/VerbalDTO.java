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
@Table(name = "ehat_verbal_order_slave")
public class VerbalDTO implements Serializable{

	
private static final long serialVersionUID = 1L;

@Id
@GeneratedValue
@Column(name = "idverbal_order_slave")
private int idVerbal; 

@Column(name = "idnursing_assessment_paediatric_page_three")
private int idnursing_assessment_paediatric_page_three; 

@Column(name = "time")
private String timeForVerbal;  

@Column(name = "name")
private String consultingNameForVerbal;  

@Column(name = "nurse")
private String primiaryNurseVerbal;  

@Column(name = "doctor")
private String doctorVerbal;  

@Column(name = "duration")
private String durationVerbal;  

@Column(name = "status")
private String status;


@Transient
private List<VerbalDTO> verbalListslave; 


public List<VerbalDTO> getVerbalListslave() {
	return verbalListslave;
}

public void setVerbalListslave(List<VerbalDTO> verbalListslave) {
	this.verbalListslave = verbalListslave;
}

public int getIdVerbal() {
	return idVerbal;
}

public void setIdVerbal(int idVerbal) {
	this.idVerbal = idVerbal;
}

public int getIdnursing_assessment_paediatric_page_three() {
	return idnursing_assessment_paediatric_page_three;
}

public void setIdnursing_assessment_paediatric_page_three(
		int idnursing_assessment_paediatric_page_three) {
	this.idnursing_assessment_paediatric_page_three = idnursing_assessment_paediatric_page_three;
}

public String getTimeForVerbal() {
	return timeForVerbal;
}

public void setTimeForVerbal(String timeForVerbal) {
	this.timeForVerbal = timeForVerbal;
}

public String getConsultingNameForVerbal() {
	return consultingNameForVerbal;
}

public void setConsultingNameForVerbal(String consultingNameForVerbal) {
	this.consultingNameForVerbal = consultingNameForVerbal;
}

public String getPrimiaryNurseVerbal() {
	return primiaryNurseVerbal;
}

public void setPrimiaryNurseVerbal(String primiaryNurseVerbal) {
	this.primiaryNurseVerbal = primiaryNurseVerbal;
}

public String getDoctorVerbal() {
	return doctorVerbal;
}

public void setDoctorVerbal(String doctorVerbal) {
	this.doctorVerbal = doctorVerbal;
}

public String getDurationVerbal() {
	return durationVerbal;
}

public void setDurationVerbal(String durationVerbal) {
	this.durationVerbal = durationVerbal;
}

public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}  

}
