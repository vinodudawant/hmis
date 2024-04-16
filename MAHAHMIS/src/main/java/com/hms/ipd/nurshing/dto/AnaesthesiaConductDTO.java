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
@Table(name = "anaesthesia_conduct")
public class AnaesthesiaConductDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "idanaesthesia_conduct")
	private Integer idanaesthesiaConduct;
	
	@Column(name = "chkAnesthesia")
	private String chkAnesthesia;
	
	@Column(name = "induction")
	private String induction;
	
	@Column(name = "relaxant")
	private String relaxant;
	
	@Column(name = "postOPpulse")
	private String postOPpulse;
	
	@Column(name = "postOPbp")
	private String postOPbp;
	
	@Column(name = "postOPrr")
	private String postOPrr;
	
	@Column(name = "postOPcolor")
	private String postOPcolor;
	
	@Column(name = "chkPostOperative")
	private String chkPostOperative;
	
	@Column(name = "Date")
	private Date date;
	
	@Column(name = "reversal")
	private String reversal;
	
	@Column(name = "Treatment_ID")
	private Integer treatmentId;
	 
//	 @Column(name = "created_by", updatable = false)
//		private Integer createdBy;
//
//		@Column(name = "updated_by")
//		private Integer updatedBy;
//
//		@CreationTimestamp
//		@Column(name = "created_date_time", updatable = false)
//		private Date createdDate;
//
//		@UpdateTimestamp
//		@Column(name = "updated_date_time")
//		private Date updatedDate;
//		
//		@UpdateTimestamp
//		@Column(name = "deleted_date_time")
//		private Date deletedDate;
//
//		@Column(name = "deleted_by")
//		private Integer deletedBy;
//		
//		@Column(name = "unit_id",columnDefinition="int default 1")
//		private int unitId=1;
		
		@Transient
		List<AnaesthesiaConductDTO>  getListAnaesthesiaConductDTO;

		public Integer getIdanaesthesiaConduct() {
			return idanaesthesiaConduct;
		}

		public void setIdanaesthesiaConduct(Integer idanaesthesiaConduct) {
			this.idanaesthesiaConduct = idanaesthesiaConduct;
		}

		public String getChkAnesthesia() {
			return chkAnesthesia;
		}

		public void setChkAnesthesia(String chkAnesthesia) {
			this.chkAnesthesia = chkAnesthesia;
		}

		public String getInduction() {
			return induction;
		}

		public void setInduction(String induction) {
			this.induction = induction;
		}

		public String getRelaxant() {
			return relaxant;
		}

		public void setRelaxant(String relaxant) {
			this.relaxant = relaxant;
		}

		public String getPostOPpulse() {
			return postOPpulse;
		}

		public void setPostOPpulse(String postOPpulse) {
			this.postOPpulse = postOPpulse;
		}

		public String getPostOPbp() {
			return postOPbp;
		}

		public void setPostOPbp(String postOPbp) {
			this.postOPbp = postOPbp;
		}

		public String getPostOPrr() {
			return postOPrr;
		}

		public void setPostOPrr(String postOPrr) {
			this.postOPrr = postOPrr;
		}

		public String getPostOPcolor() {
			return postOPcolor;
		}

		public void setPostOPcolor(String postOPcolor) {
			this.postOPcolor = postOPcolor;
		}

		public String getChkPostOperative() {
			return chkPostOperative;
		}

		public void setChkPostOperative(String chkPostOperative) {
			this.chkPostOperative = chkPostOperative;
		}

		public Date getDate() {
			return date;
		}

		public void setDate(Date date) {
			this.date = date;
		}

		public String getReversal() {
			return reversal;
		}

		public void setReversal(String reversal) {
			this.reversal = reversal;
		}

		public Integer getTreatmentId() {
			return treatmentId;
		}

		public void setTreatmentId(Integer treatmentId) {
			this.treatmentId = treatmentId;
		}

		public List<AnaesthesiaConductDTO> getGetListAnaesthesiaConductDTO() {
			return getListAnaesthesiaConductDTO;
		}

		public void setGetListAnaesthesiaConductDTO(List<AnaesthesiaConductDTO> getListAnaesthesiaConductDTO) {
			this.getListAnaesthesiaConductDTO = getListAnaesthesiaConductDTO;
		}
		
		

}
