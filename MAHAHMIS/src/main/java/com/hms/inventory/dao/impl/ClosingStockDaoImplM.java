package com.hms.inventory.dao.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.ClosingStockDaoM;
import com.hms.inventory.dto.ClosingStockDto;

@Repository
public class ClosingStockDaoImplM  implements ClosingStockDaoM{
	static Logger log=Logger.getLogger(ClosingStockDaoImplM.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	// date and time combination
	static java.util.Calendar currentDate1 = java.util.Calendar.getInstance();
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	static String todays_date = formatter.format(currentDate1.getTime());
	
	@Override
	public int itemQuantityFromBatchStock(String itemName,HttpServletRequest request) {
		System.out.println("itemName::"+itemName);
		
		HttpSession session = request.getSession(); 
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");	
		
		Integer id = 0;
		String sql = null;
		sql = "SELECT sum(item_quantity) as item_quantity FROM inv_batch_stock_new where  item_name like '"+itemName+"' AND deleted = 'N' AND unit_id="+unitId;
		System.err.println(sql);
		try {
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, BigDecimal>> masterRow = getMaster.list();		          
			for(Map<String, BigDecimal> row : masterRow){
			id = ((BigDecimal) row.get("item_quantity")).intValue();
			}
			log.debug("reponse itemQuantityFromBatchStock....."+id);
			return id;
		} catch (Exception e) {
			log.error("error for saving itemQuantityFromBatchStock...."+e.getMessage());
			e.printStackTrace();
		}
		return id;
		
	}

	@Override
	public int saveClosingStock(ClosingStockDto closingStockDto,HttpServletRequest request) {
		try {
			if(closingStockDto.getId()==0){
				ClosingStockDto dto  = (ClosingStockDto) sessionFactory.getCurrentSession().merge(closingStockDto);
				log.debug("reponse saveClosingStock....."+dto);
				return 1;
			}else{
				ClosingStockDto dto  = (ClosingStockDto) sessionFactory.getCurrentSession().merge(closingStockDto);
				log.debug("reponse saveClosingStock....."+dto);
				return 2;				
			}
		} catch (Exception e) {
			log.error("error for saving saveClosingStock....",e);
			//e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<ClosingStockDto> getAllClosingStockRecordsDetails(	HttpServletRequest request, Integer unitId) {
		List<ClosingStockDto> closingStockItemSlaveDtos=new ArrayList<ClosingStockDto>();
		String sql = "";
		
		HttpSession session = request.getSession(); 
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId1 = (Integer) session.getAttribute("uId");	
		
		try{
			sql = "select cs.id,cs.created_date_time,csi.user_name,csi.item_name,csi.item_batch_code,csi.closing_stock_date,csi.item_deduct_stock,csi.item_narration from inv_closing_stock_new as cs,inv_closing_stock_item_slave as csi where cs.id = csi.close_stock_id and cs.deleted !='Y' and cs.unit_id="+unitId1+" and csi.unit_id="+unitId1+"  order by cs.id desc";
			if(sql != null) {
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 		 query.setMaxResults(10);
		 		List<Map<String, Object>> list=query.list();
		 		for(Map<String, Object> row : list){
		 			ClosingStockDto obj=new ClosingStockDto();
		 			obj.setId((Integer)row.get("id"));
					obj.setCreatedDateTime((Date)row.get("created_date_time"));
					obj.setUserName((String)row.get("user_name"));
					obj.setItemName((String)row.get("item_name"));
					obj.setBatchNumber((String)row.get("item_batch_code"));
					obj.setBatchExpDate((Date)row.get("closing_stock_date"));
					obj.setItemDeductQuantity((Integer)row.get("item_deduct_stock"));
					obj.setNarration((String)row.get("item_narration"));
					closingStockItemSlaveDtos.add(obj);
				}
		 		
			}
			log.debug("reponse getAllClosingStockRecordsDetails....."+closingStockItemSlaveDtos);
		}catch(Exception e){
			log.error("error for saving getAllClosingStockRecordsDetails...."+e.getMessage());
			e.printStackTrace();
		}
		return closingStockItemSlaveDtos;
	}

	@Override
	public Integer getPageCountAllClosingStock(HttpServletRequest request) {
		Integer countNew = 0;
		
		HttpSession session = request.getSession(); 
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			String sql="";
			sql = "SELECT count(*) FROM inv_closing_stock_item_slave as cs WHERE deleted != 'Y' and unit_id="+unitId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			countNew = ((Number)countQuery.uniqueResult()).intValue();
			log.debug("reponse getPageCountAllClosingStock....."+countNew);
		} catch (Exception e) {
			log.error("error for saving getPageCountAllClosingStock...."+e.getMessage());
			e.printStackTrace();
		}
		return countNew;
	}

	@Override
	public ClosingStockDto getClosingStockPagination(Integer startIndex,HttpServletRequest request) {
		ClosingStockDto closingStockDto = new ClosingStockDto();
		List<ClosingStockDto> lstClosingStock=new ArrayList<ClosingStockDto>();
		String sql = "";
		HttpSession session = request.getSession(); 
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			sql = "select cs.id,cs.created_date_time,csi.user_name,csi.item_name,csi.item_batch_code,csi.closing_stock_date,csi.item_deduct_stock,csi.item_narration from inv_closing_stock_new as cs,inv_closing_stock_item_slave as csi where cs.id = csi.close_stock_id and cs.deleted !='Y' and cs.unit_id="+unitId+" and csi.unit_id="+unitId+" order by cs.id desc";
			if(sql != null) {
				 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		 		 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 		 query.setFirstResult(startIndex);
		 		 query.setMaxResults(10);
		 		List<Map<String, Object>> list=query.list();
		 		for(Map<String, Object> row : list){
		 			ClosingStockDto obj=new ClosingStockDto();
		 			obj.setId((Integer)row.get("id"));
					obj.setCreatedDateTime((Date)row.get("created_date_time"));
					obj.setUserName((String)row.get("user_name"));
					obj.setItemName((String)row.get("item_name"));
					obj.setBatchNumber((String)row.get("item_batch_code"));
					obj.setBatchExpDate((Date)row.get("closing_stock_date"));
					obj.setItemDeductQuantity((Integer)row.get("item_deduct_stock"));
					obj.setNarration((String)row.get("item_narration"));
					lstClosingStock.add(obj);
				}
		 		
			}
			
		} catch (Exception e) {
			log.error("error for saving getClosingStockPagination...."+e.getMessage());
			e.printStackTrace();
		}
		closingStockDto.setLstclosingstockmaster(lstClosingStock);
		log.debug("reponse getClosingStockPagination....."+closingStockDto);
		return closingStockDto;
	}

}
