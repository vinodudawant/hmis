package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_question_list")
public class QuestionDR {

	@Id
	@GeneratedValue
	@Column(name = "id_question")
	private int id_question;
	
	
	/*@ManyToOne
	@JoinColumn(name = "id_question_master")
	private QuestionMaster id_question_master;
*/
	private Integer id_question_master;
	@Column(name = "question_name")
	private String question_name;
	
	@Column(name = "status")
	private String status="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Column(name = "deleted_by")
	private Integer deletedBy=0;
	

	/*@OneToMany(fetch = FetchType.LAZY ,cascade = {CascadeType.ALL})
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "id_question", referencedColumnName = "id_question")*/
	@Transient
    private List<AnswerDR>listAnswerDR;
	@Transient
    private List<QuestionDR>listQuestionDR;
	
	
	
	public int getId_question() {
		return id_question;
	}

	public void setId_question(int id_question) {
		this.id_question = id_question;
	}


	public String getQuestion_name() {
		return question_name;
	}

	public void setQuestion_name(String question_name) {
		this.question_name = question_name;
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

	

	


	public List<QuestionDR> getListQuestionDR() {
		return listQuestionDR;
	}

	public void setListQuestionDR(List<QuestionDR> listQuestionDR) {
		this.listQuestionDR = listQuestionDR;
	}

	public Integer getId_question_master() {
		return id_question_master;
	}

	public void setId_question_master(Integer id_question_master) {
		this.id_question_master = id_question_master;
	}

	

	public List<AnswerDR> getListAnswerDR() {
		return listAnswerDR;
	}

	public void setListAnswerDR(List<AnswerDR> listAnswerDR) {
		this.listAnswerDR = listAnswerDR;
	}

	
	

	/*@JsonIgnore
	public QuestionMaster getId_question_master() {
		return id_question_master;
	}

	public void setId_question_master(QuestionMaster id_question_master) {
		this.id_question_master = id_question_master;
	}*/
}
