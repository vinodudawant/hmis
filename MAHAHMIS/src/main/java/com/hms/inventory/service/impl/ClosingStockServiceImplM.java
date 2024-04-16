package com.hms.inventory.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.ClosingStockDaoM;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.ClosingStockDto;
import com.hms.inventory.dto.ClosingStockItemSlaveDto;
import com.hms.inventory.service.ClosingStockServiceM;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
@Transactional
public class ClosingStockServiceImplM implements ClosingStockServiceM {

	@Autowired
	private ClosingStockDaoM closingStockDaoM;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int itemQuantityFromBatchStock(String itemName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return closingStockDaoM.itemQuantityFromBatchStock(itemName,request);
	}

	@Transactional
	@Override
	public int saveClosingStock(ClosingStockDto closingStockDto,String itemInfoDtoDetails, HttpServletRequest request) {
		int reponse=0;
		System.err.println("master id..."+closingStockDto.getId());
		try {			
		if (closingStockDto.getId() == 0) {
			HttpSession session = request.getSession(); 
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");	
			closingStockDto.setUnitId(unitId);
			// this is for set Item info				
			ClosingStockItemSlaveDto closingStockItemSlaveDto = (ClosingStockItemSlaveDto) ConfigUIJSONUtility
					.getObjectFromJSON(itemInfoDtoDetails, ClosingStockItemSlaveDto.class);	
			List<ClosingStockItemSlaveDto> lstpurchaseiteminfo = closingStockItemSlaveDto.getLstclosingstockitemslave();
			closingStockDto.setLstclosingstockitemslave(lstpurchaseiteminfo);
			
			for(ClosingStockItemSlaveDto probj:lstpurchaseiteminfo){
				String	batchCode=probj.getItemBatchCode();
				Date batchExpDate=probj.getItemExpiryDate();						        
				Integer itemMasterId=probj.getItemdMasterId();
			

				Integer total=0;
					if(batchCode.equalsIgnoreCase("null") ||batchCode.equalsIgnoreCase(null) ||batchCode.equals("")){
						Criteria criteria=	 sessionFactory.getCurrentSession().createCriteria(BatchStockDto.class);
						
						criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
						BatchStockDto bobj = (BatchStockDto)criteria.uniqueResult();
						Integer cuurentBatchStock=bobj.getItemQuantity();
						total=cuurentBatchStock-probj.getItemdeductStock();
						bobj.setUnitId(unitId);
						bobj.setItemQuantity(total);
						sessionFactory.getCurrentSession().merge(bobj);
						}else{
							Criteria criteria=	 sessionFactory.getCurrentSession().createCriteria(BatchStockDto.class);
							criteria.add(Restrictions.eq("itemBatchCode", batchCode));
							criteria.add(Restrictions.eq("itemBatchExpDate", batchExpDate));
							criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
							BatchStockDto bobj = (BatchStockDto)criteria.uniqueResult();
							Integer cuurentBatchStock=bobj.getItemQuantity();
							total=cuurentBatchStock-probj.getItemdeductStock();
							bobj.setItemQuantity(total);
							bobj.setUnitId(unitId);
							sessionFactory.getCurrentSession().merge(bobj);
						}
							
				}
			
			reponse= closingStockDaoM.saveClosingStock(closingStockDto,request);
			return reponse;
			
		} else {
			
			HttpSession session = request.getSession(); 
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");				
			closingStockDto.setCreatedBy(userId); 
			closingStockDto.setUnitId(unitId);
			closingStockDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			closingStockDto.setUpdatedBy(userId);
			
			closingStockDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			// this is for set Item info				
			ClosingStockItemSlaveDto itemobj = (ClosingStockItemSlaveDto) ConfigUIJSONUtility
					.getObjectFromJSON(itemInfoDtoDetails, ClosingStockItemSlaveDto.class);	
			List<ClosingStockItemSlaveDto> lstpurchaseiteminfo = itemobj.getLstclosingstockitemslave();
			
			
			for(ClosingStockItemSlaveDto probj:lstpurchaseiteminfo){
				String	batchCode=probj.getItemBatchCode();
				Date batchExpDate=probj.getItemExpiryDate();		
				
				Integer itemMasterId=probj.getItemdMasterId();
			

				Integer total=0;
					if(batchCode.equalsIgnoreCase("null") ||batchCode.equalsIgnoreCase(null) ||batchCode.equals("")){
						Criteria criteria=	 sessionFactory.getCurrentSession().createCriteria(BatchStockDto.class);
						
						criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
						BatchStockDto bobj = (BatchStockDto)criteria.uniqueResult();
						Integer cuurentBatchStock=bobj.getItemQuantity();
						total=cuurentBatchStock-probj.getItemdeductStock();
						bobj.setItemQuantity(total);
						bobj.setUnitId(unitId);
						sessionFactory.getCurrentSession().merge(bobj);
						}else{
							Criteria criteria=	 sessionFactory.getCurrentSession().createCriteria(BatchStockDto.class);
							criteria.add(Restrictions.eq("itemBatchCode", batchCode));
							criteria.add(Restrictions.eq("itemBatchExpDate", batchExpDate));
							criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
							BatchStockDto bobj = (BatchStockDto)criteria.uniqueResult();
							
							Integer cuurentBatchStock=bobj.getItemQuantity();
							total=cuurentBatchStock-probj.getItemdeductStock();
							bobj.setItemQuantity(total);
							bobj.setUnitId(unitId);
							sessionFactory.getCurrentSession().merge(bobj);
							
						}
							
				}
			
			
			closingStockDto.setLstclosingstockitemslave(lstpurchaseiteminfo);
			
			reponse=closingStockDaoM.saveClosingStock(closingStockDto,request);
			
			return reponse;
		}

	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		return 0;
	}
		
	}

	/**
	 * 
	 * @param bobj
	 */
	void saveBtachStockMaster(BatchStockDto bobj, HttpServletRequest request){
		System.err.println("inside save batch stck...");
		System.err.println("bobj..."+bobj);
		try{
		sessionFactory.getCurrentSession().saveOrUpdate(bobj);
		//sessionFactory.getCurrentSession().setFlushMode(FlushMode.MANUAL);
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	/**
	 * 
	 */
	@Override
	public List<ClosingStockDto> getAllClosingStockRecordsDetails(	HttpServletRequest request, Integer unitId) {
		// TODO Auto-generated method stub
		return closingStockDaoM.getAllClosingStockRecordsDetails(request, unitId);
	}

	@Override
	public Integer getPageCountAllClosingStock(HttpServletRequest request) {
		return closingStockDaoM.getPageCountAllClosingStock(request);
	}

	@Override
	public ClosingStockDto getClosingStockPagination(Integer startIndex,HttpServletRequest request) {
		return closingStockDaoM.getClosingStockPagination(startIndex,request);
	}

}
