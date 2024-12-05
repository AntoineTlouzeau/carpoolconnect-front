import ListItinerary from "../components/itinerary/ListItinerary";

const ListItineraryView = () => {
    return (
        <div className="justify-center h-max">
            <div className="max-w-lg space-y-9 rounded-xl bg-white shadow my-8 mx-auto border-2 border-stone-500">
                <ListItinerary />
            </div>
        </div>
    );
};

export default ListItineraryView;
