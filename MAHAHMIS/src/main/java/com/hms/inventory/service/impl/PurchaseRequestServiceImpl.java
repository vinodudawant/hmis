package com.hms.inventory.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.PurchaseRequestDao;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;
import com.hms.inventory.dto.ProcessPurchaseOrderDTO;
import com.hms.inventory.dto.ProcessPurchaseOrderItemDTO;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.inventory.service.PurchaseRequestService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class PurchaseRequestServiceImpl implements PurchaseRequestService {
	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	 PurchaseRequestDao purchasedao;
	@Override
	@Transactional
	public int savePurchaseRequestMaster(MrnMasterDTO mrnobj,String itemInfoDtoDetails,HttpServletRequest request) {
		int reponse=0;
		try {			
		if (mrnobj.getMrnId() == 0) {
			
			HttpSession session = request.getSession(); 
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");				
			mrnobj.setMrnReviewBy(userId); 
			mrnobj.setMrnReviewStatus("Y");
			mrnobj.setMrnGeneratedStatus("Y");
			mrnobj.setMrnpurchaseRequestStatus("Y");
			mrnobj.setMrnApproveStatus("Y");
			mrnobj.setUnitId(unitId);
			mrnobj.setMrnReviewDateTime(new Date(new java.util.Date().getTime()));
			mrnobj.setCreatedDate(new Date(new java.util.Date().getTime()));
			
			// this is for set Item info				
			MrnMasterItemInfoDTO itemobj = (MrnMasterItemInfoDTO) ConfigUIJSONUtility
					.getObjectFromJSON(itemInfoDtoDetails, MrnMasterItemInfoDTO.class);	
			List<MrnMasterItemInfoDTO> lstpurchaseiteminfo = itemobj.getLstMrniteminfo();
			List<MrnMasterItemInfoDTO> newlstiteminfo=new ArrayList<MrnMasterItemInfoDTO>();
			for(MrnMasterItemInfoDTO mobj:lstpurchaseiteminfo){
				SubInventoryMasterDto subinvobj=	(SubInventoryMasterDto)sessionFactory.getCurrentSession().get(SubInventoryMasterDto.class, mobj.getSunInventoryId());
				mobj.setSubinventoryName(subinvobj.getSubInventoryName());
				newlstiteminfo.add(mobj);
			}
			mrnobj.setLstMrniteminfo(newlstiteminfo);
			
			reponse=purchasedao.savePurchaseRequestMaster(mrnobj);
			
			return reponse;
			
		} else {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			mrnobj.setMrnReviewBy(userId); 
			mrnobj.setMrnReviewStatus("Y");
			mrnobj.setMrnGeneratedStatus("Y");
			mrnobj.setMrnpurchaseRequestStatus("Y");
			mrnobj.setMrnApproveStatus("Y");
			mrnobj.setUnitId(unitId);
			mrnobj.setMrnReviewDateTime(new Date(new java.util.Date().getTime()));
			mrnobj.setCreatedDate(new Date(new java.util.Date().getTime()));
			
			MrnMasterItemInfoDTO itemobj = (MrnMasterItemInfoDTO) ConfigUIJSONUtility
					.getObjectFromJSON(itemInfoDtoDetails, MrnMasterItemInfoDTO.class);	
			List<MrnMasterItemInfoDTO> lstpurchaseiteminfo = itemobj.getLstMrniteminfo();
			List<MrnMasterItemInfoDTO> newlstiteminfo=new ArrayList<MrnMasterItemInfoDTO>();

			for(MrnMasterItemInfoDTO mobj:lstpurchaseiteminfo){
				
				SubInventoryMasterDto subinvobj=	(SubInventoryMasterDto)sessionFactory.getCurrentSession().get(SubInventoryMasterDto.class, mobj.getSunInventoryId());
				
				mobj.setSubinventoryName(subinvobj.getSubInventoryName());
				newlstiteminfo.add(mobj);
			}
			mrnobj.setLstMrniteminfo(newlstiteminfo);
			
			reponse=purchasedao.savePurchaseRequestMaster(mrnobj);
			
			
			
			return reponse;
		}

	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		return 0;
	}
	}

	@Override
	@Transactional
	public List<MrnMasterDTO> getAllPurchaseRequestMaster(HttpServletRequest request, Integer unitId, String call) {
		
		return purchasedao.getAllPurchaseRequestMaster(unitId, call);
	}

	@Override
	@Transactional
	public boolean rejectPurchaseRequestMaster(Integer mrnId,String mrnrejectremark, HttpServletRequest request) {
		MrnMasterDTO obj=	(MrnMasterDTO)sessionFactory.getCurrentSession().get(MrnMasterDTO.class, mrnId);
		obj.setMrnRejectionStatus("Y");
		obj.setMrnRejectionDateTime(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setMrnRejectionBy(userId);
		obj.setMrnrejectremark(mrnrejectremark);
		return purchasedao.rejectPurchaseRequestMaster(obj);
	}

	@Override
	@Transactional
	public MrnMasterDTO reviewPurchaseRequestMaster(Integer mrnId) {
		
		return purchasedao.reviewPurchaseRequestMaster(mrnId);
	}

	@Override
	@Transactional
	public int saveProcessPurchaseOrderMaster(ProcessPurchaseOrderDTO pobj,	String itemInfoDtoDetails, HttpServletRequest request) {
		int reponse=0;
		try {			
			HttpSession session = request.getSession(); 
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");				
			pobj.setCreatedBy(userId); 
			pobj.setUnitId(unitId);
			pobj.setCreatedDate(new Date(new java.util.Date().getTime()));
			// this is for set Item info				
			ProcessPurchaseOrderItemDTO itemobj = (ProcessPurchaseOrderItemDTO) ConfigUIJSONUtility.getObjectFromJSON(itemInfoDtoDetails, ProcessPurchaseOrderItemDTO.class);	
			List<ProcessPurchaseOrderItemDTO> lstpurchaseiteminfo = itemobj.getLstprocessiteminfo();
			
			HashMap<Integer,Integer> distinctPoId = new HashMap<Integer,Integer>(); 
			int count = 0;
			for(ProcessPurchaseOrderItemDTO obj:lstpurchaseiteminfo){
				
				distinctPoId.put(obj.getSupplierId(),count);
				count++;
			}
			
			for(int supId : distinctPoId.keySet()){
				
				ProcessPurchaseOrderDTO processPomasterObj = new ProcessPurchaseOrderDTO();
				// Set Master Details
				processPomasterObj.setProcessId(0);
				
				processPomasterObj.setCreatedBy(userId); 
				processPomasterObj.setUnitId(unitId);
				processPomasterObj.setCreatedDate(new Date(new java.util.Date().getTime()));
				processPomasterObj.setOrderdDate(pobj.getOrderdDate());
				processPomasterObj.setDeliveryDate(pobj.getDeliveryDate());
				processPomasterObj.setMrnSubinventoryId(pobj.getMrnSubinventoryId());
				processPomasterObj.setMrnSubinventoryName(pobj.getMrnSubinventoryName());
				
				List<ProcessPurchaseOrderItemDTO> lstProcessPoSlave = new ArrayList<ProcessPurchaseOrderItemDTO>();
				for(ProcessPurchaseOrderItemDTO obj:lstpurchaseiteminfo){
					
					if(supId == obj.getSupplierId()){
						
						// Set Slave Details
						ProcessPurchaseOrderItemDTO objSlave = new ProcessPurchaseOrderItemDTO();
						objSlave.setCreatedBy(unitId);						
						objSlave.setCreatedDate(new Date(new java.util.Date().getTime()));
						objSlave.setSupplierId(obj.getSupplierId());
						objSlave.setItemName(obj.getItemName());
						objSlave.setItemQty(obj.getItemQty());
						objSlave.setItempurchaserequestQty(obj.getItempurchaserequestQty());
						objSlave.setItemprocessedQty(obj.getItemprocessedQty());
						objSlave.setPurchaseType(obj.getPurchaseType());
						objSlave.setQuantity(obj.getQuantity());
						objSlave.setSupplierName(obj.getSupplierName());
						objSlave.setItemUnitPrice(obj.getItemUnitPrice());
						objSlave.setItemDiscountPerc(obj.getItemDiscountPerc());
						objSlave.setItemDiscountRs(obj.getItemDiscountRs());
						objSlave.setItemDiscountAmt(obj.getItemDiscountAmt());
						objSlave.setItemBaseAmt(obj.getItemBaseAmt());
						objSlave.setItemTaxCode(obj.getItemTaxCode());
						objSlave.setItemtaxPercen(obj.getItemtaxPercen());
						objSlave.setItemtaxAmt(obj.getItemtaxAmt());
						objSlave.setItemtotalAmt(obj.getItemtotalAmt());
						objSlave.setItemorderQty(obj.getItemorderQty());
						objSlave.setItempendingQty(obj.getItempendingQty());
						objSlave.setTemperature(obj.getTemperature());
						objSlave.setSupplierId(obj.getSupplierId());
						objSlave.setSupplierName(obj.getSupplierName());
						lstProcessPoSlave.add(objSlave);
						objSlave = null;
					}
				}	
				processPomasterObj.setLstprocessiteminfo(lstProcessPoSlave);
				reponse=purchasedao.saveProcessPurchaseOrderMaster(processPomasterObj);
				processPomasterObj=null;
				lstProcessPoSlave=null;
			}
			MrnMasterDTO mobj=	(MrnMasterDTO)sessionFactory.getCurrentSession().get(MrnMasterDTO.class, pobj.getMrnId());
			mobj.setVisisbilityPOsStatus("Y");
			purchasedao.savePurchaseRequestMaster(mobj);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return reponse;
	}
}
