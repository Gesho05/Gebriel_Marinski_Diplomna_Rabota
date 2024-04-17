
import Image from "./Image";
// a separate component for displaying a place's image
export default function PlaceImg({place, index = 0, className = null}) {
    // if there are no photos, return a message
    if(!place.photos?.length > 0){
        return 'no photos';
    }
    // if there is no className, set it to object-cover
    if(!className){
        className = 'object-cover';
    }
    return (
        // displays the image
        <Image className={className} src={place.photos[index]} alt="" />
    );
}