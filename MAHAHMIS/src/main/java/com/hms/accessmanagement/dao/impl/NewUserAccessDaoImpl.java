package com.hms.accessmanagement.dao.impl;

import java.util.ArrayList;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.accessmanagement.dao.NewUserAccessDao;
import com.hms.dto.ModuleMasterDto;
import com.hms.dto.NewUserAccessDto;

@Repository
public class NewUserAccessDaoImpl implements NewUserAccessDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@SuppressWarnings("unchecked")
	public ModuleMasterDto getModuleList() {

		ModuleMasterDto moduleMasterDto = new ModuleMasterDto();

		try {

			java.util.List<ModuleMasterDto> lstMainList = new ArrayList<ModuleMasterDto>();
			String sql = "select module_id as moduleId,land_page_id as landPageId,module_name as moduleName, ifnull(land_page_name,'') as landPageName from ehat_user_access_module_master where status='Y' and checkModule='Y' order by ModSequence";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(new AliasToBeanResultTransformer(ModuleMasterDto.class));
			lstMainList = query.list();

			moduleMasterDto.setLstModule(lstMainList);

		} catch (Exception e) {
			e.printStackTrace();
			return moduleMasterDto;
		}

		return moduleMasterDto;

	}

	@Override
	@SuppressWarnings("unchecked")
	public NewUserAccessDto getUserAccessToPage(int moduleId) {
		

		NewUserAccessDto newUserAccessDto = new NewUserAccessDto();

		try {

			java.util.List<NewUserAccessDto> lstMainList = new ArrayList<NewUserAccessDto>();
			String sql = "";
			if(moduleId > 0){
				
				sql = "select module_id as moduleId,sub_module_id as subModuleId,sub_module_name as subModuleName, jsp_page_name as jspPageName, sub_mod_id as subModuleMasterId,sub_module_type as subModuleType, "
						+ " (select count(*) from ehat_user_access_sub_module_master u where u.sub_mod_id = eu.sub_module_id and u.status='Y' ) as subCount, checksub from ehat_user_access_sub_module_master eu where status='Y' and eu.module_id=" + moduleId + " order by sub_Sequence asc";
			}else{
				
				sql = "select module_id as moduleId,sub_module_id as subModuleId,sub_module_name as subModuleName, jsp_page_name as jspPageName, sub_mod_id as subModuleMasterId,sub_module_type as subModuleType, "
					+ " (select count(*) from ehat_user_access_sub_module_master u where u.sub_mod_id = eu.sub_module_id and u.status='Y') as subCount, checksub from ehat_user_access_sub_module_master eu where status='Y' order by sub_Sequence asc";					
			}
			

			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			//System.out.println(".......uuuuuuuuuuuu........" + sql);

			query.setResultTransformer(new AliasToBeanResultTransformer(NewUserAccessDto.class));
			lstMainList = query.list();

			newUserAccessDto.setListuserDto(lstMainList);

		} catch (Exception e) {
			e.printStackTrace();
			return newUserAccessDto;
		}

		return newUserAccessDto;

	}
}
