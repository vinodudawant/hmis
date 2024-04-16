package com.hms.pharmacy.dao.impl;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.hms.dto.Order_comp_druges;
import com.hms.ecogreenapi.EcogreenSendRequestDTO;
import com.hms.ecogreenapi.PharmaSaleOrderMasterDTO;
import com.hms.ecogreenapi.PharmaSaleOrderSlaveDTO;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.dao.IndentDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CreditNoteIndent;
import com.hms.pharmacy.pojo.FinalIndent;
import com.hms.pharmacy.pojo.IndentMaster;
import com.hms.pharmacy.pojo.IndentMasterResult;
import com.hms.pharmacy.pojo.IndentSale;
import com.hms.pharmacy.pojo.IndentSaleMaster;
import com.hms.pharmacy.pojo.IndentSaleSlave;
import com.hms.pharmacy.pojo.IndentSlave;
import com.hms.pharmacy.pojo.PatientPharmaDetails;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.pharmaIndentAmountHistory;
import com.hms.pharmacy.pojo.settalBillIndent;
import com.hms.pharmacy.service.CommonService;

@Repository
public class IndentDaoImpl  implements IndentDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	CommonService commonService;
	

	@Autowired
	RestTemplate restTemplate;
	
	String sql = "";
	
	List<StockMaster> stockMasters=new ArrayList<StockMaster>();
	int count=0;
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String pharma = (String) resourceBundleEhat.getString("pharmacy");
	Integer Pharmacy = Integer.parseInt(pharma);

	@Override
	public void saveIndent(
			IndentMaster inventoryMaterialRequestNoteItemInfoSlaveDTO) {
		try {
			  // sessionFactory.getCurrentSession().saveOrUpdate(inventoryMaterialRequestNoteItemInfoSlaveDTO);
			Session s=sessionFactory.openSession();
			Transaction tr=s.beginTransaction();
			 IndentMaster iobj = (IndentMaster) s.merge(inventoryMaterialRequestNoteItemInfoSlaveDTO);
			 s.flush();
			 tr.commit();
			
			 
			 /*
			 ResourceBundle bundle = ResourceBundle.getBundle("ecogreenapi");
				String SALE_ORDER_URL = bundle.getObject("SALE_ORDER_URL").toString();
				
				PharmaSaleOrderMasterDTO obj=null;
			 
			 Query querySpMaster =  sessionFactory.getCurrentSession().createSQLQuery("call sp_ecogreen_get_sale_order_master_details(:p_indentmasterid)");
			  querySpMaster.setParameter("p_indentmasterid", iobj.getIndentId());
			  querySpMaster.setResultTransformer(new AliasToBeanResultTransformer(PharmaSaleOrderMasterDTO.class));
				@SuppressWarnings("unchecked")
				List<PharmaSaleOrderMasterDTO> lstmaster = querySpMaster.list();
				if(lstmaster.size() > 0) {
					obj=lstmaster.get(0);
					obj.setRemark("indent");
					  Query querySpSlave = sessionFactory.getCurrentSession().createSQLQuery("call sp_ecogreen_get_sale_order_slave_details(:p_indentmasterid)");
					  querySpSlave.setParameter("p_indentmasterid", Integer.parseInt(obj.getOrder_no()));
					  querySpSlave.setResultTransformer(new AliasToBeanResultTransformer(PharmaSaleOrderSlaveDTO.class));
						@SuppressWarnings("unchecked")
						List<PharmaSaleOrderSlaveDTO> lstSlave = querySpSlave.list();
						
						
						  obj.setItem(lstSlave);
						
						  ObjectMapper w=new ObjectMapper();
						 String s="";
						 try {
							 s=w.writeValueAsString(obj);
							
						} catch (JsonProcessingException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

						System.out.println("ENtity  ==============="+s);
						 HttpEntity<String> entity = new HttpEntity<String>(s);
						// ResponseEntity<String> responseEntity = restTemplate.exchange("https://qa-eg-eco.livc.in/eco/lifenity/fetch/0/25", HttpMethod.POST, entity, String.class);
					 ResponseEntity<String> responseEntity = restTemplate.exchange(SALE_ORDER_URL, HttpMethod.POST,entity,String.class);
					   String list = responseEntity.getBody();
					   System.out.println("Response  ==============="+list);
				}*/
			 
			saleOrderDeatils(iobj.getIndentId());
			 
		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	@Override
	public Order_comp_druges getOrderCompById(int indentOrderCompId) {
		Order_comp_druges order_comp_druges = new Order_comp_druges();
		try {

			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"update order_comp_druges set pharmaIndentStatus = :status"
							+ " where idorder_comp_druges = :compId");
			query.setParameter("status", "process");
			query.setParameter("compId", indentOrderCompId);
			int result = query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();

		}
		return order_comp_druges;
	}

	@Override
	public List<IndentMaster> getIndentDetailsByDate(Date date,Integer storeId) {
		List<IndentMaster> ltCounterSaleMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IndentMaster.class);
			criteria.add(Restrictions.eq("indentDeleteFlag", 0));
			criteria.add(Restrictions.eq("indentDate", date));
			criteria.add(Restrictions.ne("indentStatus", "received"));
			if(storeId!=0)
			{
				criteria.add(Restrictions.eq("indentStoretId", storeId));
			}
			else
			{
				criteria.add(Restrictions.eq("indentStoretId", 0));
			}
			
			ltCounterSaleMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();

		}
		return ltCounterSaleMasters;
	}

	@Override
	public IndentMaster getIndentDataById(Integer indentId) {
		IndentMaster indentMaster = new IndentMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IndentMaster.class);
			/*criteria.add(Restrictions.eq("indentDeleteFlag", 0));*/
			criteria.add(Restrictions.eq("indentId", indentId));
			indentMaster = (IndentMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();

		}
		return indentMaster;
	}
	
	
