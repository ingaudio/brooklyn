package org.opsart.event.core.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.opsart.event.core.config.ISolrEvent;
import org.opsart.event.core.config.SolrConfig;
import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;

import com.fasterxml.jackson.annotation.JsonFormat;

@SolrDocument(solrCoreName = SolrConfig.CORE_EVENT)
public class EventDAO {

	@Id
	private String id;

	@Indexed(name=ISolrEvent.name)
	private String name;

	@Indexed(name=ISolrEvent.url)
	private String url;
	
	@Indexed(name=ISolrEvent.image)
	private String image;
	
	@Indexed(name=ISolrEvent.category)
	private String category;
	
	@Indexed(name=ISolrEvent.tags)
	private List<String> tags = new ArrayList<String>();
	
	@Indexed(name=ISolrEvent.price)
	private String price;
	
	@Indexed(name=ISolrEvent.youtube)
	private String youtube;
	
	@Indexed(name=ISolrEvent.dateStart)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
	private Date dateStart;
	
	@Indexed(name=ISolrEvent.dateEnd)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
	private Date dateEnd;
	
	@Indexed(name=ISolrEvent.country)
	private String country;
	
	@Indexed(name=ISolrEvent.city)
	private String city;
	
	@Indexed(name=ISolrEvent.locality)
	private String locality;
	
	@Indexed(name=ISolrEvent.place)
	private String place;
	
	@Indexed(name=ISolrEvent.zone)
	private String zone;
	
	@Indexed(name=ISolrEvent.address)
	private String address;
	
	@Indexed(name=ISolrEvent.coordinate)
	private String coordinate;
	
	@Indexed(name=ISolrEvent.status)
	private Boolean status;
	
	@Indexed(name=ISolrEvent.creationDate)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
	private Date creationDate;
	
	@Indexed(name=ISolrEvent.modificationDate)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
	private Date modificationDate;
	
	@Indexed(name=ISolrEvent.userOwner)
	private String userOwner;
	
	@Indexed(name=ISolrEvent.userImage)
	private String userImage;
	
	@Indexed(name=ISolrEvent.spiderSource)
	private String spiderSource;
	
	@Indexed(name=ISolrEvent.spiderName)
	private String spiderName;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getZone() {
		return zone;
	}

	public void setZone(String zone) {
		this.zone = zone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCoordinate() {
		return coordinate;
	}

	public void setCoordinate(String coordinate) {
		this.coordinate = coordinate;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public Date getDateStart() {
		return dateStart;
	}

	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}

	public Date getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}

	public String getSpiderSource() {
		return spiderSource;
	}

	public void setSpiderSource(String spiderSource) {
		this.spiderSource = spiderSource;
	}

	public String getSpiderName() {
		return spiderName;
	}

	public void setSpiderName(String spiderName) {
		this.spiderName = spiderName;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getYoutube() {
		return youtube;
	}

	public void setYoutube(String youtube) {
		this.youtube = youtube;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getModificationDate() {
		return modificationDate;
	}

	public void setModificationDate(Date modificationDate) {
		this.modificationDate = modificationDate;
	}

	public String getUserOwner() {
		return userOwner;
	}

	public void setUserOwner(String userOwner) {
		this.userOwner = userOwner;
	}

	public String getUserImage() {
		return userImage;
	}

	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}

	
	
}
