import value from "json!*";

declare module "streamer_equipment.json" {

  /**
   * Streamer details.
   */
  interface Streamer {
    /**
     * Streamer's username on streaming platform
     */
    username: string;

    /**
     * Title for the equipment set.
     */
    title: string;

    /**
     * 2-Character ISO Code
     */
    country: string;

    /**
     * Link to the streaming video demonstrating the quality
     * the equipment produces.
     */
    video: string;

    /**
     * Items of equipment related
     */
    items: EquipmentLinks
  }

  /**
   * Interface of links to streamer equipment.
   * Properties are self explanatory.
   * Product details can be fetched from the urls.
   */
  interface EquipmentLinks {
    webcam: string,
    microphone: string,
    computer: string,
    headset: string,
    captureCard: null
  }
  

  export default Locale;
}