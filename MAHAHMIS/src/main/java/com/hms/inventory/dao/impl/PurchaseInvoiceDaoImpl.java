package com.hms.inventory.dao.impl;

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
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.constants.HMSConstants;
import com.hms.inventory.dao.PurchaseInvoiceDao;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.DocMasterDocNumFinancialYearDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseInvoiceDto;
import com.hms.inventory.dto.PurchaseInvoiceItemDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class PurchaseInvoiceDaoImpl implements PurchaseInvoiceDao {

	static Logger log=Logger.getLogger(PurchaseQuotationMasterDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	PurchaseInvoiceDto purchaseInvoiceDto;
	
	@Autowired
	BatchMasterDto batchMasterDto;

	@Autowired
	DocMasterDocNumFinancialYearDto docMasterDocNumFinancialYearDto;
	
	@Override
	public int savePurchaseInvoice(PurchaseInvoiceDto purchaseInvoiceDto,String lstPurchaseInvoiceItemDto,String batchStockDtoList,
			/*String batchMasterDtoList,*/ String purInvContactInfoDtoList,
			String purInvAddressInfoDtoList, Integer partyMasterId,
			HttpServletRequest request) {
		int status = 0;
		try {

			if (purchaseInvoiceDto.getId() == 0) {
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				purchaseInvoiceDto.setCreatedBy(userId);
				purchaseInvoiceDto.setUnitId(unitId);
				
				PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory
						.getCurrentSession().get(PartyMasterDto.class,
								partyMasterId);

				PurchaseInvoiceItemDto purchaseInvoiceItemDto = (PurchaseInvoiceItemDto) ConfigUIJSONUtility
						.getObjectFromJSON(lstPurchaseInvoiceItemDto,
								PurchaseInvoiceItemDto.class);
	
				List<PurchaseInvoiceItemDto> listPurchaseInvoiceItemDto = purchaseInvoiceItemDto.getLstPurchaseInvoiceItemDto();
						
				purchaseInvoiceDto.setLstPurchaseInvoiceItemDto(listPurchaseInvoiceItemDto);
				
				/*BatchStockDto batchStockDto = (BatchStockDto) ConfigUIJSONUtility
						.getObjectFromJSON(batchStockDtoList,
								BatchStockDto.class);
				List<BatchStockDto> batchStockDtos = batchStockDto.getLstBatchStockDto();
				batchStockDto.setLstBatchStockDto(batchStockDtos);*/

				/*List<PurchaseInvoiceItemDto> listPurchaseInvoiceItemDtoNew = new ArrayList<PurchaseInvoiceItemDto>();
				
				for(PurchaseInvoiceItemDto dto : listPurchaseInvoiceItemDto) {
					BatchMasterDto batchDto = new BatchMasterDto();
					batchDto.setItemBatchCode(dto.getItemBatchNo());
					batchDto.setItemBatchExpDate(dto.getItemExpireDate());
					batchDto.setItemMasterId(dto.getItemId());
					dto.setBatchMasterDto(batchDto);
					listPurchaseInvoiceItemDtoNew.add(dto);
				}
				
				purchaseInvoiceDto
						.setLstPurchaseInvoiceItemDto(listPurchaseInvoiceItemDtoNew);*/
				
				
				
				// this is for set contact info
				PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purInvContactInfoDtoList,
								PartyMasterContactInfoDto.class);
	
				List<PartyMasterContactInfoDto> listPartyMasterContactInfoDto = partyMasterContactInfoDto
						.getPartyMasterContactInfoDto();
				partyMasterDto
						.setPartyMasterContactInfoDto(listPartyMasterContactInfoDto);
	
				// this is for set address info
				PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purInvAddressInfoDtoList,
								PartyMasterAddressInfoDto.class);
	
				List<PartyMasterAddressInfoDto> listPartyMasterAddressInfoDto = partyMasterAddressInfoDto
						.getPartyMasterAddressInfoDto();
				partyMasterDto
						.setPartyMasterAddressInfoDto(listPartyMasterAddressInfoDto);
	
				purchaseInvoiceDto.setPartyMasterDto(partyMasterDto);
				sessionFactory.getCurrentSession().merge(purchaseInvoiceDto);
				
				String sql = "SELECT MAX(id) FROM  inv_purchase_invoice";

				SQLQuery query = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
				Integer  masterId = ((Number) query.uniqueResult()).intValue();
				
				/*PurchaseInvoiceService purchaseInvoiceService=(ApplicationContextUtils.getApplicationContext()).getBean(PurchaseInvoiceService.class);
				purchaseInvoiceService.saveBatchStockMaster(batchStockDto, masterId, "purchaseInvoice");*/
				status = 1;
			} else {
				
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				purchaseInvoiceDto.setUpdatedBy(userId);
				purchaseInvoiceDto.setUnitId(unitId);
				
				PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory
						.getCurrentSession().get(PartyMasterDto.class,
								partyMasterId);
				
				PurchaseInvoiceItemDto purchaseInvoiceItemDto = (PurchaseInvoiceItemDto) ConfigUIJSONUtility
						.getObjectFromJSON(lstPurchaseInvoiceItemDto,
								PurchaseInvoiceItemDto.class);
	
				List<PurchaseInvoiceItemDto> listPurchaseInvoiceItemDto = purchaseInvoiceItemDto.getLstPurchaseInvoiceItemDto();
						
				purchaseInvoiceDto.setLstPurchaseInvoiceItemDto(listPurchaseInvoiceItemDto);
	
				
			/*	BatchStockDto batchStockDto = (BatchStockDto) ConfigUIJSONUtility
						.getObjectFromJSON(batchStockDtoList,
								BatchStockDto.class);
				List<BatchStockDto> batchStockDtos = batchStockDto.getLstBatchStockDto();
				batchStockDto.setLstBatchStockDto(batchStockDtos);
*/
				// this is for set contact info
				PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purInvContactInfoDtoList,
								PartyMasterContactInfoDto.class);
	
				List<PartyMasterContactInfoDto> listPartyMasterContactInfoDto = partyMasterContactInfoDto
						.getPartyMasterContactInfoDto();
				partyMasterDto
						.setPartyMasterContactInfoDto(listPartyMasterContactInfoDto);
	
				// this is for set address info
				PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purInvAddressInfoDtoList,
								PartyMasterAddressInfoDto.class);
	
				List<PartyMasterAddressInfoDto> listPartyMasterAddressInfoDto = partyMasterAddressInfoDto
						.getPartyMasterAddressInfoDto();
				partyMasterDto
						.setPartyMasterAddressInfoDto(listPartyMasterAddressInfoDto);
	
				purchaseInvoiceDto.setPartyMasterDto(partyMasterDto);
				sessionFactory.getCurrentSession().merge(purchaseInvoiceDto);
				
				String sql = "SELECT MAX(id) FROM  inv_purchase_invoice";

				SQLQuery query = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
				Integer  masterId = ((Number) query.uniqueResult()).intValue();
				
				/*PurchaseInvoiceService purchaseInvoiceService=(ApplicationContextUtils.getApplicationContext()).getBean(PurchaseInvoiceService.class);
				purchaseInvoiceService.saveBatchStockMaster(batchStockDto, masterId, "purchaseInvoice");*/
				status = 2;
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			log.error("error for savePurchaseInvoice....");
		}
		// TODO Auto-generated method stub
		return status;
	}

	@Override
	public List<PurchaseInvoiceDto> getAllPurchaseInvoice(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		List<PurchaseInvoiceDto> purchaseInvoiceDtoList = new ArrayList<PurchaseInvoiceDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseInvoiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.addOrder(Order.desc("id"));
			purchaseInvoiceDtoList = criteria.list();
			return purchaseInvoiceDtoList;
		} catch (Exception e) {
			log.error("error for getAllPurchaseInvoice...."+e.getMessage());
			return null;
		}
	}

	@Override
	public PurchaseInvoiceDto editPurchaseInvoice(Integer purchaseInvoiceId) {
		// TODO Auto-generated method stub
		PartyMasterDto partyMasterDto = new PartyMasterDto();
		List<PartyMasterContactInfoDto> partyMsterContact = new ArrayList<PartyMasterContactInfoDto>();
		List<PartyMasterAddressInfoDto> partyMsterAddress = new ArrayList<PartyMasterAddressInfoDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseInvoiceDto.class);
			criteria.add(Restrictions.eq("id", purchaseInvoiceId));
			criteria.add(Restrictions.eq("deleted", "N"));
			purchaseInvoiceDto = (PurchaseInvoiceDto) criteria.uniqueResult();
			partyMasterDto = (PartyMasterDto) purchaseInvoiceDto
					.getPartyMasterDto();

			for (PartyMasterContactInfoDto c : partyMasterDto
					.getPartyMasterContactInfoDto()) {
				if (c.getDeleted().equalsIgnoreCase("N")) {
					partyMsterContact.add(c);
				}
			}

			for (PartyMasterAddressInfoDto a : partyMasterDto
					.getPartyMasterAddressInfoDto()) {
				if (a.getDeleted().equalsIgnoreCase("N")) {
					partyMsterAddress.add(a);
				}
			}
			partyMasterDto.setPartyMasterContactInfoDto(partyMsterContact);
			partyMasterDto.setPartyMasterAddressInfoDto(partyMsterAddress);
			purchaseInvoiceDto.setPartyMasterDto(partyMasterDto);

			return purchaseInvoiceDto;
		} catch (Exception e) {
			log.error("error for editPurchaseInvoice...."+e.getMessage());
			return null;
		}
	}

	@Override
	public boolean deletePurchaseInvoice(Integer purchaseInvoiced,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			PurchaseInvoiceDto purchaseInvoiceDto = (PurchaseInvoiceDto) sessionFactory
					.getCurrentSession().get(PurchaseInvoiceDto.class,
							purchaseInvoiced);
			purchaseInvoiceDto.setDeleted("Y");
			purchaseInvoiceDto.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			purchaseInvoiceDto.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(purchaseInvoiceDto);
			return true;
		} catch (Exception e) {
			log.error("error for deletePurchaseInvoice...."+e.getMessage());
			return false;
		}
	
	}

	@Override
	public PurchaseInvoiceDto purchaseInvoiceAutoSuggestion(
			String purchaseInvoice) {
		List<PurchaseInvoiceDto> purchaseInvoiceDtoList = new ArrayList<PurchaseInvoiceDto>();
		try {

			String sql = "";

			sql = "SELECT p.id, p.pur_inv_supplier_name as name  FROM inv_purchase_invoice p where p.pur_inv_supplier_name like '"
					+ purchaseInvoice + "%' and p.deleted='N' limit 20 ";

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			PurchaseInvoiceDto purchaseInvoiceDto1 = new PurchaseInvoiceDto();
			for (Map<String, Object> row : masterRow) {
				purchaseInvoiceDto1
						.setPurInvSupplierName((String) row.get("name"));
				purchaseInvoiceDto1.setId((Integer) row.get("id"));
				purchaseInvoiceDtoList.add(purchaseInvoiceDto1);
			}
			purchaseInvoiceDto.setLstPurchaseInvoiceDto(purchaseInvoiceDtoList);

		} catch (Exception e) {
			log.error("error for purchaseInvoiceAutoSuggestion...."+e.getMessage());
			return null;
		}
		return purchaseInvoiceDto;
	}

	@Override
	public PurchaseInvoiceDto getPurchaseInvoiceById(Integer purchaseInvoiceId) {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				PurchaseInvoiceDto.class);
		criteria.add(Restrictions.eq("id", purchaseInvoiceId));
		criteria.add(Restrictions.eq("deleted", "N"));
		purchaseInvoiceDto = (PurchaseInvoiceDto) criteria.uniqueResult();
		return purchaseInvoiceDto;
	}
	
	@Override
	public Integer getNextIdNew(String tableName, HttpServletRequest request) {
		Integer id = 0;
		String sql = null;
		sql = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = '"
				+ tableName.toString()
				+ "' AND table_schema = '"
				+ HMSConstants.DATABASENAME + "' ";
		try {
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, BigInteger>> masterRow = getMaster.list();
			for (Map<String, BigInteger> row : masterRow) {
				id = ((BigInteger) row.get("AUTO_INCREMENT")).intValue();
			}
			return id;
		} catch (Exception e) {
			log.error("error for getNextIdNew...."+e.getMessage());
		}
		return id;
	}

	@Override
	public List<GoodReceiptNoteDto> getPendingGoodsReceiptNote(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<GoodReceiptNoteDto> goodReceiptNoteDtoList=  new ArrayList<GoodReceiptNoteDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(GoodReceiptNoteDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("id"));
			goodReceiptNoteDtoList = criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for getPendingGoodsReceiptNote...."+e.getMessage());
		}
		return goodReceiptNoteDtoList;
	}

	@Override
	public List<BatchMasterDto> checkBatchAvailability(String batchCode,
			Integer itemMasterId) {
		List<BatchMasterDto> batchMasters = new ArrayList<BatchMasterDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BatchMasterDto.class);
			if (batchCode != null) {
				criteria.add(Restrictions.eq("itemBatchCode", batchCode));
			}
			if(itemMasterId !=null){
				criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
			}
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("id"));

			proList.add(Projections.property("itemBatchCode"));
			proList.add(Projections.property("itemBatchExpDate"));
			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();
			for (Object row[] : result) {
				BatchMasterDto batchMaster = new BatchMasterDto();
				if (row[0] != null) {
					batchMaster.setId(Integer.parseInt(row[0].toString()));
				} else {
					batchMaster.setId(0);
				}
				if (row[1] != null) {
					batchMaster.setItemBatchCode(row[1].toString());
				} else {
					batchMaster.setItemBatchCode("-");
				}
				if (row[2] != null) {
					batchMaster.setItemBatchExpDate((Date) row[2]);
				} else {
					batchMaster.setItemBatchExpDate(null);
				}
				batchMasters.add(batchMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for checkBatchAvailability...."+e.getMessage());
			return batchMasters;
		}
		return batchMasters;
	}

	@Override
	public List<BatchStockDto> getBatchDetails(Integer itemId) {
		String sql =""; 
		List<BatchStockDto> batchMasters = new ArrayList<BatchStockDto>();
		sql =" SELECT batchMaster.id, batchStock.item_batch_code,batchStock.item_batch_exp_date,"+ 
				"batchStock.item_master_id, batchStock.item_name, batchStock.issue_quantity,"+ 
				"batchStock.item_quantity FROM inv_batch_stock_new batchStock "+
				"INNER JOIN inv_batch_master batchMaster "+
				"ON batchStock.item_master_id=batchMaster.item_master_id and "+
				"batchStock.batch_master_id=batchMaster.id"+
				" where batchStock.deleted='N' and batchMaster.item_master_id="+itemId+""+
				" and batchMaster.deleted='N'";
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
		List<Object[]> list  = getMaster.list();
		for(Object[] arr : list){
			BatchStockDto batchStock = new BatchStockDto();
			if (arr[0] != null) {
				batchStock.setId(Integer.parseInt(arr[0].toString()));
			} else {
				batchStock.setId(0);
			}
			if (arr[1] != null) {
				batchStock.setItemBatchCode(arr[1].toString());
			} else {
				batchStock.setItemBatchCode("-");
			}
			if (arr[2] != null) {
				batchStock.setItemBatchExpDate((Date)arr[2]);
			} else {
				batchStock.setItemBatchExpDate(null);
			}
			if (arr[3] != null) {
				batchStock.setItemMasterId(Integer.parseInt(arr[3].toString()));
			} else {
				batchStock.setItemMasterId(0);
			}
			if (arr[4] != null) {
				batchStock.setItemName(arr[4].toString());
			} else {
				batchStock.setItemName("");
			}
			if (arr[5] != null) {
				batchStock.setIssueQuantity(Integer.parseInt(arr[5].toString()));
			} else {
				batchStock.setIssueQuantity(0);
			}
			if (arr[6] != null) {
				batchStock.setItemQuantity(Integer.parseInt(arr[6].toString()));
			} else {
				batchStock.setItemQuantity(0);
			}
			
			batchMasters.add(batchStock);
		}
		return batchMasters;
	}

	@Override
	public int saveBatchStockMaster(BatchStockDto batchStockDtoList,
			Integer masterId, String callFrom) {
		// TODO Auto-generated method stub
		return 0;
	}
	
}
