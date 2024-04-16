package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;

import javassist.bytecode.stackmap.BasicBlock.Catch;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.DueCollectionDao;
import com.hms.pharmacy.pojo.CreditNoteMaster;
import com.hms.pharmacy.pojo.settalBillIndent;


@Repository
public class DueCollectionDaoImpl  implements DueCollectionDao
{

	@Autowired
	SessionFactory sessionFactory;
	
	
	public List<CreditNoteMaster> getDueCollectionNoteList()
	{
	List<CreditNoteMaster> CreditNoteMasters = new ArrayList<CreditNoteMaster>();
	SQLQuery query1 = sessionFactory
			.getCurrentSession()
			.createSQLQuery(
					  " SELECT Distinct patient_bill_patient_id,p.fName,p.mName,p.lName,p.mobile,master.patient_sale_treatmentId FROM pharma_patient_sales_bill_master master "
                      +" inner join patient p on  p.Patient_ID=master.patient_bill_patient_id; ");

	
	List<Object[]> result = query1.list();
	
	try
	{
		for (Object[] row : result) 
		{
			CreditNoteMaster creditNoteMaster=new CreditNoteMaster();
			
			  if(row[0]!=null)
				   creditNoteMaster.setCreditPatientId(Integer.parseInt((row[0].toString())));
			   else
				   creditNoteMaster.setCreditPatientId(Integer.parseInt(" "));
			  
			   if(row[1]!=null)
				   creditNoteMaster.setPatientName((row[1].toString())+" "+(row[2].toString())+" "+(row[3].toString()));
			   
			   if(row[4]!=null)
				   creditNoteMaster.setCreditNoteEntryBy((row[4].toString()));
			   
			   if(row[5]!=null)
				   creditNoteMaster.setCreditNoteTreatmentId(Integer.parseInt(row[5].toString()));
	       
			   CreditNoteMasters.add(creditNoteMaster);
		}
		
		}
	catch (Exception e) {
		e.printStackTrace();
	}

	
	SQLQuery query2 = sessionFactory
			.getCurrentSession()
			.createSQLQuery(
					  " SELECT  Distinct p.Patient_ID,p.fName,p.mName,p.lName,p.mobile,t.Treatment_ID FROM pharma_indent_sale_master master "
                      +" inner join pharma_indent_master indent on indent.indent_id=master.indent_sale_indent_no "
                      +" inner join treatment t on t.Treatment_ID=indent.indent_treatement_id inner join patient p on p.Patient_ID=t.Patient_ID ; ");

	
	List<Object[]> result1 = query2.list();
	
	try
	{
		for (Object[] row : result1) 
		{
			CreditNoteMaster creditNoteMaster=new CreditNoteMaster();
			
			 if(row[0]!=null)
				   creditNoteMaster.setCreditPatientId(Integer.parseInt((row[0].toString())));
			   else
				   creditNoteMaster.setCreditPatientId(Integer.parseInt(" "));
			  
			   if(row[1]!=null)
				   creditNoteMaster.setPatientName((row[1].toString())+" "+(row[2].toString())+" "+(row[3].toString()));
			   
			   if(row[4]!=null)
				   creditNoteMaster.setCreditNoteEntryBy((row[4].toString()));
			   
			   if(row[5]!=null)
				   creditNoteMaster.setCreditNoteTreatmentId(Integer.parseInt(row[5].toString()));
	
			   
			   CreditNoteMasters.add(creditNoteMaster);
		}
		}
	catch (Exception e) {
		e.printStackTrace();
	}
	
	return CreditNoteMasters;
}
	
public List<CreditNoteMaster> getUniqueDueCollectionNoteList(List<CreditNoteMaster> creditNoteList)
	{
	
	int count = creditNoteList.size();
	  for (int i = 0; i < count; i++) 
	    { 
		  
	        for (int j = i + 1; j <  count ; j++) 
	        {
	            if (creditNoteList.get(i).getPatientName().equals(creditNoteList.get(j).getPatientName()))
	            {
	            	creditNoteList.remove(j--);
	                count--;
	             }
	            	           
	        }
	       
	    }
	  
	  return creditNoteList;
	}
	
@Override
public boolean savePatientPendingAmount(Integer treatmentId,
		Double amountReceive,Double discount,Double amountBalance) {
	SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
			"select treatment_id from pharma_patient_amount_details where treatment_id='"
					+ treatmentId + "' ");
	Object rows = (Object) query1.uniqueResult();
	
