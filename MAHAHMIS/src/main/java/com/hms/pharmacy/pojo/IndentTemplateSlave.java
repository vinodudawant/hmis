package com.hms.pharmacy.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pharma_indent_template_slave")
public class IndentTemplateSlave implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "indent_template_slave_id")
	private Integer indentTemplateSlaveId;
	
	@ManyToOne
	@JoinColumn(name = "indent_template_slave_product_id")
	private ProductMaster productMaster;
	
	@Column(name = "indent_template_slave_qty")
	private Integer productQty=0;
	
	@Column(name = "indent_template_slave_delete_flag")
	private Integer deleteFlag=0;
	
	@Column(name = "indent_template_slave_narration")
	private String indentTemplateSlaveNarration=null;

	public Integer getIndentTemplateSlaveId() {
		return indentTemplateSlaveId;
	}

	public void setIndentTemplateSlaveId(Integer indentTemplateSlaveId) {
		this.indentTemplateSlaveId = indentTemplateSlaveId;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getProductQty() {
		return productQty;
	}

	public void setProductQty(Integer productQty) {
		this.productQty = productQty;
	}

	public Integer getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public String getIndentTemplateSlaveNarration() {
		return indentTemplateSlaveNarration;
	}

	public void setIndentTemplateSlaveNarration(String indentTemplateSlaveNarration) {
		this.indentTemplateSlaveNarration = indentTemplateSlaveNarration;
	}
}
