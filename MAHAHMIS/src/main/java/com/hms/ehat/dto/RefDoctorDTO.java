package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "refdoctrecord")
public class RefDoctorDTO {
    
    
    @Id
    @Column(name = "patient_id")
    private Integer patientId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date_time",updatable=false)
    private Date createdDateTime;
    
    @Column(name = "patient_name")
    private String patientName;
    
    @Column(name = "opdipdno")
    private String opdipdno;
    
    @Column(name = "category_name")
    private String categoryname;
    
    
    @Column(name = "dob")
    private String dob;
    
    @Column(name = "doc_name")
    private String docName ;
    
    @Column(name = "docNameChan")
    private String docNameChan;
    
    @Column(name = "specility")
    private String specility;
    
    @Column(name = "referFees")
    private Float referFees;

    @Column(name = "ref_doc_per")
    private Double ref_doc_per;

    @Column(name = "mobile")
    private String mobile;
    
    @Column(name = "totalbill")
    private Double totalbill;
    
    @Column(name = "referred_source")
    private String referred_source;
    
    @Column(name = "sourceDocName")
    private String sourceDocName;
    
    @Column(name = "department_id")
	private Integer department_id;
    
    @Transient
    private List<RefDoctorDTO> listAllPfRecords;

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public Date getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(Date createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getOpdipdno() {
        return opdipdno;
    }

    public void setOpdipdno(String opdipdno) {
        this.opdipdno = opdipdno;
    }

    public String getCategoryname() {
        return categoryname;
    }

    public void setCategoryname(String categoryname) {
        this.categoryname = categoryname;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getDocNameChan() {
        return docNameChan;
    }

    public void setDocNameChan(String docNameChan) {
        this.docNameChan = docNameChan;
    }

    public String getSpecility() {
        return specility;
    }

    public void setSpecility(String specility) {
        this.specility = specility;
    }

    public Float getReferFees() {
        return referFees;
    }

    public void setReferFees(Float referFees) {
        this.referFees = referFees;
    }

    public Double getRef_doc_per() {
        return ref_doc_per;
    }

    public void setRef_doc_per(Double ref_doc_per) {
        this.ref_doc_per = ref_doc_per;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Double getTotalbill() {
        return totalbill;
    }

    public void setTotalbill(Double totalbill) {
        this.totalbill = totalbill;
    }
    
    

    public String getReferred_source() {
		return referred_source;
	}

	public void setReferred_source(String referred_source) {
		this.referred_source = referred_source;
	}

	public String getSourceDocName() {
		return sourceDocName;
	}

	public void setSourceDocName(String sourceDocName) {
		this.sourceDocName = sourceDocName;
	}

	public List<RefDoctorDTO> getListAllPfRecords() {
        return listAllPfRecords;
    }

    public void setListAllPfRecords(List<RefDoctorDTO> listAllPfRecords) {
        this.listAllPfRecords = listAllPfRecords;
    }

	public Integer getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Integer department_id) {
		this.department_id = department_id;
	}

	

    
}