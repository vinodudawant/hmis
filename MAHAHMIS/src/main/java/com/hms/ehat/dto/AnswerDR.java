package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_answer_list")
public class AnswerDR {


	@Id
	@GeneratedValue
	@Column(name = "id_answer")
	private int id_answer;


/*	@ManyToOne
	@JoinColumn(name = "id_question")
	private QuestionDR id_question;*/
	private Integer id_question;
	
	@Column(name = "answer_name")
	private String answer_name;
	
	@Column(name = "status")
	private String status="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	

	@Column(name = "deleted_by")
	private Integer deletedBy=0;
	

	@Column(name = "points")
	private String points;
	@Transient	
	private Integer Qno1;
	@Transient
    private List<AnswerDR>listAnswerDR;

	public int getId_answer() {
		return id_answer;
	}

	public void setId_answer(int id_answer) {
		this.id_answer = id_answer;
	}


	public String getAnswer_name() {
		return answer_name;
	}

	public void setAnswer_name(String answer_name) {
		this.answer_name = answer_name;
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

	public List<AnswerDR> getListAnswerDR() {
		return listAnswerDR;
	}

	public void setListAnswerDR(List<AnswerDR> listAnswerDR) {
		this.listAnswerDR = listAnswerDR;
	}

	public String getPoints() {
		return points;
	}

	public void setPoints(String points) {
		this.points = points;
	}
	
	


	public Integer getQno1() {
		return Qno1;
	}

	public void setQno1(Integer qno1) {
		Qno1 = qno1;
	}

	public Integer getId_question() {
		return id_question;
	}


	public void setId_question(Integer id_question) {
		this.id_question = id_question;
	}
	
}
