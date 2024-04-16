package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Table(name = "ehat_ipd_invasive_site_care")
public class InvasionSiteCareDTO implements Serializable {
	
		@Id
		@GeneratedValue
		@Column(name = "ipd_invasive_site_care_id")
		private int invasiveSiteCareId;
		
		@Column(name = "treatment_id")
		private int treatmentId;
		
		@Column(name = "patient_id")
		private int patientId;
		
		@Column(name = "line_tube")
		private String lineTube;
		
		@Column(name = "date_days")
		private String dateDays;
		
		@Column(name = "actions")
		private String actions;
		
		@Column(name = "change_medicine")
		private String changeMedicine;
		
		@Column(name = "conditions")
		private String conditions;	
		
		@Column(name = "site")
		private String site;
		
		@Column(name = "date")
		private String date;
		
		
		@Column(name = "added_by",updatable=false)
		private int addedby;

		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "added_date",updatable=false)
		private Date addeddate;


		@Column(name = "updated_by")
		private int updatedby;

		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "updated_date")
		private Date updateddate;
		
		
		@Column(name = "ip_address")
		private String ipAddress;
		
		@Column(name = "status")
		private String status="Y";
		
		@Transient
		private List<InvasionSiteCareDTO> listISC;

		public int getInvasiveSiteCareId() {
			return invasiveSiteCareId;
		}

		public void setInvasiveSiteCareId(int invasiveSiteCareId) {
			this.invasiveSiteCareId = invasiveSiteCareId;
		}

		public int getTreatmentId() {
			return treatmentId;
		}

		public void setTreatmentId(int treatmentId) {
			this.treatmentId = treatmentId;
		}

		public int getPatientId() {
			return patientId;
		}

		public void setPatientId(int patientId) {
			this.patientId = patientId;
		}

		public String getLineTube() {
			return lineTube;
		}

		public void setLineTube(String lineTube) {
			this.lineTube = lineTube;
		}

		public String getDateDays() {
			return dateDays;
		}

		public void setDateDays(String dateDays) {
			this.dateDays = dateDays;
		}

		public String getActions() {
			return actions;
		}

		public void setActions(String actions) {
			this.actions = actions;
		}

		public String getChangeMedicine() {
			return changeMedicine;
		}

		public void setChangeMedicine(String changeMedicine) {
			this.changeMedicine = changeMedicine;
		}

		public String getConditions() {
			return conditions;
		}

		public void setConditions(String conditions) {
			this.conditions = conditions;
		}

		public String getSite() {
			return site;
		}

		public void setSite(String site) {
			this.site = site;
		}

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

		
		public String getIpAddress() {
			return ipAddress;
		}

		public void setIpAddress(String ipAddress) {
			this.ipAddress = ipAddress;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public List<InvasionSiteCareDTO> getListISC() {
			return listISC;
		}

		public void setListISC(List<InvasionSiteCareDTO> listISC) {
			this.listISC = listISC;
		}

		public int getAddedby() {
			return addedby;
		}

		public void setAddedby(int addedby) {
			this.addedby = addedby;
		}

		public Date getAddeddate() {
			return addeddate;
		}

		public void setAddeddate(Date addeddate) {
			this.addeddate = addeddate;
		}

		public int getUpdatedby() {
			return updatedby;
		}

		public void setUpdatedby(int updatedby) {
			this.updatedby = updatedby;
		}

		public Date getUpdateddate() {
			return updateddate;
		}

		public void setUpdateddate(Date updateddate) {
			this.updateddate = updateddate;
		}
		
}
