import Map from "./Map";

const ItineraryCard = ({ markers }) => {

    return (
        <div className="flex flex-col justify-around w-full content-center">
            <div className="h-1/2 content-center flex flex-1">
                <Map markers={markers} />
            </div>
            <div className="h-max m-3 text-center">
                <p className="font-semibold mb-4 mt-4">{markers.driver}</p>
                <p className="pb-4">
                    {" "}
                    {markers.departure.city} {"->"} {markers.arrival.city}
                </p>
                <p className="pb-4">{markers.date}</p>
                <p>{markers.seats}</p>
            </div>
        </div>
    );
};

export default ItineraryCard;
