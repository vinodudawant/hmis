package com.hms.pharmacy.dao.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.CommonDao;
import com.hms.pharmacy.dao.IndentDao;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.PoSlave;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.StockMasterSlave;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.POService;
import com.hms.pharmacy.service.PatientSaleBillService;
import com.hms.pharmacy.service.PurchaseService;

@Repository
public class CommonDaoImpl implements CommonDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	IndentDao indentDao;
	
	@Autowired
	POService poService;
	
	@Autowired
	PurchaseService purchaseSevice;
	
	@Autowired
	PatientSaleBillService patientSaleBillService;

	@Override
	public JSONArray getHospitalPaymentDetails() {
		
		JSONArray jsonArray = new JSONArray();
		try {
			
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("select hosp.date,hosp.narration,hosp.isRead,hosp.pharma_balance_paid_by_hospital,total_amt_recieved_by_pharmacy,indent_hospital_receive_id from pharma_indent_hospital_payment hosp order by indent_hospital_receive_id desc"); 
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				JSONObject obj1 = new JSONObject();

				if (row[0] != null)
					obj1.put("hospitalDate",row[0].toString());
				else
					obj1.put("hospitalDate","");

				if (row[1] != null)
					obj1.put("narration",row[1].toString());
				else
					obj1.put("narration","");

				if (row[2] != null)
					obj1.put("isRead",row[2].toString());
				else
					obj1.put("isRead","");

				if (row[3] != null)
					obj1.put("paidByHospital",row[3].toString());
				else
					obj1.put("paidByHospital","");

				if (row[4] != null)
					obj1.put("receiveByHospital",row[4].toString());
				else
					obj1.put("receiveByHospital","");
				
				if (row[5] != null)
					obj1.put("receiveId",row[5].toString());
				else
					obj1.put("receiveId","");

				jsonArray.put(obj1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return jsonArray;
	}

	@Override
	public JSONObject getHospitalPaymentDetailsById(Integer receiveId) {
		JSONObject obj1 = new JSONObject();
		try {
			
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("select hosp.date,hosp.narration,hosp.isRead,hosp.pharma_balance_paid_by_hospital,total_amt_recieved_by_pharmacy,indent_hospital_receive_id,p.fname, p.mName, p.lname, p.addressLine3, p.mobile from pharma_indent_hospital_payment hosp inner join  treatment t on t.Treatment_ID=hosp.treatment_id inner join patient p ON p.Patient_ID = t.Patient_ID where indent_hospital_receive_id='"+receiveId+"' order by indent_hospital_receive_id desc"); 
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				if (row[0] != null)
					obj1.put("hospitalDate",row[0].toString());
				else
					obj1.put("hospitalDate","");

				if (row[1] != null)
					obj1.put("narration",row[1].toString());
				else
					obj1.put("narration","");

				if (row[2] != null)
					obj1.put("isRead",row[2].toString());
				else
					obj1.put("isRead","");
				
				
				

				if (row[3] != null)
					obj1.put("paidByHospital",row[3].toString());
				else
					obj1.put("paidByHospital","");

				if (row[4] != null)
					obj1.put("receiveByHospital",row[4].toString());
				else
					obj1.put("receiveByHospital","");
				
				if (row[5] != null)
					obj1.put("receiveId",row[5].toString());
				else
					obj1.put("receiveId","");
				
				if(row[2]!=null)
				{
					if(row[2].equals(0))
						setHospitalPaymentStatus(Integer.parseInt(row[5].toString()));
				}
				
				if (row[6] != null)
					obj1.put("fName",row[6].toString());
				else
					obj1.put("fName","");
				
				if (row[7] != null)
					obj1.put("mName",row[7].toString());
				else
					obj1.put("mName","");
				
				if (row[8] != null)
					obj1.put("lName",row[8].toString());
				else
					obj1.put("lName","");
				
				if (row[9] != null)
					obj1.put("addressLine",row[9].toString());
				else
					obj1.put("addressLine","");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		
		return obj1;
	}
	
	
	public void setHospitalPaymentStatus(Integer receiveId)
	{
		try
		{
			Query query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"update pharma_indent_hospital_payment set isRead='1' where indent_hospital_receive_id=:receiveId");
		query.setInteger("receiveId", receiveId);
		int rowsDeleted = query.executeUpdate();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}

	@Override
	public List<String> getDiscountSurchargeDetails(Integer saleId, String type) {
		
		Double amount=0.0;
		List<String> results=new ArrayList<String>();
		
		if(type.equals("indentSale"))
		{
			try
			{
				Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select master.indent_sale_less,master.indent_sale_surcharges,indent_sale_net_amt from pharma_indent_sale_master master where master.indent_sale_id="+saleId);
				/*query.setInteger("receiveId", saleId);*/
				List<Object[]> result= query.list();
				for(Object[] objects:result)
				{
					if(objects[0]!=null)
						results.add(objects[0].toString());
					else
						results.add("0.0");
					
					if(objects[1]!=null)
						results.add(objects[1].toString());
					else
						results.add("0.0");
					
					if(objects[2]!=null)
						results.add(objects[2].toString());
					else
						results.add("0.0");
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		else
		{
			try
			{
				Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select master.patient_sales_bill_less,master.patient_sales_bill_surcharge,master.patient_sales_bill_net_amt from pharma_patient_sales_bill_master master where master.patient_sales_bill_id="+saleId); 
				/*query.setInteger("receiveId", saleId);*/
				List<Object[]> result= query.list();
				for(Object[] objects:result)
				{
					if(objects[0]!=null)
						results.add(objects[0].toString());
					else
						results.add("0.0");
					
					if(objects[1]!=null)
						results.add(objects[1].toString());
					else
						results.add("0.0");
					
					if(objects[2]!=null)
						results.add(objects[2].toString());
					else
						results.add("0.0");
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		return results;
	}
	
	@Override
	public List<String> getDiscountSurchargeDetailsOfPurchase(Integer saleId) 
	{
		Double amount=0.0;
		Double vat=0.0;
		Double net=0.0;
		List<String> results=new ArrayList<String>();
		DecimalFormat df = new DecimalFormat("###.###");
			try
			{
				Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select master.pur_cd_amt,master.pur_spl_disc,master.pur_add,master.pur_tax_vat5,master.pur_tax_vat12,master.pur_tax_without_disc_vat5,master.pur_tax_without_disc_vat12,master.pur_schm_disc,master.pur_debit_amt,master.pur_net_amt  from pharma_purchase_master master where master.pur_id ="+saleId);
				/*query.setInteger("receiveId", saleId);*/
				List<Object[]> result= query.list();
				for(Object[] objects:result)
				{
					if(objects[0]!=null && objects[1]!=null )
					{
						vat=(Double.parseDouble(objects[5].toString())+Double.parseDouble(objects[6].toString()))-(Double.parseDouble(objects[3].toString())+Double.parseDouble(objects[4].toString()));
						amount=Double.parseDouble(objects[0].toString())+Double.parseDouble(objects[1].toString())+vat+Double.parseDouble(objects[7].toString())+Double.parseDouble(objects[8].toString());
						amount=Double.parseDouble(df.format(amount));
						
					}
					results.add(amount.toString());
					results.add(objects[2].toString());
					results.add(objects[9].toString());
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		return results;
	}

	@Override
	public String saveCathLabProduct(List<VendorMaster> vendorMasters,
			int patientId, int treatmentId) {
		HttpServletRequest request = null;
		List<PurchaseMaster> purchaseMasterList=new ArrayList<PurchaseMaster>();
		
		for(VendorMaster master : vendorMasters){
			PoMaster poMaster=new PoMaster();
			poMaster.setPoDate(new Date());
			poMaster.setVendorMaster(master);
			poMaster.setVendoradd(master.getVendorAddresses().get(0));
			poMaster.setPoProductCount(master.getProductMasters().size());
			/*String ipaddress = request.getRemoteAddr();
			poMaster.setPoCreatedBy(userId);
			poMaster.setIpAddress(ipaddress);*/
			poMaster.setPoModifyBy(0);
			
			double totalAmt=0.0;
			double totalVat=0.0;
			
			List<PoSlave> poSlavesList=new ArrayList<PoSlave>();
			for(ProductMaster productMaster : master.getProductMasters()){
				
				PoSlave poSlave=new PoSlave();
				poSlave.setHsn(productMaster.getHsn());
				if(!(productMaster.getCess()==null || productMaster.getCess().equals("null") || productMaster.getCess().equals("")))
					poSlave.setPoCess(Double.parseDouble(productMaster.getCess()));
				else
					poSlave.setPoCess(0.0);
				if(!(productMaster.getIgst()==null || productMaster.getIgst().equals("null") || productMaster.getIgst().equals("")))
					poSlave.setPoIgst(Double.parseDouble(productMaster.getIgst()));
				else
					poSlave.setPoIgst(0.0);
				if((productMaster.getSgst()==null || productMaster.getSgst().equals("null") || productMaster.getSgst().equals("")))
					productMaster.setSgst(0.0+"");
				if((productMaster.getCgst()==null || productMaster.getCgst().equals("null") || productMaster.getCgst().equals("")))
					productMaster.setCgst(0.0+"");
				
				poSlave.setPoSlaveVat(Double.parseDouble(productMaster.getCgst())+Double.parseDouble(productMaster.getSgst()));
				poSlave.setPoSlaveMrp(productMaster.getProductLastMRP());
				poSlave.setPoSlaveQty((int)Double.parseDouble(productMaster.getProductUnit()+""));//product Qty
				poSlave.setPoSlaveRate(productMaster.getProductLastPurRate());
				poSlave.setPoSlaveAmt(productMaster.getProductLastPurRate()*Double.parseDouble(productMaster.getProductUnit()+""));
				poSlave.setProductMaster(productMaster);
				poSlave.setPoSlaveScheme(0.0);
				
				totalAmt+=poSlave.getPoSlaveAmt();
				totalVat+=(poSlave.getPoSlaveAmt()*(poSlave.getPoCess()+poSlave.getPoIgst()+poSlave.getPoSlaveVat())/100);
				poSlavesList.add(poSlave);
				
			}
			
			poMaster.setPoTotalAmt(totalAmt);
			poMaster.setPoTotalVat(totalVat);
			poMaster.setPoNetTotal(totalAmt+totalVat);
			poMaster.setLtPOslave(poSlavesList);
			poMaster.setPoStatus("received");
			Integer poId=poService.savePO(poMaster);
			
			master.setVendorDeleteFlag(poId);
			
			PurchaseMaster purchaseMaster=purchaseSevice.savePurchaseMaster(master,request);
			purchaseMasterList.add(purchaseMaster);
		}
		
		patientSaleBillService.savePatientSaleBill(purchaseMasterList,patientId,treatmentId);
		
		return "Save Successfully...!";
	}

	@Override
	public Object getPatientById(int patientId) {
		Query query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("select * from patient where Patient_ID=?");
		query.setParameter(0, patientId);
		return query.uniqueResult();
	}

	@Override
	public String getHospitalState() {
		Query query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("select hospitalState from pharma_hospital");
		return (String) query.uniqueResult();
	}

	@Override
	public void saveStockMasterSlave(StockMasterSlave stockMasterSlave) {
		sessionFactory.getCurrentSession().save(stockMasterSlave);
	}

	@Override
	public void updateStockMasterSlave(StockMasterSlave stockMasterSlave) {
		sessionFactory.getCurrentSession().update(stockMasterSlave);
		}

	@Override
	public StockMasterSlave getStockMasterSlave(int id) {
		return (StockMasterSlave) sessionFactory.getCurrentSession().get(StockMasterSlave.class, id);
	}

	@Override
	public String getWardNameByTreatment(int treatmentId) {
		Query query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"select     ht.hall_type_name from    ehat_bill_details_ipd ipd        join    beds b ON b.Bed_ID = ipd.sub_service_id        join    hall h ON b.Hall_ID = h.Hall_ID        join    hall_type ht ON ht.idhall_type = h.Htype where    ipd.treatment_id = "
								+ treatmentId
								+ " order by ipd.bill_id desc limit 1");
		Object str = query.uniqueResult();
		if (str != null)
			return str.toString();
		return "";
	}
}