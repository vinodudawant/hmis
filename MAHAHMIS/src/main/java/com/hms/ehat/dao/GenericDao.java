package com.hms.ehat.dao;



public interface GenericDao {

	int saveObject(Object className);
	/****
	 * saveObjectForCompositeKey is containg composite
	 * primary key so the retrun type is object not primary key 
	 * this method is same saveObject
	 ****/
	int saveObjectForCompositeKey(Object className);
	Object getOneObject(Class className,int pkId);
	String getStringValOfObject(String tableName, String columnName,int pkId,String pkColumn);
}
