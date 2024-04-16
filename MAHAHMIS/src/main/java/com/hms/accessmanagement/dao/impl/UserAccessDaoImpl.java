package com.hms.accessmanagement.dao.impl;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.accessmanagement.dao.UserAccessDao;
import com.hms.ehat.dto.LoginHistory;

@Repository
public class UserAccessDaoImpl implements UserAccessDao{

	@Autowired
	SessionFactory sessionFactory;
	//static Logger log = Logger.getLogger(UsersDaoImpl.class.getName());

	@Override
	public String saveModule(JSONObject jsonObject) {
		try {
			String query="insert into ehat_user_access_module_master (module_name,status,added_by,added_on,remote_ip,land_page_name,ModSequence,checkModule) values('"+jsonObject.get("moduleName")+"','Y','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"','"+jsonObject.get("landPage")+"','"+jsonObject.get("ModSequence")+"','"+jsonObject.get("checkModule")+"')";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Module Inserted Successfully";
	}

	@Override
	public String updateModule(JSONObject jsonObject) {
		try {
			String query="update ehat_user_access_module_master set module_name='"+jsonObject.get("moduleName")+"',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"',land_page_name='"+jsonObject.get("landPage")+"',ModSequence='"+jsonObject.get("ModSequence")+"',checkModule='"+jsonObject.get("checkModule")+"' where module_id='"+jsonObject.get("moduleId")+"'";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Module Updated Successfully";
	}

	@Override
	public String deleteModule(JSONObject jsonObject) {
		try {
			String query="update ehat_user_access_module_master set status='N',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where module_id='"+jsonObject.get("moduleId")+"'";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Module Deleted Successfully";
	}

	@Override
	public JSONArray getAllModule() {
		JSONArray moduleArray=new JSONArray();
		try{
		String query="select * from ehat_user_access_module_master where status = 'Y'";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       JSONObject jsonObject=new JSONObject();
		   jsonObject.put("moduleId", row.get("module_id").toString());
		   jsonObject.put("moduleName", row.get("module_name"));
		   moduleArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return moduleArray;
	}

	@Override
	public JSONObject getModuleByModuleId(Integer moduleId) {
		JSONObject jsonObject=new JSONObject();
		try{
		String query="select * from ehat_user_access_module_master where module_id="+moduleId;
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query,new Object[] { moduleId });
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

		   jsonObject.put("moduleId", moduleId);
		   jsonObject.put("moduleName", row.get("module_name"));
		   jsonObject.put("landPage", row.get("land_page_name"));
		   jsonObject.put("ModSequence", row.get("ModSequence"));	   
		   jsonObject.put("checkModule", row.get("checkModule"));
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}

	@Override
	public JSONArray getAllSubModule() {
		JSONArray subModuleArray=new JSONArray();
		try{
		String query="select * from ehat_user_access_sub_module_master where status = 'Y'";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       JSONObject jsonObject=new JSONObject();
	       jsonObject.put("subModuleId", row.get("sub_module_id").toString());
		   jsonObject.put("subModuleName", row.get("sub_module_name"));
		   jsonObject.put("subModuleType", row.get("sub_module_type"));
		   jsonObject.put("moduleId", row.get("module_id").toString());
		   jsonObject.put("moduleName", row.get("module_name"));
		   jsonObject.put("subModId", row.get("sub_mod_id"));
		   jsonObject.put("jspPageName", (String)row.get("jsp_page_name"));
		   jsonObject.put("subSequence", row.get("sub_Sequence"));
		   jsonObject.put("checksub", row.get("checksub"));
		   

		   subModuleArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return subModuleArray;
	}

	@Override
	public String saveSubModule(JSONObject jsonObject) {
		try {
			String query="insert into ehat_user_access_sub_module_master (sub_module_name,module_id,sub_mod_id,status,added_by,added_on,remote_ip,sub_module_type,jsp_page_name,sub_Sequence,checksub) values('"+jsonObject.get("subModuleName")+"','"+jsonObject.get("moduleId")+"','"+jsonObject.get("subModId")+"','Y','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"','"+jsonObject.get("subModuleType")+"','"+jsonObject.get("jspPageName")+"','"+jsonObject.get("subSequence")+"','"+jsonObject.get("checksub")+"')";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Sub Module Inserted Successfully";
	}

	@Override
	public JSONArray getAllSubModuleByModuleId(Integer moduleId) {
		JSONArray subModuleArray=new JSONArray();
		try{
		String query="select ehat_user_access_sub_module_master.*,module_master.module_name from ehat_user_access_sub_module_master"
		+" inner join ehat_user_access_module_master module_master on ehat_user_access_sub_module_master.module_id = module_master.module_id"
		+" where ehat_user_access_sub_module_master.status = 'Y' and ehat_user_access_sub_module_master.module_id ="+moduleId;
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       JSONObject jsonObject=new JSONObject();
	       jsonObject.put("subModuleId", row.get("sub_module_id").toString());
		   jsonObject.put("subModuleName", row.get("sub_module_name"));
		   jsonObject.put("subModuleType", row.get("sub_module_type"));
		   jsonObject.put("moduleId", moduleId);
		   jsonObject.put("moduleName", row.get("module_name"));
		   jsonObject.put("jspPageName", row.get("jsp_page_name"));
		   jsonObject.put("subSequence", row.get("sub_Sequence"));
		   jsonObject.put("checksub", row.get("checksub"));
		   

		   subModuleArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return subModuleArray;
	}

	@Override
	public String updateSubModule(JSONObject jsonObject) {
		try {
			String query="update ehat_user_access_sub_module_master set sub_module_name='"+jsonObject.get("subModuleName")+"',module_id='"+jsonObject.get("moduleId")+"',sub_mod_id='"+jsonObject.get("subModId")+"',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"',sub_module_type='"+jsonObject.get("subModuleType")+"',jsp_page_name='"+jsonObject.get("jspPageName")+"',sub_Sequence='"+jsonObject.get("subSequence")+"',checksub='"+jsonObject.get("checksub")+"' where sub_module_id='"+jsonObject.get("subModuleId")+"'";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();

			String update="update ehat_user_access_sub_module_master set module_id='"+jsonObject.get("moduleId")+"' where sub_mod_id = '"+jsonObject.get("subModuleId")+"'";
			//getJdbcTemplate().update(update);
			SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(update);
			sqlQuery2.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Sub Module Updated Successfully";
	}

	@Override
	public String deleteSubModule(JSONObject jsonObject) {
		try {
			String query="update ehat_user_access_sub_module_master set status='N',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where sub_module_id='"+jsonObject.get("subModuleId")+"'";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Sub Module Deleted Successfully";
	}

	@Override
	public JSONObject getSubModuleBySubModuleId(Integer subModuleId) {
		JSONObject jsonObject=new JSONObject();
		try{
		String query="select * from ehat_user_access_sub_module_master where status = 'Y' and sub_module_id = "+subModuleId;
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       jsonObject.put("subModuleId", subModuleId);
		   jsonObject.put("subModuleName", row.get("sub_module_name"));
		   jsonObject.put("subModuleType", row.get("sub_module_type"));
		   jsonObject.put("moduleId", row.get("module_id").toString());
		   jsonObject.put("subModId", row.get("sub_mod_id"));
		   jsonObject.put("jspPageName", (String)row.get("jsp_page_name"));
		   jsonObject.put("subSequence", row.get("sub_Sequence"));
		   jsonObject.put("checksub", (String)row.get("checksub"));
		   

	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}

	@Override
	public String saveProfile(JSONObject jsonObject) {
		try {
			String query="insert into ehat_user_access_profile_master (profile_name,status,module_view_access,module_edit_access,module_delete_access,sub_module_view_access,sub_module_edit_access,sub_module_delete_access,sub_module_on_off_access,added_by,added_on,remote_ip) values('"+jsonObject.get("profileName")+"','Y','"+jsonObject.get("userModuleAccessView")+"','"+jsonObject.get("userModuleAccessEdit")+"','"+jsonObject.get("userModuleAccessDelete")+"','"+jsonObject.get("userSubModuleAccessView")+"','"+jsonObject.get("userSubModuleAccessEdit")+"','"+jsonObject.get("userSubModuleAccessDelete")+"','"+jsonObject.get("userSubModuleOnOff")+"','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"')";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Profile Inserted Successfully";
	}

	@Override
	public JSONArray getAllProfile() {
		JSONArray userArray=new JSONArray();
		try{
		String query="SELECT * FROM ehat_user_access_profile_master where status = 'Y'";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       JSONObject jsonObject=new JSONObject();
	       jsonObject.put("profileId", row.get("profile_id").toString());
	       jsonObject.put("profileName", row.get("profile_name").toString());
		   userArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userArray;
	}

	@Override
	public JSONObject getProfileByProfileId(String profileId) {
		JSONObject jsonObject=new JSONObject();
		try{
		String query="select * from ehat_user_access_profile_master where status = 'Y' and profile_id = "+profileId;
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	    	jsonObject.put("profileId", row.get("profile_id").toString());
			jsonObject.put("profileName", row.get("profile_name").toString());
			jsonObject.put("userModuleAccessView", row.get("module_view_access").toString());
			jsonObject.put("userModuleAccessEdit", row.get("module_edit_access").toString());
			jsonObject.put("userModuleAccessDelete", row.get("module_delete_access").toString());
			jsonObject.put("userSubModuleAccessView", row.get("sub_module_view_access").toString());
			jsonObject.put("userSubModuleAccessEdit", row.get("sub_module_edit_access").toString());
			jsonObject.put("userSubModuleAccessDelete", row.get("sub_module_delete_access").toString());
			jsonObject.put("userSubModuleAccessOnOff", row.get("sub_module_on_off_access").toString());
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}

	@Override
	public String deleteProfile(JSONObject jsonObject) {
		String response = "";
		try {
			HashSet<String> profileHashSet = new HashSet<String>();
			String checkProfileQuery="select group_concat(profile_id separator ',') as profile_id from ehat_user_access_role_master where status='Y' group by 'all'"
					+"union select group_concat(profile_id separator ',') from user_access_mgmt_master group by 'all'";
			//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(checkProfileQuery);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(checkProfileQuery);
			sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = sqlQuery.list();
		    for(Map<String, Object> row : masterRow){

		    	if(row.get("profile_id")!=null && row.get("profile_id")!="" && row.get("profile_id")!="null"){
		    		String profile[] = row.get("profile_id").toString().split(",");
		    		for(int i=0;i<profile.length;i++){
		    			if(profile[i]!=null && !profile[i].equals("")){
		    				profileHashSet.add(profile[i]);
		    			}
		    		}
		    	}
		     }
		    if(!profileHashSet.contains(jsonObject.get("profileId"))){
		    	String deleteProfileQuery="update ehat_user_access_profile_master set status='N',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where profile_id='"+jsonObject.get("profileId")+"'";
		    	//getJdbcTemplate().update(deleteProfileQuery);
		    	SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(deleteProfileQuery);
				sqlQuery2.executeUpdate();
		    	response = "Profile Deleted Successfully";
			}
		    else{
		    	response = "Profile is assigned to another role OR user so not able to delete it..!!!";
		    }
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return response;
	}

	@Override
	public String updateProfile(JSONObject jsonObject) {
		try {
			String query="update ehat_user_access_profile_master set profile_name='"+jsonObject.get("profileName")+"',status='Y',module_view_access='"+jsonObject.get("userModuleAccessView")+"',module_edit_access='"+jsonObject.get("userModuleAccessEdit")+"',module_delete_access='"+jsonObject.get("userModuleAccessDelete")+"',sub_module_view_access='"+jsonObject.get("userSubModuleAccessView")+"',sub_module_edit_access='"+jsonObject.get("userSubModuleAccessEdit")+"',sub_module_delete_access='"+jsonObject.get("userSubModuleAccessDelete")+"',sub_module_on_off_access='"+jsonObject.get("userSubModuleOnOff")+"',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where profile_id='"+jsonObject.get("profileId")+"'";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Profile Updated Successfully";
	}

	@Override
	public String saveRole(JSONObject jsonObject) {
		try {
			String query="insert into ehat_user_access_role_master (role_name,status,module_view_access,module_edit_access,module_delete_access,sub_module_view_access,sub_module_edit_access,sub_module_delete_access,sub_module_on_off_access,added_by,added_on,remote_ip,profile_id,privilege_type) values('"+jsonObject.get("roleName")+"','Y','"+jsonObject.get("userModuleAccessView")+"','"+jsonObject.get("userModuleAccessEdit")+"','"+jsonObject.get("userModuleAccessDelete")+"','"+jsonObject.get("userSubModuleAccessView")+"','"+jsonObject.get("userSubModuleAccessEdit")+"','"+jsonObject.get("userSubModuleAccessDelete")+"','"+jsonObject.get("userSubModuleOnOff")+"','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"','"+jsonObject.get("profileId")+"','"+jsonObject.get("privilegesType")+"')";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Role Inserted Successfully";
	}

	@Override
	public String updateRole(JSONObject jsonObject) {
		try {
			String query="update ehat_user_access_role_master set role_name='"+jsonObject.get("roleName")+"',status='Y',module_view_access='"+jsonObject.get("userModuleAccessView")+"',module_edit_access='"+jsonObject.get("userModuleAccessEdit")+"',module_delete_access='"+jsonObject.get("userModuleAccessDelete")+"',sub_module_view_access='"+jsonObject.get("userSubModuleAccessView")+"',sub_module_edit_access='"+jsonObject.get("userSubModuleAccessEdit")+"',sub_module_delete_access='"+jsonObject.get("userSubModuleAccessDelete")+"',sub_module_on_off_access='"+jsonObject.get("userSubModuleOnOff")+"',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"',privilege_type='"+jsonObject.get("privilegesType")+"',profile_id='"+jsonObject.get("profileId")+"' where role_id='"+jsonObject.get("roleId")+"'";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Role Updated Successfully";
	}

	@Override
	public String deleteRole(JSONObject jsonObject) {
		String response = "";
		try {
			HashSet<String> roleHashSet = new HashSet<String>();
			String checkRoleQuery="select group_concat(role_id separator ',') as role_id from user_access_mgmt_master group by 'all'";
			//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(checkRoleQuery);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(checkRoleQuery);
			sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = sqlQuery.list();
		    for(Map<String, Object> row : masterRow){

		    	if(row.get("role_id")!=null && row.get("role_id")!="" && row.get("role_id")!="null"){
		    		String role[] = row.get("role_id").toString().split(",");
		    		for(int i=0;i<role.length;i++){
		    			if(role[i]!=null && !role[i].equals("")){
		    				roleHashSet.add(role[i]);
		    			}
		    		}
		    	}
		     }
		    if(!roleHashSet.contains(jsonObject.get("roleId"))){
		    	String deleteRoleQuery="update ehat_user_access_role_master set status='N',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where role_id='"+jsonObject.get("roleId")+"'";
				//getJdbcTemplate().update(deleteRoleQuery);
		    	SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(deleteRoleQuery);
				sqlQuery2.executeUpdate();
		    	response = "Role Deleted Successfully";
			}
		    else{
		    	response = "Role is assigned to user so not able to delete it..!!!";
		    }
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return response;
	}

	@Override
	public JSONObject getRoleByRoleId(Integer roleId) {
		JSONObject jsonObject=new JSONObject();
		try{
		String query="select * from ehat_user_access_role_master where status = 'Y' and role_id = "+roleId;
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	    	jsonObject.put("roleId", row.get("role_id").toString());
		    jsonObject.put("roleName", row.get("role_name").toString());
		    jsonObject.put("profileId", row.get("profile_id").toString());
			jsonObject.put("privilegesType", row.get("privilege_type").toString());
			jsonObject.put("userModuleAccessView", row.get("module_view_access").toString());
			jsonObject.put("userModuleAccessEdit", row.get("module_edit_access").toString());
			jsonObject.put("userModuleAccessDelete", row.get("module_delete_access").toString());
			jsonObject.put("userSubModuleAccessView", row.get("sub_module_view_access").toString());
			jsonObject.put("userSubModuleAccessEdit", row.get("sub_module_edit_access").toString());
			jsonObject.put("userSubModuleAccessDelete", row.get("sub_module_delete_access").toString());
			jsonObject.put("userSubModuleAccessOnOff", row.get("sub_module_on_off_access").toString());
	     }
	} catch (Exception e) {
		e.printStackTrace();
	}
		return jsonObject;
	}

	@Override
	public JSONArray getAllRole() {
		JSONArray roleArray=new JSONArray();
		try{
		String query="SELECT * FROM ehat_user_access_role_master where status = 'Y'";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       JSONObject jsonObject=new JSONObject();
	       jsonObject.put("roleId", row.get("role_id").toString());
	       jsonObject.put("roleName", row.get("role_name").toString());
		   roleArray.add(jsonObject);
	     }
	} catch (Exception e) {
		e.printStackTrace();
	}
		return roleArray;
	}

	@Override
	public JSONArray getProfileAccessByProfile(String profileId) {
		JSONArray profileAccessArray=new JSONArray();
		try{
		if(profileId!=null && profileId!="")
		{
			String[] profile = profileId.split(",");
			for(int i=0;i<profile.length;i++){
				JSONObject jsonObject=new JSONObject();
				String query="select * from ehat_user_access_profile_master where status = 'Y' and profile_id = "+profile[i];
				//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
				SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
				sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = sqlQuery.list();
			    for(Map<String, Object> row : masterRow){

			    	jsonObject.put("profileId", row.get("profile_id").toString());
					jsonObject.put("profileName", row.get("profile_name").toString());
					jsonObject.put("userModuleAccessView", row.get("module_view_access").toString());
					jsonObject.put("userModuleAccessEdit", row.get("module_edit_access").toString());
					jsonObject.put("userModuleAccessDelete", row.get("module_delete_access").toString());
					jsonObject.put("userSubModuleAccessView", row.get("sub_module_view_access").toString());
					jsonObject.put("userSubModuleAccessEdit", row.get("sub_module_edit_access").toString());
					jsonObject.put("userSubModuleAccessDelete", row.get("sub_module_delete_access").toString());
					jsonObject.put("userSubModuleAccessOnOff", row.get("sub_module_on_off_access").toString());
			}
			    profileAccessArray.add(jsonObject);
	     }
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
		return profileAccessArray;
	}

	@Override
	public JSONArray getRoleAccessByRole(String roleId) {
		JSONArray roleAccessArray=new JSONArray();
		try{
		if(roleId!=null && roleId!="")
		{
			String[] role = roleId.split(",");
			for(int i=0;i<role.length;i++){
				JSONObject jsonObject=new JSONObject();
				String query="select * from ehat_user_access_role_master where status = 'Y' and role_id = "+role[i];
				//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
				SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
				sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = sqlQuery.list();
			    for(Map<String, Object> row : masterRow){

			    	jsonObject.put("roleId", row.get("role_id").toString());
					jsonObject.put("roleName", row.get("role_name").toString());
					jsonObject.put("privilegeType", row.get("privilege_type").toString());
					jsonObject.put("profileId", row.get("profile_id").toString());
					jsonObject.put("userModuleAccessView", row.get("module_view_access").toString());
					jsonObject.put("userModuleAccessEdit", row.get("module_edit_access").toString());
					jsonObject.put("userModuleAccessDelete", row.get("module_delete_access").toString());
					jsonObject.put("userSubModuleAccessView", row.get("sub_module_view_access").toString());
					jsonObject.put("userSubModuleAccessEdit", row.get("sub_module_edit_access").toString());
					jsonObject.put("userSubModuleAccessDelete", row.get("sub_module_delete_access").toString());
					jsonObject.put("userSubModuleAccessOnOff", row.get("sub_module_on_off_access").toString());
			}
			    roleAccessArray.add(jsonObject);
	     }
		}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return roleAccessArray;
	}

	@Override
	public String saveUserAccess(JSONObject jsonObject) {
		try {
			String sql = "SELECT count(user_access_id) FROM user_access_mgmt_master WHERE user_id ="+jsonObject.get("userId");
			//int count = getJdbcTemplate().queryForObject(sql, new Object[] { jsonObject.get("userId")}, Integer.class);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number) sqlQuery.uniqueResult()).intValue();
			if (count == 0) {
				String query="insert into user_access_mgmt_master (status,module_view_access,module_edit_access,module_delete_access,sub_module_view_access,sub_module_edit_access,sub_module_delete_access,sub_module_on_off_access,added_by,added_on,remote_ip,profile_id,privilege_type,role_id,user_id) values('Y','"+jsonObject.get("userModuleAccessView")+"','"+jsonObject.get("userModuleAccessEdit")+"','"+jsonObject.get("userModuleAccessDelete")+"','"+jsonObject.get("userSubModuleAccessView")+"','"+jsonObject.get("userSubModuleAccessEdit")+"','"+jsonObject.get("userSubModuleAccessDelete")+"','"+jsonObject.get("userSubModuleOnOff")+"','"+jsonObject.get("modifyBy")+"','"+jsonObject.get("modifyOn")+"','"+jsonObject.get("remoteAddress")+"','"+jsonObject.get("profileId")+"','"+jsonObject.get("privilegesType")+"','"+jsonObject.get("roleId")+"','"+jsonObject.get("userId")+"')";
				//getJdbcTemplate().update(query);
				SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(query);
				sqlQuery2.executeUpdate();
			}
			else{
				String query="update user_access_mgmt_master set status='Y',module_view_access='"+jsonObject.get("userModuleAccessView")+"',module_edit_access='"+jsonObject.get("userModuleAccessEdit")+"',module_delete_access='"+jsonObject.get("userModuleAccessDelete")+"',sub_module_view_access='"+jsonObject.get("userSubModuleAccessView")+"',sub_module_edit_access='"+jsonObject.get("userSubModuleAccessEdit")+"',sub_module_delete_access='"+jsonObject.get("userSubModuleAccessDelete")+"',sub_module_on_off_access='"+jsonObject.get("userSubModuleOnOff")+"',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"',privilege_type='"+jsonObject.get("privilegesType")+"',profile_id='"+jsonObject.get("profileId")+"', role_id='"+jsonObject.get("roleId")+"' where user_id='"+jsonObject.get("userId")+"'";
				//getJdbcTemplate().update(query);
				SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(query);
				sqlQuery2.executeUpdate();
			}
		} catch (Exception e) {
			System.err.println("database error...could not insert: "+ e.getMessage());
		}
		return "Access Saved Successfully";
	}

	@Override
	public Integer countUserAccess() {
		Integer count=0;
		try {
			String sql = "SELECT count(d.Doctor_ID) FROM doctor d inner join users ON d.User_ID = users.User_ID where softwareUsed = 'Y'";
			//count = getJdbcTemplate().queryForObject(sql, Integer.class);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			count = ((Number) sqlQuery.uniqueResult()).intValue();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return count;
	}

	@Override
	public JSONArray userAccessAutoSuggestion(String search,Integer startIndex) {
		JSONArray userArray=new JSONArray();
		try {
		String query="";
		if(search.equals("")){

			//query="SELECT d.*,u.User_Name,u.f_name,u.l_name FROM doctor d inner join users u on d.User_ID = u.User_ID where u.status = 'Y' and softwareUsed = 'Y' limit "+startIndex+" , 10";
			query="SELECT u.User_ID, d.doc_name, d.email_id, d.doc_type, u.User_Name, u.f_name, u.l_name FROM doctor d inner join users u on d.User_ID = u.User_ID where u.status = 'Y' and softwareUsed = 'Y' limit "+startIndex+" , 10";
		}
		else{
			//query="SELECT doctor.*,doctor.User_ID,users.User_Name,users.f_name,users.l_name FROM doctor inner join users on doctor.User_ID = users.User_ID where users.status = 'Y' and softwareUsed = 'Y' and (doc_name like '%"+search+"%' or doc_type like '%"+search+"%' or email_id like '%"+search+"%' or users.User_Name like '%"+search+"%')";
			query="SELECT users.User_ID, doctor.doc_name, doctor.email_id, doctor.doc_type, users.User_Name, users.f_name, users.l_name FROM doctor inner join users on doctor.User_ID = users.User_ID where users.status = 'Y' and softwareUsed = 'Y' and (doc_name like '%"+search+"%' )";
			//or doc_type like '%Admin%' or \r\n" + //" email_id like '%Admin%' or users.User_Name like '%Admin%')";
		}
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	    	String emailId = (String)row.get("email_id");
	    	if(emailId.equals("") || emailId==null){
	    		emailId = "-";
	    	}
 	       JSONObject jsonObject=new JSONObject();
	       jsonObject.put("userId", row.get("User_ID").toString());
		   jsonObject.put("fullName", row.get("doc_name"));
		   jsonObject.put("emailId", emailId);
		   jsonObject.put("role", row.get("doc_type").toString());
		   jsonObject.put("userName", row.get("User_Name").toString());
		   jsonObject.put("firstName", row.get("f_name"));
		   jsonObject.put("lastName", row.get("l_name"));
		   userArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
			//log.error(e);

		}
		return userArray;
	}

	@Override
	public JSONObject getUser(String userId1) {
		String role="";
		JSONObject jsonObject=new JSONObject();
		try {
		String query="SELECT doctor.*,users.User_Name,users.last_loged_in_date_time FROM doctor inner join users on doctor.User_ID = users.User_ID where doctor.User_ID ="+userId1;
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query,new Object[] { userId1 });
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	    	String emailId = (String)row.get("email_id");
	    	if(emailId.equals("") || emailId==null){
	    		emailId = "-";
	    	}
	    	role = row.get("doc_type").toString();
	       jsonObject.put("userId", userId1);
		   jsonObject.put("fullName", row.get("doc_name"));
		   jsonObject.put("emailId", emailId);
		   jsonObject.put("role", role);
		   jsonObject.put("userName", row.get("User_Name"));
		   jsonObject.put("lastLoginDateTime", row.get("last_loged_in_date_time"));
	    }

	    String sql = "SELECT count(user_access_id) FROM user_access_mgmt_master WHERE user_id ="+jsonObject.get("userId");
		//int count = getJdbcTemplate().queryForObject(sql, new Object[] { jsonObject.get("userId") }, Integer.class);
		SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
		int count = ((Number) sqlQuery2.uniqueResult()).intValue();

		String access="";
		List<Map<String, Object>> rows1;
		if (count == 0) {
			access="select * from ehat_user_access_role_master where status = 'Y' and role_name ='"+role+"' ";
			//rows1 = getJdbcTemplate().queryForList(access,new Object[] { role });
			SQLQuery sqlQuery3 = sessionFactory.getCurrentSession().createSQLQuery(access);
			sqlQuery3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			rows1 = sqlQuery3.list();
		}else{
			access="SELECT * FROM user_access_mgmt_master WHERE user_id ="+userId1;
			//rows1 = getJdbcTemplate().queryForList(access,new Object[] { userId1 });
			SQLQuery sqlQuery3 = sessionFactory.getCurrentSession().createSQLQuery(access);
			sqlQuery3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			rows1 = sqlQuery3.list();
		}

		for(Map<String, Object> row : rows1){
	    	jsonObject.put("roleId", row.get("role_id").toString());
			jsonObject.put("roleName", role);
			jsonObject.put("privilegeType", row.get("privilege_type"));
			jsonObject.put("profileId", row.get("profile_id").toString());
			jsonObject.put("userModuleAccessView", row.get("module_view_access").toString());
			jsonObject.put("userModuleAccessEdit", row.get("module_edit_access").toString());
			jsonObject.put("userModuleAccessDelete", row.get("module_delete_access").toString());
			jsonObject.put("userSubModuleAccessView", row.get("sub_module_view_access").toString());
			jsonObject.put("userSubModuleAccessEdit", row.get("sub_module_edit_access").toString());
			jsonObject.put("userSubModuleAccessDelete", row.get("sub_module_delete_access").toString());
			jsonObject.put("userSubModuleAccessOnOff", row.get("sub_module_on_off_access").toString());
	    }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}

	@Override
	public String savePrint(JSONObject jsonObject) {
		try {
			String query="insert into general_access_print_master (print_name,module_id,status,added_by,added_on,remote_ip) values('"+jsonObject.get("printName")+"','"+jsonObject.get("moduleId")+"','Y','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"')";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Print Inserted Successfully";
	}

	@Override
	public String updatePrint(JSONObject jsonObject) {
		try {
			String query="update general_access_print_master set print_name='"+jsonObject.get("printName")+"',module_id='"+jsonObject.get("moduleId")+"',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where print_id='"+jsonObject.get("printId")+"'";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Print Updated Successfully";
	}

	@Override
	public JSONArray getAllPrint() {
		JSONArray printArray=new JSONArray();
		try{
		String query="select * from general_access_print_master where status = 'Y'";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       JSONObject jsonObject=new JSONObject();
	        jsonObject.put("printId", row.get("print_id").toString());
			jsonObject.put("printName", row.get("print_name"));
			jsonObject.put("moduleId", row.get("module_id").toString());
		   printArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return printArray;
	}

	@Override
	public JSONObject getPrintByPrintId(String printId) {
		JSONObject jsonObject=new JSONObject();
		try{
		String query="select * from general_access_print_master where status = 'Y' and print_id = "+printId;
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	    	jsonObject.put("printId", printId);
			jsonObject.put("printName", row.get("print_name").toString());
			jsonObject.put("moduleId", row.get("module_id").toString());
	     }
	} catch (Exception e) {
		e.printStackTrace();
	}
		return jsonObject;
	}

	@Override
	public String deletePrint(JSONObject jsonObject) {
		try {
			String query="update general_access_print_master set status='N',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where print_id='"+jsonObject.get("printId")+"'";
			//getJdbcTemplate().update(query);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Print Deleted Successfully";
	}

	@Override
	public String savePrintAccess(JSONArray printAccessArray) {
		for(int i=0;i<printAccessArray.size();i++){
		try {
			JSONObject jsonObject = (JSONObject) printAccessArray.get(i);
			String sql = "SELECT count(print_access_id) FROM general_access_print_access_master WHERE print_id ="+jsonObject.get("printId");
			//int count = getJdbcTemplate().queryForObject(sql, new Object[] { jsonObject.get("printId") }, Integer.class);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number) sqlQuery.uniqueResult()).intValue();

			if (count == 0) {
				String query="insert into general_access_print_access_master (status,print_id,print_access,added_by,added_on,remote_ip) values('Y','"+jsonObject.get("printId")+"','"+jsonObject.get("printAccessValue")+"','"+jsonObject.get("modifyBy")+"','"+jsonObject.get("modifyOn")+"','"+jsonObject.get("remoteAddress")+"')";
				//getJdbcTemplate().update(query);
				SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(query);
				sqlQuery2.executeUpdate();
			}
			else{
				String query="update general_access_print_access_master set status='Y',print_id='"+jsonObject.get("printId")+"',print_access='"+jsonObject.get("printAccessValue")+"',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where print_id='"+jsonObject.get("printId")+"'";
				//getJdbcTemplate().update(query);
				SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(query);
				sqlQuery2.executeUpdate();
			}
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		}
		return "Print Access Saved Successfully";
	}

	@Override
	public JSONArray getAllPrintAccess() {
		JSONArray printAccessArray=new JSONArray();
		try{
		String query="select * from general_access_print_access_master where status = 'Y'";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	        JSONObject jsonObject=new JSONObject();
	        jsonObject.put("printId", row.get("print_id").toString());
			jsonObject.put("printAccess", row.get("print_Access"));
		   printAccessArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return printAccessArray;
	}

	@Override
	public JSONObject showAccess(String subModuleId) {
		subModuleId = subModuleId.replaceAll("\\[|\\]", "").replaceAll(",,|,,,|,,,,|,,,,,", "").replaceAll("(,)*$", "").replaceFirst("^,", "");
		JSONObject jsonObject=new JSONObject();
		HashSet<String> moduleView = new HashSet<String>();
		HashSet<String> subModuleView = new HashSet<String>();
		try{
			if(!subModuleId.equals("") && subModuleId!=null){
		String query="select module_id,sub_mod_id from ehat_user_access_sub_module_master where sub_module_id in( "+subModuleId+" )";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       String moduleId = row.get("module_id").toString();
	       String subModId = (String)row.get("sub_mod_id");
	       moduleView.add(moduleId);
	       if(!subModId.equals("") && subModId!=null){
	    	   subModuleView.add(subModId);
	       }
	     }
			}
	    if(!subModuleView.isEmpty()){
	    subModuleId = subModuleView.toString();//moduleView.toString()	+","+
	    subModuleId = subModuleId.replaceAll("\\[|\\]", "").replaceAll("(,)*$", "").replaceFirst("^,", "").replaceAll(",,", ",").replaceAll(", ,", ",");
	    String query1="select module_id,sub_mod_id from ehat_user_access_sub_module_master where sub_module_id in( "+subModuleId+" )";
	    //List<Map<String, Object>> rows1 = getJdbcTemplate().queryForList(query1);
	    SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query1);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	       String moduleId = row.get("module_id").toString();
	       String subModId = (String)row.get("sub_mod_id");
	       moduleView.add(moduleId);
	       subModuleView.add(subModId);
	     }
	    }
	    	jsonObject.put("moduleView", moduleView.toString().replaceAll("\\[|\\]", ""));
		   jsonObject.put("subModuleView", subModuleView.toString().replaceAll("\\[|\\]", ""));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}

	@Override
	public Integer getNextUserId() {
	Integer nextUserId = 0;
	try {
		nextUserId = (Integer) sessionFactory
				.getCurrentSession().createSQLQuery("SELECT max(User_ID) FROM users").uniqueResult();
		nextUserId = nextUserId + 1;
	} catch (Exception e) {
		e.printStackTrace();
	}
	return nextUserId;
	}

	@Override
	public JSONArray getAllUser() {
		JSONArray userArray=new JSONArray();
		try {
		String query="SELECT User_ID,doc_name FROM doctor";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

 	       JSONObject jsonObject=new JSONObject();
	       jsonObject.put("userId", row.get("User_ID").toString());
		   jsonObject.put("fullName", row.get("doc_name"));
		   userArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userArray;
	}

	@Override
	public String saveLoginHistory(JSONObject jsonObject) {
		BigInteger loginHistoryId = null;
		try {

			LoginHistory objLogHistory = new LoginHistory();
			objLogHistory.setCreatedBy(Integer.parseInt(jsonObject.get("userId").toString()));
			objLogHistory.setUnitId(Integer.parseInt(jsonObject.get("unitId").toString()));
			objLogHistory.setUserId(jsonObject.get("userId").toString());
			objLogHistory.setSignInTime(jsonObject.get("signInTime").toString());
			objLogHistory.setRemoteId(jsonObject.get("remoteAddress").toString());
			objLogHistory.setStatus("Y");
			sessionFactory.getCurrentSession().merge(objLogHistory);
			/*
			 * String
			 * saveLoginHistoryQuery="insert into ehat_login_history (status,user_id,sign_in_time,remote_ip) values('Y','"
			 * +jsonObject.get("userId")+"','"+jsonObject.get("signInTime")+"','"+jsonObject
			 * .get("remoteAddress")+"')";
			 * //getJdbcTemplate().update(saveLoginHistoryQuery); SQLQuery sqlQuery =
			 * sessionFactory.getCurrentSession().createSQLQuery(saveLoginHistoryQuery);
			 * sqlQuery.executeUpdate();
			 */

			loginHistoryId = (BigInteger) sessionFactory.getCurrentSession().createSQLQuery("SELECT LAST_INSERT_ID()").uniqueResult();

		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return loginHistoryId.toString();
	}

	@Override
	public String saveLogOutHistory(JSONObject jsonObject) {
		try {
			String updateLoginHistoryQuery="update ehat_login_history set status='N',improper_sign_out_time='"+jsonObject.get("signOutTime")+"' where ehat_login_history_id='"+jsonObject.get("loginHistoryId")+"'";
			//getJdbcTemplate().update(updateLoginHistoryQuery);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(updateLoginHistoryQuery);
			sqlQuery.executeUpdate();
	} catch (Exception e) {
		System.err.println("database error...could not insert: "
				+ e.getMessage());
	}
	return "logout";
	}

	@Override
	public Integer getLoginHistoryCount(String userId) {
		Integer count=0;
		try {
			String loginHistoryCount="";
			if(userId.equals("0")){
				loginHistoryCount="SELECT count(ehat_login_history_id) FROM ehat_login_history inner join doctor on doctor.User_ID = ehat_login_history.user_id";
			}
			else{
				loginHistoryCount="SELECT count(ehat_login_history_id) FROM ehat_login_history inner join doctor on doctor.User_ID = ehat_login_history.user_id where ehat_login_history.user_id = "+userId;
			}
			//count = getJdbcTemplate().queryForObject(loginHistoryCount, Integer.class);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(loginHistoryCount);
			count = ((Number) sqlQuery.uniqueResult()).intValue();

		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return count;
	}

	@Override
	public JSONArray getLoginHistory(String userId, Integer startIndex) {
		JSONArray userArray=new JSONArray();
		try {
		String query="";
		if(userId.equals("0")){
			query="SELECT ehat_login_history.*,doctor.doc_name FROM ehat_login_history left join doctor on ehat_login_history.user_id = doctor.User_ID ORDER BY ehat_login_history_id DESC limit "+startIndex+" , 10";
		}
		else{
			query="SELECT ehat_login_history.*,doctor.doc_name FROM ehat_login_history left join doctor on ehat_login_history.user_id = doctor.User_ID where ehat_login_history.user_id = "+userId+" ORDER BY ehat_login_history_id DESC limit "+startIndex+" , 10";
		}
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	    	String signOutTime = (String)row.get("sign_out_time");
	    	if(signOutTime==null){
	    		signOutTime = "---";
	    	}
	    	String status = "Signed Off";
	    	if(row.get("status").toString().equals("Y")){
	    		status = "Signed In";
	    	}
 	       JSONObject jsonObject=new JSONObject();
	       //jsonObject.put("userId", userId);
		   jsonObject.put("fullName", row.get("doc_name"));
		   jsonObject.put("remoteIp", row.get("remote_ip"));
		   jsonObject.put("signInTime", row.get("sign_in_time"));
		   jsonObject.put("signOutTime", signOutTime);
		   jsonObject.put("status", status);
		   jsonObject.put("improperSignOutTime", row.get("improper_sign_out_time"));
		   userArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userArray;
	}

	@Override
	public JSONArray getUsersLoginOrNew(String type){
		JSONArray userArray=new JSONArray();
		try {
		String query = "";
		if(type.equals("login")){
			query="SELECT Doctor_ID,doc_name,user_name,email_id,doc_type,current_loged_in_date_time,softwareUsed FROM users left join doctor on users.User_ID = doctor.User_ID where loged_in_status='Y'";
		}else if(type.equals("new")){
			query="SELECT Doctor_ID,doc_name,user_name,email_id,doc_type,current_loged_in_date_time,softwareUsed FROM users left join doctor on users.User_ID = doctor.User_ID where STR_TO_DATE(created_date, '%d/%m/%Y') = STR_TO_DATE( date_format( curdate(), '%d/%m/%Y') , '%d/%m/%Y')";
		}
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	    	String emailId = (String)row.get("email_id");
	    	if(emailId.equals("") || emailId==null){
	    		emailId = "-";
	    	}
 	       JSONObject jsonObject=new JSONObject();
	       jsonObject.put("userId", row.get("Doctor_ID").toString());
		   jsonObject.put("fullName", row.get("doc_name"));
		   jsonObject.put("emailId", emailId);
		   jsonObject.put("role", row.get("doc_type").toString());
		   jsonObject.put("userName", row.get("User_Name").toString());
		   jsonObject.put("signInTime", row.get("current_loged_in_date_time"));
		   jsonObject.put("softwareUsed", row.get("softwareUsed"));
		   userArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userArray;
	}

	@Override
	public Integer getLoginHistoryDateWiseCount(String inputDate) {
		Integer count=0;
		try {
			String loginHistoryCount="";
			if(inputDate.equals("0")){
				loginHistoryCount="SELECT count(ehat_login_history_id) FROM ehat_login_history inner join doctor on doctor.User_ID = ehat_login_history.user_id";
			}
			else{
				loginHistoryCount="SELECT count(ehat_login_history_id) FROM ehat_login_history inner join doctor on doctor.User_ID = ehat_login_history.user_id where ehat_login_history.sign_in_time LIKE '"+inputDate+"%"+"' ";
			}
			//count = getJdbcTemplate().queryForObject(loginHistoryCount, Integer.class);
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(loginHistoryCount);
			count = ((Number) sqlQuery.uniqueResult()).intValue();
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return count;
	}

	@Override
	public JSONArray getLoginHistoryDateWise(String inputDate,
			Integer startIndex) {
		System.err.println("DDDDAAAAAATTTTTTTEEEEEEEE"+inputDate);
		JSONArray userArray=new JSONArray();
		try {
		String query="";
		if(inputDate.equals("0")){
			query="SELECT ehat_login_history.*,doctor.doc_name FROM ehat_login_history left join doctor on ehat_login_history.user_id = doctor.User_ID ORDER BY ehat_login_history_id DESC limit "+startIndex+" , 10";
		}
		else{
			query="SELECT ehat_login_history.*,doctor.doc_name FROM ehat_login_history left join doctor on ehat_login_history.user_id = doctor.User_ID where ehat_login_history.sign_in_time LIKE '"+inputDate+"%"+"' ORDER BY ehat_login_history_id DESC limit "+startIndex+" , 10";
		}
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = sqlQuery.list();
	    for(Map<String, Object> row : masterRow){

	    	String signOutTime = (String)row.get("sign_out_time");
	    	if(signOutTime==null){
	    		signOutTime = "---";
	    	}
	    	String status = "Signed Off";
	    	if(row.get("status").toString().equals("Y")){
	    		status = "Signed In";
	    	}
 	       JSONObject jsonObject=new JSONObject();
	       //jsonObject.put("userId", userId);
		   jsonObject.put("fullName", row.get("doc_name"));
		   jsonObject.put("remoteIp", row.get("remote_ip"));
		   jsonObject.put("signInTime", row.get("sign_in_time"));
		   jsonObject.put("signOutTime", signOutTime);
		   jsonObject.put("status", status);
		   jsonObject.put("improperSignOutTime", row.get("improper_sign_out_time"));
		   userArray.add(jsonObject);
	     }
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userArray;
	}
}
