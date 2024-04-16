package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.GoodsReceiptDao;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;

@Repository
@Transactional
public class GoodsReceiptDaoImpl implements GoodsReceiptDao{

	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<MrnMasterDTO> getMrnData() {
		List<MrnMasterDTO> list=new ArrayList<MrnMasterDTO>();
		String sql ="select mrn_table.mrn_id,mrn_table.mrn_date,mrn_table.mrn_remark, mrn_table.mrn_status,mrn_table.mrn_dispatch_date,mrn_table.received_date ,subinv.subinventory_name from inv_mrn_master_new  mrn_table left join inv_subinventory_master_new subinv on  mrn_table.mrn_subinventory_id = subinv.id";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listMrnDetails = query.list();
		for (Map<String, Object> row : listMrnDetails ) {
			MrnMasterDTO obj = new MrnMasterDTO();
			obj.setMrnId((Integer)row.get("mrn_id"));
			obj.setMrnDate((String)row.get("mrn_date"));
			obj.setMrnRemark((String)row.get("mrn_remark"));
			obj.setMrnStatus((String)row.get("mrn_status"));
			obj.setMrnDispatchDate((String)row.get("mrn_dispatch_date"));
			obj.setReceivedDate((String)row.get("received_date"));
			obj.setSubInventoryName((String)row.get("subinventory_name"));
			list.add(obj);
		}
		return list;
	}

	@Override
	public List<MrnMasterDTO> getMrnDataById(int id) {
		List<MrnMasterDTO> list=new ArrayList<MrnMasterDTO>();
		String sql ="select mrn_table.mrn_id,mrn_table.mrn_date,mrn_table.mrn_remark, mrn_table.mrn_status,mrn_table.mrn_dispatch_date,mrn_table.received_date ,subinv.subinventory_name from inv_mrn_master_new  mrn_table left join inv_subinventory_master_new subinv on  mrn_table.mrn_subinventory_id = subinv.id where mrn_table.mrn_id="+id;
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listMrnDetails = query.list();
		for (Map<String, Object> row : listMrnDetails ) {
			MrnMasterDTO obj = new MrnMasterDTO();
			obj.setMrnId((Integer)row.get("mrn_id"));
			obj.setMrnDate((String)row.get("mrn_date"));
			obj.setMrnRemark((String)row.get("mrn_remark"));
			obj.setMrnStatus((String)row.get("mrn_status"));
			obj.setMrnDispatchDate((String)row.get("mrn_dispatch_date"));
			obj.setReceivedDate((String)row.get("received_date"));
			obj.setSubInventoryName((String)row.get("subinventory_name"));
			list.add(obj);
		}
		return list;
	}

	@Override
	public List<MrnMasterItemInfoDTO> getMrnDataForReport(int id) {
		// TODO Auto-generated method stub
		List<MrnMasterItemInfoDTO>list=new ArrayList<>();
		String sql="select  a.item_info_id,a.item_name,a.item_available_qty,a.item_uom,item_recieved_qty," +
				" a.item_issue_qty,b.unit_name from  inv_mrn_item_info_slave_new a" +
				" left join ehat_unit_doc b on a.item_uom = b.uni_id where mrn_id="+id;
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listMrnDetails = query.list();
		for (Map<String, Object> row :listMrnDetails ) {
			MrnMasterItemInfoDTO obj=new MrnMasterItemInfoDTO();
			obj.setItemInfoId((Integer)row.get("item_info_id"));
			obj.setItemName((String)row.get("item_name"));
		    obj.setItemAvailableQty((Integer)row.get("item_available_qty"));
		    obj.setItemUom((String)row.get("item_uom"));
		    obj.setUnitName((String)row.get("unit_name"));
		    obj.setItem_issue_qty((Integer)row.get("item_issue_qty"));
		   // obj.setItemIssueQty(((BigDecimal)row.get("item_issue_qty")).doubleValue());
		    obj.setItemRecievedQuantity((Integer)row.get("item_recieved_qty")); 
		    list.add(obj);
		    
		    
		}
		return list;
	}

	

}