/*	public List<String> autoSuggestionPatientName(String letter)
	{
		List<String> listPatientName = new ArrayList<String>();
		sql = "select distinct t.sp_dic_master_id as spdiscount,t.Treatment_ID,h.Hname,bd.bed_name,p.*,t.*,bm.* from hall h,patient p, treatment t,bill_master bm,treatment_beds b,beds bd where p.Patient_ID = t.Patient_ID    and bm.status='Y' and t.Treatment_ID=bm.Treatment_ID  and t.Treatment_ID = b.Treatment_ID AND b.Bed_ID = bd.Bed_ID and bd.Hall_ID=h.Hall_ID And t.TFlag='ACTIVE' and b.status='Y' and b.bedAllocatedFor='P' ";
		String query = sql + " and (p.fName like '" + letter
				+ "%' or lName like '	" + letter + "%')";

		List<Map<String, Object>> pName = getJdbcTemplate().queryForList(query);
		for (Map rs : pName) 
		{
			String patientName = (String) rs.get("fName") + "-"
					+ (String) rs.get("lName") + "-"
					+"-"+ (Integer) rs.get("Patient_ID");
						
			listPatientName.add(patientName);
		}
		return listPatientName;
	}*/

	@Override
	public IndentSale getPatientDataByTreatmentId(Integer treatmentId) {
		IndentSale indentSale = new IndentSale();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select     p.f_name as patient_name,    p.m_name as mn,    p.l_name as lm,    p.address,    c.city_name , p.mobile , d.doc_name  from    ehat_patient p        left join    city c ON p.town_id = c.idcity,    ehat_treatment t  left join doctor d  on d.Doctor_ID=t.doctor_id where    p.patient_id = t.patient_id        and t.treatment_id ='"
									+ treatmentId + "' ");
			Object[] rows = (Object[]) query.uniqueResult();

			if (rows[0] != null)
				indentSale.setPatientName(rows[0].toString());

			if (rows[1] != null)
				indentSale.setPatientName(rows[0].toString() + " "
						+ rows[1].toString()+" "+rows[2].toString() );

			String addr="";
			if (rows[3] != null)
				addr=rows[3].toString();

			if (rows[4] != null)
				addr+=" "+rows[3].toString();
			indentSale.setPatientAddress(addr);
			
			if (rows[5] != null)
				indentSale.setPatientMobileNumber(rows[5].toString());
			
			if (rows[6] != null)
				indentSale.setConsultantName(rows[6].toString());

		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}
	
	@Override
	public IndentSale getSponserDataByTreatmentId(Integer treatmentId) 
	{
		IndentSale indentSale = new IndentSale();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT     ifnull(c.category_name, 'Self') as catName,s.charges_master_slave_id FROM    ehat_treatment t          join ehat_bill_master s ON s.treatment_id = t.treatment_id    join ehat_charges_master_slave c ON c.id = s.charges_master_slave_id where    t.treatment_id ='"
									+ treatmentId + "' ");
			Object[] rows = (Object[]) query.uniqueResult();
           if(rows!=null)
           {
			if (rows[0] != null)
				indentSale.setSponserName(rows[0].toString());
			else
				indentSale.setSponserName("");
           }
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}
	/*"select p.fname,p.addressLine3,p.mobile,p.lname from pharma_indent_sale_master i1 inner join pharma_indent_master i "
	+ " on i.indent_id=i1.indent_sale_indent_no "
	+ " inner join treatment t on t.Treatment_ID=i.indent_treatement_id "
	+ " inner join patient p "
	+ " on p.Patient_ID=t.Patient_ID where i1.indent_sale_indent_no='"
	+ indentId + "' ");*/
	@Override
	public IndentSale getPatientDataByIndentId(Integer indentId) {
		IndentSale indentSale = new IndentSale();
		String address="";
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select     p.patient_id,    p.f_name,    p.m_name,    p.l_name,    p.address,     ifnull(c.city_name,''),    p.mobile ,p.prefix  from    pharma_indent_sale_master i1        inner join    pharma_indent_master i ON i.indent_id = i1.indent_sale_indent_no        inner join    ehat_treatment t ON t.treatment_id = i.indent_treatement_id        inner join    ehat_patient p ON p.patient_id = t.patient_id        LEFT JOIN    city c ON p.town_id = c.idcity where    i1.indent_sale_indent_no ='"+ indentId + "' ");
			Object[] rows = (Object[]) query.uniqueResult();

			 if(rows[0] != null)
		       {
			indentSale.setPatientId(rows[0].toString()); 
					
		} else {
			indentSale.setPatientId("");
			
		}
			
			if (rows[1] != null) {
				indentSale.setPatientName(rows[1].toString());
			} else {
				indentSale.setPatientName("");
			}
			if (rows[2] != null) {
				indentSale.setPatientName(rows[1].toString() + " "
						+ rows[2].toString());
			} else {
				indentSale.setPatientName("");
			}
			
			if(rows[3] != null && rows[2] != null)
			{
				indentSale.setPatientName( rows[7].toString() +" "+ rows[1].toString() + " "+rows[2].toString() + 
						" "+ rows[3].toString());
			} else {
				indentSale.setPatientName("");
				
			}
			
			 if(rows[4] != null)
		       {
			indentSale.setPatientAddress(rows[4].toString()+ " "+rows[5].toString());
			 address=rows[4].toString()+ " "+rows[5].toString();
		} else {
			indentSale.setPatientAddress("");
			
		}
			 if(rows[6] != null)
		       {
			indentSale.setPatientMobileNumber(rows[6].toString()); 
					
		} else {
			indentSale.setPatientMobileNumber("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		try {
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							" select     ifnull(c.city_name, ''),    ifnull(p.area_code, ''),    ifnull(t1.taluka_name, ''),    ifnull(d.dis_name, ''),    ifnull(s.state_name, '') from    pharma_indent_master i        inner join    ehat_treatment t ON t.treatment_id = i.indent_treatement_id        inner join    ehat_patient p ON p.patient_id = t.patient_id        left JOIN    city c ON p.town_id = c.idcity        left JOIN    taluka t1 ON p.taluka_id = t1.idtaluka        left JOIN    district d ON d.iddistrict = p.district_id        left JOIN    state s ON s.idstate = p.state_id where    i.indent_id ='"+ indentId + "' ");
			Object[] rows = (Object[]) query1.uniqueResult();

			if (rows[0] != null) {
				indentSale.setPatientAddress(address+" "+rows[0].toString());
			} else {
				indentSale.setPatientAddress("");
			}
			
			if (rows[1] != null) {
				indentSale.setPatientAddress(address+" "+rows[0].toString()+" "+rows[1].toString());
			} else {
				indentSale.setPatientAddress("");
			}
			
			if (rows[2] != null) {
				indentSale.setPatientAddress(address+" "+rows[0].toString()+" "+rows[1].toString()+" "+rows[2].toString());
			} else {
				indentSale.setPatientAddress("");
			}
			if (rows[3] != null) {
				indentSale.setPatientAddress(address+" "+rows[0].toString()+" "+rows[1].toString()+" "+rows[2].toString()+" "+rows[3].toString());
			} else {
				indentSale.setPatientAddress("");
			}
			if (rows[4] != null) {
				indentSale.setPatientAddress(address+" "+rows[0].toString()+" "+rows[1].toString()+" "+rows[2].toString()+" "+rows[3].toString()+" "+rows[4].toString());
			} else {
				indentSale.setPatientAddress("");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}
	
	
	@Override
	public IndentSale getSponserByIndentId(Integer indentId) {
		IndentSale indentSale = new IndentSale();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select     ifnull(c.category_name, 'Self') as catName, c.id from    pharma_indent_sale_master s        inner join    pharma_indent_master i ON i.indent_id = s.indent_sale_indent_no        inner join    ehat_treatment t ON t.treatment_id = i.indent_treatement_id        join    ehat_charges_master_slave c ON c.id = s.bill_Category_id where    i.indent_id ="+ indentId);
			Object[] rows = (Object[]) query.uniqueResult();

			if(rows!=null)
			if (rows[1] != null) {
				indentSale.setSponserName(rows[1].toString());
			} else {
				indentSale.setSponserName("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}
	
	
	@Override
	public IndentSale getConsultantByIndentId(Integer indentId) {
		IndentSale indentSale = new IndentSale();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select     d.Doctor_ID, d.doc_name from    pharma_indent_master i        inner join    ehat_treatment t ON t.treatment_id = i.indent_treatement_id        inner join    doctor d ON d.doctor_id = t.doctor_id where    i.indent_id ='"+ indentId + "' ");
			Object[] rows = (Object[]) query.uniqueResult();

			if (rows[1] != null) {
				indentSale.setConsultantName(rows[1].toString());
			} else {
				indentSale.setConsultantName("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return indentSale;
		}
		return indentSale;
	}
	
	@Override
	public ProductMaster getProductNameByProductId(Integer productId) {
		ProductMaster productMaster = new ProductMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class);
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			criteria.add(Restrictions.eq("productId", productId));
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("productName"));
			criteria.setProjection(proList);

			Object rows = (Object) criteria.uniqueResult();

			productMaster.setProductName(rows.toString());

		} catch (Exception e) {
			e.printStackTrace();

		}
		return productMaster;
	}

	@Override
	public Map<String, String> saveIndentSale(IndentSaleMaster indentSaleMaster,String storeId) {
		Map<String, String> result = new HashMap<String, String>();
		try {
			stockMasters=new ArrayList<StockMaster>();
			count=0;
			for(IndentSaleSlave slave : indentSaleMaster.getIndentSaleSlaves()){
				int id =getidTaxmaster(slave.getIndentSlaveVat());
				slave.setIndentSlaveVatId(id);
			}
			if(saveBatchStockDetails(indentSaleMaster,storeId))
			{
				int treatmentId= (Integer) sessionFactory.getCurrentSession().createSQLQuery("select indent_treatement_id from pharma_indent_master where indent_id="+indentSaleMaster.getIndentMaster().getIndentId()).uniqueResult();
				int patientId= (Integer) sessionFactory.getCurrentSession().createSQLQuery("select patient_id from ehat_treatment where treatment_id="+treatmentId).uniqueResult();
				indentSaleMaster.setWardName(commonService.getWardNameByTreatment(treatmentId));
				int id=(Integer) sessionFactory.getCurrentSession().save(indentSaleMaster);
				
				for(IndentSaleSlave slave : indentSaleMaster.getIndentSaleSlaves()){
					slave.setIndentSaleSlaveRate((Double)sessionFactory.getCurrentSession().createSQLQuery("select pur_rate from pharma_purchase_rate where batch_id="+slave.getIndentSaleSlaveBatchId()+" limit 1").uniqueResult());
					commonService.setstockMasterSlave(id, "IndentSale",patientId , treatmentId, slave.getProductMaster().getProductId(), slave.getIndentSaleSlaveBatchId(), slave.getIndentSaleSlaveBatchCode(), indentSaleMaster.getIndentSaleStoreId(), 0, slave.getIndentSaleSlaveQty(), slave.getIndentSlaveVat(), 0.0, 0.0, slave.getIndentSlaveDis(), indentSaleMaster.getUnitId(), 0, slave.getIndentSaleSlaveMrp(), slave.getIndentSaleSlaveRate());
				}
				result.put("result", "Record Save Succesfully");
			}
			else
			{
				result.put("result", "Error");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	//Added By BILAL For GST id 
	public int getidTaxmaster(double gstper) {
				int a=0;
				try {	
					Query taxid = sessionFactory.getCurrentSession().createSQLQuery(
							"select distinct tax_id from pharma_tax_master where tax_delete_flag=0 and tax_rate="
									+ gstper);

					a =(Integer) taxid.uniqueResult();
				} catch (Exception e) {
					e.printStackTrace();
					return  a;
				}
				return  a;
	}
	public boolean saveBatchStockDetails(IndentSaleMaster indentSaleMaster,String storeId) 
	{
		boolean result=true;
		Double tmp=0.0;
		 DecimalFormat df = new DecimalFormat("###.##");
	       
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for ( Iterator<IndentSaleSlave> itr=indentSaleMaster.getIndentSaleSlaves().iterator();itr.hasNext();) {
			IndentSaleSlave slave=itr.next();
			tmp=slave.getIndentSaleSlaveAmt()-((slave.getIndentSaleSlaveAmt()*(indentSaleMaster.getIndentSaleCD()/100)));
			tmp=tmp*(indentSaleMaster.getIndentSaleAmountReceive()/indentSaleMaster.getIndentSaleNetAmt());
			slave.setIndentSaleSlaveRecAmt(Double.parseDouble(df.format(tmp)));
			tmp=slave.getIndentSaleSlaveAmt()-slave.getIndentSaleSlaveRecAmt()-((slave.getIndentSaleSlaveAmt()*(indentSaleMaster.getIndentSaleCD()/100)));
			slave.setIndentSaleSlaveRemAmt(Double.parseDouble(df.format(tmp)));
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(slave.getProductMaster().getBatchMaster()
					.get(0).getBatchId());

			StockMaster stockMaster = new StockMaster();
			stockMaster.setStockQtyInHand(Double.parseDouble(slave
					.getIndentSaleSlaveQty().toString()));
			batchMaster.setStockMaster(stockMaster);
			if(batchMasters.size()==0)
			{
				batchMasters.add(batchMaster);
			}
			else
			{
				if((batchMasters.contains(batchMaster)==true))
				{
					count=1;
				}
				else
				{
					batchMasters.add(batchMaster);
				}
				
			}
			
			if(indentSaleMaster.getIndentTaxVat0().intValue()==1){
				Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_indent_slave set indent_slave_pending_qty=indent_slave_pending_qty +"+slave.getIndentSaleSlaveQty()+" where indent_product_id="+slave.getProductMaster().getProductId());
				query.executeUpdate();
			}
			
		}
		try 
		{
			for (BatchMaster batchMaster : batchMasters) 
			{
				checkAvailibility(batchMaster
						.getBatchId(),batchMaster.getStockMaster().getStockQtyInHand(),storeId);
			}
		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		if(count==0)
		{
			decreaseStock(storeId);
		}
		else
		{
			return false;
		}
		return result;
	}
	
	public boolean checkAvailibility(Integer batchId, Double Qty,String storeId) {
		StockMaster stockMaster=new StockMaster();
		boolean result=false;
		String strQuery="";
		Object storeName=new Object();
		
		if(storeId!=null)
		{
			try 
			{
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT store_name FROM pharma_sub_store_master where store_id='"
								+ storeId + "'");
				storeName = query.uniqueResult();
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			strQuery="SELECT stock_qty_in_hand FROM pharma_"+storeName.toString()+"_stock_master where stock_batch_id='"+batchId+"'";
		}
		else
		{
			strQuery="SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='"+batchId+"'";
		}
		
		
		
		
		try {
			
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(strQuery); 
			Double availableStock=null;
			Double totalStock=0.0;
			Object rows = query.uniqueResult();
					
			if(rows!=null)
			{
				availableStock=Double.parseDouble(rows.toString());
			}
			
			if(availableStock >= Qty)
			{	
				totalStock=availableStock-Qty;
				result=true;
			}	
			else
			{
				result=false;
				count=1;
				return result;
				
			}
			
			stockMaster.setStockQtyInHand(totalStock);
			BatchMaster batchMaster=new BatchMaster();
			batchMaster.setBatchId(batchId);
			
			stockMaster.setBatchMaster(batchMaster);
			
			stockMasters.add(stockMaster);
			
			/*if(count==0)
			{	
				SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
				String date=dateFormat.format(new java.util.Date());
				
				for(StockMaster master:stockMasters)
				{
					try
					{
						Query query1 = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"update pharma_stock_master set stock_qty_in_hand='"+master.getStockQtyInHand()+"',stock_update_date='"+date+"' where stock_batch_id=:batchId");
					query1.setInteger("batchId", master.getBatchMaster().getBatchId());
					int rowsDeleted = query1.executeUpdate();
					}
					catch(Exception e)
					{
						e.printStackTrace();
					}
				}
				
			}*/	

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}

	/*public void decreaseStock(Integer batchId, Double Qty) {
		try {

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT stock_qty_in_hand FROM pharma_stock_master where stock_batch_id='"
							+ batchId + "'");
			Double availableStock = null;
			Double totalStock = null;
			Object rows = query.uniqueResult();

			if (rows != null) {
				availableStock = Double.parseDouble(rows.toString());
			}

			if (availableStock >= Qty)
				totalStock = availableStock - Qty;

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String date = dateFormat.format(new java.util.Date());

			try {
				Query query1 = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"update pharma_stock_master set stock_qty_in_hand='"
										+ totalStock + "',stock_update_date='"
										+ date
										+ "' where stock_batch_id=:batchId");
				query1.setInteger("batchId", batchId);
				int rowsDeleted = query1.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}*/
	
	public boolean decreaseStock(String storeId) {
		
		try
		{
			if(count==0)
			{
				if(storeId==null)
				{
					SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
					String date=dateFormat.format(new java.util.Date());
					
					for(StockMaster master:stockMasters)
					{
						try
						{
							Query query1 = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"update pharma_stock_master set stock_qty_in_hand='"+master.getStockQtyInHand()+"',stock_update_date='"+date+"' where stock_batch_id=:batchId");
						query1.setInteger("batchId", master.getBatchMaster().getBatchId());
						int rowsDeleted = query1.executeUpdate();
						}
						catch(Exception e)
						{
							e.printStackTrace();
						}
					}
				}
				else
				{
					Object storeName="";
					try 
					{
						SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT store_name FROM pharma_sub_store_master where store_id='"
										+ storeId + "'");
						storeName = query.uniqueResult();
					}
					catch(Exception e)
					{
						e.printStackTrace();
					}
					SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
					String date=dateFormat.format(new java.util.Date());
					
					for(StockMaster master:stockMasters)
					{
						try
						{
							Query query1 = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"update pharma_"+storeName+"_stock_master set stock_qty_in_hand='"+master.getStockQtyInHand()+"',stock_update_date='"+date+"' where stock_batch_id=:batchId");
						query1.setInteger("batchId", master.getBatchMaster().getBatchId());
						int rowsDeleted = query1.executeUpdate();
						}
						catch(Exception e)
						{
							e.printStackTrace();
						}
					}
				}
			}	

		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
		
	}

	public BatchMaster getBatchDetails(Integer batchId) throws ParseException {
		/*
		 * BatchMaster batchMaster = null; try { batchMaster = (BatchMaster)
		 * sessionFactory.getCurrentSession().get( BatchMaster.class, batchId);
		 * 
		 * } catch (Exception e) { e.printStackTrace();
		 * 
		 * } return batchMaster;
		 */

		BatchMaster batchMaster = new BatchMaster();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				BatchMaster.class);
		criteria.add(Restrictions.eq("batchId", batchId))
				.createAlias("productMaster", "productMaster")
				.createAlias("stockMaster", "stockMaster");

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("batchId"));
		proList.add(Projections.property("batchCode"));
		proList.add(Projections.property("batchExpDate"));
		proList.add(Projections.property("batchDeleteFlag"));
		proList.add(Projections.property("batchUpdateDate"));
		proList.add(Projections.property("productMaster.productId"));
		proList.add(Projections.property("stockMaster.stockId"));
		/* proList.add(Projections.property("stockMaster.stockId")); */
		proList.add(Projections.property("stockMaster.stockQtyInHand"));
		proList.add(Projections.property("stockMaster.stockQtyOnOrder"));
		proList.add(Projections.property("stockMaster.stockYearId"));
		proList.add(Projections.property("stockMaster.stockDeleteFlag"));
		proList.add(Projections.property("stockMaster.stockUpdateDate"));

		criteria.setProjection(proList);

		List<Object[]> result = criteria.list();
		for (Object[] master : result) {

			ProductMaster productMaster = new ProductMaster();
			StockMaster stockMaster = new StockMaster();
			if (master[0] != null) {
				batchMaster.setBatchId(Integer.parseInt(master[0].toString()));
			}
			if (master[1] != null) {
				batchMaster.setBatchCode(master[1].toString());
			}
			if (master[2] != null) {
				batchMaster.setBatchExpDate(master[2].toString());
			}
			if (master[3] != null) {
				batchMaster.setBatchDeleteFlag(Integer.parseInt(master[3]
						.toString()));
			}
			if (master[4] != null) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[4].toString());
				batchMaster.setBatchUpdateDate(date);
			}
			if (master[5] != null) {
				productMaster.setProductId(Integer.parseInt(master[5]
						.toString()));
			}
			if (master[6] != null) {
				stockMaster.setStockId(Integer.parseInt(master[6].toString()));
			}
			if (master[7] != null) {
				stockMaster.setStockQtyInHand(Double.parseDouble(master[7]
						.toString()));
			}
			if (master[8] != null) {
				stockMaster.setStockQtyOnOrder(Integer.parseInt(master[8]
						.toString()));
			}
			if (master[9] != null) {
				stockMaster.setStockYearId(Integer.parseInt(master[9]
						.toString()));
			}
			if (master[10] != null) {
				stockMaster.setStockDeleteFlag(Integer.parseInt(master[10]
						.toString()));
			}
			if (master[11] != null) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date date = dateFormat.parse(master[11].toString());
				/* java.sql.Date date=master[11].toString() */
				java.sql.Date sqlDate = new java.sql.Date(date.getTime());
				stockMaster.setStockUpdateDate(sqlDate);
			}
			stockMaster.setStockProductMaster(productMaster);
			stockMaster.setBatchMaster(batchMaster);

			batchMaster.setProductMaster(productMaster);
			batchMaster.setStockMaster(stockMaster);

		}
		return batchMaster;
	}

	@Override
	public void setIndentStatus(Integer indentId) {

		try {

			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"update pharma_indent_master m set m.indent_status = :status"
							+ " where m.indent_id = :indentId");
			query.setParameter("status", "received");
			query.setParameter("indentId", indentId);
			int result = query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();

		}

	}

	@Override
	public IndentSaleMaster getIndentSaleById(Integer indentSaleId) {

		/*
		 * IndentSaleMaster indentSaleMaster =new IndentSaleMaster(); try {
		 * Criteria criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(IndentSaleMaster.class);
		 * criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0));
		 * 
		 * criteria.add(Restrictions.eq("indentSalelId", indentSaleId));
		 * indentSaleMaster = (IndentSaleMaster) criteria .uniqueResult();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return indentSaleMaster;
		 * } return indentSaleMaster;
		 */

		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(IndentSaleMaster.class)
				.createAlias("indentMaster", "indentMaster");
		criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0));

		if (indentSaleId != 0) {
			criteria.add(Restrictions.eq("indentSalelId", indentSaleId));
		}

		IndentSaleMaster indentSaleMaster = new IndentSaleMaster();

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("indentSalelId"));
		proList.add(Projections.property("indentSaleDocNo"));
		proList.add(Projections.property("indentSaleReceivedDate"));
		proList.add(Projections.property("indentMaster.indentId"));
		proList.add(Projections.property("indentSaleLess"));
		proList.add(Projections.property("indentSaleGrossAmt"));
		proList.add(Projections.property("indentSaleAdd"));
		proList.add(Projections.property("indentSaleNetAmt"));
		proList.add(Projections.property("indentSaleAmountReceive"));
		proList.add(Projections.property("indentSalePreviousBalance"));
		proList.add(Projections.property("indentBillMode"));
		proList.add(Projections.property("indentTaxVat0"));
		proList.add(Projections.property("indentTaxVat5"));
		proList.add(Projections.property("indentTaxVat12"));
		proList.add(Projections.property("indentTaxVat55"));
		proList.add(Projections.property("indentSaleBankName"));
		proList.add(Projections.property("indentSaleChequeNum"));
		proList.add(Projections.property("indentTaxVat6"));
		proList.add(Projections.property("indentTaxVat135"));
		proList.add(Projections.property("indentSaleCdAmt"));
	
		
		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					indentSaleMaster.setIndentSalelId(Integer.parseInt(row[0]
							.toString()));

				if (row[1] != null) {
					indentSaleMaster.setIndentSaleDocNo(row[1].toString());
				} else
					indentSaleMaster.setIndentSaleDocNo("");

				if (row[2] != null) {
					/*SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd");
					String str[] = row[2].toString().split(" ");
					indentSaleMaster.setIndentSaleNarration(str[0]);*/
					
					SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
					String str[]=row[2].toString().split(" ");
					String date[]=str[0].split("-");
					StringBuffer stringBuffer=new StringBuffer();
					stringBuffer.append(date[2]+"/"+date[1]+"/"+date[0]);
					indentSaleMaster.setIndentSaleNarration(stringBuffer.toString());
				}

				if (row[3] != null) {
					IndentMaster indentMaster = new IndentMaster();
					indentMaster
							.setIndentId(Integer.parseInt(row[3].toString()));
					indentSaleMaster.setIndentMaster(indentMaster);
				}

				if (row[4] != null) {
					indentSaleMaster.setIndentSaleLess(Double
							.parseDouble(row[4].toString()));
				}

				if (row[5] != null) {
					indentSaleMaster.setIndentSaleGrossAmt(Double
							.parseDouble(row[5].toString()));
				}

				if (row[6] != null) {
					indentSaleMaster.setIndentSaleAdd(Double.parseDouble(row[6]
							.toString()));
				}
				if (row[7] != null) {
					indentSaleMaster.setIndentSaleNetAmt(Double
							.parseDouble(row[7].toString()));
				}

				if (row[8] != null) {
					indentSaleMaster.setIndentSaleAmountReceive(Double
							.parseDouble(row[8].toString()));
				}

				if (row[9] != null) {
					indentSaleMaster.setIndentSalePreviousBalance(Double
							.parseDouble(row[9].toString()));
				}
				if (row[10] != null) 
				{	
					if (row[10].toString().equals("0"))
						indentSaleMaster.getIndentMaster().setIndentStatus("cash");
					else if (row[10].toString().equals("1"))
						indentSaleMaster.getIndentMaster().setIndentStatus("Credit");
				 else 
					indentSaleMaster.getIndentMaster().setIndentStatus("Cheque");
				}
				
				if (row[11] != null) 
					indentSaleMaster.setIndentTaxVat0(Double.parseDouble(row[11].toString()));
				else
					indentSaleMaster.setIndentTaxVat0(0.0);
				
				if (row[12] != null) 
					indentSaleMaster.setIndentTaxVat5(Double.parseDouble(row[12].toString()));
				else
					indentSaleMaster.setIndentTaxVat5(0.0);
				
				if (row[13] != null) 
					indentSaleMaster.setIndentTaxVat12(Double.parseDouble(row[13].toString()));
				else
					indentSaleMaster.setIndentTaxVat12(0.0);	
				
				if (row[14] != null) 
					indentSaleMaster.setIndentTaxVat55(Double.parseDouble(row[14].toString()));
				else
					indentSaleMaster.setIndentTaxVat55(0.0);
				
				if (row[15] != null) 
					indentSaleMaster.setIndentSaleBankName((row[15].toString()));
				else
					indentSaleMaster.setIndentSaleBankName(("-"));
				
				if (row[16] != null) 
					indentSaleMaster.setIndentSaleChequeNum((row[16].toString()));
				else
					indentSaleMaster.setIndentSaleChequeNum(("-"));
				
				if (row[17] != null) 
					indentSaleMaster.setIndentTaxVat6(Double.parseDouble(row[17].toString()));
				else
					indentSaleMaster.setIndentTaxVat6(0.0);
				
				if (row[18] != null) 
					indentSaleMaster.setIndentTaxVat135(Double.parseDouble((row[18].toString())));
				else
					indentSaleMaster.setIndentTaxVat135(Double.parseDouble(("")));
				
				if (row[19] != null) 
					indentSaleMaster.setIndentSaleCdAmt(Double.parseDouble((row[19].toString())));
				else
					indentSaleMaster.setIndentSaleCdAmt(Double.parseDouble((""))); 

				
				
				
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<IndentSaleSlave> indentSaleSlaves = new ArrayList<IndentSaleSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							/* "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id=" */
							"select p_slave.indent_sale_slave_qty,p_slave.indent_sale_slave_mrp,p_slave.indent_sale_slave_rate,p_slave.indent_sale_slave_amt,p_slave.indent_sale_slave_batch_code,p_slave.indent_sale_slave_batch_expiry,product.product_name,p_slave.indent_slave_vat,p_slave.indent_slave_ratePerUnit,p_slave.indent_slave_vatAmt,p_slave.indent_slave_Dis,p_slave.indent_slave_Dis_Amt,pre.preparation_name from pharma_indent_sale_master master inner join pharma_indent_sale_slave p_slave ON p_slave.indent_sale_slave_master_id = master.indent_sale_id inner join pharma_product_master product ON product.product_id = p_slave.indent_sale_slave_product_id inner join    pharma_preparation_master pre ON pre.preparation_id = product.product_preparation_id where master.indent_sale_id = '"
									+ indentSaleId + "';");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				IndentSaleSlave purchaseSlave = new IndentSaleSlave();

				if (row[0] != null) {
					String result1[] = row[0].toString().split("\\.");
					purchaseSlave.setIndentSaleSlaveQty(Integer
							.parseInt(result1[0]));
				}

				if (row[1] != null)
					purchaseSlave.setIndentSaleSlaveMrp(Double
							.parseDouble(row[1].toString()));

				if (row[2] != null)
					purchaseSlave.setIndentSaleSlaveRate(Double
							.parseDouble(row[2].toString()));

				if (row[3] != null)
					purchaseSlave.setIndentSaleSlaveAmt(Double
							.parseDouble(row[3].toString()));

				if (row[4] != null)
					purchaseSlave
							.setIndentSaleSlaveBatchCode(row[4].toString());
				else
					purchaseSlave.setIndentSaleSlaveBatchCode("");

				if (row[5] != null)
					purchaseSlave.setIndentSaleSlaveBatchExpiry(row[5]
							.toString());
				else
					purchaseSlave.setIndentSaleSlaveBatchExpiry("");

				ProductMaster productMaster = new ProductMaster();
				if (row[6] != null) {
					productMaster.setProductName(row[6].toString());
				} else {
					productMaster.setProductName("");
				}
				
				if (row[12] != null) {
					productMaster.setProductDesc(row[12].toString());
				} else {
					productMaster.setProductDesc("");
				}
				
				purchaseSlave.setProductMaster(productMaster);
				
				if (row[7] != null)
					purchaseSlave.setIndentSlaveVat(Double.parseDouble(row[7].toString()));
				else
					purchaseSlave.setIndentSlaveVat(0.0);
				
				if (row[8] != null)
					purchaseSlave.setIndentSlaveRatePerUnit(Double.parseDouble(row[8].toString()));
				else
					purchaseSlave.setIndentSlaveRatePerUnit(0.0);
				
				if (row[9] != null)
					purchaseSlave.setIndentSlaveVatAmt(Double.parseDouble(row[9].toString()));
				else
					purchaseSlave.setIndentSlaveVatAmt(0.0);
				
				
				if (row[10] != null)
					purchaseSlave.setIndentSlaveDis(Double.parseDouble(row[10].toString()));
				else
					purchaseSlave.setIndentSlaveDis(0.0);
				
				if (row[11] != null && row[0] != null)
				{
					Double discAmt=((Double.parseDouble(row[11].toString()))*(Double.parseDouble(row[0].toString())));
					System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"+discAmt);
					purchaseSlave.setIndentSlaveDisAmt(discAmt);
					
				}
				else
					purchaseSlave.setIndentSlaveDisAmt(0.0);
				
				indentSaleSlaves.add(purchaseSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		indentSaleMaster.setIndentSaleSlaves(indentSaleSlaves);

		return indentSaleMaster;
	}

	@Override
	public List<IndentSaleMaster> getIndentList() {
		/*
		 * List<IndentSaleMaster> indentSaleMasters = null; try { Criteria
		 * criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(IndentSaleMaster.class);
		 * criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0));
		 * criteria.addOrder(Order.desc("indentSalelId"));
		 * criteria.setMaxResults(10); indentSaleMasters = criteria.list();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return
		 * indentSaleMasters; } return indentSaleMasters;
		 */

		/*List<IndentSaleMaster> indentSaleMasters = new ArrayList<IndentSaleMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IndentSaleMaster.class)
					.createAlias("indentMaster", "indentMaster");
			criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0));
			criteria.addOrder(Order.desc("indentSalelId"));
			criteria.setMaxResults(10);
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("indentSalelId"));
			proList.add(Projections.property("indentMaster.indentId"));
			

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				IndentSaleMaster indentSaleMaster = new IndentSaleMaster();
				indentSaleMaster.setIndentSalelId(Integer.parseInt(master[0]
						.toString()));

				IndentMaster indentMaster = new IndentMaster();
				indentMaster
						.setIndentId(Integer.parseInt(master[1].toString()));
				indentSaleMaster.setIndentMaster(indentMaster);

				indentSaleMasters.add(indentSaleMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return indentSaleMasters; }
		 * return indentSaleMasters;
		 */

		List<IndentSaleMaster> indentSaleMasters = new ArrayList<IndentSaleMaster>();

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				"select     master.indent_sale_id,    indent.indent_id,    p.f_name,    p.m_name,    p.l_name,    master.indent_sale_received_date,    master.indent_sale_net_amt from    pharma_indent_sale_master master        inner join    pharma_indent_master indent ON indent.indent_id = master.indent_sale_indent_no        inner join    ehat_treatment t ON t.treatment_id = indent.indent_treatement_id        inner join    ehat_patient p ON p.patient_id = t.patient_id where    master.indent_sale_delete_flag = 0 order by master.indent_sale_id desc limit 10");

		List<Object[]> result = query.list();
		try {
			for (Object[] master : result) {

				IndentSaleMaster indentSaleMaster = new IndentSaleMaster();

				if (master[0] != null)
					indentSaleMaster.setIndentSalelId(Integer.parseInt(master[0].toString()));
				else
					indentSaleMaster.setIndentSalelId(0);

				IndentMaster indentMaster = new IndentMaster();

				if (master[1] != null)
					indentMaster.setIndentId(Integer.parseInt(master[1].toString()));
				else
					indentMaster.setIndentId(0);

				indentSaleMaster.setIndentMaster(indentMaster);

				if (master[2] != null)
					indentSaleMaster.setIndentSaleNarration((master[2].toString()));
				else
					indentSaleMaster.setIndentSaleNarration((""));

				if (master[3] != null && master[2] != null)
					indentSaleMaster.setIndentSaleNarration(master[2].toString() + " " + master[3].toString());
				else
					indentSaleMaster.setIndentSaleNarration((""));

				if (master[4] != null && master[3] != null && master[2] != null)
					indentSaleMaster.setIndentSaleNarration(
							master[2].toString() + " " + master[3].toString() + " " + master[4].toString());
				else
					indentSaleMaster.setIndentSaleNarration((""));

				/*
				 * SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				 * 
				 * if (master[5] != null) { java.util.Date date = dateFormat
				 * .parse(master[5].toString());
				 * indentSaleMaster.setIndentSaleReceivedDate(date); }
				 */

				if (master[5] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
					String str[] = master[5].toString().split(" ");
					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
					indentSaleMaster.setIndentSaleDocNo(stringBuffer.toString());
				}

				if (master[6] != null)
					indentSaleMaster.setIndentSaleNetAmt(Double.parseDouble(master[6].toString()));
				else
					indentSaleMaster.setIndentSaleNetAmt(Double.parseDouble(("")));

				indentSaleMasters.add(indentSaleMaster);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return indentSaleMasters;

	}

	@SuppressWarnings("unchecked")
	@Override
	public IndentSaleMaster getIndentSaleByClientIndentId(Integer indentSaleId) {
		/*
		 * IndentSaleMaster indentSaleMaster =new IndentSaleMaster(); try { Criteria
		 * criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(IndentSaleMaster.class);
		 * criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0));
		 * 
		 * criteria.add(Restrictions.eq("indentMaster.indentId", indentSaleId));
		 * indentSaleMaster = (IndentSaleMaster) criteria .uniqueResult();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return indentSaleMaster; }
		 * return indentSaleMaster;
		 */

		/*
		 * IndentSaleMaster indentSaleMaster = new IndentSaleMaster(); try { Criteria
		 * criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(IndentSaleMaster.class) .createAlias("indentMaster",
		 * "indentMaster"); criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0));
		 * criteria.add(Restrictions.eq("indentMaster.indentId", indentSaleId));
		 * 
		 * 
		 * ProjectionList proList = Projections.projectionList();
		 * proList.add(Projections.property("indentSalelId"));
		 * proList.add(Projections.property("indentMaster.indentId"));
		 * 
		 * criteria.setProjection(proList); List<Object[]> result = criteria.list();
		 * 
		 * for (Object[] master : result) {
		 * indentSaleMaster.setIndentSalelId(Integer.parseInt(master[0] .toString()));
		 * 
		 * IndentMaster indentMaster = new IndentMaster(); indentMaster
		 * .setIndentId(Integer.parseInt(master[1].toString()));
		 * indentSaleMaster.setIndentMaster(indentMaster); }
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return indentSaleMaster; }
		 * return indentSaleMaster;
		 */

		IndentSaleMaster indentSaleMaster = new IndentSaleMaster();

		try {

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select     master.indent_sale_id,    indent.indent_id,    p.f_name,    p.m_name,    p.l_name,    master.indent_sale_received_date,    master.indent_sale_net_amt from    pharma_indent_sale_master master        inner join    pharma_indent_master indent ON indent.indent_id = master.indent_sale_indent_no        inner join    ehat_treatment t ON t.treatment_id = indent.indent_treatement_id        inner join    ehat_patient p ON p.patient_id = t.patient_id where    master.indent_sale_delete_flag = 0 and indent.indent_id="
							+ indentSaleId);
			List<Object[]> result = query.list();

			for (Object[] master : result) {
				if (master[0] != null)
					indentSaleMaster.setIndentSalelId(Integer.parseInt(master[0].toString()));

				if (master[1] != null) {
					IndentMaster indentMaster = new IndentMaster();
					indentMaster.setIndentId(Integer.parseInt(master[1].toString()));

					indentSaleMaster.setIndentMaster(indentMaster);
				}

				if (master[2] != null)
					indentSaleMaster.setIndentSaleNarration((master[2].toString()));
				else
					indentSaleMaster.setIndentSaleNarration((""));

				if (master[3] != null && master[2] != null)
					indentSaleMaster.setIndentSaleNarration(master[2].toString() + " " + master[3].toString());
				else
					indentSaleMaster.setIndentSaleNarration((""));

				if (master[4] != null && master[3] != null && master[2] != null)
					indentSaleMaster.setIndentSaleNarration(
							master[2].toString() + " " + master[3].toString() + " " + master[4].toString());
				else
					indentSaleMaster.setIndentSaleNarration((""));

				if (master[5] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
					String str[] = master[5].toString().split(" ");
					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
					indentSaleMaster.setIndentSaleDocNo(stringBuffer.toString());

				} else
					indentSaleMaster.setIndentSaleDocNo((""));

				if (master[6] != null)
					indentSaleMaster.setIndentSaleNetAmt(Double.parseDouble((master[6].toString())));
				else
					indentSaleMaster.setIndentSaleNetAmt(0.0);

			}
		} catch (Exception e) {
			e.printStackTrace();
			return indentSaleMaster;
		}
		return indentSaleMaster;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IndentSaleMaster> getIndentSaleByPatientId(Integer patientId) {

		List<IndentSaleMaster> indentSaleMasters = new ArrayList<IndentSaleMaster>();

		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select     master.indent_sale_id,    indent.indent_id,    p.f_name,    p.m_name,    p.l_name,    master.indent_sale_received_date,    master.indent_sale_net_amt from    pharma_indent_sale_master master        inner join    pharma_indent_master indent ON indent.indent_id = master.indent_sale_indent_no        inner join    ehat_treatment t ON t.treatment_id = indent.indent_treatement_id        inner join    ehat_patient p ON p.patient_id = t.patient_id where    master.indent_sale_delete_flag = 0        and p.patient_id ="
							+ patientId);
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				IndentSaleMaster indentSaleMaster = new IndentSaleMaster();
				indentSaleMaster.setIndentSalelId(Integer.parseInt(master[0].toString()));

				IndentMaster indentMaster = new IndentMaster();
				indentMaster.setIndentId(Integer.parseInt(master[1].toString()));
				indentSaleMaster.setIndentMaster(indentMaster);

				if (master[2] != null)
					indentSaleMaster.setIndentSaleNarration((master[2].toString()));
				else
					indentSaleMaster.setIndentSaleNarration((""));

				if (master[3] != null && master[2] != null)
					indentSaleMaster.setIndentSaleNarration(master[2].toString() + " " + master[3].toString());
				else
					indentSaleMaster.setIndentSaleNarration((""));

				if (master[4] != null && master[3] != null && master[2] != null)
					indentSaleMaster.setIndentSaleNarration(
							master[2].toString() + " " + master[3].toString() + " " + master[4].toString());
				else
					indentSaleMaster.setIndentSaleNarration((""));

				if (master[5] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
					String str[] = master[5].toString().split(" ");
					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
					indentSaleMaster.setIndentSaleDocNo(stringBuffer.toString());

				} else
					indentSaleMaster.setIndentSaleDocNo((""));

				if (master[6] != null)
					indentSaleMaster.setIndentSaleNetAmt(Double.parseDouble(master[6].toString()));
				else
					indentSaleMaster.setIndentSaleNetAmt(0.0);

				indentSaleMasters.add(indentSaleMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return indentSaleMasters;
		}
		return indentSaleMasters;
	}

	@Override
	public String getPatientDetailsByTreatmentId(Integer indentTreatmentId) {
		StringBuffer stringBuffer = null;
		try {

			/*
			 * String UnionQuery =
			 * "select distinct fName,mname,lName,m.indent_received_from from patient p inner join "
			 * +
			 * "treatment t on t.Patient_ID=p.Patient_ID inner join pharma_indent_master m on m.indent_treatement_id=t.Treatment_ID"
			 * + " where t.Treatment_ID="+ indentTreatmentId +" " +
			 * "union select distinct fName,mname,lName,m.indent_received_from from patient p inner join "
			 * +
			 * "treatment t on t.Patient_ID=p.Patient_ID inner join pharma_indent_master m on m.indent_treatement_id=t.Treatment_ID"
			 * + " where t.Treatment_ID="+
			 * indentTreatmentId+" and m.indent_received_from='OT'";
			 */

			String StrQuery = "select distinct prefix, f_Name,m_name,l_Name from ehat_patient p inner join "
					+ "ehat_treatment t on t.patient_id = p.patient_id inner join pharma_indent_master m on m.indent_treatement_id=t.treatment_id "
					+ " where t.treatment_id=" + indentTreatmentId + " limit 1";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(StrQuery);

			List<Object[]> rows = query.list();

			// String patientWardQuery="select distinct h.Hname,ht.hall_type_name from
			// patient p,treatment t,treatment_beds b,hall_type ht,hall h,beds bd where
			// p.Patient_ID = t.Patient_ID and p.status = 'Y' and b.Bed_ID = bd.Bed_ID and
			// bd.Hall_ID = h.Hall_ID and h.Htype = ht.idhall_type and b.Treatment_ID =
			// t.Treatment_ID and t.TFlag = 'ACTIVE' AND t.Treatment_ID =
			// '"+indentTreatmentId+"'";
			String patientWardQuery1 = "SELECT DISTINCT h.Hname,ht.hall_type_name FROM ehat_patient p,ehat_treatment t,treatment_beds b, hall_type ht,  hall h,beds bd WHERE p.patient_id = t.patient_id	AND p.deleted = 'N'	AND b.Bed_ID = bd.Bed_ID AND bd.Hall_ID = h.Hall_ID AND h.Htype = ht.idhall_type  AND b.Treatment_ID = t.treatment_id	AND t.t_flag = 'Y'AND t.treatment_id ='"
					+ indentTreatmentId + "'";
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(patientWardQuery1);
			List<Object[]> rows1 = query1.list();

			for (Object[] objects : rows) {
				stringBuffer = new StringBuffer();
				if (objects[0] != null)
					stringBuffer.append(" " + objects[0]);
			
				if (objects[1] != null)
					stringBuffer.append(" " + objects[1]);

				if (objects[2] != null)
					stringBuffer.append(" " + objects[2]);

				if (objects[3] != null)
					stringBuffer.append(" " + objects[3]);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return stringBuffer.toString();
	}

	@Override
	public Boolean deleteIndent(Integer indentId, String type, Integer userId, String ip) {

		String stringQuery = "";

		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time = dateFormat1.format(cal.getTime());

		Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = dateFormat.format(currentDate.getTime());

		if (type.equals("indentSale")) {
			stringQuery = "update pharma_indent_sale_master set  indent_sale_delete_flag=1 where indent_sale_id="
					+ indentId;
			updatePatientBalanceAfterDelete(indentId);
		} else {
			stringQuery = "update pharma_indent_master set indent_delete_flag = '1' , indent_deleted_by='" + userId
					+ "', indent_sale_ip='" + ip + "', indent_sale_deleted_time='" + time + "', indent_delete_date='"
					+ date + "' where indent_id=" + indentId;
		}
		try {
			org.hibernate.Query query = sessionFactory.getCurrentSession().createSQLQuery(stringQuery);
			int rowDeleted = query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}

	public Boolean updatePatientBalanceAfterDelete(Integer indentId) {

		try {
			SQLQuery queryTreatmentId = sessionFactory.getCurrentSession().createSQLQuery(
					"select indent_treatement_id from pharma_indent_master master inner join pharma_indent_sale_master s_mast on s_mast.indent_sale_indent_no=master.indent_id where s_mast.indent_sale_id='"
							+ indentId + "'");
			int treatmentId = (Integer) queryTreatmentId.uniqueResult();

			Double patientBalance = 0.0;
			SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT amount_balance FROM pharma_indent_amount_details where treatment_id=" + treatmentId + " ");
			patientBalance = (Double) query2.uniqueResult();

			Double netAmount = 0.0;
			SQLQuery queryNetAmount = sessionFactory.getCurrentSession().createSQLQuery(
					"select indent_sale_net_amt from pharma_indent_sale_master master where master.indent_sale_id='"
							+ indentId + "'");
			netAmount = (Double) queryNetAmount.uniqueResult();

			Double amount = patientBalance - netAmount;

			DecimalFormat df = new DecimalFormat("###.##");

			Double total = Double.parseDouble(df.format(amount));

			String updatePatientBalance = "";
			updatePatientBalance = "update pharma_indent_amount_details set  amount_balance=" + total
					+ " where treatment_id=" + treatmentId;
			SQLQuery queryUpdateBalance = sessionFactory.getCurrentSession().createSQLQuery(updatePatientBalance);
			queryUpdateBalance.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return true;

	}

	@Override
	public List<IndentMaster> getPendingIndentDetails() {
		List<IndentMaster> ltCounterSaleMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IndentMaster.class);
			criteria.add(Restrictions.eq("indentDeleteFlag", 0));
			criteria.add(Restrictions.ne("indentStatus", "received"));
			criteria.addOrder(Order.desc("indentId"));
			ltCounterSaleMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();

		}

		return ltCounterSaleMasters;
	}

	@Override
	public List<IndentMasterResult> getPendingIndentDetailsForMaster() {
		List<IndentMasterResult> ltCounterSaleMasters = new ArrayList<IndentMasterResult>();
		try {
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
					"select indent.indent_id,indent.indent_add_date,indent.indent_delete_flag,indent.indent_generate_date,indent.indent_received_from, "
							+ " indent.indent_status,indent.indent_store_id,indent.indent_time,indent.indent_treatement_id,sum(slave.indent_slave_require_qty) from "
							+ " pharma_indent_master indent inner join pharma_indent_slave slave on slave.indent_slave_master_id=indent.indent_id where "
							+ " indent.indent_delete_flag = 0 and indent.indent_status != 'received' group by indent.indent_id order by indent.indent_id desc ;");
			List<Object[]> result = query1.list();

			for (Object[] master : result) {
				IndentMasterResult indent = new IndentMasterResult();

				if (master[0] != null) {
					indent.setIndentId(Integer.parseInt(master[0].toString()));
				}

				if (master[1] != null) {
					indent.setIndentDate(master[1].toString());
				}

				if (master[2] != null) {
					indent.setIndentDeleteFlag(Integer.parseInt(master[2].toString()));
				}

				if (master[3] != null) {
					indent.setIndentGenerateDate((master[3].toString()));
				}

				if (master[4] != null) {
					indent.setIndentReceivedFrom(master[4].toString());
				}

				if (master[5] != null) {
					indent.setIndentStatus((master[5].toString()));
				}
				if (master[6] != null) {
					indent.setIndentStoreName((master[6].toString()));
				}
				if (master[6] != null) {
					indent.setIndentStoretId(Integer.parseInt(master[6].toString()));
				}
				if (master[7] != null) {
					indent.setIndentTime((master[7].toString()));
				}
				if (master[8] != null) {
					indent.setIndentTreatmentId(Integer.parseInt(master[8].toString()));
				}
				if (master[9] != null) {
					indent.setQty((master[9].toString()));
				}
				ltCounterSaleMasters.add(indent);
			}

		} catch (Exception e) {
			System.out.println(e);
		}
		return ltCounterSaleMasters;
	}

	@Override
	public List<IndentSaleMaster> getAutoSuggestionIndentNames(Integer letter) {
		/*
		 * List<IndentSaleMaster> indentSaleMasters = null; try { Criteria criteria =
		 * sessionFactory.getCurrentSession() .createCriteria(IndentSaleMaster.class);
		 * criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0));
		 * criteria.add(Restrictions.like("indentMaster.indentId", letter));
		 * 
		 * indentSaleMasters = criteria.list();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); return indentSaleMasters; }
		 * return indentSaleMasters;
		 */
		List<IndentSaleMaster> indentSaleMasters = new ArrayList<IndentSaleMaster>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IndentSaleMaster.class);
			criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0));
			criteria.add(Restrictions.like("indentMaster.indentId", letter));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("indentSalelId"));
			proList.add(Projections.property("indentMaster.indentId"));

			criteria.setProjection(proList);
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {

				IndentSaleMaster indentSaleMaster = new IndentSaleMaster();
				if (master[0] != null)
					indentSaleMaster.setIndentSalelId(Integer.parseInt(master[0].toString()));
				else
					indentSaleMaster.setIndentSalelId(0);

				IndentMaster indentMaster = new IndentMaster();

				if (master[1] != null)
					indentMaster.setIndentId(Integer.parseInt(master[1].toString()));
				else
					indentMaster.setIndentId(0);

				indentSaleMaster.setIndentMaster(indentMaster);

				indentSaleMasters.add(indentSaleMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return indentSaleMasters;
		}
		return indentSaleMasters;

	}

	@Override
	public int getTreatmentId(int indentNo) {
		int treatmentId = 0;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IndentMaster.class);
			/* criteria.add(Restrictions.eq("indentDeleteFlag", 0)); */
			criteria.add(Restrictions.like("indentId", indentNo));

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("indentTreatmentId"));

			criteria.setProjection(proList);
			Object result = criteria.uniqueResult();

			if (result != null) {
				treatmentId = Integer.parseInt(result.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return treatmentId;
	}

	@Override
	public void setPendingBalance(int treatmentId, Double indentSaleAmountBalance) {
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select treatment_id from pharma_indent_amount_details where treatment_id='" + treatmentId + "' ");
		Object rows = (Object) query1.uniqueResult();
		DecimalFormat df = new DecimalFormat("###.###");
		Double indentSaleAmountBal = Double.parseDouble(df.format(indentSaleAmountBalance));

		indentSaleAmountBal = indentSaleAmountBal < 0 ? (indentSaleAmountBal * -1) : indentSaleAmountBal;

		if (rows == null) {
			try {
				org.hibernate.Query query = sessionFactory.getCurrentSession()
						.createSQLQuery("insert into pharma_indent_amount_details(treatment_id,amount_balance) values("
								+ treatmentId + "," + indentSaleAmountBal + ")");
				int rowDeleted = query.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
			}

		} else {
			try {
				org.hibernate.Query query = sessionFactory.getCurrentSession()
						.createSQLQuery("update pharma_indent_amount_details set  amount_balance='"
								+ indentSaleAmountBal + "' where treatment_id=" + treatmentId);
				int rowDeleted = query.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public Double getPendingAmount(Integer indentNo) {
		int treatmentId = getTreatmentId(indentNo);
		Double amount = 0.0;
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select    sum(s.indent_sale_net_amt - s.indent_sale_amt_receive) - ifnull(sum(c.credit_note_slave_amt), 0) - (select            ifnull(sum(amount_receive), 0)        from            pharma_indent_amount_details        where            treatment_id = '"
						+ treatmentId
						+ "') from    pharma_indent_sale_master s        inner join    pharma_indent_master m ON m.indent_id = s.indent_sale_indent_no        left join    pharma_credit_note_slave c ON c.credit_note_slave_indent_id = s.indent_sale_id where    m.indent_treatement_id ="
						+ treatmentId);
		Object rows = (Object) query1.uniqueResult();
		if (rows != null)
			amount = Double.parseDouble(rows.toString());
		else
			amount = 0.0;

		return amount;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<IndentSale> getAllPatientData() {
		List<IndentSale> indentSales = new ArrayList<IndentSale>();
		try {
			SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT * FROM patient_records_details where treatment_id in (SELECT treatment_id FROM pharma_indent_amount_details where amount_balance> 0)");
			List<Object[]> rows = query2.list();
			for (Object[] master : rows) {
				IndentSale indentSale = new IndentSale();
				if (master[13] != null)
					indentSale.setPatientName(master[13].toString());

				/*
				 * if (master[13] != null) indentSale.setPatientName(master[13].toString());
				 */

				if (master[14] != null)
					indentSale.setPatientMobileNumber(master[14].toString());

				if (master[3] != null)
					indentSale.setTreatmentId(master[3].toString());

				indentSales.add(indentSale);
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return indentSales;
	}

	@Override
	public List<IndentSaleMaster> getAllIndentDataByTreatmentId(Integer treatmentId) {
		List<IndentSaleMaster> indentSales = new ArrayList<IndentSaleMaster>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery("SELECT  indent.indent_generate_date, s_m.indent_sale_received_date, indent.indent_status, s_m.indent_sale_net_amt,IFNULL(s_m.indent_sale_amt_receive,'0') AS indent_sale_amt_receive ,IFNULL(s_m.indent_sale_amt_balance,'0') AS indent_sale_amt_balance , s_m.indent_sale_id AS indentSalelId,IFNULL(amt_his.idpharma_indent_amount_history_id,'0') AS historyId, IFNULL(amt_his.amount_receive,'0') AS amountReceive,IFNULL(amt_his.amount_balance,'0') AS amountBal,IFNULL(amt_his.discount,'0') AS discount ,s_m.paid_flag as paidFlag  FROM pharma_indent_master indent INNER JOIN pharma_indent_sale_master s_m ON s_m.indent_sale_indent_no = indent.indent_id LEFT JOIN pharma_indent_amount_history amt_his ON amt_his.indent_sale_master_id = s_m.indent_sale_id WHERE s_m.paid_flag='N' and indent.indent_treatement_id = '"+treatmentId + "' ");
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				IndentSaleMaster indentSaleMaster = new IndentSaleMaster();
				IndentMaster indentSale = new IndentMaster();
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				if (master[0] != null) {
					java.util.Date date = dateFormat.parse(master[0].toString());
					indentSale.setIndentGenerateDate(date);
				}

				if (master[1] != null) {
					java.util.Date date = dateFormat.parse(master[1].toString());
					indentSaleMaster.setIndentSaleReceivedDate(date);
				}

				if (master[2] != null)
					indentSale.setIndentStatus(master[2].toString());

				if (master[3] != null)
					indentSaleMaster.setIndentSaleNetAmt(Double.parseDouble(master[3].toString()));

				if (master[4] != null)
					indentSaleMaster.setIndentSaleAmountReceive(Double.parseDouble(master[4].toString()));

				if (master[5] != null)
					indentSaleMaster.setIndentSaleAmountBalance(Double.parseDouble(master[5].toString()));
				
				if (master[6] != null)
					indentSaleMaster.setIndentSalelId(Integer.parseInt(master[6].toString()));
			
				if (master[7] != null)
					indentSaleMaster.setHistoryId(Integer.parseInt(master[7].toString()));
				
				if (master[8] != null)
					indentSaleMaster.setAmountReceive(Double.parseDouble(master[8].toString()));
				
				if (master[9] != null)
					indentSaleMaster.setAmountBal(Double.parseDouble(master[9].toString()));
				
				if (master[10] != null)
					indentSaleMaster.setDiscount(Double.parseDouble(master[10].toString()));
				
				if (master[11] != null)
					indentSaleMaster.setPaidFlag(master[11].toString());
				
				indentSaleMaster.setIndentMaster(indentSale);
				indentSales.add(indentSaleMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return indentSales;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getPendingAmountByTreatmentId(Integer treatmentId, Integer spId) {

		String amount = "";

		double patientPaid = 0.0;
		double pharmaPaid = 0.0;
		double pharmaReturn = 0.0;
		String sql3 = "SELECT ifnull(amount_receive,0) as amount_receive,ifnull(hsp_return_flag,'-') as hsp_return_flag FROM pharma_indent_amount_history where treatment_id="
				+ treatmentId;
		Query query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
		query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> list = query3.list();
		if (list.size() > 0) {

			for (Map<String, Object> row : list) {

				String hsp_flag = (String) row.get("hsp_return_flag");
				if (hsp_flag.equals("Y")) {

					pharmaPaid = pharmaPaid + (Double) row.get("amount_receive");
				} else {

					patientPaid = patientPaid + (Double) row.get("amount_receive");
				}
			}
		}

		String sqlRef = "select ifnull(sum(credit_note_net_amt), 0) from pharma_credit_note_master where credit_note_transaction_type=1 and credit_note_type='indentSale' and credit_note_treatmentId="
				+ treatmentId;
		Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
		pharmaReturn = (Double) refQuery.uniqueResult();

		String str = "select ifnull(sum(s.indent_sale_net_amt - s.indent_sale_amt_receive),0), ifnull(sum(s.indent_sale_net_amt),0) from    pharma_indent_sale_master s        inner join    pharma_indent_master m ON m.indent_id = s.indent_sale_indent_no        left join    pharma_credit_note_slave c ON c.credit_note_slave_indent_id = s.indent_sale_id where "
				+ " indent_billing='N' and  m.indent_treatement_id ='"
				+ treatmentId + "' and s.bill_Category_id='" + (spId == null ? 0 : spId) + "'";

		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(str);
		List<Object[]> rows = query1.list();
		for (Object[] o : rows) {

			double res = (((Double) o[0]) - patientPaid) + pharmaPaid;
			res = res - pharmaReturn;

			amount = ((o[0] == null) ? "0#" : "" + res + "#") + ((o[1] == null) ? "0" : "" + o[1]);
		}

		return amount;

		/*
		 * String amount = ""; String sql=""; Double totAmt = 0.0; Double pendingAmt =
		 * 0.0; Double returnAmt = 0.0; Double receiveAmt = 0.0;
		 * 
		 * sql =
		 * "SELECT pharma_indent_sale_master.indent_sale_id,pharma_indent_sale_master.indent_sale_received_date,pharma_indent_sale_master.indent_sale_gross_amt,pharma_indent_sale_master.indent_sale_amt_receive "
		 * + "FROM pharma_indent_master INNER JOIN pharma_indent_sale_master " +
		 * "ON pharma_indent_master.indent_id = pharma_indent_sale_master.indent_sale_indent_no where bill_Category_id="
		 * +spId+" and pharma_indent_master.indent_treatement_id = "+treatmentId;
		 * 
		 * SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 * 
		 * @SuppressWarnings("unchecked") List<Map<String, Object>> data = query.list();
		 * 
		 * for(Map<String, Object> row : data){
		 * 
		 * int invId = (Integer)row.get("indent_sale_id"); totAmt = totAmt +
		 * (Double)row.get("indent_sale_gross_amt"); receiveAmt = receiveAmt +
		 * (Double)row.get("indent_sale_amt_receive");
		 * 
		 * sql =
		 * "SELECT ifnull(sum(credit_note_slave_amt),0) FROM pharma_credit_note_slave where credit_note_slave_indent_id="
		 * +invId; Query spQuery =
		 * sessionFactory.getCurrentSession().createSQLQuery(sql); returnAmt = returnAmt
		 * + (Double) spQuery.uniqueResult(); } pendingAmt = (totAmt - receiveAmt) -
		 * returnAmt; if(pendingAmt < 0){
		 * 
		 * pendingAmt = 0.0; }
		 * 
		 * sql =
		 * "select ifnull(sum(amount_receive),0) from pharma_indent_amount_history where treatment_id ="
		 * +treatmentId; Query billRecQuery =
		 * sessionFactory.getCurrentSession().createSQLQuery(sql); double billReceiveAmt
		 * = (Double) billRecQuery.uniqueResult();
		 * 
		 * if(pendingAmt < 0){
		 * 
		 * pendingAmt = pendingAmt + billReceiveAmt; }else{
		 * 
		 * pendingAmt = pendingAmt - billReceiveAmt; }
		 * 
		 * receiveAmt = receiveAmt + billReceiveAmt;
		 * 
		 * amount = (pendingAmt == null) ? "0#" : "" + ((pendingAmt)+"#") + ((receiveAmt
		 * == null) ? "0" : "" + receiveAmt);
		 * 
		 * return amount;
		 */
	}

	@Override
	public Double getTotalDiscountOnBillByTreatmentId(Integer treatmentId) {
		Double totaldiscount = 0.0;
		String sql = "SELECT SUM(indent_sale_less) totaldisc from pharma_indent_master pim "
				+ "INNER JOIN pharma_indent_sale_master pism ON pim.indent_id = pism.indent_sale_indent_no "
				+ "where pim.indent_treatement_id=" + treatmentId + " and pism.indent_sale_delete_flag = 0";
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
		Object rows = (Object) query1.uniqueResult();
		if (rows != null)
			totaldiscount = Double.parseDouble(rows.toString());

		// suraj code for settle bill discount

		String settleBillDiscount = "select sum(discount) from pharma_indent_amount_history where treatment_id='"
				+ treatmentId + "'";
		SQLQuery settleBillDiscountQuery = sessionFactory.getCurrentSession().createSQLQuery(settleBillDiscount);
		Object settleBillDiscountTotal = (Object) settleBillDiscountQuery.uniqueResult();
		if (settleBillDiscountTotal != null)
			totaldiscount = totaldiscount + Double.parseDouble(settleBillDiscountTotal.toString());

		// suraj code for credit note discount

		String creditNoteDiscount = "SELECT SUM(credit_note_less) totaldisc from pharma_credit_note_master c_m where c_m.credit_note_treatmentId = '"
				+ treatmentId + "' and c_m.credit_note_delete_flag = 0 and c_m.credit_note_type = 'indentSale'";
		SQLQuery creditNoteDiscountQuery = sessionFactory.getCurrentSession().createSQLQuery(creditNoteDiscount);
		Object creditNoteDiscountQueryRes = (Object) creditNoteDiscountQuery.uniqueResult();
		if (creditNoteDiscountQueryRes != null)
			totaldiscount = totaldiscount - Double.parseDouble(creditNoteDiscountQueryRes.toString());

		return totaldiscount;
	}

	@Override
	public boolean saveIndentPendingAmount(Integer treatmentId, Double amountReceive, Double discount, String narration,
			Double amountBalance, String listStr) {
		
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select treatment_id from pharma_indent_amount_details where treatment_id='" + treatmentId + "' ");
		Object rows = (Object) query1.uniqueResult();
		DecimalFormat df = new DecimalFormat("##.###");
		Double amountBal = Double.parseDouble(df.format(amountBalance));

		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time = dateFormat1.format(cal.getTime());
		

		if (rows != null) {
			try {
				pharmaIndentAmountHistory obj = (pharmaIndentAmountHistory) ConfigUIJSONUtility.getObjectFromJSON(listStr,pharmaIndentAmountHistory.class);
				List<pharmaIndentAmountHistory> slaveList = obj.getLstPharmaIndentAmountHistory();

				Double amountBalanceNew = slaveList.get(0).getAmountBalance();
				
				if(amountBalanceNew==0) {
					String squery="update pharma_indent_sale_master set paid_flag='Y' where indent_sale_id='"+slaveList.get(0).getIndentSaleBillMasterId()+"' ";
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(squery);
					query.executeUpdate();
				}


				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
				String date = simpleDateFormat.format(new Date());
				for(pharmaIndentAmountHistory rs: slaveList)
				{
					rs.setFinalDate(date);
					sessionFactory.getCurrentSession().merge(rs);
				}

			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return true;
	}

	@Override
	public boolean saveIndentComment(Integer treatmentId, String narration, Integer userId, String ipaddress) {

		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time = dateFormat1.format(cal.getTime());

		Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = dateFormat.format(currentDate.getTime());

		try {
			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("update pharma_indent_master set indent_delete_flag = '1', indent_comment='"
							+ narration + "', indent_deleted_by='" + userId + "', indent_sale_ip='" + ipaddress
							+ "', indent_sale_deleted_time='" + time + "', indent_delete_date='" + date
							+ "'  where indent_id = " + treatmentId + "");
			int rowDeleted = query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return true;
	}

	@Override
	public FinalIndent getFinalBillDetails(Integer treatmentId) {

		List<FinalIndent> finalIndents = new ArrayList<FinalIndent>();
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				" SELECT amount_balance,amount_receive,discount,narration,final_date,treatment_id,idpharma_indent_amount_history_id "
						+ " FROM pharma_indent_amount_history where idpharma_indent_amount_history_id =' " + treatmentId
						+ "' ");
		List<Object[]> rows = query1.list();
		for (Object[] master : rows) {

			FinalIndent finalIndent = new FinalIndent();

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

			if (master[0] != null) {
				finalIndent.setBalance(master[0].toString());
			}

			if (master[1] != null) {
				finalIndent.setAmountReceive(master[1].toString());
			}

			if (master[2] != null) {
				finalIndent.setDiscount(master[2].toString());
			}

			if (master[3] != null)
				finalIndent.setNarration(master[3].toString());

			if (master[4] != null)
				finalIndent.setDate(master[4].toString());

			if (master[5] != null)
				finalIndent.setTreatmentId(master[5].toString());

			if (master[6] != null)
				finalIndent.setHistoryId(master[6].toString());

			finalIndents.add(finalIndent);
		}
		return finalIndents.get(0);
	}

	@Override
	public FinalIndent getFinalBillDetailsForSave(Integer treatmentId) {

		List<FinalIndent> finalIndents = new ArrayList<FinalIndent>();
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				" SELECT amount_balance,amount_receive,discount,narration,final_date,treatment_id,idpharma_indent_amount_history_id FROM pharma_indent_amount_history "
						+ " where treatment_id='" + treatmentId
						+ "' order by idpharma_indent_amount_history_id desc limit 1 ");

		List<Object[]> rows = query1.list();
		for (Object[] master : rows) {

			FinalIndent finalIndent = new FinalIndent();

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

			if (master[0] != null) {
				finalIndent.setBalance(master[0].toString());
			}

			if (master[1] != null) {
				finalIndent.setAmountReceive(master[1].toString());
			}

			if (master[2] != null) {
				finalIndent.setDiscount(master[2].toString());
			}

			if (master[3] != null)
				finalIndent.setNarration(master[3].toString());

			if (master[4] != null)
				finalIndent.setDate(master[4].toString());

			if (master[5] != null)
				finalIndent.setTreatmentId(master[5].toString());

			if (master[6] != null)
				finalIndent.setHistoryId(master[6].toString());

			finalIndents.add(finalIndent);
		}
		return finalIndents.get(0);
	}

	@Override
	public List<CreditNoteIndent> getAllIndentProductDataByTreatmentId(Integer treatmentId) {
		List<CreditNoteIndent> creditNoteIndents = new ArrayList<CreditNoteIndent>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					" select distinct s_m.indent_sale_received_date,s_m.indent_sale_net_amt,slave.indent_sale_slave_product_id,s_m.indent_sale_id,product.product_name,slave.indent_sale_slave_issue_qty, "
							+ " slave.indent_sale_slave_rate,slave.indent_sale_slave_BatchId,batch.batch_code,slave.indent_sale_slave_id,product.product_uom_unit, pack.pack_type, batch.batch_exp_date, "
							+ " pur_rate.rate,pur_rate.mrp,slave.indent_slave_vat,slave.indent_slave_Dis as disc,p.patient_id,slave.indent_sale_slave_mrp,indent_sale_type,pur_rate.pur_rate from pharma_indent_master indent inner join pharma_indent_sale_master s_m ON s_m.indent_sale_indent_no = indent.indent_id "
							+ " inner join pharma_indent_sale_slave slave ON s_m.indent_sale_id = slave.indent_sale_slave_master_id inner join pharma_product_master product ON product.product_id = slave.indent_sale_slave_product_id "
							+ " inner join pharma_batch_master batch ON batch.batch_id = slave.indent_sale_slave_BatchId  inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id "
							+ " inner join pharma_purchase_rate pur_rate ON pur_rate.batch_id = batch.batch_id inner join ehat_treatment t ON t.treatment_id = indent.indent_treatement_id        inner join    ehat_patient p ON p.patient_id = t.patient_id "
							+ " where s_m.indent_sale_id = '" + treatmentId
							+ "' and slave.indent_sale_slave_issue_qty!=0");

			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				CreditNoteIndent creditNoteIndent = new CreditNoteIndent();
				/* IndentMaster indentSale = new IndentMaster(); */
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				if (master[0] != null) {
					java.util.Date date = dateFormat.parse(master[0].toString());
					creditNoteIndent.setIndentDate(master[0].toString());
				}

				if (master[1] != null) {
					creditNoteIndent.setNetAmount(master[1].toString());
				}

				if (master[2] != null)
					creditNoteIndent.setProductId(master[2].toString());

				if (master[3] != null)
					creditNoteIndent.setIndentId(master[3].toString());

				if (master[4] != null)
					creditNoteIndent.setProductName(master[4].toString());

				if (master[5] != null)
					creditNoteIndent.setQty(master[5].toString());

				if (master[6] != null)
					creditNoteIndent.setRate(master[6].toString());

				if (master[7] != null)
					creditNoteIndent.setBatchId(master[7].toString());

				if (master[8] != null)
					creditNoteIndent.setBatchCode(master[8].toString());

				if (master[9] != null)
					creditNoteIndent.setIndentSlaveId(master[9].toString());

				if (master[10] != null)
					creditNoteIndent.setUnit(master[10].toString());

				if (master[11] != null)
					creditNoteIndent.setPack(master[11].toString());

				if (master[12] != null)
					creditNoteIndent.setBatchExpiry(master[12].toString());

				if (master[13] != null)
					creditNoteIndent.setBatchRate(master[13].toString());

				if (master[15] != null)
					creditNoteIndent.setVat(master[15].toString());

				if (master[16] != null)
					creditNoteIndent.setDiscAmt(master[16].toString());

				if (master[17] != null)
					creditNoteIndent.setPatientId(master[17].toString());

				if (master[18] != null)
					creditNoteIndent.setMrp(master[18].toString());

				if (master[19] != null)
					creditNoteIndent.setSaleType(master[19].toString());

				if (master[20] != null)
					creditNoteIndent.setPurRate(master[20].toString());

				creditNoteIndents.add(creditNoteIndent);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return creditNoteIndents;
	}

	@Override
	public void saveIpdBillDetails(IndentSaleMaster indentSaleMaster) {

		int treatmentId = getTreatmentId(indentSaleMaster.getIndentMaster().getIndentId());

		SQLQuery query1 = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT bill_id FROM ehat_bill_master where treatment_id='" + treatmentId + "' ");
		int billId = (Integer) query1.uniqueResult();

		SQLQuery query3 = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT patient_id FROM ehat_bill_master where treatment_id='" + treatmentId + "' ");
		int patientId = (Integer) query3.uniqueResult();

		SQLQuery query2 = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT count(*) FROM ehat_bill_details_ipd where bill_id='" + billId + "'");
		SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT source_type_id FROM ehat_bill_master where treatment_id='" + treatmentId + "' ");
		int sponserID = (Integer) query4.uniqueResult();

		SQLQuery query5 = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id='" + treatmentId + "' ");
		int chargesMasterID = (Integer) query5.uniqueResult();

		Object rows1 = (Object) query2.uniqueResult();
		int count = Integer.parseInt(rows1.toString());
		String amtRecFlag = "N";
		if (count == 0) {
			org.hibernate.Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"insert into ipdbill_pharmacy_indent_master(bill_id,status) values(" + rows1 + ",'y')");
			int rowDeleted = query.executeUpdate();

			org.hibernate.Query masterId = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT idipdbill_pharmacy_indent_master FROM ipdbill_pharmacy_indent_master order by idipdbill_pharmacy_indent_master desc limit 1");
			Object masterId11 = (Object) masterId.uniqueResult();
			int masterId1 = Integer.parseInt(masterId11.toString());

			int productId = 0;
			int batchId = 0;
			int indentId = 0;
			int qty = 0;
			Double rate = 0.0;
			Double amount = 0.0;
			Double discount = 0.0;
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
			String date = simpleDateFormat.format(new Date());

			for (int i = 0; i < indentSaleMaster.getIndentSaleSlaves().size(); i++) {
				productId = indentSaleMaster.getIndentSaleSlaves().get(i).getProductMaster().getProductId();
				batchId = indentSaleMaster.getIndentSaleSlaves().get(i).getProductMaster().getBatchMaster().get(0)
						.getBatchId();
				indentId = indentSaleMaster.getIndentSalelId();
				qty = indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSaleSlaveQty();
				rate = indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveRatePerUnit();
				amount = indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSaleSlaveAmt();
				discount = indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveDisAmt();
				double amt = rate * qty;

				amtRecFlag = indentSaleMaster.getIndentSaleSlaves().get(i).getAmtReceiveFlag();
				try {
					Double pay = 0.0;
					String type = "indent";
					Double coPay = 0.0;
					/******************** for sponsor patient ****************/
					String discountsql = " select sp_dic_master_id from treatment where Treatment_ID='" + treatmentId
							+ "'";
					SQLQuery sponsorQuery = sessionFactory.getCurrentSession().createSQLQuery(discountsql);
					Integer sponsorid = (Integer) sponsorQuery.uniqueResult();

					if (sponsorid > 0) {
						pay = amount;
						coPay = 0.0;
					} else {
						pay = 0.0;
						coPay = amount;
					}

					org.hibernate.Query slave = sessionFactory.getCurrentSession().createSQLQuery(
							"insert into ipdbill_pharmacy_indent_slave(idipdbill_pharmacy_indent_master,product_id,batch_id,"
									+ "rate,quantity,date,net_amount,indent_id,pay,co_pay,discount,type) values("
									+ masterId1 + "," + productId + "," + batchId + "," + rate + "," + qty + ",'" + date
									+ "'," + amount + "," + indentId + "," + pay + "," + coPay + "," + discount + ",'"
									+ type + "');");
					slave.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}

				if (amtRecFlag.equals("N")) {
					BillDetailsIpdDto billDetails = new BillDetailsIpdDto();
					billDetails.setAmount(amt);
					billDetails.setBillId(billId);
					billDetails.setCoPay(amt - discount);
					billDetails.setConcession(indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveDisAmt());
					billDetails.setConcessionPer(indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveDis());
					billDetails
							.setOtherConcession(indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveDisAmt());
					billDetails.setCreatedDateTime(new Date(new java.util.Date().getTime()));

					billDetails.setDeleted("N");
					billDetails.setCreatedBy(indentSaleMaster.getIndentSaleUserId());
					billDetails.setDepartmentId(2);
					billDetails.setDiscount(0.0);
					billDetails.setDoctorId(0);
					billDetails.setInstructions("-");
					billDetails.setPatienttId(patientId);
					billDetails.setPay(amt);
					billDetails.setQuantity(qty);
					billDetails.setRate(rate);
					billDetails.setServiceId(Pharmacy);
					billDetails.setSourceTypeId(0);
					billDetails.setSponsorCatId(sponserID);
					billDetails.setSubServiceId(productId);
					billDetails.setTreatmentId(treatmentId);
					billDetails.setUnitId(indentSaleMaster.getUnitId());
					billDetails.setUrgentFlag("N");
					billDetails.setCancle("N");
					billDetails.setOt_flag("N");
					billDetails.setPaidFlag("N");
					billDetails.setInvoiceFlag("N");
					billDetails.setDrdeskflag("P");
					billDetails.setCountot(0);
					billDetails.setChargesSlaveId(chargesMasterID);
					billDetails.setOtherAmount(amt);
					billDetails.setOtherCoPay(amt);
					// billDetails.setOtherConcession(0);
					billDetails.setPay(amt);
					billDetails.setOtherPay(amt - discount);
					billDetails.setOtherRate(rate);
					billDetails.setOtprocedure("-");

					// Save Master list
					sessionFactory.getCurrentSession().merge(billDetails);
				}

			}
		}

		else {
			SQLQuery editQuery = sessionFactory.getCurrentSession().createSQLQuery(
					"select idipdbill_pharmacy_indent_master from ipdbill_pharmacy_indent_master where bill_id="
							+ rows1.toString() + "");
			Object editQuery1 = (Object) editQuery.uniqueResult();
			int countBillId = 0;

			int productId = 0;
			int batchId = 0;
			int indentId = 0;
			int qty = 0;
			Double rate = 0.0;
			Double amount = 0.0;
			Double disc = 0.0;
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
			String date = simpleDateFormat.format(new Date());

			for (int i = 0; i < indentSaleMaster.getIndentSaleSlaves().size(); i++) {
				productId = indentSaleMaster.getIndentSaleSlaves().get(i).getProductMaster().getProductId();
				batchId = indentSaleMaster.getIndentSaleSlaves().get(i).getProductMaster().getBatchMaster().get(0)
						.getBatchId();
				indentId = indentSaleMaster.getIndentSalelId();
				qty = indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSaleSlaveQty();
				rate = indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveRatePerUnit();
				amount = indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSaleSlaveAmt();
				disc = indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveDisAmt();
				amtRecFlag = indentSaleMaster.getIndentSaleSlaves().get(i).getAmtReceiveFlag();

				double amt = rate * qty;
				try {
					Double pay = 0.0;
					String type = "indent";
					Double coPay = 0.0;
					/******************** for sponsor patient ****************/
					String discountsql = " select s.charges_master_slave_id from ehat_bill_master s where s.treatment_id='"
							+ treatmentId + "'";
					SQLQuery sponsorQuery = sessionFactory.getCurrentSession().createSQLQuery(discountsql);
					Integer sponsorid = (Integer) sponsorQuery.uniqueResult();

					if (sponsorid > 0) {
						pay = amount;
						coPay = 0.0;
					} else {
						pay = 0.0;
						coPay = amount;
					}

					org.hibernate.Query slave = sessionFactory.getCurrentSession().createSQLQuery(
							"insert into ipdbill_pharmacy_indent_slave(idipdbill_pharmacy_indent_master,product_id,batch_id,rate,quantity,date,net_amount,indent_id,pay,co_pay,discount,type) values("
									+ countBillId + "," + productId + "," + batchId + "," + rate + "," + qty + ",'"
									+ date + "'," + amount + "," + indentId + "," + pay + "," + coPay + "," + disc
									+ ",'" + type + "');");
					int slave1 = slave.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}

				if (amtRecFlag.equals("N")) {
					BillDetailsIpdDto billDetails = new BillDetailsIpdDto();
					billDetails.setAmount(amt);
					billDetails.setBillId(billId);
					billDetails.setCoPay(amt - disc);
					billDetails.setConcession(indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveDisAmt());
					billDetails
							.setOtherConcession(indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveDisAmt());
					billDetails.setConcessionPer(indentSaleMaster.getIndentSaleSlaves().get(i).getIndentSlaveDis());
					billDetails.setCreatedBy(indentSaleMaster.getIndentSaleUserId());
					billDetails.setCreatedDateTime(new Date());
					billDetails.setDeleted("N");
					billDetails.setDeletedDateTime(new Date());
					billDetails.setCreatedBy(1);
					billDetails.setDepartmentId(2);
					billDetails.setDiscount(0.0);
					billDetails.setDoctorId(0);
					billDetails.setInstructions("-");
					billDetails.setPatienttId(patientId);

					billDetails.setQuantity(qty);
					billDetails.setRate(rate);
					billDetails.setServiceId(Pharmacy);
					billDetails.setSourceTypeId(0);
					billDetails.setSponsorCatId(0);
					billDetails.setSubServiceId(productId);
					billDetails.setTreatmentId(treatmentId);
					billDetails.setUnitId(indentSaleMaster.getUnitId());
					billDetails.setUrgentFlag("N");
					billDetails.setCancle("N");
					billDetails.setOt_flag("N");
					billDetails.setPaidFlag("N");
					billDetails.setInvoiceFlag("N");
					billDetails.setDrdeskflag("P");
					billDetails.setCountot(0);
					billDetails.setChargesSlaveId(1);
					billDetails.setOtherAmount(amt);
					billDetails.setOtherCoPay(amt);
					// billDetails.setOtherConcession(0);
					billDetails.setPay(amt);
					billDetails.setOtherPay(amt - disc);
					billDetails.setOtherRate(rate);
					billDetails.setOtprocedure("-");

					// Save Master list
					sessionFactory.getCurrentSession().merge(billDetails);
				}

			}
		}

	}

	@Override
	public List<CreditNoteIndent> getAllIndentReceiptDataByTreatmentId(Integer treatmentId) {
		List<CreditNoteIndent> creditNoteIndents = new ArrayList<CreditNoteIndent>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"select s_m.indent_sale_id from pharma_indent_master indent inner join pharma_indent_sale_master s_m ON s_m.indent_sale_indent_no = indent.indent_id where indent.indent_treatement_id = "
							+ treatmentId + " ");
			List<Object> rows = query.list();

			for (Object master : rows) {
				CreditNoteIndent creditNoteIndent = new CreditNoteIndent();
				/* IndentMaster indentSale = new IndentMaster(); */

				if (master != null)
					creditNoteIndent.setIndentId(master.toString());

				creditNoteIndents.add(creditNoteIndent);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return creditNoteIndents;
	}

	@Override
	public List<settalBillIndent> getAllSettalBillByTreatmentId(Integer treatmentId) {
		List<settalBillIndent> settalBillIndents = new ArrayList<settalBillIndent>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT amount_balance,amount_receive,discount,narration,final_date,treatment_id,idpharma_indent_amount_history_id  "
							+ " FROM pharma_indent_amount_history where Treatment_id =" + treatmentId + " ");
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				settalBillIndent settalBillIndent = new settalBillIndent();
				/* IndentMaster indentSale = new IndentMaster(); */

				if (master[0] != null)
					settalBillIndent.setAmountBal(master[0].toString());
				else
					settalBillIndent.setAmountBal("");

				if (master[1] != null)
					settalBillIndent.setAmountReceive(master[1].toString());
				else
					settalBillIndent.setAmountReceive("");

				if (master[2] != null)
					settalBillIndent.setDiscount(master[2].toString());
				else
					settalBillIndent.setDiscount("");

				if (master[3] != null)
					settalBillIndent.setNarration(master[3].toString());
				else
					settalBillIndent.setNarration("");

				if (master[4] != null)
					settalBillIndent.setFinalAmt(master[4].toString());
				else
					settalBillIndent.setFinalAmt("");

				if (master[5] != null)
					settalBillIndent.setTreatmentId(master[5].toString());
				else
					settalBillIndent.setTreatmentId("");

				if (master[6] != null)
					settalBillIndent.setHistoryId(master[6].toString());
				else
					settalBillIndent.setHistoryId("");

				settalBillIndents.add(settalBillIndent);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return settalBillIndents;
	}

	@Override
	public List<settalBillIndent> getAllSettalBillPatientDataByTreatmentId(Integer patientId) {
		List<settalBillIndent> settalBillIndents = new ArrayList<settalBillIndent>();

		Double total = 0.0;
		Double bal = 0.0;
		Double result = 0.0;
		/*
		 * try { SQLQuery query1 = sessionFactory .getCurrentSession()
		 * .createSQLQuery("SELECT amount_balance FROM pharma_indent_amount_details where treatment_id= "
		 * +treatmentId); Double rows1 = (Double)query1.uniqueResult();
		 * 
		 * settalBillIndents.setAmountBal(rows1.toString());
		 * 
		 * } catch (Exception e) { e.printStackTrace();
		 * 
		 * } try { SQLQuery query2 = sessionFactory .getCurrentSession()
		 * .createSQLQuery("SELECT amount_receive,narration FROM pharma_indent_amount_history where treatment_id = "
		 * +treatmentId); List<Object[]> rows2 = query2.list();
		 * 
		 * for (Object[] master2 : rows2) {
		 * 
		 * if (master2[0] != null) {
		 * total=total+Double.parseDouble(master2[0].toString()); } if (master2[1] !=
		 * null) { settalBillIndents.setNarration(master2[1].toString());
		 * 
		 * }
		 * 
		 * } } catch (Exception e) { e.printStackTrace();
		 * 
		 * }
		 */
		try {
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
					" SELECT master.indent_sale_amt_receive,details.amount_receive,master.indent_sale_received_date,indent.indent_treatement_id, "
							+ " master.indent_sale_amt_balance,details.amount_balance,master.indent_sale_id,master.indent_sale_net_amt FROM pharma_indent_sale_master master inner join "
							+ " pharma_indent_master indent on indent.indent_id=master.indent_sale_indent_no inner join treatment t ON t.Treatment_ID = indent.indent_treatement_id "
							+ " inner join pharma_indent_amount_details details ON details.treatment_id = indent.indent_treatement_id "
							+ " inner join patient p on t.Patient_ID=p.Patient_ID where p.Patient_ID = " + patientId);

			List<Object[]> rows1 = query1.list();

			for (Object[] master : rows1) {
				settalBillIndent settalBillIndent = new settalBillIndent();

				if (master[0] != null)
					settalBillIndent.setTotalAmountReceive(Double.parseDouble(master[0].toString()));
				else
					settalBillIndent.setTotalAmountReceive(0.0);

				if (master[1] != null)
					settalBillIndent.setSettleAmountReceive(Double.parseDouble(master[1].toString()));
				else
					settalBillIndent.setSettleAmountReceive(0.0);

				if (master[2] != null)
					settalBillIndent.setDate(master[2].toString());
				else
					settalBillIndent.setDate("");

				if (master[3] != null)
					settalBillIndent.setTreatmentId(master[3].toString());
				else
					settalBillIndent.setTreatmentId("");

				if (master[4] != null)
					total = Double.parseDouble(master[4].toString());

				if (master[5] != null) {
					bal = Double.parseDouble(master[5].toString());
					settalBillIndent.setAmountBal(master[5].toString());
				} else
					settalBillIndent.setAmountBal("");

				if (master[6] != null)
					settalBillIndent.setBillId("IS" + master[6].toString());
				else
					settalBillIndent.setBillId("");

				if (master[7] != null)
					settalBillIndent.setTotalBill(master[7].toString());
				else
					settalBillIndent.setTotalBill("");

				result = total - bal;

				settalBillIndent.setSettleAmountReceive(result);

				settalBillIndents.add(settalBillIndent);
			}

			System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<" + total);

		} catch (Exception e) {
			e.printStackTrace();

		}
		return settalBillIndents;
	}

	@Override
	public Double getReceiveAmountByTreatmentId(Integer treatmentId) {

		Double amount = 0.0;
		Double amount1 = 0.0;

		/*
		 * SQLQuery query1 = sessionFactory .getCurrentSession() .createSQLQuery(
		 * "select sum(s_m.indent_sale_amt_receive) from pharma_indent_master indent inner join pharma_indent_sale_master s_m ON s_m.indent_sale_indent_no = indent.indent_id where indent.indent_treatement_id = "
		 * + treatmentId + " "); Object rows = (Object) query1.uniqueResult(); if (rows
		 * != null) amount = Double.parseDouble(rows.toString());
		 */

		/*
		 * SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(
		 * "SELECT sum(amount_receive) FROM pharma_indent_amount_history where treatment_id="
		 * + treatmentId + " "); Object rows1 = (Object) query2.uniqueResult(); if
		 * (rows1 != null) amount1 = Double.parseDouble(rows1.toString());
		 */

		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select ifnull(sum(s_m.indent_sale_amt_receive),0) from pharma_indent_master indent inner join pharma_indent_sale_master s_m ON s_m.indent_sale_indent_no = indent.indent_id where indent.indent_treatement_id = "
						+ treatmentId + " ");
		Object rows = (Object) query1.uniqueResult();
		if (rows != null)
			amount = Double.parseDouble(rows.toString());

		String sqlRef = "select ifnull(sum(credit_note_net_amt), 0) from pharma_credit_note_master where credit_note_transaction_type=0 and credit_note_treatmentId="
				+ treatmentId;
		Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
		double pharmaReturn = (Double) refQuery.uniqueResult();

		double patientPaid = 0.0;
		double pharmaPaid = 0.0;
		String sql3 = "SELECT ifnull(amount_receive,0) as amount_receive,ifnull(hsp_return_flag,'-') as hsp_return_flag FROM pharma_indent_amount_history where treatment_id="
				+ treatmentId;
		Query query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
		query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> list = query3.list();
		if (list.size() > 0) {

			for (Map<String, Object> row : list) {

				String hsp_flag = (String) row.get("hsp_return_flag");
				if (hsp_flag.equals("Y")) {

					pharmaPaid = pharmaPaid + (Double) row.get("amount_receive");
				} else {

					patientPaid = patientPaid + (Double) row.get("amount_receive");
				}
			}

			amount1 = (amount + patientPaid) - pharmaPaid;
			amount1 = amount1 - pharmaReturn;

		} else {

			amount1 = amount;
			amount1 = amount1 - pharmaReturn;
		}

		return amount1;
	}

	/******************************
	 * for pharmacy balance from IPD @husen 30 oct 2015
	 *********************************/
	@Override
	public boolean saveHospitalPayDetails(String amount, Integer treatmentId, String BalanceType) {

		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time = dateFormat1.format(cal.getTime());

		double amountReceive = Double.parseDouble(amount);
		Double amount1 = 0.0;
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"select    sum(s.indent_sale_net_amt - s.indent_sale_amt_receive) - ifnull(sum(c.credit_note_slave_amt), 0) - (select            ifnull(sum(amount_receive), 0)        from            pharma_indent_amount_details        where            treatment_id = '"
						+ treatmentId
						+ "') from    pharma_indent_sale_master s        inner join    pharma_indent_master m ON m.indent_id = s.indent_sale_indent_no        left join    pharma_credit_note_slave c ON c.credit_note_slave_indent_id = s.indent_sale_id where    m.indent_treatement_id ="
						+ treatmentId);
		Object rows1 = (Object) query1.uniqueResult();
		if (rows1 != null)
			amount1 = Double.parseDouble(rows1.toString());
		double amountBal = amount1 - amountReceive;
		double discount = 0;
		String narration = "From Billing";
		String hspFlag = "N";
		if (BalanceType.equals("PharmaBalance")) {

			hspFlag = "Y";
			amountReceive = (-1) * amountReceive;
		}

		try {

			Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
			String date = dateFormat.format(currentDate.getTime());

			org.hibernate.Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("update pharma_indent_amount_details set amount_balance = " + amountBal
							+ " , amount_receive=" + amountReceive

							+ ",final_date='" + date + "' where treatment_id = " + treatmentId + "");
			query.executeUpdate();

			if (BalanceType.equals("PharmaBalance")) {

				hspFlag = "Y";
				amountReceive = (-1) * amountReceive;
			}

			org.hibernate.Query historyQuery = sessionFactory.getCurrentSession().createSQLQuery(
					"insert into pharma_indent_amount_history(treatment_id,amount_receive,discount,narration,final_date,amount_balance,indent_time,hsp_return_flag) values("
							+ treatmentId + "," + amountReceive + "," + discount + ",'" + narration + "','" + date
							+ "','" + amountBal + "','" + time + "','" + hspFlag + "')");
			historyQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public boolean saveHospitalTotalPayDetails(int treatmentId, float pharmabalance, float totalbill,
			float totalrecieved, float patientbalance, String narration, Integer userId) {
		boolean flag = false;
		try {

			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
			String date = simpleDateFormat.format(new Date());

			java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
			java.util.Calendar cal = java.util.Calendar.getInstance();
			String time = dateFormat1.format(cal.getTime());

			org.hibernate.Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"insert into pharma_indent_hospital_payment(treatment_id,total_amt_recieved_by_pharmacy,"
							+ "total_patient_bill_amt,pharma_balance_paid_by_hospital,pharma_balance_recieved_by_hospital,"
							+ "date,narration,user_id,isRead,payment_time) " + "values(" + treatmentId + ","
							+ totalrecieved + "," + totalbill + "," + pharmabalance + "," + patientbalance + ",'" + date
							+ "','" + narration + "'," + userId + ",'0','" + time + "');");
			int rowDeleted = query.executeUpdate();
			if (rowDeleted != 0) {
				flag = true;
			} else {
				flag = false;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public String getPatientHallDetailsByTreatmentId(Integer indentTreatmentId) {
		StringBuffer stringBuffer = null;
		try {

			// String patientWardQuery="select distinct h.Hname,ht.hall_type_name from
			// patient p,treatment t,treatment_beds b,hall_type ht,hall h,beds bd where
			// p.Patient_ID = t.Patient_ID and p.status = 'Y' and b.Bed_ID = bd.Bed_ID and
			// bd.Hall_ID = h.Hall_ID and h.Htype = ht.idhall_type and b.Treatment_ID =
			// t.Treatment_ID and t.TFlag = 'ACTIVE' AND t.Treatment_ID =
			// '"+indentTreatmentId+"'";
			// String patientWardQuery1= "SELECT DISTINCT h.Hname,ht.hall_type_name FROM
			// ehat_patient p,ehat_treatment t,treatment_beds b, hall_type ht, hall h,beds
			// bd WHERE p.patient_id = t.patient_id AND p.deleted = 'N' AND b.Bed_ID =
			// bd.Bed_ID AND bd.Hall_ID = h.Hall_ID AND h.Htype = ht.idhall_type AND
			// b.Treatment_ID = t.treatment_id AND t.t_flag = 'Y'AND t.treatment_id
			// ='"+indentTreatmentId+"'";
			String patientWardQuery1 = "SELECT c.category_name,(select category_name from ehat_charges_master_slave where id=c.selfId) AS `ht_name` from treatment_beds tr join beds b on(b.Bed_ID = tr.Bed_ID and tr.status = \"Y\") Join ehat_charges_master_slave c  on(c.id = b.Hall_ID) join ehat_treatment t on(t.treatment_id = tr.Treatment_ID and t.t_flag='Y') where t.treatment_id='"
					+ indentTreatmentId + "'";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(patientWardQuery1);
			List<Object[]> rows = query.list();

			for (Object[] objects : rows) {
				stringBuffer = new StringBuffer();
				if (objects[0] != null)
					stringBuffer.append(" " + objects[0]);

				if (objects[1] != null)
					stringBuffer.append(" " + objects[1]);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return stringBuffer.toString();
	}

	@Override
	public JSONArray getPreviousIndentData(Integer treatmentId) {
		JSONArray jsonArray = new JSONArray();

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				"select indent_generate_date date,indent_status,indent_received_from,indent_store_name,indent_id from pharma_indent_master  where indent_treatement_id='"
						+ treatmentId + "' and indent_delete_flag='0' order by indent_id desc;");

		List<Object[]> results = query.list();

		for (Object[] master : results) {
			JsonArray jsonArray2 = new JsonArray();
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("date", master[0].toString());

				if (master[1] != null)
					jsonObject.put("status", master[1].toString());

				if (master[2] != null)
					jsonObject.put("receiveFrom", master[2].toString());

				if (master[3] != null)
					jsonObject.put("storeName", master[3].toString());

				if (master[4] != null)
					jsonObject.put("indentId", master[4].toString());

				jsonObject.put("slave", jsonArray2);

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public JSONArray getCancelIndentData(Integer treatmentId) {
		JSONArray jsonArray = new JSONArray();

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				"select indent_generate_date date,indent_status,indent_received_from,indent_store_name,indent_id from pharma_indent_master  where indent_treatement_id='"
						+ treatmentId + "' and indent_delete_flag='1' order by indent_id desc;");

		List<Object[]> results = query.list();

		for (Object[] master : results) {
			JsonArray jsonArray2 = new JsonArray();
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("date", master[0].toString());

				if (master[1] != null)
					jsonObject.put("status", master[1].toString());

				if (master[2] != null)
					jsonObject.put("receiveFrom", master[2].toString());

				if (master[3] != null)
					jsonObject.put("storeName", master[3].toString());

				if (master[4] != null)
					jsonObject.put("indentId", master[4].toString());

				jsonObject.put("slave", jsonArray2);

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public JSONArray getTotalindetDataByTreatmentId(Integer treatmentId) {
		JSONArray jsonArray = new JSONArray();
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				"select indent_sale_id,indent_sale_received_date,indent_sale_gross_amt,indent_sale_net_amt,indent_sale_less from pharma_indent_master master inner join pharma_indent_sale_master s_master on s_master.indent_sale_indent_no=master.indent_id where master.indent_treatement_id='"
						+ treatmentId + "' and s_master.indent_sale_delete_flag='0'");

		List<Object[]> results = query.list();

		for (Object[] master : results) {
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("indentId", "IS" + master[0].toString());

				if (master[1] != null)
					jsonObject.put("date", master[1].toString());

				if (master[2] != null)
					jsonObject.put("grossAmt", master[2].toString());

				if (master[3] != null)
					jsonObject.put("netAmt", master[3].toString());

				if (master[4] != null)
					jsonObject.put("less", master[4].toString());

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		// suraj code for credit note discount in ipd bill
		SQLQuery creditNoteQuery = sessionFactory.getCurrentSession().createSQLQuery(
				"select c_m.credit_note_id,c_m.credit_note_date,c_m.credit_note_gross_amt,c_m.credit_note_net_amt,credit_note_less,c_m.credit_note_treatmentId,c_m.credit_note_transaction_type from pharma_credit_note_master c_m where c_m.credit_note_treatmentId = '"
						+ treatmentId + "' and c_m.credit_note_type = 'indentSale'");

		List<Object[]> creditNoteQueryResults = creditNoteQuery.list();

		for (Object[] master : creditNoteQueryResults) {
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("indentId", "Credit Note No:" + master[0].toString());

				if (master[1] != null)
					jsonObject.put("date", master[1].toString());

				if (master[2] != null)
					jsonObject.put("grossAmt", master[2].toString());

				if (master[3] != null)
					jsonObject.put("netAmt", master[3].toString());

				if (master[4] != null)
					jsonObject.put("less", master[4].toString());

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		// suraj code for settle bill details
		SQLQuery settleBillQuery = sessionFactory.getCurrentSession().createSQLQuery(
				"select c_m.idpharma_indent_amount_history_id,c_m.final_date,c_m.amount_receive,c_m.discount,c_m.treatment_id from pharma_indent_amount_history c_m where c_m.treatment_id ='"
						+ treatmentId + "'");

		List<Object[]> settleBillQueryResults = settleBillQuery.list();

		for (Object[] master : settleBillQueryResults) {
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("indentId", "Settle Bill No:" + master[0].toString());

				if (master[1] != null)
					jsonObject.put("date", master[1].toString());

				if (master[2] != null)
					jsonObject.put("grossAmt", master[2].toString());

				if (master[3] != null)
					jsonObject.put("netAmt", master[2].toString());

				if (master[4] != null)
					jsonObject.put("less", master[3].toString());

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public List<IndentSaleMaster> getMultipleIndentSaleDataById(Integer indentSalelId) {
		List<IndentSaleMaster> indentSaleMasters = new ArrayList<IndentSaleMaster>();

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IndentSaleMaster.class)
				.createAlias("indentMaster", "indentMaster");
		/* criteria.add(Restrictions.eq("indentSaleDeleteFlag", 0)); */

		if (indentSalelId != 0) {
			criteria.add(Restrictions.eq("indentMaster.indentId", indentSalelId));
		}

		IndentSaleMaster indentSaleMaster = new IndentSaleMaster();

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("indentSalelId"));
		proList.add(Projections.property("indentSaleDocNo"));
		proList.add(Projections.property("indentSaleReceivedDate"));
		proList.add(Projections.property("indentMaster.indentId"));
		proList.add(Projections.property("indentSaleLess"));
		proList.add(Projections.property("indentSaleGrossAmt"));
		proList.add(Projections.property("indentSaleAdd"));
		proList.add(Projections.property("indentSaleNetAmt"));
		proList.add(Projections.property("indentSaleAmountReceive"));
		proList.add(Projections.property("indentSalePreviousBalance"));
		proList.add(Projections.property("indentBillMode"));
		proList.add(Projections.property("indentTaxVat0"));
		proList.add(Projections.property("indentTaxVat5"));
		proList.add(Projections.property("indentTaxVat12"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					indentSaleMaster.setIndentSalelId(Integer.parseInt(row[0].toString()));

				if (row[1] != null) {
					indentSaleMaster.setIndentSaleDocNo(row[1].toString());
				} else
					indentSaleMaster.setIndentSaleDocNo("");

				if (row[2] != null) {
					/*
					 * SimpleDateFormat dateFormat = new SimpleDateFormat( "yyyy/MM/dd"); String
					 * str[] = row[2].toString().split(" ");
					 * indentSaleMaster.setIndentSaleNarration(str[0]);
					 */

					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
					String str[] = row[2].toString().split(" ");
					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer.append(date[2] + "/" + date[1] + "/" + date[0]);
					indentSaleMaster.setIndentSaleNarration(stringBuffer.toString());
				}

				if (row[3] != null) {
					IndentMaster indentMaster = new IndentMaster();
					indentMaster.setIndentId(Integer.parseInt(row[3].toString()));
					indentSaleMaster.setIndentMaster(indentMaster);
				}

				if (row[4] != null) {
					indentSaleMaster.setIndentSaleLess(Double.parseDouble(row[4].toString()));
				}

				if (row[5] != null) {
					indentSaleMaster.setIndentSaleGrossAmt(Double.parseDouble(row[5].toString()));
				}

				if (row[6] != null) {
					indentSaleMaster.setIndentSaleAdd(Double.parseDouble(row[6].toString()));
				}
				if (row[7] != null) {
					indentSaleMaster.setIndentSaleNetAmt(Double.parseDouble(row[7].toString()));
				}

				if (row[8] != null) {
					indentSaleMaster.setIndentSaleAmountReceive(Double.parseDouble(row[8].toString()));
				}

				if (row[9] != null) {
					indentSaleMaster.setIndentSalePreviousBalance(Double.parseDouble(row[9].toString()));
				}
				if (row[10] != null) {
					if (row[10].toString().equals("0"))
						indentSaleMaster.getIndentMaster().setIndentStatus("cash");
					else
						indentSaleMaster.getIndentMaster().setIndentStatus("Credit");
				} else
					indentSaleMaster.getIndentMaster().setIndentStatus("");

				if (row[11] != null)
					indentSaleMaster.setIndentTaxVat0(Double.parseDouble(row[11].toString()));
				else
					indentSaleMaster.setIndentTaxVat0(0.0);

				if (row[12] != null)
					indentSaleMaster.setIndentTaxVat5(Double.parseDouble(row[12].toString()));
				else
					indentSaleMaster.setIndentTaxVat5(0.0);

				if (row[13] != null)
					indentSaleMaster.setIndentTaxVat12(Double.parseDouble(row[13].toString()));
				else
					indentSaleMaster.setIndentTaxVat12(0.0);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<IndentSaleSlave> indentSaleSlaves = new ArrayList<IndentSaleSlave>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					/*
					 * "select batch.batch_code,batch.batch_exp_date,slave.pur_slave_mrp,slave.pur_slave_rate,stock.stock_qty_in_hand,batch.batch_id,stock.stock_id, slave.pur_slave_purchase_rate,tax.tax_rate,slave.pur_slave_id from pharma_purchase_slave slave inner join pharma_batch_master batch on slave.pur_slave_batch_id = batch.batch_id inner join pharma_stock_master stock on stock.stock_batch_id=batch.batch_id inner join pharma_product_master product on product.product_id=batch.batch_product_id inner join pharma_product_tax_relation  product_tax on product.product_id=product_tax.product_id inner join pharma_tax_master tax on tax.tax_id=product_tax.tax_id where slave.pur_slave_product_id="
					 */
					"select p_slave.indent_sale_slave_qty,p_slave.indent_sale_slave_batch_code,p_slave.indent_sale_slave_batch_expiry,product.product_name from pharma_indent_master i_mast inner join pharma_indent_sale_master master on master.indent_sale_indent_no=i_mast.indent_id inner join pharma_indent_sale_slave p_slave ON p_slave.indent_sale_slave_master_id = master.indent_sale_id inner join pharma_product_master product ON product.product_id = p_slave.indent_sale_slave_product_id where i_mast.indent_id = '"
							+ indentSalelId + "';");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				IndentSaleSlave purchaseSlave = new IndentSaleSlave();

				if (row[0] != null) {
					String result1[] = row[0].toString().split("\\.");
					purchaseSlave.setIndentSaleSlaveQty(Integer.parseInt(result1[0]));
				}

				if (row[1] != null)
					purchaseSlave.setIndentSaleSlaveBatchCode(row[1].toString());
				else
					purchaseSlave.setIndentSaleSlaveBatchCode("");

				if (row[2] != null)
					purchaseSlave.setIndentSaleSlaveBatchExpiry(row[2].toString());
				else
					purchaseSlave.setIndentSaleSlaveBatchExpiry("");

				ProductMaster productMaster = new ProductMaster();
				if (row[3] != null) {
					productMaster.setProductName(row[3].toString());
					purchaseSlave.setProductMaster(productMaster);
				} else {
					productMaster.setProductName("");
				}
				indentSaleSlaves.add(purchaseSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		indentSaleMaster.setIndentSaleSlaves(indentSaleSlaves);

		indentSaleMasters.add(indentSaleMaster);

		return indentSaleMasters;
	}

	@Override
	public List<settalBillIndent> getHospitalPaymentDetailsTreatmentId(Integer treatmentId) {
		List<settalBillIndent> settalBillIndents = new ArrayList<settalBillIndent>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT total_amt_recieved_by_pharmacy, pharma_balance_paid_by_hospital,date,treatment_id,indent_hospital_receive_id,payment_time,narration FROM pharma_indent_hospital_payment where treatment_id = '"
							+ treatmentId + "' ");
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				settalBillIndent settalBillIndent = new settalBillIndent();
				/* IndentMaster indentSale = new IndentMaster(); */

				if (master[0] != null)
					settalBillIndent.setAmountReceive(master[0].toString());
				else
					settalBillIndent.setAmountReceive("");

				if (master[1] != null)
					settalBillIndent.setAmountBal(master[1].toString());
				else
					settalBillIndent.setAmountBal("");

				// for date
				if (master[2] != null)
					settalBillIndent.setDate(master[2].toString());
				else
					settalBillIndent.setDate("");

				if (master[3] != null)
					settalBillIndent.setTreatmentId(master[3].toString());
				else
					settalBillIndent.setTreatmentId("");

				if (master[4] != null)
					settalBillIndent.setHistoryId(master[4].toString());
				else
					settalBillIndent.setHistoryId("");

				if (master[5] != null)
					settalBillIndent.setTime(master[5].toString());
				else
					settalBillIndent.setTime("");

				if (master[6] != null)
					settalBillIndent.setNarration(master[6].toString());
				else
					settalBillIndent.setNarration("");

				settalBillIndents.add(settalBillIndent);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return settalBillIndents;
	}

	@Override
	public FinalIndent printHospitalPaymentReceipt(Integer receiptId) {
		List<FinalIndent> finalIndents = new ArrayList<FinalIndent>();
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT total_amt_recieved_by_pharmacy ,pharma_balance_paid_by_hospital,date,treatment_id,indent_hospital_receive_id,payment_time,narration FROM pharma_indent_hospital_payment where indent_hospital_receive_id = '"
						+ receiptId + "';");
		List<Object[]> rows = query1.list();
		for (Object[] master : rows) {

			FinalIndent finalIndent = new FinalIndent();

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

			if (master[0] != null) {
				finalIndent.setAmountReceive(master[0].toString());
			}

			if (master[1] != null) {
				finalIndent.setBalance(master[1].toString());
			}

			if (master[2] != null) {
				finalIndent.setDate(master[2].toString());
			}

			if (master[3] != null)
				finalIndent.setTreatmentId(master[3].toString());

			if (master[4] != null)
				finalIndent.setHistoryId(master[4].toString());

			if (master[5] != null)
				finalIndent.setTime(master[5].toString());

			if (master[6] != null)
				finalIndent.setNarration(master[6].toString());

			finalIndents.add(finalIndent);
		}
		return finalIndents.get(0);
	}

	@Override
	public Integer chkIndentReceived(Integer indentNo) {
		Integer results = 0;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IndentMaster.class);
			criteria.add(Restrictions.eq("indentId", indentNo));
			criteria.add(Restrictions.eq("indentStatus", "received"));
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("indentId"));
			criteria.setProjection(proList);
			results = (Integer) criteria.uniqueResult();
			System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" + results);
			if (results != null) {
				return 1;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 0;

	}

	@Override
	public Double getPreBalance(String indentNo) {
		Integer treatmentId = 0;
		Double amtBalance = 0.0;
		try {
			SQLQuery query1 = sessionFactory.getCurrentSession()
					.createSQLQuery(" SELECT indent.indent_treatement_id FROM pharma_indent_master indent "
							+ " where indent_id ='" + indentNo + "'");

			Object result = (Object) query1.uniqueResult();

			if (result.toString() != null) {
				treatmentId = Integer.parseInt(result.toString());
			}

			SQLQuery query2 = sessionFactory.getCurrentSession()
					.createSQLQuery(" SELECT amount_balance FROM pharma_indent_amount_details where treatment_id='"
							+ treatmentId + "'");

			Object result1 = (Object) query2.uniqueResult();

			if (result1.toString() != null) {
				amtBalance = Double.parseDouble(result1.toString());
			} else {
				amtBalance = 0.0;
			}

		} catch (Exception e) {
			System.out.println(e);
		}
		return amtBalance;
	}

	@Override
	public JSONObject getSponserStatus(Integer treatmentId) {
		String flag = "";
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT    s.charges_master_slave_id,    t_flag,    ifnull(c.category_name, 'Self') as catName,c.discount FROM    ehat_treatment t        join    ehat_bill_master s ON s.treatment_id = t.treatment_id   left     join    ehat_charges_master_slave c ON c.id = s.charges_master_slave_id where    t.treatment_id ="
						+ treatmentId);
		List<Object[]> rows = query1.list();

		JSONObject obj1 = new JSONObject();

		for (Object[] master : rows) {

			if (((master[0].toString()).equals("1")) || ((master[0].toString()).equals("2")))
				flag = "INACTIVE";
			else
				flag = "ACTIVE";

			try {
				obj1.put("status", flag);

				if (master[0] != null)
					obj1.put("catId", master[0].toString());
				else
					obj1.put("catId", 1);

				if (master[1] != null)
					obj1.put("tFlag", master[1].toString());

				if (master[2] != null)
					obj1.put("catgoryName", master[2].toString());

				if (master[3] != null)
					obj1.put("discount", master[3].toString());

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		return obj1;

	}

	@Override
	public String getMRPType(Integer treatmentId) {
		String flag = "";
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
				" SELECT price_type FROM treatment t inner join ehat_bill_discount_category_master master ON t.bill_category = master.id_category_master "
						+ " where t.Treatment_ID = '" + treatmentId
						+ "' and t.bill_category!=1 and t.bill_category!=2 ; ");
		Object rows = (Object) query1.uniqueResult();

		flag = rows.toString();

		return flag;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IndentMaster> getIndentDetailsByPatient(int storeId) {
		List<IndentMaster> ltCounterSaleMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IndentMaster.class);
			criteria.add(Restrictions.eq("indentDeleteFlag", 0));
			// criteria.add(Restrictions.eq("indentDate", date));
			criteria.add(Restrictions.ne("indentStatus", "received"));
			if (storeId != 0) {
				criteria.add(Restrictions.eq("indentStoretId", storeId));
			} else {
				criteria.add(Restrictions.eq("indentStoretId", 0));
			}

			ltCounterSaleMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();

		}
		return ltCounterSaleMasters;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PatientPharmaDetails> fetchIndentDetailsByPatientName2(String findingName, Integer unitId,
			String storeId) {
		List<PatientPharmaDetails> listPatientPharmaDetails = null;
		try {

			if (storeId != null && storeId != "undefine" && storeId != "") {
				Query bet = sessionFactory.getCurrentSession().createQuery(
						"FROM PatientPharmaDetails WHERE indentdeleteflag = 0 AND indentstatus != 'received' AND indentstoreid = :indentstoreid AND patientName like :cnm  ");
				bet.setParameter("indentstoreid", Integer.parseInt(storeId));
				bet.setParameter("cnm", "%" + findingName + "%");
				listPatientPharmaDetails = bet.list();

			} else {
				Query bet = sessionFactory.getCurrentSession().createQuery(
						"FROM PatientPharmaDetails WHERE indentdeleteflag = 0 AND indentstoreid = 0 AND indentstatus != 'received'  AND patientName like :cnm  ");

				bet.setParameter("cnm", "%" + findingName + "%");
				listPatientPharmaDetails = bet.list();
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return listPatientPharmaDetails;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PatientPharmaDetails> fetchIndentIds(int indenttreatementid, Integer unitId, String storeId) {
		List<PatientPharmaDetails> listPatientPharmaDetails = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PatientPharmaDetails.class);
			criteria.add(Restrictions.eq("indentdeleteflag", 0));
			criteria.add(Restrictions.ne("indentstatus", "received"));
			criteria.add(Restrictions.eq("indenttreatementid", indenttreatementid));

			if (storeId != null && storeId != "undefine" && storeId != "") {
				criteria.add(Restrictions.eq("indentstoreid", Integer.parseInt(storeId)));
			} else {
				criteria.add(Restrictions.eq("indentstoreid", 0));
			}
			listPatientPharmaDetails = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();

		}
		return listPatientPharmaDetails;
	}

	@Override
	public Double getReturnAmt(Integer treatmentId) {
		Double amount = 0.0;
		String sql1 = "SELECT sum(credit_note_payable) FROM pharma_credit_note_master where credit_note_treatmentId="
				+ treatmentId;
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		Object rows = (Object) query1.uniqueResult();
		if (rows != null)
			amount = Double.parseDouble(rows.toString());

		return amount;
	}

	@Override
	public List<IndentSaleSlave> getIndentSaleDataByTreatId(Integer treatmentId) {
		List<IndentSaleSlave> lstIndent = new ArrayList<IndentSaleSlave>();

		String sql = "SELECT piss.indent_sale_slave_id,ppm.product_name,piss.indent_sale_slave_product_id,piss.indent_sale_slave_qty,piss.indent_sale_slave_batch_code,piss.indent_sale_slave_batch_expiry "
				+ "FROM pharma_indent_master pim,pharma_indent_sale_master pism,pharma_indent_sale_slave piss,pharma_product_master ppm "
				+ "where pim.indent_id = pism.indent_sale_indent_no and pism.indent_sale_id = piss.indent_sale_slave_master_id "
				+ "and ppm.product_id = piss.indent_sale_slave_product_id and pim.indent_treatement_id =" + treatmentId;
		Query indentDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
		indentDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listindentDetails = indentDetails.list();
		for (Map<String, Object> row : listindentDetails) {

			IndentSaleSlave objData = new IndentSaleSlave();

			objData.setIndentSaleSlaveQty((Integer) row.get("indent_sale_slave_qty"));
			objData.setIndentSaleSlaveBatchCode((String) row.get("indent_sale_slave_batch_code"));
			objData.setIndentSaleSlaveBatchExpiry((String) row.get("indent_sale_slave_batch_expiry"));
			objData.setAmtReceiveFlag((String) row.get("product_name"));
			lstIndent.add(objData);
		}
		return lstIndent;
	}

	// Modified By Akshata
	@Override
	public List<IndentSaleMaster> autoSuggestionPatientName(String letter) {

		List<IndentSaleMaster> indentSaleMasters = new ArrayList<IndentSaleMaster>();
		try {
			Query bet = sessionFactory.getCurrentSession().createQuery(
					"SELECT patientId as patientId, patientName as patientName FROM PatientPharmaDetails WHERE indentdeleteflag = 0 AND patientName like :cnm  group by(patientId)");

			bet.setParameter("cnm", "%" + letter + "%");

			bet.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> result = bet.list();

			for (Map<String, Object> master : result) {

				IndentSaleMaster indentSaleMaster = new IndentSaleMaster();
				IndentMaster indentMaster = new IndentMaster();

				indentMaster.setIndentPatientId((Integer) master.get("patientId"));

				indentMaster.setPatientName((String) master.get("patientName"));

				indentSaleMaster.setIndentMaster(indentMaster);

				indentSaleMasters.add(indentSaleMaster);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return indentSaleMasters;

	}

	// added by vishant
	@Override
	public String editPreIndentByIndentId(IndentMaster indentMaster) {

		List<IndentSlave> ltIndentSlave = indentMaster.getLtIndentSlave();
		try {
			for (int i = 0; i < ltIndentSlave.size(); i++) {

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IndentSlave.class);
				/* criteria.add(Restrictions.eq("indentDeleteFlag", 0)); */
				criteria.add(Restrictions.eq("indentSlaveId", ltIndentSlave.get(i).getIndentSlaveId()));
				IndentSlave indentMaster2 = (IndentSlave) criteria.uniqueResult();
				indentMaster2.setIndentSlaveRequireQty(ltIndentSlave.get(i).getIndentSlaveRequireQty());
				sessionFactory.getCurrentSession().update(indentMaster2);

			}
		}

		catch(Exception e) {
			e.printStackTrace();
		}
		return "Indent Edited Successfully";

		// return null;
	}

	@Override
	public List<IndentMaster> searchIndentSalePatientDetails(String findtext) {
		List<IndentMaster> List = new ArrayList<IndentMaster>();
		String sql="select prm.patient_id, prm.patient_name , sm.indent_id ,prm.treatment_id from patient_records_details_pharma prm left join pharma_indent_master sm on sm.indent_patient_id=prm.patient_id     left join pharma_indent_amount_details d on d.treatment_id=prm.treatment_id where prm.indent_delete_flag='0' AND  d.amount_balance>'0' AND sm.indent_id='"+findtext+"'   OR prm.patient_name like '%"+findtext+"%' group by d.treatment_id ";
		try {
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			List<Object[]> indentObj= query.list();
			for (Object[] rs : indentObj) {
				System.out.println("list>>"+rs.toString());
				IndentMaster obj = new IndentMaster();
				if(rs[0]!=null)
					obj.setIndentPatientId(Integer.parseInt(rs[0].toString()));			
				if(rs[1]!=null)
					obj.setPatientName(rs[1].toString());
				if(rs[2]!=null)
					obj.setIndentId(Integer.parseInt(rs[2].toString()));
				if(rs[3]!=null)
					obj.setIndentTreatmentId(Integer.parseInt(rs[3].toString()));

				List.add(obj);

			}
			return List;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	@Override
	public String getIndentPatientTypeDetailsByDate(String id) {
		List<IndentMaster> List = new ArrayList<IndentMaster>();
		StringBuffer stringBuffer = null;
	String sql="SELECT  IFNULL(cms.category_name, 'self') categoryName FROM ehat_treatment t  LEFT JOIN pharma_indent_master pim ON t.treatment_id = pim.indent_treatement_id LEFT JOIN ehat_charges_master_slave cms ON cms.id = t.charges_slave_id WHERE pim.indent_id  = '"+id+"' ";

		try {
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			List<Object> rows = query.list();
			for (Object objects : rows) {
				stringBuffer = new StringBuffer();
					stringBuffer.append(" " + objects);


			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return stringBuffer.toString();
	}
	
	
	public  void saleOrderDeatils(int indentMasterId) {

		try {
			  // sessionFactory.getCurrentSession().saveOrUpdate(inventoryMaterialRequestNoteItemInfoSlaveDTO);
			
			 
			 ResourceBundle bundle = ResourceBundle.getBundle("ecogreenapi");
				String SALE_ORDER_URL = bundle.getObject("SALE_ORDER_URL").toString();
				
				PharmaSaleOrderMasterDTO obj=null;
			 
			 Query querySpMaster =  sessionFactory.getCurrentSession().createSQLQuery("call sp_ecogreen_get_sale_order_master_details(:p_indentmasterid)");
			  querySpMaster.setParameter("p_indentmasterid", indentMasterId);
			  querySpMaster.setResultTransformer(new AliasToBeanResultTransformer(PharmaSaleOrderMasterDTO.class));
				@SuppressWarnings("unchecked")
				List<PharmaSaleOrderMasterDTO> lstmaster = querySpMaster.list();
			 
				if(lstmaster.size() > 0) {
					obj=lstmaster.get(0);
					obj.setRemark("indent");
					  Query querySpSlave = sessionFactory.getCurrentSession().createSQLQuery("call sp_ecogreen_get_sale_order_slave_details(:p_indentmasterid)");
					  querySpSlave.setParameter("p_indentmasterid", Integer.parseInt(obj.getOrder_no()));
					  querySpSlave.setResultTransformer(new AliasToBeanResultTransformer(PharmaSaleOrderSlaveDTO.class));
						@SuppressWarnings("unchecked")
						List<PharmaSaleOrderSlaveDTO> lstSlave = querySpSlave.list();
						
						
						  obj.setItem(lstSlave);
						
						  ObjectMapper w=new ObjectMapper();
						 String s="";
						 String news="";
						 try {
							 s=w.writeValueAsString(obj);
							 news="payload="+s;
							
						} catch (JsonProcessingException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

						System.out.println("ENtity  ==============="+news);
						 HttpHeaders headers = new HttpHeaders();
						 headers.setContentType(MediaType.APPLICATION_JSON);
						 headers.set("Content-Type", "application/x-www-form-urlencoded");
						 HttpEntity<String> entity = new HttpEntity<String>(news,headers);
						// ResponseEntity<String> responseEntity = restTemplate.exchange("https://qa-eg-eco.livc.in/eco/lifenity/fetch/0/25", HttpMethod.POST, entity, String.class);
					 ResponseEntity<String> responseEntity = restTemplate.exchange(SALE_ORDER_URL, HttpMethod.POST,entity,String.class);
					   String list = responseEntity.getBody();
					   System.out.println("Response  ==============="+list);
				  }
				
			 
		} catch (Exception e) {
			e.printStackTrace();

		}
	}
		
	
	
 }