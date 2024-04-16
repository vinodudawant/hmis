package com.hms.pharmacy.pojo;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;


@Entity
@Table(name = "pharma_partywise_po_invoice_master")
public class PartywisePoInvoiceMaster 
{ 

	@Id
	@GeneratedValue
	@Column(name = "invoice_id")
	private Integer partywisePoId;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "po_id")
  private PoMaster poMaster;
  
  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "partywise_po_id")
  private PartywisePoMaster partywisePoMaster;
  
  
  public PartywisePoMaster getPartywisePoMaster() {
	return partywisePoMaster;
}

public void setPartywisePoMaster(PartywisePoMaster partywisePoMaster) {
	this.partywisePoMaster = partywisePoMaster;
}
 
 
public Integer getPartywisePoId() {
		return partywisePoId;
	}

	public void setPartywisePoId(Integer partywisePoId) {
		this.partywisePoId = partywisePoId;
	}

	
	public PoMaster getPoMaster() {
		return poMaster;
	}

	public void setPoMaster(PoMaster poMaster) {
		this.poMaster = poMaster;
	}
	
  

}
