package entity;

public class Step {
	
	public int getDistance() {
		return distance;
	}


	public int getDuration() {
		return duration;
	}


	public String getStart_location_lat() {
		return start_location_lat;
	}


	public String getStart_location_lot() {
		return start_location_lot;
	}


	public String getEnd_location_lat() {
		return end_location_lat;
	}


	public String getEnd_location_lot() {
		return end_location_lot;
	}


	private int distance;
	private int duration;

	private String start_location_lat;
	private String start_location_lot;
	
	private String end_location_lat;
	private String end_location_lot;
	
	public Step(StepBuilder sb) {
		
		this.distance = sb.distance;
		this.duration = sb.duration;
		this.start_location_lat = sb.start_location_lat;
		this.start_location_lot = sb.start_location_lot;
		this.end_location_lot = sb.end_location_lot;
		this.end_location_lat = sb.end_location_lat;
		
	}
	
	
	public static class StepBuilder{

		private int distance;
		private int duration;

		private String start_location_lat;
		private String start_location_lot;
		
		private String end_location_lat;
		private String end_location_lot;
		
		public Step build() {
			return new Step(this);
		}
		
		public void setDistance(int distance) {
			this.distance = distance;
		}

		public void setDuration(int duration) {
			this.duration = duration;
		}

		public void setStart_location_lat(String start_location_lat) {
			this.start_location_lat = start_location_lat;
		}

		public void setStart_location_lot(String start_location_lot) {
			this.start_location_lot = start_location_lot;
		}

		public void setEnd_location_lat(String end_location_lat) {
			this.end_location_lat = end_location_lat;
		}

		public void setEnd_location_lot(String end_location_lot) {
			this.end_location_lot = end_location_lot;
		}
	}
	
}
