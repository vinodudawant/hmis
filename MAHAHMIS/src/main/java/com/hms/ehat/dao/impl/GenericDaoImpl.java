package com.hms.ehat.dao.impl;

import java.sql.Connection;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.constants.MsSqlServerConnection;
import com.hms.ehat.dao.GenericDao;
import com.hms.ehat.dto.DeptMasterDto;

@Repository
public class GenericDaoImpl implements GenericDao{

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveObject(Object className) {
		int id=0;
		
		try {
			 id =(Integer) sessionFactory.getCurrentSession().save(className);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		return id;
	}

	@Override
	public Object getOneObject(Class className, int pkId) {
		
		Object obj = sessionFactory.getCurrentSession().get(className, pkId);
		return obj;
	}

	@Override
	public String getStringValOfObject(String tableName, String columnName,
			int pkId, String pkColumn) {
		
		String value = (String) sessionFactory
				.getCurrentSession().createSQLQuery("SELECT ifnull("+columnName+",'-') FROM "+tableName+" where "+pkColumn+"="+pkId+"").uniqueResult();
	
		if(value==null){
			
			value="0";
		}
		return value;
	}


	@Override
	public int saveObjectForCompositeKey(Object className) {
		int id=0;
		
		try {
		 sessionFactory.getCurrentSession().save(className);
		 id=1;
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		return id;
	}	
	
}
