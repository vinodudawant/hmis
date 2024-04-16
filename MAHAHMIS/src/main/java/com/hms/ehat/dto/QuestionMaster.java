package com.hms.ehat.dto;

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


@Entity
@Table(name = "ehat_question_master")
public class QuestionMaster {
	@Id
	@GeneratedValue
	@Column(name = "id_question_master")
	private int id_question_master;

	@Column(name = "question_header")
	private String question_header;
	
	@Column(name = "status")
	private String status="N";

	@Column(name = "text" ,columnDefinition="varchar(500) default '-'")
	private String text="N";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
    @Column(name = "deleted_by")
	private Integer deletedBy=0;
    
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
/*	
	@OneToMany(fetch = FetchType.LAZY ,cascade = {CascadeType.ALL})
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "id_question_master", referencedColumnName = "id_question_master")*/
	@Transient	

    private List<QuestionDR>listQuestion;
	
	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	@Transient	
    private List<QuestionMaster>listquestionmaster;
	@Transient	
    private List<AnswerDR>listAnswerDR;

	public int getId_question_master() {
		return id_question_master;
	}

	public void setId_question_master(int id_question_master) {
		this.id_question_master = id_question_master;
	}

	public String getQuestion_header() {
		return question_header;
	}

	public void setQuestion_header(String question_header) {
		this.question_header = question_header;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	

	public List<QuestionMaster> getListquestionmaster() {
		return listquestionmaster;
	}

	public void setListquestionmaster(List<QuestionMaster> listquestionmaster) {
		this.listquestionmaster = listquestionmaster;
	}

	public List<AnswerDR> getListAnswerDR() {
		return listAnswerDR;
	}

	public void setListAnswerDR(List<AnswerDR> listAnswerDR) {
		this.listAnswerDR = listAnswerDR;
	}

	public List<QuestionDR> getListQuestion() {
		return listQuestion;
	}

	public void setListQuestion(List<QuestionDR> listQuestion) {
		this.listQuestion = listQuestion;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	

}
