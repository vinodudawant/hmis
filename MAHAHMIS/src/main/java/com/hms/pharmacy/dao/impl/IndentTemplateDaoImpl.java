package com.hms.pharmacy.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.gson.JsonArray;
import com.hms.pharmacy.dao.IndentTemplateDao;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.pojo.IndentTemplateMaster;
import com.hms.pharmacy.pojo.IndentTemplateSlave;
import com.hms.pharmacy.pojo.ProductMaster;

@Repository
public class IndentTemplateDaoImpl implements IndentTemplateDao{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void saveIndentTemplate(IndentTemplateMaster indentTemplateMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(indentTemplateMaster);
		} catch (Exception e) {
			e.printStackTrace();
			
		}
	}

	@Override
	public JSONArray getIndentTemplateDetails() {
		JSONArray jsonArray = new JSONArray();

		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT indent_template_master_id,indent_template_add_date,indent_template_name,indent_template_narration FROM pharma_indent_template_master master where indent_template_delete_flag = 0 order by indent_template_master_id desc;");

		List<Object[]> results = query.list();

		for (Object[] master : results) {
			JsonArray jsonArray2 = new JsonArray();
			try {
				JSONObject jsonObject = new JSONObject();

				if (master[0] != null)
					jsonObject.put("Id", master[0].toString());

				if (master[1] != null)
					jsonObject.put("date", master[1].toString());

				if (master[2] != null)
					jsonObject.put("name", master[2].toString());

				if (master[3] != null)
					jsonObject.put("narration", master[3].toString());

				jsonArray.put(jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public List<IndentTemplateMaster> getIndentTemplateDetailsById(
			Integer indentTemplateId) {
		List<IndentTemplateMaster> consumptionMasters = new ArrayList<IndentTemplateMaster>();

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				IndentTemplateMaster.class);
		criteria.add(Restrictions.eq("indentTemplateDeleteFlag", 0));

		if (indentTemplateId != 0) {
			criteria.add(Restrictions.eq("indentTemplateId", indentTemplateId));
		}

		IndentTemplateMaster wardConsumptionMaster = new IndentTemplateMaster();

		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("indentTemplateId"));
		proList.add(Projections.property("indentTemplateAddDate"));
		proList.add(Projections.property("indentTemplateNarration"));
		proList.add(Projections.property("indentTemplateName"));
		proList.add(Projections.property("indentTemplateIp"));
		proList.add(Projections.property("indentTemplateAddUserId"));
		proList.add(Projections.property("indentTemplateAddTime"));
		proList.add(Projections.property("indentTemplateAddDate"));

		criteria.setProjection(proList);
		List<Object[]> result = criteria.list();
		try {
			for (Object[] row : result) {

				if (row[0] != null)
					wardConsumptionMaster.setIndentTemplateId(Integer.parseInt(row[0]
							.toString()));

				if (row[1] != null) {

					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy/MM/dd");
					String str[] = row[1].toString().split(" ");
					String date[] = str[0].split("-");
					StringBuffer stringBuffer = new StringBuffer();
					stringBuffer
							.append(date[2] + "/" + date[1] + "/" + date[0]);
					wardConsumptionMaster.setIndentTemplateIp(stringBuffer
							.toString());
				}

				if (row[2] != null) {
					wardConsumptionMaster.setIndentTemplateNarration(row[2]
							.toString());
				}
				
				if (row[3] != null) {
					wardConsumptionMaster.setIndentTemplateName(row[3]
							.toString());
				}
				
				if (row[4] != null) {
					wardConsumptionMaster.setIndentTemplateIp(row[4]
							.toString());
				}
				
				if (row[5] != null) {
					wardConsumptionMaster.setIndentTemplateAddUserId(Integer.parseInt(row[5]
							.toString()));
				}
				
				if (row[6] != null) {
					wardConsumptionMaster.setIndentTemplateAddTime(row[6]
							.toString());
				}
				
				if (row[7] != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat(
							"yyyy-MM-dd");
					Date date=dateFormat.parse(row[7].toString());
					
					wardConsumptionMaster.setIndentTemplateAddDate(date);
				}
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<IndentTemplateSlave> consumptionSlaves = new ArrayList<IndentTemplateSlave>();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select slave.indent_template_slave_qty,slave.indent_template_slave_narration,product.product_name,drug.drug_name,product.product_id,slave.indent_template_slave_id from pharma_indent_template_master master inner join pharma_indent_template_slave slave ON slave.indent_template_slave_master_id = master.indent_template_master_id inner join pharma_product_master product ON product.product_id = slave.indent_template_slave_product_id inner join pharma_drug_master drug on drug.drug_id=product.product_drug_id where master.indent_template_master_id ='"+indentTemplateId+"'"); 
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				IndentTemplateSlave wardConsumptionSlave = new IndentTemplateSlave();

				if (row[0] != null) {
					String result1[] = row[0].toString().split("\\.");
					wardConsumptionSlave.setProductQty(Integer
							.parseInt(result1[0]));
				}

				if (row[1] != null)
					wardConsumptionSlave
							.setIndentTemplateSlaveNarration(row[1].toString());
				else
					wardConsumptionSlave.setIndentTemplateSlaveNarration("");

				ProductMaster  productMaster= new ProductMaster();
				if (row[2] != null) {
					productMaster.setProductName(row[2].toString());
					
				} else {
					productMaster.setProductName("");
				}
				
				if (row[3] != null) {
					DrugMaster drugMaster=new DrugMaster();
					drugMaster.setDrugName(row[3].toString());
					
					productMaster.setDrugMaster(drugMaster);
				} 
				
				if (row[4] != null) {
					productMaster.setProductId(Integer.parseInt(row[4].toString()));
				}
				
				if (row[5] != null) {
					wardConsumptionSlave.setIndentTemplateSlaveId(Integer.parseInt(row[5].toString()));
				}
				
				wardConsumptionSlave.setProductMaster(productMaster);

				consumptionSlaves.add(wardConsumptionSlave);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		wardConsumptionMaster.setIndentTemplateSlaves(consumptionSlaves);

		consumptionMasters.add(wardConsumptionMaster);

		return consumptionMasters;
	}

	@Override
	public void deleteIndentTemplateDetails(Integer indentTemplateId) {
		try {
			String stringQuery="update pharma_indent_template_master set  indent_template_delete_flag=1 where indent_template_master_id="+ indentTemplateId;
			org.hibernate.Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(stringQuery);
			int rowDeleted = query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
}
