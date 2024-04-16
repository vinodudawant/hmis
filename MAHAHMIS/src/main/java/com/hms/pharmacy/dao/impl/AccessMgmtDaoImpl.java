package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.AccessMgmtDao;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.FormMaster;
import com.hms.pharmacy.pojo.UserModule;

@Repository
public class AccessMgmtDaoImpl implements AccessMgmtDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<UserModule> getUserModules(String type) {
		List<UserModule> userModules = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UserModule.class);
			criteria.add(Restrictions.eq("moduleDeleteFlag", 0));
			criteria.addOrder(Order.asc("moduleId"));
			
			if(type.equals("all"))
			{
				
			}
			else
			{	
				criteria.setMaxResults(10);
			}	
			userModules = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return userModules;
		}
		return userModules;
	}

	@Override
	public boolean saveOrUpdateUserModule(UserModule userModule) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(userModule);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public JSONArray getUserAccessByUserId(String userId){
		
		JSONArray jsonArray=new JSONArray();
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("select module_id,delete_flag from pharma_user_access access where user_id='"+userId+"'");
		List<Object[]> rows = query.list();
		for(Object[] result:rows)
		{
			try
			{
				JSONObject jsonObject=new JSONObject();
				if(result[0]!=null)
				{
					jsonObject.put("moduleId", result[0].toString());
				}
				else
				{
					jsonObject.put("moduleId",0);
				}
				if(result[1]!=null)
				{
					jsonObject.put("deleteFlag", result[1].toString());
				}
				else
				{
					jsonObject.put("deleteFlag", 0);
				}
				jsonArray.put(jsonObject);
			}
			
			catch(Exception e)
			{
				e.printStackTrace();
			}
			
		}
		System.out.println(jsonArray);
		return jsonArray;
	}

	@Override
	public void saveUserAccessDetails(String userId, List<String> accessList,String type) {
		
		if(type.equals("single"))
		{
			try
			{
				for(String access:accessList)
				{
					org.hibernate.Query query = sessionFactory.getCurrentSession()
							.createSQLQuery("insert into pharma_user_access(user_id,module_id) values('"+userId+"','"+access+"')");
					int rowDeleted = query.executeUpdate();
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
				for(String access:accessList)
				{
					org.hibernate.Query query = sessionFactory.getCurrentSession()
							.createSQLQuery("insert into pharma_user_access(user_id,module_id) values('"+userId+"','"+access+"')");
					int rowDeleted = query.executeUpdate();
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		
	}

	@Override
	public JSONArray getUserAccessModuleList() {
		JSONArray jsonArray=new JSONArray();
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("select user_id,module_name,delete_flag,user_access_id from pharma_user_access access inner join pharma_user_module module on module.module_id=access.module_id");
		List<Object[]> rows = query.list();
		for(Object[] result:rows)
		{
			try
			{
				JSONObject jsonObject=new JSONObject();
				if(result[0]!=null)
				{
					jsonObject.put("userId", result[0].toString());
				}
				else
				{
					jsonObject.put("userId",0);
				}
				if(result[1]!=null)
				{
					jsonObject.put("moduleName", result[1].toString());
				}
				else
				{
					jsonObject.put("moduleName", 0);
				}
				if(result[2]!=null)
				{
					jsonObject.put("deleteFlag", result[2].toString());
				}
				else
				{
					jsonObject.put("deleteFlag", 0);
				}
				if(result[3]!=null)
				{
					jsonObject.put("userAccessId", result[3].toString());
				}
				else
				{
					jsonObject.put("userAccessId", 0);
				}
				jsonArray.put(jsonObject);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public JSONArray getUserAccessDetailsById(String userId) {
		JSONArray jsonArray=new JSONArray();
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("select access.module_id,module_name from pharma_user_access access inner join pharma_user_module module on module.module_id=access.module_id where user_id='"+userId+"' and delete_flag=0;");
		List<Object[]> rows = query.list();
		for(Object[] result:rows)
		{
			try
			{
				JSONObject jsonObject=new JSONObject();
				if(result[0]!=null)
				{
					jsonObject.put("moduleId", result[0].toString());
				}
				else
				{
					jsonObject.put("moduleId",0);
				}
				
				if(result[1]!=null)
				{
					jsonObject.put("moduleName", result[1].toString());
				}
				else
				{
					jsonObject.put("moduleName",0);
				}
				jsonArray.put(jsonObject);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		return jsonArray;
	}

	@Override
	public String getDataByUserAccessId(String userId, String accessId) {
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("select delete_flag from pharma_user_access where user_id='"+userId+"' and module_id='"+accessId+"';");
		Integer result = (Integer) query.uniqueResult();
		if(result==null)
		{
			return new String();
		}
		else
		{
			return result.toString();
		}
		
	}

	@Override
	public void updateUserAccessDetails(String userId,
			List<String> accessList,String type) {
		try
		{
			for(String access:accessList)
			{
				String status="0";
				if(type.equals("deactive"))
				{
					status="1";
				}
				
				org.hibernate.Query query = sessionFactory.getCurrentSession()
						.createSQLQuery("update pharma_user_access set delete_flag='"+status+"' where user_id='"+userId+"' and module_id='"+access+"';");
				int rowDeleted = query.executeUpdate();
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
	
	@Override
	public List<UserModule> getAutoSuggestionModuleNames(String letter) 
	{
		// TODO Auto-generated method stub
		List<UserModule> ltCompanyMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UserModule.class);
			criteria.add(Restrictions.eq("moduleDeleteFlag", 0));
			criteria.add(Restrictions.like("moduleName", letter,
					MatchMode.ANYWHERE));
			ltCompanyMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCompanyMasters;
		}
		return ltCompanyMasters;
	}
	
	@Override
	public List<UserModule> getModuleById(Integer moduleId) 
	{
		// TODO Auto-generated method stub
		List<UserModule> ltCatagoryMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UserModule.class);
			criteria.add(Restrictions.eq("moduleDeleteFlag", 0));
			if (moduleId != 0) {
				criteria.add(Restrictions.eq("moduleId", moduleId));
			}

			ltCatagoryMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCatagoryMasters;
		}
		return ltCatagoryMasters;
	}

	@Override
	public Boolean deleteModule(Integer catId) 
	{
		try {
			UserModule userModule = (UserModule) sessionFactory
					.getCurrentSession().get(UserModule.class, catId);
			userModule.setModuleDeleteFlag(1);
			
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
		
		return true;
	}

	@Override
	public List<UserModule> getUserList(String string) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
