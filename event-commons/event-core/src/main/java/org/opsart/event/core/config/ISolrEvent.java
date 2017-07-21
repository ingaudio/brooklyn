package org.opsart.event.core.config;

public interface ISolrEvent {

	public static final String searchField = "_text_";
	
	/* DETAILS */
	
	public static final String name = "name_s";
	
	public static final String url = "url_s";
	
	public static final String image = "image_s";
	
	/* WHAT */
	
	public static final String category = "category_s";
	
	public static final String tags = "tags_ss";
	
	public static final String price = "price_f";
	
	public static final String youtube = "youtube_s";
	
	/* WHEN */
	
	public static final String dateStart = "dateStart_dt";
	
	public static final String dateEnd = "dateEnd_dt";
	
	
	/* WHERE */
	
	public static final String country = "country_s";
	
	public static final String city = "city_s";
	
	public static final String locality = "locality_s";
	
	public static final String place = "place_s";
	
	public static final String zone = "zone_s";
	
	public static final String address = "address_s";
	
	public static final String coordinate = "coordinate_s";
	
	/* Extra Info */
	
	public static final String status = "status_b";
	
	public static final String rankPositive = "rankPositive_l";
	
	public static final String rankNegative = "rankNegative_l";
	
	public static final String creationDate = "creationDate_dt";
	
	public static final String modificationDate = "modificationDate_dt";
	
	public static final String userOwner = "userOwner_s";
	
	public static final String userImage = "userImage_s";
	
	public static final String spiderName = "spiderName_s";
	
	public static final String spiderSource = "spiderSource_s";
	
	
}
