package com.hms.inventory.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.StockTransferDao;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.StockTransferItemInfoDTO;
import com.hms.inventory.dto.StockTransferMasterDTO;
import com.hms.inventory.service.StockTransferService;
import com.hms.patient.util.ConfigUIJSONUtility;
@Service
public class StockTransferServiceImpl implements StockTransferService {
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	StockTransferDao stocktransdao;

	@Override
	@Transactional
	public int savestockTransperMaster(StockTransferMasterDTO sobj,	String itemInfoDtoDetails, HttpServletRequest request) {
		int reponse=0;
		try {			
			HttpSession session = request.getSession(); 
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");				
			sobj.setCreatedBy(userId); 
			sobj.setUnitId(unitId);
			sobj.setCreatedDate(new Date(new java.util.Date().getTime()));
			// this is for set Item info				
			StockTransferItemInfoDTO itemobj = (StockTransferItemInfoDTO) ConfigUIJSONUtility.getObjectFromJSON(itemInfoDtoDetails, StockTransferItemInfoDTO.class);	
			List<StockTransferItemInfoDTO> lststocktransoeriteminfo = itemobj.getLststocktrasiteminfo();
			
			HashMap<Integer,Integer> distinctsubInvId = new HashMap<Integer,Integer>(); 
			int count = 0;
			for(StockTransferItemInfoDTO obj:lststocktransoeriteminfo){
				
				distinctsubInvId.put(obj.getStockSubinventoryId(),count);
				count++;
			}
			
			for(int supId : distinctsubInvId.keySet()){
				
				StockTransferMasterDTO stokobj = new StockTransferMasterDTO();
				// Set Master Details
				stokobj.setStockId(0);
				
				stokobj.setCreatedBy(userId); 
				stokobj.setUnitId(unitId);
				stokobj.setCreatedDate(new Date(new java.util.Date().getTime()));
				stokobj.setStockDate(sobj.getStockDate());
				stokobj.setStockRemark(sobj.getStockRemark());
				stokobj.setMrnId(sobj.getMrnId());
				stokobj.setStockSubinventoryId(sobj.getStockSubinventoryId());
				stokobj.setStockSubinventoryName(sobj.getStockSubinventoryName());
				
				List<StockTransferItemInfoDTO> lststockSlave = new ArrayList<StockTransferItemInfoDTO>();
				for(StockTransferItemInfoDTO obj:lststocktransoeriteminfo){
					
					BatchStockDto bobj=	(BatchStockDto)sessionFactory.getCurrentSession().get(BatchStockDto.class, obj.getItemBatchId());
					
					if(supId == obj.getStockSubinventoryId()){
						Integer itemTransperQty=obj.getItemTransperQty();
					Integer itemtransreqqty=	obj.getItemTransperreqQty();					 
					Integer remaingqty=itemtransreqqty-itemTransperQty;
					
					
					Query queryParty = sessionFactory.getCurrentSession().createSQLQuery("update inv_mrn_item_info_slave_new  set item_sto_qty="+remaingqty+" where item_info_id="+obj.getMrnitemSalveId());
					queryParty.executeUpdate();
					
					System.err.println("subinvid..."+obj.getSendSubinventoryId());
					System.err.println("subinvname..."+obj.getSendSubinventoryName());
						// Set Slave Details
						StockTransferItemInfoDTO objSlave = new StockTransferItemInfoDTO();
						objSlave.setCreatedBy(userId);
						objSlave.setUnitId(unitId);
						objSlave.setCreatedDate(new Date(new java.util.Date().getTime()));
						objSlave.setItemName(obj.getItemName());
						objSlave.setBatchName(bobj.getItemBatchCode());
						objSlave.setItemBatchId(obj.getItemBatchId());
						objSlave.setItemExpirayDate(obj.getItemExpirayDate());
						objSlave.setItemAvailableQty(obj.getItemAvailableQty());
						objSlave.setItemTransperQty(obj.getItemTransperQty());
						objSlave.setItemTransperreqQty(obj.getItemTransperreqQty());
						objSlave.setStockSubinventoryId(obj.getStockSubinventoryId());
						objSlave.setStockSubinventoryName(obj.getStockSubinventoryName());
						objSlave.setItemIssueQty(obj.getItemIssueQty());
						objSlave.setItemRemainQty(obj.getItemRemainQty());
						objSlave.setItemReceiveQty(obj.getItemReceiveQty());
						objSlave.setItemMasterId(obj.getItemMasterId());
						objSlave.setSendSubinventoryId(obj.getSendSubinventoryId());
						objSlave.setSendSubinventoryName(obj.getSendSubinventoryName());
						objSlave.setItemreceiveQtyForView(obj.getItemreceiveQtyForView());
						objSlave.setItemPendingQtyForView(obj.getItemPendingQtyForView());
						lststockSlave.add(objSlave);
						objSlave = null;
					}
				}	
				stokobj.setLststocktrasiteminfo(lststockSlave);
				reponse=stocktransdao.savestockTransperMaster(stokobj);
				stokobj=null;
				lststockSlave=null;
			}	
			
			MrnMasterDTO mobj=	(MrnMasterDTO)sessionFactory.getCurrentSession().get(MrnMasterDTO.class, sobj.getMrnId());
			mobj.setVisisbilityStoStatus("Y");
			stocktransdao.savePurchaseRequestMaster(mobj);

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return reponse;
	}

	@Override
	@Transactional
	public StockTransferMasterDTO editstockTransperMaster(Integer stockId,Integer unitId) {
		return stocktransdao.editstockTransperMaster(stockId, unitId);
	}

	@Override
	@Transactional
	public MrnMasterDTO reviewPurchaseRequestMasterForSTO(Integer mrnId,Integer unitId) {
		return stocktransdao.reviewPurchaseRequestMasterForSTO(mrnId, unitId);
	}

	@Override
	@Transactional
	public List<StockTransferMasterDTO> getAllStockId(Integer subInvId) {
		
		return stocktransdao.getAllStockId(subInvId);
	}

	@Override
	@Transactional
	public MrnMasterDTO reviewPurchaseRequestMasterForPO(Integer mrnId,	Integer unitId) {
		return stocktransdao.reviewPurchaseRequestMasterForPO(mrnId, unitId);
	}

	@Override
	@Transactional
	public BatchStockDto getBatchIdInfoForSto(Integer batchId) {
		BatchStockDto bobj=	(BatchStockDto)sessionFactory.getCurrentSession().get(BatchStockDto.class, batchId);
		return bobj;
	}

	@Override
	@Transactional
	public int acceptStockTransperItemMaster(Integer itemInfoId,Integer receiveQty, Integer subInvId,Integer stockId, HttpServletRequest request) {
		
		BatchStockDto bobj=new BatchStockDto();

		
		StockTransferItemInfoDTO sobj=	(StockTransferItemInfoDTO)sessionFactory.getCurrentSession().get(StockTransferItemInfoDTO.class, itemInfoId);
		Integer remainQty=sobj.getItemRemainQty();
		Integer result=remainQty-receiveQty;
		
		Integer receivedQty=sobj.getItemreceiveQtyForView()+receiveQty;
		sobj.setItemRemainQty(result);
		sobj.setItemPendingQtyForView(result);
		
		HttpSession session = request.getSession(); 
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");				
		sobj.setStockReceiveDateTime(new Date(new java.util.Date().getTime())); 
		sobj.setUnitId(unitId);
		sobj.setStockReceivedBy(userId);
		sobj.setCreatedDate(new Date(new java.util.Date().getTime()));
		sobj.setItemInfoId(itemInfoId);
		sobj.setItemreceiveQtyForView(receivedQty);
		
		//set stock receive info to batch stock info
		bobj.setSubInventoryId(subInvId);
		//bobj.setItemBatchExpDate(sobj.getItemExpirayDate());
		bobj.setItemMasterId(sobj.getItemMasterId());
		bobj.setItemName(sobj.getItemName());
		bobj.setId(0);
		bobj.setItemBatchCode(sobj.getBatchName());
		bobj.setStockReceivedBy(userId);
		bobj.setUnitId(unitId);	
		bobj.setStockReceiveDateTime(new Date(new java.util.Date().getTime()));
		
		//aaded by dayanand for change status after accepting item slave and for vie purpose
		StockTransferMasterDTO tsobj=	(StockTransferMasterDTO)sessionFactory.getCurrentSession().get(StockTransferMasterDTO.class, stockId);
		tsobj.setItemAcceptStatus("Y");
		stocktransdao.savestockTransperMaster(tsobj);
		
		return stocktransdao.savestockTransperItemSlave(sobj);
	}

	@Override
	@Transactional
	public List<StockTransferMasterDTO> getAllStockMasterForView(Integer unitId) {
		
		return stocktransdao.getAllStockMasterForView(unitId);
	}

	@Override
	@Transactional
	public StockTransferMasterDTO viewstockTransperMaster(Integer stockId,Integer unitId) {
		return stocktransdao.viewstockTransperMaster(stockId, unitId);
	}

}