	java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();
	String time=dateFormat1.format(cal.getTime());
		
	String narration="";
	if (rows != null) {
		try {

			Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
			String date = dateFormat.format(currentDate.getTime());

			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_patient_amount_details set amount_balance = "
									+ amountBalance
									+ " , amount_receive="
									+ amountReceive
									+ " , discount="
									+ discount
									+ " , narration='"
									+ narration
									+ "',final_date='"
									+ date
									+ "' where treatment_id = "
									+ treatmentId + "");
			int rowDeleted = query.executeUpdate();
			
			
			try {
				org.hibernate.Query historyQuery = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"insert into pharma_patient_amount_history(treatment_id,amount_receive,discount,narration,final_date,amount_balance,patient_time)  values("
										+ treatmentId
										+ ","
										+ amountReceive
										+ ","
										+ discount
										+ ",'"
										+ narration
										+ "','" + date + "','" + amountBalance + "','"
										+ time + "')");
				int rowDeleted1 = historyQuery.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	return true;
}


@Override
public boolean savePatientTotalBill(Integer treatmentId,Double amountBalance) 
{
	SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
			"select treatment_id from pharma_patient_amount_details where treatment_id='"
					+ treatmentId + "' ");
	Object rows = (Object) query1.uniqueResult();
		
	String narration="";
	Double Balance=0.0;
	Double discount=0.0;
	java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();
	String time=dateFormat1.format(cal.getTime());
	
	if (rows != null) {
		try {

			Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
			String date = dateFormat.format(currentDate.getTime());
			
			System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<"+date);
			
			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_patient_amount_details set amount_balance =0 "
									+ " , amount_receive="
									+ amountBalance
									+ " ,final_date='"
									+ date
									+ "' , discount="
									+ discount
									+ "  where treatment_id = "
									+ treatmentId + "");
			int rowDeleted = query.executeUpdate();
			
			try {
				org.hibernate.Query historyQuery = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
									"insert into pharma_patient_amount_history(treatment_id,amount_receive,discount,narration,final_date,amount_balance,patient_time)  values("
											+ treatmentId
											+ ","
											+ amountBalance
											+ ","
											+ discount
											+ ",'"
											+ narration
											+ "','"
											+ date
											+ "','"
											+ Balance + "','"
											+ time + "')");
					/*	.createSQLQuery(
								"insert into pharma_patient_amount_history(treatment_id,amount_receive,narration,final_date,amount_balance,patient_time)  values("
										+ treatmentId
										+ ","
										+ amountBalance
										+ ","+ narration + ","
										+ date + "," + Balance  + "','"
										+ time + "')");*/
				int rowDeleted1 = historyQuery.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	return true;
}

@Override
public boolean saveIndentTotalBill(Integer treatmentId,Double amountBalance) 
{
	
	SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
			"select treatment_id from pharma_indent_amount_details where treatment_id='"
					+ treatmentId + "' ");
	Object rows = (Object) query1.uniqueResult();
	String narration="";
	Double Balance=0.0;
	Double discount=0.0;
	java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();
	String time=dateFormat1.format(cal.getTime());
	
	if (rows != null) {
		try {

			Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
			String todaydate = dateFormat.format(currentDate.getTime());

			System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<"+todaydate);
			
			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_indent_amount_details set amount_balance =0 "
									+ " , amount_receive="
									+ amountBalance
									+ " ,final_date='"
									+ todaydate 
									+ "' , discount="
									+ discount
									+ "  where treatment_id = "
									+ treatmentId + "");
			int rowDeleted = query.executeUpdate();
			
			
			try {
				org.hibernate.Query historyQuery = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
									"insert into pharma_indent_amount_history(treatment_id,amount_receive,discount,narration,final_date,amount_balance,indent_time)  values("
											+ treatmentId
											+ ","
											+ amountBalance
											+ ","
											+ discount
											+ ",'"
											+ narration
											+ "','"
											+ todaydate
											+ "','"
											+ Balance + "','"
											+ time + "')");
						/*.createSQLQuery(
								"insert into pharma_indent_amount_history(treatment_id,amount_receive,narration,final_date,amount_balance,indent_time)  values("
										+ treatmentId
										+ ","
										+ amountBalance
										+  ","+ narration + ","
										+  todaydate + "," + Balance + "','"
										+ time + "')");*/
				int rowDeleted1 = historyQuery.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	return true;
}

@Override
public boolean saveIndentPatientPendingAmount(Integer treatmentId,
		Double amountReceive,Double discount,Double amountBalance) {
	SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
			"select treatment_id from pharma_indent_amount_details where treatment_id='"
					+ treatmentId + "' ");
	Object rows = (Object) query1.uniqueResult();
	
