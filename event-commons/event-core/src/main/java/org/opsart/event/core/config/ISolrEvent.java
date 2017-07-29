package org.opsart.event.core.config;

public interface ISolrEvent {

	public static final String searchField = "_text_";
	
	/* DETAILS */
	
	public static final String name = "name";
	
	public static final String url = "url";
	
	public static final String image = "image";
	
	/* WHAT */
	
	public static final String category = "category";
	
	public static final String tags = "tags";
	
	public static final String price = "price";
	
	public static final String youtube = "youtube";
	
	/* WHEN */
	
	public static final String dateStart = "dateStart";
	
	public static final String dateEnd = "dateEnd";
	
	
	/* WHERE */
	
	public static final String country = "country";
	
	public static final String city = "city";
	
	public static final String locality = "locality";
	
	public static final String place = "place";
	
	public static final String zone = "zone";
	
	public static final String address = "address";
	
	public static final String coordinate = "coordinate";
	
	/* Extra Info */
	
	public static final String status = "status";
	
//	public static final String rankPositive = "rankPositive";
//	
//	public static final String rankNegative = "rankNegative";
//	
	public static final String creationDate = "creationDate";
	
	public static final String modificationDate = "modificationDate";
	
	public static final String userOwner = "userOwner";
	
	public static final String userImage = "userImage";
	
	public static final String spiderName = "spiderName";
	
	public static final String spiderSource = "spiderSource";
	
	
}
