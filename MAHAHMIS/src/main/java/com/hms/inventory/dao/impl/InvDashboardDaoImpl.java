package com.hms.inventory.dao.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.InvDashboardDao;
import com.hms.inventory.dto.InvDashboardDto;
import com.hms.inventory.dto.MrnMasterDTO;

@Repository
public class InvDashboardDaoImpl implements InvDashboardDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	private InvDashboardDto dashboardDto;
	
	static Logger log=Logger.getLogger(InvDashboardDaoImpl.class.getName());

	@Override
	public List<InvDashboardDto> getItemStockBelowMinimumInQty(
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		List<InvDashboardDto> lstDashboardDto= new ArrayList<InvDashboardDto>();
		try {
			//updated query by rohit
			//21-11-2020
			String sql = "SELECT i.id,b.item_name,FLOOR(SUM(b.item_quantity)) AS item_qty,i.reorder_stock AS min_qty,i.category_type,b.item_uom_name FROM inv_item_master_new i INNER JOIN inv_batch_stock_new b ON b.item_master_id = i.id WHERE b.deleted = 'N' AND i.deleted = 'N' AND i.status = 'Continue' GROUP BY i.id HAVING SUM(b.item_quantity) <= i.reorder_stock";
			System.out.println("sql::"+sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				InvDashboardDto pm = new InvDashboardDto();
				pm.setId((Integer) row.get("id"));
				pm.setItemName((String) row.get("item_name"));
				pm.setCategoryName((String) row.get("category_type"));
                pm.setMinQty((Integer) row.get("min_qty"));
               /// pm.setItemQty((Integer) row.get("item_qty"));
                pm.setItemQuantity((BigDecimal) row.get("item_qty"));
                pm.setItemUOMName((String) row.get("item_uom_name"));
               /* pm.setBatchNo((String) row.get("item_batch_code"));
                pm.setBatchExpiryDate((String) row.get("item_batch_exp_date"));*/
                lstDashboardDto.add(pm);
				pm=null;
			}
				
			}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return lstDashboardDto;
		
	}

	@Override
	public List<InvDashboardDto> getProductExpired(
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		List<InvDashboardDto> lstDashboardDto= new ArrayList<InvDashboardDto>();
		try {
			
			//updated query 25-11-2020
			//author Rohit Sandbhor
			String sql="SELECT DISTINCT "+
				    "itemMaster.id,"+
				    "itemMaster.item_name,"+
				    "batchStock.item_batch_code,"+
				    "DATE_FORMAT(batchStock.item_batch_exp_date,"+
				            " '%Y-%m-%d') AS item_batch_exp_date,"+
				    "batchStock.item_quantity AS item_qty,"+
					"IFNULL(batchStock.created_by, 'MainStore') AS store_name,"+
				    "batchStock.item_uom_name"+
				" FROM "+
				    "inv_item_master_new itemMaster"+
				        " INNER JOIN "+
				    "inv_batch_stock_new batchStock ON batchStock.item_master_id = itemMaster.id"+
				        
				" WHERE "+
				    " batchStock.deleted = 'N'"+
				        " AND itemMaster.deleted = 'N'"+
				        " AND batchStock.item_batch_code != '0'"+
				        " AND batchStock.item_batch_exp_date != '1970-01-01 05:30:00' "+
				        " AND DATE_FORMAT(batchStock.item_batch_exp_date,"+
				            " '%Y-%m-%d') < DATE_FORMAT(CURRENT_DATE(), '%Y-%m-%d')"+
				" UNION ALL "+
				"SELECT "+
					"goodsIssue.item_master_id,"+
				    "goodsIssue.item_name,"+
				    "goodsIssue.item_batch_code,"+
				    "DATE_FORMAT(goodsIssue.item_batch_exp_date,"+
				            " '%Y-%m-%d') AS item_batch_exp_date,"+
				    "SUM(goodsIssue.current_subinventory_stock) AS item_qty,"+
				    "IFNULL(goodsIssue.sub_inventory_name, 'MainStore') AS store_name,"+
				    "uomUnit.unit_name"+
				" FROM "+
				    "inv_goods_issue_mrn_item_slave_new as goodsIssue"+
				    " INNER JOIN "+
				    "ehat_unit_doc as uomUnit ON goodsIssue.item_uom = uomUnit.uni_id"+
				" WHERE "+
				    "(goodsIssue.mrn_status = 'FullyReceived'"+
				        " OR goodsIssue.mrn_status = 'PartiallyReceivedQty'"+
				        " OR goodsIssue.mrn_status = 'Dispatched')"+
				        " AND goodsIssue.deleted != 'Y'"+
				        " AND goodsIssue.updated_by = 1"+
				        " AND goodsIssue.item_batch_code != '0' "+
				        " AND goodsIssue.item_batch_exp_date != '1970-01-01 05:30:00' "+
				        " AND DATE_FORMAT(goodsIssue.item_batch_exp_date,"+
				            " '%Y-%m-%d') < DATE_FORMAT(CURRENT_DATE(), '%Y-%m-%d')"+
				" GROUP BY goodsIssue.sub_inventory_id,goodsIssue.item_batch_code";
			System.out.println("sql getProductExpired:::"+sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				InvDashboardDto pm = new InvDashboardDto();
				pm.setId((Integer) row.get("id"));
				pm.setItemName((String) row.get("item_name"));
                pm.setItemQuantity((BigDecimal) row.get("item_qty"));
                pm.setItemUOMName((String) row.get("item_uom_name"));
                pm.setBatchExpiryDate((String) row.get("item_batch_exp_date"));
                pm.setBatchNo((String) row.get("item_batch_code"));
                pm.setSubInventoryName((String) row.get("store_name"));
                //pm.setCurrentSubInvStock((Integer) row.get("current_sub_inventory_stock"));
                lstDashboardDto.add(pm);
				pm=null;
			}
				
			}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return lstDashboardDto;
		
	}

	@Override
	public List<InvDashboardDto> getProductNearExpiry(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		List<InvDashboardDto> lstDashboardDto= new ArrayList<InvDashboardDto>();
		try {
			
			
			/*String sql = " SELECT distinct itemMaster.id, DATEDIFF(Date_Format(batchStock.item_batch_exp_date,'%Y-%m-%d'),Date_Format(CURRENT_DATE(),'%Y-%m-%d')) As daysleft, " +
					"itemMaster.item_name, " +
					"batchStock.item_batch_code, " +
					"batchStock.item_uom_name, " +
					"batchStock.current_sub_inventory_stock, " +
					"Date_Format(batchStock.item_batch_exp_date,'%Y-%m-%d') as item_batch_exp_date, " +
					"batchStock.item_quantity as item_qty, sub.subinventory_name, batchStock.sub_inv_id as sub_inv_id " +
					"FROM inv_item_master_new itemMaster " +
					"INNER JOIN inv_batch_stock_new batchStock " +
					"ON batchStock.item_master_id=itemMaster.id " +
					"LEFT JOIN inv_subinventory_master_new sub ON sub.id=batchStock.sub_inv_id " +
					"WHERE batchStock.deleted='N' AND itemMaster.deleted='N' AND batchStock.item_batch_code!='0' " +
					"AND Date_Format(batchStock.item_batch_exp_date,'%Y-%m-%d') >= Date_Format(CURRENT_DATE(),'%Y-%m-%d') AND DATEDIFF(Date_Format(batchStock.item_batch_exp_date,'%Y-%m-%d'),Date_Format(CURRENT_DATE(),'%Y-%m-%d')) <= 30 ";*/
			
			String sql = "SELECT DISTINCT "+
				    "itemMaster.id,"+
				    "itemMaster.item_name,"+
				    "batchStock.item_batch_code,"+
				    "DATE_FORMAT(batchStock.item_batch_exp_date,"+
				            " '%Y-%m-%d') AS item_batch_exp_date,"+
				    "DATEDIFF(DATE_FORMAT(batchStock.item_batch_exp_date, "+
				    " '%Y-%m-%d'),DATE_FORMAT(CURRENT_DATE(), '%Y-%m-%d')) AS daysleft,"+
				    "batchStock.item_quantity AS item_qty,"+
					"IFNULL(batchStock.created_by, 'MainStore') AS store_name,"+
				    "batchStock.item_uom_name"+
				" FROM "+
				    "inv_item_master_new itemMaster"+
				        " INNER JOIN "+
				    "inv_batch_stock_new batchStock ON batchStock.item_master_id = itemMaster.id"+
				        
				" WHERE "+
				    " batchStock.deleted = 'N'"+
				        " AND itemMaster.deleted = 'N'"+
				        " AND batchStock.item_batch_code != '0'"+
				        " AND batchStock.item_batch_exp_date != '1970-01-01 05:30:00' "+
				        " AND DATE_FORMAT(batchStock.item_batch_exp_date,"+
				            " '%Y-%m-%d') >= Date_Format(CURRENT_DATE(),'%Y-%m-%d') "+
				        " AND DATEDIFF(Date_Format(batchStock.item_batch_exp_date,'%Y-%m-%d'),Date_Format(CURRENT_DATE(),'%Y-%m-%d')) <= 30 "+
				" UNION ALL "+
				"SELECT "+
					"goodsIssue.item_master_id,"+
				    "goodsIssue.item_name,"+
				    "goodsIssue.item_batch_code,"+
				    "DATE_FORMAT(goodsIssue.item_batch_exp_date,"+
				            " '%Y-%m-%d') AS item_batch_exp_date,"+
				    "DATEDIFF(DATE_FORMAT(goodsIssue.item_batch_exp_date, "+
				    " '%Y-%m-%d'),DATE_FORMAT(CURRENT_DATE(), '%Y-%m-%d')) AS daysleft,"+
				    "SUM(goodsIssue.current_subinventory_stock) AS item_qty,"+
				    "IFNULL(goodsIssue.sub_inventory_name, 'MainStore') AS store_name,"+
				    "uomUnit.unit_name"+
				" FROM "+
				    "inv_goods_issue_mrn_item_slave_new as goodsIssue"+
				    " INNER JOIN "+
				    "ehat_unit_doc as uomUnit ON goodsIssue.item_uom = uomUnit.uni_id"+
				" WHERE "+
				    "(goodsIssue.mrn_status = 'FullyReceived'"+
				        " OR goodsIssue.mrn_status = 'PartiallyReceivedQty'"+
				        " OR goodsIssue.mrn_status = 'Dispatched')"+
				        " AND goodsIssue.deleted != 'Y'"+
				        " AND goodsIssue.updated_by = 1"+
				        " AND goodsIssue.item_batch_code != '0' "+
				        " AND goodsIssue.item_batch_exp_date != '1970-01-01 05:30:00' "+
				        " AND DATE_FORMAT(goodsIssue.item_batch_exp_date,"+
				            " '%Y-%m-%d') >= Date_Format(CURRENT_DATE(),'%Y-%m-%d') "+
				        " AND DATEDIFF(Date_Format(goodsIssue.item_batch_exp_date,'%Y-%m-%d'),Date_Format(CURRENT_DATE(),'%Y-%m-%d')) <= 30 "+
				" GROUP BY goodsIssue.sub_inventory_id,goodsIssue.item_batch_code";
			System.out.println("sql getProductNearExpiry::"+sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				
				InvDashboardDto pm = new InvDashboardDto();
				/*pm.setId((Integer) row.get("id"));
				pm.setItemName((String) row.get("item_name"));
                pm.setItemQty((Integer) row.get("item_qty"));
                pm.setItemUOMName((String) row.get("item_uom_name"));
                pm.setBatchExpiryDate((String) row.get("item_batch_exp_date"));
                pm.setBatchNo((String) row.get("item_batch_code"));
                pm.setSubInventoryName((String) row.get("subinventory_name"));
                pm.setCurrentSubInvStock((Integer) row.get("current_sub_inventory_stock"));*/
				pm.setId((Integer) row.get("id"));
				pm.setItemName((String) row.get("item_name"));
                pm.setItemQuantity((BigDecimal) row.get("item_qty"));
                pm.setItemUOMName((String) row.get("item_uom_name"));
                pm.setBatchExpiryDate((String) row.get("item_batch_exp_date"));
                pm.setBatchNo((String) row.get("item_batch_code"));
                pm.setSubInventoryName((String) row.get("store_name"));
                pm.setDaysLeftBig((BigInteger) row.get("daysleft"));
                lstDashboardDto.add(pm);
				pm=null;
			}
				
			}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return lstDashboardDto;
		
	}

	@Override
	public List<MrnMasterDTO> getTodayIndent(HttpServletRequest request) {
		List<MrnMasterDTO> lstGeneratedMrn =new ArrayList<MrnMasterDTO>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			
			String sql = " SELECT Date_Format(mrn.created_date_time,'%Y-%m-%d') as created_date_time, mrn.mrn_id, mrn.mrn_subinventory_name FROM inv_mrn_master_new  as mrn WHERE mrn.deleted='N' "
					+ "AND Date_Format(mrn.created_date_time,'%Y-%m-%d')= Date_Format(CURRENT_DATE(),'%Y-%m-%d') order by mrn_id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow  = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				MrnMasterDTO mrn = new MrnMasterDTO();
				mrn.setMrnId((Integer) row.get("mrn_id"));
				mrn.setMrnSubinventoryName((String) row.get("mrn_subinventory_name"));
				mrn.setMrnDate((String)row.get("created_date_time"));
                lstGeneratedMrn.add(mrn);
                mrn=null;
			}
			log.debug("inside getInProgressIndent:" + lstGeneratedMrn);
		}catch(Exception e){
			log.error("error for  getInProgressIndent...."+e.getMessage());
			e.printStackTrace();
		}
		return lstGeneratedMrn;
	}

	@Override
	public List<MrnMasterDTO> getInProgressIndent(HttpServletRequest request) {
		List<MrnMasterDTO> lstGeneratedMrn =new ArrayList<MrnMasterDTO>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{

			String sql = " SELECT Date_Format(mrn.created_date_time,'%Y-%m-%d') as created_date_time, mrn.mrn_id, mrn.mrn_subinventory_name FROM inv_mrn_master_new  as mrn WHERE mrn.deleted='N' AND mrn.mrn_status='PartiallyReceived' OR mrn.mrn_status='PartiallyReceivedQty' order by mrn_id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				
				MrnMasterDTO mrn = new MrnMasterDTO();
				mrn.setMrnId((Integer) row.get("mrn_id"));
				mrn.setMrnSubinventoryName((String) row.get("mrn_subinventory_name"));
				mrn.setMrnDate((String)row.get("created_date_time"));
                lstGeneratedMrn.add(mrn);
                mrn=null;
			}
			log.debug("inside getInProgressIndent:" + lstGeneratedMrn);
		}catch(Exception e){
			log.error("error for  getInProgressIndent...."+e.getMessage());
			e.printStackTrace();
		}
		return lstGeneratedMrn;
	}

	@Override
	public List<MrnMasterDTO> getPendingIndent(HttpServletRequest request) {
		List<MrnMasterDTO> lstGeneratedMrn =new ArrayList<MrnMasterDTO>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			
			String sql = " SELECT Date_Format(mrn.created_date_time,'%Y-%m-%d') as created_date_time, mrn.mrn_id, mrn.mrn_subinventory_name FROM inv_mrn_master_new  as mrn WHERE mrn.deleted='N' AND mrn.mrn_status='OPEN' order by mrn_id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				
				MrnMasterDTO mrn = new MrnMasterDTO();
				mrn.setMrnId((Integer) row.get("mrn_id"));
				mrn.setMrnSubinventoryName((String) row.get("mrn_subinventory_name"));
				mrn.setMrnDate((String)row.get("created_date_time"));
                lstGeneratedMrn.add(mrn);
                mrn=null;
			}
			log.debug("inside getInProgressIndent:" + lstGeneratedMrn);
		}catch(Exception e){
			log.error("error for  getInProgressIndent...."+e.getMessage());
			e.printStackTrace();
		}
		return lstGeneratedMrn;
	}

	
}