	java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();
	String time=dateFormat1.format(cal.getTime());
	
	String narration="";
	if (rows != null) {
		try {

			Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
			String date = dateFormat.format(currentDate.getTime());

			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update pharma_indent_amount_details set amount_balance = "
									+ amountBalance
									+ " , amount_receive="
									+ amountReceive
									+ " , discount="
									+ discount
									+ " , narration='"
									+ narration
									+ "',final_date='"
									+ date
									+ "' where treatment_id = "
									+ treatmentId + "");
			int rowDeleted = query.executeUpdate();
			
			
			try {
				org.hibernate.Query historyQuery = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"insert into pharma_indent_amount_history(treatment_id,amount_receive,discount,narration,final_date,amount_balance,indent_time)  values("
										+ treatmentId
										+ ","
										+ amountReceive
										+ ","
										+ discount
										+ ",'"
										+ narration
										+ "','" + date + "','" + amountBalance + "','"
										+ time + "')");
				int rowDeleted1 = historyQuery.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	return true;
}
/*****
 * @author   :BILAL
 * @Date     :19-01-2018
 * @Code     :For due payment details by patient id
 * *******/
@Override
public settalBillIndent getPatientDatabyPatientId(Integer patientId) 
{

	settalBillIndent settalBill = new settalBillIndent();

	SQLQuery query1 = sessionFactory
			.getCurrentSession()
			.createSQLQuery(
					  " SELECT Distinct patient_bill_patient_id,p.patient_name,p.mobile,master.patient_sale_treatmentId,master.patient_sales_bill_id FROM pharma_patient_sales_bill_master master "
                      +" inner join  patient_records_details p on  p.patient_id=master.patient_bill_patient_id  where p.patient_id="+patientId+" order by  master.patient_sales_bill_id desc ");

	
	 /*   Object[] result = (Object[]) query1.uniqueResult();*/
	    List<Object[]> row = query1.list();
	    
	    try
	    {
	    	for (Object[] result : row) 
			{
	    		if(settalBill.getPatientId()==null)
	    		{
	           if(result[0]!=null)
				  settalBill.setPatientId(Integer.parseInt((result[0].toString())));
			   else
				   settalBill.setPatientId(Integer.parseInt(" "));
			  
			   if(result[1]!=null)
				   settalBill.setPatientName((result[1].toString()));
			   
			   if(result[2]!=null)
				   settalBill.setMobile(result[2].toString());
			   
			   if(result[3]!=null)
				   settalBill.setTreatmentId(result[3].toString());
	    		}
			   
			}
	    
		}
	catch (Exception e) {
		e.printStackTrace();
	}
System.out.println(settalBill.getPatientId());

	if(settalBill.getPatientId()==null)
	{
	SQLQuery query = sessionFactory
			.getCurrentSession()
			.createSQLQuery(
					  " SELECT  Distinct p.Patient_ID,p.fName,p.mName,p.lName,p.mobile,t.Treatment_ID FROM pharma_indent_sale_master master "
                      +" inner join pharma_indent_master indent on indent.indent_id=master.indent_sale_indent_no "
                      +" inner join treatment t on t.Treatment_ID=indent.indent_treatement_id inner join patient p on p.Patient_ID=t.Patient_ID where  p.Patient_ID='"+patientId+"' order by  master.indent_sale_id desc; ");

	/*Object[] result1 = (Object[]) query.uniqueResult();*/
	
	List<Object[]> result2 = query.list();
	try
	{
		for (Object[] result1 : result2) 
	   {
			if(settalBill.getPatientId()==null)
			{
        if(result1[1]!=null)
			  settalBill.setPatientId(Integer.parseInt((result1[0].toString())));
		   else
			   settalBill.setPatientId(Integer.parseInt(" "));
		  
		   if(result1[1]!=null)
			   settalBill.setPatientName((result1[1].toString())+" "+(result1[2].toString())+" "+(result1[3].toString()));
		   
		   if(result1[4]!=null)
			   settalBill.setMobile(result1[4].toString());
		   
		   if(result1[5]!=null)
			   settalBill.setTreatmentId(result1[5].toString());
			}
	   }
		
		}
	catch (Exception e) {
		e.printStackTrace();
	}
	}
	return settalBill;
}

}