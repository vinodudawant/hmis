package com.hms.inventory.dao.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
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

import com.hms.inventory.dao.InvReportDao;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.InvReportDto;
import com.hms.inventory.dto.SubInventoryMasterDto;

@Repository
public class InvReportDaoImpl implements InvReportDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	InvReportDto invReportDto;
	
	static Logger log=Logger.getLogger(InvReportDaoImpl.class.getName());

	@Override
	public List <InvReportDto> getAllItemStockBelowMinimunLevelReport(
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		List<InvReportDto> lstInvReportDto = new ArrayList<InvReportDto>();
		try {

			String sql = " SELECT " +
					"itemMaster.id, " +
					"itemMaster.item_name, " +
					"itemMaster.reorder_stock, " +
					"itemMaster.max_stock," +
					"itemMaster.order_stock," +
					"FLOOR(SUM(batchStock.item_quantity)) AS item_quantity, " +
					"Date_Format(batchStock.item_batch_exp_date,'%Y-%m-%d') as item_batch_exp_date, " +
					"batchStock.item_batch_code " +
					"FROM inv_item_master_new itemMaster " +
					"INNER JOIN inv_batch_stock_new batchStock " +
					"ON batchStock.item_master_id=itemMaster.id " +
					"WHERE batchStock.deleted='N' AND itemMaster.deleted='N' AND batchStock.unit_id="+unitId+" AND itemMaster.unit_id="+unitId+" group by itemMaster.id Having SUM(batchStock.item_quantity) <= itemMaster.reorder_stock ";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			System.out.println("this is below minimum "+sql);
			for (Map<String, Object> row : masterRow) {
				
				InvReportDto pm = new InvReportDto();
				pm.setId((Integer) row.get("id"));
				pm.setItemName((String) row.get("item_name"));
				pm.setBatchNo((String) row.get("item_batch_code"));
				pm.setBatchExpiryDate((String) row.get("item_batch_exp_date"));
                pm.setReOrderQty((Integer) row.get("reorder_stock"));	
                pm.setMaxQty((Integer) row.get("max_stock"));
                pm.setOrderQty((Integer) row.get("order_stock"));
               // pm.setAvailableStockQty((Integer) row.get("item_quantity"));
                pm.setItemQuantity((BigDecimal) row.get("item_quantity"));
                pm.setCurrentSubInvStock((BigDecimal) row.get("current_sub_inventory_stock"));
				lstInvReportDto.add(pm);
				pm=null;
			}
				
			}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return lstInvReportDto;
		
	}
	



	@Override
	public List<InvReportDto> getAllItemExpirayDateReport(String fromuserDate,String touserDate,HttpServletRequest request) {
		List<InvReportDto> lstbatch = new ArrayList<InvReportDto>();

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		
		try{
		String sql = " SELECT  DATEDIFF(DATE_FORMAT(batchStock.item_batch_exp_date,'%Y-%m-%d'), DATE_FORMAT(CURRENT_DATE(), '%Y-%m-%d')) As daysleft," +
				" itemMaster.id, " +
				"itemMaster.item_name, " +
				"batchStock.item_batch_code, " +
				"batchStock.item_batch_exp_date," +
				
				"batchStock.item_quantity " +
				"FROM inv_item_master_new itemMaster " +
				"INNER JOIN inv_batch_stock_new batchStock " +
				"ON batchStock.item_master_id=itemMaster.id " +
				"WHERE batchStock.deleted='N' AND itemMaster.deleted='N' AND  date(batchStock.item_batch_exp_date) >= '"+fromuserDate+"' AND date(batchStock.item_batch_exp_date) <= '"+touserDate+"' AND itemMaster.unit_id="+unitId+" AND batchStock.unit_id="+unitId;
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		System.out.println("sql getAllItemExpirayDateReport::"+sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		
		for (Map<String, Object> row : masterRow) {
			
			InvReportDto pm = new InvReportDto();
			pm.setId((Integer) row.get("id"));
			pm.setItemName((String) row.get("item_name"));
			pm.setBatchNo((String) row.get("item_batch_code"));
			pm.setExpirayDate((Date) row.get("item_batch_exp_date"));
			pm.setDaysLeft(((Number) row.get("daysleft")).intValue());
			pm.setAvailableStockQty((Integer) row.get("item_quantity"));
			lstbatch.add(pm);
			pm=null;
		}
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getAllItemExpirayDateReport....",e);

			//e.printStackTrace();
			return null;
		}
		return lstbatch;
	}
	@Override
	public List<InvReportDto> getAllItemOpeningStockReport(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<InvReportDto> lstInvReportDto = new ArrayList<InvReportDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			
			/*
			 * String sql = "SELECT  " + "openingStockMaster.stock_series, " +
			 * "openingStockMaster.id as stock_id, " + "openingStockMaster.stock_narration,"
			 * + "openingStockMaster.user_name," +
			 * "openingStockMaster.created_date_time as opening_date," +
			 * "openingStockSlave.item_quantity as added_quantity," +
			 * "batchStock.item_quantity as available_quantity,"+
			 * "openingStockSlave.manufac_date as manufac_date," +
			 * "openingStockSlave.item_unit_price as item_unit_price," +
			 * "openingStockSlave.item_trade_discount	 as discount_in_percentage," +
			 * "openingStockSlave.item_trade_discount_rupees	 as item_trade_discount_rupees,"
			 * +
			 * "openingStockSlave.item_trade_discount_amount	 as item_trade_discount_amount,"
			 * + "openingStockSlave.item_trade_base_amount	 as item_trade_base_amount," +
			 * "openingStockSlave.gst	 as gst," + "openingStockSlave.igst	 as igst," +
			 * "openingStockSlave.total_tax_amount	 as total_tax_amount," +
			 * "openingStockSlave.total_amount	 as total_amount_slave," +
			 * "openingStockSlave.user_name	 as user_name_slave," +
			 * "openingStockSlave.created_by	 as created_by_slave," +
			 * "openingStockSlave.uom_unit_latest_factor	 as uom_unit_latest_factor," +
			 * "openingStockMaster.total_amount," + "openingStockSlave.item_master_id," +
			 * "openingStockSlave.item_name," + "openingStockMaster.created_by," +
			 * "openingStockSlave.batch_no," + "openingStockSlave.expiry_date," +
			 * 
			 * "openingStockSlave.item_trade_discount" +
			 * " FROM inv_opening_stock_item_slave openingStockSlave" +
			 * " LEFT JOIN inv_batch_stock_new batchStock ON batchStock.batch_master_id = openingStockSlave.batch_id"
			 * +
			 * " LEFT JOIN inv_item_master_new itemMaster ON itemMaster.id = openingStockSlave.item_master_id"
			 * +
			 * //" LEFT JOIN inv_batch_stock_new batchStock1 ON batchStock1.item_master_id = itemMaster.id"
			 * +
			 * " LEFT JOIN  inv_opening_stock_new openingStockMaster ON openingStockMaster.id = openingStockSlave.opening_stock_master_id"
			 * +
			 * " WHERE  openingStockSlave.deleted='N' AND openingStockMaster.deleted='N' AND openingStockMaster.unit_id="
			 * +unitId+" AND itemMaster.unit_id="+unitId+" AND openingStockSlave.unit_id="
			 * +unitId+" AND batchStock.os_stock_status = 1 group by openingStockSlave.id order by openingStockSlave.id desc "
			 * ;
			 */
			
			String sql = "SELECT \r\n" + 
					"    openingStockMaster.stock_series,\r\n" + 
					"    openingStockMaster.id AS stock_id,\r\n" + 
					"    openingStockMaster.stock_narration,\r\n" + 
					"    openingStockMaster.user_name,\r\n" + 
					"    openingStockMaster.created_date_time AS opening_date,\r\n" + 
					"    openingStockSlave.item_quantity AS added_quantity,\r\n" + 
					"    (SELECT \r\n" + 
					"            batchStock.item_quantity\r\n" + 
					"        FROM\r\n" + 
					"            inv_batch_stock_new batchStock\r\n" + 
					"        WHERE\r\n" + 
					"            batchStock.batch_master_id = openingStockSlave.batch_id) AS available_quantity,\r\n" + 
					"    openingStockSlave.manufac_date AS manufac_date,\r\n" + 
					"    openingStockSlave.item_unit_price AS item_unit_price,\r\n" + 
					"    openingStockSlave.item_trade_discount AS discount_in_percentage,\r\n" + 
					"    openingStockSlave.item_trade_discount_rupees AS item_trade_discount_rupees,\r\n" + 
					"    openingStockSlave.item_trade_discount_amount AS item_trade_discount_amount,\r\n" + 
					"    openingStockSlave.item_trade_base_amount AS item_trade_base_amount,\r\n" + 
					"    openingStockSlave.gst AS gst,\r\n" + 
					"    openingStockSlave.igst AS igst,\r\n" + 
					"    openingStockSlave.total_tax_amount AS total_tax_amount,\r\n" + 
					"    openingStockSlave.total_amount AS total_amount_slave,\r\n" + 
					"    openingStockSlave.user_name AS user_name_slave,\r\n" + 
					"    openingStockSlave.created_by AS created_by_slave,\r\n" + 
					"    openingStockSlave.uom_unit_latest_factor AS uom_unit_latest_factor,\r\n" + 
					"    openingStockMaster.total_amount,\r\n" + 
					"    openingStockSlave.item_master_id,\r\n" + 
					"    openingStockSlave.item_name,\r\n" + 
					"    openingStockMaster.created_by,\r\n" + 
					"    openingStockSlave.batch_no,\r\n" + 
					"    openingStockSlave.expiry_date,\r\n" + 
					"    openingStockSlave.item_trade_discount\r\n" + 
					"FROM\r\n" + 
					"    inv_opening_stock_item_slave openingStockSlave\r\n" + 
					"        LEFT JOIN\r\n" + 
					"    inv_batch_stock_new batchStock ON batchStock.batch_master_id = openingStockSlave.batch_id\r\n" + 
					"        LEFT JOIN\r\n" + 
					"    inv_item_master_new itemMaster ON itemMaster.id = openingStockSlave.item_master_id\r\n" + 
					"        LEFT JOIN\r\n" + 
					"    inv_opening_stock_new openingStockMaster ON openingStockMaster.id = openingStockSlave.opening_stock_master_id\r\n" + 
					"WHERE\r\n" + 
					"    openingStockSlave.deleted = 'N'\r\n" + 
					"        AND openingStockMaster.deleted = 'N'\r\n" + 
					"        AND openingStockMaster.unit_id ="+unitId+" \r\n" + 
					"        AND itemMaster.unit_id ="+unitId+" \r\n" + 
					"        AND openingStockSlave.unit_id ="+unitId+" \r\n" + 
					"        AND batchStock.os_stock_status = 1\r\n" + 
					"GROUP BY openingStockSlave.id\r\n" + 
					"ORDER BY openingStockSlave.id DESC";
			
			System.err.println("sql..........."+sql);
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		
				for (Map<String, Object> row : masterRow) {
					
					InvReportDto pm = new InvReportDto();
					pm.setId((Integer) row.get("id"));
					pm.setOpeningStockId((Integer) row.get("stock_id"));
					pm.setItemId((Integer) row.get("item_master_id"));
					pm.setItemName((String) row.get("item_name"));
					pm.setNaaration((String) row.get("stock_narration"));
					pm.setStockSeries((String) row.get("stock_series"));
					pm.setManuFactureDate((String) row.get("manufac_date"));
					//pm.setBatchNo((String) row.get("item_batch_code"));
					pm.setBatchNo((String) row.get("batch_no"));
					//pm.setExpirayDate((Date) row.get("item_batch_exp_date"));
					pm.setExpirayDate((Date) row.get("expiry_date"));
					pm.setOpeningDate((Date) row.get("opening_date"));
					pm.setTotalQty1((BigInteger) row.get("available_quantity"));
					
					pm.setAddedQuantity((Integer) row.get("added_quantity"));
					
					//Integer openingStockPreviousAvailableQty = pm.getTotalQty() - pm.getAddedQuantity();
					//pm.setAvailableStockQty(openingStockPreviousAvailableQty);
					pm.setUnitPrice((Double) row.get("item_unit_price"));
					pm.setDiscountInpercentage((Double) row.get("discount_in_percentage"));
					pm.setDiscountInRs((Double) row.get("item_trade_discount_rupees"));
					pm.setDiscountAmt((Double) row.get("item_trade_discount_amount"));
					pm.setBaseAmt((Double) row.get("item_trade_base_amount"));
					pm.setGst((Double) row.get("gst"));
					pm.setIgst((Double) row.get("igst"));
					pm.setTotalTaxAmt((Double) row.get("total_tax_amount"));
					pm.setTotalAmt((Double) row.get("total_amount_slave"));
					pm.setUserName((String) row.get("user_name_slave"));
					pm.setUserId((Integer) row.get("created_by_slave"));
					pm.setInsertedDateAndTime((Date) row.get("opening_date"));
					pm.setLatestUOMFactor((String) row.get("uom_unit_latest_factor"));
					lstInvReportDto.add(pm);
					pm=null;
				}
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getAllItemOpeningStockReport....",e);

			//e.printStackTrace();
			return null;
		}
		
		return lstInvReportDto;
	}



	@Override
	public List<InvReportDto> getItemDetailsByCategoryWise(	Integer categoryType, Integer categoryId,HttpServletRequest request) {
		List<InvReportDto> lstbatch = new ArrayList<InvReportDto>();

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		System.out.println("getItemDetailsByCategoryWise"+unitId);
		try{
			String sql="";
			if(categoryType==0){
		 sql = " SELECT  itemMaster.id, " +
				"itemMaster.item_name, " +
				"itemMaster.category_type, " +
				"batchStock.item_batch_code, " +
				"batchStock.item_batch_exp_date," +
				"batchStock.item_quantity " +
				"FROM inv_item_master_new itemMaster " +
				"INNER JOIN inv_batch_stock_new batchStock " +
				"ON batchStock.item_master_id=itemMaster.id " +
				"WHERE batchStock.deleted='N' AND itemMaster.deleted='N' AND batchStock.unit_id="+unitId+" AND itemMaster.unit_id="+unitId;
			}else{
				 sql = " SELECT  itemMaster.id, " +
							"itemMaster.item_name, " +
							"itemMaster.category_type, " +
							"batchStock.item_batch_code, " +
							"batchStock.item_batch_exp_date," +
							"batchStock.item_quantity " +
							"FROM inv_item_master_new itemMaster " +
							"INNER JOIN inv_batch_stock_new batchStock " +
							"ON batchStock.item_master_id=itemMaster.id " +
							"WHERE batchStock.deleted='N' AND itemMaster.deleted='N' AND batchStock.unit_id="+unitId+" AND itemMaster.unit_id="+unitId+" AND itemMaster.category_id="+categoryId+" ";
			}
			
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		
		for (Map<String, Object> row : masterRow) {
			
			InvReportDto pm = new InvReportDto();
			pm.setId((Integer) row.get("id"));
			pm.setItemName((String) row.get("item_name"));
			pm.setBatchNo((String) row.get("item_batch_code"));
			pm.setExpirayDate((Date) row.get("item_batch_exp_date"));
			pm.setCategoryName((String) row.get("category_type"));
			pm.setAvailableStockQty((Integer) row.get("item_quantity"));
			lstbatch.add(pm);
			pm=null;
		}
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getAllItemExpirayDateReport....",e);

			//e.printStackTrace();
			return null;
		}
		return lstbatch;
	}




	@Override
	public List<InvReportDto> getGoodReceiptNoteReports(
			HttpServletRequest request) {
		// TODO Auto-generated method stub

		List<InvReportDto> lstbatch = new ArrayList<InvReportDto>();

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			
			/*
			 * String sql = " SELECT" + " grnMaster.id," + " partyMaster.party_master_name,"
			 * + " grnMaster.grn_date," + " grnMaster.grn_series_val as grn_series," +
			 * " grnMaster.grn_purchase_inv_no," + " grnMaster.purchase_order," +
			 * " grnMaster.purchase_order_number," + " itemMaster.id as item_id," +
			 * " itemMaster.item_name," + " grnSlave.item_bach_no," +
			 * " grnSlave.item_expire_date," + " grnSlave.item_manufacture_date," +
			 * " grnSlave.current_item_qty AS added_qty," +
			 * " batchStock.item_quantity AS available_qty," +
			 * " grnSlave.item_received_qty AS total_qty," + " grnSlave.item_unit_name," +
			 * " grnSlave.item_unit_price," + " grnSlave.item_discount_per," +
			 * " grnSlave.item_discount_rs," + " grnSlave.item_discount_amt," +
			 * " grnSlave.item_base_amt," + " grnSlave.item_gst," + " grnSlave.item_igst," +
			 * " grnSlave.item_gst_amt," + " grnSlave.item_total_amt," + " user.User_Name,"
			 * + " user.User_ID AS user_id," + " grnMaster.created_date_time FROM" +
			 * " inv_good_receipt_note_item_slave grnSlave" + //item_batch_code
			 * item_batch_code
			 * " LEFT JOIN inv_batch_stock_new batchStock ON batchStock.batch_master_id = grnSlave.batch_id "
			 * +
			 * " LEFT JOIN inv_item_master_new itemMaster ON itemMaster.id = grnSlave.item_id"
			 * +
			 * " LEFT JOIN inv_good_receipt_note grnMaster ON grnMaster.id = grnSlave.grn_master_id"
			 * +
			 * " LEFT JOIN inv_party_master_new partyMaster ON partyMaster.id = grnMaster.party_master_id"
			 * +
			 * " LEFT JOIN inv_batch_stock_new batchStock1 ON batchStock1.item_master_id = itemMaster.id"
			 * + " LEFT JOIN users user ON user.User_ID = grnMaster.created_by " +
			 * " WHERE  itemMaster.deleted = 'N'" +
			 * " AND grnSlave.deleted = 'N' AND grnMaster.deleted = 'N' AND grnMaster.is_draft='NODRAFT' AND grnMaster.is_pending='N' AND batchStock.grn_stock_status = 1 AND grnMaster.unit_id ="
			 * +unitId+" AND itemMaster.unit_id ="
			 * +unitId+" AND grnSlave.unit_id = 1 GROUP BY grnSlave.id order by grnSlave.id DESC "
			 * ;
			 */
		String sql = "SELECT \r\n" + 
				"    grnMaster.id,\r\n" + 
				"    partyMaster.party_master_name,\r\n" + 
				"    grnMaster.grn_date,\r\n" + 
				"    grnMaster.grn_series_val AS grn_series,\r\n" + 
				"    grnMaster.grn_purchase_inv_no,\r\n" + 
				"    grnMaster.purchase_order,\r\n" + 
				"    grnMaster.purchase_order_number,\r\n" + 
				"    itemMaster.id AS item_id,\r\n" + 
				"    itemMaster.item_name,\r\n" + 
				"    grnSlave.item_bach_no,\r\n" + 
				"    grnSlave.item_expire_date,\r\n" + 
				"    grnSlave.item_manufacture_date,\r\n" + 
				"    grnSlave.current_item_qty AS added_qty,\r\n" + 
				"    (SELECT \r\n" + 
				"            batchStock.item_quantity\r\n" + 
				"        FROM\r\n" + 
				"            inv_batch_stock_new batchStock\r\n" + 
				"        WHERE\r\n" + 
				"            batchStock.batch_master_id = grnSlave.batch_id) AS available_qty,\r\n" + 
				"    grnSlave.item_received_qty AS total_qty,\r\n" + 
				"    grnSlave.item_unit_name,\r\n" + 
				"    grnSlave.item_unit_price,\r\n" + 
				"    grnSlave.item_discount_per,\r\n" + 
				"    grnSlave.item_discount_rs,\r\n" + 
				"    grnSlave.item_discount_amt,\r\n" + 
				"    grnSlave.item_base_amt,\r\n" + 
				"    grnSlave.item_gst,\r\n" + 
				"    grnSlave.item_igst,\r\n" + 
				"    grnSlave.item_gst_amt,\r\n" + 
				"    grnSlave.item_total_amt,\r\n" + 
				"    user.User_Name,\r\n" + 
				"    user.User_ID AS user_id,\r\n" + 
				"    grnMaster.created_date_time\r\n" + 
				"FROM\r\n" + 
				"    inv_good_receipt_note_item_slave grnSlave\r\n" + 
				"        LEFT JOIN\r\n" + 
				"    inv_batch_stock_new batchStock ON batchStock.batch_master_id = grnSlave.batch_id\r\n" + 
				"        LEFT JOIN\r\n" + 
				"    inv_item_master_new itemMaster ON itemMaster.id = grnSlave.item_id\r\n" + 
				"        LEFT JOIN\r\n" + 
				"    inv_good_receipt_note grnMaster ON grnMaster.id = grnSlave.grn_master_id\r\n" + 
				"        LEFT JOIN\r\n" + 
				"    inv_party_master_new partyMaster ON partyMaster.id = grnMaster.party_master_id\r\n" + 
				"        LEFT JOIN\r\n" + 
				"    inv_batch_stock_new batchStock1 ON batchStock1.item_master_id = itemMaster.id\r\n" + 
				"        LEFT JOIN\r\n" + 
				"    users user ON user.User_ID = grnMaster.created_by\r\n" + 
				"WHERE\r\n" + 
				"    itemMaster.deleted = 'N'\r\n" + 
				"        AND grnSlave.deleted = 'N'\r\n" + 
				"        AND grnMaster.deleted = 'N'\r\n" + 
				"        AND grnMaster.is_draft = 'NODRAFT'\r\n" + 
				"        AND grnMaster.is_pending = 'N'\r\n" + 
				"        AND batchStock.grn_stock_status = 1\r\n" + 
				"        AND grnMaster.unit_id = "+unitId+"\r\n" + 
				"        AND itemMaster.unit_id ="+unitId+"\r\n" + 
				"        AND grnSlave.unit_id = 1\r\n" + 
				"GROUP BY grnSlave.id\r\n" + 
				"ORDER BY grnSlave.id DESC;";
		System.out.println("sql getGoodReceiptNoteReports::"+sql);
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		
			for (Map<String, Object> row : masterRow) {
				
				InvReportDto pm = new InvReportDto();
				pm.setId((Integer) row.get("id"));
				pm.setPartyMasterName((String) row.get("party_master_name"));
				pm.setGrnDate((String) row.get("grn_date"));
				pm.setStockSeries((String) row.get("grn_series"));
				pm.setGrnPurchaseInvoiceNo((String) row.get("grn_purchase_inv_no"));
				pm.setItemId((Integer) row.get("item_id"));
				pm.setItemName((String) row.get("item_name"));
				pm.setBatchNo((String) row.get("item_bach_no"));
				pm.setExpirayDate((Date) row.get("item_expire_date"));
				pm.setManuFactureDate((String) row.get("item_manufacture_date"));
				//pm.setAvailableStockQty((Integer) row.get("available_qty"));
				pm.setAvailableStockQty1((BigInteger) row.get("available_qty"));
				pm.setAddedQuantity((Integer) row.get("added_qty"));
				pm.setTotalQty((Integer) row.get("total_qty"));
				pm.setLatestUOMFactor((String) row.get("item_unit_name"));
				pm.setUnitPrice1((Integer) row.get("item_unit_price"));
				pm.setDiscountInpercentage((Double) row.get("item_discount_per"));
				pm.setDiscountInRs((Double) row.get("item_discount_rs"));
				pm.setDiscountAmt((Double) row.get("item_discount_amt"));
				
				pm.setBaseAmt((Double) row.get("item_base_amt"));
				pm.setGst((Double) row.get("item_gst"));
				pm.setIgst((Double) row.get("item_igst"));
				pm.setTotalTaxAmt((Double) row.get("item_gst_amt"));
				pm.setTotalAmt((Double) row.get("item_total_amt"));
				pm.setUserName((String) row.get("User_Name"));
				pm.setPurchaseOrder((String) row.get("purchase_order"));
				pm.setPurchaseOrderNumber((String) row.get("purchase_order_number"));
				pm.setUserId((Integer) row.get("user_id"));
				pm.setInsertedDateAndTime((Date) row.get("created_date_time"));
				lstbatch.add(pm);
				pm=null;
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getGoodReceiptNoteReports....",e);
			return null;
		}
		return lstbatch;
	
	}

	@Override
	public List<InvReportDto> getMrnIssueReports(HttpServletRequest request) {
		List<InvReportDto> lstbatch = new ArrayList<InvReportDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			
			/*String sql = "SELECT " +
					" mrnMaster.id," +
					" mrnSlave.sub_inventory_name," +
					" itemMaster.id AS item_id," +
					" itemMaster.item_name," +
					" batchStock.item_batch_code," +
					" batchStock.item_batch_exp_date," +
					" batchStock.issue_quantity, " +
					" batchStock.item_quantity AS available_qty," +
					" batchStock.total_quantity," +
					" user.User_Name," +
					" user.User_ID AS user_id," +
					" mrnMaster.created_date_time " +
					" FROM inv_goods_issue_mrn_item_slave_new mrnSlave" +
					" LEFT JOIN inv_goods_issue_mrn_master_new mrnMaster ON mrnMaster.id = mrnSlave.goods_issue_id" +
					" LEFT JOIN inv_item_master_new itemMaster ON itemMaster.id = mrnSlave.item_master_id" +
					" LEFT JOIN inv_batch_stock_new batchStock ON batchStock.item_master_id = itemMaster.id" +
					" LEFT JOIN users user ON user.User_ID = mrnMaster.created_by " +
					" WHERE itemMaster.deleted = 'N' AND mrnSlave.deleted = 'N' AND mrnMaster.deleted = 'N' " +
					" AND mrnMaster.unit_id = "+unitId+"  AND itemMaster.unit_id = "+unitId+" group BY batchStock.id DESC";*/
			String sql = "SELECT " +
			" mrnMaster.id," +
			" mrnSlave.sub_inventory_name," +
			" mrnMaster.mrn_id," +
			" mrnSlave.item_master_id AS item_id," +
			" mrnSlave.item_name," +
			" mrnSlave.item_batch_code," +
			" mrnSlave.item_batch_exp_date," +
			" mrnSlave.item_issue_qty, " +
			" mrnSlave.current_inv_stock AS available_qty," +
			" batchStock.item_quantity," +
			" user.User_Name," +
			" user.User_ID AS user_id," +
			" mrnMaster.created_date_time, " +
			" unit.unit_name as unit_name, "+
			" mrnSlave.requested_item_quantity, "+
			" mrnSlave.item_canceled_qty, "+
			" mrnSlave.pending_request_item_quantity, "+
			" mrnSlave.goods_issue_sub_remark "+			
			" FROM inv_goods_issue_mrn_item_slave_new mrnSlave" +
			//" LEFT JOIN inv_batch_stock_new batchStock ON batchStock.item_master_id = mrnSlave.item_master_id"
			" LEFT JOIN inv_batch_stock_new batchStock ON batchStock.batch_master_id = mrnSlave.batch_master_id"+
			" LEFT JOIN inv_goods_issue_mrn_master_new mrnMaster ON mrnMaster.id = mrnSlave.goods_issue_id" +
			" LEFT JOIN users user ON user.User_ID = mrnMaster.created_by " +
			" LEFT JOIN ehat_unit_doc unit ON unit.uni_id = mrnSlave.item_uom "+
			" WHERE mrnSlave.deleted = 'N' AND mrnSlave.updated_by = 1 AND mrnMaster.deleted = 'N' " +
			" AND mrnMaster.unit_id = "+unitId+" group BY mrnSlave.id  order by mrnSlave.id DESC";	
		System.out.println("sql:::"+sql);
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		
			for (Map<String, Object> row : masterRow) {
				
				InvReportDto pm = new InvReportDto();
				pm.setId((Integer) row.get("id"));
				pm.setGeneratedMrnId((Integer) row.get("mrn_id"));
				pm.setSubInventoryName((String) row.get("sub_inventory_name"));
				pm.setItemId((Integer) row.get("item_id"));
				pm.setItemName((String) row.get("item_name"));
				pm.setBatchNo((String) row.get("item_batch_code"));
				pm.setBatchExpiryDate((String) row.get("item_batch_exp_date"));
				pm.setAddedQuantity((Integer) row.get("item_issue_qty"));
				pm.setAvailableStockQty((Integer) row.get("available_qty"));
				pm.setMainInventoryStock((Integer) row.get("item_quantity"));
				pm.setLatestUOMFactor((String) row.get("unit_name"));
				pm.setUserName((String) row.get("User_Name"));
				pm.setUserId((Integer) row.get("user_id"));
				pm.setInsertedDateAndTime((Date) row.get("created_date_time"));
				pm.setCanceledQty((Integer) row.get("item_canceled_qty"));
				pm.setRequestedQty((Integer) row.get("requested_item_quantity"));
				pm.setPendingQty((Integer) row.get("pending_request_item_quantity"));
				pm.setSubRemarks((String) row.get("goods_issue_sub_remark"));
				
				//Integer itemIssueQty = pm.getAddedQuantity();
				
				//Integer invAvailableQty = pm.getAvailableStockQty() + pm.getAddedQuantity();
				
				//pm.setAvailableStockQty(invAvailableQty);
				
				//Integer totalQty = invAvailableQty - itemIssueQty;
				//pm.setTotalQty(totalQty);
				lstbatch.add(pm);
				pm=null;
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getMrnIssueReports....",e);
			return null;
		}
		return lstbatch;
	
	}
	
	@Override
	public List<InvReportDto> getStockReturnReports(HttpServletRequest request) {
		List<InvReportDto> lstbatch = new ArrayList<InvReportDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try{
			
			String sql = "SELECT  returnMaster.id, returnSlave.sub_inv_id,subMaster.subinventory_name as subinv_name, itemMaster.id AS item_id,itemMaster.item_name, " +
					"returnSlave.item_batch_code, returnSlave.item_batch_exp_date,returnSlave.return_quantity as return_quantity,returnSlave.main_inventory_stock as available_quantity,  " +
					"batchStock.item_quantity as main_inventory_stock,returnSlave.stock_return_reason," +
					"returnSlave.narration,user.User_Name, user.User_ID AS user_id,returnMaster.created_date_time,returnSlave.item_uom_unit as item_uom_unit  " +
					"FROM inv_stock_return_item_slave returnSlave " +
					//"LEFT JOIN inv_batch_stock_new batchStock ON batchStock.item_master_id = returnSlave.item_master_id"+
					"LEFT JOIN inv_batch_stock_new batchStock ON batchStock.item_batch_code = returnSlave.item_batch_code"+
					" LEFT JOIN inv_stock_return_new returnMaster ON returnMaster.id = returnSlave.stock_return_id " +
					" LEFT JOIN inv_item_master_new itemMaster ON itemMaster.id = returnSlave.item_master_id " +
					" LEFT JOIN users user ON user.User_ID = returnMaster.created_by  " +
					" LEFT JOIN inv_subinventory_master_new subMaster ON subMaster.id = returnSlave.sub_inv_id"+
					" WHERE itemMaster.deleted = 'N' AND returnSlave.deleted = 'N' AND returnMaster.status = 'Return' AND returnMaster.deleted = 'N'  " +
					" AND returnMaster.unit_id = "+unitId+" AND itemMaster.unit_id = "+unitId+" GROUP BY returnSlave.id order by returnSlave.id DESC";
		System.out.println("sql:::"+sql);
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		
			for (Map<String, Object> row : masterRow) {
				
				InvReportDto pm = new InvReportDto();
				pm.setId((Integer) row.get("id"));
				pm.setSubInventoryName((String) row.get("subinv_name"));
				pm.setItemId((Integer) row.get("item_id"));
				pm.setItemName((String) row.get("item_name"));
				pm.setBatchNo((String) row.get("item_batch_code"));
				pm.setBatchExpiryDate((String) row.get("item_batch_exp_date"));
				pm.setStockReturnQty((Integer) row.get("return_quantity"));
				pm.setMainInventoryStock((Integer) row.get("main_inventory_stock"));
				pm.setStockReturnReason((String)row.get("stock_return_reason"));
				pm.setNarration((String)row.get("narration"));
				pm.setUserName((String) row.get("User_Name"));
				pm.setUserId((Integer) row.get("user_id"));
				pm.setInsertedDateAndTime((Date) row.get("created_date_time"));
				pm.setLatestUOMFactor((String) row.get("item_uom_unit"));
				/*Integer returnQuantity = pm.getStockReturnQty();
				Integer mainInventoryStock = pm.getMainInventoryStock();
				
				Integer totalQty = mainInventoryStock + returnQuantity;
				Integer availableQty = mainInventoryStock - returnQuantity;*/
				pm.setAvailableStockQty((Integer) row.get("available_quantity"));
				//pm.setTotalQty(totalQty);
				lstbatch.add(pm);
				pm=null;
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getStockReturnReports....",e);
			return null;
		}
		return lstbatch;
	
	}


	@Override
	public List<BatchStockDto> getInventoryStockReport(
			HttpServletRequest request) {
		List<BatchStockDto> list = new ArrayList<>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql = "SELECT a.item_name,a.item_master_id,a.issue_quantity, a.item_quantity,a.item_batch_code,a.item_batch_exp_date,b.reorder_stock,a.item_uom_name FROM inv_batch_stock_new a inner join  inv_item_master_new  b ON a.item_master_id = b.id where b.deleted='N' and a.deleted='N' and a.unit_id="+unitId+" and b.unit_id="+unitId;
			//String sql = "SELECT a.item_name,a.item_master_id,a.issue_quantity, um(a.item_quantity) as item_quantity,a.item_batch_code,a.item_batch_exp_date,b.reorder_stock FROM inv_batch_stock_new a inner join  inv_item_master_new  b ON a.item_master_id = b.id where b.deleted='N' and a.deleted='N' and a.unit_id="+unitId+" and b.unit_id="+unitId+" GROUP BY item_batch_code,item_master_id DESC" ;
			System.out.println("sql:::"+sql);
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listStockDetails = query.list();
			for (Map<String, Object> row : listStockDetails) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				//obj.setReorderStock((Integer) row.get("reorder_stock"));
				obj.setIssueQuantity((Integer)row.get("issue_quantity"));
				//obj.setTotalCurrentInvStock((BigDecimal)row.get("item_quantity"));
				obj.setItemQuantity((Integer)row.get("item_quantity"));
				obj.setItemBatchExpDate((Date)row.get("item_batch_exp_date"));
				obj.setItemUOMName((String) row.get("item_uom_name"));
				list.add(obj);
			}
			log.debug("this is getInventoryStockReport...."+list);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error for getInventoryStockReport...." + e.getMessage());
			e.printStackTrace();
			return null;
		}
		
		return list;
	}

	@Override
	public BatchStockDto getInventoryStockAutoSuggestion(String itemName,
			String callFrom, HttpServletRequest request) {
		
		BatchStockDto batchStockDto = new BatchStockDto();
		List<BatchStockDto> backStockDtoList = new ArrayList<BatchStockDto>();
		try {

			String sql = "";

			if (callFrom.equals("stockAudit")) {
				sql = getInventoryStockAutoSuggestion(itemName,request);
			}
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> itemRow = query.list();

			for (Map<String, Object> row : itemRow) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
	            backStockDtoList.add(obj);
			}

			batchStockDto.setLstBatchStockDto(backStockDtoList);
			log.debug("this is getInventoryStockAutoSuggestion...."+batchStockDto);
		} catch (Exception e) {
			log.error("error for getInventoryStockAutoSuggestion...." + e.getMessage());
			e.printStackTrace();
			return null;
		}
		return batchStockDto;
	}
	
	String getInventoryStockAutoSuggestion(String itemName,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		// TODO Auto-generated method stub
		String sql = "";
		sql = "SELECT a.item_name,a.item_master_id FROM inv_batch_stock_new a where a.item_name like '"
				+ itemName + "%' and a.unit_id="+unitId+" and a.deleted='N' GROUP BY a.item_master_id limit 20 ";
		return sql;
	}

	@Override
	public List<BatchStockDto> searchItemById(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<BatchStockDto> batchlist = new ArrayList<>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql ="select * from inv_batch_stock_new where item_master_id="+id+" and deleted='N' and unit_id="+unitId;
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>>list = query.list();
			for (Map<String, Object> row : list) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				obj.setReorderStock((Integer) row.get("reorder_stock"));
				obj.setItemQuantity((Integer)row.get("item_quantity"));
				obj.setItemBatchExpDate((Date)row.get("item_batch_exp_date"));
				obj.setItemUOMName((String) row.get("item_uom_name"));
				batchlist.add(obj);
			}
			log.debug("this is searchItemById...."+batchlist);
		} catch (Exception e) {
			// TODO: handle exception
			log.error("error for searchItemById...." + e.getMessage());
			e.printStackTrace();
			
			return null;
		}
		
		return batchlist;
	}

	@Override
	public SubInventoryMasterDto subInventorySearchResult(
			String subInventoryName, String callFrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		SubInventoryMasterDto subInventoryMasterDto = new SubInventoryMasterDto();
		List<SubInventoryMasterDto> subInventoryMasterDtoDtoList = new ArrayList<SubInventoryMasterDto>();
		try {

			String sql = "";

			if (callFrom.equals("subInvName")) {
				sql = subInvAutoSuggestion(subInventoryName,request);
			}
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> itemRow = query.list();

			for (Map<String, Object> row : itemRow) {
				SubInventoryMasterDto obj = new SubInventoryMasterDto();
				obj.setSubInventoryName((String) row.get("subinventory_name"));
				obj.setId((Integer) row.get("id"));
				subInventoryMasterDtoDtoList.add(obj);
			}
			subInventoryMasterDto
					.setLstSubInventoryMaster(subInventoryMasterDtoDtoList);
			log.debug("this is subinventorySearchResult...."+subInventoryMasterDto);
		} catch (Exception e) {
			log.error("error for subinventorySearchResult...." + e.getMessage());
			e.printStackTrace();
			return null;
		}
		return subInventoryMasterDto;
	}
	
	String subInvAutoSuggestion(String subInvName,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		// TODO Auto-generated method stub
		String sql = "";
		sql = "SELECT a.id, a.subinventory_name FROM inv_subinventory_master_new a where  a.subinventory_name like '"
				+ subInvName + "%' and a.deleted='N' and a.unit_id="+unitId+" limit 20 ";
		return sql;
	}

	@Override
	public List<BatchStockDto> getSubInDataById(int id,
			HttpServletRequest request) {
		List<BatchStockDto> list = new ArrayList<>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql = "SELECT a.item_name,a.item_master_id,a.issue_quantity,a.item_batch_code,a.item_batch_exp_date,a.current_sub_inventory_stock FROM inv_batch_stock_new a where a.current_sub_inventory_stock !='0' AND a.sub_inv_id="+ id+" AND a.deleted='N' and a.unit_id="+unitId;
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listStockDetails = query.list();
			for (Map<String, Object> row : listStockDetails) {
				BatchStockDto obj = new BatchStockDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				obj.setIssueQuantity((Integer)row.get("issue_quantity"));
				obj.setItemBatchExpDate((Date)row.get("item_batch_exp_date"));
				obj.setCurrentSubInventoryStock((Integer)row.get("current_sub_inventory_stock"));
				list.add(obj);
			}
			log.debug("this is getSubInDataById...."+list);
		} catch (Exception e) {
			log.error("error for getSubInDataById...." + e.getMessage());
			e.printStackTrace();
			return null;
			// TODO: handle exception
		}
		return list;
	}

	@Override
	public List<GoodsIssueMrnItemSlaveDto> getAllSubInvStock(HttpServletRequest request) {
		List<GoodsIssueMrnItemSlaveDto> list = new ArrayList<>();
		try {
			// previous GROUP BY sub_inventory_id,item_batch_code
			// added GROUP by sub_inventory_id
			String sql = "select sum(current_subinventory_stock) as current_sub_inventory_qty,item_batch_code,item_batch_exp_date,item_master_id,item_name,sub_inventory_name from inv_goods_issue_mrn_item_slave_new where (mrn_status='FullyReceived' OR mrn_status='PartiallyReceivedQty' OR mrn_status='Dispatched') AND deleted !='Y' AND updated_by=1 GROUP BY item_batch_code,item_master_id,sub_inventory_id";
			System.out.println("sql getSubInDataById::"+sql);
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listStockDetails = query.list();
			for (Map<String, Object> row : listStockDetails) {
				GoodsIssueMrnItemSlaveDto obj = new GoodsIssueMrnItemSlaveDto();
				obj.setItemMasterId((Integer)row.get("item_master_id"));
	            obj.setItemName((String)row.get("item_name"));
			    obj.setItemBatchCode((String)row.get("item_batch_code"));
				obj.setItemBatchExpDate((String)row.get("item_batch_exp_date"));
				obj.setSubinventoryName((String)row.get("sub_inventory_name"));
				obj.setCurrentSubInventoryStockUpdated((BigDecimal)row.get("current_sub_inventory_qty"));
				list.add(obj);
			}
			log.debug("this is getAllSubInvStock...."+list);
		} catch (Exception e) {
			log.error("error for getAllSubInvStock...." + e.getMessage());
			e.printStackTrace();
			return null;
			// TODO: handle exception
		}
		return list;
	}
}
