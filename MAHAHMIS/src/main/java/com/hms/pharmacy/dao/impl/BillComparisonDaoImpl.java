package com.hms.pharmacy.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.BillComparisonDao;

import com.hms.pharmacy.pojo.ReportPurchase;


@Repository
public class BillComparisonDaoImpl implements BillComparisonDao {

	@Autowired
	SessionFactory sessionFactory;
	
	/*******
	 * @author    :BILAL
	 * @Date      :12-03-2018
	 * @Code      :For Bill Comparison 
	 * *******/
	@Override
	public List<ReportPurchase> getpurchaseData(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();
		SQLQuery query = null;

		try {
			
			
				String str=			"select master.pur_bill_date,vendor.vendor_name,slave.pur_slave_rate,slave.pur_slave_amt,produ.product_name, "
									+ " master.pur_less,slave.pur_slave_bill_rate,slave.pur_slave_disc,slave.pur_hsn,slave.pur_slave_purchase_rate,slave.pur_slave_vat,slave.pur_igst"
						            + " from pharma_purchase_slave slave inner join  pharma_purchase_master master ON slave.pur_slave_master_id = master.pur_id inner join "
									+ " pharma_vendor_master vendor ON vendor.vendor_id = master.pur_vendor_id inner join "
						            +" pharma_product_master produ ON produ.product_id = slave.pur_slave_product_id where master.pur_delete_Flag = 0";
               
			    if(!fromDate.equals("0") && !toDate.equals("0")){
	            	   str=  str + " and pur_bill_date between '"
									+ fromDate + "' and '" + toDate + "' ";
	            }
				
			   if (productId > 0) {
            	  str=  str + " and slave.pur_slave_product_id= "+ productId;
			   }
               if (vendortId > 0) {
             	  str=  str + " and master.pur_vendor_id= "+ vendortId;
 			   }
               
               if (unitId > 0) {
              	  str=  str + " and master.unit_id= "+ unitId;
  			   }
               
               if (categoryId > 0) {
               	  str=  str + " and cat.cat_id= "+ categoryId;
   			   }
               
               if (companyId > 0) {
                	  str=  str + " and comp.comp_id= "+ companyId;
    		   }
			
               if (! purtranstype.equals("3")) {
            	   str=  str + " and  master.pur_trans_type= "+ purtranstype;
			   }
               
			query = sessionFactory.getCurrentSession().createSQLQuery(
					str);

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {

				ReportPurchase reportPurchase = new ReportPurchase();

				if (row[0] != null)
					reportPurchase.setBillDate(row[0].toString());
				else
					reportPurchase.setBillDate("");

				if (row[1] != null)
					reportPurchase.setVendorName(row[1].toString());
				else
					reportPurchase.setVendorName("");

				
				if (row[2] != null)
					reportPurchase.setRate(row[2].toString());
				else
					reportPurchase.setRate("");
				
				if (row[3] != null)
					reportPurchase.setAmount(row[3].toString());
				else
					reportPurchase.setAmount("");
				
				if (row[4] != null)
					reportPurchase.setProductName(row[4].toString());
				else
					reportPurchase.setProductName("");
				
				if (row[5] != null)
					reportPurchase.setTotalLess(Float.parseFloat(row[5].toString()));
				else
					reportPurchase.setTotalLess(0F);
				
				
				if (row[6] != null)
					reportPurchase.setPurRate(Double.parseDouble(row[6].toString()));
				else
					reportPurchase.setPurRate(0.0);
				
				if (row[7] != null)
					reportPurchase.setDisc(row[7].toString());
				else
					reportPurchase.setDisc("0");
				
				if (row[8] != null)
					reportPurchase.setHsncode(row[8].toString());
				else
					reportPurchase.setHsncode("0");
				
				if (row[9] != null)
					reportPurchase.setPurRateWithGST(Double.parseDouble(row[9].toString()));
				else
					reportPurchase.setPurRateWithGST(0.0);
				String x=row[10].toString();
				String y=row[11].toString();
				double gst=Double.parseDouble(x);
				double igst=Double.parseDouble(y);
				
				if (row[10] != null)
					if(gst > 0)
					reportPurchase.setDgstPers(Double.parseDouble(row[10].toString()));
					
				if (row[11] != null)
					if(igst > 0)
						reportPurchase.setDgstPers(Double.parseDouble(row[11].toString()));
				
				
				reportPurchases.add(reportPurchase);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return reportPurchases;
	}

}
