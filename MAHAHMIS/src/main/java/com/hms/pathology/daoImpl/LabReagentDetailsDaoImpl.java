package com.hms.pathology.daoImpl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.pathology.dao.LabReagentDetailsDao;
import com.hms.pathology.dto.LabReagentDetailsDTO;
import com.hms.pathology.dto.LabTestDTO;

@SuppressWarnings("unchecked")
@Repository
public class LabReagentDetailsDaoImpl implements LabReagentDetailsDao {
	static Logger log=Logger.getLogger(LabReagentDetailsDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public ItemMasterDto getAllReagentList(String type) {
		List<ItemMasterDto> list= new ArrayList<ItemMasterDto>();
		ItemMasterDto itemMasterDto=new ItemMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemMasterDto.class);
			if(type.equalsIgnoreCase("reagent"))
				criteria.add(Restrictions.eq("reagentItemStatus", 1));
			else
				criteria.add(Restrictions.eq("consumableItemStatus", 1));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("id"));
			list = criteria.list();
			if(list.size() > 0){
				itemMasterDto.setLstItemMaster(list);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getAllReagentList...."+e.getMessage());
		}
		return itemMasterDto;
	}

	@Override
	public ItemMasterDto getAllAssetList() {
		List<ItemMasterDto> list= new ArrayList<ItemMasterDto>();
		ItemMasterDto itemMasterDto=new ItemMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemMasterDto.class);
			criteria.add(Restrictions.eq("assetItemStatus", 1));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("id"));
			list = criteria.list();
			if(list.size() > 0){
				itemMasterDto.setLstItemMaster(list);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getAllAssetList...."+e.getMessage());
		}
		return itemMasterDto;
	}

	@Override
	public ItemMasterDto getReagentValues(Integer id, HttpServletRequest request) {
		ItemMasterDto itemMasterDto=new ItemMasterDto();
		try {
			itemMasterDto = (ItemMasterDto) sessionFactory.getCurrentSession().get(ItemMasterDto.class,id);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getReagentValues...."+e.getMessage());
		}
		return itemMasterDto;
	}

	@Override
	public int saveReagentDetails(LabReagentDetailsDTO labReagentDetailsDTO,
			HttpServletRequest request) {
		ItemMasterDto itemMasterDto=new ItemMasterDto();
		LabTestDTO labTestDTO=new LabTestDTO();
		LabTestMethodDTO labTestMethodDTO=new LabTestMethodDTO();
		ItemMasterDto assestdto=new ItemMasterDto();
		try {
			itemMasterDto = (ItemMasterDto) sessionFactory.getCurrentSession().get(ItemMasterDto.class,labReagentDetailsDTO.getReagentId());
			labTestDTO= (LabTestDTO) sessionFactory.getCurrentSession().get(LabTestDTO.class, labReagentDetailsDTO.getLabTestId());
			labTestMethodDTO= (LabTestMethodDTO) sessionFactory.getCurrentSession().get(LabTestMethodDTO.class, labReagentDetailsDTO.getLabTestMethodId());
			assestdto= (ItemMasterDto) sessionFactory.getCurrentSession().get(ItemMasterDto.class, labReagentDetailsDTO.getAssestId());
			labReagentDetailsDTO.setItemMasterReagent(itemMasterDto);
			//labReagentDetailsDTO.setItemMasterAsset(assestdto);
			labReagentDetailsDTO.setLabTestMethod(labTestMethodDTO);
			//labReagentDetailsDTO.setLabTestDTO(labTestDTO);
			if(labReagentDetailsDTO.getIdReagentDetail()==0){
				sessionFactory.getCurrentSession().merge(labReagentDetailsDTO);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(labReagentDetailsDTO);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for saveReagentDetails...."+e.getMessage());
		}
		return 0;
	}

	@Override
	public List<LabReagentDetailsDTO> getAllReagentByTest(Integer testId,
			HttpServletRequest request) {
		List<LabReagentDetailsDTO> list=new ArrayList<LabReagentDetailsDTO>();
		try {
			String hql="FROM LabReagentDetailsDTO WHERE idTest=:idTest AND deleted=:deleted";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setParameter("idTest",testId);
			query.setParameter("deleted", "N");
			list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getAllReagentByTest...."+e.getMessage());
			return null;
		}
		return list;
	}

	@Override
	public LabReagentDetailsDTO editReagentById(Integer id,
			HttpServletRequest request) {
		LabReagentDetailsDTO obj=new LabReagentDetailsDTO();
		try{
			obj = (LabReagentDetailsDTO) sessionFactory.getCurrentSession().get(LabReagentDetailsDTO.class,id);
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for editReagentById...."+e.getMessage());
			return null;
		}
		
		return obj;
	}

	@Override
	public boolean deleteReagentById(Integer id, HttpServletRequest request) {
		try {
			LabReagentDetailsDTO obj = (LabReagentDetailsDTO) sessionFactory.getCurrentSession().get(LabReagentDetailsDTO.class,id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for deleteReagentById...."+e.getMessage());
			return false;
		}
		return true;
	}

}
