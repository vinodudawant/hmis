package com.hms.ipd.nurshing.dto;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "vital_sing")
public class VitalSingDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "idvital_sing")
	private Integer idVitalSing;
	
	@Column(name = "time")
	private String time;
	
	@Column(name = "tpulse")
	private String tpulse;
	
	@Column(name = "bps")
	private String bps;
	
	@Column(name = "bpd")
	private String bpd;
	
	@Column(name = "bpm")
	private String bpm;
	
	@Column(name = "trr")
	private String trr;
	
	@Column(name = "etco2")
	private String etco2;
	
	@Column(name = "uo")
	private String uo;
	
	@Column(name = "fluidone")
	private String fluidone;
	
	@Column(name = "fluidtwo")
	private String fluidtwo;
	
	@Column(name = "infusion")
	private String infusion;
	
	@Column(name = "bolus")
	private String bolus;
	
	@Column(name = "event")
	private String event;
	
	@Column(name = "Treatment_ID")
	private Integer treatmentId;
	
	@Column(name = "sao2")
	private String sao2;
	
	@Column(name = "empty")
	private String empty;
	
	@Column(name = "status")
	private String status;
		
	@Transient
	List<VitalSingDTO>  getListVitalSingDTO;

	public Integer getIdVitalSing() {
		return idVitalSing;
	}

	public void setIdVitalSing(Integer idVitalSing) {
		this.idVitalSing = idVitalSing;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getTpulse() {
		return tpulse;
	}

	public void setTpulse(String tpulse) {
		this.tpulse = tpulse;
	}

	public String getBps() {
		return bps;
	}

	public void setBps(String bps) {
		this.bps = bps;
	}

	public String getBpd() {
		return bpd;
	}

	public void setBpd(String bpd) {
		this.bpd = bpd;
	}

	public String getBpm() {
		return bpm;
	}

	public void setBpm(String bpm) {
		this.bpm = bpm;
	}

	public String getTrr() {
		return trr;
	}

	public void setTrr(String trr) {
		this.trr = trr;
	}

	public String getEtco2() {
		return etco2;
	}

	public void setEtco2(String etco2) {
		this.etco2 = etco2;
	}

	public String getUo() {
		return uo;
	}

	public void setUo(String uo) {
		this.uo = uo;
	}

	public String getFluidone() {
		return fluidone;
	}

	public void setFluidone(String fluidone) {
		this.fluidone = fluidone;
	}

	public String getFluidtwo() {
		return fluidtwo;
	}

	public void setFluidtwo(String fluidtwo) {
		this.fluidtwo = fluidtwo;
	}

	public String getInfusion() {
		return infusion;
	}

	public void setInfusion(String infusion) {
		this.infusion = infusion;
	}

	public String getBolus() {
		return bolus;
	}

	public void setBolus(String bolus) {
		this.bolus = bolus;
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getSao2() {
		return sao2;
	}

	public void setSao2(String sao2) {
		this.sao2 = sao2;
	}

	public String getEmpty() {
		return empty;
	}

	public void setEmpty(String empty) {
		this.empty = empty;
	}

	public List<VitalSingDTO> getGetListVitalSingDTO() {
		return getListVitalSingDTO;
	}

	public void setGetListVitalSingDTO(List<VitalSingDTO> getListVitalSingDTO) {
		this.getListVitalSingDTO = getListVitalSingDTO;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
