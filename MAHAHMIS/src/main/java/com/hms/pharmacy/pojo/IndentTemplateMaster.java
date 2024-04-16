package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_indent_template_master")
public class IndentTemplateMaster implements Serializable {
	
	@Id
	@GeneratedValue
	@Column(name= "indent_template_master_id")
	private Integer indentTemplateId;

	@Column(name = "indent_template_name")
	private String 	indentTemplateName=null;

	@Column(name = "indent_template_narration")
	private String indentTemplateNarration=null;
	
	@Column(name = "indent_template_add_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date indentTemplateAddDate;
	
	@Column(name = "indent_template_update_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date indentTemplateUpdateDate;

	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "indent_template_slave_master_id", referencedColumnName = "indent_template_master_id")
	private List<IndentTemplateSlave> indentTemplateSlaves = new ArrayList<IndentTemplateSlave>();
	
	@Column(name = "indent_template_delete_flag")
	private Integer indentTemplateDeleteFlag=0;
	
	@Column(name = "indent_template_add_user_id")
	private Integer indentTemplateAddUserId=0;
	
	@Column(name = "indent_template_mod_user_id")
	private Integer indentTemplateModUserId=0;
	
	@Column(name = "indent_template_add_time")
	private String indentTemplateAddTime=null;
	
	@Column(name = "indent_template_update_time")
	private String indentTemplateUpdateTime=null;
	
	@Column(name = "indent_template_user_ip")
	private String indentTemplateIp=null;

	
	public Integer getIndentTemplateId() {
		return indentTemplateId;
	}

	public void setIndentTemplateId(Integer indentTemplateId) {
		this.indentTemplateId = indentTemplateId;
	}

	public String getIndentTemplateName() {
		return indentTemplateName;
	}

	public void setIndentTemplateName(String indentTemplateName) {
		this.indentTemplateName = indentTemplateName;
	}

	public String getIndentTemplateNarration() {
		return indentTemplateNarration;
	}

	public void setIndentTemplateNarration(String indentTemplateNarration) {
		this.indentTemplateNarration = indentTemplateNarration;
	}

	public Date getIndentTemplateAddDate() {
		return indentTemplateAddDate;
	}

	public void setIndentTemplateAddDate(Date indentTemplateAddDate) {
		this.indentTemplateAddDate = indentTemplateAddDate;
	}

	public Date getIndentTemplateUpdateDate() {
		return indentTemplateUpdateDate;
	}

	public void setIndentTemplateUpdateDate(Date indentTemplateUpdateDate) {
		this.indentTemplateUpdateDate = indentTemplateUpdateDate;
	}

	public List<IndentTemplateSlave> getIndentTemplateSlaves() {
		return indentTemplateSlaves;
	}

	public void setIndentTemplateSlaves(
			List<IndentTemplateSlave> indentTemplateSlaves) {
		this.indentTemplateSlaves = indentTemplateSlaves;
	}

	public Integer getIndentTemplateDeleteFlag() {
		return indentTemplateDeleteFlag;
	}

	public void setIndentTemplateDeleteFlag(Integer indentTemplateDeleteFlag) {
		this.indentTemplateDeleteFlag = indentTemplateDeleteFlag;
	}

	public Integer getIndentTemplateAddUserId() {
		return indentTemplateAddUserId;
	}

	public void setIndentTemplateAddUserId(Integer indentTemplateAddUserId) {
		this.indentTemplateAddUserId = indentTemplateAddUserId;
	}

	public Integer getIndentTemplateModUserId() {
		return indentTemplateModUserId;
	}

	public void setIndentTemplateModUserId(Integer indentTemplateModUserId) {
		this.indentTemplateModUserId = indentTemplateModUserId;
	}

	public String getIndentTemplateIp() {
		return indentTemplateIp;
	}

	public void setIndentTemplateIp(String indentTemplateIp) {
		this.indentTemplateIp = indentTemplateIp;
	}

	public String getIndentTemplateAddTime() {
		return indentTemplateAddTime;
	}

	public void setIndentTemplateAddTime(String indentTemplateAddTime) {
		this.indentTemplateAddTime = indentTemplateAddTime;
	}

	public String getIndentTemplateUpdateTime() {
		return indentTemplateUpdateTime;
	}

	public void setIndentTemplateUpdateTime(String indentTemplateUpdateTime) {
		this.indentTemplateUpdateTime = indentTemplateUpdateTime;
	}
}
